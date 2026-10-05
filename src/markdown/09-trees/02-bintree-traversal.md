
## Traversing binary trees {#trees:bintree-traversal}

Suppose we want to process the contents of a binary tree,
for instance by printing all the values or converting the tree to a list.
This is called a [traversal]{.term}.
There are many different ways we can do that,
but the following are three common patterns that differ in the order they process values:

- *preorder*:  first process the value, then the left subtree, then the right
- *inorder*:   first process the left subtree, then the value, finally the right subtree
- *postorder*: first process the left subtree, then the right, and finally the value

All of these are easily implemented using recursion.
Here is how they look like for printing the values --
the only thing that differs is when the node itself is processed:

    preorder(n):           inorder(n):            postorder(n):
        if n is null:          if n is null:          if n is null:
            return                 return                 return
        print(n.value)         inorder(n.left)        postorder(n.left)
        preorder(n.left)       print(n.value)         postorder(n.right)
        preorder(n.right)      inorder(n.right)       print(n.value)

For our example tree (@fig:example_bintree), they will print the nodes in the following order:

::: online

    *preorder*               *inorder*             *postorder*
--------------------  ---------------------  ---------------------
  A B D C E G F H I     B D A G E C H F I      D B G E H I F C A
--------------------  ---------------------  ---------------------

:::

```{=latex}
%% We want the table to be more compact in print, so the code below will fit on the same page.
\medskip
{\centering
\begin{tabular}{ccc}
preorder      &    inorder        &    postorder  \\\hline
$A B D C E G F H I$  ~ & ~   $B D A G E C H F I$  ~ & ~  $D B G E H I F C A$ \medskip
\end{tabular}\par
}
```

`\noindent`{=latex}
It may not be immediately obvious that the procedures above produce this order, but this can be checked by tracing them on paper.
For example, `preorder(A)` first prints the root ($A$), then the left subtree ($BD$) and then the right subtree ($CEGFHI$),
while `inorder(A)` starts with the left ($BD$), followed by the root ($A$), and concludes with the right ($GECHFI$).
Finally, `postorder(A)` first prints the left ($DB$), then the right ($GEHIFCA$), and then the root ($A$).

Each traversal order is useful in different situations.
For example, a preorder traversal is appropriate for the file system tree in @fig:TreeExamples,
because it can print each folder before the files and subfolders it contains.
An inorder traversal appears naturally when printing the expression tree in @fig:expression_tree,
since we first print the left operand, then the operator, and finally the right operand.
A postorder traversal is useful when deleting the tree in @fig:bintree_with_pointers and freeing its memory,
because it processes the children before the parent.

### Traversal without recursion {#trees:traversal-without-recursion}

It is possible to traverse a tree *iteratively*, using a loop.
We then need to remember what nodes to process and in which order.
This is called an *agenda*, and you can consider it a to-do list containing nodes that we need to process.
Here is pseudocode that is structurally very similar to our recursive iterations,
but instead of making recursive calls we add child nodes to the agenda and loop:

    traverse(root):
        agenda = new empty collection of nodes
        add root to agenda        // Initially, we need to process the root
        while agenda is not empty:
            n = remove a node from agenda
            print(n.value)        // Process the current node
            agenda.add(n.left)    // Replaces the recursive call for n.left
            agenda.add(n.right)   // Replaces the recursive call for n.right

So, what data structure should we use for the agenda?
We need something where we can add and remove elements,
and we have discussed two such data structures in [Chapter @sec:sequences] -- the *stack* and the *queue*.

What happens if we use a stack as the agenda?
Try for yourself: trace the `traverse` function on the example tree,
by recording the contents of the agenda after each loop iteration.
Maybe you will notice that the traversal is similar to a *preorder* recursive procedure --
first it prints the node value, then the children.
Perhaps you also noticed that it prints the contents of the right subtree before the left subtree.
This is because a stack is "last-in-first-out", and since we added the right child after the left,
it will be processed before the left child.
But still, despite this minor difference `traverse` mimics a preorder recursive function.

::: online
![
    As a reminder, here is the example tree in @fig:example_bintree again.
](images/9.1-bintree-with-nulls.svg)
:::

Unfortunately, if we move the `print` function below the add operations, things will not change --
the nodes will be processed in exactly the same order.
Try to convince yourself why this is the case.
It is still possible to implement iterative versions of inorder or postorder, but considerably more complicated.

Now, what happens if we use a *queue* instead of the stack?
Try again to trace the function on the example tree.
Notice that it will process the nodes *level by level*, left to right.
That is, it will first process the root, then all the children of the root,
then all the children of those nodes, et cetera.
<!-- For the example tree it will process $A,B,C,D,E,F,G,H,I$, in that order. -->
This traversal order is called *breadth-first search* (BFS), because it processes all nodes level by level.

Similarly, if we use a stack as the agenda we get *depth-first search* (DFS),
because of its tendency to process nodes that are deep in the tree early.
Both DFS and BFS are useful for a wide range of applications.
They are also a good example of the power of data structures:
by changing the data structure of our agenda we can use the same or similar code to acchieve different useful behaviors.


:::::: online
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

