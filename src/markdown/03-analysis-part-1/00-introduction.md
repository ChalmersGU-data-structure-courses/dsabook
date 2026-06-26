
# Algorithm analysis, part 1 {#analysis-1}

This chapter has two main parts:
How to best communicate algorithms,
and an how to compare performance of algorithm.

We have already touched on both these topics.
You have seen several algorithms described,
and some of the tools used for doing so:
pseudocode, examples, and text descriptions.
In this chapter we expand on how problems relate to algorithms,
and how algorithms relate to programs, and how to use these
technical terms to communicate algorithms.

We look closer at the important concept of *invariants*,
and how they can be used both for explaining an algorithm or data structure,
as a tool for developing new data structures, and to prove the correctness
of algorithms.

Perhaps most importantly, this chapter introduces the vast subject of
*computational complexity*, and *asymptotic analysis*.
Complexity provides a method of comparing the performance of
algorithms without running any benchmarks,
and to determine how well an algorithm scales to larger input values.
We have already shown algorithms having logarithmic, linear, and quadratic time.
This chapter expands this notion into a more general understanding of
*complexity classes*.

We introduce big-$O$ notation, the universally adopted industry standard
for communicating and reasoning about performance,
not just for data structures but for programming in general.
In this chapter we aim to give an incomplete,
but practically applicable understanding of big-$O$ and complexity,
that we further expand in subsequent chapters.
