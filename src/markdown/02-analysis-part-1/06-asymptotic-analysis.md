
## Asymptotic analysis

::: TODO
- Prio 2: add another example
:::

Here are two views of a graph illustrating the growth rates for six equations.
The bottom view shows in detail the lower-left portion of the top view.
The horizontal axis represents input size. The vertical axis can
represent time, space, or any other measure of cost.

<inlineav id="GrowthRatesCON" src="AlgAnal/GrowthRatesCON.js" script="DataStructures/Plot.js" name="DataStructures/Plot.js AlgAnal/GrowthRatesCON" links="AlgAnal/GrowthRatesCON.css" height="450px" static/>

<inlineav id="GrowthRatesZoomCON" src="AlgAnal/GrowthRatesZoomCON.js" script="DataStructures/Plot.js" name="DataStructures/Plot.js AlgAnal/GrowthRatesZoomCON" links="AlgAnal/GrowthRatesZoomCON.css" height="420px" static/>

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
The following are the most common definitions of *upper*, *lower* and *tight* bounds:

Upper bound

: $f$ is an upper bound of $g$ **iff** $f$ grows *at least as fast* as $g$, and we write this $f\in O(g)$

Lower bound

: $f$ is a lower bound of $g$ **iff** $f$ grows *at most as fast* as $g$, and we write this $f\in\Omega(g)$

Tight bound

: $f$ is a lower bound of $g$ **iff** both functions grow *at the same rate*, and we write this $f\in\Theta(g)$


### Defining orders of growth

But how do we define upper and lower bounds?
First, if $g$ is an upper bound of $f$, then this should mean something like $f(n)\leq g(n)$ *in the long run*.
What we mean by this is that whenever $n$ becomes sufficiently large, then $f(n)$ should not outgrow $g(n)$.

But this is not all there is to it.
We have already mentioned that we want to abstract away from constant factors --
if algorithm $\mathbf{A}$ is twice as fast as algorithm $\mathbf{B}$, then they grow at the same rate, and we want our notation to capture that.
So what we want to say is that $f(n)\leq k\cdot g(n)$, for some arbitrary constant $k$.

Now we can give formal definitions of upper, lower and tight bounds:

Upper bound

: $f\in O(g)$ **iff** there exist positive numbers $k$ and $n_0$ such that $f(n) \leq k\cdot g(n)$ for all $n>n_0$

Lower bound

: $f\in\Omega(g)$ **iff** there exist positive numbers $k$ and $n_0$ such that $f(n)\geq k\cdot g(n)$ for all $n>n_0$

: or equivalently: $f\in\Omega(g)$ **iff** $g\in O(f)$

Tight bound

: $f\in\Theta(g)$ **iff** there exist positive numbers $k_1$, $k_2$ and $n_0$ such that $k_1\cdot g(n) \leq f(n) \leq k_2\cdot g(n)$ for all $n>n_0$

: or equivalently: $f\in\Theta(g)$ **iff** $f\in O(g) \wedge f\in\Omega(g)$

(These definitions assume that $f$ and $g$ are *monotonically increasing*, i.e., that they never decrease when the input increases.
But since we will only be using them for comparing computational resources, they will always be monotonically increasing.)

::: topic
#### Example: Comparing two functions {-}

Assume $f(n) = n^2$ and $g(n) = 1000n\log n$.
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
But it is much more difficult to reason about $\Theta(f)$, and therefore we will almost exclusively use the upper bound notation $O(f)$.

#### Is the lower bound useless?

The lower bound is not useless, definitely not.
The main use case for $\Omega$ is when we want to classify *problems*, not algorithms.
One example is when proving that the lower bound for sorting is $\Omega(n\log n)$ (see section XX).
But classifying problems is out of scope for this book, so we will not use $\Omega$ much.


