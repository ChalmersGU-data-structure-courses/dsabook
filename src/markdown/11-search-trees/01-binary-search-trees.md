
## Binary search trees

::: TODO
- Prio 1: invariants
- Prio 2: update pseudocode
- Prio 2: explanations
- Prio 3: update the section on guided information flow (file 01b)
- Prio 3: both recursive and iterative versions
:::

<!-- START NOTES -->

Binary search trees (BST) are binary trees that satisfy the following invariant:

- all elements in the left subtree are *smaller* than the node element, which in turn is *smaller* than all elements in the right subtree

So the example tree from before (@sec:binary-trees) is not a BST, but the following is:

![](images/BST-Example.png)

To search for an element in a BST, we start at the root and compare. If what we search for is smaller than the node value, we can search in the left subtree, and if it is larger we can search in the right subtree.

How do we add an element to a BST? First of all we have to search for it – if it is already in the tree we do nothing. But if the element is not in the tree, we know where it should be – it should be a child of the last node we compared with. If the element is smaller, we add a new node as a left child, and if the element is larger we add the new node as a right child.

### Deleting from a BST

Searching and adding are straightforward to implement. Deletion is a little trickier, but not too hard. The first we have to do is to find the node with the element we want to remove, using the standard search algorithm. Now there are three possible cases:

- It is a leaf node (A, D and G in the example tree). This is easy – we can just remove the parent’s pointer to the node.
- It has one single child (B and E in the example tree). This is also easy – simply point the parent’s pointer to the child node directly.
- It has two children (C and F in the example tree). This is the tricky case.

To delete an inner node in a BST we don’t actually delete the node, because then we would have to restructure the tree quite a lot. Instead we replace its value with another value. The question is which value can we replace with?

We know that all elements in the left subtree is smaller than the value we want to delete. This subtree has a largest element, and if we delete this largest element from the left subtree we can put it in the parent node instead. So we replace the element we want to delete by the largest of the elements in the left subtree.

(*Alternatively*, we can replace it with the smallest of the elements in the right subtree. It doesn’t matter, we can just pick a strategy.)

Ok, did we solve anything by doing this? We want to delete an element, and to be able to do that we have to delete an element in a subtree… yes, this works because we know that the largest element in a tree never has two children! (And we know the same for the smallest element.) So, if we delete the largest element in the subtree we know that we will have one of the two easy cases, so no infinite recursion or anything.

Now we’re almost done, but how do we find the largest element in the left subtree? Easy, we just start in the left subtree and go as far to the right as possible. Then we will end up in the largest element.

For example, let’s delete the root node C from our example tree.

- The largest element in the left subtree is B.
- We delete B from the left subtree.
- And finally we can replace the value C by B in the root node.

Alternatively, if we decide to replace with the smallest element in the right subtree:

- The smallest element in the right subtree is D.
- We delete D from the left subtree.
- And finally we can replace the value C by D in the root node.

In the end we will get one of the following two BSTs:

![](images/BST-ExampleDeleteRoot.png)

Notice that both of these trees are different representations of exactly the same set!

### The effect of order of insertion

There are infinitely many BSTs that represent the same set. (No, I’m just kidding, but the are exponentially many.) For example, all of these implement the same set:

![](images/BST-ExampleVariants.png)

### Complexity analysis

The complexity of the operations all depend on how efficient the search algorithm is. And this depends a lot on the structure of the tree.

When we search for an element we go down one level in the tree every time we compare with a node. So the worst case is when we search for a value that is in the lowest possible level. Which is the same as the *height* of the tree. And the height depends on the tree structure. If the tree is *balanced*, meaning that all leaves are on the same level, then the height is logarithmic in the number of nodes, and then searching is $O(\log(n))$. But if the tree us *unbalanced*, for example as the extremely right-leaning tree above, then the height is the same as the number of nodes, and search becomes linear $O(n)$.

If we build a BST from a sorted list (or reversely sorted), then we will get an extremely unbalanced tree. And if the list is completely random, it is possible to prove that thefinal BST will be quite balanced, and the expected complexity will be logarithmic.

(This is similar to Quicksort with take-first pivot: if we sort an already sorted array it will be quadratic, but if the list is random the complexity will be linearithmic.)

In any case, almost noone uses plain BSTs because there is no guarantee of their worst-case complexity. But there are plenty of useful data structures that are based on BSTs and which have good worst-case guarantees. They accomplish this by automatically rebalancing themselves when necessary. One example of such a self-balancing search tree are the AVL trees (which I will talk about tomorrow).

### Test them yourself

There are nice interactive visualisations of BSTs (and other search trees) here:
https://chalmersgu-data-structure-courses.github.io/dsvis/collections.html

### Implementing maps instead of sets

The only real difference if we want to implement a map instead of a set, is the definition of the tree nodes. Every node now has to store both the key and the value:

```
class TreeNode:
    key: Key
    value: Value
    left: TreeNode
    right: TreeNode
```

When searching we only compare with the key, and the same when deleting.

When we set/update a key-value pair we have two possibilities:

- The key is already present: then we just change the value in the node.
- The key is not there: then we add a new tree node.


<!-- END NOTES -->

----------------

A [binary search tree]{.term}
([BST]{.term}) is a
[binary tree]{.term} that conforms to the
following condition, known as the
[binary search tree property]{.term}:

> All [nodes]{.term} stored in the left subtree of a node whose [key]{.term} value is $K$ have key values less than or equal to $K$. All nodes stored in the right subtree of a node whose key value is $K$ have key values greater than $K$.

@Fig:BSTShape below shows two
BSTs for a collection of values. One consequence of the binary search
tree property is that if the BST nodes are printed using an
[inorder traversal]{.term}, then the resulting enumeration will be in sorted order from
lowest to highest.

::: {.jsav-figure #fig:BSTShape}
``` {src="Binary/BSTShapeCON.js" links="Binary/BSTShapeCON.css"}
```
Two Binary Search Trees for a collection of values.
Tree (a) results if values are inserted in the order 37, 24, 42, 120, 32, 7.
Tree (b) results if the same values are inserted in the order 7, 37, 42, 32, 120, 24.
:::

The only thing that differentiates a BST from a normal binary tree is the BST property.
This property is an *invariant*, as as explained in @sec:invariants-preconditions-and-postconditions,
and it is a condition that the BST *always* must satisfy.

Invariants are not stored in the datatype, so the actual declaration for a BST is exactly the same as a normal binary tree:

    datatype BST:
        root: BinaryNode = null
        size: Int = 0

The BST property is therefore not explicit in the datatype declaration, but instead it is something that all operations must satisfy.
Whenever we implement a new operation, we have to make sure that we never break the property.

<!--
BST nodes are very similar to linked list nodes, but instead of just one child they two.

    class BSTNode of T:
        elem: T          // the element stored in the node
        value: V         // the value associated with the key
        left: BSTNode    // the left subtree, initially null
        right: BSTNode   // the right subtree, initially null

Here is a datatype declaration for the BST Map:

    datatype BSTMap of K to V implements Map:
        root: BSTNode = null
        size: Int = 0
 -->

<!--
### Invariants
 -->


#### Searching in a BST

Because of the BST property, we don't have to search the whole tree if we want to find an element.
Instead, we can start at the root node and compare its value with the value we are searching for.
If the value is smaller than the root, we know that we can disregard everything in the right subtree.
(And conversely, if the value is larger, we can disregard the left subtree.)

Now, assuming that the value was smaller than the root, we can go to the left child and compare again.
If the value now is larger than the child, we can continue into the child's right subtree.
We continue this until we have found the value in a node, or until we reach an empty child.
If we reach an empty child we know that the value is not in the tree.
Here is a possible implementation of a method that returns true if the element is in the tree:

    datatype BST:
        ...
        contains(elem):
            node = root
            while node is not null:
                if elem == node.elem:
                    return true
                else if elem < node.elem:
                    node = node.left
                else if elem > node.elem:
                    node = node.right
            return false


#### Inserting into a BST

When we want to insert an element we first have to search for it, similar to what we did above.
If it already exists we don't have to do anything, and if it isn't in the tree we create a new node and attach it to the right place.
But how do we know where to add the new node?
The variable `node` becomes null if the element isn't found, so we have nothing to attach the node to -- instead we want to attach the new node to the *previous* tree node that we looked at.
The solution is to add another temporary variable, `parent`, which points to the parent of `node` -- i.e., its value in the previous iteration.

Now, after we have completed the search, and the element wasn't found, we can simply create a new node and attach it as a child to `parent`.
Depending on if the element is smaller or larger than the parent element, we make it a left or right child.
Alternatively, if the tree is empty then we have to attach the new node directly to the root.

    datatype BST:
        ...
        add(elem):
            // Search for the parent of the new node.
            parent = null
            node = root
            while node is not null:
                parent = node
                if elem == node.elem
                    return  // The element is already in the BST, so we do nothing.
                else if elem < node.elem:
                    node = node.left
                else if elem > node.elem:
                    node = node.right

            // Create a new node and attach it to the parent.
            node = new BinaryNode(elem)
            if parent is null:
                root = node  // The tree is empty, so we update the root.
            else if elem < parent.elem:
                parent.left = node
            else if elem > parent.elem:
                parent.right = node
            size = size + 1

We have to decide what to do when the node that we want to insert has a
key value equal to the key of some node already in the tree. If during
insert we find a node that duplicates the key value to be inserted, then
we have two options. If the application does not allow nodes with equal
keys, then this insertion should be treated as an error (or ignored). If
duplicate keys are allowed, our convention will be to insert the
duplicate in the left subtree.

The shape of a BST depends on the order in which elements are inserted.
A new element is added to the BST as a new leaf node, potentially
increasing the depth of the tree.
@Fig:BSTShape illustrates two BSTs
for a collection of values. It is possible for the BST containing $n$
nodes to be a chain of nodes with height $n$. This would happen if, for
example, all elements were inserted in sorted order. In general, it is
preferable for a BST to be as shallow as possible. This keeps the
average cost of a BST operation low.


### Recursive search and insert

Bot searching and insertion can be implemented as recursive function too, and it is instructive to see how to to that.
And since we showed the *set* operations `contains` and `add` above, we will show how to implement recursive versions of the *map* operations `get` and `put`.

:::::: latex
\booklink{Read the rest online}{11.1}{sec:recursive-search-and-insert}
::::::

:::::: online

Note that this means that our binary tree nodes will have the instance variables *key* and *value*, instead of the single *elem* that we used earlier.

#### Getting the value for a key
First we will look at the `get` operation for finding the record that matches a given key.
To accomplish this we need a recursive helper function which takes a node as argument, and we start by calling this function with the root:

    datatype BSTMap implements Map:
        ...
        get(key):
            return getHelper(root, key)

The function `getHelper` performs the same iteration as we did earlier with `contains`, but implicitly as recursive calls.
When the key is found it returns the value of the node, and if the key doesn't exist it returns null:

        getHelper(node, key):
            if node is null:
                return null
            else if key < node.key:
                return getHelper(node.left, key)
            else if key > node.key:
                return getHelper(node.right, key)
            else if key == node.key:
                return node.value


::: dsvis
Here is an interactive explanation of searching in a BST.

``` {.jsav-animation src="Binary/BSTsearchCON.js" links="Binary/BSTCON.css" name="BST Search Slideshow"}
```
:::

::: dsvis
Here is an exercise on the BST search algorithm.

```{.jsav-embedded src="Binary/BSTsearchPRO.html" type="pe" name="BST Search Proficiency Exercise"}
```
:::

#### Setting the value for a key

Now we look at how to set the value of a key.
Yet again we need a recursive helper function which we call with the root of the tree.
This function returns a pointer to the updated tree, and we have to make sure to update the root to this updated tree.

    datatype BSTMap implements Map:
        ...
        put(key, value):
            root = putHelper(root, key, value)

We do the same as for `getHelper` as for `putHelper` above, but we have to update the value of each child pointer in the path to be the new updated tree.

        putHelper(node, key, value):
            if node is null:
                size = size + 1
                return new BSTNode(key, value)
            else if key < node.key:
                node.left = putHelper(node.left, key, value)
            else if key > node.key:
                node.right = putHelper(node.right, key, value)
            else if key == node.key:
                node.value = value
            return node


::: dsvis
Here is an interactive explanation of recursive insertion.

``` {.jsav-animation src="Binary/BSTinsertCON.js" links="Binary/BSTCON.css" name="BST Insert Slideshow"}
```
:::

Note that, except for the last node in the path, `putHelper` will not
actually change the child pointer for any of the nodes that are visited.
In that sense, many of the assignments seem redundant. However, the cost
of these additional assignments is worth paying to keep the insertion
process simple. The alternative is to check if a given assignment is
necessary, which is probably more expensive than the assignment!

::: dsvis
Here is an exercise on BST insertion.

```{.jsav-embedded src="Binary/BSTinsertPRO.html" type="pe" name="BST Insert Proficiency Exercise"}
```
:::

::::::

### Removing from a BST

Removing a node from a BST is a bit trickier than inserting a node, but
it is not complicated if all of the possible cases are considered
individually. Before tackling the general node removal process, we need
a useful companion method, `largestNode`, which returns a pointer to the
node containing the maximum value in a subtree.

    function largestNode(node):
        while node.right is not null:
            node = node.right
        return node

This time we will show a *recursive* implementation of `remove`.
For this we need a recursive helper function which we initially call with the root of the tree.

    datatype BSTMap:
        ...
        remove(key):
            root = removeHelper(root, key)

Now we are ready for the `removeHelper` method. Removing a node with
given key value $R$ from the BST requires that we first find $R$ and
then remove it from the tree. So, the first part of the remove operation
is a search to find $R$. Once $R$ is found, there are several
possibilities. If $R$ has no children, then $R$'s parent has its
pointer set to **null**. If $R$ has one child, then $R$'s parent has its
pointer set to $R$'s child. The problem comes
if $R$ has two children. One simple approach, though expensive, is to
set $R$'s parent to point to one of $R$'s subtrees, and then reinsert
the remaining subtree's nodes one at a time. A better alternative is to
find a value in one of the subtrees that can replace the value in $R$.

Thus, the question becomes: Which value can substitute for the one being
removed? It cannot be any arbitrary value, because we must preserve the
BST property without making major changes to the structure of the tree.
Which value is most like the one being removed? The answer is the least
key value greater than the one being removed, or else the greatest key
value less than (or equal to) the one being removed. If either of these
values replace the one being removed, then the BST property is
maintained.

:::::: online
::: dsvis
Here is an interactive explanation of BST deletion.

``` {.jsav-animation src="Binary/BSTremoveCON.js" links="Binary/BSTCON.css" name="BST Remove Slideshow"}
```
:::
::::::

When duplicate node values do not appear in the tree, it makes no
difference whether the replacement is the greatest value from the left
subtree or the least value from the right subtree. If duplicates are
stored in the left subtree, then we must select the replacement from the
*left* subtree. To see why, call the least value in the right
subtree $L$. If multiple nodes in the right subtree have value $L$,
selecting $L$ as the replacement value for the root of the subtree will
result in a tree with equal values to the right of the node now
containing $L$. Selecting the greatest value from the left subtree does
not have a similar problem, because it does not violate the Binary
Search Tree Property if equal values appear in the left subtree.

::: note
*Note*: Alternatively, we can decide to store duplicate values in the
right subtree instead of the left. Then we must replace a deleted node
with the least value from its right subtree.
:::

The code for removal is shown here.
Note that the helper function returns the updated subtree, and we have to make sure to update the child pointers to this updated tree.
\

        removeHelper(node, key):
            if node is null:
                return null
            else if key < node.key:
                node.left = removeHelper(node.left, key)
                return node
            else if key > node.key:
                node.right = removeHelper(node.right, key)
                return node
            else if key == node.key:
                if node.left is null:
                    size = size - 1
                    return node.right
                else if node.right is null:
                    size = size - 1
                    return node.left
                else:
                    predecessor = largestNode(node.left)
                    node.key = predecessor.key
                    node.value = predecessor.value
                    node.left = removeHelper(node.left, predecessor.key)
                    return node


:::::: latex
\booklink{Read the rest online}{11.1}{sec:removing-from-a-bst}
::::::

:::::: online

    datatype BSTMap:
        ...
        remove(key):
            parent = null
            node = root
            while node is not null:
                parent = node
                if key < node.key:
                    node = node.left
                else if key > node.key:
                    node = node.right
                else: // key == node.key
                    break  // we found the key so break out of the loop
            if node is null:
                return  // the key is not in the tree, so do nothing

            // node to be deleted has at most one child
            if node.left is null or node.right is null:
                // newNode will replace the node to be deleted
                if node.left is null:
                    newNode = node.right
                else: // node.right is null
                    newNode = node.left

                if parent is null:
                    root = newNode  // the node to be deleted is the root, so update the root
                else if node == parent.left:
                    parent.left = newNode  // node is a left child, so make newNode a left child
                else: // node == parent.right
                    parent.right = newNode  // node is a right child, so make newNode a right child

                node = None

            // node to be deleted has two children
            else:
                predecessorParent = null
                predecessor = node.left
                while predecessor.right is not null:
                    predecessorParent = predecessor
                    predecessor = predecessor.right

                node.key = predecessor.key
                node.value = predecessor.value

                if predecessorParent is null:
                    node.left = predecessor.left
                else:
                    predecessorParent.right = predecessor.left

::: dsvis
Here is an exercise on BST deletion.

```{.jsav-embedded src="Binary/BSTremovePRO.html" type="pe" name="BST Remove Proficiency Exercise"}
```
:::

::::::


### Analysis

The cost for `contains`, `get`, `add`, and `put` is the depth of the node found
or inserted. The cost for `remove` is the depth of the node being
removed, or in the case when this node has two children, the depth of
the node with smallest value in its right subtree. Thus, in the worst
case, the cost for any one of these operations is the depth of the
deepest node in the tree. This is why it is desirable to keep BSTs
[balanced](#balanced-tree){.term}, that is, with
least possible height. If a binary tree is balanced, then the height for
a tree of $n$ nodes is approximately $\log n$. However, if the tree is
completely unbalanced, for example in the shape of a linked list, then
the height for a tree with $n$ nodes can be as great as $n$. Thus, a
balanced BST will in the average case have operations costing
$O(\log n)$, while a badly unbalanced BST can have operations in
the worst case costing $O(n)$. Consider the situation where we
construct a BST of $n$ nodes by inserting records one at a time. If we
are fortunate to have them arrive in an order that results in a balanced
tree (a "random" order is likely to be good enough for this purpose),
then each insertion will cost on average $O(\log n)$, for a total
cost of $O(n \log n)$. However, if the records are inserted in
order of increasing value, then the resulting tree will be a chain of
height $n$. The cost of insertion in this case will be
$\sum_{i=1}^{n} i \in O(n^2)$.

Traversing a BST costs $O(n)$ regardless of the shape of the tree.
Each node is visited exactly once, and each child pointer is followed exactly once.
For example, if we want to print the nodes in ascending order we can perform an inorder traversal (@sec:traversing-a-binary-tree), which then will take time linear in the size of the tree.

While the BST is simple to implement and efficient when the tree is
balanced, the possibility of its being unbalanced is a serious
liability. There are techniques for organising a BST to guarantee good
performance. Two examples are the
[AVL tree]{.term} (see @sec:avl-trees) and the
[splay tree]{.term} (see @sec:splay-trees). There
also exist other types of search trees that are guaranteed to remain
balanced, such as the [red-black tree]{.term} or the [2-3 Tree]{.term}.


### Guided information flow

When writing a recursive method to solve a problem that requires
traversing a binary tree, we want to make sure that we are visiting the
required nodes (no more and no less).

So far, we have seen several tree traversals that visited every node of
the tree. We also saw the BST search, insert, and remove routines, that
each go down a single path of the tree.
[Guided traversal]{.term} refers to a problem
that does not require visiting every node in the tree, though it
typically requires looking at more than one path through the tree. This
means that the recursive function is making some decision at each node
that sometimes lets it avoid visiting one or both of its children. The
decision is typically based on the value of the current node. Many
problems that require information flow on binary search trees are
"guided" in this way.

::: example
#### Example: Minimum value in a tree

An extreme example is finding the minimum value in a BST. A bad solution
to this problem would visit every node of the tree. However, we can take
advantage of the BST property to avoid visiting most nods in the tree.
You know that the values greater than the root are always in the right
subtree, and those values less than the root are in the left subtree.
Thus, at each node we need only visit the left subtree until we reach a
leaf node.
:::


::: dsvis
Here is a problem that typically needs to visit more than just a single
path, but not all of the nodes.

``` {.jsav-animation src="Binary/IneffBinaryTreeRangeCON.js" links="Binary/BSTCON.css" name="Inefficient Binary Tree Traversal on Range Slide Show"}
```
:::

<!-- ### Binary Search Tree Small Count Exercise -->

