
## Collections and sequences {#ADTs:sequences}

A _collection_ is a general term for a data structure that can contain multiple elements.
In this chapter you will encounter stacks and queues, and more general lists,
and in later chapters will we introduce sets and maps.
The only thing we will require from a collection is that it supports two basic operations:

- it must know its own *size*, that is, the number of elements in the collection, and
- it is possible to *iterate* over the elements.

For convenience we often iterate the elements using a `for`-loop, like this:

    for each x in C:
        // do something with the element x

When we describe the different ADTs (stacks, queues, lists, etc.), we can do this as pseudocode.
Then we will call the ADT an *interface*, and this interface will *extend* the basic *Collection* interface.

    interface Collection:
        isEmpty(collection) -> Bool   // Tells if the collection contains no elements.
        size(collection) -> Int       // Returns the number of elements in the collection.
        (iteration)                   // We can use a for-loop over the elements.

Note that the `isEmpty` operation is redundant because it can always be replaced by `size()==0`,
but it is a handy shortcut so we keep it here.

### Stacks and queues as abstract data types {#ADTs:stacks-and-queues}

In @sec:sequences:stacks-and-queues we discussed how stacks and queues work,
and that they only have two core operations -- adding and removing elememnts.
As an ADT interface we can specify them like this:

    interface Stack of T extends Collection:
        push(stack, x: T)     // Pushes x on top of the stack.
        pop(stack) -> T       // Pops the top of the stack and returns it.
        peek(stack) -> T      // Returns the top element, without removing it.

    interface Queue of T extends Collection:
        enqueue(queue, x: T)  // Enqueues x at the end of the queue.
        dequeue(queue) -> T   // Dequeues the frontmost element.
        peek(queue) -> T      // Returns the frontmost element, without removing it.

Note that we also specified the *auxiliary* operation `peek` in this interface,
even though it is not part of the absolute minimum.
Also note that the interfaces inherit the `size` and `isEmpty` operations from `Collection`.

### Double-ended queues and general lists

Double-ended queues and general lists were briefly mentioned in @sec:sequences:more-sequences.
A double-ended queue, or a *deque*, is a combination of a stack and a queue,
meaning that we can add and remove from both ends of the list.
This could be written as a combined ADT interface (at least if we had different names for the `peek` operations):

    interface Deque extends Stack and Queue

Or we could specify it clearer, and use more self-explaining names:

    interface Deque of T extends Collection:
        addFirst(deque, x)       // Adds x at the front of the deque.
        addLast(deque, x)        // Adds x at the end of the deque.
        removeFirst(deque) -> T  // Removes the first element.
        removeLast(deque) -> T   // Removes the last element.
        getFirst(deque) -> T     // Looks at the first element.
        getLast(deque) -> T      // Looks at the last element.

Note that this specifies exactly the same ADT as if we just use the names of the stack and queue operations.
The real difference is in the semantics of operations, not how we call them.

General lists can in turn be seen as an extension of deques, where we can insert, remove, update and look at an arbitrary position:

    interface List of T extends Deque:
        insert(list, i, x)    // Inserts x at position i, increasing the size of the list.
        remove(list, i)       // Deletes the element at position i, decreasing the size of the list.
        set(list, i, x)       // Replace the element at position i with the value x.
        get(list, i) -> T     // Returns the element at position i.

As we already mentioned in @sec:sequences:more-sequences,
it is not possible to implement this ADT such that all operations are efficient.
For example, if we use a circular dynamic array (see @sec:sequences:array-queues),
`insert` and `remove` become inefficient when the position `i` is in the middle of the list.
