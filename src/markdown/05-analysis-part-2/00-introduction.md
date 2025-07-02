
# Algorithm analysis, part 2: Theory {#algorithm-analysis-theory}

In [Chapter @sec:algorithm-analysis-introduction] we introduced the ideas behind algorithmic analysis, and explained the basics on an abstract level.
Now that you understand everything about sorting algorithms, we can go into more depth with our analysis tools.
Recall that we introduced the upper, lower and tight bounds in @sec:orders-of-growth:

Upper bound

: $f\in O(g)$ **iff** $f$ grows *at least as fast* as $g$

Lower bound

: $f\in\Omega(g)$ **iff** $f$ grows *at most as fast* as $g$

Tight bound

: $f\in\Theta(g)$ **iff** both functions grow *at the same rate*

In this chapter we will give formal definitions of these concepts and show how to use them to reason about algorithms and problems.

After reading this chapter you should be able to analyse the computational complexity of most algorithms, both for sorting and the data structures we will introduce later.
