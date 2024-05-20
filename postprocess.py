
import re
from pathlib import Path
from html.parser import HTMLParser

HTML = Path("docs/html")

def mkid(s: str):
    s = s.lower()
    s = s.replace("*", "-star").replace("+", "-plus")
    s = re.sub(r"['‘’“”" r'"]', "", s)
    s = re.sub(r"\W+", "-", s)
    s = s.strip("-")
    return s


# Glossary stuff

glossary: Path = next(HTML.glob("*-glossary.html"))

s = open(glossary).read()
s = re.sub(r'<dt>([^<>]+)</dt>', lambda m: f'<dt><dfn id="{mkid(m[1])}">{m[1]}</dfn></dt>', s)
s = re.sub(r'<dd>[\s.…]*</dd>\s*', '', s)
open(glossary, "w").write(s)

for f in HTML.glob("*.html"):
    s = open(f).read()
    s = re.sub(r'<span\s+class="term">([^<>]+)</span>', lambda m: f'<a href="#{mkid(m[1])}" class="term">{m[1]}</a>', s)
    s = re.sub(r'<a\s+href="#([^"]+)"\s+class="term">', lambda m: f'<a href="{glossary.name}#{m[1]}" class="term">', s)
    open(f, "w").write(s)


# Animations and exercises from OpenDSA

class MyTagParser(HTMLParser):
    def handle_starttag(self, tag: str, attrs: list[tuple[str, str | None]]):
        self.tag = tag
        self.attrs = dict(attrs)

def parse_tag(s: str) -> tuple[str, dict[str, str]]:
    p = MyTagParser()
    p.feed(s)
    return (p.tag, p.attrs) # type: ignore


match_tag = re.compile(r"<(inlineav|avembed) [^<>]*/>")


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


scripts: list[str] = []
links: list[str] = []

def convert_interactive(s: str) -> str:
    tag, attrs = parse_tag(s)
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

import xml.dom.minidom as dom

# Apperently the getElementById method doesn't work...
def find_element(document, id):
    for e in document.getElementsByTagName("*"):
        if e.getAttribute("id") == id:
            return e
    return None
    
for f in HTML.glob("*.html"):
    scripts.clear()
    links.clear()
    s = open(f).read()
    s = match_tag.sub(lambda m: convert_interactive(m[0]), s)
    for scr in scripts:
        tag = f'<script type="text/javascript" src="../interactive/{scr}"></script>'
        s = re.sub(r"</body>", f'{tag}\n</body>', s)
    for ln in links:
        tag = f'<link href="../interactive/{ln}" rel="stylesheet" type="text/css"/>'
        s = re.sub(r"</head>", f'{tag}\n</head>', s)
    
    document = dom.parseString(s)
    
    # Find the 'TOC' id
    toc = find_element(document, 'TOC')
    
    # Find the body
    body = document.getElementsByTagName("body")[0]
    
    if toc is not None and body is not None:
        # Find the section element
        section = document.getElementsByTagName("section")
        
        if not section:
            continue
        
        section = section[0]
        
        # Encapsulate the TOC in a div
        div = document.createElement("div")
        
        # Append the TOC to the div
        div.appendChild(toc)
        
        # Insert the div in the parent
        body.insertBefore(div, section)
        
        # Add a button to toggle the TOC
        button = document.createElement("button")
        
        button.setAttribute("id", "toggle-toc")
        button.setAttribute("style", "padding: 0.5em; margin: 0.5em; width: 100%; background-color: #f0f0f0; border: 1px solid #ccc;")
        button.setAttribute("onclick", 
            """
            var toc = document.getElementById("TOC");
            toc.style.display = toc.style.display == "none" ? "block" : "none";
            
            // Change the button text
            var text = this.firstChild;
            text.nodeValue = text.nodeValue == "Show Table of Contents" ? "Hide Table of Contents" : "Show Table of Contents";
            """
        )
        
        # Make the TOC hidden by default
        toc.setAttribute("style", "display: none;")
        
        button.appendChild(document.createTextNode("Show Table of Contents"))
        
        body.insertBefore(button, div)
    
    s = document.toxml()
    
    open(f, "w").write(s)

