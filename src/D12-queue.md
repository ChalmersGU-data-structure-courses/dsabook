
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
        dequeue()   // Dequeues the frontmost element. Raises an exception if the queue is empty.
        peek()      // Returns the frontmost element, without removing it. Raises an exception if the queue is empty.


### Array-Based Queues

The array-based queue is somewhat tricky to implement effectively. A
simple conversion of the array-based list implementation is not
efficient.

<inlineav id="aqueueFirstCON" src="List/aqueueFirstCON.js" name="Array-based Queue Positions Slideshow" links="List/aqueueCON.css"/>

| 

<inlineav id="aqueueDriftCON" src="List/aqueueDriftCON.js" name="Array-based Queue Drift Slideshow" links="List/aqueueCON.css"/>

| 

<inlineav id="aqueueBadCON" src="List/aqueueBadCON.js" name="Array-based Queue Bad Representation Slideshow" links="List/aqueueCON.css"/>

#### The Circular Queue

<inlineav id="aqueueCircularCON" src="List/aqueueCircularCON.js" script="DataStructures/CircularQueue.js" name="Circular Array-based Queue Slideshow" links="List/aqueueCON.css"/>

| 

<inlineav id="aqueueEmptyCON" src="List/aqueueEmptyCON.js" script="DataStructures/CircularQueue.js" name="Empty Circular Array-based Queue Slideshow" links="List/aqueueCON.css"/>

If the value of `front` is fixed, then $n+1$ different values for `rear`
are needed to distinguish among the $n+1$ states. However, there are
only $n$ possible values for `rear` unless we invent a special case for,
say, empty queues. This is an example of the
[Pigeonhole Principle]{.term}. The Pigeonhole
Principle states that, given $n$ pigeonholes and $n+1$ pigeons, when all
of the pigeons go into the holes we can be sure that at least one hole
contains more than one pigeon. In similar manner, we can be sure that
two of the $n+1$ states are indistinguishable by the $n$ relative values
of `front` and `rear`. We must seek some other way to distinguish full
from empty queues.

One obvious solution is to keep an explicit count of the number of
elements in the queue, or at least a Boolean variable that indicates
whether the queue is empty or not. Another solution is to make the array
be of size $n+1$, and only allow $n$ elements to be stored. A third
solution is to set `front` and `rear` to --1 when the queue becomes
empty. Which of these solutions to adopt is purely a matter of the
implementor's taste in such affairs. Our choice here is to keep an
explicit count of the number of elements, in the variable `queueSize`,
because this will make the code more similar to our list and stack
implementations.

#### Array-based Queue Implementation

In this implementation, the front of the queue is defined to be toward
the lower numbered positions in the array (in the counter-clockwise
direction in the circular array), and the rear is defined to be toward
the higher-numbered positions. Thus, `enqueue` increments the rear
pointer (modulus the size of the internal array), and `dequeue`
increments the front pointer.

    class DynamicArrayQueue implements Queue:
        def DynamicArrayQueue():
            this.internalArray = new Array(8)  // Internal array containing the queue elements
            this.queueSize = 0                 // Size of queue, and index of the next free slot
            this.front = 0                     // Index of front element
            this.rear = -1                     // Index of rear element

Implemening the member functions is mostly straightforward.

#### Enqueueing an element

When enqueueing, we increase the `rear` pointer (modulo the size of the
internal array to make it circular).

    class DynamicArrayQueue implements Queue:
        ...
        enqueue(x):
            if this.queueSize >= this.internalArray.size():
                this.resizeArray(this.internalArray.size() * 2)
            this.rear = (this.rear + 1) % this.internalArray.size()  // Circular increment
            this.internalArray[this.rear] = x
            this.queueSize = this.queueSize + 1


#### Dequeueing an element

When dequeueing, we increase the `front` pointer (modulo the size of the
internal array).

    class DynamicArrayQueue implements Queue:
        ...
        dequeue():
            if not (this.queueSize > 0): 
                throw error "dequeue from empty queue"
            this.queueSize = this.queueSize - 1
            x = this.internalArray[this.front]
            this.internalArray[this.front] = null  // For garbage collection
            this.front = (this.front + 1) % this.internalArray.size()  // Circular increment
            if this.queueSize <= this.internalArray.size() * 1/3:
                this.resizeArray(this.internalArray.size()) * 1/2
            return x


#### Resizing the internal array

When we resize the internal array, we cannot keep the positions of the
elements. If the queue is wrapped around (i.e., if `rear < front`) then
we might end up in a large gap in the middle of the queue.

Instead we reset the `front` and `rear` pointers so that we copy the
first queue element to position 0 of the new array, the second to
position 1, etc. Apart from that, the implementation is similar to the
one for lists and queues.


    class DynamicArrayQueue implements Queue:
        ...
        resizeArray(newCapacity):
            if newCapacity < 8: 
                return
            newArray = new Array(newCapacity)
            for i in 0 to this.queueSize-1:
                j = (i + this.front) % this.internalArray.size()
                newArray[i] = this.internalArray[j]
            this.internalArray = newArray
            this.front = 0
            this.rear = this.queueSize-1


#### Array-based Queue Practice Exercises

<avembed id="AqueueEnqueuePRO" src="ChalmersGU/AqueueEnqueuePRO.html" type="ka" name="Array-based Queue Enqueue Exercise"/>

<avembed id="AqueueDequeuePRO" src="ChalmersGU/AqueueDequeuePRO.html" type="ka" name="Array-based Queue Dequeue Exercise"/>

