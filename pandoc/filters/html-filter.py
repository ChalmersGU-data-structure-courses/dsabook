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


def make_details(elem):
    content = list(elem.content)
    assert len(content) >= 2, f"Not enough children to make <details>, {elem}"
    elem.content = [
        pf.RawBlock('<details open="true">'),
        pf.RawBlock("<summary>"),
        content[0],
        pf.RawBlock("</summary>"),
    ] + content[1:] + [
        pf.RawBlock("</details>"),
    ]
    return elem


remove_classes = set(
    "TODO latex pdf".split()
)

class_actions = {
    "dsvis": make_details,
}

tag_actions = {
    "Header": max_numbering,
}


def action(elem, doc):
    if elem.tag in tag_actions:
        elem = tag_actions[elem.tag](elem)
    for c in getattr(elem, "classes", ()):
        if c in remove_classes:
            return []
        if c in class_actions:
            elem = class_actions[c](elem)
    return elem


def prepare(doc):
    pass


def finalize(doc):
    pass


def main(doc = None):
    return pf.run_filter(action, prepare=prepare, finalize=finalize, doc=doc)


if __name__ == '__main__':
    main()
