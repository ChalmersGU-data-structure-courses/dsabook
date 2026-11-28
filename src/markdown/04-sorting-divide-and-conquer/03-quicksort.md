
## Quicksort {#sorting-2:quicksort}

::: TODO
- Prio 2: invariants?
:::

Mergesort splits the array in the simplest possible way, and instead spends almost all its
time in the merging step. *Quicksort* is in this aspect the polar opposite of Mergesort: It does
all the work when splitting the array, and the merging step is trivial.

The splitting step in Quicksort is called *partition*. We partition the elements of the
array into two parts: Everything in the first part is smaller than everything in the second part.
Then Quicksort runs recursively on the two parts (just as Mergesort does), so they are both sorted.
The final step of combining the two sorted parts is no effort at all: As long as the part with the small elements
is before the part with the large elements, we are already done.
A major advantage of Quicksort over Mergesort is that it is in-place -- there is no need to
allocate a lot of extra memory, elements are just shuffled around inside the original array.

So a highly simplified summary of Quicksort is: Put all small elements in the front of the array,
and all large elements in the back, then sort the small and large elements separately.
The obvious issue is deciding which elements are considered small.
Keep in mind that we can sort any comparable objects, such as text strings, not just
numbers -- so we cannot do arithmetic on our elements to compute an average.
There is no way of knowing if an element is in the smaller or larger half of elements
just by looking at the element itself.

In Quicksort, this is solved by selecting a *pivot element*. The idea is to somehow
select an element, and use that to partition the array: Everything smaller than the
pivot goes in the first part, and everything greater goes in the second.
Elements that are equal to the array can go in either half.
This illustration shows an array segment, and an example of how it can look
after partitioning using the pivot element $4$:

![](images/4.3-partition-overview.svg)

`\noindent`{=latex}
Note how after partitioning, if we sort the smaller and larger elements separately,
the whole array segment ends up sorted. A few observations:

* Neither part is sorted after partitioning, we have only made
  the array "more sorted" by putting small elements first and large elements last.
  The exact order inside the two parts may vary depending on technicalities of
  the partitioning.
* The pivot itself is placed between the smaller and larger elements. This means that
  the pivot is in its correct final position, and never needs to be moved again.
  This is an important property for correctness: Each partitioning
  is guaranteed to put one element in its final position, so the array will be sorted after
  at most $n$ total partitioning operations.
* Unlike Mergesort, there is no general guarantee that the two parts are the same size.
  The sizes of the two parts depend entirely on how we select the pivot element.
  The only situation where the parts are equally large is if the pivot is the median element.

::: {.algorithm #alg:quicksort}
#### Algorithm: Quicksort

To sort a segment of an array using Quicksort:

1. If the segment has zero or one elements, it is already sorted.
2. Select a pivot element.
3. Partition the segment in-place so all elements smaller than the pivot are before the pivot, and all larger elements after.
4. Recursively sort the small and large elements separately.

Pseudocode with the methods for deciding a pivot and partitioning excluded.
Note how the final position of the pivot (`p`) is not in either recursive call:

    // Sort the array segment start...end
    quickSort(arr, start, end):
        if start >= end:                       // Base case: Interval length is ≤ 1.
            return
        p0 = findPivot(arr, start, end)        // Pick an initial pivot index.
        p = partition(arr, start, end, p0)     // Partition, and update the pivot index.
        quickSort(arr, start, p-1)             // Quicksort the lower partition.
        quickSort(arr, p+1, end)               // Quicksort the upper partition.

The requirement on the functions `findPivot` and `partition` is that after performing
both, the index `p` contains an element (the pivot) such that all elements before `p` are less
than or equal to `arr[p]`, and all elements after `p` are greater or equal.
If this condition is satisfied in every call, the function will correctly sort the array segment.
:::

In the next section, we look an algorithm for
partitioning, and a few ways of selecting a good pivot.
However, we can already formulate an implementation of Quicksort that abstracts
these details away ([](#alg:quicksort)).