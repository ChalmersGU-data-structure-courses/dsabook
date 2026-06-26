
## Problems, algorithms, and programs {#analysis-1:problems-and-algorithms}

::: TODO
- Prio 2: Shorten the text a bit more?
:::

Problems, algorithms, and computer programs are distinct but related concepts
in software development:
We use programs to *implement* algorithms, which in turn *solve* problems.

#### Problems

We can study problems separately from any specific algorithms that solve them.
For example, we can look at the problem of sorting an array and know that for the input
[3,1,2], the output of any algorithm solving the problem should be [1,2,3],
without even knowing if such an algorithm exists.
Descriptions of problems often include:

- *preconditions* on the input, such as an array being sorted or containing only positive integers
- *postconditions* on the output, for example that the result of sorting is a sorted permutation of the input
- *additional capabilities*, such that the elements of an array are comparable
- *performance requirements*, like taking at most logarithmic time or, using constant additional memory

Analysing and classifying problems is a large research area, that we mostly avoid in this book.
More than just finding an algorithm that solves a problem,
it is sometimes possible to prove that a class of problems can not be solved efficiently.
However, we can still consider problems separately from the algorithms that solve them,
and how to formulate a problem precisely.
For example, in [Chapter @sec:sorting-1] we introduced the problem of sorting an array,
and showed that there are algorithms that can do this in *quadratic* time.
The natural question is then, is it possible to do it more efficiently?
We will see in [Chapter @sec:sorting-2] that there are faster algorithms,
the follow-up question is if these algorithms are *optimal*.
They are in fact optimal, and to prove this we have to analyse the *problem* and not individual algorithms.
But proving these things are difficult, even for such a simple problem as sorting, and will not be covered in this book.

Still, we can try to classify problems in different subcategories.
For example, a special case of the sorting problem is the *in-place* version
which requires the output array and the input array to be one and the same (with values rearranged).
An in-place algorithm also has restrictions on how much additional memory it is allowed to use,
and an algorithm is only considered a solution if it meets these requirements.
There are many other versions of sorting problems, for instance the problem
of sorting integers is subtly different than the problem of sorting strings
because we can do arithmetic on integers, which can allow faster algorithms.

Another problem that we have encountered is *searching* in an array (@sec:intro:searching).
This problem can be divided into searching in an *arbitrary* array (solved by the linear search algorithm)
and searching in a *sorted* array (solved by the binary search algorithm).
The second problem can on the one hand be solved much faster, but that comes with a prize --
it has stricter requirements on the input:

- The elements in the array needs to be *comparable*,
  meaning that we should be able to ask if $x<y$, $x=y$, or $x>y$, for any elements.
- The array needs to be sorted by the *very same* comparator:
  we cannot use binary search to search for a first name, in an array sorted by family name.


#### Algorithms

An [algorithm]{.term} is a process for solving a specific problem, taking an input and producing a correct output.
There are usually many different algorithms that solves a given problem.
For example, for the problem of sorting an array there are over a dozen commonly used algorithms!

An algorithm can be viewed as an implementation of a [function]{.term} in the mathematical sense.
But note that there are usually several ways of implementing the same functions
-- and each of those give rise to a different algorithm.
Since the concept of an algorithm does not have a precise technical definition,
there is some leeway for the level of details required when specifying them.
There is no clear line when something crosses from being a vague idea to an actual
algorithm, but there are some things we expect of an algorithm:

1.  It must be *correct*, solving the problem by producing the correct output for every valid inputs,
    using only the resources allowed by the problem.

2.  It should be *unambiguous*. Small parts of the algorithm description can rely on the reader
    picking up the meaning from context, but generally it is bad if two readers end up with
    different understanding of how the algorithm works due to an ambiguous description.

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
Unlike abstract descriptions of algorithms, computer programs are unambiguous and mechanical by default.
The downside is that high level of technical detail tends to obscure the important parts of the algorithm.
For a simple algorithm like linear search, executable code in any well known programming language is fine
as an explanation, but for more complicated algorithms the difference between an algorithm description
and an implementation can be several lines of code.
Pseudocode, as frequently used by this book, offers a nice compromise between the
precision of a programming language and the flexibility of natural language.

There are infinitely many programs that implement the same algorithm.
Renaming a variable gives you a new program, but that doesn't change the algorithm.
Sometimes you can change the order between two unrelated statements,
or even change the order in which a loop iterates over an array,
without changing the underlying algorithm.

Not every computer program implements an algorithm.
One requirement on an algorithm is that it terminates for an input.
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
