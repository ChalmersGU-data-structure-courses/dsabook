
## Insertion sort


Consider again the problem of sorting a pile of books.
Another intuitive approach might be to pick up the two topmost books in the pile and put them in order in the bookshelf.
Then you take another book from the pile and put it in the bookshelf,
in the correct position with respect to the first two, and so on.
As you take each book, you would add it in the bookshelf in the correct position to always keep the shelf sorted.
This simple approach is the inspiration for our third sorting algorithm, called [Insertion sort]{.term}.

Just as for Selection sort, the description above is not in-place.
But just as for Selection sort, it's relatively easy to turn it into an in-place algorithm,
by remembering an invisible separator between the sorted books (on the left) and the still-unsorted books (on the right).

::: algorithm
#### Algorithm: Insertion sort

Divide the array into a sorted and an unsorted part,
the sorted part is to the left and initially empty.
Then repeat the following until the unsorted part is empty:

1. Take the leftmost of the unsorted elements, $e$.
2. While $e$ is out of order compared to its left neighbour, swap the two.
3. Now $e$ will belong to the sorted part, and the unsorted part has decreased by one.

:::

Insertion sort iterates through a list of elements.
For each iteration, the current element is inserted in turn
at the correct position within a sorted list composed of those elements already processed.
The algorithm above can be implemented as follows in pseudocode:

    function insertionSort(array):
        n = array.size
        for i in 1 .. n-1:                           // Put the i'th element in its correct position:
            j = i                                    //     Start at the end of the sorted part
            while j > 0 and array[j] < array[j-1]:   //     Go backwards until we find the position:
                swap(array, j, j-1)                  //         Move the element one step forward
                j = j-1


:::::::: online
#### Insertion sort visualisation

::: dsvis
Here we see the first few iterations of Insertion sort.

``` {.jsav-animation src="Sorting/insertionsortCON.js" links="Sorting/InsertionSort.css" name="Insertion Sort Slideshow"}
```
:::

This continues on with each element in turn.
Call the current element $x$.
Insertion sort will move it to the left so long as it is smaller than element immediately preceding it.
As an element is less than or equal to $x$ is encountered, `insertionSort` is done with that element because all elements to its left in the array must be smaller.

::: dsvis
The following visualisation shows the complete Insertion sort. You can input your own data if you like.

```{.jsav-embedded src="Sorting/insertionsortAV.html" type="ss" name="Insertion Sort Visualisation"}
```
:::

::: dsvis
Now try for yourself to see if you understand how Insertion sort works.

```{.jsav-embedded src="Sorting/InssortPRO.html" type="ka" name="Insertion Sort Proficiency Exercise"}
```
:::

::::::::


### Insertion sort analysis

Just as for the previous sorting algorithms, we have a nested for loop, where the inner loop depends on the loop variable of the outer loop.

- The outer loop is iterated $n-1$ times in total.
- The inner loop is harder to analyse since it depends on how many elements in positions $0,\ldots,i-1$ are smaller than the element in position $i$.
    - in the absolute worst case, we always have to move the element to the front of the list, so the number of comparisons will be $i-1$
    - in the best case, the element is already in place, and then we only need one comparison

Therefore, in the worst case the number of comparisons is $\sum_0^n i$, which is quadratic just like Bubble sort and Selection sort.
In the best case -- when the list is already sorted -- we only have to do one comparison per iteration,
so the number of comparisons is proportional to the size of the array.
Counting swaps instead of comparisions yields the same results, because each iteration of the inner `while`-loop does both a comparison and a swap.

::: dsvis
Here is an explanation of the worst case cost of Insertion sort.

``` {.jsav-animation src="Sorting/InsertionSortWorstCaseCON.js" links="Sorting/InsertionSort.css" name="Insertion Sort Worst Case Slideshow"}
```
:::

::: dsvis
And here is an explanation of the cost of the best case.

``` {.jsav-animation src="Sorting/InsertionSortBestCaseCON.js" links="Sorting/InsertionSort.css" name="Insertion Sort Best Case Slideshow"}
```
:::

While the best case is significantly faster than the worst case,
the worst case is usually a more reliable indicator of the "typical" running time.
However, there are situations where we can expect the input to be in sorted or nearly sorted order.
One example is when an already sorted list is slightly disordered by a small number of additions to the list;
restoring sorted order using Insertion sort might be a good idea if we know that the disordering is slight.
So a "nearly sorted" list will always be cheap to sort with Insertion sort.
An example of an algorithm that take advantage of the near-best-case running time of Insertion sort is [Shellsort]{.term}.

Later we will see algorithms whose worst case growth rate is much better than quadratic.
Thus for larger arrays, Insertion sort will not be so good a performer as other algorithms.
So Insertion sort is not the best sorting algorithm to use in most situations.
But there are special situations where it is ideal.
We already know that Insertion sort works great when the input is sorted or nearly so.
Another good time to use Insertion sort is when the array is very small, since the algorithm is so simple.
The algorithms that have better asymptotic growth rates tend to be more complicated,
meaning that they typically need fewer comparisons for larger arrays, but they cost more per comparison.
One very common optimisation for these more complicated algorithms is to introduce a *cutoff*,
so that when the array to be sorted is small eonugh we switch to Insertion sort (or Selection sort).
