
## Case study: Implementing sets using lists {#implementing-sets-using-lists}

<!-- ### Implementing sets -->

Both sets and maps can be implemented using lists.
For a set, we can use a simple list of elements.

#### Using a linked list

Recall from @sec:stacks-implemented-as-linked-lists that a linked list consists of nodes pointing to their successors:

    datatype SetNode of T:
        elem: T             // Value for this node
        next: SetNode of T  // Pointer to next node in list

Just as for linked stacks, our set datatype will consist of a pointer to the head of the list, and its size.
We also have to give the operations for `contains`, `add` and `remove`.

    datatype LinkedSet implements Set:
        head: Node = null   // Pointer to head of list
        size: Int = 0       // Size of list

Searching in a linked list is a simple while loop where we start at the head and continue down the list.
If we reach the end of the list we return `false`, because the element wasn't found:

    datatype LinkedSet:
        ...
        contains(elem):
            node = head
            while node is not null:
                if elem == node.elem:
                    return true   // We found the element, so return true
                node = node.next  // Move to the next list node
            return false          // We reached the end of the list

To add an element we first have to check if it is already there -- sets are not allowed to contain the same element twice.
If it is not in the list we can just attach a new list node before the head of the list (and increase the size):

    datatype LinkedSet:
        ...
        add(elem):
            if not contains(elem):
                newHead = new Node(elem, head)  // Create a new node pointing to the current head
                head = newHead   // Redirect the head to the new node
                size = size + 1

Removing an element is slightly trickier.
If we want to remove a certain node from the list, we have to redirect the `next` pointer from the *previous* node.
So we have to search for the node *before* the node we want to remove.
We can do that by keeping a `prev` pointer while iterating through the list.

    class LinkedSet:
        ...
        remove(elem):
            prev = null
            node = head
            while node is not null:
                if elem == node.elem:  // We found the node to remove
                    if prev is null:
                        head = node.next
                    else:
                        prev.next = node.next
                    node.next = null  // For garbage collection
                    size = size - 1
                    return
                prev = node
                node = node.next

Note that we have a special case:
if `prev` is null it is the head itself that we want to remove, because there is not previous node yet.

#### Linear complexity

It is clear that all the operations are linear in the size of the list, $O(n)$, because in the worst case we have to look at all nodes.
In later chapters we will see how to improve the efficiency, by using

-   [Balanced search trees](#balanced-tree){.term} (@sec:self-balancing-trees), which bring down
    the complexity of the operations to $O(\log n)$.
-   [Hash tables](#hash-table){.term} ([Chapter @sec:hash-tables]), which make
    the operations constant time, $O(1)$.

But some times it is enough to use a simple linked list-based implementation.
And in fact, the [separate chaining]{.term} hash table (@sec:separate-chaining)
requires an underlying simpler implementation -- and there a linked list works very fine!

#### Using a sorted array

There is a way to speed up *one* of the operations, by using a sorted array instead of a linked list.
If we have a sorted array of elements, the `contains` method can use
[binary search]{.term} (@sec:binary-search), which takes logarithmic time
(@sec:analysing-binary-search).
Hence looking up items will be really efficient.

Unfortunately, modifying the data structure is still slow.
If we want to `add` an item to a sorted array, we have to keep the array sorted -- and that means we need to *insert* the new item at the right place in the array, using the insertion algorithm from Insertion Sort (@sec:insertion-sort).
This takes linear time in the worst case.
Similarly, to `remove` an item without creating a hole in the array, we need to shift a bunch of elements in the array, and this also takes linear time.

However, a sorted array is a suitable way to implement a set or a map that *never
changes*, that is where we never need to add or remove items after the
array is created. We start by sorting the array, using either Quicksort
or Mergesort, and then we can use binary search to find items in it.
Sorted arrays also support the *sorted set* and *sorted map* operations
such as *range queries* (see @sec:sorted-sets-and-maps), because these can also be implemented using binary search.

Sorted arrays can also be useful in cases where we always add *many*
items in one go. Given a sorted array $A$, and an unsorted list of items
$B$, we can add the items in $B$ to $A$ as follows. First we sort $B$,
then we merge $A$ and $B$, using the merge algorithm from Mergesort.
Note that the merge step takes linear time, and sorting $B$ takes a bit
more than linear time, so this is a lot faster than adding all the items
from $B$ one by one (which would take quadratic time).

### Implementing maps

If we want to implement a map instead of a set, we have two choices:

-   We can have a list or array of *key-value* pairs.
-   Alternatively, we can use two lists or arrays, one for holding the keys and another for holding the values.
    The two lists must be "kept in sync" so that a key with its value occurs at the same position.

Note that these maps are exactly as slow as the corresponding sets (linked lists and sorted arrays), so they are not useful for working with large collections -- for this we refer to [Chapters @sec:search-trees] and [-@sec:hash-tables].

#### Using a linked list

If we want to implement the map using a linked list, the easiest is probably to have list nodes that contain both the keays and the values:

    datatype MapNode of K to V:
        key: K          // Key for this node
        value: V        // Value for this node
        next: MapNode   // Pointer to next node in list

The map operations `get`, `put` and `remove` are minor modifications to the set operations that we defined earlier.
We leave them as an exercise to the reader to implement.

#### Using a sorted array

If we want to use a sorted array, one possibility is to use two arrays -- one for the keys and another for the values.

    datatype SortedArrayMap of K to V:
        keys: Array of K
        values: Array of V
        size: Int

The implementations of the set methods are left as exercises to the reader, but there are some important things to remember:

- The `keys` and `values` must be kept in sync, so that `keys[i]` is always the key for the value in `values[i]`
- This means that we have to remember to modify both arrays in the same way -- if we delete the $i$th element we have to delete both `keys[i]` and `values[i]` (and shift the arrays in the same way)


