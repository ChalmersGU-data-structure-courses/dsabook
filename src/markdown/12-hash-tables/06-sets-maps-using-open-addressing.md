
## Implementing sets and maps using open addressing

An open addressing hash set consists of an internal array `table` of elements.
Apart from the special value `null`, denoting an empty slot, the table must also allow the special value `DELETED`, denoting a slot that has been deleted.
To initialise the table, we first create the internal array of some initial minimum capacity:

    datatype OpenAddressingHashSet implements Set:
        table = new Array(MIN_CAPACITY)
        size = 0

As already explained, all main methods (`contains`, `add` and `remove`) use the same probing function to get the same probe sequence.
This is implemented by the method `hashAndProbe` that was shown in the previous section.
In this way, a record not in its home position can always be recovered.

To search for an element we probe the table for a position and check if the slot contains the element we are looking for:

    datatype OpenAddressingHashSet:
        ...
        contains(elem):
            i = hashAndProbe(elem)
            return table[i] == elem

When we want to add an element we first have to search for it.
If the element isn't found, the probing returns the index to an empty slot, which we then can assign the element.
Now we have to increase the size of the set, and check if we have exceeded the maximum allowed load factor.
If the load factor is too large, then we resize the internal table -- which was explained in the previous section.

    datatype OpenAddressingHashSet:
        ...
        add(elem):
            i = hashAndProbe(elem)
            if table[i] is null:
                table[i] = elem
                size = size + 1
                if loadFactor() > MAX_LOAD_FACTOR:
                    resizeTable(table.size * MULTIPLIER)

Deleting from an open addressing hash table was explained briefly in the last section and we will go into more details in the next section.

We use the same constants as for the separate chaining hash table, but the values are different.
Most importantly, the max load factor must be smaller than 1, since there can only be one value per array slot.

    datatype OpenAddressingHashSet:
        ...
        MIN_CAPACITY = 8
        MIN_LOAD_FACTOR = 0.3
        MAX_LOAD_FACTOR = 0.7
        MULTIPLIER = 1.5

### Resizing

When we resize the internal table, it is very important that we *do not keep* the old hash indices for the keys, because they will not be the same after resizing.
This is exactly the same as for separate chaining.
Instead we save the current internal table to a temporary variable, and reinitialise the table to the new capacity.
Then we iterate through all entries in the old table, and simply insert them again into the new resized table.

    datatype SeparateChainingHashSet:
        ...
        resizeTable(newCapacity):
            oldTable = table                // Remember the old table.
            table = new Array(newCapacity)  // Reset the internal table.
            size = 0                        // Reset the number of elements.
            for each elem in oldTable:
                if elem is not null and not DELETED:
                    add elem

Now we can get rid of all the deleted slots, simply by not adding them to the new table.


### Implementing maps

If we want to implement a map instead of a set, we have to store both a key and a value in the same slot.
This can be done in two ways: either one array of key-value pairs, or two arrays of the same length -- one for the keys and another for the values.
Here we will use the second approach.

    datatype OpenAddressingHashMap implements Map:
        keys = new Array(MIN_CAPACITY)
        values = new Array(MIN_CAPACITY)
        size = 0

The changes that has to be made are these, compared to how we implemented sets:

- when searching in the hash table, we have to use the `keys` array (which was the `table` array for the hash set)
- when getting and setting the value, we use the same index in the `values` array

Searching is straightforward:

    datatype OpenAddressingHashSet:
        ...
        get(key):
            i = hashAndProbe(key)
            if keys[i] == key:
                return values[i]

Setting the value for a key becomes slightly longer, because we have to check if the key already exists or not.
If the key doesn't exist we have to increase the size and check if we need to resize the tables.

    datatype OpenAddressingHashSet:
        ...
        put(key, value):
            i = hashAndProbe(key)
            values[i] = value
            if keys[i] is null:
                keys[i] = key
                size = size + 1
                if loadFactor() > MAX_LOAD_FACTOR:
                    resizeTable(keys.size * MULTIPLIER)

Reisizing is very similar to that for sets, we just have to remember to reset both internal tables (`keys` and `values`).
