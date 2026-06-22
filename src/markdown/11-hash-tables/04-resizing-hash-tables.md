
## Resizing hash tables {#hash-tables:resizing}

In both separate chaining hash tables and open addressing,
we want to ensure that the hash table is not too crowded,
or performance will degrade.
With separate chaining, having a large enough table gives a
statistical guarantee that every linked list in the table
is short enough to be considered constant
(assuming a good enough hash function).
For open addressing there is a similar but more mathematically
complicated reasoning about the length of clusters.

Resizing of hash tables is similar to resizing of dynamic arrays,
but differ in two key aspects
(dynamic arrays can not be used for hash tables):

* When we increase the size of a hash table, we can not simply
  copy elements to the new array. The values need to be re-hashed
  when the table size changes, or at least re-compressed with the
  new table size.
* Dynamic arrays only resize when they are full, hash tables need
  to have empty space to ensure efficient lookups.

The *load factor* of a hash table is the number of elements
divided by the length of the array. For open addressing hash
table the load factor is always between 0 and 1, for separate
chaining it can in principle exceed 1. The load factor of the
example in @fig:LinProbe1 is $6/13$, and in @fig:SepChain2 it
is $3/13$. As the load factor increases, the performance of
lookups in the hash table degrades.

Hash table implementations use resizing to ensure a low load factor,
typically by deciding a threshold value at which a resize happens.
A lower threshold means higher memory usage, but less risk of collisions.
A common threshold value is $0.75$, meaning values are moved to a new
larger hash table when 75% of the table is filled (for open addressing).
The threshold value can be tweaked by developers to find a good compromise
between memory usage and lookup performance. In @fig:LinProbe2, the resize
was done when the load factor was about to go from $0.6$ to $0.8$, instead
decreasing it to $0.4$. Note how the resize broke up the 8-14-23-cluster.
