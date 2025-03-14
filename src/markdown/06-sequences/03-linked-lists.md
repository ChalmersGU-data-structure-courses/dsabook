
## Linked lists

::: TODO
- Prio 1: invariants
- Prio 1: explanation and pseudocode for deletion
:::

In this module we present one of the two traditional implementations for
lists, usually called a [linked list]{.term}.
The linked list uses [dynamic memory allocation]{.term}, that is, it allocates memory for new list elements as
needed. The following diagram illustrates the linked list concept. There
are three [nodes](#node){.term} that are
"linked" together. Each node has two boxes. The box on the right holds
a link to the next node in the list. Notice that the rightmost node has
a diagonal slash through its link box, signifying that there is no link
coming out of this box.

<inlineav id="LinkedList-Overview-CON" src="ChalmersGU/LinkedList-Overview-CON.js" name="Linked List Overview" links="ChalmersGU/CGU-Styles.css" static/>

Because a list node is a distinct object (as opposed to simply a cell in
an array), it is good practice to make a separate list node class. This
can either be a standalone class or an inner class, and both have their
advantages and disadvantages.

The list built from such nodes is called a
[singly linked list]{.term}, or a
[one-way list]{.term}, because each list node
has a single pointer to the next node on the list.

<inlineav id="LinkedList-Iteration-CON" src="ChalmersGU/LinkedList-Iteration-CON.js" name="Linked List Slideshow 1" links="ChalmersGU/CGU-Styles.css"/>

Our class for linked lists contains two instance variables, one pointer
to the head of the list, and a variable storing the number of elements.
(This second variable is in theory unnecessary, but it improves the
efficiency of getting the list size).

    class LinkedList implements List:
        LinkedList():
            this.head = null    // Pointer to list header
            this.listSize = 0   // Size of list


Here is our implementation for list nodes, the class `Node`.
Objects in the `Node` class contain a field `elem` to store the
element value, and a field `next` to store a pointer to the next node on
the list.

    class Node:
        Node(elem, next):
            this.elem = elem   // Value for this node
            this.next = next   // Pointer to next node in list



### Invariants


### Getting and setting values

If we want to get or set the value at a certain index, we simply iterate
through the nodes in sequence until we get to the node we want.

    class LinkedList implements List:
        ...
        get(i):
            precondition: 0 <= i < this.listSize
            current = this.head
            repeat i times:
                current = current.next
            return current.elem

        set(i, x):
            precondition: 0 <= i < this.listSize
            current = this.head
            repeat i times:
                current = current.next
            current.elem = x


### Adding and removing nodes

However, if we want to add or remove nodes, there is a problem with
using a pointer to the `current` node.

<inlineav id="LinkedList-Problems-CON" src="ChalmersGU/LinkedList-Problems-CON.js" name="Linked List Add/Remove Problems" links="ChalmersGU/CGU-Styles.css"/>

So, using a `current` pointer, it is possible to add and remove nodes,
using some complicated coding. But this does not work for the very last
node! There are several possible ways to deal with this problem. One is
to always have an empty node (a "dummy node") at the very end of the
list, but this will increase memory usage.

Another simple solution is to have a pointer to the node *before* the
current node. This is the solution we will adopt.

### Adding a node

<inlineav id="LinkedList-Add-CON" src="ChalmersGU/LinkedList-Add-CON.js" name="Linked List Add Slideshow" links="ChalmersGU/CGU-Styles.css"/>

Here are some special cases for linked list insertion: Inserting at the
beginning of a list, and appending at the end.

<inlineav id="LinkedList-AddSpecial-CON" src="ChalmersGU/LinkedList-AddSpecial-CON.js" name="Linked List Add Special Cases Slideshow" links="ChalmersGU/CGU-Styles.css"/>

Here's the code for addition.

    class LinkedList implements List:
        ...
        add(i, x):
            precondition: 0 <= i <= this.listSize
            if i == 0:
                this.head = new Node(x, this.head)
            else:
                prev = this.head
                repeat i-1 times:
                    prev = prev.next
                prev.next = new Node(x, prev.next)
            this.listSize = this.listSize + 1


Here's an exercise for adding a value to a linked list.

<avembed id="LinkedList-Add-PRO" src="ChalmersGU/LinkedList-Add-PRO.html" type="ka" name="Linked List Add Exercise"/>

### Removing a node

<inlineav id="LinkedList-Remove-CON" src="ChalmersGU/LinkedList-Remove-CON.js" name="Linked List Remove Slideshow" links="ChalmersGU/CGU-Styles.css"/>

Here's the code for deletion:

    class LinkedList implements List:
        ...
        remove(self, i):
            precondition: 0 <= i < this.listSize
            if i == 0:
                removed = this.head
                this.head = removed.next
            else:
                prev = this.head
                repeat i-1 times:
                    prev = prev.next
                removed = prev.next
                prev.next = removed.next
            removed.next = null   // For garbage collection
            this.listSize = this.listSize - 1
            return removed.elem


And here's an exercise.

<avembed id="LinkedList-Remove-PRO" src="ChalmersGU/LinkedList-Remove-PRO.html" type="ka" name="Linked List Remove Exercise" height="700"/>

### Complexity analysis

Locating a certain position $i$ in the list requires $i$ steps. The
worst case is if we want to go to the last node, so the time complexity
for above all operations is $O(n)$.

This is much worse than the
[array-based list](#static-array-based-lists), where
these operations are $O(1)$. So are linked lists totally useless?
No! But they don't work well with our current List interface.

To make linked lists useful, we need an enhanced iterator interface,
where we can move forwards and backwards in the list, and add/remove
nodes through this enhanced iterator. In the standard Java API, this
kind of iterator is called a
[ListIterator](https://docs.oracle.com/en/java/javase/11/docs/api/java.base/java/util/ListIterator.html),
which is part of Java's standard
[LinkedList](https://docs.oracle.com/en/java/javase/11/docs/api/java.base/java/util/LinkedList.html).

