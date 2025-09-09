## 2-3 trees and B-trees

This section presents a data structure called the 2-3 tree, as well as its generalizations -- the B-tree and the B^+^ tree.


### 2-3 trees

Recall that in a binary tree, every node has one key and two children.
In a 2-3 tree, there are instead two different kinds of nodes, called *2-nodes* and *3-nodes*:

* A 2-node has one key and two children, just the same as a node in a binary tree.
* A 3-node has *two* keys and *three* children.

Here is an example of a 2-3 tree.
In this tree, the root is a 3-node: it has two keys (18 and 32) and three children.
The left child of the root is a 2-node containing the key 12.
(In practice, nodes might contain key-value pairs, but the figures will show only the keys.)

::: {.jsav-figure #fig:TTexample}
``` {src="Indexing/twoThreedgmCON.js" scripts="Indexing/twoThreeTreeCON.js" links="Indexing/twoThreeTreeCON.css"}
```
An example of a 2-3 tree.
:::

In order to be valid, a 2-3 tree must obey certain properties.
Firstly, every node must obey a *search tree* property similar to BSTs:

* For a 2-node with key $k$:
    * All keys in the left subtree must be less than $k$.
    * All keys in the right subtree must be greater than $k$.

* For a 3-node with keys $k_1$ and $k_2$:
    * We must have $k_1 < k_2$.
    * All keys in the left subtree must be less than $k_1$.
    * All keys in the middle subtree must be between $k_1$ and $k_2$.
    * All keys in the right subtree must be greater than $k_2$.

Secondly, all leaf nodes must be at the same level in the tree.
When a tree obeys this property, we say that it is [height balanced]{.term}.
So a 2-3 tree is always height balanced.
You can check that the tree above is a valid 2-3 tree:
It is made of 2-nodes and 3-nodes, obeys the search tree property and is height balanced.

So far, it seems that we have just taken the idea of a BST and complicated it by adding another type of node.
Why have we done this?
The reason is the height balance property.
Height balance ensures that the tree has *logarithmic* height, so that search takes logarithmic time.
But also, the algorithms for insertion and deletion in a 2-3 tree keep the tree height balanced (and also take logarithmic time).
It is not possible in general to keep a BST height balanced -- we will see that adding 3-nodes is what allows us to do so.

#### Searching in a 2-3 tree

Searching for a key in a 2-3 tree is similar to searching in a BST.
Search begins at the root.
If the root does not contain the search key $k$, then the search progresses to the only subtree that can possibly contain $k$.
The key(s) stored in the root node determine which is the correct subtree.
For example, if searching for the key 30 in the tree of @fig:TTexample, we begin with the root node.
Because 30 is between 18 and 33, it can only be in the middle subtree.
Searching the middle child of the root node yields the desired record.
If searching for 15, then the first step is again to search the root node.
Because 15 is less than 18, the first (left) branch is taken.
At the next level, we take the second branch to the leaf node containing 15.
If the search key were 16, then upon encountering the leaf containing 15 we would find that the search key is not in the tree.

#### Inserting into a 2-3 tree

Insertion into a 2-3 tree is similar to insertion into a BST to the extent that the new record is placed in the appropriate leaf node.
Unlike BST insertion, a new child is not created to hold the record being inserted, that is, the 2-3 tree does not grow downward.
The first step is to find the leaf node that would contain the record if it were in the tree.
If this leaf node contains only one key, then the new record can be added to that node with no further modification to the tree, as illustrated in the following visualization.

::: dsvis
Inserting into a non-full leaf node.
``` {.jsav-animation src="Indexing/simpleInsertCON.js" scripts="Indexing/twoThreeTreeCON.js" links="Indexing/twoThreeTreeCON.css" name="2-3 Tree Insert Slideshow"}
```
:::

If we insert the new record into a leaf node $L$ that already contains two records, then more space must be created.
Consider the two records of node $L$ and the record to be inserted without further concern for which two were already in $L$ and which is the new record.
The first step is to split $L$ into two nodes.
Thus, a new node -- call it $L'$ -- must be created.
$L$ receives the record with the least of the three keys, and $L'$ receives the greatest of the three.
The record with the middle of the three keys is passed up to the
parent node along with a pointer to $L'$.
This is called a [promotion]{.term}.
The promoted key is then inserted into the parent.
If the parent currently contains only one record (and thus has only
two children), then the promoted record and the pointer to
$L'$ are simply added to the parent node.
If the parent is full, then the split-and-promote process is repeated.
Here is an example of a a simple promotion.

::: dsvis
Inserting when the leaf node needs to be split.
``` {.jsav-animation src="Indexing/promoteCON.js" scripts="Indexing/twoThreeTreeCON.js" links="Indexing/twoThreeTreeCON.css" name="2-3 Tree Insert Promotion Slideshow"}
```
:::

Here is an illustration for what happens when promotions require the root to split, adding a new level to the tree.
Note that all leaf nodes continue to have equal depth.

::: dsvis
Inserting when the root node needs to be split, adding a new tree level.
``` {.jsav-animation src="Indexing/splitCON.js" scripts="Indexing/twoThreeTreeCON.js" links="Indexing/twoThreeTreeCON.css" name="2-3 Tree Insert Split Slideshow"}
```
:::

#### Deleting from a 2-3 tree

When deleting a record from the 2-3 tree, there are three cases to consider.

1. The simplest occurs when the record is to be removed from a leaf node containing two records.
   In this case, the record is simply removed, and no other nodes are affected.
2. The second case occurs when the only record in a leaf node is to be removed.
3. The third case occurs when a record is to be removed from an internal node.

In both the second and the third cases, the deleted record is replaced with another that can take its place while maintaining the correct order, similar to removing a node from a BST.
If the tree is sparse enough, there is no such record available that will allow all nodes to still maintain at least one record.
In this situation, sibling nodes are merged together.
The delete operation for the 2-3 tree is quite complex and will not be described further.
Instead, a complete discussion of deletion will be postponed until the next section, where it can be generalized for a particular variant of the B-tree.

The 2-3 tree insert and delete routines do not add new nodes at the bottom of the tree.
Instead they cause leaf nodes to split or merge, possibly causing a ripple effect moving up the tree to the root.
If necessary the root will split, causing a new root node to be created and making the tree one level deeper.
On deletion, if the last two children of the root merge,
then the root node is removed and the tree will lose a level.
In either case, all leaf nodes are always at the same level.
When all leaf nodes are at the same level, we say that a tree is [height balanced]{.term}.
Because the 2-3 tree is height balanced, and every internal node has at least two children, we know that the maximum depth of the tree is $\log n$.
Thus, all 2-3 tree insert, find, and delete operations require $O(\log n)$ time.

<!--
[Click here](http://www.cs.usfca.edu/~galles/visualization/BTree.html)
for another visualization that will let you construct and interact with a 2-3 tree.
Actually, this visualization is for a data structure that is more general than just a 2-3 tree.
To see how a 2-3 would behave, be sure to use the "Max Degree = 3" setting.
-->


### B-trees

B-trees are usually attributed to R. Bayer and E. McCreight who described the B-tree in a 1972 paper.
By 1979, B-trees had replaced virtually all large-file access methods other than hashing.
B-trees, or some variant of B-trees, are *the* standard file organization for applications requiring insertion, deletion, and key range searches.
They are used to implement most modern file systems.
B-trees address effectively all of the major problems encountered when implementing disk-based search trees:

1. The B-tree is shallow, in part because the tree is always height balanced (all leaf nodes are at the same level), and in part because the branching factor is quite high.
   So only a small number of disk blocks are accessed to reach a given record.
2. Update and search operations affect only those disk blocks on the path from the root to the leaf node containing the query record.
   The fewer the number of disk blocks affected during an operation, the less disk I/O is required.
3. B-trees keep related records (that is, records with similar key values) on the same disk block, which helps to minimize disk I/O on range searches.
4. B-trees guarantee that every node in the tree will be full at least to a certain minimum percentage.
   This improves space efficiency while reducing the typical number of disk fetches necessary during a search or update operation.

A B-tree of order $m$ is defined to have the following shape properties:

* The root is either a leaf or has at least two children.
* Each internal node, except for the root, has between $\lceil m/2 \rceil$ and $m$ children.
* All leaves are at the same level in the tree, so the tree is always height balanced.

The B-tree is a generalization of the 2-3 tree.
Put another way, a 2-3 tree is a B-tree of order three.

Normally, the size of a node in the B-tree is chosen to fill a disk block, so a typical implementation of B-tree nodes allows 100 or more children.
Thus, a B-tree node is equivalent to a disk block, and a "pointer" value stored in the tree is actually the number of the block containing the child node (usually interpreted as an offset from the beginning of the corresponding disk file).
In a typical application, the B-tree's access to the disk file will be managed using a [buffer pool]{.term} and a block-replacement scheme such as [LRU]{.term}.

@Fig:BTexample shows a B-tree of order four.
Each node contains up to three keys, and internal nodes have up to four children.

::: {.jsav-figure #fig:BTexample}
``` {src="Indexing/BTreedgmCON.js" scripts="Indexing/BTreeCON.js" links="Indexing/BTreeCON.css"}
```
An example B-tree of order four.
:::

#### Searching in a B-tree

Searching in a B-tree is a generalization of searching in a 2-3 tree.
It is an alternating two-step process, beginning with the root node of the B-tree.

1. Perform a binary search on the records in the current node.
   If a record with the search key is found, then return that record.
   If the current node is a leaf node and the key is not found, then report an unsuccessful search.
2. Otherwise, follow the proper branch and repeat the process.

For example, consider a search for the record with key value 47 in the tree of @fig:BTexample.
The root node is examined and the second (right) branch taken.
After examining the node at level 1, the third branch is taken to the next level to arrive at the leaf node containing a record with key value 47.

#### Insertion into a B-tree

B-tree insertion is a generalization of 2-3 tree insertion.
The first step is to find the leaf node that should contain the key to be inserted, space permitting.
If there is room in this node, then insert the key.
If there is not, then split the node into two and promote the middle key to the parent.
If the parent becomes full, then it is split in turn, and its middle key promoted.

Note that this insertion process is guaranteed to keep all nodes at least half full.
For example, when we attempt to insert into a full internal node of a B-tree of order four, there will now be five children that must be dealt with.
The node is split into two nodes containing two keys each, thus retaining the B-tree property.
The middle of the five children is promoted to its parent.


### B^+^ trees

The previous section mentioned that B-trees are universally used to implement large-scale disk-based systems.
Actually, the B-tree as described in the previous section is almost never implemented.
What is most commonly implemented is a variant of the B-tree, called the B^+^ tree.

:::::: online

If we want to be able to search in a collection of records that will never change, then a [linear index]{.term} is a very simple and efficient data structure.
This is simply a sorted array of search keys with pointers to the actual records.
To search in a linear index we can simply perform a standard binary search (recall @sec:case-study-searching-in-a-list).

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
These ideas are exactly what motivate the B^+^ tree.
The B^+^ tree is essentially a mechanism for managing a sorted array-based list, where the list is broken into chunks.

The most significant difference between the B^+^ tree and the BST or the standard B-tree is that the B^+^ tree stores records only at the leaf nodes.
Internal nodes store key values, but these are used solely as placeholders to guide the search.
This means that internal nodes are significantly different in structure from leaf nodes.
Internal nodes store keys to guide the search, associating each key with a pointer to a child B^+^ tree node.
Leaf nodes store the actual records, where the main requirement is that the leaf nodes store enough records to remain at least half full.
The leaf nodes of a B^+^ tree are normally linked together to form a [doubly linked list]{.term}.
Thus, the entire collection of records can be traversed in sorted order by visiting all the leaf nodes on the linked list.

<!--
An important implementation detail to note is that while @fig:BTexample shows internal nodes containing three keys and four pointers, class `BPNode` is slightly different in that it stores key/pointer pairs.
@Fig:BTexample shows the B^+^ tree as it is traditionally drawn.
To simplify implementation in practice, nodes really do associate a key with each pointer.
-->
Each internal node should be assumed to hold in the leftmost position an additional key that is less than or equal to any possible key value in the node's leftmost subtree.
B^+^ tree implementations typically store an additional dummy record in the leftmost leaf node whose key value is less than any legal key value.

Let's see in some detail how the simplest B^+^ tree works.
This would be the "2-3^+^ tree", or a B^+^ tree of order 3.

::: dsvis
An example of building a "2-3^+^ tree".
``` {.jsav-animation src="Indexing/TTPbuildCON.js" scripts="Indexing/BPlusTreeNode.js Indexing/BPlusTree.js" links="Indexing/BPTree.css Indexing/TTPTreeCON.css"}
```
:::

Next, let's see how to search.

::: dsvis
An example of searching a "2-3^+^ tree".
``` {.jsav-animation src="Indexing/TTPfindCON.js" scripts="Indexing/BPlusTreeNode.js Indexing/BPlusTree.js" links="Indexing/BPTree.css Indexing/TTPTreeCON.css"}
```
:::

Finally, let's see an example of deleting from the "2-3^+^ tree".

::: dsvis
An example of deleting from a "2-3^+^ tree".
``` {.jsav-animation src="Indexing/TTPdeleteCON.js" scripts="Indexing/BPlusTreeNode.js Indexing/BPlusTree.js" links="Indexing/BPTree.css Indexing/TTPTreeCON.css"}
```
:::

Now, let's extend these ideas to a B^+^ tree of higher order.

B^+^ trees are exceptionally good for range queries.
Once the first record in the range has been found, the rest of the records with keys in the range can be accessed by sequential processing of the remaining records in the first node, and then continuing down the linked list of leaf nodes as far as necessary.
Search in a B^+^ tree is nearly identical to search in a regular B-tree, except that the search must always continue to the proper leaf node.
Even if the search-key value is found in an internal node, this is only a placeholder and does not provide access to the actual record.
The following visualisation illustrates how to to this for a B^+^ tree.

::: dsvis
An example of search in a B^+^ tree of order four.
Internal nodes must store between two and four children.
``` {.jsav-animation src="Indexing/BPfindCON.js" scripts="Indexing/BPlusTreeNode.js Indexing/BPlusTree.js" links="Indexing/BPTree.css Indexing/BPTreeCON.css"}
```
:::

B^+^ tree insertion is similar to B-tree insertion.
First, the leaf $L$ that should contain the record is found.
If $L$ is not full, then the new record is added, and no other B^+^ tree nodes are affected.
If $L$ is already full, split it in two (dividing the records evenly among the two nodes) and promote a copy of the least-valued key in the newly formed right node.
As with the 2-3 tree, promotion might cause the parent to split in turn, perhaps eventually leading to splitting the root and causing the B^+^ tree to gain a new level.
B^+^ tree insertion keeps all leaf nodes at equal depth.
The following figure illustrates the insertion process through several examples.

::: dsvis
An example of building a B^+^ tree of order four.
``` {.jsav-animation src="Indexing/BPbuildCON.js" scripts="Indexing/BPlusTreeNode.js Indexing/BPlusTree.js" links="Indexing/BPTree.css Indexing/BPTreeCON.css"}
```
:::

To delete a record $R$ from a B^+^ tree, first locate the leaf $L$ that contains $R$.
If $L$ is more than half full, then we need only remove $R$, leaving $L$ still at least half full.
This is demonstrated by the following visualisation.

::: dsvis
An example of deletion in a B^+^ tree of order four.
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

The B^+^ tree requires that all nodes be at least half full (except for the root).
Thus, the storage utilization must be at least 50%.
This is satisfactory for many implementations, but note that keeping nodes fuller will result both in less space required (because there is less empty space in the disk file) and in more efficient processing (fewer blocks on average will be read into memory because the amount of information in each block is greater).
<!--
Because B-trees have become so popular, many algorithm designers have tried to improve B-tree performance.
One method for doing so is to use the B^+^ tree variant known as the B^\*^ tree.
The B^\*^ tree is identical to the B^+^ tree, except for the rules used to split and merge nodes.
Instead of splitting a node in half when it overflows, the B^\*^ tree gives some records to its neighboring sibling, if possible.
If the sibling is also full, then these two nodes split into three.
Similarly, when a node underflows, it is combined with its two siblings, and the total reduced to two nodes.
Thus, the nodes are always at least two thirds full.
-->

Finally, here is an example of building a B^+^ tree of order five.
You can compare this to the example above of building a tree of order four with the same records.

::: dsvis
An example of building a B^+^ tree of degree 5
``` {.jsav-animation src="Indexing/BPbuild5CON.js" scripts="Indexing/BPlusTreeNode.js Indexing/BPlusTree.js" links="Indexing/BPTree.css Indexing/BPTreeCON.css"}
```
:::

<!--
[Click here](http://www.cs.usfca.edu/~galles/visualization/BPlusTree.html)
for another visualization that will let you construct and interact with a B^+^ tree.
-->

::::::

### Analysis of B-trees

The asymptotic cost of search, insertion, and deletion of records from B-trees and B^+^ trees is $O(\log n)$ where $n$ is the total number of records in the tree.
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
