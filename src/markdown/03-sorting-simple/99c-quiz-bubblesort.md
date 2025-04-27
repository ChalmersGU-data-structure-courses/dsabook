
### Review questions: Bubble sort

Here are some review questions to check your understanding of Bubble sort.

:::::::::::::::::::::::::::::::::::::::: quiz ::::::::::::::::::::::::::::::::::::::::

:::::::::: question ::::::::::
Answer TRUE or FALSE.

Bubble sort (as the code is written in this chapter) is a stable sorting algorithm.

(Recall that a stable sorting algorithm maintains the relative order of equal elements.)

- [x] True
- [ ] False

::: hints
- Remember that: Bubble sort consists of a simple double for loop.
- The first iteration of the inner for loop moves through
the array from bottom to top, comparing adjacent elements.
- If the lower-indexed element is greater than its
higher-indexed neighbor, then the two are swapped.
:::
::::::::::::::::::::::::::::::



:::::::::: question ::::::::::
In which cases are the time complexities the
same for Bubble sort (as the algorithm is presented in this chapter)?

- [x] Worst, Average and Best
- [ ] Worst and Best
- [ ] Best and Average
- [ ] Worst and Average

::: hints
- Does Bubble sort's cost vary according to the order of the array input values?
- No, it does not matter what order the input values have.
:::
::::::::::::::::::::::::::::::



:::::::::: question ::::::::::
The order of the input records has what
impact on the number of comparisons required by Bubble sort
(as presented in this chapter)?

- [x] None.
- [ ] There is a constant factor difference.
- [ ] There is a big difference, the asymptotic running time can change.

::: hints
- Does Bubble sort change when it make a comparison
according to the order of the array input values?
- No, it does not matter what order the input values have.
:::
::::::::::::::::::::::::::::::



:::::::::: question ::::::::::
What is the worst-case time for
Bubble sort (as the algorithm is presented in this chapter)
to sort an array of $n$ records?

- [x] $O(n^2)$
- [ ] $O(n)$
- [ ] $O(\log n)$
- [ ] $O(n \log n)$
- [ ] $O(n^n)$

::: hints
- Does Bubble sort's number of comparisons depend on the particular order of the input array?
- No, it does not.
:::
::::::::::::::::::::::::::::::



:::::::::: question ::::::::::
What is the running time of Bubble sort
when the input is an array where all elements are equal?

- [x] $O(n^2)$
- [ ] $O(n)$
- [ ] $O(\log n)$
- [ ] $O(n \log n)$

::: hints
- Each comparison test in the inner for loop will fail
because the value at position $i$ is never less
than the value at position $i-1$.
- However, this observation does not affect the number of
comparisons to be made, it only affects the number of swaps.
:::
::::::::::::::::::::::::::::::



:::::::::: question ::::::::::
What is the running time for Bubble sort
when the input array has values that are in reverse sort order?

- [x] $O(n^2)$
- [ ] $O(n)$
- [ ] $O(\log n)$
- [ ] $O(n \log n)$

::: hints
- On each iteration, the $i$th record will have to move to the start of the array.
- This is the worst case.
:::
::::::::::::::::::::::::::::::



:::::::::: question ::::::::::
What is the running time of Bubble sort
(as the algorithm is presented in this chapter)
when the input is an array that has already been sorted?

- [x] $O(n^2)$
- [ ] $O(n)$
- [ ] $O(\log n)$
- [ ] $O(n \log n)$

::: hints
- Each test in the inner for loop will fail because the
value at position $i$ is never less than the
value at position $i-1$.
:::
::::::::::::::::::::::::::::::



:::::::::: question ::::::::::
When is Bubble sort a good choice for sorting an array?

- [x] There is no situation where Bubble
sort is the best choice over all of the others in this chapter.
- [ ] Each component of the array requires a large amount of memory.
- [ ] Each component of the array requires a small amount of memory.
- [ ] The array has only a few items out of place.

::: hints
- Does Bubble sort's cost vary with how much the input is out of order?
- Bubble sort always does a lot of work, as compared to other sorting algorithms.
:::
::::::::::::::::::::::::::::::



:::::::::: question ::::::::::
In the worst case, the total number of
comparisons for Bubble sort is closest to:

- [x] $n^2/2$
- [ ] $n$
- [ ] $n^2$
- [ ] $n/2$
- [ ] $n/4$
- [ ] $2n^2$
- [ ] $2n$
- [ ] $n^2/4$

::: hints
- Bubble sort's implementation is made up of two nested for loops.
- The outer for loop is executed $n-1$ times.
- The inner for loop is executed $i$ times.
- The total cost is the sum of $i$'s for $i$ goes from 1 to $n$.
:::
::::::::::::::::::::::::::::::

::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::

