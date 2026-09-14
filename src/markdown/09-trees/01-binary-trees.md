
## Binary trees {#trees:binary-trees}

::: TODO
- Prio 1: make sure text is consistent (lots of old stuff are moved to other sections)
- Prio 1: update figures
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

A binary tree is either empty or consists of a root node containing a value together with two ordered children, each of which is itself a binary tree.
Because the children are ordered, we distinguish between the left child and the right child.
Binary trees are often described as trees in which each node has at most two children.
While this is correct, it can obscure an important detail: if a node has only one child, it matters whether that child is on the left or on the right.
For this reason, it is often clearer to think of every node as having both a left subtree and a right subtree, with either subtree allowed to be empty. This idea is illustrated in @fig:example_bintree.

![An example of a binary tree with nodes labeled by letters.](images/9.1-bintree-with-nulls.svg){#fig:example_bintree}

The two drawings represent the same binary tree.
In the left-hand drawing, the black dots make the empty subtrees explicit.

A node whose left and right subtrees are both empty is called a _leaf node_.
Nodes that are not leaves are called _internal nodes_, or sometimes _branches_.
In the figure above, the nodes containing $D$, $G$, $H$, and $I$ are leaf nodes.

We will use the binary tree in @fig:example_bintree as a running example throughout this chapter. Before continuing, take a moment to study it and consider the following questions:
Which nodes are leaf nodes?
What is the path from node $A$ to node $H$?
These questions will help you become familiar with the terminology and structure of binary trees.


### Implementing binary trees {#trees:implementing-binary-trees}

::: TODO
- Prio 3: extend text
- Prio 3: look over the text for space requirements (file 03b)
:::

We continue and examine a way to implement nodes for a binary tree.
By definition, each node has two children, although either or both may be empty.
A node also typically stores a value, with the type depending on the application.
<!-- OPENDSA: START -->
The most common implementation therefore includes a value field and pointers to the two children.
<!-- OPENDSA: END -->

Here is a simple implementation for binary tree nodes, which can store one single element in each node.

    datatype Node of T:
        value: T            // Element for this node.
        left: Node = null   // Pointer to left child.
        right: Node = null  // Pointer to right child.

Each `Node` object also has two pointers, one to the left child and one to the right child.
Thus, a `Node` object represents not just a single node, but the root of a subtree.
@Fig:bintree_with_pointers shows how the tree in @fig:example_bintree appears in memory, with child pointers made explicit.

![Illustration of the pointer-based binary tree implementation, where each node stores a value and two child pointers. A black dot in a pointer cell indicates `null`.](images/9.1-bintree-with-pointers.svg){#fig:bintree_with_pointers}

We can easily extend the Node type for different applications, for example by storing additional data in each node.
It is sometimes convenient to add a pointer to the node’s parent, making it easy to move upward in the tree.
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
