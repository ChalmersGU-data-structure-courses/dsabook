
## Best, worst, and average cases

::: TODO
- Prio 3: examples (e.g., quicksort, insertion sort)
:::

For some algorithms, the running time is always determined by the input size $n$.
Consider the algorithm that finds the largest value in an array using sequential search algorithm.
For any given size $n$ there are inifinitely many possible inputs -- all imaginable arrays of size $n$.
However, no matter what array of size $n$ that the algorithm looks at, its running time will always be the same.
This is because it always looks at every element in the array exactly once.

::: dsvis
Consider the problem of finding the factorial of $n$.

<inlineav id="AnalCasesSameCON" src="AlgAnal/AnalCasesSameCON.js" name="Simple analysis cases slideshow" links="AlgAnal/AnalCasesCON.css"/>
:::

For most algorithms however, different inputs of a given size require different amounts of time.
For example, consider the problem of searching an array containing $n$ integers to find the one with a particular value $K$.
The sequential search algorithm begins at the first position in the array and looks at each value in turn until $K$ is found, and then it stops.
So there is a wide range of possible running times for the algorithm, which is different from the largest-value search algorithm above.

- If $K$ is the first element, only one value is examined -- this is the *best case*, because it is not possible for sequential search to look at less than one value.
- If $K$ is the last element, the algorithm must examine $n$ values -- this is the *worst case*, because sequential search never looks at more than each of the $n$ values in the array.

If we run sequential search many times on many different arrays of size $n$, and many different values of $K$, we expect the algorithm on average to go halfway through the array before finding the value we seek.
So, on average, the algorithm examines $(n+1)/2$ values -- this is the *average case*.

However, note that the average case depends on an important assumption: that the searched value $K$ is independent from how the values in the array is distributed! More about that below.

::: dsvis
Here is an example.

<inlineav id="AnalCasesDiffCON" src="AlgAnal/AnalCasesDiffCON.js" name="Best, Worst, and Average cases slideshow" links="AlgAnal/AnalCasesCON.css"/>
:::

When analyzing an algorithm, should we study the best, worst, or average
case? Normally we are not interested in the best case, because this
might happen only rarely and generally is too optimistic for a fair
characterization of the algorithm's running time. In other words,
analysis based on the best case is not likely to be representative of
the behavior of the algorithm. However, there are rare instances where a
best-case analysis is useful -- in particular, when the best case has
high probability of occurring.
For example, if we know that the array we want to sort is *almost sorted*,
we can take advantage of the best-case running time of insertion sort.

How about the worst case? The advantage to analyzing the worst case is
that you know for certain that the algorithm must perform at least that
well. This is especially important for real-time applications, such as
for the computers that monitor an air traffic control system. Here, it
would not be acceptable to use an algorithm that can handle $n$
airplanes quickly enough *most of the time*, but which fails to perform
quickly enough when all $n$ airplanes are coming from the same
direction.

For other applications -- in particular when we wish to aggregate the
cost of running the program many times on many different inputs --
worst-case analysis might not be a representative measure of the
algorithm's performance. Often we prefer to know the average-case
running time. This means that we would like to know the *typical*
behavior of the algorithm on inputs of size $n$.

### The problem with average case

Unfortunately,
average-case analysis is not always possible. Average-case analysis
first requires that we understand how the actual inputs to the program
(and their costs) are distributed with respect to the set of all
possible inputs to the program. For example, it was stated previously
that the sequential search algorithm on average examines half of the
array values. This is only true if the element with value $K$ is equally
likely to appear in any position in the array. If this assumption is not
correct, then the algorithm does *not* necessarily examine half of the
array values in the average case.

How the data is distributed has a significant effect on
almost all data structures and algorithms, such as those based on
[hashing]{.term} and [binary search tree]{.term}s.
Incorrect assumptions about data distribution can have
disastrous consequences on a program's space or time performance.
Unusual data distributions can also be used to advantage, such as is
done by [self-organizing list]{.term}s and [splay tree]{.term}s.

Relying on average-case analysis can be very dangerous for all applications where you don't have full control over your data.
For example, all kinds of databases that are publicly available are a risk.
Even if "bad" data are extremely unlikely to occur in your use cases, you can be certain that there are people out there who gladly will try to exploit any kind of weakness in your system.
If there is just a tiny risk of a worst-case scenario, this opens up for [denial-of-service]{.term} attacks on your system.

In summary, for real-time applications and for applications that are openly available, we should always prefer a worst-case analysis of an algorithm.
In other cases we usually desire an average-case analysis, but then we need to know enough about how the input is distributed.
However, this is often difficult to calculate, so in most cases we must anyway resort to worst-case analysis.
