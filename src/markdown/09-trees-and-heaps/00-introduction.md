
# Trees and heaps {#trees}

[Tree]{.term} structures let us organise data hierarchically.
So far, we have mainly studied data structures that organise elements in a linear sequence, such as arrays, linked lists, stacks, and queues.
In those structures, each element is followed by at most one next element.
Trees take a different approach: instead of continuing in a sequence, a node can lead to two or more children.
This lets us represent _hierarchical_ relationships, and it also helps when we want fast access to values that are important in some way.

Trees appear in many settings.
We can use them to represent mathematical expressions and the syntax of computer programs (using expression trees, see @sec:differentiating-between-internal-nodes-and-leaves).
We can also use them to model file systems, where folders contain files and other folders.
Later in this chapter we will see another important use: [heaps]{.term}, which organise data so that we can quickly find and remove the element with highest priority.

#### Tree terminology

![Drawing of a tree with six nodes, illustrating the concepts of root node, child and parent nodes, size/height/level properties, and paths.](images/Trees-terminology.svg){width=70% #fig:TreeTerminology}

A tree consists of [nodes]{.term} connected by parent-child relationships.
The topmost node is the [root]{.term}.
If a node is directly below another node, then it is a [child]{.term} of that node, and the node above it is its [parent]{.term}.
In @fig:TreeTerminology, `A` is the root, and `B` and `C` are children of `A`.

Every node in a tree is also the root of a *subtree*.
For example, `B` is a child of `A`, but it is also the root of the subtree containing `B`, `D`, and `E`.
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
- A [forest]{.term} is a collection of trees.
- An [ancestor]{.term} of a node is any node on the path from the root to that node.
- A [descendant]{.term} of a node is any node in the subtree rooted at that node.
- [Siblings]{.term} are nodes with the same parent.
- A [path]{.term} is a sequence of nodes where each node is the parent of the next one.

We will often describe trees using their *size* and *height*.
The *size* of a tree is the number of nodes it contains.
The [height]{.term} of a tree is the length of the longest path from the root to a leaf.
An empty tree has size 0 and height 0.

Some trees care about the order of children, while others do not.
In a file system, the order of the children of a folder is usually unimportant.
In a syntax tree, order matters a lot, because the expressions $a < 3$ and $3 < a$ mean different things.
This distinction will matter later when we compare general trees, binary trees, and heaps.

![Two familiar domains modelled as trees: Programming language syntax and file systems.](images/Trees-examples.svg){width=70% #fig:TreeExamples}

@fig:TreeExamples shows two typical examples.
In a syntax tree, each node represents a language construct such as a function call or an `if`-statement, and the children are its components.
In a file system tree, the nodes are files and folders, and the parent of a node is the folder that contains it.

Trees contain data in nodes, but the meaning of the data and the meaning of the parent-child relationship depend on the application.
So there is no single tree data structure in the same way that there is a single stack or queue abstraction.
Instead, trees form a family of related structures.

#### Why heaps belong here

A [priority queue]{.term} stores elements together with priorities, so that we can always access or remove the highest-priority element first.
A heap is a tree-based way to implement such a priority queue efficiently.

The key idea is that the most important element is kept at the root.
This does not mean that the entire structure is sorted.
Instead, heaps maintain a local ordering rule between parents and children.
That rule is strong enough to keep the highest-priority element at the root, while still allowing updates to be efficient.

This chapter begins with the basic ideas and terminology for trees.
We then discuss binary trees (@sec:binary-trees), tree traversals (@sec:traversing-binary-trees), and approaches to implementing tree nodes (@sec:implementing-binary-trees).
After that we turn to heaps for priority queues (@sec:heaps), including binary heaps (@sec:binary-heaps).
The chapter concludes with further case studies and with trees that have more, or fewer, than two children (@sec:general-trees).
