
## Case study: Analysing linear and binary search

::: TODO
- Prio 2: update text so that it fits in this position in the structure
:::

### Linear search

The final example of algorithm analysis for this section will compare
two algorithms for performing search in an array. Earlier, we determined
that the running time for sequential search on an array where the search
value $K$ is equally likely to appear in any location is $\Theta(n)$ in
both the average and worst cases. We would like to compare this running
time to that required to perform a [binary search]{.term} on an array whose values are stored in order from lowest to
highest. Here is a visualization of the binary search method.

<inlineav id="binarySearchCON" src="Searching/binarySearchCON.js" name="Binary Search Algorithm Slideshow" links="Searching/binarySearchCON.css"/>

### Binary search

<inlineav id="BsearchDandCRecurCON" src="AlgAnal/BsearchDandCRecurCON.js" name="Binary Search recurrence slideshow" links="AlgAnal/BsearchDandCRecurCON.css"/>

Function `binarySearch` is designed to find the (single) occurrence of
$K$ and return its position. A special value is returned if $K$ does not
appear in the array. This algorithm can be modified to implement
variations such as returning the position of the first occurrence of $K$
in the array if multiple occurrences are allowed, and returning the
position of the greatest value less than $K$ when $K$ is not in the
array.

Comparing sequential search to binary search, we see that as $n$ grows,
the $\Theta(n)$ running time for sequential search in the average and
worst cases quickly becomes much greater than the $\Theta(\log n)$
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
