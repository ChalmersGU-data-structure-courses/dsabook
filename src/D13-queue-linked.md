
### Linked Queues

The linked queue implementation is an adaptation of the linked list. The
only thing is that we have to add a pointer to the rear node in the
queue, to be able to add new elements efficiently.

<inlineav id="LinkedQueue-Intro-CON" src="ChalmersGU/LinkedQueue-Intro-CON.js" name="Linked Queue Intro" links="ChalmersGU/CGU-Styles.css"/>

    class LinkedQueue implements Queue:
        LinkedQueue():
            this.front = null   // Pointer to front queue node
            this.rear = null    // Pointer to rear queue node
            this.queueSize = 0  // Size of queue


#### Enqueueing Elements

<inlineav id="LinkedQueue-Enqueue-CON" src="ChalmersGU/LinkedQueue-Enqueue-CON.js" name="Linked Queue Enqueue" links="ChalmersGU/CGU-Styles.css"/>

    class LinkedQueue implements Queue:
        ...
        enqueue(x):
            newRear = new Node(x, null)
            if this.queueSize == 0:
                this.front = newRear
            else:
                this.rear.next = newRear
            this.rear = newRear
            this.queueSize = this.queueSize + 1

<avembed id="LinkedQueue-Enqueue-PRO" src="ChalmersGU/LinkedQueue-Enqueue-PRO.html" type="ka" name="Linked Queue Enqueue Exercise"/>

#### Dequeueing Elements

<inlineav id="LinkedQueue-Dequeue-CON" src="ChalmersGU/LinkedQueue-Dequeue-CON.js" name="Linked Queue Dequeue" links="ChalmersGU/CGU-Styles.css"/>

    class LinkedQueue implements Queue:
        ...
        dequeue():
            precondition: this.queueSize > 0
            removed = this.front
            this.front = removed.next
            removed.next = null  // For garbage collection
            this.queueSize = this.queueSize - 1
            if this.queueSize == 0:
                this.rear = null
            return removed.elem

<avembed id="LinkedQueue-Dequeue-PRO" src="ChalmersGU/LinkedQueue-Dequeue-PRO.html" type="ka" name="Linked Queue Dequeue Exercise"/>


### Comparison of Array-Based and Linked Queues

All member functions for both the array-based and linked queue
implementations require constant time. The space comparison issues are
the same as for the equivalent stack implementations.

Unlike the array-based stack implementation, there is no convenient way
to store two queues in the same array, unless items are always
transferred directly from one queue to the other.

### Stack and Queue Summary Questions

<avembed id="StackQueue-Summary-QUIZ" src="ChalmersGU/StackQueue-Summary-QUIZ.html" type="ka" name="Stack/Queue Summary Exercise"/>
