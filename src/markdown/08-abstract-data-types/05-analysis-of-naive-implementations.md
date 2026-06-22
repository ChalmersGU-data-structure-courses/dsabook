
## Analysing the naive implementations {#ADTs:naive-analysis}

In previous sections we have showed how to implement priority queues, sets and maps
as linked lists or dynamic arrays.
Although they work as they should, they are not as efficient as we want them to be.

In later chapters we will show how to implement these abstract data types
so that all core operations are efficient.


### Priority queues

In @sec:ADTs:priority-queues we showed how to implement a priority queue using a sorted list.
What is the complexity of the core operations?

Removing the minimum element is easy:
since the list is sorted the minimum element can be found in an instant,
and removing it is exactly the same as popping a stack,
which we already know is an efficient operation.
However, adding an element takes some time because we have to search for
the right location where to insert it.
This takes linear time in the size of the list, $O(n)$.

It is also possible to implement the priority queue as an unsorted list.
Then adding an element becomes efficient, because we can just add it at the front.
But removing the minumum now takes linear time, because we have to search for it.

Therefore a normal linear data structure, such as a *linked list* or *dynamic array*,
cannot implement a priority queue efficiently.
This is because either insertion or removal will take linear time, $O(n)$, in the worst case.

### Sets and maps

In @sec:ADTs:sets-and-maps we showed how to implement sets and maps using a linked list.
This is quite inefficient: all operations take linear time in the size of the list, $O(n)$,
because in the worst case we have to look at all nodes.

### Sorted sets and maps

To implement sorted sets and maps we used a sorted dynamic array.
This works a little better than linked lists, because searching for keys becomes efficient.
Since we know that the internal array is sorted, we can use binary search to lookup elements.
Therefore, searching in a sorted set or map is efficient, logarithmic in the length of the array, $O(\log(n))$.
All kinds of range queries for sorted sets and maps are also efficient,
because these can be implemented using binary search.

Unfortunately, modifying the data structure is still slow.
If we want to add an item to a sorted array, we have to keep the array sorted --
and that means we need to *insert* the new item at the right place in the array,
using the insertion algorithm from Insertion Sort (@sec:sorting-1:insertion-sort).
This takes linear time in the worst case.
Similarly, to remove an item without creating a hole in the array,
we need to shift a bunch of elements in the array, and this also takes linear time.

So, a sorted array is still a slow data structure.
However, it can be useful in some special circumstances:
if we know that the set *never changes*,
that is, if we will not need to add or remove items after the set is created.
Then we can initialise our set by adding all elements to the dynamic array,
and then sort it (for example, using Quicksort or Mergesort).
After that we can use binary search to find items in the set.

<!-- OPENDSA: START -->
<!--
Sorted arrays can also be useful in cases where we always add *many*
items in one go. Given a sorted array $A$, and an unsorted list of items
$B$, we can add the items in $B$ to $A$ as follows. First we sort $B$,
then we merge $A$ and $B$, using the merge algorithm from Mergesort.
Note that the merge step takes linear time, and sorting $B$ takes a bit
more than linear time, so this is a lot faster than adding all the items
from $B$ one by one (which would take quadratic time).
-->
<!-- OPENDSA: END -->

### Summary

Here is a summary table of the naive implementations of priority queues, sets and maps:

+-------------+---------------------+-----------------+-------------------+
|             |  Priority queue as  |  Set/map as     | Sorted set/map as |
|             | a sorted list/array |  a linked list  |  a sorted array   |
+:============+:===================:+:===============:+:=================:+
| Add         |  $O(n)$             |  $O(n)$         |  $O(n)$           |
+-------------+---------------------+-----------------+-------------------+
| Remove      |   --                |  $O(n)$         |  $O(n)$           |
+-------------+---------------------+-----------------+-------------------+
| RemoveMin   |  $O(1)$             |  --             |  --               |
+-------------+---------------------+-----------------+-------------------+
| Search      |   --                |  $O(n)$         |  $O(\log(n))$     |
+-------------+---------------------+-----------------+-------------------+

