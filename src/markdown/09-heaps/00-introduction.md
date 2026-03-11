# Priority queues and heaps {#heaps}

A priority queue is a data structure that stores a collection of elements where each element has an associated priority.
The key difference between priority queues and simpler structures such as stacks or queues lies in how elements are retrieved.
In a stack, the last element inserted is returned first, and in a queue, the first element inserted is returned first.
A priority queue, however, returns the element with the highest priority, regardless of when it was inserted.
In the most common version of this structure, priority is determined by the smallest value, meaning that the smallest element is removed first.

A priority queue typically supports three main operations:

    interface PriorityQueue of T extends Collection:
        add(x: T)         // Adds x to the priority queue
        removeMin() -> T  // Removes and returns the minimum element
        getMin() -> T     // Returns the minimum element without removing it

Any implementation of this interface must be able to compare elements of type `T`, since the ordering between elements determines their priority.
The way elements are compared defines what we mean by the 'smallest' element.
For example, if a priority queue stores integers, we may use the natural ordering of numbers.
In this case, smaller numbers have higher priority than larger ones.
A priority queue that uses this ordering is called a minimum priority queue.
If we instead reverse the natural order of the elements, we obtain a maximum priority queue, where larger elements have higher priority.
In such cases, the methods are sometimes renamed to `removeMax()` and `getMax()` instead of `removeMin()` and `getMin()`.

More generally, it is useful to think in terms of priority rather than minimum or maximum.
In a minimum priority queue, the smallest element has the highest priority, whereas in a maximum priority queue, the largest element has the highest priority.

#### Applications of priority queues

Priority queues are particularly useful when tasks must be processed according to their urgency or importance rather than their arrival time.
One example is resource management.
Suppose several processes need access to a shared resource, such as CPU time.Each process may have a priority level, and the scheduler must always choose the highest-priority process next.

Another example is a hospital emergency room system.
Patients arrive at different times, but they are not necessarily treated in that order.
Instead, patients with the most severe conditions are treated first.
A priority queue can efficiently manage this kind of situation.

#### Designing an efficient priority queue

The central challenge in implementing a priority queue is choosing a data representation that supports all operations efficiently.
To motivate the optimal solution, it helps to first consider simpler alternatives and understand their limitations.

Using an unsorted array:

:   One straightforward approach is to store the elements in a dynamic array without maintaining any particular order:

    * Inserting an element is easy, simply append it to the end of the array: $O(1)$
    * To find the minimum element, however, the entire array must be scanned: $O(n)$
    * Deleting the minimum also requires scanning the array to find it and then removing it: $O(n)$

    This approach makes insertion very fast, but finding or removing the smallest element becomes expensive.

Using a sorted array:

:   In @sec:priority-queues we introduced priority queues and discussed how to implement them using sorted lists.
    The smallest element is always located at the beginning of the array.
    Finding the minimum therefore takes O(1) time.
    However, insertion becomes expensive because the new element must be inserted at the correct position, which requires shifting elements.

    * Insert: $O(n)$
    * Find minimum: $O(1)$
    * Delete minimum: $O(n)$ (removing the first element requires shifting the rest)

    In this case, retrieving the smallest element is efficient, but updates to the structure are costly.

Using a reverse-sorted array:

:   A slight improvement is to store elements in reverse sorted order, so the smallest element appears at the end of the array.
    This allows deletion of the smallest element to be very efficient:

    * Insert: $O(n)$ (must still insert in correct position)
    * Find minimum: $O(1)$
    * Delete minimum: $O(1)$

    Although deletion is now fast, insertion still requires linear time, which is not ideal for large datasets.

A normal linear data structure, such as a [linked list]{.term} or [dynamic array]{.term}, cannot implement a priority queue efficiently.
This is because either insertion or removal will take linear time, $O(n)$, in the worst case.
In this chapter we will see how to use _binary trees_ to implement a much more efficient version of priority queues.
