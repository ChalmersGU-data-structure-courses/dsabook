
## Linear search {#sorting-1:linear-search}

::: TODO
- Prio 1: We don't want the subsubsection
:::

One of the most fundamental tasks that we use computers for is *searching*.
We want to find an object that matches some criteria, in a collection of objects.
In fact, most of the data structures and algorithms that we will present in this book
have to do with searching in some way -- how to store data so that we can retrieve them easily,
and how to find the data we are interested in.

One way of storing a collection of objects is to put them in an array.
So, assuming that we have an array of objects, how can we find a certain object in this array?

#### Linear search

Suppose we are searching for a particular book in a bookshelf.
If the shelf is not in any particular order, our only option is to
look at each book and see if it is the one we are looking for.
This algorithm is called *linear search*, and is the most straightforward
way to search a collection.
Here is a simple implementation for an array, written in pseudocode:

    linearSearch(arr, key):
        for i in 0 .. arr.size - 1:     // For each element in the array:
            if arr[i] == key:           //     If we found the search key:
                return i                //         return this position
        return null                     // Otherwise, return null

Now imagine that the bookshelf is actually a whole library
(the British Library has more than 200 million catalogued items).
How long time will that take -- do I have to leave the computer running until tomorrow?

More interesting than the time it takes to search a particular bookshelf on a particular
computer, is the question of how the time scales when the bookshelf is expanded,
regardless of how fast the computer is. How does the search time change if we double
the size of the bookshelf? Particularly, we are interested in the *worst case* time.
A supremely lucky person may always find their book in the first slot they check
(in the `linearSearch` function that would correspond to `arr[0] == key` always being true).
The *worst case* is that we are searching for a book that is not in the shelf at all.

In the worst case, doubling the size of the bookshelf will double the search time.
Thus, in linear search there is (suitably) a linear relationship between the size
of the bookshelf and the search time. We say linear search is a *linear time* algorithm.
