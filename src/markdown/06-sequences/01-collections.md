
## Collections and sequences

A _collection_ is a general term for a data structure that can contain multiple elements.
In this chapter you will encounter stacks and queues, and more general lists,
and in later chapters will we introduce sets and maps.
The only thing we will require from a collection is that it supports two basic operations:

- it must know its own *size*, that is, the number of elements in the collection, and
- it is possible to *iterate* over the elements.

For convenience we often iterate the elements using a `for`-loop, like this:

    for each x in C:
        // do something with the element x

When we describe the different ADTs (stacks, queues, lists, etc.), we can do this as pseudocode.
Then we will call the ADT an *interface*, and
this interface will *extend* the basic *Collection* interface.
For example, here is how the interface for the stack ADT looks like:

    interface Stack of T extends Collection:
        push(x: T)     // Pushes x on top of the stack.
        pop() -> T     // Pops the top of the stack and returns it.
        peek() -> T    // Returns the top element, without removing it.

This means that whenever we have a stack we know that we can use the methods
*push*, *pop* and *peek*, as well as the *size* of the stack.

### What is a sequence?

We all have an intuitive understanding of what we mean by a "list".
We want to turn this intuitive understanding into a concrete data structure with implementations for its operations.
The most important concept related to lists is that of [position]{.term}.
In other words, we perceive that there is a first element in the list, a second element, and so on.
So, we define a [list]{.term} or a [sequence]{.term} to be a finite, ordered sequence of data items known as [elements]{.term}.

"Ordered" in this definition means that each element has a position in the list.
So the term "ordered" in this context does ***not*** mean that the list elements are sorted by value.
(Of course, we can always choose to sort the elements on the list if we want;
it's just that keeping the elements sorted is not an inherent property of being a list.)

Each list element must have some data type.
In the simple list implementations discussed in this chapter,
all elements of the list are usually assumed to have the same data type
(although there is no conceptual objection to lists whose elements have differing data types).
For example, the queue ADT can be used for queues of integers, queues of characters,
queues of payroll records, or even queues of queues.

A list is said to be *empty* when it contains no elements.
The number of elements currently stored is called the *length* or *size*,
the beginning of the list is called the *head*, *top*, or *front*,
and the end of the list is called the *tail*, *bottom*, *rear*, or *back*.
