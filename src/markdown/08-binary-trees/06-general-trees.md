
## General trees

::: TODO
- Prio 3: update text
- Prio 3: add use cases
:::

Many organisations are hierarchical in nature, such as the military and
most businesses. Consider a company with a president and some number of
vice presidents who report to the president. Each vice president has
some number of direct subordinates, and so on. If we wanted to model
this company with a data structure, it would be natural to think of the
president in the root node of a tree, the vice presidents at level 1,
and their subordinates at lower levels in the tree as we go down the
organisational hierarchy.

Because the number of vice presidents is likely to be more than two,
this company's organisation cannot easily be represented by a binary
tree. We need instead to use a tree whose nodes have an arbitrary number
of children. Unfortunately, when we permit trees to have nodes with an
arbitrary number of children, they become much harder to implement than
binary trees. We consider such trees in this chapter. To distinguish
them from binary trees, we use the term [general tree]{.term}.

In this section we will examine general tree terminology and define
a basic class for general trees.


### Definitions and terminology

A [tree]{.term} $\mathbf{T}$ is a finite set of
one or more nodes such that there is one designated node $R$, called the
root of $\mathbf{T}$. If the set $(\mathbf{T} -\{R\})$ is not empty,
these nodes are partitioned into $n > 0$ disjoint sets $\mathbf{T}_0$,
$\mathbf{T}_1$, \..., $\mathbf{T}_{n-1}$, each of which is a tree, and
whose roots $R_1, R_2, ..., R_n$, respectively, are children of $R$. The
subsets $\mathbf{T}_i (0 \leq i < n)$ are said to be
[subtrees]{.term} of $\mathbf{T}$.
These subtrees are ordered in that $\mathbf{T}_i$ is said to come before
$\mathbf{T}_j$ if $i < j$. By convention, the subtrees are arranged from
left to right with subtree $\mathbf{T}_0$ called the leftmost child of
$R$. A node's [out degree]{.term} is the number
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

### ADT for general trees

Before discussing general tree implementations, we should first make
precise what operations such implementations must support. Any
implementation must be able to initialise a tree. Given a tree, we need
access to the root of that tree. There must be some way to access the
children of a node. In the case of binary tree nodes, this
was done by providing instance variables for the
left and right child pointers. Unfortunately, because we do not know in
advance how many children a given node will have in the general tree, we
cannot give explicit functions to access each child. An alternative must
be found that works for an unknown number of children.

One choice would be to provide a function that takes as its parameter
the index for the desired child. That combined with a function that
returns the number of children for a given node would support the
ability to access any node or process all children of a node.
Unfortunately, this view of access tends to bias the choice for node
implementations in favour of an array-based approach, because these
functions favour random access to a list of children.

An alternative is to provide access to a **List** of the children pointers.
This list can be an array-based list or a linked list or even a dynamic
function generating the children on demand. The only thing we will assume is
that it follows the **List** ADT, as described in @sec:general-lists.

    // General tree nodes
    datatype GTNode of T:
        elem: T                   // This is the value, just as for binary nodes
        children: List of GTNode  // All children of the node


### Traversing a general tree

There are three traditional
[tree traversals]{.tree} for [binary trees](#binary-tree){.term}:
[preorder](#preorder-traversal){.term}, [postorder](#postorder-traversal){.term},
and [inorder](#inorder-traversal){.term} (see @sec:traversing-a-binary-tree).
For general trees, preorder and postorder traversals are
defined with meanings similar to their binary tree counterparts.
Preorder traversal of a general tree first visits the root of the tree,
then performs a preorder traversal of each subtree from left to right. A
postorder traversal of a general tree performs a postorder traversal of
the root's subtrees from left to right, then visits the root. Inorder
traversal does not have a natural definition for the general tree,
because there is no particular number of children for an internal node.
An arbitrary definition -- such as visit the leftmost subtree in
inorder, then the root, then visit the remaining subtrees in inorder --
can be invented. However, inorder traversals are generally not useful
with general trees.

::: dsvis
Visualisation of preorder traversal.

``` {.jsav-animation src="General/GenTreePreTravCON.js" links="General/GenTreeCON.css"}
```
:::

To perform a preorder traversal, it is necessary to visit each of the
children for a given node (say $R$) from left to right. This is
accomplished by starting at R's leftmost child (call it $T$). From $T$,
we can move to $T$'s right sibling, and then to that node's right
sibling, and so on.

::: dsvis
Visualisation of postorder traversal.

``` {.jsav-animation src="General/GenTreePostTravCON.js" links="General/GenTreeCON.css"}
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

