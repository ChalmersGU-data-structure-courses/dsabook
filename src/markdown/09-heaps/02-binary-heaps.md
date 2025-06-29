
## Binary heaps

This section presents the [binary heap]{.term} data structure.
In addition to beaing a *heap*, meaning that it satisfies the heap property, it is also a [complete binary tree]{.term}.

Recall that complete binary trees have all levels except the bottom filled out completely, and the bottom level has all of its nodes filled in from left to right.
Thus, a complete binary tree of $n$ nodes has only one possible shape.
You might think that a complete binary tree is such an unusual occurrence that there is no reason to develop a special implementation for it.
However, it has two very nice properties:

- its height is *logarithmic* in the number of nodes
- it can be stored in an array, so it is very *space-efficient*


### Representing complete binary trees as arrays

From the [full binary tree theorem]{.term},
we know that a large fraction of the space in a typical
binary tree node implementation is devoted to structural
[overhead]{.term}, not to storing data.
Here we present a simple, compact implementation for [complete binary trees]{.term}.
First, note that a complete binary tree of $n$ nodes has only one possible shape.
This means that we can store the nodes directly in an array, without having to include the children pointers.
Instead we can use simple calculations to find the array indices of the children or the parent of a given node.

We begin by assigning numbers to the node positions in the complete
binary tree, level by level, from left to right as shown in @fig:example_complete_bintree.
Note that we start by assigning the root the number 0.

<div id="fig:example_complete_bintree">

::: latex
\begin{forest}
for tree={circle,draw,l=0,s sep=5mm}, [0 [1 [3 [7] [8]] [4 [9] [10]]] [2 [5 [11] [,phantom]] [6]]]
\end{forest}
:::

::: online
<inlineav id="CompleteBinTree" src="Binary/CompleteBinTree.js" name="Binary/CompleteBinTree" static/>
:::

Complete binary tree node numbering
</div>

An array can store the data values of the tree efficiently, placing each value in the array position corresponding to that node's position within the tree.
The following table lists the array indices for the children, parent, and siblings of each node in the figure.


Position         0      1     2     3     4     5     6     7     8     9    10    11
-------------- ------ ----- ----- ----- ----- ----- ----- ----- ----- ----- ----- -----
Parent           --     0     0     1     1     2     2     3     3     4     4     5
Left Child       1      3     5     7     9    11    --    --    --    --    --    --
Right Child      2      4     6     8    10    --    --    --    --    --    --    --
Left Sibling     --    --     1    --     3    --    5     --     7    --     9    --
Right Sibling    --     2    --     4    --     6    --     8    --    10    --    --

Looking at the table, you should see a pattern regarding the positions
of a node's relatives within the array. Simple formulas can be derived
for calculating the array index for each relative of a node $R$ from
$R$'s index. No explicit pointers are necessary to reach a node's left
or right child. This means there is no overhead to the array
implementation if the array is selected to be of size $n$ for a tree of
$n$ nodes.

The formulae for calculating the array indices of the various relatives
of a node are as follows. The total number of nodes in the tree is $n$.
The index of the node in question is $r$, which must fall in the range 0
to $n-1$.

-   Parent($r$) $= \lfloor(r - 1)/2\rfloor$ if $r \neq 0$.
-   Left child($r$) $= 2r + 1$ if $2r + 1 < n$.
-   Right child($r$) $= 2r + 2$ if $2r + 2 < n$.
-   Left sibling($r$) $= r - 1$ if $r$ is even and $r \neq 0$.
-   Right sibling($r$) $= r + 1$ if $r$ is odd and $r + 1 < n$.

::: dsvis
Here is a practice exercise for calculating the array indices of nodes.

<avembed id="CompleteFIB" src="Binary/CompleteFIB.html" type="ka" name="Complete Tree Exercise"/>
:::

### Implementing binary heaps

Be sure not to confuse the logical representation of a heap with its
physical implementation by means of the array-based complete binary
tree. The two are not synonymous because the logical view of the heap is
actually a tree structure, while the typical physical implementation
uses an array.

Here is an implementation for *min*-heaps. It uses a
dynamic array (see @sec:dynamic-arrays)
that will resize automatically when the number of elements change.

    datatype MinHeap implements PriorityQueue:
        H = new Array(10)  // 10 is the initial capacity.
        size = 0           // The initial heap contains 0 elements.

Note that, because we use an array to store the heap, we indicate the nodes by their logical position within the heap rather than by a pointer to the node.
In practice, the logical heap position corresponds to the identically numbered physical position in the array.

Since it is a heap, we know that the first element always contains the element with the highest priority:

    datatype MinHeap implements PriorityQueue:
        ...
        getMin():
            // Precondition: the heap must contain some elements.
            if size > 0:
                return H[0]

The datatype contains some private auxiliary methods that are used when adding and removing elements from the heap:
`isLeaf` tells if a position represents a leaf in the tree, while
`getLeftChild`, `getRightChild` and `getParent` return the position for the left child, right child, and parent of the position passed, respectively.

    datatype MinHeap:
        ...
        isLeaf(pos):
            return pos >= size / 2

        getLeftChild(pos):
            return 2 * pos + 1

        getRightChild(pos):
            return 2 * pos + 2

        getParent(pos):
            return int((pos - 1) / 2)

We also need an auxiliary method for swapping two elements in the heap.

    datatype MinHeap:
        ...
        swap(i, j):
            H[i], H[j] = H[j], H[i]

Finally, since we use a dynamic array we have to be able to resize the internal array.
This is explained in further detail in @sec:dynamic-arrays.

    datatype MinHeap:
        ...
        resizeHeap(newCapacity):
            oldH = H
            H = new Array(newCapacity)
            for i in 0 .. size-1:
                H[i] = oldH[i]


<!--
### Invariants
-->

### Inserting into a heap

Here is how to insert a new element $V$ into the heap:

- First put the new value at the end of the array.
- Now move the value upward in the heap, comparing with its parent.
- If $V$ has a higher priority than its parent, swap the two corresponding array cells.
- Continue until $V$ does not have higher priority than its parent.

::: dsvis
Here is a visual explanation of insertion into a *max*-heap.

<inlineav id="heapinsertCON" src="Binary/heapinsertCON.js" script="DataStructures/binaryheap.js" name="Heap insert Slideshow"/>
:::

Here is an alternative explanation: If the heap
takes up the first $n$ positions of its array prior to the call to
`add`, it must take up the first $n+1$ positions after. To accomplish
this, `add` first places $V$ at position $n$ of the array. Of course,
$V$ is unlikely to be in the correct position. To move $V$ to the right
place, it is compared to its parent's value. If the value of $V$ is
less than or equal to the value of its parent, then it is in the correct
place and the insert routine is finished. If the value of $V$ is greater
than that of its parent, then the two elements swap positions. From
here, the process of comparing $V$ to its (current) parent continues
until $V$ reaches its correct position.

Here is the pseudocode for insertion in our *min*-heap.
Note that we use a helper method for "sifting" a value up the tree.

    datatype MinHeap:
        ...
        add(elem):
            if size >= H.size:
                resizeHeap(H.size * 2)
            H[size] = elem      // Add the element at end of the heap.
            siftUp(size)        // Put it in its correct place.
            size = size + 1     // Increase the size of the heap.

        siftUp(pos):
            while pos > 0:       // Stop when we reach the root (if not earlier).
                parent = getParent(pos)
                if H[pos] >= H[parent]:
                    return pos   // Stop if the parent is smaller or equal.
                swap(pos, parent)
                pos = parent     // Move up one level in the tree.

*Important note*:
One common mistake is to start at the root and work yourself downwards through the heap.
However, this approach does not work because the heap must maintain the shape of a complete binary tree.

Since the heap is a complete binary tree, its height is guaranteed to be
the minimum possible. In particular, a heap containing $n$ nodes will
have a height of $O(\log n)$. Intuitively, we can see that this
must be true because each level that we add will slightly more than
double the number of nodes in the tree (the $i$ th level has $2^i$
nodes, and the sum of the first $i$ levels is $2^{i+1}-1$). Starting at
1, we can double only $\log n$ times to reach a value of $n$. To be
precise, the height of a heap with $n$ nodes is
$\lceil \log n + 1 \rceil$.

Each call to `add` takes $O(\log n)$ time in the worst case,
because the value being inserted can move at most the distance from the
bottom of the tree to the top of the tree. Thus, to insert $n$ values
into the heap, if we insert them one at a time, will take
$O(n \log n)$ time in the worst case.

::: dsvis
#### Exercise: Insert into a *min*-heap

<avembed id="heapinsertPRO" src="Binary/heapinsertPRO.html" type="pe" name="Heap Insert Proficiency Exercise"/>
:::


### Removing from the heap

Here is how to remove the highest-priority element $V$ from a binary heap:

- We know that the highest-priority element is at the tree root, i.e. array position 0.
- We also know that we need to reduce the array/heap size by 1 -- so we can swap the first an last positions.
- Now the new root element does not satisfy the heap property.
- We move the new root downward in the heap -- in each step comparing with the *highest-priority* child.
- Continue until $V$ has a higher priority than both its children.

::: dsvis
Here is a visual explanation of removing from a *max*-heap.

<inlineav id="heapmaxCON" src="Binary/heapmaxCON.js" script="DataStructures/binaryheap.js" name="Remove Max Slideshow"/>
:::

Because the heap is $\log n$ levels deep, the cost of deleting the
maximum element is $O(\log n)$ in the average and worst cases.

Here is the pseudocode for removing the minimum value from our *min*-heap.
Note that we use a helper method for "sifting" a value down the tree.

    datatype MinHeap:
        ...
        removeMin():
            removed = H[0]      // Remember the current minimum value, to return in the end.
            swap(0, size-1)  // Swap the last array element into the first position...
            size = size - 1     // ...and remove the last element, by decreasing the size.
            if size > 0:
                siftDown(0)     // Put the new root in its correct place.
            return removed

        siftDown(pos):
            while not isLeaf(pos):          // Stop when we reach a leaf (if not earlier).
                child = getLeftChild(pos)
                right = getRightChild(pos)
                if right < size and H[right] < H[child]:
                    child = right           // 'child' is now the index of the child with smaller value.
                if H[child] >= H[pos]:
                    return pos              // Stop if the parent is smaller or equal.
                swap(pos, child)
                pos = child                 // Move down one level in the tree.

::: dsvis
#### Exercise: Delete from a *min*-heap

<avembed id="heapremovePRO" src="Binary/heapremovePRO.html" type="pe" name="Heap Remove Exercise"/>
:::

<!-- Don't include removing of arbitrary nodes
::: dsvis
#### Exercise: Removing from a *min*-heap

<inlineav id="heapremoveCON" src="Binary/heapremoveCON.js" script="DataStructures/binaryheap.js" name="Remove Any Slideshow"/>
:::
-->

### Binary heaps as priority queues

The heap is a natural implementation for the priority queue discussed at
the beginning of this chapter. Jobs can be added to the heap (using
their priority value as the ordering key) when needed. Method
`removeMin` can be called whenever a new job is to be executed.

Priority queues can be helpful for solving graph problems such as
finding the [shortest path]{.term} and
finding the [minimum spanning tree]{.term}.
For a story about Priority Queues and dragons, see
[Computational Fairy Tales: Stacks, Queues, Priority Queues, and the Prince's Complaint Line][EXT]

[EXT]: http://computationaltales.blogspot.com/2011/04/stacks-queues-priority-queues-and.html

### Changing the priority of elements

For some applications, objects might get their priority modified.
One solution to this is to remove the object and reinsert it.
Another solution is to change the priority value of the object, and then update its position in the heap.
In any of these cases the application needs to know the position of the object in the heap.

To be able to know the position of an arbitrary object in the heap, we need some auxiliary data structure with which we can find the position of an object.
This auxiliary structure can be any kind of [map]{.term}, which we will discuss later in chapters X--Y.

Assuming that we know the position of the object, we either have to remove it from the heap, or modify its priority.

- To remove the object at an arbitrary position $i$, we first swap it with the last position.
  Then we sift the new value at position $i$, either up or down depending on the priorities of the parent and children.

- To modify the priority of the object at position $i$, we first modify it and then sift the value up or down depending on the priorities of the parent and children.

### Building a heap

If all $n$ values are available at the beginning of the building
process, we can build the heap faster than just inserting the values
into the heap one by one.

:::::: latex
\booklink{Read the rest online}{9.2}{sec:building-a-heap}
::::::

:::::: online
Consider this example, with two possible ways to heapify the array [1,2,3,4,5,6,7] into a *max*-heap:

<inlineav id="HeapBldChoiceCON" src="Binary/HeapBldChoiceCON.js" script="DataStructures/binaryheap.js" name="Heap Build Choices" static/>

- The upper (a) heap is built by a series of nine exchanges in the order (4-2), (4-1), (2-1), (5-2), (5-4), (6-3), (6-5), (7-5), (7-6).
- The lower (b) heap is built by a series of four exchanges in the order (5-2), (7-3), (7-1), (6-1).

From the example, it is clear that the heap for any given set of
numbers is not unique, and we see that some rearrangements of the input
values require fewer exchanges than others to build the heap. So, how do
we pick the best rearrangement?

One good algorithm stems from induction. Suppose that the left and right
subtrees of the root are already heaps, and $R$ is the name of the
element at the root. This situation is illustrated by this figure:

<inlineav id="HeapsIndCON" src="Binary/HeapsIndCON.js" name="Binary/HeapsIndCON" links="Binary/HeapsIndCON.css" static/>

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
Here is a visualization of the build process for a *max*-heap.

<inlineav id="heapbuildCON" src="Binary/heapbuildCON.js" script="DataStructures/binaryheap.js" name="Heapbuild Slideshow"/>
:::

The method `buildHeap` implements the building algorithm:

    datatype MinHeap:
        ...
        buildHeap(array):
            H = array                   // Initialise the heap to the given array.
            size = H.size               // The capacity of the heap is used in full.
            mid = getParent(size-1)     // Find the parent of the last leaf.
            for i in mid, mid-1 .. 0:   // Iterate the internal nodes backwards.
                siftDown(i)             // Sift each internal node down.

Note that this method overwrites the existing heap (if there is one).
Also note that the original array will be modified, so the method is *destructive*!
The advantage is that it doesn't allocate any new memory.

::: dsvis
#### Exercise: Building a *min*-heap

<avembed id="heapbuildPRO" src="Binary/heapbuildPRO.html" type="pe" name="Heap Build Proficiency Exercise"/>
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

\begin{eqnarray*}
\sum_{i=1}^{\log n} (i-1)\frac{n}{2^i}
&=& \frac{n}{2}\sum_{i=1}^{\log n} \frac{i-1}{2^{i-1}}
\end{eqnarray*}


The summation on the right
[is known](#summation){.term} to
have a closed-form solution of approximately 2, so this algorithm takes
$O(n)$ time in the worst case. This is better than building the
heap one element at a time, which would cost $O(n \log n)$ in the
worst case.
<!-- It is also faster than the $O(n \log n)$ average-case
time and $O(n^2)$ worst-case time required to build the BST. -->

::: dsvis
Here is a visual explanation of the cost of `buildHeap`.

<inlineav id="heapbuildProofCON" src="Binary/heapbuildProofCON.js" script="DataStructures/binaryheap.js" name="Heap build analysis proof Slideshow" links="Binary/heapbuildProofCON.css"/>
:::

::::::
