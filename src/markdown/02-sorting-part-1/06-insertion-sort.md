
## Insertion sort {#sorting-1:insertion-sort}

::: TODO
- Prio 1: Move the image out of #alg:selection-sort, and put inline in the text
- Prio 1: Split the image into 2 and intersperse them with explanatory text (like for quicksort partition)
- Prio 3: Use the optimized IS that doesn't do swaps?
:::

Consider again the problem of sorting a pile of books.
Another intuitive approach might be to pick up the two topmost books in the pile and put them in order in the bookshelf.
Then you take another book from the pile and put it in the bookshelf,
in the correct position with respect to the first two, and so on.
As you take each book, you would add it in the bookshelf in the correct position to always keep the shelf ordered.
This simple approach is the inspiration for our second sorting algorithm, called [Insertion sort]{.term}.

Just as for Selection sort, the description above is not in-place.
But just as for Selection sort, it's relatively easy to turn it into an in-place algorithm:
Keep a growing sorted part in the beginning of the array, and a shrinking unsorted part after it.
Insert values one at a time from the unsorted part into the sorted part.

Here is the same example array as in @sec:sorting-1:selection-sort, after three iterations of Insertion sort.
At this point the element at index $3$ will be swapped into place, so $21$ moves two steps to the left:

    >        <------|
    > [ 19  24->35->21   9  18  27  20  14  31 ]
    >  |----------|

The sorted part now consists of four elements, and we put element at index $4$ into place.
This cell has value $9$, which is smaller than everything we have seen so far,
so it will move all the way to the left:

    >    <---------------|
    > [ 19->21->24->35-->9  18  27  20  14  31 ]
    >  |--------------|

Note how all values before $i$ are sorted at all times, but unlike Selection sort,
they are not necessarily in their final positions.
Insertion sort moves each element $e$ backwards so long as it is smaller than the preceding element.
When the preceding element is less than or equal to $e$,
it is done with $e$ because all elements earlier in the array must be smaller.
Insertion sort is described concicely in [](#alg:insertion-sort).

::: {.algorithm #alg:insertion-sort}
#### Algorithm: Insertion sort

Divide the array into an initial sorted part, and an unsorted part.
The sorted part is initially empty.
Repeat the following until the unsorted part is empty:

1. Take the first of the unsorted elements, $e$.
2. Insert $e$: while $e$ is smaller than the element before it, swap the two.

After these steps $e$ is in the sorted part, and the unsorted part is reduced by one element.
Pseudocode implementation:

```pseudo
    insertionSort(arr):
        n = arr.size
        for i in 1 .. n-1:                    // i is the start of the unsorted area
            j = i                             // arr[j] is the element to be inserted
            while j>0 and arr[j] < arr[j-1]:  // while arr[j] is not in the right position
                swap(arr, j, j-1)             // move arr[j] backwards one step
                j -= 1
```

:::



:::::::: online
#### Insertion sort visualisation

::: dsvis
Here we see the first few iterations of Insertion sort.

``` {.jsav-animation src="Sorting/insertionsortCON.js" links="Sorting/InsertionSort.css" name="Insertion Sort Slideshow"}
```
:::



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

