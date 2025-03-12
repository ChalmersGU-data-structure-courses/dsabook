
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

    class SeparateChainingHashMap implements Map:
        SeparateChainingHashMap():
            this.initialise(minCapacity)

        initialise(capacity):
            this.bins = new Array(capacity)
            this.mapSize = 0

        lookupBin(i):
            bin = this.bins[i]
            if bin == null:
                bin = new LinkedListMap()
                this.bins[i] = bin
            return bin

To get the value for a key, we called the table index for the key, and
then look up the key in the underlying map at that position.

    class SeparateChainingHashMap implements Map:
        ...
        get(key):
            i = this.hash(key)
            return this.bins[i].get(key)


To set a value for a key, we calculate the table index for the key, and
then we set the value for the key in the underlying map. If if the old
value for the key is null, the key wasn't in the hash table previously,
and then we know that the number of key/value pairs have been increased.
We also have to check if the load factor becomes too large, and then we
make the internal table larger by a factor.

    class SeparateChainingHashMap implements Map:
        ...
        def put(key, value):
            i = this.hash(key)
            old = this.bins[i].put(key, value)
            if old is null:
                this.mapSize = this.mapSize + 1
                if this.loadFactor() > maxLoadFactor:
                    this.resizeTable(this.bins.size() * capacityMultiplier)
            return old

To remove a value, we do the same: find the underlying map for the key,
and remove the key/value pair. If we actually removed the key (i.e., if
it existed in the map), then we decrease the map size. We also check if
the table becomes too sparse, and then decrease the internal table by a
factor.

    class SeparateChainingHashMap implements Map:
        ...
        def remove(key):
            i = this.hash(key)
            removed = this.bins[i].remove(key)
            if removed is not null:
                this.mapSize = this.mapSize - 1
                if this.loadFactor() < minLoadFactor:
                    this.resizeTable(this.bins.size() / capacityMultiplier)
            return removed

The constants for min and max load factors, and the resizing factor, are
a bit arbitrary. With the following values, we ensure that the table on
average contains between 0.5 and 2 entries per table index. Increasing
these values leads to more better memory usage, but also more conflicts
(i.e., longer search times). Also, we enlarge by 50%, or reduce by 33%,
each time we resize the table. Increasing this value means that resizing
will happen less often, but instead the memory usage will increase.

    class SeparateChainingHashMap implements Map:
        ...
        minCapacity = 8
        minLoadFactor = 0.5
        maxLoadFactor = 2.0
        capacityMultiplier = 1.5

The load factor $N/M$ is easy to calculate.

    class SeparateChainingHashMap implements Map:
        ...
        loadFactor():
            return this.mapSize / this.bins.size()


### Resizing the internal table

When we resize the internal table, it is very important that we *do not
keep* the old hash indices for the keys, because they will not be the
same after resizing. Instead we save the current internal table to a
temporary variable, and reinitialise the table to the new capacity. Then
we iterate through all bins and entries in the old table, and simply
insert them again into the new resized table.

    class SeparateChainingHashMap implements Map:
        ...
        def resizeTable(newCapacity):
            if newCapacity >= this.minCapacity:
                oldBins = this.bins
                this.initialiseTable(newCapacity)
                for each bin in oldBins:
                    for each k in bin:
                        this.put(k, bin.get(k))


### Exercise

<avembed id="OpenHashPRO" src="Hashing/OpenHashPRO.html" type="ka" name="Separate Chaining Proficiency Exercise"/>

