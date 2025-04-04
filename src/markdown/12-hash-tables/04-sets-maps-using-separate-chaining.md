
## Implementing sets and maps using separate chaining

::: TODO
- Prio 2: write "implementing sets"
- Prio 2: simplify code
:::

### Implementing sets

### Implementing maps

Here we will show the implementation of a **hash map**. Implementing a
hash set is very similar, and even simpler.

A separate chaining hash map consists of an internal array `bins` of key-value
maps. We don't have to specify what kind of maps just yet, but we will
use a simple [linked list map](#implementing-maps-using-lists)
because the idea is that each bin will only contain a couple
of entries. We also have to remember the collected size of the map,
otherwise we would have to calculate a sum every time `size()` or
`isEmpty()` would be called.

To initialise the table, we first create the internal array of the
initial minimum capacity, and then let every array cell be a new empty
linked list map. Note that we put the initialisation in a private method
of its own, so that we can reuse it when resizing the table.

    datatype SeparateChainingHashMap implements Map:
        bins: Array of Maps = new Array(MIN_CAPACITY)
        size: Int = 0

To get the value for a key, we called the table index for the key, and
then look up the key in the underlying map at that position.

    datatype SeparateChainingHashMap implements Map:
        ...
        get(key):
            i = hash(key)
            return bins[i].get(key)

To set a value for a key, we calculate the table index for the key, and
then we set the value for the key in the underlying map.
If the size of the underlying map changed, we know that the key wasn't in the hash table previously,
and then we know that the number of key/value pairs have been increased.
We also have to check if the load factor becomes too large, and then we
make the internal table larger by a factor.

    datatype SeparateChainingHashMap implements Map:
        ...
        put(key, value):
            i = hash(key)
            oldSize = bins[i].size()
            bins[i].put(key, value)
            if bins[i].size() > oldSize:
                size = size + 1
                if loadFactor() > MAX_LOAD_FACTOR:
                    resizeTable(bins.size() * MULTIPLIER)
            return old

To remove a value, we do the same: find the underlying map for the key,
and remove the key/value pair. If we actually removed the key (i.e., if
it existed in the map), then we decrease the map size. We also check if
the table becomes too sparse, and then decrease the internal table by a
factor.

    datatype SeparateChainingHashMap implements Map:
        ...
        remove(key):
            i = hash(key)
            oldSize = bins[i].size()
            bins[i].remove(key)
            if bins[i].size() < oldSize:
                size = size - 1
                if loadFactor() < MIN_LOAD_FACTOR:
                    resizeTable(bins.size() / MULTIPLIER)
            return removed

The constants for min and max load factors, and the resizing factor, are
a bit arbitrary. With the following values, we ensure that the table on
average contains between 0.5 and 2 entries per table index. Increasing
these values leads to more better memory usage, but also more conflicts
(i.e., longer search times). Also, we enlarge by 50%, or reduce by 33%,
each time we resize the table. Increasing this value means that resizing
will happen less often, but instead the memory usage will increase.

    datatype SeparateChainingHashMap implements Map:
        ...
        MIN_CAPACITY = 8
        MIN_LOAD_FACTOR = 0.5
        MAX_LOAD_FACTOR = 2.0
        MULTIPLIER = 1.5

The load factor $N/M$ is easy to calculate.

    datatype SeparateChainingHashMap implements Map:
        ...
        loadFactor():
            return size / bins.size()


### Resizing the internal table

When we resize the internal table, it is very important that we *do not
keep* the old hash indices for the keys, because they will not be the
same after resizing. Instead we save the current internal table to a
temporary variable, and reinitialise the table to the new capacity. Then
we iterate through all bins and entries in the old table, and simply
insert them again into the new resized table.

    datatype SeparateChainingHashMap implements Map:
        ...
        resizeTable(newCapacity):
            if newCapacity >= minCapacity:
                oldBins = bins
                bins = new Array(newCapacity)
                size = 0
                for each bin in oldBins:
                    for each key, value in bin:
                        put(key, value)


### Exercise

<avembed id="OpenHashPRO" src="Hashing/OpenHashPRO.html" type="ka" name="Separate Chaining Proficiency Exercise"/>

