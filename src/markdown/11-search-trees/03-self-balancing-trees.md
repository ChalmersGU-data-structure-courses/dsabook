
## Self-balancing trees {#search-trees:self-balancing}

::: TODO
- Prio 1: andalso rename variables `x`, `y` and `z`? but they are in the figures, so maybe they are good as they are
:::

As we saw in the last section, binary search trees (BSTs) work fine when we insert elements in a somewhat random order.
Then the height of the final tree will grow logarithmically in the number of nodes,
which is another way of saying that the tree is quite balanced.
The problem with BSTs is that we cannot guarantee that the tree will always be balanced:
if we insert elements in an unfortunate order (for example in sorted order), it will become very unbalanced.
This is where self-balancing trees come in.

A *self-balancing* tree ensures that it will always be balanced,
regardless of in which order elements are added or removed.
There are many different kinds of self-balancing trees, and in this book we will only discuss a handful.
The most straightforward is to start from a normal BST and modify its structure whenever we add or remove nodes.
We do this by stating additional *balance invariants*,
and whenever an invariant is broken we make sure to rebalance the tree to satisfy the invariant again.

Therefore we need to come up with a good balancing invariant, and some method for rebalancing.
Unfortunately, we cannot use the most obvious invariant -- that the tree must be perfectly balanced.
This is because it costs too much to maintain this invariant;
for example, @fig:BST-rebalance shows that we might need to reorganise the tree completely after each insertion.

![
    An attempt to re-balance a BST after insertion can be expensive.
    To the left is a *complete* tree with six nodes.
    If we insert the value A we get an left-unbalanced tree.
    To keep the tree as balanced as possible, we need to do a major reorganisation, which is very costly.
    Note that all nodes have moved around in the final tree to the right.
](images/11.3-BST-rebalance-bad.svg){#fig:BST-rebalance}

Instead we need to a find weaker balance invariant, and there are lots of different possibilities.
For example, in @sec:search-trees:AVL-trees we introduce the perhaps most famous of all self-balancing trees, the AVL tree;
and in [@sec:search-trees:23-trees;@sec:search-trees:B-trees]
we discuss 2-3 trees and B-trees which are a class of non-binary trees.

::: {.example #ex:scapegoat-trees}
#### Example: Scapegoat trees
One very simple solution is to not require that the tree must be completely balanced.
Instead the invariant is that the tree must always be *$\alpha$-balanced*:

$$
\text{height}(t) \leq \lfloor \log_{\alpha^{-1}}(n)\rfloor + 1
\quad(\text{where }\tfrac{1}{2}\leq\alpha<1)
$$

After inserting a new node, the tree might get $\alpha$-unbalanced.
If this happens we find a parent to the inserted node that is particularly unbalanced --
this parent node is called the *scapegoat*.
We then we rebuild the whole subtree at the scapegoat, making it completely balanced.
This restructuring process is linear in the size of the subtree, but it can be shown that it will not happen too often.
A similar strategy is used for deletion.
Using the techniques from @sec:analysis-3:amortisation,
it can be shown that the *amortised complexity* of insertion is logarithmic in the size of the tree, $O(\log(n))$.

We can decide ourselves how unbalanced we allow the tree to be:
a lower $\alpha$ (close to $1/2$) will result in a more balanced tree,
at the cost of having to perform more expensive rebalances.
:::

<!-- Another possibility is to use non-binary trees --
for example, in [@sec:search-trees:23-trees;@sec:search-trees:B-trees] we introduce the 2-3 trees and the B-trees.
Allowing the tree nodes to have more than two children makes it possible to keep the tree completely balanced at all times,
and therefore 2-3 trees and B-trees have logarithmic complexity. -->

<!-- In @sec:search-trees:splay-trees we introduce *splay trees*, which use yet another approach.
When you search for a value, the tree is rearranged so that the node that contains the value is moved to the root.
A splay tree is *not* guaranteed to be balanced in any way, but it is possible to show that the *amortised* complexity is logarithmic. -->


### Tree rotations {#search-trees:rotations}

Most self-balancing trees use *rotations* to restore their balance invariant,
and there are two main forms -- the *single* and the *double* rotation.
These rotations are used both by AVL trees, Red-black trees, Splay trees, and numerous other self-balancing BSTs.
However, not all use rotations --
for example, the Scapegoat trees from [](#ex:scapegoat-trees) instead build a completely new subtree.
In this section we only explain left rotations, but right rotations are of course analogous.

#### Single rotation

Assume that a subtree is *right*-unbalanced --
meaning that the right child has a larger size, or a larger height, or in some other way is "heavier" than the left child.
Let us call the left child $u$, and the right child consists of the two subtrees $z$ and $w$.
To *left-rotate* this subtree, we make the right child $y$ the parent,
and move the previous parent $x$ to the left so that it becomes a left child.
When doing this, $y$'s previous left child, $z$ has to reattach itself as a right child of $x$ instead.
We should not forget to update the parent node as well --
prior to the rotation its child was the $x$ node, but afterwards this should be $y$ instead.

![
    Left-rotating over the node $x$.
    The previous right child, $y$, now becomes the parent,
    and its left child $z$ has to reattach itself as a child of $x$.
](images/11.3-BST-left-rotate.svg){#fig:BST-left-rotate}

If the right-right child $w$ was the "heaviest" of the subtrees,
then this left-rotation should have made the subtree a little more balanced than before.
The rotation is shown in @fig:BST-left-rotate.

#### Double rotation

However, if the right-left child $z$ was "heavier", then a left-rotation might not solve our problems.
In that case, the only thing that happens is that the tree becomes left-heavy instead of right-heavy.

To solve right-left cases, we have to do a *double* rotation.
This means that we first make a single right rotation of the right child $y$,
followed by a left rotation of the parent $x$.
The first right rotation over the $y$ child transforms it into a right-right case,
and then we can continue with a normal left rotation like above.
As you can see in @fig:BST-double-rotate, the effect of a double rotation is that
the right-left grandchild $z$ moves two levels up to become the new parent.

![
    A right-left-rotation.
    First we right-rotate over the child $y$, and then left-rotate over the parent $x$.
    The effect is that the grandchild $z$ now becomes the parent of both $x$ and $y$.
](images/11.3-BST-right-left-rotate.svg){#fig:BST-double-rotate}


### Implementing rotations {#search-trees:implementing-rotations}

We implement a rotation by reassigning the child pointers of the involved nodes.
The only complication is to make sure to do this in the right order,
because when we reassign a pointer its old value is forgotten unless we have stored it somewhere else first.

In a single left rotation the previous parent $x$ should become a left child of the new parent $y$.
But at the same time we have to move $y$'s current left child $z$ -- it should become the new right child of $x$.
A single right rotation can therefore be summarised in two simple pointer assignments:

    function rotateRight(x):
        y = x.right
        x.right = y.left
        y.left = x
        return y

Recall that the *parent* should get a new child too --
it was $x$ before the rotation, and now it will instead be $y$.
This is why we return $y$, the new root of the subtree, that the parent can reattach itself to.

<!-- If we do not want a recursive implementation we need to keep track of the parent too,
including if it is a left or right child of the parent --
this is not difficult, but involves some more variables and if-clauses. -->

To implement a double right-left rotation, we perform a right rotation on the right child, $y$,
followed by a left rotation on the current node, $x$:

    function rotateRightLeft(x):
        x.right = rotateRight(x.right)
        return rotateLeft(x)

<!-- But we can also compress the two rotations into the following four pointer assignments:

    x.right = z.left ; z.left = x
    y.left = z.right ; z.right = y
-->
