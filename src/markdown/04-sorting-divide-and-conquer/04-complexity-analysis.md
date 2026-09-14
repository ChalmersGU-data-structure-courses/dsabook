
## Complexity analysis {#sorting-2:complexity}

::: TODO
- Prio 1: new section, rewrite text
:::

### Mergesort complexity {#sorting-2:mergesort-complexity}

How efficient is Mergesort?
Recall that Selection and Insertion sort are quadratic, $O(n^2)$,
because they use two nested for loops, each of them linear.

The analysis is actually not trivial because Mergesort is a recursive algorithm,
and reasoning about recursion is difficult in general.
However, we can visualise how Mergesort works in a way that will make the complexity clearer.

#### If the size is a power of two

First, let us assume that the array consists of exactly $n = 2^k$ elements.
In the first recursive call it will split this array into two with $2^{k-1}$ elements each.
Both of these will be split into two arrays each, so $2\times 2 = 4$ arrays of size $2^{k-2}$.
And these will in turn be split into $2\times 2\times 2=2^3$ arrays of size $2^{k-3}$,
until in the end we have $2^k$ arrays with only one element.

Now, when we have reached the base case, we can start merging the smaller arrays.
First each pair of the $2^k$ singleton arrays are merged into two-element arrays.
Then each pair of these $2^{k-1}$ two-element arrays are merged into 4-element arrays.
Then each pair of these $2^{k-2}$ 4-element arrays are merged, and so on.
In the end we will merge two arrays of size $2^{k-1}$ into the final sorted array.

Note that each of these levels contain exactly $n = 2^k$ elements -- the size of each level is the same!
So how does this relate to complexity?

-   First we recall that merging is more expensive than splitting, so it is enough to only analyse the merging steps.
-   What is the complexity of merging two arrays of size $m$?
    Note that in each iteration we increase one of the pointers,
    so when both pointers have reached the end, we have executed $m+m$ iterations.
    So merging is linear, $O(m)$.
-   In each level $r$ we merge $2^r$ arrays, each of size $2^{k-r}$.
    So the total complexity of merging one level is $O(2^r \cdot 2^{k-r})$.
    And since $2^r \cdot 2^{k-r} = 2^k$, we get $O(2^k)$.
-   We have in total $k$ levels, so in the end we get the final complexity $O(k \cdot 2^k)$.

But wait, does this mean that Mergesort is exponential?
No, definitely not!
Recall that $k$ is not the size of the original array -- the size $n$ is $2^k$,
and therefore $O(k) = O(\log_2(n)) = O(\log(n))$.
So we get the following final complexity in the size of the array: $O(n\log(n))$

The linearithmic complexity of Mergesort is much much faster than the algorithms from [Chapter @sec:sorting-1],
which are all quadratic, $O(n^2)$.
In fact, $O(n\log(n))$ is in practice almost linear, because $\log(n)$ grows so much slower than any polynomial function.

::: dsvis
This visualisation provides a running time analysis for Mergesort.

``` {.jsav-animation src="Sorting/MergeSortAnalysisCON.js" links="Sorting/MergeSortAnalysisCON.css" name="Mergesort Analysis Slideshow"}
```
:::

#### Complexity for arbitrary array sizes

In our analysis we assumed that we had exactly $n = 2^k$ elements, so what if the array size is not a power of two?
Let us assume that the array has $n'$ elements, where $\frac{n}{2}<n'<n$.
Since $n=2^k$ is a power of two, then $\frac{n}{2}=2^{k-1}$ is also a power of two.
Our analysis above concluded that the complexity of sorting a size $n=2^k$ array is $O(n\log(n))$.
Now, since $\frac{n}{2}=2^{k-1}$ is also a power of two, the same analysis gives the complexity
of sorting a size $\frac{n}{2}$ array to be $O(\frac{n}{2}\log(\frac{n}{2}))$.
But this can be simplified to $O(n\log(n))$, because we can ignore constant factors inside big-$O$.

And since sorting arrays of size $\frac{n}{2}$ and $n$ both have the same complexity,
then that must be true for all array sizes in between, $\frac{n}{2}<n'<n$.

@Fig:mergesort-split-merge shows an example where we sort an array with $n=11$ elements.
Note that the last level is $k=4$, and $2^{k-1}<11<2^k$.
Also note that not all levels are completely full with $n$ elements, but this does not change the overall complexity.


### Quicksort complexity {#sorting-2:quicksort-complexity}

To analyse Quicksort, we first analyse the functions for finding the pivot and partitioning an interval of length $k$.
All the pivot selection strategies above take constant time for any $k$, so
the total cost of partitioning is constrained by how far the lower and upper pointers can move towards each other.

-   In each step of the `while`-loop, either *low* or *high* (or both) moves one step.
-   Since the pointers always move towards each other, it will take at most $k$ steps until they meet.
-   So, the running time of the partition function is $O(k)$.


::: dsvis
Here is a visualisation illustrating the running time analysis of the partition function.

``` {.jsav-animation src="Sorting/QuickSortPartitionAnalysisCON.js" links="Sorting/QuickSortPartitionAnalysisCON.css" name="Quicksort Partition Analysis Slideshow"}
```
:::

#### Worst-case complexity

Quicksort's worst case will occur when the pivot does a poor job of breaking the array,
that is, when one partition becomes empty, and the other contains $n-1$ elements.

-   The pivot partitions the array into two parts:
    one of size $0$ and the other of size $n-1$.
    This requires $n-1$ units of work.
-   In the second level, the pivot breaks it into two parts:
    one of size $0$ and the other of size $n-2$.
    This requires $n-2$ units of work.
-   In the third level, the pivot breaks it into two parts:
    one of size $0$ and the other of size $n-3$.
    This requires $n-3$ units of work.
-   And so on until the last level, where the pivot breaks a partition of size $2$ into two parts:
    one of size $0$ and the other of size $1$.
    This requires a single unit of work.

Thus, the total amount of work is determined by the summation:

$$
\sum_{i=1}^{n} i = \frac{1}{2} n (n-1) \; \in \; O(n^2)
$$

::: dsvis
This visualisation explains the worst-case running time of Quicksort

``` {.jsav-animation src="Sorting/QuickSortWorstCaseCON.js" links="Sorting/QuickSortWorstCaseCON.css" name="Quicksort Worst Case Analysis Slideshow"}
```
:::

So, the worst case running time of Quicksort is $O(n^2)$.
<!-- OPENDSA: START -->
This is terrible, no better than Insertion or Selection sort.
When will this worst case occur?
Only when each pivot yields a bad partitioning of the array.
If the pivot values are selected at random, then this is extremely unlikely to happen.
<!-- OPENDSA: END -->
If we instead always select the middle element in the interval, it is still unlikely to happen *on well-behaved data*.
It does not take many good partitionings for Quicksort to work fairly well.

#### Best-case complexity

In @sec:analysis-1:complexity-cases we argued why we usually are not interested in the best-case complexity,
but Quicksort is an exception to this.
It is interesting and useful to analyse the best-case complexity of Quicksort,
because the best case is so much more common than the worst case (in normal circumstances).
The very best case occurs if we always selects the best possible pivot,
which is the one that always partitions the array into equal-sized parts.

-   The pivot partitions the array into two halves of size $n/2$ each.
    This requires $O(n)$ amount of work.
-   For each of the two partitions, the pivot breaks it into halves of size $n/4$ each.
    This requires $O(n)$ amount of work.
-   For each of the four partitions, the pivot breaks it into halves of size $n/8$ each.
    This requires $O(n)$ amount of work.
-   And so on until the last level, where we reach $n$ partitions each of size $1$.
    This requires $O(n)$ amount of work.

Note that this is exactly the same reasoning as for Mergesort.
Thus, for each level, all partition steps for that level do a total of $O(n)$ work.
And if we always can find the perfect pivot, there will be only $\log_2(n)$ levels.
So the best-case running time of Quicksort is $O(n \log(n))$.

::: dsvis
This visualisation explains the best-case running time of Quicksort

``` {.jsav-animation src="Sorting/QuickSortBestCaseCON.js" links="Sorting/QuickSortBestCaseCON.css" name="Quicksort Best Case Analysis Slideshow"}
```
:::

#### Average-case complexity

<!-- OPENDSA: START -->
Quicksort's average-case behaviour falls somewhere between the extremes of worst and best case.
Average-case analysis considers the cost for all possible arrangements of input,
<!-- OPENDSA: END -->
and calculates the average cost, weighted by how the data is distributed.
As we already discussed in @sec:analysis-1:complexity-cases,
the average case is extremely difficult to reason about,
because real-world data does not usually have an even distribution.

For Quicksort it is possible to show that the number of "bad" cases are quickly outnumbered
by the number of "good" cases, when the array size grows.
This means that for *well-behaved* input, the average-case complexity of Quicksort
is very likely to be closer to the best case than the worst case.
In fact, if we select a *random pivot* in every step,
then we can prove that the *expected* worst-case complexity is linearithimc, $O(n\log(n))$.

::: dsvis
#### Inferring the complexity with a random pivot

If we use a random pivot, then at every step,
the pivot is equally likely to end in any position in the array.
In other words, the pivot is equally likely to break an array
into partitions of sizes $0$ and $n-1$, or $1$ and $n-2$, and so on.
Now the average-case cost $T(n)$ can be computed from the following equation:

\begin{align*}
T(n) &= cn + \frac{1}{n}\sum_{k=0}^{n-1}[T(k) + T(n - 1 - k)]
\\
T(0) = T(1) &= c
\end{align*}

The equation above is a *recurrence relation*, and we will discuss those in more detail in @sec:analysis-3:recurrences.
This visualisation will help you to understand how the recurrence relation was formed.

``` {.jsav-animation src="Sorting/QuickSortAverageCaseCON.js" links="Sorting/QuickSortAverageCaseCON.css" name="Quicksort Average Case Analysis Slideshow"}
```
:::

