
### Implementing sets and maps using linked lists

A simple way to implement a set is to use a *linked list*.
Recall from @sec:stacks-implemented-as-linked-lists that
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
```
[  |-]--> [   |-]--> [  |X]
```
:::

To search for an element we just iterate through all nodes and compare with the value we are looking for.
To add an element we can simply insert it at the head of the list.
But before we do that we have to search for it to check that it is not already in the list,
because the set cannot have duplicate elements.

To remove an element we search for it to get its node,
and then we repoint the preceding node to the node following it, like this:

```
... --> [ a |-]--> [ key |-]--> [ b |-]--> ...

to

... --> [ a |-]---------------> [ b |-]--> ...
                   [ key | ]
```

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

    datatype MapNode of K to V:
        key: K
        value: V
        next: MapNode

Just as for priority queues, we can also use dynamic arrays to implement sets and maps,
and we will discuss that in the next section.
