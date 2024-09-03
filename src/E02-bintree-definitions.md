
## Definitions and Properties

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

:::: {#BinExample}
<inlineav id="BinExampCON" src="Binary/BinExampCON.js" name="Binary/BinExampCON" links="Binary/BinExampCON.css" static/>

A binary tree. Node $A$ is the root. Nodes $B$ and $C$ are $A$'s
children. Nodes $B$ and $D$ together form a subtree. Node $B$ has two
children: Its left child is the empty tree and its right child is $D$.
Nodes $A$, $C$, and $E$ are ancestors of $G$. Nodes $D$, $E$, and $F$
make up level 2 of the tree; node $A$ is at level 0. The edges from $A$
to $C$ to $E$ to $G$ form a path of length 3. Nodes $D$, $G$, $H$, and
$I$ are leaves. Nodes $A$, $B$, $C$, $E$, and $F$ are internal nodes.
The depth of $I$ is 3. The height of this tree is 3.
::::

:::: {#BinDiff}
<inlineav id="BinDiffCON" src="Binary/BinDiffCON.js" name="Binary/BinDiffCON" links="Binary/BinDiffCON.css" static/>

Two different binary trees. (a) A binary tree whose root has a non-empty
left child. (b) A binary tree whose root has a non-empty right child.
(c) The binary tree of (a) with the missing right child made explicit.
(d) The binary tree of (b) with the missing left child made explicit.
::::

[Figure #BinExample](#BinExample) illustrates
the various terms used to identify parts of a binary tree.
[Figure #BinDiff](#BinDiff) illustrates an important
point regarding the structure of binary trees. Because *all* binary tree
nodes have two children (one or both of which might be empty), the two
binary trees of [Figure #BinDiff](#BinDiff)
are *not* the same.

Two restricted forms of binary tree are sufficiently important to
warrant special names. Each node in a
[full binary tree](#full-tree){.term} is either
(1) an internal node with exactly two non-empty children or (2) a leaf.
A [complete binary tree]{.term} has a restricted
shape obtained by starting at the root and filling the tree by levels
from left to right. In the complete binary tree of height $d$, all
levels except possibly level $d$ are completely full. The bottom level
has its nodes filled in from the left side.

:::: {#FullComplete}
<inlineav id="FullCompCON" src="Binary/FullCompCON.js" name="Binary/FullCompCON" links="Binary/FullCompCON.css" static/>

Examples of full and complete binary trees.
::::

[Figure #FullComplete](#FullComplete) illustrates
the differences between full and complete binary trees. There is no
particular relationship between these two tree shapes; that is, the tree (a) is
full but not complete while the tree (b) is complete but
not full. The [heap](#heaps-and-priority-queues) data
structure is an example of a complete binary tree. The
[Huffman coding tree](#huffman-coding-trees-optional) is an example of a full binary tree.

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
