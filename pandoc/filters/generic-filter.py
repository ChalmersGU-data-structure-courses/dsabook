# type: ignore
"""
Generic filter
"""

import panflute as pf

MAX_HEADER_NUMBERING_LEVEL = 3


def max_numbering(hdr):
    if hdr.level > MAX_HEADER_NUMBERING_LEVEL:
        hdr.classes.append("unnumbered")
    return hdr


def hide_term_links(link):
    if "term" in link.classes:
        return pf.Span(*link.content, identifier=link.identifier, classes=link.classes, attributes=link.attributes)
    return link


def make_details(elem):
    content = list(elem.content)
    assert len(content) >= 2
    elem.content = [
        pf.RawBlock('<details open="true">'),
        pf.RawBlock("<summary>"),
        content[0],
        pf.RawBlock("</summary>"),
    ] + content[1:] + [
        pf.RawBlock("</details>"),
    ]
    return elem


def make_example(elem):
    content = list(elem.content)
    assert len(content) >= 2
    title = pf.stringify(content[0]).strip()
    elem.content = [
        pf.RawBlock(f'\\begin{{fancybox}}[frametitle={title}]', format='latex'),
    ] + content[1:] + [
        pf.RawBlock('\\end{fancybox}', format='latex'),
    ]
    return elem


remove_classes = {
    "chunkedhtml": set(
        "TODO latex pdf".split()
    ),
    "latex": set(
        "TODO html online quiz dsvis".split()
    ),
}

class_actions = {
    "chunkedhtml": {
        "dsvis": make_details,
    },
    "latex": {
        "example": make_example,
    },
}

tag_actions = {
    "chunkedhtml": {
        "Header": max_numbering,
    },
    "latex": {
        "Header": max_numbering,
        "Link": hide_term_links,
    },
}


def action(elem, doc):
    fmt = doc.format
    if elem.tag in tag_actions[fmt]:
        elem = tag_actions[fmt][elem.tag](elem)
    for c in getattr(elem, "classes", ()):
        if c in remove_classes[fmt]:
            return []
        if c in class_actions[fmt]:
            elem = class_actions[fmt][c](elem)
    return elem


def prepare(doc):
    pass


def finalize(doc):
    pass


def main(doc = None):
    return pf.run_filter(action, prepare=prepare, finalize=finalize, doc=doc)


if __name__ == '__main__':
    main()
