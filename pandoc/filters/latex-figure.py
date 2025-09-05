# type: ignore
"""
Panflute filter: figures that are generated from LaTeX code
(default LaTeX packages: amsmath, tikz, forest)
"""

from pathlib import Path
import hashlib
import subprocess
import panflute as pf

RENDERED_IMAGES_DIR = Path('rendered-images')
RENDERED_IMAGES_DIR.mkdir(parents=True, exist_ok=True)

LATEX_FIGURE_TEMPLATE = r"""
\documentclass{standalone}
\usepackage{lmodern}
\renewcommand\familydefault{\sfdefault}
\usepackage{amsmath}
\usepackage{forest}
\usepackage{tikz}
\usetikzlibrary{calc,shapes.multipart,chains,arrows}
\begin{document}
%s
\end{document}
"""
# Note: from TeXlive-2025 it's possible to generate SVG from LaTeX directly:
# \documentclass[svg]{standalone}


ID_COUNTER = {'n': 0}

def generate_image_id(code, attributes):
    ID_COUNTER['n'] += 1
    hashstr = str(ID_COUNTER['n']) + ":" + attributes.get('name','') + ":" + code
    return "img-latex-" + hashlib.md5(hashstr.encode()).hexdigest()


def latex_figure(elem, doc):
    if isinstance(elem, (pf.Div, pf.CodeBlock)) and 'latex-figure' in elem.classes:
        if isinstance(elem, pf.CodeBlock):
            return render_latex_figure(elem.text, elem.identifier, elem.attributes)
        # isinstance(elem, pf.Div):
        caption = elem.content.pop()
        assert all(isinstance(sub, pf.CodeBlock) for sub in elem.content), (
            f"latex_figure: All subfigures must be latex code-blocks (figure {elem.identifier})")
        assert isinstance(caption, pf.Para), (
            f"latex_figure: There must be a caption at the end (figure {elem.identifier})")
        if len(elem.content) == 1:
            return render_latex_figure(elem.content[0].text, elem.identifier, elem.attributes, caption)
        subfigs = [
            render_latex_figure(sub.text, sub.identifier, sub.attributes)
            for sub in elem.content
        ]
        elem.content = subfigs + [caption]


def render_latex_figure(code, identifier, attributes, caption=None):
    if 'src' in attributes:
        latex_file = Path(attributes['src'])
        base = RENDERED_IMAGES_DIR / latex_file.with_suffix('').name
    else:
        base = RENDERED_IMAGES_DIR / generate_image_id(code, attributes)
        latex_file = base.with_suffix('.tex')
        with open(latex_file, 'w') as F:
            print(LATEX_FIGURE_TEMPLATE % (code,), file=F)
    pf.debug("...Rendering PNG image from LaTeX source:", identifier or " ".join(code.split())[:60])
    cmd = ['latex', base.name]
    subprocess.run(cmd, cwd=RENDERED_IMAGES_DIR, capture_output=True, check=True)
    cmd = ['magick', '-density', '150', base.with_suffix('.dvi').name, base.with_suffix('.png').name]
    subprocess.run(cmd, cwd=RENDERED_IMAGES_DIR, capture_output=True, check=True)

    if not caption and 'caption' in attributes:
        caption = pf.Para(pf.Str(attributes['caption']))
    image = pf.Image(
        url = str(base.with_suffix('.png')),
        attributes = attributes
    )
    figure = pf.Figure(pf.Plain(image))
    if caption:
        image.title = pf.stringify(caption)
        figure.caption = pf.Caption(caption)
    if identifier:
        figure.identifier = identifier
    return figure


def main(doc = None):
    return pf.run_filter(latex_figure, doc=doc)

if __name__ == '__main__':
    main()
