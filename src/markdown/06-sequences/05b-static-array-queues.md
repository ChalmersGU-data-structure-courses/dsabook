
## Queues implemented using arrays

The array-based queue is somewhat tricky to implement effectively.
A simple conversion of the array-based stack implementation is not efficient.

::: dsvis
Array queue -- positions.

<inlineav id="aqueueFirstCON" src="List/aqueueFirstCON.js" name="Array-based Queue Positions Slideshow" links="List/aqueueCON.css"/>
:::

::: dsvis
Array queue -- drifting.

<inlineav id="aqueueDriftCON" src="List/aqueueDriftCON.js" name="Array-based Queue Drift Slideshow" links="List/aqueueCON.css"/>
:::

::: dsvis
Array queue -- bad representation.

<inlineav id="aqueueBadCON" src="List/aqueueBadCON.js" name="Array-based Queue Bad Representation Slideshow" links="List/aqueueCON.css"/>
:::

### Circular queues

::: dsvis
Circular array queue.

<inlineav id="aqueueCircularCON" src="List/aqueueCircularCON.js" script="DataStructures/CircularQueue.js" name="Circular Array-based Queue Slideshow" links="List/aqueueCON.css"/>
:::

::: dsvis
Circular array queue -- empty.

<inlineav id="aqueueEmptyCON" src="List/aqueueEmptyCON.js" script="DataStructures/CircularQueue.js" name="Empty Circular Array-based Queue Slideshow" links="List/aqueueCON.css"/>
:::

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
solution is to set `front` and `rear` to $-1$ when the queue becomes
empty. Which of these solutions to adopt is purely a matter of the
implementor's taste in such affairs. Our choice here is to keep an
explicit count of the number of elements, in the variable `size`,
because this will make the code more similar to our list and stack
implementations.

In this implementation, the front of the queue is defined to be toward
the lower numbered positions in the array (in the counter-clockwise
direction in the circular array), and the rear is defined to be toward
the higher-numbered positions. Thus, `enqueue` increments the rear
pointer (modulus the capacity of the internal array), and `dequeue`
increments the front pointer.

    datatype ArrayQueue implements Queue:
        internalArray = new Array(1000)  // Internal array containing the queue elements
        size = 0                         // Size of queue
        front = 0                        // Index of front element
        rear = -1                        // Index of rear element


### Invariants


### Enqueueing an element

When enqueueing, we increase the `rear` pointer (modulo the size of the internal array to make it circular).

    datatype ArrayQueue implements Queue:
        ...
        enqueue(x):
            rear = (rear + 1) % internalArray.size  // Circular increment
            internalArray[rear] = x
            size = size + 1


### Dequeueing an element

When dequeueing, we increase the `front` pointer (modulo the size of the internal array).

    class ArrayQueue implements Queue:
        ...
        dequeue():
            // precondition: size > 0
            x = internalArray[front]
            internalArray[front] = null  // For garbage collection
            front = (front + 1) % internalArray.size  // Circular increment
            size = size - 1
            return x


::: dsvis
#### Array-based queue practice exercises

<avembed id="AqueueEnqueuePRO" src="ChalmersGU/AqueueEnqueuePRO.html" type="ka" name="Array-based Queue Enqueue Exercise"/>

<avembed id="AqueueDequeuePRO" src="ChalmersGU/AqueueDequeuePRO.html" type="ka" name="Array-based Queue Dequeue Exercise"/>
:::

