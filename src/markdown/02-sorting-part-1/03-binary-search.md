
## Binary search {#sorting-1:binary-search}

::: TODO
- Prio 1: Move the image out of #alg:binary-search, and put inline in the text
- Prio 1: Split the image into 4 and intersperse them with explanatory text (like for quicksort partition)
:::

No library keeps books in random order, because Linear search is too slow.
Instead, books are sorted in the shelves, for example alphabetically by author name and title.
Most people can intuitively use this order to search a bookshelf
by looking at only a small fraction of the books.
When browsing the books we implicitly make deductions like
"if there are no books between Orwell and Owen, there must be no books by Osborne",
and "this book is by Plato, so all books by Homer must be earlier in the shelf".
The formalised algorithm that uses these deductions is called [Binary search]{.term}.
<!-- It is a very common choice for a first algorithm to teach students, so you may have seen it before. -->
For the example of a book shelf sorted alphabetically from left to right, Binary search can be described as such:

- Compare the middle book in the shelf to the one we are looking for.
    - if the middle book is the one we are looking for, our search is done!
    - if we are searching for an alphabetically earlier book, search the left half of the shelf,
      otherwise search in the right half.
- Repeat this procedure, dividing the search space by half in every iteration.

We will end in one of two cases:
Either we find the book we are looking for, or we end up searching an empty part of the bookshelf.
In the latter case the book cannot be not in the shelf.

To make the description of this algorithm more precise, we introduce the concept of a *search interval*.
Initially our search interval is the entire bookshelf,
and with each comparison we reduce the search interval to just the left or right side of the middle element.
This means that in each iteration we reduce the size of the problem by half:
if we want to search among 100 books, they are reduced to 50 after one comparison,
and to 25 after just one more comparison, and then to 12 and to 6, and so on.
Ultimately in the end, we either find the book we are looking for, or we search among no books at all.
And in both cases we have the answer we were looking for.
This process of reducing a problem to a smaller instance of the same problem is a key concept in algorithm design,
which we will se over and over again throughout this book.

The *book case* is of course just a metaphor for an ordered array of elements,
and to turn this algorithm into actual code, we need to decide how to represent the search interval.
The operation of reducing the interval needs to be fast, so we cannot make a *slice* of the array
(a slice is a copy of the array containing only some elements).
Creating a slice uses up additional memory and is too slow.
Instead we define the interval by two variables, *start* and *end*,
denoting the lower and upper indices of the interval.
Assume that we want to search for the value 36 in an ordered array of length 15.
Initially the interval spans the whole array, so $\textit{start}=0$ and $\textit{end}=14$.
First we look up the middle element in cell $(0+14)/2=7$, which is revealed to have value 64 --
the rest of the array is still unknown to us, so we show these cells using question marks:

    >       0   1   2   3   4   5   6   7   8   9  10  11  12  13  14
    >    [  ?   ?   ?   ?   ?   ?   ?  64   ?   ?   ?   ?   ?   ?   ?  ]
    >       ^                           ^                           ^

Since $36<64$ we take the left half of the interval, so we change the interval *end* to $\textit{mid}-1 = 6$.
The new middle position is $(0+6)/2=3$, and its value is 22:

    >       0   1   2   3   4   5   6   7   8   9  10  11  12  13  14
    >    [  ?   ?   ?  22   ?   ?   ?  64   ?   ?   ?   ?   ?   ?   ?  ]
    >       ^           ^           ^

This time $36>22$ so we take the right half:
the interval *start* becomes $\textit{mid}+1 = 4$, and the new middle is $(4+6)/2=5$.
This time the middle cell contains 36 which is exactly what we search for, and we can stop:

    >       0   1   2   3   4   5   6   7   8   9  10  11  12  13  14
    >    [  ?   ?   ?  22   ?  36   ?  64   ?   ?   ?   ?   ?   ?   ?  ]
    >                       ^   ^   ^

Note that we only had to look at 3 cells in the array until we found what we searched for.
The algorithm is presented in full in [](#alg:binary-search),
using both an abstract text description and more concrete pseudocode.

::: {.algorithm #alg:binary-search}
#### Algorithm: Binary search

To search for *key* in an ordered array,
start with an interval including the whole array.
Then repeat until *key* has been found, or the interval is empty:

1. Compare *key* with the middle element *mid* of the interval.
2. If *key* is equal, then return the position of *mid*.
3. Reduce the interval to the elements to the left or right of *mid*
   depending on if the key is greater or smaller than it.
<!-- 3. Exclude the middle element and all elements either before or after it,
   depending on if the key is greater or smaller than the middle element. -->

If the interval ends up empty, the key is not in the array.
When implementing the algorithm as pseudocode,
the important thing is to represent the interval as a pair of array indices, (*start*,*end*):

```pseudo
    binarySearch(arr, key):
        (start, end) = (0, arr.size - 1)     // The initial interval is the whole array
        while start <= end:                  // Continue until the interval is empty:
            mid = (start + end) / 2              // The index of the middle value
            if key < arr[mid]: end = mid - 1     // The key may be in the lower half
            if key > arr[mid]: start = mid + 1   // The key may be in the upper half
            if key = arr[mid]: return mid        // We found the key!
        return null                          // The key is not in the array
```
:::

An important technical detail here is that we must use *integer division* when calculating the middle index.
Therefore, the midpoint of the interval $(6,11)$ is $(6+11)/2=8$ (and not $8.5$).
This leads to some corner cases you have make sure they are handled correctly,
for instance when the interval contains a single element (that is, when $\mathit{start}=\mathit{end}$).
Or when it has two elements -- does it calculate *mid* correctly in these cases?

::: note
#### Note: How to represent the interval
In this particular implementation we use *inclusive* indices,
because both *start* and *end* are inside the interval.
Another common option is to have *start* be inclusive, and *end* exclusive --
in that case we have to start with the interval $(0,\mathit{arr.size})$.
Yet another option is to have store the interval using the start index and the size of the interval.
For each variation you must do slightly different calculations,
but the fundamental procedure is the same:
Find the middle element, and exclude the upper or lower half of the interval.
:::

There are many variations of Binary search.
For example, if there are many books by the same author we can search for the first of these books, or the last.
Then we will have to make some subtle changes to the implementation, but the basic idea remains the same.
<!-- Consider what would happen if the array is not ordered properly,
can you construct a small example where the algorithm would go wrong? -->
Here is a slightly demanding exercise:
can you use Binary search to determine if an array contains a prime number?

::: dsvis
Here is an illustration of the Binary search algorithm.
``` {.jsav-animation src="Searching/binarySearchCON.js" links="Searching/binarySearchCON.css" name="Binary Search Algorithm Slideshow"}
```
:::

#### Running time of Binary search

For Linear search, in the worst case we have to look at all books in the bookshelf (all elements of the array).
That means running time grows linearly with the size of the bookshelf.
What is the corresponding worst case for Binary search?

We can immediately see that it looks at much fewer books. The first comparison we do,
looking at a single book, excludes half the bookshelf from the search interval.
In fact, every iteration of the `while`-loop will reduce the size of the search interval by at least $50\%$.
How many times can we integer-divide a number $n$ by $2$ before we reach $0$?
If $n$ is a power of 2, $n=2^k$, then the answer is $k{+}1$ times.
So if $n<2^k$, then we don't have to do more than $k{+}1$ iterations,
which is approximately $\log_2(n)$ times (rounding up to the nearest integer).

We say that Binary search is a *logarithmic time* algorithm, as opposed to Linear search being linear time.
For large collections, this difference is staggering.
For a bookshelf with a million books, Binary search requires us to look at 20 books worst case, instead of a million.
For a bookshelf of a billion books, Binary search requires less than 30 comparisons,
making it tens of millions times faster than a Linear search.

This example highlights a crucial insight about algorithms:
Buying a computer that is twice as fast will reduce the time consumption of your task by half.
Switching programming language to C from Python might yield a similar speed-up.
Both of those are nice, but switching from a linear time algorithm to a logarithmic one
can reduce runtime by a factor of millions, reducing runtime from years to seconds.

#### Ordered arrays as a data structure

Apart from introducing our first two algorithms (Linear search and Binary search),
this section introduces a data structure: The ordered array.
This data structure differs from from general arrays in what operations it supports,
more than just the ability to search quickly.

Returning to the analogy of the bookshelf: If we have an unordered bookshelf,
where we only ever do Linear searches, we can add a new book by squeezing it in
wherever there is room.
We can also switch the order of two books if we please.

If we have an ordered bookshelf, and want to keep using Binary search on it,
adding a new book requires careful consideration.
There is a single valid position for the new book to be placed,
and we cannot swap existing books around.

This touches on the subject of *invariants*, properties that must always hold on a data structure.
Having an ordering invariant on an array affords us the luxury of efficient search, at the cost
of having to *maintain* that invariant when performing modifications.

<!--
#### Variations

Binary search is designed to find the (single) occurrence of a value and return its position.
A special value is returned if the value does not appear in the array.
The algorithm can be modified to implement variations such as returning the position of the _first occurrence_ of the value in the array if multiple occurrences are allowed.
Another variation is returning the position of the greatest value less than the value we are looking for when it is not in the array.
-->

:::: dsvis
#### Binary search exercise

```{.jsav-embedded src="Searching/binarySearchPRO.html" type="pe" name="Binary Search Proficiency Exercise"}
```
:::

<!--
### Even faster searching

- for example library search / interpolation search
- for example searching for numbers: use an array
- use a hash function -> see the hashing chapter
:::
-->
