
# Searching and sorting {#sorting-1}

::: TODO
- Prio 1: rewrite (and shorten)
- Prio 1: merge the (commented) discussion on "natural" / "key-based" to next section (comparing values)
- Prio 1: merge "Comparing algorithms" into 1.1?
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


<!-- OPENDSA: START -->
<!--
We have seen that, when an array is sorted in increasing order, *binary
search* can be used to find items in it efficiently. But what about when
we have a collection of data that is not in any order? If we will often
need to search for items in the data, it makes sense to *sort the data*
first. In this chapter we will study algorithms for sorting arrays.

We sort many things in our everyday lives: A hand of playing cards;
bills and other piles of paper; jars of spices; and so
on. And we have many intuitive strategies that we can use to do the
sorting, depending on how many objects we have to sort and how hard they
are to move around. Sorting is also one of the most frequently performed
computing tasks. We might sort the records in a database so that we can
search the collection efficiently.
We might use sorting to help an algorithm to solve some other problem.
For example, [Kruskal's algorithm]{.term} is described in @sec:graphs:kruskals-algorithm.
It builds [minimum spanning trees]{.term} and
must sort the edges of a graph by their lengths before it can process them.

Because sorting is so important, naturally it has been studied
intensively and many algorithms have been devised. Some of these
algorithms are straightforward adaptations of schemes we use in everyday
life. For example, a natural way to sort a hand of playing cards is
to go from left to right, and place each card in turn in its correct
position relative to the other cards that you have already sorted. This
is the idea behind [Insertion sort]{.term}.
Other sorting algorithms are totally alien to how humans do
things, having been invented to sort thousands or even millions of
records stored on the computer. For example, no normal person would use
[Quicksort]{.term} to order a pile of bills by date,
even though Quicksort is one of the standard
sorting algorithms of choice for most software libraries. After decades of
study, there are still unsolved problems related to sorting. New
algorithms are still being developed and refined for special-purpose
applications.
-->
<!-- OPENDSA: END -->

<!--
::: dsvis
#### The sorting problem

``` {.jsav-animation src="Sorting/SortNotationS1CON.js" links="Sorting/SortNotationS1CON.css" name="Sorting Terminology and Notation Slideshow 1"}
```
:::
-->

<!-- NICSMA: START -->
<!--
Sorting can be divided into two kinds depending on how we compare the items in the list:

Natural sorting
:   The items have some kind of natural order.
    For example, sorting a list of words in alphabetical order, or sorting a list of numbers.

Key-based sorting
:   Here, each item has a *key*, and we want to sort the items so that the keys come in order.
    For example, sorting a list of towns by population, or sorting a list of persons by their age.

Note that if we sort according to a *key*, it doesn't have to be explicitly stored in the object, but can instead be calculated on demand.
For example, if we want to sort a list of words case-insensitively, we can use a lower-case transformation when doing the comparisons.
-->
<!-- NICSMA: END -->
<!--
This is usually done by a [comparator]{.term} (in Java), or by a [key function]{.term} (in Python).

The following chapters cover several standard algorithms appropriate for sorting a collection of records.
In these chapters we concentrate on *natural sorting*, but all the algorithms work just as well for *key-based sorting* -- and we trust that you are a mature enough programmer to be able to infer how to do this.
This chapter discusses three simple algorithms that work well on small arrays, and
[Chapter @sec:sorting-2] presents two algorithms with considerably better performance on large arrays.


#### Terminology and notation

Formally, the *sorting problem* is to arrange a list of elements $a_1,a_2,\ldots,a_n$ into any order $s$
such that $a_{s_1}\leq a_{s_2}\leq\cdots\leq a_{s_n}$.
In other words, the sorting problem is to arrange a set of elements so that they are in non-decreasing order.
-->
<!-- Note that the definition above is for *natural sorting*.
If we instead are interested in the more general problem of *key-based sorting*, the definition becomes slightly more complicated:
The (key-based) *sorting problem* is to arrange the list into any order $s$ such that $a_{s_1},a_{s_2},\ldots,a_{s_n}$ have keys obeying the property $k_{s_1}\leq k_{s_2}\leq\cdots\leq k_{s_n}$. -->

<!-- OPENDSA: START -->
<!--

#### Comparing algorithms

When comparing two sorting algorithms, the simplest approach would be to
implement both and measure their running times.
This is an example of *empirical comparison*.
However, doing fair empirical comparisons can be tricky
because the running time for many sorting algorithms depends on
specifics of the input values. The number of records, the size of the
keys and the records, the allowable range of the key values, and the
amount by which the input records are "out of order" can all greatly
affect the relative running times for sorting algorithms.

When analysing sorting algorithms, it is traditional to measure the cost
by *counting the number of comparisons* made between keys. This measure is
usually closely related to the actual running time for the algorithm and
has the advantage of being machine and data-type independent. However,
in some cases records might be so large that their physical movement
might take a significant fraction of the total running time.
If so, it might be appropriate to measure the cost by counting
*the number of swap operations* performed by the algorithm.

In most applications we can
assume that all records and keys are of fixed length, and that a single
comparison or a single swap operation requires a constant amount of time
regardless of which keys are involved. However, some special situations
"change the rules" for comparing sorting algorithms. For example, an
application with records or keys having widely varying length (such as
sorting a sequence of variable length strings) cannot expect all
comparisons to cost roughly the same. Not only do such situations
require special measures for analysis, they also will usually benefit
from special-purpose sorting techniques.

When analysing sorting algorithms we are most of the time interested in
how they perform on very large arrays.
But we can also have applications that

require that a small number of records be sorted, but that the sort be performed frequently.
An example would be an application that repeatedly sorts groups of five numbers.

In such cases, the asymptotic analysis that we do for large arrays is usually of not much help.
Instead it will be important to reduce the constant factors that are ignored by the analysis.
Then we might very well find that the best algorithm can be one that performs very poorly on large arrays.

Finally, some situations require that a sorting algorithm use as little
memory as possible. We will call attention to sorting algorithms that
require significant extra memory beyond the input array.
<!-- OPENDSA: END -->
