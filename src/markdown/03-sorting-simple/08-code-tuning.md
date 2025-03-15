
## Optimizing sort algorithms with code tuning

::: TODO
- Prio 2: reduce the text about Selection sort a little
- Prio 3: are the other simple optimisations?
:::

Since sorting is such an important application, it is natural for
programmers to want to optimize their sorting code to run faster. Of
course all quadratic sorts (Insertion sort, Bubble sort and Selection
sort) are relatively slow. Each has (as the name "quadratic" suggests)
$O(n^2)$ worst case running time. The best way to speed them up is
to find a better sorting algorithm. Nonetheless, there have been many
suggestions given over the years about how to speed up one or another of
these particular algorithms. There are useful lessons to be learned
about code tuning by seeing which of these ideas actually turn out to
give better performance. It is also interesting to see the relative
performance of the three algorithms, as well as how various programming
languages compare.

### Insertion sort

We start by trying to speed up Insertion sort. Recall that Insertion
sort repeatedly moves an element toward the beginning of the sorted part
of the list until it encounters a key with lesser value. In the original
code, this is done with a series of swap operations. There is a better
alternative than continuously swapping the record to the left until a
smaller value is found. This is to move the current record to a
temporary variable, and then shift all of the records with greater value
one step to the right. Since swap requires three assignments per element
and shifting requires only one assignment per element, we can hope that
this will yield a big improvement. Of course, the amount of improvement
that we actually get will depend on how much movement there is among the
records. If the list is already nearly sorted, then there will be few
swaps anyway. Here is an implementation for Insertion sort using this
optimization.

    function insertionSortShift(A):
        N = A.size()
        for i = 1 to N-1:
            temp = A[i]
            j = i
            while j > 0 and temp < A[j-1]:
                A[j] = A[j-1]
                j = j-1
            A[j] = temp


Now, you can test whether you understand how this works.

<avembed id="insertionSortWithoutSwapPRO" src="Sorting/insertionSortWithoutSwapPRO.html" type="pe" name="Insertion Sort Without Swap Proficiency Exercise"/>


### Bubble sort

Turning to Bubble sort, the first thing we should notice from this table
is that it is far slower on random input than Insertion sort. Let's
consider a possible improvement that is sometimes suggested for Bubble
sort. That is to check during each iteration of the outer loop to see if
any swaps took place during that iteration, and quit if not (since we
know the list is ordered at this point). We can improve on this idea
even more by recognizing that if the last swap done affects the values
at positions $j-1$ and $j$, no swaps could happen to values at positions
greater than $j$. Thus, we never need to check higher-positioned values
again, which could save many iterations even if there are a few swaps
lower down. Here is code to implement this approach.


    function bubbleCheckSwap(A):
        N = A.size()
        while N > 1:
            newN = 0
            for j = 1 to N-1:
                // Check if this pair is out of order:
                if A[j-1] > A[j]:
                    swap(A, j-1, j)
                    newN = j
            N = newN


The problem with this idea is that a considerable amount of effort
(relatively speaking) is required to track the position for the last
swap within the inner loop. This tracking process has a cost, and that
cost is worthwhile only if the amount of work it saves is greater than
the amout of work that it causes. Unfortunately, as the table shows, in
the average case it just is not worth the time. Modifying the code
simply by removing the tracking steps (and so not getting either the
cost of tracking or the benefit of avoiding some of the key comparisons)
is faster in the average case. Of course, whether this is always true
will depend on how much it costs to extract the record keys and compare
them, which depends on the details of the record type and the sort
implementation. In our test implementation we are sorting integer values
and so the cost to compare records is lower than it would be if we had
to get a field out of a more complex object.

It is also true that tracking the last swap position can substantially
improve the best case cost. In fact, tracking the last swap position
makes the best case cost of Bubble sort to be only $O(n)$. But
going out of one's way to artificially improve the best case has
dubious value if doing so imposes additional cost on nearly all other
inputs. Note that we could nominally convert *any* sorting algorithm to
have a best-case cost of $O(n)$ by simply adding code at the
beginning that checks if the list is already sorted. It should be
obvious that this is a waste of time, even though it has the (small)
possibility of winning big. Unlike Insertion sort whose best case cost
is naturally $O(n)$ and whose time increases in proportion to how
"out of order" the list is, the number of iterations avoided by swap
checking in Bubble sort is sensitive to the detailed placements of the
out-of-order records. In fact, if we took a sorted list and moved the
smallest value to the end, then there would be no benefit from swap
checking whatsoever.

### Selection sort

Finally, let's consider Selection sort. The table shows foremost that
Selection sort can be viewed as a far better optimization to Bubble sort
than tracking the last swap position. That is, tracking the position of
the largest element and performing one swap to put it into place is a
far better optimization to Bubble sort than tracking the position of the
last swap seen. The table also shows that Selection sort is faster in
the average case than Insertion sort when implemented in Python.
Evidently, the cost to swap is high for Python.

Our original Selection sort implementation is written to make a call to
`swap` even if the current record is already in its correct location.
For example, if the record with the largest value is already in the
rightmost array position, then `selectionSort` will still call `swap`
with the two position parameters being the same. The net effect is that
the work done by `swap` will not change anything in the array, and this
is a waste of time. Thus, the total number of swaps done by Selection
sort is always $n-1$ in the best, average and worst cases. It might seem
like a good idea to test if the positions are the same before calling
`swap`, especially since Selection sort's claim to fame is its low
number of swaps. Actually, we can't expect this to ever make much
difference since we are talking about $O(n)$ actions within
$O(n^2)$ total steps, an inconsequential fraction. The other
consideration is whether this is could typically be expected to save
time even when just considering the time needed to do the swaps. Doing
the check to see if a swap is necessary also takes some time. It is only
worthwhile to test if the time required by the test is more than made up
for by the work saved when the unnecessary swap was avoided. For
randomly ordered input, it is probably more expensive to test this
condition before every swap than to just do the swap. If the input
records are already sorted, then all of the swaps are unnecessary and it
would be (trivially) faster to test. But in the average case, few swaps
will be saved this way and the "optimization" might actually slow down
the program (but only slightly).

For all of these sorting algorithms, the `swap` function call might be a
key part of the cost since it is called so many times. A simple way to
speed things up is to replace this function call with the code that the
function would perform. Depending on the language, compiler, and
operating system, one might expect to save between 5 and 10 percent of
the total time by doing so.

Another important consideration is the type of data object being used.
For Java, we use a simple Integer wrapper object that
supports the Comparable interface. This means that some dereferencing of
the key value from an object is required, which is a typical expectation
in a realistic application of a sorting function. However, if we were to
sort a simple array of `int` values, the cost for all sorting algorithms
will be less than half that shown. If we use a the more complicated
`KVPair` objects, the costs will more than double over those shown in
the table.

### Comparison


::: topic
#### Table: Empirical comparison {- #OptimizeTable}

Empirical comparison of proposed optimizations to quadratic sort
implementations. Each sorting algorithm is run on a random integer array
with 20,000 items. Times are in seconds.

Sort                  Java    Python
-------------------- ------- --------
**Insertion sort**
Standard              0.20      6.4
Shifting              0.16      3.5
**Bubble sort**
Standard              0.33      8.5 
Check swaps           0.32      8.9
**Selection sort**
Standard              0.23      2.8
Check swaps           0.22      2.7

:::

[The table above](#OptimizeTable) shows the relative
costs for a number of optimizations in two programming languages:
Java (version 22.0), Python (version 3.11).

The programming language that you use can have a big influence on the
runtime for a program. Perhaps the greatest distinction is whether your
language is compiled or not.
Java is normally compiled, while Python is normally interpreted.
This can make a huge difference in whether a given code change will actually
speed the program up or not. In the case of the "shift" vs "swap"
choice, shifting always turns out to be a big improvement.
This is more true for the interpreted language Python than for Java,
but still an improvement either way.
But the biggest effect that we see is that Java is around
around 20--30 times faster than Python.
