
## Lower bounds and tight bounds {#analysis-2:other-bounds}

::: TODO
- Prio 1: update Summary of asymptotic notations - make it a Figure instead
:::

<!-- OPENDSA: START -->
Big-$O$ notation describes an upper bound.
In other words, big-$O$ states a claim about
the greatest amount of some resource (usually time) that is required by an algorithm.
A similar notation is used to describe the *least* amount of resources that an algorithm needs.
<!-- OPENDSA: END -->
This is the lower bound and is denoted by the symbol $\Omega$ (pronounced "Omega").
However, we are very rarely interested in the lower bound when we analyse algorithms.

Instead we are usually interested in the *tight bound*, $\Theta$ (pronounced "Theta").
The definition for big-$O$ allows us to greatly overestimate the cost for an algorithm
-- it is not false to say that binary search is in $O(n^2)$, but it is misleading.
Using the tight bound we can only say that binary search is in $\Theta(\log(n))$,
so it is a much more exact notion.

<div id="fig:upper-lower-tight-bounds">
--------------------------  ------------------  ------------------  ---------------------------------------
**Upper bound:**            $f\in O(g)$         **if and only if**  $f$ grows at most as fast as $g$
**Lower bound:**            $f\in\Omega(g)$     **if and only if**  $f$ grows at least as fast as $g$
**Tight bound:**            $f\in\Theta(g)$     **if and only if**  $f$ and $g$ grow at the same rate
--------------------------  ------------------  ------------------  ---------------------------------------

Informal definitions of the upper, lower and tight bounds.
</div>

All three notions are summarised in @fig:upper-lower-tight-bounds.
The formal definition of the lower bound, $\Omega$,
is the same as for the upper bound (see @sec:analysis-2:upper-bounds),
but reversing the inequality (using $\geq$ instead of $\leq$).
The definition of tight bound, $\Theta$, is that it is both an upper and a lower bound at the same time.

However, it is usually very difficult to reason about the tight bound.
For example, since we usually focus on the worst case in our analysis,
the simplification rules for $\Theta$ might not be applicable
as we may need to account for a case that is better than the worst case.
Therefore, if $f\in\Theta(g)$ and $f'\in\Theta(g')$,
we can neither assume that $f\cdot f'\in\Theta(g\cdot g')$, nor that $f+f'\in\Theta(g+g')$.
<!--
For example, the simplification rules for addition and multiplication do not hold for $\Theta$:
if $f\in\Theta(g)$ and $f'\in\Theta(g')$,
then it is neither guaranteed that $f\cdot f'\in\Theta(g\cdot g')$, nor that $f+f'\in\Theta(g+g')$,
-->


<!--
::: note
In this section we assume that all functions are *monotonically increasing*, just as we did in the previous section.
If we didn't assume this, the definitions would be slightly more complicated.
But, as discussed in the previous section, the runtime of all algorithms never decreases, so it is a safe assumtion.
:::
-->

<!--
### Lower bounds: the $\Omega$ notation

[Big-$O$ notation]{.term} describes an upper bound.
In other words, big-$O$ states a claim about the greatest amount of some resource (usually time) that is required by an algorithm for some class of inputs of size $n$.

A similar notation is used to describe the least amount of a resource that an algorithm needs for some class of input.
Like big-$O$, this is a measure of the algorithm's growth rate.
And like big-$O$, it works for any resource (usually time), and for some particular class of inputs of size $n$.
The [lower bound]{.term} for an algorithm (or a problem, as we will discuss in ...) is denoted by the symbol $\Omega$, pronounced "big-Omega" or just "Omega".
The following definition for $\Omega$ is symmetric with the definition of big-$O$.

Lower bound

: $f\in\Omega(g)$ **if and only if** there exist positive numbers $k$ and $n_0$ such that $f(n)\geq k\cdot g(n)$ for all $n>n_0$


::: example
#### Example: Quadratic algorithm

Assume $T(n) = c_1 n^2 + c_2 n$ for $c_1$ and $c_2 > 0$. Then,

$$
c_1 n^2 + c_2 n \geq c_1 n^2
$$

for all $n > 1$. So, $T(n) \geq c n^2$ for $c = c_1$ and
$n_0 = 1$. Therefore, $T(n)$ is in $\Omega(n^2)$ by the
definition.
:::

It is also true that the equation of the example above is in $\Omega(n)$.
However, as with big-$O$ notation, we wish to get the "tightest" (for $\Omega$ notation, the largest) bound possible.
Thus, we prefer to say that this running time is in $\Omega(n^2)$.

Recall the sequential search algorithm to find a value within an array of integers.
In the worst case this algorithm is in $\Omega(n)$, because in the worst case we must examine *at least* $n$ values.

#### Alternative definition for $\Omega$

An alternate (non-equivalent) definition for $\Omega$ is

Lower bound (alt.)

: $f\in\Omega(g)$ **if and only if** there exists a positive number $k$ such that $f(n)\geq k\cdot g(n)$ for an infinite number of values for $n$.

This definition says that for an "interesting" number of cases, the algorithm takes at least $k\cdot g(n)$ time.
Note that this definition is *not* symmetric with the definition of big-$O$.
For $g$ to be a lower bound, this definition *does not* require that $f(n) \geq k\cdot g(n)$ for all $n$ greater than some constant.
It only requires that this happen often enough, in particular that it happen for an infinite number of values for $n$.
Motivation for this alternate definition can be found in the following example.

Assume a particular algorithm has the following behaviour:

$$
T(n) =
\left\{ \begin{array}{ll}
    n  & \text{for all odd } n \\
    n^2/100 \;& \text{for all even } n
\end{array} \right.
$$

From this definition, $n^2/100 \geq k\cdot n^2$ for all even $n$, for any $k<0.01$.
So, $T(n) \geq k\cdot n^2$ for an infinite number of values of $n$.
Therefore, $T(n)$ is in $\Omega(n^2)$ by the definition.

For this equation for $T(n)$, it is true that all inputs of
size $n$ take at least $cn$ time. But an infinite number of inputs
of size $n$ take $cn^2$ time, so we would like to say that the
algorithm is in $\Omega(n^2)$. Unfortunately, using our first
definition will yield a lower bound of $\Omega(n)$ because it is not
possible to pick constants $k$ and $n_0$ such that
$T(n) \geq k\cdot n^2$ for all $n>n_0$. The alternative
definition does result in a lower bound of $\Omega(n^2)$ for this
algorithm, which seems to fit common sense more closely.
Fortunately, few real algorithms or computer programs display the
pathological behaviour of this example. Our first definition for
$\Omega$ generally yields the expected result.

As you can see from this discussion, asymptotic bounds notation is
not a law of nature. It is merely a powerful modeling tool used to
describe the behaviour of algorithms.
-->

### Tight bounds: the $\Theta$ notation

If an algorithm is both in $O(f)$ and in $\Omega(f)$ for some $f$,
we can say that it is in $\Theta(f)$,
and $f$ is a *tight bound* for the algorithm.

Almost all algorithms we will discuss in this book have the same tight bound as their upper bound,
for example, Binary search is in $\Theta(\log(n))$, Linear search is in $\Theta(n)$,
Selection and Insertion sort are in $\Theta(n^2)$, and Mergesort is in $\Theta(n\log(n))$.

<!-- OPENDSA: START -->
The analysis for most commonly used algorithms is well understood and
we can almost always give a $\Theta$ analysis for them.
However, the class of [NP-Complete]{.term} problems all have no definitive $\Theta$ analysis,
just some unsatisfying big-$O$ and $\Omega$ analyses.
Even some "simple" programs are hard to analyse.
Nobody currently knows the true upper or lower bounds for the following code fragment:
<!-- OPENDSA: END -->

    while n > 1:
        if n is odd:
            n = 3 * n + 1
        else:
            n = n / 2

But even though $\Theta$ is a more accurate description of the behaviour of an algorithm,
we have chosen to almost exclusively use the upper bound big-$O$ notation.
The reason for this because it is more difficult to reason about the tight bound than about big-$O$.

### Summary of asymptotic notations

The upper and lower bounds are not strict, meaning that a function is in its own class, $f\in O(f)$ and $f\in\Omega(f)$.
We can also define strict versions of the upper and lower bounds, $o(f)$ and $\omega(f)$,
where we just replace the $\leq$ and $\geq$ in the definitions of $O$ and $\Omega$ with the strict inequalities $<$ and $>$.

All these different bounds correspond to comparison operators between complexity classes.
For example, $O(f)\leq O(g)$ means the same thing as $f\in O(g)$,
$O(f)=O(g)$ means the same as $f\in\Theta(g)$,
$O(f)>O(g)$ means the same as $f\in\omega(g)$, and so on.


#### Asymptotic equivalence

Two functions $f$ and $g$ are asymptotic equivalenct, $f\sim g$, if
the quotient $f(n)/g(n)\rightarrow 1$ when $n \rightarrow \infty$.
This is an even stricter notion than the tight bound $\Theta$.
With this we mean that that if $f\sim g$ then $f\in\Theta(g)$,
but it is not necessarily the other way around.
The difference is that $f\sim g$ does not disregard all constants --
the multiplicative constants of the fastest-growing term will be kept.
For example, the following function:

$$ f(n) = 5 n^2 - 7 n + 100 \log_2(n) + 10^9 $$

is asymptotically equal to $5n^2$ when $n \rightarrow \infty$,
or in other words, $f(n) \sim 5n^2$.
Asymptotic equivalence can be used to compare different algorithms within the same complexity class,
but it is even more difficult to reason about than the tight bound.

Interestingly, asymptotic equivalence has an alternative definition in terms of the strict lower bound:
$f \sim g$ if and only if $(f-g) \in o(g)$.
It is a nice mathematical exercise to show that this is true, from the definitions above.


#### Classifying functions using limits

We defined asymptotic equivalence using limits, and this is also possible for the upper, lower and tight bounds.
Instead of finding constants $k$ and $n_0$, we can see how the quotient between the two functions behave in the limit.
Given functions $f$ and $g$, we can take the limit of the quotient $f/g$ as $n$ grows towards infinity:
$k = \lim_{n \rightarrow \infty} \frac{f(n)}{g(n)}$.

@fig:limit-classification summarises the definitions the value of the limit $k$,
for the different asymptotic notations ($O$, $o$, $\Theta$, $\Omega$, $\omega$ and $\sim$).

<div id="fig:limit-classification">
Name            Notation             Definition                                         $f/g \rightarrow k$
-------------   ------------------   -------------------------------------------------  ---------------------------
Little-O        $f \in o(g)$         $f(n) < k\cdot g(n)$                               $k = 0$
Big-O           $f \in O(g)$         $f(n) \leq k\cdot g(n)$                            $k < \infty$
Theta           $f \in \Theta(g)$    $k_1\cdot g(n) \leq f(n) \leq k_2\cdot g(n)$       $0 < k < \infty$
Big-Omega       $f \in \Omega(g)$    $f(n) \geq k\cdot g(n)$                            $k > 0$
Little-Omega    $f \in \omega(g)$    $f(n) > k\cdot g(n)$                               $k = \infty$
Equivalence     $f \sim g$           $\lim_{n\rightarrow\infty}\frac{f(n)}{g(n)}=1$     $k = 1$
-------------   ------------------   -------------------------------------------------  ---------------------------



Summary of the different asymptotic notations.
</div>

::: {.example #ex:compare-two-functions}
#### Example: Comparing two functions

Assume $f(n) = n^2$ and $g(n) = 10^9n\log(n)$, how can we classify $f$ in terms of $g$?
To answer this we calculate the limit of the quotient $f/g$ when $n$ grows:

$$
\lim_{n \rightarrow \infty} \tfrac{f(n)}{g(n)} =
\lim_{n \rightarrow \infty} \tfrac{n^2}{10^9n\log(n)} =
\tfrac{1}{10^9}\cdot\lim_{n \rightarrow \infty} \tfrac{n}{\log(n)} = \infty
$$

because $n$ grows faster than $\log(n)$.
Thus, $f\in\Omega(g)$ (or equivalently, $g\in O(f)$).
:::
