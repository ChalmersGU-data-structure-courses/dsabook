
## ADT: Maps, or dictionaries

    interface Map of K to V extends Collection of K:
        put(key: K, value: V)        // Sets the value of the given key.
        get(key: K) -> V             // Returns the value associated with the given key, or `null` if the key is not there.
        remove(key: K)               // Removes the value associated with the given key.
        containsKey(key: K) -> Bool  // Returns true if the key has an associated value.



### Use cases

