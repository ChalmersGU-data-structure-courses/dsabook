
## Main takeaways and outlook {#graphs:takeaway}

Graphs are very different from the other data structures presented in this book.
Rather than a collection of values that can be accessed and modified in particular ways,
graphs are used to model relationships between data items.
There are also many similar graphs with small variations,
notably weighted and undirected graphs, which makes formulating a universal
abstract data type for graphs difficult.

Graphs have a staggering range of applications. Many seemingly unrelated real world
problems can be modelled as graph problems.
These problems in turn can often be solved by one of a handful of very similar
graph traversal algorithms, that mainly differ in which abstract data type is used
to store the *agenda* of vertices that should be processed.

Throughout this book we have seen how algorithms and data structures intertwine:
Efficient data structures form the backbone of algorithms, and data
structures in turn rely on clever algorithms to access and modify data.
Graph algorithms bring many of these ideas together, demonstrating how general algorithms
can solve a wide range of problems, and how the choice of data structures can make those
solutions efficient.

:::::: latex
\wrapQRlink[4mm]{20mm}{-4mm}{\thesectionURL}{Chapter \thechapter{} online}
\section*{Online material}
Visit the online book for further reading, interactive explanations, visualisations, extra material, and exercises.
::::::

