
## Asymptotic analysis

::: TODO
- Prio 1: should we use O() or Omega or Theta when describing functions/algorithms?
    - perhaps O() and "as tight as possible"?
    - this influences all subsequence sections/chapters too
- Prio 1: give informal definition of O(), (and/or Omega and Theta?)
- Prio 2: extend the subsection Classifying functions
- Prio 2: add another example
:::


:::: {#RunTimeGraph2}
<inlineav id="GrowthRatesCON" src="AlgAnal/GrowthRatesCON.js" script="DataStructures/Plot.js" name="DataStructures/Plot.js AlgAnal/GrowthRatesCON" links="AlgAnal/GrowthRatesCON.css" height="450px" static/>

<inlineav id="GrowthRatesZoomCON" src="AlgAnal/GrowthRatesZoomCON.js" script="DataStructures/Plot.js" name="DataStructures/Plot.js AlgAnal/GrowthRatesZoomCON" links="AlgAnal/GrowthRatesZoomCON.css" height="420px" static/>

Two views of a graph illustrating the growth rates for six equations.
The bottom view shows in detail the lower-left portion of the top view.
The horizontal axis represents input size. The vertical axis can
represent time, space, or any other measure of cost.
::::

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
simplification usually helps you understand the behavior of your
algorithms. Just be aware of the limitations to asymptotic analysis in
the rare situation where the constant is important.


### Classifying functions

Given functions $f(n)$ and $g(n)$ whose growth rates are expressed as
algebraic equations, we might like to determine if one grows faster than
the other. The best way to do this is to take the limit of the two
functions as $n$ grows towards infinity,

$$
\lim_{n \rightarrow \infty} \frac{f(n)}{g(n)}
$$

If the limit goes to $\infty$, then $f(n)$ is in $\Omega(g(n))$ because
$f(n)$ grows faster. If the limit goes to zero, then $f(n)$ is in
$O(g(n))$ because $g(n)$ grows faster. If the limit goes to some
constant other than zero, then $f(n) = \Theta(g(n))$ because both grow
at the same rate.

::: topic
#### Example: Comparing two functions {-}

If $f(n) = n^2$ and $g(n) = 2n\log n$, is $f(n)$ in $O(g(n))$,
$\Omega(g(n))$, or $\Theta(g(n))$? Since

$$
\frac{n^2}{2n\log n} = \frac{n}{2\log n}
$$

we easily see that

$$
\lim_{n \rightarrow \infty} \frac{n^2}{2n\log n} = \infty
$$

because $n$ grows faster than $2\log n$. Thus, $n^2$ is in
$\Omega(2n\log n)$.
:::

<inlineav id="LowerBoundCON" src="AlgAnal/LowerBoundCON.js" name="Lower Bounds visualization" links="AlgAnal/LowerBoundCON.css"/>

