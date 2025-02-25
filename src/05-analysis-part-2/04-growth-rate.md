
## Growth rates, part 2

::: alert
***Note***: This section is *work in progress*
:::

Two functions of $n$ have different
[growth rates](#growth-rate){.term} if as $n$
goes to infinity their ratio either goes to infinity or goes to zero.

::: figure
#### Figure: Growth rates {-}

![The growth rates for five equations](images/plot.png){width=500}

Two views of a graph illustrating the growth rates for six equations.
The bottom view shows in detail the lower-left portion of the top view.
The horizontal axis represents input size. The vertical axis can
represent time, space, or any other measure of cost.
:::

Where does $(1.618)^n$ go on here?

Exact equations relating program operations to running time require
machine-dependent constants. Sometimes, the equation for exact running
time is complicated to compute. Usually, we are satisfied with knowing
an approximate growth rate.

Example: Given two algorithms with growth rate $c_1n$ and $c_2 2^{n!}$,
do we need to know the values of $c_1$ and $c_2$?

Consider $n^2$ and $3n$. PROVE that $n^2$ must eventually become (and
remain) bigger.

Proof by Contradiction: Assume there are some values for constants $r$
and $s$ such that, for all values of $n$, $n^2 < rn + s$. Then,
$n < r + s/n$. But, as $n$ grows, what happens to $s/n$? It goes to
zero.

Since $n$ grows toward infinity, the assumption must be false.
Conclusion: In the limit, as $n \rightarrow \infty$, constants don't
matter. Limits are the typical way to prove that one function grows
faster than another.

Here are some useful observatios.

Since $n^2$ grows faster than $n$,

-   $2^{n^2}$ grows faster than $2^n$. (Take antilog of both sides.)
-   $n^4$ grows faster than $n^2$. (Square boths sides.)
-   $n$ grows faster than $\sqrt{n}$. ($n = (\sqrt{n})^2$. Replace $n$
    with $\sqrt{n}$.)
-   $2 \log n$ grows *no slower* than $\log n$. (Take $\log$ of both
    sides. Log "flattens" growth rates.)

Since $n!$ grows faster than $2^n$,

-   $n!!$ grows faster than $2^n!$. (Apply factorial to both sides.)
-   $2^{n!}$ grows faster than $2^{2^n}$. (Take antilog of both sides.)
-   $n!^2$ grows faster than $2^{2n}$. (Square both sides.)
-   $\sqrt{n!}$ grows faster than $\sqrt{2^n}$. (Take square root of
    both sides.)
-   $\log n!$ grows *no slower* than $n$. (Take log of both sides.
    Actually, it grows faster since $\log n! = \Theta(n \log n)$.)

If $f$ grows faster than $g$, then must $\sqrt{f}$ grow faster than
$\sqrt{g}$? Yes.

Must $\log f$ grow faster than $\log g$? No. $\log n \approx \log n^2$
within a constant factor, that is, the growth **rate** is the same!

$\log n$ is related to $n$ in exactly the same way that $n$ is related
to $2^n$.

$2^{\log n} = n$.

