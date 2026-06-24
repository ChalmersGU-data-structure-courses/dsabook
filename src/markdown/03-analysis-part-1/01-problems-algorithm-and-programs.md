
## Problems, algorithms, and programs {#analysis-1:problems-and-algorithms}

::: TODO
- Prio 2: Flatten subsections?
- Prio 2: Shorten the text
:::

Problems, algorithms, and computer programs are distinct but related concepts
in software development.
An algorithm solve a problem, and programs implements an algorithm.

#### Problems

We can study problems separately from any specific algorithms that solve them.
We can look at the problem of sorting an array and know that for the input
[3,1,2], the output of any algorithm solving the problem should be [1,2,3].
Descriptions of problems often include:

* Preconditions on the input, such as an array being sorted or containing only
  positive integers.
* Postconditions on the output, like the result of sorting being a sorted permutation
  of the input.
* Additional capabilities, such as the elements of an array being comparable,
  or
* Performance requirements, like taking at most linear time or using constant memory.

A major branch of research on algorithms involves classifying problems into
different categories, such as "problems that cannot be solved in linear time"
or "problems where a solution can be verified in linear time".

We have already encountered two fundamental computational problems: Searching in an array (@Sec:intro:searching)
and Sorting an array ([Chapter @sec:sorting-1]).

More precisely we have seen two separate but closely related array searching problems:
The problem of searching an arbitrary array (solved by the linear search algorithm)
and searching in an ordered array (solved by the binary search algorithm).
The two problems differ in two ways:

1. The problem solved by binary search has a stricter precondition on the input,
   the array needs to be sorted.
2. The problem solved by binary search requires values to be three-way-comparable,
   that is we need to be able to determine for any pair $x$ and $y$ if $x<y$, $x=y$, or $x>y$
   (mathematically we would call this a total pre-order).
   Linear search only requires that values can be compared for equality.

The sorting problem can also subdivided into several problems,
the in-place version requires the output array and the input array to
be one and the same (with values rearranged). It also has a limit on
memory usage as part of the problem formulation, and an algorithm is
only considered a solution if it meets the requirement.

There are many other versions of sorting problems, for instance the problem
of sorting integers is subtly different than the problem of sorting strings
because we can do arithmetic on integers, which can allow faster algorithms.
The problem where the only assumption is that values can be three-way-compared is called
comparison sort.

#### Algorithms

An [algorithm]{.term} is a method or a process followed to solve a problem.
There are usually many different algorithms that solves a given problem.
For example, for the important problem of comparison sorting there are over
a dozen commonly used algorithms!
(Some of them are discussed in [Chapters @sec:sorting-1;@sec:sorting-2].)

An algorithm can be viewed as an implementation of a [function]{.term} in the mathematical sense.
But note that there are usually several ways of implementing the same functions
-- and each of those give rise to a different algorithm.

Since the concept of an algorithm does not have a precise technical definition,
there is some leeway for the level of details required when specifying them.
There is no clear line when something crosses from being a vague idea to an actual
algorithm, but there are some things we expect of an algorithm:

1.  It must *correct*, solving the problem by producing the correct output for every valid inputs,
    using only the resources allowed by the problem.
    There is no leeway for this one!

2.  It should be *unambiguous*. Small parts of the algorithm description can rely on the reader
    picking up the meaning from context, but generally it is bad if two readers end up with
    different understanding of how the algorithm works due to ambiguous language.

3.  It must consist of *mechanical steps*. Each individual step of the algorithm should be simple
    enough to be performed by a machine incapable of thought. Ideally, a person who knows nothing
    about the specific problem being solved should still be able to perform the steps of the algorithm
    and get a correct result.

In addition to these, there are pedagogical expectations on algorithm descriptions that are even more
difficult to quantify. For instance, using well established technical terms correctly is important.
Constantly inventing new technical terms makes algorithm descriptions difficult for another expert to read,
even if those terms are explained thoroughly. Ultimately, an algorithm description is best if a
competent programmer can easily use it to implement it as a computer program.

#### Programs

A computer [program]{.term} is an implementation of an algorithm in some programming language.
Unlike abstract descriptions of algorithms, computer programs are unambiguous and mechanical by default.
The downside is that high level of technical detail tends to obscure the important parts of the algorithm.
For a simple algorithm like linear search, executable code in any well known programming language is fine
as an explanation, but for more complicated algorithms the difference between an algorithm description
and an implementation can be hundreds of lines of code.
Pseudocode, as frequently used by this book, offers a nice compromise between the
precision of a programming language and the flexibility of natural language (English).

There are infinitely many programs that implement the same algorithm.
Renaming a variable gives you a new program, but that doesn't change the algorithm.
Sometimes you can change the order between two unrelated statements,
or even change the order in which a loop iterates over an array,
without changing the underlying algorithm.

Not every computer program implements an algorithm.
One requirement on an algorithm is that it terminates for an input.
Most applications do not, for instance a web browser does not process an
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
