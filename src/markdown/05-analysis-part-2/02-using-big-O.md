
## How to use big-$O$ analysis {#analysis-2:using-big-O}

::: TODO
- Prio 1: is the title ok? perhaps better with "Reasoning with big-O"?
- Prio 1: this is now a section of its own - rewrite beginning to reflect that
- Prio 1: add an example discussing the partition algorithm, in #analysis-2:advanced-upper-bound
:::

Using the definition it is quite straightforward to prove the simplifying rules from @sec:analysis-1:simplification-rules.
We can also prove that as a mathematical relation, $f\in O(g)$ is *transitive*.

     Rule              Simplification
---  ----------------  -------------------------------------------------------------------
(1)  Transitivity      if $f\in O(g)$ and $g\in O(h)$, then $f\in O(h)$
(2)  Constant $k>0$    if $f\in O(g)$, then $k\cdot f\in O(g)$
(3)  Addition          if $f\in O(g)$ and $f'\in O(g')$, then $f+f'\in O(\max(g,g'))$
(4)  Multiplication    if $f\in O(g)$ and $f'\in O(g')$, then $f\cdot f'\in O(g\cdot g')$

<!--
(2) alternatively, $k \cdot O(g) = O(g)$)
(3) alternatively, $O(g) + O(g') = O(\max(g,g'))$)
(4) alternatively, $O(g) \cdot O(g') = O(g\cdot g')$)
 -->

`\noindent`{=latex}
Using these rules we can easily determine the asymptotic growth rate for many algorithms.

- Rule (2) says that any constant-time operation is $O(1)$.
- Rule (3) says that if you have a sequence of statements,
  you only need to consider the most expensive statement: $O(\max(f_1,\ldots,f_k))$.
- Rule (4) says that if you have a loop that repeats a statement $p$ a number of times $n$,
  the total cost is the cost of $p$ times the number of iterations: $O(n\cdot f)$.
- Rule (2) also says that if you repeat a statement $p$ a *constant* number of times,
  you can treat it as if you only execute $p$ once.


::: {.example #ex:non-quadratic-nested-loops}
#### Example: Non-quadratic nested loops

Not all loops are strictly linear in $n$. Here is an example:

    sum = 0
    k = 1
    while k <= n:          // Do O(log(n)) times
        for j in 1 .. n:   // Do O(n) times
            sum += 1       // O(1) operation
        k = k * 2          // O(1) operation

The inner loop is easy, it is a linear loop.
And since the inner loop body, `sum+=1`, is constant, we get linear complexity for the `for`-loop.
How many times does the outer `while`-loop run?
In each iteration the $k$ variable is doubled, so in essence,
the loop iterates over the values $k=1, 2, 4, 8, \ldots$, until it reaches $k>n$.
In other words, the outer loop will iterate approximately $\log_2(n)$ times.

Now we can use the simplification rules.
The inner `for` loop is linear, $O(n)$, and the statement after that is constant time.
Simplification rule (3) says that we only need to care about the most expensive of the two,
so we can say that the whole `while` loop body is linear, $O(n)$.
The outer `while` loop runs $O(\log(n))$ times,
so simplification rule (4) tells us that we can multiply the complexities.
Therefore the complexity of the `while`-loop is linear *times* logarithmic, or $O(n\log(n))$.
::::


### Recursive functions

Determining the execution time of a recursive function can be difficult.
This is typically best expressed by a [recurrence relation]{.term}.

For example, the recursive version of binary search calls itself
with an interval that is half the size of its input interval.
Apart from the recursive call, the function makes some constant time work.
We can model this as the following recurrence relation,
where $T(1)=1$ denotes the constant time work of the base case:

\begin{align*}
T(n) &= T(n/2) + 1, \text{ for } n>1 \\
T(1) &= 1
\end{align*}

Another example is Mergesort, which calls itself *twice* with an halved interval.
After the recursive calls it merges the results, which takes linear time.
This gives us the following recurrence relation:

\begin{align*}
T(n) &= 2\cdot T(n/2) + n, \text{ for } n>1 \\
T(1) &= 1
\end{align*}

Since we already know that Binary search is $O(\log(n))$ and Mergesort is $O(n\log(n))$,
the closed-form solutions for the recurrences above must also be in $O(\log(n))$ and $O(n\log(n))$.
In @sec:analysis-3:recurrences we will discuss recurrence relations further, and show how to solve them.


### Advanced algorithm analysis {#analysis-2:advanced-upper-bound}

The simplification rules from @sec:analysis-1:simplification-rules
do not always give the tightest possible complexity.
In some rare cases the simple analysis might give a complexity of say $O(n \log(n))$,
but a more detailed analysis will give a tighter bound, such as $O(n)$.
So, is there something wrong with the rules?

No, the rules are correct, and this is because the $O$ notation gives an *upper bound*.
Recall that every function $f\in O(n)$ is also in $O(n\log(n))$, since $O(n) < O(n\log(n))$.

:::: {.example #ex:linear-nested-loop}
#### Example: A nested loop with linear complexity

Recall the non-quadratic nested loop in [](#ex:non-quadratic-nested-loops).
If we just change the inner `for`-loop a little bit we get
the following nested loop, which has a nontrivial complexity:

    sum = 0
    k = 1
    while k <= n:          // Do log(n) times.
        for j in 1 .. k:   // Do k times. Note! The previous example looped to n.
            sum += 1
        k = k * 2

Since $k$ is multiplied by $2$ in each iteration, the outer `while`-loop runs $\log(n)$ times.
But the inner `for`-loop then runs $k$ times,
and since $k\in O(n)$ the simplification rules tell us that the code is in $O(n\log(n))$.

A more careful analysis reveals a tighter bound:
If we assume that $n=2^d$ is a power of two, then the outer loop is executed $d=\log_2(n)$ times.
The inner loop has cost $k$, which starts from $1$ and doubles after each outer loop iteration.
This can be expressed as the following summation, where $k = 2^i$:

$$ T(n) = 1 + 2 + 4 + \cdots + 2^d = \sum_{i=0}^{d} 2^i $$

Now, this is a well-known summation with the following solution:

$$ T(n) = 2^{k+1} - 1 = 2^{\log_2(n)+1} - 1 = 2n - 1 $$

So, the code fragment above is actually linear, $O(n)$, and not linearithmic.

Note that this is an exception where the simple analysis rules do not give a tight enough bound.
But in almost all cases the rules work fine, and when they don't it's usually only by a logarithmic factor.
(And as we already know, logarithmic factors are not that big a deal when it comes to computational complexity.)
::::
