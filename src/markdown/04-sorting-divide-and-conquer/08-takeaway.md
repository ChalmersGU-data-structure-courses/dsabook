
## Main takeaways and outlook {#sorting-2:takeaway}

::: TODO
- Prio 1: Something about comparing sorting algorithms and/or optimizations.
:::

We have introduced the concept of a divide-and-conquer algorithm, where a problem is broken down into smaller parts that are solved independently, and then the solutions are combined to form a solution to the original problem. This approach is useful for a wide range
of algorithms. We show two sorting algorithms based on the approach, that also

* Merge sort ([](#alg:mergesort)) spends all its time combining solutions of smaller sorting problems, taking two sorted lists and merging them ([](#alg:mergesort-merge)).
* Quicksort ([](#alg:quicksort)) spends all its time dividing sorting problems into smaller parts, by separating small and large values to be sorted independently ([](#alg:partition)).

Both algorithms are $O(n \log(n))$ (*average* in the case of Quicksort), which is a significant improvement on the
$O(n^2)$ of the algorithms in [Chapter @sec:sorting-1].
Merge sort and Quicksort, and variants of them, are used extensively in practice. It is no exaggeration to say that if it was not for
$O(n \log(n))$ sorting algorithms, much of what we use computers for today would have been impossible!

Determining the complexity of the algorithms is also required some new tools. Most importantly:

* The recursive nature of divide-and-conquer algorithm makes a straightforward analysis of the source code difficult.
In the simple sorting algorithms like Selection Sort ([](#alg:selection-sort)), the $O(n^2)$ is a simple consequence of
nesting two loops that each have $O(n)$ iterations. There is no $O(\log(n))$ loop in either Merge Sort or Quicksort though,
instead determining the $O(n \log(n))$ requires adding up the total cost of operations performed in different recursive calls with different problem sizes.
* Quicksort introduces the concept of *average case complexity*. Depending on how the pivot value is selected, the worst case of
the algorithm can be $O(n^2)$. For randomly selected data, the algorithm is still $O(n \log(n))$.
While it is important to be aware of the worst case -- especially in situations where a potentially malicious party
supplies the data to be sorted -- we usually only say that Quicksort $O(n \log(n))$ average.

:::::: latex
\wrapQRlink[4mm]{20mm}{-4mm}{\thesectionURL}{Chapter \thechapter{} online}
\section*{Online material}
Visit the online book for further reading, interactive explanations, visualisations, extra material, and exercises.
::::::

