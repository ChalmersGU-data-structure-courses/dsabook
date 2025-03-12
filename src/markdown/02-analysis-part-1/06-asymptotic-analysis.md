
## Asymptotic analysis

::: TODO
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

Given functions $f$ and $g$ whose growth rates are expressed as
algebraic equations, we might like to determine if one grows faster than
the other.
One way to do this is to take the limit of the quotient of the two functions as $n$ grows towards infinity:

$$
\lim_{n \rightarrow \infty} \frac{f(n)}{g(n)}
$$

There are three possibilities:

- If the quotient goes to $\infty$, then $f$ grows faster than $g$.
  We say that $g$ is a *lower bound* of $f$, or that $f\in\Omega(g)$.
- If the quotient goes to zero, then $g$ grows faster than $g$.
  We say that $g$ is an *upper bound* of $f$, or that $f\in O(g)$.
- If the quotient goes to some constant other than zero, then both functions grow at the same rate,
  and we say that $f\in\Theta(g)$.

::: topic
#### Example: Comparing two functions {-}

Assume $f(n) = n^2$ and $g(n) = 1000n\log n$.
Is $f$ in $O(g)$, $\Omega(g)$, or $\Theta(g)$?

To answer this we can calculate the limit of the quotient $f(n)/g(n)$ when $n$ grows:

$$
\lim_{n \rightarrow \infty} \frac{f(n)}{g(n)} =
\lim_{n \rightarrow \infty} \frac{n^2}{1000n\log n} =
\frac{1}{1000}\cdot\lim_{n \rightarrow \infty} \frac{n}{\log n} = \infty
$$

because $n$ grows faster than $\log n$.

Thus, $f\in\Omega(g)$ (or equivalently, $g\in O(f)$).

This also shows that the constant factor $1000$ doesn't have any effect on the growth factor,
because $\infty/1000$ is still $\infty$.
:::

### Definitions of orders of growth

Using limits like above is one way of defining orders of growth, but in the context of algorithmic complexity it is more common with the following definitions:

- $f\in O(g)$ iff there exists positive numbers $k$ and $n_0$ such that $f(n) \leq k\cdot g(n)$ for all $n>n_0$.
- $f\in\Omega(g)$ iff there exists positive numbers $k$ and $n_0$ such that $f(n)\geq k\cdot g(n)$ for all $n>n_0$.
    - or equivalently: $f\in\Omega(g)$ iff $g\in O(f)$
- $f\in\Theta(g)$ iff there exists positive numbers $k_1$, $k_2$ and $n_0$ such that $k_1\cdot g(n) \leq f(n) \leq k_2\cdot g(n)$ for all $n>n_0$.
    - or equivalently: $f\in\Theta(g)$ iff $f\in O(g)$ and $f\in\Omega(g)$

(Note that these definitions assume that $f$ and $g$ are *positive* functions -- otherwise we have to take the absolute value too -- but since we will only be using them for comparing computational resources, they will always be positive.)

::: topic
#### Example: Comparing two functions (again) {-}

Assume the same functions as before, $f(n) = n^2$ and $g(n) = 1000n\log n$.
How can we use the definitions above to prove that $f\in\Omega(g)$?

We have to find positive numbers $k$ and $n_0$ so that $f(n)\geq k\cdot g(n)$.
Since $g$ has a constant factor of 1000, we can try with $k=0.001$:

$$
k\cdot g(n) = 0.001 \cdot 1000n\log n = n\log n
$$

Now we readily see that $f(n) = n^2$ is larger than $k\cdot g(n) = n\log n$ for all $n\geq 1$, so we can set $n_0 = 1$.

Note that there are plenty of possible values to choose from, such as $k=1$ and $n_0=13,789$.
We can even use very large values such as $k=n_0=10^99$, what we are interested in is after all what happens when $n$ grows infinitly large.
:::

### Should we use $O$, $\Omega$ or $\Theta$?

If an algorithm has a lower bound of $\Omega(f)$, we know that it will never run asymptotically faster than $f$.
But this is usually not very useful knowledge, because we are more interested in knowing how the algorithm works on on bad inputs.
Therefore the upper bound $O(f)$ is by far the most common complexity measure that people use, and this is what we will be using in this book.

One could argue that $\Theta(f)$ would be an even better measure, because it gives more information about an algorithm.
But it is much more difficult to reason about $\Theta(f)$, and therefore we (and almost all other algorithm books) use the upper bound notation $O(f)$.

#### Is the lower bound useless?

The lower bound is not useless, definitely not.
The main use case for $\Omega$ is when we want to classify *problems*, not algorithms.
One example is when proving that the lower bound for sorting is $\Omega(n\log n)$ (see section XX).
But classifying problems is out of scope for this book, so we will not use $\Omega$ much.

### Confusing the lower bound $\Omega$ with the best case

::: TODO
- (Peter) for me this is just confusing
    - is it even possible to talk about best and worst case $\Omega$?
    - would we lose something if we removed it?
:::

<inlineav id="LowerBoundCON" src="AlgAnal/LowerBoundCON.js" name="Lower Bounds visualization" links="AlgAnal/LowerBoundCON.css"/>

