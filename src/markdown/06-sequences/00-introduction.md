
# Sequences {#sequences}

If your program needs to store a small number of things
<!-- OPENDSA: START -->
-- numbers, payroll records, or job descriptions for example
-- the simplest and most effective approach might be to put them in a list.
<!-- OPENDSA: END -->
More sophisticated data structures such as [search trees](#search-tree){.term} or [hash tables]{.term}
only become necessary when you have to organise and search through a large number of things.
<!-- OPENDSA: START -->
Many algorithms do not require any form of search, and
they do not require that an ordering be placed on the objects being stored.
Some algorithms require that actions be performed in a strict chronological order,
processing objects in the order that they arrived,
or perhaps processing objects in the reverse of the order that they arrived.
For all these situations, a simple list structure is appropriate.
<!-- OPENDSA: END -->

Previously in the book we have discussed *algorithms* (mainly for searching and sorting),
but now we will introduce *data structures*.
This chapter describes two different representations lists-like data structures,
the [linked list]{.term} and the [dynamic array]{.term}.
We also show how these representations can be used to
implement important list-like structures such as the [stack]{.term} and the [queue]{.term}.

A programmer who needs to use a stack or a queue in the application they are developing,
should be able to use either of a linked list or a dynamic array.
This is similar to the problem of sorting, where any of the algorithms we presented in
[Chapter @sec:sorting-1] and [Chapter @sec:sorting-2] can be used for sorting an array.
And just as for the sorting problem, one might want to choose a specific data structure
because its performance characteristics fits best with the application one has in mind.

Stacks and queues are both examples of sequences, or *lists*.
When we discuss list data structures, we use some common terminology.
The number of elements in a list is called its *length* or *size*,
the beginning of the list is called the *head*, *top*, or *front*,
and the end of the list is called the *tail*, *bottom*, *rear*, or *back*.

Another thing you will learn in this chapter is the first example of *amortised complexity analysis*.
A dynamic array has on the first sight a really bad worst-case complexity,
but with a deeper analysis we will see that it actually performs very well.
