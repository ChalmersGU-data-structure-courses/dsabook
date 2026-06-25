## Binary trees {#trees:binary-trees}

::: TODO
- Prio 1: update figures
- Prio 2: update section, here's what should be included:
    - Binary search trees (should it? There's a chapter 11 for that.)
- Prio 2: merge quizzes (files 01q, 01q2), perhaps move to another section?
:::

As we explained in the introduction, trees form a family of related structures.
In a [general tree]{.term}, a node may have any number of children.
The children may or may not have a meaningful order.
Many applications fit that flexible model.
But one special case is particularly important in data structures and algorithms: the [binary tree]{.term}.

A binary tree is either empty, or it consists of a root node with a value and exactly two children that are themselves binary trees.
These two children are ordered.
So we distinguish between the left child and the right child.
It is common to say that a binary tree node has at most two children, but that description hides an important point.
If a node has only one child, it matters whether that child is on the left or on the right.
So it is often clearer to think of a binary tree node as always having a left subtree and a right subtree.
Either subtree may be empty.

This is illustrated below.
The tree drawn on the left and the tree drawn on the right represent the same binary tree.
The black dots make the empty subtrees explicit.

A binary tree is either empty or consists of a root node containing a value together with two ordered children, each of which is itself a binary tree.
Because the children are ordered, we distinguish between the left child and the right child.
Binary trees are often described as trees in which each node has at most two children.
While this is correct, it can obscure an important detail: if a node has only one child, it matters whether that child is on the left or on the right.
For this reason, it is often clearer to think of every node as having both a left subtree and a right subtree, with either subtree allowed to be empty. This idea is illustrated below.

![An example of a binary tree with nodes labeled by letters.](images/Trees-BinaryTreeExampleNulls.svg){width=80% #fig:example_bintree}

The two drawings represent the same binary tree.
In the left-hand drawing, the black dots make the empty subtrees explicit.

A node whose left and right subtrees are both empty is called a _leaf node_.
Nodes that are not leaves are called _internal nodes_, or sometimes _branches_.
In the figure above, the nodes containing `D`, `G`, `H`, and `I` are leaf nodes.

We will use the binary tree in @fig:example_bintree as a running example throughout this chapter. Before continuing, take a moment to study it and consider the following questions:
Which nodes are leaf nodes?
What is the path from node `A` to node `H`?
These questions will help you become familiar with the terminology and structure of binary trees.

<!--

### Binary trees are recursive data structures

There are many ways to implement data structures, but the most
common one is a recursive data type that mimics the formal definition:
A binary tree is either empty (represented by null),
or it is a node with a left and a right child (that can also be null).

    datatype BinaryNode of T:
        value: T           // Element for this node.
        left: BinaryNode   // Pointer to left child.
        right: BinaryNode  // Pointer to right child.

You may notice that this data type looks very similar to linked lists, the only difference is that tree nodes have *two* children instead of one. In fact, linked lists can be considered *unary trees*, trees where every node has one child (that can be null).

A [recursive data structure]{.term} is a data
structure that is partially composed of smaller or simpler instances of
the same data structure.
[Linked lists](#linked-list){.term} and
[binary trees](#binary-tree){.term} are both recursive data structures.

::: dsvis
The recursive relationships used to define a structure provide a natural
model for any recursive algorithm on the structure.

``` {.jsav-figure src="Binary/ListRecDSCON.js" links="Binary/RecursiveDSCON.css"}
```

``` {.jsav-figure src="Binary/BinRecDSCON.js" links="Binary/RecursiveDSCON.css"}
```
::::

One way to think about recursion is to see it as *delegation*:
Suppose you want to compute the sum of the values stored in a binary tree.
You don't want to do most of the work yourself, so you ask two friends to help you.

- The first friend will take the left subtree to sum it.
- The second friend will take the right subtree to sum it.
- The only thing you have to do is to sum the values that got from your friends.

You don't need to think about how your friends (the recursive calls) calculated their sums, as long as you trust that they are correct.

::: dsvis
Here is a visual explanation of the same idea.

``` {.jsav-animation src="Binary/SumBinaryTreeCON.js" links="Binary/RecursiveDSCON.css" name="Sum values in a Binary Tree Slide Show"}
```
:::

-->

### Full, perfect, and complete binary trees

Several restricted forms of binary tree are sufficiently important to warrant special names.
In a [full binary tree](#full-tree){.term}, every node is either a leaf node or an internal node with exactly two non-empty children.
A [perfect binary tree]{.term} is a full binary tree in which all leaves are at the same level.
Equivalently, every level of a perfect binary tree is completely full.
A [complete binary tree]{.term} has a shape obtained by starting at the root and filling the tree level by level from left to right.
In a complete binary tree of height $d$, all levels except possibly level $d$ are completely full.
The bottom level is filled from the left side.

@Fig:full_complete_bintrees below illustrates the differences between full and complete binary trees.
Neither property implies the other.
A perfect binary tree satisfies both properties.
In the figure, tree (a) is full but not complete, while tree (b) is complete but not full.
A [binary heap]{.term} (see @sec:heaps:binary-heaps) is an example of a complete binary tree, while
a [Huffman coding tree]{.term} is an example of a full binary tree.

::: {#fig:full_complete_bintrees}
![Three binary trees illustrating the differences between full, perfect, and complete trees.](images/Trees-full-perfect-complete.svg){width=100%}

Examples of restricted binary tree shapes:
(a) is full but not complete,
(b) is perfect and therefore both full and complete,
and (c) is complete but not full.
:::

<!--

A [binary tree]{.term} is made up of a finite
set of elements called [nodes]{.term}.
This set either is empty or consists of a node called the
[root]{.term} together with two binary trees,
called the left and right [subtrees]{.term}, which are disjoint from each other and from the root.
(Disjoint means that they have no nodes in common.) The roots of these
subtrees are [children]{.term} of the
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

::: {.jsav-figure #fig:example_bintree}
```
var AV = NewAV();
var btTop = -5;
var btLeft = 305;
var bt = AV.ds.binarytree({nodegap: 15, left: btLeft, top: btTop});
bt.root("A");
var rt = bt.root();
rt.left("B");
rt.left().right("D");
rt.right("C");
rt.right().left("E");
rt.right().left().left("G");
rt.right().right("F");
rt.right().right().left("H");
rt.right().right().right("I");
bt.layout();
AV.displayInit();
AV.recorded();
```
An example binary tree
:::

@Fig:example_bintree above illustrates
the various terms used to identify parts of a binary tree.
Node $A$ is the root, and nodes $B$ and $C$ are $A$'s children.
Nodes $B$ and $D$ together form a subtree. Node $B$ has two
children: Its left child is the empty tree and its right child is $D$.
Nodes $A$, $C$, and $E$ are ancestors of $G$. Nodes $D$, $E$, and $F$
make up level 2 of the tree; node $A$ is at level 0. The edges from $A$
to $C$ to $E$ to $G$ form a path of length 3. Nodes $D$, $G$, $H$, and
$I$ are leaves. Nodes $A$, $B$, $C$, $E$, and $F$ are internal nodes.
The depth of $I$ is 3. The height of this tree is 3.


@Fig:two_bintrees below illustrates an important
point regarding the structure of binary trees. Because *all* binary tree
nodes have two children (one or both of which might be empty), the two
binary trees (a) and (b) in the figure are *not* the same.

::: {.jsav-figure #fig:two_bintrees}
```
var AV = NewAV();
// Setup first row of trees
var btTop = 0;
var btLeft = 120;
var btRight = 220;
var bt = AV.ds.binarytree({nodegap: 30, top: btTop, left: btLeft});
bt.root("A");
var rt = bt.root();
rt.left("B");

var bt2 = AV.ds.binarytree({nodegap: 30, top: btTop, left: btRight});
bt2.root("A");
bt2.root().right("B");

bt.layout();
bt2.layout();

// Add first row of labels
AV.label("(a)", {left: btLeft + 40, top: btTop + 105});
AV.label("(b)", {left: btRight + 35, top: btTop + 105});

// Setup second row of trees
// btTop = 155;
btLeft += 350 - 20; btRight += 350 + 20;
var bt3 = AV.ds.binarytree({nodegap: 30, left: btLeft, top: btTop});
bt3.root("A");
bt3.root().left("B");
bt3.root().right("");
bt3.root().right("NULL").addClass("clearnode");
var bt4 = AV.ds.binarytree({nodegap: 30, left: btRight, top: btTop});
bt4.root("A");
bt4.root().left("NULL").addClass("clearnode");
bt4.root().right("B");
bt3.layout();
bt4.layout();

// Add second row of labels
AV.label("(c)", {left: btLeft + 40, top: btTop + 105});
AV.label("(d)", {left: btRight + 35, top: btTop + 105});
AV.displayInit();
AV.recorded();
```



Two different binary trees:
(a) the root has a non-empty left child;
(b) the root has a non-empty right child; and
(c) the same tree as (a), with the missing right child made explicit;
(d) the same tree as (b), with the missing left child made explicit
:::
-->

### Implementing binary trees {#trees:implementing-binary-trees}

::: TODO
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
