
## Insertion sort {#sorting-1:insertion-sort}

::: TODO
- Prio 2: add figure next to the pseudocode showing the array and the variables in the middle of running
:::

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

<!-- OPENDSA: START -->
Insertion sort iterates through a list of elements.
For each iteration, the current element is inserted in turn
at the correct position within a sorted list composed of those elements already processed.
<!-- OPENDSA: END -->
The algorithm above can be implemented as follows in pseudocode:

    insertionSort(arr):
        n = arr.size
        for i in 1 .. n-1:                       // Put the i'th element in its correct position:
            j = i                                //     Start at the end of the sorted part
            while j > 0 and arr[j] < arr[j-1]:   //     Go backwards until we find the position:
                swap(arr, j, j-1)                //         Move the element one step forward
                j -= 1


@fig:InsertionSort1 illustrates two steps of the algorithm.
Note how all values before $i$ are sorted at all times, but unlike Selection sort,
they are not necessarily in their final positions.


![Two subsequent steps of Insertion sort. In each step, a value is inserted backwards into the sorted initial segment.](images/2.6-two-steps-insertion-sort.svg){#fig:InsertionSort1}



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

