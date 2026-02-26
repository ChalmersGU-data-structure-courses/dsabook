
## Recurrence relations {#recur-relations}

::: TODO
- Prio 3: throughout this section, there are references to equations, both on this page and in the Summations section - these should be made into proper cross-references rather than hard-coded equation numbers
- Prio 3: example: matrix multiplication, Strassen's algorithm
:::

<!-- START NOTES -->

So far we have analysed only two recursive algorithms: Binary search and Mergesort.

(We never did a real analysis of Quicksort, because in the worst case it degrades to Selection sort, and we already know its complexity.)

When analysing these two algorithms we reasoned about the number of levels (both have a logarithmic number of levels), and how much computation we did per level (binary search does $O(1)$ per level, and Mergesort does $O(n)$ per level). This works very fine, but it is quite ad-hoc: it doesn’t help when we want to analyse a new recursive algorithm.

A *recurrence relation* is an equation that defines a function in terms of smaller instances of itself, or in other words, by calling itself with smaller arguments. This can be used to model the time complexity of a recursive algorithm. For example, each invocation of recursive binary search does some constant work, and then calls itself with the argument halved. This can be modeled by the following recurrence:

$$ T(n)	= T(n/2) + O(1) $$

(There is also the base case, but we assume that it is constant, $T(1) \in O(1)$.)

We want to know which complexity class $T(n)$ belongs to. From before we know that it is logarithmic, so $T(n) \in O(\log(n))$, but how can we infer that from the recurrence? Let’s assume that both the base case and the constant work done in each iteration is some constant c. Then we can expand the recurrence like this:

\begin{align*}
T(n) &= T(n/2) + c  =  (T(n/4) + c) + c  =  ((T(n/8) + c) + c) + c
\\   &=  ((\ldots(T(1) + c)\ldots) + c) + c  =  ((\ldots(c + c)\ldots) + c) + c
\\   &=  m \cdot c  =  \log_2(n) \cdot c  \in  O(\log(n))
\end{align*}

Here, $m = \log_2(n)$ is the number of “levels” until we reach the base case.

Our second example, Mergesort, calls itself twice with the argument halved, and then merges the result which takes linear time. Or as a recurrence relation:

$$ T(n)	=  2 T(n/2) + O(n) $$

And we already know that the solution to this recurrence is $T(n) \in O(n \log(n))$. Let’s assume that the linear work in each recursive step is $c\cdot n \in O(n)$, and furthermore that the base case $T(1) = c$. Expanding the recurrence then becomes:

\begin{align*}
T(n) &=  2 \cdot T(n/2) + c\cdot n  =  2 \cdot (2 \cdot T(n/4) + c\cdot n/2) + c\cdot n
\\   &=  2 \cdot (2 \cdot (2 \cdot T(n/8) + c\cdot n/4) + c\cdot n/2) + c\cdot n
\\   &=  2 \cdot (2 \cdot (\ldots (2 \cdot T(1) + c\cdot n/2^m) \ldots) + c\cdot n/2) + c\cdot n
\\   &=  2^m c  +  2^{m–1} c\cdot n / 2^{m–1}  +  2^{m–2} c\cdot n / 2^{m–2}  +  \ldots  +  2^2 c\cdot n / 2^2  +  2 c\cdot n / 2  +  c\cdot n
\\   &=  2^m c  +  \sum_m c\cdot n  =  2^{\log_2(n)} c  +  \sum_{\log_2(n)} c\cdot n  =  c\cdot n + c\cdot n\cdot\log_2(n)
\\   &=  c \cdot n \cdot (1 + \log_2(n))  \in  O(n \log(n))
\end{align*}

So, is there some kind of general formula for how to solve recurrence relations?
For example, what are the solutions to the following recurrences?

- $T(n)  =  3 T(n/2) + O(n)$
- $T(n)  =  3 T(n/2) + O(n^2)$
- $T(n)  =  7 T(n/2) + O(n^2)$

#### The Master theorem (optional)

Yes, there is a general way to solve many recurrence relations (but not all)!
This is called the *Master theorem* (yes, a very humble name...), and it can be formulated like this:

**Master theorem.**
For any recurrence relation of the form $T(n) = a T(n/b) + O(n^k)$,
and with the base case $T(1) = O(1)$, the following holds:

1. **the subproblems dominate**:  if  $a > b^k$  then  $T(n) \in O(n^d)$,  where $d = log_b(a)$
2. **they are comparable**:       if  $a = b^k$  then  $T(n) \in O(n^k \log(n))$
3. **split/combine dominates**:   if  $a < b^k$  then  $T(n) \in O(n^k)$

**Proof.**
The general idea is similar to what we did for Mergesort: expand the recurrence until you get to the base case. Assuming that the extra work is $c\cdot n^k \in O(n^k)$, and that the base case is $T(1) = c$, this will give the following:

\begin{align*}
T(n) &=  a \cdot T(n/b) + c \cdot n^k  =  a \cdot (a \cdot T(n/b^2) + c \cdot (n/b)^k) + c \cdot n^k
\\   &=  a \cdot (a \cdot (a \cdot T(n/b^3) + c \cdot (n/b^2)^k) + c \cdot (n/b)^k) + c \cdot n^k
\\   &=  a \cdot (a \cdot (\ldots (a \cdot (a \cdot T(1) + c \cdot (n/b^{m–1})^k) + c \cdot (n/b^{m–2})^k) \ldots) + c \cdot (n/b)^k) + c \cdot n^k
\end{align*}

The recursion stops when we reach $T(1)$, which is after $m$ levels, when $n/b^m = 1$. Now let’s replace $n$ with $b^m$ and $T(1)$ with $c$, and then expand the parentheses:

\begin{align*}
\ldots &=  a \cdot (a \cdot (\ldots (a \cdot (a \cdot c + c \cdot (b^m/b^{m–1})^k) + c \cdot (b^m/b^{m–2})^k) \ldots) + c \cdot (b^m/b)^k) + c \cdot b^{mk}
\\     &=  a \cdot (a \cdot (\ldots (a \cdot (a \cdot c + c \cdot b^{1k}) + c \cdot b^{2k}) \ldots) + c \cdot b^{(m–1)k}) + c \cdot b^{mk}
\\     &=  a^m c \cdot b^{0k}  +  a^{m–1} c \cdot b^{1k}  +  a^{m–2} c \cdot b^{2k}  +  \ldots  +  a^1 c \cdot b^{(m–1)k}  +  a^0 c \cdot b^{mk}
\\     &=  c \cdot (a^m b^{0k}  +  a^{m–1} b^{1k}  +  a^{m–2} b^{2k}  +  \ldots  +  a^1 b^{(m–1)k}  +  a^0 b^{mk})
\\     &=  c \cdot a^m \cdot (b^{0k} / a^0  +  b^{1k} / a^1 +  b^{2k} / a^2  +  \ldots  +  b^{(m–1)k} / a^{(m–1)}  +  b^{mk} / a^m)
\\     &=  c \cdot a^m \cdot \sum{i\leq m} (b^k/a)^i
\\     &=  c \cdot a^m \cdot \sum_{i\leq m} r^i
           \text{,  where} r = b^k / a  \text{and}  m = \log_b(n)
\end{align*}

The value of $\sum_{i\leq m} r^i$ depends on if $r$ is less than, equal to, or larger than 1:

- $r < 1$: The infinite sum $\sum r^i$ converges to $1/(1–r)$ which is constant, so  $\sum_{i\leq m} r^i \in O(1)$.
  Therefore $T(n) \in O(a^m) = O(n^d)$, because $a^m = a^{\log_b(n)}$ = $n^{\log_b(a)} = n^d$.

- $r = 1$: The sum collapses to $\sum{i\leq m} r^i = \sum_{i\leq m} 1 \in O(m) = O(\log(n))$. Furthermore, $a = b^k$, and so $k = \log_b(a)$.
  Therefore $a^m = n^{\log_b(a)} = n^k$, and we get $T(n) \in O(n^k \log(n))$.

- $r > 1$: Now the sum becomes $\sum_{i\leq m} r^i = (r^{m+1} – 1) / (r – 1) \in O(r^m)$.
  Since $b^m = n$, we get $T(n) \in O(a^m r^m)$ = $O(a^m (b^k/a)^m)$ = $O(b^{km}) = O(n^k)$.

That was some tricky summations, but the end result is quite nice!

Now we can use the Master theorem to solve some recurrences:

- **Binary search**, $T(n) = T(n/2) + O(1)$. Here $a = 1$, $b = 2$ and $k = 0$, and since $a = b^k$ we get the second case, so $T(n) \in O(n^k \log(n))$ = $O(\log(n))$.

- **Mergesort**, $T(n) = 2 T(n/2) + O(n)$. Here $a = 2$, $b = 2$ and $k = 1$, and again $a = b^k$. So we get the second case, and $T(n) \in O(n^k \log(n))$ = $O(n \log(n))$.

In the final three examples, $b$ is still 2, but $a$ is either 3 or 7, and $k$ is 1 or 2.

- if $a = 3$ and $k = 1$, then $a > b^k$ and we get the first case, so $T(n) \in O(n^{\log_2(3)}) \approx O(n^{1.6})$
- if $a = 3$ and $k = 2$, then $a < b^k$ and we get the third case, so $T(n) \in O(n^2)$
- if $a = 7$ and $k = 2$ we’re back in the first case, $a > b^k$, so $T(n) \in O(n^{\log_2(7)}) \approx O(n^{2.8})$

#### Case study: Karatsuba multiplication (optional)

How do we multiply numbers? If they are small enough they are handled efficiently by the processor, but what if the numbers are large with thousands of digits each?

Let’s say we want to multiply two numbers $x$ and $y$. We can turn this into a divide-and-conquer problem by splitting the numbers into two halves each:

\begin{align*}
x  &=  x_1 \cdot 10^m + x_0  \\
y  &=  y_1 \cdot 10^m + y_0
\end{align*}

Where $m$ is half the number of digits in $x$ and $y$. (Here I assume that the numbers are represented as decimal numbers, and that’s why I write $10^m$ – a computer stores numbers in binary so we would use $2^m$ instead.) Now:


\begin{align*}
x \cdot y &=  (x_1 \cdot 10^m + x_0) \cdot (y_1 \cdot 10^m + y_0)
\\        &=  x_1 y_1 \cdot 10^{2m}  +  (x_1 y_0 + x_0 y_1) \cdot 10^m  +  x_0 y_0
\end{align*}

Note that multiplying by $10^m$ is not a real multiplication, but instead just a shift of digit positions, so this is an efficient operation. Or as a multiplication table:

```
                x1	    x0
    ×           y1	    y0
--------------------------
                       x0 y0
              x1 y0    0...0
              x0 y1    0...0
    + x1 y1   0...0    0...0
```

Therefore the recursive implementation of $x \cdot y$ consists of four multiplications of numbers half the size. Plus some additions, which are linear in the number of digits. So we get the following recurrence relation for the complexity of $x \cdot y$:

$$ T(n)  =  4 \cdot T(n/2) + O(n) $$

From the Master theorem we see that $a = 4$, $b = 2$ and $k = 1$, and $a > b^k$.  The theorem then tells us that $T(n) \in O(n^{\log_2(4)}) = O(n^2)$, so this is a quadratic algorithm.

We can write the computation on the form $x \cdot y  =  z_2 \cdot 10^{2m} + z_1 \cdot 10^m + z_0$, where:

$$ z_0  =  x_0 y_0, \qquad  z_1  =  x_1 y_0 + x_0 y_1, \qquad  z_2  =  x_1 y_1 $$

Now we can be smart! $z_0$ and $z_2$ uses only one multiplication each, while $z_1$ uses two. Let’s introduce a new variable $z_3$, which uses only one multiplication:

$$ z_3 = (x_0 + x_1) (y_0 + y_1) $$

$z_1$ can now be formulated in terms of $z_0$, $z_2$ and $z_3$:

\begin{align*}
z1  &=  x_1 y_0 + x_0 y_1
\\  &=  (x_0 + x_1) (y_0 + y_1) – x_1 y_1 – x_0 y_0
\\  &=  z_3 – z_2 – z_0
\end{align*}

So, $x \cdot y$ can be calculated from $z_0$, $z_2$ and $z_3$, like this:

$$ x \cdot y  =  z_2 \cdot 10^{2m}  +  (z_3 – z_2 – z_0) \cdot 10^m  +  z_0 $$

which uses three multiplications, plus some linear-time additions and subtractions. This gives the following recurrence relation:

$$ T(n)  =  3 \cdot T(n/2) + O(n) $$

The Master theorem now tells us that $T(n) \in O(n^{\log_2(3)}) \approx O(n^{1.6})$, so this is our first sub-quadratic algorithm that still has a complexity higher than linearithmic. Note that even though this is asymptotically faster than the naive algorithm, it comes with high constant factors (we use many more additions than the naive version does). Therefore it is only worthwhile to use Karatsuba for very large numbers, 100 digits or more.

The first who noticed this algorithm was Anatoly Karatsuba in 1960 and therefore it is called *Karatsuba multiplication*. Here is more information about the algorithm, together with information about even faster algorithms:
https://en.wikipedia.org/wiki/Karatsuba_algorithm

#### Case study: matrix multiplication (optional)

How can we calculate the cross product $C = A \times B$ of two square matrices $A$ and $B$?

According to the definition of matrix multiplication, the entries of $C$ are calculated like this: $c_{ik} = \sum_j a_{ij} \cdot b_{jk}$. From this we can create a simple algorithm with a triple-nested loop that calculates $C$. If we assume that the matrices have size $n \times n$, then this naive algorithm is cubic, $O(n^3)$.

But are there algorithms that are asymptotically faster than the naive cubic algorithm? Yes, there are, and there are plenty of them. Wikipedia has a long article about this and lists the currently best-known algorithm (from 2024) to be $O(n^{2.371339})$:
https://en.wikipedia.org/wiki/Computational_complexity_of_matrix_multiplication

Most of these algorithms are impractical even though they are optimally the best, and this is because the constants involved are so big that they become faster only for matrices that are astronomically big. (Such algorithms are called “galactic”.)
But some of the sub-cubic algorithms for matrix multiplication are actually useful, and one of them is Strassen’s algorithm, from 1969. The basic idea is similar to the Karatsuba algorithm: it trades expensive multiplications for inexpensive additions. Strassen reduced the number of multiplications in each recursive step by one, from $2^3 = 8$ to only 7. This gives the recurrence relation $T(n) = 7 \cdot T(n/2) + O(n^2)$, which in turn gives a complexity of $O(n^{\log_2(7)}) \approx O(n^{2.8})$.

<!-- END NOTES -->

----------------

The running time for a recursive algorithm is most easily expressed by a recursive expression because the total time for the recursive algorithm includes the time to run the recursive call(s).
A [recurrence relation]{.term} defines a function by means of an expression that includes one or more (smaller) instances of itself.
A classic example is the recursive definition for the factorial function:

\begin{align*}
n! &= n\cdot(n-1)! \mbox{~~for~} n>1 \\
1! = 0! &= 1
\end{align*}

Another standard example of a recurrence is the Fibonacci sequence:

\begin{align*}
\mbox{Fib}(n) &= \mbox{Fib}(n-1) + \mbox{Fib}(n-2) \mbox{~~for~} n>2 \\
\quad\mbox{Fib}(1) = \mbox{Fib}(2) &= 1
\end{align*}

From this definition, the first seven numbers of the Fibonacci sequence are

$$
1, 1, 2, 3, 5, 8,\ \mbox{and}\ 13.
$$

Notice that this definition contains two parts: the general definition for $\mbox{Fib}(n)$ and the base cases for $\mbox{Fib}(1)$ and $\mbox{Fib}(2)$.
Likewise, the definition for factorial contains a recursive part and base cases.

Recurrence relations are often used to model the cost of recursive functions.
For example, the number of multiplications required by a recursive version of the factorial function for an input of size $n$ will be zero when $n = 0$ or $n = 1$ (the base cases), and it will be one plus the cost of calling itself on a value of $n-1$.
This can be defined using the following recurrence:

\begin{align*}
T(n) &= T(n-1) + 1 \mbox{~~for~} n>1 \\
T(0) = T(1) &= 0
\end{align*}

As with summations, we typically wish to replace the recurrence relation with a closed-form solution.
One approach is to expand the recurrence by replacing any occurrences of $T$ on the right-hand side with its definition:

\begin{align*}
T(n) &= 1 + T(n-1) \\
     &= 1 + (1 + T(n-2)) \\
     &= 1 + (1 + (1 + T(n-3))) \\
     &= 1 + (1 + (1 + (1 + (\cdots + 0))))
\end{align*}

So, the closed form solution of $T(n) = T(n-1)+1$ can be modeled by the summation $\sum_1^n 1 = n$.

::: dsvis
Here is an interactive explanation of the recurrence relation $T(n)=T(n-1)+1$.

``` {.jsav-animation src="AlgAnal/LinearRecurrencesCON.js" links="AlgAnal/LinearRecurrencesCON.css"}
```
:::

A slightly more complicated recurrence is

\begin{align*}
T(n) &= T(n-1) + n \\
T(1) &= 1
\end{align*}

Again, we will use expansion to help us find a closed form solution:

\begin{align*}
T(n) &= n + T(n-1) \\
     &= n + (n-1 + T(n-2)) \\
     &= n + (n-1 + (n-2 + T(n-3))) \\
     &= n + (n-1 + (n-2 + (n-3 + (\cdots + 1))))
\end{align*}

So, the closed form solution of $T(n) = T(n-1)+n$ can be modeled by the summation $\sum_1^n i$.
This is also a standard summation that we know, with the solution $T(n) = n(n+1)/2$.

::: dsvis
Here is an interactive explanation of this recurrence relation.

``` {.jsav-animation src="AlgAnal/LinearRecurrencesNCON.js" links="AlgAnal/LinearRecurrencesNCON.css"}
```
:::

A more complicated example is the standard [Mergesort]{.term}.
This takes a list of size $n$, splits it in half, performs Mergesort on each half, and finally merges the two sublists in $n$ steps.
The cost for this can be modeled as

\begin{align*}
T(n) &= 2\,T(n/2) + n \\
T(1) &= 1
\end{align*}

In other words, the cost of the algorithm on input of size $n$ is two
times the cost for input of size $n/2$ (due to the two recursive calls
to Mergesort) plus $n$ (the time to merge the sublists together again).

There are many approaches to solving recurrence relations, and we
briefly consider three here. The first is an estimation technique: Guess
the upper and lower bounds for the recurrence, use induction to prove
the bounds, and tighten as required. The second approach is to expand
the recurrence to convert it to a summation and then use summation
techniques. The third approach is to take advantage of already proven
theorems when the recurrence is of a suitable form. In particular,
typical divide-and-conquer algorithms such as Mergesort yield
recurrences of a form that fits a pattern for which we have a ready
solution.


:::::: latex
\booklink{Read the rest online}{7.4}{sec:recur-relations}
::::::

:::::: online

### Estimating upper and lower bounds

The first approach to solving recurrences is to guess the answer and
then attempt to prove it correct. If a correct upper or lower bound
estimate is given, an easy induction proof will verify this fact. If the
proof is successful, then try to tighten the bound. If the induction
proof fails, then loosen the bound and try again. Once the upper and
lower bounds match, you are finished. This is a useful technique when
you are only looking for asymptotic complexities. When seeking a precise
closed-form solution (i.e., you seek the constants for the expression),
this method will probably be too much work.

::: example
#### Example: Mergesort

Use the guessing technique to find the asymptotic bounds for Mergesort,
whose running time is described by the equation

\begin{align*}
T(n) &= 2T(n/2) + n \\
T(1) &= 1
\end{align*}

We begin by guessing that this recurrence has an upper bound in
$O(n^2)$. To be more precise, assume that

$$
T(n) \leq n^2
$$

We prove this guess is correct by induction. In this proof, we assume
that $n$ is a power of two, to make the calculations easy. For the base
case, $T(1) = 1 \leq 2^2$. For the induction step, we need to show
that $T(n) \leq n^2$ implies that $T(2n) \leq (2n)^2$ for
$n = 2^N, N \geq 1$. The induction hypothesis is

$$
T(i) \leq i^2,\ \textrm{for all}\ i \leq n
$$

It follows that

$$
T(2n) = 2T(n) + 2n \leq 2n^2 + 2n \leq 4n^2 \leq (2n)^2
$$

which is what we wanted to prove. Thus, $T(n)$ is in $O(n^2)$.

Is $O(n^2)$ a good estimate? In the next-to-last step we went from
$n^2 + 2n$ to the much larger $4n^2$. This suggests that $O(n^2)$ is a
high estimate. If we guess something smaller, such as
$T(n) \leq cn$ for some constant $c$, it should be clear that this
cannot work because $c 2 n = 2 c n$ and there is no room for the extra
$n$ cost to join the two pieces together. Thus, the true cost must be
somewhere between $cn$ and $n^2$.

Let us now try $T(n) \leq n \log n$. For the base case, the
definition of the recurrence sets
$T(1) = 1 \leq (2 \cdot \log 2) = 2$. Assume (induction
hypothesis) that $T(n) \leq n \log n$. Then,

$$
T(2n) = 2T(n) + 2n \leq 2n \log n + 2n
\leq 2n(\log n + 1) \leq 2 n \log 2n
$$

Therefore we have proved that $T(n)$ is in $O(n\log n)$.
:::

The following two examples are about the growth rates of a function (the factorial and the Fibonacci sequence),
*not* about the time it takes to compute the function.

::: example
#### Example: Factorial function


We know that the factorial function grows exponentially. How does it
compare to $2^n$? To $n^n$? Do they all grow "equally fast" (in an
asymptotic sense)? We can begin by looking at a few initial terms.

   $n$   1   2   3     4       5        6         7            8             9
------ --- --- --- ----- ------- -------- --------- ------------ -------------
 $2^n$   2   4   8    16      32       64       128          256           512
  $n!$   1   2   6    24     120      720     5,040       40,320       362,880
 $n^n$   1   4   9   256   3,125   46,656   823,543   16,777,216   387,420,489

We can also look at these functions in terms of their recurrences.

$$
2^n = \left\{
\begin{array}{ll}
2 & n=1\\
2(2^{n-1}) & n>1\\
\end{array}
\right.
$$

$$
n! = \left\{
\begin{array}{ll}
1 & n=1\\
n(n-1)! & n>1\\
\end{array}
\right.
$$

$$
n^n = \left\{
\begin{array}{ll}
n & n=1\\
n(n^{n-1}) & n>1\\
\end{array}
\right.
$$

At this point, our intuition should be telling us pretty clearly the
relative growth rates of these three functions. But how do we prove
formally which grows the fastest? And how do we decide if the
differences are significant in an asymptotic sense, or just constant
factor differences?

We can use logarithms to help us get an idea about the relative growth
rates of these functions. Clearly, $\log 2^n = n$. Equally clearly,
$\log n^n = n \log n$. We can easily see from this that $2^n$ is
$o(n^n)$, that is, $n^n$ grows asymptotically faster than $2^n$.

How does $n!$ fit into this? We can again take advantage of logarithms.
Obviously $n! \leq n^n$, so we know that $\log n!$ is $O(n \log n)$. But
what about a lower bound for the factorial function? Consider the
following.

\begin{align*}
n!  &=  n \times (n - 1) \times \cdots \times \frac{n}{2} \times
(\frac{n}{2} - 1) \times \cdots \times 2 \times 1\\
 &\geq  \frac{n}{2} \times \frac{n}{2} \times \cdots \times \frac{n}{2}
\times 1 \times \cdots \times 1 \times 1\\
 &=  (\frac{n}{2})^{n/2}
\end{align*}

Therefore

$$
\log n! \geq \log(\frac{n}{2})^{n/2} =
(\frac{n}{2})\log(\frac{n}{2})
$$

In other words, $\log n!$ is in $\Omega(n \log n)$. Thus,
$\log n! = \Theta(n \log n)$.

Note that this does **not** mean that $n! = \Theta(n^n)$. Because
$\log n^2 = 2 \log n$, it follows that $\log n = \Theta(\log n^2)$ but
$n \neq \Theta(n^2)$. The log function often works as a "flattener"
when dealing with asymptotics. That is, whenever $\log f(n)$ is in
$O(\log g(n))$ we know that $f(n)$ is in $O(g(n))$. But knowing that
$\log f(n) = \Theta(\log g(n))$ does not necessarily mean that
$f(n) = \Theta(g(n))$.
:::

::: example
#### Example: Fibonacci sequence

What is the growth rate of the Fibonacci sequence? We define the
Fibonacci sequence as $f(n) = f(n-1) + f(n-2)$ for $n \geq 2$;
$f(0) = f(1) = 1$.

In this case it is useful to compare the ratio of $f(n)$ to $f(n-1)$.
The following table shows the first few values.

          $n$    1    2     3       4      5      6      7
------------- ---- ---- ----- ------- ------ ------ ------
       $f(n)$    1    2     3       5      8     13     21
$f(n)/f(n-1)$    1    2   1.5   1.666  1.625  1.615  1.619

If we continue for more terms, the ratio appears to converge on a value
slightly greater then 1.618. Assuming $f(n)/f(n-1)$ really does converge
to a fixed value as $n$ grows, we can determine what that value must be.

$$
\frac{f(n)}{f(n-2)} = \frac{f(n-1)}{f(n-2)} + \frac{f(n-2)}{f(n-2)}
\rightarrow x+1
$$

for some value $x$. This follows from the fact that
$f(n) = f(n-1) + f(n-2)$. We divide by $f(n-2)$ to make the second term
go away, and we also get something useful in the first term. Remember
that the goal of such manipulations is to give us an equation that
relates $f(n)$ to something without recursive calls.

For large $n$, we also observe that:

$$
\frac{f(n)}{f(n-2)} = \frac{f(n)}{f(n-1)}\frac{f(n-1)}{f(n-2)}
\rightarrow x^2
$$

as $n$ gets big. This comes from multiplying $f(n)/f(n-2)$ by
$f(n-1)/f(n-1)$ and rearranging.

If $x$ exists, then $x^2 - x - 1 \rightarrow 0$. Using the quadratic
equation, the only solution greater than one is

$$
x = \frac{1 + \sqrt{5}}{2} \approx 1.618
$$

This expression also has the name $\phi$. What does this say about the
growth rate of the Fibonacci sequence? It is exponential, with
$f(n) \in O(\phi^n)$. More precisely, $f(n)$ converges to

$$
\frac{\phi^n - (1 - \phi)^n}{\sqrt{5}}
$$
:::

### Expanding recurrences

Estimating bounds is effective if you only need an approximation to the
answer. More precise techniques are required to find an exact solution.
One approach is called [expanding the recurrence]{.term}. In this method, the smaller terms on the right side of the
equation are in turn replaced by their definition. This is the expanding
step. These terms are again expanded, and so on, until a full series
with no recurrence results. This yields a
[summation]{.term}, and
techniques for solving summations can then be used.

In the beginning of this section we showed how to expand some very simple recurrences.

::: dsvis
Here is a more complicated example, where we want to find the closed form solution of
$T(n) = 2T(n/2) + 5n^2$; $T(1) = 7$.

``` {.jsav-animation src="AlgAnal/ExpandRecurrenceCON.js" links="AlgAnal/ExpandRecurrenceCON.css" name="Divide-and-Conquer Expansion Slideshow"}
```
:::

<!--
::: TODO
- We haven't introduced heaps yet - so this should move to later
:::

::: example
#### Example: Building a heap

Our next example models the cost of the algorithm to build a heap. You
should recall that to build a [heap](#heaps),
we first heapify the two subheaps, then push down the root
to its proper position. The cost is:

$$
f(n) \leq 2f(n/2) + 2 \log n
$$

Let us find a closed form solution for this recurrence. We can expand
the recurrence a few times to see that

\begin{align*}
f(n) &\leq  2f(n/2) + 2 \log n \\
     &\leq  2[2f(n/4) + 2 \log n/2] + 2 \log n \\
     &\leq  2[2(2f(n/8) + 2 \log n/4) + 2 \log n/2] + 2 \log n
\end{align*}

We can deduce from this expansion that this recurrence is equivalent to
following summation and its derivation:

\begin{align*}
f(n)  &\leq  \sum_{i=0}^{\log n -1} 2^{i+1} \log(n/2^i) \\
      &=  2 \sum_{i=0}^{\log n -1} 2^i (\log n - i) \\
      &=  2 \log n \sum_{i=0}^{\log n -1} 2^i - 4 \sum_{i=0}^{\log n -1} i 2^{i-1} \\
      &=  2 n \log n - 2 \log n - 2 n \log n + 4n -4 \\
      &=  4n - 2 \log n - 4
\end{align*}

:::
-->

### Divide-and-conquer recurrences

The third approach to solving recurrences is to take advantage of known
theorems that provide the solution for classes of recurrences. Of
particular practical use is a theorem that gives the answer for a class
known as [divide-and-conquer recurrences]{.term}. These have the form

\begin{align*}
T(n) &= aT(n/b) + cn^k \\
T(1) &= c
\end{align*}

where $a$, $b$, $c$, and $k$ are constants. In general, this recurrence
describes a problem of size $n$ divided into $a$ subproblems of size
$n/b$, while $cn^k$ is the amount of work necessary to combine the
partial solutions. Mergesort is an example of a divide and conquer
algorithm, and its recurrence fits this form. So does binary search. We
use the method of expanding recurrences to derive the general solution
for any divide and conquer recurrence, assuming that $n = b^m$.

\begin{align*}
T(n)  &=  aT(n/b) + cn^k \\
            &=  a(aT(n/b^2) + c(n/b)^k) + cn^k \\
            &=  a(a[aT(n/b^3) + c(n/b^2)^k] + c(n/b)^k) + cn^k \\
            &=  a^mT(1) + a^{m-1}c(n/b^{m-1})^k + \cdots + ac(n/b)^k + cn^k \\
            &=  a^mc + a^{m-1}c(n/b^{m-1})^k + \cdots + ac(n/b)^k + cn^k \\
            &=  c\sum_{i=0}^{m} a^{m-i} b^{ik} \\
            &= ca^m\sum_{i=0}^{m} (b^k/a)^i
\end{align*}

::: dsvis
Here is a more visual presentation of this same derivation.

``` {.jsav-animation src="AlgAnal/DandCRecurrenceCON.js" links="AlgAnal/DandCRecurrenceCON.css" name="Divide-and-Conquer Expansion Slideshow 2"}
```
:::

So, we are left with this result:

$$
T(n) = ca^m\sum_{i=0}^{m} (b^k/a)^i
$$

At this point, it is useful to note that

$$
a^m = a^{\log_bn} = n^{\log_ba}.
$$

This gives us

$$
T(n) = c n^{\log_ba} \sum_{i=0}^{m} (b^k/a)^i
$$

The summation part of this equation is a geometric series whose sum
depends on the ratio $r = b^k/a$. There are three cases.

Case (1)

:   $r<1$. From the list of useful summations in @sec:mathematical-preliminaries,
    $\sum_{i=0}^{m} r^i < 1/(1-r)$, which is a constant.

    Thus,
    $T(n) \in O(a^m) = O(n^{\log_b a})$.

Case (2)

:   $r=1$. Because $r = b^k/a$, we know that $a = b^k$. From the
    definition of logarithms it follows immediately that $k = \log_b a$.
    Also note that since we defined $n = b^m$, then $m = \log_b n$.

    Thus,
    $\sum_{i=0}^{m} r^i = m + 1 = \log_bn + 1$.

    Because $a^m = n^{\log_b a} = n^k$, we have
    $T(n) \in O(n^{\log_ba}\log_b n) = O(n^k\log_b n)$.

Case (3)

:   $r>1$. Another useful summation tells us that
    $\sum_{i=0}^{m} r^i = \frac{r^{m+1} - 1}{r - 1} \in O(r^m)$.

    Thus,
    $T(n) \in O(a^m r^m) = O(a^m (b^k/a)^m) = O(b^{km}) = O(n^k)$.


We can summarise the above derivation as the following theorem,
sometimes referred to as the [master theorem]{.term}.

::: topic
#### Theorem: The master theorem

For any recurrence relation of the form
$T(n) = aT(n/b) + cn^k$; $T(1) = c$, the following
relationships hold.

$$
T(n) \in
\left\{ \begin{array}{ll}
    O(n^{\log_ba})  &  \mbox{if}\ a > b^k \\
    O(n^k\log_b n)  &  \mbox{if}\ a = b^k \\
    O(n^k)          &  \mbox{if}\ a < b^k
\end{array} \right.
$$

:::

This theorem may be applied whenever appropriate, rather than
re-deriving the solution for the recurrence.

::: example
#### Example: Using the master theorem

Apply the master theorem to solve
$T(n) = 3T(n/5) + 8n^2$.

Because $a=3$, $b=5$, $c=8$, and $k=2$, we find that $3<5^2$. Applying
case (3) of the theorem, $T(n) \in O(n^2)$.
:::

::: example
#### Example: Master theorem for Mergesort

Use the master theorem to solve the recurrence relation for Mergesort:

\begin{align*}
T(n) &= 2T(n/2) + n \\
T(1) &= 1
\end{align*}

Because $a=2$, $b=2$, $c=1$, and $k=1$, we find that $2 = 2^1$. Applying
case (2) of the theorem, $T(n) \in O(n \log n)$.
:::

### Case study: Average-case analysis of Quicksort {#average-analysis-quicksort}

::: TODO
- Average-case is **not** a good thing - what are we averaging on?
:::

In @sec:complexity-analysis-1, we determined that the average-case analysis of Quicksort
had the following recurrence:

\begin{align*}
T(n) &= cn + \frac{1}{n}\sum_{k=0}^{n-1} [T(k) + T(n -1 - k)] \\
T(0) = T(1) &= c
\end{align*}

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
$\mathcal{H}_{n+1} \in O(\log n)$, so the final solution is
$O(n \log n)$.

::::::
