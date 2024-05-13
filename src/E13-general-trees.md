
## General Trees (optional)

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

In this module we will examine general tree terminology and define a
basic ADT for general trees.

### General Tree Definitions and Terminology

A [tree]{.term} $\mathbf{T}$ is a finite set of
one or more nodes such that there is one designated node $R$, called the
root of $\mathbf{T}$. If the set $(\mathbf{T} -\{R\})$ is not empty,
these nodes are partitioned into $n > 0$ disjoint sets $\mathbf{T}_0$,
$\mathbf{T}_1$, \..., $\mathbf{T}_{n-1}$, each of which is a tree, and
whose roots $R_1, R_2, ..., R_n$, respectively, are children of $R$. The
subsets $\mathbf{T}_i (0 \leq i < n)$ are said to be
[subtrees](#subtree){.term} of $\mathbf{T}$.
These subtrees are ordered in that $\mathbf{T}_i$ is said to come before
$\mathbf{T}_j$ if $i < j$. By convention, the subtrees are arranged from
left to right with subtree $\mathbf{T}_0$ called the leftmost child of
$R$. A node's [out degree]{.term} is the number
of children for that node. A [forest]{.term} is
a collection of one or more trees. 
[Figure #GenTreeFig](#GenTreeFig) presents further tree
notation generalized from the notation for binary trees.

:::: {#GenTreeFig}
<inlineav id="GenTreeCON" src="General/GenTreeCON.js" name="General/GenTreeCON" links="General/GenTreeCON.css" static/>

Notation for general trees. Node $P$ is the parent of nodes $V$, $S1$,
and $S2$. Thus, $V$, $S1$, and $S2$ are children of $P$. Nodes $R$ and
$P$ are ancestors of $V$. Nodes $V$, $S1$, and $S2$ are called
[siblings](#sibling){.term}. The oval surrounds
the subtree having $V$ as its root.
::::

Each node in a tree has precisely one parent, except for the root, which
has no parent. From this observation, it immediately follows that a tree
with $n$ nodes must have $n-1$ edges because each node, aside from the
root, has one edge connecting that node to its parent.

### An ADT for General Tree Nodes

Before discussing general tree implementations, we should first make
precise what operations such implementations must support. Any
implementation must be able to initialize a tree. Given a tree, we need
access to the root of that tree. There must be some way to access the
children of a node. In the case of the ADT for binary tree nodes, this
was done by providing member functions that give explicit access to the
left and right child pointers. Unfortunately, because we do not know in
advance how many children a given node will have in the general tree, we
cannot give explicit functions to access each child. An alternative must
be found that works for an unknown number of children.

One choice would be to provide a function that takes as its parameter
the index for the desired child. That combined with a function that
returns the number of children for a given node would support the
ability to access any node or process all children of a node.
Unfortunately, this view of access tends to bias the choice for node
implementations in favor of an array-based approach, because these
functions favor random access to a list of children. In practice, an
implementation based on a linked list is often preferred.

An alternative is to provide access to the first (or leftmost) child of
a node, and to provide access to the next (or right) sibling of a node.
Here are the class declarations for general trees and their nodes. Based
on these two access functions, the children of a node can be traversed
like a list. Trying to find the next sibling of the rightmost sibling
would return `null`.

```python
# General tree node ADT
class GTNode:
    def value(self): raise NotImplementedError
    def isLeaf(self): raise NotImplementedError
    def parent(self): raise NotImplementedError
    def leftmostChild(self): raise NotImplementedError
    def rightSibling(self): raise NotImplementedError
    def setValue(self, value): raise NotImplementedError
    def setParent(self, par): raise NotImplementedError
    def insertFirst(self, n): raise NotImplementedError
    def insertNext(self, n): raise NotImplementedError
    def removeFirst(self): raise NotImplementedError
    def removeNext(self): raise NotImplementedError

# General tree ADT
class GenTree:
    def clear(self): raise NotImplementedError
    def root(self): raise NotImplementedError
    def newRoot(self, value, first, sib): raise NotImplementedError
    def newLeftChild(self, value): raise NotImplementedError
```

```java
// General tree node ADT
public interface GTNode {
  public Object value();
  public boolean isLeaf();
  public GTNode parent();
  public GTNode leftmostChild();
  public GTNode rightSibling();
  public void setValue(Object value);
  public void setParent(GTNode par);
  public void insertFirst(GTNode n);
  public void insertNext(GTNode n);
  public void removeFirst();
  public void removeNext();
}

// General tree ADT
public interface GenTree {
  public void clear();      // Clear the tree
  public GTNode root();     // Return the root
  // Make the tree have a new root, give first child and sib
  public void newroot(Object value, GTNode first, GTNode sib);
  public void newleftchild(E value); // Add left child
}
```

```java
// General tree node ADT
public interface GTNode<E> {
    public E value();
    public boolean isLeaf();
    public GTNode<E> parent();
    public GTNode<E> leftmostChild();
    public GTNode<E> rightSibling();
    public void setValue(E value);
    public void setParent(GTNode<E> par);
    public void insertFirst(GTNode<E> n);
    public void insertNext(GTNode<E> n);
    public void removeFirst();
    public void removeNext();
}

// General tree ADT
public interface GenTree<E> {
    public void clear();       // Clear the tree
    public GTNode<E> root();   // Return the root
    // Make the tree have a new root, give first child and sib
    public void newRoot(E value, GTNode<E> first, GTNode<E> sib);
    public void newLeftChild(E value); // Add left child
}
```



### General Tree Traversals

There are three traditional
[tree traversals](#binary-tree-traversals) for [binary trees](#binary-tree){.term}: 
[preorder](#preorder-traversal){.term}, [postorder](#postorder-traversal){.term}, 
and [inorder](#inorder-traversal){.term}. 
For general trees, preorder and postorder traversals are
defined with meanings similar to their binary tree counterparts.
Preorder traversal of a general tree first visits the root of the tree,
then performs a preorder traversal of each subtree from left to right. A
postorder traversal of a general tree performs a postorder traversal of
the root's subtrees from left to right, then visits the root. Inorder
traversal does not have a natural definition for the general tree,
because there is no particular number of children for an internal node.
An arbitrary definition -- such as visit the leftmost subtree in
inorder, then the root, then visit the remaining subtrees in inorder --
can be invented. However, inorder traversals are generally not useful
with general trees.

<inlineav id="GenTreePreTravCON" src="General/GenTreePreTravCON.js" name="General Tree Preorder Traversal Slideshow" links="General/GenTreeCON.css"/>

To perform a preorder traversal, it is necessary to visit each of the
children for a given node (say $R$) from left to right. This is
accomplished by starting at R's leftmost child (call it $T$). From $T$,
we can move to $T$'s right sibling, and then to that node's right
sibling, and so on.

<inlineav id="GenTreePostTravCON" src="General/GenTreePostTravCON.js" name="General Tree Postorder Traversal Slideshow" links="General/GenTreeCON.css"/>

Using the General Tree ADT shown above, here is an implementation to
print the nodes of a general tree in preorder. Note the
*while* loop at the end, which processes the list of
children by beginning with the leftmost child, then repeatedly moving to
the next child until calling `next` returns `null`.

```python
# Preorder traversal for general trees
def preorder(rt):
    PrintNode(rt)
    if not rt.isLeaf():
        temp = rt.leftmostChild()
        while temp is not None
            preorder(temp)
            temp = temp.rightSibling()
```

```java
// Preorder traversal for general trees
static void preorder(GTNode rt) {
  PrintNode(rt);
  if (!rt.isLeaf()) {
    GTNode temp = rt.leftmostChild();
    while (temp != null) {
      preorder(temp);
      temp = temp.rightSibling();
    }
  }
}
```

```java
// Preorder traversal for general trees
static void preorder(GTNode<E> node) {
    PrintNode(node);
    if (!node.isLeaf()) {
        GTNode<E> temp = node.leftmostChild();
        while (temp != null) {
            preorder(temp);
            temp = temp.rightSibling();
        }
    }
}
```


