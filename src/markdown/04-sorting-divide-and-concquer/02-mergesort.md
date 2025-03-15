
## Mergesort

::: TODO
- Prio 1: invariants
- Prio 1: complexity analysis
- Prio 2: general rewrite of the text
:::

A natural approach to problem solving is divide and conquer. To use
divide and conquer when sorting, we might consider breaking the list to
be sorted into pieces, process the pieces, and then put them back
together somehow. A simple way to do this would be to split the list in
half, sort the halves, and then merge the sorted halves together. This
is the idea behind [Mergesort]{.term}.

Mergesort is one of the simplest sorting algorithms conceptually, and
has good performance both in the asymptotic sense and in empirical
running time. Unfortunately, even though it is based on a simple
concept, it is relatively difficult to implement in practice. Here is a
pseudocode sketch of Mergesort:

    function mergeSort(A):
        if A.size() <= 1:
            return A
        L1 = half of A
        L2 = other half of A
        return merge(mergeSort(L1), mergeSort(L2))

Here is a visualization that illustrates how Mergesort works.

<avembed id="mergesortAV" src="Sorting/mergesortAV.html" type="ss" name="Mergesort Visualization"/>

The hardest step to understand about Mergesort is the merge function.
The merge function starts by examining the first record of each sublist
and picks the smaller value as the smallest record overall. This smaller
value is removed from its sublist and placed into the output list.
Merging continues in this way, comparing the front records of the
sublists and continually appending the smaller to the output list until
no more input records remain.

Here is pseudocode for merge on lists:

    function merge(L1, L2):
        answer = new empty list
        while L1 is not empty and L2 is not empty:
            x = first element of L1
            y = first element of L2
            if x <= y
                append x to answer
                remove L1's first element
            else
                append y to answer
                remove L2's first element
        // Now one of L1 and L2 is empty, so append all remaining elements
        append all elements of L1 to answer
        append all elements of L2 to answer
        return answer

Here is a visualization for the merge operation.

<inlineav id="mergesortCON" src="Sorting/mergesortCON.js" name="Merging Slideshow"/>

Here is a Mergesort warmup exercise to practice merging.

<avembed id="MergesortMergePRO" src="Sorting/MergesortMergePRO.html" type="ka" name="Mergesort Merging Proficiency Exercise"/>


### Invariants


### Mergesort practice exercise

Now here is a full proficiency exercise to put it all together.

<avembed id="mergesortPRO" src="Sorting/mergesortPRO.html" type="pe" name="Mergesort Proficiency Exercise"/>

This visualization provides a running time analysis for Mergesort.

<inlineav id="MergeSortAnalysisCON" src="Sorting/MergeSortAnalysisCON.js" name="Mergesort Analysis Slideshow" links="Sorting/MergeSortAnalysisCON.css"/>



### Complexity analysis

::: TODO
- complexity
- cutoff to insertion sort *does not* change complexity
- stable, not in-place
:::


