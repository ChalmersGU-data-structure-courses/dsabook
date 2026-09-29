# type: ignore
"""
Panflute filter: Make numbered algorithms
"""

import panflute as pf
from panflute_helper import run_filter

FANCYBOXES = ["example", "algorithm", "note", "todo"]


COUNTERS = {
    'section': 0,
    'counter': 0,
}

REF_NUMBERS = {}
REF_NAMES = {}

def make_fancybox(elem, doc):
    if isinstance(elem, pf.Header):
        if elem.level == 1:
            COUNTERS['section'] += 1
            COUNTERS['counter'] = 0
        return

    if not isinstance(elem, pf.Div):
        return
    fancyboxes = [env.lower() for env in elem.classes if env.lower() in FANCYBOXES]
    if not fancyboxes:
        return
    assert len(fancyboxes) == 1, f"Only one fancybox class allowed: {', '.join(fancyboxes)}"
    fancybox = fancyboxes[0]
    if isinstance(elem.content[0], pf.Header):
        assert len(elem.content) >= 2, f"make_example: Not enough children to make {fancybox}, {elem}"
        title_elem = elem.content.pop(0)
        assert title_elem.level == 4, f"fancybox {fancybox} must start with level 4 heading!"
        title = pf.stringify(title_elem).strip()
    else:
        title = elem.attributes.get('title', "")
    if title.lower().startswith(fancybox + ":"):
        _, _, title = title.partition(":")
    if elem.identifier:
        COUNTERS['counter'] += 1
        REF_NAMES[elem.identifier] = fancybox.capitalize()
        REF_NUMBERS[elem.identifier] = f"{COUNTERS['section']}.{COUNTERS['counter']}"
        title = f"{REF_NAMES[elem.identifier]} {REF_NUMBERS[elem.identifier]}: {title}".strip(": ")
    else:
        title = f"{fancybox.capitalize()}: {title}".strip(": ")
    elem.content.insert(0, pf.Header(pf.Str(title), level=4))
    return elem


def fix_fancyref(elem, doc):
    if isinstance(elem, pf.Link) and elem.url.startswith("#"):
        key = elem.url.lstrip("#")
        if key in REF_NUMBERS:
            if not elem.content:
                elem.content.append(pf.Str(REF_NAMES[key]))
            elem.content.append(pf.Str(" " + REF_NUMBERS[key]))


def main(doc = None):
    run_filter(make_fancybox, doc=doc)
    run_filter(fix_fancyref, doc=doc)

if __name__ == '__main__':
    main()
