
## Collections and sequences

### ADT for collections

There are some properties that lists share with many other data
structures (some of them will be introduced later in this course). Then
it's good habit to extract the most important common properties into a
more general kind of ADT, which we will call collections.

A collection contains a number of elements, and it supports only two
things: we can inquire how many elements it contains, and we can iterate
through all elements, one at the time (i.e., it is Iterable).

    interface Collection extends Iterable:
        isEmpty()   // Returns true if the collection is empty.
        size()      // Returns the number of elements in this collection.

Note that this very interface will not be implemented as it is, but
instead we will use this as a base interface that we extend in different
ways, e.g., for lists or sets or priority queues.


### What is a sequence?

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
