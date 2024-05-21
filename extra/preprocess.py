
import re
import sys
from pathlib import Path


def main(outdir: str, glossfile: str, *infiles: str):
    """Preprocess each of the infiles and write their result in the outdir folder"""
    load_global_glossary(glossfile)
    for inf in infiles:
        with open(inf) as f:
            contents = f.read()
        contents = preprocess(contents)
        outf = Path(outdir) / Path(inf).name
        with open(outf, "w") as f:
            print(contents, file=f)


def preprocess(contents: str) -> str:
    """Take a Markdown string and return a Markdown string"""
    contents = convert_glossary(contents)
    contents = convert_terms(contents)
    contents = add_tooltips(contents)
    return contents


###############################################################################
## The global glossary

TheGlossary: list[list[str]]

def load_global_glossary(glossfile: str):
    global TheGlossary
    with open(glossfile) as f:
        contents = f.read()
    _, TheGlossary, _ = read_glossary(contents)
    assert TheGlossary, f"Couldn't find a glossary in file {glossfile}"
    for gloss in TheGlossary:
        gloss[:-1] = map(mkid, gloss[:-1])
        gloss[-1] = strip_markdown(gloss[-1])

def find_glossary_definition(term: str) -> str:
    """Find the definition of the given glossary term"""
    for gloss in TheGlossary:
        if term in gloss[:-1]:
            return gloss[-1]
    return ""


###############################################################################
## Convert glossary references 

def convert_terms(contents: str) -> str:
    """Convert glossary references: [xyz]{.term} --> [xyz](#xyz){.term}"""
    return re.sub(
        r"\[([^][]+?)\]{\.term}", 
        lambda m: f"[{m[1]}](#{mkid(m[1])}){{.term}}",
        contents,
    )

def add_tooltips(contents: str) -> str:
    """Add tooltips to glossary references: [xyz](#xyz){.term} --> [xyz](#xyz){.term title="tooltip"}"""
    return re.sub(
        r"\(#([^()]+)\){\.term}",
        lambda m: f'(#{m[1]}){{.term title="{find_glossary_definition(m[1])}"}}',
        contents,
    )


###############################################################################
## Convert glossary definitions 

def convert_glossary(contents: str) -> str:
    """Convert a glossary: add <dfn id="xyz"> tags, sort the terms, etc."""
    pretext, glossary, posttext = read_glossary(contents)
    if not glossary: 
        return contents
    else:
        return pretext + print_glossary(glossary) + posttext


def read_glossary(contents: str) -> tuple[str, list[list[str]], str]:
    """Read a glossary, return: ("text-before", [["term", "alias", "alias", ..., "body"], ...], "text-after")"""
    m = re.match(
        r"\A(.*^::: *glossary *)$(.+?)^(::: *$.*)\Z", 
        contents,
        flags = re.DOTALL|re.MULTILINE,
    )
    if m is None: return contents, [], ""
    pretext, glosstext, posttext = m.groups()

    glossary: list[list[str]] = [[""]]
    for line in glosstext.splitlines(keepends=True):
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
    return pretext, glossary, posttext


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


def strip_markdown(text: str) -> str:
    """Remove all Markdown formatting"""
    text = re.sub(r"\[([^][]+)\](\([^()]+\))?({[^{}]+})?", r"\1", text)
    text = re.sub(r"\s+", " ", text)
    text = re.sub(r'["]', "'", text)
    return text


###############################################################################
## Calling from the command-line

if __name__ == '__main__':
    main(*sys.argv[1:])

