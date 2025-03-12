
## Case study: Analysing binary search

::: TODO
- Prio 2: update text so that it fits in this position in the structure
:::

Now we will discuss the algorithmic complexity of the two search algorithms that we introduced in section XX (chapter: introduction).

In section XX (this chapter), we deduced that the running time for linear search on an array if size $n$ is $O(n)$.
If we assume that the value is equally likely to appear in any location, this complexity is both the average case and the worst case.
(The best case is constant, $O(1)$, and occurs when the searched value occurs first in the array.
But as we already discussed we are rarely interested in the best case.)

But what is the complexity of the binary search algorithm?

<inlineav id="BsearchDandCRecurCON" src="AlgAnal/BsearchDandCRecurCON.js" name="Binary Search recurrence slideshow" links="AlgAnal/BsearchDandCRecurCON.css"/>

Comparing sequential search to binary search, we see that as $n$ grows,
the $O(n)$ running time for sequential search in the average and
worst cases quickly becomes much greater than the $O(\log n)$
running time for binary search. Taken in isolation, binary search
appears to be much more efficient than sequential search. This is
despite the fact that the constant factor for binary search is greater
than that for sequential search, because the calculation for the next
search position in binary search is more expensive than just
incrementing the current position, as sequential search does.

Note however that the running time for sequential search will be roughly
the same regardless of whether or not the array values are stored in
order. In contrast, binary search requires that the array values be
ordered from lowest to highest. Depending on the context in which binary
search is to be used, this requirement for a sorted array could be
detrimental to the running time of a complete program, because
maintaining the values in sorted order requires a greater cost when
inserting new elements into the array. This is an example of a tradeoff
between the advantage of binary search during search and the
disadvantage related to maintaining a sorted array. Only in the context
of the complete problem to be solved can we know whether the advantage
outweighs the disadvantage.
