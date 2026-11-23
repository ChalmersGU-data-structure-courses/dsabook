
## 2-3 trees {#search-trees:23-trees}

::: TODO
- Done?
:::

AVL trees do not ensure that a tree is perfectly balanced --
the height invariant cannot give a better guarantee than that
the height is within a constant times the optimal height.
But if we allow for more than two children per node
it is possible to ensure that all trees are perfectly balanced.
This is done by the 2-3 trees.

2-3 trees have two kinds of nodes: 2-nodes, which are normal binary nodes,
and 3-nodes, which have *two* keys and *three* children.
The normal BST *order invariant* can easily be generalised to 3-nodes,
where the two keys separate the children into a smaller, a middle and a larger subtree.
@Fig:23-example shows an example of a 2-3 tree.
In this tree, the root is a 3-node: it has two keys (18 and 32) and three children,
of which the left child is a 2-node containing the key 12.

![
   An example 2-3 tree consisting of six 2-nodes and five 3-nodes, with a total of 16 keys.
   Note that all leaves are on the same level.
](images/11.5-23-example.svg){#fig:23-example}

Notice that all the leaves in the tree are on the same level,
and this *balance invariant* is in fact true for all 2-3 trees.
The order and balance invariants can be summarised like this:

::: {.invariant #inv:2-3-tree-invariants}
#### Invariant: 2-3 tree order and balance
Every node in a 2-3 tree has to respect the *order invariant*.
For a 2-node this is [](#inv:bst-invariant)`\parpageref{}`{=latex},
and for a 3-node with keys $a$ and $b$ this means:

- all keys in the left subtree are *smaller* than $a$,
- all keys in the middle subtree are *between* $a$ and $b$, and
- all keys in the right subtree are *larger* than $b$.

In addition, all leaves in a 2-3 tree must be on the same level;
in other words, every path from the root to a leaf must have the same length.
:::

Since 2-3 trees have two different kinds of nodes,
all operations have to account for both of them, and all possible combinations that can occur.
Conceptually the operations are not difficult to understand,
but they can be quite complex to implement because of all cases we have to take care of.

#### Searching in a 2-3 tree

To search for a key $k$ we do the same as for BSTs: start at the root and follow a path down through the tree.
When we encounter a 3-node with keys $a$ and $b$ we do like this:

- if $k<a$: search in the left subtree
- if $a<k<b$: search in the middle subtree
- if $b<k$: search in the right subtree

<!-- As you can see, the same strategy as for BSTs, but more cases to handle. -->

### Inserting into a 2-3 tree

Conceptually the idea is similar to AVL trees:
first we search for the leaf where the key should be inserted,
then we insert the key, and finally we rebalance if necessary.
However, both the insertion and the rebalancing processes are quite different from BSTs and AVL trees.

Unlike for BST insertion, we do not create a new leaf node when inserting a key;
in other words, the 2-3 tree does not grow downwards.
Instead, a 2-3 tries to insert the new key into an existing node.
If the node becomes overfull, it is split and the middle key is *propagated* upwards, and inserted into its parent.
<!-- Therefore, a 2-3 tree does not grow downwards, but instead upwards in the tree. -->

The first we have to do is to search for the leaf node that would contain the key, if it were in the tree.
Then we try to insert the new key into this leaf,
by converting the node into a higher-ranked node and insert the key at its correct place.

::: dsvis
Inserting into a non-full leaf node.
``` {.jsav-animation src="Indexing/simpleInsertCON.js" scripts="Indexing/twoThreeTreeCON.js" links="Indexing/twoThreeTreeCON.css" name="2-3 Tree Insert Slideshow"}
```
:::

Therefore, a 2-node becomes a 3-node, and a 3-node becomes a 4-node, and we are done...
but wait, there are no 4-nodes!
When a node becomes overfull, we *split* it -- so the 4-node becomes two 2-nodes.
Hoever, a 2-node only has room for one key, and we have three keys we need to store --
where should the third key go?
The solution is to put the smallest and largest keys in one 2-node each,
and then *promote* the middle key to the parent.
@Fig:23-insert-leaf shows how to insert $c$ into a leaf 3-node consisting of $a$ and $b$.
The resulting leaf node becomes too big, so we split and promote the middle key, $b$.

![
   Inserting the key $c$ into a leaf 3-node results in a 4-node,
   which we have to split and then promote the middle key.
](images/11.5-23-insert-leaf.svg){#fig:23-insert-leaf}

Promoting a key means that we insert it into the parent node.
If the parent is a 2-node, then we just change it to a 3-node and we are done.
But if the parent is a 3-node, we are back in the same situation as before:
we get a 4-node that we need to split, and then we promote *its* middle key to its parent.
This is shown in @fig:23-insert-promote.

![
   If we promote a key into a 3-node, we have to split and promote again.
](images/11.5-23-insert-promote.svg){#fig:23-insert-promote}


::: dsvis
Inserting when the leaf node needs to be split.
``` {.jsav-animation src="Indexing/promoteCON.js" scripts="Indexing/twoThreeTreeCON.js" links="Indexing/twoThreeTreeCON.css" name="2-3 Tree Insert Promotion Slideshow"}
```
:::

Note that splitting a node and promoting the middle key upwards does not change the height of the tree,
as long as we end up in a parent that is a 2-node -- because then we can stop our promotion path.
This means that the balance invariant is not broken.
But what happens if we never reach a 2-node?
If we promote all the way up to the root, and the root is also a 3-node,
we simply split it and create a new root with the promoted key.
This will increase the height of the tree, but all the leaves will still be on the same level,
so the balance invariant is still respected.

::: dsvis
Inserting when the root node needs to be split, adding a new tree level.
``` {.jsav-animation src="Indexing/splitCON.js" scripts="Indexing/twoThreeTreeCON.js" links="Indexing/twoThreeTreeCON.css" name="2-3 Tree Insert Split Slideshow"}
```
:::

<!--
To see how all this works, go to the visualisation here:
https://chalmersgu-data-structure-courses.github.io/dsvis/collections.html?algorithm=BTree

First insert "A L G O R I T H M" into the empty tree, and you will get the following tree:

![](images/TwoThree-Algorithm.png)

- Now, insert P. You will see how the rightmost leaf is split, and the middle key (R) is promoted to the parent to create the 3-node [O,R].
- Then, insert K. The leaf [L,M] will be split and L is promoted to the parent [O,R]. This will also split, and the middle key O is promoted to the root to form the 3-node [I,O].
- Finally, insert "B C D E" into the tree. The first three insertions will create 3-nodes, so that when inserting E we have to split all the nodes all the way up to the root. Now the root has to be split, and we get a new level to the tree.
-->

Implementing insertion is not very difficult, but there are quite a lot of cases to handle
(for example, if the new key is smaller, or in between, or larger, than the existing keys).
On the other hand, you don't have to implement any rotations, but there is instead just the splitting and promoting.

### Deleting from a 2-3 tree

When deleting a key from a 2-3 tree, the basic idea is a mirror of insertion:
first we delete the key from the node, then we rebalance the tree to keep the invariants.
There are three main cases to consider:

1. The simplest case is when we remove from a 3-node that is a leaf --
   then we can simply remove it, and convert the 3-node to a 2-node.
2. The second case is if the leaf node is a 2-node, which contains just one key --
   then the resulting node will be a "1-node", which is not valid.
   This is discussed further below.
3. The third case is when we want to remove a key from an internal node.
   This is similar to when we remove a key from a BST node with two children --
   we don't delete the actual node, but instead replace its key with a key from another node which is easier to delete.
   This turns this case into case 1 or 2.

To solve case 2 we first try to "steal" a key from a sibling.
This works if any sibling is a 3-node: then we can rotate over the parent that lies between the nodes,
as shown in @fig:23-delete-steal.

![
   When deleting from a 2-node: if there is a 3-node sibling, we can steal from it.
](images/11.5-23-delete-steal.svg){#fig:23-delete-steal}

If neither sibling is a 3-node, we cannot steal anything.
In this situation we can instead *merge* our empty node with a sibling and the parent that lies between.
This is the opposite of splitting.
When we merge we create a new 3-node with the sibling key and the parent key.
The parent key is therefore *demoted* to its child, and the rank of the parent node is decreased by one.

![
   If there is no 3-node sibling, we *demote* the parent and merge with a 2-node sibling.
   The parent loses one key, and maybe the stealing/merging has to continue upwards in the tree.
](images/11.5-23-delete-merge.svg){#fig:23-delete-merge}

Demoting and merging is shown in @fig:23-delete-merge.
In this example we are lucky -- the parent is a 3-node so it will become a 2-node and we are done.
However, if the parent had been a 2-node, then it would become a 1-node after merging,
and so the stealing/merging will continue upwards in the tree.

Although the basic idea of deletion in a 2-3 tree is not very difficult,
there are a lot of different cases that we have to handle, so the code becomes quite large.
We will not go into more details on how to implement deletion in 2-3 trees.

### Complexity analysis

Searching in a 2-3 tree is logarithmic in the number of nodes, $O(\log(n))$,
because the invariants ensure that the height of the tree is logarithmic.

When we insert into a 2-3 tree, we start from a leaf and try to expand it.
If the leaf becomes overfull, we split and promote the insertion to the parent.
In the worst case we have to continue promoting all the way up to the root.
Since the tree has logarithmic height, this can in the worst case continue a logarithmic number of times.
So insertion is also logarithmic, $O(\log(n))$.

Deletion has exactly the same analysis (but more cases to take care of).
In the worst case we have to merge and demote a parent key, and this could continue all the way to the root.
Therefore deletion is also logarithmic, $O(\log(n))$.

### Red-black trees and 2-3-4 trees {#search-trees:red-black-trees}

2-3 trees are rarely used in practice, because it is impractical to handle the different cases --
to always have to check if it is a 2-node or a 3-node, and all possible combinations of 2- and 3-nodes.
Of the same reason, 2-3-4 trees are usually noy implemented using explicit 2-nodes, 3-nodes and 4-nodes.
However, there is another way to implement 2-3-4 trees:
as normal BSTs where each node has an additional binary feature.
This feature is called the "colour", and a node can be either "black" or "red".
Therefore, this kind of trees are called *red-black trees*.

![
   How to transform a 2-, 3-, and 4-node into a corresponding red-black subtree.
](images/11.5-23-red-black.svg){#fig:23-redblack-tree}

The key insight is that any 2-3-4 tree can be converted to a corresponding red-black tree.
@Fig:23-redblack-tree shows how the conversion looks like, for any 2-, 3- or 4-node.
All the special cases for insertion and deletion in a 2-3-4 tree can be translated into rules for the red-black tree.
The advantage is that we do not need a complicated node structure,
but can use our our standard BST nodes (augmented with a colour).

Note that the red-black trees are not perfectly balanced, even though 2-3-4 trees are.
This is because a 2-node corresponds to a single red-black node,
but a 3-node or a 4-node corresponds to a subtree of height two.
Therefore, the height of a red-black tree can be up to *twice* the height of a perfectly balanced binary search tree.
This means that red-black trees are usually slighlty more unbalanced than AVL trees,
but on the other hand deleting keys is slightly more efficient than for AVL trees.

<!-- There is even a translation from 2-3 trees into a subclass of red-black trees,
the so called *left-leaning* red-black trees (or right-leaning, which are equivalent). -->

