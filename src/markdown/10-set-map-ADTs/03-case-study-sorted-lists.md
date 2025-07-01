
## Case study: Implementing sets and maps using sorted lists

### Implementing sets

We can implement either of these ADTs using an array. For a set, we can
use an array of elements.
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

:::TODO
Tie this to invariants.
:::

A sorted array is a suitable way to implement a set or a map that *never
changes*, that is where we never need to add or remove items after the
array is created. We start by sorting the array, using either quicksort
or mergesort, and then we can use binary search to find items in it.
Sorted arrays also support the *sorted set* and *sorted map* operations
such as *range queries* -- these can also be implemented using binary search.

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


### Complexity analysis


### Implementing maps

We can implement either of these ADTs using an array. For a set, we can
use an array of elements. For a map, we have two choices:

-   In languages which support *tuples* as a data type (such as Python),
    we can have an array of *key-value* pairs.
-   Alternatively, we can use two arrays. One array, `keys`, holds the
    keys and the other array, `values`, holds the corresponding values.
    The two arrays must be "kept in sync" so that `values[i]` holds
    the value associated with key `keys[i]`.


It is not difficult to implement a **Map** using a list. The problem is
that all the operations -- searching for a key, updating the value for
a key, and removing a key -- will be linear in the number of entries,
$O(n)$.

In later chapters we will see how to improve the efficiency, by using

-   [Balanced search trees](#balanced-tree){.term} (@sec:self-balancing-trees), which bring down
    the complexity of the operations to $O(\log n)$.
-   [Hash tables](#hash-table){.term} ([chapter @sec:hash-tables]), which make
    the operations constant time, $O(1)$.

But some times it is enough to use a simple list-based implementation.
And in fact, the
[separate chaining]{.term} hash map (@sec:separate-chaining)
requires an underlying simpler map implementation -- and there a linked
list works very fine!

#### Using a list of key-value pairs

A very simple way of implementing a **Map** using a list, is to use
[key-value pairs](#key-value-pair){.term}.

    datatype KVPair of K and V:
        key: K
        value: V


Now we can create a **Map** class that uses an underlying **List** of
**KVPair**. So the only thing we need is really an internal variable
referring to the underlying list.

    datatype LinkedMap implements Map:
        internalList: LinkedList of KVPair = new LinkedList()

Finding the value for a certain key is easy. We just iterate through all
entries and stop whenever we find a matching key.

    datatype LinkedMap implements Map:
        ...
        get(key):
            for each entry in internalList:
                if key == entry.key:
                    return entry.value
            return null

Setting a value for a given key means to search the list for a matching
key, and then updating the value. If we cannot find the key, we add a
new **KVPair** to the list.

    datatype LinkedMap implements Map:
        ...
        put(key, value):
            for each entry in internalList:
                if key == entry.key:
                    entry.value = value
                    return
            // The key isn't present, so we add a new key-value pair to the list.
            // Because it's a linked list we add the pair to the front of the list.
            internalList.add(0, new KVPair(key, value))

In this example we're using a linked list, but we could equally well
have used a dynamic array list. The only thing we have to think about is
to add new pairs at the right location (beginning or end of the list)
-- because linked lists prefer adding at the front, while array lists
rather add to the back of the list.

Other methods can be deferred to the underlying list.

    class LinkedMap implements Map:
        ...
        size():
            return internalList.size

(Note that since the number of entries can vary, we need `size` to be a method and not a property.)


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
            for each entry in internalList:
                if key == entry.key:
                    internalList.remove(i)
                    return entry.value
                i = i + 1
            return null

If we allow ourselves to peek into the inner workings of the linked list, we can make a more efficient version.
Note that to be able to remove a list node, we need a pointer to the *previous* node.
This makes it possible for us to repoint the `next` pointer from the previous node to its new next node.
Therefore we keep two variables, `prev` that points to the previous node, and `current` that points to the current.

    class LinkedMap implements Map:
        ...
        remove(key):
            prev = null
            current = internalList.head
            while current is not null:
                if key == current.key:
                    if prev is null:
                        // Special case: if prev is null,
                        // it's the list head that needs to be repointed.
                        internalList.head = current.next
                    else:
                        prev.next = current.next
                    current.next = null  // For garbage collection
                    internalList.size = internalList.size - 1
                    return current.value
                prev = current
                current = current.next
            return null

It is not good programming practice that one datatype (or class, or module) looks into the implementation details of another one.
Therefore, a real library for linked lists should have more public methods to be able to implement an efficient version without having to look into its implementation.

For example, the **Iterator** interface in Java provides a "remove-the-current-node" method, so it is possible to implement optimise map removal just like above.

#### Using linked key-value nodes

An alternative to using an underlying list of key-value pairs is to modify the implementation of linked lists just slightly.
This gives us more control of the implementation, with the tradeoff that we have to reimplement some things.

Instead of using linked list nodes with just one value, we used key-value nodes.

    datatype KVNode of K and V:
        key: K        // Key for this node
        value: V      // Value for this node
        next: KVNode  // Pointer to next node in list

The actual implementation of the datatype LinkedMap now becomes an exercise for the reader.

