
## General trees

::: TODO
- Prio 3: update text
- Prio 3: add use cases
- Prio ?: Include some of the set-theoretical definitions?
:::

Binary trees are important, but there are also plenty of uses for trees 
with an arbitrary number of children. For instance the file system 
example in the beginning of this chapter is not a binary tree 
(a folder can contain more than two items).


<!--
### Definitions and terminology

A [tree]{.term} $T$ is a finite set of
one or more nodes such that there is one designated node $r$, called the
root of $T$. If the set $(T -\{r\})$ is not empty,
these nodes are partitioned into $n > 0$ disjoint sets $T_0$,
$T_1$, \..., $T_{n-1}$, each of which is a tree, and
whose roots $r_1, r_2, ..., r_n$, respectively, are children of $r$. The
subsets $T_i (0 \leq i < n)$ are said to be
[subtrees]{.term} of $T$.
These subtrees are ordered in that $T_i$ is said to come before
$T_j$ if $i < j$. By convention, the subtrees are arranged from
left to right with subtree $T_0$ called the leftmost child of
$r$. A node's [out degree]{.term} is the number
of children for that node. A [forest]{.term} is
a collection of one or more trees.
@Fig:GeneralTree presents further tree
notation generalised from the notation for binary trees.

::: {.jsav-figure #fig:GeneralTree}
``` {src="General/GenTreeCON.js" links="General/GenTreeCON.css"}
```
Notation for general trees.
Node **P** is the parent of nodes **V**, **S1**, and **S2**.
Thus, **V**, **S1**, and **S2** are children of **P**.
Nodes **R** and **P** are ancestors of **V**.
Nodes **V**, **S1**, and **S2** are called [siblings]{.term}.
The oval surrounds the subtree having **V** as its root.
:::

Each node in a tree has precisely one parent, except for the root, which
has no parent. From this observation, it immediately follows that a tree
with $n$ nodes must have $n-1$ edges because each node, aside from the
root, has one edge connecting that node to its parent.
-->

### ADT for general trees

We want our general trees to support the same operations as our binary trees. 
That is, given a tree, we need access to the root node of it. 
There also must be some way to access the children of a node. 
Since general trees have an arbitrary number of children, we can not have 
a variable name for each of them (as we did for binary trees with `right`/`left`).

If order of children is important, a node containing a **List** of children 
makes sense.
This list can be an array-based list or a linked list or even a dynamic
function generating the children on demand. The only thing we assume is
that it follows the **List** ADT, as described in @sec:general-lists.

    // General tree nodes
    datatype GTNode of T:
        value: T                  // This is the value, just as for binary nodes
        children: List of GTNode  // All children of the node

As you may recall, a list of nodes is sometimes referred to as a forest. 
That makes little sense here as it would mean every tree contains a forest.

### Traversing a general tree

There are three traditional
[tree traversals]{.tree} for [binary trees](#binary-tree){.term}:
[preorder](#preorder-traversal){.term}, [postorder](#postorder-traversal){.term},
and [inorder](#inorder-traversal){.term} (see @sec:traversing-binary-trees).
For general trees, preorder and postorder traversals are
defined with meanings similar to their binary tree counterparts.
Preorder traversal of a general tree first visits the root of the tree,
then performs a preorder traversal of each subtree from left to right 
(start to end of the list of children). Postorder is generalized in a 
similar way, with the processing of a value happening after the 
recursive processing of the children.

Inorder traversal does not have a natural definition for the general tree,
because there is no particular number of children for an internal node.
An arbitrary definition -- such as visit the leftmost subtree in
inorder, then the root, then visit the remaining subtrees in inorder --
can be invented, but has little use as a general pattern.

::: dsvis
Visualisation of preorder traversal.

``` {.jsav-animation src="General/GenTreePreTravCON.js" links="General/GenTreeCON.css" name="General Tree Preorder Traversal Slideshow"}
```
:::

To perform a preorder traversal, it is necessary to visit each of the
children for a given node (say $r$) from left to right. This is
accomplished by starting at $r$'s leftmost child (call it $T$). From $T$,
we can move to $T$'s right sibling, and then to that node's right
sibling, and so on.

::: dsvis
Visualisation of postorder traversal.

``` {.jsav-animation src="General/GenTreePostTravCON.js" links="General/GenTreeCON.css" name="General Tree Postorder Traversal Slideshow"}
```
:::

Using the General Tree class shown above, here are implementations to
process the nodes of a general tree in preorder and in postorder.
The code is very simple, but this is because we defer all the complexity
to the underlying **List** implementation of the children.

    function preorder(node):
        process(node)
        for each child in node.children:
            preorder(child)

    function postorder(node):
        for each child in node.children:
            postorder(child)
        process(node)

Note that unlike a binary tree, this general tree does not contain any null values.
A leaf is represented as a node with an empty list of children, not a node with two 
null children. Depending on the intended application, it may however need to be possible
to represent an empty tree. If that is done by a null value, then only the root of a 
general tree can be null, but a child node is never null.
