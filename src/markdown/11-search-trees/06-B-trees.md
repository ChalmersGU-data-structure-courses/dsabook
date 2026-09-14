
## B-trees {#search-trees:B-trees}

::: TODO
- Prio 1: check text
:::

As we already mentioned, nobody actually uses 2-3 trees or 2-3-4 trees
because they are more complex to implement than variants of BSTs,
such as AVL trees or red-black trees.
But 2-3 trees are still very important, because their basic idea can be generalised to much larger nodes.
These are called B-trees, and 2-3 trees is one kind of B-trees.

Any B-tree has a predefined *order*, which is the largest node type that is allowed.
This is also called the *maximum degree* of the tree.
So, a 2-3 tree is a B-tree of order 3, and a B-tree of order 10 can have nodes with up to 10 children.

The invariants for a B-tree of order $m$ are like this:

::: example
#### Invariant: B-tree of order $m$
For every $k$-node in a B-tree of order $m$:

1. it has at most $m$ children, that is $k \leq m$
2. if it is an internal node (except the root) it has at least $m/2$ children, that is, $k \geq m/2$
3. everything in subtree $p_{i-1}$ is *smaller* than $a_i$,
   which in turn is *smaller* than everything in subtree $p_i$
   (for all node values $a_1, \ldots, a_{k-1}$)

In addition, all leaves are on the same level, or in other words, the tree is perfectly balanced.
:::

The second requirement is the reason why 2-3 trees cannot have 1-nodes -- because $1 < 3/2$.
On the other hand, a B-tree of order 4 (that is, a 2-3-4 tree) can have nodes with 2, 3 or 4 children.
B-trees of order 5 can only have 3-, 4- and 5-nodes, and so on.
@Fig:BTree-example shows an example B-tree of order 5.

Note that the requirement that all leaves are on the same level,
is *not* enough to guarantee that the height of a B-tree is logarithmic in the number of elements.
We also need the second requirement, which says that nodes are not too small.

![
   An example B-tree of order 5, containing 62 different elements.
   Note that there are only 3-, 4- and 5-nodes in the tree.
](images/BTreeExample.png){#fig:BTree-example}

#### Insertion into and deleting from a B-tree

When inserting into a B-tree of order $m$, we do the same as for 2-3 trees:
first insert it into a leaf, and if that leaf becomes overfull, we split it and promote the middle element to the parent.
If that happens, we know that the overfull node has exactly $m+1$ children.
Splitting this will result in two nodes with size $m/2$, and the middle element is propagated upwards.
So the invariants are preserved by splitting.

Just as for 2-3 trees, deleting results in many cases for stealing elements from neighbouring nodes,
and merging when nodes become too sparse.

### B+ trees

B-trees are usually not used in practice -- instead the normal implementation is to use B+ trees, or some variant.

B+ trees are optimised for implementing *maps*,
where the search keys are quite small but the values can be pretty large.
This is often the case for both file systems and databases.
For example, in a file system the key is usually the file path,
and the value contains all possible information about the file,
such as modification and access dates, and which disk sectors it occupies.

The main difference with a normal B-tree is that the internal nodes and the leaf nodes are different from each other.
The internal nodes in a B+ tree only stores the search keys, while all the values are put in the leaves.
Since the keys are much smaller than the values, the internal nodes can be much more compact,
and therefore the internal nodes can be of a much higher order.

One effect of this difference is that the search keys have to be duplicated in several nodes,
so the insertion and deletion algorithms become slightly different.
Another positive side-effect is that it becomes very easy to iterate through a range of values in order --
there is no need to use recursion for this.

#### File systems and databases

B-trees (in the form of B+ trees or similar structures)
are a very common data structure for managing file systems, as well as very large databases.
Normally, the size of a node in a B-tree is chosen to fill a disk block of the particular file system,
so a typical B-tree implementation has an order of 100 or more.
This means that we can reduce the number of disk accesses,
by loading a full tree node from the (slow) disk to the (much faster) internal memory.

B-trees of high order are very shallow.
For example, assume we have a B-tree with a height of only four
(meaning that we have the root, two internal levels, and then the leaves).
How many values can we store in such a B-tree if it has order $100$?

- the root can store $99$ values and have $100$ children,
- each of the $100$ children can store $99$ values and have $100$ children,
- each of these $100^2$ children can store $99$ values and have $100$ children,
- so we get $100^3$ leaves, each with up to $99$ values

This gives $99 + 99 \cdot 100 + 99 \cdot 100^2 + 99 \cdot 100^3$ = $99 \cdot (1 + 100 + 100^2 + 100^3)$ = 100 million.
Therefore, a B-tree of order 100 and height 4 can store up to 100 million elements.
This is usually enough for most file systems and databases.

