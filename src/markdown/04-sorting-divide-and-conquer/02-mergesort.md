
## Mergesort {#sorting-2:mergesort}

::: TODO
- Prio 1: some parts are moved out - check that the text is still ok
- Prio 1: flatten some subsections
- Prio 1: general rewrite of the text
- Prio 1: invariants
:::

A divide-and-conquer algorithm fits very well into the general problem of sorting an array:
break the array into pieces, sort each piece, and combine the sorted pieces.
The problem is how to break the array into pieces, and how to combine them afterwards.
The idea behind *Mergesort* is to simply split the array in half.

::: algorithm
#### Algorithm: Mergesort

To sort an array using Mergesort:

1. Split the array into two halves of equal size,
2. then recursively sort each half,
3. finally merge the two sorted halves into the final sorted array.

:::

Hopefully you noticed that a very important part is missing from the algorithm above.
The way it is described, it will continue calling the recursive step 2 endlessly,
so we need a way to stop it all -- a *base case*.
The standard base case for divide-and-conquer sorting algorithms is an empty array or a singleton array containing just one element, since such arrays are already sorted.

Now we only have to know how to split and merge.
Splitting is really easy: just divide the array in half.
What remains is how to implement merging.

::: dsvis
Here is a visualisation that illustrates how Mergesort works.

```{.jsav-embedded src="Sorting/mergesortAV.html" type="ss" name="Mergesort Visualisation"}
```
:::

### Merging {#sorting-2:merging}

The hardest step to understand about Mergesort is how to
merge the two sorted halves into a single sorted array.
This is done by iterating through both sorted halves *in parallel*,
and every time moving the smallest element to the final result.

::: algorithm
#### Algorithm: Merge

First we need a temporary result array, initially empty.
We also initialise two pointers to the first element of each sorted half.
Now we repeat the following until one of the halves is empty:

1. Compare the elements pointed to in each sorted half.
2. Append the smallest of the two to the result array,
   and move that pointer to the next element.

Finally we can append the remaining elements in the nonempty half to the end of the result array.
:::

The `merge` function relies on the two halves already being sorted; this is a precondition of the function.
Its postcondition is that the merged result is also sorted.
@Fig:mergesort-split-merge shows how Morgesort sorts an example array with $n=11$ elements.
Sometimes we cannot split evenly, so the array sizes in each level can differ by $\pm 1$.
Note that each level consists of at most $n$ elements, and that the number of levels are *logarithmic* in $n$.

![
    Mergesorting an array of $n=11$ elements.
    To the left we see all levels of splitting, and to the right is the merging.
    There are $k=\lceil\log_2(n)\rceil$ levels, and each level consists of at most $n$ elements.
    Note that this is not an accurate description of how recursion works!
    For instance, it will mergesort the subarray [A,L,G,O,R,I] completely, *before* it starts splitting [T,H,M,I,C].
](images/4.2-split-and-merge.svg){#fig:mergesort-split-merge}


::: dsvis
Here is a visualisation for the merge operation.

``` {.jsav-animation src="Sorting/mergesortCON.js" name="Merging Slideshow"}
```
:::

::: dsvis
#### Practice exercise: Merging

Here is a Mergesort warmup exercise to practice merging.

```{.jsav-embedded src="Sorting/MergesortMergePRO.html" type="ka" name="Mergesort Merging Proficiency Exercise"}
```
:::

::: dsvis
#### Practice exercise: Merge sort

Now here is a full proficiency exercise to put it all together.

```{.jsav-embedded src="Sorting/mergesortPRO.html" type="pe" name="Mergesort Proficiency Exercise"}
```
:::



### Implementing Mergesort {#sorting-2:mergesort-implementation}

How can we use the algorithm descriptions above to implement Mergesort?
The descriptions are quite vague and we have to figure out how to make it work in practice.
First, splitting an input array into two subarrays is easy.
We do not have to copy any elements, but we can use the same idea as for binary search:
use array indices *start* and *end* to refer to an array interval.
To split this subarray into two halves, we just calculate the middle index between *start* and *end*.

The main function for sorting an interval can now be written like this:

    // Sort the array interval start...end
    mergeSort(arr, start, end):
        if start >= end:                   // Base case: Interval length is ≤ 1
            return
        mid = int((start + end) / 2)       // The midpoint is where the second half starts
        mergeSort(arr, start, mid-1)     // Mergesort the first half
        mergeSort(arr, mid, end)         // Mergesort the second half
        merge(arr, start, mid, end)      // Merge the two sorted halves

The initial call would be `mergeSort(arr,0,arr.size-1)`, which sorts the whole array.
Merging the sorted array intervals is straightforward,
we just have to keep track of the pointers to the two sorted halves.

    // Merge the sorted array intervals start .. mid-1 and mid .. end
    merge(arr, start, mid, end):
        temp = new Array(arr.size)
        j = start; k = mid                 // Pointers to the sorted halves
        for i in start .. end:             // Pointer to the temporary array
            if j < mid and (k > end or arr[j] <= arr[k]):
                temp[i] = arr[j]         // The element from the first half is smaller
                j += 1                     // (or the second half is exhausted)
            else:
                temp[i] = arr[k]         // The element from the second half is smaller
                k += 1                     // (or the first half is exhausted)
        for i in start .. end:
            arr[i] = temp[i]             // Copy everything back


::: dsvis
Here is a visualisation for the merge step.

``` {.jsav-animation src="Sorting/mergeImplS1CON.js" links="Sorting/mergeImplS1CON.css" name="Mergesort Implementation Slideshow"}
```
:::

