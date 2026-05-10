
# Trees {#trees}

::: TODO
- Prio 2: update introduction
:::

[Tree]{.term} structures enable efficient
access and efficient update to large collections of data.
[Binary trees]{.term} in
particular are widely used and relatively easy to implement. 
But trees can model any kind of hierarchical data, including
things like describing mathematical expressions
and the syntax of computer programs
(using expression trees, see @sec:differentiating-between-internal-nodes-and-leaves).
We will also see them used for prioritising jobs 
(using binary heaps, see @sec:binary-heaps), and
organising the information needed to drive
data compression algorithms (using Huffman coding, see @sec:huffman-coding).

This chapter covers terminology used for discussing binary trees (@sec:binary-trees),
tree traversals (@sec:traversing-a-binary-tree),
approaches to implementing tree nodes (@sec:implementing-binary-trees),
and various examples of binary trees.
The chapter concludes by discussing non-binary trees, i.e., trees with more (or less) than two children (@sec:general-trees).

![Drawing of a tree with six nodes, illustrating the concepts of root node, child and parent nodes, size/height/level properties, and paths.](images/Trees-terminology.svg){width=70% #fig:TreeTerminology} 

There is plenty of terminology for trees, most important is the concept of 
nodes, parents and children. 
@fig:TreeTerminology shows an example of how a tree is drawn, 
and some fundamental concepts. 
An observant reader may object that the tree is upside down compared to 
trees in nature (the root is at the top), this is because we tend to process 
trees starting from the root. There are two important rules that all trees satisfy:

- Every node except the root node has exactly one parent node.
- There are no cycles, a node can not be its own ancestor.

Together, these rules enforce that trees look as in the example above: a hierarchical structure with a single path from the root to every other node.

![Two familiar domains modelled as trees: Programming language syntax and file systems.](images/Trees-examples.svg){width=70% #fig:TreeExamples} 

@fig:TreeExamples shows two concrete applications of trees. 
That a file system modelling file systems and program source code. 
There is no single universal ADT or data structure for trees, 
rather they form a family of data structures that differ in some ways. 
One important characteristic is the number of child nodes a node can have, 
another is if order of child nodes is significant. 
Consider the two examples above, in the file system, order of children seems irrelevant.
In the syntax tree, order matters, there is a big difference between $a<3$ and $3<a$ after all.

