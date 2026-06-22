
### Traversing a general tree

::: TODO
- Prio 1: merge with 03-traversing.md
:::

There are three traditional
[tree traversals]{.tree} for binary trees:
[preorder]{.term}, [postorder]{.term}, and [inorder]{.term}.
<!-- OPENDSA: START -->
For general trees, preorder and postorder traversals are
defined with meanings similar to their binary tree counterparts.
Preorder traversal of a general tree first visits the root of the tree,
then performs a preorder traversal of each subtree from left to right
(start to end of the list of children). Postorder is generalised in a
similar way, with the processing of a value happening after the
recursive processing of the children.

Inorder traversal does not have a natural definition for the general tree,
because there is no particular number of children for an internal node.
An arbitrary definition -- such as visit the leftmost subtree in
inorder, then the root, then visit the remaining subtrees in inorder --
can be invented, but has little use as a general pattern.

::: dsvis
Visualisation of preorder traversal.

``` {.jsav-animation src="General/GenTreePreTravCON.js" links="General/GenTreeCON.css" name="General Tree Preorder Traversal Slideshow"}
```
:::

To perform a preorder traversal, it is necessary to visit each of the
children for a given node (say $r$) from left to right. This is
accomplished by starting at $r$'s leftmost child (call it $T$). From $T$,
we can move to $T$'s right sibling, and then to that node's right
sibling, and so on.
<!-- OPENDSA: END -->

::: dsvis
Visualisation of postorder traversal.

``` {.jsav-animation src="General/GenTreePostTravCON.js" links="General/GenTreeCON.css" name="General Tree Postorder Traversal Slideshow"}
```
:::

Using the General Tree class shown above, here are implementations to
process the nodes of a general tree in preorder and in postorder.
The code is very simple, but this is because we defer all the complexity
to the underlying **List** implementation of the children.

    preorder(node):
        process(node)
        for each child in node.children:
            preorder(child)

    postorder(node):
        for each child in node.children:
            postorder(child)
        process(node)

Note that unlike a binary tree, this general tree does not contain any null values.
A leaf is represented as a node with an empty list of children, not a node with two
null children. Depending on the intended application, it may however need to be possible
to represent an empty tree. If that is done by a null value, then only the root of a
general tree can be null, but a child node is never null.
