# type: ignore
"""
Panflute filter: remove classes that are not supposed to be in the html
"""

import panflute as pf

CLASSES_TO_REMOVE = "TODO latex pdf".split()


def remove_classes(elem, doc):
    for cls in getattr(elem, 'classes', ()):
        if cls in CLASSES_TO_REMOVE:
            return []


def main(doc = None):
    return pf.run_filter(remove_classes, doc=doc)

if __name__ == '__main__':
    main()
