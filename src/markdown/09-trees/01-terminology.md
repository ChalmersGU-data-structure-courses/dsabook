
## Tree terminology {#trees:terminology}

::: TODO
- Prio 1: Done?
:::

![
    Drawing of a tree with six nodes, illustrating the concepts of
    root node, child and parent nodes, size/height/level properties, and paths.
](images/9.1-terminology.svg){#fig:TreeTerminology}

A tree consists of [nodes]{.term} connected by parent-child relationships.
There is a unique topmost node which is called the [root]{.term}.
If a node is directly below another node, then it is a [child]{.term} of that node, and the node above it is its [parent]{.term}.
In @fig:TreeTerminology, $A$ is the root, $B$ and $C$ are children of $A$,
and $B$ is also a parent of $D$, $E$ and $F$.

Every node in a tree is also the root of a *subtree*.
For example, $B$ is a child of $A$, but it is also the root of the subtree containing $B$, $D$, $E$, and $F$.
So, depending on context, a node name can refer either to the node itself or to the subtree rooted at that node.
Two simple rules define the shape of a tree:

- Every node except the root has exactly one parent.
- There are no cycles, so a node cannot be its own ancestor.

Together, these rules give us a hierarchical structure with a unique path from the root to every other node.
Some common tree terms are:

- A tree is *empty* if it has no nodes.
- A *leaf node* is a node with no children.
- An *internal node* is a node with at least one child.
- A *branch* usually means an internal node, especially one with several children.
- An [ancestor]{.term} of a node is any of its direct or indirect parents.
- A [descendant]{.term} of a node is a child or any node in their subtrees.
- [Siblings]{.term} are nodes with the same parent.
- A [path]{.term} is a sequence of nodes where each node is followed by a child.
- A [forest]{.term} is a collection of trees.

We will sometimes describe trees and nodes using the concepts of size, level, and height.
The size of a tree is the number of nodes it contains.
The [level]{.term} of a node is its distance from the root.
Thus, the root is at level $0$, its children are at level $1$, and so on.
The depth of a node is synonymous with its level.
The [height]{.term} of a tree (or subtree) is the number of edges on the longest path from its root to a leaf.
Consequently, a tree consisting of a single node has height $0$. We define the height of an empty tree to be $-1$.

Another important question is whether the children of a node have a fixed order.
In a file system, the order between the children of a folder is usually unimportant.
In a syntax tree, order matters,
because the expressions $a < 3$ and $3 < a$ mean different things.
This distinction will matter later when we compare general trees, binary trees, and heaps.

![Two familiar domains modelled as trees: Programming language syntax and file systems.](images/9.1-examples.svg){#fig:TreeExamples}

@fig:TreeExamples shows two typical examples.
In a syntax tree, each node represents a language construct such as a function call or an `if`-statement, and the children are its components.
In a file system tree, the nodes are files and folders, and the parent of a node is the folder that contains it.

Trees can store any kind of data in their nodes,
but the meaning of the data and the meaning of the parent-child relationship depend on the application.
So there is no single tree data structure -- instead, trees form a family of related structures.
