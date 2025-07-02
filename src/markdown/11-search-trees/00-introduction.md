
# Search trees {#search-trees}

This chapter covers *binary search trees (BSTs)*, a data
structure that uses a binary tree to implement a set or a map.

However, as we will see, a problem with BSTs is that they might become *unbalanced*, which make them inefficient.
If the tree is unbalanced, all basic operations (searching, adding and removing) become linear in the size of the tree, $O(n)$.

The solution to that problem is make the trees automatically rebalance.
This can be done in many different ways, some examples are [AVL trees](#avl-tree){.term} (@sec:avl-trees), [Splay trees](#splay-tree){.term} (@sec:splay-trees) and [Red-black trees]{.term},
who all have their own way of making the basic operaitions logarithmic, $O(\log n)$, in the size of the tree.
Another way of keeping the trees balanced is to use *non-binary* trees, such as 2-3 trees or more general B-trees, but we currently don't cover them in this book.



Not all data structures used for searching are trees --
in the end of the chapter we discuss [Skip lists]{.term}, which is an interesting hybrid between a tree and a [linked list]{.term} (@sec:stacks-implemented-as-linked-lists).
