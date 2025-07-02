
## Implementing binary trees

::: TODO
- Prio 1: update pseudocode
- Prio 3: extend text
- Prio 3: look over the text for space requirements (file 03b)
:::

In this section we examine one way to implement binary tree nodes. By
definition, all binary tree nodes have two children, though one or both
children can be empty. Binary tree nodes typically contain a value
field, with the type of the field depending on the application. The most
common node implementation includes a value field and pointers to the
two children.
@Fig:bintree_with_pointers is an illustration of how the tree from @fig:example_bintree looks like, where the child pointers are shown explicitly.

<div id="fig:bintree_with_pointers">

::: latex
\begin{tikzpicture}
\tikzstyle{every node}=[rectangle split, rectangle split horizontal, rectangle split parts=3, draw]
\node (A) {\nodepart{second} A};
\node (B) [below left  = 5mm and 15mm of A] {\nodepart{second} B};
\node (C) [below right = 5mm and 15mm of A] {\nodepart{second} C};
\node (D) [below right = 5mm and  0mm of B] {\nodepart{second} D};
\node (E) [below left  = 5mm and  0mm of C] {\nodepart{second} E};
\node (F) [below right = 5mm and  0mm of C] {\nodepart{second} F};
\node (G) [below left  = 5mm and  0mm of E] {\nodepart{second} G};
\node (H) [below left  = 5mm and  0mm of F] {\nodepart{second} H};
\node (I) [below right = 5mm and  0mm of F] {\nodepart{second} I};

\draw[*->] ($(A.one)   + (0.2,0.1)$) -- (B);
\draw[*->] ($(A.three) + (0.0,0.1)$) -- (C);
\draw[*->] ($(B.three) + (0.0,0.1)$) -- (D);
\draw[*->] ($(C.one)   + (0.2,0.1)$) -- (E);
\draw[*->] ($(C.three) + (0.0,0.1)$) -- (F);
\draw[*->] ($(E.one)   + (0.2,0.1)$) -- (G);
\draw[*->] ($(F.one)   + (0.2,0.1)$) -- (H);
\draw[*->] ($(F.three) + (0.0,0.1)$) -- (I);
\end{tikzpicture}
:::

::: online
<inlineav id="BTnullpointerCON" src="Binary/BTnullpointerCON.js" name="Binary/BTnullpointerCON" links="Binary/BTCON.css Binary/BTnullpointerCON.css" static/>
:::

Illustration of a typical pointer-based binary tree implementation, where each node stores two child pointers and a value
</div>

Here is a simple implementation for binary tree nodes, which can store one single element in each node.
Every `BinaryNode` object also has two pointers, one to its left child and another to its right child.

    datatype BinaryNode of T:
        elem: T            // Element for this node.
        left: BinaryNode   // Pointer to left child.
        right: BinaryNode  // Pointer to right child.

        isLeaf() -> bool:
            // Return true if a leaf node, false otherwise.
            return this.left is null and this.right is null

We define a *leaf* to be a node with no children -- i.e., where both childen pointers point to nothing.

Some programmers find it convenient to add a pointer to the node's
parent, allowing easy upward movement in the tree. Using a parent
pointer is somewhat analogous to adding a link to the previous node in a
doubly linked list. In practice, the parent pointer is almost always
unnecessary and adds to the space overhead for the tree implementation.
It is not just a problem that parent pointers take space. More
importantly, many uses of the parent pointer are driven by improper
understanding of recursion and so indicate poor programming. If you are
inclined toward using a parent pointer, consider if there is a more
efficient implementation possible.

#### Binary trees

Our final datatype for binary trees is in fact very similar to the linked lists that we introduced in @sec:stacks-implemented-as-linked-lists -- we need a reference to the root node and the total size of the tree:

    datatype BinaryTree:
        root: BinaryNode = null
        size: Int = 0


### Differentiating between internal nodes and leaves

An important decision in the design of a pointer-based node
implementation is whether the same class definition will be used for
[leaves](#leaf-node){.term} and
[internal nodes](#internal-node){.term}. Using
the same class for both will simplify the implementation, but might be
an inefficient use of space. Some applications require data values only
for the leaves. Other applications require one type of value for the
leaves and another for the internal nodes. Examples include
the [Huffman coding tree]{.term} (see @sec:case-study-huffman-coding),
[the [binary trie]{.term}, the [PR Quadtree]{.term},]{.online}
and the [expression tree]{.term} illustrated by @fig:expression_tree below.
By definition, only
internal nodes have non-empty children. If we use the same node
implementation for both internal and leaf nodes, then both must store
the child pointers. But it seems wasteful to store child pointers in the
leaf nodes. Thus, there are many reasons why it can save space to have
separate implementations for internal and leaf nodes.

<div id="fig:expression_tree">

::: latex
\begin{tikzpicture}
\tikzstyle{binnode}=[rectangle split, rectangle split horizontal, rectangle split parts=3, draw]
\tikzstyle{leafnode}=[circle, draw]
\node[binnode]  (A)                                   {\nodepart{second} $-$};
\node[binnode]  (B) [below left  = 5mm and 10mm of A] {\nodepart{second} $\times$};
\node[leafnode] (C) [below right = 5mm and 10mm of A] {$c$};
\node[binnode]  (D) [below left  = 5mm and  5mm of B] {\nodepart{second} $\times$};
\node[binnode]  (E) [below right = 5mm and  5mm of B] {\nodepart{second} $+$};
\node[leafnode] (F) [below left  = 5mm and  0mm of D] {$4$};
\node[leafnode] (G) [below right = 5mm and  0mm of D] {$x$};
\node[binnode]  (H) [below left  = 5mm and -5mm of E] {\nodepart{second} $\times$};
\node[leafnode] (I) [below right = 5mm and  0mm of E] {$a$};
\node[leafnode] (J) [below left  = 5mm and  0mm of H] {$2$};
\node[leafnode] (K) [below right = 5mm and  0mm of H] {$x$};

\draw[*->] ($(A.one)   + (0.2,0.1)$) -- (B);
\draw[*->] ($(A.three) + (0.0,0.1)$) -- (C);
\draw[*->] ($(B.one)   + (0.2,0.1)$) -- (D);
\draw[*->] ($(B.three) + (0.0,0.1)$) -- (E);
\draw[*->] ($(D.one)   + (0.2,0.1)$) -- (F);
\draw[*->] ($(D.three) + (0.0,0.1)$) -- (G);
\draw[*->] ($(E.one)   + (0.2,0.1)$) -- (H);
\draw[*->] ($(E.three) + (0.0,0.1)$) -- (I);
\draw[*->] ($(H.one)   + (0.2,0.1)$) -- (J);
\draw[*->] ($(H.three) + (0.0,0.1)$) -- (K);
\end{tikzpicture}
:::

::: online
<inlineav id="expressionTreeCON" src="Binary/expressionTreeCON.js" name="Binary/expressionTreeCON" links="Binary/BTCON.css Binary/expressionTreeCON.css" static/>
:::

An example of an expression tree for $4x(2x + a) - c$
</div>

As an example of a tree that stores different information at the leaf
and internal nodes, consider the expression tree illustrated by @fig:expression_tree.
The expression tree
represents an algebraic expression composed of binary operators such as
addition, subtraction, multiplication, and division. Internal nodes
store operators, while the leaves store operands.
The tree of the figure represents the
expression $4x(2x + a) - c$. The storage requirements for a leaf in an
expression tree are quite different from those of an internal node.
Internal nodes store one of a small set of operators, so internal nodes
could store a small code identifying the operator such as a single byte
for the operator's character symbol. In contrast, leaves store variable
names or numbers, which is considerably larger in order to handle the
wider range of possible values. At the same time, leaf nodes need not
store child pointers.

[Object-oriented languages](#object-oriented-programming-paradigm){.term}
allow us to differentiate leaf from internal nodes through
the use of a [class hierarchy]{.term}. A [base class]{.term} provides a general
definition for an object, and a [subclass]{.term} modifies the base class to add more detail.
We will not discuss further how to implement different kind of tree nodes
more in this book, but will just assume that all nodes are of the same class.

<!-- TODO:
Add information about data types and functional languages
-->

