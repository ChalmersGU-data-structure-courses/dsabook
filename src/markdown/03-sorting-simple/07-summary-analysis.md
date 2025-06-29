
## Summary analysis of basic sorting algorithms

How can we categorise our three sorting algorithms according to the terminology that we introduced in section @sec:terminology-and-notation?

In-place
:   All three algorithms are *in-place*, because we modify the array and only make use of a constant number of additional variables.

Stability
:   Both bubble sort and insertion sort are *stable*.
    They only swap adjacent elements, and they will never swap two equal elements.
    Therefore the relative order of equal elements will be preserved.

    However, insertion sort is not stable, and this is because it can swap over long distances.
    For example, if we insertion sort the array [2,2,1], then the first swap (putting 1 into the first position) will change the relative order between the first and the second 2.

Adaptivity
:   Insertion sort is *adaptive*, because its best-case complexity is better than its worst-case.
    If the list is almost sorted, insertion sort is way much faster than if the list is completely unsorted.

    Bubble sort and selection sort however, are not adaptive -- they are always quadratic regardless of the input array.

Here is a summary table of the categorisations.

&nbsp;           Bubble       Selection      Insertion
-------------  ------------ -------------  -------------
In place?         yes           yes           yes
Stable?           yes           no            yes
Adaptive?         no            no            yes


Here is a summary table for the cost of Bubble sort, Selection sort, and Insertion sort,
in terms of their required number of comparisons and swaps in the best and worst cases.
The running time for each of these sorts is $O(n^2)$ in the worst case.

            &nbsp;    Bubble      Selection      Insertion
------------------ ------------ -------------  -------------
  **Comparisons:**
         Best case   $O(n^2)$     $O(n^2)$        $O(n)$
        Worst case   $O(n^2)$     $O(n^2)$       $O(n^2)$
        **Swaps:**
         Best case      $0$        $O(n)$           $0$
        Worst case   $O(n^2)$      $O(n)$        $O(n^2)$


### Inversions and the reason for the quadratic behaviour

::: TODO
- Should this move to chapter 5 (analysis pt 2)?
::::

The remaining sorting algorithms presented in the next chapter are
significantly better than these three under typical conditions. But
before continuing on,

These three sorting algorithms are all quadratic, but can we say something about *why* they are so slow?
The crucial bottleneck is that only *adjacent* records are compared, and swapped (for Insertion and Bubble sort).
To analyse this we first need to define the concept of *inversion*.

An *inversion* occurs when there are two elements in an array that come in the wrong order.
Formally, if $A[i]>A[j]$ for array indices $i<j$, then there is an inversion between $i$ and $j$
(or between $A[i]$ and $A[j]$ if that is unambiguous).
For example, in the array [A,B,X,C,D] there are inversions between indices 2 and 3 (elements X and C are out of order), and between indices 2 and 4 (elements X and D).

The number of inversions in an array is one measure of how sorted the array is (but not the only such measure).
The most unsorted array according to this definition is reversely sorted, because then all pairs of indices are inversions.
So, the maximum number of inversions is the number of pairs, which is $n(n-1)/2$.

Now, assume that we have an array, and we swap two adjacent elements (that are out of order, i.e., an inversion).
This will reduce the number of inversions with at most 1, because all other inversions in the array will still be inversions.
Therefore, any algorithm which can only swap *adjacent* elements has to perform at least as many swaps as there are inversions.
And since there are $n(n-1)/2 = O(n^2)$ inversions in the worst case, any such algorithm will at least be quadratic, $O(n^2)$.
This includes Insertion sort and Bubble sort.

::: TODO
- Prio 1: is the argument below ok?
:::

But how about Selection sort?
It does not swap adjacent elements, so is there perhaps a possibility that we can optimise it to be better than quadratic?
-- Unfortunately not, and this is because Selection sort compares only adjacent elements.
Assume that we swap two non-adjacent elements, that have $d$ elements in between themselves.
If we are extremely lucky this single swap can reduce the number of inversions by $2d$.
However, our assumption was that we can only *compare adjacent* elements, and to be able to know which two indices to swap we have to compare all adjacent elements in between them.
So we need to perform at least $d+1$ comparisons to decide which indices to swap.
Therefore, we need $d+1=O(d)$ comparisons to reduce the number of inversions by $2d=O(d)$.
And since there are $O(n^2)$ inversions in the worst case, we need at least $O(n^2)$ comparisons.

Therefore, all sorting algorithms that can only compare adjacent elements (or swap adjacent elements) are doomed to be quadratic in the worst case, $O(n^2)$.
This includes the algorithms we have presented so far, and numerous other.

In the next chapter we will present sorting algorithms that are significantly better than these three under typical conditions.
How can they circumvent the quadratic behaviour?
-- They compare and swap non-adjacent elements (and they do it in a smart way).

::: dsvis
Inversions proficiency exercise

<avembed id="FindInversionsPRO" src="Sorting/FindInversionsPRO.html" type="ka" name="Inversions Proficiency Exercise"/>
:::
