
## Algorithm analysis in practice

::: TODO
- Prio 2: add some "real" examples, i.e., more complex ones
    - exception: nested linear + binary loop == linear
- Prio 2: briefly discuss functions and non-atomic statements
:::

In this section we show how to analyse complexity in practice, by analysing several simple code fragments.
As mentioned in the last section, we will only give the upper bound using the big-$O$ notation.

### Simplification rules

Once you determine the running-time equation for an algorithm, it really
is a simple matter to derive the big-$O$ expressions from the equation.
You do not need to resort to the formal definitions of asymptotic
analysis. Instead, you can use the following rules to determine the
simplest form.

(1) **Transitivity**:
    If $f\in O(g)$ and $g\in O(h)$, then $f\in O(h)$

(2) **Constant factor**:
    If $f\in O(g)$, then $k\cdot f\in O(g)$, for any constant $k>0$

      - Special case: $O(k) = O(1)$ for all constants $k>0$

(3) **Addition**:
    If $f\in O(g)$ and $f'\in O(g')$, then $f+f' \in O(\max(g,g'))$

      - Special case: if $f,f'\in O(g)$, then $f+f' \in O(g)$

(4) **Multiplication**:
    If $f\in O(g)$ and $f'\in O(g')$, then $f\cdot f' \in O(g\cdot g')$


The first rule says that if some function $g(n)$ is an upper bound for
your cost function, then any upper bound for $g(n)$ is also an upper
bound for your cost function.

The significance of rule (2) is that you can ignore any multiplicative
constants in your equations when using big-$O$ notation.

Rule (3) says that given two parts of a program run in sequence (whether
two statements or two sections of code), you need consider only the more
expensive part.

Rule (4) is used to analyze simple loops in programs. If some action is
repeated some number of times, and each repetition has the same cost,
then the total cost is the cost of the action multiplied by the number
of times that the action takes place.

Taking the first three rules collectively, you can ignore all constants and all lower-order terms to determine the asymptotic growth rate for any cost function.
The advantages and dangers of ignoring constants were discussed in the beginning of the previous section.
Ignoring lower-order terms is reasonable when performing an asymptotic analysis.
The higher-order terms soon swamp the lower-order terms in their contribution to the total cost as $n$ becomes larger.
Thus, if $f(n) = 3 n^4 + 5 n^2$, then $f(n)$ is in $O(n^4)$.
The $n^2$ term contributes relatively little to the total cost for large $n$.

From now on, we will use these simplifying rules when discussing the
cost for a program or algorithm.


### The complexity hierarchy

We can use the upper bound to define an ordering between complexity classes,
where we write $O(f)\leq O(g)$ for $f\in O(g)$.
Using this we can infer the following hierarchy of complexity classes:

$$
O(1) < O(\log n) < O(\sqrt{n}) < O(n) < O(n\log n) < O(n^2) < O(n^2\log n) < O(n^3) < \cdots < O(n^k) < O(2^n) < O(10^n) < O(n!) < \cdots
$$

(Note that we use strict equality here, and trust that you intuitively understand the difference between $\leq$ and $<$.)

One interesting consequence of asymptotic complexity is that the base of a logarithm becomes irrelevant, i.e.:

$$ O(\log_2(n)) = O(\ln(n)) = O(\log_10(n)) $$

So we usually just write $O(\log n)$.
The reason why the base is irrelevant is a direct consequence of the logarithm laws.

We leave as an exercise to the reader to figure out both the definition of $<$ and why the logarithm base is irrelevant.
But we will come back to this issue in chapter XX.


### Analysing code fragments

#### Atomic operations

Atomic operations are things like assigning a variable, looking up the value of an array index, or printing something.
Not all atomic operations take the same time to execute, but we can assume that they are always constant.

If an operation takes constant time, $f(n) = k$, then $f\in O(1)$, so we can assume that all atomic operations are $O(1)$.

#### Sequence of operations

A sequence of atomic operations, such as performing 10 assignments, is still constant (multiplying a constant with 10 is still constant).
But what if we have a sequence of non-atomic operations?

E.g., suppose that we have the three operations $p_1\in O(f_1)$, $p_2\in O(f_2)$, and $p_3\in O(f_3)$.
The complexity of the sequence $p_1; p_2; p_3$ will then be sum of the parts, i.e.:

$$
p_1; p_2; p_3 \in O(f_1) + O(f_2) + O(f_3) = O(\max(f_1, f_2, f_3))
$$

#### Loops and iterations

What if we perform some operation $p\in O(f)$ for each element in an array $A$, what is the complexity?
It depends on the size of the array: if we assume that the array has $n$ elements, what is the complexity of the following loop?

$$
\mbox{for}\ x \in A: p
$$

The loop performs $p$ once for every element in $A$, meaning that $p$ will be executed $n$ times.
Therefore the complexity of a loop is:

$$
(\mbox{for}\ x \in A: p) \in |A|\cdot O(f) = n\cdot O(f) = O(n\cdot f)
$$

Note that $p$ can be a complex operation, for example a loop itself.
If $p$ is a simple loop over A, with a constant-time operation in its body, then $p\in O(n)$.
And then the outer loop ($\mbox{for}\ x \in A: p$) will be in $n\cdot O(n) = O(n^2)$.

#### Summary

When we want to analyse the complexity of code fragments, the following three rules of thumb one will get us very far:

- Atomic operations are always $O(1)$
- Sequences $p;p'$ are translated to addition, $O(\max(f,f'))$
- Iterations, $\mbox{for}\ x \in A: p$, are translated to multiplication, $n\cdot O(f) = O(n\cdot f)$
  (assuming that $n=|A|$)


### Examples

::::: {#AssignAnal}
:::: topic
#### Example: Simple assignment {-}

We begin with an analysis of a simple assignment to an integer variable.

    a = b

Because the assignment statement takes constant time, it is $O(1)$.
::::
:::::

::::: {#FLAnal}
:::: topic
#### Example: Simple for-loop {-}

Consider a simple `for` loop.

    sum = 0
    for i in 0 .. n-1:
        sum = sum + n

The first line is $O(1)$. The `for` loop is repeated $n$ times. The
third line takes constant time so, by simplifying rule (4), the total
cost for executing the two lines making up the `for` loop is
$O(n)$. By rule (3), the cost of the entire code fragment is also
$O(n)$.
::::
:::::

:::: topic
#### Example: Many for-loops {-}

We now analyze a code fragment with several `for` loops, some of which
are nested.


    sum = 0
    for j in 0 .. n-1:      // First for loop
        for i in 0 .. j-1:  // is a double loop.
            sum = sum + 1
    for k in 0 .. n-1:      // Second for loop.
        A[k] = k


This code fragment has three separate statements: the first assignment
statement and the two `for` loops. Again the assignment statement takes
constant time; call it $c_1$. The second `for` loop is just like the one
in Example [#FLAnal](#FLAnal) and takes
$c_2 n \in O(n)$ time.

The first `for` loop is a double loop and requires a special technique.
We work from the inside of the loop outward. The expression `sum++`
requires constant time; call it $c_3$. Because the inner `for` loop is
executed $j$ times, by simplifying rule (4) it has cost $c_3j$. The
outer `for` loop is executed $n$ times, but each time the cost of the
inner loop is different because it costs $c_3j$ with $j$ changing each
time. You should see that for the first execution of the outer loop, $j$
is 1. For the second execution of the outer loop, $j$ is 2. Each time
through the outer loop, $j$ becomes one greater, until the last time
through the loop when $j = n$. Thus, the total cost of the loop is $c_3$
times the sum of the integers 1 through $n$. We know that

$$
\sum_{i = 1}^{n} i = \frac{n (n+1)}{2}
$$

which is $O(n^2)$. By simplifying rule (3),
$O(c_1 + c_2 n + c_3 n^2)$ is simply $O(n^2)$.
::::

:::: topic
#### Example: Comparing nested loops {-}

Compare the asymptotic analysis for the following two code fragments.

    sum1 = 0
    for i in 0 .. n-1:       // First double loop.
        for j in 0 .. n-1:   // Do n times.
            sum1 = sum1 + 1

    sum2 = 0
    for i in 0 .. n-1:       // Second double loop.
        for j in 0 .. i-1:   // Do i times.
            sum2 = sum2 + 1

In the first double loop, the inner `for` loop always executes $n$
times. Because the outer loop executes $n$ times, it should be obvious
that the statement `sum1=sum1+1` is executed precisely $n^2$ times. The
second loop is similar to the one analyzed in the previous example, with
cost $\sum_{j = 1}^{n} j$. This is approximately $\frac{1}{2} n^2$.
Thus, both double loops cost $O(n^2)$, though the second requires
about half the time of the first.
::::


### Advanced algorithm analyses

The rules of thumb above do not always give the tightest possible complexity.
In some (rare) cases the simple analysis might give a complexity of say $O(n \log n)$,
but a more detailed analysis will give a tighter bound, such as $O(n)$.
So, is there something wrong with the rules?

No, the rules are correct, and this is because the $O$ notation gives an *upper bound*.
Recall that every function $f\in O(n)$ is also in $O(n\log n)$, since $O(n) < O(n\log n)$.

:::: topic
#### Example: Non-quadratic nested loops {-}

Not all doubly nested `for` loops are $O(n^2)$. The following pair
of nested loops illustrates this fact.

    sum1 = 0
    k = 1
    while k <= n:            // Do log n times.
        for j in 0 .. n-1:   // Do n times.
            sum1 = sum1 + 1
        k = k * 2

    sum2 = 0
    k = 1
    while k <= n:            // Do log n times.
        for j in 0 .. k-1:   // Do k times.
            sum2 = sum2 + 1
        k = k * 2

When analyzing these two code fragments, we will assume that $n$ is a
power of two. The first code fragment has its outer `for` loop executed
$\log n+1$ times because on each iteration $k$ is multiplied by two
until it reaches $n$. Because the inner loop always executes $n$ times,
the total cost for the first code fragment can be expressed as

$$
\sum_{i=0}^{\log n} n = n \log n
$$

So the cost of this first double loop is $O(n \log n)$. Note that a
variable substitution takes place here to create the summation, with
$k = 2^i$.

In the second code fragment, the outer loop is also executed $\log n+1$
times. The inner loop has cost $k$, which doubles each time. The
summation can be expressed as

$$
\sum_{i=0}^{\log n} 2^i \in O(n)
$$

where $n$ is assumed to be a power of two and again $k = 2^i$.
::::

<!-- TODO
We need to think about a technique for visualizing the running time of
some loop constructs. This can be very similar to how we visualize
reaching the closed form solution of summations.
-->

#### Other control statements

What about other control statements? `While` loops are analyzed in a
manner similar to `for` loops. The cost of an `if` statement in the
worst case is the greater of the costs for the `then` and `else`
clauses. This is also true for the average case, assuming that the size
of $n$ does not affect the probability of executing one of the clauses
(which is usually, but not necessarily, true). For `switch` statements,
the worst-case cost is that of the most expensive branch. For subroutine
calls, simply add the cost of executing the subroutine.

There are rare situations in which the probability for executing the
various branches of an `if` or `switch` statement are functions of the
input size. For example, for input of size $n$, the `then` clause of an
`if` statement might be executed with probability $1/n$. An example
would be an `if` statement that executes the `then` clause only for the
smallest of $n$ values. To perform an average-case analysis for such
programs, we cannot simply count the cost of the `if` statement as being
the cost of the more expensive branch. In such situations, the technique
of [amortized analysis]{.term} can come to the rescue.

#### Recursive functions

Determining the execution time of a recursive subroutine can be
difficult. The running time for a recursive subroutine is typically best
expressed by a recurrence relation. For example, the recursive factorial
function calls itself with a value one less than its input value. The
result of this recursive call is then multiplied by the input value,
which takes constant time. Thus, the cost of the factorial function, if
we wish to measure cost in terms of the number of multiplication
operations, is one more than the number of multiplications made by the
recursive call on the smaller input. Because the base case does no
multiplications, its cost is zero. Thus, the running time for this
function can be expressed as

\begin{eqnarray}
T(n) &=& T(n-1) + 1, \textrm{ for } n>1 \\
T(1) &=& 0
\end{eqnarray}

The closed-form solution for this recurrence relation is $O(n)$.

Recurrence relations are discussed further in section XX (chapter: analysis part 3).
