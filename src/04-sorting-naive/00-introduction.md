
# Sorting, part 1: Naive Algorithms

We have seen that, when an array is sorted in ascending order, *binary
search* can be used to find items in it efficiently. But what about when
we have a collection of data that is not in any order? If we will often
need to search for items in the data, it makes sense to *sort the data*
first. In this chapter we will study algorithms for sorting arrays in
ascending order.

We sort many things in our everyday lives: A handful of cards when
playing Bridge; bills and other piles of paper; jars of spices; and so
on. And we have many intuitive strategies that we can use to do the
sorting, depending on how many objects we have to sort and how hard they
are to move around. Sorting is also one of the most frequently performed
computing tasks. We might sort the records in a database so that we can
search the collection efficiently. We might sort customer records by zip
code so that when we print an advertisement we can then mail them more
cheaply. We might use sorting to help an algorithm to solve some other
problem. For example, [Kruskal's algorithm]{.term} to find
[minimal-cost spanning trees]{.term}
must sort the edges of a graph by their lengths before it
can process them.

Because sorting is so important, naturally it has been studied
intensively and many algorithms have been devised. Some of these
algorithms are straightforward adaptations of schemes we use in everyday
life. For example, a natural way to sort your cards in a bridge hand is
to go from left to right, and place each card in turn in its correct
position relative to the other cards that you have already sorted. This
is the idea behind [Insertion Sort]{.term}.
Other sorting algorithms are totally alien to how humans do
things, having been invented to sort thousands or even millions of
records stored on the computer. For example, no normal person would use
[Quicksort]{.term} to order a pile of bills by date,
even though Quicksort is one of the standard
sorting algorithms of choice for most software libraries. After years of
study, there are still unsolved problems related to sorting. New
algorithms are still being developed and refined for special-purpose
applications.

Along with introducing this central problem in computer science,
studying sorting algorithms helps us to understand issues in algorithm
design and analysis. For example, the sorting algorithms in this chapter
show multiple approaches to using [divide and conquer]{.term}.
In particular, there are multiple ways to do the dividing.
[Mergesort]{.term} divides a list in half.
[Quicksort]{.term} divides a list into big values and small values.
[Radix Sort]{.term} divides the problem by working on one digit of the key at a time.

Sorting algorithms can also illustrate a wide variety of algorithm
analysis techniques. Quicksort illustrates that it is possible for an
algorithm to have an [average case]{.term} whose
growth rate is significantly smaller than its
[worst case]{.term}. It is possible to speed up
one sorting algorithm (such as [Shellsort]{.term} or [Quicksort]{.term})
by taking advantage of the [best case]{.term} behavior of another algorithm (Insertion Sort).
Special case behavior by some sorting algorithms makes them a good solution for
special niche applications ([Heapsort]{.term}).
Sorting provides an example of an important technique for analyzing the
lower bound for a problem.

This chapter covers several standard algorithms appropriate for sorting
a collection of records that fit into the computer's main memory. It
begins with a discussion of three simple, but relatively slow,
algorithms that require [quadratic](#quadratic-growth-rate){.term}
time in the size of the array.
Three algorithms with considerably better
performance are then presented, some with
[linearithmic](#linearithmic-growth-rate){.term} worst-case running time.
The chapter concludes with a proof that you cannot implement a generic sorting
algorithm with better worst-case behaviour than
[linearithmic](#linearithmic-growth-rate){.term} time.

