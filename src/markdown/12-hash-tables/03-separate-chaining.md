
## Separate chaining

::: TODO
- Prio 2:
    - Discuss: Load factor, what is a good LF?
    - Discuss: When to resize
:::

While the goal of a hash function is to minimise collisions, some
collisions are unavoidable in practice. Thus, hashing implementations
must include some form of collision resolution policy. Collision
resolution techniques can be broken into two classes:
[separate chaining]{.term} (also called open hashing) and
[open addressing]{.term} (also called closed hashing).
(Yes, it is confusing when "open hashing" means the opposite
of "open addressing", but unfortunately, that is the way it is.)
The difference between the two has to do with whether collisions
are stored outside the table (separate chaining), or
whether collisions result in storing one of the records at another slot
in the table (open addressing).

The simplest form of separate chaining defines each slot in the hash
table to be the head of a linked list. All records that hash to a
particular slot are placed on that slot's linked list. The following
figure illustrates a hash table where each slot points to a linked list
to hold the records associated with that slot. The hash function used is
the simple mod function.

<inlineav id="openhashCON" src="Hashing/openhashCON.js" name="Hashing/openhashCON" links="Hashing/openhashCON.css" static/>

Records within a slot's list can be ordered in several ways: by
insertion order, by key value order, or by frequency-of-access order.
Ordering the list by key value provides an advantage in the case of an
unsuccessful search, because we know to stop searching the list once we
encounter a key that is greater than the one being searched for. If
records on the list are unordered or ordered by frequency, then an
unsuccessful search will need to visit every record on the list.

Given a table of size $m$ storing $n$ records, the hash function will
(ideally) spread the records evenly among the $m$ positions in the
table, yielding on average $n/m$ records for each list. This value,
$n/m$, is commonly called the [load factor]{.term}.

Assuming that the table has more slots than there are records to be
stored, we can hope that few slots will contain more than one record. In
the case where a list is empty or has only one record, a search requires
only one access to the list. Thus, the average cost for hashing should
be $O(1)$. However, if clustering causes many records to hash to
only a few of the slots, then the cost to access a record will be much
higher because many elements on the linked list must be searched.

Separate chaining is most appropriate when the hash table is kept in
main memory, with the lists implemented by a standard in-memory linked
list. Storing a separate chaining hash table on disk in an efficient
way is difficult, because members of a given linked list might be stored
on different disk blocks. This would result in multiple disk accesses
when searching for a particular key value, which defeats the purpose of
using hashing.

There are similarities between separate chaining and
[Binsort]{.term}. One way to view separate
chaining is that each record is simply placed in a bin. While multiple
records may hash to the same bin, this initial binning should still
greatly reduce the number of records accessed by a search operation. In
a similar fashion, a simple Binsort reduces the number of records in
each bin to a small number that can be sorted in some other way.

::: dsvis
#### Exercise: Practicing separate chaining

<avembed id="OpenHashPRO" src="Hashing/OpenHashPRO.html" type="ka" name="Separate Chaining Proficiency Exercise" height="630"/>
:::

<!--
### Invariants
-->


### Alternatives to a linked list

There is nothing that requires us to use a linked list as the underlying
data structure, it could be a dynamic array or a balanced search tree
too. (In fact, Java's hash tables use a combination of linked lists
and balanced trees.)

Conceptually, a hash table can use any kind of collection data structure
-- the only thing that the actual array does is to partition the large
collection into $m$ disjoint collections. If the hash function is good
and distributes the objects evenly among the bins, all operations will
become $m$ times faster (because the bins are $m$ times smaller than the
original large collection).

### Resizing is important

Just as for dynamic arrays, it is important that we resize the internal
table when it becomes too large (or too small). That is, we change the
size $m$ so that it is proportional to the number of table entries.

If $m$ is always proportional to the number of entries, *and* if we have
a good hash function, the number of elements in a bin will remain
approximately constant. And then all operations will be expected
constant time.

### Implementation


Now we will give a very generic overview how to implement a separate chaining hash table.
In the next section we will discuss implementation in more detail.

As already mentioned, a separate chaining hash table *partitions* its elements into an array of smaller collections, or *bins*.

    datatype SeparateChainingHashTable:
        table: Array of Collections

Note that we don't have to know what type of collections the bins are, the only thing we have to know is that they support the same methods that we want the hash table to support.
To implement any kind of method, we first have to to decide on a bin and then *delegate* the method to that bin.
We use the hash function to decide which bin to delegate to, and then simply call the method of that bin, with the same arguments as we got in the first place:

    datatype SeparateChainingHashTable:
        ...
        method(elem, ...extra arguments...):
            bin = table[hashIndex(elem)]
            return bin.method(elem, ...extra arguments...)

As explained in the previous chapter, the hash index for an element consists of first getting the hash code and then compressing it to an array index.

    datatype SeparateChainingHashTable:
        ...
        hashIndex(elem):
            hash = elem.hashCode()
            hash = hash & 0x7fffffff  // make the hash code non-negative
            return hash % table.size

There are of course some more details one has to take care of to get a working implementation.
For example, we have not discussed how to calculate the size of the hash table, i.e., the total number of elements.
We have also not discussed how to handle bins that are not initialised yet.

### Load factor and resizing

The efficiency of a hash table depends on two factors:

1. how well the elements are distributed between the bins
2. the size of each bin

The first factor depends on the hash function, and for now we simply assume that it is good -- meaning that it distributes the elements evenly among the bins.
The second factor depends on the load factor -- if there are $n$ elements in total and we have $m$ bins, then there are $n/m$ elements per bin on average.
Assuming that our underlying collections are simple linked lists, then all main operations (searching, adding, deleting) are linear in the load factor.

The key point to making hash tables efficient is to make sure that the load factor never becomes larger than a constant -- the *maximum load factor*.
If we have a constant load factor and a good hash function, then all operations on hash tables will be constant time, $O(1)$.

To be able to do this we have to *resize* the internal table when the number of elements grow.
But we already know how to do this -- use a dynamic array!
So, whenever we implement a method that can change the number of elements, we have to check if we need to resize the table.
Here is how we can do this:

    datatype SeparateChainingHashTable:
        ...
        method(elem, ...extra arguments...):
            bin = table[hashIndex(elem)]
            result = bin.method(elem, ...extra arguments...)
            if load factor is too large:
                resizeTable(table.size * MULTIPLIER)

Recall from the dynamic arrays that we have to *multiply* by a factor (the `MULTIPLIER`) when resizing the table, not adding a constant.

When we resize the internal table, it is very important that we *do not keep* the old hash indices for the keys, because they will not be the same after resizing.
Instead we save the current internal table to a temporary variable, and reinitialise the table to the new capacity.
Then we iterate through all bins and entries in the old table, and simply insert them again into the new resized table.

    datatype SeparateChainingHashTable:
        ...
        resizeTable(newCapacity):
            oldTable = table                // Remember the old table.
            table = new Array(newCapacity)  // Reset the internal table.
            size = 0                        // Reset the number of elements.
            for each bin in oldTable:
                add each elem in bin

