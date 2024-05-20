
## Binary Tree Node Implementations

In this module we examine one way to implement binary tree nodes. By
definition, all binary tree nodes have two children, though one or both
children can be empty. Binary tree nodes typically contain a value
field, with the type of the field depending on the application. The most
common node implementation includes a value field and pointers to the
two children.

Here is a simple implementation for binary tree nodes. When we need to
support search structures such as the
[Binary Search Tree]{.term}, the node will typically store a
[key-value pair]{.term}. Every `BinaryNode` object also has two pointers, one to
its left child and another to its right child.

    class BinaryNode:
        BinaryNode(elem, left, right):
            this.elem = elem    // Element for this node.
            this.left = left    // Pointer to left child.
            this.right = right  // Pointer to right child.

        isLeaf():
            // Return true if a leaf node, false otherwise.
            return this.left is null and this.right is null

We also define a *leaf* to be a node with no children -- i.e., where
both childen pointers point to nothing.


:::: {#BinLink}
<inlineav id="BTnullpointerCON" src="Binary/BTnullpointerCON.js" name="Binary/BTnullpointerCON" links="Binary/BTCON.css Binary/BTnullpointerCON.css" static/>

Illustration of a typical pointer-based binary tree implementation,
where each node stores two child pointers and a value.
::::

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

### Differentiating between internal nodes and leaves

An important decision in the design of a pointer-based node
implementation is whether the same class definition will be used for
[leaves](#leaf-node){.term} and
[internal nodes](#internal-node){.term}. Using
the same class for both will simplify the implementation, but might be
an inefficient use of space. Some applications require data values only
for the leaves. Other applications require one type of value for the
leaves and another for the internal nodes. Examples include the
[binary trie]{.term}, the
[PR Quadtree]{.term}, the
[Huffman coding tree]{.term}, and the
[expression tree]{.term} illustrated by 
[Figure #DiffNodes](#DiffNodes). By definition, only
internal nodes have non-empty children. If we use the same node
implementation for both internal and leaf nodes, then both must store
the child pointers. But it seems wasteful to store child pointers in the
leaf nodes. Thus, there are many reasons why it can save space to have
separate implementations for internal and leaf nodes.

:::: {#DiffNodes}
<inlineav id="expressionTreeCON" src="Binary/expressionTreeCON.js" name="Binary/expressionTreeCON" links="Binary/BTCON.css Binary/expressionTreeCON.css" static/>

An expression tree for $4x(2x + a) - c$.
::::

As an example of a tree that stores different information at the leaf
and internal nodes, consider the expression tree illustrated by 
[Figure #DiffNodes](#DiffNodes). The expression tree
represents an algebraic expression composed of binary operators such as
addition, subtraction, multiplication, and division. Internal nodes
store operators, while the leaves store operands. The tree of 
[Figure #DiffNodes](#DiffNodes) represents the
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

