
## General trees {#trees:general-trees}

::: TODO
- Prio 1: double-check that the text is ok
:::

A binary tree is a special case of a more general tree in which each node has at most two children.
Many applications, however, require trees with an arbitrary number of children or with different kinds of nodes serving different roles.
In this section we consider these more general tree structures, how they can be represented, and how they are traversed.

### Modelling different kinds of tree nodes

For simple binary trees, all nodes often have the same representation.
However, many applications distinguish between internal nodes and leaves, because they store different kinds of information or serve different purposes.
Using separate node types usually leads to a clearer design.

Some tree structures store data only in the leaves, while others store one kind of information in the leaves and another in the internal nodes.
Examples include [the [Huffman coding tree]{.term} (see @sec:heaps:huffman-coding), the [binary trie]{.term}, the [PR Quadtree]{.term}, and]{.online} the [expression tree]{.term} illustrated by @fig:expression_tree.

::: {#fig:expression_tree}
![](images/9.2-expression-tree.svg)

An example of an expression tree for $4x(2x + a) - c$
:::

<!-- OPENDSA: START -->
An expression tree represents an algebraic expression built from binary operators such as addition, subtraction, multiplication, and division.
Its internal nodes store operators, while its leaves store operands such as numbers and variables.
<!-- OPENDSA: END -->
Since operators and operands are conceptually different kinds of information, it is natural to represent them using different node types.
These node types may also have different fields, reflecting the information they need to store.

This idea is not specific to binary trees.
In general tree structures, nodes may have different numbers of children and different structural roles.
Distinguishing between node types is therefore a natural way to model many applications.

Object-oriented languages commonly express this distinction through a class hierarchy, where a base node class is extended by specialised subclasses for leaves and internal nodes.
Functional languages often use algebraic data types, defining a tree as one of several possible node variants.
In this book, however, we usually assume that all nodes belong to the same class unless the distinction is important.

### Multiway trees {#trees:multiway-trees}

A [multiway tree]{.term} (also known as a or [rose trees]{.term}) is a tree in which a node may have any number of children.
This contrasts with binary trees, where each node has at most two children.
A multiway-tree node will therefore usually store its children in a list or array, rather than in fixed left and right child fields.

We can represent such multiway trees as follows:

    datatype Tree of T:
        value: T                 // Value stored in the node
        children: List or Array  // Children subtrees
        size: Int

#### Traversing a multiway tree

In @sec:trees:bintree-traversal we saw the three traditional tree traversals for binary trees:
[preorder]{.term}, [postorder]{.term}, and [inorder]{.term}.
For multiway trees, preorder and postorder extend naturally from the binary-tree case.
In a preorder traversal, we first process the root, and then traverse each subtree from left to right.
In a postorder traversal, we first traverse all subtrees from left to right, and then process the root.

Inorder traversal, however, does not have a similarly natural generalisation.
For a binary tree, inorder works because each internal node has exactly two subtrees, so the node can be processed between the left and right subtrees.
In a multiway tree, an internal node may have any number of children, so there is no obvious place where the node itself should be processed.
One can invent an arbitrary convention, such as traversing the leftmost subtree first, then processing the root, and then traversing the remaining subtrees, but such a rule is not especially useful as a general pattern.

::: dsvis
Visualisation of preorder traversal.

``` {.jsav-animation src="General/GenTreePreTravCON.js" links="General/GenTreeCON.css" name="General Tree Preorder Traversal Slideshow"}
```
:::

::: dsvis
Visualisation of postorder traversal.

``` {.jsav-animation src="General/GenTreePostTravCON.js" links="General/GenTreeCON.css" name="General Tree Postorder Traversal Slideshow"}
```
:::

If each node stores its children in a list or an array, then implementations of preorder and postorder traversal are straightforward.

    preorder(node):
        process(node.value)
        for each child in node.children:
            preorder(child)

    postorder(node):
        for each child in node.children:
            postorder(child)
        process(node.value)

Note that unlike a binary tree, a general tree does not contain null child values.
A leaf is represented as a node with an empty list of children, not as a node with empty child pointers.
If an application needs to represent an empty tree, the root itself may be null.
However, once a node exists, each of its children is an actual node rather than a null reference.
