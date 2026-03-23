
::: TODO
- Iterative vs recursive
- Write the text on Even faster searching
:::

## Case study: Searching in an array {#searching}

One of the most fundamental tasks that we use computers for is *searching*.
We want to find an object that matches some criteria, in a collection of objects.
In fact, most of the data structures and algorithms that we will present in this book
have to do with searching in some way -- how to store data so that we can retrieve them easily,
and how to find the data we are interested in.

One way of storing a collection of objects is to put them in an array.
So, assuming that we have an array of objects, how can we find a certain object in this array?

### Sequential search

Assume that you want to search for a particular book in a bookshelf,
for example you want to find a book by a certain author.
If the shelf is not sorted the only thing you can do is to
go through each book at the time and see if it's the right one.
This algorithm is called *sequential search*, because you look at each book in sequence.
Here is a simple implementation:

    function sequentialSearch(array, key):
        for i in 0 .. array.size - 1:   // For each element in array:
            if array[i] == key:         //     If we found the search key:
                return i                //         return this position
        return null                     // Otherwise, return null

Now imagine that the bookshelf is actually a whole library
(the British Library has more than 200 million catalogued items).
How long time will that take -- do I have to leave the computer running until tomorrow?

Before we answer this we note that we do not really care exactly
how long a particular program will run on a particular computer.
We are more interested in some sort of estimate that will let us compare one approach with another.
This is the basic idea of [algorithm analysis]{.term}.

In the case of sequential search, we see that if the value is in position $i$ of the array,
then sequential search will have to look at $i$ values to find it.
If the value is not in the array at all, then we must look at all array values
-- this is the [worst case]{.term} of the algorithm.
Since the amount of work is proportional to the size of the array,
we say that the worst case for sequential search has [linear cost](#linear-growth-rate){.term}.

Note that sequential search is actually the best possible search algorithm
if the array doesn't have a structure (or if we don't know how it is structured).
But if the array is sorted, we can do much better.

### Binary search

No library puts their books randomly in the shelves, because the sequential search algorithm is too slow.
Instead the books are sorted in the shelves, for example by author name.
And then we can use a much more effective algorithm, called [binary search]{.term}:

- We start by looking at the middle book in the shelf, and compare it with what we're looking for:
    - if the book is smaller, we know that the book we search for is to the left,
    - if the book is larger, we know that the book we search for is to the right,
    - or the book could be the right one, and then we're done!
- So, by just comparing with one single book we can disregard half of the books in the shelf.
- Now we continue by looking at the middle book of the remaining ones. This will remove half of these books. And so on.

(What do we mean with "the book is smaller"? It is just short for "the author name of the book comes before the author name we search for, in lexicographic order".)

Assume now that we are searching in a big bookshelf, so there are 1000s of books in the shelf.
After some iterations it can be difficult to remember which books are in the "active" interval.
This can be solved by having two *markers* that we put between the books
-- one for marking the start of the interval, and one for marking the end.
At every step we look at the middle book in the current interval,
and depending on if the book is smaller or larger than the search key,
we move either the start or the end marker to that position.
This will reduce the size of the interval by half in each step.

How do we implement this in a computer?
Instead of a bookshelf and books, we have an array of elements.
This array can consist of simple things such as numbers or strings,
but it can also contain complex objects, for example information about books
(including author, title, translator, publication year, edition, ISBN, number of pages, physical size, etc...).
An array of complex objects can be sorted by different keys (such as author, title, physical size, ...),
and we can only search for the same key that it is sorted after.
So if the array is sorted by author, we cannot use binary search to search for a book title.

::: algorithm
### Algorithm: Binary search

To search for a *key* in a given array,
you start with an interval matching the who array.
The repeat the following until *key* has been found, or the interval is empty:

1. Compare *key* with the middle element in the interval.
2. If *key* is equal, return the middle element.
3. Set the interval to be lower or upper half,
   depending on if *key* is smaller or larger than the middle element.

:::

Here is how you can implement the algorithm in pseudocode:

    function binarySearch(array, key):
        start = 0                        // The marker pointing to the first element in the interval
        end = array.size - 1             // The marker pointing to the last element in the interval
        while start <= end:              // Continue until the interval is empty:
            mid = (start + end) / 2      //     Find the index of the middle value
            if array[mid] < key:         //     Compare with the middle value in the interval:
                start = mid + 1          //         The search key is in the upper half
            else if array[mid] > key:
                end = mid - 1            //         The search key is in the lower half
            else:
                return mid               //         We found the search key!
        return null                      // The value is not in the array.

An important implementation detail is how to implement the markers.
Remember that we imagined them to be *between* two books -- how do we encode this in an algorithm?
In the implementation above we decided to have the markers point at the first and last books in the interval
-- so the start marker is the array index of the first book in the interval,
and the end marker is the index of the last book.
(Another common option is to let the end marker point to the book *after* the last in the interval.)

*Warning*: one very common error when implementing binary search is to make a copy of the interval you want to search
(this is called a "slice" in many programming languages).
For example, in Python if you write `array[start:end]`, you will make a copy of the interval.
Imagine that the interval consists of 1 million elements,
then the computer has to allocate space for a new array with 1 million elements,
and copy all of them from the original array to the new.
This takes time and space and is just useless.
It is similar to moving all the books in the interval to a new bookshelf after each iteration!


::: dsvis
Here is an illustration of the binary search algorithm.

``` {.jsav-animation src="Searching/binarySearchCON.js" links="Searching/binarySearchCON.css" name="Binary Search Algorithm Slideshow"}
```
:::

#### Running time of binary search

How long time does it take to run binary search?
The algorithm uses one single `while`-loop,
and the body of the loop consists of a couple of basic calculations plus one `if`-clause.
The time it takes to execute the loop body does not depend on the array size $n$ at all,
meaning that it never takes longer that some fixed time to run.
Therefore, the total running time of binary search is therefore proportional to the number of loop iterations.

So, how many times will we iterate the `while`-loop, in the worst case?
We start with an interval of size $n$, and at each iteration we halve its size.
The worst case is when the element is not in the array, because then we will continue halving the interval until it is empty.
And since we can only halve the interval $\log_2(n)$ times before we reach the empty interval,
the total running time of binary search is proportional to $\log_2(n)$.

How does this compare with sequential search?
If the array contains 1 million elements, we need to do $\log_2(10^6) \approx 20$ loop iterations
-- sequential search needs around 50,000 times more iterations.
If the array contains the whole of British Library, 200 million elements,
binary search needs $\log_2(2\cdot 10^8) \approx 28$ loop iterations
-- sequential search needs more than 7 million more iterations.

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

::: TODO
- e.g. library search / interpolation search
- e.g. searching for numbers: use an array
- use a hash function -> see the hashing chapter
:::
-->
