
## Stacks and queues {#sequences:stacks-and-queues}

::: TODO
- Prio 2: can we find good invariants?
- Prio 2: use cases for stacks and queues
:::

Both stacks and queues are collections of objects, where you can add elements and remove them one by one.
The difference between them is in which order the elements are removed.
So, when are stacks and queues used?
There are many real-life situations where a queue is appropriate,
and it can feel more "fair" to attend to issues in the order they arrive.
But in fact stacks are much more common in programming --
one reason is that they are slightly more efficient than queues,
so they are a better choice if the inherent order is not important.

But the main reason is that stacks are fundamental if we want to implement recursion and function calls.
Whenever a function calls another function, the system must remember the current local state:
what it should continue with after the call is done, what are the values of the local variables, etc.
Therefore it creates an object with all this information, and remembers it for later.
Now, if the new function calls yet another function, that local state has to be remembered too.
When this third function ends, the system must retreive the most recent local state
and continue processing the second function.
And when this function ends, the system retrieces the local state before that.
This is exactly the kind of things that a stack can do.

#### Specifying stacks and queues

Stacks and queues support two fundamental operations:
we can *add* elements, and we can *remove* them, one at the time.
In addition to adding and removing, we usually define some extra operations --
for telling its *size*, or to *peek* it for the next element without removing it.

The explanation above sounds like both stacks and queues do exactly the same thing,
but if we specify the semantics of the operations, the differences become apparent.
That the user of the data structure cannot influence *which* element to remove,
but this is decided by the data structure:

- a *stack* always removes the element that was most recently added
- a *queue* removes the element that has been waiting the longest

Note that the names of the operations do not really matter,
they can have completely arbitrary names, but still be the same operation.
The important thing is their semantics, and
a queue is a queue regardless if removing is called *dequeue* or *poll*,
or if adding is called *offer* or *append*.
In this book we will use the names *push* and *pop* for stacks,
and *enqueue* and *dequeue* for queues, respectively.

Interestingly, stacks and queues can implemented by different data structures.
In the following sections we will see how to implement them
either as *linked lists* (@sec:sequences:linked-lists) or
*dynamic arrays* ([@sec:sequences:array-sequences;@sec:sequences:dynamic-arrays]).


::: online
The following table lists some common names for the add and remove operations for stacks and queues.

|              | Stack                   | Queue
|:-------------|:------------------------|:-------------------------------
| **Adding**   | push, insert, add, addFirst | enqueue, offer, insert, add, addLast, append |
| **Removing** | pop, delete, deleteFirst, remove, removeFirst | dequeue, poll, delete, deleteFirst, remove, removeFirst |

:::
