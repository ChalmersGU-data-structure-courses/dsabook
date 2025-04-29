
:::::::::::::::::::::::::::::::::::::::: quiz ::::::::::::::::::::::::::::::::::::::::
### Review questions: Common misunderstandings {-}


:::::::::: question ::::::::::
Answer TRUE or FALSE.

For all algorithms, if we completely
understand the running time analysis, then the upper bound
and lower bound will be the same.

- [x] True
- [ ] False

::: hints
- Upper and lower bounds are only different when we do not
completely understand the cost for the algorithm.
:::
::::::::::::::::::::::::::::::


<!--
:::::::::: question ::::::::::
Answer TRUE or FALSE.

The upper bound and lower bounds of the
sequential search algorithm is in $O(n)$
and $\Omega(n)$ respectively.


- [ ] True
- [x] False

::: hints
- Is this statement complete?
- To make this statement correct, you need to add in which
case you are measuring the lower and upper bounds.
- This would be true for the worst case, but not the best case.
:::
::::::::::::::::::::::::::::::
-->


:::::::::: question ::::::::::
Answer TRUE or FALSE.

The worst case for sequential search occurs
when the last element of the array is the value being
searched for.

- [x] True
- [ ] False

::: hints
- Worst case cost refers to the most expensive problem instance
AS THE INPUT GETS BIG.
- Since, for any given array (regardless of size), the most
expensive problem instance occurs when the search value is in
the last position of the array, this is indeed the worst case.
:::
::::::::::::::::::::::::::::::


<!--
:::::::::: question ::::::::::
Answer TRUE or FALSE.

The lower bound for the cost of sequential search
is $\Omega(1)$ since this is the running
time of the algorithm in the best case.

- [ ] True
- [x] False

::: hints
- Upper/lower bounds define the growth rate in a particular
situation (such as worst or best case).
- So the statement is badly worded.
- Proper wording: The lower bound for the cost of sequential search in
the best case is $\Omega(1)$.
:::
::::::::::::::::::::::::::::::
-->


:::::::::: question ::::::::::
Answer TRUE or FALSE.

The best case for the sequential search
algorithm occurs when the array has only a single element.


- [ ] True
- [x] False

::: hints
- Best case cost refers to a best problem instance
AS THE INPUT GETS BIG.
- So it makes no sense to talk about a growth rate or a best
case of a fixed input size.
- The best case for sequential search occurs when the first
element of the array (for whatever size) is the value being
searched for.
:::
::::::::::::::::::::::::::::::



:::::::::: question ::::::::::
Answer TRUE or FALSE.

The worst case for the sequential search
algorithm occurs when the array size tends to infinity.

- [ ] True
- [x] False

::: hints
- Worst case cost refers to the most expensive problem
instance AS THE INPUT GETS BIG.
- That is, worst case does not refer to what the input size it.
- It refers to which input of a particular size is the worst one.
- The worst case for sequential search occurs when the last
element of the array (for whatever size) is the value being
searched for.
:::
::::::::::::::::::::::::::::::

::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::

