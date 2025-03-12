
## Case study: Searching in a list

::: TODO
- Prio 1: update the sections on linear and binary search
- Prio 2: use cases for searching: dictionaries, sets, ...
- Prio 3: write the text on Even faster searching
:::


### Linear search

::: TODO
- Analysis: linear time
:::

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
    // If the element is not found, return -1.
    function sequentialSearch(A, e):
        for i = 0 to A.size()-1:   // For each element in A,
            if A[i] == e:          // if we found it
                return i           // return this position.
        return -1                  // Otherwise, return -1.

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
by value, then we can do much better. We use a process called
[binary search]{.term}.

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

Binary search begins by examining the value in the middle position of
the array; call this position $mid$ and the corresponding value
$k_{mid}$. If $k_{mid} = K$, then processing can stop immediately. This
is unlikely to be the case, however. Fortunately, knowing the middle
value provides useful information that can help guide the search
process. In particular, if $k_{mid} > K$, then you know that the value
$K$ cannot appear in the array at any position greater than $mid$. Thus,
you can eliminate future search in the upper half of the array.
Conversely, if $k_{mid} < K$, then you know that you can ignore all
positions in the array less than $mid$. Either way, half of the
positions are eliminated from further consideration. Binary search next
looks at the middle position in that part of the array where value $K$
may exist. The value at this position again allows us to eliminate half
of the remaining positions from consideration. This process repeats
until either the desired value is found, or there are no positions
remaining in the array that might contain the value $K$.

Here is the method in pseudocode:

    // Return the position of an element in an array A.
    // If the element is not found, return -1.
    function binarySearch(A, e):
        low = 0
        high = A.size() - 1
        while low <= high:               // Stop when low and high meet.
            mid = int((low + high) / 2)  // Check middle of subarray.
            if A[mid] < e:
                low = mid + 1            // In right half.
            else if A[mid] > e:
                high = mid - 1           // In left half.
            else:
                return mid               // Found it.
        return -1                        // Search value not in array.

And here is an illustration of the binary search method.

<inlineav id="binarySearchCON" src="Searching/binarySearchCON.js" name="Binary Search Algorithm Slideshow" links="Searching/binarySearchCON.css"/>

With the right math techniques, it is not too hard to show that the cost
of binary search on an array of $n$ values is at most $\log_2 n$. This
is because we are repeatedly splitting the size of the subarray that we
must look at in half. We stop (in the worst case) when we reach a
subarray of size 1. And we can only cut the value of $n$ in half
$\log_2 n$ times before we reach 1.

::: note
*Note*: It is possible to [prove](#search-lower-bound){.term}
that binary search is the most efficient algorithm
possible in the worst case when searching in a sorted array. This is
even more difficult than proving that sequential search is the most
efficient algorithm possible on an unsorted array.
:::

#### Variations

Binary search is designed to find the (single) occurrence of a value
$K$ and return its position. A special value is returned if $K$ does not
appear in the array. This algorithm can be modified to implement
variations such as returning the position of the first occurrence of $K$
in the array if multiple occurrences are allowed, and returning the
position of the greatest value less than $K$ when $K$ is not in the
array.

#### Binary search exercise

<avembed id="binarySearchPRO" src="Searching/binarySearchPRO.html" type="pe" name="Binary Search Proficiency Exercise"/>

### Even faster searching

::: TODO
- e.g. library search
- e.g. searching for numbers: use an array
- use a hash function -> see the hashing chapter
:::


