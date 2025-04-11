
## ADT: Priority queues

::: TODO
- Prio 1: invariants
:::

So far we have seen two [ADTs](#adt){.term} that
represent a collection of objects, and support adding and removing
objects:

-   [Stacks](#stack){.term}, where the object
    removed is always the one *most recently* inserted
    ([LIFO]{.term}).
-   [Queues](#queue){.term}, where the object
    removed is always the one *first* inserted ([FIFO]{.term}).

There are many situations, both in real life and in computing
applications, where we wish to choose the next "most important" from a
collection of people, tasks, or objects. For example, doctors in a
hospital emergency room often choose to see next the "most critical"
patient rather than the one who arrived first. When scheduling programs
for execution in a multitasking operating system, at any given moment
there might be several programs (usually called
[jobs](#job){.term}) ready to run. The next job
selected is the one with the highest [priority]{.term}. Priority is indicated by a particular value associated
with the job (and might change while the job remains in the wait list).

When a collection of objects is organized by importance or priority, we
call this a [priority queue]{.term}. A priority
queue supports the following operations:

-   adding a new object to the priority queue
-   removing the *smallest* object from the priority queue.


### ADT for priority queues

In this chapter, we will see how to implement a priority queue so that
both adding and removing the minimum take $O(\log n)$ time.

    interface PriorityQueue of T extends Collection:
        add(x: T)         // Adds x to the priority queue.
        removeMin() -> T  // Removes and returns the minimum element.
        getMin() -> T     // Returns the minimum element, without removing it.

Note that this API assumes that the priority queue orders the elements
in *ascending* order. There is also the possibility of ordering in
descending order -- that kind of queue is called a *maximum priority
queue*. If you have a minimum priority queue, it's straightforward to
turn it into a maximum priority queue.


### Invariants


### Use cases

Now let's look at a couple of applications of priority queues.


::: topic
#### Example: Sorting {-}

We can use a priority queue to make an efficient sorting algorithm. To
sort a list of items:

-   First create an empty priority queue, and add all the items to it.
-   Then repeatedly find and remove the smallest item. The items will
    come out in ascending order.

Here is an implementation of this algorithm in code:

    function pqSort(A):
        pq = new PriorityQueue()
        for each item in A:
            pq.add(item)
        for i in 0 .. A.size-1:
            A[i] = pq.removeMin()

What is the time complexity of this algorithm? Well, for an input list
of size $n$, the algorithm calls `add` $n$ times and `removeMin` $n$
times. In a binary heap, `add` and `removeMin` both take $O(\log n)$
time. Therefore, the total runtime is $O(n \log n)$ -- as efficient as
any of the sorting algorithms we have seen so far!
:::


::: topic
#### Example: Finding the top 100 items {-}

Suppose that we are running a bank. Every day, every transaction that
occurs at the bank is recorded in a list. When the bank closes at the
end of the day, we would like to find the 100 highest-valued
transactions from that day. How can we do it?

One way is to use sorting. If we store the transactions in an array and
sort it by value, then the highest-value transactions will be at the end
of the array. If there are *n* transactions in total, then transactions
number $n-100\ldots n-1$ are the ones we need. If we use an efficient
sorting algorithm, this will take $O(n \log n)$ time. (More generally,
this gives us an algorithm for finding the largest $k$ items in a list
of $n$ items, in $O(n \log n)$ time.)

Now suppose that we want to monitor the transactions *throughout* the
day. At any point, we want to be able to find the 100 highest-valued
transactions *so far* today. How can we do this?

We could still use the sorting approach, but we would need to sort the
list of transactions *every time* we wanted to find the 100 top
transactions. This may be prohibitively expensive if there are a lot of
transactions: it takes $O(n \log n)$ time every time we do it.

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
If we generalize this problem to keeping track of the top $k$
transactions, then the complexity of `add` is $O(\log k)$.
:::


### Implementing priority queues using sorted lists

::: TODO
- both linked lists and (dynamic) array
- array implementation = insert from insertion sort
- problems: O(n) insertion
:::

