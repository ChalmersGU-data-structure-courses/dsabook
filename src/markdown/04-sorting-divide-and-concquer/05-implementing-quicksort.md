## Implementing quicksort

::: TODO
- pseudocode
:::

### Partition

### Selecting the pivot

Perhaps the most important choice in implementing Quicksort is how to
choose the pivot. Choosing a bad pivot can result in all elements of the
array ending up in the same partition, in which case Quicksort ends up
taking quadratic time.

Choosing the *first* or the *last* element of the array is a bad
strategy. If the input array is sorted, then the first element of the
array will also be the smallest element. Hence all elements of the array
will end up in the "greater than pivot" partition. Worse, the exact
same thing will happen in all the recursive calls to Quicksort. Hence
the partitioning will be as bad as possible, and Quicksort will end up
taking quadratic time. You sometimes see implementations of Quicksort
that use the first element as the pivot, but this is a bad idea!

Above, we picked the *middle* element of the array, to avoid this
problem. This works well enough, but in practice, more sophisticated
strategies are used.

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

A significant improvement can be gained by recognizing that Quicksort is
relatively slow when $n$ is small. This might not seem to be relevant if
most of the time we sort large arrays, nor should it matter how long
Quicksort takes in the rare instance when a small array is sorted
because it will be fast anyway. But you should notice that Quicksort
itself sorts many, many small arrays! This happens as a natural
by-product of the divide and conquer approach.

A simple improvement might then be to replace Quicksort with a faster
sort for small subarrays, say Insertion Sort or Selection Sort. However,
there is an even better -- and still simpler -- optimization. When
Quicksort partitions are below a certain size, do nothing! The values
within that partition will be out of order. However, we do know that all
values in the array to the left of the partition are smaller than all
values in the partition. All values in the array to the right of the
partition are greater than all values in the partition. Thus, even if
Quicksort only gets the values to "nearly" the right locations, the
array will be close to sorted. This is an ideal situation in which to
take advantage of the best-case performance of Insertion Sort. The final
step is a single call to Insertion Sort to process the entire array,
putting the records into final sorted order. At what size should we
switch to Insertion Sort? The answer can only be determined by empirical
testing, but on modern machines the answer is probably somewhere between
10 and 100.

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

