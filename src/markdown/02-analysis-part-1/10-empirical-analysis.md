
## Empirical analysis

::: TODO
- Prio 3: add another example
:::

[Asymptotic algorithm analysis](#algorithm-analysis){.term} is an analytic tool, whereby we model the key aspects of an
algorithm to determine the growth rate of the algorithm as the input
size grows. It has proved hugely practical, guiding developers to use
more efficient algorithms. But it is really an
[estimation]{.term} technique, and it has its
limitations. These include the effects at small problem size,
determining the finer distinctions between algorithms with the same
growth rate, and the inherent difficulty of doing mathematical modeling
for more complex problems.

An alternative to analytical approaches are empirical ones. The most
obvious empirical approach is simply to run two competitors and see
which performs better. In this way we might overcome the deficiencies of
analytical approaches.

Be warned that comparative timing of programs is a difficult business,
often subject to experimental errors arising from uncontrolled factors
(system load, the language or compiler used, etc.). The most important
concern is that you might be biased in favor of one of the programs. If
you are biased, this is certain to be reflected in the timings. One look
at competing software or hardware vendors' advertisements should
convince you of this. The most common pitfall when writing two programs
to compare their performance is that one receives more code-tuning
effort than the other, since code tuning can often reduce running time
by a factor of five to ten. If the running times for two programs differ
by a constant factor regardless of input size (i.e., their growth rates
are the same), then differences in code tuning might account for any
difference in running time. Be suspicious of empirical comparisons in
this situation.

### Simulation

Another approach to analytical analysis is simulation.
The idea of simulation is to model the problem with a computer program.
This is different from empirical analysis where you evaluate a solution,
but a simulation is used for learning more about the problem.
The main purpose of a simulation is to perform analysis that might be too difficult to do mathematically.

Often simulation and empirical analysis go hand-in-hand:
we can use simulation to generate a large number of inputs so that we can study an algorithm empirically instead of analytically.
It is often extremely difficult to do a credible average-case analysis analytically,
because it is uncommon that the input to a problem is randomly distributed.
Assuming a uniform distribution will often lead to wrong conclusion about the average running time of an algorithm.
For example, which sorting algorithm is the best to use depends a lot on how the data is distributed.

::: topic
#### Example: sorting English words {-}

Assume that we want to create an alphabetically sorted list of words from a collection of English texts.
There are an infinite number of possible strings that can occur, but some strings are much more common than others.
How can we know how the data is distributed, on average?

George Zipf observed already in 1932 that the relative frequency of the $n$-th most common word in a language is approximately inversely proportional to $n$. [refer to Wikipedia Zipf's law]
We can use this observation to simulate a number of large texts, which we then can use for making an empirical comparison between different sorting algorithms.
:::


<!-- Perhaps move the example to the Hashing chapter?

A good example of this appears in the following figure.

![Hashing analysis plot](images/hashplot.png){width=400}

This figure shows the cost for inserting or deleting a record from a
[hash table](#hashing)
under two different assumptions for the policy used to find a free slot
in the table. The $y$ axes is the cost in number of hash table slots
evaluated, and the $x$ axes is the percentage of slots in the table that
are full. The mathematical equations for these curves can be determined,
but this is not so easy. A reasonable alternative is to write simple
variations on hashing. By timing the cost of the program for various
loading conditions, it is not difficult to construct a plot similar to
this one. The purpose of this analysis was not to determine which
approach to hashing is most efficient, so we are not doing empirical
comparison of hashing alternatives. Instead, the purpose was to analyze
the proper loading factor that would be used in an efficient hashing
system to balance time cost versus hash table size (space cost).
-->
