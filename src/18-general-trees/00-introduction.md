
# General trees

::: TODO
- [5.10 General Trees]
- traversal: preorder, postorder (no inorder)
- use cases
:::

Many organizations are hierarchical in nature, such as the military and
most businesses. Consider a company with a president and some number of
vice presidents who report to the president. Each vice president has
some number of direct subordinates, and so on. If we wanted to model
this company with a data structure, it would be natural to think of the
president in the root node of a tree, the vice presidents at level 1,
and their subordinates at lower levels in the tree as we go down the
organizational hierarchy.

Because the number of vice presidents is likely to be more than two,
this company's organization cannot easily be represented by a binary
tree. We need instead to use a tree whose nodes have an arbitrary number
of children. Unfortunately, when we permit trees to have nodes with an
arbitrary number of children, they become much harder to implement than
binary trees. We consider such trees in this chapter. To distinguish
them from binary trees, we use the term [general tree]{.term}.

In this module we will examine general tree terminology and define
a basic class for general trees.
