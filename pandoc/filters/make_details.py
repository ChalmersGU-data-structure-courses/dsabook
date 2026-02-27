# type: ignore
"""
Panflute filter: Put visualisation blocks inside a <details> block
"""

import panflute as pf
from panflute_helper import run_filter


def make_details(elem, doc):
    if isinstance(elem, pf.Div) and 'dsvis' in elem.classes:
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


def main(doc = None):
    return run_filter(make_details, doc=doc)

if __name__ == '__main__':
    main()
