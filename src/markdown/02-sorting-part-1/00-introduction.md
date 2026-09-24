
# Searching and sorting {#sorting-1}

::: TODO
- Nothing?
:::

Searching and sorting are two extensively studied problems.
A sorting algorithm rearranges values in a collection, such as an array, from
least to greatest. We call such a collection *ordered*.
This is tremendously useful not just for the obvious things
that are visible to software users, such as sorting a table by given column,
but also as part of more complex algorithms. Because sorting is so useful,
sorting algorithms have been studied extensively, and are frequently used
as first examples of algorithms.

Search problems include a wide variety of queries on collections of values.
Unlike sorting, searching does not modify a data structure, but
determines some property of its content. The most fundamental search problem
is determining if a collection contain a specific value, but there are several
similar searching problems, here are a few examples:

- What is the first position of the collection in which a value occurs?
- What is the least or greatest value in the collection?
- How many odd values are in a collection of integers?

Each of these, and many more, are useful in different applications.
Different data structures allow for different algorithms.
Notably, if we are searching in an ordered array, the problem of
finding the least value is trivial: It is in position $0$ of the array.
As we shall soon see, ordered arrays also allow better performance
for finding a specific value.

In this chapter we introduce two algorithms for searching in arrays:
*Linear Search* and *Binary Search*, as well as two sorting algorithms
for arrays: *Selection Sort* and *Insertion sort*.
This also serves to demonstrate how we describe algorithms,
how we convince ourselves that an algorithm correctly solves a problem,
and how to compare the performance of different algorithms.
