
## Arrays as Sets or Maps

In Chapter [Introduction] we learnt about
*sets* and *maps*, two of the most important ADTs.

```python
class Set(Collection):
    def add(self, x):      """Adds x to the set. Returns true if the element wasn't already in the set."""
    def remove(self, x):   """Removes x from the set. Returns true if the element was in the set."""
    def contains(self, x): """Returns true if x is in the set."""
    # Note: __iter__() can yield the elements in any order.
```

```java
// Note: This is a subset of java.util.Set
interface Set<E> extends Collection<E> {
    boolean add(E x);       // Adds x to the set. Returns true if the element wasn't already in the set.
    boolean remove(E x);    // Removes x from the set. Returns true if the element was in the set.
    boolean contains(E x);  // Returns true if x is in the set.
    // Note: iterator() can yield the elements in any order.
}
```



```python
class Map(Iterable):
    def put(self, key, value):  """Sets the value of the given key. Returns the previous value, or None."""
    def get(self, key):         """Returns the value associated with the given key, or None if the key is not there."""
    def remove(self, key):      """Removes and returns the value associated with the given key, or None if there is no key."""
    def containsKey(self, key): """Returns true if the key has an associated value."""
    def isEmpty(self):          """Returns true if there are no keys."""
    def size(self):             """Returns the number of keys (i.e., the number of key/value pairs)."""
    # Note: __iter__() can yield the keys in any order.
```

```java
// Note: This is a subset of java.util.Map, where
// `iterator` iterates over the keys, and replaces the more complicated `keySet`.
interface Map<K, V> extends Iterable<K> {
    V put(K key, V value);       // Sets the value of the given key. Returns the previous value, or null.
    V get(K key);                // Returns the value associated with the given key, or null if the key is not there.
    V remove(K key);             // Removes and returns the value associated with the given key, or null if there is no key.
    boolean containsKey(K key);  // Returns true if the key has an associated value.
    boolean isEmpty();           // Returns true if there are no keys.
    int size();                  // Returns the number of keys (i.e., the number of key/value pairs).
    // Note: iterator() can yield the keys in any order.
}
```



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

```python
class SortedSet(Set):
    def first(self):            """Returns the first (smallest) element. Raises an exception if the set is empty."""
    def last(self):             """Returns the last (largest) element. Raises an exception if the set is empty."""
    def floor(self, x):         """Returns the closest element <= x, or None if there is no such element."""
    def ceiling(self, x):       """Returns the closest element >= x, or None if there is no such element."""
    def lower(self, x):         """Returns the closest element < x, or None if there is no such element."""
    def higher(self, x):        """Returns the closest element > x, or None if there is no such element."""
    def between(self, x1, x2):  """Returns all elements x such that x1 <= x <= x2."""
    # Note: __iter__() should yield the elements in order.
```

```java
// Note: This is a subset of java.util.SortedSet, where
// `floor` and `ceiling` are borrowed from java.util.NavigableSet.
interface SortedSet<E> extends Set<E> {
    E first();                        // Returns the first (smallest) element. Raises an exception if the set is empty.
    E last();                         // Returns the last (largest) element. Raises an exception if the set is empty.
    E floor(E x);                     // Returns the closest element <= x, or null if there is no such element.
    E ceiling(E x);                   // Returns the closest element >= x, or null if there is no such element.
    E lower(E x);                     // Returns the closest element < x, or null if there is no such element.
    E higher(E x);                    // Returns the closest element > x, or null if there is no such element.
    Iterator<E> between(E x1, E x2);  // Returns all elements x such that x1 <= x <= x2.
    // Note: iterator() should yield the elements in order.
}
```



```python
class SortedMap(Map):
    def firstKey(self):                """Returns the first (smallest) key. Raises an exception if the map is empty."""
    def lastKey(self):                 """Returns the last (largest) key. Raises an exception if the map is empty."""
    def floorKey(self, key):           """Returns the closest key <= k, or None if there is no key."""
    def ceilingKey(self, key):         """Returns the closest key >= k, or None if there is no key."""
    def lowerKey(self, key):           """Returns the closest key < k, or None if there is no such element."""
    def higherKey(self, key):          """Returns the closest key > k, or None if there is no such element."""
    def keysBetween(self, key1, key2): """Returns all keys k such that k1 <= k <= k2."""
    # Note: __iter__() should yield the keys in order.
```

```java
// Note: This is a subset of java.util.SortedMap, where
// `floorKey` and `ceilingKey` are borrowed from java.util.NavigableMap.
interface SortedMap<K, V> extends Map<K, V> {
    K firstKey();                         // Returns the first (smallest) key. Raises an exception if the map is empty.
    K lastKey();                          // Returns the last (largest) key. Raises an exception if the map is empty.
    K floorKey(K key);                    // Returns the closest key <= k, or null if there is no key.
    K ceilingKey(K key);                  // Returns the closest key >= k, or null if there is no key.
    K lowerKey(K k);                      // Returns the closest key < k, or null if there is no such element.
    K higherKey(K k);                     // Returns the closest key > k, or null if there is no such element.
    Iterator<K> keysBetween(K k1, K k2);  // Returns all keys such that k1 <= k <= k2.
    // Note: iterator() should yield the keys in order.
}
```



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
