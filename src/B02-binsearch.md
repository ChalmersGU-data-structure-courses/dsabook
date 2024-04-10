
## Searching in an Array

### Sequential Search

If you want to find the position in an unsorted array of $n$ objects
that stores a particular value, you cannot really do better than simply
looking through the array from the beginning and move toward the end
until you find what you are looking for. This algorithm is called
[sequential search]{.term}. If you do find it,
we call this a [successful search]{.term}. If
the value is not in the array, eventually you will reach the end. We
will call this an [unsuccessful search]{.term}.
Here is a simple implementation for sequential search.

```python
# Return the position of an element in a list.
# If the element is not found, return -1.
def sequentialSearch(elements, e):
    for i = 0 ... len(elements)-1:  # For each element
        if elements[i] == e:        # if we found it
            return i                # return this position
    return -1                       # Otherwise, return -1
```

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

### Binary Search

Sequential search is the best that we can do when trying to find a value
in an unsorted array.[^B02a] But if the array is sorted in increasing order
by value, then we can do much better. We use a process called
[binary search]{.term}.

[^B02a]: It seems to be really "obvious" that sequential search is the
    best that you can do on an unsorted array. But writing a convincing
    proof that no algorithm could ever be discovered that is better is
    surprisingly difficult. This is an example of a
    [lower bounds proof]{.term} to find the cost
    for the best possible [algorithm]{.term} to
    solve the [problem]{.term} of search in an
    unsorted array.

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
remaining in the array that might contain the value $K$. Here is an
illustration of the binary search method.

<inlineav id="binarySearchCON" src="Searching/binarySearchCON.js" name="Binary Search Algorithm Slideshow" links="Searching/binarySearchCON.css"/>

And here is the method in more programming languages:

```python
# Return the position of an element in a list.
# If the element is not found, return -1.
def binarySearch(elements, e):
    low = 0
    high = len(elements) - 1
    while low <= high:               # Stop when low and high meet
        mid = int((low + high) / 2)  # Check middle of subarray
        if elements[mid] < e:
            low = mid + 1            # In right half
        else if elements[mid] > e:
            high = mid - 1           # In left half
        else:
            return mid               # Found it
    return -1                        # Search value not in array
```


With the right math techniques, it is not too hard to show that the cost
of binary search on an array of $n$ values is at most $\log_2 n$. This
is because we are repeatedly splitting the size of the subarray that we
must look at in half. We stop (in the worst case) when we reach a
subarray of size 1. And we can only cut the value of $n$ in half
$\log_2 n$ times before we reach 1.[^B02b]

[^B02b]: It is possible to
    [prove](#search-lower-bound){.term} that binary search is the most efficient algorithm
    possible in the worst case when searching in a sorted array. This is
    even more difficult than proving that sequential search is the most
    efficient algorithm possible on an unsorted array.

<avembed id="binarySearchPRO" src="Searching/binarySearchPRO.html" type="pe" name="Binary Search Proficiency Exercise"/>
