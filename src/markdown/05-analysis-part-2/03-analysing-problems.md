
## Analysing problems

::: TODO
- Prio 2: rewrite this text, more examples and help in how to analyse problems
:::

You most often use the techniques of algorithm analysis to analyse an [algorithm]{.term}
(or the instantiation of an algorithm as a [program]{.term}).
But you can also use these same techniques to analyse the cost of a [problem]{.term}.
The key question that we want to ask is: How hard is a problem?

Certainly we should expect that in some sense, the problem of sorting a list of records is harder than the problem of searching a list of records for a given key value.
Certainly the algorithms that we know for sorting some records seem to be more expensive than the algorithms that we know for searching those same records.

What we need are useful definitions for the upper bound and lower bound of a *problem*, instead of an algorithm.

One might start by thinking that the upper bound for a problem is how hard any algorithm can be for the problem.
But we can make algorithms as bad as we want, so that is not useful.
Instead, what is useful is to say that a problem is only as hard as what we *can* do.
In other words, we should define the upper bound for a problem to be the *best* algorithm that we know for the problem.

But what does it then mean to give a lower bound for a problem?
Lower bound refers to the minimum that any algorithm *must* cost.
For example, when searching an unsorted list, we *must* look at every record.
When sorting a list, we *must* look at every record (to even know if it is sorted).

So, how do upper and lower bounds relate to the key question -- how hard is a problem?
As we have argued, the upper bound relies on our knowledge of the currently best algorithm.
But how can we be certain that this algorithm is as good as it can be?
To know this we have to know about the lower bound of the problem,
i.e., the lower bound tells us how hard a problem is.

As a rule of thumb we can say:

- when we analyse an algorithm, we are interested in the *upper bound*, big-$O$
- when we analyse a problem, we are instead interested in the *lower bound*, $\Omega$

It is much easier to show that an algorithm (or program) is in $\Omega(f)$ than it is to show that a problem is in $\Omega(f)$.
For a problem to be in $\Omega(f)$ means that *every* algorithm that solves the problem is in $\Omega(f)$, even algorithms that we have not thought of!
In other words, *every* algorithm *must* have at least this cost.
So, to prove a lower bound, we need an argument that is true, even for algorithms that we don't know.

So far all of our examples of algorithm analysis give "obvious" results, with big-$O$ always matching $\Omega$.
To understand how big-$O$, $\Omega$, and $\Theta$ notations are properly used to describe our understanding of a problem or an algorithm, it is best to consider an example where you do not already know a lot about the problem.

Let us look ahead to analysing the problem of sorting to see how this process works.
What is the least possible cost for any sorting algorithm in the worst case?
The algorithm must at least look at every element in the input, just to determine that the input is truly sorted.
Thus, any sorting algorithm must take at least $\Omega(n)$ time.
For many problems, this observation that each of the $n$ inputs must be looked at leads to an easy $\Omega(n)$ lower bound.

In the previous chapters about sorting, you learned about some sorting algorithms whose running time is in $O(n^2)$ -- Bubble sort, Selection sort and Insertion sort.
But you also learned about the linearithmic sorting algorithms Quicksort and Mergesort with a running time in $O(n\log n)$.
Thus, the problem of sorting can be said to have an upper bound in $O(n\log n)$.
How do we close the gap between $\Omega(n)$ and $O(n\log n)$?
Can there be even better sorting algorithms than Mergesort and Quicksort?
If you can think of no algorithm whose worst-case growth rate is better than $O(n\log n)$, and if you have discovered no analysis technique to show that the least cost for the problem of sorting in the worst case is greater than $\Omega(n)$, then you cannot know for sure whether or not there is a better algorithm.

Should we search for a faster algorithm?
Many have tried, without success.
Fortunately (or perhaps unfortunately?), we can prove that *any* sorting algorithm must have running time in $\Omega(n \log n)$ in the worst case.
So, the problem of sorting has a linearithmic lower bound, which is the same as the upper bounds for the best sorting algorithms.
Thus, we can conclude that the problem of sorting is $\Theta(n \log n)$ in the worst case, because the upper and lower bounds have met.

Knowing the lower bound for a problem does not give you a good algorithm.
But it does help you to know when to stop looking.
If the lower bound for the problem matches the upper bound for the algorithm (within a constant factor), then we know that we can find an algorithm that is better only by a constant factor.

So, to summarise: The upper bound for a problem is the best that you *can* do, while the lower bound for a problem is the least work that you *must* do.
If those two are the same, then we can say that we really understand our problem.


### Case study: Lower bounds for sorting {#lower-bounds-for-sorting}

:::::: latex
\booklink{Read the rest online}{5.3}{sec:lower-bounds-for-sorting}
::::::

By now you have seen many analyses for algorithms.
These analyses generally define the worst-case upper bounds.
For many of the algorithms presented so far, analysis has been quite easy.
This section considers a more difficult task: An analysis for the cost of a *problem* as opposed to an *algorithm*.

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
and $O(n \log n)$.

This section presents one of the most important and most useful proofs
in computer science: No sorting algorithm based on key comparisons can
possibly be faster than $\Omega(n \log n)$ in the worst case. This proof
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

The proof that any comparison sort requires $\Omega(n \log n)$ comparisons in the worst case is structured as follows:

1. First, comparison-based decisions can be modeled as the branches in a tree.
   This means that any sorting algorithm based on comparisons between records can be viewed as a binary tree whose nodes correspond to the comparisons, and whose branches correspond to the possible outcomes.
2. Next, the minimum number of leaves in the resulting tree is shown to be the factorial of $n$.
3. Finally, the minimum depth of a tree with $n!$ leaves is shown to be in $\Omega(n \log n)$.

Before presenting the proof of an $\Omega(n \log n)$ lower bound for
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

``` {.jsav-animation src="Sorting/SortingLowerBoundCON.js" links="Sorting/SortingLowerBoundCON.css"}
```
:::

Any sorting algorithm requiring $\Omega(n \log n)$ comparisons in the
worst case requires $\Omega(n \log n)$ running time in the worst case.
Because any sorting algorithm requires $\Omega(n \log n)$ running time,
the problem of sorting also requires $\Omega(n \log n)$ time. We already
know of sorting algorithms with $O(n \log n)$ running time, so we can
conclude that the problem of sorting requires $\Theta(n \log n)$ time.
As a corollary, we know that no comparison-based sorting algorithm can
improve on existing $\Theta(n \log n)$ time sorting algorithms by more
than a constant factor.

::::::
