
## Upper bounds: the big-$O$ notation {#analysis-2:upper-bounds}

::: TODO
- Prio 1: more running text, less formula - now it looks scattered
:::

On an abstract level, every algorithm has a time function $T(n)$ that
perfectly calculates the running time of that algorithm for a worst case
value of size $n$. Determining this function exactly is neither realistically
possible, nor desirable. Instead we determine some properties of $T$,
most commonly establishing an [upper bound]{.term} of its growth rate.
The upper bound is denoted by the big-$O$ notation,
where $f\in O(g)$, where $g$ is an upper bound of $f$.
This tells us that the function $f$ will not grow faster than the function $g$.
But what does this mean?

If $g$ is an upper bound of $f$, that is if $f\in O(g)$,
then $f(n) \leq g(n)$ in *the long run*.
This means that whenever $n$ becomes sufficiently large, $f(n)$ must not outgrow $g(n)$.

But this is not all there is to it -- we also want to abstract away from constant factors.
If one algorithm is twice as fast as another algorithm,
then they grow at the same rate, and we want our notation to capture that.
So what we actually want to say is that $f(n) \leq k \cdot g(n)$, for some arbitrary positive constant $k$.
This gives us the following formal definition:

::: {.definition #defn:upper-bound}
#### Upper bound
$f \in O(g)$
**if and only if** there are positive numbers $k$ and $n_0$
such that $f(n) \leq k\cdot g(n)$ for all $n > n_0$.
:::

If this is the case we say that $g$ is an *upper bound* of $f$.

The exact values used for $k$ and $n_0$ are irrelevant
-- as long as you can find *any* values so that the inequality holds, you have found an upper bound.
They could be in the order of millions,
but for most common algorithms the constants $k$ and $n_0$ can be quite small.

Many authors write $f=O(g)$ for the upper bound, but we use set membership, $f \in O(g)$.
This is because we view $O(g)$ as the set of all functions $f$ for which the definition holds.
And this means that for example
$O(x^2)$, $O(5x^2)$, and $O(5x^2-7x+100\log_2(x)+10^9)$, all describe the same set.
However, we will always use the simplified form of this set, in this case $O(x^2)$.

::: note
#### Note: The definition is simplified
[](#defn:upper-bound) is somewhat simplified, it only works if $f$ and $g$ are *monotonically increasing*.
This means that the values $f(x)$ and $g(x)$ will never decrease whenever $x$ increases.
The mathematical definition that allows any non-monotonic functions is slightly more complicated,
but our simplified version is good enough for the purposes of algorithm analysis --
there is no realistic algorithm that becomes faster when the input size grows.
:::

::: {.example #ex:comparing-two-functions}
#### Example: Comparing two functions

Assume $f(n) = n\cdot\log(n)^2$ and $g(n) = 0.001\cdot n^2$.
How can we prove that $f \in O(g)$?
We have to find positive numbers $k$ and $n_0$ so that $f(n)\leq k\cdot g(n)$.
Since $g$ has a constant factor of $0.001$, we can try with $k=1000$:

$$
k\cdot g(n) = 1000 \cdot 0.001 \cdot n^2 = n^2
$$

Now we readily see that $f(n) = n\cdot\log(n)^2$ is
smaller than $k\cdot g(n) = n^2$ for all $n\geq 1$, so we can set $n_0 = 1$.

Note that there are plenty of possible values to choose from, such as $k=1$ and $n_0=13{,}789$.
We can even use very large values such as $k=n_0=10^{99}$,
since we are only interested in what happens when $n$ grows infinitly large.
:::

<!--
::: example
#### Example: Sequential search

Consider the sequential search algorithm for finding a specified value
in an array of integers. If visiting and examining one value in the
array requires $c_s$ steps where $c_s$ is a positive number, and if the
value we search for has equal probability of appearing in any position
in the array, then in the average case $T(n) = c_s n/2$. For
all values of $n > 1$, $c_s n/2 \leq c_s n$. Therefore, by the
definition, $T(n)$ is in $O(n)$ for $n_0 = 1$ and $c = c_s$.
:::
 -->

::: {.example #ex:quadratic-algorithm}
#### Example: Quadratic algorithm

Assume that for a particular algorithm, $T(n) = c n^2 + d n$, where both $c$ and $d$ are positive.
Then the following holds for all $n>1$:

$$
c n^2 + d n \leq c n^2 + d n^2 \leq (c + d) n^2
$$

So, $T(n) \leq k\cdot n^2$ for $k = c + d$, and $n_0 = 1$.
Therefore, $T(n)\in O(n^2)$ according to the definition.
:::

<!--
::: example
#### Example: Accessing an array cell

Assigning the value from a given position of an array to a variable
takes constant time regardless of the size of the array. Thus,
$T(n) = c$ (for the best, worst, and average cases). We could
say in this case that $T(n)$ is in $O(c)$. However, it is
traditional to say that an algorithm whose running time has a constant
upper bound is in $O(1)$.
:::
-->


### Big-$O$ and logarithms

One interesting consequence of asymptotic complexity is that the base of a logarithm becomes irrelevant:

$$ O(\log_2(n)) = O(\log_e(n)) = O(\log_{10}(n)) $$

The reason for this is that according to the logarithm laws,
$\log_b(n)$ is equal to $\log_a(n)\cdot 1/\log_a(b)$.
But $1/\log_a(b)$ is a constant which we can ignore inside big-$O$,
so $O(\log_b(n))$ is the same complexity class as $O(\log_a(n))$.
Therefore we can just ignore the base and write $O(\log(n))$.

Another consequence of the logarithm laws is that it doesn't really matter
if you take the logarithm from a linear, quadratic, cubic, or any power function:

$$ O(\log(n)) = O(\log(n^2)) = O(\log(n^3)) = O(\log(n^k)) $$

The reason for this is that $\log(n^k) = k\cdot\log(n)$ according to the logarithm laws,
so the exponent $k$ becomes a multiplicative constant and can be ignored.
However, taking the *power* of a logarithm cannot be ignored,
meaning that $O(\log(n))$ is not the same complexity class as $O(\log(n)^2)$.


### The complexity hierarchy

Big-$O$ classifies all functions and algorithms into *complexity classes*,
and these classes form a hierarchy -- the *complexity hierarchy*.

\begin{multline*}
O(1) < O(\log(n)) < O(\log(n)^2) < O(\sqrt{n}) < O(n) < O(n\log(n)) < \cdots \\
\cdots < O(n^2) < O(n^2 \log(n)) < O(n^3) < \cdots < O(2^n) < O(10^n) < \cdots < O(n!)
\end{multline*}

The definition of big-O only gives an *upper bound* of a function.
One effect of this is that $f\in O(g)$ even if $f$ grows *faster* than $g$.
For example, binary search is a logarithmic algorithm, $O(\log(n))$,
but it is also true to say that binary search is in $O(n)$ or even in $O(n^2)$.
So the complexity hierarchy above could also be formulated using subset notation:

$$ O(1) \subset O(\log(n)) \subset O(n) \subset O(n \log(n)) \subset O(n^2) \subset \cdots $$

However, we always seek to describe the complexity of an algorithm using
the tightest (lowest) possible upper bound.
Thus, we will always say that binary search is in $O(\log(n))$.

