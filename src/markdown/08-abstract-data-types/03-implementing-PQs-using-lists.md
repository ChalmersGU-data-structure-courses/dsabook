
## Implementing priority queues using sorted lists

::: TODO
- Prio 1: is this better as a section or subsection?
    - I made it a section because implementing sets/maps are separate sections too
- Prio 1: merge with subsection "Designing an efficient priority queue" from previous section
- Prio 1: move complexity analysis to separate section for the whole chapter
:::

It is very easy to implement priority queues using sorted lists (either linked lists or dynamic arrays).
Here are very basic ideas how to implement the operations:

    datatype NaivePriorityQueue:
        list = new empty list
        add(x):
            insert x into list, keeping it sorted
        removeMin():
            remove the smallest element in list

If we decide to use a linked list, then we make sure it is always sorted with the smallest value first in the list.
If we instead use a dynamic array, we have to keep it *reversely* sorted.
The reason is the same as for stacks: it is efficient to remove elements from the *front* of a linked list, and from the *back* of a dynamic array.
This means that `removeMin` will be a very efficient, constant time operation, just as `pop` for stacks.

However, inserting an element into a sorted list, keeping it sorted, is in the worst case linear, $O(n)$.
Therefore, our sorting example in @sec:use-cases-for-priority-queues becomes a quadratic implementation, $O(n^2)$, if we use this naive implementation of priority queues.

Later, in [Chapter @sec:heaps], we will show a more efficient version of priority queues, based on *binary trees*.
