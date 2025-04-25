
## Insertion sort

::: TODO
- Prio 3: write about invariants
:::

Consider again the problem of sorting a pile of books.
Another intuitive approach might be to pick up the two topmost books in the pile and put them in order in the bookshelf.
Then you take another book from the pile and put it in the bookshelf, in the correct position with respect to the first two, and so on.
As you take each book, you would add it in the bookshelf in the correct position to always keep the shelf sorted.
This simple approach is the inspiration for our third sorting algorithm, called [Insertion sort]{.term}.

Just as for selection sort, the description above is not in-place.
But just as for selection sort, it's relatively easy to turn it into an in-place algorithm, by remembering an invisible separator between the sorted books (on the left) and the still-unsorted books (on the right).

Insertion sort iterates through a list of elements. For each iteration,
the current element is inserted in turn at the correct position within a
sorted list composed of those elements already processed. Here is an
implementation. The input is an array named $A$ that stores $N$ elements.

    function insertionSort(A):
        N = A.size
        for i in 1 .. N-1:
            // Move the i'th element to its correct position.
            j = i
            while j > 0 and A[j] < A[j-1]:
                swap(A, j, j-1)
                j = j-1

### Selection sort visualisation

Here we see the first few iterations of Insertion sort.

<inlineav id="insertionsortCON" src="Sorting/insertionsortCON.js" name="Insertion Sort Slideshow" links="Sorting/InsertionSort.css"/>

This continues on with each element in turn.
Call the current element $x$.
Insertion sort will move it to the left so long as it is smaller than element immediately preceding it.
As an element is less than or equal to $x$ is encountered, `insertionSort` is done with that element because all elements to its left in the array must be smaller.

The following visualization shows the complete Insertion sort. You can input your own data if you like.

<avembed id="insertionsortAV" src="Sorting/insertionsortAV.html" type="ss" name="Insertion Sort Visualization"/>

Now try for yourself to see if you understand how Insertion sort works.

<avembed id="InssortPRO" src="Sorting/InssortPRO.html" type="ka" name="Insertion Sort Proficiency Exercise"/>

<!--
### Invariants
-->

### Insertion sort analysis

Just as for the previous sorting algorithms, we have a nested for loop, where the inner loop depends on the loop variable of the outer loop.

- The outer loop is iterated $N-1$ times in total.
- The inner loop is harder to analyze since it depends on how many elements in positions $0,\ldots,i-1$ are smaller than the element in position $i$.
    - in the absolute worst case, we always have to move the element to the front of the list, so the number of comparisons will be $i-1$
    - in the best case, the element is already in place, and then we only need one comparison

Therefore, the worst case complexity of insertion sort is $\sum_0^N i$, which is quadratic, $O(N^2)$.
In the best case -- when the list is already sorted -- the complexity is instead linear, $O(N)$, because we only have to do one comparison per iteration.

Here is an explanation of the worst case cost of insertion sort:

<inlineav id="InsertionSortWorstCaseCON" src="Sorting/InsertionSortWorstCaseCON.js" name="Insertion Sort Worst Case Slideshow" links="Sorting/InsertionSort.css"/>

And here is an explanation of the cost of the best case:

<inlineav id="InsertionSortBestCaseCON" src="Sorting/InsertionSortBestCaseCON.js" name="Insertion Sort Best Case Slideshow" links="Sorting/InsertionSort.css"/>

And here is the average case cost:

<inlineav id="InsertionSortAverageCaseCON" src="Sorting/InsertionSortAverageCaseCON.js" name="Insertion Sort Average Case Slideshow" links="Sorting/InsertionSort.css"/>

While the best case is significantly faster than the average and worst
cases, the average and worst cases are usually more reliable indicators
of the "typical" running time. However, there are situations where we
can expect the input to be in sorted or nearly sorted order. One example
is when an already sorted list is slightly disordered by a small number
of additions to the list; restoring sorted order using Insertion sort
might be a good idea if we know that the disordering is slight. And even
when the input is not perfectly sorted, Insertion sort's cost goes up
in proportion to the number of inversions. So a "nearly sorted" list
will always be cheap to sort with Insertion sort.
An example of an algorithm that take advantage of Insertion sort's near-best-case running time is [Shellsort]{.term}.

Counting comparisons or swaps yields similar results. Each time through
the inner `for` loop yields both a comparison and a swap, except the
last (i.e., the comparison that fails the inner `for` loop's test),
which has no swap. Thus, the number of swaps for the entire sort
operation is $N-1$ less than the number of comparisons. This is 0 in the
best case, and $O(N^2)$ in the average and worst cases.

Later we will see algorithms whose growth rate is much better than
$O(N^2)$. Thus for larger arrays, Insertion sort will not be so
good a performer as other algorithms. So Insertion sort is not the best
sorting algorithm to use in most situations. But there are special
situations where it is ideal. We already know that Insertion sort works
great when the input is sorted or nearly so. Another good time to use
Insertion sort is when the array is very small, since Insertion sort is
so simple. The algorithms that have better asymptotic growth rates tend
to be more complicated, which leads to larger constant factors in their
running time. That means they typically need fewer comparisons for
larger arrays, but they cost more per comparison. This observation might
not seem that helpful, since even an algorithm with high cost per
comparison will be fast on small input sizes. But there are times when
we might need to do many, many sorts on very small arrays. You should
spend some time right now trying to think of a situation where you will
need to sort many small arrays. Actually, it happens a lot.

<!--
See [Computational Fairy Tales: Why Tailors Use Insertion Sort][FAIRYTALES] for a discussion on how the relative costs of
search and insert can affect what is the best sort algorithm to use.

[FAIRYTALES]: http://computationaltales.blogspot.com/2011/04/why-tailors-use-insertion-sort.html
-->

