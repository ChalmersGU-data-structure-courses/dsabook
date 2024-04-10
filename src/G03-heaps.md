
## Heaps and Priority Queues

There are many situations, both in real life and in computing
applications, where we wish to choose the next "most important" from a
collection of people, tasks, or objects. For example, doctors in a
hospital emergency room often choose to see next the "most critical"
patient rather than the one who arrived first. When scheduling programs
for execution in a multitasking operating system, at any given moment
there might be several programs (usually called
[jobs](#job){.term}) ready to run. The next job
selected is the one with the highest [priority]{.term}. Priority is indicated by a particular value associated
with the job (and might change while the job remains in the wait list).

When a collection of objects is organized by importance or priority, we
call this a [priority queue]{.term}. A normal
queue data structure will not implement a priority queue efficiently
because search for the element with highest priority will take
$\Theta(n)$ time. A list, whether sorted or not, will also require
$\Theta(n)$ time for either insertion or removal. A BST that organizes
records by priority could be used, with the total of $n$ inserts and $n$
remove operations requiring $\Theta(n \log n)$ time in the average case.
However, there is always the possibility that the BST will become
unbalanced, leading to bad performance. Instead, we would like to find a
data structure that is guaranteed to have good performance for this
special application.

This section presents the [heap]{.term}[^G03a] data
structure. A heap is defined by two properties. First, it is a complete
binary tree, so heaps are nearly always implemented using the
[array representation for complete binary trees](#array-implementation-for-complete-binary-trees).
Second, the values stored in a heap are
[partially ordered](#partial-order){.term}. This
means that there is a relationship between the value stored at any node
and the values of its children. There are two variants of the heap,
depending on the definition of this relationship.

[^G03a]: Note that the term "heap" is also sometimes used to refer to
    [free store]{.term}.

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

Min heaps and max heaps both have their uses. For example, the Heapsort
uses the max heap, while the Replacement Selection algorithm used for
external sorting uses a min heap. The examples in the rest of this
section will sometimes use a min and sometimes a max heap.

Be sure not to confuse the logical representation of a heap with its
physical implementation by means of the array-based complete binary
tree. The two are not synonymous because the logical view of the heap is
actually a tree structure, while the typical physical implementation
uses an array.

Here is an implementation for min heaps. The class uses records that
support the Comparable interface to provide flexibility.

```python
class MinHeap(PriorityQueue):
     # The heap array.
     # Note that we use Python's internal lists, which are dynamic,
     # so we don't have to implement resizing.
    _heap : list

    # Constructor supporting preloading of heap contents
    def __init__(self, h = None):
        if h is None:
            self._heap = []
        else:
            self._heap = list(h) # Make a copy of h
        self._buildHeap()

    def isEmpty(self):
        """Return true if there are no elements."""
        return self.size() == 0

    def size(self):
        """Return current size of the heap."""
        return len(self._heap)

    def getMin(self):
        """Return smallest item into heap."""
        if self.size() == 0: raise IndexError("getMin from empty heap")
        return self._heap[0]

    def add(self, elem):
        """Insert elem into heap."""
        self._heap.append(elem)            # New item starts at end of heap.
        self._siftUp(len(self._heap) - 1)  # Put the new value in its correct place.

    def removeMin(self):
        """Remove and return minimum value."""
        if len(self._heap) == 0: raise IndexError("removeMin from empty heap")
        removed = self._heap[0]
        last = self._heap.pop()     # Find and remove last element
        if len(self._heap) > 0:
            self._heap[0] = last    # Replace root with last element
            self._siftDown(0)       # Put the new root in its correct place.
        return removed

    def __str__(self):
        return str(self._heap)

    def __repr__(self):
        return repr(self._heap)

    def __iter__(self):
        return iter(self._heap)

    # Private helper methods

# /* *** ODSATag: invariant *** */
    def _checkInvariant(self):
        """Check that the invariant holds."""

        heapSize = len(self._heap)
        for i in range(heapSize):
            left = self._getLeftChild(i)
            right = self._getRightChild(i)
            if left < heapSize and self._lessThan(left, i):
                raise AssertionError("Parent (" + i + ") is smaller than its left child: " + self._heap[i] + " < " + self._heap[left]);
            if right < heapSize and self._lessThan(right, i):
                raise AssertionError("Parent (" + i + ") is smaller than its right child: " + self._heap[i] + " < " + self._heap[right]);
# /* *** ODSAendTag: invariant *** */

    def _isLeaf(self, pos):
        """Return true if pos is a leaf position, false otherwise."""
        return pos >= len(self._heap) // 2

    def _getLeftChild(self, pos):
        """Return the position for the left child of the given node."""
        return 2*pos+1

    def _getRightChild(self, pos):
        """Return the position for the right child of the given node."""
        return 2*pos+2

    def _getParent(self, pos):
        """Return the position for the parent. Returns 0 if we're already at the root."""
        return (pos-1) // 2

    def _swap(self, pos1, pos2):
        """Swap the values in two positions."""
        self._heap[pos1], self._heap[pos2] = self._heap[pos2], self._heap[pos1]

    def _buildHeap(self):
        """Heapify the contents of an array."""
        heapSize = len(self._heap)
        # Loop from heapSize/2-1 down to 0
        for pos in reversed(range(heapSize//2)):
            self._siftDown(pos)

    def _siftDown(self, pos):
        """Sift a value down the tree, return its new position."""
        heapSize = len(self._heap)
        while not self._isLeaf(pos):
            child = self._getLeftChild(pos)
            right = child + 1   # or: self._getRightChild(pos)
            if right < heapSize and self._lessThan(right, child):
                child = right   # 'child' is now the index of the child with smaller value
            if not self._lessThan(child, pos):
                return pos
            self._swap(pos, child)
            pos = child   # Move down one level in the tree.

        return pos

    def _siftUp(self, pos):
        """Sift a value up the tree, return its new position."""
        while pos > 0:
            parent = self._getParent(pos)
            if not self._lessThan(pos, parent):
                return pos
            self._swap(pos, parent)
            pos = parent   # Move up one level in the tree.
        return pos

    def _lessThan(self, i, j):
        # Compare the values in the given positions.
        return self._heap[i] < self._heap[j]
```

```java
// Min-heap implementation
class MinHeap<E extends Comparable<E>> implements PriorityQueue<E> {
    private E[] heap;       // The heap array
    private int heapSize;   // Size of heap, and index of the next free slot

    static int MinCapacity = 8;               // Minimum capacity of heap
    static double MinLoadFactor = 0.5;        // Must be smaller than 1/CapacityMultiplier
    static double CapacityMultiplier = 1.5;   // Factor to grow/shrink the capacity

    // Constructor supporting preloading of heap contents
    @SuppressWarnings("unchecked")
    MinHeap() {
        heap = (E[]) new Comparable[MinCapacity];
        heapSize = 0;
    }

    MinHeap(E[] h) {
        heap = Arrays.copyOf(h, h.length);
        heapSize = heap.length;
        buildHeap();
        if (heapSize < MinCapacity)
            resizeHeap(MinCapacity);
    }

    // Return true if there are no elements.
    public boolean isEmpty() {
        return heapSize == 0;
    }

    // Return current size of the heap
    public int size() {
        return heapSize;
    }

    public E getMin() {
        if (!(heapSize > 0)) throw new NoSuchElementException("getMin from empty heap");
        return heap[0];
    }

    // Insert val into heap
    public void add(E elem) {
        if (heapSize >= heap.length)
            resizeHeap((int) (heap.length * CapacityMultiplier));
        heap[heapSize] = elem;  // Start at end of heap.
        siftUp(heapSize);       // Put the new value in its correct place.
        heapSize++;
    }

    // Remove and return minimum value
    public E removeMin() {
        if (!(heapSize > 0)) throw new NoSuchElementException("removeMin from empty heap");
        E removed = heap[0];
        heapSize--;
        swap(0, heapSize);  // Swap the root with the current last value.
        if (heapSize > 0) 
            siftDown(0);    // Put the new heap root val in its correct place.
        if (heapSize <= heap.length * MinLoadFactor)
            resizeHeap((int) (heap.length / CapacityMultiplier));
        heap[heapSize] = null;   // Remove the old root value, for garbage collection.
        return removed;
    }

    public String toString() {
        return Arrays.toString(heap).replace("null", "-") + heapSize;
    }

    public Iterator<E> iterator() {
        return null;
    }

    ////////////////////////////////////////////////////////////////////////////////
    // Private helper methods

/* *** ODSATag: invariant *** */
    // Check that the invariant holds.
    void checkInvariant() {
        for (int i = 0; i < heapSize; i++) {
            int left = getLeftChild(i);
            int right = getRightChild(i);
            if (left < heapSize && lessThan(left, i))
                throw new AssertionError("Parent (" + i + ") is smaller than its left child: " + heap[i] + " < " + heap[left]);
            if (right < heapSize && lessThan(right, i))
                throw new AssertionError("Parent (" + i + ") is smaller than its right child: " + heap[i] + " < " + heap[right]);
        }
    }
/* *** ODSAendTag: invariant *** */

/* *** ODSATag: resize *** */
    private void resizeHeap(int newCapacity) {
        if (newCapacity < MinCapacity) return;
        @SuppressWarnings("unchecked")
        E[] newHeap = (E[]) new Comparable[newCapacity];
        for (int i = 0; i < heapSize; i++)
            newHeap[i] = heap[i];
        heap = newHeap;
    }
/* *** ODSAendTag: resize *** */

    // Return true if pos is a leaf position, false otherwise.
    private boolean isLeaf(int pos) {
        return pos >= heapSize / 2;
    }

    // Return the position for the left child of the given node
    private int getLeftChild(int pos) {
        return 2 * pos + 1;
    }

    // Return the position for the right child of the given node
    private int getRightChild(int pos) {
        return 2 * pos + 2;
    }

    // Return the position for the parent. Returns 0 if we're already at the root.
    private int getParent(int pos) {
        return (pos - 1) / 2;
    }

    // Swap the values in two positions
    private void swap(int pos1, int pos2) {
        E tmp = heap[pos1];
        heap[pos1] = heap[pos2];
        heap[pos2] = tmp;
    }

    // Heapify the contents of an array
    private void buildHeap() {
        for (int pos = heapSize/2-1; pos >= 0; pos--)
            siftDown(pos);
    }

    // Sift a value down the tree, return its new position.
    private int siftDown(int pos) {
        while (!isLeaf(pos)) {
            int child = getLeftChild(pos);
            int right = child + 1;   // or: getRightChild(pos)
            if (right < heapSize && lessThan(right, child))
                child = right;   // 'child' is now the index of the child with smaller value
            if (!lessThan(child, pos))
                return pos;
            swap(pos, child);
            pos = child;   // Move down one level in the tree.
        }
        return pos;
    }

    // Sift a value up the tree, return its new position.
    private int siftUp(int pos) {
        while (pos > 0) {
            int parent = getParent(pos);
            if (!lessThan(pos, parent))
                return pos;
            swap(pos, parent);
            pos = parent;   // Move up one level in the tree.
        }
        return pos;
    }

    // Compare the values in the given positions.
    private boolean lessThan(int i, int j) {
        return heap[i].compareTo(heap[j]) < 0;
    }
}
```



> This class definition makes two concessions to the fact that an
> array-based implementation is used. First, heap nodes are indicated by
> their logical position within the heap rather than by a pointer to the
> node. In practice, the logical heap position corresponds to the
> identically numbered physical position in the array. Second, the
> constructor takes as input a pointer to the array to be used. This
> approach provides the greatest flexibility for using the heap because
> all data values can be loaded into the array directly by the client.
> The advantage of this comes during the heap construction phase, as
> explained below. The constructor also takes an integer parameter
> indicating the initial size of the heap (based on the number of
> elements initially loaded into the array) and a second integer
> parameter indicating the maximum size allowed for the heap (the size
> of the array).

The class contains some private auxiliary methods that are use when
adding and removing elements from the heap: `isLeaf(pos)` returns `true`
if position `pos` is a leaf in the tree, and `false` otherwise. Members
`getLeftChild`, `getRightChild`, and `getParent` return the position
(actually, the array index) for the left child, right child, and parent
of the position passed, respectively.

One way to build a heap is to insert the elements one at a time. Method
`add` will insert a new element $V$ into the heap.

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
have a height of $\Theta(\log n)$. Intuitively, we can see that this
must be true because each level that we add will slightly more than
double the number of nodes in the tree (the $i$ th level has $2^i$
nodes, and the sum of the first $i$ levels is $2^{i+1}-1$). Starting at
1, we can double only $\log n$ times to reach a value of $n$. To be
precise, the height of a heap with $n$ nodes is
$\lceil \log n + 1 \rceil$.

Each call to `add` takes $\Theta(\log n)$ time in the worst case,
because the value being inserted can move at most the distance from the
bottom of the tree to the top of the tree. Thus, to insert $n$ values
into the heap, if we insert them one at a time, will take
$\Theta(n \log n)$ time in the worst case.

<avembed id="heapinsertPRO" src="Binary/heapinsertPRO.html" type="pe" name="Heap Insert Proficiency Exercise"/>

### Building a Heap

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
<inlineav id="HeapsIndCON" src="Binary/HeapsIndCON.js" name="Binary/HeapsIndCON" links="Binary/HeapsIndCON.css"/>

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
\begin{eqnarray}
\sum_{i=1}^{\log n} (i-1)\frac{n}{2^i}
&=& \frac{n}{2}\sum_{i=1}^{\log n} \frac{i-1}{2^{i-1}}
\end{eqnarray}
$$

The summation on the right
[is known](#summation){.term} to
have a closed-form solution of approximately 2, so this algorithm takes
$\Theta(n)$ time in the worst case. This is far better than building the
heap one element at a time, which would cost $\Theta(n \log n)$ in the
worst case. It is also faster than the $\Theta(n \log n)$ average-case
time and $\Theta(n^2)$ worst-case time required to build the BST.

<inlineav id="heapbuildProofCON" src="Binary/heapbuildProofCON.js" script="DataStructures/binaryheap.js" name="Heap build analysis proof Slideshow" links="Binary/heapbuildProofCON.css"/>

### Removing from the heap or updating an object's priority

<inlineav id="heapmaxCON" src="Binary/heapmaxCON.js" script="DataStructures/binaryheap.js" name="Remove Max Slideshow"/>

Because the heap is $\log n$ levels deep, the cost of deleting the
maximum element is $\Theta(\log n)$ in the average and worst cases.

<avembed id="heapremovePRO" src="Binary/heapremovePRO.html" type="pe" name="Heap Remove Exercise"/>

| 

<inlineav id="heapremoveCON" src="Binary/heapremoveCON.js" script="DataStructures/binaryheap.js" name="Remove Any Slideshow"/>

> For some applications, objects might get their priority modified. One
> solution in this case is to remove the object and reinsert it. To do
> this, the application needs to know the position of the object in the
> heap. Another option is to change the priority value of the object,
> and then update its position in the heap. Note that a remove operation
> implicitly has to do this anyway, since when the last element in the
> heap is swapped with the one being removed, that value might be either
> too small or too big for its new position. So we use a utility method
> called `update` in both the `remove` and `modify` methods to handle
> this process.

### Binary Heaps as Priority Queues

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

#### Changing the priority of elements

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

#### Practice Questions

<avembed id="HeapSumm" src="Binary/HeapSumm.html" type="ka" name="Heap Question Summary"/>
