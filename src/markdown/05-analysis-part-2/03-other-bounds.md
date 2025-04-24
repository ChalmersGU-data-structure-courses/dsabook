
## Lower bounds and tight bounds

::: TODO
- Prio 1: update the text in Summary of asymptotic notations
:::

The definition for big-$O$ allows us to greatly overestimate the cost for an algorithm.
But sometimes we know a tight bound -- that is, a bound that truly reflects the cost of the algorithm or program with a constant factor.
In that case, we can express this more accurate state of our knowledge using the tight bound $\Theta$ instead of using big-$O$.

However, it is usually much more difficult to reason about the tight bound,
for example, the simplifying rules for addition and multiplication do not hold for $\Theta$.
Therefore we will almost exclusively use the upper bound big-$O$ notation.

::: note
In this section we assume that all functions are *monotonically increasing*, just as we did in the previous section.
If we didn't assume this, the definitions would be slightly more complicated.
But, as discussed in the previous section, the runtime of all algorithms never decreases, so it is a safe assumtion.
:::

### Lower bounds: the $\Omega$ notation

[Big-$O$ notation]{.term} describes an upper bound.
In other words, big-$O$ states a claim about the greatest amount of some resource (usually time) that is required by an algorithm for some class of inputs of size $n$.

A similar notation is used to describe the least amount of a resource that an algorithm needs for some class of input.
Like big-$O$, this is a measure of the algorithm's growth rate.
And like big-$O$, it works for any resource (usually time), and for some particular class of inputs of size $n$.

The [lower bound]{.term} for an algorithm (or a problem, as explained later in section XX) is denoted by the symbol $\Omega$, pronounced "big-Omega" or just "Omega".
The following definition for $\Omega$ is symmetric with the definition of big-$O$.

Lower bound

: $f\in\Omega(g)$ **iff** there exist positive numbers $k$ and $n_0$ such that $f(n)\geq k\cdot g(n)$ for all $n>n_0$


:::: {#AAnalEx}
::: topic
#### Example: Quadratic algorithm {-}

Assume $T(n) = c_1 n^2 + c_2 n$ for $c_1$ and $c_2 > 0$. Then,

$$
c_1 n^2 + c_2 n \geq c_1 n^2
$$

for all $n > 1$. So, $T(n) \geq c n^2$ for $c = c_1$ and
$n_0 = 1$. Therefore, $T(n)$ is in $\Omega(n^2)$ by the
definition.
:::
::::

It is also true that the equation of the example above is in $\Omega(n)$.
However, as with big-$O$ notation, we wish to get the "tightest" (for $\Omega$ notation, the largest) bound possible.
Thus, we prefer to say that this running time is in $\Omega(n^2)$.

Recall the sequential search algorithm to find a value within an array of integers.
In the worst case this algorithm is in $\Omega(n)$, because in the worst case we must examine *at least* $n$ values.

#### Alternative definition for $\Omega$

An alternate (non-equivalent) definition for $\Omega$ is

Lower bound (alt.)

: $f\in\Omega(g)$ **iff** there exists a positive number $k$ such that $f(n)\geq k\cdot g(n)$ for an infinite number of values for $n$.

This definition says that for an "interesting" number of cases, the algorithm takes at least $k\cdot g(n)$ time.
Note that this definition is *not* symmetric with the definition of big-$O$.
For $g$ to be a lower bound, this definition *does not* require that $f(n) \geq k\cdot g(n)$ for all $n$ greater than some constant.
It only requires that this happen often enough, in particular that it happen for an infinite number of values for $n$.
Motivation for this alternate definition can be found in the following example.

Assume a particular algorithm has the following behavior:

\begin{eqnarray}
T(n)
&=&
\left\{ \begin{array}{ll}
    n  & \mbox{for all odd}\ n \\
    n^2/100 \;& \mbox{for all even}\ n
\end{array} \right.
\end{eqnarray}

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
pathological behavior of this example. Our first definition for
$\Omega$ generally yields the expected result.

As you can see from this discussion, asymptotic bounds notation is
not a law of nature. It is merely a powerful modeling tool used to
describe the behavior of algorithms.

### Tight bounds: the $\Theta$ notation

The definitions for big-$O$ and $\Omega$ give us ways to describe the
upper bound for an algorithm (if we can find an equation for the maximum
cost of a particular class of inputs of size $n$) and the lower bound
for an algorithm (if we can find an equation for the minimum cost for a
particular class of inputs of size $n$). When the upper and lower bounds
are the same within a constant factor, we indicate this by using
$\Theta$ (big-Theta) notation. An algorithm is said to be $\Theta(h(n))$
if it is in $O(h(n))$ *and* it is in $\Omega(h(n))$. Note that we drop
the word "in" for $\Theta$ notation, because there is a strict
equality for two equations with the same $\Theta$. In other words, if
$f(n)$ is $\Theta(g(n))$, then $g(n)$ is $\Theta(f(n))$.

Because the sequential search algorithm is both in $O(n)$ and in $\Omega(n)$ in the worst case, we say it is $\Theta(n)$ in the worst case.


Given an algebraic equation describing the time requirement for an
algorithm, the upper and lower bounds always meet. That is because in
some sense we have a perfect analysis for the algorithm, embodied by the
running-time equation. For many algorithms (or their instantiations as
programs), it is easy to come up with the equation that defines their
runtime behavior. The analysis for most commonly used algorithms is well
understood and we can almost always give a $\Theta$ analysis for them.
However, the class of [NP-Complete]{.term}
problems all have no definitive $\Theta$ analysis, just some
unsatisfying big-$O$ and $\Omega$ analyses. Even some "simple" programs
are hard to analyze. Nobody currently knows the true upper or lower
bounds for the following code fragment.

    while n > 1:
        if n is odd:
            n = 3 * n + 1
        else:
            n = n / 2

But even though $\Theta$ is a more accurate description of the behaviour of an algorithm,
we have chosen to almost exclusively use the upper bound big-$O$ notation.
The reason for this because it is more difficult to reason about the tight bound than about big-$O$.
For example, the simplifying rules for addition and multiplication do not hold for $\Theta$.
Another reason is that most other textbooks, research papers, and programmers will usually say that an algorithm is "order of" or "big-$O$" of some cost function, implicitly meaning that this is the tightest possible bound.


### Strict bounds

The upper and lower bounds are not strict, meaning that a function is in its own class, $f\in O(f)$ and $f\in\Omega(f)$.
We can also define strict versions of upper and lower bounds:

Strict upper bound (little-$o$)

: $f\in o(g)$ **iff** $f\in O(g)$ and $f\not\in\Omega(g)$

Strice lower bound ($\omega$)

: $f\in\omega(g)$ **iff** $f\in\Omega(g)$ and $f\not\in O(g)$


### Asymptotic notation and comparing complexity classes

We can summarise the different asymptotic notations ($O$, $o$, $\Omega$, $\omega$, and $\Theta$) in the following table:

Name           Bound                Notation                  Definition
-------------  -------------------  ------------------------  --------------------------------------------------
Little-O       Strict upper bound   $f(n) \in o(g(n))$        $|f(n)| < k\cdot g(n)$
Big-O          Upper bound          $f(n) \in O(g(n))$        $|f(n)| \leq k\cdot g(n)$
Theta          Tight bound          $f(n) \in \Theta(g(n))$   $k_1\cdot g(n) \leq |f(n)| \leq k_2\cdot g(n)$
Big-Omega      Lower bound          $f(n) \in \Omega(g(n))$   $f(n) \geq k\cdot g(n)$
Little-Omega   Strict lower bound   $f(n) \in \omega(g(n))$   $f(n) > k\cdot g(n)$


All these different bounds correspond to comparison operators between complexity classes:

  Comparison               Complexity class
--------------------     ---------------------
  $O(f) < O(g)$            $f\in o(g)$
  $O(f) \leq O(g)$         $f\in O(g)$
  $O(f) = O(g)$            $f\in\Theta(g)$
  $O(f) \geq O(g)$         $f\in\Omega(g)$
  $O(f) > O(g)$            $f\in\omega(g)$

Using these correspondences and the simplifying rules we can infer the following hierarchy of complexity classes:

$$
O(1) < O(\log n) < O(n) < O(n\log n) < O(n^2) < O(n^2\log n) < O(n^3) < \cdots < O(n^k) < O(2^n) < \cdots
$$

Zooming in on the very efficient (sub-linear) complexity classes we have:

$$
O(1) < O(\log \log n) < O(\log n) = O(\log n^2) = O(\log n^3) < O(\log^2 n) < O(\log^3 n) < O(\sqrt[3]{n}) < O(\sqrt{n}) < O(n)
$$

And if we instead look closer on the extreme other end of the scale:

$$
\cdots < O(n^1000) < O(1.0001^n) < O(2^n) < O(10^n) < O(1000^n) < O(n!) < O(n^n) < \cdots
$$


### Classifying functions using limits

There are alternative definitions of the upper, lower and tight bounds.
Instead of finding constants $k$ and $n_0$, we can see how the quotient between the two functions behave in the limit.

Given functions $f$ and $g$, we can take the limit of the quotient of the two as $n$ grows towards infinity:

$$
\lim_{n \rightarrow \infty} \frac{f(n)}{g(n)}
$$

We have the following possibilities:

Name           Notation            Limit, $\lim(f/g) \rightarrow k$
-------------  ------------------  ----------------------------------
Little-O       $f \in o(g)$        $k = 0$
Big-O          $f \in O(g)$        $k < \infty$
Theta          $f \in \Theta(g)$   $0 < k < \infty$
Big-Omega      $f \in \Omega(g)$   $k > 0$
Little-Omega   $f \in \omega(g)$   $k = \infty$


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
:::
