
### Array-based queues

An array-based queue is somewhat tricky to implement effectively.
A simple conversion of the array-based stack is not efficient:

-   If we let the queue front be the same as the stack top -- that is, the last element in the array --
    then we can easily enqueue new elements by simply moving the front pointer.
    But then the rear will be the first array element,
    and if we want to dequeue it we have to shift all the remaining elements to the left in the array.
    This is time-consuming and dequeueing therefore becomes linear, $O(n)$.

-   If we instead let the front be the first array element, dequeueing becomes easy.
    But then we will instead have to shift all elements to be able to enqueue, again giving complexity $O(n)$.


::: dsvis
Array queue -- positions.

``` {.jsav-animation src="List/aqueueFirstCON.js" links="List/aqueueCON.css" name="Array-based Queue Positions Slideshow"}
```
:::

The solution is to have *two* pointers, to the front and to the rear, and let both of them change dynamically.
This means that we relax the requirement that the queue must occupy the start of the array.
The queue simply consists of all elements between the *front* and the *rear* cells.
Now enqueueing and dequeueing becomes rather similar to each other:

- To *enqueue* an element, we increase the *rear* pointer.
- To *dequeue* an element, we instead increase the *front* pointer.

::: dsvis
Array queue -- drifting.

``` {.jsav-animation src="List/aqueueDriftCON.js" links="List/aqueueCON.css" name="Array-based Queue Drift Slideshow"}
```
:::

Note that both pointers will increase, they will never decrease.
After a while, when we have enqueued enough elements, the *rear* pointer will reach the end of the array,
and this will happen even if we have dequeued all previous elements!
For example, suppose that we run *enqueue* directly followed by a *dequeue*, and we do this 1000 times.
The queue itself will never contain more than one element,
but after repeating 1000 times the *rear* pointer has reached the end of the array
(assuming that we allocated space for 1000 elements).
The next time we enqueue an element the program will crash,
because we try to refer to an array cell that does not exist.

::: dsvis
Array queue -- bad representation.

``` {.jsav-animation src="List/aqueueBadCON.js" links="List/aqueueCON.css" name="Array-based Queue Bad Representation Slideshow"}
```
:::

#### Queues as circular arrays

Both enqueueing and dequeueing will increase the front and rear positions -- the variables will never decrease.
This causes the queue to *drift* within the array, and at some point the rear will hit the end of the array.
We might get into a situation where the queue itself only occupies a few array cells, but the rear is still at the very end.

This "drifting queue" problem can be solved by pretending that the array is *circular*,
meaning that we can go from the last array cell directly to the first.
If the *front* pointer points somewhere in the middle of the array there is plenty of space at the beginning
-- so we can "wrap around" the *rear* pointer and let it start from the beginning.
And when we have dequeued a lot of elements, *front* will reach the end of the array
-- so we treat it in the same way and let it wrap around too.

::: dsvis
Circular array queue.

``` {.jsav-animation src="List/aqueueCircularCON.js" scripts="DataStructures/CircularQueue.js" links="List/aqueueCON.css" name="Circular Array-based Queue Slideshow"}
```
:::

Here is a traditional "flat" representation of a queue with 7 elements,
where "T" was the element most recently added and "A" is the one that has waited the longest.
When we want to enqueue a new element, it will be assigned to the empty cell at index 3.

![](images/CircularQueue1.png)

There remains one more subtle problem to the array-based queue implementation.
How can we recognise when the queue is empty or full?
If the array has size $n$, then it can store queues of size $0$ to $n$ --
therefore it can store $n+1$ different queue lengths.
But both when the queue is empty (size $0$) and when it is full (size $n$),
the *front* variable is one larger than *rear*.
In other words, if $\mathit{front}=\mathit{rear}+1$, is the queue empty or full?

::: dsvis
Circular array queue -- empty.

``` {.jsav-animation src="List/aqueueEmptyCON.js" scripts="DataStructures/CircularQueue.js" links="List/aqueueCON.css" name="Empty Circular Array-based Queue Slideshow"}
```
:::

One obvious solution is to keep an explicit count of the number of elements in the queue,
that is, to use a special *size* variable.
Another solution is to set *front* and *rear* to some unused number (such as $-1$) whenever the queue becomes empty.
Which of these solutions to adopt is purely a matter of the implementor's taste in such affairs.
Our choice here is to keep an explicit count of the number of elements, in a variable *size*,
because this will make the code more similar to our other implementations.

    datatype ArrayQueue implements Queue:
        internalArray = new Array(1000)  // Internal array containing the queue elements.
        size = 0                         // The size of the queue.
        front = 0                        // Index of the front element.
        rear = -1                        // Index of the rear element.
        nextPosition(i):                 // Return the next position after i.
            return (i + 1) mod internalArray.size

Note that we add a helper method `nextPosition` which will come in handy, both for enqueueing and dequeueing.
This is easily implemented through use of the *modulus* operator:
instead of just using $i+1$ for the next position,
we have to use $(i+1)\bmod n$ (where $n$ is the size of the array).


#### Enqueueing and dequeueing

When enqueueing, we increase the *rear* pointer (modulo the size of the internal array).

    datatype ArrayQueue:
        ...
        enqueue(x):
            rear = nextPosition(rear)    // Circular increment
            internalArray[rear] = x
            size = size + 1

When dequeueing, we increase the *front* pointer (modulo the size of the internal array).
Just as for array-based stacks, we have to clear the array cell that was dequeued,
because otherwise it will never be garbage collecter.

    class ArrayQueue:
        ...
        dequeue():
            result = internalArray[front]
            internalArray[front] = null  // For garbage collection
            front = nextPosition(front)  // Circular increment
            size = size - 1
            return result


::: dsvis
Array-based queue practice exercises.

```{.jsav-embedded src="ChalmersGU/AqueueEnqueuePRO.html" type="ka" name="Array-based Queue Enqueue Exercise"}
```

```{.jsav-embedded src="ChalmersGU/AqueueDequeuePRO.html" type="ka" name="Array-based Queue Dequeue Exercise"}
```
:::

