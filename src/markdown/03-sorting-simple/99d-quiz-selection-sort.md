
### Review questions: Selection sort

Here are some review questions to check how well you understand Selection Sort.


:::::::::::::::::::::::::::::::::::::::: quiz ::::::::::::::::::::::::::::::::::::::::

:::::::::: question ::::::::::
Answer TRUE or FALSE.

Selection sort is simple, but less efficient than the best sorting algorithms.

- [x] True
- [ ] False

::: hints
- What is Selection Sort's average case complexity?
- It is $O(n^2)$.
- Are there any better sorting algorithms?
:::
::::::::::::::::::::::::::::::



:::::::::: question ::::::::::
Answer TRUE or FALSE.

Selection Sort (as the code is written in this module)
is a stable sorting algorithm. Recall that a stable sorting
algorithm maintains the relative order of records with equal keys.

- [ ] True
- [x] False

::: hints
- Think of the behaviour of every pass through the inner
for loop of Selection Sort if two records are equal, with
the greatest value in the array.
- Which record will be selected?
- The first such record.
- Where will it be moved to?
- The last position in the array.
:::
::::::::::::::::::::::::::::::



:::::::::: question ::::::::::
Suppose that Selection Sort is given an input of 100 records,
and it has completed 37 iterations of the main loop.

How many records are now guaranteed to be in their final
position (never to be moved again by the sort)?

<input type="text" value="37"/>

::: hints
- On each pass, Selection Sort puts a record into its final position.
- So, if Selection Sort has done 37 passes, then at least 37 records are in their final positions.
:::
::::::::::::::::::::::::::::::



:::::::::: question ::::::::::
How many times does Selection Sort call the swap function on an array of $n$ records?

- [x] $n-1$
- [ ] $1$
- [ ] $n$
- [ ] $n \log n$
- [ ] $n^2$
- [ ] It depends on the order of the records

::: hints
- Selection Sort first finds the largest key in an
unsorted list, then the second largest, and so on.
- To find the next largest key value requires searching
through the entire unsorted portion of the array, but the
search itself needs no swaps.
- Once the next largest key is found, one swap is
required to put the record in place.
- We don't need to check anything on the very last pass,
since at that point the first record
must already be in place.
:::
::::::::::::::::::::::::::::::



:::::::::: question ::::::::::
In which cases are the time complexities the same for Selection Sort?

- [x] Worst, Average and Best
- [ ] Worst and Best
- [ ] Best and Average
- [ ] Worst and Average

::: hints
- Does Selection Sort's cost vary according to the order of the array input values?
- No, it does not matter what order the input values have.
:::
::::::::::::::::::::::::::::::



:::::::::: question ::::::::::
The order of the input records has what
impact on the number of comparisons required by Selection Sort
(as presented in this module)?

- [x] None
- [ ] There is a constant factor difference
- [ ] There is a big difference, the asymptotic running time can change

::: hints
- Does Selection Sort change when it make a comparison according to the order of the array input values?
- No, it does not matter what order the input values have.
:::
::::::::::::::::::::::::::::::



:::::::::: question ::::::::::
What is the worst-case time for Selection Sort to sort an array of n records?

- [x] $O(n^2)$
- [ ] $O(n)$
- [ ] $O(\log n)$
- [ ] $O(n \log n)$

::: hints
- Does Selection Sort's order and number of comparisons depend on the particular order of the input array?
- No, it does not.
- Recall that our implementation for Selection Sort will
try to swap even if the current record is in its correct location.
:::
::::::::::::::::::::::::::::::



:::::::::: question ::::::::::
What is the running time of Selection Sort
when the input is an array that has already been sorted?

- [x] $O(n^2)$
- [ ] $O(n)$
- [ ] $O(\log n)$
- [ ] $O(n \log n)$

::: hints
- Each test in the inner for loop will be the same no
matter what the order of the input array.
:::
::::::::::::::::::::::::::::::



:::::::::: question ::::::::::
What is the running time of Selection Sort
when the input is an array that has all equal values?

- [x] $O(n^2)$
- [ ] $O(n)$
- [ ] $O(\log n)$
- [ ] $O(n \log n)$

::: hints
- Each test in the inner for loop will be the same no
matter what the order of the input array.
:::
::::::::::::::::::::::::::::::



:::::::::: question ::::::::::
Which statement best characterizes
Selection Sort (as the code is written in this module)?
Recall that a stable sorting algorithm maintains the relative
order of records with equal keys.

- [x] Selection Sort is not stable, but with
minor modifications it could be made so
- [ ] Selection Sort is stable
- [ ] Selection Sort is not stable

::: hints
- Think of the behaviour of every pass through the inner
for loop of Selection Sort if two records are equal, with
the greatest value in the array.
- Which record will be selected?
- The first such record.
- It will be moved to the last position in the array, putting
it out of order with other equal-valued records.
- But we could easily change the maximum-finding part of the
loop to take the last of these equal-valued records.
:::
::::::::::::::::::::::::::::::



:::::::::: question ::::::::::
In the worst case, the total number of swaps done by Selection Sort is closest to:

- [x] $n$
- [ ] $n^2/2$
- [ ] $n^2$
- [ ] $n \log n$

::: hints
- Does Selection Sort's number of swaps depend on the particular order of the input array?
- No, it does not.
- Recall that our implementation for Selection Sort will
try to swap even if the current record is in its correct location.
:::
::::::::::::::::::::::::::::::



:::::::::: question ::::::::::
When is Selection Sort a good choice to use for sorting an array?

- [x] When the cost of a swap is large, such as when the records are large
- [ ] When each component of the array requires a small amount of memory
- [ ] When the array has only a few elements out of place
- [ ] None of these answers

::: hints
- The big advantage of Selection Sort is that it keeps the number of swaps small.
- So it will make best use of this advantage when the cost to swap is large.
:::
::::::::::::::::::::::::::::::



:::::::::: question ::::::::::
In the worst case, the total number of comparisons for Selection Sort is closest to:

- [x] $n^2/2$
- [ ] $n$
- [ ] $n-1$
- [ ] $n^2$
- [ ] $n^2/4$

::: hints
- Selection Sort's implementation is made up of two nested for loops.
- The outer for loop is executed $n-1$ times.
- The inner for loop is executed $n-i$ times.
- The total cost is the sum of $i$'s for $i$ goes from 1 to $n$.
:::
::::::::::::::::::::::::::::::

::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::

