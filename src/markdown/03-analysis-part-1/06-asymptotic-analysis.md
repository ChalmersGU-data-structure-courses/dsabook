
<!--
## Asymptotic analysis {#analysis-1:asymptotic-analysis}

::: TODO
- Reintroduce some of this stuff earlier on?
:::
->>

<!--

::: online
@Fig:growthGraphs gives two views of a graph illustrating the growth rates for six equations.
We repeat the graph here, where
the right view shows in detail the lower-left portion of the top view.
The horizontal axis represents input size, and the vertical axis can
represent time, space, or any other measure of cost.

![](images/growth_rates_graph.svg)
:::

::: latex
@Fig:growthGraphs gives two views of a graph illustrating the growth rates for six equations.
:::
-->

<!-- OPENDSA: START -->
<!--
Despite the smaller constant for the quadratic curve labeled $n^2/10$ in the figure,
it crosses the linear curve $n/2$ at the relatively small value of $n = 5$.
What if we double the value of the constant in front of the linear equation?
As shown in the graph, $n$ is surpassed by $n^2/10$ as soon as $n = 10$.
The additional factor of two for the linear growth rate does not matter much.
It only doubles the $x$-coordinate for the intersection point.
In general, changes to a constant factor in
either equation only shift *where* the two curves cross, not *whether*
the two curves cross.

When you buy a faster computer or a faster compiler, the new problem
size that can be run in a given amount of time for a given growth rate
is larger by the same factor.
The time curves for two algorithms with different
growth rates still cross, regardless of their running-time equation
constants. Therefore we usually ignore the constants when we
want an estimate of the growth rate of an algorithm.
This simplifies the analysis and keeps us thinking about the most important aspect: the growth rate.
This is called [asymptotic algorithm analysis]{.term}.
Asymptotic analysis refers to the study of an algorithm as the input "gets larger and larger".
In fact, it has proved to be so useful to ignore all
constant factors that asymptotic analysis is used for most algorithm
comparisons.

In rare situations, it is not reasonable to ignore the constants. When
comparing algorithms meant to run on small values of $n$, the constant
can have a large effect. For example, if the problem requires you to
sort many collections of exactly five records, then a sorting algorithm
designed for sorting thousands of records is probably not appropriate,
even if its asymptotic analysis indicates good performance. There are
rare cases where the constants for two algorithms under comparison can
differ by a factor of 1000 or more, making the one with lower growth
rate impractical for typical problem sizes due to its large constant.

Asymptotic analysis provides a simplified model of the
running time or other resource needs of an algorithm. This
simplification usually helps you understand the behaviour of your
algorithms. Just be aware of the limitations to asymptotic analysis in
the rare situation where the constant is important.
-->
<!-- OPENDSA: END -->

<!--
### Orders of growth

To be able to discuss orders of growth for algorithms we need to do some abstractions.
The most important abstraction is to describe the runtime of an algorithm
as a mathematical function from the input size to a number.
We actually don't care how we encode the input size,
as long as it is proportional to the actual size of the input.
So we can, for example, use the number of cells in an array as input,
instead of trying to figure out the exact memory usage of the array.
And in the same way, we don't care about the unit of measure for the result
-- it can be actual runtime, in seconds, minutes or hours,
but it's more common to think about the number of "basic operations".
Already here we have abstracted away lots of things that relate to hardware,
which is vital because we want to analyse algorithms, not implementations.
So we will say things like "the runtime of algorithm **A** is $f(n)$".

Now, the easiest way to view order of growth is not as an absolute propery of an algorithm,
but instead as a relation between functions.
When we say that an algorithm is quadratic,
we actually mean that the mathematical function $f(n)$ that describes the abstract runtime of the algorithm,
is related to the quadratic function $g(n) = n^2$ in some way.

So, how can we relate functions using orders of growth?
We do this by saying that one function is a *bound* of another function.
For instance, when we say that an algorithm **A** is quadratic,
we actually mean that the function $n^2$ is an upper bound of **A**.

Upper bound

:   $g$ is an upper bound of $f$ **if and only if**
    $f$ grows *at most as fast* as $g$, and we write this $f\in O(g)$.

The upper bound is by far the most common notion we use,
but there are also the *lower* and the *tight* bounds.
They will be discussed later in @sec:analysis-2:other-bounds.
-->
