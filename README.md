
Data structures and algorithms
==============================

This course book is developed and maintained by teachers at Chalmers University of Technology and University of Gothenburg.

All source texts are written in the Pandoc flavour of Markdown.
Conversion to HTML is done by the
[Pandoc universal document converter](https://pandoc.org/)
(and some preprocessing and postprocessing scripts).

## Building the website

First you need to install the following dependencies:

- To build the HTML files you need the [Pandoc library](https://pandoc.org/).

- To check for broken links you need the [Hyperlink library](https://github.com/untitaker/hyperlink).
  (If you don't want to install this library, you can just comment out those calls in `make.sh`).

If you make any changes to the markdown sources files (in the `src` directory),
just run the bash script `make.sh`.
It will build HTML files in the directory `docs/html`.
This is the only directory that will be updated by the script.

### Testing the website

Most of the interactive exercises need to be on a webserver to work.
Simplest is to start one inside the `docs` directory:
```
cd docs
python -m http.server
```

And then browse to <http://localhost:8000/>.

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
