
### Review questions: Lower bounds for sorting

Here are some review questions to check that you understand this proof.

:::::::::::::::::::::::::::::::::::::::: quiz ::::::::::::::::::::::::::::::::::::::::

:::::::::: question ::::::::::
Answer TRUE or FALSE.

The proof that the lower bound for the
sorting problem is $\Omega(n \log n)$ technically
only applies to comparison-based sorting. This means that we
can find other approaches (such as radix sort) to solve the
problem faster.

- [ ] True
- [x] False

::: hints
- Does Radix Sort compare?
- While Radix Sort does not directly compare the keys of two
records against each other, it does do a comparison for each
digit of each key.
:::
::::::::::::::::::::::::::::::


:::::::::: question ::::::::::
The upper bound for a problem is defined to be:

- [x] The cost of the best algorithm that we know for the problem
- [ ] The cost of the worst algorithm that we know for the problem
- [ ] The same as the lower bound for the problem
- [ ] The cost of the worst case input for the problem

::: hints
- For a given problem, it is possible to write an algorithm
that is as bad as we want. So defining a bound in terms of bad
algorithms is not useful.
- We look at the worst-case input to determine the worst-case
upper bound for an algorithm, not a problem.
- To get the upper bound for a problems, we
compare the cost for each algorithm that we know.
- The upper bound of the problem is the upper bound of the
best known algorithm.
:::
::::::::::::::::::::::::::::::



:::::::::: question ::::::::::
The lower bound for a problem is defined to be:

- [x] The best possible cost for any algorithm that solves the problem
- [ ] The cost of the best algorithm that we know for the problem
- [ ] The same as the upper bound for the problem
- [ ] The cost of the best case input for the problem
- [ ] The maximum cost that any algorithm to solve the problem could have

::: hints
- Upper and lower bounds are used to describe to what we
know, and we do not always know that these are the same for
a given algorithm.
- Lower bound refers to the class of inputs that we are
considering (best, average, or worst-case). So it does NOT
necessarily have anything to do with the best-case input.
- The cost of the best algorithm that we know sets a limit
on the upper bound of the problem, not the lower bound.
- The lower bound refers to the best possible cost (for the
class of inputs, such as worst-case) for ANY algorithm that
solves the problem.
:::
::::::::::::::::::::::::::::::



:::::::::: question ::::::::::
If the upper and lower bounds for a problem meet then:

- [x] We can say that we understand the runtime cost of the problem
- [ ] We are ready to implement the solution to the problem
- [ ] The universe explodes
- [ ] The problem is $\Theta(n)$

::: hints
- The universe hasn't exploded yet.
- Just because the bounds meet, it does not mean that the cost is $\Theta(n)$.
- We might need to implement an algorithm even if we are not certain that it is the best.
- When the bounds meet, then we know for certain if an
algorithm to solve that problem is best (within a constant factor).
:::
::::::::::::::::::::::::::::::



:::::::::: question ::::::::::
Which of the following is NOT relevant to the sorting problem lower bounds proof?

- [x] The worst-case cost for Bubble Sort is $\Theta(n^2)$
- [ ] The number of permutations for $n$ records is $n!$
- [ ] A tree with $n$ nodes has a depth of at least $\log n$
- [ ] Any sorting algorithm can be modeled using a decision tree

::: hints
- The proof uses decision trees to model sorting algorithms.
- The number of permutations affects the size of the decision tree.
- Given a tree of a certain size, we can compute its minimum depth.
- The cost of Bubble Sort does not affect the cost of other sorts.
:::
::::::::::::::::::::::::::::::



:::::::::: question ::::::::::
$\log n!$ is:

- [x] $\Omega(n \log n)$
- [ ] $\Omega(n^2)$
- [ ] $\Omega(n)$
- [ ] $\Omega(\log n)$
- [ ] $\Omega(n^n)$

::: hints
- Since $n! \leq n^n$, it follows that
$\log n! \leq \log n^n = n \log n$.
So that eliminates anything bigger than $n \log n$.
- There are $n$ terms in $n!$, and
you need to take the log of each of them. Since they have
some size, it has to be much more than $\log n$.
- It turns out to be worse than just $n$.
:::
::::::::::::::::::::::::::::::



:::::::::: question ::::::::::
A decision tree is:

- [x] A model for the behavior of an algorithm based on the decisions that it makes
- [ ] A tree that helps you to decide which permutation sorts the input
- [ ] A tree that searches for the lower bound for sorting
- [ ] A search tree

::: hints
- A decision tree is not a search tree.
- A decision tree is a model for behavior, not an algorithm.
:::
::::::::::::::::::::::::::::::

::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::

