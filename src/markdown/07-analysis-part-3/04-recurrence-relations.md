
## Recurrence relations {#analysis-3:recurrences}

::: TODO
- Prio 1: reduce some math? or at least clutter?
:::

In the previous chapters we have encountered three recursive algorithms:
Binary search, Mergesort and Quicksort.
When analysing these algorithms we reasoned about the number of recursion levels,
and how much computation they do per level:

Number of levels
:   Binary search and Mergesort use a logarithmic number of levels, $O(\log(n))$,
    while Quicksort in the worst case uses a linear number of levels, $O(n)$.

Work per level
:   Binary search does a constant amount of work in each recursive call, $O(1)$,
    while Mergesort and Quicksort both do linear work, $O(n)$.
    Mergesort does its main work in the merging phase, while Quicksort does it when partitioning.

The final worst case complexity is simply the product of these two factors, so that
binary search becomes logarithmic, $O(\log(n))$, Mergesort linearithmic, $O(n\log(n))$, and
Quicksort quadratic, $O(n^2)$.
There is nothing wrong with the reasoning we did for these algorithms, but it is quite ad-hoc:
it doesn't provide much help if we want to analyse a new recursive algorithm.

A *recurrence relation* is an equation that defines a function in terms of smaller instances of itself,
or in other words, by calling itself with smaller arguments.
This can be used to model the time complexity of a recursive algorithm.

### Expanding recurrences

A very simple recurrence is for the recursive version of the factorial function.
The factorial is defined as $n! = n\cdot(n-1)!$ (with the base case $0!=1!=1$),
and this gives the following recurrence for its time function:

\begin{align*}
T(n) &= T(n-1) + O(1), \text{ when } n>1 \\
T(0) &= T(1) = O(1)
\end{align*}

Note that we can always assume that the base case is constant time, $O(1)$:
otherwise the non-constant cost can be "baked into" the recursive case.
Therefore we will in the future not print the base case unless necessary.

We want to know which complexity class $T(n)$ belongs to, or in other words,
we want to find a closed-form solution to the recursive equation.
<!-- OPENDSA: START -->
One approach is to *expand* the recurrence by replacing any occurrences of $T$
on the right-hand side with its definition.
<!-- OPENDSA: END -->
Assuming that both the base case and the work done in each iteration is bounded by some constant $c$,
we can infer that the recursive factorial function is linear, $O(n)$:

\begin{align*}
T(n) &~=~   c + T(n-1)
      ~=~   c + (c + T(n-2))
\\   &~=~   \underbrace{c + (c + (c + (c + (\cdots + c))))}_{n \text{ constant-time terms}}
      ~=~   n\cdot c
     ~\in~  O(n)
\end{align*}

::: dsvis
Here is an interactive explanation of this recurrence relation.

``` {.jsav-animation src="AlgAnal/LinearRecurrencesCON.js" links="AlgAnal/LinearRecurrencesCON.css"}
```
:::

What happens if we have to do some linear-time work in each recursive call?
That is, if the recurrence is $T(n) = T(n-1) + O(n)$.
Assuming that the linear time work is $cn\in O(n)$, we can expand the recurrence like this:

\begin{align*}
T(n) &~=~   cn + T(n-1)
      ~=~   cn + (c(n-1) + T(n-2))
\\   &~=~   c\cdot(\underbrace{n + ((n-1) + ((n-2) + (\cdots + 1)))}_{n \text{ linear-time terms}})
     ~\in~  O(n^2)
\end{align*}

::: dsvis
Here is an interactive explanation of this recurrence relation.

``` {.jsav-animation src="AlgAnal/LinearRecurrencesNCON.js" links="AlgAnal/LinearRecurrencesNCON.css"}
```
:::

How about recursive binary search?
In each invocation it does some constant work, and then calls itself with the half the search interval.
This can be modeled by the recurrence $T(n) = T(\tfrac{n}{2}) + O(1)$,
where $n$ is the size of the interval.
This recurrence is expanded as follows,
where $m = \log_2(n)$ is the number of recursive levels until we reach the base case:

\begin{align*}
T(n) &~=~   T(\tfrac{n}{2}) + c
      ~=~   (T(\tfrac{n}{4}) + c) + c
      ~=~   ((T(\tfrac{n}{8}) + c) + c) + c
\\   &~=~   \underbrace{(((\cdots(c + c)\cdots) + c) + c) + c}_{m \text{ constant-time terms}}
     ~\in~  O(\log(n))
\end{align*}

Finally, Mergesort calls itself twice with the argument halved, and then performs a linear-time merge.
This can be modeled by the recurrence $T(n) = 2\cdot T(\tfrac{n}{2}) + O(n)$.
By expanding the recurrence we can deduce the linearithmic complexity, $O(n\log(n))$:

\begin{align*}
T(n) &~=~   2 \cdot T(\tfrac{n}{2}) + c\cdot n
      ~=~   2 \cdot (2 \cdot T(\tfrac{n}{4}) + c\cdot\tfrac{n}{2}) + c\cdot n
\\   &~=~   2 \cdot (2 \cdot (\cdots (2 \cdot T(1) + c\cdot\tfrac{n}{2^m}) \cdots) + c\cdot\tfrac{n}{2}) + c\cdot n
\\   &~=~   2^m c  +  \underbrace{2^{m-1} c\cdot\tfrac{n}{2^{m-1}}  +  2^{m-2} c\cdot\tfrac{n}{2^{m-2}}  +
                              \cdots  +  2 c\cdot\tfrac{n}{2}  +  c\cdot n}_{m \text{ linear-time terms}}
\\   &~=~   c\cdot n + c\cdot n\cdot\log_2(n)
     ~\in~  O(n \log(n))
\end{align*}


::: dsvis
Here is a more complicated example.

``` {.jsav-animation src="AlgAnal/ExpandRecurrenceCON.js" links="AlgAnal/ExpandRecurrenceCON.css" name="Divide-and-Conquer Expansion Slideshow"}
```
:::

So, is there some kind of general formula for how to solve recurrence relations?


### The Master theorem {#analysis-3:master-theorem}

There is a general way to solve so called *divide-and-conquer* recurrence relations.
These have the form $T(n) = a\cdot T(\tfrac{n}{b}) + c\cdot n^k$,
where $a$, $b$, $c$, and $k$ are constants.
This recurrence describes a problem of size $n$ divided into $a$ subproblems of size $\tfrac{n}{b}$,
while $c\cdot n^k$ is the extra work needed to split the input or combine the partial solutions.
Both binary search and Mergesort are examples of divide-and-conquer algorithms that fit this form.

To solve a divide-and-conquer recurrence, we do the same as we did before, expand it until we reach the base case.
The recursion stops when we reach $T(1)$, which is after $m=\log_b(n)$ levels.
This is a bit tedious and we won't show it here, but after a while we get to the following sum,
where $r = \tfrac{b^k}{a}$:

\begin{align*}
T(n) &~=~   c \cdot a^m \cdot (\underbrace{1  +  \tfrac{b^{k}}{a}  +  \tfrac{b^{2k}}{a^2}  +
                                    \tfrac{b^{3k}}{a^3}  +  \cdots  +  \tfrac{b^{mk}}{a^m}}_{m \text{ terms}})
\\   &~=~   c \cdot a^m \cdot \sum_{i=0}^m (\tfrac{b^k}{a})^i
      ~=~   c \cdot a^m \cdot \sum_{i=0}^m r^i
\end{align*}


::: dsvis
Here is a more visual presentation of this same derivation.

``` {.jsav-animation src="AlgAnal/DandCRecurrenceCON.js" links="AlgAnal/DandCRecurrenceCON.css" name="Divide-and-Conquer Expansion Slideshow 2"}
```
:::

The value of $\sum_{i=0}^m r^i$ depends on if $r$ is less than, equal to, or larger than 1:

$r < 1$ (the subproblems dominate)

:   The infinite sum $\sum_{i=0}^\infty r^i$ converges to $\tfrac{1}{1-r}$ which is constant,
    so $\sum_{i=0}^m r^i \in O(1)$.
    Therefore $T(n) \in O(a^m) = O(n^d)$, where $d=\log_b(a)$,
    because $a^m = a^{\log_b(n)}$ = $n^{\log_b(a)} = n^d$.

$r = 1$ (they are comparable)

:   The sum collapses to $\sum_{i=0}^m 1 \in O(m) = O(\log(n))$.
    Furthermore, $a = b^k$, and so $k = \log_b(a)$.
    Therefore $a^m = n^{\log_b(a)} = n^k$, and we get $T(n) \in O(n^k \log(n))$.

$r > 1$ (the extra work dominates)

:   Now it is a well-known summation with value $\tfrac{r^{m+1} - 1}{r - 1} \in O(r^m)$.
    And since $b^m = n$, we get $T(n) \in O(a^m r^m)$ = $O(a^m (\tfrac{b^k}{a})^m)$ = $O(b^{km}) = O(n^k)$.

We can summarise the above derivation as the following theorem.

::: topic
#### The master theorem

For any recurrence relation $T(n)$, of the form $T(n) = a\cdot T(\tfrac{n}{b}) + O(n^k)$,
exactly one the following holds:

$$
T(n) \in
\left\{ \begin{array}{ll}
    O(n^d)         &  \text{if } a > b^k, ~ \text{where } d=\log_b(a)\\
    O(n^k \log(n)) &  \text{if } a = b^k \\
    O(n^k)         &  \text{if } a < b^k
\end{array} \right.
$$

:::

::: {.example #ex:apply-master-theorem}
#### Example: Applying the master theorem

Here are some example recurrence relations that can be solved by the Master theorem:

Binary search
:   $T(n) = T(\tfrac{n}{2}) + O(1)$.
    Here $a = 1$, $b = 2$ and $k = 0$, and $a = b^k$ so we get the second case:
    $T(n) \in O(n^k \log(n))$ = $O(\log(n))$.

Mergesort
:   $T(n) = 2\cdot T(\tfrac{n}{2}) + O(n)$.
    Here $a = 2$, $b = 2$ and $k = 1$, and again $a = b^k$.
    So we get the second case, and $T(n) \in O(n^k \log(n))$ = $O(n \log(n))$.

Three recursive calls
:   $T(n) = 3\cdot T(\tfrac{n}{2}) + O(n)$.
    Now $a = 3$, $b = 2$ and $k = 1$, and $a > b^k$.
    This gives the first case where the recursive work dominates,
    so $T(n) \in O(n^{\log_b(a)}) = O(n^{\log_2(3)}) \approx O(n^{1.6})$.

Quadratic extra work
:   $T(n) = 3\cdot T(\tfrac(n){2}) + O(n^2)$.
    Now $a = 3$, $b = 2$ and $k = 2$, and $a < b^k$.
    This is the third case, which tells us that the extra work dominates,
    so $T(n) \in O(n^k) = O(n^2)$.
:::

