
## Collections

A _collection_ is a general term for structures like lists and queues.
It holds multiple elements and supports two main operations: checking the number of elements and iterating through them one at a time.

    interface Collection of T:
        // We assume that we can iterate over the elements in the collection, using a for loop.
        size: Int               // The number of elements in this collection.
        isEmpty() -> Bool:      // Returns true if the collection is empty.
            return size == 0

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
[elements]{.term}. This is close to
the mathematical concept of a [sequence]{.term}.

"Ordered" in this definition means that each element has a position in
the list. So the term "ordered" in this context does ***not*** mean that
the list elements are sorted by value. (Of course, we can always choose
to sort the elements on the list if we want; it's just that keeping the
elements sorted is not an inherent property of being a list.)

Each list element must have some data type. In the simple list
implementations discussed in this chapter, all elements of the list are
usually assumed to have the same data type, although there is no
conceptual objection to lists whose elements have differing data types
if the application requires it. The operations defined as part of the
list [ADTs]{.term} depend on the elemental [data type]{.term}.
For example, the queue ADT can be used for queues of integers, queues of characters, queues of payroll records, even queues of queues.

A list is said to be [empty]{.term} when it
contains no elements. The number of elements currently stored is called
the [length]{.term} (or size) of the list. The beginning
of the list is called the [head]{.term}, the end
of the list is called the [tail]{.term}.

