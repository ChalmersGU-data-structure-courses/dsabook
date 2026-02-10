# type: ignore
"""
Panflute filter: remove classes that are not supposed to be in the html
"""

import panflute as pf

# The following <div>s should be removed, and all their content:
CONTENT_TO_REMOVE = "TODO latex pdf".split()

# The following <div>s should be removed, but not their content:
CONTENT_TO_KEEP = "html online".split()


def remove_classes(elem, doc):
    for cls in getattr(elem, 'classes', ()):
        if cls in CONTENT_TO_REMOVE:
            return []
        if cls in CONTENT_TO_KEEP:
            return list(elem.content)


def main(doc = None):
    return pf.run_filter(remove_classes, doc=doc)

if __name__ == '__main__':
    main()
