
## Traversing trees

::: TODO
- Prio 1: merge with 03b-traversion-general-trees
- Prio 1: move subsection Implementation to a separate online section
- Prio 1: make some bullet lists into plain text instead? (now the section is a bit "scattered")
- Prio 2: refer to previous chapter
:::

Suppose we want to process the contents of a binary tree,
for instance by printing all the values or converting the tree to a list.
This is called a [traversal]{.term}
There are many different ways we can do that,
but these are three common patterns that differ in the order they process values:

- *preorder*:  first process the value, then the left subtree, then the right
- *inorder*:   first process the left subtree, then the value, finally the right subtree
- *postorder*: first process the left subtree, then the right, and finally the value

All of these are easily implemented using a simple recursive algorithm,
here for printing the values:

    preorder(node):             inorder(node):              postorder(node):
        if node is null:            if node is null:            if node is null:
            return                      return                      return
        print(node.value)           inorder(node.left)          postorder(node.left)
        preorder(node.left)         print(node.value)           postorder(node.right)
        preorder(node.right)        inorder(node.right)         print(node.value)

For our example tree (@fig:example_bintree), they will print the following:

- *preorder*:  A B D C E G F H I
- *inorder*:   B D A G E C H F I
- *postorder*: D B G E H I F C A

It may not be immediately obvious that this is the order
produced by the procedures above, but "running" them on
pen and paper should convince you. From the code it is clear
that in `postorder(A)`, $A$ is be the last node to be printed.
More generally, postorder will always print both children before the parent,
so an order that prints C before either F or E would not be postorder.

Example cases for each of the orders:

- *preorder*: Consider the file system tree in #fig:TreeExamples. A preorder can be used to print the directory structure with files nested inside their folders.
- *inorder*: Printing the expression tree in @fig:expression_tree is an inorder traversal: First print the left operand, then the operator, then the right operand.
- *postorder*: If we want to delete the tree in @Fig:bintree_with_pointers and free all the memory, we should do it from the bottom up, which is a postorder traversal.

<!--
Preorder traversal
:   Visit each node only *before* we visit its children (and their subtrees).
    For example, this is useful if we want to create a copy of a tree.
    First we create a copy of the current node, and then we can directly copy its subtrees into the new node.

Postorder traversal
:   Visit each node only *after* we visit its children (and their subtrees).
    This is useful when we want to delete a tree to free storage space (with manual memory management).
    Before we can delete the current node, we should delete all its children (and its children's children and so on).

Inorder traversal
:   First visit the left child (including its entire subtree), then visit the node, and finally visit the right child (including its entire subtree).
    If the tree is a [binary search tree]{.term}, then we can use inorder traversal to list all values in increasing order.

@Tbl:visiting-orders shows in which order the nodes in the example tree from @fig:example_bintree are visited, depending on the traversal strategy.

Traversal             Visiting order                    When is the root visited?
--------------------  --------------------------------  ------------------------------------------------------------------------
Preorder              **A, B, D, C, E, G, F, H, I**     A is the first visited node
Postorder             **D, B, G, E, H, I, F, C, A**     A is the very last node to visit
Inorder               **B, D, A, G, E, C, H, F, I**     after visiting the left subtree (B, D)

: Visiting order for the example tree in @fig:example_bintree {#tbl:visiting-orders}
-->

### Iterative traversal and Depth-first traversal {#tree-dfs}

Some programming languages have poor support for recursion.
It is possible to traverse a tree iteratively (using a loop) with a stack data structure.
We call the stack our *agenda*, consider it a to-do list containing nodes that we need to process.
Here is a piece of code that is structurally very similar to our recursive iterations,
but instead of making recursive calls we add child nodes to the agenda and loop:

    function DFS(root : Node):    // DFS is for Depth First Search
        agenda = new stack of nodes
        agenda.push(root)         // Initially, we need to process the root
        while agenda is not empty:
            n : Node = agenda.pop()
            process(n)
            agenda.add(n.right)   // replaces the recursive call for n.right
            agenda.add(n.left)    // replaces the recursive call for n.left

Try this code on a few example trees, writing up the content of the agenda after each iteration of the loop,
and keep track of the order in which `process` is called for different nodes.
You will find that it mimics a pre-order recursive procedure.
Note that moving `process(n)` below the add operations has no impact on the order in which nodes are processed.
Implementing inorder or postorder traversals using stack is possible, but much more complicated.

By modifying the data structure from a stack to a FIFO queue (and switching the order in which children are added),
we get a new traversal order. Try to figure out the pattern for this one:

    function BFS(root : Node):
        agenda = new stack of nodes
        agenda.enqueue(root)
        while agenda is not empty:
            n : Node = agenda.dequeue()
            process(n)
            agenda.add(n.left)
            agenda.add(n.right)

It will process the nodes level by level, left to right.
That is it will first process the root, then all the children of the root, then all the children of those nodes et cetera. For @fig:example_bintree, it processes A,B,C,D,E,F,G,H,I in that order.
This traversal order is called a Breadth-First Search (BFS) as opposed to the stack-based Depth-First Search (DFS).
The naming is due to the tendency of DFS to process nodes that are deep in the tree early, whereas BFS always visits all shallow nodes first.

BFS is useful for a wide range of applications.
It is also a good example of the power of data structures: By changing the data structure of our
agenda we can use the same or similar code to acchieve different useful behaviors.



::: online

As a reminder, here is the example tree again:

```jsav-figure
var AV = NewAV();
var btTop = -5;
var btLeft = 305;
var bt = AV.ds.binarytree({nodegap: 15, left: btLeft, top: btTop});
bt.root("A");
var rt = bt.root();
rt.left("B");
rt.left().right("D");
rt.right("C");
rt.right().left("E");
rt.right().left().left("G");
rt.right().right("F");
rt.right().right().left("H");
rt.right().right().right("I");
bt.layout();
AV.displayInit();
AV.recorded();
```

#### Interactive explanations
:::

::: dsvis
Here is a visualisation of preorder traversal.

``` {.jsav-animation src="Binary/preorderCON.js" links="Binary/BTCON.css" name="Preorder Traversal Slideshow"}
```
:::

::: dsvis
And a visualisation of postorder traversal.

``` {.jsav-animation src="Binary/postorderCON.js" links="Binary/BTCON.css" name="Postorder Traversal Slideshow"}
```
:::

::: dsvis
And finally a visualisation of inorder traversal.

``` {.jsav-animation src="Binary/inorderCON.js" links="Binary/BTCON.css" name="Inorder Traversal Slideshow"}
```
:::


### Implementation {#traversing-implementation}

A traversal routine is naturally written as a recursive function.
The initial call to the traversal function passes in a pointer to the root node of the tree.
The traversal function visits the node and its children (if any) in the desired order.
Here is a very generic pseudocode for all kinds of traversal:

:::::: latex
\booklink{Read the rest online}{8.4}{sec:traversing-implementation}
::::::

    function traverse(node):
        if node is not null:      // Only continue if this is a tree
            visitPreorder(node)   // Visit root node (PREORDER traversal)
            traverse(node.left)   // Process all nodes in left subtree
            visitInorder(node)    // Visit root node (INORDER traversal)
            traverse(node.right)  // Process all nodes in right subtree
            visitPostorder(node)  // Visit root node (POSTORDER traversal)


:::::: online
For example, preorder traversal specifies that a node should be visited before its children.
Then we can remove the lines for inorder and postorder, and we get the following preorder traversal function:

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

::::::


