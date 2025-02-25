
## Comparison of linked lists vs dynamic arrays

::: TODO
- should this be here or after the general lists section?
   - if here, we must change the discussion about lists to stacks/queues
- compare linked lists with arrays: no random access, but easy to insert (if we have a pointer)
:::

### Stacks

All operations for the array-based and linked stack implementations take
constant time, so from a time efficiency perspective, neither has a
significant advantage. Another basis for comparison is the total space
required. The analysis is similar to that done for list implementations.
The array-based stack must allocate an array with more elements than
actually needed, and some of that space is wasted whenever the stack is
not full. The linked stack can shrink and grow but requires the overhead
of a `next` field for every element.

### Queues

All member functions for both the array-based and linked queue
implementations require constant time. The space comparison issues are
the same as for the equivalent stack implementations.

Unlike the array-based stack implementation, there is no convenient way
to store two queues in the same array, unless items are always
transferred directly from one queue to the other.

### Memory usage

Now that you have seen two substantially different implementations for
lists, it is natural to ask which is better. In particular, if you must
implement a list for some task, which implementation should you choose?

Given a collection of elements to store, they take up some amount of
space whether they are simple integers or large objects with many
fields. Any container data structure like a list then requires some
additional space to organize the elements being stored. This additional
space is called [overhead]{.term}.

[Array-based lists](#array-based-list){.term}
have the disadvantage that their size must be predetermined before the
array can be allocated. Static array-based lists cannot grow beyond
their predetermined size, but dynamic lists will automatically
reallocate the array when needed. However, when the list has recently
been reallocated, a substantial amount of space might be tied up in a
largely empty array. This empty space is the overhead required by the
array-based list. [Linked lists](#linked-list){.term} have the advantage that they only need space for the
objects actually on the list. There is no limit to the number of
elements in either a linked list or a dynamic array-based list, as long
as there is [free store]{.term} memory
available.

The amount of space required by a linked list is directly proportional
to the number of elements $n$. Assuming that each list node takes up $K$
bytes of memory, the full list will use $Kn$ bytes. The amount of space
required by an array-based list is in the worst case three times as much
as $n$ times the size of an array cell. (This worst case will arise when
we remove a lot of elements from the list, because we wait until it is
1/3 full until we shrink the array). So assuming that one array cell
takes up $C$ bytes, the full array-based list will use at least $Cn$
bytes, and at most $3Cn$ bytes.

So, which one is the best? It depends on the size of the list nodes $K$,
compared to the size of the array cells $C$. Array-based lists have the
advantage that there is no wasted space for an individual element.
Linked lists require that an extra pointer for the `next` field be added
to every list node. So the linked list has these `next` pointers as
overhead. In many cases, $K$ is 2--3 times as large as $C$, so they will
be quite similar in size on average. But this depends on the programming
language, the operating system, and perhaps other factors.

Note that these calculations exclude the memory used by the actual list
elements, since the lists themselves only contain pointers to the
elements! And in many cases, the objects themselves are much larger than
the list nodes (or array cells).

### Time complexity

Array-based lists are faster for access by position. To locate an
element anywhere in the list is constant time, i.e., they take
$\Theta(1)$ time. In contrast, for singly linked lists, access by
position requires that we march down the list from the front to the
specified position. This requires $\Theta(n)$ time in the worst case,
which is when if we want to locate the very last element.

Assuming that we already have located a suitable location in the list,
insertion and removal are constant time, $\Theta(1)$. However, as
already mentioned, finding that location takes $\Theta(n)$, so the `add`
and `remove` methods are linear time, $\Theta(n)$. Array-based lists
must shift the remainder of the list up or down within the array. This
requires $\Theta(n)$ time in the worst case.

Note that linked lists and array-based lists have different worst-case
isntances! For a linked list, inserting/removing at the end takes the
longest time, while for an array-base list, the problem is to
insert/remove from the beginning.

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
    implements [doubly-linked lists](#doubly-linked-lists), so that the iterator can move forward and backward
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
