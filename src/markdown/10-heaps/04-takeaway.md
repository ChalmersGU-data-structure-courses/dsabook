
## Main takeaways and outlook {#heaps:takeaway}

Using heaps, we have made a much more efficient implementation of priority queues (see @sec:ADTs:priority-queues)
than what we could achieve with sorted lists,
allowing us to both remove the minimal element and add a new elements in $O(\log(n))$ time.
This makes heaps a useful family of data structures in their own right, and they offer several interesting insights:

* Heaps are an excellent example of how a carefully chosen invariant can make certain operations very efficient.
The heap invariant is weak enough that it lets us do precisely what we need. Unlike sorted arrays, two heaps with the same
content can look very different -- there is no precise position a value must be in.
This leeway is what lets us implement fast add operations.
Weakening an invariant is sometimes an excellent way of increasing the performance of a data structure.
* Using an array to store a tree as we do in binary heaps is a brilliant data representation.
Again, the completeness invariant is vital for performance: even small imbalances in the tree
structure would have a devastating impact on memory usage.

Note that the weak invariant of heaps make them unsuitable for many other tasks.
Searching for a specific value requires a linear search. To solve that problem we need
search trees, the topic of [Chapter @sec:search-trees].

:::::: latex
\wrapQRlink[4mm]{20mm}{-4mm}{\thesectionURL}{Chapter \thechapter{} online}
\section*{Online material}
Visit the online book for further reading, interactive explanations, visualisations, extra material, and exercises.
::::::

