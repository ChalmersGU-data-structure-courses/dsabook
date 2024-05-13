
## Doubly Linked Lists (optional)

The [singly linked list](#linked-lists) allows for direct access from a list node only to the next
node in the list. A [doubly linked list]{.term}
allows convenient access from a list node to the next node and also to
the preceding node on the list. The doubly linked list node accomplishes
this in the obvious way by storing two pointers: one to the node
following it (as in the singly linked list), and a second pointer to the
node preceding it.

<inlineav id="DoublyLinkedList-CON" src="ChalmersGU/DoublyLinkedList-CON.js" script="DataStructures/DoubleLinkList.js" name="ChalmersGU/DoublyLinkedList-CON" links="DataStructures/DoubleLinkList.css ChalmersGU/CGU-Styles.css" static/>

The most common reason to use a doubly linked list is because it gives
an additional possibility to move both forwards and backwards in the
list, and to efficiently add and remove elements from both ends. Whether
a list implementation is doubly or singly linked should be hidden from
the `List` class user.

Like our singly linked list implementation, the doubly linked list
implementation makes use of a **header pointer**, but we also add a
**tail pointer** to the end of the list.

Here is an implementation for the class variables and the internal list
node class. The only real difference between single linked lists is that
we have pointers to the previous node, and a pointer to the tail of the
list.

    class DoubleNode:
        DoubleNode(elem, prev, next):
            this.elem = elem  // Value for this node
            this.prev = prev  // Pointer to previous node in list
            this.next = next  // Pointer to next node in list

    class DoubleLinkedList implements List:
        DoubleLinkedList():
            this.head = null   // Pointer to list header
            this.tail = null   // Pointer to list tail
            this.listSize = 0  // Size of list


The main advantage with doubly linked lists are that we can implement
more advanced iterators
([ListIterator](https://docs.oracle.com/en/java/javase/11/docs/api/java.base/java/util/ListIterator.html)
in the Java standard API) that can move forward and backward through a
list. In fact, Java's standard
[LinkedList](https://docs.oracle.com/en/java/javase/11/docs/api/java.base/java/util/LinkedList.html)
is implemented as a doubly linked list.

### Implementation of the list methods

Getting and setting are exactly the same as for normal linked lists, so
we don't show them here.

#### Adding/inserting elements

Adding elements becomes a bit trickier, because we have to make sure
that all pointers are updated correctly. We get some special cases --
when the list is empty, or when we add before the head or after the
tail.

    class DoubleLinkedList implements List:
        ...
        add(i, x):
            if not (0 <= i <= this.listSize):
                throw error "list index out of range"
            if this.listSize == 0:
                this.head = this.tail = new DoubleNode(x, null, null)
            else if i == 0:
                newhead = new DoubleNode(x, null, this.head)
                this.head.prev = newhead
                this.head = newhead
            else if i == this.listSize:
                newtail = new DoubleNode(x, this.tail, null)
                this.tail.next = newtail
                this.tail = newtail
            else:
                prev = this.head
                repeat i-1 times:
                    prev = prev.next
                next = prev.next
                newnode = new DoubleNode(x, prev, next)
                prev.next = newnode
                next.prev = newnode
            this.listSize = this.listSize + 1


#### Removing elements

The same goes for removing elements -- we get special cases when we
remove the head or the tail.

    class DoubleLinkedList implements List:
        ...
        remove(i):
            if not (0 <= i < this.listSize):
                throw error "list index out of range"
            if i == 0:
                removed = this.head
                this.head = removed.next
                this.head.prev = null
            else if i == this.listSize-1:
                removed = this.tail
                this.tail = removed.prev
                this.tail.next = null
            else:
                prev = this.head
                repeat i-1 times:
                    prev = prev.next
                removed = prev.next
                prev.next = removed.next
                prev.next.prev = prev
            removed.prev = removed.next = null  // For garbage collection
            this.listSize = this.listSize - 1
            return removed.elem

