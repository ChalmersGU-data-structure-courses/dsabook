
## Implementing sets and maps using separate chaining

In this section we go into more details in how to get a working implementation.
First we show how to implement a *hash set*, an then we discuss how to extend this into a *hash map*.

### Implementing sets

A separate chaining hash set consists of an internal array `table` of sets.
We don't have to specify what kind of sets, as long as it supports the basic set methods.
Usually it's perfectly fine to use a very simple linked list and not something more fancy.
To initialise the table, we first create the internal array of some initial minimum capacity:

    datatype SeparateChainingHashSet implements Set:
        table: Array of Sets
        size: Int

        constructor():
            initialise(MIN_CAPACITY)

To simplify things we put the initialisation in a method of its own, because we will reuse it later when resizing the table.
The initialisation not only creates the internal table, but also populates it with new empty sets.

    datatype SeparateChainingHashSet:
        ...
        initialise(capacity):
            size = 0
            table = new Array(capacity)
            for i in 0 .. capacity-1:
                table[i] = new Set()

Note that we keep the total number of elements in a variable `size`.
It is possible to calculate this value by summing the sizes of all bins, but this takes time so we remember it in a variable instead.
This also means that we have to update the variable whenever the size of a bin changes.


#### Searching for an element

To see if the set contains a given element, we look it up in the corresponding bin:

    datatype SeparateChainingHashSet:
        ...
        contains(elem):
            bin = table[hashIndex(elem)]
            return bin.contains(elem)

#### Adding an element

To add an element we add it to the bin where it should belong.
If the size of the bin changed, we know that the key wasn't in the bin previously, and then we know that the number of elements have increased.
We also have to check if the load factor becomes too large, and then we resize the internal table.

    datatype SeparateChainingHashSet:
        ...
        add(elem):
            bin = table[hashIndex(elem)]
            oldBinSize = bin.size
            bin.add(elem)
            if bin.size > oldBinSize:
                size = size + 1
                if loadFactor() > MAX_LOAD_FACTOR:
                    resizeTable(table.size * MULTIPLIER)

#### Removing an element

To remove a value, we do the same: find the underlying bin and remove the value.
If we actually removed the element (i.e., if it existed in the bin), then we decrease the total size.
We also check if the table becomes too sparse, and then decrease the internal table by a factor.

    datatype SeparateChainingHashSet:
        ...
        remove(elem):
            bin = table[hashIndex(elem)]
            oldBinSize = bin.size
            bin.remove(elem)
            if bin.size < oldBinSize:
                size = size - 1
                if loadFactor() < MIN_LOAD_FACTOR:
                    resizeTable(table.size / MULTIPLIER)

#### Load factor and constants

The load factor is simply the total number of elements divided by the number of bins, or $n/m$:

    datatype SeparateChainingHashSet:
        ...
        loadFactor():
            return size / table.size

The constants for min and max load factors, and the resizing factor, are
a bit arbitrary. With the following values, we ensure that the table on
average contains between 0.5 and 2 entries per table index. Increasing
these values leads to more better memory usage, but also more conflicts
(i.e., longer search times). Also, we enlarge by 50%, or reduce by 33%,
each time we resize the table. Increasing this value means that resizing
will happen less often, but instead the memory usage will increase.

    datatype SeparateChainingHashSet:
        ...
        MIN_CAPACITY = 8
        MIN_LOAD_FACTOR = 0.5
        MAX_LOAD_FACTOR = 2.0
        MULTIPLIER = 1.5


#### Resizing the internal table

When we resize the internal table, it is very important that we *do not
keep* the old hash indices for the keys, because they will not be the
same after resizing. Instead we save the current internal table to a
temporary variable, and reinitialise the table to the new capacity. Then
we iterate through all bins and entries in the old table, and simply
insert them again into the new resized table.

    datatype SeparateChainingHashSet:
        ...
        resizeTable(newCapacity):
            if newCapacity >= MIN_CAPACITY:
                oldTable = table
                initialise(newCapacity)
                for each bin in oldTable:
                    for each elem in bin:
                        add(elem)

### Implementing maps

It is straightforward to modify the implementation above to become a key-value map instead of a set.

    datatype SeparateChainingHashMap implements Map:
        table: Array of Maps
        ...
        get(key):
            // Similar to contains for hash sets, but use Map.get instead:
            ... return bin.get(key)
        put(key, value):
            // Similar to add for hash sets, but use Map.put instead:
            ... bin.put(key, value) ...
        remove(key):
            // Similar to remove for hash sets, but use Map.remove instead:
            ... bin.remove(key) ...
        resizeTable(newCapacity):
            // Similar to resizeTable for hash sets, but use put instead:
            ... for each key, value in bin:
                    put(key, value)


::: dsvis
###  Exercise: Separate chaining

<avembed id="OpenHashPRO" src="Hashing/OpenHashPRO.html" type="ka" name="Separate Chaining Proficiency Exercise"/>
:::

