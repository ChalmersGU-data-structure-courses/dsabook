- Define: Ancestor, descendant, leaf (move here?), branch
- Expand/formalize defintions for: Path, height/size/level, 

## Tree terminology

![Drawing of a tree with six nodes, illustrating the concepts of root node, child and parent nodes, size/height/level properties, and paths.](images/Trees-terminology.svg){width=70% #fig:TreeTerminology} 

There is plenty of terminology for trees, most important is the concept of 
nodes, parents and children. 
@fig:TreeTerminology shows an example of how a tree is drawn, 
and some fundamental concepts. 
An observant reader may object that the tree is upside down compared to 
trees in nature (the root is at the top!), this is because we tend to process 
trees starting from the root. 

Note how every node in the tree is also the root of a *subtree*. 
For instance, node `B` is a child node of `A`, but it can also be considered 
the root of a tree containing `B`, `D`, and `E`.
Talking about `B` could refer to that node in isolation or to the whole subtree, 
depending on context. Properties like size do not make sense when discussing a 
node separate from its children, so when we say the size of `C` is two, clearly 
that refers to `C` as a subtree.

There are two important rules that all trees satisfy:

- Every node except the root node has exactly one parent node.
- There are no cycles, a node can not be its own ancestor.

Together, these rules enforce that trees look as in the example above: a hierarchical structure with a single path from the root to every other node. Below is a summary of some important and less important technical terms:

- A tree is *empty* if it has no nodes.
- *leaf*, *branch*, *forest*: Terms based on the tree analogy. A leaf node has no children, a branch has at least two children. A forest is, naturally, a collection of trees (such as a list). 
- *ancestor*, *descendant*, *sibling*: Terms based on the child/parent analogy that are mostly self-explanatory.
- A *path* is a sequence of nodes such that every node is the parent of the subsequent one. Often paths are from the root, but it could also be `[B,E]` or such in the example above. There are no paths between siblings or other distant relatives, only from ancestors to descendants. `[B,A,C]` is *not* a path in the example tree, since A is not a child of B.
- The *height* of a tree or subtree is the longest path you can form starting from its root. The height of a node is one more than the maximum height of its children, and zero for empty trees. 
- The *size* of a tree or subtree is the total number of nodes it contains. The height of a node is one more than the sum of the sizes of its children, and zero for empty trees. 


![Two familiar domains modelled as trees: Programming language syntax and file systems.](images/Trees-examples.svg){width=70% #fig:TreeExamples} 

@fig:TreeExamples shows two concrete applications of trees: 
Modelling file systems and program source code. 
There is no single universal ADT or concrete data structure for trees, 
rather they form a family of data structures that differ in some ways. 
One important characteristic is the number of child nodes a node can have, 
another is if order of child nodes is significant. 
Consider the two examples above, in the file system, order of children seems irrelevant.
In the syntax tree, order matters, there is a big difference between $a<3$ and $3<a$ after all.

