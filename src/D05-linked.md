
## Linked Lists

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

Our class for linked lists contains two private variables, one pointer
to the head of the list, and a variable storing the number of elements.
(This second variable is in theory unnecessary, but it improves the
efficiency of getting the list size).

```python
class LinkedList(List):
    def __init__(self):
        self._head = None    # Pointer to list header
        self._listSize = 0   # Size of list
```

```java
class LinkedList<E> implements List<E> {
    private Node head;      // Pointer to list header
    private int listSize;   // Size of list

    LinkedList() {
        head = null;
        listSize = 0;
    }
```



Here is our implementation for list nodes, an inner private class
`Node`. Objects in the `Node` class contain a field `elem` to store the
element value, and a field `next` to store a pointer to the next node on
the list.

```python
# Python does not have internal classes, so we have to make the list node standalone.
class LinkedListNode:
    def __init__(self, elem, next):
        self.elem = elem   # Value for this node
        self.next = next   # Pointer to next node in list
```

```java
    private class Node {
        E elem;       // Value for this node
        Node next;    // Pointer to next node in list

        Node(E elem, Node next) {
            this.elem = elem;
            this.next = next;
        }
    }
```



### Getting and setting values

If we want to get or set the value at a certain index, we simply iterate
through the nodes in sequence until we get to the node we want.

```python
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
```

```java
    public E get(int i) {
        if (!(0 <= i && i < listSize)) throw new IndexOutOfBoundsException("list index out of range");
        Node current = head;
        for (int k = 0; k < i; k++)
            current = current.next;
        return current.elem;
    }

    public E set(int i, E x) {
        if (!(0 <= i && i < listSize)) throw new IndexOutOfBoundsException("list index out of range");
        Node current = head;
        for (int k = 0; k < i; k++)
            current = current.next;
        E old = current.elem;
        current.elem = x;
        return old;
    }
```



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

### Adding a Node

<inlineav id="LinkedList-Add-CON" src="ChalmersGU/LinkedList-Add-CON.js" name="Linked List Add Slideshow" links="ChalmersGU/CGU-Styles.css"/>

Here are some special cases for linked list insertion: Inserting at the
beginning of a list, and appending at the end.

<inlineav id="LinkedList-AddSpecial-CON" src="ChalmersGU/LinkedList-AddSpecial-CON.js" name="Linked List Add Special Cases Slideshow" links="ChalmersGU/CGU-Styles.css"/>

Here's the code for addition.

```python
    def add(self, i, x):
        if not (0 <= i <= self._listSize): raise IndexError("list index out of range")
        if i == 0:
            self._head = LinkedListNode(x, self._head)
        else:
            prev = self._head
            for _ in range(i-1):
                prev = prev.next
            prev.next = LinkedListNode(x, prev.next)
        self._listSize += 1
```

```java
    public void add(int i, E x) {
        if (!(0 <= i && i <= listSize)) throw new IndexOutOfBoundsException("list index out of range");
        if (i == 0) {
            head = new Node(x, head);
        } else {
            Node prev = head;
            for (int k = 0; k < i-1; k++)
                prev = prev.next;
            prev.next = new Node(x, prev.next);
        }
        listSize++;
    }
```



Here's an exercise for adding a value to a linked list.

<avembed id="LinkedList-Add-PRO" src="ChalmersGU/LinkedList-Add-PRO.html" type="ka" name="Linked List Add Exercise"/>

### Removing a Node

<inlineav id="LinkedList-Remove-CON" src="ChalmersGU/LinkedList-Remove-CON.js" name="Linked List Remove Slideshow" links="ChalmersGU/CGU-Styles.css"/>

Here's the code for deletion:

```python
    def remove(self, i):
        if not (0 <= i < self._listSize): raise IndexError("list index out of range")
        if i == 0:
            removed = self._head
            self._head = removed.next
        else:
            prev = self._head
            for _ in range(i-1):
                prev = prev.next
            removed = prev.next
            prev.next = removed.next
        removed.next = None   # For garbage collection
        self._listSize -= 1
        return removed.elem
```

```java
    public E remove(int i) {
        if (!(0 <= i && i < listSize)) throw new IndexOutOfBoundsException("list index out of range");
        Node removed;
        if (i == 0) {
            removed = head;
            head = removed.next;
        } else {
            Node prev = head;
            for (int k = 0; k < i-1; k++)
                prev = prev.next;
            removed = prev.next;
            prev.next = removed.next;
        }
        removed.next = null;   // For garbage collection
        listSize--;
        return removed.elem;
    }
```



And here's an exercise.

<avembed id="LinkedList-Remove-PRO" src="ChalmersGU/LinkedList-Remove-PRO.html" type="ka" name="Linked List Remove Exercise"/>

### Complexity analysis

Locating a certain position $i$ in the list requires $i$ steps. The
worst case is if we want to go to the last node, so the time complexity
for above all operations is $\Theta(n)$.

This is much worse than the
[array-based list](#static-array-based-lists), where
these operations are $\Theta(1)$. So are linked lists totally useless?
No! But they don't work well with our current List interface.

To make linked lists useful, we need an enhanced iterator interface,
where we can move forwards and backwards in the list, and add/remove
nodes through this enhanced iterator. In the standard Java API, this
kind of iterator is called a
[ListIterator](https://docs.oracle.com/en/java/javase/11/docs/api/java.base/java/util/ListIterator.html),
which is part of Java's standard
[LinkedList](https://docs.oracle.com/en/java/javase/11/docs/api/java.base/java/util/LinkedList.html).

### Linked List: Full code

Finally, here is the full source code for the class `LinkedList`.

```python
#/* *** ODSATag: LinkedListVars *** */
class LinkedList(List):
    def __init__(self):
        self._head = None    # Pointer to list header
        self._listSize = 0   # Size of list
#/* *** ODSAendTag: LinkedListVars *** */

#/* *** ODSATag: LinkedListGetSet *** */
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
#/* *** ODSAendTag: LinkedListGetSet *** */

#/* *** ODSATag: LinkedListAdd *** */
    def add(self, i, x):
        if not (0 <= i <= self._listSize): raise IndexError("list index out of range")
        if i == 0:
            self._head = LinkedListNode(x, self._head)
        else:
            prev = self._head
            for _ in range(i-1):
                prev = prev.next
            prev.next = LinkedListNode(x, prev.next)
        self._listSize += 1
#/* *** ODSAendTag: LinkedListAdd *** */

#/* *** ODSATag: LinkedListRemove *** */
    def remove(self, i):
        if not (0 <= i < self._listSize): raise IndexError("list index out of range")
        if i == 0:
            removed = self._head
            self._head = removed.next
        else:
            prev = self._head
            for _ in range(i-1):
                prev = prev.next
            removed = prev.next
            prev.next = removed.next
        removed.next = None   # For garbage collection
        self._listSize -= 1
        return removed.elem
#/* *** ODSAendTag: LinkedListRemove *** */

    def isEmpty(self):
        return self._listSize == 0

    def size(self):
        return self._listSize

#/* *** ODSATag: LinkedListIterator *** */
    def __iter__(self):
        current = self._head
        while current is not None:
            yield current.elem
            current = current.next
#/* *** ODSAendTag: LinkedListIterator *** */


#/* *** ODSATag: LinkedListNode *** */
# Python does not have internal classes, so we have to make the list node standalone.
class LinkedListNode:
    def __init__(self, elem, next):
        self.elem = elem   # Value for this node
        self.next = next   # Pointer to next node in list
#/* *** ODSAendTag: LinkedListNode *** */
```

```java
/* *** ODSATag: LinkedListVars *** */
class LinkedList<E> implements List<E> {
    private Node head;      // Pointer to list header
    private int listSize;   // Size of list

    LinkedList() {
        head = null;
        listSize = 0;
    }
/* *** ODSAendTag: LinkedListVars *** */

/* *** ODSATag: LinkedListNode *** */
    private class Node {
        E elem;       // Value for this node
        Node next;    // Pointer to next node in list

        Node(E elem, Node next) {
            this.elem = elem;
            this.next = next;
        }
    }
/* *** ODSAendTag: LinkedListNode *** */

/* *** ODSATag: LinkedListGetSet *** */
    public E get(int i) {
        if (!(0 <= i && i < listSize)) throw new IndexOutOfBoundsException("list index out of range");
        Node current = head;
        for (int k = 0; k < i; k++)
            current = current.next;
        return current.elem;
    }

    public E set(int i, E x) {
        if (!(0 <= i && i < listSize)) throw new IndexOutOfBoundsException("list index out of range");
        Node current = head;
        for (int k = 0; k < i; k++)
            current = current.next;
        E old = current.elem;
        current.elem = x;
        return old;
    }
/* *** ODSAendTag: LinkedListGetSet *** */

/* *** ODSATag: LinkedListAdd *** */
    public void add(int i, E x) {
        if (!(0 <= i && i <= listSize)) throw new IndexOutOfBoundsException("list index out of range");
        if (i == 0) {
            head = new Node(x, head);
        } else {
            Node prev = head;
            for (int k = 0; k < i-1; k++)
                prev = prev.next;
            prev.next = new Node(x, prev.next);
        }
        listSize++;
    }
/* *** ODSAendTag: LinkedListAdd *** */

/* *** ODSATag: LinkedListRemove *** */
    public E remove(int i) {
        if (!(0 <= i && i < listSize)) throw new IndexOutOfBoundsException("list index out of range");
        Node removed;
        if (i == 0) {
            removed = head;
            head = removed.next;
        } else {
            Node prev = head;
            for (int k = 0; k < i-1; k++)
                prev = prev.next;
            removed = prev.next;
            prev.next = removed.next;
        }
        removed.next = null;   // For garbage collection
        listSize--;
        return removed.elem;
    }
/* *** ODSAendTag: LinkedListRemove *** */

    public boolean isEmpty() {
        return listSize == 0;
    }

    public int size() {
        return listSize;
    }


/* *** ODSATag: LinkedListIterator *** */
    public Iterator<E> iterator() {
        return new LinkedListIterator();
    }

    private class LinkedListIterator implements Iterator<E> {
        private Node current;
        LinkedListIterator() {
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
/* *** ODSAendTag: LinkedListIterator *** */
}
```


