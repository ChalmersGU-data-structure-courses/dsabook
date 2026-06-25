:::::: online

## More about B+ trees {#search-trees:Bplus-trees}

If we want to be able to search in a collection of records that will never change, then a [linear index]{.term} is a very simple and efficient data structure.
This is simply a sorted array of search keys with pointers to the actual records.
To search in a linear index we can simply perform a standard binary search (recall @sec:intro:searching).

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
Thus, the storage utilisation must be at least 50%.
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
for another visualisation that will let you construct and interact with a B+ tree.
-->


### Analysis of B+ trees

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
