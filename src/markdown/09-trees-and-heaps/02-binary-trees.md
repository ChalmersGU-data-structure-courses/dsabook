## Binary trees {#trees:binary-trees}

::: TODO
- Prio 1: update figures
- Prio 2: update section, here's what should be included:
    - General trees
    - Binary search trees (should it? There's a chapter 11 for that.)
    - Properties
        - Balanced trees
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

![](images/Trees-BinaryTreeWithNulls.svg){width=70%}

A node with two empty subtrees is called a *leaf node*.
Non-leaf nodes are called *internal nodes*, or sometimes *branches*.
In the illustration above, the nodes containing 5 and 6 are leaf nodes.

![An example of a binary tree with nodes labeled by letters.](images/Trees-BinaryTreeExample.svg){width=60% #fig:example_bintree}

@fig:example_bintree shows a binary tree that we will use as a running example.
Study it and consider these questions:
Which nodes are leaf nodes?
How many empty subtrees are hidden in the picture?
What is the path from node `A` to node `H`?


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
A [binary heap]{.term} (@sec:binary-heaps) is an example of a complete binary tree.
A [Huffman coding tree]{.term} (@sec:huffman-coding) is an example of a full binary tree.

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
