
## Case study: Disjoint sets {#disjoint-sets}

::: TODO
- Prio 1: update text
- Prio 2: add use case = Kruskal's algorithm
:::

[General trees](#general-tree){.term} (@sec:general-trees) are trees
whose [internal nodes](#internal-node){.term}
have no fixed number of [children](#child){.term}. Compared to general trees,
<!-- OPENDSA: START -->
[binary trees](#binary-tree){.term} are
relatively easy to implement because each internal node of a binary tree
can just store two pointers to reach its (potential) children. In a
general tree, we have to deal with the fact that a given node might have
no children or few children or many children.

Even in a general tree, each node can have only one
[parent]{.term}. If we didn't need to go from a
node to its children, but instead only needed to go from a node to its
parent, then implementing a node would be easy. A simple way to
represent such a general tree would be to store for each node only a
pointer to that node's parent. We will call this the
[parent pointer representation]{.term} for
general trees. Clearly this implementation is not general purpose,
because it is inadequate for such important operations as finding the
leftmost child or the right sibling for a node. Thus, it may seem to be
a poor idea to implement a general tree in this way. However, the parent
pointer implementation stores precisely the information required to
answer the following, useful question:
***Given two nodes in a forest, are they part of the same tree?***
<!-- OPENDSA: END -->
