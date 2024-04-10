
## Implementing Maps using Lists

It is not difficult to implement a **Map** using a list. The problem is
that all the operations -- searching for a key, updating the value for
a key, and removing a key --will be linear in the number of entries,
$O(n)$.

In later chapters we will see how to improve the efficiency, by using

-   [Balanced search trees](#balanced-trees), which bring down 
    the complexity of the operations to $O(\log n)$.
-   [Hash tables](#hashing), which make
    the operations constant time, $O(1)$.

But some times it is enough to use a simple list-based implementation.
And in fact, the
[separate chaining hash map](#separate-chaining)
requires an underlying simpler map implementation -- and there a linked
list works very fine!

### Using a list of key-value pairs

A very simple way of implementing a **Map** using a list, is to use
[key-value pairs](#key-value-pair){.term}.

```python
class KVPair:
    def __init__(self, key, value):
        self.key = key
        self.value = value
```

```java
class KVPair<K, V> {
    K key;
    V value;
    KVPair(K key, V value) {
        this.key = key;
        this.value = value;
    }
}
```



Now we can create a **Map** class that uses an underlying **List** of
**KVPair**. So the only thing we need is really an internal variable
referring to the underlying list.

```python
class LinkedMap(Map):
    def __init__(self):
        # This could also be a DynamicArrayList.
        self._internalList = LinkedList()
```

```java
class ListMap<K, V> implements Map<K, V> {
    private List<KVPair<K,V>> internalList;

    ListMap() {
        // This could also be a DynamicArrayList.
        internalList = new LinkedList<>();
    }
```



Finding the value for a certain key is easy. We just iterate through all
entries and stop whenever we find a matching key.

```python
    def get(self, key):
        for entry in self._internalList:
            if key == entry.key:
                return entry.value
        return None
```

```java
    public V get(K key) {
        for (KVPair<K,V> entry : internalList)
            if (key.equals(entry.key))
                return entry.value;
        return null;
    }
```



Setting a value for a given key means to search the list for a matching
key, and then updating the value. If we cannot find the key, we add a
new **KVPair** to the list.

```python
    def put(self, key, value):
        for entry in self._internalList:
            if key == entry.key:
                oldValue = entry.value
                entry.value = value
                return oldValue
        # If we're using a DynamicArrayList we should add at the end of the list instead.
        self._internalList.add(0, KVPair(key, value))
        return None
```

```java
    public V put(K key, V value) {
        for (KVPair<K,V> entry : internalList) {
            if (key.equals(entry.key)) {
                V oldValue = entry.value;
                entry.value = value;
                return oldValue;
            }
        }
        // If we're using a DynamicArrayList we should add at the end of the list instead.
        internalList.add(0, new KVPair<>(key, value));
        return null;
    }
```



In this example we're using a linked list, but we could equally well
have used a dynamic array list. The only thing we have to think about is
to add new pairs at the right location (beginning or end of the list)
-- because linked lists prefer adding at the front, while array lists
rather add to the back of the list.

Other methods can be deferred to the underlying list.

```python
    def isEmpty(self):
        return self._internalList.isEmpty()

    def size(self):
        return self._internalList.size()
```

```java
    public boolean isEmpty() {
        return internalList.isEmpty();
    }

    public int size() {
        return internalList.size();
    }
```



#### How to remove keys from the map

There is one problem with this simple map implementation -- how to
remove keys from it. One possibility would be to first search for the
index where the key is located, and then remove that index from the
list.

But this would be slightly inefficient, because removing an element from
a certain position takes $O(n)$ time in the worst case. So, first we
find the position (which takes $O(n)$ time), and then we remove it
(which takes another $O(n)$ time). This is double the work than it
should be, which is unnecessary.

```python
    # This method is sub-optimal, because it makes two passes:
    # First a search to find the index, and then a loop delete that index.
    def remove(self, key):
        for i, entry in enumerate(self._internalList):
            if key == entry.key:
                removed = entry.value
                self._internalList.remove(i)
                return removed
        return None
```

```java
    // This method is sub-optimal, because it makes two passes:
    // First a search to find the index, and then a loop delete that index.
    public V remove(K key) {
        int i = 0;
        for (KVPair<K,V> entry : internalList) {
            if (key.equals(entry.key)) {
                V removed = entry.value;
                internalList.remove(i);
                return removed;
            }
            i++;
        }
        return null;
    }
```



If the **Iterator** interface would include a method for removing the
"current" element from a list, it would be possible to improve the
method. Our simple API doesn't have that possibility, so we have to
stick with the slightly slower version. However, in the "real" Java
API, iterators have a "remove-the-current" method, so it is possible
to optimise removal a little bit. Implementing the `remove` method using
teh `delete` method of Java Iterators is left as an exercise to the
reader.

### Using linked key-value nodes

An alternative to using an underlying list of key-value pairs, which is
also very easy to implement, is to modify the implementation of linked
lists just slightly. The advantage of this solution is that deletion
becomes more efficient.

Instead of using nodes with just one value, we used key-value nodes.

```python
# Python does not have internal classes, so we have to make the list node standalone.
class KVNode:
    def __init__(self, key, value, next):
        self.key = key       # Key for this node
        self.value = value   # Value for this node
        self.next = next     # Pointer to next node in list
```

```java
    private class KVNode {
        K key;
        V value;
        KVNode next;
        KVNode(K key, V value, KVNode next) {
            this.key = key;
            this.value = value;
            this.next = next;
        }
    }
```



Then the internal structure is very much like our previous
[linked lists implementation](#linked-lists). 
The private variables are the same (except we use a
**KVNode** instead of a **Node**).

```python
class LinkedMap(Map):
    def __init__(self):
        self._head = None    # Pointer to list header
        self._listSize = 0   # Size of list
```

```java
class LinkedMap<K, V> implements Map<K, V> {
    private KVNode head;    // Pointer to list header
    private int listSize;   // Size of list

    LinkedMap() {
        head = null;
        listSize = 0;
    }
```



Searching for a key simply means to iterating through the key-value node
until we find a matching key.

```python
    def get(self, key):
        current = self._head
        while current is not None:
            if key == current.key:
                return current.value
            current = current.next
        return None
```

```java
    public V get(K key) {
        KVNode current = head;
        while (current != null) {
            if (key.equals(current.key))
                return current.value;
            current = current.next;
        }
        return null;
    }
```



Setting a value for a key is similar: If the key is in the list, we
upate the associated value. If the key is not in the list, we add a new
**KVNode** and increase the list size.

#### Removing keys

To remove a key-value node, we use the same trick as we did for linked
lists: We iterate through the *previous* node instead of the current
one. This is to be able to reassign the pointers from the previous node
to the following node.

So, we use two nodes -- the one to be removed, and the previous one.
The loop searches through the nodes until the one to be removed is
found, and then reassigns the pointer for the previous node to the
following one.

```python
    def remove(self, key):
        prev = None
        removed = self._head
        while removed is not None:
            if key == removed.key:
                if prev is None:
                    self._head = removed.next
                else:
                    prev.next = removed.next
                removed.next = None   # For garbage collection
                self._listSize -= 1
                return removed.value
            prev = removed
            removed = removed.next
        return None
```

```java
    public V remove(K key) {
        KVNode prev = null;
        KVNode removed = head;
        while (removed != null) {
            if (key.equals(removed.key)) {
                if (prev == null)
                    head = removed.next;
                else
                    prev.next = removed.next;
                removed.next = null;   // For garbage collection
                listSize--;
                return removed.value;
            }
            prev = removed;
            removed = removed.next;
        }
        return null;
    }
```



### Linked Maps: Full code

Finally, here is the full source code for the class **LinkedMap**.

```python
#/* *** ODSATag: Header *** */
class LinkedMap(Map):
    def __init__(self):
        self._head = None    # Pointer to list header
        self._listSize = 0   # Size of list
#/* *** ODSAendTag: Header *** */

#/* *** ODSATag: Put *** */
    def put(self, key, value):
        current = self._head
        while current is not None:
            if key == current.key:
                oldValue = current.value
                current.value = value
                return oldValue
            current = current.next
        self._head = KVNode(key, value, self._head)
        self._listSize += 1
        return None
#/* *** ODSAendTag: Put *** */

#/* *** ODSATag: Get *** */
    def get(self, key):
        current = self._head
        while current is not None:
            if key == current.key:
                return current.value
            current = current.next
        return None
#/* *** ODSAendTag: Get *** */

#/* *** ODSATag: Remove *** */
    def remove(self, key):
        prev = None
        removed = self._head
        while removed is not None:
            if key == removed.key:
                if prev is None:
                    self._head = removed.next
                else:
                    prev.next = removed.next
                removed.next = None   # For garbage collection
                self._listSize -= 1
                return removed.value
            prev = removed
            removed = removed.next
        return None
#/* *** ODSAendTag: Remove *** */

#/* *** ODSATag: ContainsKey *** */
    def containsKey(self, key):
        return self.get(key) is not None
#/* *** ODSAendTag: ContainsKey *** */

#/* *** ODSATag: EmptySize *** */
    def isEmpty(self):
        return self._listSize == 0

    def size(self):
        return self._listSize
#/* *** ODSAendTag: EmptySize *** */

#/* *** ODSATag: Iterator *** */
    def __iter__(self):
        current = self._head
        while current is not None:
            yield current.key
            current = current.next
#/* *** ODSAendTag: Iterator *** */


#/* *** ODSATag: KVNode *** */
# Python does not have internal classes, so we have to make the list node standalone.
class KVNode:
    def __init__(self, key, value, next):
        self.key = key       # Key for this node
        self.value = value   # Value for this node
        self.next = next     # Pointer to next node in list
#/* *** ODSAendTag: KVNode *** */
```

```java
/* *** ODSATag: Header *** */
class LinkedMap<K, V> implements Map<K, V> {
    private KVNode head;    // Pointer to list header
    private int listSize;   // Size of list

    LinkedMap() {
        head = null;
        listSize = 0;
    }
/* *** ODSAendTag: Header *** */

/* *** ODSATag: KVNode *** */
    private class KVNode {
        K key;
        V value;
        KVNode next;
        KVNode(K key, V value, KVNode next) {
            this.key = key;
            this.value = value;
            this.next = next;
        }
    }
/* *** ODSAendTag: KVNode *** */

/* *** ODSATag: Put *** */
    public V put(K key, V value) {
        KVNode current = head;
        while (current != null) {
            if (key.equals(current.key)) {
                V oldValue = current.value;
                current.value = value;
                return oldValue;
            }
            current = current.next;
        }
        head = new KVNode(key, value, head);
        listSize++;
        return null;
    }
/* *** ODSAendTag: Put *** */

/* *** ODSATag: Get *** */
    public V get(K key) {
        KVNode current = head;
        while (current != null) {
            if (key.equals(current.key))
                return current.value;
            current = current.next;
        }
        return null;
    }
/* *** ODSAendTag: Get *** */

/* *** ODSATag: Remove *** */
    public V remove(K key) {
        KVNode prev = null;
        KVNode removed = head;
        while (removed != null) {
            if (key.equals(removed.key)) {
                if (prev == null)
                    head = removed.next;
                else
                    prev.next = removed.next;
                removed.next = null;   // For garbage collection
                listSize--;
                return removed.value;
            }
            prev = removed;
            removed = removed.next;
        }
        return null;
    }
/* *** ODSAendTag: Remove *** */

/* *** ODSATag: ContainsKey *** */
    public boolean containsKey(K key) {
        return get(key) != null;
    }
/* *** ODSAendTag: ContainsKey *** */

/* *** ODSATag: EmptySize *** */
    public boolean isEmpty() {
        return listSize == 0;
    }

    public int size() {
        return listSize;
    }
/* *** ODSAendTag: EmptySize *** */

/* *** ODSATag: Iterator *** */
    public Iterator<K> iterator() {
        return new LinkedMapIterator();
    }

    private class LinkedMapIterator implements Iterator<K> {
        private KVNode current;
        LinkedMapIterator() {
            current = head;
        }
        public boolean hasNext() {
            return current != null;
        }
        public K next() {
            K k = current.key;
            current = current.next;
            return k;
        }
    }
/* *** ODSAendTag: Iterator *** */
}
```


