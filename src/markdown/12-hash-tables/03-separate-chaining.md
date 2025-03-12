
## Separate chaining

::: TODO
- Prio 2: implementation
- Prio 2:
    - Discuss: Load factor, what is a good LF?
    - Discuss: When to resize
:::

While the goal of a hash function is to minimize collisions, some
collisions are unavoidable in practice. Thus, hashing implementations
must include some form of collision resolution policy. Collision
resolution techniques can be broken into two classes:
[separate chaining]{.term} (also called open hashing) and
[open addressing]{.term} (also called closed hashing).
(Yes, it is confusing when "open hashing" means the opposite
of "open addressing", but unfortunately, that is the way it is.)
The difference between the two has to do with whether collisions
are stored outside the table (separate chaining/open hashing), or
whether collisions result in storing one of the records at another slot
in the table (open addressing/closed hashing).

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

Given a table of size $M$ storing $N$ records, the hash function will
(ideally) spread the records evenly among the $M$ positions in the
table, yielding on average $N/M$ records for each list. This value,
$N/M$, is commonly called the [load factor]{.term}.

Assuming that the table has more slots than there are records to be
stored, we can hope that few slots will contain more than one record. In
the case where a list is empty or has only one record, a search requires
only one access to the list. Thus, the average cost for hashing should
be $\Theta(1)$. However, if clustering causes many records to hash to
only a few of the slots, then the cost to access a record will be much
higher because many elements on the linked list must be searched.

Separate chaining is most appropriate when the hash table is kept in
main memory, with the lists implemented by a standard in-memory linked
list. Storing an separate chaining hash table on disk in an efficient
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

### Invariants



### Alternatives to a linked list

There is nothing that requires us to use a linked list as the underlying
data structure, it could be a dynamic array or a balanced search tree
too. (In fact, Java's hash tables use a combination of linked lists
and balanced trees).

Conceptually, a hash table can use any kind of collection data structure
-- the only thing that the actual array does is to partition the large
collection into $M$ disjoint collections. If the hash function is good
and distributes the objects evenly among the bins, all operations will
become $M$ times faster (because the bins are $M$ times smaller than the
original large collection).

### Resizing is important

Just as for dynamic arrays, it is important that we resize the internal
table when it becomes too large (or too small). That is, we change the
size $M$ so that it is proportional to the number of table entries.

If $M$ is always proportional to the number of entries, *and* if we have
a good hash function, the number of elements in a bin will remain
approximately constant. And then all operations will be expected
constant time.

### Implementation

::: TODO
- give overview implementation, not for a specific ADT (set/map)
:::


### Exercise

<avembed id="OpenHashPRO" src="Hashing/OpenHashPRO.html" type="ka" name="Separate Chaining Proficiency Exercise"/>

