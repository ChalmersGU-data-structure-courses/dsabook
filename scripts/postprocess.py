
import re
import sys
from pathlib import Path


AllContents: dict[Path, str] = {}
HtmlIDs: dict[str, list[str]] = {}

def main(*infiles: str|Path):
    """Postprocess each of the infiles"""
    infiles = tuple(Path(inf) for inf in infiles)
    fix_references(*infiles)
    move_links_to_header(*infiles)


###############################################################################
## Fix cross-section references so they point to the correct html file

def fix_references(*infiles: Path):
    # Read all infiles, remember all anchors
    for inf in infiles:
        with open(inf) as IN:
            contents = AllContents[inf] = IN.read()
            for m in re.finditer(AnchorMatch, contents):
                HtmlIDs.setdefault(m[1], []).append(inf.name)
    # Fix references for each file
    for inf, contents in AllContents.items():
        contents = re.sub(HrefMatch, lambda m: fix_href(m, inf), contents)
        with open(inf, "w") as OUT:
            print(contents, file=OUT)


AnchorMatch = re.compile(r'<[a-z]+[^<>]+?\bid="([^"<>]+?)"')
HrefMatch = re.compile(r'(<a\b[^<>]+?\bhref=)"#([^"<>]+?)"')

def fix_href(m: re.Match[str], inf: Path) -> str:
    prefix, id = m[1], m[2]
    if id not in HtmlIDs:
        print(f"Anchor not found: #{id}")
        return m[0]
    reffiles = HtmlIDs[id]
    if inf.name in reffiles:
        return m[0]
    if len(reffiles) > 1:
        print(f"Ambiguous anchor #{id}, found in files: {reffiles}", file=sys.stderr)
    print(f"Redirecting anchor #{id} --> {reffiles[0]}", file=sys.stderr)
    return f'{prefix}"{reffiles[0]}#{id}"'


###############################################################################
## Move <link> tags to the html header

linksre = re.compile(r"<link [^<>]*>")

def move_links_to_header(*infiles: Path):
    for inf in infiles:
        with open(inf) as IN:
            contents = IN.read()
        header, mid, body = contents.partition("</head>")
        all_links = linksre.findall(body)
        body = linksre.sub("", body)
        contents = header + "\n".join(sorted(set(all_links))) + mid + body
        with open(inf, "w") as OUT:
            print(contents, file=OUT)


###############################################################################
## Calling from the command-line

if __name__ == '__main__':
    main(*sys.argv[1:])

