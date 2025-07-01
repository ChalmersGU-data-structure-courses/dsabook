
## Upper bounds: the big-$O$ notation

::: TODO
- Prio 1: formal definition
:::

Several terms are used to describe the running-time equation for an
algorithm. These terms -- and their associated symbols -- indicate
precisely what aspect of the algorithm's behaviour is being described.
One is the [upper bound]{.term} for the growth
of the algorithm's running time. It indicates the upper or highest
growth rate that the algorithm can have.

Because the phrase "has an upper bound to its growth rate of $f(n)$"
is long and often used when discussing algorithms, we adopt a special
notation, called [big-$O$ notation]{.term}. If
the upper bound for an algorithm's growth rate (for, say, the worst
case) is $f(n)$, then we would write that this algorithm is "in the set
$O(f(n))$ in the worst case" (or just "in $O(f(n))$ in the worst
case"). For example, if $n^2$ grows as fast as $T(n)$ (the
running time of our algorithm) for the worst-case input, we would say
the algorithm is "in $O(n^2)$ in the worst case".

We already defined the upper bound in @sec:defining-orders-of-growth, like this:

Upper bound

: $f\in O(g)$ **iff** there exist positive numbers $k$ and $n_0$ such that $f(n) \leq k\cdot g(n)$ for all $n>n_0$

The constant $n_0$ is the smallest value of $n$ for which the claim of an upper bound holds true.
Usually $n_0$ is small, such as 1, but does not need to be.
You must also be able to pick some constant $k$, but it is irrelevant what the value for $k$ actually is.
In other words, the definition says that for *all* inputs of the type in question
(such as the worst case for all inputs of size $n$)
that are large enough (i.e., $n > n_0$),
the algorithm *always* executes in less than or equal to $k\cdot g(n)$ steps for some constant $k$.

::: note
Note that the definition is somewhat simplified, it only works if $f$ and $g$ are *monotonically increasing*.
This means that if $x\leq y$ then $f(x)\leq f(y)$, so the value can never decrease whenever $x$ increases.

But this is not a real restriction for our purposes, because there are no algorithms that becomes faster when the input size grows.
In the very best case, the runtime of an algorithm can be independent of the input size, but this is also monotonically increasing.

If we were to allow any non-monotonic functions, then the definition of upper bound would become slightly more complicated.
You can look up the formal definition in mathematical textbooks, or in Wikipedia.
:::

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

::: example
#### Example: Quadratic algorithm

For a particular algorithm, $T(n) = c_1 n^2 + c_2 n$ in the
average case where $c_1$ and $c_2$ are positive numbers. Then,

$$
c_1 n^2 + c_2 n \leq c_1 n^2 + c_2 n^2 \leq (c_1 + c_2)n^2
$$

for all $n > 1$. So, $T(n) \leq c n^2$ for $c = c_1 + c_2$, and
$n_0 = 1$. Therefore, $T(n)$ is in $O(n^2)$ by the definition.
:::

::: example
#### Example: Accessing an array cell

Assigning the value from a given position of an array to a variable
takes constant time regardless of the size of the array. Thus,
$T(n) = c$ (for the best, worst, and average cases). We could
say in this case that $T(n)$ is in $O(c)$. However, it is
traditional to say that an algorithm whose running time has a constant
upper bound is in $O(1)$.
:::

If someone asked you out of the blue "Who is the best?" your natural
reaction should be to reply "Best at what?" In the same way, if you
are asked "What is the growth rate of this algorithm", you would need
to ask "When? Best case? Average case? Or worst case?" Some algorithms
have the same behaviour no matter which input instance of a given size
that they receive. An example is finding the maximum in an array of
integers. But for many algorithms, it makes a big difference which
particular input of a given size is involved, such as when searching an
unsorted array for a particular value. So any statement about the upper
bound of an algorithm must be in the context of some specific class of
inputs of size $n$. We measure this upper bound nearly always on the
best-case, average-case, or worst-case inputs. Thus, we cannot say,
"this algorithm has an upper bound to its growth rate of $n^2$"
because that is an incomplete statement. We must say something like,
"this algorithm has an upper bound to its growth rate of $n^2$ *in the
average case*".

Knowing that something is in $O(f(n))$ says only how bad things can be.
Perhaps things are not nearly so bad. Because sequential search is in
$O(n)$ in the worst case, it is also true to say that sequential search
is in $O(n^2)$. But sequential search is practical for large $n$ in a
way that is not true for some other algorithms in $O(n^2)$. We always
seek to define the running time of an algorithm with the tightest
(lowest) possible upper bound. Thus, we prefer to say that sequential
search is in $O(n)$. This also explains why the phrase "is in
$O(f(n))$" or the notation "$\in O(f(n))$" is used instead of "is
$O(f(n))$" or "$= O(f(n))$". There is no strict equality to the use
of big-$O$ notation. $O(n)$ is in $O(n^2)$, but $O(n^2)$ is not in
$O(n)$.

### Simplifying rules

We introduced simplifying rules in @sec:simplification-rules, but repeat them here in compact form:

     Rule              Simplification                                                       Alternatively
---  ----------------  -------------------------------------------------------------------  -------------------------------
(1)  Transitivity      if $f\in O(g)$ and $g\in O(h)$, then $f\in O(h)$
(2)  Constant $k>0$    if $f\in O(g)$, then $k\cdot f\in O(g)$                              $k \cdot O(g) = O(g)$
(3)  Addition          if $f\in O(g)$ and $f'\in O(g')$, then $f+f'\in O(\max(g,g'))$       $O(g) + O(g') = O(\max(g,g'))$
(4)  Multiplication    if $f\in O(g)$ and $f'\in O(g')$, then $f\cdot f'\in O(g\cdot g')$   $O(g) \cdot O(g') = O(g\cdot g')$

Using these rules we can easily determine the asymptotic growth rate for many algorithms.

- Rule (2) says that any constant-time operation is $O(1)$.
- Rule (3) says that if you have a sequence of statements, you only need to consider the most expensive statement: $O(\max(f_1,\ldots,f_k))$.
- Rule (4) says that if you have a loop that repeats a statement $p$ a number of times, the total cost is the cost of $p$ times the number of iterations: $O(n\cdot f)$.
- Rule (2) also says that if you repeat a statement $p$ a *constant* number of times, you can treat it as you only execute $p$ once.

### big-$O$ and logarithms

One interesting consequence of asymptotic complexity is that the base of a logarithm becomes irrelevant:

$$ O(\log_2(n)) = O(\ln(n)) = O(\log_10(n)) $$

The reason for this is that according to the logarithm laws, $\log_b(n) = \log_a(n) \cdot \frac{1}{\log_a(b)}$.
But $\frac{1}{\log_a(b)}$ is a constant which we can ignore, so $O(\log_b(n)) = O(\log_a(n))$.
Therefore we can just ignore the base and write $O(\log n)$.

(Note that this *does not* hold for exponential growth -- e.g., $2^n\in O(10^n)$, but $10^n\not\in O(2^n)$.)

Another consequence of the logarithm laws is that it doesn't really matter if you take the logarithm from a linear, quadratic, cubic, or any power function:

$$ O(\log n) = O(\log n^2) = O(\log n^3) = O(\log n^k) $$

The reason for this is that $\log n^k = k\cdot\log n$ according to the logarithm laws, so the exponent $k$ becomes a multiplicative constant and can be ignored.

However, taking the power of a logarithm cannot be ignored, so $O(\log n)$ and $O(\log^2 n)$ are different complexity classes.


