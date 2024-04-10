
## A Hard Information Flow Problem (optional)

Sometimes, passing the right information up and down the tree to control
a recursive function gets complicated. The information flow itself is
simple enough, but deciding what to pass might be tricky.

A more difficult example is illustrated by the following problem. Given
an arbitrary binary tree we wish to determine if, for every node $A$,
are all nodes in $A$'s left subtree less than the value of $A$, and are
all nodes in $A$'s right subtree greater than the value of $A$? (This
happens to be the definition for a binary search tree.) Unfortunately,
to make this decision we need to know some context that is not available
just by looking at the node's parent or children.

:::: {#BSTCheckFig}
<inlineav id="BSTCheckCON" src="BTRecurTutor/BSTCheckCON.js" name="BTRecurTutor/BSTCheckCON" links="BTRecurTutor/BSTCheckCON.css" static/>

To be a binary search tree, the left child of the node with value 40
must have a value between 20 and 40.
::::

As shown by [Figure #BSTCheckFig](#BSTCheckFig),
it is not enough to verify that $A$'s left child has a value less than
that of $A$, and that $A$'s right child has a greater value. Nor is it
enough to verify that $A$ has a value consistent with that of its
parent. In fact, we need to know information about what range of values
is legal for a given node. That information might come from any of the
node's ancestors. Thus, relevant range information must be passed down
the tree. We can implement this function as follows.

```python
def checkBST(node, low, high):
    if node is None: return True  # Empty subtree

    rootval = node.value()
    if rootval <= low or rootval >= high:
        return False  # Out of range

    return (checkBST(node.left(), low, rootval) and  # Check left subtree
            checkBST(node.right(), rootval, high))   # Check right subtree
```

```java
static boolean checkBST(BSTNode rt, Comparable low, Comparable high) {
  if (rt == null) return true; // Empty subtree
  Comparable rootval = rt.value();
  if ((rootval.compareTo(low) <= 0) || (rootval.compareTo(high) > 0))
    return false; // Out of range
  if (!checkBST(rt.left(), low, rootval))
    return false; // Left side failed
  return checkBST(rt.right(), rootval, high);
}
```

```java
static <E extends Comparable<E>> boolean checkBST(BinNode<E> node, E low, E high) {
    if (node == null) return true;  // Empty subtree

    E rootval = node.value();
    if (rootval.compareTo(low) <= 0 || rootval.compareTo(high) >= 0)
        return false;  // Out of range

    return checkBST(node.left(), low, rootval)    // Check left subtree
        && checkBST(node.right(), rootval, high); // Check right subtree
}
```


