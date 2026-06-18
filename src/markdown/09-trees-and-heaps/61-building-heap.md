:::::: online

## Case study: Building a heap

If all $n$ values are available at the beginning of the building process, we can build the heap faster than just inserting the values into the heap one by one.

Consider this example, with two possible ways to heapify the array [1,2,3,4,5,6,7] into a *max*-heap:

``` {.jsav-figure src="Binary/HeapBldChoiceCON.js" script="DataStructures/binaryheap.js"}
```

- The upper (a) heap is built by a series of nine exchanges in the order (4-2), (4-1), (2-1), (5-2), (5-4), (6-3), (6-5), (7-5), (7-6).
- The lower (b) heap is built by a series of four exchanges in the order (5-2), (7-3), (7-1), (6-1).

From the example, it is clear that the heap for any given set of
numbers is not unique, and we see that some rearrangements of the input
values require fewer exchanges than others to build the heap. So, how do
we pick the best rearrangement?

One good algorithm stems from induction. Suppose that the left and right
subtrees of the root are already heaps, and $R$ is the name of the
element at the root. This situation is illustrated by this figure:

``` {.jsav-figure src="Binary/HeapsIndCON.js" links="Binary/HeapsIndCON.css"}
```

In this case there are two possibilities.

- $R$ has a priority which is higher or equal to both its children.
  In this case, construction is complete.

- $R$ has a priority which is lower than one or both of its children.

  In this case, $R$ should be exchanged with the highest-priority child.
  The result will be a heap, except that $R$ might still have a lower priority than one or both of its (new) children.
  In this case, we simply continue the process of "pushing down" $R$ until it reaches a level where it has a higher priority than its children, or is a leaf node.

  This process is implemented by the method `siftDown`.

This approach assumes that the subtrees are already heaps, suggesting
that a complete algorithm can be obtained by visiting the nodes in some
order such that the children of a node are visited *before* the node
itself. One simple way to do this is simply to work from the high index
of the array to the low index. Actually, the build process need not
visit the leaf nodes (they can never move down because they are already
at the bottom), so the building algorithm can start in the middle of the
array, with the first internal node.

- Iterate through the internal array indices $i = m, m-1, \ldots, 0$ in backwards order,
  where $m$ is the parent of the last element (approximately $n/2$).
- For each index $i$, sift down its value.

::: dsvis
Here is a visualisation of the build process for a *max*-heap.

``` {.jsav-animation src="Binary/heapbuildCON.js" scripts="DataStructures/binaryheap.js" name="Heapbuild Slideshow"}
```
:::

The method `buildHeap` implements the building algorithm:

    datatype MinHeap:
        ...
        buildHeap(arr):
            heap = arr                  // Initialise the heap to the given array.
            size = heap.size            // The capacity of the heap is used in full.
            mid = parent(size-1)        // Find the parent of the last leaf.
            for i in mid, mid-1 .. 0:   // Iterate the internal nodes backwards.
                siftDown(i)             // Sift each internal node down.

Note that this method overwrites the existing heap (if there is one).
Also note that the original array will be modified, so the method is *destructive*!
The advantage is that it doesn't allocate any new memory.

::: dsvis
#### Exercise: Building a *min*-heap

```{.jsav-embedded src="Binary/heapbuildPRO.html" type="pe" name="Heap Build Proficiency Exercise"}
```
:::

What is the cost of `buildHeap`? Clearly it is the sum of the costs for
the calls to `siftDown`. Each `siftDown` operation can cost at most the
number of levels it takes for the node being sifted to reach the bottom
of the tree. In any complete tree, approximately half of the nodes are
leaves and so cannot be moved downward at all. One quarter of the nodes
are one level above the leaves, and so their elements can move down at
most one level. At each step up the tree we get half the number of nodes
as were at the previous level, and an additional height of one. The
maximum sum of total distances that elements can go is therefore

$$
\sum_{i=1}^{\log(n)} (i-1)\frac{n}{2^i}
= \frac{n}{2}\sum_{i=1}^{\log(n)} \frac{i-1}{2^{i-1}}
$$


The summation on the right
[is known](#summation){.term} to
have a closed-form solution of approximately 2, so this algorithm takes
$O(n)$ time in the worst case. This is better than building the
heap one element at a time, which would cost $O(n \log(n))$ in the
worst case.
<!-- It is also faster than the $O(n \log(n))$ average-case
time and $O(n^2)$ worst-case time required to build the BST. -->

::: dsvis
Here is a visual explanation of the cost of `buildHeap`.

``` {.jsav-animation src="Binary/heapbuildProofCON.js" scripts="DataStructures/binaryheap.js" links="Binary/heapbuildProofCON.css" name="Heap build analysis proof Slideshow"}
```
:::

<!--
::: example
#### Example: Building a heap, using a recurrence relation

Our next example models the cost of the algorithm to build a heap. You
should recall that to build a [heap](#heaps),
we first heapify the two subheaps, then push down the root
to its proper position. The cost is:

$$
f(n) \leq 2f(n/2) + 2 \log(n)
$$

Let us find a closed form solution for this recurrence. We can expand
the recurrence a few times to see that

\begin{align*}
f(n) &\leq  2f(n/2) + 2 \log(n) \\
     &\leq  2[2f(n/4) + 2 \log(n/2)] + 2 \log(n) \\
     &\leq  2[2(2f(n/8) + 2 \log(n/4)) + 2 \log(n/2)] + 2 \log(n)
\end{align*}

We can deduce from this expansion that this recurrence is equivalent to
following summation and its derivation:

\begin{align*}
f(n)  &\leq  \sum_{i=0}^{\log(n) -1} 2^{i+1} \log(n/2^i) \\
      &=  2 \sum_{i=0}^{\log(n) -1} 2^i (\log(n) - i) \\
      &=  2 \log(n) \sum_{i=0}^{\log(n) -1} 2^i - 4 \sum_{i=0}^{\log(n) -1} i 2^{i-1} \\
      &=  2 n \log(n) - 2 \log(n) - 2 n \log(n) + 4n -4 \\
      &=  4n - 2 \log(n) - 4
\end{align*}
:::
-->


::::::
