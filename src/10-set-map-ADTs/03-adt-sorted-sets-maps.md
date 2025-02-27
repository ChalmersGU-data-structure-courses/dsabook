
## ADT: Sorted sets and maps


### Sorted sets


    interface SortedSet extends Set:
        first()          // Returns the first (smallest) element.
        last()           // Returns the last (largest) element.
        floor(x)         // Returns the closest element ≤ x, or nothing if there is no such element.
        ceiling(x)       // Returns the closest element ≤ x, or nothing if there is no such element.
        lower(x)         // Returns the closest element < x, or nothing if there is no such element.
        higher(x)        // Returns the closest element > x, or nothing if there is no such element.
        between(x1, x2)  // Returns all elements x such that x1 ≤ x ≤ x2.


### Sorted maps

    interface SortedMap extends Map:
        firstKey()               // Returns the first (smallest) key.
        lastKey()                // Returns the last (largest) key.
        floorKey(key)            // Returns the closest key ≤ k, or nothing if there is no key.
        ceilingKey(key)          // Returns the closest key ≤ k, or nothing if there is no key.
        lowerKey(key)            // Returns the closest key < k, or nothing if there is no such element.
        higherKey(key)           // Returns the closest key > k, or nothing if there is no such element.
        keysBetween(key1, key2)  // Returns all keys k such that k1 ≤ k ≤ k2.


### Invariants


### Use cases


