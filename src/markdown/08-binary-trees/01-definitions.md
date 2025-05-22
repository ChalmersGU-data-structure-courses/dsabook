
## Definitions and properties

::: TODO
- Prio 2: update section, here's what should be included:
    - General trees
    - Binary trees
    - Binary search trees
    - Properties
        - depth, size, branching factor
        - Perfect trees
        - Complete trees
        - Balanced trees
- Prio 2: merge quizzes (files 01q, 01q2), perhaps move to another section?
:::

A [binary tree]{.term} is made up of a finite
set of elements called [nodes](#node){.term}.
This set either is empty or consists of a node called the
[root]{.term} together with two binary trees,
called the left and right [subtrees](#subtree){.term}, which are disjoint from each other and from the root.
(Disjoint means that they have no nodes in common.) The roots of these
subtrees are [children](#child){.term} of the
root. There is an [edge]{.term} from a node to
each of its children, and a node is said to be the
[parent]{.term} of its children.

If $n_1, n_2, ..., n_k$ is a sequence of nodes in the tree such that
$n_i$ is the parent of $n_i+1$ for $1 \leq i < k$, then this sequence is
called a [path]{.term} from $n_1$ to $n_k$. The
[length]{.term} of the path is $k-1$. If there
is a path from node $R$ to node $M$, then $R$ is an
[ancestor]{.term} of $M$, and $M$ is a
[descendant]{.term} of $R$. Thus, all nodes in
the tree are descendants of the root of the tree, while the root is the
ancestor of all nodes. The [depth]{.term} of a
node $M$ in the tree is the length of the path from the root of the tree
to $M$. The [height]{.term} of a tree is the
depth of the deepest node in the tree. All nodes of depth $d$ are at
[level]{.term} $d$ in the tree. The root is the
only node at level 0, and its depth is 0. A
[leaf node]{.term} is any node that has two
empty children. An [internal node]{.term} is any
node that has at least one non-empty child.

::: topic
#### Example binary tree

Node $A$ is the root, and nodes $B$ and $C$ are $A$'s children.
Nodes $B$ and $D$ together form a subtree. Node $B$ has two
children: Its left child is the empty tree and its right child is $D$.
Nodes $A$, $C$, and $E$ are ancestors of $G$. Nodes $D$, $E$, and $F$
make up level 2 of the tree; node $A$ is at level 0. The edges from $A$
to $C$ to $E$ to $G$ form a path of length 3. Nodes $D$, $G$, $H$, and
$I$ are leaves. Nodes $A$, $B$, $C$, $E$, and $F$ are internal nodes.
The depth of $I$ is 3. The height of this tree is 3.

<inlineav id="BinExampCON" src="Binary/BinExampCON.js" name="Binary/BinExampCON" links="Binary/BinExampCON.css" static/>
:::

The figure above illustrates
the various terms used to identify parts of a binary tree.
The figure below illustrates an important
point regarding the structure of binary trees. Because *all* binary tree
nodes have two children (one or both of which might be empty), the two
binary trees in the figure are *not* the same.

:::
#### Two different binary trees

(a) is a binary tree whose root has a non-empty left child.
(b) is a binary tree whose root has a non-empty right child.
(c) is the binary tree of (a) with the missing right child made explicit.
(d) is the binary tree of (b) with the missing left child made explicit.

<inlineav id="BinDiffCON" src="Binary/BinDiffCON.js" name="Binary/BinDiffCON" links="Binary/BinDiffCON.css" static/>
::::

Two restricted forms of binary tree are sufficiently important to
warrant special names. Each node in a
[full binary tree](#full-tree){.term} is either
(1) an internal node with exactly two non-empty children or (2) a leaf.
A [complete binary tree]{.term} has a restricted
shape obtained by starting at the root and filling the tree by levels
from left to right. In the complete binary tree of height $d$, all
levels except possibly level $d$ are completely full. The bottom level
has its nodes filled in from the left side.

The figure below illustrates
the differences between full and complete binary trees. There is no
particular relationship between these two tree shapes; that is, the tree (a) is
full but not complete while the tree (b) is complete but
not full. The [heap](#heaps-and-priority-queues) data
structure is an example of a complete binary tree. The
[Huffman coding tree](#huffman-coding-trees) is an example of a full binary tree.

::: topic
#### Examples of full and complete binary trees

<inlineav id="FullCompCON" src="Binary/FullCompCON.js" name="Binary/FullCompCON" links="Binary/FullCompCON.css" static/>
::::

::: note
*Note*: While these definitions for full and complete binary tree are the
ones most commonly used, they are not universal. Because the common
meaning of the words "full" and "complete" are quite similar,
there is little that you can do to distinguish between them other
than to memorize the definitions. Here is a memory aid that you
might find useful: "Complete" is a wider word than "full", and
complete binary trees tend to be wider than full binary trees
because each level of a complete binary tree is as wide as possible.
:::


### Binary trees are recursive data structures

A [recursive data structure]{.term} is a data
structure that is partially composed of smaller or simpler instances of
the same data structure. For example,
[linked lists](#linked-list){.term} and
[binary trees](#binary-tree){.term} can be
viewed as recursive data structures. A list is a recursive data
structure because a list can be defined as either (1) an empty list or
(2) a node followed by a list. A binary tree is typically defined as (1)
an empty tree or (2) a node pointing to two binary trees, one its left
child and the other one its right child.

:::: {#ListRecDS}
<inlineav id="ListRecDSCON" src="Binary/ListRecDSCON.js" name="Binary/ListRecDSCON" links="Binary/RecursiveDSCON.css" static/>
::::

:::: {#BinRecDS}
<inlineav id="BinRecDSCON" src="Binary/BinRecDSCON.js" name="Binary/BinRecDSCON" links="Binary/RecursiveDSCON.css" static/>
::::

The recursive relationships used to define a structure provide a natural
model for any recursive algorithm on the structure.

Suppose you want to compute the sum of the values stored in a binary tree.
You can ask two friends to help you.

- The first friend will take the left subtree to sum it.
- The second friend will take the right subtree to sum it.
- The only thing you have to do is to sum the values that got from your friends.
- You don't need to think about how your friends (the recursive calls) calculated their sums, you just accept that they are correct.

::: dsvis
Here is a visual explanation of the same idea.

<inlineav id="SumBinaryTreeCON" src="Binary/SumBinaryTreeCON.js" name="Sum values in a Binary Tree Slide Show" links="Binary/RecursiveDSCON.css"/>
:::
