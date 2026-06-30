
### Implementing sets and maps using linked lists

A simple (but inefficient) data structure to implement a set is a *linked list*.
Recall from @sec:sequences:linked-stacks that
a linked list consists of nodes pointing to their successors:

::: online
```jsav-figure
var av = NewAV();
var l = av.ds.list({nodegap: 30});
l.addFirst("").addFirst("").addFirst("");
l.layout();
av.displayInit();
av.recorded();
```
:::

::: latex

::: center
![](images/ADTs-LinkedListSet1.svg){width=50%}
:::

This list represents the set $\{A,B,C\}$. Note that we do not have an ordering invariant here, values can appear in any order in the list, so the lists $[C,B,A]$ and $[A,C,B]$ also represent the set $\{A,B,C\}$.
The only invariant is that values are distinct, so the list $[A,A,B,C]$ is not a valid representation of a set.

:::

To search for an element we just iterate through all nodes and compare with the value we are looking for.
To add an element we can simply insert it at the head of the list.
But before we do that we have to search for it to check that it is not already in the list,
because a set does not allow duplicate elements.

To remove an element we search for it to get its node,
and then we repoint the preceding node to the node following it, like this to remove
element $B$:

::: center
![](images/ADTs-LinkedListSet2.svg){width=50%}
:::

Conceptually this is not difficult, but the code becomes a little complicated
because we have to keep track of the preceding node:

    remove(set, key):
        previous = null
        node = set.head
        while node is not null and key != node.key:
            previous = node
            node = node.next
        if previous is null:
            set.head = node.next
        else:
            previous.next = node.next

Note that we have a special case:
if the preceding node is null it is the head of the list that should be removed.

The linked list can easily be modified to implement a map instead of a set.
We just augment the linked list nodes to also include the value:

    datatype MapNode:
        next = null  // Pointer to the next node in the list
        key          // Key for this node
        value        // Value for this node

Just as for priority queues, we can also use dynamic arrays to implement sets and maps,
and we will discuss that in the next section.
