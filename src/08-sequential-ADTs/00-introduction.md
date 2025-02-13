
# ADTs: Ordered sequences

::: TODO
- API and use cases for stacks, queues
- Briefly introduce deques
- Mention prio.queues as extension of queues – point forward to the prio.queue chapter
:::

If your program needs to store a few things -- numbers, payroll
records, or job descriptions for example -- the simplest and most
effective approach might be to put them in a list. Only when you have to
organize and search through a large number of things do more
sophisticated data structures like
[search trees](#search-tree){.term} become
necessary. Many applications don't require any form of search, and they
do not require that an ordering be placed on the objects being stored.
Some applications require that actions be performed in a strict
chronological order, processing objects in the order that they arrived,
or perhaps processing objects in the reverse of the order that they
arrived. For all these situations, a simple list structure is
appropriate.

This chapter describes representations both for lists and for two
important list-like structures called the [stack]{.term} and the [queue]{.term}. Along with
presenting these fundamental data structures, the other goals of the
chapter are to:

1.  Give examples that show the separation of a logical representation
    in the form of an ADT from a physical implementation as a data
    structure.
2.  Illustrate the use of asymptotic analysis in the context of simple
    operations that you might already be familiar with. In this way you
    can begin to see how asymptotic analysis works, without the
    complications that arise when analyzing more sophisticated
    algorithms and data structures.

We begin by defining an [ADT for lists](#the-list-adt). Two implementations for the list ADT -- the
[array-based list](#static-array-based-lists) and the
[linked list](#linked-lists)
-- are covered in detail and their relative merits discussed. The
chapter finishes with implementations for
[stacks] and [queues].
