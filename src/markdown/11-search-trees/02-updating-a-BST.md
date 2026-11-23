
## Updating a binary search tree {#search-trees:updating-BSTs}

::: TODO
- Done?
:::

How do we add or delete a key in a BST?
In both cases we first have to search for it, using [](#alg:bst-search).
If the key is already present, then we don't need to add it,
but if it is not in the tree, the search tells us where to add it.
Conversely, when deleting, the search tells us which node we have to remove.

### Inserting into a BST {#search-trees:BST-insertion}

To add a key to a BST we first have to search for it.
If the key already in the tree we do nothing at all,
and if it doesn't exist we create a new node and attach it to the right place.
But how do we know where to add the new node?
In this case [](#alg:bst-search) returns the last visited node, which is exactly what we need,
because this is where the new node should be attached.
If the new key is smaller than the key of the parent node, we add the new node as a left child,
and if it is larger we add it as a right child.
This process is shown in [](#alg:bst-add).

::: {.algorithm #alg:bst-add}
#### Algorithm: Adding to a BST
To add a key $k$ to a BST, first search for $k$ using [](#alg:bst-search), which returns a node $p$.
If the key of $p$ is equal to $k$ we don't have to do anything at all.

Otherwise $k$ is not in the tree, so we create a new node with key $k$.
Attach the new node as a left or right child of $p$,
depending on whether $k$ is smaller or larger.
Here is how it can be done in pseudocode:

```pseudo
    function add(tree, key):
        parent = search(tree, key)
        node = new BSTNode(key)
        if parent is null: tree.root = node
        if key < parent.key: parent.left = node
        if key > parent.key: parent.right = node
```
:::

There is a recursive version too, which becomes very simple and compact,
and is shown in [](#alg:bst-add-recursive).
The important observation is that the recursive function should *return* the updated subtree,
even if it is not changed at all.
Then it is just a matter of reassigning the child pointer to the returned subtree.
Later in @sec:search-trees:AVL-trees we will modify this recursive implementation so that it works for AVL trees.

::: {.algorithm #alg:bst-add-recursive}
#### Adding to a BST, recursive version
To add a key $k$ to a BST node recursively:

- If the node is empty, return a new node with key $k$.
- Otherwise, compare $k$ to the node key:
    - If they are equal, return the node as it is.
    - Otherwise, reassign the left or right child (depending on whether $k$ is smaller or larger)
      to the result of recursively adding $k$ to the child.

In pseudocode this can look like follows:
```pseudo
    function addHelper(node, key) -> BSTNode:
        if node is null: return new BSTNode(key)
        if key < node.key: node.left = addHelper(node.left, key)
        if key > node.key: node.right = addHelper(node.right, key)
        return node
```
:::

Note that the function in [](#alg:bst-add-recursive) is actually not
the "real" function for adding a key to a BST,
but instead an internal *helper* function.
The toplevel function will have to call the helper with the `root` as the argument,
and also update the `root` with the result, like this:

    function add(bst, key):
        bst.root = addHelper(bst.root, key)


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
- If it has one single child, we re-point the parent to the child node directly.
- If it has two children, we call it an *inner node*.
  This is a trickier case that we have to discuss further.

To delete an inner node in a BST we don't actually delete the node,
because then we would have to restructure the tree quite a lot.
Instead we replace its key with another key.
The question is which key can we replace with?

We know that all keys in the left subtree are smaller than the key we want to delete.
Of these keys there is one which is the largest key,
and if we delete this one from the left subtree we can put it in the parent node
without breaking the BST invariant.
So we replace the key of the inner node with the largest of the keys in the left subtree.
(*Alternatively*, we can replace it with the smallest key from the right subtree.
This is an equally good strategy, so we can just pick any of them.)

Wait a little, did we really solve anything by doing this?
We want to delete a key, and to be able to do that we have to delete a key in a subtree.
Yes, this works because we know that the largest key in a subtree is never an inner node!
(And the same holds for the smallest key.)
So, when we delete the largest (or smallest) key in the subtree
we know that we will have one of the two easy cases.
This means that we will not have to continue deleting keys indefinitely.
The procedure is formalised in [](alg:bst-remove).

The next question is, how do we find the largest key in a tree?
This is easy, we just go as far to the right as possible -- then we will end up in the largest element.
(And similar for the smallest key -- we go as far to the left as possible.)

    function findLargest(node):
        while node.right is not null:
            node = node.right
        return node.key

![
    Deleting the root (C) from the leftmost tree results in either of the two trees to the right.
](images/11.2-BST-delete-root.svg){#fig:BST-example-deleted-root}


::: {.example #ex:bst-delete}
#### Example: Deleting from a BST

Suppose we want to delete the key C from the leftmost tree in @fig:BST-example-deleted-root.

- First we find the C node, and the rightmost node in the left subtree, which is the B node.
- We delete the B node, redirecting the left child of its parent C to A.
- Finally we can replace the key in the C node with B.

Alternatively, if we instead decide to replace with the smallest element in the right subtree:

- The node with the smallest key in the right subtree is the D node.
- We delete the D node, that is, we delete the left child of its parent E.
- Finally we replace the key in the C node with D.

In the end we will get one of the two BSTs to the right in @fig:BST-example-deleted-root.
Notice that both of these trees are different representations of exactly the same set.
:::

How can we turn [](#alg:bst-remove) into a working implementation?
There are several possibilities, but we show a *recursive* variant because the code becomes a bit less messy.
One important thing to remember is that the recursive function should return the updated subtree,
just as [](#alg:bst-add-recursive) for adding a key.
And just as for recursive addition, we need to wrap this function in a toplevel call:

        function remove(bst, key):
            bst.root = removeHelper(bst.root, key)

::: {.algorithm #alg:bst-remove}
#### Algorithm: Deleting a key in a BST
If we want to delete the key $k$ in a BST, we first find the node $n$ with key $k$.
There are three possibilities for that node:

- If $n$ is a leaf node, we can just delete it -- that is, set the corresponding child pointer of its parent to `null`.
- If $n$ has exactly one child, redirect its parent to the child.
- If $n$ is an inner node, find the largest (smallest) node $m$ in the left (right) subtree, and:
    - Set the key of $n$ to the key of $m$.
    - Delete $m$ from the left (right) subtree.

The algorithm can be implemented in pseudocode like this:
```pseudo
function removeHelper(node, key) -> BSTNode:
    if node is null:  return node0 1230120036, 'asd'; "asd"
    else if key < node.key:  node.left = removeHelper(node.left, key)
    else if key > node.key:  node.right = removeHelper(node.right, key)
    else if node has no children:    node = null
    else if node has no right child: node = node.left
    else if node has no left child:  node = node.right
    else if node has two children:
        node.key = findLargest(node.left)
        node.left = removeHelper(node.left, node.key)
    return node
```
:::


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
So the worst case is when we search for a key that is in the lowest possible level,
which is the same as the *height* of the tree.
This means that the complexity of all basic operations is linear in the height, $O(h)$.
The height in turn depends on the tree structure:

-   If the tree is *balanced*, meaning that all leaves are approximately on the same level,
    then the height is logarithmic in the number of nodes, and then searching is $O(\log(n))$.
    The middle trees in @fig:BST-example are examples of balanced trees.
-   But if the tree us *unbalanced*, for example as the extremely left- and right-leaning trees in @fig:BST-example,
    then the height is the same as the number of nodes, and search becomes linear $O(n)$.

If we add keys to a BST in sorted order,
then the new node will always be added as far right as possible.
Therefore we will get an extremely unbalanced tree.
How long time will it take to build this tree?
Assume that we add $n$ keys.
Adding one key is in the worst case linear in $n$, and since we do this $n$ times
it will take *quadratic* time to build the final BST, $O(n^2)$.

On the contrary, if we add the keys in random order,
then it is possible to prove that the final tree will have *expected* logarithmic height.
Therefore, the operations will have expected worst-case complexity of $O(\log(n))$.
And building the final BST with $n$ keys will be $O(n\log(n))$.^[
    This is similar to Quicksort with the simplest pivot, *take-first*, see @sec:sorting-2:quicksort.
    Sorting an already sorted array will take quadratic time,
    but if the array is randomly shuffled the complexity will be expected worst-case $O(n\log(n))$.
]

In any case, plain BSTs have a very bad worst-case complexity, which is a problem.
But there are plenty of useful data structures that are based on BSTs and which have good worst-case guarantees.
They accomplish this by automatically rebalancing themselves when necessary,
and this is the topic of the next section.
