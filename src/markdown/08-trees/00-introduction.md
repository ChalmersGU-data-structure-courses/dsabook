
# Trees {#trees}

::: TODO
- Prio 2: update introduction
:::

[Tree]{.term} structures can enable efficient
access and efficient update to large collections of data.
[Binary trees]{.term} in
particular are widely used in data structures. 
Trees can model any kind of hierarchical data, including
things like mathematical expressions
and the syntax of computer programs
(using expression trees, see @sec:differentiating-between-internal-nodes-and-leaves).
We will also see trees used for prioritising jobs 
(using binary heaps, see @sec:binary-heaps), and
organising the information needed to drive
data compression algorithms (using Huffman coding, see @sec:huffman-coding).

This chapter covers terminology for trees (@sec:tree-terminology), discussing binary trees (@sec:binary-trees),
tree traversals (@sec:traversing-binary-trees),
approaches to implementing tree nodes (@sec:implementing-binary-trees),
and various examples of binary trees.
The chapter concludes by discussing non-binary trees, i.e., trees with more (or less) than two children (@sec:general-trees).
