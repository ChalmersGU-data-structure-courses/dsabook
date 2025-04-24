# Heaps

::: TODO
- Prio 1: rewrite (move out binary heaps)
    - Recap of the ADT for prio queues
    - what is the heap property?
    - a binary tree that respects the heap property can be used as a prio. queue
    - show insert, removeMin
    - this is meant to be an introduction to heaps
:::

## Implementing priority queues using binary trees

A normal queue data structure will not implement a priority queue efficiently
because search for the element with highest priority will take
$O(n)$ time. A list, whether sorted or not, will also require
$O(n)$ time for either insertion or removal.


This section presents the [binary heap]{.term} data structure.
A heap is defined by two properties. First, it is a complete
binary tree, so heaps are nearly always implemented using the
[array representation for complete binary trees].
Second, the values stored in a heap are
[partially ordered](#partial-order){.term}. This
means that there is a relationship between the value stored at any node
and the values of its children. There are two variants of the heap,
depending on the definition of this relationship.

A [max heap]{.term} has the property that every
node stores a value that is *greater* than or equal to the value of
either of its children. Because the root has a value greater than or
equal to its children, which in turn have values greater than or equal
to their children, the root stores the maximum of all values in the
tree.

A [min heap]{.term} has the property that every
node stores a value that is *less* than or equal to that of its
children. Because the root has a value less than or equal to its
children, which in turn have values less than or equal to their
children, the root stores the minimum of all values in the tree.

Note that there is no necessary relationship between the value of a node
and that of its sibling in either the min heap or the max heap. For
example, it is possible that the values for all nodes in the left
subtree of the root are greater than the values for every node of the
right subtree. We can contrast BSTs and heaps by the strength of their
ordering relationships. A BST defines a [total order]{.term} on its nodes in that, given the positions for any two nodes
in the tree, the one to the "left" (equivalently, the one appearing
earlier in an inorder traversal) has a smaller key value than the one to
the "right". In contrast, a heap implements a partial order. Given
their positions, we can determine the relative order for the key values
of two nodes in the heap *only* if one is a descendant of the other.

Min heaps and max heaps both have their uses. For example, the [Heapsort]{.term} algorithm
uses the max heap, while the [Replacement Selection]{.term} algorithm used for
external sorting uses a min heap. The examples in the rest of this
section will sometimes use a min and sometimes a max heap.


### Invariants: The heap property

### Inserting elements

### Removing the minimum

### Complexity analysis

::: TODO
- The tree can become unbalanced
- How can we ensure balance? Complete binary trees
:::

