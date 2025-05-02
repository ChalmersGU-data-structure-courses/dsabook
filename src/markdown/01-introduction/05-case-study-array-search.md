
## Case study: Searching in a list

::: TODO
- Prio 2: use cases for searching: dictionaries, sets, ...
- Prio 3: write the text on Even faster searching
:::


### Linear search

If you want to find the position in an unsorted array of $n$ objects
that stores a particular value, you cannot really do better than simply
looking through the array from the beginning and move toward the end
until you find what you are looking for. This algorithm is called
[sequential search]{.term}. If you do find it,
we call this a [successful search]{.term}. If
the value is not in the array, eventually you will reach the end. We
will call this an [unsuccessful search]{.term}.
Here is a simple implementation for sequential search.

    // Return the position of an element in an array A.
    // If the element is not found, return `null`.
    function sequentialSearch(arr, val) -> Int:
        for i in 0 .. arr.size - 1:   // For each element in A,
            if arr[i] == val:         // if we found it
                return i              // return this position.
        return null                   // Otherwise, return null

It is natural to ask how long a program or algorithm will take to run.
But we do not really care exactly how long a particular program will run
on a particular computer. We just want some sort of estimate that will
let us compare one approach to solving a problem with another. This is
the basic idea of [algorithm analysis]{.term}.
In the case of sequential search, it is easy to see that if the value is
in position $i$ of the array, then sequential search will look at $i$
values to find it. If the value is not in the array at all, then we must
look at $n$ values if the array holds $n$ values. This would be called
the [worst case]{.term} for sequential search.
Since the amount of work is proportional to $n$, we say that the worst
case for sequential search has
[linear cost](#linear-growth-rate){.term}. For
this reason, the sequential search algorithm is sometimes called
[linear search]{.term}.

### Binary search

::: TODO
- Use a range, not a slice
- Iterative vs recursive
- Analysis: logarithmic
- Optimisation: Interpolation search
- Move parts to later (where?)
:::

Sequential search is the best that we can do when trying to find a value
in an unsorted array. But if the array is sorted in increasing order
by value, then we can do much better. We use an algorithm called
[binary search]{.term}.

<!--
::: note
*Note*: It seems to be really "obvious" that sequential search is the
best that you can do on an unsorted array. But writing a convincing
proof that no algorithm could ever be discovered that is better is
surprisingly difficult. This is an example of a
[lower bounds proof]{.term} to find the cost
for the best possible [algorithm]{.term} to
solve the [problem]{.term} of search in an
unsorted array.
:::
-->

Let say we search for the value $val$ in an array.
Binary search begins by examining the value in the middle position of the array; call this position $mid$ and the corresponding value $val_{mid}$.
If $val_{mid} = val$, then processing can stop immediately.
In this case we are lucky, if not, knowing the middle value provides useful information that can help guide the search process.
In particular, if $val_{mid} > val$, then you know that the value $val$ cannot appear in the array at any position greater than $mid$.
Thus, you can eliminate future search in the upper half of the array.
Conversely, if $val_{mid} < val$, then you know that you can ignore all positions in the array less than $mid$.
Either way, **half** of the positions are eliminated from further consideration.
Binary search next looks at the middle position in that part of the array where value $val$ may exist.
The value at this position again allows us to eliminate half of the remaining positions from consideration.
This process repeats until either the desired value is found, or there are no positions remaining in the array that might contain the value $val$.

Here is the method in pseudocode:

    function binarySearch(arr, val) -> Int:
        low = 0
        high = arr.size - 1
        while low <= high:               // Stop when low and high meet.
            mid: Int = (low + high) / 2  // Integer division
            if arr[mid] < val:           // Check middle of subarray.
                low = mid + 1            // In upper half.
            else if arr[mid] > val:
                high = mid - 1           // In lower half.
            else:
                return mid               // Found it!
        return null                      // Search value not in array.

::: dsvis
And here is an illustration of the binary search algorithm.

<inlineav id="binarySearchCON" src="Searching/binarySearchCON.js" name="Binary Search Algorithm Slideshow" links="Searching/binarySearchCON.css"/>
:::

With the right math techniques, it is not too hard to show that the cost of binary search on an array of $n$ values is at most $\log_2 n$.
This is because we are repeatedly splitting the size of the subarray that we must look at in half.
We stop (in the worst case) when we reach a subarray of size 1.
And we can only cut the value of $n$ in half $\log_2 n$ times before we reach 1.

<!--
::: note
*Note*: It is possible to [prove](#search-lower-bound){.term}
that binary search is the most efficient algorithm
possible in the worst case when searching in a sorted array. This is
even more difficult than proving that sequential search is the most
efficient algorithm possible on an unsorted array.
:::
-->

#### Variations

Binary search is designed to find the (single) occurrence of a value and return its position.
A special value is returned if the value does not appear in the array.
The algorithm can be modified to implement variations such as returning the position of the _first occurrence_ of the value in the array if multiple occurrences are allowed.
Another variation is returning the position of the greatest value less than the value we are looking for when it is not in the array.

:::: dsvis
#### Binary search exercise

<avembed id="binarySearchPRO" src="Searching/binarySearchPRO.html" type="pe" name="Binary Search Proficiency Exercise"/>
:::

<!--
### Even faster searching

::: TODO
- e.g. library search
- e.g. searching for numbers: use an array
- use a hash function -> see the hashing chapter
:::
-->
