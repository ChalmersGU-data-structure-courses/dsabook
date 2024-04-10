
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

```python
class Queue(Collection):
    def enqueue(self, x): """Enqueues x at the end of the queue."""
    def dequeue(self):    """Dequeues the frontmost element. Raises an exception if the queue is empty."""
    def peek(self):       """Returns the frontmost element, without removing it. Raises an exception if the queue is empty."""
    # Note: __iter__() should yield the elements starting from the frontmost element.
```

```java
// Note: This is a subset of java.util.Queue; and it uses different method names.
interface Queue<E> extends Collection<E> {
    void enqueue(E x);  // Enqueues x at the end of the queue.
    E dequeue();        // Dequeues the frontmost element. Raises an exception if the queue is empty.
    E peek();           // Returns the frontmost element, without removing it. Raises an exception if the queue is empty.
    // Note: iterator() should yield the elements starting from the frontmost element.
}
```



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

```python
class DynamicArrayQueue(Queue):
    _minCapacity = 8            # Minimum capacity of internalArray
    _minLoadFactor = 0.5        # Must be smaller than 1/CapacityMultiplier
    _capacityMultiplier = 1.5   # Factor to grow/shrink the capacity

    def __init__(self):
        self._internalArray = [None] * self._minCapacity   # Internal array containing the queue elements
        self._queueSize = 0                                # Size of queue, and index of the next free slot
        self._front = 0                                    # Index of front element
        self._rear = -1                                    # Index of rear element
```

```java
class DynamicArrayQueue<E> implements Queue<E> {
    private E[] internalArray;   // Internal array containing the queue elements
    private int queueSize;       // Size of queue, and index of the next free slot
    private int front;           // Index of front element
    private int rear;            // Index of rear element

    static int MinCapacity = 8;               // Minimum capacity of internalArray
    static double MinLoadFactor = 0.5;        // Must be smaller than 1/CapacityMultiplier
    static double CapacityMultiplier = 1.5;   // Factor to grow/shrink the capacity

    @SuppressWarnings("unchecked")
    public DynamicArrayQueue() {
        internalArray = (E[]) new Object[MinCapacity];
        queueSize = 0;
        front = 0;
        rear = -1;
    }
```



Implemening the member functions is mostly straightforward.

#### Enqueueing an element

When enqueueing, we increase the `rear` pointer (modulo the size of the
internal array to make it circular).

```python
    def enqueue(self, x):
        if self._queueSize >= len(self._internalArray):
            self._resizeArray(len(self._internalArray) * self._capacityMultiplier)
        self._rear = (self._rear + 1) % len(self._internalArray)   # Circular increment
        self._internalArray[self._rear] = x
        self._queueSize += 1
```

```java
    public void enqueue(E x) {
        if (queueSize >= internalArray.length)
            resizeArray((int) (internalArray.length * CapacityMultiplier));
        rear = (rear + 1) % internalArray.length;   // Circular increment
        internalArray[rear] = x;
        queueSize++;
    }
```



#### Dequeueing an element

When dequeueing, we increase the `front` pointer (modulo the size of the
internal array).

```python
    def dequeue(self):
        if not (self._queueSize > 0): raise IndexError("dequeue from empty queue")
        self._queueSize -= 1
        x = self._internalArray[self._front]
        self._internalArray[self._front] = None   # For garbage collection
        self._front = (self._front + 1) % len(self._internalArray)   # Circular increment
        if self._queueSize <= len(self._internalArray) * self._minLoadFactor:
            self._resizeArray(len(self._internalArray) / self._capacityMultiplier)
        return x
```

```java
    public E dequeue() {
        if (!(queueSize > 0)) throw new NoSuchElementException("dequeue from empty queue");
        queueSize--;
        E x = internalArray[front];
        internalArray[front] = null;   // For garbage collection
        front = (front + 1) % internalArray.length;   // Circular increment
        if (queueSize <= internalArray.length * MinLoadFactor)
            resizeArray((int) (internalArray.length / CapacityMultiplier));
        return x;
    }
```



#### Resizing the internal array

When we resize the internal array, we cannot keep the positions of the
elements. If the queue is wrapped around (i.e., if `rear < front`) then
we might end up in a large gap in the middle of the queue.

Instead we reset the `front` and `rear` pointers so that we copy the
first queue element to position 0 of the new array, the second to
position 1, etc. Apart from that, the implementation is similar to the
one for lists and queues.

```python
    def _resizeArray(self, newCapacity):
        if newCapacity < self._minCapacity: return
        newArray = [None] * int(newCapacity)
        for i in range(self._queueSize):
            newArray[i] = self._internalArray[(i + self._front) % len(self._internalArray)]
        self._internalArray = newArray
        self._front = 0
        self._rear = self._queueSize-1
```

```java
    private void resizeArray(int newCapacity) {
        if (newCapacity < MinCapacity) return;
        @SuppressWarnings("unchecked")
        E[] newArray = (E[]) new Object[newCapacity];
        for (int i = 0; i < queueSize; i++)
            newArray[i] = internalArray[(i + front) % internalArray.length];
        internalArray = newArray;
        front = 0;
        rear = queueSize-1;
    }
```



#### Array-based Queue Practice Exercises

<avembed id="AqueueEnqueuePRO" src="ChalmersGU/AqueueEnqueuePRO.html" type="ka" name="Array-based Queue Enqueue Exercise"/>

<avembed id="AqueueDequeuePRO" src="ChalmersGU/AqueueDequeuePRO.html" type="ka" name="Array-based Queue Dequeue Exercise"/>

#### Array-based Queues, Full Implementation

Here is an array-based queue implementation.

```python
#/* *** ODSATag: DynamicArrayQueueInit *** */
class DynamicArrayQueue(Queue):
    _minCapacity = 8            # Minimum capacity of internalArray
    _minLoadFactor = 0.5        # Must be smaller than 1/CapacityMultiplier
    _capacityMultiplier = 1.5   # Factor to grow/shrink the capacity

    def __init__(self):
        self._internalArray = [None] * self._minCapacity   # Internal array containing the queue elements
        self._queueSize = 0                                # Size of queue, and index of the next free slot
        self._front = 0                                    # Index of front element
        self._rear = -1                                    # Index of rear element
#/* *** ODSAendTag: DynamicArrayQueueInit *** */

#/* *** ODSATag: DynamicArrayQueueEnqueue *** */
    def enqueue(self, x):
        if self._queueSize >= len(self._internalArray):
            self._resizeArray(len(self._internalArray) * self._capacityMultiplier)
        self._rear = (self._rear + 1) % len(self._internalArray)   # Circular increment
        self._internalArray[self._rear] = x
        self._queueSize += 1
#/* *** ODSAendTag: DynamicArrayQueueEnqueue *** */

#/* *** ODSATag: DynamicArrayQueuePeek *** */
    def peek(self):
        if not (self._queueSize > 0): raise IndexError("peek from empty queue")
        return self._internalArray[self._front]
#/* *** ODSAendTag: DynamicArrayQueuePeek *** */

#/* *** ODSATag: DynamicArrayQueueDequeue *** */
    def dequeue(self):
        if not (self._queueSize > 0): raise IndexError("dequeue from empty queue")
        self._queueSize -= 1
        x = self._internalArray[self._front]
        self._internalArray[self._front] = None   # For garbage collection
        self._front = (self._front + 1) % len(self._internalArray)   # Circular increment
        if self._queueSize <= len(self._internalArray) * self._minLoadFactor:
            self._resizeArray(len(self._internalArray) / self._capacityMultiplier)
        return x
#/* *** ODSAendTag: DynamicArrayQueueDequeue *** */

#/* *** ODSATag: DynamicArrayQueueResize *** */
    def _resizeArray(self, newCapacity):
        if newCapacity < self._minCapacity: return
        newArray = [None] * int(newCapacity)
        for i in range(self._queueSize):
            newArray[i] = self._internalArray[(i + self._front) % len(self._internalArray)]
        self._internalArray = newArray
        self._front = 0
        self._rear = self._queueSize-1
#/* *** ODSAendTag: DynamicArrayQueueResize *** */

    def isEmpty(self):
        return self._queueSize == 0

    def size(self):
        return self._queueSize

#/* *** ODSATag: DynamicArrayQueueIterator *** */
    def __iter__(self):
        for i in range(self._front, self._front + self._queueSize):
            yield self._internalArray[i % len(self._internalArray)]
#/* *** ODSAendTag: DynamicArrayQueueIterator *** */
```

```java
/* *** ODSATag: DynamicArrayQueueInit *** */
class DynamicArrayQueue<E> implements Queue<E> {
    private E[] internalArray;   // Internal array containing the queue elements
    private int queueSize;       // Size of queue, and index of the next free slot
    private int front;           // Index of front element
    private int rear;            // Index of rear element

    static int MinCapacity = 8;               // Minimum capacity of internalArray
    static double MinLoadFactor = 0.5;        // Must be smaller than 1/CapacityMultiplier
    static double CapacityMultiplier = 1.5;   // Factor to grow/shrink the capacity

    @SuppressWarnings("unchecked")
    public DynamicArrayQueue() {
        internalArray = (E[]) new Object[MinCapacity];
        queueSize = 0;
        front = 0;
        rear = -1;
    }
/* *** ODSAendTag: DynamicArrayQueueInit *** */

/* *** ODSATag: DynamicArrayQueueEnqueue *** */
    public void enqueue(E x) {
        if (queueSize >= internalArray.length)
            resizeArray((int) (internalArray.length * CapacityMultiplier));
        rear = (rear + 1) % internalArray.length;   // Circular increment
        internalArray[rear] = x;
        queueSize++;
    }
/* *** ODSAendTag: DynamicArrayQueueEnqueue *** */

/* *** ODSATag: DynamicArrayQueuePeek *** */
    public E peek() {
        if (!(queueSize > 0)) throw new NoSuchElementException("peek from empty queue");
        return internalArray[front];
    }
/* *** ODSAendTag: DynamicArrayQueuePeek *** */

/* *** ODSATag: DynamicArrayQueueDequeue *** */
    public E dequeue() {
        if (!(queueSize > 0)) throw new NoSuchElementException("dequeue from empty queue");
        queueSize--;
        E x = internalArray[front];
        internalArray[front] = null;   // For garbage collection
        front = (front + 1) % internalArray.length;   // Circular increment
        if (queueSize <= internalArray.length * MinLoadFactor)
            resizeArray((int) (internalArray.length / CapacityMultiplier));
        return x;
    }
/* *** ODSAendTag: DynamicArrayQueueDequeue *** */

/* *** ODSATag: DynamicArrayQueueResize *** */
    private void resizeArray(int newCapacity) {
        if (newCapacity < MinCapacity) return;
        @SuppressWarnings("unchecked")
        E[] newArray = (E[]) new Object[newCapacity];
        for (int i = 0; i < queueSize; i++)
            newArray[i] = internalArray[(i + front) % internalArray.length];
        internalArray = newArray;
        front = 0;
        rear = queueSize-1;
    }
/* *** ODSAendTag: DynamicArrayQueueResize *** */

    public boolean isEmpty() {
        return queueSize == 0;
    }

    public int size() {
        return queueSize;
    }

/* *** ODSATag: DynamicArrayQueueIterator *** */
    public Iterator<E> iterator() {
        if (front + queueSize <= internalArray.length)
            return Arrays.stream(internalArray, front, front + queueSize).iterator();
        else
            return Stream.concat(Arrays.stream(internalArray, front, internalArray.length),
                                 Arrays.stream(internalArray, 0, rear+1)).iterator();
    }
/* *** ODSAendTag: DynamicArrayQueueIterator *** */
}
```


