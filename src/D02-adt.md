
## The List ADT

### What is a List?

We all have an intuitive understanding of what we mean by a "list". We
want to turn this intuitive understanding into a concrete data structure
with implementations for its operations. The most important concept
related to lists is that of [position]{.term}.
In other words, we perceive that there is a first element in the list, a
second element, and so on. So, define a [list]{.term} to be a finite, ordered sequence of data items known as
[elements](#element){.term}. This is close to
the mathematical concept of a [sequence]{.term}.

"Ordered" in this definition means that each element has a position in
the list. So the term "ordered" in this context does **not** mean that
the list elements are sorted by value. (Of course, we can always choose
to sort the elements on the list if we want; it's just that keeping the
elements sorted is not an inherent property of being a list.)

Each list element must have some data type. In the simple list
implementations discussed in this chapter, all elements of the list are
usually assumed to have the same data type, although there is no
conceptual objection to lists whose elements have differing data types
if the application requires it. The operations defined as part of the
list [ADT]{.term} depend on the elemental
[data type]{.term}. For example, the list ADT
can be used for lists of integers, lists of characters, lists of payroll
records, even lists of lists.

A list is said to be [empty]{.term} when it
contains no elements. The number of elements currently stored is called
the [length]{.term} of the list. The beginning
of the list is called the [head]{.term}, the end
of the list is called the [tail]{.term}.

We need some notation to show the contents of a list, so we will use the
same angle bracket notation that is normally used to represent
[sequences](#sequence){.term}. To be consistent
with standard array indexing, the first position on the list is denoted
as 0. Thus, if there are $n$ elements in the list, they are given
positions 0 through $n-1$ as
$\langle\ a_0,\ a_1,\ ...,\ a_{n-1}\ \rangle$. The subscript indicates
an element's position within the list. Using this notation, the empty
list would appear as $\langle\ \rangle$.

### Collections

There are some properties that lists share with many other data
structures (some of them will be introduced later in this course). Then
it's good habit to extract the most important common properties into a
more general kind of ADT, which we will call collections.

A collection contains a number of elements, and it supports only two
things: we can inquire how many elements it contains, and we can iterate
through all elements, one at the time (i.e., it is Iterable).

```python
class Collection(Iterable):
    def isEmpty(self):  """Returns true if the collection is empty."""
    def size(self):     """Returns the number of elements in this collection."""
```

```java
// Note: This is a subset of java.util.Collection
interface Collection<E> extends Iterable<E> {
    boolean isEmpty();  // Returns true if the collection is empty.
    int size();         // Returns the number of elements in this collection.
}
```



Note that this very interface will not be implemented as it is, but
instead we will use this as a base interface that we extend in different
ways, e.g., for lists or sets or priority queues.

### Defining the List ADT

Now, back to the lists that we started talking about.

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

```python
class List(Collection):
    def add(self, i, x): """Adds x at position i; where 0 <= i <= size."""
    def get(self, i):    """Returns the element at position i; where 0 <= i < size."""
    def set(self, i, x): """Replaces the value at position i with x; where 0 <= i < size."""
    def remove(self, i): """Removes the element at position i; where 0 <= i < size."""
    # Note: __iter__() should yield the elements starting from position 0.
```

```java
// Note: This is a subset of java.util.List
interface List<E> extends Collection<E> {
    void add(int i, E x);  // Adds x at position i; where 0 <= i <= size.
    E get(int i);          // Returns the element at position i; where 0 <= i < size.
    E set(int i, E x);     // Replaces the value at position i with x; where 0 <= i < size..
    E remove(int i);       // Removes the element at position i; where 0 <= i < size..
    // Note: iterator() should yield the elements starting from position 0.
}
```

<inlineav id="ListADT-Positions-CON" src="ChalmersGU/ListADT-Positions-CON.js" name="List ADT Positions Slideshow" links="ChalmersGU/CGU-Styles.css"/>

The `List` member functions allow you to build a list with elements in
any desired order, and to access any desired position in the list.

A list can be iterated through as follows:

```java
Iterator<E> it = L.iterator();
while (it.hasNext()) {
    E elem = it.next();
    doSomething(elem);
}
```



Both Java and Python has syntactic sugar for iterators, so the same
iteration can be written like this:

```java
for (E elem : L) {
    doSomething(elem);
}
```



In this example, each element of the list in turn is stored in `it`, and
passed to the `doSomething` function. The loop terminates when the
current position reaches the end of the list.

The list class declaration presented here is just one of many possible
interpretations for lists. Our list interface provides most of the
operations that one naturally expects to perform on lists and serves to
illustrate the issues relevant to implementing the list data structure.
As an example of using the list ADT, here is a function to return `true`
if there is an occurrence of a given element in the list, and `false`
otherwise. The `find` method needs no knowledge about the specific list
implementation, just the list ADT.

```java
// Return true if k is in list L, false otherwise.
static <E> boolean find(List<E> L, E k) {
    for (E n : L) {
        if (k.equals(n))
            return true;  // Found k
    }
    return false;         // k not found
}
```



There are two standard approaches to implementing lists, the
[array-based list](#static-array-based-lists), and the
[linked list](#linked-lists).
