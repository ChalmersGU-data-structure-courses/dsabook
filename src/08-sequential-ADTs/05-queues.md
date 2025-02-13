
## Queues

Like the stack, the [queue]{.term} is a
list-like structure that provides restricted access to its elements.
Queue elements may only be inserted at the back (called an
[enqueue]{.term} operation) and removed from the
front (called a [dequeue]{.term} operation).
Queues operate like standing in line at a movie theater ticket counter.
If nobody cheats, then newcomers go to the back of the line. The person
at the front of the line is the next to be served. Thus, queues release
their elements in order of arrival. In Britain, a line of people is
called a "queue", and getting into line to wait for service is called
"queuing up". Accountants have used queues since long before the
existence of computers. They call a queue a "FIFO" list, which stands
for "First-In, First-Out". Here is a sample queue ADT. This section
presents two implementations for queues: the array-based queue and the
linked queue.

    interface Queue extends Collection:
        enqueue(x)  // Enqueues x at the end of the queue.
        dequeue()   // Dequeues the frontmost element.
        peek()      // Returns the frontmost element, without removing it.
