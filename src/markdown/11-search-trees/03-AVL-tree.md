
## AVL trees

::: TODO
- Prio 1: invariants
- Prio 2: don't write the full source code
- Prio 2: move some things about rotations to previous overview section
:::

<!-- START NOTES -->

(AVL stands for its inventors, Georgy Adelson-Velsky and Evgenii Landis.)

Tree nodes in AVL trees store an additional property, their *balance factor*. This is not really a “factor” (it has nothing to do with multiplication), but rather the difference of height between the right and the left subtree:

- BF(N) = balance factor of N = height(N.right) – height(N.left)

AVL trees ensure that they are balanced, by enforcing the following *invariant*:

- –1 ≤ BF(N) ≤ 1 for all nodes N in the tree

Note that this doesn’t mean that AVL trees are perfectly balanced. But this invariant guarantees that the height of the tree is never more than 1.44 times the height of a perfectly balanced binary search tree. (Side note: 1.44 is not $\sqrt{2}$, but instead $1/\log_2(\phi)$.) The exact constant is (as always when it comes to complexity) not important, but what it says is that the maximum height of an AVL tree is $O(\log(n))$ where $n$ is its size.

When we draw AVL trees we usually write the balance factor beside each node. Here are two balanced AVL trees representing the same set {A,B,C,D,E,F,G}:

![](images/AVL-Balanced.png)

So how can we ensure that we never break the balancing invariant?

#### Inserting into an AVL tree

First we insert using the standard BST procedure. This might break the invariant of some ancestor node. For example, if we want to add H to the previous trees, then they will look like this, where the balance factors that are changed are shown in red:

![](images/AVL-Unbalanced.png)

Notice that the left tree is still AVL balanced, so we don’t have to do anything more. But in the right tree, the ancestor node F have become unbalanced. This is a so-called *right-right* imbalance, and this can be solved by a “simple left rotation”.

![](images/AVL-LeftRotate1.png)

One important thing to note is that the parent node has to be updated too: before the rotation its right child was F, but after the rotation its right child will be G instead.

#### Single rotations

The example above was when the unbalanced node had a *right-right imbalance*. This was solved by a *single left* rotation. The mirror situation, a *left-left* imbalance, is of course solved in the mirrored way, by a *single right rotation*.

When a node is right-right unbalanced, it has the general structure to the left:

![](images/AVL-LeftRotate2.png)

And after a single left rotation, it will look like the structure on the right. As you can see, suddenly the imbalance disappears.

There is another possibility, if the subtree $t_2$ is as high as $t_3$:

![](images/AVL-LeftRotate3.png)

Now the result is not perfect, but at least the inner nodes X and Y become AVL balanced.

#### Double rotations

There is a third right-heavy case, and that is when the *right-left* grandchild ($t_2$) is higher than the *right-right* ($t_3$). If we perform a single rotation over X we won’t win anything:

![](images/AVL-WrongDoubleRotate.png)

Now we transformed the right-left case into a left-right case, which is equally bad.

The solution is to perform a *double rotation*. First we transform the right-left case into a right-right case, by a right rotation over Y. After this we can rotate left over X:

![](images/AVL-DoubleRotate.png)

And now all nodes are balanced!

#### Deleting a node

Deletion in an AVL tree is similar to addition: first we use the normal BST deletion, and then we rebalance the parent nodes.

It is more tricky to implement deletion than addition, because there are more cases to take care of. Therefore we won’t do AVL deletion in this course.

#### Complexity analysis

How much extra time does it take to rebalance the tree?

When we add a new node (or delete one), several nodes might become unbalanced. But all of these nodes are ancestors of the added (or deleted) node. So in the worst case we have to rebalance all nodes that we passed when searching for the insertion point. That is, all nodes on the path from the root node to the added node.

Since an AVL tree is balanced, there are never more than $O(\log(n))$ ancestors to any node. So, in the worst case we will rebalance at most $O(\log(n))$ nodes after one insertion (or deletion).

Rebalancing one single node is constant time. It involves one or two rotations, and a rotation is constant time. Therefore, rebalancing a tree after insertion or deletion is logarithmic, $O(\log(n))$.

In fact, rebalancing after addition is constant time, because the tree will always be balanced after the first rebalancing. But this doesn’t change the complexity of addition, because it is logarithmic to find the insertion point.

In summary, we have come up with our first *efficient* general-purpose data structure for sets and maps. This is also one of the most common ones in practice, and very easy to implement.

#### Implementing AVL tree nodes

The only thing we have to change, compared to BST nodes, is that we need to store the balance for each node. This extra variable have the only possible values +1, 0 and –1:

```
class AVLNode:
    elem: Value
    balance: {-1,0,+1}
    left: AVLNode
    right: AVLNode
```

(An alternative is to store the subtree height in each node, and then we can calculate the balance as the difference of heights between each child.)

#### Ordered sets and maps

Search trees have an additional property that for example hash tables do not: the elements are stored in sorted order. This means that we can implement some additional operations that sometimes are very useful: we can find the *minimum* or *maximum* values easily, and we can even find the *predecessor* or *successor* of a given value, or the *floor* or *ceiling*.

- *minimum*(): the smallest value in the set
- *predecessor*($e$): the largest value in the set that is smaller than $e$
- *floor*($e$): the largest value that is smaller or equal to $e$
- (and similar for *maximum*, *successor* and *ceiling*)

And of course there are corresponding operations for *ordered maps* too.

#### Yet another sorting algorithm

Using AVL trees we can define a very simple but efficient sorting algorithm. First we build an AVL tree from all elements, and then we do an *inorder traversal* to get the elements in sorted order:

```
function avlsort(list):
    tree = new ampty AVL tree
    for each x in list:
        add x to tree
    return inorder(tree)
```

What is the complexity of this algorithm? The slowest part is building the tree: it is a loop over $n$ elements and each iteration adds to the tree, which is logarithmic in $n$. The final complexity of the loop is $O(n \log(n))$, and since inorder traversal is linear, the complexity of sorting via an AVL tree is $O(n \log(n))$.

This has the same complexity as Mergesort, and is as good as the best sorting algorithms. So why don’t anyone use it? It is because the hidden constants are bigger than Mergesort: it takes longer time and also uses more extra memory.

#### Test them yourself

There are nice interactive visualisations of AVL trees (and other search trees) here:
https://chalmersgu-data-structure-courses.github.io/dsvis/collections.html

<!-- END NOTES -->

--------------

The AVL tree is a BST with the following additional property:

> For every node, the heights of its subtrees differ by at most 1.

<!-- This line is a liiiittle too long for the book
> For every node, the heights of its left and right subtrees differ by at most 1.
 -->

As long as the tree maintains this property, if the tree contains $n$
nodes, then it has a depth of at most $O(\log n)$. As a result, search
for any node will cost $O(\log n)$, and if the updates can be done in
time proportional to the depth of the node inserted or deleted, then
updates will also cost $O(\log n)$, even in the worst case.

The key to making the AVL tree work is to alter the insert and delete
routines so as to maintain the balance property. Of course, to be
practical, we must be able to implement the revised update routines in
$O(\log n)$ time. To maintain the balance property, we are going to
use what are called [rotations]{.term}.

<!--
### Invariants
 -->

### Rotations

Rotation is an operation that takes a node in the tree and moves it one level higher.
@Fig:SingleRotation illustrates rotation. Here, $P$ and $S$ are nodes, while $A$, $B$ and
$C$ represent subtrees.

![Rotation.
In a rotation, node $S$ is promoted to the root, rotating with
node $P$. Because the value of $S$ is less than the value of $P$, $P$
must become $S$ 's right child. The positions of subtrees $A$, $B$, and
$C$ are altered as appropriate to maintain the BST property, but the
contents of these subtrees remains unchanged. (a) The original tree with
$P$ as the parent. (b) The tree after a rotation takes place.
Going from (a) to (b) is called a *right rotation*. We can also go from
(b) to (a) promoting node $P$ to the root -- this is called a *left
rotation*. In general, a right rotation makes the tree more
right-leaning, and a left rotation makes it more left-leaning.
](images/SingRot.png){width=60% #fig:SingleRotation}

In figure (a), node $S$ is the left child of the root. A *right rotation*
transforms it into the tree shown in figure (b),
where node $S$ has become the root. Note that, because the value of
$S$ is less than the value of $P$, $P$ must become $S$'s right child.
Right rotation means transforming a tree from having the shape in (a) to
having the shape in (b).

A *left rotation* is the opposite process: starting from the tree in
(b), transforming it to the tree in (a), by lifting node $P$ up. Notice
that a right rotation tends to make the tree more right-leaning, while a
left rotation tends to make it more left-leaning.

### AVL tree insertion

![An insertion that violates the AVL tree balance property.
Prior to the insert operation, all nodes of the tree are
balanced (i.e., the depths of the left and right subtrees for every node
differ by at most one). After inserting the node with value 5, the nodes
with values 7 and 24 are no longer balanced.
](images/AVLins.png){width=60% #fig:AVLinsert}

Consider what happens when we insert a node with key value 5, as shown
in @fig:AVLinsert. The tree on
the left meets the AVL tree balance requirements. After the insertion,
two nodes no longer meet the requirements. Because the original tree met
the balance requirement, nodes in the new tree can only be unbalanced by
a difference of at most 2 in the subtrees. For the bottommost unbalanced
node, call it $S$, there are 4 cases:

(1) The extra node is in the left child of the left child of $S$.
(2) The extra node is in the right child of the left child of $S$.
(3) The extra node is in the left child of the right child of $S$.
(4) The extra node is in the right child of the right child of $S$.

Cases 1 and 4 are symmetric, as are cases 2 and 3. Note also that the
unbalanced nodes must be on the path from the root to the newly inserted
node.

Our problem now is how to balance the tree in $O(\log n)$ time. It turns
out that we can do this using a series of rotations. Cases 1 and 4 can
be fixed using a [single rotation]{.term}, as
shown in @fig:AVLsingle.
Cases 2 and 3 can be fixed using a [double rotation]{.term},
as shown in @fig:AVLdouble.

![A single rotation in an AVL tree. This operation occurs when the excess
node (in subtree $A$) is in the left child of the left child of the
unbalanced node labeled $S$. By rearranging the nodes as shown, we
preserve the BST property, as well as re-balance the tree to preserve
the AVL tree balance property. The case where the excess node is in the
right child of the right child of the unbalanced node is handled in the
same way.
](images/AVLSingRot.png){width=60% #fig:AVLsingle}

![A double rotation in an AVL tree. This operation occurs when the excess
node (in subtree $B$) is in the right child of the left child of the
unbalanced node labeled $S$. By rearranging the nodes as shown, we
preserve the BST property, as well as re-balance the tree to preserve
the AVL tree balance property. The case where the excess node is in the
left child of the right child of $S$ is handled in the same way.
](images/AVLDblRot.png){width=60% #fig:AVLdouble}

AVL tree insertion and deletion are easiest to implement as recursive functions.
They are very similar to the normal BST insertion and deletion, but as
the recursion unwinds up the tree, we perform the appropriate rotation
on any node that is found to be unbalanced.

:::::: latex
\booklink{Read the rest online}{11.3}{sec:avl-tree-insertion}
::::::

::: example
#### Example: AVL insertion

In @fig:AVLinsert (b), the
bottom-most unbalanced node has value 7. The excess node (with value 5)
is in the right subtree of the left child of 7, so we have an example of
Case 2. This requires a double rotation to fix. After the rotation, 5
becomes the left child of 24, 2 becomes the left child of 5, and 7
becomes the right child of 5.
:::


:::::: online

To try out AVL insertion yourself and see how it works, see the AVL tree visualisation here:
https://chalmersgu-data-structure-courses.github.io/dsvis/collections.html

Here is an implementation of AVL trees:

    datatype AVLNode of K, V extends BSTNode:
        ...key, value, left, right  // All properties of the BSTNode
        height: Int = 1             // The height of this subtree.


    datatype AVLMap extends BSTMap:
        ...root, size   // All properties of the BSTMap
        ...get(key)     // Inherited from BSTMap

        put(key, value):
            // Add a key-value pair, or update the value associated with an existing key.
            // This is the same as BSTMap.put, except that it rebalances the node afterwards.
            root = putHelper(root, key, value)

        putHelper(node, key, value):
            // Recursive helper method for 'put', returns the updated node.
            if node is null:
                size = size + 1
                return new AVLNode(key, value)
            else if key < node.key:
                node.left = putHelper(node.left, key, value)
                updateHeight(node)
            else if key > node.key:
                node.right = putHelper(node.right, key, value)
                updateHeight(node)
            else: // key == node.key
                node.value = value
            return rebalance(node)

        remove(key):
            // Delete a key and its associated value.
            // This is the same as BSTMap.remove, except that it rebalances the node afterwards.
            root = removeHelper(root, key)

        removeHelper(node, key):
            // Helper method for 'remove', returns the updated node.
            if node is null:
                return null
            else if key < node.key:
                node.left = removeHelper(node.left, key)
                updateHeight(node)
                return rebalance(node)
            else if key > node.key:
                node.right = removeHelper(node.right, key)
                updateHeight(node)
                return rebalance(node)
            else: // key == node.key
                if node.left is null:
                    size = size - 1
                    return node.right
                else if node.right is null:
                    size = size - 1
                    return node.left
                else:
                    predecessor = largestNode(node.left)
                    old_value = node.value
                    node.key = predecessor.key
                    node.value = predecessor.value
                    node.left = removeHelper(node.left, predecessor.key)
                    updateHeight(node)
                    return rebalance(node)

Here are some helper functions:

    getHeight(node):
        // Return the height of a tree node, also works if the node is null.
        if node is null:
            return 0
        else:
            return node.height

    updateHeight(node):
        // Recompute the value of the height of a tree node.
        // Must be called every time the height could change.
        node.height = 1 + max(getHeight(node.left), getHeight(node.right))

    heightDiff(node):
        // Return the height difference of a node: left height - right height.
        return getHeight(node.left) - getHeight(node.right)

    largestNode(node):
        // Find the descendant node having the largest key.
        while node.right is not null:
            node = node.right
        return node

    rebalance(node):
        if node is null:
            return null
        diff = heightDiff(node)
        if diff > 1:  // Left-leaning
            leftDiff = heightDiff(node.left)
            if leftDiff == -1:  // Left-right: convert to left-left
                node.left = rotateLeft(node.left)
                updateHeight(node)
            return rotateRight(node)
        else if diff < -1:  // Right-leaning
            rightDiff = heightDiff(node.right)
            if rightDiff == 1:  // Right-left: convert to right-right
                node.right = rotateRight(node.right)
                updateHeight(node)
            return rotateLeft(node)
        else:
            return node

    rotateLeft(x):
        // Left rotation.
        ("""      x                 y
                    / \               / \
                A   y     ===>    x   C
                    / \           / \
                    B   C         A   B         """)
        // Variables are named according to the picture above.
        y = x.right
        B = y.left
        x.right = B
        y.left = x
        return y

    rotateRight(x):
        // Right rotation.
        ("""       x              y
                    / \            / \
                    y   C   ===>   A   x
                / \                / \
                A   B              B   C       """)
        // Variables are named according to the picture above.
        y = x.left
        B = y.right
        x.left = B
        y.right = x
        return y

::::::
