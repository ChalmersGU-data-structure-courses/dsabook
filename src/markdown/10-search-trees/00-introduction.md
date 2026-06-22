
# Search trees {#search-trees}

This chapter covers *search trees*,
which are trees that have *ordering invariants* so that they can implement sets or maps.

The simplest search tree is the *binary search tree* (BST), which we cover in @sec:search-trees:BSTs.
If a BST is *balanced*, meaning that the left and right subtrees approximately equal in size,
then all basic operations (searching, adding and removing) become logarithmic in the size of the tree, $O(\log(n))$.
However, there is no guarantee that the BST will be balanced, and
if it is unbalanced, all basic operations instead become linear in the size of the tree, $O(n)$.

The solution to that problem is make the trees automatically rebalance.
This can be done in many different ways, some examples are *AVL trees*,
*2-3 trees*, *Red-black trees*, *B-trees*, and *Splay trees*,
who all have their own way of making the basic operations logarithmic, $O(\log(n))$, in the size of the tree.

Not all data structures used for searching are trees
-- for exampe, *Skip lists* is an interesting hybrid between trees and *linked lists*.
