
### Review questions: Analyzing problems

:::::::::::::::::::::::::::::::::::::::: quiz ::::::::::::::::::::::::::::::::::::::::

:::::::::: question ::::::::::
Answer TRUE or FALSE.

No algorithm for searching in an unsorted
array can be worse than $O(n)$ since any algorithm
must look at every value in the array in the worst case.

- [ ] True
- [x] False

::: hints
- Do you think that sequential search is the only algorithm
to search an unsorted array?
- Can't someone write a worse algorithm, perhaps by adding
unnecessary work?
:::
::::::::::::::::::::::::::::::



:::::::::: question ::::::::::
Answer TRUE or FALSE.

The lower bound in the worst case for the
problem of searching an unsorted array is $\Omega(n)$
because this is the worst case cost of the sequential search
algorithm.

- [ ] True
- [x] False

::: hints
- While it is true that sequential search
is $\Omega(n)$ in the worst case, this is not the whole story.
- Just because the best algorithm that we happen to know has
a certain cost, that does not mean that there is no better algorithm.
- The reason that search in an unsorted array has a lower
bound of $\Omega(n)$ is because we can prove that
any algorithm MUST look at every element (in some order)
in the worst case.
:::
::::::::::::::::::::::::::::::



:::::::::: question ::::::::::
Answer TRUE or FALSE.

The upper bound for a problem is defined as
the upper bound cost for the worst algorithm that we know.

- [ ] True
- [x] False

::: hints
- There is no limit to how bad someone might make an
algorithm. So this can't make sense as a definition.
:::
::::::::::::::::::::::::::::::



:::::::::: question ::::::::::
Answer TRUE or FALSE.

The upper bound for a problem is defined as
the upper bound cost for the best algorithm that we know.

- [x] True
- [ ] False

::: hints
- This comes straight from the definition for the upper bound of a problem.
:::
::::::::::::::::::::::::::::::



:::::::::: question ::::::::::
Answer TRUE or FALSE.

The lower bound for a problem is defined as
the cost of the best algorithm that we know.

- [ ] True
- [x] False

::: hints
- Just because we know some algorithm does not mean that there
does not exist some better algorithm.
- The lower bound for a problem is the best that an algorithm
COULD be, not just what we happen to know.
:::
::::::::::::::::::::::::::::::



:::::::::: question ::::::::::
Answer TRUE or FALSE.

The lower bound for a problem is defined as
the least cost that any algorithm could reach.

- [x] True
- [ ] False

::: hints
- This comes straight from the definition for the lower bound of a problem.
:::
::::::::::::::::::::::::::::::



:::::::::: question ::::::::::
Answer TRUE or FALSE.

The worst case upper bound for sorting an array
is $O(n \log n)$ since this is the cost of the best
algorithm (in the worst case) that we know about.

- [x] True
- [ ] False

::: hints
- This comes straight from the definition for problem upper bound.
:::
::::::::::::::::::::::::::::::



:::::::::: question ::::::::::
Answer TRUE or FALSE.

The lower bound of the sorting problem is $O(n \log n)$
because we can prove that this is the best cost that any sorting
algorithm could reach.

- [x] True
- [ ] False

::: hints
- This comes straight from the definition of a problem lower bound.
:::
::::::::::::::::::::::::::::::



:::::::::: question ::::::::::
Answer TRUE or FALSE.

The worst case lower bound for sorting an array
is $O(n \log n)$ since this is the cost of the best
algorithm (in the worst case) that we know about.

- [ ] True
- [x] False

::: hints
- Just because we don't know of a better algorithm does not
mean that there is no better algorithm.
- While it is true that the lower bound for sorting
is $O(n \log n)$, this is not the right reason.
- The right reason is because we can prove that no algorithm
can do better.
:::
::::::::::::::::::::::::::::::

::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::

