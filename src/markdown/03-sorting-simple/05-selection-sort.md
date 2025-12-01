
## Selection sort

::: TODO
- Prio 3: write about invariants
:::

Let's say you have a large pile of books that you want to put in your bookshelf, in alphabetical order by author's surname.
How would you go about?
One natural way to do handle this is to look through the pile until you find the first book (say, by an author named *Ajvide*), and put that first in the bookshelf.
Then you look through the remaining pile until you find the second book (written by *Bengtsdotter*), and add that behind *Ajvide*.
Then find the third book (by *Cassler*), and add behind *Bengtsdotter*.
Proceed through the shrinking pile of books to select the next one in order until you are done.
This is the inspiration for our next sorting algorithm, called [Selection sort]{.term}.

In the description above the books are not in the shelf from the start, which makes the algorithm not in-place.
But it is easy to turn this into an in-place algorithm, where all books are in the shelf from the start.
We just have to remember an invisible separator between the sorted books (on the left) and the still-unsorted books (on the right).
Whenever we have found the next book to put in place, we *swap* it with the book that is in the way.

The $i$'th pass of Selection sort "selects" the $i$'th smallest element in the array, placing it at position $i$ in the array.
In other words, Selection sort first finds the smallest element in an unsorted list, then the next smallest, and so on.
Its unique feature is that there are few swaps, much fewer than Bubble sort.
To find the next-smallest element we have to search through the entire unsorted portion of the array, but only one swap is required to put the element into place.

Here is an implementation for Selection sort.

    function selectionSort(arr):
        n = arr.size
        for i in 0 .. n-1:                  // Select i'th smallest element
            minIndex = i                    // Current smallest index
            for j in i+1 .. n-1:            // Find the smallest value
                if arr[j] < arr[minIndex]:  // Found something smaller
                    minIndex = j            // Remember smaller index
            swap(arr, i, minIndex)          // Put it into place

Any algorithm can be written in slightly different ways.
For example, we could have written Selection sort to find the largest element and put it at the end of the array, then the next
smallest, and so on.
That version of Selection sort would behave very similar to our Bubble sort implementation, except that rather than repeatedly swapping adjacent values to get the next-largest element into place, it instead remembers the position of the element to be selected and does one swap at the end.

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

<!--
### Invariants
-->

### Selection sort analysis

We have a nested for loop, where the inner loop depends on the loop variable of the outer loop.

- The outer loop is iterated $n$ times in total.
- In iteration $i$, the number of comparisons made by the inner loop is always $n-i-1$.

As you might notice, this is exactly the same as the number of comparisons Bubble sort makes.
So, Selection sort makes $n(n-1)/2$ comparisons, which is quadratic, $O(n^2)$.

The advantage compared to Bubble sort is that Selection sort makes a lot fewer swaps.
For each outer iteration it only makes one swap, so the total number of swaps will be $n-1$ (we get the last element in place "for free").
So, Selection sort makes a linear number of swaps, $O(n)$.

::: dsvis
This visualisation analyses the number of comparisons and swaps required by Selection sort.

``` {.jsav-animation src="Sorting/SelectionSortAnalysisCON.js" links="Sorting/SelectionSortAnalysisCON.css" name="Selection Sort Analysis Slideshow"}
```
:::

<!-- The following is only interesting for low-level languages (e.g. C), other languages do this by default, so we skip it.

There is another approach to keeping the cost of swapping records low,
and it can be used by any sorting algorithm even when the records are
large. This is to have each element of the array store a pointer to a
record rather than store the record itself. In this implementation, a
swap operation need only exchange the pointer values. The large records
do not need to move. This technique is illustrated by the following
visualisation. Additional space is needed to store the pointers, but the
return is a faster swap operation.

:::: {#PointerSwap}
``` {.jsav-animation src="Sorting/ptrSwapCON.js" links="Sorting/ptrSwapCON.css" name="Selection Sort Pointer Swap"}
```
::::
-->
