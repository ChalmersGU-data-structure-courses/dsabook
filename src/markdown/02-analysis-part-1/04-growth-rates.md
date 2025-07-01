
## Growth rates

::: TODO
- Prio 2: is this a good way of introducing the concept of growth rates?
    - does this section match well with the previous and the next?
    - remove 1st subheading?
    - rename 2nd subheading - ugly to have "growth rates" twice
:::

<!--
### Faster computer, or faster algorithm?
-->

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
describes the running time on input size $n$ is $T(n) = cn$ for
some constant $c$), then 100,000 records on the new machine will be
sorted in the same time as 10,000 records on the old machine. If the
algorithm's growth rate is greater than $cn$, such as $c_1n^2$, then
you will *not* be able to do a problem ten times the size in the same
amount of time on a machine that is ten times faster.

### Getting a faster computer

How much larger problems a faster computer solve in the same amount of time?
Say that the old machine could solve a problem of size $n$ in an hour,
and that the new machine is ten times faster than the old.
What is the largest problem that the new machine can solve in one hour?
@Tbl:problem-size-speedup shows just that for five running-time functions.


  Growth rate    Max $n$ (old)   Max $n'$ (new)   Relation $n$ and $n'$                        $n'/n$
--------------- --------------- ----------------  ---------------------------------------- ---------------
     $10 n$        $1,000$         $10,000$       $n' = n\cdot 10$                               $10$
     $20 n$          $500$          $5,000$       $n' = n\cdot 10$                               $10$
 $5 n \log n$        $250$          $1,842$       $n' \approx \frac{0.1386n}{W(0.1386n)}$       $7.4$
    $2 n^2$           $70$            $223$       $n' = n\cdot\sqrt{10}$                        $3.2$
      $2^n$           $13$             $16$       $n' = n + 3$                               $\approx 1$

: The increase in problem size that can be run in the same time on a computer that is ten times faster {#tbl:problem-size-speedup}

Explanations:

- The first column lists the right-hand sides for five growth rate equations.
- The second column shows the maximum value for $n$ that can be run in 10,000 basic operations on the old machine.
- The third column shows the value for $n'$, the new maximum size for the problem that can be run in the same time on the new machine that is ten times faster.
  Variable $n'$ is the greatest size for the problem that can run in 100,000 basic operations.
- The fourth column shows how the size of $n$ changed to become $n'$ on the new machine.
- The fifth column shows the increase in the problem size as the ratio of $n'$ to $n$.

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

An algorithm with time equation $T(n) = 2n^2$ does not receive
nearly as great an improvement from the faster machine as an algorithm
with linear growth rate. Instead of an improvement by a factor of ten,
the improvement is only the square root of that:
$\sqrt{10} \approx 3.16$. Thus, the algorithm with higher growth rate
not only solves a smaller problem in a given time in the first place, it
*also* receives less of a speedup from a faster computer. As computers
get ever faster, the disparity in problem sizes becomes ever greater.

The algorithm with growth rate $T(n) = 5 n \log n$ improves by
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
running time $T(n)=n^2$ requires $1000 \times 1000 = 1,000,000$
time steps for an input of size $n=1000$. An algorithm with running time
$T(n) = n \log n$ requires $1000 \times 10 = 10,000$ time steps
for an input of size $n = 1000$, which is an improvement of much more
than a factor of ten when compared to the algorithm with running time
$T(n) = n^2$. Because $n^2 > 10 n \log n$ whenever $n > 58$, if
the typical problem size is larger than 58 for this example, then you
would be much better off changing algorithms instead of buying a
computer ten times faster. Furthermore, when you do buy a faster
computer, an algorithm with a slower growth rate provides a greater
benefit in terms of larger problem size that can run in a certain time
on the new computer.


### Comparing different growth rates

The [growth rate]{.term} for an algorithm is the
rate at which the cost of the algorithm grows as the size of its input
grows. @Fig:growthGraphs shows a graph for six equations, each meant
to describe the running time for a particular program or algorithm. A
variety of growth rates that are representative of typical algorithms
are shown.

<div id="fig:growthGraphs">

```{.matplotlib dpi=200}
import math
import numpy as np
import matplotlib.pyplot as plt
fig, (plt1, plt2) = plt.subplots(1, 2, figsize=(14,5))
xs = np.linspace(0, 50, 500)
ys_10n = 10*xs
ys_20n = 20*xs
ys_5nlogn = 5*xs*np.log2(xs)
ys_2n2 = 2*(xs**2)
ys_2expn = 2**xs
ys_fact = np.vectorize(math.gamma)(xs+1)
plt1.set_xlim(0, 50); plt1.set_ylim(0, 1400)
plt1.plot(xs, ys_10n, '--');   plt1.text(45, ys_10n[-1], '10n')
plt1.plot(xs, ys_20n, '--');   plt1.text(45, ys_20n[-1], '20n')
plt1.plot(xs, ys_5nlogn, '-'); plt1.text(xs[375], 1300, '5n log2(n)')
plt1.plot(xs, ys_2n2, '-');    plt1.text(xs[200], 1300, '2 n^2')
plt1.plot(xs, ys_2expn, '-');  plt1.text(xs[110], 1300, '2^n')
plt1.plot(xs, ys_fact, '-');   plt1.text(xs[40], 1300, 'n!')
plt1.plot([11,11,0], [0,308,308], ':', color='gray')
plt1.set_title('Growth rates for 6 equations')
plt2.set_xlim(0, 11); plt2.set_ylim(0, 308);
plt2.plot(xs, ys_10n, '--');   plt2.text(10, ys_10n[110]-30, '10n')
plt2.plot(xs, ys_20n, '--');   plt2.text(10, ys_20n[110]-30, '20n')
plt2.plot(xs, ys_5nlogn, '-'); plt2.text(10, ys_5nlogn[110]-50, '5n log2(n)')
plt2.plot(xs, ys_2n2, '-');    plt2.text(10, ys_2n2[110], '2 n^2')
plt2.plot(xs, ys_2expn, '-');  plt2.text(7.3, 290, '2^n')
plt2.plot(xs, ys_fact, '-');   plt2.text(4.9, 290, 'n!')
plt2.set_title('Zoomed in')
```

Illustration of the growth rates for six equations.
The right view shows in detail the lower-left portion of the top view.
The horizontal axis represents input size.
The vertical axis can represent time, space, or any other measure of cost.
</div>

<!--
<inlineav id="GrowthRatesCON" src="AlgAnal/GrowthRatesCON.js" script="DataStructures/Plot.js" name="DataStructures/Plot.js AlgAnal/GrowthRatesCON" links="AlgAnal/GrowthRatesCON.css" height="450px" static/>

<inlineav id="GrowthRatesZoomCON" src="AlgAnal/GrowthRatesZoomCON.js" script="DataStructures/Plot.js" name="DataStructures/Plot.js AlgAnal/GrowthRatesZoomCON" links="AlgAnal/GrowthRatesZoomCON.css" height="420px" static/>
-->


The two equations labeled $10n$ and $20n$ are graphed by straight lines.
A growth rate of $cn$ (for $c$ any positive constant) is often referred
to as a [linear growth rate]{.term} or running
time. This means that as the value of $n$ grows, the running time of the
algorithm grows in the same proportion. Doubling the value of $n$
roughly doubles the running time. An algorithm whose running-time
equation has a highest-order term containing a factor of $n^2$ is said
to have a [quadratic growth rate]{.term}. In the
figure, the line labeled $2n^2$ represents a quadratic growth rate. The
line labeled $2^n$ represents an
[exponential growth rate]{.term}. This name
comes from the fact that $n$ appears in the exponent. The line labeled
$n!$ also grows exponentially.

As you can see from the figure, the difference between an algorithm
whose running time has cost $T(n) = 10n$ and another with cost
$T(n) = 2n^2$ becomes tremendous as $n$ grows. For $n > 5$, the
algorithm with running time $T(n) = 2n^2$ is already much
slower. This is despite the fact that $10n$ has a greater constant
factor than $2n^2$. Comparing the two curves marked $20n$ and $2n^2$
shows that changing the constant factor for one of the equations only
shifts the point at which the two curves cross. For $n>10$, the
algorithm with cost $T(n) = 2n^2$ is slower than the algorithm
with cost $T(n) = 20n$. This graph also shows that the equation
$T(n) = 5 n \log n$ grows somewhat more quickly than both
$T(n) = 10 n$ and $T(n) = 20 n$, but not nearly so
quickly as the equation $T(n) = 2n^2$. For constants
$a, b > 1, n^a$ grows faster than either $\log^b n$ or $\log n^b$.
Finally, algorithms with cost $T(n) = 2^n$ or
$T(n) = n!$ are prohibitively expensive for even modest values
of $n$. Note that for constants $a, b \geq 1, a^n$ grows faster than
$n^b$.

We can get some further insight into relative growth rates for various
algorithms from @tbl:growth-rates below. Most of the growth rates that
appear in typical algorithms are shown, along with some representative
input sizes. Once again, we see that the growth rate has a tremendous
effect on the resources consumed by an algorithm.


        n         $\log\log n$   $\log n$     $n$         $n\log n$       $n^2$      $n^3$     $2^n$
---------------- -------------- ---------- ---------- -----------------  ---------  ---------- --------------------
     $10$            $1.7$       $3.3$       $10$            $33$        $100$      $10^3$     $10^3$
    $100$            $2.7$       $6.6$      $100$           $664$        $10^4$     $10^6$     $10^{30}$
  $1K = 1000$        $3.3$        $10$     $1000$          $10^4$        $10^6$     $10^9$     $10^{300}$
 $10K = 10^4$        $3.7$      $13.3$     $10^4$     $1.3\cdot 10^5$    $10^8$     $10^{12}$  $10^{3000}$
$100K = 10^5$        $4.1$      $16.6$     $10^5$     $1.6\cdot 10^6$    $10^{10}$  $10^{15}$  $10^{30,000}$
  $1M = 10^6$        $4.3$        $20$     $10^6$     $2\cdot 10^7$      $10^{12}$  $10^{18}$  $10^{300,000}$
  $1G = 10^9$        $4.9$        $30$     $10^9$     $3\cdot 10^{10}$   $10^{18}$  $10^{27}$  $10^{300,000,000}$

: Costs for representative growth rates {#tbl:growth-rates}


::: dsvis
### Growth rates exercises

<avembed id="CompareGrowth" src="AlgAnal/CompareGrowth.html" type="ka" name="Comparing Growth Rates Exercise"/>

<avembed id="GrowthRatesPRO" src="AlgAnal/GrowthRatesPRO.html" type="ka" name="Growth Rates Ordering Exercise"/>
:::

<!-- TODO
To make students more engaged in the GrowthRates exercise, we may need a
tool that allows students to input two growth rate functions. Then the
tool should plot the graph of both functions and mark their crossing
point. The student also should be allowed to play with the constant
values for both functions and see that this only changes the crossing
point but doesn't change which function grows faster than the other.
-->
