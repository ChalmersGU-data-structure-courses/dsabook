
### Review questions: Insertion sort

:::::::::::::::::::::::::::::::::::::::: quiz ::::::::::::::::::::::::::::::::::::::::

:::::::::: question ::::::::::
Answer TRUE or FALSE.

Insertion sort (as the code is written in this
chapter) is a stable sorting algorithm. Recall that a stable sorting
algorithm maintains the relative order of records with equal keys.

- [x] True
- [ ] False

::: hints
- Think of the behavior of every pass through the inner for loop of the insertion sort if keys are equal.
:::
::::::::::::::::::::::::::::::



:::::::::: question ::::::::::
When implementing Insertion sort, a binary search could be used to locate the position within
the first $i-1$ records of the array into which record $i$ should be inserted. Using binary search will:

- [x] Not speed up the asymptotic running time because shifting the records to make room for the insert will require $O(i)$ time.
- [ ] Speed up the asymptotic running time because the position to insert will be found in $O(\log i)$ time.
- [ ] Speed up the asymptotic running time because shifting the records to make room for the insert will require $O(i)$ time.
- [ ] None of these answers is correct.

::: hints
- The position at which to insert could be found in $O(\log(i))$ steps, but shifting the records to make room for the this record will require $O(i)$ time.
:::
::::::::::::::::::::::::::::::



:::::::::: question ::::::::::
When implementing Insertion sort, a binary
search could be used to locate the position within the first $i-1$
records of the array into which record $i$ should be
inserted. In this implementation, the worst case time will be:

- [x] $O(n^2)$
- [ ] $O(n \log n)$
- [ ] $O(n)$
- [ ] $O(\log n)$

::: hints
- The position to insert could be found in $O (\log i)$,
but shifting the records to makeroom for the insert will still require $O(i)$ time
:::
::::::::::::::::::::::::::::::



:::::::::: question ::::::::::
We know that the worst case for Insertion sort is about $n^2/2$, while the average case is
about $n^2/4$. This means that:

- [ ] The growth rates are the same
- [ ] The runtime in the average case is about half that of the worst case
– [x] Both of the above
- [ ] None of the above

::: hints
- Growth rates ignore constants.
:::
::::::::::::::::::::::::::::::



:::::::::: question ::::::::::
In which cases are the growth rates the same for Insertion sort?

- [x] Worst and Average only
- [ ] Worst and Best only
- [ ] Best and Average only
- [ ] Worst, Average, and Best

::: hints
- Insertion sort is really cheap in the best case.
- Its average and worst case times differ by a constant factor.
:::
::::::::::::::::::::::::::::::



:::::::::: question ::::::::::
The order of the input records has what impact on the number of comparisons
required by Insertion sort (as presented in this chapter)?

- [x] There is a big difference, the asymptotic running time can change
- [ ] None
- [ ] There is a constant factor difference

::: hints
- Does Insertion sort change when it make a comparison according to the order of the array input values?
- Yes, Insertion sort might stop early or might look at many records.
:::
::::::::::::::::::::::::::::::



:::::::::: question ::::::::::
What is the {average|worst}-case time for Insertion sort to sort an array of n records?

- [x] $O(n^2)$
- [ ] $O(n)$
- [ ] $O(\log n)$
- [ ] $O(n \log n)$

::: hints
- In the worst case, each record must make its way to the
start of the array. This would occur if the record values are
initially arranged from highest to lowest, in the reverse
of sorted order.
- In this case, the number of comparisons will be one the
first time through the for loop, two the second time, and
so on.
:::
::::::::::::::::::::::::::::::



:::::::::: question ::::::::::
What is the best-case time for Insertionsort to sort an array of n records?

- [x] $O(n)$
- [ ] $O(n^2)$
- [ ] $O(\log n)$
- [ ] $O(n \log n)$

::: hints
- The best-case cost occurs when the records are already in sorted order from lowest to highest.
- In this case, every test on the inner for loop will fail immediately, and no records will be moved.
:::
::::::::::::::::::::::::::::::



:::::::::: question ::::::::::
What is the running time of Insertion sort when the input is an array where all record values are equal?

- [x] $O(n)$
- [ ] $O(n^2)$
- [ ] $O(\log n)$
- [ ] $O(n \log n)$
- [ ] $O(n ^ n)$

::: hints
- Each test in the inner for loop will fail because the
value at position $i$ is never less than the
value at position $i-1$.
:::
::::::::::::::::::::::::::::::



:::::::::: question ::::::::::
If $I$ is the number of
inversions in an input array of $n$ records,
then Insertion sort will run in what time?

- [x] $O(n+I)$
- [ ] $O(n - I)$
- [ ] $O(I - n)$
- [ ] $O(n)$
- [ ] $O(n^2)$
- [ ] $O(I)$

::: hints
- Insertion sort has to do $n$ passes where it compares at least once.
- If the record for this pass has no remaining inversions, then it requires no work.
- But if it does have inversions, it will need a swap for each such inversion.
:::
::::::::::::::::::::::::::::::



:::::::::: question ::::::::::
What is the running time for Insertion sort when the input array has values that are in reverse sort order?

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
What is the running time of Insertion sort when the input is an array that has already been sorted?

- [x] $O(n)$
- [ ] $O(n^2)$
- [ ] $O(\log n)$
- [ ] $O(n \log n)$

::: hints
- Each test in the inner for loop will fail because the
value at position $i$ is never less than the
value at position $i-1$.
:::
::::::::::::::::::::::::::::::



:::::::::: question ::::::::::
When is Insertion sort a good choice for sorting an array?

- [x] The array has only a few records out of sorted order
- [ ] Each record requires a large amount of memory
- [ ] Each record requires a small amount of memory
- [ ] The processor speed is fast
- [ ] The array contains many records
- [ ] None of these situations
- [ ] We need a reasonably fast algorithm with a good worst case

::: hints
- Remember that insertion sort implementation is made up
of two nested for loops.
- The outer for loop is executed $n-1$ times.
While the number of times the inner for loop executes depends
on how many keys in positions 0 to $i-1$ have a
value less than that of the key in position i.
:::
::::::::::::::::::::::::::::::



:::::::::: question ::::::::::
When is Insertion sort a good choice for sorting an array?

- [x] The array contains only a few records
- [ ] Each record requires a large amount of memory
- [ ] Each record requires a small amount of memory
- [ ] The processor speed is fast
- [ ] The array contains many records
- [ ] None of these situations

::: hints
- Insertion sort if fairly simple.
- Because Insertion sort is simple, it tends to cost only a
little bit per comparison when compared to more complicated
sorting algorithms.
:::
::::::::::::::::::::::::::::::



:::::::::: question ::::::::::
In the worst case, the total number of comparisons for Insertion sort is closest to:

- [x] $n^2/2$
- [x] $n$
- [x] $n^2$
- [x] $n \log n$

::: hints
- Insertion sort's implementation is made up of two nested for loops.
- The outer for loop is executed $n-1$ times.
- The inner for loop is executed $i$ times.
- The total cost is the sum of $i$'s for $i$ goes from 1 to $n$.
:::
::::::::::::::::::::::::::::::

::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::

