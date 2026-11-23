
## Binary search trees {#search-trees:BSTs}

::: TODO
- Done?
:::

A *binary search tree* (BST) is a binary tree where every node satisfies the following ordering invariant:

::: {.invariant #inv:bst-invariant}
#### Invariant: Binary search trees
For every node with key $k$:

- all keys in the left subtree are *smaller* than $k$, and
- $k$ is *smaller* than all keys in the right subtree.
:::

\newpage

The only thing that differentiates a BST from a normal binary tree is this invariant.
As explained in @sec:analysis-1:invariants,
an invariant is a condition that the BST *always* must satisfy.
This means that binary heaps are *not* BSTs, such as the example tree in @fig:HeapTreeExample `\parpageref{}`{=latex}.
And conversely, a BST cannot be a binary heap, because the BST and the heap invariants are incompatible.
Instead, @fig:BST-example shows four correct BSTs.
Note that all these trees represent the same set of keys,
which means that if we use them to implement a *set*,
then they should be indistinguishable for the program that makes use of them.
However, there is one important difference between the four trees:
the middle ones are much more *balanced* than the other two,
and this has consequences for the efficiency of the basic operations.

![
    Four example BSTs, all representing the same set of keys.
](images/11.1-BST-examples.svg){#fig:BST-example}

#### Implementing BST sets and maps

We can reuse the binary tree implementation from @sec:trees:binary-trees
to implement a set or a map:

    datatype BST:
        root = null  // Pointer to the root node of the tree
        size = 0     // Size of the tree

    datatype BSTNode:
        left     // Pointer to left child (can be null)
        right    // Pointer to right child (can be null)
        key      // Key for this node
       (value)   // Value for this node (only used when implementing a map)

In most programming languages it is not possible to specify invariants,
so it is the responsibility of the programmer to make sure that they are never violated.
Note that the BST invariant implies that all *keys* in the tree are distinct from each other,
which is exactly what we need to implement a set or a map.
(The invariant does not say anything about the *values* in a map, only the keys.)
In the rest of this chapter we will mainly talk about how to implement sets, and
leave as an exercise to modify the data structures and algorithms to implement maps.

#### Implementing multisets and multimaps

A *multiset*, or a *bag*, is a collection that can contain duplicate keys,
and a *multimap* (@sec:ADTs:multimaps) allows duplicate values for each key.
They are easy to implement as BSTs, we just have to relax the invariant a little.
Instead of requiring that all children are strictly smaller or larger than the node key,
we can say that the *left* children are smaller *or equal* to the parent,
while the right children are still always larger.
(It is just a convention that we let the left children be equal --
we could instead have chosen the right children.)

### Searching in a BST

Because of the BST invariant, we do not have to search the whole tree if we want to find an element.
Instead, we start at the root node and compare its key with the key we are searching for.
If the key is smaller than the root, we continue searching in the left subtree.
(And conversely, if the key is larger, we search in the right subtree.)
We continue searching until we have found the key in a node.
If we end up in an empty child (that is, a `null` node), we know that the key is not in the tree.

What should our search function return?
Sometimes we just want to know if the key is present or not,
sometimes we want to return the associated value (if the BST is a map),
and sometimes we want to do something else.
The most general solution is to return the whole node; but what should the function return if the key is not present?
[](#alg:bst-search) returns the *last visited* node in that case --
this is the closest possible node where the key could have been,
and will prove very useful when we implement insertion and deletion in @sec:search-trees:updating-BSTs.

::: {.algorithm #alg:bst-search}
#### Algorithm: Searching in a BST
To search a BST for a key $k$, initialise the current node $n$ to the root, and the parent node $p$ to `null`.
Then repeat the following:

- If $n$ is an empty node (`null`), return the parent $p$.
- Compare $k$ with the key of $n$:
    - If they are equal, return the node $n$.
    - Otherwise, assign $p$ to $n$, and $n$ to its left or right child,
      depending on whether $k$ is smaller or larger than the key of $n$.

Here is how it can look in pseudocode:

```pseudo
    function search(tree, key) -> BSTNode:
        current = tree.root; parent = null
        while current is not null:
            if key = current.key: return current  // We found the key
            parent = current  // We have to do this before updating current
            if key < current.key: current = current.left
            if key > current.key: current = current.right
        return parent  // We did not find the key
```
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

<!-- OPENDSA: START --
When writing a recursive function to solve a problem that requires
traversing a binary tree, we want to make sure that we are visiting the
required nodes (no more and no less).
-- OPENDSA: END -->

In @sec:trees:bintree-traversal we discussed how to *traverse* a tree by visiting every node recursively.
There are different traversal strategies, such as depth-first and breadth-first search.
<!-- In this section we have also discussed searching, adding and removing in a BST,
which each go down a single path of the tree. -->
In a BST we can also use *guided traversal*, where we do not visit every node in the tree.
Instead we make use of the BST invariant to decide if we can avoid visiting some subtrees.
Searching for a specific key is an example of guided traversal:
in every step we select at most one child to visit.
But there are also problems that require looking at more than one path through the tree.
This means that the recursive function makes a decision for each node,
typically based on the key of the current node,
that sometimes lets it avoid visiting one or both of its children.

::: {.example #ex:keys-within-range}
#### Example: The number of keys within a range

Assume that you use a BST to store a set of keys,
and you want to know how many keys $k$ there are within a given range $[a,b]$.
A bad solution would be to visit every node of the tree and test if $a\leq k\leq b$.
However, we can take advantage of the BST invariant to avoid visiting unnecessary nodes:
We do not have to visit the left subtree at all if the key is smaller than $a$, $k<a$.
And, conversely, we do not have to visit the right subtree if $k>b$.
:::


::: dsvis
Here is a visualisation of the previous example of counting the number of keys within a range.

``` {.jsav-animation src="Binary/IneffBinaryTreeRangeCON.js" links="Binary/BSTCON.css" name="Inefficient Binary Tree Traversal on Range Slide Show"}
```
:::
