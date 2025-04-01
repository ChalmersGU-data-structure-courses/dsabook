
## Selection sort

::: TODO
- Prio 1: write about invariants
- Prio 1: change the pseudocode
    - The current version selects the largest element and puts it in the end,
      which is different from Wikipedia, Programiz, etc.
      They select the smallest element and puts it at the front.
    - We have to change the animations too!
- Prio 2: rewrite a little, because now it looks like insertion sort has already been introduced
- Prio 2: improve the analysis (not just a visualisation)
:::

Let's say you have a large pile of books that you want to put in your bookshelf, in alphabetical order by author's surname.
How would you go about?
One natural way to do handle this is to look through the pile until you find the first book (by an author named Ajvide), and put that first in the bookshelf.
Then you look through the remaining pile until you find the second book (written by Bengtsdotter), and add that behind Ajvide.
Then find the third book (by Cassler), and add behind Bengtsdotter.
Proceed through the shrinking pile of books to select the next one in order until you are done.
This is the inspiration for our next sorting algorithm, called [Selection sort]{.term}.

The $i$'th pass of Selection sort "selects" the $i$'th smallest key in the array, placing that record at position $i$ in the array.
In other words, Selection sort first finds the smallest key in an unsorted list, then the next smallest, and so on.
Its unique feature is that there are few record swaps, much fewer than Bubble sort.
To find the next-smallest key value requires searching through the entire unsorted portion of the array, but only one swap is required to put the record into place.
Thus, the total number of swaps required will be $n-1$ (we get the last record in place "for free").

Here is an implementation for Selection sort.

    function selectionSort(A):
        N = A.size()
        for i in 0 .. N-1:               // Select i'th smallest element
            minIndex = i                 // Current smallest index
            for j in i+1 .. N-1:         // Find the smallest value
                if A[j] > A[minIndex]:   // Found something smaller
                    minIndex = j         // Remember smaller index
            swap(A, i, minIndex)         // Put it into place

Consider the example of the following array.

<inlineav id="selectionsortS1CON" src="Sorting/selectionsortS1CON.js" name="Selection Sort Slideshow 1" links="Sorting/selectionsortSCON.css"/>

Now we continue with the second pass. However, since the smallest record is already at the beginning, we will not need to look at it again.

<inlineav id="selectionsortS2CON" src="Sorting/selectionsortS2CON.js" name="Selection Sort Slideshow 2" links="Sorting/selectionsortSCON.css"/>

Selection sort continues in this way until the entire array is sorted.

The following visualization puts it all together.

<avembed id="selectionsortAV" src="Sorting/selectionsortAV.html" type="ss" name="Selection Sort Visualization"/>

Now try for yourself to see if you understand how Selection sort works.

<avembed id="SelsortPRO" src="Sorting/SelsortPRO.html" type="ka" name="Selection Sort Proficiency Exercise"/>


### Invariants


### Selection sort analysis

Any algorithm can be written in slightly different ways.
For example, we could have written Selection sort to find the largest record and put it at the end of the array, then the next
smallest, and so on.
That version of Selection sort would behave very similar to our Bubble sort implementation, except that rather than repeatedly swapping adjacent values to get the next-largest record into place, it instead remembers the position of the record to be selected and does one swap at the end.

This visualization analyzes the number of comparisons and swaps required by Selection sort.

<inlineav id="SelectionSortAnalysisCON" src="Sorting/SelectionSortAnalysisCON.js" name="Selection Sort Analysis Slideshow" links="Sorting/SelectionSortAnalysisCON.css"/>

There is another approach to keeping the cost of swapping records low,
and it can be used by any sorting algorithm even when the records are
large. This is to have each element of the array store a pointer to a
record rather than store the record itself. In this implementation, a
swap operation need only exchange the pointer values. The large records
do not need to move. This technique is illustrated by the following
visualization. Additional space is needed to store the pointers, but the
return is a faster swap operation.

:::: {#PointerSwap}
<inlineav id="ptrSwapCON" src="Sorting/ptrSwapCON.js" name="Selection Sort Pointer Swap" links="Sorting/ptrSwapCON.css"/>
::::

