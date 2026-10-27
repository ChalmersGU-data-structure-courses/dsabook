
## Collections and sequences {#ADTs:sequences}

A _collection_ is a general term for a data structure that can contain multiple elements.
The only thing we require from a collection is that it supports two basic operations:

- It must know its own *size*, that is, the number of elements in the collection,
- It is possible to *iterate* over the elements.

Iteration is normally done using a `for`-loop, like this:

    for each x in C:
        // do something with the element x

It is assumed that moving from one element to the next can be done in constant time.
When we describe the different ADTs (stacks, queues, lists, etc.) in pseudocode,
we call the ADT an *interface*, and these interfaces will *extend* the basic *Collection* interface.

    interface Collection:
        isEmpty(collection) -> Bool   // Tells if the collection contains no elements.
        size(collection) -> Int       // Returns the number of elements in the collection.
        (iteration)                   // We can use a for-loop over the elements.

Note that the `isEmpty` operation is redundant because it can always be replaced by `size()==0`,
but it is a handy shortcut so we keep it here.

### Stacks and queues as abstract data types {#ADTs:stacks-and-queues}

In @sec:sequences:stacks-and-queues we discussed how stacks and queues work,
and that they only have two core operations -- adding and removing elements.
As an ADT interface we can specify them like this:

    interface Stack of T extends Collection:
        push(stack, x: T)     // Pushes x on top of the stack.
        pop(stack) -> T       // Pops the top of the stack and returns it.
        peek(stack) -> T      // Returns the top element, without removing it.

    interface Queue of T extends Collection:
        enqueue(queue, x: T)  // Enqueues x at the end of the queue.
        dequeue(queue) -> T   // Dequeues the frontmost element.
        peek(queue) -> T      // Returns the frontmost element, without removing it.

Note that we also specified the *auxiliary* operation `peek` in this interface.
The interfaces inherit the `size` and `isEmpty` operations from `Collection`,
as well as the mechanism for iteration.

### Double-ended queues and general lists

Double-ended queues and general lists were briefly mentioned in @sec:sequences:more-sequences.
A double-ended queue, or a *deque*, is a combination of a stack and a queue,
meaning that we can add and remove from both ends of the sequence.
This could be written as a combined ADT extending both Stack and Queue,
or we could specify it clearer, and use more self-explaining names:

    interface Deque of T extends Collection:
        addFirst(deque, x)       // Adds x at the front of the deque.
        addLast(deque, x)        // Adds x at the end of the deque.
        removeFirst(deque) -> T  // Removes the first element.
        removeLast(deque) -> T   // Removes the last element.
        getFirst(deque) -> T     // Looks at the first element.
        getLast(deque) -> T      // Looks at the last element.

Note that this specifies exactly the same ADT as if we just use the names of the stack and queue operations.
The real difference is in the semantics of operations, not their names.

General lists can in turn be seen as an extension of deques, where we can insert, remove,
update and access arbitrary positions:

    interface List of T extends Deque:
        insert(list, i, x)    // Inserts x at position i, increasing the size of the list.
        remove(list, i)       // Deletes the element at position i, decreasing the size of the list.
        set(list, i, x)       // Replace the element at position i with the value x.
        get(list, i) -> T     // Returns the element at position i.

As we already mentioned in @sec:sequences:more-sequences,
it is not possible to implement this ADT such that all operations are efficient.
For example, if we use a circular dynamic array (see @sec:sequences:array-queues),
`insert` and `remove` become inefficient (linear time) when the position `i` is in the middle of the list.
