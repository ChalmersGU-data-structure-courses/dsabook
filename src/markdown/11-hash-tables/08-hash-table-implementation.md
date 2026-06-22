
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
