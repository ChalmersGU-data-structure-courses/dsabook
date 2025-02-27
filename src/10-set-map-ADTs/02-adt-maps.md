
## ADT: Maps, or dictionaries

    interface Map extends Iterable:
        put(key, value)   // Sets the value of the given key. Returns the previous value, or nothing.
        get(key)          // Returns the value associated with the given key, or nothing if the key is not there.
        remove(key)       // Removes and returns the value associated with the given key, or nothing if there is no key.
        containsKey(key)  // Returns true if the key has an associated value.
        isEmpty()         // Returns true if there are no keys.
        size()            // Returns the number of keys (i.e., the number of key/value pairs).


### Invariants


### Use cases

