
## Implementing sets and maps using open addressing

::: TODO
- Prio 1: resizing
- Prio 2: write "implementing sets"
- Prio 2: simplify code
:::

### Implementing sets

### Implementing maps

All main methods in the Map interface (`put`, `get` and `remove`) use
the same probing function **p** to get the same probe sequence. In this
way, a record not in its home position can be recovered.

An implementation for the `get` method is as follows.

    datatype OpenAddressingHashMap implements Map:
        ...
        get(key):
            i = hashAndProbe(key)
            if keys[i] is null:
                return null
            else:
                return values[i]


Searching and inserting both assume that at least one slot on the probe
sequence of every key will be empty. Otherwise they will continue in an
infinite loop on unsuccessful searches. Thus, the hash system should
keep a count of the number of records stored, and make sure to resize
the array when it becomes too full.

Setting a value for a key into the hash map works like

    datatype OpenAddressingHashMap implements Map:
        ...
        put(key, value):
            i = hashAndProbe(key)
            if keys[i] is null:
                keys[i] = key
                size = size + 1
            old = values[i]
            values[i] = value
            if loadFactor() > MAX_LOAD_FACTOR:
                resizeTable(keys.size * MULTIPLIER)
            return old


First we the next available slot for the given key. If the slot is empty
(`null`), we insert the key into the keys table, and increase the map size.
Then we update the values table with the new value.
Finally, we resize the table if the load factor becomes too large.

Deleting from an open addressing hash table is explained
[later in this chapter](#open-addressing-deletion).

### Resizing the internal table
