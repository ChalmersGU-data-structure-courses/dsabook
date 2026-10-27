
## Priority queues {#ADTs:priority-queues}

::: TODO
- Prio 1: shorten the text in the beginning
- Prio 1: add forward-reference to chapter 10 Heaps
- Prio 1: change title and beginning of:
    - "Implementing priority queues using sorted lists": it must be clear that this is a bad implementation
    - "Analysis of the naive implementation"
- Prio 2: add a good short example using prio.queues
- Prio 1: rewrite OpenDSA text
:::

A *priority queue* is a data structure that stores a collection of elements
where each element has an associated priority.
Just like stacks and queues, priority queues supports three main operations --
adding, removing and looking at the topmost element.

Where a stack removes the most recently added element first, and a queue removes the oldest,
a priority queue removes the element with the highest priority, regardless of when it was inserted.
Most commonly, priority is determined by
the smallest value using a comparison function, meaning that the smallest element is removed first.
This is called a *minimum priority queue*:

    interface MinPriorityQueue of T extends Collection:
        add(minPQ, elem: T)      // Adds an element to the priority queue.
        removeMin(minPQ) -> T    // Removes and returns the minimum element.
        getMin(minPQ) -> T       // Returns the minimum element without removing it.

Alternatively we might want the larger value have priority,
and then we have a *maximum priority queue*.
This is not a big problem, because minimum and maximum priority queues are mirrors of each other --
the only difference is if we compare with $<$ or with $>$.
The operations are also called `removeMax` and `getMax`, but that goes without saying.

More generally, it is useful to think in terms of priority rather than minimum or maximum.
In a minimum priority queue, the smallest element has the highest priority,
whereas in a maximum priority queue, the largest element has the highest priority.

::: {.example #ex:pq-sorting}
#### Example: Sorting using a priority queue

<!-- NICSMA: START -->
We can use a priority queue to make a sorting algorithm.
To sort a list of items:

-   First create an empty priority queue, and add all the items to it.
-   Then repeatedly find and remove the smallest item. The items will come out in increasing order.

Here is an implementation of this algorithm in code:
<!-- NICSMA: END -->

    pqSort(arr):
        pq = new MinPriorityQueue()
        for each item in arr:
            add(pq, item)
        for i in 0 .. arr.size-1:
            arr[i] = removeMin(pq)

What is the time complexity of this algorithm?
Well, for an input list of size $n$, the algorithm calls `add` $n$ times and `removeMin` $n$ times.
That means if both `add` and `removeMin` are logarithmic time or faster, the whole function is $O(n log n)$, just as fast as the best sorting algorithms we have seen!
:::


### Priority queue using a sorted list?

For stacks and queues, we managed to implement adding and removing in constant time.
This is not possible for priority queues, if it was, the sorting algorithm in
[]@ex:pq-sorting would outperform both Quicksort and Mergesort.
It is possible to have logarithmic time for the operations, and in [Chapter @sec:heaps] we show you how,
but for now let us see why the data structures we have seen so far are not fast enough.

If asked how to implement a priority queue, the first thing that comes to mind
is probably a sorted list -- either a linked list or a dynamic array with an
ordering invariant, we make sure that it is always kept *sorted*.
The operations for adding and removing an element become quite easy to describe:

- *add*: insert an element into the list, in its correct position.
- *removeMin*: remove the smallest element.

Since the list is sorted, finding and removing the smallest element is straightforward.
Adding a new element is a little more tricky:
we have to traverse the list until we find the correct position, and then insert the new element there.
This is similar to how Insertion sort put one element in place (see @sec:sorting-1:insertion-sort).

If we decide to use a dynamic array, then  best to have  *reversely sorted*,
so that the smallest element is at the back of the array.
The reason for this is that it is faster to remove elements from the back than from the front.
This is similar to how we implement a stack as a dynamic array in reverse order.

If we instead use a linked list, it should be sorted in normal order
so that the smallest element is at the front of the list.
When we add an element to the linked list, we have to traverse the list from
the head until we find the right location, and then we can squeeze the new element in.
Here is pseudocode for inserting a value into a sorted linked list:

    add(pq : Node, newValue)
        if pq is null or newValue < pq.value:
            return new Node(newValue, pq)    // newValue should be first in the list
        while(pq.next is not null and pq.next.value < newValue:
            pq = pq.next
        pq.next = new Node(newValue, pq.next) // insert newValue between pq and pq.next


### Analysis of the naive implementation

If implementing a priority queue using a sorted list, what is the complexity of the core operations?

Removing the minimum element is easy:
since the list is sorted, it is the same as popping a stack,
which we already know is an efficient operation.
However, adding an element takes some time
For a linked list, we have to search for the correct location to insert the element.
For an array, the we can use linear search, but we still have to shift all elements by one position.
In the worst case, both these operations take linear time in the size of the list, $O(n)$.

It is also possible to implement the priority queue as an unsorted list.
Then adding an element becomes efficient, because we can just add it at the front.
But removing the minimum now takes linear time, because we have to search for it.

Therefore a normal linear data structure, such as a *linked list* or *dynamic array*,
cannot implement a priority queue efficiently.
