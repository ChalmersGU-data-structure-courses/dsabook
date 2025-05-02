# type: ignore
"""
Generic filter
"""

import panflute as pf


def make_details(elem):
    content = list(elem.content)
    assert len(content) >= 2
    elem.content = [
        # Must be initially open, otherwise we get problems with the ODSA animations:
        pf.RawBlock('<details open="true">'),
        pf.RawBlock("<summary>"),
        content[0],
        pf.RawBlock("</summary>"),
    ] + content[1:] + [
        pf.RawBlock("</details>"),
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
    "latex": {},
}


def action(elem, doc):
    fmt = doc.format
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
