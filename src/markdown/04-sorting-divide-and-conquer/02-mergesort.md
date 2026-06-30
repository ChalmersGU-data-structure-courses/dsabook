
## Mergesort {#sorting-2:mergesort}

::: TODO
- Prio 1: flatten some subsections
- Prio 1: divide in two sections? Mergesort + Mergesort alternatives
- Prio 2: general rewrite of the text
- Prio 2: invariants
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
what remains is how to implement merging.

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
](images/Sorting-MergesortSplitMerge.svg){#fig:mergesort-split-merge}


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


### Categorising Mergesort

Note that the merging algorithm is not in-place, becaue we allocate space for the temporary result array.
In is in fact possible to do the merging in-place,
but this involves moving around elements in a way similar to Insertion sort,
which is both is more complex and less efficient as the algorithm above.

If you recall our categorisation of sorting algorithms from @sec:sorting-1:terminology,
we are now ready to categorise Mergesort:

- *Not in-place*: as we already mentioned this is too costly.
- *Stable*: two equal elements will never swap places (if we implement merging correctly).
- *Not adaptive*: the algorithm runs the same number of steps regardless of how the array is sorted from the start.

#### Insertion sort as a variant of Mergesort

Mergesort splits the input array into two equal-size arrays.
But what happens if we split in another way?
What if we always make the end part just one single element?

Merging will then be the same as inserting this singleton element into a sorted array,
and this is exactly what Insertion sort does!
So conceptually, we can view Insertion sort as a corner case of Mergesort, where we split very unevenly.

#### Divide-heavy or combine-heavy

Most divide-and-conquer algorithms spend most of their time in one of the two main steps.
Either they do the heavy work in the divide step (making combining trivial),
or most work is in the combine step (making dividing easy).
Mergesort is of the latter kind.

So, is there any other divide-and-conquer sort that is divide-heavy instead?
Yes, it is called Quicksort and is the topic for @sec:sorting-2:quicksort.


### Complexity analysis

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
    So the total complexity of merging one full level is $O(2^r \cdot 2^{k-r})$.
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
Let us assume that the array has $n'$ elements, where $n/2<n'<n$.
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

Merging the sorted array intervals are quite straightforward from the description,
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


### Optimisations {#sorting-2:mergesort-optimisations}

There are some optimisations one can do to the naive Mergesort algorithm from above.

#### Use just one temporary array

Notice that in the implementation above, the merge function creates a new auxiliary array every time it is called.
This is quite inefficient, because it takes some time to allocate memory for a new array,
which will be be destroyed directly when merge is finished.
A simple optimisation is to create one single auxiliary array before the very first recursive call,
and reuse this array in all invocations of merge.
The only thing we would have to do is to add an extra argument to `mergeSort` and `merge`, for the reference to the auxiliary array.
Then we can create a wrapper function that takes care of the initialisation, and makes the first recursive call:

    mergeSort(arr):
        temp = new Array(arr.size)
        mergeSort(arr, temp, 0, arr.size-1)

#### Using a backoff algorithm

Mergesort is way faster than Insertion and Selection sort for large arrays because of the better complexity.
But when the arrays are small (perhaps 50 elements or so), the "slower" algorithms are actually faster
-- the reason for this is that Mergesort is more complex which leads to larger constant factors.

This fact, that there are algorithms that are faster on small arrays, can be used for a very simple optimisation.
Whenever the size of the input array is small enough (say, less than 50 elements),
we can call Insertion or Selection sort on that array instead of continuing with Mergesort.

Note that this will not change the complexity of the implementation, but it can nonetheless improve the speed by some factor.
Also note that the exact cutoff depends a lot on what computer you have, what programming language you use, etc.
The only way to know which array size is the optimal cutoff is to do a lot of testing
-- but a rule of thumb is that it is probably faster to use Insertion sort on an array of up to 50 elements.


### Bottom-up Mergesort

If you look at the figure above that showed all the splitting steps,
you might wonder why all this recursive splitting is necessary in the first place.
We will anyway have to split all the way down to a bunch of singleton arrays before we can start merging.

There is a version of Mergesort that short-circuits the splitting
by dividing the whole array into singleton arrays already at the start.
Then it does one pass over this whole array of arrays and merges each pair of singletons into two-element arrays.
And then each pair of two-element arrays into four-element arrays, and so on until we have merged the whole array.
The structure is exactly as the figure earlier showing the merging steps.
This variant is called *bottom-up Mergesort* (as opposed to the original top-down Mergesort).
Bottom-up Mergesort can be implemented without recursion,
where every level instead becomes an iteration in an outer loop.
But just as the top-down variant it still needs to allocate additional space for the merging.

#### Run-based Mergesort

If we implement bottom-up Mergesort we can be even smarter.
Instead of splitting the array into the smallest possible parts (that is, singleton arrays),
we can make use of the "natural order" that's already in the array.
Even an array which is very random contains sorted subarrays.
For example, assume we want to sort the following array:

$$ [3, 88, 65, 34, 42, 67, 7, 65, 99, 8] $$

We can start by dividing it into already-sorted arrays, which are called *runs*:

$$ [3, 88],  [65],  [34, 42, 67],  [7, 65, 99],  [8] $$

Now we can continue merging smaller arrays into larger.
This version is called *run-based Mergesort*, and it is one of the most efficient sorting algorithms.
For example, it is what Python uses as its standard sorting algorithm.

There is a lot more that can be said about run-based Mergesort.
One thing that has a big effect on the efficiency is in which order we choose to merge the runs
-- we want the runs to be as equal as possible in size.

:::: online
There are many different strategies to do this,
and the following blog post gives a good introduction if you are interested:

> https://www.wild-inter.net/publications/munro-wild-2018
::::

