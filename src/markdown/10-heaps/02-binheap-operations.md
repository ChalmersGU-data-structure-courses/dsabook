
## Operations on binary heaps {#heaps:binheap-operations}

When implementing a data structure, it is often helpful to encode the invariants explicitly and verify them,
possibly using assertions, within the various operations.
This can make it easier to detect errors and ensure that the data structure remains valid after each modification.
As a simple example, we define a function that verifies that a given binary heap satisfies the *heap property*:

    checkHeapPropery(heap):
        for pos in 1 .. heap.size-1:
            if heap[pos] < heap[parent(pos)]:
                return false
        return true

Note that we start the iteration from position $1$.
This is because position $0$ contains the root of the tree, and the root doesn't have a parent.

When modifying a data structure that must satisfy an invariant,
the goal is to update the structure while ensuring the invariant still holds.
In practice, it is often easier to separate these steps:
first perform the modification, even if this temporarily breaks the invariant, and then repair the structure to restore it.
We will follow this approach when defining the binary heap operations in this section.

Recall from @sec:ADTs:priority-queues that a priority queue can be modified using two main operations:
to insert an element, and to remove the highest-priority element.
How can we implement those two in a binary heap?

### Inserting into a heap {#heaps:binheap-insert}

We want to be able to add elements to our heap.
Since we are using a dynamic array, there is only one place where we can insert a new element: at the end of the array.
However, the newly inserted element is not necessarily in the correct position, so the insertion may temporarily violate the heap invariant.
We must therefore restore the heap property after adding the new element.

The new element might have higher priority than its parent.
If this happens, we swap the new element with its parent.
We then repeat the same check from the new position, because the element may still have too high priority to remain there,
until the element either reaches the root or has a parent with higher priority.
The process is specified in [](#alg:binheap-insert).

::: {.algorithm #alg:binheap-insert}
#### Adding to a binary heap
To insert the value $v$ into a heap:

- Add $v$ to the end of the heap.
- Repeat until $v$ reaches its correct position:
    - Compare $v$ with its parent.
    - If $v$ has higher priority, swap it with the parent.

This can be translated to pseudocode quite straightforwardly:

    add(heap, elem):
        heap.addLast(elem)                 // Add the element to end of the heap.
        pos = heap.size - 1                // This is the position of the new element.
        while pos > 0 and heap[pos] < heap[parent(pos)]:
            swap(heap, pos, parent(pos))   // Swap the element with its parent.
            pos = parent(pos)              // Move up one level in the tree.
:::

Notice that we do not need to compare the new element with its parent's other child, if there is one.
Before the insertion, the heap already satisfied the heap invariant, so the parent had higher priority than both of its children.
Therefore, if the new element has higher priority than the parent, it must also have higher priority than the other child.
On the other hand, if the new element does not have higher priority than its parent, then it is already in the correct position.
So, to restore the heap invariant after insertion, it is enough to compare the new element only with its parent as it moves upward through the heap.
This process of moving the value up the tree is often called "bubble-up", "trickle-up", "swim-up" or "sift-up".
@Fig:HeapAdd10 illustrates how the algorithm works for inserting the value 10 into the heap from @fig:HeapTreeExample.
Note that the heap is shown as a tree, but you should keep in mind that it is actually stored as an array.

![
    Inserting 10 into the example heap in @fig:HeapTreeExample.
    (a) After inserting 10, we place it at the next free position, shown here as the right child of 43.
    (b) Since 10 is smaller than its parent 43, the two elements swap positions.
    (c) The value 10 is still smaller than its new parent 12, so we swap once more.
    Now 10 has parent 8, which is smaller, so the heap property is restored.
](images/9.5-binheap-add.svg){#fig:HeapAdd10}


::: dsvis
#### Inserting 10 into the example heap
``` {.jsav-animation src="Binary/heapinsertCON.js" scripts="DataStructures/binaryheap.js" name="Heap insert Slideshow"}
```
:::

As discussed in the previous section, the height of a binary heap is *logarithmic* in its size.
Every iteration of the loop in [](#alg:binheap-insert) moves the new element upward by at most one level.
In the worst case, it moves from the last level all the way to the root, and there are at most a logarithmic number of levels.
Therefore, inserting a value into a binary heap takes $O(\log(n))$ time in the worst case.

::: dsvis
#### Exercise: Insert into a *min*-heap
```{.jsav-embedded src="Binary/heapinsertPRO.html" type="pe" name="Heap Insert Proficiency Exercise"}
```
:::

### Removing from a heap {#heaps:binheap-remove}

There is only one an element you can remove from a binary heap -- the one with the highest priority.
This is always stored at the root of the heap, at index $0$ in the array.
Therefore we want to remove the root.
However, we cannot simply leave the root empty, since this would violate the requirement that the heap remains a complete binary tree.

Instead, we remove the *last* element in the array, and replace the root with it.
This preserves completeness but may violate the heap property.
The new root may now have lower priority than one or both of its children.
Therefore we compare it with its children and swap it with the one that has higher priority.
It is essential to choose the smaller child --
otherwise, the heap property could still be violated after the swap.
Once the swap is performed, the element moves down the tree.
We repeat the process from the new position, until the element is in its correct place --
that is, until it has higher priority than both of its children, or it reaches a leaf.
At that point, the heap property is restored.
This process is often called "bubble-down", "trickle-down", "sink-down" or "sift-down",
and is specified in [](#alg:binheap-remove).

::: {.algorithm #alg:binheap-remove}
#### Removing from a binary heap
To remove the highest-priority element (the root) from a binary heap:

- Delete the last element of the heap, and replace the root with it.
- Let the new root be $v$.
- Repeat until $v$ reaches its correct position:
    - Compare $v$ with its highest-priority child.
    - If the child has higher priority, swap them.
:::

The complexity of this algorithm is logarithmic, $O(\log(n))$, for the same reason as adding an element:
Since the tree is complete, there are a logarithmic number of levels,
and the element travels downward by one level in each iteration.
In the worst case, it moves from the root all the way to a leaf.
@Fig:HeapRemove10 illustrates how the algorithm works for removing the highest-priority value
from the final heap in @fig:HeapAdd10.

![
    Removing the highest-priority element from the final heap in @fig:HeapAdd10.
    (a) We remove the last heap element, 43, and replace the root with it.
    (b) The smallest child, 10, is smaller than 43, so we swap it with the parent.
    (c) The smallest child, 12, is smaller than 43, so we swap it with the parent.
    Now 43 only has larger children, so the heap property is restored.
](images/9.5-binheap-remove.svg){#fig:HeapRemove10}

::: dsvis
#### Removing the highest-priority value from the example heap
``` {.jsav-animation src="Binary/heapmaxCON.js" scripts="DataStructures/binaryheap.js" name="Remove Max Slideshow"}
```
:::

To turn the algorithm into pseudocode we make use of a function to identify the smallest child of a node.
The implementation of this helper function, `smallestChild`, is left as an exercise --
it should return `null` if the node has no children at all.

    removeMin(heap):
        oldRoot = heap[0]             // Remember the current highest-priority element.
        heap[0] = heap.removeLast()   // Remove the last element from the array,
        pos = 0                       // and put it into the root position.
        child = smallestChild(heap, pos)
        while child is not null and heap[child] < heap[pos]:
            swap(heap, pos, child)             // Swap the element with its smallest child.
            pos = child                        // Move down one level in the tree.
            child = smallestChild(heap, pos)   // Find the next smallest child.
        return oldRoot                // Return the old root.

<!--
We use a helper function to identify the smallest child of a node.
If there are no children it returns null, so that the while loop above can stop.

    smallestChild(heap, pos):
        if left(pos) >= heap.size:                   // We are at a leaf.
            return null
        else if right(pos) >= heap.size:             // There is no right child.
            return left(pos)
        else if heap[left(pos)] < heap[right(pos)]:  // The left child has higher priority.
            return left(pos)
        else:                                        // The right child has higher priority.
            return right(pos)
-->

::: note
#### Don't forget to swap the root
One common mistake is to forget to replace the root with the last heap element,
and instead try to replace the root with its smallest child.
(And then "bubble down" the hole of that child.)
This approach *does not work* because the heap must maintain the shape of a complete binary tree.
For example, if we use this idea to remove the minimum element from the final heap in @fig:HeapRemove10,
we would end up with 12 as the root, and 15 as its right child.
But 15 would not have any right child, and we no longer have a complete tree.
:::

::: dsvis
#### Exercise: Delete from a min-heap
```{.jsav-embedded src="Binary/heapremovePRO.html" type="pe" name="Heap Remove Exercise"}
```
:::

<!-- Don't include removing of arbitrary nodes
::: dsvis
#### Removing arbitrary nodes
``` {.jsav-animation src="Binary/heapremoveCON.js" scripts="DataStructures/binaryheap.js" name="Remove Any Slideshow"}
```
:::
-->

### Changing the priority of elements {#heaps:change-priority}

In some applications, the priority of an element may change over time, or we may need to remove an element other than the root.
To support such operations efficiently, we must know the position of the element in the heap.

However, the heap invariant is not helpful for locating an arbitrary element.
It only guarantees that each node has higher priority than its children --
but does not tell us how elements are distributed across different subtrees.
As a result, when searching for a specific element, we cannot determine which subtree to explore next.
In the worst case, we must traverse the entire tree, which takes $O(n)$ time.
To avoid this costly search, we have to maintain an additional data structure that keeps track of each element's position in the heap.
For example, we can use a map (see @sec:ADTs:maps), that associates each element with its index in the array.
We will discuss efficient implementations of maps later, in [Chapter @sec:search-trees;@sec:hash-tables].

Once the element has been found, updating or removing it is straightforward.
To update the priority of an element, we restore the heap property by bubbling it up if its priority has increased, or down if its priority has decreased.
To remove an element, we remove the last element of the array and put it in the place of the element to be removed,
then we restore the heap property in the same way as when we updated the priority.
If finding the correct node in the additional lookup table takes logarithmic time,
then updates and removals of arbitrary elements are also in $O(\log(n))$,
because the remaining work consists only of restoring the heap property.


### Heapification {#heaps:heapify}

Sometimes we want to turn an array into a binary heap -- we want to *heapify* the array.
That is, to rearrange the elements so they form a valid heap.
One possibility is to insert them one by one into an empty heap.
Assuming that the array has $n$ elements, then building this new heap takes $O(n\log(n))$ time.

However, there is a faster *in-place* algorithm for heapification.
The idea is to treat the original array as a complete binary tree from the start --
which can be thought of as a binary heap that violates the heap property.
Now we iterate through the tree nodes in backwards order,
starting from the lowest level and moving upwards.
In each iteration we restore the heap property for that node,
and this is done by "bubbling it down" the subtree.

There are $n$ nodes and and bubbling down a node is logarithmic in the worst case,
so we get the same complexity as before, $O(n\log(n))$.
However, if we analyse the behaviour in more detail we can see that
the heapify algorithm is similar to [](#ex:linear-nested-loop) in @sec:analysis-2:advanced-upper-bound,
and it actually has linear complexity, $O(n)$.

This means that it is asymptotically faster to heapify many elements in one go,
than to insert them one by one into a heap.
The difference is not huge but it is noticeable if we have a very large array.

#### Heapsort

As already mentioned in @sec:ADTs:priority-queues,
we can use a priority queue (for example a binary heap) to implement a very simple sorting algorithm:
first (1) insert all elements from the unsorted array into a min-heap,
then (2) remove each element in turn from the heap, putting it in its correct position in the original array.
This sorting algorithm has the same time complexity as Mergesort, $O(n\log(n))$,
but in practice it is much slower so it is not used.

However, there is another sorting algorithm which is both competetive and also in-place.
It is called *heapsort*:

1. Heapify the array into a *max*-heap.
2. Repeat until the heap is exhausted:
    - Swap the first and last elements in the heap,
      decrease the heap size and bubble down the new first element.

The crucial step here is to only decrease the "virtual" heap size in step 2, we must not reduce the array size.
This means that the root element is swapped to an array cell that lies *outside* the heap.
When the heap gets smaller and smaller, the sorted tail of the array grows until the whole array is sorted.
