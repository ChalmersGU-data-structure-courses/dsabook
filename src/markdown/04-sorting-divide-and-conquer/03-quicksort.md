
## Quicksort {#sorting-2:quicksort}

::: TODO
- Prio 1: some part has moved out, into new section 4.4 Partition - check that the text is still ok!
- Prio 1: include pseudocode in #alg:quicksort
- Prio 1: merge subsection (Implementing quicksort) with the running text here - no subsubsection heading
- Prio 1: rewrite the OpenDSA paragraph in the end
- Prio 2: invariants?
:::

Mergesort uses a very simple approach for splitting the array, but spends almost all its time in the merging step.
But there is also another problem with merging: it is difficult to efficiently implement in-place,
so Mergesort has to use an additional array which will use some memory.
So is there a different divide-and-conquer strategy that is easier to make in-place?

*Quicksort* uses another approach: it spends more of the time in splitting the array in parts,
which then makes the merging step completely trivial.
The overall algorithm is deceivingly similar to Mergesort:

::: {.algorithm #alg:quicksort}
#### Algorithm: Quicksort

To sort an array using Quicksort:

1. Partition the array into two smaller parts,
2. then recursively sort each part,
3. finally concatenate the two parts into the final sorted array.

:::

The main difference to Mergesort is in the splitting step, called *partition*.
The idea is that we divide the array into two parts,
where everything in the first part is smaller than everything in the second part.
Then Quicksort calls itself with the two subarrays (just as Mergesort does), so that they are both sorted.
Now we have to combine them, but this is much easier than in Mergesort,
because we already know that everything in the first part is smaller than everything in the second part
-- so we can just put them after each other.

#### Implementing Quicksort

Now we're almost ready to implement Quicksort, but one small but important thing remains.
We cannot know how big the left and right partitions will be, not until we have done the partitioning.
So the partition function has to inform Quicksort how the partitions ended up
-- and we do this is to return the final position of the pivot.
So here is the final algorithm sketch for sorting the interval $\mathit{start}\ldots\mathit{end}$ of a given array:

1.  Select an initial index $p_0$ of the pivot, from the interval $\mathit{start}\ldots\mathit{end}$.
2.  Partition the interval using the pivot.
    Assume that the pivot has afterwards moved to position $p$.
3.  Sort the interval $\mathit{start}\ldots p{-}1$ and the interval $p{+}1\ldots\mathit{end}$.

Note that we do not include the pivot itself in the intervals of the recursive calls.
This is because we know that after partitioning the pivot is in its final correct position, $p$.
Now it should be straightforward to give the pseudocode for the main Quicksort function:

    // Sort the array interval start...end
    quickSort(arr, start, end):
        if start >= end:                       // Base case: Interval length is ≤ 1.
            return
        p0 = findPivot(arr, start, end)        // Pick an initial pivot index.
        p = partition(arr, start, end, p0)     // Partition the interval and update the pivot index.
        quickSort(arr, start, p-1)             // Quicksort the lower partition.
        quickSort(arr, p+1, end)               // Quicksort the upper partition.

<!-- OPENDSA: START -->
The partitioning will return the final position of the pivot,
which is the correct position of the pivot in the final, sorted array.
By doing so, we guarantee that at least one value (the pivot) will not be included in the recursive calls.
So even if a bad pivot is selected, yielding a completely empty partition to one side of the pivot,
the larger partition will still contain one less element than the input array.
<!-- OPENDSA: END -->

