
### Implementing priority queues using sorted lists

::: TODO
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

