
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

    function mergeSort(arr):
        if A.size <= 1:
            return
        L1 = half of arr
        L2 = other half of arr
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
- cutoff to Insertion sort *does not* change complexity
- stable, not in-place
:::

Consider repeatedly splitting an array of $n$ elements, where $n$ is a power of 2.
The recursion will go down $k=\log n$ levels until there are only $1$-element arrays left.
Each recursion level is shown as one row in this table:

  Level       How many parts      Size per part         Splitting each part
----------  ------------------  --------------------  --------------------------------------
    1         The full array      $n$ elements          $1\times n = n$ units of work
    2         $2$ halves          $n/2$ elements        $2\times n/2 = n$ units of work
    3         $4$ quarters        $n/4$ elements        $4\times n/4 = n$ units of work
   ...        ...                 ...                   ...
   $k$        $n/2$ subarrays     $2$ elements          $n/2\times 2 = n$ units of work
----------  ------------------  --------------------  --------------------------------------

<!--
- The first level consists of the full array:
    - Splitting the full array into two halves requires $n$ units of work.
- The second level consists of two halves, with $n/2$ elements each:
    - Splitting one of the halves into two requires $n/2$ units of work.
    - Splitting the other half into two requires $n/2$ units of work.
    - In total $2\times n/2 = n$ units of work.
- The third level consists of four quarters, with $n/4$ elements each:
    - Splitting each of the quarters requires $n/4$ units of work.
    - In total $4\times n/4=n$ units of work.
- ...
- ...until level $k$, which consists of $n/2$ sub-arrays, each of which contains only $2$ elements.
    - Splitting each of the pairs requires $2$ units of work.
    - In total $n/2\times 2=n$ units of work.
-->

After a sub-array has been split, the next level is called recursively which returns the sorted splits.
Then we have to merge them before returning the sorted sub-array to the previous level,
which is shown in the following table:

   Level         How many parts           Size per part           Merging pairs
-------------  -----------------------  ----------------------  --------------------------------------
   $k$           $n$ singleton arrays     $1$ element each        $n\times 1 = n$ units of work
  $k-1$          $n/2$ pairs              $2$ elements each       $n/2\times 2 = n$ units of work
   ...           ...                      ...                     ...
    2            $4$ subarrays            $n/4$ elements each     $4\times n/4 = n$ units of work
    1            $2$ subarrays            $n/2$ elements each     $2\times n/2 = n$ units of work
-------------  -----------------------  ----------------------  --------------------------------------

<!--
- Level $k$ consists of $n/2$ pairs of singleton arrays.
    - To merge a pair we have to look at each of the values, so it requires $2$ units of work.
    - In total $n/2\times 2=n$ units of work.
- Level $k-1$ consists of $n/4$ pairs of sorted $2$-element arrays.
    - Merging two $2$-elements arrays requires $4$ units of work.
    - In total $n/4\times 4=n$ units.
- ...
- Level two consists of $2$ pairs of sorted $n/4$-element arrays.
    - Merging two $n/4$-element arrays requires $n/2$ units of work.
    - In total $2\times n/2=n$.
- And finally the first level constists of one pair of sorted $n/2$-element arrays.
    - Merging these two arrays requires $n$ units of work.
-->

In summary, each level spends $O(n)$ time, and there are $k=\log n$ levels.
So the total running time of Mergesort is $O(n \log n)$.
Note that this cost is unaffected by the relative order of the values being sorted, thus this analysis holds for the best, average, and worst cases.


::: dsvis
This visualisation provides a running time analysis for Mergesort.

<inlineav id="MergeSortAnalysisCON" src="Sorting/MergeSortAnalysisCON.js" name="Mergesort Analysis Slideshow" links="Sorting/MergeSortAnalysisCON.css"/>
:::



