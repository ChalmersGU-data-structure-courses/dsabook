
## ADTs for Ordered Sequences

General lists:

    interface List extends Collection:
        add(i, x)  // Adds x at position i; where 0 ≤ i ≤ size.
        get(i)     // Returns the element at position i; where 0 ≤ i < size.
        set(i, x)  // Replaces the value at position i with x; where 0 ≤ i < size.
        remove(i)  // Removes the element at position i; where 0 ≤ i < size.

Stacks:

    interface Stack extends Collection:
        push(x)    // Pushes x on top of the stack.
        pop()      // Pops the top of the stack and returns it.
        peek()     // Returns the top element, without removing it.

Queues:

    interface Queue extends Collection:
        enqueue(x)  // Enqueues x at the end of the queue.
        dequeue()   // Dequeues the frontmost element.
        peek()      // Returns the frontmost element, without removing it.

Priority queues:

    interface PriorityQueue extends Collection:
        add(x)       // Adds x to the priority queue.
        removeMin()  // Removes and returns the minimum element.
        getMin()     // Returns the minimum element, without removing it.

