
## Empirical analysis and code tuning

::: TODO
- Prio 3: are the other simple optimisations?
:::

Since sorting is such an important application, it is natural for
programmers to want to optimise their sorting code to run faster. Of
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

### Empirical comparison

To see which algorithm is the best, we implemented them in both Java and Python.
In addition, we implemented one proposed optimisation for each of them.

Each algorithm is run on random integer arrays of sizes 10,000 to 80,000, and the times reported are in seconds.
This will give an indication of the *average* running time for the algorithms
(provided that the elements are distributed uniformly -- recall the problems with average-case analysis, discussed in @sec:the-problem-with-average-case).

Sort                   Python (10k)     Python (20k)     Java (20k)     Java (40k)     Java (80k)
-------------------- ---------------- ---------------- -------------- -------------- ---------------
**Bubble sort**
Standard                    2.1            8.4              0.3            1.3            5.7
Optimised                   2.2            8.6              0.3            1.3            5.6
**Selection sort**
Standard                    0.7            2.7              0.2            1.0            3.9
Optimised                   0.7            2.7              0.2            1.0            4.0
**Insertion sort**
Standard                    1.6            6.3              0.2            0.7            2.9
Optimised                   0.8            3.3              0.2            0.6            2.4

Here are some general observations from this table:

- The algorithms become (roughly) 4 slower when we double the size of the array.
  This is of course what we should expect, since the algorithms have quadratic complexity.

- The programming language that you use can have a big influence on the runtime.
  The greatest distinction is whether your language is compiled or not, and Java is compiled, while Python is interpreted.
  From the table we can see that Java is 20--30 times faster than Python.

- Bubble sort is always the slower than the other two algorithms.

- It is unclear which of Selection sort or Insertion sort is the best.
  In Python it seems like Selection sort wins, which suggests that assignment is more expensive than comparison, compared to Java.

- The optimisations for Bubble sort and Selection sort seems to not have any substantial effect, but the one for Insertion sort is good.
  We will discuss these optimisations in more detail below.


### Optimising Bubble sort

One possible improvement that is sometimes suggested for Bubble sort,
is to check during each iteration of the outer loop to see if
any swaps took place during that iteration, and quit if not (since we
know the list is ordered at this point). We can improve on this idea
even more by recognising that if the last swap done affects the values
at positions $j-1$ and $j$, no swaps could happen to values at positions
greater than $j$. Thus, we never need to check higher-positioned values
again, which could save many iterations even if there are a few swaps
lower down. Here is code to implement this approach.

    function bubbleCheckSwap(A):
        N = A.size
        while N > 1:
            newN = 0
            for j in 1 .. N-1:
                // Check if this pair is out of order:
                if A[j-1] > A[j]:
                    swap(A, j-1, j)
                    newN = j
            N = newN

Unfortunately, as can be seen in the table, this doesn't improve the timings. Why not?

The problem is that a considerable amount of effort
(relatively speaking) is required to track the position for the last
swap within the inner loop.
That is, keeping the variable `newN` updated.
This tracking process has a cost, and that
cost is worthwhile only if the amount of work it saves is greater than
the amout of work that it causes. But as the table shows, in
the average case it just is not worth the time.
Keeping the variables `newN` updated simply takes too much time.

One could argue that the optimisation might be worthwile if we knew that the arrays were almost sorted
(in the same way that Insertion sort gets faster the more sorted the array is).
However, unlike Insertion sort we only get an improvement in some very few almost-sorted cases.
Bubble sort with swap-checking is sensitive to the detailed placements of the
out-of-order elements. In fact, if we took a sorted list and moved the
smallest value to the end, then there would be no benefit from swap
checking whatsoever.

Therefore, we can conclude that this optimisation is not worth it.

### Optimising Selection sort

Our original Selection sort implementation is written to make a
swap even if the current element is already in its correct location.
For example, if the smallest element is already
leftmost in the array, then `selectionSort` will still call `swap`
with the two position parameters being the same.
I.e., it will call `swap(A,i,i)`, which has no effect whatsoever, except wasting some time.
Thus, the total number of swaps done by Selection
sort is always $n-1$ in the best, average and worst cases. It might seem
like a good idea to test if the positions are the same before calling
`swap`, especially since Selection sort's claim to fame is its low
number of swaps.

However, as is clear from the experiments, this doesn't have any effect at all.
Actually, we shouldn't have expected this to make any big
difference since we are only talking about $O(n)$ swaps in any case.
Selection sort makes $O(n^2)$ comparisons, which quickly outnumbers the number of swaps,
so removing one single swap is not worth it.

### Optimising Insertion sort

Finally, we try to speed up Insertion sort. Recall that Insertion
sort repeatedly moves an element toward the beginning of the sorted part
of the list until it encounters a key with lesser value. In the original
code, this is done with a series of swap operations. There is a better
alternative than continuously swapping the element to the left until a
smaller value is found. This is to move the current element to a
temporary variable, and then shift all of the elements with greater value
one step to the right. Here is an implementation for Insertion sort using this
optimisation.

    function insertionSortShift(A):
        N = A.size
        for i in 1 .. N-1:
            temp = A[i]
            j = i
            while j > 0 and temp < A[j-1]:
                A[j] = A[j-1]
                j = j-1
            A[j] = temp

In this case the optimisation actually is a substantial improvement.
The reason is that swapping requires three assignments per element and shifting requires only one assignment per element.
Of course, the amount of improvement that we actually get will depend on how much movement there is among the elements.
If the list is already nearly sorted, then there will be few swaps anyway.

The experiments show that the improvement is greater in Python (around twice as fast) than in Java (around 20% faster).
This is consistent with the results for Selection sort, where we concluded that assignment is probably more expensive in Python than in Java.

::: dsvis
Now, you can test whether you understand how this optimisation works.

<avembed id="insertionSortWithoutSwapPRO" src="Sorting/insertionSortWithoutSwapPRO.html" type="pe" name="Insertion Sort Without Swap Proficiency Exercise"/>
:::

