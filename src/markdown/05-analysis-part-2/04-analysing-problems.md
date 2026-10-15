
## Analysing problems {#analysis-2:analysing-problems}

::: TODO
- Prio 1: change title, perhaps "Analysing problems instead of algorithms"
- Prio 1: rewrite OpenDSA texts
:::

Most often we use the techniques in this chapter to analyse an algorithm.
<!-- OPENDSA: START -->
But we can also use these same techniques to analyse the cost of a [problem]{.term}.
The key question that we want an answer to is: How hard is a problem?
<!-- OPENDSA: END -->

Intuitively we would expect that sorting is a harder problem than searching.
But how can we know that?
The sorting algorithms we have seen so far are both more complicated and slower than both linear and binary search.
But we haven't seen all possible sorting algorithms yet,
and how can we be certain that someone in the future won't invent a really efficient sorting algorithm
that is exactly as efficient as linear search?

To answer this question we need to be able to reason about the upper and lower bounds of a *problem*, instead of an algorithm.
So, what does upper and lower bound mean for a problem?
Our first thought might be that they are the same as the worst and best known algorithms for that problem.
But this is not useful -- we can make an algorithm as bad as we want, so the worst algorithm is infinitely bad.
And since we cannot be certain that there isn't any better algorithm than the currently best known,
we cannot say that the lower bound is the best known algorithm.

Instead, we say that the upper bound of a problem is the *best* algorithm that we currently know.
When we encounter an even better algorithm, we have improved the upper bound of the problem.
For example, the upper bound of the sorting problem is $O(n\log(n))$,
of searching in an unsorted array is $O(n)$, and of searching in a sorted array is $O(\log(n))$.

In contrast, the lower bound refers to the minimum that any algorithm *must* cost.
Or in other words, if we know a lower bound for a problem then
we know that there cannot be any algorithm with a better complexity.
For example, when sorting an array, we *must* look at every element, so sorting must be in $\Omega(n)$.
The same holds for searching in an unsorted array,
but it is not entirely obvious that $\Omega(\log(n))$ is the lower bound for searching in a sorted array.
(In fact, if we know the probability distribution of the elements there are even faster algorithms than binary search.)

As we already noted in @sec:analysis-2:other-bounds,
the lower bound, $\Omega$, is usually not interesting when we want to analyse an algorithm.
But if we want to analyse a *problem* instead of an algorithm, then it is $\Omega$ we want to know.
So as a rule of thumb we can say:

- when we analyse an *algorithm*, we are interested in the *upper bound*, big-$O$
- when we analyse a *problem*, we are instead interested in the *lower bound*, $\Omega$

So, how do upper and lower bounds relate to the key question -- how hard is a problem?
As we have argued, the upper bound relies on our knowledge of the currently best algorithm.
If the lower and upper bound are the same,
we know that we cannot find any algorithm with a better complexity than the currently best-known.
But if the lower bound is lower than the upper bound,
it could be because there are faster algorithms waiting to be found,
or it could be because the current lower bound can be improved upon.
Unfortunately, it is usually very difficult to show that a problem has a certain lower bound,
and it can be very difficult to come up with asymptotically faster algorithms.

::: {.example #ex:analysis-integer-multiplication}
#### Example: Lower bound of integer multiplication
There are many problems where there is gap between their lower and upper bounds.
One well-known example is *multiplication of long integers*:
the intuitive algorithm is quadratic in the number of digits, $O(n^2)$,
and in @sec:analysis-3:karatsuba we will see an $O(n^{1.6})$ algorithm.
For a long time the best algorithm was $O(n\log(n))$, and
it was long thought that this was also the lower bound.
But as late as 2026 an algorithm was published with complexity $O(n\log(n)^{1-\kappa})$,
where $\kappa$ is a very very small number (in fact $\kappa=2^{-182}$).
The algorithm itself is not interesting, but it shows that the lower bound cannot be $\Omega(n\log(n))$.
Therefore, the only thing we know about the lower bound is that it is $\Omega(n)$,
and it is unknown if this will improve in the future.
:::

A more standard example is sorting.
It is trivially $\Omega(n)$, because we at the very least have to look at least once at every element.
But the best algorithm is $O(n\log(n))$, so this is the upper bound of the problem.
Can we do better than this?
Yes, it is actually possible to prove that the sorting problem is $\Omega(n\log(n))$,
but only for *comparison-based* algorithms.
This means that the updated lower bound is true if the only information we can get from elements is
by comparing them to decide which one should come first.

All the sorting algorithms we have looked at are comparison-based,
but there are specialised algorithms that use other ways of deciding the order between the elements.
If we restrict ourselves to sorting *integer* arrays,
then there are several algorithms that are faster than $O(n\log(n))$
simply because they can use the *values* themselves to guide the sorting and not just a binary comparison operator.
For example, there is an algorithm which is $O(n\log(\log(n)))$.
So the lower bound for sorting integers is still not better than $\Omega(n)$.

<!-- OPENDSA: START -->
Knowing the lower bound for a problem does not give you a good algorithm,
but it does help you to know when to stop looking.
So, to summarise: The upper bound for a problem is the best that you *can* do,
while the lower bound for a problem is the least work that you *must* do.
<!-- OPENDSA: END -->

