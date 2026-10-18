
## Resizing hash tables {#hash-tables:resizing}

In both separate chaining hash tables and open addressing,
we want to ensure that the hash table is not too crowded, or performance will degrade.
With separate chaining, having a large enough table gives a statistical guarantee
that every linked list in the table is short enough to be considered constant
(assuming a good enough hash function).
For open addressing there is a similar but more mathematically
complicated reasoning about the length of clusters.

Resizing of hash tables is similar to resizing of dynamic arrays (@sec:sequences:dynamic-arrays),
but differ in two key aspects:

* When we increase the size of a hash table, we can not simply copy entries to the new array.
  The values need to be re-hashed when the table size changes,
  or at least re-compressed with the new table size.
* Dynamic arrays only resize when they are full, but in particular open addressing hash tables
  need to have empty space to ensure efficient lookups.

The *load factor* of a hash table is $\tfrac{N}{M}$: the number of keys $N$ divided by the length of the array $M$,
For an open addressing hash table the load factor is always between $0$ and $1$,
but for separate chaining it can in principle exceed $1$.
The load factor of the table in @fig:LinProbe1 is $\tfrac{6}{13}$,
and the resulting table in [](#ex:linear-probing-add) has load factor $\tfrac{4}{5}$
As the load factor increases, the performance of lookups in the hash table degrades.

To ensure good performance, hash tables usually decide on a threshold --
whenever the load factor exceeds the threshold, we resize the table.
Just as for dynamic arrays it is important that we *double* the table size, or at least multiply with a factor.
Otherwise we will not get amortised constant time complexity.
[](#alg:hash-table-resize) shows how to resize a hash table:
the main idea is that we create a new larger table,
and then we add each entry from the old table using the normal `put` operation.

::: {.algorithm #alg:hash-table-resize}
#### Algorithm: Resizing a hash table
To resize a hash table of size $M$:

1. Create a new larger hash table of size $2M$ (or some multiplier of $M$).
2. For every entry $(k,v)$ in the old hash table, call `put(k,v)` on the new table.
:::

A lower threshold means higher memory usage, but less risk of collisions, so there is a tradeoff.
But which threshold is optimal?
If we use open addressing it must be below $1$, and a common value is $0.75$.
This means that when 75% of the table is filled it will be resized.
The optimal threshold depends on many things, for example the quality of the hash function.
One thing that can have a huge impact on the optimal threshold, is what kind of *probing strategy* we use.
In @sec:hash-tables:open-addressing we only discussed linear probing,
but there are many other strategies that make the hash table less sensitive to the load factor.

A separate chaining hash table is not as sensitive to the load factor.
One possible choice is to have a threshold of $2$.
The average size of each bucket will also be $2$, and searching through a size-$2$ bucket is not very costly.

::: {.example #ex:linear-probing-resize}
#### Example: Resizing a linear probing hash set

In the resulting table in [](#ex:linear-probing-add) only one cell is empty,
and the load factor is $\frac{4}{5}=0.8$.
Assuming that we have a threshold of 75%, we therefore have to resize the table.
We create a new empty table twice the size, and iterate through the old table.
For each key in the old table, we add it to the new table using the normal insertion operation.
In the example, we will add the keys in the order $49,16,25,34$:

    [ 49 | 16 | 25 |  _ | 34 ]

    [  _ |  _ |  _ |  _ | 34 | 25 | 16 |  _ |  _ | 49 ]

Notice that the order between the keys in the table totally changed.
If we have a good hash function, there is no way to predict how the internal order will change after a resize.

Now we want to insert the key $55$.
The optimal position is occupied with the key $25$,
so we have to iterate through $25$ and $16$ until we can add $55$ in position $7$:

    [  _ |  _ |  _ |  _ | 34 | 25 | 16 | 55 |  _ | 49 ]
                                ^         ^

:::

