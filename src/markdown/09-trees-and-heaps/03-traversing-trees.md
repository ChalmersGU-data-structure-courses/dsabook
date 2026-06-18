
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

### Traversal without recursion

Some programming languages have poor support for recursion.
It is possible to traverse a tree iteratively (using a loop) with a stack data structure.
We call the stack our *agenda*, consider it a to-do list containing nodes that we need to process.
Here is a piece of code that is structurally very similar to our recursive iterations,
but instead of making recursive calls we add child nodes to the agenda and loop:

    DFS(root : Node):    // DFS is for Depth First Search
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

    BFS(root : Node):
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


:::::: online

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

::::::
