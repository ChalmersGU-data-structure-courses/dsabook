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
Saying `B` could refer to the node in isolation or to the whole subtree, 
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
- The *size* of a tree or subtree is the total number of nodes it contains. The size of a node is one more than the sum of the sizes of its children, and zero for empty trees. 

Trees contain data in nodes, and when modelling a system as a tree, we need to consider 
what data is contained in nodes, and what it means to be a child/parent.


![Two familiar domains modelled as trees: Programming language syntax and file systems.](images/Trees-examples.svg){width=70% #fig:TreeExamples} 

@fig:TreeExamples shows two concrete applications of trees: 
Modelling program source code and file systems. 
For the source code example, every node is some kind of syntactic construct 
like a function call or an if-else statement. Being a child of a node means being a component of it, 
such as the parameter of a function call or the else-branch of an if-statement.
For the file system example, nodes are files and folders. 
The parent of a node is the folder that contains it.


There is no universal ADT or concrete data structure for trees, 
rather they form a family of data structures that differ in many ways. 
One important difference is the number of children nodes can have, 
another is the significance of order of siblings. 
Consider the two examples: In the file system, the order of children of a node seems irrelevant.
In the syntax tree, order matters, there is a big difference between $a<3$ and $3<a$ after all.

