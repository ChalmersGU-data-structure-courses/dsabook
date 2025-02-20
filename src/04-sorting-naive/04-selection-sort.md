
## Selection sort

::: TODO
This version selects the largest element and puts it in the end,
which is different from Wikipedia, Programiz, etc.
They selects the smallest element and puts it at the front.
:::

Consider again the problem of sorting a pile of phone bills for the past
year. Another intuitive approach might be to look through the pile until
you find the bill for January, and pull that out. Then look through the
remaining pile until you find the bill for February, and add that behind
January. Proceed through the ever-shrinking pile of bills to select the
next one in order until you are done. This is the inspiration for our
last $\Theta(n^2)$ sort, called [Selection Sort]{.term}.

The $i$'th pass of Selection Sort "selects" the $i$'th
largest key in the array, placing that record at the end of the array.
In other words, Selection Sort first finds the largest key in an
unsorted list, then the next largest, and so on. Its unique feature is
that there are few record swaps. To find the next-largest key value
requires searching through the entire unsorted portion of the array, but
only one swap is required to put the record into place. Thus, the total
number of swaps required will be $n-1$ (we get the last record in place
"for free").

Here is an implementation for Selection Sort.

    function selectionSort(A):
        N = A.size()
        for i = 1 to N-1:               // Select i'th biggest element
            bigindex = 0                // Current biggest index
            for j = 1 to N-i+1:         // Find the max value
                if A[j] > A[bigindex]:  // Found something bigger
                    bigindex = j        // Remember bigger index
            swap(A, bigindex, N-i)      // Put it into place


Consider the example of the following array.

<inlineav id="selectionsortS1CON" src="Sorting/selectionsortS1CON.js" name="Selection Sort Slideshow 1"/>

Now we continue with the second pass. However, since the largest record
is already at the right end, we will not need to look at it again.

<inlineav id="selectionsortS2CON" src="Sorting/selectionsortS2CON.js" name="Selection Sort Slideshow 2"/>

Selection Sort continues in this way until the entire array is sorted.

The following visualization puts it all together.

<avembed id="selectionsortAV" src="Sorting/selectionsortAV.html" type="ss" name="Selection Sort Visualization"/>

Now try for yourself to see if you understand how Selection Sort works.

<avembed id="SelsortPRO" src="Sorting/SelsortPRO.html" type="ka" name="Selection Sort Proficiency Exercise"/>


### Invariants


### Selection sort analysis

Any algorithm can be written in slightly different ways. For example, we
could have written Selection Sort to find the smallest record, the next
smallest, and so on. We wrote this version of Selection Sort to mimic
the behavior of our Bubble Sort implementation as closely as possible.
This shows that Selection Sort is essentially a Bubble Sort except that
rather than repeatedly swapping adjacent values to get the next-largest
record into place, we instead remember the position of the record to be
selected and do one swap at the end.

This visualization analyzes the number of comparisons and swaps required
by Selection Sort.

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

