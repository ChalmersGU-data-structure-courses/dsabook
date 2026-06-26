
# Algorithm analysis, part 2 {#analysis-2}

In [Chapter @sec:analysis-1] we introduced the idea of algorithmic analysis,
and explained $O$-notation without providing a formal definition.
Now that you understand everything about sorting algorithms, we can go into more depth with our analysis tools.

So far we have understood $O$-notation as complexity classes of algorithms,
we say things like Linear search is $O(n)$ to describe the computational
complexity of Linear search.
This is perfectly reasonable for everyday algorithmic analysis,
but is not mathematically accurate for two reasons:

- Formally $O(n)$ is a set of numeric functions, and Linear search is not a numeric
  function so it cannot be in $O(n)$.
  What we actually mean is that the time function $T(n)$ that describes
  the worst case runtime of Linear search for input size $n$ is in
  $O(n)$. So writing $T \in O(n)$ is more correct,
  and even that is shorthand for $T \in O(f)$ for $f(n)=n$.
- $O(n)$ is actually an *upper bound* for the complexity.
  That means that technically every algorithm that runs in $O(n)$ time, also runs in $O(n^2)$ time
  (but not the other way around). Mathematically, $O(n) \subset O(n^2)$.

Rather than understanding $O(n)$ as "time functions that grow linearly",
a more mathematically correct intuition is
"time functions that do not grow faster than linear" (which includes
for instance binary search: a logarithmic function does not grow faster than a linear one).

The reason for deceiving you in [Chapter @sec:analysis-1] is that, while it is
technically a true statement that Binary search is $O(n)$, any computer scientist hearing you say that
would correct you and point out that it is in fact $O(\log(n))$ (which is also true, and
more precise). We tend to use $O$-notation as if it were a tight bound, rather than an upper bound.

There is a separate notation for tight bounds ($\Theta$, pronounced "big theta"),
and one for lower bounds ($\Omega$, "big omega"), but these
are not as frequently used as "big O".

Informally:

Upper bound

: $f\in O(g)$ **if and only if** $f$ grows at most as fast as $g$

Lower bound

: $f\in\Omega(g)$ **if and only if** $f$ grows at least as fast as $g$

Tight bound

: $f\in\Theta(g)$ **if and only if** both functions grow at the same rate

In this chapter we give formal definitions of these concepts and show how to
use them to analyse the computational complexity of most algorithms,
both for sorting and the data structures we introduce in subsequent chapters.
