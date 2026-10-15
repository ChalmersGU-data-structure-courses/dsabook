
## Main takeaways and outlook {#ADTs:takeaway}

***WRITE THIS SECTION***


Here is a summary table of the naive implementations of priority queues, sets and maps:

+-------------+---------------------+-----------------+-------------------+
|             |  Priority queue as  |  Set/map as     | Sorted set/map as |
|             | a sorted list/array |  a linked list  |  a sorted array   |
+:============+:===================:+:===============:+:=================:+
| Add         |  $O(n)$             |  $O(n)$         |  $O(n)$           |
+-------------+---------------------+-----------------+-------------------+
| Remove      |   --                |  $O(n)$         |  $O(n)$           |
+-------------+---------------------+-----------------+-------------------+
| RemoveMin   |  $O(1)$             |  --             |  --               |
+-------------+---------------------+-----------------+-------------------+
| Search      |   --                |  $O(n)$         |  $O(\log(n))$     |
+-------------+---------------------+-----------------+-------------------+



:::::: latex
\wrapQRlink[4mm]{20mm}{-4mm}{\thesectionURL}{Chapter \thechapter{} online}
\section*{Online material}
Visit the online book for further reading, interactive explanations, visualisations, extra material, and exercises.
::::::

