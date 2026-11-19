
## Main takeaways and outlook {#analysis-1:takeaway}

The most important concept introduced in this chapter is complexity using $O$-notation.
This extends our previous notion of complexity classes like linear and logarithmic time
into a mathematically precise definitions ($O(n)$ and $O(\log(n))$).

Time complexity lets us estimate the scalability of an algorithm, and it lets us compare
different algorithms that solve the same problem. An $O(n^2 \log(n))$ time algorithm is in a
different (slower) complexity class than $O(n^2)$, whereas $O(2n^2 \log(n^2))$ is the same
as $O(n^2 \log(n))$. Ultimately, algorithms in a faster complexity class scale better.
There are hidden constant factors, and for small input sizes or certain technical
settings the outcome is unpredictable  -- but for large enough values of $n$,
better time complexity means a faster algorithm.

A different aspect of algorithm analysis is correctness. An algorithm is only useful if we
are certain it always solves a problem correctly. This is closely tied to *invariants* of data structures,
properties that must always hold for the data representation, such as an array always being sorted.
Often, deciding the data structure of a data structure makes defining the operations trivial, and the
correctness of them obvious.

:::::: latex
\wrapQRlink[4mm]{20mm}{-4mm}{\thesectionURL}{Chapter \thechapter{} online}
\section*{Online material}
Visit the online book for further reading, interactive explanations, visualisations, extra material, and exercises.
::::::

