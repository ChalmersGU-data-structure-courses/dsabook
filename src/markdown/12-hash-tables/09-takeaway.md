
## Main takeaways and outlook {#hash-tables:takeaway}

Hash tables are perhaps the most widely used data structures in the world.
In this book we

* Sets of integers that are valid indices of an array can be represented with $O(1)$ operations.
* With a way to handle collisions, we can generalise to sets of arbitrary integers.
  We have seen two ways of handling collisions:
    * By putting a data structure in the colliding cell, so it can store both values (separate chaining).
    * By using the next free cell after the collision cell (linear probing).
* If we can turn objects into integers in arbitrary but predictable ways (hashing),
  we can have any object as key in our maps and sets.

This is fundamentally different from how we organise data in search trees:
Instead of making comparisons between values, we use arithmetic to compute where
a value should be stored, and do a linear search from there.

A hash table is excellent for implementing the abstract data types set and map.
Unlike self-balancing search trees, hash tables are not sorted sets (@sec:ADTs:sorted-sets-and-maps).
We cannot implement range queries efficiently on a hash set,
and when iterating over values of a hash set we encounter values in a seemingly random order
(determined by the hash function used, the size of the hash table, and the order in
which values were added).

As always, it is useful to consider the invariants the data structures we study.
For a separate chaining hash table with $k$ cells has this simple invariant:

* A key `x` can only occur in the linked list on index `hash(x) % k` of the table.

This is an excellent example of how choosing the invariant is often the main work of
difficulty a data structure. With this invariant decided, the only sensible way to
implement an `add(x)` operation is to find the linked list where `x` should be, and add `x` to it
(assuming `x` is not already there). The only difficult part is deciding when and how to resize the table.



:::::: latex
\wrapQRlink[4mm]{20mm}{-4mm}{\thesectionURL}{Chapter \thechapter{} online}
\section*{Online material}
Visit the online book for further reading, interactive explanations, visualisations, extra material, and exercises.
::::::

