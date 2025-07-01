
## Implementing Mergesort

::: TODO
- Prio 1: short introduction
- Prio 3: bottomup, runbased mergesort, powersort
:::

Implementing Mergesort presents some technical difficulties.
The pseudocode in the last section is quite vague and we have to figure out how to make it work for arrays.

First, splitting an input array into two subarrays is easy.
We don't even have to copy any elements, but we can use the same idea as for binary search:
use `left` and `right` indices to refer to a subarray.
To split this subarray into two halves, we just calculate the middle index,
`mid` = `(left+right)/2`.

The main function for sorting a subarray can now be written like this:

    // Sort the subarray A[left .. right]
    function mergeSort(A, left, right):
        if left >= right:              // Base case: Subarray length is ≤ 1
            return
        mid = int((left + right) / 2)  // The midpoint is where the second half starts
        mergeSort(A, left, mid-1)      // Mergesort first half
        mergeSort(A, mid, right)       // Mergesort second half
        merge(A, left, mid, right)     // Merge the two sorted halves

The initial call would be `mergeSort(A,0,A.size-1)`, which sorts the whole array `A`.

The difficulty comes when we want to merge the two sorted subarrays.
This cannot be done in-place (or rather, it is very very complicated to do it in-place).
So we need an auxiliary array which we can merge the elements into.

    // Merge the sorted subarrays A[left .. mid-1] and A[mid .. right]
    function merge(A, left, mid, right):
        temp = new Array
        // Merge the two sublists into the auxiliary array
        i1 = left
        i2 = mid
        for i in left .. right:
            if i2 > right:           // Right sublist exhausted
                temp[i] = A[i1]
                i1 = i1 + 1
            else if i1 > mid:        // Left sublist exhausted
                temp[i] = A[i2]
                i2 = i2 + 1
            else if A[i1] <= A[i2]:  // Get smaller value
                temp[i] = A[i1]
                i1 = i1 + 1
            else:
                temp[i] = A[i2]
                i2 = i2 + 1
        // Copy the elements back from the auxiliary array
        for i in left .. right:
            A[i] = temp[i]


::: dsvis
Here is a visualisation for the merge step.

<inlineav id="mergeImplS1CON" src="Sorting/mergeImplS1CON.js" name="Mergesort Implementation Slideshow" links="Sorting/mergeImplS1CON.css"/>
:::

Notice that the merge function will create a new auxiliary array every time it is called.
This is quite inefficient, because it takes some time to allocate memory for a new array, which can be destroyed directly when merge is finished.
One simple optimisation is to create one single auxiliary array before the first call, and reuse this array in all invocations of merge.
The only thing we would have to do is to add an extra argument to `mergeSort` and `merge`, for the reference to the auxiliary array.
Then we can create a wrapper function that takes care of the initialisation, and makes the first recursive call:

    function mergeSort(A):
        temp = new Array(A.size)
        mergeSort(A, temp, 0, A.size-1)


<!--
### Bottom-up mergesort

::: TODO
- using lists of lists
- arrays: using run-lengths of 1, 2, 4, 8, ...
:::

### Run-based mergesort

::: TODO
- "natural" mergesort in Wikipedia
- find already sorted runs, store run-starts in array
- merge adjacent runs
- Optimisation: decide which runs to merge
- Optimisation: bitonic (alternating ascending and descending runs)
- Example: Timsort
:::

### Powersort

https://www.wild-inter.net/publications/munro-wild-2018
-->
