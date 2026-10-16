
# Trees {#trees}

::: TODO
- Prio 1: Done?
:::

Tree structures let us organise data hierarchically.
So far, we have mainly studied data structures that organise elements in a linear sequence, such as arrays, linked lists, stacks, and queues.
In those structures, each element is followed by at most one next element.
Trees take a different approach: instead of continuing in a sequence, a node can lead to two or more children.
This lets us represent _hierarchical_ relationships, and it also helps when we want fast access to values that are important in some way.

Trees appear in many settings.
We can use them to represent mathematical expressions and the syntax of computer programs.
We can use them to model file systems, where folders contain files and other folders.
Trees can also be used as data structures,
such as [heaps]{.term}, for implementing priority queues ([Chapter @sec:heaps]),
and [search trees]{.term}, for implementing sets and maps ([Chapter @sec:search-trees]).

This chapter begins with the basic ideas and terminology for trees.
We then discuss binary trees (@sec:trees:binary-trees),
how to represent trees in general (@sec:trees:general-trees),
and show an example of a simple data structure for [parent-pointer trees]{.term} (@sec:trees:parent-pointer-trees).
