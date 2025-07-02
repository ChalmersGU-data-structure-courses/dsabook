
## Overview of algorithms

In the sections following we will introduce three basic sorting algorithms.
Here we will give very short descriptions of each of them, and later go through them in more detail.

For these short descriptions, assume that we want to sort $n$ books in a bookshelf.
It doesn't matter what we want to sort the books by -- it could be by author, or title, or perhaps height.
We only need to know how to compare two books, where we say that the "smaller" book should come before the "larger" in the final ordered bookshelf.

### Bubble sort overview

The first algorithm, *bubble sort*, is also the shortest to describe:

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
This gives the idea for the *selection sort* algorithm:

- Repeat until there are no more books on the floor:
    - Select the smallest book on the floor and put it to the right of the books that are already in the shelf.

This description suggests that selection sort is not an in-place algorithm, because we first move all the books to a new place, meaning that we have to have enough extra floor space for all the books.
But the algorithm can easily be made in-place, and we will describe that in a later section.

### Insertion sort overview

Finally, assume that we don't spread out all books on the floor, but instead put them in a single pile.
Now we can proceed like as *insertion sort*:

- Repeat until there are no more books in the pile:
    - Take the topmost book in the pile and insert it in the right position among the books that are on the bookshelf.

Just as for selection sort, this description suggests that it is not in-place, but there is a simple in-place version, which we will introduce later.

### Summary

So, what is the complexity of these three algorithms?
All of them has an outer loop that is repeated $n$ times, so how long time does their inner loops take?

- *Bubble sort*: one left-to-right pass iterates through the whole shelf, so it's linear $O(n)$.
- *Selection sort*: finding the smallest book in an unsorted collection is linear $O(n)$.
- *Insertion sort*: inserting one book in the correct position in a sorted list is linear $O(n)$.

Therefore, the total complexity of each of the algorithms is quadratic, $O(n^2)$.
