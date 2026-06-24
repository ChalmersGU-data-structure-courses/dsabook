
### Implementing binary trees

::: TODO
- Prio 1: merge with previous section?
- Prio 1: update pseudocode
- Prio 1: update figures
- Prio 3: extend text
- Prio 3: look over the text for space requirements (file 03b)
:::

We continue and examine a way to implement nodes for a binary tree.
By definition, each node has two children, although either or both may be empty.
A node also typically stores a value, with the type depending on the application.
The most common implementation therefore includes a value field and pointers to the two children.

Here is a simple implementation for binary tree nodes, which can store one single element in each node.

    datatype Node of T:
        value: T            // Element for this node.
        left: Node = null   // Pointer to left child.
        right: Node = null  // Pointer to right child.

Each `Node` object also has two pointers, one to the left child and one to the right child.
Thus, a `Node` object represents not just a single node, but the root of a subtree.
@Fig:bintree_with_pointers shows how the tree in @fig:example_bintree appears in memory, with child pointers made explicit.

![Illustration of the pointer-based binary tree implementation, where each node stores a value and two child pointers. A black dot in a pointer cell indicates `null`.](images/Trees-BinaryTreeWithPointers.svg){width=60% #fig:bintree_with_pointers}

<!--
::: {#fig:bintree_with_pointers}
:::: online
```jsav-figure
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
::::

:::: latex
```
             __________[ | A | ]__________
            ↓                             ↓
        [/| B | ]__               __[ | C | ]__
                   ↓             ↓             ↓
               [/| D |/]   __[ | E |/]   __[ | F | ]__
                           ↓             ↓             ↓
                       [/| G |/]     [/| H |/]     [/| I |/]
```
::::


Illustration of a typical pointer-based binary tree implementation, where each node stores two child pointers and a value.
The empty cells are null values.
:::
-->
We can easily extend the Node type for different applications, for example by storing additional data in each node.
It is sometimes convenient to add a pointer to the node’s parent, making it easy to move upward in the tree.
This is somewhat analogous to adding a link to the previous node in a doubly linked list.
In practice, however, a parent pointer is rarely necessary and increases the space overhead of the tree.
The problem is not only the extra space.
More importantly, reliance on parent pointers often reflects a poor understanding of recursion and can lead to weaker designs.
If you find yourself wanting a parent pointer, it is worth considering whether there is a cleaner or more efficient approach.

Here is an example of a program using the node type defined above.
It computes the height of a tree.
Since Node is a recursive data type, it is often most natural to define functions on it recursively, with the empty tree (`null`) as the base case.

    height(node) -> Int:
        if node is null:
            return -1
        return max(height(node.left), height(node.right)) + 1

Study the code and convince yourself that `height(A)` in @Fig:bintree_with_pointers will return the value 3.
Also consider how you would modify the code to compute size instead of height.

#### Wrapper data type

Our final binary-tree datatype is a wrapper datatype, similar to the linked-list implementations introduced in @sec:sequences:linked-stacks.
It stores a reference to the root node, initially `null`, and can also maintain metadata such as the total size of the tree:

    datatype BinaryTree:
        root: Node = null
        size: Int = 0

### Modelling different kinds of tree nodes

An important design question for a pointer-based tree representation is whether [leaves](#leaf-node){.term} and [internal nodes](#internal-node){.term} should use the same node type.
For simple binary trees, a single node type is often sufficient.
However, in many applications the two kinds of nodes play different roles, and it is then clearer to represent them differently.
Some applications store data only in the leaves, while others store one kind of information in the leaves and another in the internal nodes.
Examples include [the [Huffman coding tree]{.term} (see @sec:heaps:huffman-coding), the [binary trie]{.term}, the [PR Quadtree]{.term}, and]{.online} the [expression tree]{.term} illustrated by @fig:expression_tree below.

::: {#fig:expression_tree}
![](images/Trees-expression-tree.svg){width=70%}

An example of an expression tree for $4x(2x + a) - c$
:::

This is part of a broader idea.
A binary tree is a restricted form of tree in which each node has at most two subtrees.
In more general tree structures, nodes may have different numbers of subtrees, and different kinds of nodes may serve different structural roles.
Thus, distinguishing between node types is not peculiar to binary trees, but a natural way to model trees more faithfully.

As an example of a tree that stores different information at the leaf and internal nodes, consider the expression tree illustrated by @fig:expression_tree.
An expression tree represents an algebraic expression composed of binary operators such as addition, subtraction, multiplication, and division.
Its internal nodes store operators, while its leaves store operands like numbers and variables.
The tree in the figure represents the expression $4x(2x + a) - c$.
Since operators and operands are conceptually different kinds of information, it is natural to represent them using different node types.
Once we make that distinction, the corresponding node representations may also differ in the fields they store.

[Object-oriented languages](#object-oriented-programming-paradigm){.term} allow us to distinguish between leaves and internal nodes through a [class hierarchy]{.term}.
A [base class]{.term} provides the general definition of a tree node, while [subclasses]{.term} refine that definition for leaves and internal nodes.
In functional languages, the same distinction is often expressed using [algebraic data types]{.term}, where a node is defined to be one of several cases.
For example, a tree might be either a leaf carrying a value or an internal node carrying a value together with its subtrees.
We will not discuss these implementation variations further in this book, but will usually assume that all nodes belong to the same class unless the distinction matters.
