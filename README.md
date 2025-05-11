
Data structures and algorithms
==============================

This course book is developed and maintained by teachers at Chalmers University of Technology and University of Gothenburg.

All source texts are written in the Pandoc flavour of Markdown.
Conversion to HTML is done by the
[Pandoc universal document converter](https://pandoc.org/)
(and some preprocessing and postprocessing scripts).

## Building the website

First you need to install the following dependencies:

- To build the HTML files you need the [Pandoc library](https://pandoc.org/),
  [pandoc-plot](https://laurentrdc.github.io/pandoc-plot/), and
  [panflute](https://scorreia.com/software/panflute/).

- [GNU Make](https://www.gnu.org/software/make/) is necessary to build the website.

- To check for broken links you need the [Hyperlink library](https://github.com/untitaker/hyperlink).
  (This is only used if you run `make check-links`.)

Whenever you make any changes to the source files in the `src` directory (or any other file), run `make`:

- Running just `make` (or `make install`) will build all files into the `build/` directory
- `make deploy` will in addition copy the `build/` directory to `docs/` (which is the directory used by GitHub Pages)
- `make clean` removes the `build/` directory
- `make server` starts a web server so tht you can read the book
- `make check-links` checks that all internal and external links exists

### Testing the website

Most of the interactive exercises need to be on a webserver to work.
Simplest is to start one directly from the command line: `make server`.
Then you can browse to <http://localhost:8000/>.

Whenever you have done changes to the sources, just run `make` and the local website will be updated.
You don't have to restart the webserver.

### History

The book started out as a modernised and simplified version of the OpenDSA book
from the open-source [the OpenDSA project](https://opendsa-server.cs.vt.edu),
developed and maintained at Virginia Tech.

The OpenDSA project source texts were originally written in restructuredText,
and we have translated them to Pandoc Markdown.

### Licence

The original OpenDSA project is published using the MIT licence,
so all text from that project are still MIT licenced.

However, all new text are licenced under a slightly modified licence,
saying that you are not allowed to use that text for publishing
printed books.
