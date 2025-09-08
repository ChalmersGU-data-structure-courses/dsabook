
## Deletion in open addressing

::: TODO
- Prio 2: update text
:::

When deleting records from a hash table, there are two important
considerations.

1.  Deleting a record must not hinder later searches. In other words,
    the search process must still pass through the newly emptied slot to
    reach records whose probe sequence passed through this slot. Thus,
    the delete process cannot simply clear the slot, because
    this will isolate records further down the probe sequence.
2.  We do not want to make positions in the hash table unusable because
    of deletion. The freed slot should be available to a future
    insertion.

Both of these problems can be resolved by placing a special mark in
place of the deleted record, called a [tombstone]{.term}. The tombstone indicates that a record once occupied the
slot but does so no longer. If a tombstone is encountered when searching
along a probe sequence, the search procedure continues with the search.
When a tombstone is encountered during insertion, that slot can be used
to store the new record. However, to avoid inserting duplicate keys, it
will still be necessary for the search procedure to follow the probe
sequence until a truly empty position has been found, simply to verify
that a duplicate is not in the table. However, the new record would
actually be inserted into the slot of the first tombstone encountered.

::: dsvis
The deletion process in action.

``` {.jsav-animation src="Hashing/hashdelCON.js" links="Hashing/collisionCON.css"}
```
:::

::: dsvis
Here is a practice exercise.

<avembed id="HashingDelPRO" src="Hashing/HashingDelPRO.html" type="pe" name="Hash Deletion Proficiency Exercise"/>
:::

The use of tombstones allows searches to work correctly and allows reuse
of deleted slots. However, after a series of intermixed insertion and
deletion operations, some slots will contain tombstones. This will tend
to lengthen the average distance from a record's home position to the
record itself, beyond where it could be if the tombstones did not exist.
A typical database application will first load a collection of records
into the hash table and then progress to a phase of intermixed
insertions and deletions. After the table is loaded with the initial
collection of records, the first few deletions will lengthen the average
probe sequence distance for records (it will add tombstones). Over time,
the average distance will reach an equilibrium point because insertions
will tend to decrease the average distance by filling in tombstone
slots. For example, after initially loading records into the database,
the average path distance might be 1.2 (i.e., an average of 0.2 accesses
per search beyond the home position will be required). After a series of
insertions and deletions, this average distance might increase to 1.6
due to tombstones. This seems like a small increase, but it is three
times longer on average beyond the home position than before deletions.

Two possible solutions to this problem are

1.  Do a local reorganisation upon deletion to try to shorten the
    average path length. For example, after deleting a key, continue to
    follow the probe sequence of that key and swap records further down
    the probe sequence into the slot of the recently deleted record
    (being careful not to remove any key from its probe sequence). This
    will not work for all collision resolution policies.
2.  Periodically rehash the table by reinserting all records into a new
    hash table. Not only will this remove the tombstones, but it also
    provides an opportunity to place the most frequently accessed
    records into their home positions.

Note that since we are using a dynamic array when implementing hash
tables, this can be viewed as a version of the second solution above
(because all tombstones will be removed when the internal array is
resized).

### Simple implementation of deletion

If we are implementing a map (and not a set), then we actually don't need to use a special value `DELETED` to represent the tombstone.
Instead, since we are using two internal arrays (one for the keys and one for the values), there are actually two possible ways of storing empty entries.
We use this to encode both empty slots and tombstones:

-   If the *keys* cell is empty (`keys[i] is null`), then the slot is unoccupied.
-   If the *values* cell is empy (`values[i] is null`), then the slot is a tombstone.

So, when we remove an entry, we do not remove the key, but
instead set the value to `null`. This will make the slot a tombstone.

    datatype OpenAddressingHashMap:
        ...
        remove(key):
            i = hashAndProbe(key)
            if keys[i] is not null and values[i] is not null:
                // Make the slot a tombstone by setting the value to null.
                values[i] = null
                size = size - 1
                if loadFactor() < MIN_LOAD_FACTOR:
                    resizeTable(keys.size * MULTIPLIER)

The current code has one problem: Adding new entries will never make use
of the tombstones, but will only insert into completely empty slots. It
is possible to fix this by implementing a sligthly different version of
`hashAndProbe`, which will only be used by the `put` method. This is
left as an exercise to the reader.

### Two load factors

There is however a bigger problem with our code above.
When we remove keys we reduce the size of the hash table, but we haven't actually changed the number of occupied slot.
Instead we turned a slot from having a value into a tombstone.
So, the variable `size` -- which is the number $n$ of key/value pairs -- does not say how many slots are actually occupied.

If we are very unlucky we might end up in a table that has a nice load factor, but where almost all slots are tombstones.
But the table doesn't know this, so it will not try to resize and instead we will get a drop in performance.

To make deletion work properly together with resizing, we have to keep track of *two* instance variables -- the number of occupied slots (`size`), and the number of tombstones:

    datatype OpenAddressingHashMap implements Map:
        keys = new Array(MIN_CAPACITY)
        values = new Array(MIN_CAPACITY)
        size = 0
        tombstones = 0


When we have tombstones in our table, there are two possible ways of
thinking about the load factor -- depending on if we want to include
the tombstones or not. And both variants are useful!

-   When adding elements, we need to know if there are too few
    completely empty slots left, giving the load factor $n + d / m$
    (where $n$ is the number of occupied slots and $d$ the number of tombstones).
-   When deleting elements, we need to know if there are too few
    occupied slots, giving the load factor $n / m$.

All this combined result in slightly more complicated code for our methods.
E.g., when deleting a key/value pair -- or rather, turning the slot into a tombstone -- we have to decrease the `size` variable, but we also have to increase the variable `tombstones`.


