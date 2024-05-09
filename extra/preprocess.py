
import re
import sys
from pathlib import Path


def main(outdir: str, *infiles: str):
    """Preprocess each of the infiles and write their result in the outdir folder"""
    for inf in infiles:
        with open(inf) as IN:
            contents = IN.read()
        contents = preprocess(contents)
        outf = Path(outdir) / Path(inf).name
        with open(outf, "w") as OUT:
            print(contents, file=OUT)


def preprocess(contents: str) -> str:
    """Take a Markdown string and return a Markdown string"""
    contents = convert_glossary(contents)
    contents = convert_terms(contents)
    return contents


###############################################################################
## Convert glossary references 

def convert_terms(contents: str) -> str:
    """Convert glossary references: [xyz]{.term} --> [xyz](#xyz){.term}"""
    return re.sub(
        r"\[([^][]+?)\]({\.term})",
        lambda m: f"[{m[1]}](#{mkid(m[1])}){m[2]}",
        contents,
    )


###############################################################################
## Convert glossary definitions 

def convert_glossary(contents: str) -> str:
    """Convert a glossary: add <dfn id="xyz"> tags, sort the terms, etc."""
    return re.sub(
        r"^(::: *glossary *)$(.+?)^(::: *)$",
        lambda m: m[1] + print_glossary(read_glossary(m[2])) + m[3],
        contents,
        flags = re.DOTALL|re.MULTILINE,
    )


def read_glossary(contents: str) -> list[list[str]]:
    """Read a glossary: return [[term, alias, alias, ..., body], ...]"""
    glossary: list[list[str]] = [[""]]
    for line in contents.splitlines(keepends=True):
        if line.startswith("#"):
            term = line.strip("# \n")
            assert all(term not in gloss for gloss in glossary), f"Term '{term}' already in glossary"
            body = glossary[-1][-1] = glossary[-1][-1].strip()
            if body:
                assert len(glossary[-1]) > 1, f"Body without a term: {body}"
                glossary.append([""])
            glossary[-1][-1:-1] = [term]
        else:
            glossary[-1][-1] += line
    glossary[-1][-1] = glossary[-1][-1].strip()
    return glossary


def print_glossary(glossary: list[list[str]]) -> str:
    """Print the glossary into a Markdown string: sorted and with #identifiers"""
    def dfn(term: str) -> str: 
        return f"[{term}]{{.dfn #{mkid(term)}}}"

    glosslist: list[str] = []
    for term, *aliases, body in list(glossary):
        dfnterm = dfn(term)
        if aliases:
            dfnterm += " (" + ", ".join(map(dfn, aliases)) + ")"
        glosslist.append(
            f"{dfnterm}\n\n:   " + body.replace("\n", "\n    ")
        )
        for alias in aliases:
            glosslist.append(
                f"[{alias}]{{.dfn}}\n\n:   See [{term}]{{.term}}"
            )
    glosslist.sort(key=str.casefold)
    return "\n\n" + "\n\n".join(glosslist) + "\n\n"


###############################################################################
## Utility functions

def mkid(s: str):
    """Convert a string (a title/name) into a valid HTML identifier"""
    s = s.lower()
    s = s.replace("*", "-star").replace("+", "-plus")
    s = re.sub(r"['‘’“”" r'"]', "", s)
    s = re.sub(r"\W+", "-", s)
    s = s.strip("-")
    return s


###############################################################################
## Calling from the command-line

if __name__ == '__main__':
    main(*sys.argv[1:])

