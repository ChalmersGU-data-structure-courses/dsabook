
## Case study: Binary search {#binary-search}

Assume that you want to search for a particular book in a bookshelf, for example you want to find a book by a certain author. If the shelf is not sorted the only thing you can do is to go through each book at the time and see if it's the right one. This is called *linear search*, because you look at each book in turn (linearly). Now imagine that the bookshelf is actually a whole library -- it will take some time.

*Warning*: There is always a risk with analogies like this (searching in a bookshelf) -- you might think that some operations are faster than they really are. For example, if the author names are clearly written on the book spines your mind can probably scan several books at the time, and then it can become quite fast anyway. But that's cheating -- the computer cannot see many books at once. A better analogy is that all book spines are blank and you want to search for an author. Then you really have to take out each book from the shelf to read the name, and then you can get an idea of the work the computer has to do.

Anyway, if the shelf is sorted we can use a more effective algorithm, binary search:

- We start by looking at the middle book in the shelf, and compare it with what we're looking for:
    - if the book is smaller, we know that the book we search for is to the left
    - if the book is larger, we know that the book we search for is to the right
    - or the book could be the right one, and then we're done!
    - (what do I mean with "the book is smaller"? -- well, of course it's a shorthand for "the author name of the book comes before the author name we search for, in lexicographic order")
- So, by just comparing with one single book we can disregard half of the books in the shelf.
- Now we continue by looking at the middle book of the remaining ones. This will remove half of these books. And so on.

Assume now that the book spines are all blank, and that there are 1000s of them in the shelf. After some iterations it can be difficult to remember which books are in the "active" interval. We can solve this by having two *markers* that we put between the books -- one for marking the start of the interval, and one for marking the end. At every step we look at the middle book in the interval, and depending on if the book is smaller or larger than the search key, we move either the start or the end marker to that position.

How do we implement this in a computer? After all, we don't have physical books and bookshelves there... The bookshelf is an analogy of an array of elements. This array can consist of simple things such as numbers or strings, but it can also contain complex objects, for example information about books (including author, title, translator, publication year, edition, ISBN, number of pages, physical size, etc...). An array of complex objects can be sorted by different keys (such as author, title, physical size, …), and we can only search for the same key that it is sorted after. Both when sorting and searching, we need to use different comparators, or comparison functions, depending on the search key.

*Warning*: one very common error when implementing binary search is to make a copy of the interval you want to search (this is called a “slice” in many programming languages). For example, in Python if you write `array[low:high]`, you will make a copy of the interval. Imagine that the interval consists of 1 million elements, then the computer has to allocate space for a new array with 1 million elements, and copy all of them from the original array to the new. This takes time and space and is just useless. It is similar to moving all the books in the interval to a new bookshelf after each iteration!

A final implementation detail is how to implement the markers. Remember that we imagined them to be *between* two books – how do we encode this in an algorithm? One simple way is to have the markers point at the books instead – so the start marker is the array index of the first book in the interval, and the end marker is the index of the last book. This is how we do it in this book, but there are other possible options too – for example, another common way is that the end marker could point to the book *after* the last in the interval. Both solutions are fine, and the important thing is that you are consistent and comment this clearly in your code.

-----

::: TODO
- Prio 2: use cases for searching: dictionaries, sets, ...
- Prio 3: write the text on Even faster searching
:::

If you want to find the position in an unsorted array of $n$ objects
that stores a particular value, you cannot really do better than simply
looking through the array from the beginning and moving toward the end
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
look at all array values. This would be called
the [worst case]{.term} for sequential search.
Since the amount of work is proportional to the size of the array, we say that the worst
case for sequential search has
[linear cost](#linear-growth-rate){.term}. For
this reason, the sequential search algorithm is sometimes called
[linear search]{.term}.

### Binary search {#sec:binary-search}

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

Let's say we search for the value $val$ in an array.
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

``` {.jsav-animation src="Searching/binarySearchCON.js" links="Searching/binarySearchCON.css" name="Binary Search Algorithm Slideshow"}
```
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

```{.jsav-embedded src="Searching/binarySearchPRO.html" type="pe" name="Binary Search Proficiency Exercise"}
```
:::

<!--
### Even faster searching

::: TODO
- e.g. library search
- e.g. searching for numbers: use an array
- use a hash function -> see the hashing chapter
:::
-->
