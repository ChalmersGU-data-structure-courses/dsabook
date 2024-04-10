
## Binary Tree Node Implementations

In this module we examine one way to implement binary tree nodes. By
definition, all binary tree nodes have two children, though one or both
children can be empty. Binary tree nodes typically contain a value
field, with the type of the field depending on the application. The most
common node implementation includes a value field and pointers to the
two children.

Here is a simple implementation for binary tree nodes. When we need to
support search structures such as the
[Binary Search Tree]{.term}, the node will typically store a
[key-value pair]{.term}. Every `BinaryTreeNode` object also has two pointers, one to
its left child and another to its right child.

```python
# Binary tree node implementation
class BinaryTreeNode:
    def __init__(self, element=None, left=None, right=None):
        self.element = element   # Element for this node.
        self.left = left         # Pointer to left child.
        self.right = right       # Pointer to right child.

    def isLeaf(self):
        """Return True if a leaf node, False otherwise."""
        return self.left is None and self.right is None
```

```java
// Binary tree node implementation
class BinaryTreeNode<E> {
    public E element;               // Element for this node.
    public BinaryTreeNode<E> left;  // Pointer to left child.
    public BinaryTreeNode<E> right; // Pointer to right child.

    // Constructors
    BinaryTreeNode() {
        left = right = null;
    }
    BinaryTreeNode(E val) {
        left = right = null; element = val;
    }
    BinaryTreeNode(E val, BinaryTreeNode<E> l, BinaryTreeNode<E> r) {
        left = l; right = r; element = val;
    }

    // Return TRUE if a leaf node, FALSE otherwise.
    public boolean isLeaf() {
        return left == null && right == null;
    }
}
```



Sometimes, we will treat binary tree nodes as an *abstract data type*.
In those cases, instead of using the class above, we will use the
following `BinNode` ADT. It provides operations that set and return the
element value, return a pointer to the left or right child, and indicate
whether a node is a leaf.

```python
class BinNode:
    """Binary tree node ADT."""

    def value(self):           """Get the element value."""
    def setValue(self, value): """Set the element value."""

    def left(self):   """Return the left child."""
    def right(self):  """Return the right child."""

    def isLeaf(self): """return True if a leaf node, False otherwise."""
```

```java
interface BinNode { // Binary tree node ADT
  // Get and set the element value
  public Object value();
  public void setValue(Object v);

  // return the children
  public BinNode left();
  public BinNode right();

  // return TRUE if a leaf node, FALSE otherwise
  public boolean isLeaf();
}
```

```java
interface BinNode<E> {
    // Binary tree node ADT

    public E value();           // Get and set the element value.
    public void setValue(E v);  // Set the element value.

    public BinNode<E> left();   // Return the left child.
    public BinNode<E> right();  // Return the right child.

    public boolean isLeaf();    // return TRUE if a leaf node, FALSE otherwise.
}
```



| 

:::: {#BinLink}
<inlineav id="BTnullpointerCON" src="Binary/BTnullpointerCON.js" name="Binary/BTnullpointerCON" links="Binary/BTCON.css Binary/BTnullpointerCON.css" static/>

Illustration of a typical pointer-based binary tree implementation,
where each node stores two child pointers and a value.
::::

Some programmers find it convenient to add a pointer to the node's
parent, allowing easy upward movement in the tree. Using a parent
pointer is somewhat analogous to adding a link to the previous node in a
doubly linked list. In practice, the parent pointer is almost always
unnecessary and adds to the space overhead for the tree implementation.
It is not just a problem that parent pointers take space. More
importantly, many uses of the parent pointer are driven by improper
understanding of recursion and so indicate poor programming. If you are
inclined toward using a parent pointer, consider if there is a more
efficient implementation possible.

An important decision in the design of a pointer-based node
implementation is whether the same class definition will be used for
[leaves](#leaf-node){.term} and
[internal nodes](#internal-node){.term}. Using
the same class for both will simplify the implementation, but might be
an inefficient use of space. Some applications require data values only
for the leaves. Other applications require one type of value for the
leaves and another for the internal nodes. Examples include the
[binary trie]{.term}, the
[PR Quadtree]{.term}, the
[Huffman coding tree]{.term}, and the
[expression tree]{.term} illustrated by 
[Figure #DiffNodes](#DiffNodes). By definition, only
internal nodes have non-empty children. If we use the same node
implementation for both internal and leaf nodes, then both must store
the child pointers. But it seems wasteful to store child pointers in the
leaf nodes. Thus, there are many reasons why it can save space to have
separate implementations for internal and leaf nodes.

:::: {#DiffNodes}
<inlineav id="expressionTreeCON" src="Binary/expressionTreeCON.js" name="Binary/expressionTreeCON" links="Binary/BTCON.css Binary/expressionTreeCON.css" static/>

An expression tree for $4x(2x + a) - c$.
::::

As an example of a tree that stores different information at the leaf
and internal nodes, consider the expression tree illustrated by 
[Figure #DiffNodes](#DiffNodes). The expression tree
represents an algebraic expression composed of binary operators such as
addition, subtraction, multiplication, and division. Internal nodes
store operators, while the leaves store operands. The tree of 
[Figure #DiffNodes](#DiffNodes) represents the
expression $4x(2x + a) - c$. The storage requirements for a leaf in an
expression tree are quite different from those of an internal node.
Internal nodes store one of a small set of operators, so internal nodes
could store a small code identifying the operator such as a single byte
for the operator's character symbol. In contrast, leaves store variable
names or numbers, which is considerably larger in order to handle the
wider range of possible values. At the same time, leaf nodes need not
store child pointers.

[Object-oriented languages](#object-oriented-programming-paradigm){.term} allow us to differentiate leaf from internal nodes through
the use of a [class hierarchy]{.term}. A
[base class]{.term} provides a general
definition for an object, and a [subclass]{.term} modifies a base class to add more detail. A base class can
be declared for binary tree nodes in general, with subclasses defined
for the internal and leaf nodes. The base class in the following code is
named `VarBinNode`. It includes a virtual member function named
`isLeaf`, which indicates the node type. Subclasses for the internal and
leaf node types each implement `isLeaf`. Internal nodes store child
pointers of the base class type; they do not distinguish their
children's actual subclass. Whenever a node is examined, its version of
`isLeaf` indicates the node's subclass.

```python
# Base class for expression tree nodes
class VarBinNode:
    def isLeaf(self):  # All subclasses must implement
        raise NotImplementedError

# Leaf node
class VarLeafNode(VarBinNode):
    def __init__(self, val):
        self.operand = val
    def isLeaf(self):
        return True
    def value(self):
        return self.operand

# Internal node
class VarIntlNode(VarBinNode):
    def __init__(self, op, l, r):
        self.operator = op
        self.left = l
        self.right = r
    def isLeaf(self):
        return False
    def leftchild(self):
        return self.left
    def rightchild(self):
        return self.right
    def value(self):
        return self.operator

# Preorder traversal
def traverse(node):
    if node is None: return  # Nothing to visit
    if node.isLeaf():        # Process leaf node
        VisitLeafNode(node.value())
    else:                    # Process internal node
        VisitInternalNode(node.value())
        traverse(node.leftchild())
        traverse(node.rightchild())
```

```java
/* *** ODSATag: ExpressionTree1 *** */
// Base class for expression tree nodes
public interface VarBinNode {
  public boolean isLeaf(); // All subclasses must implement
}

/** Leaf node */
public class VarLeafNode implements VarBinNode {
  private String operand;                 // Operand value

  VarLeafNode(String val) { operand = val; }
  public boolean isLeaf() { return true; }
  public String value() { return operand; }
}
/* *** ODSAendTag: ExpressionTree1 *** */

/* *** ODSATag: ExpressionTree2 *** */
// Internal node
public class VarIntlNode implements VarBinNode {
  private VarBinNode left;                // Left child
  private VarBinNode right;               // Right child
  private Character operator;             // Operator value

  VarIntlNode(Character op, VarBinNode l, VarBinNode r)
    { operator = op; left = l; right = r; }
  public boolean isLeaf() { return false; }
  public VarBinNode leftchild() { return left; }
  public VarBinNode rightchild() { return right; }
  public Character value() { return operator; }
}
/* *** ODSAendTag: ExpressionTree2 *** */

// Preorder traversal
/* *** ODSATag: pointer based preorder *** */
public static void traverse(VarBinNode rt) {
  if (rt == null) { return; }         // Nothing to visit
  if (rt.isLeaf()) {                 // Process leaf node
    Visit.VisitLeafNode(((VarLeafNode)rt).value());
  }
  else {                           // Process internal node
    Visit.VisitInternalNode(((VarIntlNode)rt).value());
    traverse(((VarIntlNode)rt).leftchild());
    traverse(((VarIntlNode)rt).rightchild());
  }
}
/* *** ODSAendTag: pointer based preorder *** */
```

```java
/* *** ODSATag: ExpressionTree1 *** */
// Base class for expression tree nodes
public interface VarBinNode {
    public boolean isLeaf(); // All subclasses must implement
}

/** Leaf node */
public class VarLeafNode implements VarBinNode {
    private String operand;        // Operand value

    VarLeafNode(String val) {
        operand = val;
    }

    public boolean isLeaf() { return true; }
    public String  value()  { return operand; }
}
/* *** ODSAendTag: ExpressionTree1 *** */

/* *** ODSATag: ExpressionTree2 *** */
// Internal node
public class VarIntlNode implements VarBinNode {
    private VarBinNode left;       // Left child
    private VarBinNode right;      // Right child
    private Character  operator;   // Operator value

    VarIntlNode(Character op, VarBinNode l, VarBinNode r) {
        operator = op; left = l; right = r;
    }

    public boolean    isLeaf()     { return false; }
    public VarBinNode leftchild()  { return left; }
    public VarBinNode rightchild() { return right; }
    public Character  value()      { return operator; }
}
/* *** ODSAendTag: ExpressionTree2 *** */

// Preorder traversal
/* *** ODSATag: pointer based preorder *** */
public static void traverse(VarBinNode node) {
    if (node == null) return;  // Nothing to visit
    if (node.isLeaf()) {
        // Process leaf node
        Visit.VisitLeafNode(((VarLeafNode)node).value());
    } else {
        // Process internal node
        Visit.VisitInternalNode(((VarIntlNode)node).value());
        traverse(((VarIntlNode)node).leftchild());
        traverse(((VarIntlNode)node).rightchild());
    }
}
/* *** ODSAendTag: pointer based preorder *** */
```



<inlineav id="expressionTraversalCON" src="Binary/expressionTraversalCON.js" name="Expression Tree Traversal Slideshow" links="Binary/BTCON.css"/>

The Expression Tree implementation includes two subclasses derived from
class `VarBinNode`, named `LeafNode` and `IntlNode`. Class `IntlNode`
can access its children through pointers of type `VarBinNode`. Function
`traverse` illustrates the use of these classes. When `traverse` calls
method `isLeaf`, the language's runtime environment determines which
subclass this particular instance of `node` happens to be and calls that
subclass's version of `isLeaf`. Method `isLeaf` then provides the
actual node type to its caller. The other member functions for the
derived subclasses are accessed by type-casting the base class pointer
as appropriate, as shown in function `traverse`.
