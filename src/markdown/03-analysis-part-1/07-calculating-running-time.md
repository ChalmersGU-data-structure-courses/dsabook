
## Algorithm analysis in practice

::: TODO
- Prio 2: add some "real" examples, i.e., more complex ones
- Prio 2: briefly discuss functions and non-atomic statements
:::

In this section we show how to analyse complexity in practice, by analysing several simple code fragments.
As mentioned in the last section, we will only give the upper bound using the big-$O$ notation.

### Simplification rules

There are many advantages with the big-$O$ notation.
It allows us to analyse complex algorithms easily and
to get a grasp of how efficient they are on very big inputs.
By "easily" we mean that there are some rules of thumb that covers almost all practical cases
-- you almost never need to resort to the formal definitions of asymptotic analysis.


(1) **Transitivity**:
    If $f\in O(g)$ and $g\in O(h)$, then $f\in O(h)$.
    \
    This first rule says that if some function $g(n)$ is an upper bound for your cost function,
    then any upper bound for $g(n)$ is also an upper bound for your cost function.
    \

(2) **Constant factor**:
    If $f\in O(g)$, then $k\cdot f\in O(g)$, for any constant $k>0$.
    \
    The significance of this rule is that you can ignore any multiplicative constants
    in your equations when using big-$O$ notation.

      - **Special case**: $O(k) = O(1)$ for all constants $k>0$
    \

(3) **Addition**:
    If $f\in O(g)$ and $f'\in O(g')$, then $f+f' \in O(\max(g,g'))$.
    \
    This rule says that given two parts of a program run in sequence
    (whether two statements or two sections of code),
    you need consider only the more expensive part.

      - **Special case**: if $f,f'\in O(g)$, then $f+f' \in O(g)$
    \

(4) **Multiplication**:
    If $f\in O(g)$ and $f'\in O(g')$, then $f\cdot f' \in O(g\cdot g')$
    \
    The final rule is used to analyse simple loops in programs.
    If some action is repeated some number of times, and each repetition has the same cost,
    then the total cost is the cost of the action multiplied by
    the number of times that the action takes place.

Taking the first three rules collectively, you can ignore all constants and
all lower-order terms to determine the asymptotic growth rate for any cost function.
The advantages and dangers of ignoring constants were discussed in @sec:asymptotic-analysis.

Ignoring lower-order terms is reasonable when performing an asymptotic analysis.
The higher-order terms soon overpower the lower-order terms as $n$ becomes larger.
Thus, if $f(n) = 3 n^4 + 5 n^2$, then $f(n)$ is in $O(n^4)$.
The $n^2$ term contributes relatively little to the total cost for large $n$.

There are of course some problems with too much simplification.
For example, the sorting algorithms in [Chapter @sec:sorting-part-1] are all quadratic,
so one could think that they are all equally good.
However, in practice Bubble sort is almost always slower than the other algorithms,
because it has a larger constant factor.
But we cannot see this if we use big-$O$ notation since it removes all constant factors
-- to know this we have to analyse the algorithms in more depth.

But regardless of the problems, we will from now on use these simplifying rules
when discussing the cost for a program or an algorithm.


### The complexity hierarchy

We can use the upper bound to define an ordering between complexity classes,
where we write $O(f)\leq O(g)$ for $f\in O(g)$.
Using this we can infer the following hierarchy of complexity classes:

\begin{multline*}
O(1) < O(\log(n)) < O(\log(n)^2) < O(\sqrt{n}) < O(n) < O(n\log(n)) < \cdots \\
\cdots < O(n^2) < O(n^2 \log(n)) < O(n^3) < \cdots < O(2^n) < O(10^n) < \cdots < O(n!)
\end{multline*}

One interesting consequence of asymptotic complexity is that the base of a logarithm becomes irrelevant:

$$ O(\log_2(n)) = O(\ln(n)) = O(\log_{10}(n)) $$

So we usually just write $O(\log(n))$.
The reason why the base is irrelevant is a direct consequence of the logarithm laws.

::: online
We leave as an exercise to the reader to figure out both the definition of $<$ and why the logarithm base is irrelevant.
But we will come back to this issue in [Chapter @sec:analysis-part-2].
:::

### Analysing code fragments

When we want to analyse the complexity of code fragments, the following three rules of thumb will get us very far:

- An **atomic operation** is always $O(1)$

- A **sequence**, $\langle p_1;p_2;p_3\rangle$,
  has the complexity $O(\max(f_1,f_2,f_3))$,
  where $p_i\in O(f_i)$

- An **iteration**, $\langle\mbox{for}\ x \in A: p\rangle$,
  has the complexity $n\cdot O(f) = O(n\cdot f)$,
  where $n=|A|$ and $p\in O(f)$

#### Atomic operations

Atomic operations are things like assigning a variable, looking up the value of an array index, or printing something.
Not all atomic operations take the same time to execute, but we can assume that they are always constant.

If an operation takes constant time, $f(n) = k$, then $f\in O(1)$, so we can assume that all atomic operations are $O(1)$.

#### Sequences of operations

A sequence of atomic operations, such as performing 10 assignments, is still constant (multiplying a constant with 10 is still constant).
But what if we have a sequence of non-atomic operations?

For example, suppose that we have the three operations $p_1\in O(f_1)$, $p_2\in O(f_2)$, and $p_3\in O(f_3)$.
The complexity of the sequence $\langle p_1; p_2; p_3\rangle$ will then be sum of the parts, i.e.:

$$
\langle p_1; p_2; p_3\rangle \in O(f_1) + O(f_2) + O(f_3) = O(\max(f_1, f_2, f_3))
$$

#### If-statements

The cost of an `if`-statement is in the worst case the greater of the costs for the `then` and `else` branches,
so we can treat `if`-statements just as sequences.
We just have to remember that we also have to look at the boolean test itself
-- it might call a function that takes some time to run, and then we have to include that too.

For example, AVL trees (@sec:avl-trees) can be used to store sets of elements,
and to search in an AVL tree is logarithmic in the number of elements, $O(\log(n))$.
If we have an `if`-statement where we test if an AVL tree contains a certain element,
then the test itself is logarithmic and we must not forget that.

#### For-loops

What if we perform some operation $p\in O(f)$ for each element in an array $A$, what is the complexity?
It depends on the size of the array: if we assume that the array has $n$ elements, what is the complexity of the following loop?

$$
\mbox{for}\ x \in A: p
$$

The loop performs $p$ once for every element in $A$, meaning that $p$ will be executed $n$ times.
Therefore the complexity of a loop is:

$$
\langle\mbox{for}\ x \in A: p\rangle \in n\cdot O(f) = O(n\cdot f)
$$

Note that $p$ can be a complex operation, for example a loop itself.
If $p$ is a simple loop over A, with a constant-time operation in its body, then $p\in O(n)$.
And then the outer loop $\langle \mbox{for}\ x \in A: p\rangle$ will be in $n\cdot O(n) = O(n^2)$.

*Don't be fooled by loops*!
Not all loops runs $n$ iterations, for example our array $A$ could very well consist of $n^2$ elements,
or not depend on $n$ at all.
If the loop iterates over $n^2$ elements then the complexity is of course $O(n^2\cdot f)$.

#### While-loops

Other kinds of loops, such as `while`-loops, are treated in a similar way.
We calculate how many times the loop will iterate and then multiply with the complexity of the loop body.
But it can be more or less difficult to know how many times it will iterate:
we have to look at the variables that are referred by the loop condition
and then analyse how these variables change in each iteration.

For example, the pseudocode for Insertion sort (@sec:insertion-sort) contains a `while`-loop
which says that $j\geq 0$.
So to know how many times the loop will iterate,
we have to know how $j$ is initialised and how it changes in each iteration.
The starting value is $j=i$, and it is decreased by 1 in each iteration.
So the `while`-loop will iterate $i$ times in the worst case.

### Examples of algorithm analysis {#alg-analysis-examples}

::: online
Here are some examples of how to analyse the big-$O$ complexity of algorithms.
:::

::: latex
\booklink{More examples online}{2.7}{sec:alg-analysis-examples}

Here are some examples of how to analyse the big-$O$ complexity of algorithms.
More examples can be found in the online version of the book.
:::


::: example
#### Example: Simple for-loop

Consider a simple `for` loop.

    sum = 0
    for i in 1 .. n:
        sum = sum + i

The first line is $O(1)$. The `for` loop is repeated $n$ times. The
third line takes constant time so, by simplifying rule (4), the total
cost for executing the two lines making up the `for` loop is
$O(n)$. By rule (3), the cost of the entire code fragment is also
$O(n)$.
:::

::: example
#### Example: Simple sorting algorithms

The basic sorting algorithms from [Chapter @sec:sorting-part-1], Bubble sort, Selection sort and Insertion sort, all have the same structure. They consist of a nested `for` loop, where the outer loop is iterated $n$ times:

        for i in 0 .. n-1:   // Outer loop, repeated n times
            for j in ...:    // Inner loop, repeated up to n times
                do some constant operations

The outer `for` loop is repeated $O(n)$ times.
The inner loop is slightly different for the different algorithms, but in the worst case it will repeat $O(n)$ times too.
The body of the inner loop consists of constant-time operations, such as an `if`-clause or swapping of two elements.
Exactly what is not of interest for a complexity analysis -- the only interesting fact is that the body is constant time, $O(1)$

By the simplifying rule (4) we can multiply all these values together, so the total worst-case time complexity is
$O(n) \cdot O(n) \cdot O(1) = O(n^2)$.
:::

::: online

:::: example
#### Example: Many for-loops

We now analyse a code fragment with several `for` loops, some of which
are nested.


    sum = 0
    for i in 1 .. n:      // First for loop
        for j in 1 .. j:  // is a double loop.
            sum = sum + 1
    for k in 1 .. n:      // Second for loop.
        sum = sum + 1


This code fragment has three separate statements: the first assignment
statement and the two `for` loops. Again the assignment statement takes
constant time; call it $c_1$.
The second `for` loop is just like the one in example with one `for` loop and takes $c_2 n \in O(n)$ time.

The first `for` loop is a double loop and requires a special technique.
We work from the inside of the loop outward. The expression `sum=sum+1`
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

:::: example
#### Example: Comparing nested loops

Compare the asymptotic analysis for the following two code fragments.

    sum1 = 0
    for i in 1 .. n:       // First double loop.
        for j in 1 .. n:   // Do n times.
            sum1 = sum1 + 1

    sum2 = 0
    for i in 1 .. n:       // Second double loop.
        for j in 1 .. i:   // Do i times.
            sum2 = sum2 + 1

In the first double loop, the inner `for` loop always executes $n$
times. Because the outer loop executes $n$ times, it should be obvious
that the statement `sum1=sum1+1` is executed precisely $n^2$ times. The
second loop is similar to the one analysed in the previous example, with
cost $\sum_{j = 1}^{n} j$. This is approximately $n^2/2$.
Thus, both double loops cost $O(n^2)$, though the second requires
about half the time of the first.
::::


:::: example
#### Example: Non-quadratic nested loops

Not all doubly nested `for` loops are strictly $O(n^2)$, the following is an example.

    sum = 0
    k = 1
    while k <= n:          // Do log(n) times.
        for j in 1 .. n:   // Do n times.
            sum = sum + 1
        k = k * 2

To make our analysis easier, we will assume that $n$ is a power of two.
The code fragment has its outer `for` loop executed $\log(n+1)$ times because
on each iteration $k$ is multiplied by two until it reaches $n$.
Now, because the inner loop always executes $n$ times, the total cost for can be expressed as

$$
\sum_{i=0}^{\log(n)} n = n \log(n)
$$

So the cost of this double loop is $O(n \log(n))$.
Note that the summation variable $i$ is the logarithm of the loop variable $k$, i.e. $k = 2^i$.

Our analysis rules give the same result: the outer loop is logarithmic and the inner loop is linear,
so we multiply them to $O(n \log(n))$.
::::

:::
