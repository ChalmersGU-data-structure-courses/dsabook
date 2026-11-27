
## Main takeaways and outlook {#sequences:takeaway}

In this chapter we have moved from algorithms to *data structures*, starting with the simplest ones: stacks and queues.
We implemented them in two fundamentally different ways: as *linked lists* of nodes, and as *dynamic arrays* that overcome the fixed capacity of regular arrays.

- Each data structure has *invariants*, such as the top pointer always referring to the most recently added element, or `size` matching the number of elements.
  Every operation, such as `push` and `pop`, must preserve them.
- All stack and queue operations are $O(1)$, but for dynamic arrays only *amortised*: an occasional resize is expensive,
  but doubling the capacity makes it rare enough that the average cost stays constant.
- Neither implementation is always better: arrays make good use of the memory cache, while linked lists avoid empty cells but need a pointer in every node.
- Dynamic arrays also allow efficient access to any position, but not efficient insertion or removal in the middle.
  No general list data structure can make all of these operations efficient.

Dynamic arrays are a supremely useful data structure: the built-in lists in Python and the `ArrayList` class in Java are dynamic arrays.
They are also building blocks of more complex data structures, such as binary heaps ([Chapter @sec:heaps]). 
In [Chapter @sec:analysis-3] we look more closely at amortised analysis, and explain that dynamic arrays are in fact efficient.

:::::: latex
\wrapQRlink[4mm]{20mm}{-4mm}{\thesectionURL}{Chapter \thechapter{} online}
\section*{Online material}
Visit the online book for further reading, interactive explanations, visualisations, extra material, and exercises.
::::::

