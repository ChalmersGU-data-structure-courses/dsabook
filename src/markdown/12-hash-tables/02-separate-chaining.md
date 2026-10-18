
## Separate chaining {#hash-tables:separate-chaining}

::: TODO
- Prio 1: update fig 11.2-memory-content.svg
:::

Separate chaining is perhaps the most intuitive solution to the problem of collisions:
If two keys want to inhabit the same cell in our hash table, we let them do that.
Instead of a single (key,value)-entry we store a *collection* of entries in each array cell,
this collection is often called a *bucket*.
However, arrays have one fundamental limitation: all cells must have the same memory size.
Therefore, the collection of entries can not be stored directly in the hash table array,
instead the array cells must contain pointers to some separate structure.
<!-- The word *separate* is because the data structure can not be stored directly in the hash table array,  -->

That leaves the question of what data structure to use for the buckets.
We want a collection of (key,value)-entries that we can modify and search by key values.
This is, we want some kind of *map* data structure, and any such implementation works fine.
It can for example be a simple linked list (@sec:ADTs:sets-maps-using-linked-lists),
or a more efficient AVL-tree (@sec:search-trees:AVL-trees).
Note that we use exactly the same idea if we want to implement a *set* instead of a map --
but then the underlying data structure must of course be a set.

Now, the only thing we have to do to implement any operation is to apply [](#alg:hashtable-lookup)
to find the appropriate bucket, and then apply the operation to that bucket.
The procedure is shown in [](#alg:separate-chaining).
A special case is if the table cell doesn't contain a map yet:
if the operation is `get` or `remove` we can simply return failure,
and if it's a `put` operation we have to put a new map in the cell.

::: {.algorithm #alg:separate-chaining}
#### Algorithm: Separate chaining operations
To apply any map (or set) operation for a key $k$:

1. Find the bucket for $k$ using [](#alg:hashtable-lookup).
2. Apply the operation to the bucket.
:::

#### Performance

Let us assume that the hash table has size $M$,
and that the hash function distributes all keys evenly among the buckets.
The effect of the separate chaining strategy is then to divide the problem size by $M$:
if we want to store $N$ keys in our map, then every bucket will contain approximately $\tfrac{N}{M}$ keys each.
But wait a minute, this will not reduce the time complexity at all!
If we use linked lists in the buckets we will still have $O(n)$ complexity,
and if we use AVL trees it will be logarithmic, $O(\log(n))$.

The trick to avoid this problem is ensuring that the maximum length of any bucket is a small constant.
To do this we have to treat the table as a *dynamic array*:
when the hash table gets too crowded, we transfer all the existing entries to a new larger table.
@Sec:hash-tables:resizing shows how to do this, making sure that $M$ will be proportional to $N$.
In addition to this we need a good hash function, which is discussed in @sec:hash-tables:hash-quality.

In summary, if the hash table is a dynamic array and we use a good hash function,
then the size of each bucket will be *constant*,
and all map (and set) operations will have constant time complexity, $O(1)$.

#### The bucket data structure

As we already said, we can use any map data structure for the buckets, so which one should we use?
Should we use an AVL tree, because it has better time complexity than a linked list?
Recall from above that if we use a good hash function and the table is a dynamic array,
then each bucket will only contain a handful of elements.

* AVL trees are more complicated than linked lists, which means that
  a linked list is usually faster if we only have a handful of elements.
* AVL trees use more memory for every entry compared to a linked list,
  since each AVL node needs two child pointers and linked list node only need one.
* We have to be able to *compare* the keys using < and >, and not just calculate a hash value,
  and for some datatypes it can be complex to define comparison and not just equality.

![
    Memory content of a separate chaining hash table of size 13 mapping three given names to their family names.
    The arrows are pointers, and the empty cells in the array are null values, representing empty linked lists.
](images/11.2-memory-content.svg){#fig:SepChain2}

<!--
Peter -> "Peter Ljunglöf"
Alex -> "Alex Gerdes"
Jonas -> "Jonas Duregård"
 -->

For these reasons, the typical choice of data structure is a *linked list*.
This is why the hash table is called *separate chaining* --
the buckets are stored *separate* from the array, and a linked list forms a *chain* of elements.
@fig:SepChain2 shows the memory content of a separate chaining hash table.
Array index 5 points to a list with two elements, so there was a collision between the two keys.
This may be because both have the same hash value, or
more frequently because their hash values were compressed into the same index.
What we know about the entries on index 5 is the following:

$$ h(\text{``\emph{Alice}''})\bmod 13 = h(\text{``\emph{Bob}''})\bmod 13 = 5 $$

Performing a lookup of any key that compresses to index 5, that is when $h(x)\bmod 13=5$,
will require a linear search by key in the linked list with "*Alice*" and "*Bob*" in it.
Note that a linear search is required even for `put` operations:
if the key is already present we have to update the entry instead of adding a new one.
