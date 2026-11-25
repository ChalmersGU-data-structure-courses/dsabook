
## Main takeaways and outlook {#sorting-1:takeaway}

In this chapter we have studied searching and sorting through four algorithms:
Linear search, Binary search ([](#alg:binary-search)), Selection sort ([](#alg:selection-sort)) and Insertion sort ([](#alg:insertion-sort)).
The algorithms themselves are simple, but they introduce ideas that we use throughout the book:

- Algorithms can be described using text, pseudocode and illustrations.
- Many algorithms reduce a problem to a smaller problem of the same type:
  Linear search, Selection sort and Insertion sort reduce the size by one, while Binary search cuts it in half.
- An *invariant*, such as the one for Selection sort, helps us argue that an algorithm is correct.
- Algorithms can be classified by the growth rate of their runtime:
  constant (swapping two elements), logarithmic (Binary search), linear (Linear search) and quadratic (Selection sort and Insertion sort).
- The choice of data structure matters: a sorted array can be searched much faster than an unsorted one,
  but only if it is sorted by the same comparison, and at the cost of keeping it sorted.

Quadratic sorting is far too slow for large arrays.
In [Chapter @sec:analysis-1] we make growth rates precise using big-$O$ notation,
and in [Chapter @sec:sorting-2] we use the idea from Binary search, cutting the problem in half, to design much faster sorting algorithms.
Data structures that are fast to both search and update are the topic of the later chapters on search trees and hash tables.


:::::: latex
\wrapQRlink[4mm]{20mm}{-4mm}{\thesectionURL}{Chapter \thechapter{} online}
\section*{Online material}
Visit the online book for further reading, interactive explanations, visualisations, extra material, and exercises.
::::::

