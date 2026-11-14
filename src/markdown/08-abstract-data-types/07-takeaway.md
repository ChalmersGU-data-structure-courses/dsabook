
## Main takeaways and outlook {#ADTs:takeaway}

Using the right data structure is a vital first step towards solving almost any problem.
Abstract Data Types helps us chose a suitable data structure by grouping similar operations.
When analysing your problem and the data, questions like these can help:

* Is the data frequently modified or mostly static?
* Does the order in which elements are added matter?
* Can the data contain duplicates?
* What modifications are performed? Examples include:
    * Adding elements
    * Associating keys with values (`put`)
    * Removing the oldest/newest/minimum element
* What search operations are performed on the data? Examples include:
    * Determining membership (`contains`)
    * Finding the element at a specific position
    * Finding the minimum/maximum element
    * Find all elements in a range

As an example, a sorted array is excellent data structure for representing a
static set of elements. We sort the array once when the application starts,
and then we can perform efficient binary searches throughout the runtime of
the application. If the content of the set needs to change during execution,
the situation is drastically different. Inserting a value into a sorted
array is a time consuming operation, so a different data structure is needed.
In the subsequent chapters, we look at several data structures for implementing
*sets*, *maps*, and *priority queues*.

:::::: latex
\wrapQRlink[4mm]{20mm}{-4mm}{\thesectionURL}{Chapter \thechapter{} online}
\section*{Online material}
Visit the online book for further reading, interactive explanations, visualisations, extra material, and exercises.
::::::

