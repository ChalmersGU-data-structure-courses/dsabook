:::::: online

## Case study: Lower bounds for sorting* {#lower-bounds-for-sorting}

By now you have seen many analyses for algorithms.
These analyses generally define the worst-case upper bounds.
For many of the algorithms presented so far, analysis has been quite easy.
This section considers a more difficult task:
An analysis for the cost of a *problem* as opposed to an *algorithm*,
or to be more precise, the lower bound of the sorting problem.

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
