
## Queues implemented using arrays

The array-based queue is somewhat tricky to implement effectively.
A simple conversion of the array-based stack implementation is not efficient.

- If we let the queue front be the same as the stack top, i.e. the last element in the array, then we can easily enqueue new elements by simply moving the front pointer.
  But then the rear will be the first array element, and if we want to dequeue it we have to shift all the remaining elements to the left in the array.
  This is time-consuming and dequeueing therefore becomes linear, $O(n)$.

- If we instead let the front be the first array element, dequeueing becomes easy.
  But then we will instead have to shift all elements to be able to enqueue, again giving complexity $O(n)$.


::: dsvis
Array queue -- positions.

<inlineav id="aqueueFirstCON" src="List/aqueueFirstCON.js" name="Array-based Queue Positions Slideshow" links="List/aqueueCON.css"/>
:::

A more efficient implementation can be obtained by relaxing the requirement that all elements of the queue must be in the beginning of the array.
This means that we need two variables, for the positions of the front and the rear elements in the array.

- When we enqueue an element, we put it in the empty cell to the right of the rear, and increase the rear variable.
- When we dequeue an element, the result is in the cell in the front position, and then we increase the front variable.

::: dsvis
Array queue -- drifting.

<inlineav id="aqueueDriftCON" src="List/aqueueDriftCON.js" name="Array-based Queue Drift Slideshow" links="List/aqueueCON.css"/>
:::

::: dsvis
Array queue -- bad representation.

<inlineav id="aqueueBadCON" src="List/aqueueBadCON.js" name="Array-based Queue Bad Representation Slideshow" links="List/aqueueCON.css"/>
:::

### Circular queues

Both enqueueing and dequeueing will increase the front and rear positions -- the variables will never decrease.
This causes the queue to *drift* within the array, and at some point the rear will hit the end of the array.
We might get into a situation where the queue itself only occupies a few array cells, but the rear is still at the very end.

This "drifting queue" problem can be solved by pretending that the array is *circular*, meaning that we can go from the last array cell directly to the first.
This is easily implemented through use of the *modulus* operator (usually denoted by %).
Instead of just using $i+1$ for the next position, we have to use $(i+1)\mathop{\%}n$ (if $n$ is the size of the array).

::: dsvis
Circular array queue.

<inlineav id="aqueueCircularCON" src="List/aqueueCircularCON.js" script="DataStructures/CircularQueue.js" name="Circular Array-based Queue Slideshow" links="List/aqueueCON.css"/>
:::

There remains one more subtle problem to the array-based queue implementation.
How can we recognize when the queue is empty or full?

::: dsvis
Circular array queue -- empty.

<inlineav id="aqueueEmptyCON" src="List/aqueueEmptyCON.js" script="DataStructures/CircularQueue.js" name="Empty Circular Array-based Queue Slideshow" links="List/aqueueCON.css"/>
:::

If the array has size $n$, then it can store queues of size $0$ to $n$ --
therefore it can store $n+1$ different queue lengths.
But both when the queue is empty (size $0$) and when it is full (size $n$),
the $\mathit{front}$ variable is one larger than $\mathit{rear}$.
So, if $\mathit{front}=\mathit{rear}+1$, is the queue empty or full?

One obvious solution is to keep an explicit count of the number of
elements in the queue, i.e., using a special *size* variable.
Another solution is to make the array
be of size $n+1$, and only allow $n$ elements to be stored. A third
solution is to set `front` and `rear` to $-1$ when the queue becomes
empty. Which of these solutions to adopt is purely a matter of the
implementor's taste in such affairs. Our choice here is to keep an
explicit count of the number of elements, in a variable *size*,
because this will make the code more similar to our other implementations.

<!-- In this implementation, the front of the queue is defined to be toward
the lower numbered positions in the array, and the rear is defined to be toward
the higher-numbered positions. Thus, *enqueue* increments the rear
pointer (modulus the capacity of the internal array), and *dequeue*
increments the front pointer. -->

    datatype ArrayQueue implements Queue:
        internalArray = new Array(1000)  // Internal array containing the queue elements
        size = 0                         // Size of queue
        front = 0                        // Index of front element
        rear = -1                        // Index of rear element
        nextPosition(i):
            return (i + 1) % internalArray.size

<!--
### Invariants
 -->

#### Enqueueing and dequeueing

When enqueueing, we increase the *rear* pointer (modulo the size of the internal array to make it circular).

    datatype ArrayQueue:
        ...
        enqueue(x):
            rear = nextPosition(rear)  // Circular increment
            internalArray[rear] = x
            size = size + 1

When dequeueing, we increase the *front* pointer (modulo the size of the internal array).

    class ArrayQueue:
        ...
        dequeue():
            result = internalArray[front]
            internalArray[front] = null  // For garbage collection
            front = nextPosition(front)  // Circular increment
            size = size - 1
            return result


::: dsvis
#### Array-based queue practice exercises

<avembed id="AqueueEnqueuePRO" src="ChalmersGU/AqueueEnqueuePRO.html" type="ka" name="Array-based Queue Enqueue Exercise"/>

<avembed id="AqueueDequeuePRO" src="ChalmersGU/AqueueDequeuePRO.html" type="ka" name="Array-based Queue Dequeue Exercise"/>
:::

