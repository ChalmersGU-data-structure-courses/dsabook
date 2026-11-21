
## Main takeaways and outlook {#analysis-2:takeaway}

In this chapter we have given a more formal treatment of asymptotic complexity, and introduced the distinction between upper, lower and tight bounds. Here is a checklist of the main concepts:

* We have given a formal definition of big-O, and shown how it to justifies the simplification rules previously introduced (in [Chapter @sec:analysis-1]).
* How big-O notation describes an upper bound, not necessarily a tight bound.
* Upper, lower and tight bounds are described by the notations $O$, $\Omega$ and $\Theta$, respectively. They should not be confused with worst-, best- and average-case analysis.
* Sometimes, we can set a lower bound on a problem itself. In this chapter we showed that no sorting algorithm based on comparing or swapping adjacent elements can be faster than $O(n^2)$.

In [Chapter @sec:analysis-3] we will continue our study of algorithm analysis, introducing amortised analysis and methods for analysing recursive algorithms using recurrence relations.

:::::: latex
\wrapQRlink[4mm]{20mm}{-4mm}{\thesectionURL}{Chapter \thechapter{} online}
\section*{Online material}
Visit the online book for further reading, interactive explanations, visualisations, extra material, and exercises.
::::::

