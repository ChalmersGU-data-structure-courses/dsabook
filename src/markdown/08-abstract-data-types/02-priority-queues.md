
## Priority queues

::: TODO
- Prio 2: add a better & shorter version of the top-100 example
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
Of this reason we use different names for the operations.

We also have to know how to compare the elements in the priority queue,
or in other words, how to associate each element with a priority value.
Furthermore, we have to decide what is meant with a "higher" priority:
if one element compares smaller than another, is it more or less prioritised?
There is no "correct" answer to this question, but it depends on your application.
But a common choice is to let the *smaller* element have priority --
and then we have a *minimum priority queue*

    interface MinPriorityQueue of T extends Collection:
        add(elem: T)      // Adds an element to the priority queue.
        removeMin() -> T  // Removes and returns the minimum element.
        getMin() -> T     // Returns the minimum element without removing it.

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

::: example
#### Example: Sorting

<!-- NICSMA: START -->
We can use a priority queue to make an efficient sorting algorithm.
To sort a list of items:

-   First create an empty priority queue, and add all the items to it.
-   Then repeatedly find and remove the smallest item. The items will come out in ascending order.

Here is an implementation of this algorithm in code:
<!-- NICSMA: END -->

    pqSort(array):
        pq = new PriorityQueue()
        for each item in array:
            pq.add(item)
        for i in 0 .. array.size-1:
            array[i] = pq.removeMin()

<!-- NICSMA: START -->
What is the time complexity of this algorithm?
Well, for an input list of size $n$, the algorithm calls `add` $n$ times and `removeMin` $n$ times.
In @sec:binary-heaps we will introduce *binary heaps* where both operations take logarithmic time, $O(\log(n))$.
Therefore, if we use binary heaps, the total runtime of our sorting algorithm is $O(n \log(n))$ --
as efficient as any of the sorting algorithms we have seen so far!
<!-- NICSMA: END -->
:::

<!--
::: example
#### Example: Finding the top 100 items

Suppose that we are running a bank. Every day, every transaction that
occurs at the bank is recorded in a list. When the bank closes at the
end of the day, we would like to find the 100 highest-valued
transactions from that day. How can we do it?

One way is to use sorting. If we store the transactions in an array and
sort it by value, then the highest-value transactions will be at the end
of the array. If there are *n* transactions in total, then transactions
number $n-100\ldots n-1$ are the ones we need. If we use an efficient
sorting algorithm, this will take $O(n \log(n))$ time. (More generally,
this gives us an algorithm for finding the largest $k$ items in a list
of $n$ items, in $O(n \log(n))$ time.)

Now suppose that we want to monitor the transactions *throughout* the
day. At any point, we want to be able to find the 100 highest-valued
transactions *so far* today. How can we do this?

We could still use the sorting approach, but we would need to sort the
list of transactions *every time* we wanted to find the 100 top
transactions. This may be prohibitively expensive if there are a lot of
transactions: it takes $O(n \log(n))$ time every time we do it.

We can do better with the help of a priority queue. The idea is to have
a priority queue that holds the *100 highest-value transactions* only.
Whenever a new transaction comes in, we need to update the priority
queue accordingly:

1.  If the priority queue has fewer than 100 transactions (i.e. there
    have been fewer than 100 transactions so far today), then add the
    new transaction to the priority queue.
2.  Otherwise, if the new transaction is *greater in value than the
    lowest-valued of the top 100 transactions*, then remove that
    transaction and add the new transaction.
3.  Otherwise, don't add the new transaction to the priority queue
    (it's not in the top 100).

Notice that in step 2, we are comparing the new transaction to the
*lowest-valued* of the top 100 transactions -- if the transactions are
ordered by value, then this transaction can be found by calling
`getMin`, and removed using `removeMin`. So this algorithm can be
implemented efficiently using a priority queue.

In fact, we can simplify these three steps into two steps. First, we add
the new transaction to the priority queue. This might make the priority
queue grow to 101 transactions. If so, we remove the lowest-valued
transaction. Here it is in code:

    datatype Top100Transactions:
        pq = new PriorityQueue()
        // Assume that the Transaction type implements comparisons
        // by comparing the value of the transaction.

        // Add a new transaction to the priority queue.
        add(transaction):
            pq.add(transaction)
            // If the priority queue grows to 101 transactions,
            // cut it down to 100 by removing the smallest-valued one.
            if pq.size > 100:
                pq.removeMin()

        // Return the top 100 transactions.
        top100():
            return everything in pq


What is the complexity of `add`? Well, in fact it takes constant time,
because the priority queue has a constant maximum size of 100 elements.
If we generalise this problem to keeping track of the top $k$
transactions, then the complexity of `add` is $O(\log(k))$.
:::
-->
