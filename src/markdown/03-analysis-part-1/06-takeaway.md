
## Main takeaways and outlook {#analysis-1:takeaway}

In this chapter we have introduced the tools we use to reason about algorithms: what it means for an algorithm to be correct, and how to describe its efficiency independently of hardware and implementation details.
The most important concept is complexity using big-$O$ notation, which turns informal notions like "linear time" and "logarithmic time" into complexity classes such as $O(n)$ and $O(\log(n))$.

- A *problem* specifies what should be computed, an *algorithm* is a method for solving it, and a *program* implements an algorithm.
- *Invariants*, *preconditions* and *postconditions* let us reason about if an algorithm or a data structure is correct.
- Empirical measurements are unreliable for comparing algorithms; instead we analyse how the runtime *grows* with the input size.
- Big-$O$ is an upper bound that ignores constant factors and lower-order terms:
  $O(2n^2\log(n^2))$ is the same as $O(n^2\log(n))$, but $O(n^2\log(n))$ is a slower class than $O(n^2)$.
- For large enough inputs, an algorithm in a faster complexity class is always faster, whatever the constant factors.
- The complexity of code can usually be found with a few rules of thumb: sequences add, loops multiply, and only the dominant term matters.

In [Chapter @sec:sorting-2] we apply these tools to faster sorting algorithms, where the recursive structure requires new analysis techniques.
The formal definition of big-$O$, together with lower and tight bounds, follows in [Chapter @sec:analysis-2].

:::::: latex
\wrapQRlink[4mm]{20mm}{-4mm}{\thesectionURL}{Chapter \thechapter{} online}
\section*{Online material}
Visit the online book for further reading, interactive explanations, visualisations, extra material, and exercises.
::::::

