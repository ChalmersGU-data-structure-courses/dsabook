
## Upper bounds: the big-$O$ notation

::: TODO
- Prio 1: formal definition
:::

Several terms are used to describe the running-time equation for an algorithm.
The most common term is the [upper bound]{.term} of the growth rate of a function.
The upper bound is denoted by the big-$O$ notation,
where $f\in O(g)$ is pronounced "$g$ is an upper bound of $f$".
This tells us that the function $f$ will not grow faster than the function $g$.
But what does this mean?

If $g$ is an upper bound of $f$, that is $f\in O(g)$,
then this means that $f(n) \leq g(n)$ in *the long run*.
That is, whenever $n$ becomes sufficiently large, $f(n)$ must not outgrow $g(n)$.

But this is not all there is to it -- we also want to abstract away from constant factors.
If one algorithm is twice as fast as another algorithm,
then they grow at the same rate, and we want our notation to capture that.
So what we actually want to say is that $f(n) \leq k \cdot g(n)$, for some arbitrary constant $k$.
This gives us the following formal definition:

Upper bound

:   $f \in O(g)$
    **if and only if** there are positive numbers $k$ and $n_0$
    such that $f(n) \leq k\cdot g(n)$ for all $n > n_0$.

If this is the case we say that $g$ is an *upper bound* of $f$.

It is irrelevant what the values $k$ and $n_0$ are in the end
-- as long as you can find *any* values so that the inequality holds, you have found an upper bound.
They could be in the order of millions,
but for most common algorithms the constants $k$ and $n_0$ can be quite small.

Some authors write $f=O(g)$ for the upper bound, but we use set membership, $f \in O(g)$.
This is because we view $O(g)$ as the set of all functions $f$ for which the definition holds.
And this means that for example
$O(x^2)$, $O(5x^2)$, and $O(5x^2-7x+100\log_2(x)+10^9)$, all describe the same set.
However, we will always use the most compact way of describing this set, in this case $O(x^2)$.

::: note
The definition is somewhat simplified, it only works if $f$ and $g$ are *monotonically increasing*.
This means that if $x\leq y$ then $f(x)\leq f(y)$, so the value can never decrease whenever $x$ increases.
But this is not a real restriction for the purposes of algorithm analysis,
because there are no algorithms that becomes faster when the input size grows.
In the very best case, the runtime of an algorithm can be independent of the input size,
but this is also monotonically increasing.
The mathematical definition that allows any non-monotonic functions is slightly more complicated,
and can be found in mathematical textbooks, or in Wikipedia.
:::

::: example
#### Example: Comparing two functions

Assume $f(n) = n\cdot\log(n)^2$ and $g(n) = 0.001\cdot n^2$.
How can we use the definitions above to prove that $f \in O(g)$?

We have to find positive numbers $k$ and $n_0$ so that $f(n)\leq k\cdot g(n)$.
Since $g$ has a constant factor of $0.001$, we can try with $k=1000$:

$$
k\cdot g(n) = 1000 \cdot 0.001 \cdot n^2 = n^2
$$

Now we readily see that $f(n) = n\cdot\log(n)^2$ is
smaller than $k\cdot g(n) = n^2$ for all $n\geq 1$, so we can set $n_0 = 1$.

Note that there are plenty of possible values to choose from, such as $k=1$ and $n_0=13,789$.
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

::: example
#### Example: Quadratic algorithm

Assume that for a particular algorithm, $T(n) = c n^2 + d n$.
If both $c$ and $d$ are positive, then this holds for all $n>1$:

$$
c n^2 + d n \leq c n^2 + d n^2 \leq (c + d) n^2
$$

So, $T(n) \leq k\cdot n^2$ for $k = c + d$, and $n_0 = 1$.
Therefore, $T(n)\in O(n^2)$ by the definition.
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

The reason for this is that according to the logarithm laws, $\log_b(n) = \log_a(n)\cdot 1/\log_a(b)$.
But $1/\log_a(b)$ is a constant which we can ignore inside big-$O$, so $O(\log_b(n)) = O(\log_a(n))$.
Therefore we can just ignore the base and write $O(\log(n))$.

Another consequence of the logarithm laws is that it doesn't really matter
if you take the logarithm from a linear, quadratic, cubic, or any power function:

$$ O(\log(n)) = O(\log(n^2)) = O(\log(n^3)) = O(\log(n^k)) $$

The reason for this is that $\log(n^k) = k\cdot\log(n)$ according to the logarithm laws,
so the exponent $k$ becomes a multiplicative constant and can be ignored.

However, taking the *power* of a logarithm cannot be ignored,
so $O(\log(n))$ and $O(\log(n)^2)$ are different complexity classes.


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

$$ O(1) \subset O(\log(n)) \subset O(n) \subsetneq O(n \log(n)) \subsetneq O(n^2) \subsetneq \cdots $$

However, we always seek to describe the complexity of an algorithm using
the tightest (lowest) possible upper bound.
Thus, we will always say that binary search is in $O(\log(n))$.


### Simplifying rules

Using the definition the simplifying rules from @sec:simplification-rules are quite straightforward to prove:

     Rule              Simplification
---  ----------------  -------------------------------------------------------------------
(1)  Transitivity      if $f\in O(g)$ and $g\in O(h)$, then $f\in O(h)$
(2)  Constant $k>0$    if $f\in O(g)$, then $k\cdot f\in O(g)$
(3)  Addition          if $f\in O(g)$ and $f'\in O(g')$, then $f+f'\in O(\max(g,g'))$
(4)  Multiplication    if $f\in O(g)$ and $f'\in O(g')$, then $f\cdot f'\in O(g\cdot g')$

<!--
(2) alternatively, $k \cdot O(g) = O(g)$)
(3) alternatively, $O(g) + O(g') = O(\max(g,g'))$)
(4) alternatively, $O(g) \cdot O(g') = O(g\cdot g')$)
 -->

Using these rules we can easily determine the asymptotic growth rate for many algorithms.

- Rule (2) says that any constant-time operation is $O(1)$.
- Rule (3) says that if you have a sequence of statements,
  you only need to consider the most expensive statement: $O(\max(f_1,\ldots,f_k))$.
- Rule (4) says that if you have a loop that repeats a statement $p$ a number of times $n$,
  the total cost is the cost of $p$ times the number of iterations: $O(n\cdot f)$.
- Rule (2) also says that if you repeat a statement $p$ a *constant* number of times,
  you can treat it as you only execute $p$ once.


### Recursive functions

Determining the execution time of a recursive function can be difficult.
This is typically best expressed by a [recurrence relation]{.term}.

For example, the recursive version of binary search calls itself
with an interval that is half the size of its input interval.
Apart from the recursive call, the function makes some constant time work.
We can model this as the following recurrence relation,
where $T(1)=1$ denotes the constant time work of the base case:

\begin{align*}
T(n) &= T(n/2) + 1, \mbox{ for } n>1 \\
T(1) &= 1
\end{align*}

Another example is Mergesort, which calls itself *twice* with an halved interval.
After the recursive calls it merges the results, which takes linear time.
This gives the following recurrence relation:

\begin{align*}
T(n) &= 2\cdot T(n/2) + n, \mbox{ for } n>1 \\
T(1) &= 1
\end{align*}

The closed-form solutions for these recurrence relations are
$O(\log(n))$ and $O(n\log(n))$, respectievly.
Recurrence relations are discussed further in @sec:recur-relations.


### Advanced algorithm analysis

The simplification rules from above do not always give the tightest possible complexity.
In some rare cases the simple analysis might give a complexity of say $O(n \log(n))$,
but a more detailed analysis will give a tighter bound, such as $O(n)$.
So, is there something wrong with the rules?

No, the rules are correct, and this is because the $O$ notation gives an *upper bound*.
Recall that every function $f\in O(n)$ is also in $O(n\log(n))$, since $O(n) < O(n\log(n))$.

:::: example
#### Example: A nested loop with linear complexity

Recall the non-quadratic nested loop in @sec:alg-analysis-examples.
If we just change the inner `for`-loop a little bit we get
the following nested loop, which has a nontrivial complexity:

    sum = 0
    k = 1
    while k <= n:          // Do log(n) times.
        for j in 1 .. k:   // Do k times.
            sum = sum + 1
        k = k * 2

Since $k$ is multiplied by 2 in each iteration, the outer `while`-loop runs $\log(n)$ times.
But the inner `for`-loop then runs $k$ times,
and since $k\in O(n)$ the simplification rules tell us that the code is in $O(n\log(n))$.
But a more careful analysis reveals a tighter bound.

If we assume that $n=2^d$ is a power of two, then the outer loop is executed $d=\log_2(n)$ times.
The inner loop has cost $k$, which starts from 1 and doubles after each outer loop iteration.
This can be expressed as the following summation, where $k = 2^i$:

$$ 1 + 2 + 4 + \cdots + 2^d = \sum_{i=0}^{d} 2^i $$

Now, this is a well-known summation with the following solution:

$$ 2^{k+1} - 1 = 2^{\log_2(n)+1} - 1 = 2n - 1 $$

So, the code fragment above is actually linear, $O(n)$, and not linearithmic.

Note that this is an exception where the simple analysis rules do not give a tight enough bound.
But in almost all cases the rules work fine, and when they don't it's usually only by a logarithmic factor.
(And as we already know, logarithmic factors are not that big a deal when it comes to computational complexity.)
::::
