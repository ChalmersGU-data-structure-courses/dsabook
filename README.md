
DSA Book
===========

This is a modernised and simplified version of the OpenDSA book from 
the open-source [the OpenDSA project](https://opendsa-server.cs.vt.edu),
developed and maintained at Virginia Tech.

All source texts are translated to Markdown (from restructuredText in OpenDSA),
and conversion to HTML is done by the 
[Pandoc universal document converter](https://pandoc.org/).

## Building the website

First you need to install the following dependencies:

- To build the HTML files you need the [Pandoc library](https://pandoc.org/).

- To check for broken links you need the [Hyperlink library](https://github.com/untitaker/hyperlink).
  (If you don't want to install this library, you can just comment out those calls in `make.sh`).

If you make any changes to the markdown sources files (in the `src` directory),
just run the bash script `make.sh`. 
It will build HTML files in the directory `docs/html`. 
This is the only directory that will be updated by the script.

