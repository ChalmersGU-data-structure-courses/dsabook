
import re
import sys
from pathlib import Path
from html.parser import HTMLParser


AllContents: dict[Path, str] = {}
HtmlIDs: dict[str, list[str]] = {}

def main(*infiles: str|Path):
    """Postprocess each of the infiles"""
    infiles = tuple(Path(inf) for inf in infiles)
    # Read all infiles
    for inf in infiles:
        with open(inf) as IN:
            contents = AllContents[inf] = IN.read()
            for m in re.finditer(r'<[a-z]+[^<>]* id="([^"]+)"', contents):
                HtmlIDs.setdefault(m[1], []).append(inf.name)
    # Postprocess each file
    for inf, contents in AllContents.items():
        contents = re.sub(HrefMatch, lambda m: fix_href(m, inf), contents)
        contents = convert_animations(contents)
        with open(inf, "w") as OUT:
            print(contents, file=OUT)


HrefMatch = re.compile(r'(<a [^<>]*\bhref=)"#([^"]+)"')

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
## Include code to make OpenDSA animations and exercises work

# Matching pseudo-HTML tags for animations and exercises

match_tag = re.compile(r"<(inlineav|avembed) [^<>]*/>")

class MyTagParser(HTMLParser):
    def handle_starttag(self, tag: str, attrs: list[tuple[str, str|None]]):
        self.tag = tag
        self.attrs = dict(attrs)

def parse_tag(s: str) -> tuple[str, dict[str, str]]:
    p = MyTagParser()
    p.feed(s)
    return (p.tag, p.attrs) # type: ignore


# HTML templates for the different animations and exercises

templates: dict[str, str] = {}

templates["avembed"] = """
<div id="{id}" class="embedContainer">
<iframe id="{id}_iframe" aria-label="{id}" src="../interactive/{src}" width="{width}" height="{height}" scrolling="no">
Your browser does not support iframes.
</iframe>
</div>
"""

templates["inlineav"] = """
<div id="{id}" class="ssAV" data-short-name="{id}" data-long-name="{name}" alt="{name}" tabIndex="-1">
<span class="jsavcounter"></span>
<div class="jsavcontrols"></div>
<p class="jsavoutput jsavline"></p>
<div class="jsavcanvas"></div>
</div>
"""

templates["inlineav-static"] = """
<div id="{id}" class="ssAV" data-short-name="{id}" data-long-name="{name}" alt="{name}" tabIndex="-1">
<div class="jsavcanvas"></div>
</div>
"""


def convert_animations(contents: str) -> str:
    """Convert each animation using its template, and include necessary scripts and stylesheets"""
    scripts: list[str] = []
    links: list[str] = []

    def convert(m: re.Match[str]) -> str:
        tag, attrs = parse_tag(m[0])
        scr = attrs.get("script")
        if scr and scr not in scripts:
            scripts.append(scr)
        if tag == "inlineav":
            scripts.append(attrs["src"])
        if attrs.get('links'):
            for link in attrs['links'].split():
                if link not in links:
                    links.append(link)
        if "static" in attrs:
            tag += "-static"
        attrs.setdefault("width", "100%")
        attrs.setdefault("height", "600")
        tmpl = templates[tag]
        return tmpl.format(**attrs)

    contents = match_tag.sub(convert, contents)
    for scr in scripts:
        tag = f'<script type="text/javascript" src="../interactive/{scr}"></script>'
        contents = re.sub(r"</body>", f'{tag}\n</body>', contents)
    for ln in links:
        tag = f'<link href="../interactive/{ln}" rel="stylesheet" type="text/css"/>'
        contents = re.sub(r"</head>", f'{tag}\n</head>', contents)
    return contents


###############################################################################
## Calling from the command-line

if __name__ == '__main__':
    main(*sys.argv[1:])

