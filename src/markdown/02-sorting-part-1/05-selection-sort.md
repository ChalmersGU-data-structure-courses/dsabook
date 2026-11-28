
## Selection sort {#sorting-1:selection-sort}

Recall the description of Selection sort from the previous section:

> *Select the smallest book on the floor, and put it next to the sorted books in the shelf.*

The bookshelf is of course an array, and selecting the first book in alphabetical order
corresponds to finding the minimal element using some comparison function.
There are two main issues with this description:

- We want sorting to be in-place; instead of moving books from a pile to a shelf,
  we want to rearrange books inside the shelf.
- Finding the smallest book in an array is easy using a linear search,
  but how do we find the third or one thousandth smallest book?

To solve both these issues, we imagine the bookshelf divided into two parts:
The left part has the smallest books in the shelf, in sorted order, and the right
part has books that have not yet been sorted.
To gradually extend the sorted part, we *select* the smallest
book from the unsorted part, and move it to its correct position at the end of the sorted part.
The move is performed by swapping the positions of the smallest unsorted book and the leftmost unsorted book.

In the illustration below, we are sorting an array with 15 elements, and have done four steps of the algorithm.
That means the first four positions have the four smallest elements in ascending order.
The index *i* points to the first unsorted element (34) and *minIndex* to the smallest of the unsorted elements (19).
Swapping them lets us extend the sorted part of the array:

`\noindent`{=latex}
![](images/2.5-two-steps-selection-sort-1.svg)

`\noindent`{=latex}
In the swap, 34 is moved to the position 19 occupied, not because
we want 34 there specifically, but because 34 has to remain somewhere in the unsorted part.
Importantly, 19 is now in its correct position -- we never have to move 19 again.
Eventually, 34 and all other elements will also be moved to their correct positions,
but since 21 is the smallest of the remaining unsorted elements, this illustrates the next step:

`\noindent`{=latex}
![](images/2.5-two-steps-selection-sort-2.svg)

`\noindent`{=latex}
Selection sort is described in more detail in [](#alg:selection-sort),
along with a pseudocode implementation.


::: {.algorithm #alg:selection-sort}
#### Algorithm: Selection sort

Divide the array into a sorted and an unsorted part,
where the sorted part is to the left and initially empty.
Then repeat until the unsorted part is empty:

1. Find the smallest unsorted element, $e$.
2. Swap $e$ with the leftmost of the unsorted elements.
3. Now $e$ belongs to the sorted part.

Each repetition of these steps reduces the unsorted part by one element,
so by the end of the procedure all elements are sorted.
We implement the algorithm using a nested loop,
where the counter $i$ represents the size of the sorted part
(which is also the index of the first unsorted element).
Note that the inner loop is hidden inside the `findSmallest` function, described in [](#ex:find-smallest).

```pseudo
    function selectionSort(arr):
        n = arr.size
        for i in 0 .. n-1:       // Find the i'th smallest element:
            minIndex = findSmallest(arr, i, n-1)
            swap(arr, i, minIndex)   // Swap it into position i
```
:::

An important observation about Selection sort is that elements in the sorted area are always less than or
equal to elements in the unsorted area. This guarantees that moving the smallest element in the unsorted
area to the end of the sorted area keeps the sorted area in correct order.
This can be formulated as an *invariant*:

::: invariant
#### Invariant: Selection sort
After iteration $i$, the first $i$ elements of the array are sorted,
and they are all smaller than the elements in the rest of the array.
:::

Another observation is that the $i$th iteration of Selection sort "selects" the $i$th smallest element in the array,
placing it at position $i$. This guarantees that the element is in the correct position.
These observations lead to an alternative *inductive* description of Selection sort:

- To sort the array interval $[i,n]$ in-place:
    1. Swap the smallest element in the interval with position $i$.
    2. Sort the remaining interval $[i{+}1,n]$ in-place.

An interesting aspect of this description is that step two does not require us to
use Selection sort for the remaining interval, any in-place sorting algorithm would work.
The description highlights how we reduce the problem of sorting a number of elements into a smaller problem of the same kind.
This is similar to Binary search ([](#alg:binary-search)`\commapageref{}`{=latex}), but the reduction is less significant --
reducing the size of the problem by one instead of cutting it in half.
<!-- We also perform more work to achieve
the reduction: where Binary search required a single comparison, Selection sort has to find the smallest
of $n$ elements. -->

<!-- The alternative description is also great for convincing someone that the algorithm works,
in fact it is very similar to a mathematical proof by induction: The algorithm is trivially
correct when sorting $1$ or $0$ elements, and if we assume it works for $n$ elements we can
easily prove that it works for $n+1$ elements. -->

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


