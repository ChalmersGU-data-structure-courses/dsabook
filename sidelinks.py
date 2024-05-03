import re
from pathlib import Path
from html.parser import HTMLParser

HTML = Path("./docs/html")

index: Path = next(HTML.glob("index.html"))

# Find the TOC
s = open(index).read()

toc = re.search(r'<nav id="TOC" role="doc-toc">.*?</nav>', s, re.DOTALL).group(0)

# Put it in a div with the col 3 class, nav which is scrollable and has a fixed position
# It also dissapears when the screen is too small
toc = toc.replace('<nav id="TOC" role="doc-toc">', '<div class="col-lg-3 col-xl-3 d-lg-block d-xl-block d-md-none d-sm-none d-xs-none d-none"><nav id="TOC" role="doc-toc" class="nav-scroll-header"><div class="nav-scroll">').replace('</nav>', '</div></nav></div>')

# Open every other html file and insert the TOC
for f in HTML.glob("*.html"):
    if f == index:
        continue

    s = open(f).read()
    
    # Find the body, put it in a div with the row class
    body = re.search(r'<body>.*?</body>', s, re.DOTALL).group(0)
    body = body.replace("<body>", '<body><div id="top-nav" class="d-lg-none d-xl-none d-md-block d-sm-block d-xs-block d-block"></div><div class="row">').replace("</body>", "</div></body>")
    s = s.replace(re.search(r'<body>.*?</body>', s, re.DOTALL).group(0), body)
    
    # Find the <section, put it in a div with the col 9 class. It expands to col 12 in smaller screens
    section = re.search(r'<section.*?</section>', s, re.DOTALL).group(0)
    section = section.replace("<section", '<div class="col-md-12 col-sm-12 col-xs-12 col-lg-9 col-xl-9"><section').replace("</section>", "</section></div>")
    s = s.replace(re.search(r'<section.*?</section>', s, re.DOTALL).group(0), section)
    
    # If there is no <nav id="sitenav" then skip
    if not re.search(r'<nav id="sitenav">', s):
        continue

    # Replace wher <nav id="sitenav" is
    nav = re.search(r'<nav id="sitenav">.*?</nav>', s, re.DOTALL).group(0)
    s = s.replace(nav, toc)
    
    # Write the file
    open(f, "w").write(s)
