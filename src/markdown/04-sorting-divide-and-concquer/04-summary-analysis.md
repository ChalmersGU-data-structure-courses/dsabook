
## Summary of sorting algorithms

In this chapter and [chapter @sec:sorting-part-1]
we discussed five different sorting algorithms in quite some detail.
How can we compare these algorithms accoring to the terminology that we introduced in @sec:terminology-and-notation, as well as their complexity analysis?

### Stability, adaptivity and in-place

Recall the three main ways of categorising sorting algorithms:

- *Stability*: the relative order between two equal values do not change
- *Adaptivity*: the time complexity adapts to the structure of the data
- *In-place*: the memory use does not grow when the array size grows

Here is a summary table of the categorisations.

&nbsp;               Stable?     Adaptive?      In-place?
----------------  ------------ -------------  -------------
Bubble sort           yes           no             yes
Selection sort        no            no             yes
Insertion sort        yes           yes            yes
Mergesort             yes           no             no
Quicksort             no            yes            yes

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

### Time complexity

Here is a summary table for the time complexity for the five algorithms,
in terms of their required number of comparisons and swaps in the best and worst cases.

+-------------------+-------------------------------+-------------------------------+
|                   | Comparisons                   | Swaps                         |
|                   +---------------+---------------+---------------+---------------+
|                   | Best case     | Worst case    | Best case     | Worst case    |
+:==================+:=============:+:=============:+:=============:+:=============:+
| Bubble sort       | $O(n^2)$      | $O(n^2)$      | $0$           | $O(n^2)$      |
+-------------------+---------------+---------------+---------------+---------------+
| Selection sort    | $O(n^2)$      | $O(n^2)$      | $O(n)$        | $O(n)$        |
+-------------------+---------------+---------------+---------------+---------------+
| Insertion sort    | $O(n)$        | $O(n^2)$      | $0$           | $O(n^2)$      |
+-------------------+---------------+---------------+---------------+---------------+
| Mergesort         | $O(n\log(n))$ | $O(n\log(n))$ | $O(n\log(n))$ | $O(n\log(n))$ |
+-------------------+---------------+---------------+---------------+---------------+
| Quicksort         | $O(n\log(n))$ | $O(n^2)$      | $O(n\log(n))$ | $O(n^2)$      |
+-------------------+---------------+---------------+---------------+---------------+
