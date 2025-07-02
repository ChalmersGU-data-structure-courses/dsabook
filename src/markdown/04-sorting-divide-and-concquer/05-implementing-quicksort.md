## Implementing Quicksort

::: TODO
- Prio 2: dangers with quadratic behaviour: hackers
- Prio 3: pseudocode for pivot picking
:::

In this section we go into more details in how to implement Quicksort.

### Partition

There were some important details that we didn't mention in the pseudocode for partition in the previous section.

- The pivot element should *not* be part of the actual partitioning, so after swapping the pivot into the leftmost position, we should move the left pointer one step.
- We also have to add a check that the left pointer doesn't continue moving rightwards when it has met the right pointer.
- And similarly for the right pointer.

Here is more detailed pseudocode that takes the details into account:

    function partition(arr, left, right, pivot) -> Int:
        swap(arr, left, pivot)   // Put pivot at the leftmost index
        pivot = left
        left = left + 1          // Start partitioning from the element after the pivot

        while true:
            // Move the left pointer rightwards as far as possible,
            // as long as it hasn't passed the right pointer, *and* the value is smaller than the pivot.
            while left <= right and arr[left] < arr[pivot]:
                left = left + 1
            // Move the right pointer leftwards as far as possible,
            // as long as it hasn't passed the left pointer, *and* the value is greater than the pivot.
            while left <= right and arr[right] > arr[pivot]:
                right = right - 1
            // Break out of the loop if the pointers has passed each other.
            if left > right:
                break
            // Otherwise, swap the elements and move both pointers one step towards each other.
            swap(arr, left, right)
            left = left + 1
            right = right - 1

        swap(arr, pivot, right)   // Finally, move the pivot into place
        return right              // Return the position of the pivot


As we mentioned in the previous section, we swap the pivot with the value at the *right* pointer.
This is because we started by putting the pivot first in the subarray.

It is also possible to start by putting the pivot at the end of the subarray.
In that case we have to swap the pivot value with the *left* pointer in the end.
This is an equally good alternative partitioning algorithm.

:::::: latex
\booklink{Read the rest online}{4.5}{sec:partition}
::::::

:::::: online
::: topic
#### An alternative partitioning algorithm

The partitioning algorithm we just presented is called *Hoare's partitioning scheme*, but there is another common algorithm which is called *Lomuto's partitioning scheme*.

In this algorithm we still have two pointers, but both start at the left and move rightwards.
Below we call them $i$ and $j$, where $i\leq j$.
The invariant is that the elements from *left* to $i-1$ are less than the pivot, and the elements from $i$ to $j$ are greater than or equal to the pivot.
In this case we start by putting the pivot at the end of the subarray.

    function partition(arr, left, right, pivot) -> Int:
        swap arr[pivot] with arr[right]
        pivot = right
        right = right - 1
        i = left
        for j in left .. right:
            if arr[j] <= arr[pivot]:
                swap(arr, i, j)
                i = i + 1
        swap arr[pivot] with arr[i]
        return i

However, Lomuto's partitioning algorithm is somewhat less efficient than Hoare's algorithm, because it makes more swaps.
:::
::::::

### Selecting the pivot

Perhaps the most important choice in implementing Quicksort is how to
choose the pivot. Choosing a bad pivot can result in all elements of the
array ending up in the same partition, in which case Quicksort ends up
taking quadratic time.

#### First or last element

Choosing the *first* or the *last* element of the array is a bad
strategy. If the input array is sorted, then the first element of the
array will also be the smallest element. Hence all elements of the array
will end up in the "greater than pivot" partition. Worse, the exact
same thing will happen in all the recursive calls to Quicksort. Hence
the partitioning will be as bad as possible, and Quicksort will end up
taking quadratic time. You sometimes see implementations of Quicksort
that use the first element as the pivot, but this is a bad idea!

#### Middle element

Above, we picked the *middle* element of the array, to avoid this
problem. This works well enough, but in practice, more sophisticated
strategies are used.

#### Median-of-three

The theoretically best choice of pivot is one that divides the array
equally in two, i.e. the median element of the array. However, the
median of an array is difficult to compute (unless you sort the array
first!) Instead, many Quicksort implementations use a strategy called
*median-of-three*. In median-of-three, we pick elements from three
positions in the array: the *first* position, the *middle* position and
the *last* position. Then we take the median of these three elements.
For example, given the array [3, 1, 4, 1, 5, 9, 2], we pick out the
elements 3 (first position), 1 (middle position) and 2 (last
position). The median of 3, 1 and 2 is 2, so we pick 2 as the pivot.

Median-of-three is not guaranteed to pick a good pivot: there are cases
where it partitions the input array badly. However, these bad cases do
not seem to occur in practice. In practice, median-of-three picks good
pivots, and it is also cheap to implement. It is used by most real-world
Quicksort implementations.

#### Random pivot

Another good approach is to pick a random element of the array as the
pivot. This makes it somewhat unlikely to get a poor partitioning.
What's more, if we do get a poor partitioning, it is likely that in the
recursive call to `quickSort`, we will choose a different pivot and get
a better partitioning. Unlike median-of-three, this approach is
theoretically sound: there are no input arrays which make it work badly.

Another way to get the same effect is to pick e.g. the first element as
the pivot, but to *shuffle* the array before sorting, rearranging it
into a random order. The array only needs to be shuffled once before
Quicksort begins, not in every recursive call.

### More practical improvements

There are some things we can do to improve the efficiency of Quicksort.

#### Backing off to Insertion sort

A significant improvement can be gained by recognising that Quicksort is
relatively slow when the array is small. This might not seem to be relevant if
most of the time we sort large arrays, nor should it matter how long
Quicksort takes in the rare instance when a small array is sorted
because it will be fast anyway. But you should notice that Quicksort
itself sorts many, many small arrays! This happens as a natural
by-product of the divide and conquer approach.

A simple improvement is to replace Quicksort with a faster sort for small subarrays.
This is a very common improvement, and usually one uses Insertion sort as the backoff algorithm.
Now, at what size should we switch to Insertion sort?
The answer can only be determined by empirical testing, but on modern machines the answer is probably somewhere between 10 and 100.

Note that this improvement can also be used for Mergesort!

:::::: latex
\booklink{Read the rest online}{4.6}{sec:more-practical-improvements}
::::::

:::::: online
#### Running Insertion sort in a single final pass

There is a variant of this optimisation: When
Quicksort partitions are below a certain size, do nothing! The values
within that partition will be out of order. However, we do know that all
values in the array to the left of the partition are smaller than all
values in the partition. All values in the array to the right of the
partition are greater than all values in the partition. Thus, even if
Quicksort only gets the values to "nearly" the right locations, the
array will be close to sorted. This is an ideal situation in which to
take advantage of the best-case performance of Insertion sort. The final
step is a single call to Insertion sort to process the entire array,
putting the records into final sorted order.

#### Reduce recursive calls

The last speedup to be considered reduces the cost of making recursive
calls. Quicksort is inherently recursive, because each Quicksort
operation must sort two sublists. Thus, there is no simple way to turn
Quicksort into an iterative algorithm. However, Quicksort can be
implemented using a stack to imitate recursion, as the amount of
information that must be stored is small. We need not store copies of a
subarray, only the subarray bounds. Furthermore, the stack depth can be
kept small if care is taken on the order in which Quicksort's recursive
calls are executed. We can also place the code for `findPivot` and
`partition` inline to eliminate the remaining function calls. Note
however that by not processing small sublists of size nine or less as
suggested above, most of the function calls will already have been
eliminated. Thus, eliminating the remaining function calls will yield
only a modest speedup.

::::::
