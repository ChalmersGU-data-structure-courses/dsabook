
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

<!-- OPENDSA: START -->
There are many situations, both in real life and in computing applications,
where we wish to choose the next "most important" from a collection of people, tasks, or objects.
For example, doctors in a hospital emergency room often choose to see next the "most critical"
patient rather than the one who arrived first.
When scheduling programs for execution in a multitasking operating system,
at any given moment there might be several programs (usually called *jobs*) ready to run. The
next job selected is the one with the highest priority.
<!-- OPENDSA: END -->

A *priority queue* is a data structure that stores a collection of elements where each element has an associated priority.
The key difference between priority queues and simpler structures such as stacks or queues lies in how elements are retrieved.
In a stack, the last element inserted is returned first, and in a queue, the first element inserted is returned first.
A priority queue, however, returns the element with the highest priority, regardless of when it was inserted.
In the most common version of this structure, priority is determined by the smallest value,
meaning that the smallest element is removed first.

A priority queue typically supports three main operations --
adding, removing and looking at the topmost element.
Note that these are the same kind of operations as stacks and queues,
the only difference is how the elements are ordered.
For this reason we use different names for the operations.

We also have to know how to compare the elements in the priority queue,
or in other words, how to associate each element with a priority value.
Furthermore, we have to decide what is meant with a "higher" priority:
if one element compares smaller than another, is it more or less prioritised?
There is no "correct" answer to this question, but it depends on your application.
But a common choice is to let the *smaller* element have priority --
and then we have a *minimum priority queue*.

    interface MinPriorityQueue of T extends Collection:
        add(minPQ, elem: T)      // Adds an element to the priority queue.
        removeMin(minPQ) -> T    // Removes and returns the minimum element.
        getMin(minPQ) -> T       // Returns the minimum element without removing it.

Alternatively we might want the larger value have priority,
and then we have a *maximum priority queue*.
This is not a big problem, because minimum and maximum priority queues are mirrors of each other --
the only difference is that if we compare with $<$ or with $>$.
(The operations are also called `removeMax` and `getMax`, but that goes without saying.)

Therefore, we will mainly talk about minimum priority queues in this book,
and leave as exercises for you to design everything as maximum priority queues.
More generally, it is useful to think in terms of priority rather than minimum or maximum.
In a minimum priority queue, the smallest element has the highest priority,
whereas in a maximum priority queue, the largest element has the highest priority.

::: {.example #ex:pq-sorting}
#### Example: Sorting using a priority queue

<!-- NICSMA: START -->
We can use a priority queue to make an efficient sorting algorithm.
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

<!-- NICSMA: START -->
What is the time complexity of this algorithm?
Well, for an input list of size $n$, the algorithm calls `add` $n$ times and `removeMin` $n$ times.
<!-- NICSMA: END -->
In @sec:heaps:binary-heaps we will introduce *binary heaps* where both operations take logarithmic time, $O(\log(n))$.
Therefore, if we use binary heaps, the total runtime of our sorting algorithm is $O(n \log(n))$ --
as efficient as any of the sorting algorithms we have seen so far!
:::


### Implementing priority queues using sorted lists

How can we implement priority queues?
The most natural suggestion is to use a linked list or a dynamic array, just as for stacks or queues --
but making sure that it is always kept *sorted*.
The operations for adding and removing an element become quite easy to describe:

- *add*: insert an element into the list, in its correct position.
- *removeMin*: remove the smallest element.

Since the list is sorted, removing the smallest element is straightforward.
Adding a new element is a little more tricky:
we have to traverse the list until we find the correct position, and then insert the new element there.
This is similar to how Insertion sort put one element in place (see @sec:sorting-1:insertion-sort).

If we decide to use a dynamic array, then it's best to have it *reversely sorted*,
so that the smallest element is at the back of the array.
The reason for this is that it is easier to remove elements from the back than from the front.
This is similar to how we implement a stack as a dynamic array in reverse order.

If we instead use a linked list, it should be sorted in normal order
so that the smallest element is at the front of the list.
When we add an element to this linked list, we have to traverse the list from
the head until we find the right location, and then we can squeeze in the new element.
But to be able to insert the new element we also have to remember the previous node while traversing:

    add(pq, value):
        previous = null
        current = pq.head
        while current is not null and current.value < value:
            previous = current
            current = current.next
        node = new Node(value, current)  // The new node points to current
        if previous is not null:
            previous.next = node         // Point previous to the new node...
        else:
            pq.head = node               // ...or point head if the new node is the smallest


### Analysis of the naive implementation

We have just showed how to implement a priority queue using a sorted list.
What is the complexity of the core operations?

Removing the minimum element is easy:
since the list is sorted the minimum element can be found in an instant,
and removing it is exactly the same as popping a stack,
which we already know is an efficient operation.
However, adding an element takes some time because we have to search for
the right location where to insert it.
This takes linear time in the size of the list, $O(n)$.

It is also possible to implement the priority queue as an unsorted list.
Then adding an element becomes efficient, because we can just add it at the front.
But removing the minumum now takes linear time, because we have to search for it.

Therefore a normal linear data structure, such as a *linked list* or *dynamic array*,
cannot implement a priority queue efficiently.
This is because either insertion or removal will take linear time, $O(n)$, in the worst case.
