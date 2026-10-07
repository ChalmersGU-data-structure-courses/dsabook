
## Binary heaps {#heaps:binary-heaps}

::: TODO
- Prio 1: add discussion + code for storing priority and element
- Prio 1: add figure about a complete tree
- Prio 1: remove some code (replace with text)
:::

The [binary heap]{.term} is a data structure that can be used to implement an efficient priority queue.
It is organised as a tree that satisfies the heap property and has an additional invariant:
it must also be a [complete binary tree]{.term}.

Recall from @sec:trees:unbalanced-perfect that a *perfect* binary tree is the most perfectly balanced tree,
where every level is completely filled.
Unfortunately, for most tree sizes it is not possible to form a perfect tree.
A *complete* tree is a generalisation that works for all possible sizes:
all its levels are completely filled *except possibly the last*, and the last level is filled from left to right.
As a result, every complete binary tree with $n$ nodes has exactly one possible shape.
@Fig:example-complete-trees shows some complete trees of different sizes,
where the left- and rightmost examples are also perfect trees.

![
    Examples of complete binary trees.
    Note that the left and right trees are also perfect.
](images/9.4-example-complete-trees.svg){#fig:example-complete-trees}

The height $h$ of a complete binary tree satisfies $2^h \le n < 2^{h+1}$, which implies that $h\in O(\log(n))$.
They are therefore balanced, and any operation that is linear in the height of the tree runs in $O(\log(n))$ time.
Using a complete tree has several advantages:

*   It has the smallest possible height for a given size --
    meaning that the constant factor in operations that depend on the height is as small as possible.
*   A new element can only be placed in one specific position --
    the next available spot on the lowest level -- so we do not need to decide where to insert it.
*   The tree can be stored directly in an array, making the implementation simple and space-efficient.

### Representing complete binary trees as arrays {#heaps:represent-complete-bintree}

If we traverse a complete binary tree in *breadth-first order* (as described in @sec:trees:bintree-traversal),
we will visit every node without encountering any "holes", or empty trees, on the way.
Because of this, it is possible to store the tree directly in an array.
Unlike other binary tree representations, we do not need explicit pointers to parent or child nodes.
This leads to a simple and compact implementation --
instead of pointers, the positions of the parent and children of a node can be determined using simple index calculations.

In this representation we assign a unique array index to each node according to its *breadth-first* position in the tree.
The nodes are numbered level by level, starting at the root and proceeding from left to right within each level.
The root node is assigned index $0$, its left child index $1$, its right child index $2$, and so on.
In other words, the nodes of the tree are stored in the array level by level, with each level appearing consecutively.
This systematic numbering ensures that a node's position in the array directly corresponds to its logical position in the tree.
An example binary heap together with its array representation is shown in @fig:HeapTreeExample.

![
    An example binary heap, where smaller values indicate higher priority,
    together with its array representation.
    The node containing the value "28" is highlighted, its parent has the value "17" and the children are "75" and "34".
](images/9.5-binheap-example.svg){#fig:HeapTreeExample}

As a result of the representation,
the indices of the parent and children of a node can be computed easily using simple arithmetic.
The following formulas compute the array index of the relatives of a nore at index $i$,
in a complete binary tree with $n$ nodes:

\begin{align*}
\text{parent}(i) &= \lfloor (i - 1)/2 \rfloor  & (\text{if~ } & i > 0)   \\
\text{left}(i)   &= 2i + 1                     & (\text{if~ } & 2i + 1 < n) \\
\text{right}(i)  &= 2i + 2                     & (\text{if~ } & 2i + 2 < n)
\end{align*}

For example, the left child of the node at position $4$ in the array in @fig:HeapTreeExample
(which contains the value 28) is at index $\text{left}(4) = 2 \cdot 4 + 1 = 9$
(which contains the value 75).

::: dsvis
Here is a practice exercise for calculating the array indices of nodes.
```{.jsav-embedded src="Binary/CompleteFIB.html" type="ka" name="Complete Tree Exercise"}
```
:::

::: note
#### Starting in position $0$ or $1$?
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

Arrays are a compact and efficient representation of complete binary trees.
But arrays cannot change size, and if we want to implement a priority queue
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

#### Getting the highest-priority element

Since the array satisfies the heap property,
the element at index $0$ is the root and will always contain the highest-priority element.
Therefore it is very efficient to take a little peek into which the next element will be, without modifying the heap.
Note that we first need to check that the heap is not empty,
because then we will get an error message when trying to access index $0$.

#### When the element is not the priority

So far we have assumed that the priority of an element is the same as the element itself.
However, this is often not the case.
For example, in a hospital emergency ward patients are prioritised for how urgent their condition is.
But in this case the "element" must contain a lot more information than just the priority --
at least their name and some personal identification number.
When we remove the highest priority patient from our priority queue, we want to get all their information and not just the priority.

There are several ways to implement this in a binary heap.
One simple solution is to let the heap consist of *pairs* $(p,e)$, where $p$ is the priority and $e$ is the actual element.
The normal way to compare pairs is *lexicographically*, by first comparing the left value (the priority),
and only compare the right value (the element) if the left values are equal.

A more general solution is to use *key-based comparison*, as discussed in @sec:sorting-1:comparing.
In that case we have to provide the key function when initialising the priority queue.
We leave to you to figure out the details how to implement this.
