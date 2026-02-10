
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

::: {.jsav-figure #fig:bintree_with_pointers}
``` {latex-zoom=0.8}
var AV = NewAV();
AddCSS(`.jsavcanvas {width: 600px}`)
AV.ds.array([" ", "A", " "], {left: 180});
var topDiff = 50;
var arrB = AV.ds.array(["/", "B", " "], {left: 40, top: topDiff});
arrB.css(0, {"background-color": "LightGray"});
AV.ds.array([" ", "C", " "], {left: 320, top: topDiff});

topDiff += 50;
var arrD = AV.ds.array(["/", "D", "/"], {left: 70, top: topDiff});
arrD.css(0, {"background-color": "LightGray"});
var arrE = AV.ds.array([" ", "E", "/"], {left: 230, top: topDiff});
arrE.css(2, {"background-color": "LightGray"});
AV.ds.array([" ", "F", " "], {left: 410, top: topDiff});

topDiff += 50;
var arrG = AV.ds.array(["/", "G", "/"], {left: 150, top: topDiff});
var arrH = AV.ds.array(["/", "H", "/"], {left: 350, top: topDiff});
var arrI = AV.ds.array(["/", "I", "/"], {left: 470, top: topDiff});
arrG.css(0, {"background-color": "LightGray"});
arrG.css(2, {"background-color": "LightGray"});
arrH.css(0, {"background-color": "LightGray"});
arrH.css(2, {"background-color": "LightGray"});
arrI.css(0, {"background-color": "LightGray"});
arrI.css(2, {"background-color": "LightGray"});

//line for A - B
AV.g.line(200, 40, 90, 70, {"stroke-width": 2, "arrow-end": "classic-wide-long"});

//line for A - C
AV.g.line(250, 40, 370, 70, {"stroke-width": 2, "arrow-end": "classic-wide-long"});

//line for B - D
AV.g.line(115, 90, 120, 120, {"stroke-width": 2, "arrow-end": "classic-wide-long"});

//line for C - E
AV.g.line(340, 90, 280, 120, {"stroke-width": 2, "arrow-end": "classic-wide-long"});

//line for C - F
AV.g.line(395, 90, 450, 120, {"stroke-width": 2, "arrow-end": "classic-wide-long"});

//line for E - G
AV.g.line(250, 140, 200, 170, {"stroke-width": 2, "arrow-end": "classic-wide-long"});

//line for F - H
AV.g.line(430, 140, 395, 170, {"stroke-width": 2, "arrow-end": "classic-wide-long"});

//line for F - I
AV.g.line(485, 140, 515, 170, {"stroke-width": 2, "arrow-end": "classic-wide-long"});

AV.displayInit();
AV.recorded();
```

Illustration of a typical pointer-based binary tree implementation, where each node stores two child pointers and a value
:::

Here is a simple implementation for binary tree nodes, which can store one single element in each node.
Every `BinaryNode` object also has two pointers, one to its left child and another to its right child.
\

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
the [Huffman coding tree]{.term} (see @sec:huffman-coding),
[the [binary trie]{.term}, the [PR Quadtree]{.term},]{.online}
and the [expression tree]{.term} illustrated by @fig:expression_tree below.
By definition, only
internal nodes have non-empty children. If we use the same node
implementation for both internal and leaf nodes, then both must store
the child pointers. But it seems wasteful to store child pointers in the
leaf nodes. Thus, there are many reasons why it can save space to have
separate implementations for internal and leaf nodes.

::: {.jsav-figure #fig:expression_tree}
```
var AV = NewAV();
AddCSS(`.internalnode {
  border-radius: 50px;
  background-color: white;
  line-height: 22px;
  z-index: 100; /* Prevents the tails of the edges from showing up in the background of the node */
}`);
AV.ds.array([" ", "&ndash;", " "], {left: 420});

var topDiff = 60;
AV.ds.array([" ", "&times;", " "], {left: 350, top: topDiff});
var arr3 = AV.ds.array(["<em>c</em>"], {left: 520, top: topDiff});
arr3.addClass([0], "internalnode");

topDiff += 60;
AV.ds.array([" ", "&times;", " "], {left: 240, top: topDiff});
AV.ds.array([" ", "+", " "], {left: 460, top: topDiff});

topDiff += 60;
var arr6 = AV.ds.array(["4"], {left: 240, top: topDiff});
var arr7 = AV.ds.array(["<em>x</em>"], {left: 300, top: topDiff});
AV.ds.array([" ", "&times;", " "], {left: 400, top: topDiff});
var arr9 = AV.ds.array(["<em>a</em>"], {left: 550, top: topDiff});
arr6.addClass([0], "internalnode");
arr7.addClass([0], "internalnode");
arr9.addClass([0], "internalnode");

topDiff += 60;
var arr10 = AV.ds.array(["2"], {left: 400, top: topDiff});
var arr11 = AV.ds.array(["<em>x</em>"], {left: 460, top: topDiff});
arr10.addClass([0], "internalnode");
arr11.addClass([0], "internalnode");

//line for [-] - [*]
AV.g.line(440, 40, 400, 80, {"stroke-width": 2, "arrow-end": "classic-wide-long"});

//line for [-] - c
AV.g.line(495, 40, 535, 80, {"stroke-width": 2, "arrow-end": "classic-wide-long"});

//line for [*] - [*]
AV.g.line(370, 100, 290, 140, {"stroke-width": 2, "arrow-end": "classic-wide-long"});

//line for [*] - [+]
AV.g.line(425, 100, 505, 140, {"stroke-width": 2, "arrow-end": "classic-wide-long"});

//line for [*] - 4
AV.g.line(255, 160, 255, 200, {"stroke-width": 2, "arrow-end": "classic-wide-long"});

//line for [*] - x
AV.g.line(315, 160, 315, 200, {"stroke-width": 2, "arrow-end": "classic-wide-long"});

//line for [+] - [*]
AV.g.line(475, 160, 450, 200, {"stroke-width": 2, "arrow-end": "classic-wide-long"});

//line for [+] - a
AV.g.line(535, 160, 565, 200, {"stroke-width": 2, "arrow-end": "classic-wide-long"});

//line for [*] - 2
AV.g.line(420, 220, 420, 260, {"stroke-width": 2, "arrow-end": "classic-wide-long"});

//line for [*] - x
AV.g.line(475, 220, 475, 260, {"stroke-width": 2, "arrow-end": "classic-wide-long"});

AV.displayInit();
AV.recorded();
```

An example of an expression tree for $4x(2x + a) - c$
:::

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

::: TODO
- Add information about data types and functional languages
:::
