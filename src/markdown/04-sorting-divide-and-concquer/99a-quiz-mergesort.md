
:::::::::::::::::::::::::::::::::::::::: quiz ::::::::::::::::::::::::::::::::::::::::
### Review questions: Mergesort


:::::::::: question ::::::::::
Answer TRUE or FALSE.

Mergesort (as the code is written in this chapter)
is a stable sorting algorithm. Recall that a stable sorting
algorithm maintains the relative order of records with equal keys.

- [x] True
- [ ] False

::: hints
- What happens when two equal values are compared during merge?
:::
::::::::::::::::::::::::::::::


<!--
:::::::::: question ::::::::::
Answer TRUE or FALSE.

Mergesort is easier to implement when operating on a linked list than on an array.

- [x] True
- [ ] False

::: hints
- Look at the length of the code given in the chapter.
- There are a lot of details to deal with when implementing Mergesort on an array.
:::
::::::::::::::::::::::::::::::
-->


:::::::::: question ::::::::::
You must merge 2 sorted lists of
size $m$ and $n$, respectively.
The number of comparisons needed in the worst case by the
merge algorithm will be:

- [x] $m+n-1$
- [ ] $mn$
- [ ] $\max(m,n)$
- [ ] $\min(m,n)$
- [ ] $m+n$

::: hints
- Each comparison puts one record in the final sorted array.
- You don't compare when there is only one record.
:::
::::::::::::::::::::::::::::::



:::::::::: question ::::::::::
What is the most complicated part of the Mergesort algorithm?

- [x] Merging the sorted halves back together
- [ ] Finding the midpoint
- [ ] Partitioning the array
- [ ] Achieving the base case

::: hints
- There is no partition in Mergesort.
- The two main parts of Mergesort are splitting and merging.
- Splitting is easy -- just cut the list into two halves.
- Merging is not hard, but it is more complicated than splitting.
:::
::::::::::::::::::::::::::::::


<!--
:::::::::: question ::::::::::
Mergesort works by splitting a list of $n$
numbers in half, then sorting each half recursively, and
finally merging the two halves.
Which of the following list implementations would allow
Mergesort to work in $O(n \log n)$ time?

*Multiple choices are possible!*

- [x] A singly linked list
- [x] A doubly linked list
- [x] An array
- [ ] None of them


::: hints
We have an implementation that works on arrays.
It is also easy to do this on linked lists.
It works fine on both singly and doubly lined lists.
:::
::::::::::::::::::::::::::::::
-->


:::::::::: question ::::::::::
In which cases are the time complexities the same for Mergesort?

- [x] Worst, Average and Best
- [ ] Worst and Best
- [ ] Best and Average
- [ ] Worst and Average


::: hints
- Does Mergesort's cost vary according to the order of the array input values?
- No, it does not matter what order the input values have.
:::
::::::::::::::::::::::::::::::



:::::::::: question ::::::::::
The order of the input records has what
impact on the number of comparisons required by Mergesort
(as presented in this chapter)?

- [x] None
- [ ] There is a constant factor difference
- [ ] There is a big difference, the asymptotic running time can change


::: hints
- Does Mergesort change when it make a comparison according
to the order of the array input values?
- No, it does not matter what order the input values have.
:::
::::::::::::::::::::::::::::::



:::::::::: question ::::::::::
What is the worst-case time for Mergesort to sort an array of $n$ records?

- [x] $O(n \log n)$
- [ ] $O(n)$
- [ ] $O(\log n)$
- [ ] $O(n^2)$
- [ ] $O(n^n)$


::: hints
- Does Mergesort's number of comparisons depend on the particular order of the input array?
- No, it does not.
:::
::::::::::::::::::::::::::::::



:::::::::: question ::::::::::
What is the running time of Mergesort
when the input is an array where all record values are equal?

- [x] $O(n \log n)$
- [ ] $O(n^2)$
- [ ] $O(\log n)$
- [ ] $O(n ^ n)$
- [ ] $O(n)$

::: hints
- Does Mergesort's number of comparisons depend on the particular order of the input array?
- No, it does not.
:::
::::::::::::::::::::::::::::::



:::::::::: question ::::::::::
When is Mergesort a good choice for sorting an array?

- [x] We need a reasonably fast algorithm with a good worst case cost
- [ ] Each record requires a large amount of memory
- [ ] Each record requires a small amount of memory
- [ ] The processor speed is fast
- [ ] The array contains many records
- [ ] We need good best-case running time
- [ ] None of these situations

::: hints
- Does Mergesort's number of comparisons depend on the particular order of the input array?
- No, it does not.
- This makes it reliable in the worst case.
:::
::::::::::::::::::::::::::::::



:::::::::: question ::::::::::
In the worst case, the total number of comparisons for Mergesort is closest to:
- [x] $n \log n$
- [ ] $n$
- [ ] $n^2$
- [ ] $n^2/2$

::: hints
- What is the asymptotic cost of Mergesort?
- Only one of these answers looks like the asymptotic cost.
:::
::::::::::::::::::::::::::::::



:::::::::: question ::::::::::
The array-based implementation for Mergesort uses how many arrays?

- [x] $2$
- [ ] $1$
- [ ] $n$
- [ ] $\log n$

::: hints
There are $\log n$ passes.
But the implementation is careful to reuse the auxilliary array rather than make a new one on each pass.
So Mergesort requires the original array and an auxilliary array.
:::
::::::::::::::::::::::::::::::

::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::

