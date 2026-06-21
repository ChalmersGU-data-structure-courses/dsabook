## Deleting entries from open addressing hash tables

In a separate chaining hash table, deletion is simple. 
Just perform a lookup, and delete an entry from a linked list.
For open addressing, things are more complicated.

Recall that the invariant of a linear probing hash table 
is that there are no null values between 
the ideal position of a key (`hash(key)%table.length`) and its
actual position. Introducing a null value in the middle of a 
cluster might cause lookups to fail for the keys in the 
remainder of the cluster.

Look at the table in @fig:LinProbe1. Depending on what 
the hash value of E is, replacing D with a blank cell might 
cause a lookup of E to fail, since lookups terminate when 
reaching an empty cell. Moving E to cell 4 would solve the problem
if `hash(E)%13=4`, but break the hash table if `hash(E)%13=5`.
We will look at two ways of handling deletion in open addressing:

* Re-hashing the rest of the cluster. If we are removing A in 
  @fig:LinProbe1, we would delee and re-add B and C to the hash table 
  to ensure the invariant holds.
* Lazy deletion. 

Lazy deletion means replacing the deleted value with a special 
token, sometimes called a tombstone, that indicates a value was deleted.
Tombstones are not considered empty when performing lookups, so lookups 
succeed without any modifications.

When inserting a new value, the tombstones can either be ignored or replaced.
Replacing the tombstone requires some care. Consider what happens in 
@fig:LinProbe1 if B is replaced by a tombstone, and then we try to add C. 
Because C is already in the set, the operation should do nothing. 
This means that even if we decide to replace the tombstone, we need to 
search the whole cluster first.

You may be concerned about the tombstones cluttering up the hash table, 
and wonder how we get rid of them. The key is that during resizing, the 
tombstones are never copied to the new table. 

Lazy deletion is simple in theory, but there are a plenty of technicalities 
to it, such as how to represent the tombstones. 
In most programming languages you would use null values to represent an 
empty table cell, but then we need a distinct non-value to represent a tombstone. 

### Shrinking tables

With our hash tables supporting removal of elements, we may want to set a lower 
threshold for load factor, and shrink the table down to free up memory.
This needs to be done carefully so repeated add/remove cycles 
never cause a resize on every operation.

One example strategy for resizing is to try to maintain the load factor around $0.5$, 
and never let it exceed $0.75$ or fall below $0.25$. 
Each resize would set the size of the table to double the current number of 
elements (to a minimum of $1$), ensuring that the load factor is 
always $0.5$ immediately after a resize.