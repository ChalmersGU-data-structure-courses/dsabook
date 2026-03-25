
# Sequences {#sequences}

::: TODO
- Prio 2: update the text, include all ADTs (e.g. prio. queues too)
- general chapter todos:
    - API and use cases for stacks, queues
    - Briefly introduce deques
    - Mention prio.queues as extension of queues -- point forward to the prio.queue chapter
:::

If your program needs to store a small number of things
-- numbers, payroll records, or job descriptions for example
-- the simplest and most effective approach might be to put them in a list.
More sophisticated data structures such as [search trees](#search-tree){.term} or [hash tables]{.term}
only become necessary when you have to organise and search through a large number of things.
Many algorithms do not require any form of search, and
they do not require that an ordering be placed on the objects being stored.
Some algorithms require that actions be performed in a strict chronological order,
processing objects in the order that they arrived,
or perhaps processing objects in the reverse of the order that they arrived.
For all these situations, a simple list structure is appropriate.

This chapter describes two different representations lists-like data structures,
the [linked list]{.term} and the [dynamic array]{.term}.
We also show how these representations can be used to
implement important list-like structures such as the [stack]{.term} and the [queue]{.term}.

Previously in the book we have discussed *algorithms* (mainly for searching and sorting),
but now we will introduce *data structures*.
As we mentioned in @sec:abstract-data-types, there is an important distinction between
*abstract data types* (ADTs) and data structures.
The lists in this chapter are a perfect example of the separation between
a logical representation (in the form of an ADT), and its physical implementation as a data structure.
For example, *stacks* and *queues* are abstract concepts and are best represented as ADTs,
and there are several possible implementations of each of them.
A stack can be implemented both as a linked list and as a dynamic array,
and the same holds for a queue.

A programmer who needs to use a queue in the application they are developing,
should be able to use either of a linked list or a dynamic array
-- and it should be as easy as just changing one line of code to switch from one data structure to the other,
because both linked lists and dynamic arrays are implementations of the queue ADT.
This is similar to the problem of sorting, where any of the algorithms we presented in
[Chapter @sec:sorting-part-1] and [Chapter @sec:sorting-part-2] can be used for sorting an array.
And just as for the sorting problem, one might want to choose a specific data structure
because its performance characteristics fits best with the application one has in mind.

Another thing you will learn in this chapter is the first example of *amortised complexity analysis*.
A dynamic array has on the first sight a really bad worst-case complexity,
but with a deeper analysis we will see that it actually performs very well.
