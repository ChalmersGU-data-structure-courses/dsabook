
## Analysing problems

::: TODO
- Prio 2: rewrite this text, more examples and help in how to analyse problems
:::

You most often use the techniques of algorithm analysis to analyse an [algorithm]{.term}.
But you can also use these same techniques to analyse the cost of a [problem]{.term}.
The key question that we want to ask is: How hard is a problem?

We should expect that in some sense,
the problem of sorting an array is harder than the problem of searching in the array.
Certainly the algorithms that we know for sorting seem to be more expensive than the algorithms that we know for searching.
But how can we know that for certain?

What we need are useful definitions for the upper bound and lower bound of a *problem*, instead of an algorithm.

One might start by thinking that the upper bound for a problem is how hard any algorithm can be for the problem.
But we can make algorithms as bad as we want, so that is not useful.
Instead, what is useful is to say that a problem is only as hard as what we *can* do.
In other words, we should define the upper bound for a problem to be the *best* algorithm that we know for the problem.

In contrast, the lower bound refers to the minimum that any algorithm *must* cost.
For example, when sorting an array, we *must* look at every element, so sorting must be in $\Omega(n)$.

So, how do upper and lower bounds relate to the key question -- how hard is a problem?
As we have argued, the upper bound relies on our knowledge of the currently best algorithm.
But how can we be certain that this algorithm is as good as it can be?
To know this we have to know about the lower bound of the problem,
in other words, if we know a lower bound for a problem then
we know that there cannot be any algorithm with a better complexity.

As we already noted in @sec:lower-bounds-and-tight-bounds,
the lower bound, $\Omega$, is usually not interesting when we want to analyse an algorithm.
But if we want to analyse a *problem* instead of an algorithm, then it is $\Omega$ we want to know.
So as a rule of thumb we can say:

- when we analyse an algorithm, we are interested in the *upper bound*, big-$O$
- when we analyse a problem, we are instead interested in the *lower bound*, $\Omega$

It is much easier to reason about algorithms than about problems.
For a problem to be in $\Omega(f)$ means that *every* algorithm that solves the problem is in $\Omega(f)$,
even algorithms that we have not thought of!
In other words, *every* algorithm *must* have at least this cost.
So, to prove a lower bound, we need an argument that is true, even for algorithms that we don't know.


It is usually very difficult to show that a problem has a certain lower bound, so nothing I expect you to come up with in your lifetime (I haven't done it for sure:). But here is a standard example:

- Sorting an array of $n$ elements is trivially $\Omega(n)$, because we at the very least have to look at least once at every element.
- But it is possible to prove that the sorting problem is actually $\Omega(n \log(n))$, for *comparison-based* sorting algorithms. This means that there are no sorting algorithm that has better complexity than $O(n \log(n))$, so Mergesort is an *asymptotically optimal* sorting algorithm.
- By a comparison-based algorithm, we mean that the only way we compare elements are by comparing two elements and deciding which of them should come first. All the sorting algorithms we have looked at are comparison-based.


Let us look ahead to analysing the problem of sorting to see how this process works.
What is the least possible cost for any sorting algorithm in the worst case?
The algorithm must at least look at every element in the input, just to determine that the input is truly sorted.
Thus, any sorting algorithm must take at least $\Omega(n)$ time.

In the previous chapters you learned about some quadratic algorithms and some linearithmic algorithms (for example Mergesort).
Thus, the problem of sorting can be said to have an upper bound in $O(n\log(n))$.
How do we close the gap between $\Omega(n)$ and $O(n\log(n))$?
Can there be even better sorting algorithms than Mergesort?
Regardless how many linearithmic algorithms we come up with,
we still cannot be certain that there is no with a better complexity.

Fortunately, we can prove that *any* sorting algorithm must be in $\Omega(n \log(n))$.
So, the problem of sorting has a linearithmic lower bound,
which is the same as the upper bounds for the best sorting algorithms.
Thus, we can conclude that the problem of sorting is $\Theta(n \log(n))$ in the worst case,
because the upper and lower bounds have met.

Knowing the lower bound for a problem does not give you a good algorithm,
but it does help you to know when to stop looking.
So, to summarise: The upper bound for a problem is the best that you *can* do,
while the lower bound for a problem is the least work that you *must* do.


### Case study: Inversions and quadratic sorting algorithms {#inversions}

The sorting algorithms in [Chapter @sec:sorting-part-2] are all asymptotically much better than
the algorithms from [Chapter @sec:sorting-part-1].
Byt *why* is that -- or rather, why are Bubble, Selection and Insertion sort so much slower?
The crucial bottleneck is that only *adjacent* records are compared or swapped.
To analyse this we first need to define the concept of *inversion*.

An *inversion* occurs when there are two elements in an array that come in the wrong order.
Formally, if $A[i]>A[j]$ for array indices $i<j$, then there is an inversion between $i$ and $j$.
For example, in the array [12,36,84,57,71] there are inversions between indices 2 and 3
(elements 84 and 57 are out of order), and between indices 2 and 4 (elements 84 and 71).

The number of inversions in an array is a measure of how sorted the array is.
The most unsorted array according to this definition is reversely sorted, because then all pairs of indices are inversions.
So, the maximum number of inversions is the number of pairs, which is $n(n-1)/2$, or quadratic.

Now, assume that we have an array, and we swap two adjacent out-of-order elements.
This will reduce the number of inversions with at most 1,
because all other inversions in the array will still be inversions.
Therefore, any algorithm which can only swap *adjacent* elements has to perform at least as many swaps as there are inversions.
And since there are a quadratic number of inversions in the worst case, any such algorithm will at least be quadratic.
This includes Insertion sort and Bubble sort.

::: TODO
- Prio 1: is the argument below ok?
:::

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
This includes the algorithms from [Chapter @sec:sorting-part-1], and numerous other.
So what about Mergesort and Quicksort -- how can they circumvent the quadratic behaviour?
This is because they compare and swap *non-adjacent* elements (and they do it in a smart way).

::: dsvis
Inversions proficiency exercise

```{.jsav-embedded src="Sorting/FindInversionsPRO.html" type="ka" name="Inversions Proficiency Exercise"}
```
:::

