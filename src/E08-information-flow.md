
## Information Flow in Recursive Functions

Handling information flow in a recursive function can be a challenge. In
any given function, we might need to be concerned with either or both
of:

> 1.  Passing down the correct information needed by the function to do
>     its work,
> 2.  Returning (passing up) information to the recursive function's
>     caller.

Any given problems might need to do either or both. Here are some
examples and exercises.

### Local

Local traversal involves going to each node in the tree to do some
operation. Such functions need no information from the parent (other
than a pointer to the current node), and pass no information back.
Examples include preorder traversal and incrementing the value of every
node by one.

### Passing Down Information

Slightly more complicated is the situation where every node needs the
same piece of information to be passed to it. An example would be
incrementing the value for all nodes by some amount. In this case, the
value parameter is simply passed on unchanged in all recursive calls.

Many functions need information that changes from node to node. A simple
example is a function to set the value for each node of the tree to be
its depth. In this case, the depth is passed as a parameter to the
function, and each recursive call must adjust that value (by adding
one).

<!-- ### Binary Tree Set Depth Exercise -->

### Collect-and-return

Collect-and-return requires that we communicate information back up the
tree to the caller. Simple examples are to count the number of nodes in
a tree, or to sum the values of all the nodes.

::::: topic
#### Example: Number of nodes in a tree {-}

Consider the problem of counting (and returning) the number of nodes in
a binary tree. The key insight is that the total count for any
(non-empty) subtree is one for the root plus the counts for the left and
right subtrees. Where do left and right subtree counts come from? Calls
to function `count` on the subtrees will compute this for us. Thus, we
can implement `count` as follows.

    function count(node):
        if node is null: 
            return 0
        return 1 + count(node.left) + count(node.right)

The following solution is correct but inefficient as it does redundant
checks on the left and the right child of each visited node.

    function inefficient_count(node):
        if node is null: 
            return 0
        count = 0
        if node.left is not null:
            count = count + inefficient_count(node.left)
        if node.right is not null:
            count = count + inefficient_count(node.right)
        if node.left is null and node.right is null:
            return 1
        else:
            return 1 + count

:::::

When you write a recursive function that returns a value, such as
counting the number of nodes in the subtree, you have to make sure that
your function actually returns a value. A common mistake is to make a
recursive call and not capture the returned value. Another common
mistake is to not return a value.

<inlineav id="BinaryTreeMistakesCON" src="Binary/BinaryTreeMistakesCON.js" name="Binary Tree Common Mistakes Slideshow" links="Binary/WriteTrav.css"/>

<!-- ### Binary Tree Check Sum Exercise -->

<!-- ### Binary Tree Leaf Nodes Count Exercise -->

<!-- ### Binary Tree Sum Nodes Exercise -->


### Combining Information Flows

Many functions require both that information be passed in, and that
information be passed back. Let's start with a relatively simple case.
If we want to check if some node in the tree has a particular value,
that value has to be passed down, and the count has to be passed back
up. The downward flow is simple, as the value being checked for never
changes. The information passed up has the simple collect-and-return
style: Return True if and only if one of the children returns True.

<!-- ### Binary Tree Check Value Exercise -->

### Combination Problems

Slightly more complicated problems combine what we have seen so far.
Information passing down the tree changes from node to node. Data passed
back up the tree uses the collect-and-return paradigm.

<!-- ### Binary Tree Height Exercise -->

<!-- ### Binary Tree Get Difference Exercise -->

<!-- ### Binary Tree Has Path Sum Exercise -->
