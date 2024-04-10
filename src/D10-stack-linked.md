
### Linked List Stacks

The linked stack implementation is quite simple. Elements are inserted
and removed only from the head of the list. Here is a visual
representation for the linked stack.

<inlineav id="LinkedStack-Overview-CON" src="ChalmersGU/LinkedStack-Overview-CON.js" name="Linked Stack Overview" links="ChalmersGU/CGU-Styles.css" static/>

| 

```python
class LinkedStack(Stack):
    def __init__(self):
        self._top = None      # Pointer to top of stack
        self._stackSize = 0   # Size of stack
```

```java
class LinkedStack<E> implements Stack<E> {
    private Node top;        // Pointer to top of stack
    private int stackSize;   // Size of stack

    LinkedStack() {
        top = null;
        stackSize = 0;
    }
```



Stack nodes are exactly the same as the
[linked list nodes](#linked-lists) we saw earlier.

```python
# Python does not have internal classes, so we have to make the stack node standalone.
class LinkedStackNode:
    def __init__(self, elem, next):
        self.elem = elem   # Value for this node
        self.next = next   # Pointer to next node in stack
```

```java
    private class Node {
        E elem;       // Value for this node
        Node next;    // Pointer to next node in stack

        Node(E elem, Node next) {
            this.elem = elem;
            this.next = next;
        }
    }
```



#### Linked Stack Push

<inlineav id="LinkedStack-Push-CON" src="ChalmersGU/LinkedStack-Push-CON.js" name="Linked Stack Push" links="ChalmersGU/CGU-Styles.css"/>

| 

```python
    def push(self, x):
        self._top = LinkedStackNode(x, self._top)
        self._stackSize += 1
```

```java
    public void push(E x) {
        top = new Node(x, top);
        stackSize++;
    }
```



| 

<avembed id="LstackPushPRO" src="ChalmersGU/LstackPushPRO.html" type="ka" name="Linked Stack Push Exercise"/>

#### Linked Stack Pop

<inlineav id="LinkedStack-Pop-CON" src="ChalmersGU/LinkedStack-Pop-CON.js" name="Linked Stack Pop" links="ChalmersGU/CGU-Styles.css"/>

| 

```python
    def pop(self):
        if not (self._stackSize > 0): raise IndexError("pop from empty stack")
        removed = self._top
        self._top = removed.next
        removed.next = None   # For garbage collection
        self._stackSize -= 1
        return removed.elem
```

```java
    public E pop() {
        if (!(stackSize > 0)) throw new NoSuchElementException("pop from empty stack");
        Node removed = top;
        top = removed.next;
        removed.next = null;   // For garbage collection
        stackSize--;
        return removed.elem;
    }
```



| 

<avembed id="LstackPopPRO" src="ChalmersGU/LstackPopPRO.html" type="ka" name="Linked Stack Pop Exercise"/>

#### Linked stacks: Full implementation

Here is the complete linked stack implementation.

```python
#/* *** ODSATag: LinkedStackInit *** */
class LinkedStack(Stack):
    def __init__(self):
        self._top = None      # Pointer to top of stack
        self._stackSize = 0   # Size of stack
#/* *** ODSAendTag: LinkedStackInit *** */

#/* *** ODSATag: LinkedStackPush *** */
    def push(self, x):
        self._top = LinkedStackNode(x, self._top)
        self._stackSize += 1
#/* *** ODSAendTag: LinkedStackPush *** */

#/* *** ODSATag: LinkedStackPeek *** */
    def peek(self):
        if not (self._stackSize > 0): raise IndexError("peek from empty stack")
        return self._top.elem
#/* *** ODSAendTag: LinkedStackPeek *** */

#/* *** ODSATag: LinkedStackPop *** */
    def pop(self):
        if not (self._stackSize > 0): raise IndexError("pop from empty stack")
        removed = self._top
        self._top = removed.next
        removed.next = None   # For garbage collection
        self._stackSize -= 1
        return removed.elem
#/* *** ODSAendTag: LinkedStackPop *** */

    def isEmpty(self):
        return self._stackSize == 0

    def size(self):
        return self._stackSize

#/* *** ODSATag: LinkedStackIterator *** */
    def __iter__(self):
        current = self._top
        while current is not None:
            yield current.elem
            current = current.next
#/* *** ODSAendTag: LinkedStackIterator *** */


#/* *** ODSATag: LinkedStackNode *** */
# Python does not have internal classes, so we have to make the stack node standalone.
class LinkedStackNode:
    def __init__(self, elem, next):
        self.elem = elem   # Value for this node
        self.next = next   # Pointer to next node in stack
#/* *** ODSAendTag: LinkedStackNode *** */
```

```java
/* *** ODSATag: LinkedStackInit *** */
class LinkedStack<E> implements Stack<E> {
    private Node top;        // Pointer to top of stack
    private int stackSize;   // Size of stack

    LinkedStack() {
        top = null;
        stackSize = 0;
    }
/* *** ODSAendTag: LinkedStackInit *** */

/* *** ODSATag: LinkedStackNode *** */
    private class Node {
        E elem;       // Value for this node
        Node next;    // Pointer to next node in stack

        Node(E elem, Node next) {
            this.elem = elem;
            this.next = next;
        }
    }
/* *** ODSAendTag: LinkedStackNode *** */

/* *** ODSATag: LinkedStackPush *** */
    public void push(E x) {
        top = new Node(x, top);
        stackSize++;
    }
/* *** ODSAendTag: LinkedStackPush *** */

/* *** ODSATag: LinkedStackPeek *** */
    public E peek() {
        if (!(stackSize > 0)) throw new NoSuchElementException("peek from empty stack");
        return top.elem;
    }
/* *** ODSAendTag: LinkedStackPeek *** */

/* *** ODSATag: LinkedStackPop *** */
    public E pop() {
        if (!(stackSize > 0)) throw new NoSuchElementException("pop from empty stack");
        Node removed = top;
        top = removed.next;
        removed.next = null;   // For garbage collection
        stackSize--;
        return removed.elem;
    }
/* *** ODSAendTag: LinkedStackPop *** */

    public boolean isEmpty() {
        return stackSize == 0;
    }

    public int size() {
        return stackSize;
    }

/* *** ODSATag: LinkedStackIterator *** */
    public Iterator<E> iterator() {
        return new LinkedStackIterator();
    }

    private class LinkedStackIterator implements Iterator<E> {
        private Node current;
        LinkedStackIterator() {
            current = top;
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
/* *** ODSAendTag: LinkedStackIterator *** */
}
```



### Comparison of Array-Based and Linked Stacks

All operations for the array-based and linked stack implementations take
constant time, so from a time efficiency perspective, neither has a
significant advantage. Another basis for comparison is the total space
required. The analysis is similar to that done for list implementations.
The array-based stack must allocate an array with more elements than
actually needed, and some of that space is wasted whenever the stack is
not full. The linked stack can shrink and grow but requires the overhead
of a `next` field for every element.

#### Implementing two stacks using one array

If you need to use two stacks at the same time, you can take advantage
of the one-way growth of the array-based stack by using a single array
to store two stacks. One stack grows inward from each end as illustrated
by the figure below, hopefully leading to less wasted space. However,
this only works well when the space requirements of the two stacks are
inversely correlated. In other words, ideally when one stack grows, the
other will shrink. This is particularly effective when elements are
taken from one stack and given to the other. If instead both stacks grow
at the same time, then the free space in the middle of the array will be
exhausted quickly, and the array has to be resized.

:::: {#TwoArrayStacks}
<inlineav id="LinkedStack-Twostack-CON" src="ChalmersGU/LinkedStack-Twostack-CON.js" name="Two Stacks in the same Array" links="ChalmersGU/CGU-Styles.css" static/>
::::
