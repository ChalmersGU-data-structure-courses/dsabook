
:::::: online

### Implementing general lists using arrays

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

<avembed id="StaticArrayList-Add-PRO" src="ChalmersGU/StaticArrayList-Add-PRO.html" type="ka" name="Array-based List Add Exercise"/>
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

<avembed id="StaticArrayList-Remove-PRO" src="ChalmersGU/StaticArrayList-Remove-PRO.html" type="ka" name="Array-based List Remove Exercise"/>
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


### When to use linked lists?

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

### How are lists implemented in the standard libraries?

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
