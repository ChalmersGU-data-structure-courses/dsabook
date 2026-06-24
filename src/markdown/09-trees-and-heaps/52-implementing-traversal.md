:::::: online

## Implementing tree traversal {#trees:implementing-traversal}

A traversal routine is naturally written as a recursive function.
The initial call to the traversal function passes in a pointer to the root node of the tree.
The traversal function visits the node and its children (if any) in the desired order.
Here is a very generic pseudocode for all kinds of traversal:

    traverse(node):
        if node is not null:      // Only continue if this is a tree
            visitPreorder(node)   // Visit root node (PREORDER traversal)
            traverse(node.left)   // Process all nodes in left subtree
            visitInorder(node)    // Visit root node (INORDER traversal)
            traverse(node.right)  // Process all nodes in right subtree
            visitPostorder(node)  // Visit root node (POSTORDER traversal)


For example, preorder traversal specifies that a node should be visited before its children.
Then we can remove the lines for inorder and postorder, and we get the following preorder traversal function:

    preorder(node):
        if node is not null:      // Only continue if this is a tree
            visit(node)           // Visit root node
            preorder(node.left)   // Process all nodes in left subtree
            preorder(node.right)  // Process all nodes in right subtree

Function `preorder` first checks that the tree is not empty (if it is,
then the traversal is done and `preorder` simply returns). Otherwise,
`preorder` makes a call to `visit`, which processes the root node
(that is, prints the value or performs whatever computation as required by the
application). Function `preorder` is then called recursively on the left
subtree, which will visit all nodes in that subtree. Finally, `preorder`
is called on the right subtree, visiting all nodes in the right subtree.
Postorder and inorder traversals are similar. They simply change the
order in which the node and its children are visited, as appropriate.

::: dsvis
#### Preorder traversal practice

```{.jsav-embedded src="Binary/btTravPreorderPRO.html" type="pe" name="Binary Tree Preorder Traversal Exercise"}
```
:::

::: dsvis
#### Postorder traversal practice

```{.jsav-embedded src="Binary/btTravPostorderPRO.html" type="pe" name="Binary Tree Postorder Traversal Exercise"}
```
:::

::: dsvis
#### Inorder traversal practice

```{.jsav-embedded src="Binary/btTravInorderPRO.html" type="pe" name="Binary Tree Inorder Traversal Exercise"}
```
:::


### More about implementing tree traversals

Recall that any recursive function requires the following:

1.  The base case and its action.
2.  The recursive case and its action.

In this section, we will talk about some details related to correctly and
clearly implementing recursive tree traversals.

#### Base case

In binary tree traversals, most often the base case is to check if we
have an empty tree. A common mistake is to check the child pointers of
the current node, and only make the recursive call for a non-null child.

Recall the basic preorder traversal function.

    preorder(node):
        if node is not null:      // Only continue if this is a tree
            visit(node)           // Visit root node
            preorder(node.left)   // Process all nodes in left subtree
            preorder(node.right)  // Process all nodes in right subtree

Here is an alternate design for the preorder traversal, in which the
left and right pointers of the current node are checked so that the
recursive call is made only on non-empty children.

    // This is a bad idea:
    preorder2(node):
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
`preorder2` ensures that no recursive calls will be made on empty
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

:::: example
#### Example: Changing the node values in a tree

Consider the problem of incrementing the value for each node in a binary
tree. The following solution has an error, since it does redundant
manipulation to the left and the right children of each node.

    inefficient_increment(node):
        if node is not null:
            node.elem += 1
            if node.left is not null:
                node.left.elem += 1
                inefficient_increment(node.left.left)
            if node.right is not null:
                node.right.elem += 1
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

::::::


