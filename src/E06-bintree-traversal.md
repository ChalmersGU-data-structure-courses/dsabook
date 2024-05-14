
## Binary Tree Traversals

Often we wish to process a binary tree by "visiting" each of its
nodes, each time performing a specific action such as printing the
contents of the node. Any process for visiting all of the nodes in some
order is called a [traversal]{.term}. Any
traversal that lists every node in the tree exactly once is called an
[enumeration]{.term} of the tree's nodes. Some
applications do not require that the nodes be visited in any particular
order as long as each node is visited precisely once. For other
applications, nodes must be visited in an order that preserves some
relationship.

### Preorder Traversal

For example, we might wish to make sure that we visit any given node
*before* we visit its children. This is called a
[preorder traversal]{.term}.

:::: {#BinTravExample}
<inlineav id="BinExampCON" src="Binary/BinExampCON.js" name="Binary/BinExampCON" links="Binary/BinExampCON.css" static/>

A binary tree for traversal examples.
::::

::: topic
#### Example {-}

The preorder enumeration for the tree of 
[Figure #BinTravExample](#BinTravExample) is **A B D C E G F H I**.

The first node printed is the root. Then all nodes of the left subtree
are printed (in preorder) before any node of the right subtree.
:::

<inlineav id="preorderCON" src="Binary/preorderCON.js" name="Preorder Traversal Slideshow" links="Binary/BTCON.css"/>

### Postorder Traversal

Alternatively, we might wish to visit each node only *after* we visit
its children (and their subtrees). For example, this would be necessary
if we wish to return all nodes in the tree to free store. We would like
to delete the children of a node before deleting the node itself. But to
do that requires that the children's children be deleted first, and so
on. This is called a [postorder traversal]{.term}.

::: topic
#### Example {-}

The postorder enumeration for the tree of 
[Figure #BinTravExample](#BinTravExample) is **D B G E H I F C A**.
:::

<inlineav id="postorderCON" src="Binary/postorderCON.js" name="Postorder Traversal Slideshow" links="Binary/BTCON.css"/>

### Inorder Traversal

An [inorder traversal]{.term} first visits the
left child (including its entire subtree), then visits the node, and
finally visits the right child (including its entire subtree). The
[binary search tree]{.term} makes use of this traversal to print all nodes in ascending
order of value.

::: topic
#### Example {-}

The inorder enumeration for the tree of 
[Figure #BinTravExample](#BinTravExample) is **B D A G E C H F I**.
:::

<inlineav id="inorderCON" src="Binary/inorderCON.js" name="Inorder Traversal Slideshow" links="Binary/BTCON.css"/>

### Implementation

A traversal routine is naturally written as a recursive function. Its
input parameter is a pointer to a node which we will call `node`. The
initial call to the traversal function passes in a pointer to the root
node of the tree. The traversal function visits `node` and its children
(if any) in the desired order. For example, a preorder traversal
specifies that `node` be visited before its children. This can easily be
implemented as follows.

```python
def preorder(node):
    if node is None: return  # Empty subtree - do nothing
    visit(node)                # Visit root node
    preorder(node.left())    # Process all nodes in left
    preorder(node.right())   # Process all nodes in right
```

```java
static <E> void preorder(BinNode<E> node) {
    if (node == null) return;  // Empty subtree - do nothing
    visit(node);               // Visit root node
    preorder(node.left());     // Process all nodes in left
    preorder(node.right());    // Process all nodes in right
}
```



Function `preorder` first checks that the tree is not empty (if it is,
then the traversal is done and `preorder` simply returns). Otherwise,
`preorder` makes a call to `visit`, which processes the root node (i.e.,
prints the value or performs whatever computation as required by the
application). Function `preorder` is then called recursively on the left
subtree, which will visit all nodes in that subtree. Finally, `preorder`
is called on the right subtree, visiting all nodes in the right subtree.
Postorder and inorder traversals are similar. They simply change the
order in which the node and its children are visited, as appropriate.

### Preorder Traversal Practice

<avembed id="btTravPreorderPRO" src="Binary/btTravPreorderPRO.html" type="pe" name="Binary Tree Preorder Traversal Exercise"/>

### Postorder Traversal Practice

<avembed id="btTravPostorderPRO" src="Binary/btTravPostorderPRO.html" type="pe" name="Binary Tree Postorder Traversal Exercise"/>

### Inorder Traversal Practice

<avembed id="btTravInorderPRO" src="Binary/btTravInorderPRO.html" type="pe" name="Binary Tree Inorder Traversal Exercise"/>

### Summary Questions

<avembed id="TravSumm" src="Binary/TravSumm.html" type="ka" name="Tree Traversal Summary Questions"/>
