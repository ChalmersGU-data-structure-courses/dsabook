
## Example: Implementing Maps using Lists

It is not difficult to implement a **Map** using a list. The problem is
that all the operations -- searching for a key, updating the value for
a key, and removing a key -- will be linear in the number of entries,
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

    class KVPair:
        KVPair(key, value):
            this.key = key
            this.value = value


Now we can create a **Map** class that uses an underlying **List** of
**KVPair**. So the only thing we need is really an internal variable
referring to the underlying list.

    class LinkedMap implements Map:
        LinkedMap():
            // This could also be a DynamicArrayList:
            this.internalList = new LinkedList()

Finding the value for a certain key is easy. We just iterate through all
entries and stop whenever we find a matching key.

    class LinkedMap implements Map:
        ...
        get(key):
            for each entry in this.internalList:
                if key == entry.key:
                    return entry.value
            return null

Setting a value for a given key means to search the list for a matching
key, and then updating the value. If we cannot find the key, we add a
new **KVPair** to the list.

    class LinkedMap implements Map:
        ...
        put(key, value):
            for each entry in this.internalList:
                if key == entry.key:
                    entry.value = value
                    return
            // If we're using a DynamicArrayList we should add at the end of the list instead:
            this.internalList.add(0, new KVPair(key, value))


In this example we're using a linked list, but we could equally well
have used a dynamic array list. The only thing we have to think about is
to add new pairs at the right location (beginning or end of the list)
-- because linked lists prefer adding at the front, while array lists
rather add to the back of the list.

Other methods can be deferred to the underlying list.

    class LinkedMap implements Map:
        ...
        isEmpty():
            return this.internalList.isEmpty()

        size():
            return this.internalList.size()


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

    class LinkedMap implements Map:
        ...
        // This method is sub-optimal, because it makes two passes:
        // First a search to find the index, and then a loop delete that index.
        remove(key):
            i = 0
            for each entry in this.internalList:
                if key == entry.key:
                    this.internalList.remove(i)
                    return entry.value
                i = i + 1
            return null


If the **Iterator** interface would include a method for removing the
"current" element from a list, it would be possible to improve the
method. Our simple API doesn't have that possibility, so we have to
stick with the slightly slower version. However, in the Java API,
iterators have a "remove-the-current" method, so it is possible
to optimise removal a little bit. Implementing the `remove` method using
the `delete` method of Java Iterators is left as an exercise to the reader.

### Using linked key-value nodes

An alternative to using an underlying list of key-value pairs, which is
also very easy to implement, is to modify the implementation of linked
lists just slightly. The advantage of this solution is that deletion
becomes more efficient.

Instead of using nodes with just one value, we used key-value nodes.

    class KVNode:
        KVNode(key, value, next):
            this.key = key       // Key for this node
            this.value = value   // Value for this node
            this.next = next     // Pointer to next node in list

Then the internal structure is very much like our previous
[linked lists implementation](#linked-lists).
The private variables are the same (except we use a
**KVNode** instead of a **Node**).

    class LinkedMap(Map):
        LinkedMap():
            this.head = null    // Pointer to list header
            this.listSize = 0   // Size of list

Searching for a key simply means to iterating through the key-value node
until we find a matching key.

    class LinkedMap(Map):
        ...
        get(key):
            current = this.head
            while current is not null:
                if key == current.key:
                    return current.value
                current = current.next
            return null

Setting a value for a key is similar: If the key is in the list, we
upate the associated value. If the key is not in the list, we add a new
**KVNode** and increase the list size.

Finally, to remove a key-value node, we use the same trick as we did for
linked lists: We iterate through the *previous* node instead of the current
one. This is to be able to reassign the pointers from the previous node
to the following node.

So, we use two nodes -- the one to be removed, and the previous one.
The loop searches through the nodes until the one to be removed is
found, and then reassigns the pointer for the previous node to the
following one.

    class LinkedMap(Map):
        ...
        remove(key):
            prev = null
            current = this.head
            while current is not null:
                if key == current.key:
                    if prev is null:
                        this.head = current.next
                    else:
                        prev.next = current.next
                    current.next = null  // For garbage collection
                    this.listSize = this.listSize - 1
                    return current.value
                prev = current
                current = current.next
            return null

