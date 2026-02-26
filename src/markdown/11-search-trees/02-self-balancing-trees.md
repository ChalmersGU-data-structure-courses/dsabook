
## Self-balancing trees

::: TODO
- Prio 2: write an overview of rotations
:::

<!-- START NOTES -->

As we saw, binary search trees (BST) work fine when we insert elements in a somewhat random order. Then the height of the final tree will grow logarithmically in the number of nodes, which is another way of saying that the tree is quite balanced.

The problem with BSTs is that we cannot guarantee that the tree will be balanced, and if we insert elements in the wrong order (for example in sorted order), then it will become very unbalanced. That's where self-balancing trees come in.

A *self-balancing* tree ensures that it will always be balanced, regardless in what order elements are added or removed from the tree. There are many many different kinds of self-balancing trees, and we will not have time to look into more than a couple. Today we will talk about AVL trees and next week it will be 2-3 trees and B-trees.

<!-- END NOTES -->

-----------

The [Binary Search Tree]{.term} has a
serious deficiency for practical use as a search structure. That is the
fact that it can easily become unbalanced, so that some nodes are deep
in the tree. In fact, it is possible for a BST with $n$ nodes to have a
depth of $n$, making it no faster to search in the worst case than a
linked list. If we could keep the tree balanced in some way, then search
cost would only be $O(\log n)$, a huge improvement.

One solution to this problem is to adopt another search tree structure
instead of using a BST at all. An example of such an alternative tree
structure is the [2-3 tree]{.term} or the [B-tree]{.term}.
But another alternative would be to modify the BST access
functions in some way to guarantee that the tree performs well. This is
an appealing concept, and the concept works well for heaps, whose access
functions maintain the heap in the shape of a complete binary tree.
Unfortunately, the heap keeps its balanced shape at the cost of weaker
restrictions on the relative values of a node and its children, making
it a bad search structure. And requiring that the BST always be in the
shape of a complete binary tree requires excessive modification to the
tree during update, as we see in the example in @fig:rebalanceBST.

![An attempt to re-balance a BST after insertion can be expensive. (a) A
BST with six nodes in the shape of a complete binary tree. (b) A node
with value 1 is inserted into the BST of (a). To maintain both the
complete binary tree shape and the BST property, a major reorganisation
of the tree is required.
](images/BSTBal.png){width=60% #fig:rebalanceBST}

If we are willing to weaken the balance requirements, we can come up
with alternative update routines that perform well both in terms of cost
for the update and in balance for the resulting tree structure.
The AVL tree (see @sec:avl-trees) works in this
way, using insertion and deletion routines altered from those of the BST
to ensure that, for every node, the depths of the left and right
subtrees differ by at most one.
The [red-black tree]{.term} is also a binary tree, which uses a different balancing mechanism.

A different approach to improving the performance of the BST is to not
require that the tree always be balanced, but rather to expend some
effort toward making the BST more balanced every time it is accessed.
One example of such a compromise is called the
splay tree (see @sec:splay-trees).


<!--
### Tree rotations

::: TODO
- overall idea of rotating in a tree
- left, right, left-left, left-right, etc
- steal from the AVL section
:::
 -->
