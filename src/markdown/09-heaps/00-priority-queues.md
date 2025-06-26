# Priority queues and heaps

In section XX we introduced priority queues and showed how to implement them using sorted lists.
However, this is not a very good implementation, because inserting elements into the sorted list is linear, $O(n)$, in the worst case.

In this chapter we will see how to use binary trees to implement a much more efficient version of priority queues.

Recall that the API for a *minumum* priority queue only consists of the following methods:

    interface PriorityQueue of T extends Collection:
        add(x: T)         // Adds x to the priority queue.
        removeMin() -> T  // Removes and returns the minimum element.
        getMin() -> T     // Returns the minimum element, without removing it.

Also recall that there is a mirrored variant, called a *maximum* priority queue, with the only difference being that it uses the methods `removeMax` and `getMax` instead of the previous ones.

In this chapter we will switch between talking about minimum and maximum priority queues.
Note that it is always easy to convert between the two kinds of implementations:
just replace any comparison (e.g., < or ≥) with its counterpart (e.g., > or ≥, respectively).

In general, we will try to use the term *priority* instead of minimum or maximum:
in a minumum priority queue, the smallest element is the one with the highest priority,
wheras in a maximum priority queue, it's the largest element.
