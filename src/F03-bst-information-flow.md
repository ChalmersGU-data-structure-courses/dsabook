
## Binary Tree Guided Information Flow

When writing a recursive method to solve a problem that requires
traversing a binary tree, we want to make sure that we are visiting the
required nodes (no more and no less).

So far, we have seen several tree traversals that visited every node of
the tree. We also saw the BST search, insert, and remove routines, that
each go down a single path of the tree.
[Guided traversal]{.term} refers to a problem
that does not require visiting every node in the tree, though it
typically requires looking at more than one path through the tree. This
means that the recursive function is making some decision at each node
that sometimes lets it avoid visiting one or both of its children. The
decision is typically based on the value of the current node. Many
problems that require information flow on binary search trees are
"guided" in this way.

::: topic
#### Example: Minimum value in a tree {-}

An extreme example is finding the minimum value in a BST. A bad solution
to this problem would visit every node of the tree. However, we can take
advantage of the BST property to avoid visiting most nods in the tree.
You know that the values greater than the root are always in the right
subtree, and those values less than the root are in the left subtree.
Thus, at each node we need only visit the left subtree until we reach a
leaf node.
:::

Here is a problem that typically needs to visit more than just a single
path, but not all of the nodes.

<inlineav id="IneffBinaryTreeRangeCON" src="Binary/IneffBinaryTreeRangeCON.js" name="Inefficient Binary Tree Traversal on Range Slide Show" links="Binary/BSTCON.css"/>

<!-- ### Binary Search Tree Small Count Exercise -->

