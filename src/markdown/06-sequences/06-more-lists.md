
## Other kinds of lists

***TODO: Bla bla... stacks and queus are very limited, and there are gradually more advanced sequence ADTs***


### Double-ended queues

::: TODO
- Prio 1: hide this section until written
- Prio 2: invariants, use cases, explaining text
:::

<!-- START NOTES -->

A double-ended queue is both a stack and a queue at the same time. We can add and remove elements both from the front and the back (but not in the middle):

- addFirst(x) and addLast(x)
- removeFirst() and removeLast()

One easy way to implement a deque is to use a circular dynamic array, just as the one we used for queues. I leave it as an exercise for you to figuring out the implementations of the four methods.

However, it is not as easy to implement a deque using a linked list. The solution is to use a *double-linked list*, where each node points both forward and backward:

![](images/LinkedDeque.png)

Now, to add or remove an element, we have to make sure we assign both the *next* and *prev* pointers, for the neighbouring nodes. This can be a little tricky, but in the end it's not very complicated.

<!-- END NOTES -->

-------


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

```{.jsav-figure scripts="DataStructures/DoubleLinkList.js" links="DataStructures/DoubleLinkList.css"}
var AV = NewAV();
// Relative offsets
var leftMargin = 180;
var topMargin = 40;
// JSAV list
var l = AV.ds.dlist({nodegap: 30, center: false, left: leftMargin, top: topMargin});
l.addFirst(42).addFirst(15).addFirst(12).addFirst(23).addFirst(20).addFirst(8);
l.layout();
AV.pointer("head", l.get(0));
AV.pointer("tail", l.get(5));
AV.displayInit();
AV.recorded();
```

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


### General lists

<!-- START NOTES -->

Stacks and queues (and deques) are special cases of a more general abstract data type, the list. In a general list you can access any element by its position in the list, you can replace elements, and you can insert and remove elements. Python lists are one example, and the ArrayList in Java is another.

One interesting thing with lists is that it is impossible (or at least ver difficult) to make them efficient for all possible operations -- both accessing any position, and inserting and removing at any position. You can make them efficient for one kind of operation (for example, accessing by position), but then other operations will be slower (for example, inserting in the middle).

The most common implementation of a general list is a dynamic array, and that is how both Python lists and Java ArrayLists do it. For both of them it is inefficient to insert and remove elements at the beginning.

<!-- END NOTES -->

-------

::: TODO
- Prio 2: invariants
- Prio 2: refactor: much of the text is supposed to be the first in the chapter (see file 09b)
- Prio 3: alternative APIs
:::


We need some notation to show the contents of a list, so we will use the
same angle bracket notation that is normally used to represent
[sequences]{.term}. To be consistent
with standard array indexing, the first position on the list is denoted
as 0. Thus, if there are $n$ elements in the list, they are given
positions 0 through $n-1$ as
$\langle\ a_0,\ a_1,\ ...,\ a_{n-1}\ \rangle$. The subscript indicates
an element's position within the list. Using this notation, the empty
list would appear as $\langle\ \rangle$.

::: TODO
- Dyn arrays can do most things efficient (except insert/remove from the middle)
- (Doubly) linked lists can only modify from front/rear
- But with a pointer it's efficient to modify in the mdidle (see Java Spliterator)
:::

What basic operations do we want our lists to support? Our common
intuition about lists tells us that a list should be able to grow and
shrink in size as we insert and remove elements. We should be able to
insert and remove elements from anywhere in the list. We should be able
to gain access to any element's value, either to read it or to change
it. Finally, we should be able to know the size of the list, and to
iterate through the elements in the list -- i.e., the list should be a
Collection.

:::::: latex
\booklink{Read the rest online}{6.10}{sec:general-lists}
::::::

:::::: online

#### ADT for general lists

Now we can define the ADT for a list object in terms of a set of
operations on that object. We will use an interface to formally define
the list ADT. `List` defines the member functions that any list
implementation inheriting from it must support, along with their
parameters and return types.

True to the notion of an ADT, an interface does not specify how
operations are implemented. Two complete implementations are presented
later (array-based lists and linked lists), both of which use the same
list ADT to define their operations. But they are considerably different
in approaches and in their space/time tradeoffs.

The code below presents our list ADT. The comments given with each
member function describe what it is intended to do. However, an
explanation of the basic design should help make this clearer. There are
four main operations we want to support:

    interface List extends Collection:
        add(i, x)  // Adds (inserts) x at position i; where 0 <= i <= size, increasing the size.
        get(i)     // Returns the element at position i; where 0 <= i < size.
        set(i, x)  // Sets the value at position i to x; where 0 <= i < size.
        remove(i)  // Removes the element at position i; where 0 <= i < size, decreasing the size.

Apart from these four, we also want to know the number of elements, to be able to loop through the list elements in order.
So we make the List interface be a Collection too.

::: dsvis
Insertion into a linked list, overview.

``` {.jsav-animation src="ChalmersGU/ListADT-Positions-CON.js" links="ChalmersGU/CGU-Styles.css" name="List ADT Positions Slideshow"}
```
:::

The `List` member functions allow you to build a list with elements in
any desired order, and to access any desired position in the list.

The list class declaration presented here is just one of many possible
interpretations for lists. Our list interface provides most of the
operations that one naturally expects to perform on lists and serves to
illustrate the issues relevant to implementing the list data structure.
As an example of using the list ADT, here is a function to return `true`
if there is an occurrence of a given element in the list, and `false`
otherwise. The `find` method needs no knowledge about the specific list
implementation, just the list ADT.

    // Return true if k is in list L, false otherwise.
    function find(L, k):
        for each n in L:
            if k == n:
                return true  // Found k.
        return false         // k not found.

There are two standard approaches to implementing lists, the
[array-based list]{.term}, and the [linked list]{.term}.

::::::


### Implementing using linked lists

:::::: online

We can use the same structure as for stacks when implementing general linked lists:

    datatype LinkedList implements List:
        head: Node = null   // Pointer to list header
        size: Int = 0       // Size of list

::: dsvis
Iterating through a linked list.

``` {.jsav-animation src="ChalmersGU/LinkedList-Iteration-CON.js" links="ChalmersGU/CGU-Styles.css" name="Linked List Slideshow 1"}
```
:::

#### Adding and removing nodes

However, if we want to add or remove nodes, there is a problem with
using a pointer to the `current` node.

::: dsvis
The problem with using a pointer to the `current` node.

``` {.jsav-animation src="ChalmersGU/LinkedList-Problems-CON.js" links="ChalmersGU/CGU-Styles.css" name="Linked List Add/Remove Problems"}
```
:::

So, using a `current` pointer, it is possible to add and remove nodes,
using some complicated coding. But this does not work for the very last
node! There are several possible ways to deal with this problem. One is
to always have an empty node (a "dummy node") at the very end of the
list, but this will increase memory usage.

Another simple solution is to have a pointer to the node *before* the
current node. This is the solution we will adopt.

#### Adding a node

::: dsvis
How to insert an element using a pointer to the node *before* the current node.

``` {.jsav-animation src="ChalmersGU/LinkedList-Add-CON.js" links="ChalmersGU/CGU-Styles.css" name="Linked List Add Slideshow"}
```
:::

::: dsvis
Here are some special cases for linked list insertion: Inserting at the beginning of a list, and appending at the end.

``` {.jsav-animation src="ChalmersGU/LinkedList-AddSpecial-CON.js" links="ChalmersGU/CGU-Styles.css" name="Linked List Add Special Cases Slideshow"}
```
:::

Here's the code for addition.

    datatype LinkedList:
        ...
        add(i, x):
            // precondition: 0 <= i <= size
            if i == 0:
                head = new Node(x, head)
            else:
                prev = head
                repeat i-1 times:
                    prev = prev.next
                prev.next = new Node(x, prev.next)
            size = size + 1


::: dsvis
Here's an exercise for adding a value to a linked list.

```{.jsav-embedded src="ChalmersGU/LinkedList-Add-PRO.html" type="ka" name="Linked List Add Exercise"}
```
:::

#### Removing a node

::: dsvis
How to delete from a linked list.

``` {.jsav-animation src="ChalmersGU/LinkedList-Remove-CON.js" links="ChalmersGU/CGU-Styles.css" name="Linked List Remove Slideshow"}
```
:::

Here's the code for deletion:

    datatype LinkedList:
        ...
        remove(self, i):
            // precondition: 0 <= i < size
            if i == 0:
                removed = head
                head = removed.next
            else:
                prev = head
                repeat i-1 times:
                    prev = prev.next
                removed = prev.next
                prev.next = removed.next
            removed.next = null   // For garbage collection
            size = size - 1
            return removed.elem


::: dsvis
And here's an exercise.

```{.jsav-embedded src="ChalmersGU/LinkedList-Remove-PRO.html" type="ka" name="Linked List Remove Exercise" height="700"}
```
:::

#### Complexity analysis

Locating a certain position $i$ in the list requires $i$ steps. The
worst case is if we want to go to the last node, so the time complexity
for above all operations is $O(n)$.

This is much worse than the
array-based list (@sec:implementing-general-lists-using-arrays), where
these operations are $O(1)$. So are linked lists totally useless?
No! But they don't work well with our current List interface.

To make linked lists useful, we need an enhanced iterator interface,
where we can move forwards and backwards in the list, and add/remove
nodes through this enhanced iterator. In the standard Java API, this
kind of iterator is called a
[ListIterator](https://docs.oracle.com/en/java/javase/11/docs/api/java.base/java/util/ListIterator.html),
which is part of Java's standard
[LinkedList](https://docs.oracle.com/en/java/javase/11/docs/api/java.base/java/util/LinkedList.html).

::::::


### Implementing general lists using arrays

:::::: online

First we give a static implementation for array-based lists, named
**ArrayList**. This inherits from the
List ADT (@sec:adt-for-general-lists), and must therefore
implement all of the member functions of `List`.

Unlike normal arrays, lists can change in size: we can add elements to
and remove from them. How can this be implemented? Well, what we
*don't* want to do is to create a completely new array every time
elements are added or removed. So instead we will use an underlying
array which is larger than we need.

<!-- ::: alert
#### Important note about Python lists
- **refer to the chapter on prerequisites**

Python doesn't have arrays -- i.e., fixed size constant-time access arrays
like C, Java and most other languages have.

Instead, Python has *lists*, and they are actually precisely the kind of
dynamic array-based lists that we are describe in this section and the next.
So a Python `list` is implemented using fixed-size arrays, but when you program
in Python you cannot access these arrays because they are hidden from
the programmer.
::: -->

Because of that will need two internal variables: the underlying array,
and a *size* counter telling how much of the array is actually used.
When we create a new array-list we have to decide the *capacity*, the
largest possible size. Then the underlying array is initialised, and the
size counter is set to 0 because there are no elements yet.

::: dsvis
The internals of an array-based list.

``` {.jsav-animation src="ChalmersGU/StaticArrayList-Vars-CON.js" name="Static Array-based List Variables Slideshow"}
```
:::

    datatype ArrayList implements List:
        internalArray = new Array(capacity)  // Internal array containing the list elements
        size = 0                             // Size of list

*Note*: in Python you cannot create an array with a certain capacity.
You can simulate it by creating a list with a number of empty elements:
`[None] * capacity`, but this is not a real fixed-size array as explained just above.

#### Getting and setting values

Random access to any element in the list is quick and easy.

::: dsvis
Finding a value by its position.

``` {.jsav-animation src="ChalmersGU/StaticArrayList-Intro-CON.js" links="ChalmersGU/CGU-Styles.css" name="Static Array-based List Intro Slideshow"}
```
:::

As you can see below, there are no loops in the methods `get` and `set`,
which means that both require $O(1)$ time.

    datatype ArrayList:
        ...
        get(i):
            // precondition: 0 <= i < size
            return internalArray[i]

        set(i, x):
            // precondition: 0 <= i < size
            internalArray[i] = x


#### Adding elements

Because the array-based list implementation is defined to store list
elements in contiguous cells of the array, the `add` and `remove`
methods must maintain this property.

Appending elements at the tail of an array-based list is super-fast.

::: dsvis
Appending to the end of an array-based list.

``` {.jsav-animation src="ChalmersGU/StaticArrayList-Append-CON.js" links="ChalmersGU/CGU-Styles.css" name="Static Array-based List Append Slideshow"}
```
:::

However, adding an element at the head of the list requires shifting all
existing elements in the array by one position toward the tail.

::: dsvis
Inserting at the head of the list.

``` {.jsav-animation src="ChalmersGU/StaticArrayList-Add-CON.js" links="ChalmersGU/CGU-Styles.css" name="Static Array-based List Insertion Slideshow"}
```
:::

Therefore, if we want to add an element at position $i$, then
$n - i - 1$ elements must shift toward the tail to leave room for the
new element. In the worst case, adding elements requires moving all $n$
elements, which is $O(n)$.

    datatype ArrayList:
        ...
        add(i, x):
            // precondition: 0 <= i <= size < internalArray.size
            size = size + 1
            for k in size-1, size-2 .. i+1:
                internalArray[k] = internalArray[k-1]
            internalArray[i] = x


#### Practice exercise

::: dsvis
Practice exercise about inserting into an array-based list.

```{.jsav-embedded src="ChalmersGU/StaticArrayList-Add-PRO.html" type="ka" name="Array-based List Add Exercise"}
```
:::

#### Removing elements

Removing an element from the head of the list is similar to adding in
the sense that all remaining elements must shift. But now we have to
shift toward the head to fill in the gap, instead of toward the tail. If
we want to remove the element at position $i$, then $n - i - 1$ elements
must shift toward the head, as shown in the following slideshow.

::: dsvis
Removing an element at a certain position in the list.

``` {.jsav-animation src="ChalmersGU/StaticArrayList-Remove-CON.js" links="ChalmersGU/CGU-Styles.css" name="Static Array-based List Remove Slideshow"}
```
:::

In the worst case, insertion or removal each requires moving all $n$
elements, which is $O(n)$.

    datatype ArrayList:
        ...
        remove(i):
            // precondition: 0 <= i < size
            x = internalArray[i]
            for k in i+1 .. size-1:
                internalArray[k-1] = internalArray[k]
            size = size - 1
            internalArray[size] = null  // For garbage collection
            return x


#### Practice exercise

::: dsvis
Practise exercise about removing from an array-based list.

```{.jsav-embedded src="ChalmersGU/StaticArrayList-Remove-PRO.html" type="ka" name="Array-based List Remove Exercise"}
```
:::

<!--
### Limitations

::: TODO
- What happens when the capacity is exceeded? See section about dynamic arrays
:::
 -->

<!--
### Alternative approaches

::: TODO
- alternative interface
:::
-->

::::::


### When to use linked lists?

:::::: online

According to the calculations above, linked lists are worse than
array-based lists, because all operations are slow (linear time). So why
even bother using linked lists?

First there are limited versions of lists that can be implemented
efficiently using linked lists, we will look at
[stacks] and [queues] later.

Second, our list API is not the best for linked lists. If we instead
could have a pointer to the "current" list node, and have methods for
moving forward and backward in the list, several of the operations can
be constant time. In the Java standard API this is called a
[ListIterator](https://docs.oracle.com/en/java/javase/11/docs/api/java.base/java/util/ListIterator.html),
which is part of Java's standard
[LinkedList](https://docs.oracle.com/en/java/javase/11/docs/api/java.base/java/util/LinkedList.html).

But these advanced list iterators are not part of this course, and in
fact there are not many algorithms where list iterators are particularly
useful.

::::::


### How are lists implemented in the standard libraries?

:::::: online

All serious languages have dynamic list implementations. Here are how
they are implemented in Java and Python:

-   In Java,
    [java.util.ArrayList](https://docs.oracle.com/en/java/javase/11/docs/api/java.base/java/util/ArrayList.html)
    implements dynamic arrays, meaning that the internal array grows
    automatically when necessary. The growth factor is 50%, so that if
    the array has size 1024, it will grow with another 512 elements.
    \[[Source:
    ArrayList.java](https://github.com/openjdk/jdk/blob/961dcffc862a4830fbf26791835a98c12d4b513e/src/java.base/share/classes/java/util/ArrayList.java#L236)\]
    However, the ArrayList will never shrink automatically, but instead
    it's up to the programmer to decide when to shrink it.
-   Java's
    [java.util.LinkedList](https://docs.oracle.com/en/java/javase/11/docs/api/java.base/java/util/LinkedList.html)
    implements [doubly-linked list](#doubly-linked-list){.term} (@sec:double-ended-queues), so that the iterator can move forward and backward
    through the list. \[[Source:
    LinkedList.java](https://github.com/openjdk/jdk/blob/961dcffc862a4830fbf26791835a98c12d4b513e/src/java.base/share/classes/java/util/LinkedList.java#L974-L984)\]
-   Python's standard lists are dynamic. In fact, Python doesn't even
    support fixed-length lists, so our code in this chapter is a bit of
    a hack. Python lists both grow and shrink the lists automatically,
    and the growth factor is 1/8 (12.5%), meaning that if the array has
    size 1024, it will grow with another 128 elements. It shrinks the
    array by 1/8 whenever less than half of the array is occupied.
    \[[Source:
    listobject.c](https://github.com/python/cpython/blob/e649e0658ff2af87b07d994c05ae048e16e31aae/Objects/listobject.c#L71)\]

::::::
