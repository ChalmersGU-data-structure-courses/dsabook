# type: ignore
"""
HTML filter
"""

import panflute as pf


def make_details(elem):
    content = list(elem.content)
    assert len(content) >= 2
    elem.content = [
        pf.RawBlock("<details>"),
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


def action(elem, doc):
    for c in getattr(elem, "classes", ()):
        if c in remove_classes:
            return []
        if c in class_actions:
            return class_actions[c](elem)


def prepare(doc):
    pass


def finalize(doc):
    pass


def main(doc = None):
    return pf.run_filter(action, prepare=prepare, finalize=finalize, doc=doc)


if __name__ == '__main__':
    main()
