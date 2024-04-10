
## Static Array-Based Lists

First we give a static implementation for array-based lists, named
**StaticArrayList**. This inherits from the
[List ADT](#all-adts-used-in-this-book), and must therefore
implement all of the member functions of `List`.

Unlike normal arrays, lists can change in size: we can add elements to
and remove from them. How can this be implemented? Well, what we
*don't* want to do is to create a completely new array every time
elements are added or removed. So instead we will use an underlying
array which is larger than we need.

### Internal variables

Because of that will need two internal variables: the underlying array,
and a *size* counter telling how much of the array is actually used.
When we create a new array-list we have to decide the *capacity*, the
largest possible size. Then the underlying array is initialised, and the
size counter is set to 0 because there are no elements yet.

<inlineav id="StaticArrayList-Vars-CON" src="ChalmersGU/StaticArrayList-Vars-CON.js" name="Static Array-based List Variables Slideshow"/>


```python
class StaticArrayList(List):
    def __init__(self, capacity):
        self._internalArray = [None] * capacity   # Internal array containing the list elements
        self._listSize = 0                        # Size of list
```

```java
class StaticArrayList<E> implements List<E> {
    private E[] internalArray;   // Internal array containing the list elements
    private int listSize;        // Size of list

    @SuppressWarnings("unchecked")
    public StaticArrayList(int capacity) {
        internalArray = (E[]) new Object[capacity];
        listSize = 0;
    }
```



### Getting and setting values

Random access to any element in the list is quick and easy.

<inlineav id="StaticArrayList-Intro-CON" src="ChalmersGU/StaticArrayList-Intro-CON.js" name="Static Array-based List Intro Slideshow" links="ChalmersGU/CGU-Styles.css"/>

As you can see below, there are no loops in the methods `get` and `set`,
which means that both require $\Theta(1)$ time.

```python
    def get(self, i):
        if not (0 <= i < self._listSize): raise IndexError("list index out of range")
        return self._internalArray[i]

    def set(self, i, x):
        if not (0 <= i < self._listSize): raise IndexError("list index out of range")
        old = self._internalArray[i]
        self._internalArray[i] = x
        return old
```

```java
    public E get(int i) {
        if (!(0 <= i && i < listSize)) throw new IndexOutOfBoundsException("list index out of range");
        return internalArray[i];
    }

    public E set(int i, E x) {
        if (!(0 <= i && i < listSize)) throw new IndexOutOfBoundsException("list index out of range");
        E old = internalArray[i];
        internalArray[i] = x;
        return old;
    }
```



### Adding elements

Because the array-based list implementation is defined to store list
elements in contiguous cells of the array, the `add` and `remove`
methods must maintain this property.

Appending elements at the tail of an array-based list is super-fast.

<inlineav id="StaticArrayList-Append-CON" src="ChalmersGU/StaticArrayList-Append-CON.js" name="Static Array-based List Append Slideshow" links="ChalmersGU/CGU-Styles.css"/>

However, adding an element at the head of the list requires shifting all
existing elements in the array by one position toward the tail.

<inlineav id="StaticArrayList-Add-CON" src="ChalmersGU/StaticArrayList-Add-CON.js" name="Static Array-based List Insertion Slideshow" links="ChalmersGU/CGU-Styles.css"/>

Therefore, if we want to add an element at position $i$, then
$n - i - 1$ elements must shift toward the tail to leave room for the
new element. In the worst case, adding elements requires moving all $n$
elements, which is $\Theta(n)$.

```python
    def add(self, i, x):
        if not (self._listSize < len(self._internalArray)): raise IndexError("list capacity exceeded")
        if not (0 <= i <= self._listSize):                  raise IndexError("list index out of range")
        self._listSize += 1
        for k in reversed(range(i+1, self._listSize)):
            self._internalArray[k] = self._internalArray[k-1]
        self._internalArray[i] = x
```

```java
    public void add(int i, E x) {
        if (!(listSize < internalArray.length)) throw new IndexOutOfBoundsException("list capacity exceeded");
        if (!(0 <= i && i <= listSize))         throw new IndexOutOfBoundsException("list index out of range");
        listSize++;
        for (int k = listSize-1; k > i; k--)
            internalArray[k] = internalArray[k-1];
        internalArray[i] = x;
    }
```



#### Add Practice Exericse

<avembed id="StaticArrayList-Add-PRO" src="ChalmersGU/StaticArrayList-Add-PRO.html" type="ka" name="Array-based List Add Exercise"/>

### Removing elements

Removing an element from the head of the list is similar to adding in
the sense that all remaining elements must shift. But now we have to
shift toward the head to fill in the gap, instead of toward the tail. If
we want to remove the element at position $i$, then $n - i - 1$ elements
must shift toward the head, as shown in the following slideshow.

<inlineav id="StaticArrayList-Remove-CON" src="ChalmersGU/StaticArrayList-Remove-CON.js" name="Static Array-based List Remove" links="ChalmersGU/CGU-Styles.css"/>

In the worst case, insertion or removal each requires moving all $n$
elements, which is $\Theta(n)$.

```python
    def remove(self, i):
        if not (0 <= i < self._listSize): raise IndexError("list index out of range")
        x = self._internalArray[i]
        for k in range(i+1, self._listSize):
            self._internalArray[k-1] = self._internalArray[k]
        self._listSize -= 1
        self._internalArray[self._listSize] = None   # For garbage collection
        return x
```

```java
    public E remove(int i) {
        if (!(0 <= i && i < listSize)) throw new IndexOutOfBoundsException("list index out of range");
        E x = internalArray[i];
        for (int k = i+1; k < listSize; k++)
            internalArray[k-1] = internalArray[k];
        listSize--;
        internalArray[listSize] = null;   // For garbage collection
        return x;
    }
```



#### Remove Practice Exericise

<avembed id="StaticArrayList-Remove-PRO" src="ChalmersGU/StaticArrayList-Remove-PRO.html" type="ka" name="Array-based List Remove Exercise"/>

### Static Array-based List Summary Questions

<avembed id="StaticArrayList-Summary-QUIZ" src="ChalmersGU/StaticArrayList-Summary-QUIZ.html" type="ka" name="Static Array-based List Summary"/>

### Static Array-based List: Full code

Finally, here is the full source code for the class `StaticArrayList`.

```python
#/* *** ODSATag: StaticArrayListInit *** */
class StaticArrayList(List):
    def __init__(self, capacity):
        self._internalArray = [None] * capacity   # Internal array containing the list elements
        self._listSize = 0                        # Size of list
#/* *** ODSAendTag: StaticArrayListInit *** */

#/* *** ODSATag: StaticArrayListGetSet *** */
    def get(self, i):
        if not (0 <= i < self._listSize): raise IndexError("list index out of range")
        return self._internalArray[i]

    def set(self, i, x):
        if not (0 <= i < self._listSize): raise IndexError("list index out of range")
        old = self._internalArray[i]
        self._internalArray[i] = x
        return old
#/* *** ODSAendTag: StaticArrayListGetSet *** */

#/* *** ODSATag: StaticArrayListAdd *** */
    def add(self, i, x):
        if not (self._listSize < len(self._internalArray)): raise IndexError("list capacity exceeded")
        if not (0 <= i <= self._listSize):                  raise IndexError("list index out of range")
        self._listSize += 1
        for k in reversed(range(i+1, self._listSize)):
            self._internalArray[k] = self._internalArray[k-1]
        self._internalArray[i] = x
#/* *** ODSAendTag: StaticArrayListAdd *** */

#/* *** ODSATag: StaticArrayListRemove *** */
    def remove(self, i):
        if not (0 <= i < self._listSize): raise IndexError("list index out of range")
        x = self._internalArray[i]
        for k in range(i+1, self._listSize):
            self._internalArray[k-1] = self._internalArray[k]
        self._listSize -= 1
        self._internalArray[self._listSize] = None   # For garbage collection
        return x
#/* *** ODSAendTag: StaticArrayListRemove *** */

    def isEmpty(self):
        return self._listSize == 0

    def size(self):
        return self._listSize

    def __iter__(self):
        raise NotImplementedException("Left as an exercise.")
```

```java
/* *** ODSATag: StaticArrayListInit *** */
class StaticArrayList<E> implements List<E> {
    private E[] internalArray;   // Internal array containing the list elements
    private int listSize;        // Size of list

    @SuppressWarnings("unchecked")
    public StaticArrayList(int capacity) {
        internalArray = (E[]) new Object[capacity];
        listSize = 0;
    }
/* *** ODSAendTag: StaticArrayListInit *** */

/* *** ODSATag: StaticArrayListGetSet *** */
    public E get(int i) {
        if (!(0 <= i && i < listSize)) throw new IndexOutOfBoundsException("list index out of range");
        return internalArray[i];
    }

    public E set(int i, E x) {
        if (!(0 <= i && i < listSize)) throw new IndexOutOfBoundsException("list index out of range");
        E old = internalArray[i];
        internalArray[i] = x;
        return old;
    }
/* *** ODSAendTag: StaticArrayListGetSet *** */

/* *** ODSATag: StaticArrayListAdd *** */
    public void add(int i, E x) {
        if (!(listSize < internalArray.length)) throw new IndexOutOfBoundsException("list capacity exceeded");
        if (!(0 <= i && i <= listSize))         throw new IndexOutOfBoundsException("list index out of range");
        listSize++;
        for (int k = listSize-1; k > i; k--)
            internalArray[k] = internalArray[k-1];
        internalArray[i] = x;
    }
/* *** ODSAendTag: StaticArrayListAdd *** */

/* *** ODSATag: StaticArrayListRemove *** */
    public E remove(int i) {
        if (!(0 <= i && i < listSize)) throw new IndexOutOfBoundsException("list index out of range");
        E x = internalArray[i];
        for (int k = i+1; k < listSize; k++)
            internalArray[k-1] = internalArray[k];
        listSize--;
        internalArray[listSize] = null;   // For garbage collection
        return x;
    }
/* *** ODSAendTag: StaticArrayListRemove *** */

    public boolean isEmpty() {
        return listSize == 0;
    }

    public int size() {
        return listSize;
    }

    public Iterator<E> iterator() {
        throw new UnsupportedOperationException("Left as an exercise.");
    }
}
```


