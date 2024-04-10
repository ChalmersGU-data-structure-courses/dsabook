
## Stacks

The [stack]{.term} is a list-like structure in
which elements may be inserted or removed from only one end. While this
restriction makes stacks less flexible than lists, it also makes stacks
both efficient (for those operations they can do) and easy to implement.
Many applications require only the limited form of insert and remove
operations that stacks provide. In such cases, it is more efficient to
use the simpler stack data structure rather than the generic list.

Despite their restrictions, stacks have many uses. Thus, a special
vocabulary for stacks has developed. Accountants used stacks long before
the invention of the computer. They called the stack a
"[LIFO]{.term}" list, which stands for
"Last-In, First-Out." Note that one implication of the LIFO policy is
that stacks remove elements in reverse order of their arrival.

The accessible element of the stack is called the `top` element.
Elements are not said to be inserted, they are
[pushed](#push){.term} onto the stack. When
removed, an element is said to be [popped](#pop){.term} from the stack. Here is our [ADT]{.term} for stacks:

```python
class Stack(Collection):
    def push(self, x): """Pushes x on top of the stack."""
    def pop(self):     """Pops the top of the stack and returns it. Raises an exception if the stack is empty."""
    def peek(self):    """Returns the top element, without removing it. Raises an exception if the stack is empty."""
    # Note: __iter__() should yield the elements starting from the top of the stack.
```

```java
// Note: This is an interface, while java.util.Stack is a class!
interface Stack<E> extends Collection<E> {
    void push(E x);  // Pushes x on top of the stack.
    E pop();         // Pops the top of the stack and returns it. Raises an exception if the stack is empty.
    E peek();        // Returns the top element, without removing it. Raises an exception if the stack is empty.
    // Note: iterator() should yield the elements starting from the top of the stack.
}
```



As with lists, there are many variations on stack implementation. The
two main approaches are the [array-based stack]{.term} and the
[linked stack](#linked-list-stacks), which are analogous to array-based and linked lists,
respectively.

### Dynamic Array-Based Stacks

The dynamic array-based stack contains an internal array (which will
grow and shrink dynamically), and the index of the **top** of the stack.
Or actually, the index is for the next free slot in the array, which at
the same time is the size of the stack.

```python
class DynamicArrayStack(Stack):
    _minCapacity = 8            # Minimum capacity of internalArray
    _minLoadFactor = 0.5        # Must be smaller than 1/CapacityMultiplier
    _capacityMultiplier = 1.5   # Factor to grow/shrink the capacity

    def __init__(self):
        self._internalArray = [None] * self._minCapacity   # Internal array containing the stack elements
        self._stackSize = 0                                # Size of stack, and index of the next free slot
```

```java
class DynamicArrayStack<E> implements Stack<E> {
    private E[] internalArray;   // Internal array containing the stack elements
    private int stackSize;       // Size of stack, and index of the next free slot

    static int MinCapacity = 8;               // Minimum capacity of internalArray
    static double MinLoadFactor = 0.5;        // Must be smaller than 1/CapacityMultiplier
    static double CapacityMultiplier = 1.5;   // Factor to grow/shrink the capacity

    @SuppressWarnings("unchecked")
    public DynamicArrayStack() {
        internalArray = (E[]) new Object[MinCapacity];
        stackSize = 0;
    }
```



The array-based stack implementation is essentially a simplified version
of the array-based list. The only important design decision to be made
is which end of the array should represent the top of the stack.

<inlineav id="DynamicArrayStack-Top-CON" src="ChalmersGU/DynamicArrayStack-Top-CON.js" name="Array stack top position slideshow" links="ChalmersGU/CGU-Styles.css"/>

### Pushing to the Stack

<inlineav id="DynamicArrayStack-Push-CON" src="ChalmersGU/DynamicArrayStack-Push-CON.js" name="Array stack push slideshow" links="ChalmersGU/CGU-Styles.css"/>

```python
    def push(self, x):
        if self._stackSize >= len(self._internalArray):
            self._resizeArray(len(self._internalArray) * self._capacityMultiplier)
        self._internalArray[self._stackSize] = x
        self._stackSize += 1
```

```java
    public void push(E x) {
        if (stackSize >= internalArray.length)
            resizeArray((int) (internalArray.length * CapacityMultiplier));
        internalArray[stackSize] = x;
        stackSize++;
    }
```



<avembed id="DynamicArrayStack-Push-PRO" src="ChalmersGU/DynamicArrayStack-Push-PRO.html" type="ka" name="Array-based Stack Push Exercise"/>

### Popping from the Stack

<inlineav id="DynamicArrayStack-Pop-CON" src="ChalmersGU/DynamicArrayStack-Pop-CON.js" name="Array stack pop slideshow" links="ChalmersGU/CGU-Styles.css"/>

```python
    def pop(self):
        if not (self._stackSize > 0): raise IndexError("pop from empty stack")
        self._stackSize -= 1
        x = self._internalArray[self._stackSize]
        self._internalArray[self._stackSize] = None   # For garbage collection
        if self._stackSize <= len(self._internalArray) * self._minLoadFactor:
            self._resizeArray(len(self._internalArray) / self._capacityMultiplier)
        return x
```

```java
    public E pop() {
        if (!(stackSize > 0)) throw new NoSuchElementException("pop from empty stack");
        stackSize--;
        E x = internalArray[stackSize];
        internalArray[stackSize] = null;   // For garbage collection
        if (stackSize <= internalArray.length * MinLoadFactor)
            resizeArray((int) (internalArray.length / CapacityMultiplier));
        return x;
    }
```



<avembed id="DynamicArrayStack-Pop-PRO" src="ChalmersGU/DynamicArrayStack-Pop-PRO.html" type="ka" name="Array-based Stack Pop Exercise"/>

### Array-based stacks: Full implementation

As you hopefully have noticed, the code for stacks is very similar to
the code for lists. E.g., the internal variables are exactly the same,
and the resizing method doesn't change at all. The main difference is
that stacks are even simpler to implement than their list counterparts.

Here is a complete implementation for the (dynamic) array-based stack
class.

```python
#/* *** ODSATag: DynamicArrayStackInit *** */
class DynamicArrayStack(Stack):
    _minCapacity = 8            # Minimum capacity of internalArray
    _minLoadFactor = 0.5        # Must be smaller than 1/CapacityMultiplier
    _capacityMultiplier = 1.5   # Factor to grow/shrink the capacity

    def __init__(self):
        self._internalArray = [None] * self._minCapacity   # Internal array containing the stack elements
        self._stackSize = 0                                # Size of stack, and index of the next free slot
#/* *** ODSAendTag: DynamicArrayStackInit *** */

#/* *** ODSATag: DynamicArrayStackPush *** */
    def push(self, x):
        if self._stackSize >= len(self._internalArray):
            self._resizeArray(len(self._internalArray) * self._capacityMultiplier)
        self._internalArray[self._stackSize] = x
        self._stackSize += 1
#/* *** ODSAendTag: DynamicArrayStackPush *** */

#/* *** ODSATag: DynamicArrayStackPeek *** */
    def peek(self):
        if not (self._stackSize > 0): raise IndexError("peek from empty stack")
        return self._internalArray[self._stackSize-1]
#/* *** ODSAendTag: DynamicArrayStackPeek *** */

#/* *** ODSATag: DynamicArrayStackPop *** */
    def pop(self):
        if not (self._stackSize > 0): raise IndexError("pop from empty stack")
        self._stackSize -= 1
        x = self._internalArray[self._stackSize]
        self._internalArray[self._stackSize] = None   # For garbage collection
        if self._stackSize <= len(self._internalArray) * self._minLoadFactor:
            self._resizeArray(len(self._internalArray) / self._capacityMultiplier)
        return x
#/* *** ODSAendTag: DynamicArrayStackPop *** */

#/* *** ODSATag: DynamicArrayStackResize *** */
    def _resizeArray(self, newCapacity):
        if newCapacity < self._minCapacity: return
        newArray = [None] * int(newCapacity)
        for i in range(self._stackSize):
            newArray[i] = self._internalArray[i]
        self._internalArray = newArray
#/* *** ODSAendTag: DynamicArrayStackResize *** */

    def isEmpty(self):
        return self._stackSize == 0

    def size(self):
        return self._stackSize

#/* *** ODSATag: DynamicArrayStackIterator *** */
    def __iter__(self):
        for i in reversed(range(self._stackSize)):
            yield self._internalArray[i]
#/* *** ODSAendTag: DynamicArrayStackIterator *** */
```

```java
/* *** ODSATag: DynamicArrayStackInit *** */
class DynamicArrayStack<E> implements Stack<E> {
    private E[] internalArray;   // Internal array containing the stack elements
    private int stackSize;       // Size of stack, and index of the next free slot

    static int MinCapacity = 8;               // Minimum capacity of internalArray
    static double MinLoadFactor = 0.5;        // Must be smaller than 1/CapacityMultiplier
    static double CapacityMultiplier = 1.5;   // Factor to grow/shrink the capacity

    @SuppressWarnings("unchecked")
    public DynamicArrayStack() {
        internalArray = (E[]) new Object[MinCapacity];
        stackSize = 0;
    }
/* *** ODSAendTag: DynamicArrayStackInit *** */

/* *** ODSATag: DynamicArrayStackPush *** */
    public void push(E x) {
        if (stackSize >= internalArray.length)
            resizeArray((int) (internalArray.length * CapacityMultiplier));
        internalArray[stackSize] = x;
        stackSize++;
    }
/* *** ODSAendTag: DynamicArrayStackPush *** */

/* *** ODSATag: DynamicArrayStackPeek *** */
    public E peek() {
        if (!(stackSize > 0)) throw new NoSuchElementException("peek from empty stack");
        return internalArray[stackSize-1];
    }
/* *** ODSAendTag: DynamicArrayStackPeek *** */

/* *** ODSATag: DynamicArrayStackPop *** */
    public E pop() {
        if (!(stackSize > 0)) throw new NoSuchElementException("pop from empty stack");
        stackSize--;
        E x = internalArray[stackSize];
        internalArray[stackSize] = null;   // For garbage collection
        if (stackSize <= internalArray.length * MinLoadFactor)
            resizeArray((int) (internalArray.length / CapacityMultiplier));
        return x;
    }
/* *** ODSAendTag: DynamicArrayStackPop *** */

/* *** ODSATag: DynamicArrayStackResize *** */
    private void resizeArray(int newCapacity) {
        if (newCapacity < MinCapacity) return;
        @SuppressWarnings("unchecked")
        E[] newArray = (E[]) new Object[newCapacity];
        for (int i = 0; i < stackSize; i++)
            newArray[i] = internalArray[i];
        internalArray = newArray;
    }
/* *** ODSAendTag: DynamicArrayStackResize *** */

    public boolean isEmpty() {
        return stackSize == 0;
    }

    public int size() {
        return stackSize;
    }

/* *** ODSATag: DynamicArrayStackIterator *** */
    public Iterator<E> iterator() {
        return Arrays.stream(internalArray, 0, stackSize).iterator();
    }
/* *** ODSAendTag: DynamicArrayStackIterator *** */
}
```


