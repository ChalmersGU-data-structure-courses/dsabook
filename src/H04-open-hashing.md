
## Separate Chaining, or Open Hashing {#separate-chaining}

While the goal of a hash function is to minimize collisions, some
collisions are unavoidable in practice. Thus, hashing implementations
must include some form of collision resolution policy. Collision
resolution techniques can be broken into two classes:
[separate chaining]{.term} (also called open hashing) and
[open addressing]{.term} (also called closed hashing). 
(Yes, it is confusing when "open hashing" means the opposite 
of "open addressing", but unfortunately, that is the way it is.) 
The difference between the two has to do with whether collisions
are stored outside the table (separate chaining/open hashing), or
whether collisions result in storing one of the records at another slot
in the table (open addressing/closed hashing).

The simplest form of separate chaining defines each slot in the hash
table to be the head of a linked list. All records that hash to a
particular slot are placed on that slot's linked list. The following
figure illustrates a hash table where each slot points to a linked list
to hold the records associated with that slot. The hash function used is
the simple mod function.

<inlineav id="openhashCON" src="Hashing/openhashCON.js" name="Hashing/openhashCON" links="Hashing/openhashCON.css" static/>

Records within a slot's list can be ordered in several ways: by
insertion order, by key value order, or by frequency-of-access order.
Ordering the list by key value provides an advantage in the case of an
unsuccessful search, because we know to stop searching the list once we
encounter a key that is greater than the one being searched for. If
records on the list are unordered or ordered by frequency, then an
unsuccessful search will need to visit every record on the list.

Given a table of size $M$ storing $N$ records, the hash function will
(ideally) spread the records evenly among the $M$ positions in the
table, yielding on average $N/M$ records for each list. This value,
$N/M$, is commonly called the [load factor]{.term}.

Assuming that the table has more slots than there are records to be
stored, we can hope that few slots will contain more than one record. In
the case where a list is empty or has only one record, a search requires
only one access to the list. Thus, the average cost for hashing should
be $\Theta(1$). However, if clustering causes many records to hash to
only a few of the slots, then the cost to access a record will be much
higher because many elements on the linked list must be searched.

Separate chaining is most appropriate when the hash table is kept in
main memory, with the lists implemented by a standard in-memory linked
list. Storing an separate chaining hash table on disk in an efficient
way is difficult, because members of a given linked list might be stored
on different disk blocks. This would result in multiple disk accesses
when searching for a particular key value, which defeats the purpose of
using hashing.

There are similarities between separate chaining and
[Binsort]{.term}. One way to view separate
chaining is that each record is simply placed in a bin. While multiple
records may hash to the same bin, this initial binning should still
greatly reduce the number of records accessed by a search operation. In
a similar fashion, a simple Binsort reduces the number of records in
each bin to a small number that can be sorted in some other way.

### Alternatives to a linked list

There is nothing that requires us to use a linked list as the underlying
data structure, it could be a dynamic array or a balanced search tree
too. (In fact, Java 8's hash tables use a combination of linked lists
and balanced trees).

Conceptually, a hash table can use any kind of collection data structure
--the only thing that the actual array does is to partition the large
collection into $M$ disjoint collections. If the hash function is good
and distributes the objects evenly among the bins, all operations will
become $M$ times faster (because the bins are $M$ times smaller than the
original large collection).

### Resizing is important

Just as for dynamic arrays, it is important that we resize the internal
table when it becomes too large (or too small). That is, we change the
size $M$ so that it is proportional to the number of table entries.

If $M$ is always proportional to the number of entries, *and* if we have
a good hash function, the number of elements in a bin will remain
approximately constant. And then all operations will be expected
constant time.

### Implementing Separate Chaining

Here we will show the implementation of a **hash map**. Implementing a
hash set is very similar, and even simpler.

A separate chaining hash map consists of an internal array of key-value
maps. We don't have to specify what kind of maps just yet, but we will
use a simple [linked list map](#implementing-maps-using-lists) 
because the idea is that each bin will only contain a couple
of entries. We also have to remember the collected size of the map,
otherwise we would have to calculate a sum every time `size()` or
`isEmpty()` would be called.

To initialise the table, we first create the internal array of the
initial minimum capacity, and then let every array cell be a new empty
linked list map. Note that we put the initialisation in a private method
of its own, so that we can reuse it when resizing the table.

```python
class SeparateChainingHashMap(Map):
```

```java
class SeparateChainingHashMap<K, V> implements Map<K, V> {
    Map<K, V>[] internalTable;
    int mapSize;

    SeparateChainingHashMap() {
        initialiseTable(MinCapacity);
    }

    @SuppressWarnings("unchecked")
    private void initialiseTable(int capacity) {
        internalTable = (Map<K, V>[]) new LinkedMap[capacity];
        mapSize = 0;
    }

    private Map<K, V> lookupBin(int i) {
        Map<K, V> bin = internalTable[i];
        if (bin == null)
            bin = internalTable[i] = new LinkedMap<>();
        return bin;
    }
```



To get the value for a key, we called the table index for the key, and
then look up the key in the underlying map at that position.

```python
    def get(self, key):
        i = self._hash(key)
        return self._internalTable[i].get(key)
```

```java
    public V get(K key) {
        int i = hash(key);
        return lookupBin(i).get(key);
    }        
```



To set a value for a key, we calculate the table index for the key, and
then we set the value for the key in the underlying map. If if the old
value for the key is null, the key wasn't in the hash table previously,
and then we know that the number of key/value pairs have been increased.
We also have to check if the load factor becomes too large, and then we
make the internal table larger by a factor.

```python
    def put(self, key, value):
        i = self._hash(key)
        old = self._internalTable[i].put(key, value)
        if old is None:
            self._mapSize += 1
            if self.loadFactor() > self._maxLoadFactor:
                self._resizeTable(len(self._internalTable) * self._capacityMultiplier)
        return old
```

```java
    public V put(K key, V value) {
        int i = hash(key);
        V old = lookupBin(i).put(key, value);
        if (old == null) {
            mapSize++;
            if (loadFactor() > MaxLoadFactor)
                resizeTable((int) (internalTable.length * CapacityMultiplier));
        }
        return old;
    }
```



To remove a value, we do the same: find the underlying map for the key,
and remove the key/value pair. If we actually removed the key (i.e., if
it existed in the map), then we decrease the map size. We also check if
the table becomes too sparse, and then decrease the internal table by a
factor.

```python
    def remove(self, key):
        i = self._hash(key)
        removed = self._internalTable[i].remove(key)
        if removed is not None:
            self._mapSize -= 1
            if self.loadFactor() < self._minLoadFactor:
                self._resizeTable(len(self._internalTable) / self._capacityMultiplier)
        return removed
```

```java
    public V remove(K key) {
        int i = hash(key);
        V removed = lookupBin(i).remove(key);
        if (removed != null) {
            mapSize--;
            if (loadFactor() < MinLoadFactor) 
                resizeTable((int) (internalTable.length / CapacityMultiplier));
        }
        return removed;
    }            
```



The constants for min and max load factors, and the resizing factor, are
a bit arbitrary. With the following values, we ensure that the table on
average contains between 0.5 and 2 entries per table index. Increasing
these values leads to more better memory usage, but also more conflicts
(i.e., longer search times). Also, we enlarge by 50%, or reduce by 33%,
each time we resize the table. Increasing this value means that resizing
will happen less often, but instead the memory usage will increase.

```python
    _minCapacity = 8
    _minLoadFactor = 0.5
    _maxLoadFactor = 2.0
    _capacityMultiplier = 1.5
```

```java
    static int MinCapacity = 8;
    static double MinLoadFactor = 0.5;
    static double MaxLoadFactor = 2.0;
    static double CapacityMultiplier = 1.5;
```



The load factor $N/M$ is easy to calculate.

```python
    def loadFactor(self):
        return self._mapSize / len(self._internalTable)
```

```java
    public double loadFactor() {
        return (double) mapSize / internalTable.length;
    }
```



### Resizing the internal table

When we resize the internal table, it is very important that we *do not
keep* the old hash indices for the keys, because they will not be the
same after resizing. Instead we save the current internal table to a
temporary variable, and reinitialise the table to the new capacity. Then
we iterate through all bins and entries in the old table, and simply
insert them again into the new resized table.

```python
    def _resizeTable(self, newCapacity):
        if newCapacity < self._minCapacity: return
        oldTable = self._internalTable
        self._initialiseTable(int(newCapacity))
        for bin in oldTable:
            for k in bin:
                self.put(k, bin.get(k))
```

```java
    private void resizeTable(int newCapacity) {
        if (newCapacity < MinCapacity) return;
        Map<K, V>[] oldTable = internalTable;
        initialiseTable(newCapacity);
        for (Map<K, V> bin : oldTable)
            if (bin != null)
                for (K k : bin)
                    put(k, bin.get(k));
    }
```



### Exercise

<avembed id="OpenHashPRO" src="Hashing/OpenHashPRO.html" type="ka" name="Separate Chaining Proficiency Exercise"/>

### Full implementation

Here is the full implementation for separate chaining hash tables.

```python
#/* *** ODSATag: Header *** */
class SeparateChainingHashMap(Map):
#/* *** ODSAendTag: Header *** */
#/* *** ODSATag: Constants *** */
    _minCapacity = 8
    _minLoadFactor = 0.5
    _maxLoadFactor = 2.0
    _capacityMultiplier = 1.5
#/* *** ODSAendTag: Constants *** */

#/* *** ODSATag: Constructor *** */
    def __init__(self):
        self._initialiseTable(self._minCapacity)

    def _initialiseTable(self, capacity):
        capacity = int(capacity)
        self._internalTable = [None] * capacity
        for i in range(capacity):
            self._internalTable[i] = LinkedMap()
        self._mapSize = 0
#/* *** ODSAendTag: Constructor *** */

#/* *** ODSATag: HashIndex *** */
    def _hash(self, key):
        return (hash(key) & 0x7fffffff) % len(self._internalTable)
#/* *** ODSAendTag: HashIndex *** */

#/* *** ODSATag: Put *** */
    def put(self, key, value):
        i = self._hash(key)
        old = self._internalTable[i].put(key, value)
        if old is None:
            self._mapSize += 1
            if self.loadFactor() > self._maxLoadFactor:
                self._resizeTable(len(self._internalTable) * self._capacityMultiplier)
        return old
#/* *** ODSAendTag: Put *** */

#/* *** ODSATag: Get *** */
    def get(self, key):
        i = self._hash(key)
        return self._internalTable[i].get(key)
#/* *** ODSAendTag: Get *** */

#/* *** ODSATag: Remove *** */
    def remove(self, key):
        i = self._hash(key)
        removed = self._internalTable[i].remove(key)
        if removed is not None:
            self._mapSize -= 1
            if self.loadFactor() < self._minLoadFactor:
                self._resizeTable(len(self._internalTable) / self._capacityMultiplier)
        return removed
#/* *** ODSAendTag: Remove *** */

    def containsKey(self, key):
        i = self._hash(key)
        return self._internalTable[i].containsKey(key)

#/* *** ODSATag: Resize *** */
    def _resizeTable(self, newCapacity):
        if newCapacity < self._minCapacity: return
        oldTable = self._internalTable
        self._initialiseTable(int(newCapacity))
        for bin in oldTable:
            for k in bin:
                self.put(k, bin.get(k))
#/* *** ODSAendTag: Resize *** */

    def isEmpty(self):
        return self._mapSize == 0

    def size(self):
        return self._mapSize

#/* *** ODSATag: LoadFactor *** */
    def loadFactor(self):
        return self._mapSize / len(self._internalTable)
#/* *** ODSAendTag: LoadFactor *** */

    def __iter__(self):
        for bin in self._internalTable:
            for key in bin:
                yield key
```

```java
/* *** ODSATag: Header *** */
class SeparateChainingHashMap<K, V> implements Map<K, V> {
    Map<K, V>[] internalTable;
    int mapSize;

    SeparateChainingHashMap() {
        initialiseTable(MinCapacity);
    }

    @SuppressWarnings("unchecked")
    private void initialiseTable(int capacity) {
        internalTable = (Map<K, V>[]) new LinkedMap[capacity];
        mapSize = 0;
    }

    private Map<K, V> lookupBin(int i) {
        Map<K, V> bin = internalTable[i];
        if (bin == null)
            bin = internalTable[i] = new LinkedMap<>();
        return bin;
    }
/* *** ODSAendTag: Header *** */

/* *** ODSATag: Constants *** */
    static int MinCapacity = 8;
    static double MinLoadFactor = 0.5;
    static double MaxLoadFactor = 2.0;
    static double CapacityMultiplier = 1.5;
/* *** ODSAendTag: Constants *** */

/* *** ODSATag: HashIndex *** */
    private int hash(K key) {
        return (key.hashCode() & 0x7fffffff) % internalTable.length;
    }
/* *** ODSAendTag: HashIndex *** */

/* *** ODSATag: Put *** */
    public V put(K key, V value) {
        int i = hash(key);
        V old = lookupBin(i).put(key, value);
        if (old == null) {
            mapSize++;
            if (loadFactor() > MaxLoadFactor)
                resizeTable((int) (internalTable.length * CapacityMultiplier));
        }
        return old;
    }
/* *** ODSAendTag: Put *** */

/* *** ODSATag: Get *** */
    public V get(K key) {
        int i = hash(key);
        return lookupBin(i).get(key);
    }        
/* *** ODSAendTag: Get *** */

/* *** ODSATag: Remove *** */
    public V remove(K key) {
        int i = hash(key);
        V removed = lookupBin(i).remove(key);
        if (removed != null) {
            mapSize--;
            if (loadFactor() < MinLoadFactor) 
                resizeTable((int) (internalTable.length / CapacityMultiplier));
        }
        return removed;
    }            
/* *** ODSAendTag: Remove *** */

    public boolean containsKey(K key) {
        int i = hash(key);
        return lookupBin(i).containsKey(key);
    }

/* *** ODSATag: Resize *** */
    private void resizeTable(int newCapacity) {
        if (newCapacity < MinCapacity) return;
        Map<K, V>[] oldTable = internalTable;
        initialiseTable(newCapacity);
        for (Map<K, V> bin : oldTable)
            if (bin != null)
                for (K k : bin)
                    put(k, bin.get(k));
    }
/* *** ODSAendTag: Resize *** */

    public boolean isEmpty() {
        return mapSize == 0;
    }

    public int size() {
        return mapSize;
    }

/* *** ODSATag: LoadFactor *** */
    public double loadFactor() {
        return (double) mapSize / internalTable.length;
    }
/* *** ODSAendTag: LoadFactor *** */

    public Iterator<K> iterator() {
        return new HashMapIterator();
    }

    private class HashMapIterator implements Iterator<K> {
        private int bucketIndex;
        private Iterator<K> bucketIterator;
        HashMapIterator() {
            bucketIndex = 0;
            bucketIterator = lookupBin(bucketIndex).iterator();
        }
        public boolean hasNext() {
            while (!bucketIterator.hasNext()) {
                bucketIndex++;
                if (bucketIndex >= internalTable.length) return false;
                bucketIterator = lookupBin(bucketIndex).iterator();
            }
            return true;
        }
        public K next() {
            hasNext();
            return bucketIterator.next();
        }
    }
}
```


