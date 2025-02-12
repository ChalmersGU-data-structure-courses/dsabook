
import re
import sys
from pathlib import Path
from html.parser import HTMLParser


def main(outdir: str, *infiles: str):
    """Postprocess each of the infiles and write their result in the outdir folder"""
    for inf in infiles:
        with open(inf) as IN:
            contents = IN.read()
        contents = postprocess(contents)
        outf = Path(outdir) / Path(inf).name
        with open(outf, "w") as OUT:
            print(contents, file=OUT)


def postprocess(contents: str) -> str:
    """Take a HTML string and return a HTML string"""
    contents = convert_animations(contents)
    return contents


###############################################################################
## Include code to make OpenDSA animations and exercises work

# Matching pseudo-HTML tags for animations and exercises

match_tag = re.compile(r"<(inlineav|avembed|dsvis) [^<>]*/>")

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

templates["dsvis"] = """
<div id="{id}" class="dsvis"></div>
<script>DSVis.initialiseAnimation("#{id}", "{ds}", "{init}", "{actions}")</script>
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

