
## Analyzing Problems

You most often use the techniques of "algorithm" analysis to analyze
an [algorithm]{.term}, or the instantiation of
an algorithm as a [program]{.term}. You can also
use these same techniques to analyze the cost of a
[problem]{.term}. The key question that we want
to ask is: How hard is a problem? Certainly we should expect that in
some sense, the problem of sorting a list of records is harder than the
problem of searching a list of records for a given key value. Certainly
the algorithms that we know for sorting some records seem to be more
expensive than the algorithms that we know for searching those same
records.

What we need are useful definitions for the
[upper bound]{.term} and
[lower bound]{.term} of a problem.

One might start by thinking that the upper bound for a problem is how
hard any algorithm can be for the problem. But we can make algorithms as
bad as we want, so that is not useful. Instead, what is useful is to say
that a problem is only as hard as what we CAN do. In other words, we
should define the upper bound for a problem to be the **best** algorithm
that we know for the problem. Of course, whenever we talk about bounds,
we have to say when they apply. We we really should say something like
the best algorithm that we know in the worst case, or the best algorithm
that we know in the average case.

But what does it mean to give a lower bound for a problem? Lower bound
refers to the minimum that any algorithm MUST cost. For example, when
searching an unsorted list, we MUST look at every record. When sorting a
list, we MUST look at every record (to even know if it is sorted).

It is much easier to show that an algorithm (or program) is in
$\Omega(f(n))$ than it is to show that a problem is in $\Omega(f(n))$.
For a problem to be in $\Omega(f(n))$ means that *every* algorithm that
solves the problem is in $\Omega(f(n))$, even algorithms that we have
not thought of! In other words, EVERY algorithm MUST have at least this
cost. So, to prove a lower bound, we need an argument that is true, even
for algorithms that we don't know.

So far all of our examples of algorithm analysis give "obvious"
results, with big-Oh always matching $\Omega$. To understand how big-Oh,
$\Omega$, and $\Theta$ notations are properly used to describe our
understanding of a problem or an algorithm, it is best to consider an
example where you do not already know a lot about the problem.

Let us look ahead to analyzing the problem of sorting to see how this
process works. What is the least possible cost for any sorting algorithm
in the worst case? The algorithm must at least look at every element in
the input, just to determine that the input is truly sorted. Thus, any
sorting algorithm must take at least $cn$ time. For many problems, this
observation that each of the $n$ inputs must be looked at leads to an
easy $\Omega(n)$ lower bound.

In your previous study of computer science, you have probably seen an
example of a sorting algorithm whose running time is in $O(n^2)$ in the
worst case. The simple Bubble Sort and Insertion Sort algorithms
typically given as examples in a first year programming course have
worst case running times in $O(n^2)$. Thus, the problem of sorting can
be said to have an upper bound in $O(n^2)$. How do we close the gap
between $\Omega(n)$ and $O(n^2)$? Can there be a better sorting
algorithm? If you can think of no algorithm whose worst-case growth rate
is better than $O(n^2)$, and if you have discovered no analysis
technique to show that the least cost for the problem of sorting in the
worst case is greater than $\Omega(n)$, then you cannot know for sure
whether or not there is a better algorithm.

Many good sorting algorithms have running time that is in $O(n \log n)$
in the worst case. This greatly narrows the gap. With this new
knowledge, we now have a lower bound in $\Omega(n)$ and an upper bound
in $O(n \log n)$. Should we search for a faster algorithm? Many have
tried, without success. Fortunately (or perhaps unfortunately?),
[we can prove that](#sorting-lower-bound){.term} 
any sorting algorithm must have running time in
$\Omega(n \log n)$ in the worst case. This proof is one of the most
important results in the field of algorithm analysis, and it means that
no sorting algorithm can possibly run faster than $c n \log n$ for the
worst-case input of size $n$. Thus, we can conclude that the problem of
sorting is $\Theta(n \log n)$ in the worst case, because the upper and
lower bounds have met.

Knowing the lower bound for a problem does not give you a good
algorithm. But it does help you to know when to stop looking. If the
lower bound for the problem matches the upper bound for the algorithm
(within a constant factor), then we know that we can find an algorithm
that is better only by a constant factor.

So, to summarize: The upper bound for a problem is the best that you CAN
do, while the lower bound for a problem is the least work that you MUST
do. If those two are the same, then we say that we really understand our
problem.

