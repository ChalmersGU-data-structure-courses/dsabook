:::::: online

## Deriving the Master theorem* {#analysis-3:deriving-master-theorem}

This section is a longer version of @sec:analysis-3:master-theorem.
Here we show step-by-step how to derive the Master theorem.

There is a general way to solve so called *divide-and-conquer* recurrence relations.
These have the form $T(n) = a\cdot T(n/b) + c\cdot n^k$,
where $a$, $b$, $c$, and $k$ are constants.
This recurrence describes a problem of size $n$ divided into $a$ subproblems of size $n/b$,
while $c\cdot n^k$ is the extra work needed to split the input or combine the partial solutions.
Both binary search and Mergesort are examples of divide-and-conquer algorithms that fit this form.

To solve a divide-and-conquer recurrence, we do the same as we did before
-- expand it until we reach the base case:

\begin{align*}
T(n) &=  a \cdot T(n/b) + c \cdot n^k  =  a \cdot (a \cdot T(n/b^2) + c \cdot (n/b)^k) + c \cdot n^k
\\   &=  a \cdot (a \cdot (a \cdot T(n/b^3) + c \cdot (n/b^2)^k) + c \cdot (n/b)^k) + c \cdot n^k
\\   &=  a \cdot (a \cdot (\cdots (a \cdot (a \cdot T(1) + c \cdot (n/b^{m-1})^k) + c \cdot (n/b^{m-2})^k) \cdots) + c \cdot (n/b)^k) + c \cdot n^k
\end{align*}

The recursion stops when we reach $T(1)$, which is after $m$ levels, where $n = b^m$.
Now let's replace $n$ with $b^m$ and $T(1)$ with $c$, and then expand the parentheses:

\begin{align*}
\cdots &=  a \cdot (a \cdot (\cdots (a \cdot (a \cdot c + c \cdot (b^m/b^{m-1})^k) + c \cdot (b^m/b^{m-2})^k) \cdots) + c \cdot (b^m/b)^k) + c \cdot b^{mk}
\\     &=  a \cdot (a \cdot (\cdots (a \cdot (a \cdot c + c \cdot b^{1k}) + c \cdot b^{2k}) \cdots) + c \cdot b^{(m-1)k}) + c \cdot b^{mk}
\\     &=  a^m c \cdot b^{0k}  +  a^{m-1} c \cdot b^{1k}  +  a^{m-2} c \cdot b^{2k}  +  \cdots  +  a^1 c \cdot b^{(m-1)k}  +  a^0 c \cdot b^{mk}
\\     &=  c \cdot (a^m b^{0k}  +  a^{m-1} b^{1k}  +  a^{m-2} b^{2k}  +  \cdots  +  a^1 b^{(m-1)k}  +  a^0 b^{mk})
\\     &=  c \cdot a^m \cdot (b^{0k} / a^0  +  b^{1k} / a^1 +  b^{2k} / a^2  +  \cdots  +  b^{(m-1)k} / a^{(m-1)}  +  b^{mk} / a^m)
\\     &=  c \cdot a^m \cdot \sum^m (b^k/a)^i
\\     &=  c \cdot a^m \cdot \sum^m r^i,
           \text{ where } r = b^k / a  \text{ and }  m = \log_b(n)
\end{align*}


::: dsvis
Here is a more visual presentation of this same derivation.

``` {.jsav-animation src="AlgAnal/DandCRecurrenceCON.js" links="AlgAnal/DandCRecurrenceCON.css" name="Divide-and-Conquer Expansion Slideshow 2"}
```
:::

The value of $\sum^m r^i$ depends on if $r$ is less than, equal to, or larger than 1:

$r < 1$ (the subproblems dominate)

:   The infinite sum $\sum r^i$ converges to $1/(1-r)$ which is constant,
    so $\sum^m r^i \in O(1)$.
    Therefore $T(n) \in O(a^m) = O(n^d)$, because $a^m = a^{\log_b(n)}$ = $n^{\log_b(a)} = n^d$.

$r = 1$ (they are comparable)

:   The sum collapses to $\sum^m r^i = \sum^m 1 \in O(m) = O(\log(n))$.
    Furthermore, $a = b^k$, and so $k = \log_b(a)$.
    Therefore $a^m = n^{\log_b(a)} = n^k$, and we get $T(n) \in O(n^k \log(n))$.

$r > 1$ (the extra work dominates)

:   Now the sum becomes $\sum^m r^i = (r^{m+1} - 1) / (r - 1) \in O(r^m)$.
    Since $b^m = n$, we get $T(n) \in O(a^m r^m)$ = $O(a^m (b^k/a)^m)$ = $O(b^{km}) = O(n^k)$.

We can summarise the above derivation as the following theorem.

::: topic
#### The master theorem

For any recurrence relation of the form $T(n) = a\cdot T(n/b) + O(n^k)$,
exactly one the following holds:

$$
T(n) \in
\left\{ \begin{array}{ll}
    O(n^d)         &  \text{if } a > b^k, ~ (\text{where } d=\log_b(a))\\
    O(n^k \log(n)) &  \text{if } a = b^k \\
    O(n^k)         &  \text{if } a < b^k
\end{array} \right.
$$

:::

::: example
#### Example: Applying the master theorem

Here are some example recurrence relations that can be solved by the Master theorem:

Binary search
:   $T(n) = T(n/2) + O(1)$.
    Here $a = 1$, $b = 2$ and $k = 0$, and since $a = b^k$ we get the second case,
    so $T(n) \in O(n^k \log(n))$ = $O(\log(n))$.

Mergesort
:   $T(n) = 2\cdot T(n/2) + O(n)$.
    Here $a = 2$, $b = 2$ and $k = 1$, and again $a = b^k$.
    So we get the second case, and $T(n) \in O(n^k \log(n))$ = $O(n \log(n))$.

Three recursive calls
:   $T(n) = 3\cdot T(n/2) + O(n)$.
    Now $a = 3$, $b = 2$ and $k = 1$, and $a > b^k$.
    This gives the first case where the recursive work dominates,
    so $T(n) \in O(n^{\log_b(a)}) = O(n^{\log_2(3)}) \approx O(n^{1.6})$.

Quadratic extra work
:   $T(n) = 3\cdot T(n/2) + O(n^2)$.
    Now $a = 3$, $b = 2$ and $k = 2$, and $a < b^k$.
    This is the third case, which tells us that the extra work dominates,
    so $T(n) \in O(n^k) = O(n^2)$.
:::


::::::
