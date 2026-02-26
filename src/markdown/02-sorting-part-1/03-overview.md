
## Overview of algorithms

<!-- START NOTES -->

Imagine that we want to sort books in a bookshelf -- what different strategies can we use to do that?

First, let's imagine that the books are not in the shelf yet -- they are in an unordered pile on the floor. Now there are two main strategies you can use -- just repeat the following until there are no more books on the floor.

Selection sort
:   Find the smallest book on the floor, and put it directly to the right of the sorted books in the shelf.

Insertion sort
:   Take any book from the floor, and insert it in its correct position among the sorted books in the shelf.

It's easy to see that the two algorithms spend most of their time in different places:
Selection sort has to find the smallest book, which can take quite some time, but it's almost instant to place it in the open space in the shelf. On the other hand, Insertion sort doesn't care about which book it takes, but then it has to find the correct position to put it, and also move some books to give space for the new book.

*Warning*: As already noted for binary search, there is a risk with analogies. For example, if you spread out the books on the floor it can be quick to find the smallest one (especially if you want to sort by actual physical size). But that's cheating -- the computer cannot see many books at once. A better analogy is that all books have an anonymous cover and you want to sort by author name. Then you really have to open each book to read the name, and then you can get an idea of the work the computer has to do. There's a similar problem with Insertion sort: in a normal bookshelf you can "slide" many books at once to give room for a new. But that's not how a computer does it -- it has to move one book at the time. To get a feeling for this, you can imagine that every book is really large and heavy, so that you can only move one at the time.

How long time do these algorithms take, if we have $n$ books?

- Selection sort: in each iteration we have to find the smallest book on the floor
- Insertion sort: in each iteration we have to find the correct position where to insert the book (and make room for it)
- In the worst case we have to look at $\approx n$ books, in each iteration
- And we have to do this for all $n$ books, so we get $\approx n^2$ steps
- So, both algorithms are quadratic, which we write as $O(n^2)$

One problem with both algorithms are that they use a lot of extra space -- the floor. For a computer this means that the input is one array (the floor), and the output is another (the bookshelf). Sometimes this is exactly what we want -- if we don't want to change the original array, but make a sorted copy. But in most cases we want the algorithm to be *in-place*, meaning that we want to modify the original array. Or, for our bookshelf: the books are already in the shelf, unsorted, and we want to rearrange them. (And we cannot use the floor because it's full of... other books?).

We can easily modify Selection and Insertion sort to be in-place. Let's introduce a *marker* that we put between two books -- the meaning is that the books to the left of the marker are already sorted. When we start no books are sorted yet, so we put the marker to the left of the first book. Then repeat the following until there are no more unsorted books (meaning that the marker has moved all the way to the right).

Selection sort
:   Find the smallest unsorted book, and put it at the end of the sorted books.
:   You don't need to "slide" the books to make space for the new one -- instead you can simply swap the smallest unsorted book with the book just to the right of the marker (and then move the marker).

Insertion sort
:   Take the first unsorted book, and insert it in the correct position among the sorted books.
:   You don't have to first find the position and then "slide" the books. Instead you can remove the unsorted book (holding it in your hand), and compare it with each of the sorted books from the right. If it is smaller, you slide the shelved book and look at the next. Otherwise you found the right spot for your book.

Often the array consists of complex objects and not just simple numbers. For example, if the objects are books they probably contain quite a lot of information, and we might want to sort by title, or author family name, or year of publication, or ISBN number, or number of pages. Then we need to use different *comparators*, or comparison functions, when sorting.

<!-- END NOTES -->

----------

In the sections following we will introduce three basic sorting algorithms.
Here we will give very short descriptions of each of them, and later go through them in more detail.

For these short descriptions, assume that we want to sort $n$ books in a bookshelf.
It doesn't matter what we want to sort the books by -- it could be by author, or title, or perhaps height.
We only need to know how to compare two books, where we say that the "smaller" book should come before the "larger" in the final ordered bookshelf.

### Bubble sort overview

The first algorithm, *Bubble sort*, is also the shortest to describe:

- As long as there are two adjacent books out of order, swap them.

Note that this description is too unspecified to be a real algorithm --
in particular, we have to know in which order we should look at adjacent books.
This can be done in many different ways, but the commonest implementation is to go from left to right and compare each pair of adjacent books.
After the first iteration we have moved the largest book to the far end of the bookshelf.
The next iteration will move the second largest book to its right location (next to the largest book), and so on.
Repeat this left-to-right pass until the list is sorted.
It's perhaps not obvious, but in fact we only have to do this at most $n$ times.

### Selection sort overview

Now, assume that we instead empty the bookshelf and put all the books on the floor, so that we can have a good overview of them.
This gives the idea for the *Selection sort* algorithm:

- Repeat until there are no more books on the floor:
    - Select the smallest book on the floor and put it to the right of the books that are already in the shelf.

This description suggests that Selection sort is not an in-place algorithm, because we first move all the books to a new place, meaning that we have to have enough extra floor space for all the books.
But the algorithm can easily be made in-place, and we will describe that in a later section.

### Insertion sort overview

Finally, assume that we don't spread out all books on the floor, but instead put them in a single pile.
Now we can proceed like as *Insertion sort*:

- Repeat until there are no more books in the pile:
    - Take the topmost book in the pile and insert it in the right position among the books that are on the bookshelf.

Just as for Selection sort, this description suggests that it is not in-place, but there is a simple in-place version, which we will introduce later.


<!--
### Summary

So, what is the complexity of these three algorithms?
All of them has an outer loop that is repeated $n$ times, so how long time does their inner loops take?

- *Bubble sort*: one left-to-right pass iterates through the whole shelf, so it's linear $O(n)$.
- *Selection sort*: finding the smallest book in an unsorted collection is linear $O(n)$.
- *Insertion sort*: inserting one book in the correct position in a sorted list is linear $O(n)$.

Therefore, the total complexity of each of the algorithms is quadratic, $O(n^2)$.
-->
