
:::::::::::::::::::::::::::::::::::::::: quiz ::::::::::::::::::::::::::::::::::::::::
### Review questions: Binary search trees


:::::::::: question ::::::::::
Answer TRUE or FALSE.

A BST is another name for a binary tree.

- [ ] True
- [x] False

::: hints
- A binary tree is either empty, or else a root node with
two binary trees as children.
- A BST (binary search tree) is a binary tree where, for
every node N, all nodes in the left subtree of N have key values
less than the key value of N, and all nodes in the right
subtree of N have key values greater than the key value of N.
:::
::::::::::::::::::::::::::::::



:::::::::: question ::::::::::
BST search, insert, and delete operations typically run in time $O(d)$. What is $d$?

- [x] The depth of the relevant node in the tree
- [ ] The number of divisions at each level
- [ ] The number of entries in each node
- [ ] The number of nodes in the tree
- [ ] The total number of entries in all the nodes of the tree

::: hints
- Think about a given insert or search operation.
- How many nodes get looked at?
- The operation moves down the tree, looking at a node at each level that it visits.
- So the total work is the number of nodes that it visits, which is the same as the depth of the last node.
:::
::::::::::::::::::::::::::::::

::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::

