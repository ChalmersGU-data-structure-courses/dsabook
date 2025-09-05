
## General lists

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

### ADT for general lists

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

<inlineav id="ListADT-Positions-CON" src="ChalmersGU/ListADT-Positions-CON.js" name="List ADT Positions Slideshow" links="ChalmersGU/CGU-Styles.css"/>
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

<!--
### Invariants
 -->

### Implementing using linked lists

We can use the same structure as for stacks when implementing general linked lists:

    datatype LinkedList implements List:
        head: Node = null   // Pointer to list header
        size: Int = 0       // Size of list

::: dsvis
Iterating through a linked list.

<inlineav id="LinkedList-Iteration-CON" src="ChalmersGU/LinkedList-Iteration-CON.js" name="Linked List Slideshow 1" links="ChalmersGU/CGU-Styles.css"/>
:::

#### Adding and removing nodes

However, if we want to add or remove nodes, there is a problem with
using a pointer to the `current` node.

::: dsvis
The problem with using a pointer to the `current` node.

<inlineav id="LinkedList-Problems-CON" src="ChalmersGU/LinkedList-Problems-CON.js" name="Linked List Add/Remove Problems" links="ChalmersGU/CGU-Styles.css"/>
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

<inlineav id="LinkedList-Add-CON" src="ChalmersGU/LinkedList-Add-CON.js" name="Linked List Add Slideshow" links="ChalmersGU/CGU-Styles.css"/>
:::

::: dsvis
Here are some special cases for linked list insertion: Inserting at the beginning of a list, and appending at the end.

<inlineav id="LinkedList-AddSpecial-CON" src="ChalmersGU/LinkedList-AddSpecial-CON.js" name="Linked List Add Special Cases Slideshow" links="ChalmersGU/CGU-Styles.css"/>
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

<avembed id="LinkedList-Add-PRO" src="ChalmersGU/LinkedList-Add-PRO.html" type="ka" name="Linked List Add Exercise"/>
:::

#### Removing a node

::: dsvis
How to delete from a linked list.

<inlineav id="LinkedList-Remove-CON" src="ChalmersGU/LinkedList-Remove-CON.js" name="Linked List Remove Slideshow" links="ChalmersGU/CGU-Styles.css"/>
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

<avembed id="LinkedList-Remove-PRO" src="ChalmersGU/LinkedList-Remove-PRO.html" type="ka" name="Linked List Remove Exercise" height="700"/>
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
