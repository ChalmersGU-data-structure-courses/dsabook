
## Empirical analysis and code tuning

::: TODO
- Prio 3: discuss constant factors (not covered by asymptotic complexity/analysis)
- Prio 3: add an image explaining the graphics example
:::

Asymptotic algorithm analysis is an analytical tool for estimating
how the performance of an algorithm scales with input size.
It has proved hugely practical, guiding developers to use more efficient algorithms.
But it has its limitations, including the effects at small problem sizes, and
determining the finer distinctions between algorithms with the same growth rate.

If our algorithm is too complex to be analysed, or
if we want to learn about its average behaviour, or
how it behaves on small problem sizes, we can use empirical approaches.
These include runing tests on actual or simulated data and then analysing the results.

Empirical approaches are often used when optimising an implementation, so called *code tuning*.
If we want to improve a program it is important to know what gives the best effect,
and to know this we need to do empirical testing.
Empirical testing and code tuning often goes hand in hand.

### Comparative timing

An alternative to analytical approaches are empirical ones.
The most obvious empirical approach is simply to run two competitors and see which performs better.
In this way we might overcome some of the deficiencies of analytical approaches.

Be warned that comparative timing of programs is a difficult business,
often subject to experimental errors arising from uncontrolled factors
(system load, the language or compiler used, etc.).
The most important concern is that you might be biased in favour of one of the programs.
If you are biased, this is certain to be reflected in the timings.

The most common pitfall when comparing two programs is that one is more optimised than the other.
If the running times for two programs differ by a constant factor regardless of input size
(i.e., their growth rates are the same), if might simply be the case that one is more optimised.
Be suspicious of empirical comparisons in this situation.

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

::: example
#### Example: sorting English words

Assume that we want to create an alphabetically sorted list of words from a collection of English texts.
There are an infinite number of possible strings that can occur, but some strings are much more common than others.
How can we know how the data is distributed, on average?

George Zipf observed already in 1932 that the relative frequency of the $n$-th most common word in a language
is approximately inversely proportional to $n$. [refer to Wikipedia Zipf's law]
We can use this observation to simulate a number of large texts,
which we then can use for making an empirical comparison between different sorting algorithms.
:::


### Code tuning

While not nearly so important as changing an algorithm to reduce its growth rate,
*code tuning* can also lead to dramatic improvements in running time.
Code tuning is the art of hand-optimising a program to run
faster or require less storage. For many programs, code tuning can
reduce running time or cut the storage requirements by a factor of two
or more. Even speedups by a factor of five to ten are not uncommon.

Note that code tuning does not change the complexity of an algorithm,
because it only affects the multiplicative factor.
So we cannot use complexity analysis to understand the improvements by code tuning.
Instead, the most important tuning tool is *empirical analysis*.

Here are some suggestions for ways to speed up your programs by code
tuning. The most important thing to realise is that most statements in a
program do not have much effect on the running time of that program.
There are normally just a few key subroutines, possibly even key lines
of code within the key subroutines, that account for most of the running
time. There is little point to cutting in half the running time of a
subroutine that accounts for only 1% of the total running time. Focus
your attention on those parts of the program that have the most impact.

When tuning code, it is important to gather good timing statistics. Many
compilers and operating systems include profilers and other special
tools to help gather information on both time and space use. These are
invaluable when trying to make a program more efficient, because they
can tell you where to invest your effort.

A lot of code tuning is based on the principle of avoiding work rather
than speeding up work. A common situation occurs when we can test for a
condition that lets us skip some work. However, such a test is never
completely free. Care must be taken that the cost of the test does not
exceed the amount of work saved. While one test might be cheaper than
the work potentially saved, the test must always be made and the work
can be avoided only some fraction of the time.

::: example
#### Example: Computer graphics

A common operation in computer graphics applications is to find which
among a set of complex objects contains a given point in space. Many
useful data structures and algorithms have been developed to deal with
variations of this problem. Most such implementations involve the
following tuning step. Directly testing whether a given complex object
contains the point in question is relatively expensive. Instead, we can
screen for whether the point is contained within a
[bounding box]{.term} for the object. The
bounding box is simply the smallest rectangle (usually defined to have
sides perpendicular to the $x$ and $y$ axes) that contains the object.
If the point is not in the bounding box, then it cannot be in the
object. If the point is in the bounding box, only then would we conduct
the full comparison of the object versus the point. Note that if the
point is outside the bounding box, we saved time because the bounding
box test is cheaper than the comparison of the full object versus the
point. But if the point is inside the bounding box, then that test is
redundant because we still have to compare the point against the object.
Typically the amount of work avoided by making this test is greater than
the cost of making the test on every object.
:::

Be careful not to use tricks that make the program unreadable. Most code
tuning is simply cleaning up a carelessly written program, not taking a
clear program and adding tricks. In particular, you should develop an
appreciation for the capabilities of modern compilers to make extremely
good optimisations of expressions. "Optimisation of expressions" here
means a rearrangement of arithmetic or logical expressions to run more
efficiently. Be careful not to damage the compiler's ability to do such
optimisations for you in an effort to optimise the expression yourself.
Always check that your "optimisations" really do improve the program
by running the program before and after the change on a suitable
benchmark set of input. It is very hard to do better than a good compiler.

The greatest time and space improvements come from a better data
structure or algorithm. The most important rule of code tuning is:

::: center
***First tune the algorithm, then tune the code.***
:::
