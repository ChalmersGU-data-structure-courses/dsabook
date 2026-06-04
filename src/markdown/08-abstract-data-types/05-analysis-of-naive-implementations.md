
## Analysis of the naive implementations

::: TODO
- Prio 1: some text is duplicated in previous sections
- Prio 1: summarise the complexities of all naive implementations in this chapter, refer to later chapters
:::

### Priority queues

However, inserting an element into a sorted list, keeping it sorted, is in the worst case linear, $O(n)$.
Therefore, our sorting example in @sec:use-cases-for-priority-queues becomes a quadratic implementation, $O(n^2)$, if we use this naive implementation of priority queues.

Later, in [Chapter @sec:heaps], we will show a more efficient version of priority queues, based on *binary trees*.

### Sets and maps

It is clear that all the operations are linear in the size of the list, $O(n)$, because in the worst case we have to look at all nodes.
In later chapters we will see how to improve the efficiency, by using

-   [Balanced search trees](#balanced-tree){.term} (@sec:self-balancing-trees), which bring down
    the complexity of the operations to $O(\log(n))$.
-   [Hash tables](#hash-table){.term} ([Chapter @sec:hash-tables]), which make
    the operations constant time, $O(1)$.

But some times it is enough to use a simple linked list-based implementation.
And in fact, the [separate chaining]{.term} hash table (@sec:separate-chaining)
requires an underlying simpler implementation -- and there a linked list works very fine!

### Sorted sets and maps


-   Since we know that the internal array is sorted, we can use binary search to lookup elements (see @sec:binary:search).
    This suddenly becomes a fast operation (logarithmic in the size of the set).

-   Unfortunately, modifying the data structure is still slow.
    If we want to add an item to a sorted array, we have to keep the array sorted
    -- and that means we need to *insert* the new item at the right place in the array,
    using the insertion algorithm from Insertion Sort (@sec:insertion-sort).
    This takes linear time in the worst case.

-   Similarly, to remove an item without creating a hole in the array,
    we need to shift a bunch of elements in the array, and this also takes linear time.
