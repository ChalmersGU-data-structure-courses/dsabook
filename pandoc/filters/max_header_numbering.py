# type: ignore
"""
Panflute filter: Make subheadings (below level 3) unnumbered
"""

import panflute as pf
from panflute_helper import run_filter

MAX_HEADER_NUMBERING_LEVEL = 3


def max_header_numbering(elem, doc):
    if isinstance(elem, pf.Header):
        if elem.level > MAX_HEADER_NUMBERING_LEVEL:
            elem.classes.append("unnumbered")


def main(doc = None):
    return run_filter(max_header_numbering, doc=doc)

if __name__ == '__main__':
    main()
