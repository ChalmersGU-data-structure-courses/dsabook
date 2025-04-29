# type: ignore
"""
HTML filter
"""

import panflute as pf


remove_classes = set(
    "TODO latex pdf".split()
)


def prepare(doc):
    pass


def action(elem, doc):
    if any(c in remove_classes for c in getattr(elem, "classes", ())):
        return []


def finalize(doc):
    pass


def main(doc = None):
    return pf.run_filter(action, prepare=prepare, finalize=finalize, doc=doc)


if __name__ == '__main__':
    main()
