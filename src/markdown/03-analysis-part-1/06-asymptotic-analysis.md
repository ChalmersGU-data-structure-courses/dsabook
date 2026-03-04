
## Asymptotic analysis

::: TODO
- Prio 3: add another example
:::

::: latex
@Fig:growthGraphs gives two views of a graph illustrating the growth rates for six equations.
:::

::: online
@Fig:growthGraphs gives two views of a graph illustrating the growth rates for six equations.
We repeat the graph here, where
the right view shows in detail the lower-left portion of the top view.
The horizontal axis represents input size, and the vertical axis can
represent time, space, or any other measure of cost.

```{.matplotlib dpi=300 alt="Illustration of the growth rates for six equations"}
import math
import numpy as np
import matplotlib.pyplot as plt
fig, (plt1, plt2) = plt.subplots(1, 2, figsize=(14,5))
xs = np.linspace(0, 50, 500)
ys_2logn = 2*np.log2(xs)
ys_n_2 = xs/2
ys_1n = xs
ys_nlogn_4 = xs*np.log2(xs)/4
ys_n2_10 = (xs**2)/10
ys_expn_20 = 2**xs/20
plt1.set_xlim(0, 50); plt1.set_ylim(0, 70)
plt1.plot(xs, ys_n_2, '--');   plt1.text(46, ys_n_2[-1]+2, 'n/2')
plt1.plot(xs, ys_1n, '--');   plt1.text(47, ys_1n[-1], 'n')
plt1.plot(xs, ys_2logn, '-');   plt1.text(43, ys_2logn[-1]+2, '2·log₂(n)')
plt1.plot(xs, ys_nlogn_4, '-'); plt1.text(38, 65, 'n·log₂(n)/4')
plt1.plot(xs, ys_n2_10, '-');    plt1.text(21, 65, 'n²/10')
plt1.plot(xs, ys_expn_20, '-');  plt1.text(12, 65, '2ⁿ/20')
plt1.plot([2,2,13,13], [0,16,16,0], ':', color='gray')
plt1.set_title('Growth rates for 5 equations')
plt2.set_xlim(2, 13); plt2.set_ylim(0, 16);
plt2.plot(xs, ys_n_2, '--');   plt2.text(12.2, ys_n_2[100]+0.4, 'n/2')
plt2.plot(xs, ys_1n, '--');   plt2.text(12.4, ys_1n[130], 'n')
plt2.plot(xs, ys_2logn, '-');   plt2.text(11.5, ys_2logn[130]+0.2, '2·log₂(n)')
plt2.plot(xs, ys_nlogn_4, '-'); plt2.text(11.3, ys_nlogn_4[109], 'n·log₂(n)/4')
plt2.plot(xs, ys_n2_10, '-');    plt2.text(11.2, 15, 'n²/10')
plt2.plot(xs, ys_expn_20, '-');  plt2.text(7.2, 15, '2ⁿ/20')
plt2.set_title('Zoomed in')
```
:::



Despite the larger constant for the curve labeled $10 n$ in the figure
above, $2 n^2$ crosses it at the relatively small value of $n = 5$. What
if we double the value of the constant in front of the linear equation?
As shown in the graph, $20 n$ is surpassed by $2 n^2$ once $n = 10$. The
additional factor of two for the linear [growth rate]{.term} does not much matter. It only doubles the $x$-coordinate
for the intersection point. In general, changes to a constant factor in
either equation only shift *where* the two curves cross, not *whether*
the two curves cross.

When you buy a faster computer or a faster compiler, the new problem
size that can be run in a given amount of time for a given growth rate
is larger by the same factor, regardless of the constant on the
running-time equation. The time curves for two algorithms with different
growth rates still cross, regardless of their running-time equation
constants. For these reasons, we usually ignore the constants when we
want an estimate of the growth rate for the running time or other
resource requirements of an algorithm. This simplifies the analysis and
keeps us thinking about the most important aspect: the growth rate. This
is called [asymptotic algorithm analysis]{.term}. To be precise, asymptotic analysis refers to the study of
an algorithm as the input size "gets big" or reaches a limit (in the
calculus sense). However, it has proved to be so useful to ignore all
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
Asymptotic analysis is a form of "back of the envelope"
[estimation]{.term} for
algorithm resource consumption. It provides a simplified model of the
running time or other resource needs of an algorithm. This
simplification usually helps you understand the behaviour of your
algorithms. Just be aware of the limitations to asymptotic analysis in
the rare situation where the constant is important.


### Orders of growth

To be able to discuss orders of growth for algorithms we need to do some abstractions.
The most important abstraction is to describe the runtime of an algorithm as a mathematical function from the input size to a number.
We actually don't care how we encode the input size, as long as it is proportional to the actual size of the input.
So we can, e.g., use the number of cells in an array as input, instead of trying to figure out the exact memory usage of the array.
And in the same way, we don't care about the unit of measure for the result -- it can be actual runtime, in seconds, minutes or hours, but it's more common to think about the number of "basic operations".
Already here we have abstracted away lots of things that relate to hardware, which is vital because we want to analyse algorithms, not implementations.
So we will say things like "the runtime of algorithm $\mathbf{A}$ is $f(n)$".

Now, the easiest way to view order of growth is not as an absolute propery of an algorithm, but instead as a relation between functions.
When we say that an algorithm is quadratic, we actually mean that the mathematical function $f(n)$ that describes the abstract runtime of the algorithm, is related to the quadratic function $g(n) = n^2$ in some way.

So, how can we relate functions using orders of growth?
We do this by saying that one function is a *bound* of another function.
E.g., when we say that an algorithm $\mathbf{A}$ is quadratic, we actually mean that the function $n^2$ is an upper bound of $\mathbf{A}$.
The following are informal definitions of *upper*, *lower* and *tight* bounds -- we will define them more rigorously in [Chapter @sec:analysis-part-2].

Upper bound

: $f$ is an upper bound of $g$ **iff** $f$ grows *at least as fast* as $g$, and we write this $f\in O(g)$

Lower bound

: $f$ is a lower bound of $g$ **iff** $f$ grows *at most as fast* as $g$, and we write this $f\in\Omega(g)$

Tight bound

: $f$ is a tight bound of $g$ **iff** both functions grow *at the same rate*, and we write this $f\in\Theta(g)$


### Should we use $O$, $\Omega$ or $\Theta$?

If an algorithm has a lower bound of $\Omega(f)$, we know that it will never run asymptotically faster than $f$.
But this is usually not very useful knowledge, because we are more interested in knowing how the algorithm works on on bad inputs.
Therefore the upper bound $O(f)$ is by far the most common complexity measure that people use, and this is what we will be using in this book.

One could argue that $\Theta(f)$ would be an even better measure, because it gives more information about an algorithm.
But it is much more difficult to reason about $\Theta(f)$, and therefore we will almost exclusively use the upper bound notation $O(f)$.

So, is the lower bound useless?
-- No, definitely not.
The main use case for $\Omega$ is when we want to classify *problems*, not algorithms.
One example is when proving that the lower bound for sorting is $\Omega(n\log(n))$, which we do in @sec:lower-bounds-for-sorting.
But classifying problems is out of scope for this book, so we will not use $\Omega$ much.


