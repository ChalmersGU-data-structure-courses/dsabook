
### Review questions: Exchange sort

:::::::::::::::::::::::::::::::::::::::: quiz ::::::::::::::::::::::::::::::::::::::::

:::::::::: question ::::::::::
Answer TRUE or FALSE.

Consider an array $A$ of $n$ records each with a unique key value,
and $A_R$ the same array in reverse order.
Any given pair of records must be an inversion
in exactly one of $A$ or $A_R$.

- [x] True
- [ ] False

::: hints
- Any given pair of records with different values is either in order, or not in order.
- Being out of order is called an inversion.
- If your pair is in order in some array, then it must be out of order in the reverse.
:::
::::::::::::::::::::::::::::::



:::::::::: question ::::::::::
Answer TRUE or FALSE.

Consider an array $A$ of $n$ records each with a unique key value,
and $A_R$ the same array in reverse order.
There are a certain number of pairs, where an arbitrary
position $i$ and position $j$ is a pair.
Between these two arrays, exactly half of these pairs must be
inverted.

- [ ] True
- [x] False

::: hints
- Any given pair of records with different key values is either in order, or not in order.
- Being out of order is called an inversion.
- Any given pair must be inverted in exactly one of these arrays.
- So every pair must be inverted in either $A$ or $A_R$.
:::
::::::::::::::::::::::::::::::



:::::::::: question ::::::::::
The average number of inversions in an array
of $n$ records is $n(n-1)/4$. This is:

- [x] $O(n^2)$
- [ ] Better than $O(n^2)$
- [ ] Worse than $O(n^2)$

::: hints
- $n(n-1)/4 = n^2/4 - n/4$.
- From the rules on asymptotic analysis, $O(n^2/4 - n/4)$ is $O(n^2)$
:::
::::::::::::::::::::::::::::::



:::::::::: question ::::::::::
An exchange sort is:

- [x] Any sort where only adjacent records are swapped
- [ ] Any sort where records are swapped rather than using another mechanism for rearranging the array
- [ ] Another name for Insertion sort
- [ ] Any $O(n^2)$ sort
- [ ] Any $O(n)$ sort

::: hints
- Most of the sorts that we study swap records.
- Insertion sort is not the only exchange sort.
- An "exchange" means a swap of adjacent records.
:::
::::::::::::::::::::::::::::::



:::::::::: question ::::::::::
An inversion is:

- [x] When a record with key value greater than
the current record's key appears before it in the array
- [ ] A swap
- [ ] A type of sort

::: hints
- We have not used "inversion" to refer to a type of sort.
- While "inversions" are related to swaps (since ultimately
a swap is needed to undo an inversion), it is not a swap.
- Inversion refers to an instance of a record being out of order.
:::
::::::::::::::::::::::::::::::



:::::::::: question ::::::::::
How many ways can $n$ distinct values be arranged?

- [x] $n!$
- [ ] $n^2$
- [ ] $2^n$
- [ ] $n$
- [ ] $n(n+1)/2$

::: hints
- There are $n$ ways to pick the first record.
- That leaves $n-1$ ways to pick the second record.
- This means that there are $n * (n-1)$ ways to pick the first two records.
- And so on.
:::
::::::::::::::::::::::::::::::



:::::::::: question ::::::::::
If I is the number of inversions in an input array of n records,
then Insertion sort will require how many swaps?

- [x] $I$
- [ ] $n - I$
- [ ] $I - n$
- [ ] $n$
- [ ] $n^2/2$
- [ ] $I + n$
- [ ] $I - 1$
- [ ] $n - 1$

::: hints
- An inversion requires a swap to undo it.
- The number of comparisons done by an algorithm is generally different from the number of swaps.
:::
::::::::::::::::::::::::::::::



:::::::::: question ::::::::::
The total number of pairs of records among $n$ records is:

- [x] $n(n-1)/2$
- [ ] $n^2/2$
- [ ] $n$
- [ ] $2n$
- [ ] $2n^2$
- [ ] $n \log n$
- [ ] $n!$
- [ ] $n!/2$
- [ ] $n(n+1)/2$

::: hints
- There are $n$ ways to pick the first record in the pair.
- This leaves $n-1$ ways to pick the second record.
- We consider pair (A, B) to be the same as pair (B, A).
:::
::::::::::::::::::::::::::::::

::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::

