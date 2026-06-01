
## Binary heaps

::: TODO
- Prio 1: remove some code (replace with text)
- Prio 1: move subsection "Building a heap" to a separate online section (together with Heapsort)
:::

The [binary heap]{.term} is a data structure that can be used to implement an efficient priority queue.
It is organized as a tree that satisfies the heap property and has an additional invariant: it must also be a [complete binary tree]{.term}.

Recall that a complete binary tree has all levels completely filled except possibly the last, and the last level is filled from left to right.
As a result, a complete binary tree with $n$ nodes has exactly one possible shape.
Because of this structure, the height $h$ of the tree satisfies: $2^h \le n \le 2^{h+1} - 1$, which implies that the height is $O(\log n)$.
Complete binary trees are therefore balanced, and any operation that takes time proportional to the height of the tree runs in $O(\log n)$ time.

Using a complete tree has several advantages:

* It ensures that the tree remains balanced after adding an element to the tree.
* A new element can only be placed in one specific position—the next available spot on the lowest level—so we do not need to decide where to insert it.
* The tree can be stored directly in an array, making the implementation simple and space-efficient.

### Representing complete binary trees as arrays

Since a complete binary tree has exactly one possible shape for a given number of nodes, we can take advantage of this structure and store it—perhaps surprisingly—directly in an array.
Unlike other binary tree representations, we do not need explicit pointers to parent or child nodes.
This leads to a simple and compact implementation of [complete binary trees]{.term}.
Instead of pointers, the positions of a node’s parent and children can be determined using simple index calculations.

To represent a complete binary tree in an array, we assign a unique array index to each node according to its position in the tree.
The nodes are numbered level by level, starting at the root and proceeding from left to right within each level.
The root node is assigned index 0, its left child index 1, its right child index 2, and so on.
This systematic numbering ensures that a node’s position in the array directly corresponds to its logical position in the tree.
As a result, the indices of a node’s parent and children can be computed easily using simple arithmetic.
@Fig:example_complete_bintree illustrates this scheme with a complete binary tree containing 12 nodes.

::: {.jsav-figure #fig:example_complete_bintree}
```
let av = NewAV();
let bt = av.ds.binarytree({nodegap: 25});
let rt = bt.root("0");
rt.left("1");
rt.right("2");
rt.left().left("3");
rt.left().right("4");
rt.right().left("5");
rt.right().right("6");
rt.left().left().left("7");
rt.left().left().right("8");
rt.left().right().left("9");
rt.left().right().right("10");
rt.right().left().left("11");
bt.layout();
av.displayInit();
av.recorded();
```
Complete binary tree node numbering.
:::

An array can store the values of a complete binary tree efficiently by placing each value at the array index corresponding to the node's position in the tree.
If the tree is traversed level by level, the nodes are visited in increasing index order: $0, 1, 2, \ldots, n-1$.
In other words, the nodes of the tree are stored in the array level by level, with each level appearing consecutively.

Consider the binary heap shown in @fig:HeapTreeExample:

::: {.jsav-figure #fig:HeapTreeExample}
```
let av = NewAV();
let bt = av.ds.binarytree({nodegap: 25});
let rt = bt.root("8");
rt.left("17");
rt.right("12");
rt.left().left("33");
rt.left().right("28").highlight();
rt.right().left("43");
rt.right().right("15");
rt.left().left().left("34");
rt.left().left().right("87");
rt.left().right().left("75");
rt.left().right().right("47");
rt.right().left().left("47");
bt.layout();
av.displayInit();
av.recorded();
```
An example binary heap, where a smaller value indicates a higher priority.
The node containing the value "28" is highlighted, its parent has the value "17" and the children are "75" and "47".
:::

This tree can be stored in an array as shown in @fig:HeapArrayExample:

::: {.jsav-figure #fig:HeapArrayExample}
```
var av = NewAV();
AddCSS(`.jsavpointerarea {border: none; background-color: transparent}`);
var theArray = ["8", "17", "12", "33", "28", "43", "15", "34", "87", "75", "47", "47"];
var arr = av.ds.array(theArray, {indexed: true, left: 240, top: 40});
arr.highlight(4);
av.pointer("", arr, {left: -1, targetIndex: 4, anchor:"top", myAnchor:"bottom"});
av.pointer("parent", arr, {left: -15, targetIndex: 1, anchor:"right top", myAnchor:"left bottom"});
av.pointer("left child", arr, {left: -35, targetIndex: 9});
av.pointer("right child", arr, {left: -20, targetIndex: 10, anchor:"right top", myAnchor:"left bottom"});
console.log(arr);
av.displayInit();
av.recorded();
```
Array representation of the example heap in @fig:HeapTreeExample.
The highlighted node "28" is highlighted here too, and the parent, and left and right children are indicated.
:::

<!-- TODO: convert this into a JSAV figure
::: latex
\begin{center}
\scalebox{0.8}{
\begin{tikzpicture}
    % Draw array boxes
    \foreach \i/\val in {0/A, 1/L, 2/G, 3/O, 4/R, 5/I} {
        \draw (\i*1.5, 0) rectangle ++(1.5, 1);
        \node at (\i*1.5 + 0.75, 0.5) {\val};
        \node[below=3pt] at (\i*1.5 + 0.75, 0) {\i};
    }
    \draw[->] (1*1.5 + 0.75, 1) to[out=60, in=120] node[below] {left} (3*1.5 + 0.75, 1);
    \draw[->] (1*1.5 + 0.75, 1) to[out=70, in=110] node[above] {right} (4*1.5 + 0.75, 1);
    \draw[->] (1*1.5 + 0.75, 1) to[out=120, in=60] node[above] {parent} (0*1.5 + 0.75, 1);
\end{tikzpicture}
}
\end{center}
::: -->

<!-- ![Array representation of the example heap](images/ArrayHeap.png){width=40% #fig:HeapArrayExample} -->

You can use simple formulas to compute the array index of a node's relatives in a complete binary tree with $n$ nodes, given a node at index $i$:

- $\text{parent}(i) = \left\lfloor \frac{i - 1}{2} \right\rfloor$ (if $i \neq 0$)
- $\text{leftChild}(i) = 2i + 1$ (if $2i + 1 < n$)
- $\text{rightChild}(i) = 2i + 2$ (if $2i + 2 < n$)

For example, the left child of node at position 4 (which contains the value 28) is at index $2 \cdot 4 + 1 = 9$ (which contains the value 75).

::: dsvis
Here is a practice exercise for calculating the array indices of nodes.

```{.jsav-embedded src="Binary/CompleteFIB.html" type="ka" name="Complete Tree Exercise"}
```
:::

### Implementing binary heaps

It is important not to confuse the logical representation of a heap with its physical implementation.
Logically, a heap is a tree structure that satisfies the heap property.
In practice, however, it is implemented using an array that represents a complete binary tree.

When describing heap operations, we will usually explain them in terms of tree operations, since this makes the behavior of the algorithms easier to understand conceptually.
Nevertheless, it is useful to remember that in an actual implementation these operations are carried out using array indices and array updates, rather than explicit tree pointers.

We present an implementation for a minimum heap.
It uses a dynamic array (see @sec:dynamic-arrays) that will resize automatically when the number of elements change.

    datatype MinHeap of T implements PriorityQueue of T:
        heap = new DynamicArray of T
        size = 0                       // The initial heap is empty

The implementation uses the standard less-than (<) operator to compare elements of type `T`.
The exact definition of this operator for values of type `T` determines the priority ordering of the elements in the heap.

<!--
When constructing a heap, you can specify how elements of type `T` should be compared by providing a function that determines whether its first argument is less than its second argument.
By default, this comparison uses the standard less-than operator, which results in a minimum heap where smaller elements have higher priority.
-->

<!--
Note that because the heap is stored in an array, we refer to nodes by their logical position in the heap rather than by pointers to node objects.
In practice, this logical position corresponds directly to the same index in the underlying array, so the node’s position in the heap and its position in the array are identical.
-->

The data type includes several private auxiliary methods used when inserting and removing elements from the heap.
The method `isLeaf` determines whether a given position corresponds to a leaf node in the tree, while `leftChild`, `rightChild`, and `parent` return the positions of the left child, right child, and parent of a given node, respectively.

In addition, we include a convenience method that compares the values of two nodes based on their positions in the heap.

    datatype MinHeap:
        ...
        isLeaf(pos):
            return pos >= size / 2
        leftChild(pos):
            return 2 * pos + 1
        rightChild(pos):
            return 2 * pos + 2
        parent(pos):
            return int((pos - 1) / 2)
        less(i, j):
            return heap.get(i) < heap.get(j)

We also need an auxiliary method for swapping two elements in the heap.

    datatype MinHeap:
        ...
        swap(i, j):
            temp = heap.get(i)
            heap.set(i, heap.get(j))
            heap.set(j, temp)

<!--
Finally, since we use a dynamic array we have to be able to resize the internal array.
This is explained in further detail in @sec:dynamic-arrays.

    datatype MinHeap:
        ...
        resizeHeap(newCapacity):
            oldHeap = heap
            heap = new Array(newCapacity)
            for i in 0 .. size-1:
                heap[i] = oldHeap[i]

AG: we don't need to resize, we use a dynamic array.

-->

Finally, we define a method that verifies that the data structure satisfies the heap property.

    datatype MinHeap:
        ...
        invariant():
            for pos in 1 .. size - 1:
                if less(pos, parent(pos)):
                    return false
            return true

Note that we do not need to check the completeness property, since the heap is stored in an array and arrays cannot contain gaps between elements.

When implementing a data structure, it is often helpful to encode the invariants explicitly and verify them, possibly using assertions, within the various operations.
This can make it easier to detect errors and ensure that the data structure remains valid after each modification.

When modifying a data structure that must satisfy an invariant, the goal is to update the structure while ensuring the invariant still holds.
In practice, it is often easier to separate these steps: first perform the modification, even if this temporarily breaks the invariant, and then repair the structure to restore it.
We will follow this approach when defining the heap operations.

#### Retrieving the highest-priority element

Since the structure satisfies the heap property, the element at index 0, the root of a non-empty heap, always contains the element with the highest priority.

    datatype MinHeap:
        ...
        getMin():
            return heap.get(0)

Note that the above definition does not account for the case where the heap is empty.
Attempting to retrieve the first element of an empty dynamic array would fail, and therefore this method would fail as well.
For the sake of brevity, we omit such sanity checks here and in the remainder of the chapter.

### Inserting into a heap

We want to be able to add elements to our heap.
To preserve the completeness invariant, there is only one place where we can insert a new element: at the end of the array.
However, the newly inserted element is not necessarily in the correct position, so the insertion may temporarily violate the heap invariant.
We must therefore restore the heap property after adding the new element.

The new element might have higher priority than its parent.
In a min-heap, this means that the new element is smaller than its parent.
If this happens, we swap the new element with its parent.
We then repeat the same check from the new position, because the element may still be too small to remain there.
This process continues until the element either reaches the root or has a parent with higher priority.

Notice that we do not need to compare the new element with its parent's other child, if there is one.
Before the insertion, the heap already satisfied the heap invariant, so the parent had higher priority than both of its children.
Therefore, if the new element has higher priority than the parent, it must also have higher priority than the other child.
On the other hand, if the new element does not have higher priority than its parent, then it is already in the correct position.
So, to restore the heap invariant after insertion, it is enough to compare the new element only with its parent as it moves upward through the heap.

Here is a summary of how to insert a new element $V$ into a heap:

- Put $V$ at the end of the array.
- Compare $V$ with its parent.
- If $V$ has higher priority, swap it with the parent.
- Repeat until $V$ reaches the correct position.

Let us illustrate this using the heap from @fig:HeapTreeExample.
If we insert the value 10, we must first place it at the next free position, so that the tree remains complete.
For clarity, we show the heap as a tree, but you should keep in mind that it is actually stored as an array.

::: {.jsav-figure #fig:HeapInsert10Step1}
```
let av = NewAV();
let bt = av.ds.binarytree({nodegap: 25});
let rt = bt.root("8");
rt.left("17");
rt.right("12");
rt.left().left("33");
rt.left().right("28");
rt.right().left("43");
rt.right().right("15");
rt.left().left().left("34");
rt.left().left().right("87");
rt.left().right().left("75");
rt.left().right().right("47");
rt.right().left().left("47");
rt.right().left().right("10").highlight();
bt.layout();
av.displayInit();
av.recorded();
```
After inserting 10, we place it at the next free position, shown here as the right child of 43.
:::

::: {.jsav-figure #fig:HeapInsert10Step2}
```
let av = NewAV();
let bt = av.ds.binarytree({nodegap: 25});
let rt = bt.root("8");
rt.left("17");
rt.right("12");
rt.left().left("33");
rt.left().right("28");
rt.right().left("10").highlight();
rt.right().right("15");
rt.left().left().left("34");
rt.left().left().right("87");
rt.left().right().left("75");
rt.left().right().right("47");
rt.right().left().left("47");
rt.right().left().right("43");
bt.layout();
av.displayInit();
av.recorded();
```
Since 10 is smaller than its parent 43, the two elements swap positions.
:::

::: {.jsav-figure #fig:HeapInsert10Step3}
```
let av = NewAV();
let bt = av.ds.binarytree({nodegap: 25});
let rt = bt.root("8");
rt.left("17");
rt.right("10").highlight();
rt.left().left("33");
rt.left().right("28");
rt.right().left("12");
rt.right().right("15");
rt.left().left().left("34");
rt.left().left().right("87");
rt.left().right().left("75");
rt.left().right().right("47");
rt.right().left().left("47");
rt.right().left().right("43");
bt.layout();
av.displayInit();
av.recorded();
```
The value 10 is still smaller than its new parent 12, so we swap once more.
Now 10 has parent 8, which is smaller, so the insertion is complete.
:::

::: dsvis
Here is a visual explanation of insertion into a *max*-heap.

``` {.jsav-animation src="Binary/heapinsertCON.js" scripts="DataStructures/binaryheap.js" name="Heap insert Slideshow"}
```
:::

Here is the pseudocode for insertion in a *min*-heap.
Note that we use a helper method for "sifting" a value up the tree.

    datatype MinHeap:
        ...
        add(elem):
            heap.add(elem)         // Add the element at end of the heap.
            siftUp(size)           // Put it in its correct place.
            size = size + 1        // Increase the size of the heap.

        siftUp(pos):
            while pos > 0 and less(pos, parent(pos)):  // Continue as long as the parent is larger
                swap(pos, parent(pos))
                pos = parent(pos)       // Move up one level in the tree.

One common mistake is to start at the root and work yourself downwards through the heap.
However, this approach does not work because the heap must maintain the shape of a complete binary tree.
If we do not want to break the completeness property there is only one place where we can add an element, namely at the end of the dynamic array.

Since a heap is a complete binary tree, its height is as small as possible for the number of nodes it contains.
A heap with $n$ nodes therefore has height $O(\log(n))$.
Intuitively, this is because each new level in the tree can contain twice as many nodes as the previous level.
The $i$th level contains $2^i$ nodes, and the first $i+1$ levels together contain $2^{i+1} - 1$ nodes.
So the number of levels grows logarithmically with the number of nodes.

Each call to `add` takes $O(\log(n))$ time in the worst case.
This is because the inserted element can move upward by at most one level at a time.
In the worst case, it moves from the last level all the way to the root.
Therefore, inserting $n$ values one at a time takes $O(n \log(n))$ time in the worst case.

::: dsvis
#### Exercise: Insert into a *min*-heap

```{.jsav-embedded src="Binary/heapinsertPRO.html" type="pe" name="Heap Insert Proficiency Exercise"}
```
:::

### Removing from a heap

Heaps are often used to implement priority queues, where we repeatedly remove the element with the highest priority.
This is the next element to be processed.

Finding this element is straightforward: it is always stored at the root of the heap, at index 0 in the array.
In a min-heap, this is the smallest element.

To remove the highest-priority element, we remove the root.
However, we cannot simply leave the root empty, since this would violate the requirement that the heap remains a complete binary tree.
Instead, we replace the root with the last element in the array.
We then reduce the size of the heap by one.
This preserves completeness but may violate the heap property.

The new root may now have lower priority than one or both of its children.
To restore the heap property, we sift the element down the tree.
At each step, we compare it with its children and swap it with the one that has higher priority.
In a min-heap, this means swapping with the smaller of the two children.

It is essential to choose the smaller child.
Otherwise, the heap property could still be violated after the swap.
Once the swap is performed, the element moves down the tree, and we repeat the process from its new position.

This procedure continues until the element is in the correct position.
That is, it has higher priority than both of its children, or it reaches a leaf.
At that point, the heap property is restored.

Here is a summary of how to remove the highest-priority element $V$ from a heap:

- Swap the root element with the last element.
- Reduce the size of the heap by one.
- Compare the new root with its highest-priority child.
- If the child has higher priority, swap them.
- Repeat until the element reaches the correct position.

::: dsvis
Here is a visual explanation of removing from a *max*-heap.

``` {.jsav-animation src="Binary/heapmaxCON.js" scripts="DataStructures/binaryheap.js" name="Remove Max Slideshow"}
```
:::

Each call to `removeMin` takes $O(\log(n))$ time in the worst case.
This is because the element moved to the root can travel downward by at most one level at a time.
In the worst case, it moves from the root all the way to a leaf.

Here is the pseudocode for removing the minimum element from a min-heap.
Note that we use a helper method to sift an element down the tree, as well as another helper method to identify the smaller of its children.

    datatype MinHeap:
        ...
        removeMin():
            min = getMin()       // Remember the current minimum, to return in the end.
            swap(0, size-1)      // Swap the last element into the first position.
            heap.remove(size-1)  // Remove the last element from the array
            size = size - 1      // and decrease the size.
            siftDown(0)          // Put the new root in its correct place.
            return min

        siftDown(pos):
            while not isLeaf(pos):       // Stop when we reach a leaf (if not earlier).
                child = smallestChild(pos)
                if less(child, pos):
                    swap(child, pos)     // Swap to fix the heap property and
                    pos = child          // continue one level down in the tree.
                else:
                    return               // Stop if the parent is smaller or equal.

        smallestChild(pos):
            left = leftChild(pos)
            right = rightChild(pos)
            if right < size and less(right, left):  // Check if there is a right child and if it is smaller
                return right
            else:
                return left

<!-- AG: should we add an example again? probably not -->

::: dsvis
#### Exercise: Delete from a min-heap

```{.jsav-embedded src="Binary/heapremovePRO.html" type="pe" name="Heap Remove Exercise"}
```
:::

<!-- Don't include removing of arbitrary nodes
::: dsvis
#### Removing arbitrary nodes

``` {.jsav-animation src="Binary/heapremoveCON.js" scripts="DataStructures/binaryheap.js" name="Remove Any Slideshow"}
```
:::
-->

### Changing the priority of elements

In some applications, the priority of an element may change over time, or we may need to remove an element other than the root.
To support such operations efficiently, we must know the position of the element in the heap.

However, the heap invariant is not helpful for locating an arbitrary element.
It guarantees only that each node has higher priority than its children.
It does not tell us how elements are distributed across different subtrees.
As a result, when searching for a specific element, we cannot determine which subtree to explore next.
In the worst case, we must traverse the entire tree, which takes $O(n)$ time.

Once the element has been found, updating or removing it is straightforward.
To remove an element, we swap it with the last element in the heap, reduce the size of the heap by one, and then restore the heap property.
Depending on how the replacement element compares with its parent and children, we may need to sift it either up or down.
To update the priority of an element, we again restore the heap property by sifting it up if its priority increases, or down if its priority decreases.

To avoid the costly $O(n)$ search, we can maintain an auxiliary data structure that keeps track of each element's position in the heap.
For example, we can use a lookup table, or map, that associates each element with its index in the array.
We will introduce this data structure later in [Chapter @sec:sets-and-maps].
If lookup in this table takes $O(\log(n))$ time, then updates and removals of arbitrary elements also take $O(\log(n))$ time, because the remaining work consists only of restoring the heap property.
