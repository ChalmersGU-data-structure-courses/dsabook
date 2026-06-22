
## Implementation of open addressing {#hash-tables:implementation}

While seperate chaining is a bit easier in principle,
linear probing is arguably easier to implement because
it does not require implementing operations on linked lists.
Below is a very simple implementation of a linear probing hash set,
where we leave out the problem of resizing (see section @sec:hash-tables:resizing).

    datatype LinearProbingSet implements Set:
        arr = new Array()  // An array of values, indexed by hashcode and linear probing
        size = 0           // The number of values in the set

To check if a value is in the set, we first find the position in the array where it *should* be,
and then test if that cell is nonempty:

    contains(hashset, value) -> Bool:
        index = lookup(hashset.arr, value)
        return hashset.arr[index] is not null

To add a value to the set, we again find the position where it should be.
If that cell is empty, we can add the value, and we must not forget to increase the size:

    add(hashset, value):
        index = lookup(hashset.arr, value)
        if hashset.arr[index] is null:
            hashset.arr[index] = value
            hashset.size += 1

Both operations use a common operation `lookup` for finding the position of a value.
If the value is not found, it returns the first empty position where it could have been:

    lookup(arr, value) -> Int:
        index = hash(value) % arr.size      // Compress the hash value into the array size.
        while arr[index] is not null:
            if arr[index] == value:           // The value already present.
                return index
            index = (index + 1) % arr.size  // Linear probing.
        return index                          // This is the position of a null value.

Implementing a map instead of a set would be nearly identical,
only with an additional value for each key.

### Using a dynamic array

The code above does not work.
When the array gets too filled it starts to take very long time to look up a position,
as already discussed in @sec:hash-tables:resizing.
To solve this we use a *dynamic array*, which we introduced in @sec:sequences:dynamic-arrays.
However, contrary to stacks, hashsets and heaps, we cannot wait until the array is completely full --
instead we resize the array when the *load factor* exceeds a threshold:

    add(hashset, value):
        loadFactor = hashset.size / hashset.arr.size
        if loadFactor > threshold:            // The array is too crowded.
            capacity = hashset.arr.size * 2   // Or use any other multiplier > 1.
            resize(hashset, capacity)
        // Continue here like the add function above.
        ...

A common mistake is to use the same resize operation as we did for stacks or heaps
(see [@sec:sequences:dynamic-arrays;@sec:heaps:binary-heaps]),
that is, to simply copy over values from the old to the new array.
But this does not work, because the *compression* function depends on the array size.
Therefore we have to recalculate the table index before we add them to the new array.
Easiest is to simply reuse the `add` operation above, like this:

    resize(hashset, capacity):
        oldArr = hashset.arr
        hashset.arr = new Array(capacity)  // Create a new array with the new capacity.
        hashset.size = 0                   // The new array is initially empty.
        for each value in oldArr:
            if value is not null:
                add(hashset, value)        // re-add all old values to the hash set.

This code is very nice and clean, but it is not as efficient as it could be:
`add` calculates the load factor every time,
and in this case this is not necessary because the array has already been resized.
We leave as an exercise to the reader to optimise the code for resizing.

### Lazy deletion

As discussed in @sec:hash-tables:deletion, we need a unique value for the "tombstones".
This value cannot be of the same type as the values that the hash table accepts,
and it cannot be `null` because this is used for empty array cells.
So, if we have a hash table of strings, the tombstone must not be a string.
How to do this depends on your programming language, so here we will just assume that we have a unique value `TOMBSTONE`.
With this, we can implement removal like this:

    remove(hashset, value):
        index = lookup(hashset.arr, value)
        if hashset.arr[index] is not null:
            hashset.arr[index] = TOMBSTONE
            hashset.size -= 1
            hashset.tombstones += 1

But wait, what with the last line?
Assume that we start with an empty hash table, where the internal array has capacity 100, and the resizing threshold is 0.75.
Let us add 50 elements, and then remove all of them.
Then the hash table will be empty (its size is 0), but the internal array contains 50 tombstones.
Now, let us add 50 more elements.
The hash table size will now be 50, and the load factor is therefore 0.5, which is smaller than the threshold.
But the array contains 50 tombstones and 50 values, so there are no empty cells left.

What did we do wrong?
When we calculate the load factor, we have to include the number of existing values *and* the tombstones.
Therefore we need another counter for the number of tombstones, and then we can calculate the load factor like this:

    loadFactor = (hashset.size + hashset.tombstones) / hashset.arr.size

What is left is to also shrink the internal array when it becomes too small.
We leave this as an exercise for the reader,
just try to make it so that you can reuse the `resize` function above.

<!--
    remove(hashset, value):
        loadFactor = hashset.size / hashset.arr.size  // Now we don't have to count the tombstones.
        if loadFactor < deleteThreshold:              // The array is too sparse.
            capacity = hashset.arr.size * 1/3         // Or use any other multiplier < 1/threshold.
            resize(hashset, capacity)
        // Continue here like the remove function above.
-->
