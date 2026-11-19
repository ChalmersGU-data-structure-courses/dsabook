
## Best-, worst-, and average-case complexity {#analysis-1:complexity-cases}

::: TODO
- Prio 2: shorten the text in general
:::

For some algorithms, the running time is always determined by the input size $n$,
for others the exact content of an array or a variable may change the running time drastically.
A simple example is Linear search. We know that in the worst case it does $n$ comparisons for
an array of size n, but if we are searching for the particular value at the very start of the array,
it only requires a single comparison.

So far, we have only studied the worst-case complexity of algorithms.
When we say that Linear search is $O(n)$, we only consider the slowest possible
input of size $n$. We can also analyse the *best-case*, and *average-case* complexity of an algorithm.

- Worst case is the default, if nothing else is specified.
- Best case has very limited value, but if two algorithms have the same worst case complexity,
  a better best-case for either algorithm is worth noting.
- The average case can be difficult to determine -- since it requires assumptions on the distribution of input values.

For many algorithms, the worst- and best-case complexity are one and the same.
Consider for example Selection sort (@sec:sorting-1:selection-sort):
the total number of times the body of the inner loop will be executed is $n+\cdots+2+1=n(n+1)/2$.
So the running time only depends on the size $n$, regardless of the content of the array.
The best case of Selection sort is $O(n^2)$, same as the worst case.

For Insertion sort (@sec:sorting-1:insertion-sort), the situation is different.
The outer `for`-loop always iterates the same number of times,
but the inner `while`-loop only runs until it finds the correct position of the inserted element.
This means that the execution time of insertion sort can differ widely.
The best case for Insertion sort is if the input is already sorted, in which
case the runtime is $O(n)$. This is an unusually interesting best case,
since it naturally occurs quite frequently in some applications.

If we run Insertion sort many times on many randomly generated arrays of size $n$,
we could expect the `while`-loop on average to go halfway through the array before
finding the correct insertion index.
So, in the *average case* Insertion sort runs for half as many iterations as the worst case, which is still $O(n^2)$.
However, this definition of the average case depends on an important assumption:
that every possible array is equally probable, or in other words, that the possible arrays are uniformly distributed.
This is very rarely the case.

#### Constructing a best or worst case

How does the best case for linear search look?
A common mistake is to say that the best case for a linear search
is that the array is empty. This is a fundamental misunderstanding
of what worst case and best case mean.
When we say linear search is best case $O(1)$ we mean that for
*every* input size $n$, there is a value for which the algorithm
terminates in constant time.

For linear search to be best case $O(1)$, we must be able to construct
a best case input for any size, for instance 100. The input size of
`linearSearch(arr,x)` is the length of the array `arr`.
Clearly the best case for size 100 cannot be that `arr` is empty, because there are
no empty arrays of length 100.
Instead, the best case of `linearSearch(arr,x)` is an array where `arr[0]==x`,
and this is easy to construct for any size.

When we say the worst case of linear search is $O(n)$, we mean that for every size $n$
there is a worst case input value for which the algorithm takes linear time.
One such worst case for `linearSearch(arr,x)` is that `x` does not occur in `arr`,
another is that it only occurs in the last position of `arr`.

#### Which case should we use?

The main advantage to analysing the worst case is that the algorithm is guaranteed to perform at least that well.
This is especially important for real-time applications where occasional delays are unacceptable,
such as an application for monitoring an air traffic control system.

The worst case is also important for programs that accept data from untrusted sources, such as publicly available databases.
Even if the worst case is statistically unlikely to happen by accident,
someone can deliberately construct a large data set that consistently hits the worst case,
and you can be certain that there are people out there who gladly will try to exploit any kind of weakness in your system.
Relying on average-case analysis in such applications opens up for different kinds of cyberattacks.

Average-case analysis requires a deep understanding of the specific application
that the algorithm is used in, and it is easy to accidentally make false assumptions.
For example, the average case for Insertion sort above assumes that every possible array is equally likely as input,
but if the array consists of book authors, the vast majority of arrays will never ever appear.
This problem is not just limited to sorting and searching.
How the data is distributed has a significant effect on
almost all data structures and algorithms, such as those based on
[hashing]{.term} and [binary search trees]{.term}. Incorrect assumptions
about the distribution can be extremely detrimental to performance.

The average case can be very useful if we know more about the data. For example, if we know that our input is *almost* sorted, then Insertion sort suddenly becomes a very efficient algorithm. Sorting lists that are already
sorted may sound silly, but consider an application where one process occasionally sorts an array
(perhaps to display it to a user), and another occasionally makes changes to specific values.
If the expected number of changes made between sorting runs is very small,
then Insertion sort is perhaps the best possible algorithm.

In summary, for real-time applications and for applications that handle data from unknown or even untrusted sources,
we should always prefer a worst-case analysis of an algorithm.
In other cases we usually desire an average-case analysis, but then we need to know enough about how the input is distributed.


::: dsvis
Consider the problem of finding the factorial of $n$.

``` {.jsav-animation src="AlgAnal/AnalCasesSameCON.js" links="AlgAnal/AnalCasesCON.css" name="Simple analysis cases slideshow"}
```
:::


::: dsvis
Here is an example where we reason about the *linear search* algorithm from @sec:sorting-1:linear-search.

``` {.jsav-animation src="AlgAnal/AnalCasesDiffCON.js" links="AlgAnal/AnalCasesCON.css" name="Best, Worst, and Average cases slideshow"}
```
:::
