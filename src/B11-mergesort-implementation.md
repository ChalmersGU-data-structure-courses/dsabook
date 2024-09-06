
## Implementing Mergesort

Implementing Mergesort presents a number of technical difficulties. The
first decision is how to represent the lists. Mergesort lends itself
well to sorting a singly linked list because merging does not require
random access to the list elements. Thus, Mergesort is the method of
choice when the input is in the form of a linked list. Implementing
`merge` for linked lists is straightforward, because we need only remove
items from the front of the input lists and append items to the output
list. Breaking the input list into two equal halves presents some
difficulty. Ideally we would just break the lists into front and back
halves. However, even if we know the length of the list in advance, it
would still be necessary to traverse halfway down the linked list to
reach the beginning of the second half. A simpler method, which does not
rely on knowing the length of the list in advance, assigns elements of
the input list alternating between the two sublists. The first element
is assigned to the first sublist, the second element to the second
sublist, the third to first sublist, the fourth to the second sublist,
and so on. This requires one complete pass through the input list to
build the sublists.

When the input to Mergesort is an array, splitting input into two
subarrays is easy if we know the array bounds. Merging is also easy if
we merge the subarrays into a second array. Note that this approach
requires twice the amount of space as any of the sorting methods
presented so far, which is a serious disadvantage for Mergesort. It is
possible to merge the subarrays without using a second array, but this
is extremely difficult to do efficiently and is not really practical.
Merging the two subarrays into a second array, while simple to
implement, presents another difficulty. The merge process ends with the
sorted list in the auxiliary array. Consider how the recursive nature of
Mergesort breaks the original array into subarrays. Mergesort is
recursively called until subarrays of size 1 have been created,
requiring $\log n$ levels of recursion. These subarrays are merged into
subarrays of size 2, which are in turn merged into subarrays of size 4,
and so on. We need to avoid having each merge operation require a new
array. With some difficulty, an algorithm can be devised that alternates
between two arrays. A much simpler approach is to copy the sorted
sublists to the auxiliary array first, and then merge them back to the
original array.

Here is a complete implementation for mergesort following this approach.
The input records are in array `A`. Array `temp` is used as a place to
temporarily copy records during the merge process. Parameters `left` and
`right` define the left and right indices, respectively, for the
subarray being sorted. The initial call to `mergeSort` would be
`mergeSort(array, temparray, 0, n-1)`.

    function mergeSort(A, temp, left, right):
        if left == right:                 // List has one record
            return
        mid = int((left + right) / 2)     // Select midpoint
        mergeSort(A, temp, left, mid)     // Mergesort first half
        mergeSort(A, temp, mid+1, right)  // Mergesort second half
        for i = left to right:            // Copy subarray to temp
            temp[i] = A[i]
        // Do the merge operation back to A
        i1 = left
        i2 = mid + 1
        for curr = left to right:
            if i1 > mid:                  // Left sublist exhausted
                A[curr] = temp[i2]
                i2 = i2 + 1
            else if i2 > right:           // Right sublist exhausted
                A[curr] = temp[i1]
                i1 = i1 + 1
            else if temp[i1] <= temp[i2]: // Get smaller value
                A[curr] = temp[i1]
                i1 = i1 + 1
            else:
                A[curr] = temp[i2]
                i2 = i2 + 1



Here is a visualization for the merge step.

<inlineav id="mergeImplS1CON" src="Sorting/mergeImplS1CON.js" name="Mergesort Implementation Slideshow 1"/>
