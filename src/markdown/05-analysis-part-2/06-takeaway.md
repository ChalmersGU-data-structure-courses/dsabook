
## Main takeaways and outlook {#analysis-2:takeaway}

In this chapter we have given a more formal treatment of asymptotic complexity.
The formal definition of big-$O$ justifies the simplification rules from [Chapter @sec:analysis-1],
and it shows that big-$O$ is only one of several ways of bounding the growth of a function.

- Big-$O$ is an *upper bound*, $\Omega$ is a *lower bound*, and $\Theta$ is a *tight bound*.
- The formal definition explains why constant factors, lower-order terms and even the base of a logarithm can be ignored.
- Upper, lower and tight bounds should not be confused with worst-, best- and average-case analysis: we can give an upper bound on the best case, or a lower bound on the worst case.
- We can also analyse a *problem* instead of an algorithm. A lower bound on a problem holds for every possible algorithm, even those that have not been invented yet.
  For example, any sorting algorithm that only compares or swaps adjacent elements needs $\Omega(n^2)$ time.

In [Chapter @sec:analysis-3] we continue our study of algorithm analysis, introducing amortised analysis
and recurrence relations for analysing recursive algorithms.

:::::: latex
\wrapQRlink[4mm]{20mm}{-4mm}{\thesectionURL}{Chapter \thechapter{} online}
\section*{Online material}
Visit the online book for further reading, interactive explanations, visualisations, extra material, and exercises.
::::::

