
## Arrays as Sets or Maps

In the [introduction](#information-retrieval-sets-and-maps) chapter we learnt about
*sets* and *maps*, two of the most important ADTs.

    interface Set extends Collection:
        add(x)       // Adds x to the set. Returns true if the element wasn't already in the set.
        remove(x)    // Removes x from the set. Returns true if the element was in the set.
        contains(x)  // Returns true if x is in the set.

    interface Map extends Iterable:
        put(key, value)   // Sets the value of the given key. Returns the previous value, or nothing.
        get(key)          // Returns the value associated with the given key, or nothing if the key is not there.
        remove(key)       // Removes and returns the value associated with the given key, or nothing if there is no key.
        containsKey(key)  // Returns true if the key has an associated value.
        isEmpty()         // Returns true if there are no keys.
        size()            // Returns the number of keys (i.e., the number of key/value pairs).


We can implement either of these ADTs using an array. For a set, we can
use an array of elements. For a map, we have two choices:

-   In languages which support *tuples* as a data type (such as Python),
    we can have an array of *key-value* pairs.
-   Alternatively, we can use two arrays. One array, `keys`, holds the
    keys and the other array, `values`, holds the corresponding values.
    The two arrays must be "kept in sync" so that `values[i]` holds
    the value associated with key `keys[i]`.

We have one further choice: should the array be *sorted* or *unsorted*?

An unsorted array is usually not an appropriate choice, because the
`contains` method must use *linear search*, which takes linear time.
Thus we cannot really look up items in the set or map efficiently.

A sorted array is a lot better. The `contains` method can use *binary
search*, which takes logarithmic time. Hence looking up items is
efficient. Unfortunately, modifying the data structure is slow. If we
want to `add` an item to a sorted array, we have to keep the array
sorted -- and that means we need to *insert* the new item at the right
place in the array, using the insertion algorithm from Insertion Sort.
This takes linear time in the worst case. Similarly, to `remove` an item
without creating a hole in the array, we need to move all the items that
come after one space backwards. This also takes linear time.

A sorted array is a suitable way to implement a set or a map that *never
changes*, that is where we never need to add or remove items after the
array is created. We start by sorting the array, using either quicksort
or mergesort, and then we can use binary search to find items in it.
Sorted arrays also support the *sorted set* and *sorted map* operations
such as *range queries* -- these can also be implemented using binary
search. As a reminder, here are the relevant operations:

    interface SortedSet extends Set:
        first()          // Returns the first (smallest) element. Raises an exception if the set is empty.
        last()           // Returns the last (largest) element. Raises an exception if the set is empty.
        floor(x)         // Returns the closest element <= x, or nothing if there is no such element.
        ceiling(x)       // Returns the closest element >= x, or nothing if there is no such element.
        lower(x)         // Returns the closest element < x, or nothing if there is no such element.
        higher(x)        // Returns the closest element > x, or nothing if there is no such element.
        between(x1, x2)  // Returns all elements x such that x1 <= x <= x2.

    interface SortedMap extends Map:
        firstKey()               // Returns the first (smallest) key. Raises an exception if the map is empty.
        lastKey()                // Returns the last (largest) key. Raises an exception if the map is empty.
        floorKey(key)            // Returns the closest key <= k, or nothing if there is no key.
        ceilingKey(key)          // Returns the closest key >= k, or nothing if there is no key.
        lowerKey(key)            // Returns the closest key < k, or nothing if there is no such element.
        higherKey(key)           // Returns the closest key > k, or nothing if there is no such element.
        keysBetween(key1, key2)  // Returns all keys k such that k1 <= k <= k2.


Sorted arrays can also be useful in cases where we always add *many*
items in one go. Given a sorted array $A$, and an unsorted list of items
$B$, we can add the items in $B$ to $A$ as follows. First we sort $B$,
then we merge $A$ and $B$, using the merge algorithm from mergesort.
Note that the merge step takes linear time, and sorting $B$ takes a bit
more than linear time, so this is a lot faster than adding all the items
from $B$ one by one (which would take quadratic time).

An array is not a good way to implement a set or a map, if we need both
`add`, `remove` and `contains` to be efficient. Later we will learn
about two data structures that are more suitable for implementing sets
and maps: binary search trees and hash tables.
