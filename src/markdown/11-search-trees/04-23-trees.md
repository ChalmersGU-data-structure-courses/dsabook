## 2-3 trees and B-trees {#2-3-trees}

AVL trees do not ensure that a tree is perfectly balanced --
the height invariant cannot give a better guarantee than that
the height is within a constant times the optimal height.
But if we allow for more than two children per node
it is possible to ensure that all trees are perfectly balanced.
This is done by the 2-3 trees.

2-3 trees have two kinds of nodes: 2-nodes (normal binary nodes),
and 3-nodes, which have two values and three children.
The normal BST invariant still holds for all 2-nodes,
but it has to be generalised a little for the 3-nodes:

::: example
#### Invariant: 3-node order invariant
For every 3-node with values $a$ and $b$:

- all values in the left subtree are *smaller* than $a$,
- all values in the middle subtree are *between* $a$ and $b$, and
- all values in the right subtree are *larger* than $b$.
:::

Here is an example of a 2-3 tree.
In this tree, the root is a 3-node: it has two values (18 and 32) and three children.
The left child of the root is a 2-node containing the key 12.

::: {.jsav-figure #fig:TTexample}
``` {src="Indexing/twoThreedgmCON.js" scripts="Indexing/twoThreeTreeCON.js" links="Indexing/twoThreeTreeCON.css"}
```
An example of a 2-3 tree.
:::

Because 2-3 trees have two kinds of nodes, we can have a much stricter balance invariant than AVL trees:

::: example
#### Invariant: 2-3 tree balance
All leaves are on the same level, or in other words,
every path from the root to a leaf has the same length, or in other words,
the tree is perfectly balanced.
:::

Since 2-3 trees have two different kinds of nodes,
all operations have to account for both of them, and all possible combinations that can occur.
Conceptually the operations are not difficult to understand,
but they can be quite complex because of all cases we have to take care of.

### Searching in a 2-3 tree

To search for a key $k$ we do the same as for BSTs, start at the root and follow a path down through the tree.
When we encounter a 3-node with values $a$ and $b$ we do like this:

- if $k<a$: search in the left subtree
- if $a<k<b$: search in the middle subtree
- if $b<k$: search in the right subtree

As you can see, the same strategy as for BSTs, but more cases to handle.

### Inserting into a 2-3 tree

Conceptually the idea is the same as for AVL trees:
first we search for the leaf where the value should be inserted,
then we insert the value, and finally we rebalance if necessary.
However, both the insertion and the rebalancing processes are quite different from BSTs and AVL trees.

Unlike BST insertion, a new child is not created to hold the value, that is, the 2-3 tree does not grow downward.
Instead, a 2-3 tries to insert the new value into an existing node.
If the node becomes overfull, it is split and the middle value is inserted into its parent.
Therefore, a 2-3 tree does not grow downwards, but instead upwards in the tree.

The first thing is to search for the leaf node that would contain the value, if it were in the tree.
Then we try to insert the new value into this leaf,
by converting the node into a higher-ranked node and insert the value at its correct place.

::: dsvis
Inserting into a non-full leaf node.
``` {.jsav-animation src="Indexing/simpleInsertCON.js" scripts="Indexing/twoThreeTreeCON.js" links="Indexing/twoThreeTreeCON.css" name="2-3 Tree Insert Slideshow"}
```
:::

Therefore, a 2-node becomes a 3-node, and a 3-node becomes a 4-node, and we are done...
But wait, there are no 4-nodes!

When a node becomes overfull, we split it -- so the 4-node will become two 2-nodes.
But wait a little, a 2-node only has room for one value, and we have three values to store --
where should the third value go?
The solution is to put the low and high values in one 2-node each,
and then *promote* the middle value to the parent.

Here is how it can look like when we insert $c$ into a leaf 3-node consisting of $a$ and $b$.
The resulting leaf node becomes too big, so we split and promote the middle value:

![](images/TwoThree-InsertSplit.png)

Promoting a value means that we insert it into the parent node.
If the parent is a 2-node, then we just change it to a 3-node and we are done.
But if the parent is a 3-node, we are back in the same situation as before:
we get a 4-node that we need to split, and then we promote *its* middle value to its parent.
Like this:

![](images/TwoThree-InsertSplitMiddle.png)


::: dsvis
Inserting when the leaf node needs to be split.
``` {.jsav-animation src="Indexing/promoteCON.js" scripts="Indexing/twoThreeTreeCON.js" links="Indexing/twoThreeTreeCON.css" name="2-3 Tree Insert Promotion Slideshow"}
```
:::

Note that splitting a node and promoting the middle value upwards does not change the height of the tree,
as long as we end up in a parent that is a 2-node -- because then we can stop our promotion path.
This means that the height invariant is not broken.

But what happens if we never reach a 2-node?
If we promote all the way up to the root, and the root is also a 3-node,
we simply split it and create a new root with the promoted value.

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

- Now, insert P. You will see how the rightmost leaf is split, and the middle value (R) is promoted to the parent to create the 3-node [O,R].
- Then, insert K. The leaf [L,M] will be split and L is promoted to the parent [O,R]. This will also split, and the middle element O is promoted to the root to form the 3-node [I,O].
- Finally, insert "B C D E" into the tree. The first three insertions will create 3-nodes, so that when inserting E we have to split all the nodes all the way up to the root. Now the root has to be split, and we get a new level to the tree.
-->

Implementing insertion is not very difficult, but there are quite a lot of cases to handle
(for example, if the new element is smaller, or in between, or larger, than the existing elements).
On the other hand, you don't have to implement any rotations, but there is instead just the splitting and promoting.

### Deleting from a 2-3 tree

When deleting a value from a 2-3 tree, the basic idea is a mirror of insertion:
first we delete the element from the node, then we rebalance the tree to keep the invariants.
There are three main cases to consider:

1. The simplest case is when we remove from a 3-node that is a leaf --
   then we can simply remove it, and convert the 3-node to a 2-node.
2. The second case is if the leaf node is a 2-node, which contains just one value --
   then the resulting node will be a "1-node", which is not valid.
   This is discussed further below.
3. The third case is when we want to remove a value from an internal node.
   This is similar to when we remove a value from a BST node with two children --
   we don't delete the actual node, but instead replace its value with a value from another node which is easier to delete.
   This turns this case into case 1 or 2.

To solve case 2 we first try to "steal" a value from a sibling.
This works if any sibling is a 3-node: then we can rotate over the parent that lies between the nodes, like this:

![](images/TwoThree-DeleteSteal.png)

If neither sibling is a 3-node, we cannot steal anything.
In this situation we can instead *merge* our empty node with a sibling and the parent that lies between.
This is the opposite of splitting.
When we merge we create a new 3-node with the sibling value and the parent value.
The parent value is therefore *demoted* to its child, and the rank of the parent node is decreased by one:

![](images/TwoThree-DeleteMerge.png)

In this example we were lucky -- the parent was a 3-node so it will become a 2-node and we are done.
However, if the parent had been a 2-node, then it would become a 1-node after merging,
and so the stealing/merging will continue upwards in the tree.

Although the basic idea of deletion in a 2-3 tree is not very difficult,
there are a lot of different cases that we have to handle, so the code becomes quite large.
We will not go into more details on how to implement deletion in 2-3 trees.

### Complexity analysis

Searching in a 2-3 tree is logarithmic in the number of nodes, $O(\log(n))$, because the height of the tree is logarithmic.

When we insert into a 2-3 tree, we start from a leaf and try to expand it.
If the leaf becomes overfull, we split and promote the insertion to the parent.
In the worst case we have to continue promoting all the way up to the root.
Since the tree has logarithmic height, this can in the worst case continue a logarithmic number of times.
So insertion is also logarithmic, $O(\log(n))$.

Deletion has exactly the same analysis (but more cases to take care of).
In the worst case we have to merge and demote a parent value, and this could continue all the way to the root.
Therefore deletion is also logarithmic, $O(\log(n))$.

### Red-black trees and 2-3-4 trees

As we noted earlier, 2-3 trees are rarely used in practice.
The reason for this is because it is impractical to handle the different cases --
to always have to check if it is a 2-node or a 3-node, and all possible combinations of 2- and 3-nodes.

Of the same reason, 2-3-4 trees are never implemented in the straightforward way.
However, there is another way to implement 2-3-4 trees --
as normal BSTs where each node has an additional binary feature.
This feature is called the "colour", and a node can be either "black" or "red".
Therefore, this kind of trees are called *red-black trees*.

The key insight is that any 2-3-4 tree can be converted to a corresponding red-black tree.
The conversion looks like this, for any 2-, 3- or 4-node:

![](images/TwoThree-Redblack-vs-234.png)

All the special cases for insertion and deletion in a 2-3-4 tree can be translated into rules for the red-black tree.
The advantage is that we do not need a complicated node structure,
but can use our our standard BST nodes (augmented with a colour).

Note that the red-black trees are not perfectly balanced, even though 2-3-4 trees are.
This is because a 2-node corresponds to a single red-black node,
but a 3-node or a 4-node corresponds to a subtree of height two.
Therefore, the height of a red-black tree can be up to *twice* the height of a perfectly balanced binary search tree.
This means that red-black trees are usually slighlty more unbalanced than AVL trees,
but on the other hand deleting elements is slightly more efficient than for AVL trees.

There is even a translation from 2-3 trees into a subclass of red-black trees,
the so called *left-leaning* red-black trees (or right-leaning, which are equivalent).

::: {.jsav-figure #fig:BTexample}
``` {src="Indexing/BTreedgmCON.js" scripts="Indexing/BTreeCON.js" links="Indexing/BTreeCON.css"}
```
An example 2-3-4 tree -- each node contains up to three keys, and internal nodes have up to four children.
(TODO: show the corresponding red-black tree.)
:::


### B-trees

As we already mentioned, noone actually uses 2-3 trees or 2-3-4 trees
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

Note that the requirement that all leaves are on the same level,
is *not* enough to guarantee that the height of a B-tree is logarithmic in the number of elements.
We also need the second requirement, which says that nodes are not too small.

#### Insertion into and deleting from a B-tree

When inserting into a B-tree of order $m$, we do the same as for 2-3 trees:
first insert it into a leaf, and if that leaf becomes overfull, we split it and promote the middle element to the parent.
If that happens, we know that the overfull node has exactly $m+1$ children.
Splitting this will result in two nodes with size $m/2$, and the middle element is propagated upwards.
So the invariants are preserved by splitting.

Just as for 2-3 trees, deleting results in many cases for stealing elements from neighbouring nodes,
and merging when nodes become too sparse.

### File systems and databases

B-trees is the most common data structure for managing file systems, as well as very large databases.
Normally, the size of a node in the B-tree is chosen to fill a disk block of the particular file system,
so a typical B-tree implementation has an order of 100 or more.
This means that we can reduce the number of disk accesses,
by loading a full B-tree node from the (slow-ish) disk to the (much faster) internal memory.

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

:::::: online

If we want to be able to search in a collection of records that will never change, then a [linear index]{.term} is a very simple and efficient data structure.
This is simply a sorted array of search keys with pointers to the actual records.
To search in a linear index we can simply perform a standard binary search (recall @sec:binary-search).

The problem is how to handle insertion into and deletion from our database.
We could try to keep the core idea of storing a sorted array-based list, but make it more flexible by breaking the list into manageable chunks that are more easily updated.

- How might we do that?
  First, we need to decide how big the chunks should be.
  Since the data are on disk, it seems reasonable to store a chunk that is the size of a disk block, or a small multiple of the disk block size.
  If the next record to be inserted belongs to a chunk that hasn't filled its block then we can just insert it there.
  The fact that this might cause other records in that chunk to move a little bit in the array is not important, since this does not cause any extra disk accesses so long as we move data within that chunk.

- But what if the chunk fills up the entire block that contains it?
  We could just split it in half.

- What if we want to delete a record?
  We could just take the deleted record out of the chunk, but we might not want a lot of near-empty chunks.
  So we could put adjacent chunks together if they have only a small amount of data between them.
  Or we could shuffle data between adjacent chunks that together contain more data.

The big problem would be how to find the desired chunk when processing a record with a given key.
Perhaps some sort of tree-like structure could be used to locate the appropriate chunk?
These ideas are exactly what motivate the B+ tree.
The B+ tree is essentially a mechanism for managing a sorted array-based list, where the list is broken into chunks.

The most significant difference between the B+ tree and the BST or the standard B-tree is that the B+ tree stores records only at the leaf nodes.
Internal nodes store key values, but these are used solely as placeholders to guide the search.
This means that internal nodes are significantly different in structure from leaf nodes.
Internal nodes store keys to guide the search, associating each key with a pointer to a child B+ tree node.
Leaf nodes store the actual records, where the main requirement is that the leaf nodes store enough records to remain at least half full.
The leaf nodes of a B+ tree are normally linked together to form a [doubly linked list]{.term}.
Thus, the entire collection of records can be traversed in sorted order by visiting all the leaf nodes on the linked list.

<!--
An important implementation detail to note is that while @fig:BTexample shows internal nodes containing three keys and four pointers, class `BPNode` is slightly different in that it stores key/pointer pairs.
@Fig:BTexample shows the B+ tree as it is traditionally drawn.
To simplify implementation in practice, nodes really do associate a key with each pointer.
-->
Each internal node should be assumed to hold in the leftmost position an additional key that is less than or equal to any possible key value in the node's leftmost subtree.
B+ tree implementations typically store an additional dummy record in the leftmost leaf node whose key value is less than any legal key value.

Let's see in some detail how the simplest B+ tree works.
This would be the "2-3+ tree", or a B+ tree of order 3.

::: dsvis
An example of building a "2-3+ tree".
``` {.jsav-animation src="Indexing/TTPbuildCON.js" scripts="Indexing/BPlusTreeNode.js Indexing/BPlusTree.js" links="Indexing/BPTree.css Indexing/TTPTreeCON.css"}
```
:::

Next, let's see how to search.

::: dsvis
An example of searching a "2-3+ tree".
``` {.jsav-animation src="Indexing/TTPfindCON.js" scripts="Indexing/BPlusTreeNode.js Indexing/BPlusTree.js" links="Indexing/BPTree.css Indexing/TTPTreeCON.css"}
```
:::

Finally, let's see an example of deleting from the "2-3+ tree".

::: dsvis
An example of deleting from a "2-3+ tree".
``` {.jsav-animation src="Indexing/TTPdeleteCON.js" scripts="Indexing/BPlusTreeNode.js Indexing/BPlusTree.js" links="Indexing/BPTree.css Indexing/TTPTreeCON.css"}
```
:::

Now, let's extend these ideas to a B+ tree of higher order.

B+ trees are exceptionally good for range queries.
Once the first record in the range has been found, the rest of the records with keys in the range can be accessed by sequential processing of the remaining records in the first node, and then continuing down the linked list of leaf nodes as far as necessary.
Search in a B+ tree is nearly identical to search in a regular B-tree, except that the search must always continue to the proper leaf node.
Even if the search-key value is found in an internal node, this is only a placeholder and does not provide access to the actual record.
The following visualisation illustrates how to to this for a B+ tree.

::: dsvis
An example of search in a B+ tree of order four.
Internal nodes must store between two and four children.
``` {.jsav-animation src="Indexing/BPfindCON.js" scripts="Indexing/BPlusTreeNode.js Indexing/BPlusTree.js" links="Indexing/BPTree.css Indexing/BPTreeCON.css"}
```
:::

B+ tree insertion is similar to B-tree insertion.
First, the leaf $L$ that should contain the record is found.
If $L$ is not full, then the new record is added, and no other B+ tree nodes are affected.
If $L$ is already full, split it in two (dividing the records evenly among the two nodes) and promote a copy of the least-valued key in the newly formed right node.
As with the 2-3 tree, promotion might cause the parent to split in turn, perhaps eventually leading to splitting the root and causing the B+ tree to gain a new level.
B+ tree insertion keeps all leaf nodes at equal depth.
The following figure illustrates the insertion process through several examples.

::: dsvis
An example of building a B+ tree of order four.
``` {.jsav-animation src="Indexing/BPbuildCON.js" scripts="Indexing/BPlusTreeNode.js Indexing/BPlusTree.js" links="Indexing/BPTree.css Indexing/BPTreeCON.css"}
```
:::

To delete a record $R$ from a B+ tree, first locate the leaf $L$ that contains $R$.
If $L$ is more than half full, then we need only remove $R$, leaving $L$ still at least half full.
This is demonstrated by the following visualisation.

::: dsvis
An example of deletion in a B+ tree of order four.
``` {.jsav-animation src="Indexing/BPdeleteCON.js" scripts="Indexing/BPlusTreeNode.js Indexing/BPlusTree.js" links="Indexing/BPTree.css Indexing/BPTreeCON.css"}
```
:::

If deleting a record reduces the number of records in the node below the minimum threshold (called an [underflow]{.term}), then we must do something to keep the node sufficiently full.
The first choice is to look at the node's adjacent siblings to determine if they have a spare record that can be used to fill the gap.
If so, then enough records are transferred from the sibling so that both nodes have about the same number of records.
This is done so as to delay as long as possible the next time when a delete causes this node to underflow again.
This process might require that the parent node has its placeholder key value revised to reflect the true first key value in each node.

If neither sibling can lend a record to the under-full node (call it $N$), then $N$ must give its records to a sibling and be removed from the tree.
There is certainly room to do this, because the sibling is at most half full (remember that it had no records to contribute to the current node), and $N$ has become less than half full because it is under-flowing.
This merge process combines two subtrees of the parent, which might cause it to underflow in turn.
If the last two children of the root merge together, then the tree loses a level.

The B+ tree requires that all nodes be at least half full (except for the root).
Thus, the storage utilization must be at least 50%.
This is satisfactory for many implementations, but note that keeping nodes fuller will result both in less space required (because there is less empty space in the disk file) and in more efficient processing (fewer blocks on average will be read into memory because the amount of information in each block is greater).
<!--
Because B-trees have become so popular, many algorithm designers have tried to improve B-tree performance.
One method for doing so is to use the B+ tree variant known as the B^\*^ tree.
The B^\*^ tree is identical to the B+ tree, except for the rules used to split and merge nodes.
Instead of splitting a node in half when it overflows, the B^\*^ tree gives some records to its neighboring sibling, if possible.
If the sibling is also full, then these two nodes split into three.
Similarly, when a node underflows, it is combined with its two siblings, and the total reduced to two nodes.
Thus, the nodes are always at least two thirds full.
-->

Finally, here is an example of building a B+ tree of order five.
You can compare this to the example above of building a tree of order four with the same records.

::: dsvis
An example of building a B+ tree of degree 5
``` {.jsav-animation src="Indexing/BPbuild5CON.js" scripts="Indexing/BPlusTreeNode.js Indexing/BPlusTree.js" links="Indexing/BPTree.css Indexing/BPTreeCON.css"}
```
:::

<!--
[Click here](http://www.cs.usfca.edu/~galles/visualization/BPlusTree.html)
for another visualization that will let you construct and interact with a B+ tree.
-->


#### Analysis of B+ trees

The asymptotic cost of search, insertion, and deletion of records from B-trees and B+ trees is $O(\log(n))$ where $n$ is the total number of records in the tree.
However, the base of the logarithm is the (average) branching factor of the tree.
Typical database applications use extremely high branching factors, perhaps 100 or more.
Thus, in practice the B-tree and its variants are extremely shallow.

As an illustration, consider a B-tree of order 100 and leaf nodes that contain up to 100 records.

- B-trees with height one (that is, just a single leaf node) can have at most 100 records.
- B-trees with height two (a root internal node whose children are leaves) must have at least 100 records (2 leaves with 50 records each), and at most 10,000 records (100 leaves with 100 records each).
- B-trees with height three must have at least 5000 records (two second-level nodes with 50 children containing 50 records each), and at most one million records (100 second-level nodes with 100 full children each).
- B-trees with height four must have at least 250,000 records and at most 100 million records.
- Thus, it would require an *extremely* large database to generate a B-tree of more than height four.

The B-tree split and insert rules guarantee that every node (except perhaps the root) is at least half full.
So they are on average about 3/4 full.
But the internal nodes are purely overhead, since the keys stored there are used only by the tree to direct search, rather than store actual data.
Does this overhead amount to a significant use of space?
No, because once again the high fan-out rate of the tree structure means that the vast majority of nodes are leaf nodes.
A [k-ary tree]{.term} has approximately $1/k$ of its nodes as internal nodes.
This means that while half of a full binary tree's nodes are internal nodes, in a B-tree of order 100 probably only about $1/75$ of its nodes are internal nodes.
This means that the overhead associated with internal nodes is very low.

We can reduce the number of disk fetches required for the B-tree even more by using the following methods.
First, the upper levels of the tree can be stored in main memory at all times.
Because the tree branches so quickly, the top two levels (levels 0 and 1) require relatively little space.
If the B-tree is only height four, then at most two disk fetches (internal nodes at level two and leaves at level three) are required to reach the pointer to any given record.

<!--
A buffer pool could be used to manage nodes of the B-tree.
Several nodes of the tree would typically be in main memory at one time.
The most straightforward approach is to use a standard method such as LRU to do node replacement.
However, sometimes it might be desirable to "lock" certain nodes such as the root into the buffer pool.
In general, if the buffer pool is even of modest size (say at least twice the depth of the tree), no special techniques for node replacement will be required because the upper-level nodes will naturally be accessed frequently.
-->

::::::
