
## Order of growth

::: TODO
- Prio 2: is this a good way of introducing the concept of growth rates?
    - does this section match well with the previous and the next?
    - remove 1st subheading?
    - rename 2nd subheading - ugly to have "growth rates" twice
:::

Imagine that you are a bookworm and you have 10,000 books divided into 100 bookshelfs.
Now you want to sort all your books so that you can search for them quickly (using binary search of course).
You use one of the sorting algorithms from [Chapter @sec:sorting-part-1]
and notice it takes one hours to sort the books in one shelf.

- How long time will it take to sort all your books?
- If you buy a sorting robot that is 100 times faster than you are,
  will you then be able to sort all your books in one hour?

The sorting algorithms from [Chapter @sec:sorting-part-1]
all have a running time proportional to $n^2$ where $n$ is the number of books.
This means that if you double the size of the input, the running time will quadruple.
And if you multiply the input size by 100, the running time will be $100^2 = 10,000$ times slower.
So, it will take 10,000 hours for you to sort all your books.
And your very expensive sorting robot will still take 100 hours.

So maybe it is not worth the money to buy a faster robot,
but instead to try to find a sorting algorithm that has better algorithmic complexity.


### Getting a faster computer

How much larger problems can a faster computer solve in the same amount of time?
Or, equivalently, how much larger problems can we solve if we spend more time?
@Tbl:problem-size-speedup shows just that some common running-time functions.


    Growth rate             1 ms        10 ms         100 ms              1 s
-----------------------  ---------  ------------  --------------  ---------------
 $2\cdot\log_2(n)$         $32$      $10^{15}$      $10^{150}$       $10^{1500}$
 $n/2$                     $20$          $200$         $2,000$          $20,000$
 $n$                       $10$          $100$         $1,000$          $10,000$
 $n\cdot\log_2(n)/4$       $11$           $66$           $453$           $3,408$
 $n^2/10$                  $10$           $31$           $100$             $316$
 $2^n/20$                   $7$           $11$            $14$              $17$

: Maximum problem sizes that can be handled in 1, 10, 100 and 1,000 milliseconds
  {#tbl:problem-size-speedup}

This table illustrates many important points.
The two equations $n$ and $n/2$ are both *linear*; only the value of the constant factor has changed.
In both cases, if we spend ten times more work we can solve a ten times larger problem.
In other words, while the value of the constant does affect the absolute size of the problem
that can be solved in a fixed amount of time,
it does not affect the *improvement* in problem size (as a proportion to the original size).
This relationship holds true regardless of the algorithm's growth rate:
Constant factors never affect the relative improvement gained by working longer or faster.

The first equation denotes a *logarithmic* growth rate, $T(n) = 2\cdot\log_2(n)$.
It could for example be the time to find a book in your sorted bookshelf using binary search (@sec:binary-search).
In this case we search 32 books in one millisecond.
But in 10 ms we can search in $10^{15}$ books,
and in 100 ms we can search a library with more books than there are atoms in the universe.

The *quadratic* algorithm, $T(n) = n^2/10$, does not receive nearly as great an improvement
from the longer working time as a linear algorithm.
Instead of an improvement by a factor of hundred (if we let it run for 100 times longer),
the improvement is only the square root of that: $\sqrt{100}=10$.

The algorithm in between linear and quadratic, $T(n) = n\log(n)/4$,
improves almost like the linear one, but not quite.
Its growth rate is sometimes called *linearithmic* or *log-linear*,
and it is a common growth rate for many algorithms
(for example the Mergesort algorithm in @sec:mergesort).

Note that something special happens in the case of the *exponential* algorithm, $T(n) = 2^n/20$.
It can only be used to solve very small problems,
and if you spend 10 times longer it can still only solve a problem of size $n+3$
(to be precise, it is $n + \log_2(10)$).
The increase in problem size for an exponential algorithm is by a constant addition, not by a multiplicative factor.
If you spend 1 second instead of 1 millisecond you can still only solve a problem of size 17,
and it would take you 15 hours to solve a problem of size 30.
A problem of size 50 will take more than 1,700 years!
Thus, exponential growth is radically different than the other growth rates shown in the table.

In summary, buying a faster computer will only work for some algorithms
-- if they are logarithmic, linear or linearithmic then a faster computer might have a real impact.
But if your algorithm is quadratic or worse then it is often better to change to
an algorithm with better growth rate, than to buy a new computer.
(Provided *there is* a better algorithm, of course!)


### Plotting and tabulating growth rates

Another way of comparing different growth rates is to draw a graph.
@Fig:growthGraphs plots the six growth rate equations from above.

::: {#fig:growthGraphs}
```{.matplotlib dpi=300}
import math
import numpy as np
import matplotlib.pyplot as plt
fig, (plt1, plt2) = plt.subplots(1, 2, figsize=(14,5))
xs = np.linspace(0, 50, 500)
ys_2logn = 2*np.log2(xs)
ys_n_2 = xs/2
ys_1n = xs
ys_nlogn_4 = xs*np.log2(xs)/4
ys_n2_10 = (xs**2)/10
ys_expn_20 = 2**xs/20
plt1.set_xlim(0, 50); plt1.set_ylim(0, 70)
plt1.plot(xs, ys_n_2, '--');   plt1.text(46, ys_n_2[-1]+2, 'n/2')
plt1.plot(xs, ys_1n, '--');   plt1.text(47, ys_1n[-1], 'n')
plt1.plot(xs, ys_2logn, '-');   plt1.text(43, ys_2logn[-1]+2, '2·log₂(n)')
plt1.plot(xs, ys_nlogn_4, '-'); plt1.text(38, 65, 'n·log₂(n)/4')
plt1.plot(xs, ys_n2_10, '-');    plt1.text(21, 65, 'n²/10')
plt1.plot(xs, ys_expn_20, '-');  plt1.text(12, 65, '2ⁿ/20')
plt1.plot([2,2,13,13], [0,16,16,0], ':', color='gray')
plt1.set_title('Growth rates for 5 equations')
plt2.set_xlim(2, 13); plt2.set_ylim(0, 16);
plt2.plot(xs, ys_n_2, '--');   plt2.text(12.2, ys_n_2[100]+0.4, 'n/2')
plt2.plot(xs, ys_1n, '--');   plt2.text(12.4, ys_1n[130], 'n')
plt2.plot(xs, ys_2logn, '-');   plt2.text(11.5, ys_2logn[130]+0.2, '2·log₂(n)')
plt2.plot(xs, ys_nlogn_4, '-'); plt2.text(11.3, ys_nlogn_4[109], 'n·log₂(n)/4')
plt2.plot(xs, ys_n2_10, '-');    plt2.text(11.2, 15, 'n²/10')
plt2.plot(xs, ys_expn_20, '-');  plt2.text(7.2, 15, '2ⁿ/20')
plt2.set_title('Zoomed in')
```

Illustration of growth rates for different algorithms.
The right view shows in detail the lower-left portion of the top view.
The horizontal axis represents input size.
The vertical axis can represent time, space, or any other measure of cost.
:::

As you can see from the figure, the difference between a linear algorithm
with cost $T(n) = n$ and a quadratic algorithm with cost $T(n) = n^2/10$
becomes tremendous as $n$ grows.
From $n > 10$ the quadratic algorithm becomes slower than the linear,
and this difference increases as $n$ grows.
This is despite the fact that $n^2/10$ has a smaller constant factor than $n$.

The graph also shows that the equation $T(n) = n\log_2(n)/4$
grows somewhat more quickly than the linear equations,
but not nearly so quickly as the quadratic equation.
In fact, $n^a$ always grows faster than bot $\log(n)^b$ and $\log(n^b)$,
for all constants $a,b>1$.

We also see that exponential algorithms are prohibitively expensive for even modest values of $n$.
Note that $a^n$ grows faster than $n^b$ for all constants $a,b>1$.

Finally, @tbl:growth-rates shows the difference between the growth rates when $n$ becomes larger and larger.
Once again, we see that the growth rate has a tremendous effect on the resources consumed by an algorithm.

    Growth rate              $n=10$             $100$              $1,000$                $10^4$              $10^5$
-----------------------  ------------  --------------------  -------------------  -------------------  -------------------
 $2\cdot\log_2(n)$            $7$                $13$                 $20$                    $27$               $33$
 $n/2$                        $5$                $50$                $500$                 $5,000$           $50,000$
 $n$                         $10$               $100$              $1,000$                $10,000$          $100,000$
 $n\cdot\log_2(n)/4$          $8$               $166$              $2,491$                $33,219$          $415,241$
 $n^2/10$                    $10$             $1,000$            $100,000$            $10,000,000$             $10^9$
 $2^n/20$                    $51$        $6\cdot 10^{28}$     $5\cdot 10^{300}$           $\cdots$           $\cdots$

: Costs for representative growth rates {#tbl:growth-rates}


::: dsvis
### Growth rates exercises

```{.jsav-embedded src="AlgAnal/CompareGrowth.html" type="ka" name="Comparing Growth Rates Exercise"}
```

```{.jsav-embedded src="AlgAnal/GrowthRatesPRO.html" type="ka" name="Growth Rates Ordering Exercise"}
```
:::

<!-- TODO
To make students more engaged in the GrowthRates exercise, we may need a
tool that allows students to input two growth rate functions. Then the
tool should plot the graph of both functions and mark their crossing
point. The student also should be allowed to play with the constant
values for both functions and see that this only changes the crossing
point but doesn't change which function grows faster than the other.
-->
