
### Practice questions: Asymptotic notations

:::::::::::::::::::::::::::::::::::::::: quiz ::::::::::::::::::::::::::::::::::::::::

:::::::::: question ::::::::::
Answer TRUE or FALSE.

Big-Theta notation ($\Theta$) defines an equivalence relation on the set of functions.

- [x] True
- [ ] False

::: hints
- An equivalence relation is a relation that is reflexive, symmetric, and transitive.
- Big-Theta notation is like $=$.
- $=$ is an equivalence relation.
:::
::::::::::::::::::::::::::::::



:::::::::: question ::::::::::
Answer TRUE or FALSE.

The Sequential Search algorithm is $\Theta(n^2)$.

- [ ] True
- [x] False

::: hints
- Recall that $\Theta(n^2)$ means that all program
inputs (beyond a certain, small size) run within a constant
factor of $n^2$.
- Theta means that the program is not growing too much
slower, nor too much faster, than the claimed growth rate.
- Sequential search grows much slower than $n^2$.
:::
::::::::::::::::::::::::::::::



:::::::::: question ::::::::::
Determine the proper relationship between the following pair of functions.

$$
\begin{eqnarray}
f(n) &=& \log n^2 \\
g(n) &=& \log n + 5
\end{eqnarray}
$$

- [x] $f(n)$ is $\Theta(g(n))$
- [ ] $f(n)$ is in $\Omega(g(n))$
- [ ] $f(n)$ is in $O(g(n))$

::: hints
- if $\lim \frac{f(n)}{g(n)} \rightarrow 0$, then $f(n)$ is in $O(g(n))$.
- if $\lim \frac{f(n)}{g(n)} \rightarrow$ constant, then $f(n)$ is $\Theta(g(n))$.
- if $\lim \frac{f(n)}{g(n)} \rightarrow \infty$, then $f(n)$ is in $\Omega(g(n))$.
:::
::::::::::::::::::::::::::::::



:::::::::: question ::::::::::
Determine the proper relationship between the following pair of functions.

$$
\begin{eqnarray}
f(n) &=& \sqrt n \\
g(n) &=& \log n^2
\end{eqnarray}
$$

- [x] $f(n)$ is $\Omega(g(n))$
- $f(n)$ is $\Theta(g(n))$
- $f(n)$ is in $O(g(n))$

::: hints
- if $\lim \frac{f(n)}{g(n)} \rightarrow 0$, then $f(n)$ is in $O(g(n))$.
- if $\lim \frac{f(n)}{g(n)} \rightarrow$ constant, then $f(n)$ is $\Theta(g(n))$.
- if $\lim \frac{f(n)}{g(n)} \rightarrow \infty$, then $f(n)$ is in $\Omega(g(n))$.
:::
::::::::::::::::::::::::::::::



:::::::::: question ::::::::::
Determine the proper relationship between the following pair of functions.

$$
\begin{eqnarray}
f(n) &=& \log^2 n \\
g(n) &=& \log n
\end{eqnarray}
$$

- [x] $f(n)$ is $\Omega(g(n))$
- [ ] $f(n)$ is $\Theta(g(n))$
- [ ] $f(n)$ is in $O(g(n))$

::: hints
- if $\lim \frac{f(n)}{g(n)} \rightarrow 0$, then $f(n)$ is in $O(g(n))$.
- if $\lim \frac{f(n)}{g(n)} \rightarrow$ constant, then $f(n)$ is $\Theta(g(n))$.
- if $\lim \frac{f(n)}{g(n)} \rightarrow \infty$, then $f(n)$ is in $\Omega(g(n))$.
:::
::::::::::::::::::::::::::::::



:::::::::: question ::::::::::
Determine the proper relationship between the following pair of functions.

$$
\begin{eqnarray}
f(n) &=& n \\
g(n) &=& \log^2 n
\end{eqnarray}
$$

- [x] $f(n)$ is $\Omega(g(n))$
- [ ] $f(n)$ is $\Theta(g(n))$
- [ ] $f(n)$ is in $O(g(n))$

::: hints
- if $\lim \frac{f(n)}{g(n)} \rightarrow 0$, then $f(n)$ is in $O(g(n))$.
- if $\lim \frac{f(n)}{g(n)} \rightarrow$ constant, then $f(n)$ is $\Theta(g(n))$.
- if $\lim \frac{f(n)}{g(n)} \rightarrow \infty$, then $f(n)$ is in $\Omega(g(n))$.
:::
::::::::::::::::::::::::::::::



:::::::::: question ::::::::::
Determine the proper relationship between the following pair of functions.

$$
\begin{eqnarray}
f(n) &=& n \log n + n \\
g(n) &=& \log n
\end{eqnarray}
$$

- [x] $f(n)$ is $\Omega(g(n))$
- [ ] $f(n)$ is $\Theta(g(n))$
- [ ] $f(n)$ is in $O(g(n))$

::: hints
- if $\lim \frac{f(n)}{g(n)} \rightarrow 0$, then $f(n)$ is in $O(g(n))$.
- if $\lim \frac{f(n)}{g(n)} \rightarrow$ constant, then $f(n)$ is $\Theta(g(n))$.
- if $\lim \frac{f(n)}{g(n)} \rightarrow \infty$, then $f(n)$ is in $\Omega(g(n))$.
:::
::::::::::::::::::::::::::::::



:::::::::: question ::::::::::
Determine the proper relationship between the following pair of functions.

$$
\begin{eqnarray}
f(n) &=& \log n^2 \\
g(n) &=& (\log n)^2
\end{eqnarray}
$$

- [ ] $f(n)$ is $\Omega(g(n))$
- [ ] $f(n)$ is $\Theta(g(n))$
- [x] $f(n)$ is in $O(g(n))$

::: hints
- if $\lim \frac{f(n)}{g(n)} \rightarrow 0$, then $f(n)$ is in $O(g(n))$.
- if $\lim \frac{f(n)}{g(n)} \rightarrow$ constant, then $f(n)$ is $\Theta(g(n))$.
- if $\lim \frac{f(n)}{g(n)} \rightarrow \infty$, then $f(n)$ is in $\Omega(g(n))$.
:::
::::::::::::::::::::::::::::::



:::::::::: question ::::::::::
Determine the proper relationship between the following pair of functions.

$$
\begin{eqnarray}
f(n) &=& 10 \\
g(n) &=& \log 10
\end{eqnarray}
$$

- [ ] $f(n)$ is $\Omega(g(n))$
- [x] $f(n)$ is $\Theta(g(n))$
- [ ] $f(n)$ is in $O(g(n))$

::: hints
- if $\lim \frac{f(n)}{g(n)} \rightarrow 0$, then $f(n)$ is in $O(g(n))$.
- if $\lim \frac{f(n)}{g(n)} \rightarrow$ constant, then $f(n)$ is $\Theta(g(n))$.
- if $\lim \frac{f(n)}{g(n)} \rightarrow \infty$, then $f(n)$ is in $\Omega(g(n))$.
:::
::::::::::::::::::::::::::::::



:::::::::: question ::::::::::
Determine the proper relationship between the following pair of functions.

$$
\begin{eqnarray}
f(n) &=& 2^n \\
g(n) &=& 10 n^2
\end{eqnarray}
$$

- [x] $f(n)$ is $\Omega(g(n))$
- [ ] $f(n)$ is $\Theta(g(n))$
- [ ] $f(n)$ is in $O(g(n))$

::: hints
- if $\lim \frac{f(n)}{g(n)} \rightarrow 0$, then $f(n)$ is in $O(g(n))$.
- if $\lim \frac{f(n)}{g(n)} \rightarrow$ constant, then $f(n)$ is $\Theta(g(n))$.
- if $\lim \frac{f(n)}{g(n)} \rightarrow \infty$, then $f(n)$ is in $\Omega(g(n))$.
:::
::::::::::::::::::::::::::::::



:::::::::: question ::::::::::
Determine the proper relationship between the following pair of functions.

$$
\begin{eqnarray}
f(n) &=& 2^n \\
g(n) &=& n \log n
\end{eqnarray}
$$

- [x] $f(n)$ is $\Omega(g(n))$
- [ ] $f(n)$ is $\Theta(g(n))$
- [ ] $f(n)$ is in $O(g(n))$

::: hints
- if $\lim \frac{f(n)}{g(n)} \rightarrow 0$, then $f(n)$ is in $O(g(n))$.
- if $\lim \frac{f(n)}{g(n)} \rightarrow$ constant, then $f(n)$ is $\Theta(g(n))$.
- if $\lim \frac{f(n)}{g(n)} \rightarrow \infty$, then $f(n)$ is in $\Omega(g(n))$.
:::
::::::::::::::::::::::::::::::



:::::::::: question ::::::::::
Determine the proper relationship between the following pair of functions.

$$
\begin{eqnarray}
f(n) &=& 2^n \\
g(n) &=& 3^n
\end{eqnarray}
$$

- [ ] $f(n)$ is $\Omega(g(n))$
- [ ] $f(n)$ is $\Theta(g(n))$
- [x] $f(n)$ is in $O(g(n))$

::: hints
- if $\lim \frac{f(n)}{g(n)} \rightarrow 0$, then $f(n)$ is in $O(g(n))$.
- if $\lim \frac{f(n)}{g(n)} \rightarrow$ constant, then $f(n)$ is $\Theta(g(n))$.
- if $\lim \frac{f(n)}{g(n)} \rightarrow \infty$, then $f(n)$ is in $\Omega(g(n))$.
:::
::::::::::::::::::::::::::::::



:::::::::: question ::::::::::
Determine the proper relationship between the following pair of functions.

$$
\begin{eqnarray}
f(n) &=& 2^n \\
g(n) &=& n^n
\end{eqnarray}
$$

- [ ] $f(n)$ is $\Omega(g(n))$
- [ ] $f(n)$ is $\Theta(g(n))$
- [x] $f(n)$ is in $O(g(n))$

::: hints
- if $\lim \frac{f(n)}{g(n)} \rightarrow 0$, then $f(n)$ is in $O(g(n))$.
- if $\lim \frac{f(n)}{g(n)} \rightarrow$ constant, then $f(n)$ is $\Theta(g(n))$.
- if $\lim \frac{f(n)}{g(n)} \rightarrow \infty$, then $f(n)$ is in $\Omega(g(n))$.
:::
::::::::::::::::::::::::::::::



:::::::::: question ::::::::::
Which of these is the best lower bound for a growth rate of $5n + 3$?

- [x] $\Omega(n)$
- [ ] $\Omega(n^2)$
- [ ] $\Omega(n \log n)$
- [ ] $\Omega(\log n)$
- [ ] $\Omega(1)$

::: hints
- The simplifying rules tell us that we can drop constants
and lower order terms from a polynomial that defines the growth rate.
:::
::::::::::::::::::::::::::::::



:::::::::: question ::::::::::
For what value of $k$ is $\sqrt n = \Theta(n^k)$?
(Answer in decimals, not fractions)

<input type="text" value="0.5"/>

::: hints
- $\sqrt n = n^{0.5}$
:::
::::::::::::::::::::::::::::::



:::::::::: question ::::::::::
If we know that algorithm X is $\Theta(n)$ in the average case,
then what can we say about its TIGHTEST upper bound?

- [x] It is $O(n)$ in the average case.
- [ ] It is $O(n)$ or greater in the average case, but we don't have enough information to say more.
- [ ] It is $O(n)$ or less in the average case, but we don't have enough information to say more.
- [ ] We don't have enough information to say.

::: hints
- What is the definition of $\Theta(n)$?
- Being $\Theta(n)$ means that we know a tight bound (both the upper and the lower bounds match).
- If X is $\Theta(n)$, then it is both $O(n)$ and $\Omega(n)$.
:::
::::::::::::::::::::::::::::::

::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::

