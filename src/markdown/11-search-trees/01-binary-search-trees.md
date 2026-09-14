
## Binary search trees {#search-trees:BSTs}

::: TODO
- Prio 1: only show map implementation - say that a set is a map without `value` (only `key`)
- Prio 1: move multisets behind maps (or remove?)
- Prio 1: can we reduce some code clutter?
- Prio 1: update text about "Guided information flow"
:::

A *binary search tree* (BST) is a binary tree that satisfies the following invariant:

::: example
#### Invariant: Binary search trees
For every node with value $v$:

- all values in the left subtree are *smaller* than $v$, and
- $v$ is *smaller* than all values in the right subtree.
:::

The only thing that differentiates a BST from a normal binary tree is this invariant.
As explained in @sec:analysis-1:invariants,
an invariant is a condition that the BST *always* must satisfy.
This means that the example tree from @sec:trees:binary-trees is not a BST, because it violates the invariant,
but @fig:BST-example shows four correct BSTs.
Note that all these trees represent the same set of values,
which means that if we use them to implement a *set*,
then they should be indistinguishable for the program that makes use of them.
However, there is one important difference between the four trees:
the middle ones are much more *balanced* than the other two,
and this has consequences for the efficiency of the basic operations.

![
    Four example BSTs, all representing the same set of values.
](images/10.1-BST-examples.svg){#fig:BST-example}

#### Implementing BST sets and maps

In most programming languages it is not possible to specify invariants,
but it is the responsibility of the programmer to make sure that the invariants are never violated.
Note that the BST invariant implies that all values in the tree are distinct from each other,
which is exactly what we need to implement a *set*.

To implement a set can reuse the binary tree implementation from @sec:trees:binary-trees:

    datatype BST:
        root = null   // Pointer to the root node of the tree
        size = 0      // Size of the tree

    datatype BSTNode:
        left     // Pointer to left child
        right    // Pointer to right child
        value    // Value for this node

#### Implementing multisets

A *multiset*, or a *bag*, is a collection of values that allows duplicates.
This is easy to implement as a BST, we just have to relax the invariant a little.
Instead of requiring that all children are strictly smaller or larger than the node value,
we can say that the *left* children are smaller *or equal* to the parent,
while the right children are still always larger.
(It is just a convention that we let the left children be equal -- we could also mirror it.)


#### Implementing maps

Now, how can we implement a *map* using a BST?
The only difference to a normal BST is that the nodes have to both a *key* and a *value*:

    datatype BSTMapNode:
        left      // Pointer to left child
        right     // Pointer to right child
        key       // Key for this node
        value     // Value for this node

The BST invariant should now only mention the *keys* in the subtrees, not the values.
This is the only difference between a map and a set, implemented as BSTs.
In the rest of this chapter we will mainly talk about how to implement *sets*, and
we trust that you are experienced enough to be able to modify the data structures and algorithms to implement maps.

### Searching in a BST

Because of the BST property, we do not have to search the whole tree if we want to find an element.
Instead, we can start at the root node and compare its value with the value we are searching for.
If the value is smaller than the root, we can continue searching in the left subtree.
(And conversely, if the value is larger, we can search in the right subtree.)
We continue searching until we have found the value in a node, or until we reach an empty child.
If we reach an empty child (a null node), we know that the value is not in the tree.

::: algorithm
#### Algorithm: Searching in a BST
To search a BST for a value $x$, we initialise a pointer to the root node, and repeat the following:

- If the pointer is an empty (null) node, return failure.
- Compare $x$ with the value of the pointed node:
    - If they are equal, return success.
    - Otherwise, move the pointer to the left or right child,
      depending on if $x$ is smaller or larger than the node value.
:::

::: dsvis
Searching in a BST can also be done recursively, and here is an interactive explanation of this.

``` {.jsav-animation src="Binary/BSTsearchCON.js" links="Binary/BSTCON.css" name="BST Search Slideshow"}
```
:::

::: dsvis
Here is an exercise on searching in a BST.

```{.jsav-embedded src="Binary/BSTsearchPRO.html" type="pe" name="BST Search Proficiency Exercise"}
```
:::

### Guided information flow

<!-- OPENDSA: START -->
When writing a recursive function to solve a problem that requires
traversing a binary tree, we want to make sure that we are visiting the
required nodes (no more and no less).
<!-- OPENDSA: END -->

In @sec:trees:bintree-traversal we saw several tree traversals that visited every node of the tree,
such as depth-first and breadth-first search.
In this section we have also discussed searching, adding and removing in a BST,
which each go down a single path of the tree.
<!-- OPENDSA: START -->
*Guided traversal* refers to problems that do not require visiting every node in the tree,
though they typically require looking at more than one path through the tree.
This means that the recursive function is making some decision at each node
that sometimes lets it avoid visiting one or both of its children.
The decision is typically based on the value of the current node.
Many problems that require information flow on binary search trees are "guided" in this way.

::: example
#### Example: The number of values within a range

Assume that you want to know how many values there are in a BST that are within a given range.
A bad solution to this problem would visit every node of the tree.
However, we can take advantage of the BST invariant to avoid visiting unnecessary nodes.
You know that the values greater than the root are always in the right subtree,
and those values less than the root are in the left subtree.
<!-- OPENDSA: END -->
Therefore, we do not have to visit the left subtree at all
if the node value is smaller than the minimum value in the range.
And, conversely, we do not have to visit the right subtree if the node is larger than the range maximum.
:::


::: dsvis
Here is a visualisation of the previous example of counting the number of values within a range.

``` {.jsav-animation src="Binary/IneffBinaryTreeRangeCON.js" links="Binary/BSTCON.css" name="Inefficient Binary Tree Traversal on Range Slide Show"}
```
:::
