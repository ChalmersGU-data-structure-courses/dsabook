
## Binary trees

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

<!-- START NOTES -->

### Trees {-}

A tree is similar to a linked list: it consists of nodes which point to other nodes. The difference is that a linked list node has *one* possible successor node, but a tree can link to *many* other nodes. These nodes are called the *children* of the parent node.

A linked list start with one node, the *head*, and correspondingly a tree starts with one single node, the *root*. Normally we draw a tree upside-down, like this:

![](images/GenericTree.png)

### Binary trees {-}

The most common type of trees are *binary* trees. The main reason for this is because they are the simplest to implement, and we very rarely need something else.

A binary tree node always has exactly two children. But any of the children can be **null**, and sometimes we are sloppy and say that it has one child, or no children. When you see the tree on the left you must know that it actually looks like the tree on the right, where the black dots mean **null** nodes:

![](images/BinTree-WithNullNodes.png)

A node with no children (or more correctly, with only **null** children) is called a *leaf*, and a non-leaf node is called an *inner* node.

The datatype (class definition) for binary trees look very similar to linked lists, the only difference is that tree nodes have *two* children instead of one.

```
class BinTree:          class TreeNode:
    root: TreeNode          elem: Value
    size: Int               left: TreeNode
                            right: TreeNode
```

If we want to use these to implement a *map* (instead of a set), the nodes should contain both a *key* and a *value*, instead of a single element.

<!-- END NOTES -->

------

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

Two restricted forms of binary tree are sufficiently important to
warrant special names. Each node in a
[full binary tree](#full-tree){.term} is either
(1) an internal node with exactly two non-empty children or (2) a leaf.
A [complete binary tree]{.term} has a restricted
shape obtained by starting at the root and filling the tree by levels
from left to right. In the complete binary tree of height $d$, all
levels except possibly level $d$ are completely full. The bottom level
has its nodes filled in from the left side.

@Fig:full_complete_bintrees below illustrates
the differences between full and complete binary trees. There is no
particular relationship between these two tree shapes; that is, the tree (a) is
full but not complete while the tree (b) is complete but not full.
The [binary heap]{.term} (@sec:binary-heaps) is an example of a complete binary tree.
The [Huffman coding tree]{.term} (@sec:huffman-coding) is an example of a full binary tree.

::: {.jsav-figure #fig:full_complete_bintrees}
```
var AV = NewAV();
AddCSS(`.jsavnode.jsavtreenode {
  min-width: 10px;
  max-width: 10px;
  min-height: 10px;
  max-height: 10px;
  background-color: #000000;
  border-color: #000000;
}`);
// Setup first row of trees
var btTop = 0;
var btLeft = 225;
var btRight = 425;
var bt = AV.ds.binarytree({nodegap: 25, left: btLeft, top: btTop});
bt.root("");
var rt = bt.root();
rt.left("");
rt.left().left("");
rt.left().right("");
rt.left().right().left("");
rt.left().right().right("");
rt.right("");

var bt2 = AV.ds.binarytree({nodegap: 25, left: btRight, top: btTop});
var rt2 = bt2.root("");
rt2.left("");
rt2.left().left("");
rt2.left().right("");
rt2.left().left().left("");
rt2.left().left().right("");
rt2.left().right().left("");
rt2.left().right().right("");
rt2.right("");
rt2.right().right("");
rt2.right().left("");
rt2.right().left().left("");

bt.layout();
bt2.layout();

// Add first row of labels
AV.label("(a)", {left: btLeft + 35, top: btTop + 135});
AV.label("(b)", {left: btRight + 115, top: btTop + 135});
AV.displayInit();
AV.recorded();
```
Examples of full and complete binary trees:
(a) is full but not complete; (b) is complete but not full
:::

::: note
*Note*: While these definitions for full and complete binary tree are the
ones most commonly used, they are not universal. Because the common
meaning of the words "full" and "complete" are quite similar,
there is little that you can do to distinguish between them other
than to memorise the definitions. Here is a memory aid that you
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
And since you are a lazy person you don't want to do most of the work yourself, so you ask two friends to help you.

- The first friend will take the left subtree to sum it.
- The second friend will take the right subtree to sum it.
- The only thing you have to do is to sum the values that got from your friends.

You don't need to think about how your friends (the recursive calls) calculated their sums, as long as you accept that they are correct.

::: dsvis
Here is a visual explanation of the same idea.

``` {.jsav-animation src="Binary/SumBinaryTreeCON.js" links="Binary/RecursiveDSCON.css" name="Sum values in a Binary Tree Slide Show"}
```
:::
