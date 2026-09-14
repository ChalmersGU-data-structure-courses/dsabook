
## Operations on binary heaps {#heaps:binheap-operations}

::: TODO
- Prio 1: add a short introduction about the main operations
:::

### Inserting into a heap

We want to be able to add elements to our heap.
Since we are using a dynamic array, there is only one place where we can insert a new element: at the end of the array.
However, the newly inserted element is not necessarily in the correct position, so the insertion may temporarily violate the heap invariant.
We must therefore restore the heap property after adding the new element.

The new element might have higher priority than its parent.
If this happens, we swap the new element with its parent.
We then repeat the same check from the new position, because the element may still have too high priority to remain there.
This process continues until the element either reaches the root or has a parent with higher priority.

Notice that we do not need to compare the new element with its parent's other child, if there is one.
Before the insertion, the heap already satisfied the heap invariant, so the parent had higher priority than both of its children.
Therefore, if the new element has higher priority than the parent, it must also have higher priority than the other child.
On the other hand, if the new element does not have higher priority than its parent, then it is already in the correct position.
So, to restore the heap invariant after insertion, it is enough to compare the new element only with its parent as it moves upward through the heap.
This process of moving the value up the tree is often called "bubble-up", "trickle-up", "swim-up" or "sift-up".

::: algorithm
#### Algorithm: Adding to a binary heap
To insert the value $v$ into a heap:

- Add $v$ to the end of the heap.
- Repeat until $v$ reaches its correct position:
    - Compare $v$ with its parent.
    - If $v$ has higher priority, swap it with the parent.
:::

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


The algorithm above can be translated to pseudocode quite straightforwardly:

    add(heap, elem):
        heap.addLast(elem)                 // Add the element to end of the heap.
        pos = heap.size - 1                // This is the position of the new element.
        while pos > 0 and heap[pos] < heap[parent(pos)]:
            swap(heap, pos, parent(pos))   // Swap the element with its parent.
            pos = parent(pos)              // Move up one level in the tree.

Since a heap is a complete binary tree, its height is as small as possible for the number of nodes it contains.
A heap with $n$ nodes therefore has height $O(\log(n))$.
Intuitively, this is because each new level in the tree can contain twice as many nodes as the previous level.
The $i$th level contains $2^i$ nodes, and the first $i+1$ levels together contain $2^{i+1} - 1$ nodes.
So the number of levels grows logarithmically with the number of nodes.

Each call to `add` takes $O(\log(n))$ time in the worst case.
This is because the inserted element can move upward by at most one level at a time.
In the worst case, it moves from the last level all the way to the root.
Therefore, inserting $n$ values one at a time takes $O(n \log(n))$ time in the worst case.

::: dsvis
#### Exercise: Insert into a *min*-heap

```{.jsav-embedded src="Binary/heapinsertPRO.html" type="pe" name="Heap Insert Proficiency Exercise"}
```
:::

### Removing from a heap

Heaps are usually used to implement priority queues, where we repeatedly remove the element with the highest priority.
This is the next element to be processed, and it is always stored at the root of the heap, at index $0$ in the array.

To remove the highest-priority element, we remove the root.
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
This process is often called "bubble-down", "trickle-down", "sink-down" or "sift-down".

::: algorithm
#### Algorithm: Remove the element with highest priority from a binary heap
To remove the highest-priority element, that is, the root of the heap:

- Delete the last element of the heap, and replace the root with it.
  Let the new root be $v$.
- Repeat until $v$ reaches its correct position:
    - Compare $v$ with its highest-priority child.
    - If the child has higher priority, swap them.
:::


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

`\bigskip\noindent`{=latex}
***Note***:
One common mistake is to forget to replace the root with the last heap element,
and instead try to replace the root with its smallest child.
(And then "bubble down" the hole of that child.)
This approach *does not work* because the heap must maintain the shape of a complete binary tree.
For example, if we use this idea to remove the minimum element from the final heap in @fig:HeapRemove10,
we would end up with 12 as the root, and 15 as its right child.
But 15 would not have any right child, and we no longer have a complete tree.

The complexity of this algorithm is logarithmic, $O(\log(n))$, of the same reason as adding an element:
Since the tree is complete, there are a logarithmic number of levels,
and the element travels downward by one level in each iteration.
In the worst case, it moves from the root all the way to a leaf.

Here is pseudocode for removing the highest-priority element:

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

We use a helper function to identify the smallest child of a node.
If there are no children it returns null, so that the while loop above can stop.

<!-- \newpage -->

    smallestChild(heap, pos):
        if left(pos) >= heap.size:                   // We are at a leaf.
            return null
        else if right(pos) >= heap.size:             // There is no right child.
            return left(pos)
        else if heap[left(pos)] < heap[right(pos)]:  // The left child has higher priority.
            return left(pos)
        else:                                        // The right child has higher priority.
            return right(pos)


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
It guarantees only that each node has higher priority than its children.
It does not tell us how elements are distributed across different subtrees.
As a result, when searching for a specific element, we cannot determine which subtree to explore next.
In the worst case, we must traverse the entire tree, which takes $O(n)$ time.

Once the element has been found, updating or removing it is straightforward.
To update the priority of an element, we restore the heap property by bubbling it up if its priority has increased, or down if its priority has decreased.
To remove an element, we remove the last element of the array and put it in the place of the element to be removed,
then we restore the heap property in the same way as when we updated the priority.

To avoid the costly $O(n)$ search, we can maintain an auxiliary data structure that keeps track of each element's position in the heap.
For example, we can use a lookup table, or map (see @sec:ADTs:maps), that associates each element with its index in the array.
If lookup in this table takes $O(\log(n))$ time, then updates and removals of arbitrary elements also take $O(\log(n))$ time,
because the remaining work consists only of restoring the heap property.
