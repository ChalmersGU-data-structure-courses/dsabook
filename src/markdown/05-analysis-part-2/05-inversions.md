
## Case study: Inversions and quadratic sorting algorithms {#analysis-2:inversions}

::: TODO
- Prio 1: is the argument about Selection sort ok?
:::

The sorting algorithms in [Chapter @sec:sorting-2] are all asymptotically much better than
the algorithms from [Chapter @sec:sorting-1].
Byt *why* is that -- or rather, why are Selection and Insertion sort so much slower?
The crucial bottleneck is that only *adjacent* records are compared or swapped.
To analyse this we first need to define the concept of *inversion*.

An *inversion* occurs when there are two elements in an array that come in the wrong order.
Formally, if $A[i]>A[j]$ for array indices $i<j$, then there is an inversion between $i$ and $j$.
For example, in the array $[12,36,84,57,71]$ there are inversions between indices $2$ and $3$
(elements $84$ and $57$ are out of order), and between indices $2$ and $4$ (elements $84$ and $71$).

The number of inversions in an array is a measure of how sorted the array is.
The most unsorted array according to this definition is reversely sorted, because then all pairs of indices are inversions.
So, the maximum number of inversions is the number of pairs, which is $n(n-1)/2$, or quadratic.

Now, assume that we swap two adjacent elements that are out of order.
This will reduce the number of inversions with at most $1$,
because all other inversions in the array will still be inversions.
Therefore, any algorithm which can only swap *adjacent* elements has to perform at least as many swaps as there are inversions.
And since there are a quadratic number of inversions in the worst case, any such algorithm will at least be quadratic.
This includes Insertion sort.

But how about Selection sort?
It does not swap adjacent elements, so is there perhaps a possibility that we can optimise it to be better than quadratic?
Unfortunately not, and this is because Selection sort only *compares* adjacent elements.
Assume that we swap two non-adjacent elements, that have $d$ elements in between themselves.
In the best case this single swap can reduce the number of inversions by $2d$.
However, our assumption was that we can only *compare adjacent* elements,
and to be able to know which two indices to swap we have to compare all adjacent elements in between them.
So we need to perform at least $d+1$ comparisons to decide which indices to swap.
Therefore, we need $d+1$ comparisons to reduce the number of inversions by $2d$.
And since there are $n(n-1)/2$ inversions in the worst case, we need at least $n(n-1)/4$ comparisons, which is quadratic.

Therefore, all sorting algorithms that can only compare or swap adjacent elements are doomed to be quadratic in the worst case.
This includes the algorithms from [Chapter @sec:sorting-1], and numerous others.
So what about Mergesort and Quicksort -- how can they circumvent the quadratic behaviour?
This is because they compare and swap *non-adjacent* elements (and they do it in a smart way).

::: dsvis
Inversions proficiency exercise

```{.jsav-embedded src="Sorting/FindInversionsPRO.html" type="ka" name="Inversions Proficiency Exercise"}
```
:::

