:::::: online

## Case study: Average-case analysis of Quicksort* {#analysis-3:quicksort-average-case}

::: TODO
- Derive the recurrence for Quicksort
:::

Quicksort's average-case behavior falls somewhere
between the extremes of worst and best case.
Average-case analysis considers the cost for all possible arrangements
of input, summing the costs and dividing by the number of cases.
We make one reasonable simplifying assumption:
At each partition step, the pivot is
equally likely to end in any position in the (sorted) array.
In other words, the pivot is equally likely to break an array into
partitions of sizes 0 and $n-1$, or 1 and $n-2$, and so on.

Given this assumption, the average-case cost is computed from the following equation:

\begin{align*}
T(n) &= cn + \frac{1}{n}\sum_{k=0}^{n-1} [T(k) + T(n -1 - k)] \\
T(0) = T(1) &= c
\end{align*}


::: dsvis
This visualization will help you to understand how this recurrence relation was formed.

``` {.jsav-animation src="Sorting/QuickSortAverageCaseCON.js" links="Sorting/QuickSortAverageCaseCON.css" name="Quicksort Average Case Analysis Slideshow"}
```
:::

Note that this relation *is not* of the form $a\cdot T(n/b) + O(n^k)$,
so we cannot use the Master theorem to derive the complexity.

The $cn$ term is an upper bound on the *findpivot* and
*partition* steps. This equation comes from assuming that
the partitioning element is equally likely to occur in any position $k$.
It can be simplified by observing that the two recurrence terms
$T(k)$ and $T(n - 1 - k)$ are equivalent, because one simply
counts up from $T(0)$ to $T(n-1)$ while the other counts down from
$T(n-1)$ to $T(0)$. This yields

\begin{align*}
T(n) &= cn + \frac{2}{n}\sum_{k=0}^{n-1} T(k)
\end{align*}

This form is known as a [recurrence with full history]{.term}. The key to solving such a recurrence is to cancel out the
summation terms. The shifting method for summations provides a way to do
this. Multiply both sides by $n$ and subtract the result from the
formula for $nT(n+1)$:

\begin{align*}
nT(n)  &=  cn^2 + 2 \sum_{k=1}^{n-1} T(k)\\
(n+1)T(n+1)  &=  c(n+1)^2 + 2 \sum_{k=1}^{n} T(k)
\end{align*}

Subtracting $nT(n)$ from both sides yields:

\begin{align*}
(n+1)T(n+1) - nT(n)  &=  c(n+1)^2 - cn^2 + 2T(n)\\
(n+1)T(n+1) - nT(n)  &=  c(2n+1) + 2T(n)\\
(n+1)T(n+1)  &=  c(2n+1) + (n+2)T(n)\\
T(n+1)  &=  \frac{c(2n+1)}{n+1} + \frac{n+2}{n+1}T(n)
\end{align*}

At this point, we have eliminated the summation and can now use our
normal methods for solving recurrences to get a closed-form solution.
Note that $\frac{c(2n+1)}{n+1} < 2c$, so we can simplify the result.
Expanding the recurrence, we get

\begin{align*}
T(n+1)  &\leq  2c + \frac{n+2}{n+1} T(n)\\
           &=  2c + \frac{n+2}{n+1}\left (2c +
                     \frac{n+1}{n}T(n-1)\right )\\
           &=  2c + \frac{n+2}{n+1}\left (2c + \frac{n+1}{n}\left
                    (2c + \frac{n}{n-1}T(n-2)\right )\right )\\
           &=  2c + \frac{n+2}{n+1}\left (2c + \cdots +
                         \frac{4}{3}(2c + \frac{3}{2}T(1))\right )\\
           &=  2c\left (1 + \frac{n+2}{n+1}
                  + \frac{n+2}{n+1}\frac{n+1}{n} + \cdots
                  + \frac{n+2}{n+1}\frac{n+1}{n}\cdots\frac{3}{2}\right )\\
           &=  2c\left (1 + (n+2)\left (\frac{1}{n+1}
                  + \frac{1}{n} + \cdots + \frac{1}{2}\right )\right )\\
           &=  2c + 2c(n+2)\left (\mathcal{H}_{n+1} - 1\right )
\end{align*}

for $\mathcal{H}_{n+1}$, the Harmonic Series.
This is a standard summation,
$\mathcal{H}_{n+1} \in O(\log(n))$, so the final solution is
$O(n \log(n))$.


::::::
