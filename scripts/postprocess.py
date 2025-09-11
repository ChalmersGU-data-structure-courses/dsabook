
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
    fix_toc(*infiles)


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
## Make subsubsections in TOC collapsible, putting a <details> around them

def fix_toc(*infiles: Path):
    for inf in infiles:
        if inf.name != 'index.html':
            continue
        with open(inf) as IN:
            contents = IN.read()
        contents = contents.replace('</a>', '@')  # Hack for making the regex simpler
        contents, n1 = re.subn(
            r'(<a \s+ href="section-[^<>]+> \s* <span [^<>]*> ([\d.]+) [^@]+ @) (\s* <ul>)',
            mk_details, contents, flags = re.VERBOSE
        )
        contents, n2 = re.subn(
            r'(</ul>) (\s* </li>)', r'\1</details>\2',
            contents, flags = re.VERBOSE
        )
        contents = contents.replace('@', '</a>')
        assert n1 == n2, "Mismatch in the number of <details> vs </details> in TOC"
        with open(inf, "w") as OUT:
            OUT.write(contents)

def mk_details(m: re.Match[str]) -> str:
    level = len(m[2].split('.'))
    details_tag = "<details open>" if level <= 1 else "<details>"
    return f'{details_tag}<summary>{m[1]}</summary>{m[3]}'


###############################################################################
## Calling from the command-line

if __name__ == '__main__':
    main(*sys.argv[1:])

