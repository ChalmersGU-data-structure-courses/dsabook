
## Faster Computer, or Faster Algorithm?

Imagine that you have a problem to solve, and you know of an algorithm
whose running time is proportional to $n^2$ where $n$ is a measure of
the input size. Unfortunately, the resulting program takes ten times too
long to run. If you replace your current computer with a new one that is
ten times faster, will the $n^2$ algorithm become acceptable? If the
problem size remains the same, then perhaps the faster computer will
allow you to get your work done quickly enough even with an algorithm
having a high growth rate. But a funny thing happens to most people who
get a faster computer. They don't run the same problem faster. They run
a bigger problem! Say that on your old computer you were content to sort
10,000 records because that could be done by the computer during your
lunch break. On your new computer you might hope to sort 100,000 records
in the same time. You won't be back from lunch any sooner, so you are
better off solving a larger problem. And because the new machine is ten
times faster, you would like to sort ten times as many records.

If your algorithm's growth rate is linear (i.e., if the equation that
describes the running time on input size $n$ is $\mathbf{T}(n) = cn$ for
some constant $c$), then 100,000 records on the new machine will be
sorted in the same time as 10,000 records on the old machine. If the
algorithm's growth rate is greater than $cn$, such as $c_1n^2$, then
you will *not* be able to do a problem ten times the size in the same
amount of time on a machine that is ten times faster.

How much larger a problem can be solved in a given amount of time by a
faster computer? Assume that the new machine is ten times faster than
the old. Say that the old machine could solve a problem of size $n$ in
an hour. What is the largest problem that the new machine can solve in
one hour? The following table shows how large a problem can be solved on
the two machines for five running-time functions.

:::: {#Speedups}
::: topic
#### Table {-}

The increase in problem size that can be run in a fixed period of time
on a computer that is ten times faster. The first column lists the
right-hand sides for five growth rate equations. For the purpose of this
example, arbitrarily assume that the old machine can run 10,000 basic
operations in one hour. The second column shows the maximum value for
$n$ that can be run in 10,000 basic operations on the old machine. The
third column shows the value for $n'$, the new maximum size for the
problem that can be run in the same time on the new machine that is ten
times faster. Variable $n'$ is the greatest size for the problem that
can run in 100,000 basic operations. The fourth column shows how the
size of $n$ changed to become $n'$ on the new machine. The fifth column
shows the increase in the problem size as the ratio of $n'$ to $n$.

| f(n)     | n  | n'   | Change | n'/n |
|:------------:|:------:|:--------:|:------------------------:|:-----:|
| $10 n$       | $1000$ | $10,000$ | $n' = 10n$               | $10$  |
| $20 n$       | $500$  | $5000$   | $n' = 10n$               | $10$  |
| $5 n \log n$ | $250$  | $1842$   | $\sqrt{10} n < n' < 10n$ | $7.4$ |
| $2 n^2$      | $70$   | $223$    | $n' = \sqrt{10} n$       | $3.2$ |
| $2^n$        | $13$   | $16$     | $n' = n + 3$             |  --   |

:::
::::

This table illustrates many important points. The first two equations
are both linear; only the value of the constant factor has changed. In
both cases, the machine that is ten times faster gives an increase in
problem size by a factor of ten. In other words, while the value of the
constant does affect the absolute size of the problem that can be solved
in a fixed amount of time, it does not affect the *improvement* in
problem size (as a proportion to the original size) gained by a faster
computer. This relationship holds true regardless of the algorithm's
growth rate: Constant factors never affect the relative improvement
gained by a faster computer.

An algorithm with time equation $\mathbf{T}(n) = 2n^2$ does not receive
nearly as great an improvement from the faster machine as an algorithm
with linear growth rate. Instead of an improvement by a factor of ten,
the improvement is only the square root of that:
$\sqrt{10} \approx 3.16$. Thus, the algorithm with higher growth rate
not only solves a smaller problem in a given time in the first place, it
*also* receives less of a speedup from a faster computer. As computers
get ever faster, the disparity in problem sizes becomes ever greater.

The algorithm with growth rate $\mathbf{T}(n) = 5 n \log n$ improves by
a greater amount than the one with quadratic growth rate, but not by as
great an amount as the algorithms with linear growth rates.

Note that something special happens in the case of the algorithm whose
running time grows exponentially. If you look at its plot on a graph,
the curve for the algorithm whose time is proportional to $2^n$ goes up
very quickly as $n$ grows. The increase in problem size on the machine
ten times as fast is about $n + 3$ (to be precise, it is
$n + \log_2 10$). The increase in problem size for an algorithm with
exponential growth rate is by a constant addition, not by a
multiplicative factor. Because the old value of $n$ was 13, the new
problem size is 16. If next year you buy another computer ten times
faster yet, then the new computer (100 times faster than the original
computer) will only run a problem of size 19. If you had a second
program whose growth rate is $2^n$ and for which the original computer
could run a problem of size 1000 in an hour, than a machine ten times
faster can run a problem only of size 1003 in an hour! Thus, an
exponential growth rate is radically different than the other growth
rates shown in the table. The significance of this difference is an
important topic in
[computational complexity theory]{.term}.

Instead of buying a faster computer, consider what happens if you
replace an algorithm whose running time is proportional to $n^2$ with a
new algorithm whose running time is proportional to $n \log n$. In a
graph relating growth rate functions to input size, a fixed amount of
time would appear as a horizontal line. If the line for the amount of
time available to solve your problem is above the point at which the
curves for the two growth rates in question meet, then the algorithm
whose running time grows less quickly is faster. An algorithm with
running time $\mathbf{T}n=n^2$ requires $1024 \times 1024 = 1,048,576$
time steps for an input of size $n=1024$. An algorithm with running time
$\mathbf{T}(n) = n \log n$ requires $1024 \times 10 = 10,240$ time steps
for an input of size $n = 1024$, which is an improvement of much more
than a factor of ten when compared to the algorithm with running time
$\mathbf{T}(n) = n^2$. Because $n^2 > 10 n \log n$ whenever $n > 58$, if
the typical problem size is larger than 58 for this example, then you
would be much better off changing algorithms instead of buying a
computer ten times faster. Furthermore, when you do buy a faster
computer, an algorithm with a slower growth rate provides a greater
benefit in terms of larger problem size that can run in a certain time
on the new computer.

<avembed id="FasterCorASumm" src="AlgAnal/FasterCorASumm.html" type="ka" name="Faster Computer or Faster Algorithm Exercise"/>
