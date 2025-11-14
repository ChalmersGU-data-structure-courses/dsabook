
## Quicksort

::: TODO
- Prio 1: invariants
- Prio 2: make the text more coherent
:::

While Mergesort uses the most obvious form of divide and conquer (split
the list in half then sort the halves), this is not the only way that we
can break down the sorting problem. We saw that doing the merge step for
Mergesort when using an array implementation is not so easy. So perhaps
a different divide and conquer strategy might turn out to be more
efficient?

[Quicksort]{.term} is aptly named because, when
properly implemented, it is one of the fastest known general-purpose
in-memory sorting algorithms in the average case. It does not require
the extra array needed by Mergesort, so it is space efficient as well.
Quicksort is widely used, and is typically the algorithm implemented in
a library sort routine such as the UNIX `qsort` function. Interestingly,
Quicksort is hampered by exceedingly poor worst-case performance, thus
making it inappropriate for certain applications.

Quicksort first selects a value called the [pivot]{.term}. Assume that the input array contains $k$ records with key
values less than the pivot. The records are then rearranged in such a
way that the $k$ values less than the pivot are placed in the first, or
leftmost, $k$ positions in the array, the pivot itself is placed at
index $k$, and the values greater than or equal to the pivot are placed
in the last, or rightmost, $n-k-1$ positions. This is called a
[partition]{.term} of the array. The values
placed in a given partition need not (and typically will not) be sorted
with respect to each other. All that is required is that all values end
up in the correct partition. The pivot value itself is placed in
position $k$. Quicksort then proceeds to sort the resulting subarrays
now on either side of the pivot, one of size $k$ and the other of size
$n-k-1$. How are these values sorted? Because Quicksort is such a good
algorithm, using Quicksort on the subarrays would be appropriate.

Unlike some of the sorts that we have seen earlier in this chapter,
Quicksort might not seem very "natural" in that it is not an approach
that a person is likely to use to sort real objects. But it should not
be too surprising that a really efficient sort for huge numbers of
abstract objects on a computer would be rather different from our
experiences with sorting a relatively few physical objects.

Here is an implementation for Quicksort. Parameters `left` and `right`
define the left and right indices, respectively, for the subarray being
sorted. The initial call to `quickSort` would be
`quickSort(arr,0,arr.size-1)`, just as for Mergesort.

    function quickSort(arr, left, right):
        if left >= right:                           // Base case: Subarray length is ≤ 1
            return
        pivot = findPivot(arr, left, right)         // Pick a pivot index
        pivot = partition(arr, left, right, pivot)  // Partition and update pivot
        quickSort(arr, left, pivot-1)               // Sort left partition
        quickSort(arr, pivot+1, right)              // Sort right partition


Function `partition` will move records to the appropriate partition and
then return the final position of the pivot. This is the correct
position of the pivot in the final, sorted array. By doing so, we
guarantee that at least one value (the pivot) will not be processed in
the recursive calls to `quickSort`. Even if a bad pivot is selected,
yielding a completely empty partition to one side of the pivot, the
larger partition will contain at most $n-1$ records.

Selecting a pivot can be done in many ways. The simplest is to use the
first key. However, if the input is sorted or reverse sorted, this will
produce a poor partitioning with all values to one side of the pivot.
One simple way to avoid this problem is to select the middle position in
the array. Here is a simple `findPivot` function implementing this idea.
Note that later in the chapter we will discuss better pivot selection strategies.

    function findPivot(arr, left, right) -> Int:
        // Not-so-good pivot selection: always choose the middle element.
        return int((left + right) / 2)

::: dsvis
Quicksort pivot proficiency exercise

```{.jsav-embedded src="Sorting/QuicksortPivotPRO.html" type="ka" name="Quicksort Pivot Proficiency Exercise"}
```
:::

<!--
### Invariants
-->

### Partition

We now turn to partitioning. If we knew in advance how many keys
are less than the pivot, we could simply copy records with key
values less than the pivot to the low end of the array, and records with
larger keys to the high end. Because we do not know in advance how many
keys are less than the pivot, we use a clever algorithm that moves
indices inwards from the ends of the subarray, swapping values as
necessary until the two indices meet.

Since Quicksort is a recursive algorithm, we will not only partition the
whole array, but also subarrays. Therefore `partition` needs the
positions of the leftmost and rightmost elements in the subarray that we
will partition.

The partition function first puts the pivot at the leftmost position in the subarray.
Then it moves the *left* and *right* pointers towards each other;
until they both point to values which are unordered relative to the pivot value.
Now the *left* and *right* values can be swapped, which puts them both in their correct partition.
The loop continues until the *left* and *right* pointers have passed each other.

    function partition(arr, left, right, pivot) -> Int:
        swap arr[pivot] with arr[left]
        while left ≤ right:
            move left rightwards until arr[left] ≥ arr[pivot]
            move right leftwards until arr[right] ≤ arr[pivot]
            swap arr[left] with arr[right]
        swap arr[pivot] with arr[right]
        return right

Finally, it puts the pivot at its correct position, by swapping with the *right* pointer.
Why is *right* the correct pivot position, and not *left*?
This is because we initially put the pivot first in the subarray, so the value that is swapped with the pivot must be smaller.

::: dsvis
Here is a visualisation of the partitioning algorithm.

``` {.jsav-animation src="Sorting/quicksortCON.js" scripts="Sorting/quicksortCODE.js" links="Sorting/quicksortCON.css" name="Quicksort Partition Slideshow"}
```
:::

::: dsvis
Quicksort partition proficiency exercise.

```{.jsav-embedded src="Sorting/QuicksortPartitPRO.html" type="ka" name="Quicksort Partition Proficiency Exercise"}
```
:::

To analyse Quicksort, we first analyse the functions for finding the pivot and partitioning a subarray of length $k$.
Clearly, `findPivot` takes constant time for any $k$.

The total cost of the partition operation is constrained by how far `left` and `right` can move inwards.

- The swap operation in the body of the main loop guarantees that `left` and `right` move at least one step each.
  Thus, the maximum number of times `swap` can be executed is $(k-1)/2$.
- In any case, since `left` and `right` always move towards each other, it will take a total of $k-1$ steps until they meet.
- Thus, the running time of the partition function is $O(k)$.


::: dsvis
Here is a visualisation illustrating the running time analysis of the partition function.

``` {.jsav-animation src="Sorting/QuickSortPartitionAnalysisCON.js" links="Sorting/QuickSortPartitionAnalysisCON.css" name="Quicksort Partition Analysis Slideshow"}
```
:::

:::::: online
#### Putting it together

::: dsvis
Here is a visualisation for the entire Quicksort algorithm.

This visualisation shows you how the logical decomposition caused by the
partitioning process works. In the visualisation, the separate
sub-partitions are separated out to match the recursion tree. In
reality, there is only a single array involved (as you will see in the
proficiency exercise that follows the visualisation).

```{.jsav-embedded src="Sorting/quicksortAV.html" type="ss" name="Quicksort Visualisation"}
```
:::

::: dsvis
Here is a complete proficiency exercise to see how well you understand
Quicksort.

```{.jsav-embedded src="Sorting/quicksortPRO.html" type="pe" name="Quicksort Proficiency Exercise"}
```
:::
::::::


### Complexity analysis

Quicksort's worst case will occur when the pivot does a poor job of breaking the array, that is, when there are no records in one partition, and $n-1$ records in the other.

- The pivot partitions the array into two parts: one of size $0$ and the other of size $n-1$. This requires $n-1$ units of work.
- In the second level, the pivot breaks it into two parts: one of size $0$ and the other of size $n-2$. This requires $n-2$ units of work.
- In the third level, the pivot breaks it into two parts: one of size $0$ and the other of size $n-3$. This requires $n-3$ units of work.
- ...
- In the last level, the pivot breaks a partition of size $2$ into two parts: one of size $0$ and the other of size $1$. This requires a single unit of work.

Thus, the total amount of work is determined by the summation:

$$
\sum_{i=1}^{n} i = \frac{1}{2} n (n-1) \; \in \; O(n^2)
$$

Therefore, the worst case running time of Quicksort is $O(n^2)$.

::: dsvis
This visualisation explains the worst-case running time of Quicksort

``` {.jsav-animation src="Sorting/QuickSortWorstCaseCON.js" links="Sorting/QuickSortWorstCaseCON.css" name="Quicksort Worst Case Analysis Slideshow"}
```
:::

This is terrible, no better than Insertion or Selection sort. When will
this worst case occur? Only when each pivot yields a bad partitioning of
the array. If the pivot values are selected at random, then this is
extremely unlikely to happen. When selecting the middle position of the
current subarray, it is still unlikely to happen. It does not take many
good partitionings for Quicksort to work fairly well.

#### Best-case complexity

Here is an explanation of the best-case running time of Quicksort:

- The pivot partitions the array into two halves of size $n/2$ each. This requires $O(n)$ amount of work.
- For each of the two partitions, the pivot breaks it into halves of size $n/4$ each. This requires $O(n)$ amount of work.
- For each of the four partitions, the pivot breaks it into halves of size $n/8$ each. This requires $O(n)$ amount of work.
- ...
- In the last level, we reach $n$ partitions each of size $1$. This requires $O(n)$ amount of work.

Thus, at each level, all partition steps for that level do a total of $O(n)$ work.
And if we always can find the perfect pivot, there will be only $\log n$ levels.
So the best-case running time of Quicksort is $O(n \log n)$.

::: dsvis
This visualisation explains the best-case running time of Quicksort

``` {.jsav-animation src="Sorting/QuickSortBestCaseCON.js" links="Sorting/QuickSortBestCaseCON.css" name="Quicksort Best Case Analysis Slideshow"}
```
:::

#### Average-case complexity

Quicksort's average-case behaviour falls somewhere between the extremes
of worst and best case. Average-case analysis considers the cost for all
possible arrangements of input, summing the costs and dividing by the
number of cases. We make one reasonable simplifying assumption: At each
partition step, the pivot is equally likely to end in any position in
the (sorted) array. In other words, the pivot is equally likely to break
an array into partitions of sizes 0 and $n-1$, or 1 and $n-2$, and so on.
Given this assumption, the average-case cost is computed from the
following equation:

\begin{align*}
T(n) &= cn + \frac{1}{n}\sum_{k=0}^{n-1}[T(k) + T(n - 1 - k)]
\\
T(0) = T(1) &= c
\end{align*}

::: dsvis
This visualisation will help you to understand how this recurrence
relation was formed.

``` {.jsav-animation src="Sorting/QuickSortAverageCaseCON.js" links="Sorting/QuickSortAverageCaseCON.css" name="Quicksort Average Case Analysis Slideshow"}
```
:::

This is an unusual situation that the average case cost and the worst
case cost have asymptotically different growth rates. Consider what
"average case" actually means. We compute an average cost for inputs
of size $n$ by summing up for every possible input of size $n$ the
product of the running time cost of that input times the probability
that that input will occur. To simplify things, we assumed that every
permutation is equally likely to occur. Thus, finding the average means
summing up the cost for every permutation and dividing by the number of
permutations (which is $n!$). We know that some of these $n!$ inputs
cost $O(n^2)$. But the sum of all the permutation costs has to be
$(n!)(O(n \log n))$. Given the extremely high cost of the worst inputs,
there must be very few of them. In fact, there cannot be a constant
fraction of the inputs with cost $O(n^2)$. If even, say, 1% of the
inputs have cost $O(n^2)$, this would lead to an average cost of
$O(n^2)$. Thus, as $n$ grows, the fraction of inputs with high cost must
be going toward a limit of zero. We can conclude that Quicksort will run
fast if we can avoid those very few bad input permutations. This is why
picking a good pivot is so important.

