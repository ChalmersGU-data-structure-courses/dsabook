
## Case study: Heapsort

::: TODO
- Prio 1: don't talk about BSTs here - they are not introduced yet
- Prio 2: two stages:
    1. not in-place Heapsort (using a general prio.queue)
    2. in-place Heapsort (using a heap)
- Prio 2: properties (stability, in-place)
:::

<!--
Before we get to Heapsort, consider for a moment the practicality of
using a Binary Search Tree for sorting. You could insert all of the
values to be sorted into the BST one by one, then traverse the completed
tree using an inorder traversal. The output would form a sorted list.
This approach is conceptually very similar to
[Quicksort], where
an internal node corresponds to the pivot, and the left (right) subtree
consists of the partition of values smaller (larger) than the pivot.

However, the approach has a number of drawbacks, including the extra
space required by BST pointers and the amount of time required to insert
nodes into the tree. Quicksort implements this same concept in a much
more efficient way. But there is also the possibility that the BST might
be unbalanced, leading to a $O(n^2)$ worst-case running time. And
this is the same problem as Quicksort has with chosing a good pivot (see
the section "Quicksort Analysis" in chapter XX).
-->

We can use a heap to implement a very simple sorting algorithm:

1. Insert all elements from the unsorted array into a *min*-heap.
2. Remove each element in turn from the heap, putting it in its right place in the original array.

:::::: latex
\booklink{Read the rest online}{9.3}{sec:case-study-heapsort}
::::::

Since the heap returns the smallest elements first, they will be inserted in sorted order into the new array.
Here is pseudocode:

    function naiveHeapsort(A):
        heap = new MinHeap()
        for i in 0 .. A.size-1:
            heap.add(A[i])
        for i in 0 .. A.size-1:
            A[i] = heap.removeMin()

:::::: online
What is the time complexity of this algorithm?

- We have two very similar for loops, iterating over the range of the array.
- The body of each loop is logarithmic, so the total loop complexity is $O(n \log n)$.

So, we have two loops with linearithmic complexity, and therefore the algorithm is linearithmic too, $O(n \log n)$.
This means that `naiveHeapsort` is an efficient sorting algorithm.
However, our algorithm has some disadvantages:

- It is not in-place: we have to allocate $O(n)$ additional space for the heap.
- Also, we saw in the previous section that we can build the heap both faster and in-place.
- (That's why we call it `naiveHeapsort`, and now we will find out how to solve both of these problems.)

### In-place Heapsort

<!--
Instead, a good sorting algorithm can be devised based on a tree
structure more suited to the purpose. In particular, we would like the
tree to be balanced, space efficient, and fast. The algorithm should
take advantage of the fact that sorting is a special-purpose application
in that all of the values to be stored are available at the start. This
means that we do not necessarily need to insert one value at a time into
the tree structure.

[Heapsort]{.term} is based on the
[heap]{.term} data structure.
Heapsort has all of the advantages just listed. The complete binary tree
is balanced, its array representation is space efficient, and we can
load all values into the tree at once, taking advantage of the efficient
`buildHeap` function. The asymptotic performance of Heapsort when all of
the records have unique key values is $O(n \log n)$ in the best,
average, and worst cases. It is not as fast as Quicksort in the average
case (by a constant factor), but Heapsort has special properties that
will make it particularly useful for
[external sorting](#external-sort){.term} algorithms,
used when sorting data sets too large to fit in main memory.
-->

In @sec:building-a-heap we saw that there is a more efficient way of turning an array into a heap, by using the `buildHeap` method.
We can use this to implement a faster and in-place version of Heapsort.

The crucial step here is to use a *max*-heap, which might seem counter-intuitive.
After building the heap we tweak the `removeMax` method a little, so that it *keeps* the removed element, but puts it at the *end* of the array.
This is why we need a max-heap -- because the first element we remove will be put at the very end of the array.
Here is an overview of the idea:

- First, turn the array into a *max*-heap, using `buildHeap`.
- Remove the maximum element, and put it at the end of the array.
  Then decrease the size of the heap -- this will make the maximum element to be outside of the heap.
- Now remove the second largest element, and put it at the second final place.
  And decrease the size of the heap.
- Then remove the third largest element, and so on.
- Finally, when the heap is exhausted the internal array is sorted.

::: dsvis
Here is a visualisation of the Heapsort algorithm.

<inlineav id="heapsortCON" src="Sorting/heapsortCON.js" script="DataStructures/binaryheap.js" name="Heapsort Slideshow"/>
:::

A complete implementation is as follows.

    function heapsort(A):
        // First, convert the array to a max heap.
        heap = new MaxHeap()
        heap.buildHeap(A)

        // Then, repeatedly remove each maximum element from the heap,
        // and put it just after the heap.
        N = heap.size
        for size in N-1, N-2 .. 0:
            heap.swap(0, size)  // Put the max element at the end of the heap.
            heap.size = size    // Change the heap size so it excludes the max element.
            heap.siftDown(0)    // Now, sift the temporary root down.


::: dsvis
Here is a warmup practice exercise for Heapsort.

<avembed id="HeapsortStepPRO" src="Sorting/HeapsortStepPRO.html" type="ka" name="Heapsort RemoveMax Proficiency Exercise"/>
:::

::: dsvis
#### Heapsort proficiency practice

Now test yourself to see how well you understand Heapsort. Can you
reproduce its behavior?

<avembed id="heapsortPRO" src="Sorting/heapsortPRO.html" type="pe" name="Heapsort Proficiency Exercise"/>
:::

#### Analysis of in-place Heapsort

Here is an analysis of the time complexity of Heapsort:

- The first step in Heapsort is to heapify the array.
  This will cost $O(n)$ running time for an array of size $n$.
- Then it swaps each element with the root node and "sifts" it down the heap.
    - Sifting down is logarithmic, $O(\log n)$, in the worst case, since the height of the tree is logarithmic.
    - And this is done for each of the $n$ elements in the array.
- So, the second loop is linearithmic, $O(n \log n)$.

Therefore the worst-case complexity of Heapsort is linearithmic, $O(n \log n)$.

::: dsvis
This visualisation explains the running time analysis of Heapsort.

<inlineav id="HeapSortAnalysisCON" src="Sorting/HeapSortAnalysisCON.js" script="DataStructures/binaryheap.js" name="Heapsort Analysis Slideshow" links="Sorting/HeapSortAnalysisCON.css"/>
:::

While typically slower than Quicksort by a constant factor (because
unloading the heap using `removeMax` is somewhat slower than
Quicksort's series of partitions), Heapsort has one special advantage
over the other sorts studied so far. Building the heap is relatively
cheap, requiring $O(n)$ time. Removing the maximum-valued record
from the heap requires $O(\log n)$ time in the worst case. Thus, if
we wish to find the $k$ records with the largest key values in an array,
we can do so in time $O(n + k \log n)$. If $k$ is small, this is a
substantial improvement over the time required to find the $k$
largest-valued records using one of the other sorting methods described
earlier (many of which would require sorting all of the array first).
One situation where we are able to take advantage of this concept is in
the implementation of
[Kruskal's algorithm]{.term} for [minimum spanning trees]{.term}.
That algorithm requires that edges be visited in ascending
order (so, use a min-heap), but this process stops as soon as the MST is
complete. Thus, only a relatively small fraction of the edges need be
sorted.

Another special case arises when all of the records being sorted have
the same key value. This represents the best case for Heapsort. This is
because removing the smallest value requires only constant time, since
the value swapped to the top is never pushed down the heap.

::::::
