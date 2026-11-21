
## Main takeaways and outlook {#analysis-3:takeaway}

We have seen several advanced aspects of complexity analysis: Amortised complexity,
complexity of recursive functions, and complexity with multiple independent size parameters.

Amortised complexity is useful when analysing a sequence of operations, instead of each
operation individually. Dynamic arrays have amortised constant insertion time, even
though resizing the internal array takes linear time. We have seen how to prove this
using the accounting method.

There are several different ways of averaging complexity, which can easily get mixed up:

* Average-case complexity averages over possible inputs.
* Amortised complexity averages over a sequence of operations.
* Expected complexity averages over random choices made by the algorithm itself.

We have also seen that the structure of a recursive program determines its complexity.
By determining the operations in a single call, and how many recursive calls are made and
what the problem sizes are for the recursive calls, we can construct a *recurrence relation*
that describes the complexity for the program for a given problem size.

:::::: latex
\wrapQRlink[4mm]{20mm}{-4mm}{\thesectionURL}{Chapter \thechapter{} online}
\section*{Online material}
Visit the online book for further reading, interactive explanations, visualisations, extra material, and exercises.
::::::

