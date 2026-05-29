
## Heaps for priority queues {#heaps}

::: TODO
- Prio 2: add an example figure (with 2-3 example heaps)
:::

A _heap_ provides a natural and efficient implementation of the priority queue introduced at the beginning of this chapter.
Elements (or jobs) can be inserted into the heap using their priority as the ordering key, and the operation `removeMin` can be used whenever the next highest-priority element should be processed.
Priority queues, and therefore heaps, are widely used in algorithms, particularly in graph problems such as finding the [shortest path]{.term} and computing a [minimum spanning tree]{.term}.

To implement priority queues efficiently, we use a data structure called a heap.
The central idea is to organize the data so that the element with the highest priority is always located at the root of the structure.
A heap stores elements in a tree structure, but not every tree qualifies as a heap.
The tree must satisfy a specific invariant known as the heap property.
In general, a [heap]{.term} is a tree that satisfies the following rule:

::: example
#### The heap property

Every node in the tree has at least as high priority as all of its children.
:::

This property guarantees that the element with the highest priority is always located at the root of the tree.
As a result, we can access it immediately, which means that the operation `getMin` can always be performed in constant time.

In the remainder of this chapter, we will use the terms 'highest priority' and 'smallest element' interchangeably, since we will primarily consider minimum priority queues, where the smallest element has the highest priority.

The heap property is particularly suitable because it aligns well with the recursive nature of trees.
Instead of requiring only the root to be the smallest element, the property is enforced locally at every node in the tree.
Each node must be smaller than its children, and because this rule applies recursively throughout the structure, the root must necessarily be the smallest element in the entire tree.
Designing invariants that apply uniformly to every node is often a useful strategy when working with tree-based data structures.

The next question is how to implement heaps in a way that keeps operations efficient.
In fact, there are several different heap structures, each with its own advantages and trade-offs.
Examples include leftist heaps, skew heaps, Fibonacci heaps, binomial heaps, and 2–3 heaps, among others.
Some of these structures are designed to support efficient merging of heaps, which will be discussed later in Section X.

