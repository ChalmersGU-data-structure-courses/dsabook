
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

    function checkBST(node, low, high):
        if node is null:
            return true  // Base case: empty subtree

        rootval = node.elem
        if rootval <= low or rootval >= high:
            return false  // Value out of range

        return (checkBST(node.left, low, rootval) and  // Check left subtree
                checkBST(node.right, rootval, high))   // Check right subtree

How should we call this function on a given tree? 
Or in other words, what should be the initial `low` and `high` values?
If we don't have any other constraints we can let the initial range be
as large as possible, so we call the function like this:

    checkBST(tree, -∞, ∞)

