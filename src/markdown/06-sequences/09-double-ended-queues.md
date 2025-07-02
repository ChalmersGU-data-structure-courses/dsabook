
## Double-ended queues

::: TODO
- Prio 1: hide this section until written
- Prio 2: invariants, use cases, explaining text
:::

<!--
### Double-ended queues, or deques

    interface Deque of T extends Collection:
        insertFirst(x: T)
        insertLast(x: T)
        removeFirst() -> T
        removeLast() -> T
        peekFirst() -> T
        peekLast() -> T



### Invariants


### Use case(s) for deques


### Implementing deques using circular dynamic arrays

::: TODO
- This is the same as the queue implementation, we just need some more methods
:::

### Implementing deques using doubly linked lists
-->

::: TODO
- With normal linked lists we cannot pop from the back
:::

The [singly linked list]{.term} (@sec:stacks-implemented-as-linked-lists) allows for direct access from a list node only to the next
node in the list. A [doubly linked list]{.term}
allows convenient access from a list node to the next node and also to
the preceding node on the list. The doubly linked list node accomplishes
this in the obvious way by storing two pointers: one to the node
following it (as in the singly linked list), and a second pointer to the
node preceding it.

::: latex
\begin{center}
\begin{tikzpicture}[
    double link/.style n args=1{
        on chain,
        rectangle split,
        rectangle split horizontal,
        rectangle split parts=3,
        anchor=center,
        draw,
        node contents={\nodepart{two}#1\nodepart{three}},
    },
    start chain=going right,
]
    \node [on chain, double link={8}];
    \node [join={by <->}, double link={20}];
    \node [join={by <->}, double link={23}];
    \node [join={by <->}, double link={12}];
    \node [join={by <->}, double link={15}];
    \node [join={by <->}, double link={42}];
    \path [<-, draw, shorten >=10pt] (chain-1.two north) |- node [at end] {head} ++(-.8,.5);
    \path [<-, draw, shorten >=10pt] (chain-6.two north) |- node [at end] {tail} ++(-.8,.5);
\end{tikzpicture}
\end{center}
:::

::: online
<inlineav id="DoublyLinkedList-CON" src="ChalmersGU/DoublyLinkedList-CON.js" script="DataStructures/DoubleLinkList.js" name="ChalmersGU/DoublyLinkedList-CON" links="DataStructures/DoubleLinkList.css ChalmersGU/CGU-Styles.css" static/>
:::

The most common reason to use a doubly linked list is because it gives
an additional possibility to move both forwards and backwards in the
list, and to efficiently add and remove elements from both ends.

:::::: latex
\booklink{Read the rest online}{6.9}{sec:double-ended-queues}
::::::

:::::: online

Like our linked queue implementation, the doubly linked list makes use of two pointers -- one to the first element (the *head*), and one to the last element (the *tail*).

Here is an implementation for the class variables and the internal list
node class. The only real difference between single linked lists is that
we have pointers to the previous node, and a pointer to the tail of the
list.

    datatype DoubleNode of T:
        elem: T                 // Value for this node
        prev: DoubleNode of T   // Pointer to previous node in list
        next: DoubleNode of T   // Pointer to next node in list

    datatype DoubleDeque implements Deque:
        head: DoubleNode = null   // Pointer to front of deque
        tail: DoubleNode = null   // Pointer to tail of deque
        dequeSize: Int = 0        // Size of deque


The main advantage with doubly linked lists are that we can implement
more advanced iterators
([ListIterator](https://docs.oracle.com/en/java/javase/11/docs/api/java.base/java/util/ListIterator.html)
in the Java standard API) that can move forward and backward through a
list. In fact, Java's standard
[LinkedList](https://docs.oracle.com/en/java/javase/11/docs/api/java.base/java/util/LinkedList.html)
is implemented as a doubly linked list.



#### Implementation of the list methods

Getting and setting are exactly the same as for normal linked lists, so
we don't show them here.


#### Inserting elements

Adding elements becomes a bit trickier, because we have to make sure that all pointers are updated correctly.
We have to handle inserting into an empty list specially, because then both head and tail will point to the same cell.

    datatype DoubleDeque:
        ...
        insertFirst(x):
            if dequeSize == 0:
                head = tail = new DoubleNode(x, null, null)
            else:
                newhead = new DoubleNode(x, null, head)
                head.prev = newhead
                head = newhead
            dequeSize = dequeSize + 1

        insertLast(x):
            if dequeSize == 0:
                head = tail = new DoubleNode(x, null, null)
            else:
                newtail = new DoubleNode(x, tail, null)
                tail.next = newtail
                tail = newtail
            dequeSize = dequeSize + 1


#### Removing elements

The same goes for removing elements -- the one-element list is a special case.

    datatype DoubleDeque:
        ...
        removeFirst():
            // precondition: dequeSize > 0
            removed = head                      // Remember the current head
            head = removed.next                 // Re-point the head to the second node
            head.prev = null                    // Make sure the new head doesn't have any predecessor
            removed.prev = removed.next = null  // For garbage collection
            dequeSize = dequeSize - 1
            return removed.elem

        removeLast():
            // precondition: dequeSize > 0
            removed = tail                      // Remember the current tail
            tail = removed.prev                 // Re-point the tail to the predecessor node
            tail.next = null                    // Make sure the new tail doesn't have any successor
            removed.prev = removed.next = null  // For garbage collection
            dequeSize = dequeSize - 1
            return removed.elem

::::::
