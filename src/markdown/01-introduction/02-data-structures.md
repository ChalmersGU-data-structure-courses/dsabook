
## Data structures {#intro:data-structures}

The term data structure is loosely defined as a way of organising a
collection of data items in computer memory, along with operations for
accessing and modifying that data. Generally speaking that includes two things:

* A description of how the data is stored in computer memory.
* Efficient algorithms to access and modify the data.

One of the simplest and most useful examples of a data structure is the *array*.
An array stores a sequence of elements in a contiguous block of memory,
which makes accessing each individual element extremely fast.
Therefore are used extensively as a building block for more complex data structures.
However, as a data structure, arrays have two important limitations:

*   All elements must have the same size in memory.
    The reason for this restriction is that we want efficient *indexing*:
    to find the element at a given position, we can compute its memory address immediately.
    The drawback is that variable-sized objects, such as strings or other data structures,
    cannot be stored directly in the array --
    instead we have to store pointers to the objects, which is an extra step of indirection.

*   The size of an array cannot be extended after creation.
    This is because of how computer memory is allocated:
    the memory immediately around the array may be occupied by other data,
    so while the array can have any initial size, it cannot grow after it is created.

If you are used to programming in Python, you may object that new elements
can be appended to arrays. That is because lists in Python are not arrays,
they are *dynamic arrays* (see @sec:sequences:dynamic-arrays).

A small variation of the array is the *sorted array*.
A sorted array is an array with an *ordering invariant*, such as an array of integers in increasing order.
The invariant must be preserved throughout the lifetime of the sorted array
(see @sec:analysis-1:invariants to learn more about invariants).
Any operation that modifies the array must ensure it remains sorted,
but it also allows operations to assume the array is sorted initially.
The advantage of using a sorted array is that they can be searched efficiently,
using *binary search* (see @sec:sorting-1:binary-search).

The other fundamental building block of data structures in this book are
*objects*, as seen in object-oriented programming. Combinations of arrays
and objects with various invariants form the data representation of every
data structure taught in this book.
