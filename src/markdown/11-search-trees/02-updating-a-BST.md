
## Updating a binary search tree {#search-trees:updating-BSTs}

::: TODO
- Prio 1: Write short introduction
- Prio 1: can we reduce some code clutter?
- Prio 2: discuss complexity of guided information flow?
- Prio 3: both recursive and iterative versions
:::

### Inserting into a BST {#search-trees:BST-insertion}

How do we add a value to a BST?
First of all we have to search for it.
If the value is already in the tree we do nothing,
and if it doesn't exist we create a new node and attach it to the right place.
But how do we know where to add the new node?
After the search is finished, the pointer points to an empty node so this is not useful.
Insetad, we have to remember the *previous* node we looked at -- and then we can attach the new node as a child.
If the new value is smaller, we add the node as a left child, and if it is larger we add it as a right child.

::: algorithm
#### Algorithm: Adding to a BST
To add a value $x$ to a BST, initialise a *current* pointer to the root node, and a *previous* pointer to null.
Then repeat the following until *current* points to null:

- Compare $x$ with the value of *current*:
    - If they are equal, return -- no need to do anything because $x$ is already in the tree.
    - Otherwise, set *previous* to *current*, and
      reassign *current* to the left or right child, depending on if $x$ is smaller or larger.

Now create a new node with value $x$ and attach it as follows:

- Attach it to the root if *previous* is null, or
- to the left or right child of *previous*, depending on if $x$ is smaller or larger than *previous*.
:::

If you think that it is clumsy to keep two pointers in the algorithm above,
the recursive variant becomes very simple and compact:

::: algorithm
#### Algorithm: Adding to a BST, recursive version
To add a value $x$ to a BST node:

- If the node is empty, return a node node with value $x$.
- Compare $x$ with the node value:
    - If they are equal, return the node as it is.
    - Otherwise, reassign the left or right child (depending on if $x$ is smaller or larger)
      with the result of adding $x$ to it.
:::

How can we translate this high-level algorithm into working code?
The important part here is to realise that the recursive function should *return* the updated tree,
and then it is just a matter of reassigning the child.
So the pseudocode becomes something like this:

<!-- \newpage -->

    addHelper(node, x) -> BSTNode:
        if node is null:
            return new BSTNode(x)
        else if x == node.value:
            return node
        else if x < node.value:
            node.left = addHelper(node.left, x)
        else if x > node.value:
            node.right = addHelper(node.right, x)
        return node

The recursive function above is actually not the "real" function for adding a value,
but instead an internal *helper* function.
The toplevel function will have to call the helper with the *root* as the argument,
and also update the root with the result.

    add(bst, x):
        bst.root = addHelper(bst.root, x)


::: dsvis
Here is an interactive explanation of recursive insertion, this time in a BST *map*.

``` {.jsav-animation src="Binary/BSTinsertCON.js" links="Binary/BSTCON.css" name="BST Insert Slideshow"}
```
:::


::: dsvis
Here is an exercise on BST insertion.

```{.jsav-embedded src="Binary/BSTinsertPRO.html" type="pe" name="BST Insert Proficiency Exercise"}
```
:::

### Deleting from a BST {#search-trees:BST-deletion}

Removing a node from a BST is a bit trickier than adding,
but it is not too hard if we consider the possible cases one by one.
The first we have to do is to find the node with the element we want to remove,
using the standard search algorithm.
Now there are three possible cases:

- If it is a leaf node, we can just remove the parent's pointer to the node.
- If it has one single child, we simply point the parent's pointer to the child node directly.
- If it has two children, we call it an *inner node*.
  This is a trickier case that we have to discuss further.

To delete an inner node in a BST we don't actually delete the node,
because then we would have to restructure the tree quite a lot.
Instead we replace its value with another value.
The question is which value can we replace with?

We know that all values in the left subtree are smaller than the value we want to delete.
Of these values there is one which is the largest value,
and if we delete this one from the left subtree we can put it in the parent node instead.
So we replace the inner node value we want to delete with the largest of the values in the left subtree.
(*Alternatively*, we can replace it with the smallest value from the right subtree.
This is an equally good strategy, so we can just pick one of them.)

Wait a little, did we really solve anything by doing this?
We want to delete a value, and to be able to do that we have to delete a value in a subtree...

Yes, this works because we know that the largest value in a BST is never an inner node!
(And the same holds for smallest value.)
So, when we delete the largest (or smallest) value in the subtree
we know that we will have one of the two easy cases.
This means that we will not have to continue deleting values indefinitely.

The next question is, how do we find the largest value in a tree?
This is easy, we just go as far to the right as possible -- then we will end up in the largest element.
(And similar for the smallest value -- we go as far to the left as possible.)

![
    Deleting the root (C) from the leftmost tree results in either of the two trees to the right.
](images/10.1-BST-delete-root.svg){#fig:BST-example-deleted-root}


::: example
#### Example: Deleting from a BST

Suppose we want to delete the value C from the leftmost tree in @fig:BST-example-deleted-root.

- First we find the C node, and the node with the largest value in the left subtree, which is the B node.
- We delete the B node, which means that we have to redirect the right child of its parent X to Y.
- Finally we can replace the value in the C node with B.

Alternatively, if we instead decide to replace with the smallest element in the right subtree:

- The node with the smallest value in the right subtree is the D node.
- We delete the D node, which means that we have delete the right child of its parent X.
- Finally we replace the value in the C node with D.

In the end we will get one of the two BSTs to the right in @fig:BST-example-deleted-root.
Notice that both of these trees are different representations of exactly the same set.
:::

Now we are ready to formalise deletion into an algorithm.

::: algorithm
#### Algorithm: Deleting a value in a BST
If we want to delete the value $x$ in a BST, we first find the node that has that value.
There are three possibilities for that node:

- If it is a leaf node, we can just delete it -- meaning, setting the corresponding child pointer of its parent to *null*.
- If the node has exactly one child, redirect its parent to the child.
- If it is an inner node, find the largest node $y$ in the left subtree, and:
    - Update the value of the $x$ node to the value of the $y$ node.
    - Delete the $y$ node from the left subtree.
:::

How can we translate this algorithm into a working implementation?
There are several possibilities, but we will show a *recursive* variant because the code becomes a bit less messy.
One important thing to remember is that the recursive functions should return the updated tree,
just as the recursive version of adding a value, from above.
First we need a helper function for finding the largest value from a subtree:

    findLargest(node):
        while node.right is not null:
            node = node.right
        return node.value

Finally, here is the main recursive function that deletes a value from a subtree:

    removeHelper(node, value) -> BSTNode:
        if node is null:
            // We did not find the value, so do nothing.
        else if value < node.value:
            node.left = removeHelper(node.left, value)
        else if value > node.value:
            node.right = removeHelper(node.right, value)
        else if node has no children:
            node = null         // The node is a leaf, we can just delete it.
        else if node only has a left child:
            node = node.left    // Replace the node with its only child.
        else if node only has a right child:
            node = node.right   // Replace the node with its only child.
        else:   // Now we know that this is an inner node
            node.value = findLargest(node.left)      // Find the largest value in the left subnode,
            node.left = removeHelper(node.left, node.value)  // and delete this value.
        return node

And just as for recursive addition, we need to wrap this function in a toplevel call which starts with the tree root:

        remove(bst, x):
            bst.root = removeHelper(bst.root, x)


::: dsvis
Here is an interactive explanation of BST deletion.

``` {.jsav-animation src="Binary/BSTremoveCON.js" links="Binary/BSTCON.css" name="BST Remove Slideshow"}
```
:::


::: dsvis
Here is an exercise on BST deletion.

```{.jsav-embedded src="Binary/BSTremovePRO.html" type="pe" name="BST Remove Proficiency Exercise"}
```
:::

### Complexity analysis

The complexity of all basic operations all depend on how efficiently we can find the correct node,
and this depends crucially on the structure of the tree.

When we search for an element we go down one level in the tree every time we compare with a node.
So the worst case is when we search for a value that is in the lowest possible level,
which is the same as the *height* of the tree.
This means that the complexity of all basic operations is linear in the height, $O(h)$.
The height in turn depends on the tree structure:

-   If the tree is *balanced*, meaning that all leaves are approximately on the same level,
    then the height is logarithmic in the number of nodes, and then searching is $O(\log(n))$.
    The middle trees in @fig:BST-example are examples of balanced trees.
-   But if the tree us *unbalanced*, for example as the extremely left- and right-leaning trees in @fig:BST-example,
    then the height is the same as the number of nodes, and search becomes linear $O(n)$.

If we add values to a BST in sorted order (reversely sorted),
then the new node will always be added as far right as possible.
Therefore we will get an extremely unbalanced tree.
How long time will it take to build this tree?
Assume that we add $n$ values.
Adding one value is in the worst case linear in $n$, and since we do this $n$ times
it will take *quadratic* time to build the final BST, $O(n^2)$.

On the contrary, if we add the values in random order,
then it is possible to prove that the final tree will have *expected* logarithmic height.
Therefore, the operations will have expected worst-case complexity of $O(\log(n))$.
And building the final BST with $n$ values will be $O(n\log(n))$.

(This is similar to Quicksort with the simplest pivot, *take-first*, see @sec:sorting-2:quicksort.
Sorting an already sorted array will take quadratic time,
but if the list is randomly shuffled the complexity will be expected worst-case $O(n\log(n))$.)

In any case, almost nobody uses plain BSTs because there their worst-case complexity is too bad.
But there are plenty of useful data structures that are based on BSTs and which have good worst-case guarantees.
They accomplish this by automatically rebalancing themselves when necessary,
and this is the topic of the next section.
