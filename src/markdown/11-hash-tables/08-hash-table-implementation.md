## Hash table implementation

While seperate chaining is a bit easier in principle, 
linear probing is probably easier to implement because 
it does not require implementing operations on linked lists.

Below is an implementation of a linear probing hash set 
(with add and contain).
It uses a common lookup operation for finding the position a value is in, 
or the first empty position after its ideal position if it is absent.

    datatype LinearProbingSet of T:
        size : int = 0
        table : Array of T = new Array of size 3

    add(set : LinearProbingSet of T, value : T):
        balanceFactor = set.size / set.table.length
        if balanceFactor > threshold:   // this table is too crowded
            set.table = resize(set.table, set.table.length * 2)

        index = lookup(set, value)
        if set.table[index] == null:
            set.table[index] = value
            set.size += 1

    contains(set : LinearProbingSet of T, value : T):
        index = lookup(set, value)
        return set.table[index] != null

    lookup(set : LinearProbingSet of T, value : T):
        index = hash(value) % set.table.length
        while set.table[index] != null:
            if set.table[index] == value:
                return index // value already present
            index = (index + 1) % set.table.length
        return index    // this is the position of a null value

This implementation leaves out a few details, most notably:

* A remove operation, either using lazy deletion or by re-hashing values in the relevant cluster.
* The resize operation that creates a new larger table and re-adds all the values to it.
* An iterator for values, some way of looping through the values of the set.
  This could be implemented by converting the hash table to a list. 

Implementing a map instead of a set would be nearly identical, 
only with an additional value for each key.
