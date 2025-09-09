# type: ignore
"""
Pandoc filter: figures from javascript, the JSAV library
"""

from pathlib import Path
import hashlib
import panflute as pf

RENDERED_IMAGES_DIR = Path('rendered-images')
RENDERED_IMAGES_DIR.mkdir(parents=True, exist_ok=True)


TEMPLATES = {}

TEMPLATES['jsav-figure'] = """
<div id="{id}" class="ssAV" data-short-name="{id}" data-long-name="{name}" alt="{name}" tabIndex="-1">
<div class="jsavcanvas"></div>
</div>
{links}
{scripts}
<script>
  $(document).ready(function(){{
    function NewAV() {{return new JSAV("{id}", {{animationMode: "none"}})}}
    function AddCSS(rule) {{document.getElementById("dynamicStyleSheet").sheet.insertRule("#{id} "+rule)}}
    {code}
  }});
</script>
"""

TEMPLATES['jsav-animation'] = """
<div id="{id}" class="ssAV" data-short-name="{id}" data-long-name="{name}" alt="{name}" tabIndex="-1">
<span class="jsavcounter"></span>
<div class="jsavcontrols"></div>
<p class="jsavoutput jsavline"></p>
<div class="jsavcanvas"></div>
</div>
{links}
{scripts}
<script>
  $(document).ready(function(){{
    function NewAV() {{return new JSAV("{id}", {{animationMode: "none"}})}}
    function AddCSS(rule) {{document.getElementById("dynamicStyleSheet").sheet.insertRule("#{id} "+rule)}}
    {code}
  }});
</script>
"""

TEMPLATES['jsav-embedded'] = """
<div id="{id}" class="embedContainer">
<iframe id="{id}_iframe" aria-label="{id}" src="../interactive/{src}" width="{width}" height="{height}" scrolling="no">
Your browser does not support iframes.
</iframe>
</div>
"""


ID_COUNTER = {'n': 0}

def generate_id(code, attributes):
    ID_COUNTER['n'] += 1
    hashstr = str(ID_COUNTER['n']) + ":" + attributes.get('name','') + ":" + code
    return "img-jsav-" + hashlib.md5(hashstr.encode()).hexdigest()


def jsav_figure(elem, doc):
    if not isinstance(elem, (pf.Div, pf.CodeBlock)):
        return
    jsav_classes = [c for c in elem.classes if c.startswith('jsav')]
    if not jsav_classes:
        return
    assert len(jsav_classes) == 1
    jsav_class = jsav_classes[0]
    assert jsav_class in TEMPLATES

    if isinstance(elem, pf.CodeBlock):
        html_code = render_jsav_figure(elem.text, elem.attributes, jsav_class)
        if 'caption' in elem.attributes:
            assert elem.identifier.startswith("fig:")
            return pf.Div(
                pf.RawBlock(html_code),
                pf.Para(pf.Str(elem.attributes['caption'])),
                identifier = elem.identifier,
                attributes = elem.attributes,
            )
        else:
            assert not elem.identifier
            return pf.RawBlock(html_code)

    caption = elem.content.pop()
    assert all(isinstance(sub, pf.CodeBlock) for sub in elem.content), (
        f"jsav_figure: All subfigures must be jsav code-blocks (figure {elem.identifier})")
    assert isinstance(caption, pf.Para), (
        f"jsav_figure: There must be a caption at the end (figure {elem.identifier})")
    if len(elem.content) == 1:
        attributes = elem.attributes | elem.content[0].attributes
        return pf.Figure(
            pf.RawBlock(render_jsav_figure(elem.content[0].text, attributes, jsav_class)),
            identifier = elem.identifier,
            caption = pf.Caption(caption),
        )
    elem.content = [
        pf.Figure(
            pf.RawBlock(render_jsav_figure(sub.text, sub.attributes, jsav_class)),
            identifier = sub.identifier,
            caption = pf.Caption(pf.Para(pf.Str(sub.attributes['caption']))) if 'caption' in sub.attributes else None,
        )
        for sub in elem.content
    ] + [caption]


def render_jsav_figure(code, attributes, jsav_class):
    if 'src' in attributes:
        id = Path(attributes['src']).with_suffix('').name
    else:
        id = generate_id(code, attributes)
    attributes['id'] = id
    attributes['code'] = code
    attributes.setdefault('name', id)
    attributes['links'] = '\n'.join(
        f'<link href="../interactive/{link}" rel="stylesheet" type="text/css"/>'
        for opt in ['link', 'links']
        for link in attributes.get(opt, '').split()
    )
    attributes['scripts'] = '\n'.join(
        f'<script type="text/javascript" src="../interactive/{script}"></script>'
        for opt in ['script', 'scripts', 'src']
        for script in attributes.get(opt, '').split()
    )
    attributes.setdefault('width', "100%")
    attributes.setdefault('height', "600")
    return TEMPLATES[jsav_class].format(**attributes)


def main(doc = None):
    return pf.run_filter(jsav_figure, doc=doc)

if __name__ == '__main__':
    main()
