
## Implementation of open addressing {#hash-tables:implementation}

::: TODO
- Done?
:::

If we already have an implementation of a set or map data structure lying around (such as linked lists or AVL trees),
then implementing a separate chaining hash table is really easy.
The only thing we have to do is to implement [](#alg:separate-chaining) together with some simple error handling.
We leave that as an exercise for the reader.

However, if we do not want to rely on another data structure,
separate chaining becomes a bit more complex since we have to implement support for the linked lists ourselves.
Linear probing on the other hand, does not require implementing operations on an underlying data structure.
Here we present a very simple implementation of a linear probing hash set,
where we initially leave out the problem of resizing the array.

    datatype LinearProbingSet implements Set:
        arr = new Array()  // An array indexed by hash code and linear probing.
        size = 0  // The number of elements in the set.

All set operations require us to first lookup the position in the array, where a given key *should* be.
This is described by [](#alg:linear-probing-lookup), and can be implemented like follows.
The function `lookup` searches for the key, and if it is not found,
it returns the first empty position where it could have been:

    lookup(arr, key) -> Int:
        index = hash(key) % arr.size  // Compress the hash code into the array size.
        while arr[index] is not null:
            if arr[index] == key:  // The key already present.
                return index
            index = (index + 1) % arr.size  // Linear probing.
        return index  // The key is not in the table - return the first empty cell.

Using this function, the basic set operations become very compact.
To check if the set `contains` a key, we first lookup the cell where it should be and then test if it is nonempty:

    contains(hashset, key) -> Bool:
        index = lookup(hashset.arr, key)
        return hashset.arr[index] is not null

To `add` a key to the set, we again lookup the cell where it should be.
If that cell is empty, we can add the key, and we must not forget to increase the size:

    add(hashset, key):
        index = lookup(hashset.arr, key)
        if hashset.arr[index] is null:
            hashset.arr[index] = key
            hashset.size += 1

#### Implementing a map instead of a set

Implementing a map instead of a set would be nearly identical --
we only need to store (key,value)-entries in the internal array,
and remember to only compare the keys in `lookup`.
An alternative is to have *two* internal arrays, one for the keys and another for the values.


### Resizing the internal array {#hash-tables:implementing-resize}

The code above does not work.
When the array gets too filled it starts to take very long time to look up a position,
as already discussed in @sec:hash-tables:resizing.
To solve this we have to resize the array then the *load factor* exceeds a threshold:

    add(hashset, key):
        loadFactor = hashset.size / hashset.arr.size
        if loadFactor > threshold:  // The array is too crowded.
            newCapacity = hashset.arr.size * 2  // Or use any other multiplier > 1.
            resize(hashset, newCapacity)
      // Continue here like the add function above.

We cannot use the same resize operation as normal dynamic arrays,
that is, to simply copy over keys from the old array to the same position in the new array.
This does not work, because the *compression* function depends on the array size.
Therefore we have to recalculate the table index before we add them to the new array.
Easiest is to simply reuse the `add` operation, like this:

    resize(hashset, capacity):
        oldArr = hashset.arr
        hashset.arr = new Array(capacity)  // Create a new empty array.
        hashset.size = 0
        for each key in oldArr:
            if key is not null:
                add(hashset, key)  // Re-add all old keys to the hash set.

This code is very nice and clean, but it is not as efficient as it could be:
`add` calculates the load factor every time,
and in this case this is not necessary because the array has already been resized.
We leave as an exercise to the reader to optimise the code for resizing.


### Lazy deletion {#hash-tables:implementing-deletion}

As discussed in @sec:hash-tables:deletion, we need a unique key for the "tombstones".
This key cannot be of the same type as the keys that the hash table accepts,
and it cannot be `null` because this is used for empty array cells.
So, if we have a hash table of strings, the tombstone must not be a string.
How to do this depends on your programming language, so here we will just assume that we have a unique key `TOMBSTONE`.
With this, we can implement removal like this:

    remove(hashset, key):
        index = lookup(hashset.arr, key)
        if hashset.arr[index] is not null:
            hashset.arr[index] = TOMBSTONE
            hashset.size -= 1
            hashset.tombstones += 1

But wait, what's the purpose of the last line?
Assume that we start with an empty hash table, where the internal array has capacity 100.
Let us add 50 elements, and then remove all of them.
Then the hash table will be empty (its size is 0), but the internal array contains 50 tombstones.
Now, let us add 50 more elements.
The hash table size will now be 50, and the load factor is therefore 0.5.
But the array contains 50 tombstones and 50 keys, so there are no empty cells left.

What did we do wrong?
When we calculate the load factor, we have to include the number of existing keys *and* the tombstones.
Therefore we need another counter for the number of tombstones.
Furthermore, as explained in @sec:hash-tables:shrinking,
the new capacity should not be calculated from the current capacity,
because if we have lots of tombstones the new array would be unnecessarily large.
Instead the new capacity should be calculated from the number of keys excluding the tombstones:

    add(hashset, key):
        loadFactor = (hashset.size + hashset.tombstones) / hashset.arr.size
        if loadFactor > threshold:  // The array is too crowded.
            newCapacity = hashset.size * 2  // Or use any other multiplier > 1/threshold.
            resize(hashset, newCapacity)
      // Continue here like before.

What is left is to also shrink the internal array when it becomes too small.
We leave this as an exercise for the reader,
just try to make it so that you can reuse the `resize` function above.

<!--
    remove(hashset, key):
        loadFactor = hashset.size / hashset.arr.size  // Now we don't have to count the tombstones.
        if loadFactor < deleteThreshold:   // The array is too sparse.
            capacity = hashset.size * 1/2  // Or use any other multiplier < 1/deleteThreshold.
            resize(hashset, capacity)
      // Continue here like the remove function above.
-->
