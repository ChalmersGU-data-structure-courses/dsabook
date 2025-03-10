
## Lower bounds and tight bounds

::: TODO
- Prio 1: this section says that Theta is the best to use, is that what we want?
- Prio 1: update the text in Summary of asymptotic notations
- Prio 3: do we really need the alternative definition of Omega?
:::

The definition for big-Oh allows us to greatly overestimate the cost for
an algorithm. But sometimes we know a tight bound -- that is, a bound
that truly reflects the cost of the algorithm or program with a constant
factor. In that case, we can express this more accurate state of our
knowledge using the $\Theta$ symbol instead of using big-Oh.

While some textbooks and programmers will casually say that an algorithm
is "order of" or "big-Oh" of some cost function, it is generally
better to use $\Theta$ notation rather than big-Oh notation whenever we
have sufficient knowledge about an algorithm to be sure that we know the
cost to within a constant factor. OpenDSA modules use $\Theta$ notation
in preference to big-Oh notation whenever our state of knowledge makes
that possible.

### Lower bounds: the $\Omega$ notation

[Big-Oh notation]{.term} describes an upper
bound. In other words, big-Oh notation states a claim about the greatest
amount of some resource (usually time) that is required by an algorithm
for some class of inputs of size $n$ (typically the worst such input,
the average of all possible inputs, or the best such input).

Similar notation is used to describe the least amount of a resource that
an algorithm needs for some class of input. Like big-Oh notation, this
is a measure of the algorithm's growth rate. Like big-Oh notation, it
works for any resource, but we most often measure the least amount of
time required. And again, like big-Oh notation, we are measuring the
resource required for some particular class of inputs: the worst-,
average-, or best-case input of size $n$.

The [lower bound]{.term} for an algorithm (or a
problem, as explained later) is denoted by the symbol $\Omega$,
pronounced "big-Omega" or just "Omega". The following definition for
$\Omega$ is symmetric with the definition of big-Oh.

> For $\mathbf{T}(n)$ a non-negatively valued function, $\mathbf{T}(n)$
> is in set $\Omega(g(n))$ if there exist two positive constants $c$ and
> $n_0$ such that $\mathbf{T}(n) \geq c g(n)$ for all $n > n_0$.


:::: {#AAnalEx}
::: topic
#### Example: Quadratic algorithm {-}

Assume $\mathbf{T}(n) = c_1 n^2 + c_2 n$ for $c_1$ and $c_2 > 0$. Then,

$$
c_1 n^2 + c_2 n \geq c_1 n^2
$$

for all $n > 1$. So, $\mathbf{T}(n) \geq c n^2$ for $c = c_1$ and
$n_0 = 1$. Therefore, $\mathbf{T}(n)$ is in $\Omega(n^2)$ by the
definition.
:::
::::

It is also true that the equation of the example above is in
$\Omega(n)$. However, as with big-Oh notation, we wish to get the
"tightest" (for $\Omega$ notation, the largest) bound possible. Thus,
we prefer to say that this running time is in $\Omega(n^2)$.

Recall the sequential search algorithm to find a value $K$ within an
array of integers. In the average and worst cases this algorithm is in
$\Omega(n)$, because in both the average and worst cases we must examine
*at least* $cn$ values (where $c$ is 1/2 in the average case and 1 in
the worst case).

#### Alternative definition for $\Omega$

An alternate (non-equivalent) definition for $\Omega$ is

> $\mathbf{T}(n)$ is in the set $\Omega(g(n))$ if there exists a
> positive constant $c$ such that $\mathbf{T}(n) \geq c g(n)$ for an
> infinite number of values for $n$.

This definition says that for an "interesting" number of cases,
the algorithm takes at least $c g(n)$ time. Note that this
definition is *not* symmetric with the definition of big-Oh. For
$g(n)$ to be a lower bound, this definition *does not* require that
$\mathbf{T}(n) \geq c g(n)$ for all values of $n$ greater than some
constant. It only requires that this happen often enough, in
particular that it happen for an infinite number of values for $n$.
Motivation for this alternate definition can be found in the
following example.

Assume a particular algorithm has the following behavior:

$$
\mathbf{T}(n) = \left\{ \begin{array}{ll}
n  & \mbox{for all odd}\ n \geq 1\\
n^2/100 \;& \mbox{for all even}\ n \geq 0
\end{array}
\right.
$$

From this definition, $n^2/100 \geq \frac{1}{100} n^2$ for all even
$n \geq 0$. So, $\mathbf{T}(n) \geq c n^2$ for an infinite number of
values of $n$ (i.e., for all even $n$) for $c = 1/100$. Therefore,
$\mathbf{T}(n)$ is in $\Omega(n^2)$ by the definition.

For this equation for $\mathbf{T}(n)$, it is true that all inputs of
size $n$ take at least $cn$ time. But an infinite number of inputs
of size $n$ take $cn^2$ time, so we would like to say that the
algorithm is in $\Omega(n^2)$. Unfortunately, using our first
definition will yield a lower bound of $\Omega(n)$ because it is not
possible to pick constants $c$ and $n_0$ such that
$\mathbf{T}(n) \geq c n^2$ for all $n>n_0$. The alternative
definition does result in a lower bound of $\Omega(n^2)$ for this
algorithm, which seems to fit common sense more closely.
Fortunately, few real algorithms or computer programs display the
pathological behavior of this example. Our first definition for
$\Omega$ generally yields the expected result.

As you can see from this discussion, asymptotic bounds notation is
not a law of nature. It is merely a powerful modeling tool used to
describe the behavior of algorithms.

### Tight bounds: the $\Theta$ notation

The definitions for big-Oh and $\Omega$ give us ways to describe the
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

Because the sequential search algorithm is both in $O(n)$ and in
$\Omega(n)$ in the average case, we say it is $\Theta(n)$ in the average
case.

Given an algebraic equation describing the time requirement for an
algorithm, the upper and lower bounds always meet. That is because in
some sense we have a perfect analysis for the algorithm, embodied by the
running-time equation. For many algorithms (or their instantiations as
programs), it is easy to come up with the equation that defines their
runtime behavior. The analysis for most commonly used algorithms is well
understood and we can almost always give a $\Theta$ analysis for them.
However, the class of
[NP-Complete]{.term}
problems all have no definitive $\Theta$ analysis, just some
unsatisfying big-Oh and $\Omega$ analyses. Even some "simple" programs
are hard to analyze. Nobody currently knows the true upper or lower
bounds for the following code fragment.

    while n > 1:
        if ODD(n):
            n = 3 * n + 1
        else:
            n = n / 2

While some textbooks and programmers will casually say that an algorithm
is "order of" or "big-Oh" of some cost function, it is generally
better to use $\Theta$ notation rather than big-Oh notation whenever we
have sufficient knowledge about an algorithm to be sure that the upper
and lower bounds indeed match. OpenDSA modules use $\Theta$ notation in
preference to big-Oh notation whenever our state of knowledge makes that
possible. Limitations on our ability to analyze certain algorithms may
require use of big-Oh or $\Omega$ notations. In rare occasions when the
discussion is explicitly about the upper or lower bound of a problem or
algorithm, the corresponding notation will be used in preference to
$\Theta$ notation.


### Summary of asymptotic notations

| Name         | Notation                | Definition                  |
|:-------------|:----------------------- |:----------------------------|
| Little-O     | $f(n) \in o(g(n))$      | $|f(n)| < k\cdot g(n)$      |
| Big-O        | $f(n) \in O(g(n))$      | $|f(n)| \leq k\cdot g(n)$   |
| Theta        | $f(n) \in \Theta(g(n))$ | $k_1\cdot g(n) \leq |f(n)| \leq k_2\cdot g(n)$ |
| Big-Omega    | $f(n) \in \Omega(g(n))$ | $f(n) \geq k\cdot g(n)$     |
| Little-Omega | $f(n) \in \omega(g(n))$ | $f(n) > k\cdot g(n)$        |

I prefer "$f \in O(n^2)$" to "$f = O(n^2)$" While $n \in O(n^2)$ and
$n^2 \in O(n^2)$, $O(n) \neq O(n^2)$.

Note: Big oh does not say how good an algorithm is -- only how bad it
**can** be.

If $\mathcal{A}\in O(n)$ and $\mathcal{B} \in O(n^2)$, is $\mathcal{A}$
better than $\mathcal{B}$? Perhaps\... but perhaps better analysis will
show that $\mathcal{A} = \Theta(n)$ while
$\mathcal{B} = \Theta(\log n)$.

Order Notation has practical limits. Notation: $\log n^2 (= 2 \log n)$
vs. $\log^2 n (= (\log n)^2)$ vs. $\log \log n$.

$\log 16^2 = 2 \log 16 = 8$.

$\log^2 16 = 4^2 = 16$.

$\log \log 16 = \log 4 = 2$.

Statement: Resource requirements for Algorithm $\mathcal{A}$ grow slower
than resource requirements for Algorithm $\mathcal{B}$.

Is $\mathcal{A}$ better than $\mathcal{B}$?

Potential problems:

-   How big must the input be?
-   Some growth rate differences are trivial Example: $\Theta(\log^2 n)$
    vs. $\Theta(n^{1/10})$. If $n$ is $10^{12} (\approx 2^{40})$ then
    $\log^2 n \approx 1600$, $n^{1/10} = 16$ even though $n^{1/10}$
    grows faster than $\log^2 n$. $n$ must be enormous (like $2^{150}$)
    for $n^{1/10}$ to be bigger than $\log^2 n$.

It is not always practical to reduce an algorithm's growth rate
"Practical" here means that the constants might become too much higher
when we shave off the minor asymptotic growth.

Shaving a factor of $n$ reduces cost by a factor of a million for input
size of a million. Shaving a factor of $\log \log n$ saves only a factor
of 4-5.

There is the concept of a "Practicality Window". In general, (1) we
have limited time to solve a problem, and (2) input can only get so big
before the computer chokes. Fortunately, algorithm growth rates are
USUALLY well behaved, so that Order Notation gives practical
indications. "Practical" is the keyword. We use asymptotics because
they provide a simple **model** that **usually** mirrors reality. This
is **useful** to simplify our thinking.
