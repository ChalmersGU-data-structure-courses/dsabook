
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

```python
#/* *** ODSATag: DoubleLinkedListVars *** */
class DoubleLinkedList(List):
    def __init__(self):
        self._head = None    # Pointer to list header
        self._tail = None    # Pointer to list tail
        self._listSize = 0   # Size of list
#/* *** ODSAendTag: DoubleLinkedListVars *** */

#/* *** ODSATag: DoubleLinkedListNode *** */
# Python does not have internal classes, so we have to make the list node standalone.
class DoubleLinkedListNode:
    def __init__(self, elem, prev, next):
        self.elem = elem   # Value for this node
        self.prev = prev   # Pointer to previous node in list
        self.next = next   # Pointer to next node in list
#/* *** ODSAendTag: DoubleLinkedListNode *** */
```

```java
/* *** ODSATag: DoubleLinkedListVars *** */
class DoubleLinkedList<E> implements List<E> {
    private DNode head;     // Pointer to list header
    private DNode tail;     // Pointer to list tail
    private int listSize;   // Size of list

    DoubleLinkedList() {
        head = null;
        tail = null;
        listSize = 0;
    }
/* *** ODSAendTag: DoubleLinkedListVars *** */

/* *** ODSATag: DoubleLinkedListDNode *** */
    private class DNode {
        E elem;       // Value for this node
        DNode prev;   // Pointer to previous node in list
        DNode next;   // Pointer to next node in list

        DNode(E elem, DNode prev, DNode next) {
            this.elem = elem;
            this.prev = prev;
            this.next = next;
        }
    }
/* *** ODSAendTag: DoubleLinkedListDNode *** */
```



The main advantage with doubly linked lists are that we can implement
more advanced iterators
([ListIterator](https://docs.oracle.com/javase/8/docs/api/java/util/ListIterator.html)
in the Java standard API) that can move forward and backward through a
list. In fact, Java's standard
[LinkedList](https://docs.oracle.com/javase/8/docs/api/java/util/LinkedList.html)
is implemented as a doubly linked list.

### Implementation of the list methods

Getting and setting are exactly the same as for normal linked lists, so
we don't show them here.

#### Adding/inserting elements

Adding elements becomes a bit trickier, because we have to make sure
that all pointers are updated correctly. We get some special cases --
when the list is empty, or when we add before the head or after the
tail.

```python
    def add(self, i, x):
        if not (0 <= i <= self._listSize): raise IndexError("list index out of range")
        if self._listSize == 0:
            self._head = self._tail = DoubleLinkedListNode(x, None, None)
        elif i == 0:
            newhead = DoubleLinkedListNode(x, None, self._head)
            self._head.prev = newhead
            self._head = newhead
        elif i == self._listSize:
            newtail = DoubleLinkedListNode(x, self._tail, None)
            self._tail.next = newtail
            self._tail = newtail
        else:
            prev = self._head
            for _ in range(i-1):
                prev = prev.next
            next  = prev.next
            newnode = DoubleLinkedListNode(x, prev, next)
            prev.next = newnode
            next.prev = newnode
        self._listSize += 1
```

```java
    public void add(int i, E x) {
        if (!(0 <= i && i <= listSize)) throw new IndexOutOfBoundsException("list index out of range");
        if (listSize == 0) {
            head = tail = new DNode(x, null, null);
        } else if (i == 0) {
            DNode newhead = new DNode(x, null, head);
            head.prev = newhead;
            head = newhead;
        } else if (i == listSize) {
            DNode newtail = new DNode(x, tail, null);
            tail.next = newtail;
            tail = newtail;
        } else {
            DNode prev = head;
            for (int k = 0; k < i-1; k++)
                prev = prev.next;
            DNode next = prev.next;
            DNode newnode = new DNode(x, prev, next);
            prev.next = newnode;
            next.prev = newnode;
        }
        listSize++;
    }
```



#### Removing elements

The same goes for removing elements -- we get special cases when we
remove the head or the tail.

```python
    def remove(self, i):
        if not (0 <= i < self._listSize): raise IndexError("list index out of range")
        if i == 0:
            removed = self._head
            self._head = removed.next
            self._head.prev = None
        elif i == self._listSize-1:
            removed = self._tail
            self._tail = removed.prev
            self._tail.next = None
        else:
            prev = self._head
            for _ in range(i-1):
                prev = prev.next
            removed = prev.next
            prev.next = removed.next
            prev.next.prev = prev
        removed.prev = removed.next = None   # For garbage collection
        self._listSize -= 1
        return removed.elem
```

```java
    public E remove(int i) {
        if (!(0 <= i && i < listSize)) throw new IndexOutOfBoundsException("list index out of range");
        DNode removed;
        if (i == 0) {
            removed = head;
            head = removed.next;
            head.prev = null;
        } else if (i == listSize-1) {
            removed = tail;
            tail = removed.prev;
            tail.next = null;
        } else {
            DNode prev = head;
            for (int k = 0; k < i-1; k++)
                prev = prev.next;
            removed = prev.next;
            prev.next = removed.next;
            prev.next.prev = prev;
        }
        removed.prev = removed.next = null;   // For garbage collection
        listSize--;
        return removed.elem;
    }
```



### Full implementation

Here is the full implementation of doubly linked lists.

```python
#/* *** ODSATag: DoubleLinkedListHeader *** */
#/* *** ODSATag: DoubleLinkedListVars *** */
class DoubleLinkedList(List):
    def __init__(self):
        self._head = None    # Pointer to list header
        self._tail = None    # Pointer to list tail
        self._listSize = 0   # Size of list
#/* *** ODSAendTag: DoubleLinkedListVars *** */
#/* *** ODSAendTag: DoubleLinkedListHeader *** */

#/* *** ODSATag: DoubleLinkedListGetSet *** */
    def get(self, i):
        if not (0 <= i < self._listSize): raise IndexError("list index out of range")
        current = self._head
        for _ in range(i):
            current = current.next
        return current.elem

    def set(self, i, x):
        if not (0 <= i < self._listSize): raise IndexError("list index out of range")
        current = self._head
        for _ in range(i):
            current = current.next
        old = current.elem
        current.elem = x
        return old
#/* *** ODSAendTag: DoubleLinkedListGetSet *** */

#/* *** ODSATag: DoubleLinkedListAdd *** */
    def add(self, i, x):
        if not (0 <= i <= self._listSize): raise IndexError("list index out of range")
        if self._listSize == 0:
            self._head = self._tail = DoubleLinkedListNode(x, None, None)
        elif i == 0:
            newhead = DoubleLinkedListNode(x, None, self._head)
            self._head.prev = newhead
            self._head = newhead
        elif i == self._listSize:
            newtail = DoubleLinkedListNode(x, self._tail, None)
            self._tail.next = newtail
            self._tail = newtail
        else:
            prev = self._head
            for _ in range(i-1):
                prev = prev.next
            next  = prev.next
            newnode = DoubleLinkedListNode(x, prev, next)
            prev.next = newnode
            next.prev = newnode
        self._listSize += 1
#/* *** ODSAendTag: DoubleLinkedListAdd *** */

#/* *** ODSATag: DoubleLinkedListRemove *** */
    def remove(self, i):
        if not (0 <= i < self._listSize): raise IndexError("list index out of range")
        if i == 0:
            removed = self._head
            self._head = removed.next
            self._head.prev = None
        elif i == self._listSize-1:
            removed = self._tail
            self._tail = removed.prev
            self._tail.next = None
        else:
            prev = self._head
            for _ in range(i-1):
                prev = prev.next
            removed = prev.next
            prev.next = removed.next
            prev.next.prev = prev
        removed.prev = removed.next = None   # For garbage collection
        self._listSize -= 1
        return removed.elem
#/* *** ODSAendTag: DoubleLinkedListRemove *** */

    def isEmpty(self):
        return self._listSize == 0

    def size(self):
        return self._listSize

#/* *** ODSATag: DoubleLinkedListIterator *** */
    def __iter__(self):
        current = self._head
        while current is not None:
            yield current.elem
            current = current.next
#/* *** ODSAendTag: DoubleLinkedListIterator *** */

#/* *** ODSATag: DoubleLinkedListHeader *** */

#/* *** ODSATag: DoubleLinkedListNode *** */
# Python does not have internal classes, so we have to make the list node standalone.
class DoubleLinkedListNode:
    def __init__(self, elem, prev, next):
        self.elem = elem   # Value for this node
        self.prev = prev   # Pointer to previous node in list
        self.next = next   # Pointer to next node in list
#/* *** ODSAendTag: DoubleLinkedListNode *** */
#/* *** ODSAendTag: DoubleLinkedListHeader *** */
```

```java
/* *** ODSATag: DoubleLinkedListHeader *** */
/* *** ODSATag: DoubleLinkedListVars *** */
class DoubleLinkedList<E> implements List<E> {
    private DNode head;     // Pointer to list header
    private DNode tail;     // Pointer to list tail
    private int listSize;   // Size of list

    DoubleLinkedList() {
        head = null;
        tail = null;
        listSize = 0;
    }
/* *** ODSAendTag: DoubleLinkedListVars *** */

/* *** ODSATag: DoubleLinkedListDNode *** */
    private class DNode {
        E elem;       // Value for this node
        DNode prev;   // Pointer to previous node in list
        DNode next;   // Pointer to next node in list

        DNode(E elem, DNode prev, DNode next) {
            this.elem = elem;
            this.prev = prev;
            this.next = next;
        }
    }
/* *** ODSAendTag: DoubleLinkedListDNode *** */
/* *** ODSAendTag: DoubleLinkedListHeader *** */

/* *** ODSATag: DoubleLinkedListGetSet *** */
    public E get(int i) {
        if (!(0 <= i && i < listSize)) throw new IndexOutOfBoundsException("list index out of range");
        DNode current = head;
        for (int k = 0; k < i; k++)
            current = current.next;
        return current.elem;
    }

    public E set(int i, E x) {
        if (!(0 <= i && i < listSize)) throw new IndexOutOfBoundsException("list index out of range");
        DNode current = head;
        for (int k = 0; k < i; k++)
            current = current.next;
        E old = current.elem;
        current.elem = x;
        return old;
    }
/* *** ODSAendTag: DoubleLinkedListGetSet *** */

/* *** ODSATag: DoubleLinkedListAdd *** */
    public void add(int i, E x) {
        if (!(0 <= i && i <= listSize)) throw new IndexOutOfBoundsException("list index out of range");
        if (listSize == 0) {
            head = tail = new DNode(x, null, null);
        } else if (i == 0) {
            DNode newhead = new DNode(x, null, head);
            head.prev = newhead;
            head = newhead;
        } else if (i == listSize) {
            DNode newtail = new DNode(x, tail, null);
            tail.next = newtail;
            tail = newtail;
        } else {
            DNode prev = head;
            for (int k = 0; k < i-1; k++)
                prev = prev.next;
            DNode next = prev.next;
            DNode newnode = new DNode(x, prev, next);
            prev.next = newnode;
            next.prev = newnode;
        }
        listSize++;
    }
/* *** ODSAendTag: DoubleLinkedListAdd *** */

/* *** ODSATag: DoubleLinkedListRemove *** */
    public E remove(int i) {
        if (!(0 <= i && i < listSize)) throw new IndexOutOfBoundsException("list index out of range");
        DNode removed;
        if (i == 0) {
            removed = head;
            head = removed.next;
            head.prev = null;
        } else if (i == listSize-1) {
            removed = tail;
            tail = removed.prev;
            tail.next = null;
        } else {
            DNode prev = head;
            for (int k = 0; k < i-1; k++)
                prev = prev.next;
            removed = prev.next;
            prev.next = removed.next;
            prev.next.prev = prev;
        }
        removed.prev = removed.next = null;   // For garbage collection
        listSize--;
        return removed.elem;
    }
/* *** ODSAendTag: DoubleLinkedListRemove *** */

    public boolean isEmpty() {
        return listSize == 0;
    }

    public int size() {
        return listSize;
    }


/* *** ODSATag: DoubleLinkedListIterator *** */
    public Iterator<E> iterator() {
        return new DoubleLinkedListIterator();
    }

    private class DoubleLinkedListIterator implements Iterator<E> {
        private DNode current;
        DoubleLinkedListIterator() {
            current = head;
        }
        public boolean hasNext() {
            return current != null;
        }
        public E next() {
            E x = current.elem;
            current = current.next;
            return x;
        }
    }
/* *** ODSAendTag: DoubleLinkedListIterator *** */
}
```


