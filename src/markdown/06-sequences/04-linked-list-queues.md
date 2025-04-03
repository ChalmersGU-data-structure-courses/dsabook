
## Queues implemented as linked lists

The linked queue implementation is an adaptation of the linked list. The
only thing is that we have to add a pointer to the rear node in the
queue, to be able to add new elements efficiently.

    datatype LinkedQueue implements Queue:
        front: Node = null   // Pointer to front queue node
        rear: Node = null    // Pointer to rear queue node
        size: Int = 0        // Size of queue


<inlineav id="LinkedQueue-Intro-CON" src="ChalmersGU/LinkedQueue-Intro-CON.js" name="Linked Queue Intro" links="ChalmersGU/CGU-Styles.css"/>


### Invariants


### Enqueueing elements

    datatype LinkedQueue implements Queue:
        ...
        enqueue(x):
            newRear = new Node(x, null)
            if size == 0:
                front = newRear
            else:
                rear.next = newRear
            rear = newRear
            size = size + 1

<inlineav id="LinkedQueue-Enqueue-CON" src="ChalmersGU/LinkedQueue-Enqueue-CON.js" name="Linked Queue Enqueue" links="ChalmersGU/CGU-Styles.css"/>

<avembed id="LinkedQueue-Enqueue-PRO" src="ChalmersGU/LinkedQueue-Enqueue-PRO.html" type="ka" name="Linked Queue Enqueue Exercise"/>

### Dequeueing elements

    datatype LinkedQueue implements Queue:
        ...
        dequeue():
            // precondition: size > 0
            removed = front
            front = removed.next
            removed.next = null  // For garbage collection
            size = size - 1
            if size == 0:
                rear = null
            return removed.elem

<inlineav id="LinkedQueue-Dequeue-CON" src="ChalmersGU/LinkedQueue-Dequeue-CON.js" name="Linked Queue Dequeue" links="ChalmersGU/CGU-Styles.css"/>

<avembed id="LinkedQueue-Dequeue-PRO" src="ChalmersGU/LinkedQueue-Dequeue-PRO.html" type="ka" name="Linked Queue Dequeue Exercise"/>
