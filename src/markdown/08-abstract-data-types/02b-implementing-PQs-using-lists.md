
### Implementing priority queues using sorted lists

How can we implement priority queues?
The most natural suggestion is to use a linked list or a dynamic array, just as for stacks or queues --
but making sure that it is always kept *sorted*.
The operations for adding and removing an element become quite easy to describe:

- *add*: insert an element into the list, in its correct position.
- *removeMin*: remove the smallest element.

Since the list is sorted, removing the smallest element is straightforward.
Adding a new element is a little more tricky:
we have to traverse the list until we find the correct position, and then insert the new element there.
This is similar to how Insertion sort put one element in place (see @sec:sorting-1:insertion-sort).

If we decide to use a dynamic array, then it's best to have it *reversely sorted*,
so that the smallest element is at the back of the array.
The reason for this is that it is easier to remove elements from the back than from the front.
This is similar to how we implement a stack as a dynamic array in reverse order.

If we instead use a linked list, it should be sorted in normal order
so that the smallest element is at the front of the list.
When we add an alement to this linked list, we have to traverse the list from
the head until we find the right location, and then we can squeeze in the new element.
But to be able to insert the new element we also have to remember the previous node while traversing:

    add(pq, value):
        previous = null
        current = pq.head
        while current is not null and current.value < value:
            previous = current
            current = current.next
        node = new Node(value, current)  // The new node points to current
        if previous is not null:
            previous.next = node         // Point previous to the new node...
        else:
            pq.head = node               // ...or point head if the new node is the smallest

