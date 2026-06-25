
## Binary heaps {#heaps:binary-heaps}

::: TODO
- Prio 1: update figures
- Prio 1: remove some code (replace with text)
- Prio 1: move subsection "Building a heap" to a separate online section (together with Heapsort)
:::

The [binary heap]{.term} is a data structure that can be used to implement an efficient priority queue.
It is organised as a tree that satisfies the heap property and has an additional invariant: it must also be a [complete binary tree]{.term}.

Recall that a complete binary tree has all levels completely filled except possibly the last, and the last level is filled from left to right.
As a result, a complete binary tree with $n$ nodes has exactly one possible shape.
Because of this structure, the height $h$ of the tree satisfies: $2^h \le n \le 2^{h+1} - 1$, which implies that the height is $O(\log n)$.
Complete binary trees are therefore balanced, and any operation that takes time proportional to the height of the tree runs in $O(\log n)$ time.

Using a complete tree has several advantages:

* It ensures that the tree remains balanced after adding an element to the tree.
* A new element can only be placed in one specific position -- the next available spot on the lowest level -- so we do not need to decide where to insert it.
* The tree can be stored directly in an array, making the implementation simple and space-efficient.

### Representing complete binary trees as arrays

Since a complete binary tree has exactly one possible shape for a given number of nodes, we can take advantage of this structure and store it -- perhaps surprisingly -- directly in an array.
Unlike other binary tree representations, we do not need explicit pointers to parent or child nodes.
This leads to a simple and compact implementation of [complete binary trees]{.term}.
Instead of pointers, the positions of a node's parent and children can be determined using simple index calculations.

To represent a complete binary tree in an array, we assign a unique array index to each node according to its position in the tree.
The nodes are numbered level by level, starting at the root and proceeding from left to right within each level.
The root node is assigned index 0, its left child index 1, its right child index 2, and so on.
This systematic numbering ensures that a node's position in the array directly corresponds to its logical position in the tree.
As a result, the indices of a node's parent and children can be computed easily using simple arithmetic.
@Fig:example_complete_bintree illustrates this scheme with a complete binary tree containing 12 nodes.

::: {#fig:example_complete_bintree}
:::: online
```jsav-figure
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
::::

:::: latex
```
                                  ___ 0 ___
                                /           \
                              1               2
                            /   \           /   \
                          3       4       5       6
                         / \     / \     /
                        7   8   9  10   11
```
::::

Complete binary tree node numbering.
:::

An array can store the values of a complete binary tree efficiently by placing each value at the array index corresponding to the node's position in the tree.
If the tree is traversed in *breadth-fist order* (see @sec:trees:traversal), the nodes are visited in increasing index order: $0, 1, 2, \ldots, n-1$.
In other words, the nodes of the tree are stored in the array level by level, with each level appearing consecutively.
As an example, the binary heap shown in @fig:HeapTreeExample can be stored in an array as shown in @fig:HeapArrayExample.

::: {#fig:HeapTreeExample}
:::: online
```jsav-figure
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
::::

:::: latex
```
                        ________ 8 ________
                       /                   \
                    17                       12
                 /      \                 /      \
              33         [28]          43          15
             /  \        /  \         /
           34    87    75    34     47
```
::::

An example binary heap, where a smaller value indicates a higher priority.
The node containing the value "28" is highlighted, its parent has the value "17" and the children are "75" and "34".
:::



::: {#fig:HeapArrayExample}
:::: online
```jsav-figure
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
::::

:::: latex
```
            parent           NODE               leftchild  rightchild
               ↓              ↓                        ↓    ↓
        [  8 | 17 | 12 | 33 | 28 | 43 | 15 | 34 | 87 | 75 | 34 | 47 ]
```
::::

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

\begin{align*}
\text{parent}(i) &= \left\lfloor \frac{i - 1}{2} \right\rfloor  & (\text{if} & i \neq 0)   \\
\text{left}(i)   &= 2i + 1                                      & (\text{if} & 2i + 1 < n) \\
\text{right}(i)  &= 2i + 2                                      & (\text{if} & 2i + 2 < n)
\end{align*}

For example, the left child of node at position 4 (which contains the value 28) is at
index $\text{left}(4) = 2 \cdot 4 + 1 = 9$ (which contains the value 75).

::: dsvis
Here is a practice exercise for calculating the array indices of nodes.

```{.jsav-embedded src="Binary/CompleteFIB.html" type="ka" name="Complete Tree Exercise"}
```
:::

::: note
Some course books and implementations put the root in position 1 in the array,
and leave the cell at position 0 empty (or use it for temporary values).
Doing this changes the arithmetic for calculating the relatives.
Beware of this if you happen to read another text about binary heaps!
:::


::: dsvis
Here is a practice exercise for calculating the array indices of nodes.

```{.jsav-embedded src="Binary/CompleteFIB.html" type="ka" name="Complete Tree Exercise"}
```
:::

### Using dynamic arrays

So, arrays are a compact and efficient representation of complete binary trees.
But they cannot change their size, and if we want to implement a priority queue
we have to be able to add and remove elements quickly.

Therefore we should not use arrays, but instead *dynamic arrays*.
Recall from @sec:sequences:dynamic-arrays that they are just like arrays,
but you can also add elements to the end of the array, and also remove from the end.
In our pseudocode below we will assume that we can index them as normal arrays,
but they also have special methods `addLast` and `removeLast` that grow and shrink
the array with one element.


### Implementing binary heaps

It is important not to confuse the logical representation of a heap with its physical implementation.
Logically, a heap is a tree structure that satisfies the heap property.
In practice, however, it is implemented using a dynamic array that represents a complete binary tree.

When describing heap operations, we will usually explain them in terms of tree operations,
since this makes the behavior of the algorithms easier to understand conceptually.
Nevertheless, it is important to remember that in an actual implementation these operations
are carried out using array indices and array updates, rather than explicit tree pointers.


<!--
    datatype BinaryHeap implements PriorityQueue:
        arr = new DynamicArray()   // The dynamic array storing the heap
-->


<!--
The implementation uses the standard less-than (<) operator to compare elements.
The exact definition of this operator determines the priority ordering of the elements in the heap.
-->

<!--
When constructing a heap, you can specify how elements of type `T` should be compared by providing a function that determines whether its first argument is less than its second argument.
By default, this comparison uses the standard less-than operator, which results in a minimum heap where smaller elements have higher priority.
-->

<!--
Note that because the heap is stored in an array, we refer to nodes by their logical position in the heap rather than by pointers to node objects.
In practice, this logical position corresponds directly to the same index in the underlying array, so the node's position in the heap and its position in the array are identical.
-->

<!--
The data type includes several private auxiliary functions used when inserting and removing elements from the heap.
The function `isLeaf` determines whether a given position corresponds to a leaf node in the tree, while `leftChild`, `rightChild`, and `parent` return the positions of the left child, right child, and parent of a given node, respectively.

    isLeaf(pos, size):
        return pos >= size / 2
    leftChild(pos):
        return 2 * pos + 1
    rightChild(pos):
        return 2 * pos + 2
    parent(pos):
        return int((pos - 1) / 2)

We also use an auxiliary function `swap(arr,i,j)` for swapping the values in cells $i$ and $j$ in in array.
(This is the same function as we used in Quicksort partition, see @sec:sorting-2:quicksort.)
-->

<!--
Finally, since we use a dynamic array we have to be able to resize the internal array.
This is explained in further detail in @sec:sequences:dynamic-arrays.

    resize(arr, capacity):
        oldArr = arr
        arr = new Array(capacity)
        for i in 0 .. oldArr.size-1:
            arr[i] = oldArr[i]

AG: we don't need to resize, we use a dynamic array.

-->

#### Checking the heap property

To start with, we define a function that verifies that a given binary heap satisfies the *heap property*:

    checkHeapPropery(heap):
        for pos in 1 .. heap.size-1:
            if heap[pos] < heap[parent(pos)]:
                return false
        return true

Note that we start the iteration from position 1:
this is because position 0 contains the root of the tree, and the root doesn't have a parent.

When implementing a data structure, it is often helpful to encode the invariants explicitly and verify them, possibly using assertions, within the various operations.
This can make it easier to detect errors and ensure that the data structure remains valid after each modification.

When modifying a data structure that must satisfy an invariant, the goal is to update the structure while ensuring the invariant still holds.
In practice, it is often easier to separate these steps: first perform the modification, even if this temporarily breaks the invariant, and then repair the structure to restore it.
We will follow this approach when defining the binary heap operations.

#### Getting the highest-priority element

Since the array satisfies the heap property, the element at index 0 is the root and will always contain the highest-priority element.
Therefore it is very efficient to take a little peek into which the next element will be, without modifying the heap.
Note that we first need to check that the heap is not empty, because then we will get an error message when trying to access index 0.


### Inserting into a heap

We want to be able to add elements to our heap.
Since we are using a dynamic array, there is only one place where we can insert a new element: at the end of the array.
However, the newly inserted element is not necessarily in the correct position, so the insertion may temporarily violate the heap invariant.
We must therefore restore the heap property after adding the new element.

The new element might have higher priority than its parent.
If this happens, we swap the new element with its parent.
We then repeat the same check from the new position, because the element may still have too high priority to remain there.
This process continues until the element either reaches the root or has a parent with higher priority.

Notice that we do not need to compare the new element with its parent's other child, if there is one.
Before the insertion, the heap already satisfied the heap invariant, so the parent had higher priority than both of its children.
Therefore, if the new element has higher priority than the parent, it must also have higher priority than the other child.
On the other hand, if the new element does not have higher priority than its parent, then it is already in the correct position.
So, to restore the heap invariant after insertion, it is enough to compare the new element only with its parent as it moves upward through the heap.
This process of moving the value up the tree is often called "bubble-up", "trickle-up", "swim-up" or "sift-up".

::: algorithm
#### Algorithm: Adding to a binary heap
To insert the value $v$ into a heap:

- Add $v$ to the end of the heap.
- Repeat until $v$ reaches its correct position:
    - Compare $v$ with its parent.
    - If $v$ has higher priority, swap it with the parent.
:::

Let us illustrate this using the heap from @fig:HeapTreeExample.
If we insert the value 10, we must first place it at the next free position, so that the tree remains complete.
For clarity, we show the heap as a tree, but you should keep in mind that it is actually stored as an array.

::: {#fig:HeapInsert10Step1}
:::: online
```jsav-figure
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
::::

:::: latex
```
                        ________ 8 ________
                       /                   \
                    17                       12
                 /      \                 /      \
              33          28           43          15
             /  \        /  \         /  \
           34    87    75    34     47   [10]
```
::::

After inserting 10, we place it at the next free position, shown here as the right child of 43.
:::

::: {#fig:HeapInsert10Step2}
:::: online
```jsav-figure
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
::::

:::: latex
```
                        ________ 8 ________
                       /                   \
                    17                       12
                 /      \                 /      \
              33          28          [10]         15
             /  \        /  \         /  \
           34    87    75    34     47    43
```
::::

Since 10 is smaller than its parent 43, the two elements swap positions.
:::

::: {#fig:HeapInsert10Step3}
:::: online
```jsav-figure
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
::::

:::: latex
```
                        ________ 8 ________
                       /                   \
                    17                      [10]
                 /      \                 /      \
              33          28           12          15
             /  \        /  \         /  \
           34    87    75    34     47    43
```
::::

The value 10 is still smaller than its new parent 12, so we swap once more.
Now 10 has parent 8, which is smaller, so the insertion is complete.
:::

::: dsvis
Here is a visual explanation of insertion into a *max*-heap.

``` {.jsav-animation src="Binary/heapinsertCON.js" scripts="DataStructures/binaryheap.js" name="Heap insert Slideshow"}
```
:::

The algorithm above can be translated to pseudocode quite straightforwardly:

    add(heap, elem):
        heap.addLast(elem)                 // Add the element to end of the heap.
        pos = heap.size - 1                // This is the position of the new element.
        while pos > 0 and heap[pos] < heap[parent(pos)]:
            swap(heap, pos, parent(pos))   // Swap the element with its parent.
            pos = parent(pos)              // Move up one level in the tree.

<!--
One common mistake is to start at the root and work yourself downwards through the heap.
However, this approach does not work because the heap must maintain the shape of a complete binary tree.
If we do not want to break the completeness property there is only one place where we can add an element, namely at the end of the dynamic array.
 -->

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

Heaps are usually used to implement priority queues, where we repeatedly remove the element with the highest priority.
This is the next element to be processed, and it is always stored at the root of the heap, at index 0 in the array.

To remove the highest-priority element, we remove the root.
However, we cannot simply leave the root empty, since this would violate the requirement that the heap remains a complete binary tree.
Instead, we remove the *last* element in the array, and replace the root with it.
This preserves completeness but may violate the heap property.

The new root may now have lower priority than one or both of its children.
Therefore we compare it with its children and swap it with the one that has higher priority.
It is essential to choose the smaller child --
otherwise, the heap property could still be violated after the swap.
Once the swap is performed, the element moves down the tree.
We repeat the process from the new position, until the element is in its correct place --
that is, until it has higher priority than both of its children, or it reaches a leaf.
At that point, the heap property is restored.
This process is often called "bubble-down", "trickle-down", "sink-down" or "sift-down".

::: algorithm
#### Algorithm: Remove the element with highest priority from a binary heap
To remove the highest-priority element, that is, the root of the heap:

- Delete the last element of the heap, and replace the root with it.
  Let the new root be $v$.
- Repeat until $v$ reaches its correct position:
    - Compare $v$ with its highest-priority child.
    - If the child has higher priority, swap them.
:::

::: dsvis
Here is a visual explanation of removing from a *max*-heap.

``` {.jsav-animation src="Binary/heapmaxCON.js" scripts="DataStructures/binaryheap.js" name="Remove Max Slideshow"}
```
:::

The complexity of this algorithm is logarithmic, $O(\log(n))$, of the same reason as adding an element:
Since the tree is complete, there are a logarithmic number of levels,
and the element travels downward by one level in each iteration.
In the worst case, it moves from the root all the way to a leaf.

Here is pseudocode for removing the highest-priority element:

    removeMin(heap):
        oldRoot = heap[0]             // Remember the current highest-priority element.
        heap[0] = heap.removeLast()   // Remove the last element from the array,
        pos = 0                       // and put it into the root position.
        child = smallestChild(heap, pos)
        while child is not null and heap[child] < heap[pos]:
            swap(heap, pos, child)             // Swap the element with its smallest child.
            pos = child                        // Move down one level in the tree.
            child = smallestChild(heap, pos)   // Find the next smallest child.
        return oldRoot                // Return the old root.

We use a helper function to identify the smallest child of a node.
If there are no children it returns null, so that the while loop above can stop.

    smallestChild(heap, pos):
        if left(pos) >= heap.size:                   // We are at a leaf.
            return null
        else if right(pos) >= heap.size:             // There is no right child.
            return left(pos)
        else if heap[left(pos)] < heap[right(pos)]:  // The left child has higher priority.
            return left(pos)
        else:                                        // The right child has higher priority.
            return right(pos)

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

### Changing the priority of elements {#heaps:change-priority}

In some applications, the priority of an element may change over time, or we may need to remove an element other than the root.
To support such operations efficiently, we must know the position of the element in the heap.

However, the heap invariant is not helpful for locating an arbitrary element.
It guarantees only that each node has higher priority than its children.
It does not tell us how elements are distributed across different subtrees.
As a result, when searching for a specific element, we cannot determine which subtree to explore next.
In the worst case, we must traverse the entire tree, which takes $O(n)$ time.

Once the element has been found, updating or removing it is straightforward.
To update the priority of an element, we restore the heap property by bubbling it up if its priority has increased, or down if its priority has decreased.
To remove an element, we remove the last element of the array and put it in the place of the element to be removed,
then we restore the heap property in the same way as when we updated the priority.

To avoid the costly $O(n)$ search, we can maintain an auxiliary data structure that keeps track of each element's position in the heap.
For example, we can use a lookup table, or map (see @sec:ADTs:maps), that associates each element with its index in the array.
If lookup in this table takes $O(\log(n))$ time, then updates and removals of arbitrary elements also take $O(\log(n))$ time,
because the remaining work consists only of restoring the heap property.
