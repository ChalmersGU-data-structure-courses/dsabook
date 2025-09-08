# type: ignore
"""
Pandoc filter: figures from javascript, the JSAV library
"""

from pathlib import Path
import hashlib
import panflute as pf

RENDERED_IMAGES_DIR = Path('rendered-images')
RENDERED_IMAGES_DIR.mkdir(parents=True, exist_ok=True)

JSAV_FIGURE_TEMPLATE = """
<div id="{id}" class="ssAV" data-short-name="{id}" data-long-name="{name}" alt="{name}" tabIndex="-1">
{controls}<div class="jsavcanvas"></div>
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

JSAV_CONTROLS = """
<span class="jsavcounter"></span>
<div class="jsavcontrols"></div>
<p class="jsavoutput jsavline"></p>
""".strip()


ID_COUNTER = {'n': 0}

def generate_id(code, attributes):
    ID_COUNTER['n'] += 1
    hashstr = str(ID_COUNTER['n']) + ":" + attributes.get('name','') + ":" + code
    return "img-jsav-" + hashlib.md5(hashstr.encode()).hexdigest()


def jsav_figure(elem, doc):
    if not isinstance(elem, (pf.Div, pf.CodeBlock)):
        return
    if 'jsav-figure' in elem.classes or 'jsav-animation' in elem.classes:
        is_animation = 'jsav-animation' in elem.classes
        if isinstance(elem, pf.CodeBlock):
            html_code = render_jsav_figure(elem.text, elem.attributes, is_animation)
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
            f"latex_figure: All subfigures must be jsav code-blocks (figure {elem.identifier})")
        assert isinstance(caption, pf.Para), (
            f"latex_figure: There must be a caption at the end (figure {elem.identifier})")
        if len(elem.content) == 1:
            attributes = elem.attributes | elem.content[0].attributes
            return pf.Figure(
                pf.RawBlock(render_jsav_figure(elem.content[0].text, attributes, is_animation)),
                identifier = elem.identifier,
                caption = pf.Caption(caption),
            )
        elem.content = [
            pf.Figure(
                pf.RawBlock(render_jsav_figure(sub.text, sub.attributes, is_animation)),
                identifier = sub.identifier,
                caption = pf.Caption(pf.Para(pf.Str(sub.attributes['caption']))) if 'caption' in sub.attributes else None,
            )
            for sub in elem.content
        ] + [caption]


def render_jsav_figure(code, attributes, is_animation):
    if 'src' in attributes:
        id = Path(attributes['src']).with_suffix('').name
    else:
        id = generate_id(code, attributes)
    return JSAV_FIGURE_TEMPLATE.format(**{
        'id': id,
        'name': attributes.get('name', id),
        'scripts': '\n'.join(
            f'<script type="text/javascript" src="../interactive/{scr}"></script>'
            for opt in ['script', 'scripts', 'src']
            for scr in attributes.get(opt, '').split()
        ),
        'links': '\n'.join(
            f'<link href="../interactive/{ln}" rel="stylesheet" type="text/css"/>'
            for opt in ['link', 'links']
            for ln in attributes.get(opt, '').split()
        ),
        'code': code,
        'controls': JSAV_CONTROLS if is_animation else '',
    })


def main(doc = None):
    return pf.run_filter(jsav_figure, doc=doc)

if __name__ == '__main__':
    main()
