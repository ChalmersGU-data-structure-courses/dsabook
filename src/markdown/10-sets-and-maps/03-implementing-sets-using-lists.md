
## Case study: Implementing using linked lists {#implementing-using-linked-lists}

Both sets and maps can be implemented using simple linked lists.

### Implementing sets

For a set, we can use a simple list of elements.

Recall from @sec:stacks-implemented-as-linked-lists that a linked list consists of nodes pointing to their successors:

```jsav-figure
var av = NewAV();
var l = av.ds.list({nodegap: 30});
l.addFirst("").addFirst("").addFirst("");
l.layout();
av.displayInit();
av.recorded();
```

Now we have to implement the methods *contains*, *add*, and *remove*, and this is straightforward:

-   Searching in a linked list is a simple while loop where we start at the head and continue down the list.
    If we reach the end of the list we return `false`, because the element wasn't found:

        contains(elem):
            node = head
            while node is not null:   // Iterate through each node in the list
                if elem == node.elem:
                    return true       // We found the element, so return true
                node = node.next      // Move to the next list node
            return false              // We did not find the element, return false

-   To add an element we first have to check if it is already there -- sets are not allowed to contain the same element twice.
    If it is not in the list we can just attach a new list node before the head of the list (and increase the size):

        add(elem):
            if not contains(elem):
                newHead = new Node(elem, head)  // Create a new node pointing to the current head
                head = newHead                  // Redirect the head to the new node
                size = size + 1                 // Increase the size of the set

-   Removing an element is slightly trickier.
    If we want to remove a certain node from the list, we have to redirect the `next` pointer from the *previous* node.
    So we have to search for the node *before* the node we want to remove.
    We can do that by keeping a `prev` pointer while iterating through the list.

        remove(elem):
            prev = null
            node = head
            while node is not null:      // Iterate through each node in the list
                if elem == node.elem:    // We found the node to remove
                    if prev is null:
                        head = node.next
                    else:
                        prev.next = node.next
                    size = size - 1      // Increase the size of the set
                    return
                prev = node
                node = node.next

    Note that we have a special case:
    if `prev` is null it is the head itself that we want to remove, because there is not previous node yet.

#### Complexity analyses

It is clear that all the operations are linear in the size of the list, $O(n)$, because in the worst case we have to look at all nodes.
In later chapters we will see how to improve the efficiency, by using

-   [Balanced search trees](#balanced-tree){.term} (@sec:self-balancing-trees), which bring down
    the complexity of the operations to $O(\log(n))$.
-   [Hash tables](#hash-table){.term} ([Chapter @sec:hash-tables]), which make
    the operations constant time, $O(1)$.

But some times it is enough to use a simple linked list-based implementation.
And in fact, the [separate chaining]{.term} hash table (@sec:separate-chaining)
requires an underlying simpler implementation -- and there a linked list works very fine!

### Implementing maps

If we want to implement a *map* instead of a set,
we can use list nodes that contain both the *key* and the *value*:

    datatype MapNode of K to V:
        key: K          // Key for this node
        value: V        // Value for this node
        next: MapNode   // Pointer to next node in list

The map operations `get`, `put` and `remove` are minor modifications to the corresponding set operations that we defined above.
We leave them as an exercise to the reader to implement.

Note that these maps are exactly as slow as the corresponding sets, so they are not useful for working with large collections
-- for this we refer to [Chapters @sec:search-trees] and [-@sec:hash-tables].

