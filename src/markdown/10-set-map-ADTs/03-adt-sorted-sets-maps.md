
## ADT: Sorted sets and maps


### Sorted sets


    interface SortedSet of T extends Set:
        first() -> T          // Returns the first (smallest) element.
        last() -> T           // Returns the last (largest) element.
        floor(x: T) -> T      // Returns the closest element ≤ x, or nothing if there is no such element.
        ceiling(x: T) -> T    // Returns the closest element ≤ x, or nothing if there is no such element.
        lower(x: T) -> T      // Returns the closest element < x, or nothing if there is no such element.
        higher(x: T) -> T     // Returns the closest element > x, or nothing if there is no such element.
        between(x1: T, x2: T) -> Collection of T
                              // Returns all elements x such that x1 ≤ x ≤ x2.


### Sorted maps

    interface SortedMap of K to V extends Map:
        firstKey() -> K               // Returns the first (smallest) key.
        lastKey() -> K                // Returns the last (largest) key.
        floorKey(key: K) -> K         // Returns the closest key ≤ k, or nothing if there is no key.
        ceilingKey(key: K) -> K       // Returns the closest key ≤ k, or nothing if there is no key.
        lowerKey(key: K) -> K         // Returns the closest key < k, or nothing if there is no such element.
        higherKey(key: K) -> K        // Returns the closest key > k, or nothing if there is no such element.
        keysBetween(key1: K, key2: K) -> Collection of K
                                      // Returns all keys k such that k1 ≤ k ≤ k2.




### Use cases


