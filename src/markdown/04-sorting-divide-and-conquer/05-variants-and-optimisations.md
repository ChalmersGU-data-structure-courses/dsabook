
## Variants and optimisations {#sorting-2:variants}

::: TODO
- Prio 1: new section with snippets copied from other places, rewrite text
:::

### Using a backoff sorting algorithm {#sorting-2:backoff-algorithm}

Mergesort is much faster than Insertion and Selection sort for large arrays because of the better complexity.
But when the arrays are small (perhaps 50 elements or so), the "slower" algorithms are actually faster
-- the reason for this is that Mergesort is more complex which leads to larger constant factors.

This fact, that there are algorithms that are faster on small arrays, can be used for a very simple optimisation.
Whenever the size of the input array is small enough (say, less than 50 elements),
we can call Insertion or Selection sort on that array instead of continuing with Mergesort.

Note that this will not change the time complexity of the implementation, but it can nonetheless improve the speed by some factor.
Also note that the exact cutoff depends a lot on what computer you have, what programming language you use, etc.
The only way to know which array size is the optimal cutoff is to do a lot of testing
-- but a rule of thumb is that it is probably faster to use Insertion sort on an array of up to 50 elements.


#### Backing off to Insertion sort

<!-- OPENDSA: START -->
A significant improvement can be gained by recognising that Quicksort is relatively slow when the array is small.
This might not seem to be relevant if most of the time we sort large arrays,
nor should it matter how long Quicksort takes in the rare instance when a small array is sorted because it will be fast anyway.
But you should notice that Quicksort itself sorts many, many small arrays!
This happens as a natural by-product of the divide-and-conquer approach.

A simple improvement is to replace Quicksort with a faster sort for smaller array intervals.
<!-- OPENDSA: END -->
This is a very common improvement, and usually one uses Insertion sort as the backoff algorithm.
Now, at what size should we switch to Insertion sort?
The answer can only be determined by empirical testing, but on modern machines the answer is probably somewhere between 10 and 100.
Note that in @sec:sorting-2:mergesort-optimisations we discussed exactly the same improvement for Mergesort.



### Mergesort variations {#sorting-2:mergesort-variations}

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


### Bottom-up Mergesort {#sorting-2:bottomup-mergesort}

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


### Quicksort variants {#sorting-2:quicksort-variants}

In this section we discuss some variants of Quicksort, and things we can do to improve its efficiency.


#### Shuffle the array

As we explained above, if we use a random pivot we get a good asymptotic behaviour,
because the expected worst-case complexity will be $O(n\log(n))$.

One alternative to using a random pivot is to *shuffle* the array before sorting, that is, rearranging it in random order.
This only has to be done once before Quicksort begins, not in every recursive call.
The advantage to doing this is that then we can safely use the simplest pivot selection strategy.
And if we use the take-first pivot strategy we do not have to swap the pivot with the first element at the start of every partitioning.
Depending on the computer and programming language, this can yield a slight improvement compared to using a random pivot.

#### Running Insertion sort in a single final pass

There is a variant of the optimisation above:
<!-- OPENDSA: START -->
When Quicksort partitions are below a certain size, do nothing!
The values within that partition will be out of order. However, we do know that all
values in the array to the left of the partition are smaller than all
values in the partition. All values in the array to the right of the
partition are greater than all values in the partition. Thus, even if
Quicksort only gets the values to "nearly" the right locations, the
array will be close to sorted. This is an ideal situation in which to
take advantage of the best-case performance of Insertion sort. The final
step is a single call to Insertion sort to process the entire array,
putting the records into final sorted order.
<!-- OPENDSA: END -->


#### Alternative partitioning approaches

There are several possible ways we can translate the informal partitioning algorithm into working code.
For example, in our implementation above
we move the pointers at most one step in each iteration of the `while`-loop.
An alternative is to move the pointers as far as possible during each iteration,
and then the pseudocode will become like this:

    partition(arr, start, end, p) -> Int:
        swap(arr, start, p)          // Swap the pivot with the first element in the interval.
        pivot = arr[start]           // Remember the pivot value, and
        low = start + 1; high = end  // initialise the lower and upper pointers.
        repeat:
            while low <= high and arr[low] < pivot:
                low += 1             // Increase lower pointer as long as it's smaller than the pivot.
            while low <= high and arr[high] > pivot:
                high -= 1            // Increase upper pointer as long as it's larger than the pivot.
            if low > high:
                break                // Break out of loop when the pointers have passed each other.
            swap(arr, low, high)     // Otherwise, swap the elements, and
            low += 1                 // move both pointers towards each other.
            high -= 1
        swap(arr, start, high)       // Finally, swap the pivot into place, and
        return high                  // return the new position of the pivot.

This version is ever so slightly faster than the one in @sec:sorting-2:quicksort-implementation,
because in some cases it makes fewer comparisons.
It is even possible to improve this one a little bit more,
because we do not need test `low<=high` in the second inner while loop
(try to reason for yourself why that is the case).

The partitioning algorithm we described previously is called *Hoare* partitioning
(named after the computer scientist C.A.R. Hoare).
There is another common partitioning algorithm, where both pointers start at the left side and move to the right
-- but one of them moves faster than the other.
This algorithm is called *Lomuto* partitioning (named after Nico Lomuto).
In this algorithm we still have two pointers, but both start at the beginning of the array interval and move upwards.
Below we call them $\mathit{low}$ and $\mathit{high}$, where $\mathit{low}\leq\mathit{high}$.
The invariant is that the elements from $\mathit{start}$ to $\mathit{low}-1$ are always less than the pivot,
and the elements from $\mathit{low}$ to $\mathit{high}$ are greater than or equal to the pivot.
In Lomuto's partitioning scheme we start by putting the pivot at the *end* of the interval, not the beginning.

    partition(arr, start, end, p) -> Int:
        swap(arr, p, end)             // Swap the pivot with the last element in the interval.
        pivot = arr[start]            // Remember the pivot value, and
        low = start                   // initialise the lower pointer.
        for high in start .. end-1:   // Iterate the upper pointer over the entire interval.
            if arr[high] <= pivot:
                swap(arr, low, high)  // Swap lower and upper elements if upper is smaller than pivot,
                low += 1              // and increase the lower pointer.
        swap(arr, end, low)           // Finally, swap the pivot into place, and
        return low                    // return the new position of the pivot.

As you can see, Lomuto's partitioning scheme gives very simple and clean implementation,
but it is usually somewhat less efficient than Hoare's, because it makes more swaps.
It also does not work very well if the array contains many equal elements.


#### Three-way quicksort

If the array contains many equal elements, there is a small optimisation we can do to the partitioning scheme.
Our current formulation divides the array into one lower part, then the pivot, and finally the upper part.
If the array happens to contain many duplicates of the pivot, it would be useful to put all of them next to each other.
This means that the algorithm divides the array into *three* parts:
the lower part, the equal part, and the upper part.
Our partitioning algorithm then has to return *two* indices, giving the end of the lower part and the beginning of the upper.
Assuming that we have such an algorithm, the final Quicksort algorithm can be described like this:

1.  Select an initial pivot from the interval $\mathit{start}\ldots\mathit{end}$.
2.  Partition the interval using the pivot.
    Assume that the partitioning returns the positions $p$ (the end of the lower part)
    and $q$ (the start of the upper part).
3.  Sort the interval $\mathit{start}\ldots p$ and the interval $q\ldots\mathit{end}$.

Three-way partitioning is also called the *Dutch national flag problem*,
and the most common algorithm for solving it is a modification the Lomuto partitioning scheme from above.


<!--
:::::: online

## Special-purpose sorting algorithms

::: TODO
- Prio 3: write this section
    - It's not possible to make a generic sorting algorithm better than n log(n), but if the data is restricted we can
    - non-comparative sorting
:::

### Distribution sorting

::: TODO
- counting sort: keys are finite range of integers
- bucket sort: hashable keys (refer to hashing chapter)
- binsort (referred in chapter 7)
:::

### Sorting strings (or other kinds of sequences)

::: TODO
- Radix sort: sorting strings or numbers as digit sequences (or bit sequences)
- Multi-key Quicksort (aka three-way radix Quicksort)
- Example: Suffix arrays
:::

::::::
-->
