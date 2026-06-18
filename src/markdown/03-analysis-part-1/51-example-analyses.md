:::::: online

## Examples of algorithm analysis {#alg-analysis-examples}

::: TODO
- Prio 2: add some "real" examples, i.e., more complex ones
:::

Here are some examples of how to analyse the big-$O$ complexity of algorithms.

::: example
#### Example: Simple for-loop

Consider a simple `for` loop.

    sum = 0
    for i in 1 .. n:
        sum += i

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


::: example
#### Example: Many for-loops

We now analyse a code fragment with several `for` loops, some of which
are nested.


    sum = 0
    for i in 1 .. n:      // First for loop
        for j in 1 .. j:  // is a double loop.
            sum += 1
    for k in 1 .. n:      // Second for loop.
        sum += 1


This code fragment has three separate statements: the first assignment
statement and the two `for` loops. Again the assignment statement takes
constant time; call it $c_1$.
The second `for` loop is just like the one in example with one `for` loop and takes $c_2 n \in O(n)$ time.

The first `for` loop is a double loop and requires a special technique.
We work from the inside of the loop outward. The expression `sum+=1`
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
:::


::: example
#### Example: Comparing nested loops

Compare the asymptotic analysis for the following two code fragments.

    sum1 = 0
    for i in 1 .. n:       // First double loop.
        for j in 1 .. n:   // Do n times.
            sum1 += 1

    sum2 = 0
    for i in 1 .. n:       // Second double loop.
        for j in 1 .. i:   // Do i times.
            sum2 += 1

In the first double loop, the inner `for` loop always executes $n$
times. Because the outer loop executes $n$ times, it should be obvious
that the statement `sum1+=1` is executed precisely $n^2$ times. The
second loop is similar to the one analysed in the previous example, with
cost $\sum_{j = 1}^{n} j$. This is approximately $n^2/2$.
Thus, both double loops cost $O(n^2)$, though the second requires
about half the time of the first.
:::


::: example
#### Example: Non-quadratic nested loops

Not all doubly nested `for` loops are strictly $O(n^2)$, the following is an example.

    sum = 0
    k = 1
    while k <= n:          // Do log(n) times.
        for j in 1 .. n:   // Do n times.
            sum += 1
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

::::::
