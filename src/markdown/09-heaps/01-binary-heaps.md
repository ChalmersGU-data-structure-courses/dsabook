
## Binary heaps

::: TODO
- Prio 1: move some things from previous section here
- Prio 1: we don't want the full source code, but only the main parts
- Prio 1: invariants
- Prio 2: change the order (building a heap shouldnät come first)
:::

### Representing complete binary trees as arrays

From the [full binary tree theorem]{.term},
we know that a large fraction of the space in a typical
binary tree node implementation is devoted to structural
[overhead]{.term}, not to storing data. This
section presents a simple, compact implementation for
[complete binary trees](#complete-binary-tree){.term}. Recall that complete binary trees have all levels except
the bottom filled out completely, and the bottom level has all of its
nodes filled in from left to right. Thus, a complete binary tree of $n$
nodes has only one possible shape. You might think that a complete
binary tree is such an unusual occurrence that there is no reason to
develop a special implementation for it. However, the complete binary
tree has practical uses, the most important being the
[heap](#heaps-and-priority-queues) data structure. Heaps
are often used to implement
[priority queues](#priority-queue){.term} and
for [external sorting algorithms](#external-sort){.term}.

We begin by assigning numbers to the node positions in the complete
binary tree, level by level, from left to right as shown in
[Figure #BinArray](#BinArray). An array can store the
tree's data values efficiently, placing each data value in the array
position corresponding to that node's position within the tree. The
table lists the array indices for the children, parent, and siblings of
each node in the figure.

::: figure
#### Figure: Complete binary tree {- #BinArray}

![Complete binary tree node numbering](images/BinArray.png){width=400}

A complete binary tree of 12 nodes, numbered starting from 0.
:::

Here is a table that lists, for each node position, the positions of the
parent, sibling, and children of the node.


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

<avembed id="CompleteFIB" src="Binary/CompleteFIB.html" type="ka" name="Complete Tree Exercise"/>

### Implementing binary heaps

Be sure not to confuse the logical representation of a heap with its
physical implementation by means of the array-based complete binary
tree. The two are not synonymous because the logical view of the heap is
actually a tree structure, while the typical physical implementation
uses an array.

Here is an implementation for min heaps. It uses a
[dynamic array list](#dynamic-array-based-lists)
that will resize automatically when the number of elements change.

    datatype MinHeap implements PriorityQueue:
        heap = new ArrayList()

        // Return the minimum element, without removing it.
        getMin():
            // precondition: heap.size() > 0
            return heap[0]

        // Add an element to the priority queue.
        add(elem):
            i = heap.size()
            heap.add(i, elem)  // Add the element at end of the heap.
            siftUp(i)          // Put it in its correct place.

        // Remove and return the minimum element.
        removeMin():
            // precondition: heap.size() > 0
            removed = heap[0]
            i = heap.size() - 1
            last = heap.remove(i)  // Find and remove the last element.
            if heap.size() > 0:
                heap[0] = last     // Replace the root with the last element.
                siftDown(0)        // Put the new root in its correct place.
            return removed

        // Sift a value down the tree, return its new position.
        siftDown(pos):
            while not isLeaf(pos):
                child = getLeftChild(pos)
                right = getRightChild(pos)  // or: right = child + 1
                if right < heap.size() and heap[right] < heap[child]:
                    child = right   // 'child' is now the index of the child with smaller value
                if heap[child] >= heap[pos]:
                    return pos
                swap(pos, child)
                pos = child   // Move down one level in the tree.
            return pos

        // Sift a value up the tree, return its new position.
        siftUp(pos):
            while pos > 0:
                parent = getParent(pos)
                if heap[pos] >= heap[parent]:
                    return pos
                swap(pos, parent)
                pos = parent   // Move up one level in the tree.
            return pos

        // Return true if pos is a leaf position.
        isLeaf(pos):
            return pos >= heap.size() / 2

        // Return the position for the left child of the given node.
        getLeftChild(pos):
            return 2 * pos + 1

        // Return the position for the right child of the given node.
        getRightChild(pos):
            return 2 * pos + 2

        // Return the position for the parent. Returns 0 if we're already at the root.
        getParent(pos):
            return int((pos - 1) / 2)

        // Swap the values in two positions.
        swap(pos1, pos2):
            heap[pos1], heap[pos2] = heap[pos2], heap[pos1]


This datatype makes two concessions to the fact that an
array-based implementation is used. First, heap nodes are indicated by
their logical position within the heap rather than by a pointer to the
node. In practice, the logical heap position corresponds to the
identically numbered physical position in the array. Second, the
constructor takes as input a pointer to the array to be used. This
approach provides the greatest flexibility for using the heap because
all data values can be loaded into the array directly by the client.
The advantage of this comes during the heap construction phase, as
explained below. The constructor also takes an integer parameter
indicating the initial size of the heap (based on the number of
elements initially loaded into the array) and a second integer
parameter indicating the maximum size allowed for the heap (the size
of the array).

The datatype contains some private auxiliary methods that are use when
adding and removing elements from the heap: `isLeaf(pos)` returns `true`
if position `pos` is a leaf in the tree, and `false` otherwise. Methods
`getLeftChild`, `getRightChild`, and `getParent` return the position
(actually, the array index) for the left child, right child, and parent
of the position passed, respectively.

One way to build a heap is to insert the elements one at a time.
Method `add` will insert a new element $V$ into the heap.

<inlineav id="heapinsertCON" src="Binary/heapinsertCON.js" script="DataStructures/binaryheap.js" name="Heap insert Slideshow"/>

You might expect the heap insertion process to be similar to the insert
function for a BST, starting at the root and working down through the
heap. However, this approach is not likely to work because the heap must
maintain the shape of a complete binary tree. Equivalently, if the heap
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

<avembed id="heapinsertPRO" src="Binary/heapinsertPRO.html" type="pe" name="Heap Insert Proficiency Exercise"/>


### Invariants



### Building a heap

If all $n$ values are available at the beginning of the building
process, we can build the heap faster than just inserting the values
into the heap one by one. Consider this example, with two possible ways
to heapify an initial set of values in an array.

:::: {#HeapBuild}
<inlineav id="HeapBldChoiceCON" src="Binary/HeapBldChoiceCON.js" script="DataStructures/binaryheap.js" name="Heap Build Choices" links="Binary/HeapBldChoiceCON.css"/>

Two series of exchanges to build a max heap. (a) This heap is built by a
series of nine exchanges in the order (4-2), (4-1), (2-1), (5-2), (5-4),
(6-3), (6-5), (7-5), (7-6). (b) This heap is built by a series of four
exchanges in the order (5-2), (7-3), (7-1), (6-1).
::::

From this example, it is clear that the heap for any given set of
numbers is not unique, and we see that some rearrangements of the input
values require fewer exchanges than others to build the heap. So, how do
we pick the best rearrangement?

One good algorithm stems from induction. Suppose that the left and right
subtrees of the root are already heaps, and $R$ is the name of the
element at the root. This situation is illustrated by this figure:

:::: {#HeapInduct}
<inlineav id="HeapsIndCON" src="Binary/HeapsIndCON.js" name="Binary/HeapsIndCON" links="Binary/HeapsIndCON.css" static/>

Final stage in the heap-building algorithm. Both subtrees of node $R$
are heaps. All that remains is to push $R$ down to its proper level in
the heap.
::::

In this case there are two possibilities.

(1) $R$ has a value greater than or equal to its two children. In this
    case, construction is complete.
(2) $R$ has a value less than one or both of its children.

$R$ should be exchanged with the child that has greater value. The
result will be a heap, except that $R$ might still be less than one or
both of its (new) children. In this case, we simply continue the process
of "pushing down" $R$ until it reaches a level where it is greater
than its children, or is a leaf node. This process is implemented by the
private method `siftDown`.

This approach assumes that the subtrees are already heaps, suggesting
that a complete algorithm can be obtained by visiting the nodes in some
order such that the children of a node are visited *before* the node
itself. One simple way to do this is simply to work from the high index
of the array to the low index. Actually, the build process need not
visit the leaf nodes (they can never move down because they are already
at the bottom), so the building algorithm can start in the middle of the
array, with the first internal node.

Here is a visualization of the heap build process.

<inlineav id="heapbuildCON" src="Binary/heapbuildCON.js" script="DataStructures/binaryheap.js" name="Heapbuild Slideshow"/>

Method `buildHeap` implements the building algorithm.

<avembed id="heapbuildPRO" src="Binary/heapbuildPRO.html" type="pe" name="Heap Build Proficiency Exercise"/>

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
\sum_{i=1}^{\log n} (i-1)\frac{n}{2^i}
= \frac{n}{2}\sum_{i=1}^{\log n} \frac{i-1}{2^{i-1}}
$$

The summation on the right
[is known](#summation){.term} to
have a closed-form solution of approximately 2, so this algorithm takes
$O(n)$ time in the worst case. This is far better than building the
heap one element at a time, which would cost $O(n \log n)$ in the
worst case. It is also faster than the $O(n \log n)$ average-case
time and $O(n^2)$ worst-case time required to build the BST.

<inlineav id="heapbuildProofCON" src="Binary/heapbuildProofCON.js" script="DataStructures/binaryheap.js" name="Heap build analysis proof Slideshow" links="Binary/heapbuildProofCON.css"/>

### Removing from the heap

<inlineav id="heapmaxCON" src="Binary/heapmaxCON.js" script="DataStructures/binaryheap.js" name="Remove Max Slideshow"/>

Because the heap is $\log n$ levels deep, the cost of deleting the
maximum element is $O(\log n)$ in the average and worst cases.

<avembed id="heapremovePRO" src="Binary/heapremovePRO.html" type="pe" name="Heap Remove Exercise"/>

|

<inlineav id="heapremoveCON" src="Binary/heapremoveCON.js" script="DataStructures/binaryheap.js" name="Remove Any Slideshow"/>


### Binary heaps as priority queues

The heap is a natural implementation for the priority queue discussed at
the beginning of this section. Jobs can be added to the heap (using
their priority value as the ordering key) when needed. Method
`removeMin` can be called whenever a new job is to be executed.

Priority queues can be helpful for solving graph problems such as
the [single-source shortest paths problem]{.term} and
finding the [minimal-cost spanning tree]{.term}.

For a story about Priority Queues and dragons, see
[Computational Fairy Tales: Stacks, Queues, Priority Queues, and the Prince's Complaint Line][EXT]

[EXT]: http://computationaltales.blogspot.com/2011/04/stacks-queues-priority-queues-and.html

### Changing the priority of elements

For some applications, objects might get their priority modified. One
solution in this case is to remove the object and reinsert it. To do
this, the application needs to know the position of the object in the
heap. Another option is to change the priority value of the object,
and then update its position in the heap. Note that a remove operation
implicitly has to do this anyway, since when the last element in the
heap is swapped with the one being removed, that value might be either
too small or too big for its new position. So we use a utility method
called `update` in both the `remove` and `modify` methods to handle
this process.

Some applications of priority queues require the ability to change the
priority of an object already stored in the queue. This might require
that the object's position in the heap representation be updated.
Unfortunately, a min heap is not efficient when searching for an
arbitrary value; it is only good for finding the minimum value. However,
if we already know the index for an object within the heap, it is a
simple matter to update its priority (including changing its position to
maintain the heap property) or remove it.

A typical implementation for priority queues requiring updating of
priorities will need to use an auxiliary data structure that supports
efficient search for objects (such as a BST). Records in the auxiliary
data structure will store the object's heap index, so that the
object's priority can be updated.

