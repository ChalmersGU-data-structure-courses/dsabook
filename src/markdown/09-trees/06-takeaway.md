
## Main takeaways and outlook {#trees:takeaway}

This chapter has introduced the concept of trees, their core terminology, and a few ways of
representing them as data structures.

Trees are very versatile, and there are many kinds of tree structures.
The binary tree is a special case of trees where every node has two children
(and there is a special empty node).
In a manner of speaking, inked lists (@sec:sequences:linked-lists) are
"unary trees" -- trees where every node has a single child.

Much like you have seen with arrays, we will be using trees with various invariants to
design new data structures.
When doing so we make heavy use of all definitions from this chapter,
so make sure you understand all these concepts before proceeding:

* Root and leaves
* Child-, parent- and sibling nodes
* Paths, ancestors, and descendants
* Balance, height, level and size
* Depth- and breadth-first tree traversals
* Binary and general trees

It is also vital to understand the recursive nature of trees -- that a tree consists of several smaller trees.
The term node is used to describe a single value in a tree, but every node is also the root of its own tree.
Depending on context, the word "node" may refer either to a single object or to a subtree.

:::::: latex
\wrapQRlink[4mm]{20mm}{-4mm}{\thesectionURL}{Chapter \thechapter{} online}
\section*{Online material}
Visit the online book for further reading, interactive explanations, visualisations, extra material, and exercises.
::::::

