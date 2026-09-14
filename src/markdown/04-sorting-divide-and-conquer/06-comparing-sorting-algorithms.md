
## Summary of sorting algorithms {#sorting-2:summary}

::: TODO
- Prio 1: text snippets copied from other places, rewrite text
:::

In this chapter and [Chapter @sec:sorting-1]
we discussed five different sorting algorithms in quite some detail.
How can we compare these algorithms accoring to the terminology below?

### Stability and in-place-ness

Here are some important terminology which we can use to categorise different algorithms.

Stability
:   Sometimes the array contains several elements that compare equal --
    for example, if we want to sort an array of books by author, it might contain several different books by the same author.
    Sometimes it is desirable to maintain the initial ordering between two elements that compare equal.
    <!-- OPENDSA: START -->
    A sorting algorithm is said to be *stable* if it does not change the relative ordering of records with identical values.
    Many, but not all, of the sorting algorithms presented in this book are stable, or can be made stable with minor changes.
    <!-- OPENDSA: END -->

In-place
:   When the memory use of the algorithm does not grow (too much) when the array size grows.
    This means that we cannot use an additional array, and therefore have to modify the original array.
:   An *in-place* sorting algorithm modifies the input array directly and does not build a new array for the sorted result.
    Usually one also requires that the algorithm does not allocate too much extra space while operating,
    where "not too much" can mean at most logarithmic extra memory in the size of the array.
    One sorting algorithm which is *not* in-place is Mergesort (see @sec:sorting-2:mergesort), while most other algorithms are.


#### Mergesort

Note that the merging algorithm is not in-place, becaue we allocate space for the temporary result array.
It is in fact possible to do the merging in-place,
but this involves moving around elements in a way similar to Insertion sort,
which is both is more complex and less efficient as the algorithm above.

If you recall our categorisation of sorting algorithms,
we are now ready to categorise Mergesort:

- *Not in-place*: as we already mentioned this is too costly.
- *Stable*: two equal elements will never swap places (if we implement merging correctly).
- *Not adaptive*: the algorithm runs the same number of steps regardless of how the array is sorted from the start.

#### Quicksort

Compared to Mergesort, the partitioning process is completely in-place,
but on the other hand we cannot be certain that the internal order between equal elements are preserved.
This means that Quicksort is not a stable algorithm, and we have no guarantee for a good time complexity.
Here is how we can categorise Quicksort according the three parameters:

- In-place: *yes*, we do not have to create any intermediate arrays.
- Stable: *no*, equal elements might change order.
- Adaptive: *yes*, but it the complexity will never be better than linearithmic, $O(n\log(n))$.


Here is a summary table of the categorisations.

&nbsp;               Stable?      In-place?
----------------  ------------  -------------
Selection sort        no             yes
Insertion sort        yes            yes
Mergesort             yes            no
Quicksort             no             yes

::: example
#### Example: Why Selection sort is not stable

Here is an explanation why Selection sort is not stable.
Assume that we want to sort the following list of names, by the family name initial:

> [ Ada L, Grace H, Barbara L, Adele G, Hedy L ]

In the first iteration we find the smallest initial (Adele G), and swaps with the first name (Ada L).
After this we have:

> [ Adele G, Grace H, Barbara L, Ada L, Hedy L ]

Notice now that the list has become sorted by the initial, but Ada L was swapped in between Barbara L and Hedy L.
When we continue the sorting the internal order between these three will not change, because the list is already sorted
-- and this will also be the final result.
So Selection sort changed the order between the three names with equal initials.
:::

### Relations between the algorithms

#### Insertion sort as a variant of Mergesort

Mergesort splits the input array into two equal-size arrays.
But what happens if we split in another way?
What if we always make the end part just one single element?

Merging will then be the same as inserting this singleton element into a sorted array,
and this is exactly what Insertion sort does!
So conceptually, we can view Insertion sort as a corner case of Mergesort, where we split very unevenly.


#### Selection sort as a variant of Quicksort

What happens if we are extremely unlucky (or stupid) with the pivot selection?

Let us say that we always select the smallest possible pivot.
This means that the lower partition will always be empty, and the upper partition will decrease by one in each step.
The first time we will find the smallest element and put it first in the array.
The second time we will find the second smallest element and put it after the first.
Next time we will find the third smallest element and put it after the second, and so on.

This is exactly how Selection sort works!
So conceptually, we can view Selection sort as a corner case of Quicksort, where we partition very unevenly.



### Time complexity

Here is a summary table for the time complexity for the five algorithms,
in terms of their required number of comparisons and swaps in the best and worst cases.

+-------------------+-------------------------------+-------------------------------+
|                   | Comparisons                   | Swaps                         |
|                   +---------------+---------------+---------------+---------------+
|                   | Best case     | Worst case    | Best case     | Worst case    |
+:==================+:=============:+:=============:+:=============:+:=============:+
| Selection sort    | $O(n^2)$      | $O(n^2)$      | $O(n)$        | $O(n)$        |
+-------------------+---------------+---------------+---------------+---------------+
| Insertion sort    | $O(n)$        | $O(n^2)$      | $O(1)$        | $O(n^2)$      |
+-------------------+---------------+---------------+---------------+---------------+
| Mergesort         | $O(n\log(n))$ | $O(n\log(n))$ | $O(n\log(n))$ | $O(n\log(n))$ |
+-------------------+---------------+---------------+---------------+---------------+
| Quicksort         | $O(n\log(n))$ | $O(n^2)$      | $O(n\log(n))$ | $O(n^2)$      |
+-------------------+---------------+---------------+---------------+---------------+
