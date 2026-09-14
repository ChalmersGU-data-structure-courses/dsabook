
## Binary heaps {#heaps:binary-heaps}

::: TODO
- Prio 1: add discussion + code for storing priority and element
- Prio 1: add figure about a complete tree
- Prio 1: remove some code (replace with text)
:::

The [binary heap]{.term} is a data structure that can be used to implement an efficient priority queue.
It is organised as a tree that satisfies the heap property and has an additional invariant: it must also be a [complete binary tree]{.term}.

A complete binary tree has all levels completely filled except possibly the last, and the last level is filled from left to right.
As a result, a complete binary tree with $n$ nodes has exactly one possible shape.
Because of this structure, the height $h$ of the tree satisfies: $2^h \le n < 2^{h+1}$, which implies that $h\in O(\log n)$.
Complete binary trees are therefore balanced, and any operation that is linear in the height of the tree runs in $O(\log n)$ time.
Using a complete tree has several advantages:

* It ensures that the tree remains balanced after adding an element to the tree.
* A new element can only be placed in one specific position -- the next available spot on the lowest level -- so we do not need to decide where to insert it.
* The tree can be stored directly in an array, making the implementation simple and space-efficient.

### Representing complete binary trees as arrays {#heaps:represent-complete-bintree}

Since a complete binary tree has exactly one possible shape for a given number of nodes,
we can take advantage of this structure and store it directly in an array.
Unlike other binary tree representations, we do not need explicit pointers to parent or child nodes.
This leads to a simple and compact implementation of [complete binary trees]{.term}.
Instead of pointers, the positions of a node's parent and children can be determined using simple index calculations.

To represent a complete binary tree in an array, we assign a unique array index to each node according to its position in the tree.
The nodes are numbered level by level, starting at the root and proceeding from left to right within each level.
The root node is assigned index $0$, its left child index $1$, its right child index $2$, and so on.
This systematic numbering ensures that a node's position in the array directly corresponds to its logical position in the tree.
As a result, the indices of a node's parent and children can be computed easily using simple arithmetic.

An array can store the values of a complete binary tree efficiently by placing each value at the array index corresponding to the node's position in the tree.
If the tree is traversed in *breadth-fist order* (see @sec:trees:traversal), the nodes are visited in increasing index order: $0, 1, 2, \ldots, n-1$.
In other words, the nodes of the tree are stored in the array level by level, with each level appearing consecutively.
An example binary heap is shown in @fig:HeapTreeExample, and its array representation is shown in @fig:HeapArrayExample.

![
    An example binary heap, where smaller values indicate higher priority.
    The node containing the value "28" is highlighted, its parent has the value "17" and the children are "75" and "34".
](images/9.5-binheap-example.svg){#fig:HeapTreeExample}

![
    The array representation of the binary heap in @fig:HeapTreeExample.
](images/9.5-binheap-array.svg){#fig:HeapArrayExample}


You can use simple formulas to compute the array index of a node's relatives in a complete binary tree with $n$ nodes, given a node at index $i$:

\begin{align*}
\text{parent}(i) &= \lfloor (i - 1)/2 \rfloor  & (\text{if~ } & i > 0)   \\
\text{left}(i)   &= 2i + 1                     & (\text{if~ } & 2i + 1 < n) \\
\text{right}(i)  &= 2i + 2                     & (\text{if~ } & 2i + 2 < n)
\end{align*}

For example, the left child of node at position $4$ (which contains the value 28) is at
index $\text{left}(4) = 2 \cdot 4 + 1 = 9$ (which contains the value 75).

::: dsvis
Here is a practice exercise for calculating the array indices of nodes.

```{.jsav-embedded src="Binary/CompleteFIB.html" type="ka" name="Complete Tree Exercise"}
```
:::

::: note
Some course books and implementations put the root in position $1$ in the array,
and leave the cell at position $0$ empty (or use it for temporary values).
Doing this changes the arithmetic for calculating the relatives.
Beware of this if you happen to read another text about binary heaps!
:::


::: dsvis
Here is a practice exercise for calculating the array indices of nodes.

```{.jsav-embedded src="Binary/CompleteFIB.html" type="ka" name="Complete Tree Exercise"}
```
:::

### Implementing binary heaps using dynamic arrays {#heaps:implement-using-dynmic-arrays}

So, arrays are a compact and efficient representation of complete binary trees.
But they cannot change their size, and if we want to implement a priority queue
we have to be able to add and remove elements quickly.

Therefore we should not use arrays, but instead *dynamic arrays*.
Recall from @sec:sequences:dynamic-arrays that they are just like arrays,
but you can also add elements to the end of the array, and also remove from the end.
In our pseudocode below we will assume that we can index them as normal arrays,
but they also have special methods `addLast` and `removeLast` that grow and shrink
the array with one element.

It is important not to confuse the logical representation of a heap with its physical implementation.
Logically, a heap is a tree structure that satisfies the heap property.
In practice, however, it is implemented using a dynamic array that represents a complete binary tree.

    datatype BinaryHeap = DynamicArray

When describing heap operations, we will usually explain them in terms of tree operations,
since this makes the behaviour of the algorithms easier to understand conceptually.
Nevertheless, it is important to remember that in an actual implementation these operations
are carried out using array indices and array updates, rather than explicit tree pointers.


#### Checking the heap property

As a simple example, we define a function that verifies that a given binary heap satisfies the *heap property*:

    checkHeapPropery(heap):
        for pos in 1 .. heap.size-1:
            if heap[pos] < heap[parent(pos)]:
                return false
        return true

Note that we start the iteration from position $1$:
this is because position $0$ contains the root of the tree, and the root doesn't have a parent.

When implementing a data structure, it is often helpful to encode the invariants explicitly and verify them, possibly using assertions, within the various operations.
This can make it easier to detect errors and ensure that the data structure remains valid after each modification.

When modifying a data structure that must satisfy an invariant, the goal is to update the structure while ensuring the invariant still holds.
In practice, it is often easier to separate these steps: first perform the modification, even if this temporarily breaks the invariant, and then repair the structure to restore it.
We will follow this approach when defining the binary heap operations.

#### Getting the highest-priority element

Since the array satisfies the heap property, the element at index $0$ is the root and will always contain the highest-priority element.
Therefore it is very efficient to take a little peek into which the next element will be, without modifying the heap.
Note that we first need to check that the heap is not empty, because then we will get an error message when trying to access index $0$.

