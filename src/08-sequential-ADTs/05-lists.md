
## Lists

We need some notation to show the contents of a list, so we will use the
same angle bracket notation that is normally used to represent
[sequences](#sequence){.term}. To be consistent
with standard array indexing, the first position on the list is denoted
as 0. Thus, if there are $n$ elements in the list, they are given
positions 0 through $n-1$ as
$\langle\ a_0,\ a_1,\ ...,\ a_{n-1}\ \rangle$. The subscript indicates
an element's position within the list. Using this notation, the empty
list would appear as $\langle\ \rangle$.

### ADT for lists

What basic operations do we want our lists to support? Our common
intuition about lists tells us that a list should be able to grow and
shrink in size as we insert and remove elements. We should be able to
insert and remove elements from anywhere in the list. We should be able
to gain access to any element's value, either to read it or to change
it. Finally, we should be able to know the size of the list, and to
iterate through the elements in the list -- i.e., the list should be a
Collection.

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

-   `get(i)` to read the value of an element at the given position `i`
-   `set(i,x)` to set the value at position `i` to value `x`
-   `add(i,x)` to add (insert) an element `x`, at position `i`, thus
    increasing the size of the list
-   `remove(i)` to remove the element at position `i`, thus decreasing
    the size of the list

Apart from these four, we also want to be able to loop through the list
elements in order (i.e., an `iterator` over the elements).

    interface List extends Collection:
        add(i, x)  // Adds x at position i; where 0 <= i <= size.
        get(i)     // Returns the element at position i; where 0 <= i < size.
        set(i, x)  // Replaces the value at position i with x; where 0 <= i < size.
        remove(i)  // Removes the element at position i; where 0 <= i < size.

<inlineav id="ListADT-Positions-CON" src="ChalmersGU/ListADT-Positions-CON.js" name="List ADT Positions Slideshow" links="ChalmersGU/CGU-Styles.css"/>

The `List` member functions allow you to build a list with elements in
any desired order, and to access any desired position in the list.

A list `L` can be iterated through as follows:

    iter = L.iterator()
    elem = iter.next()
    while elem:
        doSomething(elem)
        elem = iter.next()

In this example, each element of the list in turn is stored in `iter`,
and passed to the `doSomething` function. The loop terminates when the
current position reaches the end of the list.

(Note that the loop looks slightly different in Java and Python,
because of how they implement iterators.)

Many languages, including Java and Python, has syntactic sugar for iterators,
so the same iteration can be written something like this:

    for each elem in L:
        doSomething(elem)

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
[array-based list](#static-array-based-lists), and the
[linked list](#linked-lists).


### Invariants


### Alternative approaches

::: TODO
- alternative interface
:::
