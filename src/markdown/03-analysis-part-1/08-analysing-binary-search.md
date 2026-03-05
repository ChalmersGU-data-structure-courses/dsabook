
## Case study: Analysing binary search {#analysing-binary-search}

Now we will discuss the algorithmic complexity of the binary search algorithm from @sec:binary-search.

The basic structure of the algorithm is a single `while`-loop,
so we have to figure out how many iterations it will make in the worst case.
The loop condition refers to two variables, `low` and `high`, which denotes an interval of the array.
When the algorithm starts the interval covers the whole array,
and then in each iteration the search interval is halved.
So, how many times can we halve an interval until it becomes empty?

- In the first iteration the interval size is $n$,
- in the second iteration, it is halved to $n/2$,
- after that it is halved to $n/4$, and then $n/8$,
- and so on until we reach something smaller than 1.

In other words, what is the smallest $k$ such that $\frac{n}{2^k} < 1$?
The solution to this is $k = \lceil\log_2(n)\rceil$, meaning that the loop is iterated at most $O(\log(n))$ times.

The loop body consists of an `if`-statement and some atomic operations, which means that it is constant, $O(1)$.
Therefore the final worst-case complexity for binary search is $O(\log(n))$.


::: dsvis
Here is a visual explanation of the complexity of binary search,
where the algorithm is modeled as a *recurrence relation*.

``` {.jsav-animation src="AlgAnal/BsearchDandCRecurCON.js" links="AlgAnal/BsearchDandCRecurCON.css" name="Binary Search recurrence slideshow"}
```
:::

Sequential search looks at every element in the array in the worst case, so its complexity is $O(n)$.
This means that as $n$ grows, the $O(n)$ running time for sequential search
quickly becomes much greater than the $O(\log(n))$ running time for binary search.
Taken in isolation, binary search appears to be much more efficient than sequential search.
This is despite the fact that the constant factor for binary search is greater
than that for sequential search, because the calculation for the next
search position in binary search is more expensive than just
incrementing the current position, as sequential search does.

However, binary search comes with a precondition:
The array must be sorted, and sorting an array is a time-consuming operation
The sorting algorithms we have seen so far are all quadratic, $O(n^2)$,
but there are faster ones with complexity $O(n\log(n))$, as you will see [Chapter @sec:sorting-part-2].
So there's a tradeoff here -- to be able to search the array efficiently we need to keep it sorted.

Sequential search is not much of a problem if it is something we only have to do just a handful of times,
but if we plan to search repeatedly in our array it is definitely worth the work to sort it once and for all.

However, keeping an array sorted can be very costly if want to be able to insert and delete elements.
In the worst case we have to sort it again after each change, and that takes $O(n\log(n))$ time.
So, if we want to maintain a searchable collection which changes over time, a sorted array is not a good choice.
But an unsorted array isn't a good choice either
-- instead we should use smarter data structures such as [search trees]{.term} ([Chapter @sec:search-trees])
or [hash tables]{.term} ([Chapter @sec:hash-tables]).
