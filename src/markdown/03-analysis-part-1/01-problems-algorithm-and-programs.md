
## Problems, algorithms, and programs {#analysis-1:problems-and-algorithms}

Problems, algorithms, and computer programs are distinct but related concepts
in software development:
We use programs to *implement* algorithms, which in turn *solve* problems.

#### Problems

We can study problems separately from any specific algorithms that solve them.
For example, we know that sorting the input [3,1,2] should give [1,2,3], without even knowing if an algorithm for it exists.
Descriptions of problems often include:

- *preconditions* on the input, such as an array being sorted or containing only positive integers;
- *postconditions* on the output, for example that the result of sorting is a sorted permutation of the input;
- *additional capabilities*, such as the elements of an array being comparable;
- *performance requirements*, like taking at most logarithmic time, or using constant additional memory.

Analysing problems, rather than algorithms, lets us answer questions such as whether an algorithm is *optimal*.
For example, in [Chapter @sec:sorting-2] we will see sorting algorithms that are faster than the quadratic ones from [Chapter @sec:sorting-1], and it turns out they are optimal, but proving this requires reasoning about the problem itself, which is beyond the scope of this book.

Small changes to the requirements give different problems.
Searching in an *arbitrary* array is solved by linear search, while searching in a *sorted* array can be solved much faster by binary search.
The price is stricter requirements on the input: the elements must be *comparable* (we can ask if $x<y$, $x=y$ or $x>y$), and the array must be sorted by the *very same* comparator.
We cannot use binary search to find a first name in an array sorted by family name.
Similarly, *in-place* sorting is a stricter variant of sorting that limits how much additional memory the algorithm may use.

#### Algorithms

An [algorithm]{.term} is a process for solving a specific problem, taking an input and producing a correct output.
There are usually many different algorithms that solves a given problem.
For example, for the problem of sorting an array there are over a dozen commonly used algorithms!

An algorithm can be viewed as an implementation of a [function]{.term} in the mathematical sense.
But note that there are usually several ways of implementing the same functions
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

In addition to these, there are pedagogical expectations on algorithm descriptions that are even more
difficult to quantify. For instance, using well established technical terms correctly is important.
Constantly inventing new terms makes algorithm descriptions difficult for another expert to read,
even if those terms are explained thoroughly. Ultimately, an algorithm description is best if a
competent programmer can easily use it to implement it as a computer program.

#### Programs

A computer [program]{.term} is an implementation of an algorithm in some programming language.
Algorithm descriptions should be unambiguous and mechanical, but since they are usually written in natural language, they can only approximate this ideal.
Computer programs, on the other hand, are unambiguous and mechanical by construction, because the programming language fixes the meaning of every statement.
The downside is that high level of technical detail tends to obscure the important parts of the algorithm.
For a simple algorithm like linear search, executable code in any well known programming language is fine
as an explanation, but for more complicated algorithms the difference between an algorithm description
and an implementation can be several hundred lines of code.
Pseudocode, as frequently used in this book, offers a nice compromise between the precision of a programming language and the flexibility of natural language.

<!--
There are infinitely many programs that implement the same algorithm: renaming a variable, swapping two unrelated statements, or even reversing the direction of a loop gives a new program, but not a new algorithm.
-->

Not every computer program implements an algorithm.
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
