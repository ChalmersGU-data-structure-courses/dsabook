
## Deleting entries from open addressing hash tables {#hash-tables:deletion}

::: TODO
- Prio 1: add a continuation figure in the text, continuing the insertion example
:::

In a separate chaining hash table, deletion is simple.
Just perform a lookup, and delete an entry from the underlying linked list.
For open addressing, things are more complicated.

Recall that [](#inv:linear-probing) requires that there are no empty cells
between the ideal position of a key and its actual position.
Clearing a cell in the middle of a cluster might cause lookups to fail
for the keys in the remainder of the cluster.

<!--
  0  1  2  3  4  5  6  7  8  9 10 11 12
[ Z  A  _  _  R  E  _  H  _  _  _  Y  L ]
 -->

Consider the table in @fig:LinProbe1.
If we delete Z -- that is, replacing the cell with *null* -- it could affect the cell containing A, depending on its hash value.
For example, if $h(\text{A})\bmod 65$, trying to lookup A will fail,
since lookups terminate when reaching an empty cell.
Moving A to cell $0$ would solve the problem if $h(\text{A})\bmod 13 = 0$,
but break the hash table if $h(\text{A})\bmod 13 = 1$.
There are two possible ways of handling deletion in open addressing:

Re-hashing the rest of the cluster

: Iterate though each key in the rest of the cluster:
  delete it and directly re-add it to the table.
  For example, if we remove L from @fig:LinProbe1,
  we first delete and re-add Z, and then we delete and re-add A.
  By doing this we will ensure that [](#inv:linear-probing) holds.

Lazy deletion

: This means replacing the deleted key with a special token, sometimes called a *tombstone*.
  The tombstones indicate that a value was deleted,
  and they are not considered to be empty when performing lookups,
  so lookups succeed without any modifications.

<!-- When inserting a new value, the tombstones can either be ignored or replaced.
Replacing the tombstone requires some care. Consider what happens in
@fig:LinProbe1 if $B$ is replaced by a tombstone, and then we try to add $C$.
Because $C$ is already in the set, the operation should do nothing.
This means that even if we decide to replace the tombstone, we need to
search the whole cluster first. -->

For lazy deletion, you may be concerned that the tombstones
might clutter up the hash table, and wonder how we get rid of them.
The key insight is that during resizing, we never copy the tombstones to the new table.
Lazy deletion is simple in theory, but there are a plenty of technicalities to it,
such as how to represent the tombstones.
In most programming languages you would use *null* values to represent an empty table cell,
but then we need a distinct non-value to represent a tombstone.

One particular thing to watch out for is how to calculate the load factor in the presence of tombstones.
Assume that we have a hash table with capacity $100$.
If we first add $50$ keys, and then remove $40$ of them, what is the load factor?
The number of keys is $N=10$, so 10% of the cells are occupied with keys --
but 50% of the cells are occupied with something.
If we continue to add $50$ more keys to the table, then 60% of the table contains keys,
but if we include the tombstones there is not a single empty cell!
Therefore, we have to include the tombstones when calculating the load factor.

::: {.example #ex:linear-probing-delete}
#### Example: Deleting from a linear probing hash set

Let us try to delete the key $25$ from the final table in [](#ex:linear-probing-resize), using lazy deletion.
Looking up the key finds the cell $5$, and we insert the tombstone into that cell:

    [  _ |  _ |  _ |  _ | 34 | XX | 16 | 55 |  _ | 49 ]

If we instead wanted to use re-hashing, we first delete the cell containing $25$.
Then we iterate through the rest of the cluster, that is, the cells $16$ and $55$.
We delete $16$ and immediately re-add it, and it ends up in the same cell as before.
Then we delete $55$ and re-add: now the ideal position is empty, so we can add $55$ to cell $5$.
The resulting hash table looks like this, where the arrow indicate how $55$ changed position.

    [  _ |  _ |  _ |  _ | 34 | 55 | 16 |  _ |  _ | 49 ]
                                ^         ^

:::


### Shrinking tables {#hash-tables:shrinking}

![
    Resizing a linear probing hash table in the presence of lazy deletion.
    Tombstones of deleted entries (marked X) are not transferred.
    After the resize, the load factor is 50%.
](images/11.5-lazy-deletion-resize.svg){#fig:LazyResize}

Now that we can support removal of keys from our open addressing hash table,
we may want to set a lower threshold for the load factor, and shrink the table down to free up memory.
This needs to be done carefully so that repeated add/remove cycles never cause a resize on every operation,
similar to what we discussed for dynamic arrays in @sec:sequences:shrink-array.

One possible strategy for resizing is to try to maintain the load factor around $0.5$,
and never let it exceed $0.75$ or fall below $0.25$.
Note that when we resize we cannot just double (or halve) the size of the table,
because tombstones should not be counted in the new table size.
The solution is to resize the table to double the current number of elements,
that is, let the new table size be $2N$ instead of $2M$.
This ensures that the load factor is always $0.5$ immediately after a resize.
@fig:LazyResize shows a resize operation performed on a linear probing hash table.
The resize ends up shrinking the array, since the new size is based on the number of actual values, ignoring tombstones.
