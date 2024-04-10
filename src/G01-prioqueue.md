
# Priority queues

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

In this chapter, we will see how to implement a priority queue so that
both adding and removing the minimum take $O(\log n)$ time.

```python
class PriorityQueue(Collection):
    def add(self, x):    """Adds x to the priority queue."""
    def removeMin(self): """Removes and returns the minimum element. Raises an exception if the priority queue is empty."""
    def getMin(self):    """Returns the minimum element, without removing it. Raises an exception if the priority queue is empty."""
    # Note: __iter__() can yield the elements in any order, but the minimum element should come first.
```

```java
// Note: This is an interface, while java.util.PriorityQueue is a class
// implementing the Queue interface (so different method names)!
interface PriorityQueue<E> extends Collection<E> {
    void add(E x);  // Adds x to the priority queue.
    E removeMin();  // Removes and returns the minimum element. Raises an exception if the priority queue is empty.
    E getMin();     // Returns the minimum element, without removing it. Raises an exception if the priority queue is empty.
    // Note: iterator() can yield the elements in any order, but the minimum element should come first.
}
```



Note that this API assumes that the priority queue orders the elements
in *ascending* order. There is also the possibility of ordering in
descending order --that kind of queue is called a *maximum priority
queue*. If you have a minimum priority queue, it's straightforward to
turn it into a maximum priority queue.

Now let's look at a couple of applications of priority queues.

### Sorting

We can use a priority queue to make an efficient sorting algorithm. To
sort a list of items:

-   First create an empty priority queue, and add all the items to it.
-   Then repeatedly find and remove the smallest item. The items will
    come out in ascending order.

Here is an implementation of this algorithm in code:

```python
def pqSort(array):
    pq = MinHeap()
    # MinHeap is a class that implements the priority queue ADT;
    # we will see how it works in the next section.
    for item in array:
        pq.add(item)
    for i in range(len(array)):
        array[i] = pq.removeMin()
```

```java
public static <E extends Comparable<E>> void pqSort(E[] array) {
    // MinHeap is a class that implements the priority queue ADT;
    // we will see how it works in the next section.
    PriorityQueue<E> pq = new MinHeap<E>();
    for (E item : array)
        pq.add(item);
    for (int i = 0; i < array.length; i++)
        array[i] = pq.removeMin();
}
```



What is the time complexity of this algorithm? Well, for an input list
of size $n$, the algorithm calls `add` $n$ times and `removeMin` $n$
times. In a binary heap, `add` and `removeMin` both take $O(\log n)$
time. Therefore, the total runtime is $O(n \log n)$ -- as efficient as
any of the sorting algorithms we have seen so far!

### Finding the top 100 items

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

```python
class Top100Transactions:
    # Assume that the Transaction class implements comparisons
    # by comparing the value of the transaction.
    def __init__(self):
        self.pq = MinHeap()

    # Add a new transaction to the priority queue.
    def add(transaction):
        pq.add(transaction)
        # If the priority queue grows to 101 transactions,
        # cut it down to 100 by removing the smallest-valued one.
        if pq.size() > 100:
            pq.removeMin()

    # Return the top 100 transactions.
    def top100():
        return pq.iterator()
```

```pseudocode
class Top100Transactions
    // Assume that the Transaction class implements comparisons
    // by comparing the value of the transaction.
    pq : PriorityQueue(Transaction) = new MinHeap()

    // Add a new transaction to the priority queue.
    add(transaction:Transaction)
        pq.add(transaction)
        // If the priority queue grows to 101 transactions,
        // cut it down to 100 by removing the smallest-valued one.
        if pq.size() > 100
            pq.removeMin()

    // Return the top 100 transactions.
    top100() : Iterator(Transaction)
        return pq.iterator()
```

```java
class Top100Transactions {
    // Assume that the Transaction class implements Comparable
    // by comparing the value of the transaction.
    private PriorityQueue<Transaction> pq = new MinHeap<>();

    // Add a new transaction to the priority queue.
    public void add(Transaction transaction) {
        pq.add(transaction);
        // If the priority queue grows to 101 transactions,
        // cut it down to 100 by removing the smallest-valued one.
        if (pq.size() > 100)
            pq.removeMin();
    }

    // Return the top 100 transactions.
    public Iterator<Transaction> top100() {
        return pq.iterator();
    }
}
```



What is the complexity of `add`? Well, in fact it takes constant time,
because the priority queue has a constant maximum size of 100 elements.
If we generalize this problem to keeping track of the top $k$
transactions, then the complexity of `add` is $O(\log k)$.
