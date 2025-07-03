
# Sorting, part 1: Simple algorithms {#sorting-simple latex="Sorting, part 1: \mbox{Simple algorithms}"}

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
[minimum spanning trees]{.term}
must sort the edges of a graph by their lengths before it
can process them.

Because sorting is so important, naturally it has been studied
intensively and many algorithms have been devised. Some of these
algorithms are straightforward adaptations of schemes we use in everyday
life. For example, a natural way to sort your cards in a bridge hand is
to go from left to right, and place each card in turn in its correct
position relative to the other cards that you have already sorted. This
is the idea behind [Insertion sort]{.term}.
Other sorting algorithms are totally alien to how humans do
things, having been invented to sort thousands or even millions of
records stored on the computer. For example, no normal person would use
[Quicksort]{.term} to order a pile of bills by date,
even though Quicksort is one of the standard
sorting algorithms of choice for most software libraries. After years of
study, there are still unsolved problems related to sorting. New
algorithms are still being developed and refined for special-purpose
applications.

::: dsvis
#### The sorting problem

<inlineav id="SortNotationS1CON" src="Sorting/SortNotationS1CON.js" name="Sorting Terminology and Notation Slideshow 1" links="Sorting/SortNotationS1CON.css"/>
:::

Sorting can be divided into two kinds depending on how we compare the items in the list:

Natural sorting
:   The items have some kind of natural order.
    For example, sorting a list of words in alphabetical order, or sorting a list of numbers.

Key-based sorting
:   Here, each item has a *key*, and we want to sort the items so that the keys come in order.
    For example, sorting a list of towns by population, or sorting a list of persons by their age.

Note that if we sort according to a *key*, it doesn't have to be explicitly stored in the object, but can instead be calculated on demand.
E.g., if we want to sort a list of words case-insensitively, we can use a lower-case transformation when doing the comparisons.
This is usually done by a [comparator]{.term} (in Java), or by a [key function](https://docs.python.org/3/howto/sorting.html#key-functions) (in Python).

The following two chapters cover several standard algorithms appropriate for sorting a collection of records.
In these chapters we concentrate on *natural sorting*, but all the algorithms work just as well for *key-based sorting* -- and we trust that you are a mature enough programmer to be able to infer how to do this.
The first chapter discusses three simple, but relatively slow, algorithms that require [quadratic](#quadratic-growth-rate){.term} time in the size of the array.
The following chapter then presents two algorithms with considerably better performance, with [linearithmic](#linearithmic-growth-rate){.term} worst-case or average-case running time.
