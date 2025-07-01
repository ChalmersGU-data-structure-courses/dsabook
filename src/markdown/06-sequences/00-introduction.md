
# Stacks, queues, and lists

::: TODO
- Prio 2: update the text, include all ADTs (e.g. prio. queues too)
- general chapter todos:
    - API and use cases for stacks, queues
    - Briefly introduce deques
    - Mention prio.queues as extension of queues – point forward to the prio.queue chapter
:::

If your program needs to store a few things -- numbers, payroll
records, or job descriptions for example -- the simplest and most
effective approach might be to put them in a list. Only when you have to
organise and search through a large number of things do more
sophisticated data structures like
[search trees](#search-tree){.term} become
necessary. Many applications don't require any form of search, and they
do not require that an ordering be placed on the objects being stored.
Some applications require that actions be performed in a strict
chronological order, processing objects in the order that they arrived,
or perhaps processing objects in the reverse of the order that they
arrived. For all these situations, a simple list structure is
appropriate.

This chapter describes two different representations lists-like structures, the [linked list]{.term} and the [array-based list]{.term}.
We also show how these representations can be used to implement important list-like structures such as the [stack]{.term} and the [queue]{.term}.
Along with presenting these fundamental data structures, the other goals of the chapter are to:

1.  Give examples that show the separation of a logical representation
    in the form of an ADT from a physical implementation as a data
    structure.
2.  Illustrate the use of asymptotic analysis in the context of simple
    operations that you might already be familiar with. In this way you
    can begin to see how asymptotic analysis works, without the
    complications that arise when analysing more sophisticated
    algorithms and data structures.


