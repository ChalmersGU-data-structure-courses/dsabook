
### Linked Queues

The linked queue implementation is an adaptation of the linked list. The
only thing is that we have to add a pointer to the rear node in the
queue, to be able to add new elements efficiently.

<inlineav id="LinkedQueue-Intro-CON" src="ChalmersGU/LinkedQueue-Intro-CON.js" name="Linked Queue Intro" links="ChalmersGU/CGU-Styles.css"/>

| 

```python
class LinkedQueue(Queue):
    def __init__(self):
        self._front = None    # Pointer to front queue node
        self._rear = None     # Pointer to rear queue node
        self._queueSize = 0   # Size of queue
```

```java
class LinkedQueue<E> implements Queue<E> {
    private Node front;      // Pointer to front queue node
    private Node rear;       // Pointer to rear queue node
    private int queueSize;   // Size of queue

    LinkedQueue() {
        front = null;
        rear = null;
        queueSize = 0;
    }
```



#### Enqueueing Elements

<inlineav id="LinkedQueue-Enqueue-CON" src="ChalmersGU/LinkedQueue-Enqueue-CON.js" name="Linked Queue Enqueue" links="ChalmersGU/CGU-Styles.css"/>

| 

```python
    def enqueue(self, x):
        newRear = LinkedQueueNode(x, None)
        if self._queueSize == 0:
            self._front = newRear
        else:
            self._rear.next = newRear
        self._rear = newRear
        self._queueSize += 1
```

```java
    public void enqueue(E x) {
        Node newRear = new Node(x, null);
        if (queueSize == 0)
            front = newRear;
        else
            rear.next = newRear;
        rear = newRear;
        queueSize++;
    }
```



| 

<avembed id="LinkedQueue-Enqueue-PRO" src="ChalmersGU/LinkedQueue-Enqueue-PRO.html" type="ka" name="Linked Queue Enqueue Exercise"/>

#### Dequeueing Elements

<inlineav id="LinkedQueue-Dequeue-CON" src="ChalmersGU/LinkedQueue-Dequeue-CON.js" name="Linked Queue Dequeue" links="ChalmersGU/CGU-Styles.css"/>

| 

```python
    def dequeue(self):
        if not (self._queueSize > 0): raise IndexError("dequeue from empty queue")
        removed = self._front
        self._front = removed.next
        removed.next = None   # For garbage collection
        self._queueSize -= 1
        if self._queueSize == 0:
            self._rear = None
        return removed.elem
```

```java
    public E dequeue() {
        if (!(queueSize > 0)) throw new NoSuchElementException("dequeue from empty queue");
        Node removed = front;
        front = removed.next;
        removed.next = null;   // For garbage collection
        queueSize--;
        if (queueSize == 0)
            rear = null;
        return removed.elem;
    }
```



| 

<avembed id="LinkedQueue-Dequeue-PRO" src="ChalmersGU/LinkedQueue-Dequeue-PRO.html" type="ka" name="Linked Queue Dequeue Exercise"/>

#### Linked Queue, Full Implementation

Here is the full implementation for linked queues.

```python
#/* *** ODSATag: LinkedQueueInit *** */
class LinkedQueue(Queue):
    def __init__(self):
        self._front = None    # Pointer to front queue node
        self._rear = None     # Pointer to rear queue node
        self._queueSize = 0   # Size of queue
#/* *** ODSAendTag: LinkedQueueInit *** */

#/* *** ODSATag: LinkedQueueEnqueue *** */
    def enqueue(self, x):
        newRear = LinkedQueueNode(x, None)
        if self._queueSize == 0:
            self._front = newRear
        else:
            self._rear.next = newRear
        self._rear = newRear
        self._queueSize += 1
#/* *** ODSAendTag: LinkedQueueEnqueue *** */

#/* *** ODSATag: LinkedQueuePeek *** */
    def peek(self):
        if not (self._queueSize > 0): raise IndexError("peek from empty queue")
        return self._front.elem
#/* *** ODSAendTag: LinkedQueuePeek *** */

#/* *** ODSATag: LinkedQueueDequeue *** */
    def dequeue(self):
        if not (self._queueSize > 0): raise IndexError("dequeue from empty queue")
        removed = self._front
        self._front = removed.next
        removed.next = None   # For garbage collection
        self._queueSize -= 1
        if self._queueSize == 0:
            self._rear = None
        return removed.elem
#/* *** ODSAendTag: LinkedQueueDequeue *** */

    def isEmpty(self):
        return self._queueSize == 0

    def size(self):
        return self._queueSize

#/* *** ODSATag: LinkedQueueIterator *** */
    def __iter__(self):
        current = self._front
        while current is not None:
            yield current.elem
            current = current.next
#/* *** ODSAendTag: LinkedQueueIterator *** */


#/* *** ODSATag: LinkedQueueNode *** */
# Python does not have internal classes, so we have to make the queue node standalone.
class LinkedQueueNode:
    def __init__(self, elem, next):
        self.elem = elem   # Value for this node
        self.next = next   # Pointer to next node in queue
#/* *** ODSAendTag: LinkedQueueNode *** */
```

```java
/* *** ODSATag: LinkedQueueInit *** */
class LinkedQueue<E> implements Queue<E> {
    private Node front;      // Pointer to front queue node
    private Node rear;       // Pointer to rear queue node
    private int queueSize;   // Size of queue

    LinkedQueue() {
        front = null;
        rear = null;
        queueSize = 0;
    }
/* *** ODSAendTag: LinkedQueueInit *** */

/* *** ODSATag: LinkedQueueNode *** */
    private class Node {
        E elem;       // Value for this node
        Node next;    // Pointer to next node in queue

        Node(E elem, Node next) {
            this.elem = elem;
            this.next = next;
        }
    }
/* *** ODSAendTag: LinkedQueueNode *** */

/* *** ODSATag: LinkedQueueEnqueue *** */
    public void enqueue(E x) {
        Node newRear = new Node(x, null);
        if (queueSize == 0)
            front = newRear;
        else
            rear.next = newRear;
        rear = newRear;
        queueSize++;
    }
/* *** ODSAendTag: LinkedQueueEnqueue *** */

/* *** ODSATag: LinkedQueuePeek *** */
    public E peek() {
        if (!(queueSize > 0)) throw new NoSuchElementException("peek from empty queue");
        return front.elem;
    }
/* *** ODSAendTag: LinkedQueuePeek *** */

/* *** ODSATag: LinkedQueueDequeue *** */
    public E dequeue() {
        if (!(queueSize > 0)) throw new NoSuchElementException("dequeue from empty queue");
        Node removed = front;
        front = removed.next;
        removed.next = null;   // For garbage collection
        queueSize--;
        if (queueSize == 0)
            rear = null;
        return removed.elem;
    }
/* *** ODSAendTag: LinkedQueueDequeue *** */

    public boolean isEmpty() {
        return queueSize == 0;
    }

    public int size() {
        return queueSize;
    }

/* *** ODSATag: LinkedQueueIterator *** */
    public Iterator<E> iterator() {
        return new LinkedQueueIterator();
    }

    private class LinkedQueueIterator implements Iterator<E> {
        private Node current;
        LinkedQueueIterator() {
            current = front;
        }
        public boolean hasNext() {
            return current != null;
        }
        public E next() {
            E x = current.elem;
            current = current.next;
            return x;
        }
    }
/* *** ODSAendTag: LinkedQueueIterator *** */
}
```



### Comparison of Array-Based and Linked Queues

All member functions for both the array-based and linked queue
implementations require constant time. The space comparison issues are
the same as for the equivalent stack implementations.

Unlike the array-based stack implementation, there is no convenient way
to store two queues in the same array, unless items are always
transferred directly from one queue to the other.

### Stack and Queue Summary Questions

<avembed id="StackQueue-Summary-QUIZ" src="ChalmersGU/StackQueue-Summary-QUIZ.html" type="ka" name="Stack/Queue Summary Exercise"/>
