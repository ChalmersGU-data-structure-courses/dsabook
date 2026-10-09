
## Overview of sorting algorithms {#sorting-1:overview}

::: TODO
- Prio 1: remove the performance part?
- Prio 2: suitable forward references to subsequent sections
:::

Imagine that we want to sort books in a bookshelf, what different strategies can we use to do that?
Note that it doesn't matter what we want to sort the books by
-- it could be by author, or title, or perhaps height.
We only need a way to compare two books,
where we say that the "smaller" book should come before the "larger" in the final ordered bookshelf.

First, let us imagine that the books are not in the shelf yet
-- they are in an unordered pile on the floor.
Now there are two simple strategies you can use, where you just
repeat the following until there are no more books on the floor:

Selection sort
:   Select the smallest book on the floor, and put it next to the sorted books in the shelf.

Insertion sort
:   Take any book from the floor, and insert it in its correct position among the books already in the shelf.

It is easy to see that the two strategies spend most of their time in different places:
Selection sort has to find the smallest book, which can take quite some time,
but there is no additional work to place next to the other books in the shelf.
On the other hand, Insertion sort takes a book blindly which involves no extra work,
but instead it has to find the correct position to put it,
and it also has to move some books to make space for the new book.

This analogy is a good first step towards our first two sorting algorithms,
but there is still plenty of work to be done.
Consider what data structures are involved: The bookshelf is actually an array,
but what is the floor? In practice, both algorithms are *in-place* --
rather than move or copy elements from one data structure into an empty array,
they swap elements around inside an existing array.

A bookshelf is not a perfect analogy for an array, for several reasons:

 - In a bookshelf you could slide a whole section of books around at once,
   there is no operation like that in computer memory -- the books (array elements)
   have to be moved one at a time.
 - A computer cannot actually move an array element in the sense of moving a book.
   The closest they can get is copying the element and then erasing the original.
   The analogy breaks down further when we consider references: Apart from containing
   multiple identical books, our bookshelf can contain (references to) the exact
   same book more than once!
 - An array has *random access*. For a computer, finding the third book from the left
   is just as easy as finding the millionth book from the left.
   One way to consider this is that the books are all the same thickness, so we can
   use a measuring tape to find specific positions.

### In-place sorting {#sorting-1:in-place-sorting}

One problem with both our strategies is that they use a lot of extra space -- the floor.
For a computer this means that the input is one array (the floor), and the output is another (the bookshelf).
Sometimes this is exactly what we want -- if we don't want to change the original array,
but make an ordered copy.
But in most cases we want the algorithm to be *in-place*, meaning that we shuffle elements
around in the original array.

In-place
:   A sorting algorithm is *in-place* if it modifies the input array directly and does not build a
    new array for the sorted result.

Usually one also requires that the algorithm does not allocate too much extra space while operating,
where "not too much" can mean at most logarithmic extra memory in the size of the array.
One sorting algorithm which is *not* in-place is Mergesort (see @sec:sorting-2:mergesort), while most other algorithms are.

Translating this to our bookshelf analogy: the books are already in the shelf, unsorted, and we want to rearrange them without using the floor or another bookshelf.
A fundamental operation on arrays is swapping the positions of two elements:

    swap(arr : array, i : int, j : int):
        temp = arr[i]
        arr[i] = arr[j]
        arr[j] = temp

Because arrays have random access, swapping two elements in an array with a million elements
does not take more time than in an array of ten elements. Swap is a *constant time*
operation.

The key to making Selection sort and Insertion sort in-place, is deciding that the initial
part of the array is sorted, and the rest is not. Instead of moving a book from the floor
to the bookshelf, each step involves swapping books around to move one book from the
unsorted area into the sorted area. When all books are in the sorted area, the array is sorted.

### Performance analysis

Before we look at more detailed descriptions of the algorithms, it is hard to accurately
estimate the performance of Insertion sort and Selection sort, but we can already make
some observations. Both algorithms work in multiple iterations, each processing a single
book:

- *Selection sort*: in each iteration we have to find the smallest remaining book.
- *Insertion sort*: in each iteration we have to find the correct position of a book (and make room for it by moving other books).
- In the worst case we have to look at or move $\approx n$ books, in each iteration.
- There are $n$ iterations, so we get $\approx n^2$ steps.

We say that both algorithms are *quadratic time* in the number of books.


<!--
::: dsvis
#### The sorting problem

``` {.jsav-animation src="Sorting/SortNotationS1CON.js" links="Sorting/SortNotationS1CON.css" name="Sorting Terminology and Notation Slideshow 1"}
```
:::
-->
