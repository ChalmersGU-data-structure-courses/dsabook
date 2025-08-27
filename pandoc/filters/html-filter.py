# type: ignore

from pathlib import Path
import hashlib
import subprocess
import panflute as pf

MAX_HEADER_NUMBERING_LEVEL = 3
CLASSES_TO_REMOVE = "TODO latex pdf".split()

RENDERED_IMAGES_DIR = Path('rendered-images')
RENDERED_IMAGES_DIR.mkdir(parents=True, exist_ok=True)


def has_class(elem, cls):
    return cls in getattr(elem, 'classes', ())


## Filter: remove classes that are not supposed to be in the html

def remove_classes(elem, doc):
    for cls in getattr(elem, 'classes', ()):
        if cls in CLASSES_TO_REMOVE:
            return []


# Filter: Make subheadings unnumbered

def max_header_numbering(elem, doc):
    if isinstance(elem, pf.Header):
        if elem.level > MAX_HEADER_NUMBERING_LEVEL:
            elem.classes.append("unnumbered")


# Filter: Put visualisations in a <details> block

def make_details(elem, doc):
    if has_class(elem, 'dsvis'):
        content = list(elem.content)
        assert len(content) >= 2, f"make_details: Not enough children to make <details>, {elem}"
        elem.content = [
            pf.RawBlock('<details open="true">'),
            pf.RawBlock("<summary>"),
            content[0],
            pf.RawBlock("</summary>"),
        ] + content[1:] + [
            pf.RawBlock("</details>"),
        ]


## Filter: figures that contain raw latex

def latex_figure(elem, doc):
    if has_class(elem, 'latex-figure'):
        if isinstance(elem, pf.CodeBlock):
            return render_latex_figure(elem.text, elem.identifier, elem.attributes)
        elif isinstance(elem, pf.Div):
            caption = elem.content.pop()
            assert all(isinstance(sub, pf.CodeBlock) for sub in elem.content), (
                f"latex_figure: All subfigures must be latex code-blocks (figure {elem.identifier})")
            assert isinstance(caption, pf.Para), (
                f"latex_figure: There must be a caption at the end (figure {elem.identifier})")
            if len(elem.content) == 1:
                # elem.attributes['caption'] = caption
                return render_latex_figure(elem.content[0].text, elem.identifier, elem.attributes, caption)
            subfigs = [
                render_latex_figure(sub.text, sub.identifier, sub.attributes)
                for sub in elem.content
            ]
            elem.content = subfigs + [caption]
        else:
            raise AssertionError(f"latex_figure: class 'latex-figure' cannot be used on {elem.tag} blocks")

# \documentclass[svg]{standalone}  % Requires Texlive-2025
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

def hash_filename(code):
    return "fig:" + hashlib.md5(code.encode()).hexdigest()

def render_latex_figure(code, identifier, attributes, caption=None):
    base = RENDERED_IMAGES_DIR / (identifier or hash_filename(code))
    with open(base.with_suffix('.tex'), 'w') as F:
        print(LATEX_FIGURE_TEMPLATE % (code,), file=F)
    # Render directly to SVG in Texlive-2025?
    cmd = ['latex', base.name]
    subprocess.run(cmd, cwd=RENDERED_IMAGES_DIR, capture_output=True)
    cmd = ['magick', '-density', '150', base.with_suffix('.dvi').name, base.with_suffix('.png').name]
    subprocess.run(cmd, cwd=RENDERED_IMAGES_DIR, capture_output=True)

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


## List of all filters to run

FILTERS = [
    remove_classes,
    max_header_numbering,
    make_details,
    latex_figure,
]


def prepare(doc):
    pass


def finalize(doc):
    pass


def main(doc = None):
    return pf.run_filters(FILTERS, prepare=prepare, finalize=finalize, doc=doc)


if __name__ == '__main__':
    main()
