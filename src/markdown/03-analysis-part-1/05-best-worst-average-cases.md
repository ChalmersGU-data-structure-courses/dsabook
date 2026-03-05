
## Best, worst, and average cases

::: TODO
- Prio 3: examples (e.g., Quicksort, Insertion sort)
:::

We can talk about the *best-case*, or the *worst-case*, or even the *average-case* complexity of an algorithm. But in practice we almost always only use the worst-case complexity: the best case is pretty useless (we should always prepare for the worst), and the average case is difficult to reason about.

- The best case is quite useless -- we should always prepare for the worst.
- The average case is difficult to reason about -- for example we need to know what distribution the input has, and this is difficult.
- The worst case is what we usually analyse -- it is much easier to calculate than the average case, and it gives valuable information about what might happen if we are unlucky.

The worst case is particularly important if you cannot guarantee that the data is not contaminated -- for example by a malicious hacker.

The average case can be very useful if we know more about the data. For example, if we know that our input is *almost* sorted, then Insertion sort suddenly becomes a really really efficient algorithm.




For some algorithms, the running time is always determined by the input size $n$.
Consider for example Selection sort (@sec:selection-sort):
the total number of times the body of the inner loop will be executed is $n+\cdots+2+1=n(n+1)/2$.
So the running time only depends on the size $n$, regardless of how the array looks like.

::: dsvis
Consider the problem of finding the factorial of $n$.

``` {.jsav-animation src="AlgAnal/AnalCasesSameCON.js" links="AlgAnal/AnalCasesCON.css" name="Simple analysis cases slideshow"}
```
:::

For most algorithms however, different inputs of a given size require different amounts of time.
For example, consider Insertion sort (@sec:insertion-sort):
the outer `for`-loop always iterates the same number of times,
but the inner `while`-loop only runs until it finds the correct place for the element to insert.
So there is a wide range of possible running times for the algorithm, which is different from Selection sort.

- If the array is already sorted, then each element is in its correct place and the `while`-loop will not iterate at all.
  This is the *best case*, because it is not possible for a while loop to run faster than that.
- If the array is reversely sorted, then each element has to move as far as possible, to the very first position in the array.
  This is the *worst case*, because the `while`-loop runs for as many iterations as it possibly can.

If we run Insertion sort many times on many different arrays of size $n$,
we could expect the `while`-loop on average to go halfway through the array before finding the correct insertion index.
So, in the *average case* Insertion sort runs for half as many iterations as the worst case.
However, this definition of the average case depends on an important assumption:
that every possible array is equally probable, or in other words, that the possible arrays are uniformly distributed!
More about that below.

::: dsvis
Here is an example where we reason about the Sequential search algorithm from @sec:sequential-search.

``` {.jsav-animation src="AlgAnal/AnalCasesDiffCON.js" links="AlgAnal/AnalCasesCON.css" name="Best, Worst, and Average cases slideshow"}
```
:::

When analysing an algorithm, should we study the best, worst, or average
case? Normally we are not interested in the best case, because this
might happen only rarely and generally is too optimistic for a fair
characterisation of the algorithm's running time. In other words,
analysis based on the best case is not likely to be representative of
the behaviour of the algorithm. However, there are rare instances where a
best-case analysis is useful -- in particular, when the best case has
high probability of occurring.
For example, if we know that the array we want to sort is *almost sorted*,
we can take advantage of the best-case running time of Insertion sort.

How about the worst case? The advantage to analysing the worst case is
that you know for certain that the algorithm must perform at least that
well. This is especially important for real-time applications, such as
for the computers that monitor an air traffic control system,
and for programs that accept data from untrusted sources,
such as an online database system.

For other applications -- in particular when we wish to aggregate the
cost of running the program many times on many different inputs --
worst-case analysis might not be a representative measure of the
algorithm's performance. Often we prefer to know the average-case
running time. This means that we would like to know the *typical*
behaviour of the algorithm on inputs of size $n$.

### The problem with average case

Unfortunately,
average-case analysis is not always possible. Average-case analysis
first requires that we understand how the actual inputs to the program
(and their costs) are distributed with respect to the set of all
possible inputs to the program. For example, it was stated previously
that Insertion sort on average runs for half the number of iterations as the worst case.
This is only true if every possible array is equally likely as input.
This assumption is usually *not* correct for most applications where we need to sort values.
For example, if the input to the array consist of book authors,
then the vast majority of arrays will never ever appear.

How the data is distributed has a significant effect on
almost all data structures and algorithms, such as those based on
[hashing]{.term} and [binary search trees]{.term}.
Incorrect assumptions about data distribution can have
disastrous consequences on a program's space or time performance.
Unusual data distributions can also be used to advantage, such as is
done by [self-organising lists]{.term} and [splay trees]{.term}.

Relying on average-case analysis can be very dangerous for all applications where you don't have full control over your data.
For example, all kinds of databases that are publicly available are a risk.
Even if "bad" data are extremely unlikely to occur in your use cases, you can be certain that there are people out there who gladly will try to exploit any kind of weakness in your system.
If there is just a tiny risk of a worst-case scenario, this opens up for *denial-of-service attacks* on your system.

In summary, for real-time applications and for applications that are openly available, we should always prefer a worst-case analysis of an algorithm.
In other cases we usually desire an average-case analysis, but then we need to know enough about how the input is distributed.
However, this is often difficult to calculate, so in most cases we must anyway resort to worst-case analysis.
