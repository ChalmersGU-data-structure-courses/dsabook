
## Case study: Implementing using sorted arrays {#implementing-using-arrays}

In @sec:implementing-using-linked-lists we showed how to implement sets and maps using linked lists.
An alternative is to use a dynamic array instead,
and if we make sure that the array is always sorted, we can at least make searching fast.

### Implementing sets

A simple implementation of sets is to use a sorted dynamic array of values.

    datatype SortedArraySet of V:
        values: Dynamic array of V   // This array must be sorted in V
        size: int

Implementing the set methods *contains*, *add*, and *remove*, is still quite straightforward:

-   Since we know that the internal array is sorted, we can use binary search to lookup elements (see @sec:binary:search).
    This suddenly becomes a fast operation (logarithmic in the size of the set).

-   Unfortunately, modifying the data structure is still slow.
    If we want to add an item to a sorted array, we have to keep the array sorted
    -- and that means we need to *insert* the new item at the right place in the array,
    using the insertion algorithm from Insertion Sort (@sec:insertion-sort).
    This takes linear time in the worst case.

-   Similarly, remove an item without creating a hole in the array,
    we need to shift a bunch of elements in the array, and this also takes linear time.

So, a sorted array is still a slow data structure.
However, using it is suitable if the set *never changes* (or very rarely).
That is, where we never (or very rarely) need to add or remove items after the set is created.
We can initialise our set by adding all elements to the dynamic array,
and then sort it (for example, using Quicksort or Mergesort).
Then we can use binary search to find items in the set.

Sorted arrays also support *sorted set* operations such as *range queries* (see @sec:sorted-sets-and-maps),
because these can also be implemented using binary search.

Sorted arrays can also be useful in cases where we always add *many*
items in one go. Given a sorted array $A$, and an unsorted list of items
$B$, we can add the items in $B$ to $A$ as follows. First we sort $B$,
then we merge $A$ and $B$, using the merge algorithm from Mergesort.
Note that the merge step takes linear time, and sorting $B$ takes a bit
more than linear time, so this is a lot faster than adding all the items
from $B$ one by one (which would take quadratic time).

### Implementing maps

If we want to implement a map instead of a set, we have two choices:

-   We can have an array of *key-value* pairs.
-   Alternatively, we can use two arrays, one for holding the keys and another for holding the values.
    The two lists must be "kept in sync" so that a key with its value occurs at the same position.

Here we show the latter solution, where we have two arrays -- one for the keys and another for the values:

    datatype SortedArrayMap of K to V:
        keys: Array of K
        values: Array of V
        size: Int

The implementations of the map methods are left as exercises to the reader, but there are some important things to remember:

-   The `keys` and `values` must be kept in sync, so that `keys[i]` is always the key for the value in `values[i]`.
-   This means that we have to remember to modify both arrays in the same way
    -- if we delete the $i$th element we have to delete both `keys[i]` and `values[i]` (and shift the arrays in the same way).
