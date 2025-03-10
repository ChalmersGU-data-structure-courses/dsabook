
## Bubble sort

::: TODO
- Prio 1: write about invariants
- Prio 2: rewrite a little, because now it looks like insertion sort has already been introduced
- Prio 2: improve the analysis (not just a visualisation)
:::

Our next sorting algorithm is called [Bubble Sort]{.term}.
Bubble Sort is often taught to novice programmers in
introductory computer science courses. This is unfortunate, because
Bubble Sort has no redeeming features whatsoever. It is rather slow,
even compared to the other $\Theta(n^2)$ sorts that are commonly known.
It is not particularly intutitive -- nobody is going to come naturally
to Bubble Sort as a way to sort their Bridge hand or their pile of bills
like they might with
[Insertion Sort] or [Selection Sort].
However, Bubble Sort can viewed as a close relative of Selection Sort.

Like Insertion Sort, Bubble Sort consists of a simple double `for` loop.
The inner `for` loop moves through the record array from left to right,
comparing adjacent keys. If a record's key value is greater than the
key of its right neighbor, then the two records are swapped. Once the
record with the largest key value is encountered, this process will
cause it to "bubble" up to the right of the array (which is where
Bubble Sort gets its name). The second pass through the array repeats
this process. However, because we know that the record with the largest
value already reached the right of the array on the first pass, there is
no need to compare the rightmost two records on the second pass.
Likewise, each succeeding pass through the array compares adjacent
records, looking at one less record toward the end than did the
preceding pass. Here is an implementation.

    function bubbleSort(A):
        N = A.size()
        for i = 0 to N-2:
            // Bubble up the i'th element
            for j = 1 to N-i-1:
                if A[j-1] > A[j]:
                    swap(A, j-1, j)


<inlineav id="bubblesortS1CON" src="Sorting/bubblesortS1CON.js" name="Bubble Sort Slideshow 1"/>

Now we continue with the second pass. However, since the largest record
has "bubbled" to the very right, we will not need to look at it again.

<inlineav id="bubblesortS2CON" src="Sorting/bubblesortS2CON.js" name="Bubble Sort Slideshow 2"/>

Bubble Sort continues in this way until the entire array is sorted.

The following visualization shows the complete Bubble Sort. You can
input your own data if you like.

<avembed id="bubblesortAV" src="Sorting/bubblesortAV.html" type="ss" name="Bubble Sort Visualization"/>

Now try for yourself to see if you understand how Bubble Sort works.

<avembed id="BubsortPRO" src="Sorting/BubsortPRO.html" type="ka" name="Bubble Sort Proficiency Exercise"/>


### Invariants


### Bubble sort analysis

The following visualization illustrates the running time analysis of
Bubble Sort.

<inlineav id="BubbleSortAnalysisCON" src="Sorting/BubbleSortAnalysisCON.js" name="Bubble Sort Analysis Slideshow" links="Sorting/BubbleSortAnalysisCON.css"/>

Thus, Bubble Sort's running time is roughly the same in the best,
average, and worst cases.

The number of swaps required depends on how often a record's value is
less than that of the record immediately preceding it in the array. We
can expect this to occur for about half the comparisons in the average
case, leading to $\Theta(n^2)$ for the expected number of swaps. The
actual number of swaps performed by Bubble Sort will be identical to
that performed by Insertion Sort.
