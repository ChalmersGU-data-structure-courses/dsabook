
# Algorithm analysis, part 2 {#analysis-part-2}

So far I have just talked about complexity informally, hand-waved a little and said that we can disregard constants. Now is the time to make these things more precise.

We use the term “asymptotic complexity” to describe how a function behaves when its input grows larger and larger. This is a very vague term and can mean many things. For example, the following function:

$$ f(x) = 5 x^2 – 7 x + 100 \log_2(x) + 10^9 $$

is asymptotically equal to $5x^2$ when $x \rightarrow \infty$. We can formulate this as follows:

$$ |f(x) / 5x^2| \rightarrow 1  \text{ when }  x \rightarrow \infty $$

This is actually a possible definition of asymptotic complexity, and we usually write it as $f ~ g$, and say that “$f$ is asymptotically equivalent to $g$”.

However, this formulation is still too detailed for our purposes. Most of the time we are *not* interested in the constant factor 5, but only the “order of growth” of the function. The reason for this is that we can easily make the constant factor smaller by just switching to a faster computer.

This is where the big-O notation comes in. Using this we can say something about the asymptotic complexity of an algorithm, in a mathematically precise way, without having to deal with constant factors that only makes reasoning harder.

Note that sometimes big-O is too abstract. Sometimes we are actually interested in the constant factors too, for example if we want to compare two algorithms with the same big-O complexity. But you don’t have to learn how to do this in this course, you only have to learn about big-O (and its sister notations).

----------

In [Chapter @sec:analysis-part-1] we introduced the ideas behind algorithmic analysis, and explained the basics on an abstract level.
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
