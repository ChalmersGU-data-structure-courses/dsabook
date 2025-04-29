# type: ignore
"""
LaTeX filter
"""

import panflute as pf


remove_classes = set(
    "TODO html online quiz dsvis".split()
)

class_actions = {
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
