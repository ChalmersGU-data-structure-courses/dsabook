
:::::::::::::::::::::::::::::::::::::::: quiz ::::::::::::::::::::::::::::::::::::::::
### Review questions: Heapsort


:::::::::: question ::::::::::
Answer TRUE or FALSE.

Heapsort (as the code is written in this
chapter) is a stable sorting algorithm. Recall that a stable sorting
algorithm maintains the relative order of records with equal keys.

- [ ] True
- [x] False

::: hints
- What happens when two equal values are in separate branches of the tree?
- Can the one appearing later in the array move up in the tree?
:::
::::::::::::::::::::::::::::::



:::::::::: question ::::::::::
A disadvantage of Heapsort is:

- [x] It is not stable (i.e., records with
equal keys might not remain in the same order after sorting)
- [ ] It needs a lot of auxilliary storage
- [ ] Its average case running time is $O(n^2)$
- [ ] None of these answers

::: hints
- Heapsort does not need auxilliary storage.
- Heapsort runs in $O(n \log n)$ time.
- Equal-valued records might be in different sides of the
heap, and can get out of relative order.
:::
::::::::::::::::::::::::::::::



:::::::::: question ::::::::::
In which cases are the time complexities the same for Heapsort?

- [x] Worst and Average
- [ ] Worst and Best
- [ ] Best and Average
- [ ] Worst, Average and Best

::: hints
- Does Heapsort's cost vary according to the order of the array input values?
- No, it does not matter what order the input values have.
- However, the best case occurs when all the values are same.
:::
::::::::::::::::::::::::::::::



:::::::::: question ::::::::::
(Assuming no duplicate key values)
The order of the input records has what
impact on the number of comparisons required by Heapsort
(as presented in this chapter)?

- [x] There is a constant factor difference
- [ ] None
- [ ] There is a big difference, the asymptotic running time can change

::: hints
- Can Heapsort's behaviour change depending on outcome of
a comparison?
- Yes, it changes things a little bit in that it might
move things up and down the heap more or less.
- But this does not matter, because removing a value
from the heap normally costs $\log n$.
:::
::::::::::::::::::::::::::::::



:::::::::: question ::::::::::
What is the worst-case time for
Heapsort to sort an array of n records that each have unique
key values?

- [x] $O(n \log n)$
- [ ] $O(n)$
- [ ] $O(\log n)$
- [ ] $O(n^2)$
- [ ] $O(n^n)$

::: hints
- Does Heapsort's number of comparisons depend on the
particular order of the input array?
- Only a little bit, Heapsort still does basically the
same work regardless of input data order.
:::
::::::::::::::::::::::::::::::



:::::::::: question ::::::::::
 What is the running time of Heapsort
when the input is an array where all key values are equal?

- [x] $O(n)$
- [ ] $O(n^2)$
- [ ] $O(\log n)$
- [ ] $O(n ^ n)$
- [ ] $O(n \log n)$

::: hints
- Heapsort has the same asymptotic cost in the best, average,
and worst cases, but only if the key values are all unique.
- If you have a heap with all equal key values, what will the
siftdown operation do?
- In that case, siftdown will always return immediately,
resulting in a constant time operation. Since Heapsort calls
siftdown $n$ times, the total cost is $O(n)$.
:::
::::::::::::::::::::::::::::::



:::::::::: question ::::::::::
How much auxilliary space or overhead
(beyond the array holding the records) is needed by Heapsort?

- [x] $O(1)$
- [ ] $O(\log n)$
- [ ] $O(n)$
- [ ] $O(n^2)$

::: hints
- Heapsort does not require any auxilliary arrays.
:::
::::::::::::::::::::::::::::::

::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::

