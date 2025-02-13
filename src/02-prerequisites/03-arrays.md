
## Fixed-size arrays

::: TODO
- Have to know the size and type in advance
- 0-based indexing
- Cannot resize
- Pseudocode for creating, looking up, setting, etc
- Python-specific detail: no real arrays
- Slicing is not a primitive - we will not use it
:::

*Arrays* are one of the fundamental data structures in programming.
This is because they are natively supported by the computer,
and have good performance: reading or writing an element of the array
takes very little time. Many important algorithms use arrays.

::: note
*Note to Python programmers*: in Python, arrays are called *lists*,
and are written like this: `[1,2,3]`. There is one difference
between arrays and Python lists: in most programming languages, any
given array has a fixed size. However, Python lists can change in
size -- for example, the `append` method adds a new element to the
list, increasing its size. In this chapter, we will work with arrays
that have a fixed size. Python lists are so-called
[dynamic arrays](#dynamic-array-based-lists).
:::

In this chapter we will study two algorithmic problems and how to solve
them efficiently using arrays:

Searching
:   Given a list of items, check if a given item is present
    in the list. There are two kinds of search problems:

    *Membership testing*: The search algorithm is given an item to search for,
    and should return *true* or *false* depending on whether the item
    is found. For example, a spellchecker: given a list of all
    valid English words, search the list for a given string.

    *Lookup*: The items are typically objects, and each object has a field
    called the *key*. The search algorithm is given a key, and
    should return the item having that key (or a reference to
    the item, such as the position in the list). For example,
    a database: given a list of people, find the person having
    a given personal identity number.

Sorting
:   Given a list of items, put them in ascending order.
    Again, there are two kinds of sorting problems:

    *Natural sorting*: Here, the items have some kind of natural order.
    For example, sorting a list of words in alphabetical order.

    *Key-based sorting*: Here, each item has a *key*, and we want to
    sort the items so that the keys come in ascending order.
    For example, sorting a list of towns by population.

Note that if we search or sort according to a *key*, it doesn't have to
be explicitly stored in the object, but can instead be calculated on
demand. E.g., if we want to sort a list of words case-insensitively, we
can use a lower-case transformation when doing the comparisons. This is
usually done by a [comparator]{.term} (in Java), or by a
[key function](https://docs.python.org/3/howto/sorting.html#key-functions)
(in Python).

This chapter concentrates on *membership testing* and *natural sorting*,
but all the algorithms in this chapter work just as well for *lookup*
and *key-based sorting*.

### Referring to array slices (sub-arrays)

::: TODO
- don't use slicing = copying
- instead: use a range (start, end)
- discussion: should 'end' point to the last element or the one after
    - (how do we do in this book?)
:::

### Strings

::: TODO
- Constants, think of them as arrays of characters
- Concatenation takes time
- Cannot resize
:::
