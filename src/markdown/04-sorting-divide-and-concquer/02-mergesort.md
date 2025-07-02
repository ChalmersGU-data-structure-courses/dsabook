
## Mergesort

::: TODO
- Prio 1: complexity analysis
- Prio 2: general rewrite of the text
- Prio 3: invariants
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
        if A.size <= 1:
            return
        L1 = half of A
        L2 = other half of A
        mergeSort(L1)
        mergeSort(L2)
        merge(L1, L2)

::: dsvis
Here is a visualisation that illustrates how Mergesort works.

<avembed id="mergesortAV" src="Sorting/mergesortAV.html" type="ss" name="Mergesort Visualisation"/>
:::

#### Merge

The hardest step to understand about Mergesort is the merge function.
The merge function starts by examining the first record of each sublist
and picks the smaller value as the smallest record overall. This smaller
value is removed from its sublist and placed into the output list.
Merging continues in this way, comparing the front records of the
sublists and continually appending the smaller to the output list until
no more input records remain.

Here is pseudocode for merging two lists:

    function merge(L1, L2):
        answer = new empty list
        while L1 and L2 are nonempty:
            x = first element of L1
            y = first element of L2
            if x <= y:
                append x to answer
                remove x from L1
            else:
                append y to answer
                remove y from L2
        // Now only one of L1 and L2 is nonempty, so append its remaining elements
        append all elements of L1 or L2 to answer
        return answer

::: dsvis
Here is a visualisation for the merge operation.

<inlineav id="mergesortCON" src="Sorting/mergesortCON.js" name="Merging Slideshow"/>
:::

::: dsvis
#### Practice exercise: Merging

Here is a Mergesort warmup exercise to practice merging.

<avembed id="MergesortMergePRO" src="Sorting/MergesortMergePRO.html" type="ka" name="Mergesort Merging Proficiency Exercise"/>
:::

::: dsvis
### Practice exercise: Merge sort

Now here is a full proficiency exercise to put it all together.

<avembed id="mergesortPRO" src="Sorting/mergesortPRO.html" type="pe" name="Mergesort Proficiency Exercise"/>
:::

<!--
### Invariants
-->

### Complexity analysis

::: TODO
- Change the long lists to an image
- complexity
- cutoff to insertion sort *does not* change complexity
- stable, not in-place
:::

Consider repeatedly splitting an array of $N$ elements, where $N=2^k$ is a power of 2:

- The first level consists of the full array:
    - Splitting the full array into two halves requires $N$ units of work.
- The second level consists of two halves, with $N/2$ elements each:
    - Splitting one of the halves into two requires $N/2$ units of work.
    - Splitting the other half into two requires $N/2$ units of work.
    - In total $2\times N/2 = N$ units of work.
- The third level consists of four quarters, with $N/4$ elements each:
    - Splitting each of the quarters requires $N/4$ units of work.
    - In total $4\times N/4=N$ units of work.
- ...
- ...until level $k$, which consists of $N/2$ sub-arrays, each of which contains only $2$ elements.
    - Splitting each of the pairs requires $2$ units of work.
    - In total $N/2\times 2=N$ units of work.

After a sub-array has been split, the next level is called recursively which returns the sorted splits.
Then we have to merge them before returning the sorted sub-array to the previous level:

- Level $k$ consists of $N/2$ pairs of singleton arrays.
    - To merge a pair we have to look at each of the values, so it requires $2$ units of work.
    - In total $N/2\times 2=N$ units of work.
- Level $k-1$ consists of $N/4$ pairs of sorted $2$-element arrays.
    - Merging two $2$-elements arrays requires $4$ units of work.
    - In total $N/4\times 4=N$ units.
- ...
- Level two consists of $2$ pairs of sorted $N/4$-element arrays.
    - Merging two $N/4$-element arrays requires $N/2$ units of work.
    - In total $2\times N/2=N$.
- And finally the first level constists of one pair of sorted $N/2$-element arrays.
    - Merging these two arrays requires $N$ units of work.

In summary, each level spends $O(N)$ time, and there are $k=\log N$ levels.
So the total running time of mergesort is $O(N \log N)$.
Note that this cost is unaffected by the relative order of the values being sorted, thus this analysis holds for the best, average, and worst cases.


::: dsvis
This visualisation provides a running time analysis for Mergesort.

<inlineav id="MergeSortAnalysisCON" src="Sorting/MergeSortAnalysisCON.js" name="Mergesort Analysis Slideshow" links="Sorting/MergeSortAnalysisCON.css"/>
:::



