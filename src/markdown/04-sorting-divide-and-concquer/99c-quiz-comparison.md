
:::::::::::::::::::::::::::::::::::::::: quiz ::::::::::::::::::::::::::::::::::::::::
### Review questions: Comparison of sorting algorithms

Here are a few multiple choice questions that ask you to compare the
sorting algorithms that we learned about in the last two chapters.


:::::::::: question ::::::::::
Answer TRUE or FALSE.

Selection sort is generally faster than the Bubble sort on the same input.

- [x] True
- [ ] False

::: hints
- Selection sort can be viewed as an optimisation of Bubble sort.
- On each pass, Selection sort just picks out the next record,
while Bubble sort has to do a lot of swapping.
:::
::::::::::::::::::::::::::::::



:::::::::: question ::::::::::
How are Selection sort and Quicksort similar?

- [x] They can both swap non-adjacent records
- [ ] They are both $O(n \log n)$ sorts
- [ ] They both use divide-and-conquer
- [ ] Both have quadratic average case time

::: hints
- Does Selection sort use divide-and-conquer? No.
- Can Selection sort run in $O(n \log n)$ time? No.
- How long does Quicksort need in the average case?
- $O(n \log n)$
:::
::::::::::::::::::::::::::::::



:::::::::: question ::::::::::
(For the implementations as presented in this chapter:)
Which of the following sorts is not stable?

- [x] Quicksort
- [ ] Insertion sort
- [ ] Mergesort

::: hints
- Which of the mentioned algorithms will not maintain the
relative order of records with equal keys?
:::
::::::::::::::::::::::::::::::


<!--
:::::::::: question ::::::::::
Which sorting algorithm makes use of Insertion sort's best case behaviour?

- [x] Shellsort
- [ ] Heapsort
- [ ] Radix sort
- [ ] Mergesort

::: hints
- Which algorithm works by performing a series of Insertion sorts on carefully selected sublists?
:::
::::::::::::::::::::::::::::::
-->


:::::::::: question ::::::::::
What do we call the property of a sorting
algorithm that gaurantees that records with the same key value
occur in the same order in the sorted list as in the original,
unsorted list?

- [x] Stable
- [ ] Consistent
- [ ] External
- [ ] Linear

::: hints
- "Linear" refers to an algorithm cost.
- "External" refers to an algorithm to sort records on disk.
- "Consistent" is not standard terminology related to sorting.
- "Stable" sorting algorithms preserve the relative order of equal-valued keys.
:::
::::::::::::::::::::::::::::::



:::::::::: question ::::::::::
A person sorting a hand of cards might reasonably use which sorting algorithm?

- [x] Insertion sort
- [ ] Bubble sort
- [ ] Quicksort
- [ ] Mergesort

::: hints
- Think about each algorithm in turn, and imagine yourself trying to use it for sorting a hand of cards.
- If you pick up the first two cards you might put them in order, then pick up the next card, and so on.
- Or you might pick up all the cards to start, but then still sort them from left to right.
- What sorting algorithm resembles this procedure?
:::
::::::::::::::::::::::::::::::



:::::::::: question ::::::::::
Consider what happens if someone
accidently calls sort on a file that is already sorted.
Which of the following sorting methods will be the most
efficient if the input is already in sorted order?

- [x] Insertion sort
- [ ] Bubble sort
- [ ] Selection sort
- [ ] Mergesort

::: hints
- Which algorithm will make an iteration "quit early"
depending on the values seen during comparisons?
:::
::::::::::::::::::::::::::::::



:::::::::: question ::::::::::
Which of the following sorting methods will be best
if the number of swaps done is the only measure of efficiency?

- [x] Selection sort
- [ ] Bubble sort
- [ ] Insertion sort
- [ ] Mergesort
- [ ] Quicksort

::: hints
- This sorting algorithms finds the minimum value, swaps it
with the value in the first position, and repeats these steps
for the remainder of the list.
- It does no more than $n$ swaps.
:::
::::::::::::::::::::::::::::::



:::::::::: question ::::::::::
Which of the following sorting algorithms has a worst case complexity of
$O(n \log n)$?

- [x] Mergesort
- [ ] Bubble sort
- [ ] Selection sort
- [ ] Insertion sort
- [ ] Quicksort

::: hints
- Bubble sort, Insertion sort, and Selection sort are
referred to as "quadratic sorts" because of their worst-case time cost.
- Quicksort's worst-case behaviour comes when the pivot is chosen badly.
:::
::::::::::::::::::::::::::::::



:::::::::: question ::::::::::
When Mergesort merges two sorted lists of sizes $m$ and $n$
into a sorted list of size $m+n$, it requires how many comparisons in the worst case?

- [x] $m+n-1$
- [ ] $m+n$
- [ ] $m$
- [ ] $n$
- [ ] $n+1$
- [ ] $O(\log m + \log n)$
- [ ] $O(\log m + \log n + 1)$

::: hints
- Merging compares two records, and selects the smaller.
- Each record gets selected once, and each selection requires a comparison.
- However, the last record does not need a comparison to be
selected because there is no longer anything to compare it to.
:::
::::::::::::::::::::::::::::::

::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::

