
## AVL trees

::: TODO
- Prio 1: invariants
- Prio 2: don't write the full source code
- Prio 2: move some things about rotations to previous overview section
:::

An AVL tree is a binary search tree with the following additional balancing invariant:

::: example
#### Invariant: AVL balance
For every node, the heights of its subtrees differ by at most 1.
:::

Note that this does not mean that AVL trees are perfectly balanced.
But the invariant guarantees that the height of the tree is never more than
1.44 times the height of a perfectly balanced binary search tree.
(Side note: 1.44 is actually $1/\log_2(\phi)$, where $\phi=(1+\sqrt{5})/2$ is the *golden ratio*.)
The exact constant is not important, as always when it comes to complexity,
but what it says is that the maximum height of an AVL tree is $O(\log(n))$ where $n$ is its size.

To maintain the invariant, AVL trees need to store an additional property in every tree node, the *balance factor*.
This is not really a "factor" (it has nothing to do with multiplication),
but rather the difference in heights between the right and the left subtrees.
Or in other words, $\text{bf}(t) = \text{height}(t.\text{right}) - \text{height}(t.\text{left})$.
Using this notation, the invariant can be formulated like this:

$$ -1\leq\text{bf}(t)\leq 1 \text{ for all tree nodes } t $$

When we draw AVL trees we usually write the balance factor beside each node.
Here are two balanced AVL trees representing the same set {A,B,C,D,E,F,G}:

![](images/AVL-Balanced.png)

Now we have to ensure that we restore the balance whenever a tree node becomes unbalanced,
and we do that by using *tree rotations*.
The tree can become unbalanced in two cases -- when *inserting* and when *deleting* values.

### Implementing AVL nodes

We can store the balance factor in every node,
and this uses very little extra memory since there are only three possibilities, $-1$, $0$ and $+1$.
Therefore, storing the balance uses only two bits per tree node.

However, if we do this the implementations of insertion and deletion become slightly more complicated,
so most AVL implementations store the *height* of each node instead.
If we know the height of each tree node, it is easy to calculate the balance using the formula above.
Storing the height will use more memory, but not a lot -- it is enough to use only one byte (8 bits) for the height,
because we will anyway never have room for any AVL tree with a height larger than $2^8=256$

### Inserting into an AVL tree

To insert a value into an AVL tree we first treat it as a standard binary search tree.
The value will therefore be added as a new leaf node somewhere in the tree.
But this might break the balance invariant of the parent node, or the parent's parent,
or any other ancestor all the way up to the root.
For example, if we want to add H to the previous trees, then they will look like follows,
where the balance factors that are changed are shown in red:

![](images/AVL-Unbalanced.png)

Notice that the left tree is still AVL balanced, so we do not have to do anything further.
But in the right tree, the gradparent F have become unbalanced.
The F node is *right-heavy*, and we can solve this imbalance by rotating it to the left.
In this case it is enough with a *single* rotation:

![](images/AVL-LeftRotate1.png)

#### Single rotations

The example above was when the unbalanced node had a *right-right imbalance*.
This means that not only the node itself is right-heavy, but its child is too.
When a node is right-right unbalanced, it has the general structure to the left:

![](images/AVL-LeftRotate2.png)

And after a single left rotation, it will look like the structure on the right.
As you can see, suddenly the imbalance disappears.

But there is another possibility that can be solved in the same way, if the subtree $t_2$ is as high as $t_3$:

![](images/AVL-LeftRotate3.png)

Before the rotation, the $x$ node had a balance factor of $+2$, but afterwards it has $-1$.
This is not a perfect balanced tree, but it is AVL balanced.

#### Double rotations

There is a third right-heavy case --
when the *right-left* grandchild ($t_2$) is higher than the *right-right* ($t_3$).
If we perform a single rotation over X we do not win anything:

![](images/AVL-WrongDoubleRotate.png)

Now we transformed the right-left imbalance into a left-right imbalance, which is equally bad.

The solution is to perform a *double rotation*.
That is, first we transform the right-left case into a right-right case, by a right rotation over Y.
After this we can rotate left over X:

![](images/AVL-DoubleRotate.png)

And now all nodes are AVL balanced!
The mirrored situations, *left* imbalances, are of course solved in the mirrored way, by
performing *right* rotations.

### Implementing insertion

AVL tree insertion and deletion are easiest to implement as recursive functions.
They are very similar to the normal BST insertion and deletion, but as the recursion unwinds up the tree,
we perform the appropriate rotation on any node that is found to be unbalanced.

::: algorithm
#### Algorithm: Adding to an AVL tree, recursively
To add a value $x$ to an AVL node:

- If the node is empty, return a node node with value $x$.
- If $x$ is equal to the node value, return the node as it is.
- If $x$ is smaller than the node value:
    - Reassign the left child with the result of adding $x$ to it.
    - If the node becomes unbalanced, single- or double-rotate to the right,
      depending on the kind of imbalance.
    - Update the height of the node, and return it.
:::


### Deleting a node

Deletion in an AVL tree is similar to AVL insertion:
first we use the normal BST deletion, and then we rebalance the parent nodes all the way up to the root.

We can start from the pseudocode in @sec:deleting-from-a-bst,
and we just have to rebalance and update the height right before we return the updated tree.


### Complexity analysis

How much extra time does it take to rebalance the tree?

When we add a new node (or delete one), several nodes might become unbalanced.
But all of these nodes are ancestors of the added (or deleted) node.
So in the worst case we have to rebalance all nodes that we passed when searching for the insertion point.
That is, all nodes on the path from the root node to the added node.

Since an AVL tree is balanced, there are never more than $O(\log(n))$ ancestors to any node.
So, in the worst case we will rebalance at most $O(\log(n))$ nodes after one insertion (or deletion).

Rebalancing one single node is constant time.
It involves one or two rotations, and a rotation is constant time.
Therefore, rebalancing a tree after insertion or deletion is logarithmic, $O(\log(n))$.

In fact, rebalancing after addition is constant time, because the tree will always be balanced after the first rebalancing.
But this doesn't change the complexity of addition, because it is logarithmic to find the insertion point.

In summary, we have come up with our first *efficient* general-purpose data structure for sets and maps.
This is also one of the most common ones in practice, and very easy to implement.


<!--
### Ordered sets and maps

Search trees have an additional property that for example hash tables do not: the elements are stored in sorted order. This means that we can implement some additional operations that sometimes are very useful: we can find the *minimum* or *maximum* values easily, and we can even find the *predecessor* or *successor* of a given value, or the *floor* or *ceiling*.

- *minimum*(): the smallest value in the set
- *predecessor*($e$): the largest value in the set that is smaller than $e$
- *floor*($e$): the largest value that is smaller or equal to $e$
- (and similar for *maximum*, *successor* and *ceiling*)

And of course there are corresponding operations for *ordered maps* too.
-->


### Yet another sorting algorithm

Using AVL trees we can define a very simple but efficient sorting algorithm.
First we build an AVL tree from all elements, and then we do an *inorder traversal*
(see @sec:traversing-a-binary-tree) to get the elements in sorted order:

    function avl_sort(list):
        tree = new ampty AVL tree
        for each x in list:
            add x to tree
        return inorder(tree)

What is the complexity of this algorithm?
The slowest part is building the tree:
it is a loop over $n$ elements and each iteration adds to the tree, which is logarithmic in $n$.
The final complexity of the loop is $O(n \log(n))$, and since inorder traversal is linear,
the complexity of sorting via an AVL tree is $O(n \log(n))$.

This has the same complexity as Mergesort, and is as good as the best sorting algorithms.
So why don't anyone use it?
It is because the hidden constants are bigger than Mergesort: it takes longer time and also uses more extra memory.
