
# Algorithm analysis, part 1 {#analysis-1}

This chapter consists of two fundamental themes:
How to best communicate algorithms,
and how to compare performance of algorithms.
The algorithms that you have seen in the last chapter were described using different methods:
examples, text descriptions, and pseudocode.
Now we will expand on how problems relate to algorithms,
and how algorithms relate to programs, and how to use these
technical terms to communicate algorithms.

We look closer at the important concept of *invariants*,
and how they can be used both for explaining an algorithm or data structure,
as a tool for developing new data structures, and to prove the correctness
of algorithms.

Perhaps most importantly, this chapter introduces
*computational complexity*, and *asymptotic analysis*.
Complexity provides a method of comparing the performance of
algorithms without running any benchmarks,
and to determine how well an algorithm scales to larger input sizes.
We have already shown algorithms having logarithmic, linear, and quadratic time.
This chapter expands this notion into a more general understanding of
*complexity classes*.

We introduce big-$O$ notation, the universally adopted standard
for communicating and reasoning about performance of algorithms.
We aim to give an incomplete,
but practically applicable understanding of big-$O$ and complexity,
which we further expand in [Chapters @sec:analysis-2] and [-@sec:analysis-3].
