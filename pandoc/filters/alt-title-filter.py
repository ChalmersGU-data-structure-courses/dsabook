import panflute as pf

LATEX_ATTRIBUTE_ID = 'latex'

def header_filter(elem, doc):
  if isinstance(elem, pf.Header) and doc.format == 'latex':
    title = elem.attributes.get(LATEX_ATTRIBUTE_ID)

    if not title:
      return

    if elem.classes:
      raise Exception(
        'alt-title-filter.py: If class "%s" is used, I cant handle another one (Header="%s")'
        % (LATEX_ATTRIBUTE_ID, pf.stringify(elem))
      )

    try:
      tag = {
        0: 'part',
        1: 'chapter',
        2: 'section',
        3: 'subsection',
        4: 'subsubsection',
      }[elem.level]
    except KeyError:
      raise Exception('alt-title-for-toc.py: level %d not handled' % elem.level)

    return pf.RawBlock('\\%s[%s]{%s}' % (tag, pf.stringify(elem), title), format='latex')

def main(doc=None):
  return pf.run_filter(header_filter, doc=doc)

if __name__ == '__main__':
  main()
