
## Selection sort {#sorting-1:selection-sort}

Suppose again we are sorting a large pile of books into a bookshelf,
in alphabetical order by author's surname.
One way is to look through the pile until we find the book that should be first
(say, by an author named *Alakoski*), and put that first in the bookshelf.
Then we look through the remaining pile until we find the second book
(by *Beskow*), and add that behind *Alakoski*.
The third book (by *Carlberg*), goes behind *Beskow*.
We proceed through the shrinking pile of books until we are done.



::: {.algorithm #alg:selection-sort}
#### Algorithm: Selection sort

Divide the array into a sorted and an unsorted part,
where the sorted part is to the left and initially empty.
Then repeat the following until the unsorted part is empty:

1. Find the smallest unsorted element, $e$.
2. Swap $e$ with the leftmost of the unsorted elements. Now $e$ belongs to the sorted part.

Each repetition of these steps reduces the unsorted part by one element, so by the end of the
procedure all elements are sorted. We implement the algorithm using a nested loop,
where the counter $i$ represents the size of the sorted part
(which is also the index of the first unsorted element):

    selectionSort(arr):
        n = arr.size
        for i in 0 .. n-1:                   // Select the i'th smallest element:
            minIndex = i                     //     Current smallest index
            for j in i+1 .. n-1:             //     Find the smallest value:
                if arr[j] < arr[minIndex]:   //         Found something smaller:
                    minIndex = j             //             Remember the smaller index
            swap(arr, i, minIndex)           //     Put the smallest value into place

Here is an illustration of two steps of the algorithm:

![](images/2.5-two-steps-selection-sort.svg)

:::

This is the inspiration for our first sorting algorithm, called [Selection sort]{.term}.
The bookshelf is of course an array, and selecting the first book in alphabetical order
corresponds to finding the minimal element using some comparison function.
There are two main issues with this analogy:

- We want sorting to be in-place, instead of moving books from a pile to a shelf, we want
  to rearrange books inside a shelf.
- Finding the smallest book in an array is easy using a linear search, but how do we
  find the third or one thousandth smallest book?

Luckily solving the first problem also solves the second.
After we find the smallest element in the array, we move it to the first position.
Since there is already another element in the first position, we place that in the gap created by
moving the the smallest element, *swapping* the two books.
Finding the second smallest book is now easy, just find the smallest element starting from the second position!

The result is an an invisible separator between sorted elements (at the start of the array)
and still-unsorted elements.
We repeatedly select the minimal element from the unsorted books and *swap* its position with the first
unsorted book. See [](#alg:selection-sort).

An important observation about selection sort is that elements in the sorted area are always less than or
equal to elements in the unsorted area. This guarantees that moving the smallest element in the unsorted
area to the end of the sorted area keeps the sorted area in correct order.

Another observation is that the $i$'th iteration of Selection sort "selects" the $i$'th smallest element in the array, placing it at position $i$. This guarantees that the element is in the correct position.

These observations lead to an alternative description of selection sort. To sort $n$ array elements in-place:

1. Move the smallest element first.
2. Sort the remaining $n-1$ elements in-place.

An interesting aspect of this description is that step two does not require us to
use Selection sort for the $n-1$ elements, any in-place sorting algorithm would work.

The description highlights how we reduce the problem of sorting $n$ elements into a smaller
problem of the same kind.
This is similar to binary search ([](#alg:binary-search)), but the reduction is less significant -- reducing the
size of the problem by one instead of cutting it in half. We also perform more work to achieve
the reduction: where binary search required a single comparison, selection sort has to find the smallest
of $n$ elements.

The alternative description is also great for convincing someone that the algorithm works,
in fact it is very similar to a mathematical proof by induction: The algorithm is trivially
correct when sorting $1$ or $0$ elements, and if we assume it works for $n$ elements we can
easily prove that it works for $n+1$ elements.

:::::::: online
#### Selection sort visualisation

::: dsvis
Consider the example of the following array.

``` {.jsav-animation src="Sorting/selectionsortS1CON.js" links="Sorting/selectionsortSCON.css" name="Selection Sort Slideshow 1"}
```
:::

::: dsvis
Now we continue with the second pass.

However, since the smallest element is already at the beginning, we will not need to look at it again.

``` {.jsav-animation src="Sorting/selectionsortS2CON.js" links="Sorting/selectionsortSCON.css" name="Selection Sort Slideshow 1"}
```
:::

Selection sort continues in this way until the entire array is sorted.

::: dsvis
The following visualisation puts it all together. You can input your own data if you like.

``` {.jsav-embedded src="Sorting/selectionsortAV.html"}
```
:::

::: dsvis
Now try for yourself to see if you understand how Selection sort works.

``` {.jsav-embedded src="Sorting/SelsortPRO.html"}
```
:::

::::::::


