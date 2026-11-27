
## Main takeaways and outlook {#sorting-2:takeaway}

In this chapter we have introduced *divide-and-conquer* algorithms, which break a problem into smaller parts, solve them recursively, and combine the solutions.
Mergesort and Quicksort are two sorting algorithms based on this idea, and they take a significant step from the $O(n^2)$ algorithms in [Chapter @sec:sorting-1] to $O(n\log(n))$.
It is no exaggeration to say that without $O(n\log(n))$ sorting algorithms, much of what we use computers for today would be impossible.

- Mergesort ([](#alg:mergesort)) does its work when *combining*: it merges two sorted arrays into one ([](#alg:mergesort-merge)).
  Quicksort ([](#alg:quicksort)) does its work when *dividing*: it partitions the array into small and large values around a pivot ([](#alg:partition)).
- Mergesort is always $O(n\log(n))$, while Quicksort is $O(n\log(n))$ on average but $O(n^2)$ in the worst case, which a good pivot selection makes very unlikely, although a malicious party can still force it.
- Analysing a recursive algorithm requires new tools: there is no $O(\log(n))$ loop in the code, so instead we add up the cost of all recursive calls, level by level.
- Sorting algorithms differ in more than their complexity: Mergesort is stable but not in-place, while Quicksort is in-place but not stable.
- In practice, algorithms are often combined: for example, Mergesort and Quicksort can switch to Insertion sort for small subarrays, where it is faster.

In [Chapter @sec:analysis-2] we give the formal definition of big-$O$, and show that sorting algorithms that only swap adjacent elements can never be better than quadratic.
In [Chapter @sec:analysis-3] we introduce recurrence relations, a general method for analysing divide-and-conquer algorithms.

:::::: latex
\wrapQRlink[4mm]{20mm}{-4mm}{\thesectionURL}{Chapter \thechapter{} online}
\section*{Online material}
Visit the online book for further reading, interactive explanations, visualisations, extra material, and exercises.
::::::

