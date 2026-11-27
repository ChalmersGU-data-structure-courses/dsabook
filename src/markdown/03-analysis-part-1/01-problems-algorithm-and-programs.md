
## Problems, algorithms, and programs {#analysis-1:problems-and-algorithms}

Problems, algorithms, and computer programs are distinct but related concepts
in software development:
We use programs to *implement* algorithms, which in turn *solve* problems.

#### Problems

We can study problems separately from any specific algorithms that solve them.
For example, we know that sorting the array [3,1,2] should give [1,2,3], without even knowing if an algorithm for it exists.

`\newpage\noindent`{=latex}
Descriptions of problems often include:

- *preconditions* on the input, such as an array being sorted or containing only positive integers;
- *postconditions* on the output, for example that the result of sorting is a sorted permutation of the input;
- *additional capabilities*, such as the elements of an array being comparable;
- *performance requirements*, like taking at most logarithmic time, or using constant additional memory.

Analysing problems, rather than algorithms, lets us answer questions such as whether an algorithm is *optimal*.
For example, Linear search is an optimal algorithm
if we do not know anything about how the elements in the array are related to each other.
The price we pay for using a faster algorithm like Binary search is stricter requirements on the input:
the elements must be *comparable*, and the array must be sorted by the *very same* comparator.
We cannot use Binary search to find a first name in an array sorted by family name.


#### Algorithms

An [algorithm]{.term} is a process for solving a specific problem, taking an input and producing a correct output.
There are usually many different algorithms that solves a given problem.
For example, for the problem of sorting an array there are over a dozen commonly used algorithms!

An algorithm can be viewed as an implementation of a [function]{.term} in the mathematical sense.
But note that there are usually several ways of implementing the same function
-- and each of those give rise to a different algorithm.
Since the concept of an algorithm does not have a precise technical definition,
there is some leeway for the level of details required when specifying them.
There is no clear line when something crosses from being a vague idea to an actual algorithm, but there are some things we expect of an algorithm:

1.  It must be *correct*, solving the problem by producing the correct output
    for every valid input, using only the resources allowed by the problem.

2.  It should be *unambiguous*. Small parts of the algorithm description can
    rely on the reader picking up the meaning from context, but generally it is
    bad if two readers end up with different understanding of how the algorithm
    works due to an ambiguous description.

3.  It must consist of *mechanical steps*. Each individual step should be simple
    enough to be performed by a machine incapable of thought. Ideally, a person who knows nothing
    about the specific problem being solved should still be able to perform the steps of the algorithm
    and get a correct result.

In addition to these, there are pedagogical expectations on algorithm descriptions --
they should be *abstract* and *instructive*, easy to understand.
Ultimately, an algorithm description is best if any competent programmer
can implement it as a working computer program in their own favourite language.

#### Programs

A computer [program]{.term} is an implementation of an algorithm in some programming language.
Algorithm descriptions should be unambiguous and mechanical,
but since they are usually written in natural language, they can only approximate this ideal.
Computer programs, on the other hand, are unambiguous and mechanical by construction,
because the programming language fixes the meaning of every statement.
The downside is that high level of technical detail tends to obscure the important parts of the algorithm.
For a simple algorithm like Linear search, executable code in any well known programming language is fine
as an explanation, but for more complicated algorithms the difference between an algorithm description
and an implementation can be several hundred lines of code.
Pseudocode, as frequently used in this book, offers a nice compromise between the precision of a programming language and the flexibility of natural language.

*Not every computer program implements an algorithm*!
One requirement on an algorithm is that it terminates for every input.
Most applications do not: for instance, a web browser does not process
input and then terminate, it only terminates when the user closes it.
The code of a web browser will however contain several functions that implement
different algorithms.

::: TODO
- Prio 3: this visualisation is really ugly
:::

::: dsvis
The following slideshow should help you to visualise the differences.

``` {.jsav-animation src="AlgAnal/ProblemAlgorithmCON.js" links="AlgAnal/ProblemAlgorithmCON.css" name="Problem, Algorithm, and Program definitions Slideshow"}
```
:::
