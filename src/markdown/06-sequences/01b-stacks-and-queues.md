
### Stacks and queues

::: TODO
- Prio 1: move the ADT subsection to ADT chapter 8
- Prio 2: invariants
- Prio 2: use cases for stacks and queues
:::

Stacks and queues are our first *abstract data types* (ADTs).
Each of them has an interface that says how to use them, but it doesn't say how they are implemented.
And both of them can be implemented in different ways, using different *data structures*.

Both stacks and queues are collections of objects, where you can add elements and remove them one by one.
The difference between them is in which order the elements are removed.
So, when are stacks and queues used?
Most of us can easily find situations where a queue is appropriate,
and it feels more "democratic" to attend to issues in the order they arrive, than the opposite.
But in fact stacks are much more common in programming.
The main reason for this is that stacks are fundamental if we want to implement recursion and function calls
-- but stacks are also slightly more efficient, so they are a better choice if the inherent order is not important.

Whenever a function calls another function, the system must remember the current local state:
what it should continue with after the call is done, what are the values of the local variables, etc.
Therefore it creates an object with all this information, and pushes it to the *call stack*.
Now, if the new function calls yet another function, that local state is pushed to the call stack.
When this third function ends, the system can pop the previous local state from the call stack
and continue processing the second function.
And when this function ends, the call stack is popped once again so that
it can continue where the first function was paused.


### Stacks and queues as abstract data types

A stack or a queue needs to have the following operations, as the absolut minimum:

- `add(x)`: adds the element x to the stack/queue
- `remove()`: removes an element, and returns it
- `isEmpty()`: tells us if there are any elements to remove

But there can also be some additional convenience operations, and a very common is:

- `size()`: returns the number of elements in the stack/queue

The methods above corresponds to the *interface* of the abstract data type (ADT).
But note that just listing the methods is not enough to specify an ADT:
for example, stacks and queues both have the same interface
-- but they are definitely not the same!
We also have to specify the semantics of the operations.
For example, the `remove()` operation can be like this:

- *Stack*: removes the element that was most recently added
- *Queue*: removes the element that has been waiting the longest

Also note that the name of the operation do not really matter,
they can have completely arbitrary names, but still be the same operation.
Here are some common names:

|              | Stack             | Queue
|:-------------|:------------------|:--------------------------
| **Adding**   | push, insert, add, addFirst | enqueue, offer, insert, add, addLast, append |
| **Removing** | pop, delete, deleteFirst, remove, removeFirst | dequeue, poll, delete, deleteFirst, remove, removeFirst |

Do not be fooled by different names!
The important thing is their semantics, and a queue is a queue regardless if the method is called *dequeue*, *poll* or *remove*.

In this book we will use the names *push* and *pop* for stacks, and *enqueue* and *dequeue* for queues, respectively.
The reason for this is to reduce ambiguity when talking about the data structures,
and the names are very common in actual library implementations.

So the interface for the stack and queue ADTs look like this:

    interface Stack of T extends Collection:
        push(x: T)       // Pushes x on top of the stack.
        pop() -> T       // Pops the top of the stack and returns it.
        peek() -> T      // Returns the top element, without removing it.

    interface Queue of T extends Collection:
        enqueue(x: T)    // Enqueues x at the end of the queue.
        dequeue() -> T   // Dequeues the frontmost element.
        peek() -> T      // Returns the frontmost element, without removing it.


The interesting thing with these two ADTs is that there are several possible data structures that can implement them.
In the following sections we will see how to implement stacks and queues,
either as *linked lists* (see @sec:linked-lists) or *dynamic arrays* (see [@sec:array-lists;@sec:dynamic-arrays]).

