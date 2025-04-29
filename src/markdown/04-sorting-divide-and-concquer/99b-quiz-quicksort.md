
:::::::::::::::::::::::::::::::::::::::: quiz ::::::::::::::::::::::::::::::::::::::::
### Review questions: Quicksort {-}


:::::::::: question ::::::::::
Answer TRUE or FALSE.

Quicksort (as the code is written in this chapter)
is a stable sorting algorithm. Recall that a stable sorting
algorithm maintains the relative order of records with equal keys.

- [ ] True
- [x] False

::: hints
- Think of the behavior for partition if there are two equal key values in the array.
- Is it possible for the two equal keys to reverse positions?
:::
::::::::::::::::::::::::::::::



:::::::::: question ::::::::::
On average, how many comparisons does Quicksort require to sort 1000 records
(to the nearest 1000 comparisons)?

<input type="text" value="10000" placeholder="Round to nearest 1000"/>

::: hints
- What is Quicksort's average case running time?
- It is $O(n \log_2 n)$
- This means about $10 \cdot 1000$ comparisons are required
:::
::::::::::::::::::::::::::::::



:::::::::: question ::::::::::
If it takes a given computer one second on average to run Quicksort
on an array of 1000 records, how long (to the nearest thousand seconds)
will it take to run Quicksort on 1,000,000 records?

(Hint: You know from this statement that
the machine can do about 10,000 comparisons per second.
To get the answer, you first need to compute about how many
total comparisons 1,000,000 records will require.)

<input type="text" value="2000" placeholder="Round to nearest 1000"/>

::: hints
- What is Quicksort's average case running time?
- It is $O(n \log_2 n)$
- This means $10 \cdot 1000$ instructions ran in one second for an input of 1000 records
- What is $n \log_2 n$ when $n = 1,000,000$?
- It is about $20 \cdot 1,000,000$
- How many seconds is $20,000,000/10,000$?
:::
::::::::::::::::::::::::::::::



:::::::::: question ::::::::::
In which cases are the time complexities the same for Quicksort?

- [x] Best and Average only
- [ ] Worst and Best only
- [ ] Worst and Average only
- [ ] Worst, Average, and Best

::: hints
- There are a few really bad inputs.
- While there are a few bad inputs, they are so few as to not affect the average or best cases.
:::
::::::::::::::::::::::::::::::



:::::::::: question ::::::::::
The order of the input records has what
impact on the number of comparisons required by Quicksort
(as presented in this chapter)?

- [x] There is a big difference, the asymptotic running time can change
- [ ] None
- [ ] There is a constant factor difference

::: hints
- Does Quicksort change when it make a comparison according to the order of the array input values?
- Yes, the order of input can change a lot about Quicksort's behavior.
:::
::::::::::::::::::::::::::::::



:::::::::: question ::::::::::
What is the worst-case cost for Quicksort to sort an array of n elements?

- [x] $O(n^2)$
- [ ] $O(n)$
- [ ] $O(\log n)$
- [ ] $O(n \log n)$

::: hints
- There are a few really bad inputs.
- The bad cases have pivots that repeatedly reduce the partition size by one.
- That leads to a series of partition sizes of $n-1$, $n-2>$, and so on.
- Since the time to process a partition is linear on its size, this in turn leads to a cost for the whole algorithm
that is the sum of $i$ from 2 to $n-1$, that you should be very familiar with.
:::
::::::::::::::::::::::::::::::



:::::::::: question ::::::::::
What is the best-case cost for Quicksort to sort an array of n elements?

- [x] $O(n \log n)$
- [ ] $O(n)$
- [ ] $O(\log n)$
- [ ] $O(n^2)$

::: hints
- While there are a few bad inputs, they are so few as to not affect the best case.
- The best thing that can happen is that every pivot split its partition in half.
:::
::::::::::::::::::::::::::::::



:::::::::: question ::::::::::
A disadvantage of Quicksort is:

- [x] Its worst-case running time is $O(n^2)$
- [ ] It needs an extra array for auxilliary storage
- [ ] It is stable
- [ ] Its average-case running time is $O(n^2)$

::: hints
- How does Quicksort do in the worst case?
- It requires $O(n^2)$, which is pretty bad.
:::
::::::::::::::::::::::::::::::



:::::::::: question ::::::::::
(For the version of the algorithm as presented in this chapter)
What is the running time of Quicksort when the input is an array where all record values are equal?

- [x] $O(n^2)$
- [ ] $O(n)$
- [ ] $O(\log n)$
- [ ] $O(n \log n)$
- [ ] $O(n ^ n)$

::: hints
- What does the partition step do?
- It splits the array into a partition with all values on one side.
- This is very bad.
:::
::::::::::::::::::::::::::::::



:::::::::: question ::::::::::
Quicksort's worst-case case cost is $O(n^2)$ and its
average-case cost is $O(n \log n)$. This means that
the fraction of input cases with cost $O(n^2)$ must:</p>

- [x] Drop as $n$ grows
- [ ] Never happen
- [ ] Happen only once
- [ ] Be less than half
- [ ] Be less than 1 in $n$
- [ ] Be less than 1 in $n!$

::: hints
- For any size $n$, it does happen that there are
inputs that have cost $n^2$.
- But if there were a constant fraction of such cases
regardless of $n$, then the average would also be $n^2$.
- So the fraction must be be dropping as $n$ grows.
:::
::::::::::::::::::::::::::::::



:::::::::: question ::::::::::
After Quicksort completes the partition function, where is the pivot?

- [x] The last position in the partition
- [ ] Between the smaller values and the greater values in the partition
- [ ] The first position in the partition
- [ ] The middle position in the partition

::: hints
- When partition is called, the pivot is at the end of the partition.
- The partition operation itself does not move the pivot.
That is done afterwards by the Quicksort function itself.
:::
::::::::::::::::::::::::::::::



:::::::::: question ::::::::::
What is the worst-case cost for Quicksort's partition step?

- [x] $O(n)$
- [ ] $O(n^2)$
- [ ] $O(\log n)$
- [ ] $O(n \log n)$

::: hints
- Partition moves indices inwards until the meet.
- Each step either swaps or moves indices.
- No record can swap more than once, and the total number of
index moves can only be the length of the partition.
:::
::::::::::::::::::::::::::::::



:::::::::: question ::::::::::
When selecting a pivot value, a simple thing
to do is to always pick from the same place in the
partition. If we use this approach, does it matter whether we
always pick from the first position in the partition, the last
position in the partition, or the middle position in the partition?

- [x] It is much better to pick the middle value
- [ ] It is much better to pick the first value
- [ ] It is much better to pick the last value
- [ ] It doesn't really matter, they are all equally good or bad

::: hints
- If you pick the first or last one, then sorted input will give the worst case performance.
- If you pick the middle value, then it is still possible to get worst-case performance.
- But to do so requires a very specific and unusual permuation that will normally occur very rarely.
- If all permuations were equally likely, then it wouldn't matter.
But in practice, the sorted input is much more likely to occur.
:::
::::::::::::::::::::::::::::::



:::::::::: question ::::::::::
When is Quicksort a good choice for sorting an array?

- [x] In most standard situations where you want to sort many records
- [ ] Each record requires a large amount of memory
- [ ] Each record requires a small amount of memory
- [ ] The processor speed is fast
- [ ] We need a reasonably fast algorithm with a good worst case

::: hints
- Quicksort doesn't change its performance based on record size.
- What are Quicksort's average and worst case costs?
- Quicksort's strength is its average case cost, not its worst case cost.
:::
::::::::::::::::::::::::::::::

::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::

