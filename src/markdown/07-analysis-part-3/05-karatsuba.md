
## Case study: Karatsuba multiplication {#analysis-3:karatsuba}

::: TODO
- Done?
:::

How do we multiply numbers? If they are small enough they are handled efficiently by the processor,
but what if the numbers are large with thousands of digits each?
Let's say we want to multiply two numbers $x$ and $y$, having $2m$ digits each.
We can turn this into a divide-and-conquer problem by splitting the numbers into halves:^[
    The reason why we write $2^m$ is that we assume that the numbers are stored in binary form.
    If they had been represented as decimal numbers we would write $10^m$ instead.
]

\begin{align*}
x  &=  x_1 \cdot 2^m + x_0  &
y  &=  y_1 \cdot 2^m + y_0
\end{align*}

Note that multiplying by $2^m$ is an efficient operation because it is just a shift of digit positions.
Therefore we can ignore every such digit shift, and only count "normal" multiplications and additions.
Now we can expand $x\cdot y$:

\begin{align*}
(x_1 \cdot 2^m + x_0) \cdot (y_1 \cdot 2^m + y_0)
    &=  x_1 y_1 \cdot 2^{2m}  +  (x_1 y_0 + x_0 y_1) \cdot 2^m  +  x_0 y_0
\end{align*}

Thus, the recursive implementation of $x \cdot y$ consists of four multiplications of numbers half the size,
plus some additions, which are $O(n)$ in the number of digits.
So we get the following recurrence relation for the complexity of $x \cdot y$:

\begin{align*}
T(n)  &=  4 \cdot T(\tfrac{n}{2}) + O(n)
\end{align*}

From the Master theorem we see that $a = 4$, $b = 2$ and $k = 1$, and $a > b^k$.
The theorem then tells us that $T(n) \in O(n^{\log_2(4)}) = O(n^2)$, so this is a quadratic algorithm, as expected.

Can this be improved upon?
Yes, and to see this we first write the computation on the form
$x \cdot y  =  z_2 \cdot 2^{2m} + z_1 \cdot 2^m + z_0$, where:

\begin{align*}
z_0  &=  x_0 y_0  &  z_1  &=  x_1 y_0 + x_0 y_1  &  z_2  &=  x_1 y_1
\end{align*}

Now we can be smart!
$z_0$ and $z_2$ use only one multiplication each, while $z_1$ uses two.
Let's introduce a new variable $z_3$, which uses only one multiplication:

\begin{align*}
z_3  &=  (x_0 + x_1) (y_0 + y_1)
\end{align*}

$z_1$ can now be formulated in terms of $z_0$, $z_2$ and $z_3$:

\begin{align*}
z_1 &=  x_1 y_0 + x_0 y_1
    =  (x_0 + x_1) (y_0 + y_1) - x_1 y_1 - x_0 y_0
    =  z_3 - z_2 - z_0
\end{align*}

This means that $x \cdot y$ can be calculated from $z_0$, $z_2$ and $z_3$, like this:

\begin{align*}
x \cdot y  &=  z_2 \cdot 2^{2m}  +  (z_3 - z_2 - z_0) \cdot 2^m  +  z_0
\end{align*}

Formulated like this, we only use *three* multiplications instead of four, plus some linear-time work.
This gives the following recurrence relation:

\begin{align*}
T(n)  &=  3 \cdot T(\tfrac{n}{2}) + O(n)
\end{align*}


The Master theorem now tells us that $T(n) \in O(n^{\log_2(3)}) \approx O(n^{1.6})$,
so this is a sub-quadratic algorithm that still has a complexity higher than linearithmic.^[
    The first who noticed this algorithm was Anatoly Karatsuba in 1960
    and therefore it is called *Karatsuba multiplication*.
]
Note that even though this is asymptotically faster than the naive algorithm,
it comes with high constant factors (we use many more additions than the naive version does).
Therefore it is only worthwhile to use this algorithm for very large numbers, having 100 digits or more.

