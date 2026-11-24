
## Core concepts {#intro:core-concepts}

The subjects in this book fall into four categories, which are closely related but important to keep apart.
In short, abstract data types are about which *operations* we can perform on our data, data structures are about how we *store* the data to support those operations,
algorithms are about how we *process* the data, and analysis is about how we know that our solutions are *correct* and *efficient*:

Data structures
:   A data structure describes how we can *organise* our data so that it can be retrieved and updated efficiently.
    We explain the fundamental ideas of various data structures, and present the most common implementations.
    Examples of data structures that you may be familiar with are
    *arrays*, *linked lists*, *heaps*, *search trees* and *hash tables*.

Abstract data types
:   An abstract data type (ADT) describes the *capabilities* of a data structure.
    In other words, what operations can we use on a given data structure?
    Are there different data structures that have the same capabilities?
    We use ADTs to categorise the different use cases. Examples of ADTs include
    *lists*, *queues*, *priority queues*, *sets*, *maps*, and *graphs*.
    There is a simplified analogy with object-oriented programming terminology:
    An ADT is similar to an interface or an abstract class, and
    a data structure is then a class implementation with all the technical details.

Algorithms
:   An algorithm is a procedure for solving a specific problem,
    taking an input and producing a correct output.
    This can include operations on data structures,
    such as querying, iterating or updating them.
    We describe algorithms using natural language, explain how to analyse them, and how to implement them as programs.

Analysis
:   The purpose of analysing data structures and algorithms is to know that they are *correct* and how *efficient* they are.
    To reason about correctness, we use *invariants*, *preconditions* and *postconditions*:
    conditions that must hold before, during and after an operation (see @sec:analysis-1:invariants).
    For efficiency, we focus on theoretical algorithm analysis, and in particular *asymptotic complexity analysis*,
    where we can mathematically derive how an algorithm behaves when the size of the input grows.

Throughout the book we show how to describe algorithms and data structures
using well-established technical terms, illustrations, and pseudocode.
We abstract away from technical details of a particular programming language,
and focus on explaining the underlying ideas of a data structure or algorithm.
We aim to provide you with the means to write a good implementation in
your favourite programming language.
