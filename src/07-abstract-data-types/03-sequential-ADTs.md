
## ADTs for ordered sequences

### Use case(s)

### General lists

::: TODO
- examples, use cases
- Implementations: dynamic arrays, linked lists
- refer forward
- several possible interfaces
:::

    interface List extends Collection:
        add(i, x)  // Adds x at position i; where 0 ≤ i ≤ size.
        get(i)     // Returns the element at position i; where 0 ≤ i < size.
        set(i, x)  // Replaces the value at position i with x; where 0 ≤ i < size.
        remove(i)  // Removes the element at position i; where 0 ≤ i < size.

### Stacks

::: TODO
- Special cases of lists
- examples, use cases
- Restricted list ADTs
- makes it possible to use optimised implementations
- e.g., circular queues
- deque = double-ended queue = stack + queue
- Implementations: linked lists, dynamic arrays
:::

    interface Stack extends Collection:
        push(x)    // Pushes x on top of the stack.
        pop()      // Pops the top of the stack and returns it.
        peek()     // Returns the top element, without removing it.

### Queues

    interface Queue extends Collection:
        enqueue(x)  // Enqueues x at the end of the queue.
        dequeue()   // Dequeues the frontmost element.
        peek()      // Returns the frontmost element, without removing it.

::: TODO
- circular queues?
- double-ended queues?
:::

### Priority queues

::: TODO
- Similar API as stacks/queues, but returning different element
- sorted arrays - makes insertion expensive
- unsorted arrays - makes removal expensive
- Implementations: heaps, etc.
:::

    interface PriorityQueue extends Collection:
        add(x)       // Adds x to the priority queue.
        removeMin()  // Removes and returns the minimum element.
        getMin()     // Returns the minimum element, without removing it.

