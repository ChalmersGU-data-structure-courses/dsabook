
# Algorithm analysis, part 2 {#analysis-part-2}

In [Chapter @sec:analysis-part-1] we introduced the ideas behind algorithmic analysis,
and explained the basics on an abstract level.
Now that you understand everything about sorting algorithms, we can go into more depth with our analysis tools.
Recall that we introduced the upper, lower and tight bounds in @sec:orders-of-growth:

Upper bound

: $f\in O(g)$ **if and only if** $f$ grows at least as fast as $g$

Lower bound

: $f\in\Omega(g)$ **if and only if** $f$ grows at most as fast as $g$

Tight bound

: $f\in\Theta(g)$ **if and only if** both functions grow at the same rate

In this chapter we will give formal definitions of these concepts and show how to
use them to analyse the computational complexity of most algorithms,
both for sorting and the data structures we will introduce later.
