
### Linked queues

::: TODO
- implementing dequeus, circular queues
:::

The linked queue implementation is an adaptation of the linked list. The
only thing is that we have to add a pointer to the rear node in the
queue, to be able to add new elements efficiently.

<inlineav id="LinkedQueue-Intro-CON" src="ChalmersGU/LinkedQueue-Intro-CON.js" name="Linked Queue Intro" links="ChalmersGU/CGU-Styles.css"/>

    class LinkedQueue implements Queue:
        LinkedQueue():
            this.front = null   // Pointer to front queue node
            this.rear = null    // Pointer to rear queue node
            this.queueSize = 0  // Size of queue


#### Enqueueing elements

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

#### Dequeueing elements

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
