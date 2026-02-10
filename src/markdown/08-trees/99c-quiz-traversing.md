
:::::::::::::::::::::::::::::::::::::::: quiz ::::::::::::::::::::::::::::::::::::::::
### Review questions: Binary tree traversals


:::::::::: question ::::::::::
Visiting each element in a tree is known as:

- [x] "Traversing"
- [ ] "Sorting"
- [ ] "Merging"
- [ ] "Inserting"
- [ ] "Enumerating"

::: hints
:::
::::::::::::::::::::::::::::::



:::::::::: question ::::::::::
Answer TRUE or FALSE.

If you are given the order of the nodes as
visited by a *postorder* traversal and the order of the nodes as
visited by an *inorder* traversal, do you have enough
information to reconstruct the original tree? Assume that the
nodes all have unique values.

- [x] True
- [ ] False

::: hints
- Build yourself a small example tree of about 6 or 7
nodes and see what happens.
- Consider the example where the root has value A. In the
postorder traversal, the left subtree is printed, then
the right subtree, then A. In the
inorder traversal, the left subtree comes first, then the
A, then the right subtree.
- From this information, we always know the root, the
contents of its left subtree, and the contents of its
right subtree.
- We can apply this concept recursively to reconstruct
the left subtree and the right subtree.
:::
::::::::::::::::::::::::::::::



:::::::::: question ::::::::::
Answer TRUE or FALSE.

If you are given the order of the nodes as
visited by a *preorder* traversal and the order of the nodes as
visited by an *inorder* traversal, do you have enough
information to reconstruct the original tree? Assume that the
nodes all have unique values.

- [x] True
- [ ] False

::: hints
- Build yourself a small example tree of about 6 or 7
nodes and see what happens.
- Consider the example where the root has value A. In the
preorder traversal, that A is printed first. In the
inorder traversal, the left subtree comes first, then the
A, then the right subtree.
- From this information, we always know the root, the
contents of its left subtree, and the contents of its
right subtree.
- We can apply this concept recursively to reconstruct
the left subtree and the right subtree.
:::
::::::::::::::::::::::::::::::



:::::::::: question ::::::::::
Answer TRUE or FALSE.

If you are given the order of the nodes as
visited by a *preorder* traversal and the order of the nodes as
visited by a *postorder* traversal, do you have enough
information to reconstruct the original tree? Assume that the
nodes all have unique values.

- [ ] True
- [x] False

::: hints
- Consider this example: The preorder traversal prints ABC, and
the postorder traversal prints CBA. Can you determine the
original tree from this information?
- In general, if a node has only one subtree, then the preorder
and postorder traversals do not give you enough information to
determine which side the subtree goes on.
:::
::::::::::::::::::::::::::::::



:::::::::: question ::::::::::
Answer TRUE or FALSE.

When you print out the nodes of binary
tree, the *leaf nodes* appear in the same relative
order for the preorder, inorder, and postorder traversals.

- [x] True
- [ ] False

::: hints
- Take a small binary tree with three or four leaf nodes
and see what happens with the traversals.
- Since all 3 traversals print the left subtree before
the right subtree, the leaves have to get printed in the
same order.
:::
::::::::::::::::::::::::::::::



:::::::::: question ::::::::::
The $n$ nodes in a binary tree can be visited in:

- [x] $O(n)$ time
- [ ] $O(1)$ time
- [ ] $O(\log n)$ time
- [ ] $O(n \log n)$ time
- [ ] $O(n^2)$ time

::: hints
- This would be done by a traversal. How much work does a
traversal do at each node?
- Each node is visted once, with constant time spent at
each.
:::
::::::::::::::::::::::::::::::



:::::::::: question ::::::::::
Why does function `preorder2()` presented in
the Traversal section make only half as many recursive calls
as function `preorder()`?

- [x] Because half of the pointers are null
- [ ] Because there are half as many nodes
- [ ] Because there are half as many leaf nodes
- [ ] Because only internal nodes get called

::: hints
- All nodes will eventually get called
- The number of nodes in the tree does not change based on
the algorithm used to traverse it.
- The Full Binary Tree Theorem tells us that roughly half of
all pointers in a binary tree are null. No recursive call is
made for these pointers by `preorder2`.
:::
::::::::::::::::::::::::::::::

::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::

