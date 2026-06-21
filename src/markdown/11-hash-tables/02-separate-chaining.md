## Separate chaining

Separate chaining solves the problem of collisions in hash tables. 
That is: for two distinct keys `x` and `y` in a hash table of size `k`, 
`hash(x)%k = hash(y)%k`. Note that this can happen in two ways:
either `x` and `y` have the same hash value and will always collide, 
or they have different hash values but compress to the same index for
hash table size `k` specifically. 

Separate chaining is perhaps the most intuitive solution to the problem 
of collsions: If two keys want to inhabit the same cell in our hash table,
we let them, and instead of single (key,value)-entry we store a collection
of entries in each array cell.

The word *separate* is because the data structure can not be stored directly 
in the hash table array, the array must contain pointers to some separate structure. 
This is a fundamental limitation of arrays, all cells must have a uniform size in memory.

That leaves the question of what data structure to use for the collections.
We want a collection of (key,value)-entries that we can quickly modify and 
search by key values. As an ADT, that is exactly what a map does. 
So we could put an AVL tree in each array cell. 
This has some issues:

* Putting a map implementation inside our map implementation makes it very complicated.
* AVL trees use a lot of memory for every map entry compared to an array, 
  since it needs two child pointers and some size information for each of them.
* It does not only require a hash function for the key type, 
  but also a comparison function (since AVL trees are search trees).

For these reasons, the typical choice of data structure is a *linked list*, hence the word *chaining* 
(a linked list forms a chain of elements). @fig:SepChain2 shows the memory content of a separate chaining hash table. 

![Memory content of a separate chaining hash table of size 13 mapping three emails to names. The arrows are pointers, and the empty cells in the array are null values, representing empty linked lists.](images/Hashing-SepChain2.svg){width=80% #fig:SepChain2}

What we know about the entries on index 5 is that `hash("alice@example.com")%13=hash("bob@example.com")%13=5`. 
This may be because the two emails have the same hash value, or more frequently because they have the same comressed value.

Performing a lookup of any key that compresses to index 5, that is `hash(x)%13=5` 
will require a linear search by key in the linked lists with alice and bob in it. 
Notably a lookup is required even for `put` operations: we need to ensure a key is not
already present before we add an entry to the linked list.

At this point, you should be concerned about performance. 
Linear search is not fast, and in fact if all our values end up in the same cell, 
our hash map will be slower than an AVL map ($O(n)$ instead of $O(log n)$). 
The idea to avoid this problem is ensuring that the maximum length of any list 
in our table is a small constant. This involves two main techniques:

* Having a good hash function.
* When the hash table starts getting crowded, resize it by creating a 
  larger table and transfering all the existing values to it.
