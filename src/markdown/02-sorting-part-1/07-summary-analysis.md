
## Summary analysis of basic sorting algorithms

How can we categorise our three sorting algorithms according to the terminology that we introduced in @sec:terminology-and-notation?

In-place
:   All three algorithms are *in-place*, because we modify the array and only make use of a constant number of additional variables.

Stability
:   Both Bubble sort and Insertion sort are *stable*.
    They only swap adjacent elements, and they will never swap two equal elements.
    Therefore the relative order of equal elements will be preserved.

    However, Selection sort is not stable, and this is because it can swap over long distances.
    See the example below for an explanation why it is not stable.

Adaptivity
:   Insertion sort is *adaptive*, because its best-case behaviour is much better than its worst-case.
    If the list is almost sorted, Insertion sort is way much faster than if the list is completely unsorted.

    Bubble sort and Selection sort however, are not adaptive
    -- they always perform the same number of comparisons regardless of the input array.

Here is a summary table of the categorisations.

&nbsp;           Bubble       Selection      Insertion
-------------  ------------ -------------  -------------
In place?         yes           yes           yes
Stable?           yes           no            yes
Adaptive?         no            no            yes


Here is a summary table for the cost of Bubble sort, Selection sort, and Insertion sort,
in terms of their required number of comparisons and swaps in the best and worst cases.
The $O$-notation will be explained later, in @sec:asymptotic-analysis,
but for now it suffices that $O(n^2)$ means a quadratic growth rate while $O(n)$ means a linear growth rate.

            &nbsp;    Bubble      Selection      Insertion
------------------ ------------ -------------  -------------
  **Comparisons:**
         Best case   $O(n^2)$     $O(n^2)$        $O(n)$
        Worst case   $O(n^2)$     $O(n^2)$       $O(n^2)$
        **Swaps:**
         Best case      $0$        $O(n)$           $0$
        Worst case   $O(n^2)$      $O(n)$        $O(n^2)$

The important takeaway from this table is that each of these sorts has a *quadratic* runtime behaviour in the worst case.

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
