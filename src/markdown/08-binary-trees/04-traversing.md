
## Traversing a binary tree

::: TODO
- Prio 1: add more text
- Prio 2: refer to previous chapter
:::

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

:::: {#BinTravExample}
<inlineav id="BinExampCON" src="Binary/BinExampCON.js" name="Binary/BinExampCON" links="Binary/BinExampCON.css" static/>

A binary tree for traversal examples.
::::

### Depth-first and breadth-first

::: TODO
- BFS: use a queue
- DFS: use a stack, or be recursive
- for recursive DFS you can do preorder, postorder or inorder
:::


### Preorder, postorder and inorder

#### Preorder traversal

For example, we might wish to make sure that we visit any given node
*before* we visit its children. This is called a
[preorder traversal]{.term}.

::: topic
#### Example: Preorder enumeration {-}

The preorder enumeration for the tree of
[Figure #BinTravExample](#BinTravExample) is **A B D C E G F H I**.

The first node printed is the root. Then all nodes of the left subtree
are printed (in preorder) before any node of the right subtree.
:::

<inlineav id="preorderCON" src="Binary/preorderCON.js" name="Preorder Traversal Slideshow" links="Binary/BTCON.css"/>

#### Postorder traversal

Alternatively, we might wish to visit each node only *after* we visit
its children (and their subtrees). For example, this would be necessary
if we wish to return all nodes in the tree to free store. We would like
to delete the children of a node before deleting the node itself. But to
do that requires that the children's children be deleted first, and so
on. This is called a [postorder traversal]{.term}.

::: topic
#### Example: Postorder enumeration {-}

The postorder enumeration for the tree of
[Figure #BinTravExample](#BinTravExample) is **D B G E H I F C A**.
:::

<inlineav id="postorderCON" src="Binary/postorderCON.js" name="Postorder Traversal Slideshow" links="Binary/BTCON.css"/>

#### Inorder traversal

An [inorder traversal]{.term} first visits the
left child (including its entire subtree), then visits the node, and
finally visits the right child (including its entire subtree). The
[binary search tree]{.term} makes use of this traversal to print all nodes in ascending
order of value.

::: topic
#### Example: Inorder enumeration {-}

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

    function preorder(node):
        if node is not null:      // Only continue if this is a tree
            visit(node)           // Visit root node
            preorder(node.left)   // Process all nodes in left subtree
            preorder(node.right)  // Process all nodes in right subtree

Function `preorder` first checks that the tree is not empty (if it is,
then the traversal is done and `preorder` simply returns). Otherwise,
`preorder` makes a call to `visit`, which processes the root node (i.e.,
prints the value or performs whatever computation as required by the
application). Function `preorder` is then called recursively on the left
subtree, which will visit all nodes in that subtree. Finally, `preorder`
is called on the right subtree, visiting all nodes in the right subtree.
Postorder and inorder traversals are similar. They simply change the
order in which the node and its children are visited, as appropriate.

#### Preorder traversal practice

<avembed id="btTravPreorderPRO" src="Binary/btTravPreorderPRO.html" type="pe" name="Binary Tree Preorder Traversal Exercise"/>

#### Postorder traversal practice

<avembed id="btTravPostorderPRO" src="Binary/btTravPostorderPRO.html" type="pe" name="Binary Tree Postorder Traversal Exercise"/>

#### Inorder traversal practice

<avembed id="btTravInorderPRO" src="Binary/btTravInorderPRO.html" type="pe" name="Binary Tree Inorder Traversal Exercise"/>


### More about implementing tree traversals

Recall that any recursive function requires the following:

> 1.  The base case and its action.
> 2.  The recursive case and its action.

In this section, we will talk about some details related to correctly and
clearly implementing recursive tree traversals.

#### Base case

In binary tree traversals, most often the base case is to check if we
have an empty tree. A common mistake is to check the child pointers of
the current node, and only make the recursive call for a non-null child.

Recall the basic preorder traversal function.

    function preorder(node):
        if node is not null:      // Only continue if this is a tree
            visit(node)           // Visit root node
            preorder(node.left)   // Process all nodes in left subtree
            preorder(node.right)  // Process all nodes in right subtree

Here is an alternate design for the preorder traversal, in which the
left and right pointers of the current node are checked so that the
recursive call is made only on non-empty children.

    // This is a bad idea:
    function preorder2(node):
        visit(node)
        if node.left is not null:
            preorder2(node.left)
        if node.right is not null:
            preorder2(node.right)

At first, it might appear that `preorder2` is more efficient than
`preorder`, because it makes only half as many recursive calls (since it
won't try to call on a null pointer). On the other hand, `preorder2`
must access the left and right child pointers twice as often. The net
result is that there is no performance improvement.

Perhaps the writer of `preorder2` wants to protect against the case
where the root is `null`. But `preorder2` has an error. While
`preorder2` insures that no recursive calls will be made on empty
subtrees, it will fail if the original call from outside passes in a
null pointer. This would occur if the original tree is empty. Since an
empty tree is a legitimate input to the initial call on the function,
there is no safe way to avoid this case. So it is necessary that the
first thing you do on a binary tree traversal is to check that the root
is not `null`. If we try to fix `preorder2` by adding this test, then
making the tests on the children is completely redundant because the
pointer will be checked again in the recursive call.

The design of `preorder2` is inferior to that of `preorder` for a deeper
reason as well. Looking at the children to see if they are `null` means
that we are worrying too much about something that can be dealt with
just as well by the children. This makes the function more complex,
which can become a real problem for more complex tree structures. Even
in the relatively simple `preorder2` function, we had to write two tests
for `null` rather than the one needed by `preorder`. This makes it more
complicated than the original version. The key issue is that it is much
easier to write a recursive function on a tree when we only think about
the needs of the current node. Whenever we can, we want to let the
children take care of themselves. In this case, we care that the current
node is not `null`, and we care about how to invoke the recursion on the
children, but we do **not** have to care about how or when that is done.

#### The recursive call

The secret to success when writing a recursive function is to not worry
about how the recursive call works. Just accept that it will work
correctly. One aspect of this principle is not to worry about checking
your children when you don't need to. You should only look at the
values of your children if you need to know those values in order to
compute some property of the current node. Child values should not be
used to decide whether to call them recursively. Make the call, and let
their own base case handle it.

:::: topic
#### Example: Changing the node values in a tree {-}

Consider the problem of incrementing the value for each node in a binary
tree. The following solution has an error, since it does redundant
manipulation to the left and the right children of each node.

    function inefficient_increment(node):
        if node is not null:
            node.elem = node.elem + 1
            if node.left is not null:
                node.left.elem = node.left.elem + 1
                inefficient_increment(node.left.left)
            if node.right is not null:
                node.right.elem = node.right.elem + 1
                inefficient_increment(node.right.right)

The efficient solution should not explicitly set the child values that
way. Changing the value of a node does not depend on the child values.
So the function should simply increment the node value, and make
recursive calls on the children.
::::

In rare problems, you might need to explicitly check if the children are
null or access the child values for each node. For example, you might
need to check if all nodes in a tree satisfy the property that each node
stores the sum of its left and right children. In this situation, you
must look at the values of the children to decide something about the
current node. You do **not** look at the children to decide whether to
make a recursive call.

<!-- ### Binary Tree Increment By One Exercise -->
