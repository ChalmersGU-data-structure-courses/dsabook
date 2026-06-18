
## Stacks and queues

::: TODO
- Prio 2: invariants
- Prio 2: use cases for stacks and queues
:::

Both stacks and queues are collections of objects, where you can add elements and remove them one by one.
The difference between them is in which order the elements are removed.
So, when are stacks and queues used?
Most of us can easily find situations where a queue is appropriate,
and it feels more "democratic" to attend to issues in the order they arrive, than the opposite.
But in fact stacks are much more common in programming --
one reason is that they are slightly more efficient than queues,
so they are a better choice if the inherent order is not important.

But the main reason is that stacks are fundamental if we want to implement recursion and function calls.
Whenever a function calls another function, the system must remember the current local state:
what it should continue with after the call is done, what are the values of the local variables, etc.
Therefore it creates an object with all this information, and pushes it to the *call stack*.
Now, if the new function calls yet another function, that local state is pushed to the call stack.
When this third function ends, the system can pop the previous local state from the call stack
and continue processing the second function.
And when this function ends, the call stack is popped once again so that
it can continue where the first function was paused.

#### Specifying stacks and queues

A stack or a queue needs to have the following operations, as the absolut minimum:

- `add(x)`: adds the element x to the stack/queue
- `remove()`: removes an element, and returns it
- `isEmpty()`: tells us if there are any elements to remove

But note that this specification is not enough!
It does not say what the differences are between stacks and queues,
we also have to specify the semantics of the operations.
For example, the `remove()` operation behaves differently:

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

One interesting thing with stacks and queues is that there are several possible data structures that can implement them.
In the following sections we will see how to implement them
either as *linked lists* (see @sec:linked-lists) or
*dynamic arrays* (see [@sec:array-based-stacks-and-queues;@sec:dynamic-arrays]).
