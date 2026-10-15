
## Core concepts {#intro:core-concepts}

::: TODO
- Prio 1: the first sentence is *really* short, should be expanded just a little
- Prio 1: add something about *correctness* under "Analysis"
:::

The subjects in this book fall into one of four categories:

Data structures
:   A data structure describes how we can *organise* our data so that it can be retrieved and updated efficiently.
    We explain the fundamental ideas of various data structures, and present the most common implementations.
    Examples of data structures that you may be familiar with are
    *arrays*, *linked lists*, *search trees* and *hash tables*.

Abstract data types
:   An abstract data type (ADT) describes the *capabilities* of a data structure.
    In other words, what operations can we use on a given data structure?
    Are there different data structures that have the same capabilities?
    We use ADTs to categorise the different use cases. Examples of ADTs include
    *lists*, *queues*, *sets* and *maps*.
    Slightly simplified using programming terms: An ADT is an interface, and
    a data structure is the full implementation with all the technical details.

Algorithms
:   An algorithm is a process for solving a specific problem,
    taking an input and producing a correct output.
    This can include operations on data structures,
    such as querying, iterating or updating them.
    We describe algorithms using natural language, explain how to analyse them, and how to implement them as programs.

Analysis
:   The main purpose of analysing data structures and algorithms is to know how *efficient* they are.
    We focus on theoretical algorithm analysis, and in particular *asymptotic complexity analysis*,
    where we mathematically can derive how an algorithm behaves when the size of the input grows.

Throughout the book we show how to describe algorithms and data structures
using well-established technical terms, illustrations, and pseudocode.
We abstract away from technical details of a particular programming language,
and focus on explaining the underlying ideas of a data structure or algorithm.
We aim to provide you with the means to write a good implementation in
your favourite programming language.
