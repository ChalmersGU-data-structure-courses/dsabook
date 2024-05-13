
## Quicksort

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
`quickSort(array, 0, n-1)`.

    function quickSort(A, left, right):
        if left >= right:                          # Base case: Subarray length is <= 1
            return
        pivot = findPivot(A, left, right)          # Pick a pivot index
        pivot = partition(A, left, right, pivot)   # Partition the subarray; update pivot with its new position
        quickSort(A, left, pivot-1)                # Sort left partition
        quickSort(A, pivot+1, right)               # Sort right partition


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
Note that later in the chapter we will switch to a better pivot
selection strategy.

    function findPivot(A, i, j):
        // Not-so-good pivot selection: always choose the middle element.
        return int((i + j) / 2)


<avembed id="QuicksortPivotPRO" src="Sorting/QuicksortPivotPRO.html" type="ka" name="Quicksort Pivot Proficiency Exercise"/>

### Partition

We now turn to function `partition`. If we knew in advance how many keys
are less than the pivot, `partition` could simply copy records with key
values less than the pivot to the low end of the array, and records with
larger keys to the high end. Because we do not know in advance how many
keys are less than the pivot, we use a clever algorithm that moves
indices inwards from the ends of the subarray, swapping values as
necessary until the two indices meet.

Since Quicksort is a recursive algorithm, we will not only partition the
whole array, but also part of the array. Therefore `partition` needs the
positions of the leftmost and rightmost elements in the subarray that we
will partition.

    def partition(A, left, right, pivot):
        swap(A, left, pivot)   // Put pivot at the leftmost index
        pivot = left
        left = left+1          // Start partitioning from the element after the pivot

        pivotValue = A[pivot]
        while True:
            // Move `left` right as far as possible. Stop if equal to pivot!
            // Also stop if `left` moves past `right`: this is important, 
            // so that `left` stops if it moves past the end of the array.
            while left <= right and A[left] < pivotValue:
                left = left+1

            // Move `right` left as far as possible. Stop if equal to pivot!
            // Also stop if `right` moves all the way left to `left`,
            // see above for why.
            while left <= right and A[right] > pivotValue:
                right = right-1

            // Stop here if `left` and `right` passed each other.
            if left > right:
                break

            // Otherwise, swap the elements and move `left` and `right` on by 1.
            swap(A, left, right)
            left = left+1
            right = right-1

        swap(A, pivot, right)   // Finally, move the pivot into place
        return right            // Return the position of the pivot


The function `partition` first puts the pivot at the leftmost position
in the subarray, and increases `left` by one (so that the pivot is not
included in the partitioning loop).

Then it moves `left` to the right until it finds a value which is larger
than (or equal to) the pivot; and then it moves `right` to the left
until it finds a value which is smaller than (or equal to) the pivot.

It breaks out of the loop if `left` and `right` passed each other;
otherwise it swaps the `left` and `right` elements, moves the indices
one step and continues with the loop.

Finally, it puts the pivot at its correct position, by swapping with
`right`.

<inlineav id="quicksortCON" src="Sorting/quicksortCON.js" script="Sorting/quicksortCODE.js" name="Quicksort Partition Slideshow" links="Sorting/quicksortCON.css"/>

<avembed id="QuicksortPartitPRO" src="Sorting/QuicksortPartitPRO.html" type="ka" name="Quicksort Partition Proficiency Exercise"/>

And here is a visualization illustrating the running time analysis of
the partition function

<inlineav id="QuickSortPartitionAnalysisCON" src="Sorting/QuickSortPartitionAnalysisCON.js" name="Quicksort Partition Analysis Slideshow" links="Sorting/QuickSortPartitionAnalysisCON.css"/>

### Putting It Together

Here is a visualization for the entire Quicksort algorithm. This
visualization shows you how the logical decomposition caused by the
partitioning process works. In the visualization, the separate
sub-partitions are separated out to match the recursion tree. In
reality, there is only a single array involved (as you will see in the
proficiency exercise that follows the visualization).

<avembed id="quicksortAV" src="Sorting/quicksortAV.html" type="ss" name="Quicksort Visualization"/>

Here is a complete proficiency exercise to see how well you understand
Quicksort.

<avembed id="quicksortPRO" src="Sorting/quicksortPRO.html" type="pe" name="Quicksort Proficiency Exercise"/>

### Quicksort Analysis

This visualization explains the worst-case running time of Quicksort

<inlineav id="QuickSortWorstCaseCON" src="Sorting/QuickSortWorstCaseCON.js" name="Quicksort Worst Case Analysis Slideshow" links="Sorting/QuickSortWorstCaseCON.css"/>

This is terrible, no better than Insertion or Selection Sort. When will
this worst case occur? Only when each pivot yields a bad partitioning of
the array. If the pivot values are selected at random, then this is
extremely unlikely to happen. When selecting the middle position of the
current subarray, it is still unlikely to happen. It does not take many
good partitionings for Quicksort to work fairly well.

This visualization explains the best-case running time of Quick Sort

<inlineav id="QuickSortBestCaseCON" src="Sorting/QuickSortBestCaseCON.js" name="Quicksort Best Case Analysis Slideshow" links="Sorting/QuickSortBestCaseCON.css"/>

Quicksort's average-case behavior falls somewhere between the extremes
of worst and best case. Average-case analysis considers the cost for all
possible arrangements of input, summing the costs and dividing by the
number of cases. We make one reasonable simplifying assumption: At each
partition step, the pivot is equally likely to end in any position in
the (sorted) array. In other words, the pivot is equally likely to break
an array into partitions of sizes 0 and $n-1$, or 1 and $n-2$, and so
on.

Given this assumption, the average-case cost is computed from the
following equation:

$$
\begin{eqnarray}
\mathbf{T}(n) &=& cn + \frac{1}{n}\sum_{k=0}^{n-1}[\mathbf{T}(k) + \mathbf{T}(n - 1 - k)]
\\
\mathbf{T}(0) = \mathbf{T}(1) &=& c
\end{eqnarray}
$$

This visualization will help you to understand how this recurrence
relation was formed.

<inlineav id="QuickSortAverageCaseCON" src="Sorting/QuickSortAverageCaseCON.js" name="Quicksort Average Case Analysis Slideshow" links="Sorting/QuickSortAverageCaseCON.css"/>

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

### Pivots in practice

Perhaps the most important choice in implementing Quicksort is how to
choose the pivot. Choosing a bad pivot can result in all elements of the
array ending up in the same partition, in which case Quicksort ends up
taking quadratic time.

Choosing the *first* or the *last* element of the array is a bad
strategy. If the input array is sorted, then the first element of the
array will also be the smallest element. Hence all elements of the array
will end up in the "greater than pivot" partition. Worse, the exact
same thing will happen in all the recursive calls to Quicksort. Hence
the partitioning will be as bad as possible, and Quicksort will end up
taking quadratic time. You sometimes see implementations of Quicksort
that use the first element as the pivot, but this is a bad idea!

Above, we picked the *middle* element of the array, to avoid this
problem. This works well enough, but in practice, more sophisticated
strategies are used.

The theoretically best choice of pivot is one that divides the array
equally in two, i.e. the median element of the array. However, the
median of an array is difficult to compute (unless you sort the array
first!) Instead, many Quicksort implementations use a strategy called
*median-of-three*. In median-of-three, we pick elements from three
positions in the array: the *first* position, the *middle* position and
the *last* position. Then we take the median of these three elements.
For example, given the array `3, 1, 4, 1, 5, 9, 2`, we pick out the
elements `3` (first position), `1` (middle position) and `2` (last
position). The median of 3, 1 and 2 is 2, so we pick 2 as the pivot.

Median-of-three is not guaranteed to pick a good pivot: there are cases
where it partitions the input array badly. However, these bad cases do
not seem to occur in practice. In practice, median-of-three picks good
pivots, and it is also cheap to implement. It is used by most real-world
Quicksort implementations.

Another good approach is to pick a random element of the array as the
pivot. This makes it somewhat unlikely to get a poor partitioning.
What's more, if we do get a poor partitioning, it is likely that in the
recursive call to `quickSort`, we will choose a different pivot and get
a better partitioning. Unlike median-of-three, this approach is
theoretically sound: there are no input arrays which make it work badly.
Another way to get the same effect is to pick e.g. the first element as
the pivot, but to *shuffle* the array before sorting, rearranging it
into a random order. The array only needs to be shuffled once before
Quicksort begins, not in every recursive call.

### More practical improvements

A significant improvement can be gained by recognizing that Quicksort is
relatively slow when $n$ is small. This might not seem to be relevant if
most of the time we sort large arrays, nor should it matter how long
Quicksort takes in the rare instance when a small array is sorted
because it will be fast anyway. But you should notice that Quicksort
itself sorts many, many small arrays! This happens as a natural
by-product of the divide and conquer approach.

A simple improvement might then be to replace Quicksort with a faster
sort for small subarrays, say Insertion Sort or Selection Sort. However,
there is an even better\---and still simpler\---optimization. When
Quicksort partitions are below a certain size, do nothing! The values
within that partition will be out of order. However, we do know that all
values in the array to the left of the partition are smaller than all
values in the partition. All values in the array to the right of the
partition are greater than all values in the partition. Thus, even if
Quicksort only gets the values to "nearly" the right locations, the
array will be close to sorted. This is an ideal situation in which to
take advantage of the best-case performance of Insertion Sort. The final
step is a single call to Insertion Sort to process the entire array,
putting the records into final sorted order. At what size should we
switch to Insertion Sort? The answer can only be determined by empirical
testing, but on modern machines the answer is probably somewhere between
10 and 100.

The last speedup to be considered reduces the cost of making recursive
calls. Quicksort is inherently recursive, because each Quicksort
operation must sort two sublists. Thus, there is no simple way to turn
Quicksort into an iterative algorithm. However, Quicksort can be
implemented using a stack to imitate recursion, as the amount of
information that must be stored is small. We need not store copies of a
subarray, only the subarray bounds. Furthermore, the stack depth can be
kept small if care is taken on the order in which Quicksort's recursive
calls are executed. We can also place the code for `findPivot` and
`partition` inline to eliminate the remaining function calls. Note
however that by not processing smal sublists of size nine or less as
suggested above, most of the function calls will already have been
eliminated. Thus, eliminating the remaining function calls will yield
only a modest speedup.

<avembed id="QuicksortSumm" src="Sorting/QuicksortSumm.html" type="ka" name="Quicksort Summary Exercise"/>
