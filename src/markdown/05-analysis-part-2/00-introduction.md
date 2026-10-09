
# Algorithm analysis, part 2 {#analysis-2}

In [Chapter @sec:analysis-1] we introduced the idea of algorithmic analysis,
and explained big-$O$ notation without providing a formal definition.
Now that you understand everything about searching and sorting algorithms,
we can go into more depth with our analysis tools.

So far we have understood big-$O$ as complexity classes of algorithms,
we say things like Selection sort is $O(n^2)$ to describe the computational
complexity of Selection sort.
This is perfectly reasonable for everyday algorithmic analysis,
but is not mathematically accurate for two reasons:

- Formally $O(n^2)$ is a set of numeric functions, and Selection sort is not a numeric
  function so it cannot be in $O(n^2)$.
  What we actually mean is that the time function $T(n)$ that describes
  the worst case runtime of Selection sort for input size $n$ is in
  $O(n^2)$. So writing $T \in O(n^2)$ is more correct,
  and even that is shorthand for $T \in O(f)$ for $f(n)=n^2$.
- $O(n^2)$ is actually an *upper bound* for the complexity.
  That means that technically every algorithm that runs in quadratic time is also a member of $O(n^3)$.
  So it is formally correct, but not very useful, to say that Selection sort is $O(n^3)$.
  Mathematically, this means that $O(n^2) \subset O(n^3)$.

Rather than understanding $O(n^2)$ as "time functions that grow quadratically",
a more mathematically correct intuition is
"time functions that do not grow faster than quadratic"
(which includes for instance Mergesort: a linearithmic function does not grow faster than a quadratic one).

The reason for deceiving you in [Chapter @sec:analysis-1] is that, while it is
technically a true statement that Mergesort is $O(n^2)$, any computer scientist hearing you say that
would correct you and point out that it is in fact $O(n\log(n))$ (which is also true, and more precise).
We tend to use big-$O$ as if it were a tight bound, rather than an upper bound.

There is a separate notation for tight bounds ($\Theta$, pronounced "big theta"),
and one for lower bounds ($\Omega$, "big omega"),
but they are not as frequently used as the upper bound.
These concepts are often confused with best case and worst case (@sec:analysis-1:complexity-cases),
but they are fundamentally different.
When we analyse algorithms we first decide if we want to analyse the best, average or worst case (usually the worst case),
and then for each of those we can determine an upper, lower, or tight bound (usually the upper bound).

In this chapter we give formal definitions of the concepts and show how to
use them to analyse the computational complexity of most algorithms,
both for sorting and the data structures we introduce in subsequent chapters.
