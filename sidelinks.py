import re
from pathlib import Path
from html.parser import HTMLParser

HTML = Path("./docs/html")

index: Path = next(HTML.glob("index.html"))

# Find the TOC
s = open(index).read()

toc = re.search(r'<nav id="TOC" role="doc-toc">.*?</nav>', s, re.DOTALL).group(0)

# Put it in a div with the col 3 class, nav which is scrollable and has a fixed position
toc = toc.replace('<nav id="TOC" role="doc-toc">', '<div class="col-3"><nav id="TOC" role="doc-toc" class="nav-scroll-header"><div class="nav-scroll">').replace('</nav>', '</div></nav></div>')

# Open every other html file and insert the TOC
for f in HTML.glob("*.html"):
    if f == index:
        continue

    s = open(f).read()
    
    # Find the body, put it in a div with the row class
    body = re.search(r'<body>.*?</body>', s, re.DOTALL).group(0)
    body = body.replace("<body>", '<body><div class="row">').replace("</body>", "</div></body>")
    s = s.replace(re.search(r'<body>.*?</body>', s, re.DOTALL).group(0), body)
    
    # Find the <section, put it in a div with the col 9 class
    section = re.search(r'<section.*?</section>', s, re.DOTALL).group(0)
    section = section.replace("<section", '<div class="col-9"><section').replace("</section>", "</section></div>")
    s = s.replace(re.search(r'<section.*?</section>', s, re.DOTALL).group(0), section)
    
    # If there is no <nav id="sitenav" then skip
    if not re.search(r'<nav id="sitenav">', s):
        continue

    # Replace wher <nav id="sitenav" is
    nav = re.search(r'<nav id="sitenav">.*?</nav>', s, re.DOTALL).group(0)
    s = s.replace(nav, toc)
    
    # Write the file
    open(f, "w").write(s)
