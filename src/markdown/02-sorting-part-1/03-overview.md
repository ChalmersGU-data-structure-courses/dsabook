
## Overview of algorithms

Imagine that we want to sort books in a bookshelf, what different strategies can we use to do that?
Note that it doesn't matter what we want to sort the books by
-- it could be by author, or title, or perhaps height.
We only need to know how to compare two books,
where we say that the "smaller" book should come before the "larger" in the final ordered bookshelf.

First, let us imagine that the books are not in the shelf yet
-- they are in an unordered pile on the floor.
Now there are two main strategies you can use, where you just
repeat the following until there are no more books on the floor.

Selection sort
:   Find the smallest book on the floor, and put it next to the sorted books in the shelf.

Insertion sort
:   Take any book from the floor, and insert it in its correct position in the shelf.

It is easy to see that the two algorithms spend most of their time in different places:
Selection sort has to find the smallest book, which can take quite some time,
but there is no additional work to place next to the other books in the shelf.
On the other hand, Insertion sort takes a book blindly which involves no extra work,
but instead it has to find the correct position to put it,
and it also has to move some books to give space for the new book.

*Warning*: There is a risk with analogies like this.
For example, if you spread out the books on the floor it can be quick to find the smallest one
(especially if you want to sort by actual physical size).
But this is cheating -- the computer cannot see many books at once.
A better analogy is that all books have an anonymous cover and you want to sort by author name.
Then you really have to open each book to read the name,
and then you can get an idea of the work the computer has to do.
There is a similar problem with Insertion sort:
in a normal bookshelf you can "slide" many books at once to give room for a new.
But that is not how a computer does it -- it has to move one book at the time.
To get a feeling for this, you can imagine that every book is really large and heavy,
so that you can only move one at the time.

How long time do these algorithms take, if we have $n$ books?

- *Selection sort*: in each iteration we have to find the smallest book on the floor
- *Insertion sort*: in each iteration we have to find the correct position where to insert the book (and make room for it)
- In the worst case we have to look at $\approx n$ books, in each iteration
- And we have to do this for all $n$ books, so we get $\approx n^2$ steps
- Therefore we can say that both algorithms are *quadratic* in the number of books


### In-place sorting

One problem with both algorithms are that they use a lot of extra space -- the floor.
For a computer this means that the input is one array (the floor), and the output is another (the bookshelf).
Sometimes this is exactly what we want -- if we don't want to change the original array, but make a sorted copy.
But in most cases we want the algorithm to be *in-place*, meaning that we want to modify the original array.
Translating this to our bookshelf analogy:
the books are already in the shelf, unsorted, and we want to rearrange them without using the floor or another bookshelf.
We start with a very simple in-place sorting algorithm:

Bubble sort
:   As long as there are two adjacent books out of order, swap them.
:   Note that this description is too unspecified to be a real algorithm --
    in particular, we have to know in which order we should look at adjacent books.

What about Selection sort and Insertion sort -- can we make them in-place?
Yes, if we introduce a *marker* that we put between two books.
The meaning is that the books to the left of the marker are already sorted, while the ones to the right are still unsorted.
When we start no books are sorted, so we put the marker to the left of the first book.
Then we just repeat the following until there are no more unsorted books (meaning that the marker has moved all the way to the right).

Selection sort
:   Find the smallest unsorted book, and put it at the end of the sorted books.
:   Note that you do not need to "slide" the books to make space for the new one
    -- instead you can simply swap the smallest unsorted book with the book just to the right of the marker, and then move the marker.

Insertion sort
:   Take the first unsorted book, and insert it in the correct position among the sorted books.
:   Note that you do not have to first find the position and then "slide" the books.
    Instead you can remove the unsorted book (holding it in your hand), and compare it with each of the sorted books from the right.
    If it is smaller, you slide the shelved book one step right and look at the one to the left.
    Otherwise you have found the right spot for your book, and can put it in the empty space.

