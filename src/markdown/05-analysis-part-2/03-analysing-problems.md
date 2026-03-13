
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


### Case study: Lower bounds for sorting {#lower-bounds-for-sorting}

:::::: latex
\booklink{Read the rest online}{5.3}{sec:lower-bounds-for-sorting}
::::::

By now you have seen many analyses for algorithms.
These analyses generally define the worst-case upper bounds.
For many of the algorithms presented so far, analysis has been quite easy.
This section considers a more difficult task:
An analysis for the cost of a *problem* as opposed to an *algorithm*,
or to be more precise, the lower bound of the sorting problem.

:::::: online

As we explained earlier, the lower bound defines the best possible cost for *any* algorithm that solves the problem, including algorithms not yet invented.
Once we know the lower bound for the problem, we know that no future algorithm can possibly be (asymptotically) more efficient.

A simple estimate for a problem's lower bound can be obtained by
measuring the size of the input that must be read and the output that
must be written. Certainly no algorithm can be more efficient than the
problem's I/O time. From this we see that the sorting problem cannot be
solved by *any* algorithm in less than $\Omega(n)$ time because it takes
at least $n$ steps to read and write the $n$ values to be sorted.
Alternatively, any sorting algorithm must at least look at every input
value to recognise whether the input values are in sorted order. So,
based on our current knowledge of sorting algorithms and the size of the
input, we know that the *problem* of sorting is bounded by $\Omega(n)$
and $O(n \log(n))$.

This section presents one of the most important and most useful proofs
in computer science: No sorting algorithm based on key comparisons can
possibly be faster than $\Omega(n \log(n))$ in the worst case. This proof
is important for three reasons. First, knowing that widely used sorting
algorithms are asymptotically optimal is reassuring. In particular, it
means that you need not bang your head against the wall searching for an
$O(n)$ sorting algorithm. (Or at least not one that is in any way based
on key comparisons. But it is hard to imagine how to sort without any
comparisons.) Second, this proof is one of the few non-trivial
lower-bounds proofs that we have for any problem; that is, this proof
provides one of the relatively few instances where our lower bound is
tighter than simply measuring the size of the input and output. As such,
it provides a useful model for proving lower bounds on other problems.
Finally, knowing a lower bound for sorting gives us a lower bound in
turn for other problems whose solution could be made to work as the
basis for a sorting algorithm. The process of deriving asymptotic bounds
for one problem from the asymptotic bounds of another is called a
[reduction]{.term}.

All of the sorting algorithms we have studied make decisions based on
the direct comparison of two key values. For example, [Insertion sort]{.term}
sequentially compares the value to be inserted into the sorted list
until a comparison against the next value in the list fails.

The proof that any comparison sort requires $\Omega(n \log(n))$ comparisons in the worst case is structured as follows:

1. First, comparison-based decisions can be modeled as the branches in a tree.
   This means that any sorting algorithm based on comparisons between records can be viewed as a binary tree whose nodes correspond to the comparisons, and whose branches correspond to the possible outcomes.
2. Next, the minimum number of leaves in the resulting tree is shown to be the factorial of $n$.
3. Finally, the minimum depth of a tree with $n!$ leaves is shown to be in $\Omega(n \log(n))$.

Before presenting the proof of an $\Omega(n \log(n))$ lower bound for
sorting, we first must define the concept of a
[decision tree]{.term}. A decision tree is a
binary tree that can model the processing for any algorithm that makes
binary decisions. Each (binary) decision is represented by a branch in
the tree. For the purpose of modeling sorting algorithms, we count all
comparisons of key values as decisions. If two keys are compared and the
first is less than the second, then this is modeled as a left branch in
the decision tree. In the case where the first value is greater than the
second, the algorithm takes the right branch.

::: dsvis
Here is a visualisation that illustrates decision trees and the sorting
lower bound proof.

``` {.jsav-animation src="Sorting/SortingLowerBoundCON.js" links="Sorting/SortingLowerBoundCON.css" name="Sorting Lower Bound Slideshow"}
```
:::

Any sorting algorithm requiring $\Omega(n \log(n))$ comparisons in the
worst case requires $\Omega(n \log(n))$ running time in the worst case.
Because any sorting algorithm requires $\Omega(n \log(n))$ running time,
the problem of sorting also requires $\Omega(n \log(n))$ time. We already
know of sorting algorithms with $O(n \log(n))$ running time, so we can
conclude that the problem of sorting requires $\Theta(n \log(n))$ time.
As a corollary, we know that no comparison-based sorting algorithm can
improve on existing $\Theta(n \log(n))$ time sorting algorithms by more
than a constant factor.

::::::
