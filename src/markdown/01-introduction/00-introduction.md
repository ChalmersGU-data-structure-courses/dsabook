
# Introduction {#intro}

How can a navigation app find the fastest route through a road network with millions of intersections, in less than a second?
How does a word processor know, while you are still typing, that "algorithmn" is not a word?
How can we see if a text contains plagiarism, that is, if it contains sections copied from another existing text?
How can a file be compressed to half its size without losing a single bit of information?

None of these questions are hard because we lack data: the road network, the dictionary and the texts are all available.
They are hard because the obvious solutions are far too slow: trying every possible route or comparing every pair of sentences would take years.
The answer lies in how we organise the data, and how we process it.
To organise our data we use different *data structures*,
and to update or analyse our data we use *algorithms* on these data structures.
The subjects of data structures and algorithms are deeply intertwined:
Efficient data structures are used when designing and implementing algorithms,
and algorithms are used to design efficient data structures.

Data structures and algorithms are essential to anyone
who intends to do any substantial programming in their line of work.
Often, choosing the right data structure for a task is half the battle
of solving it, and conversely using the wrong data structure is an easy way
to end up with an inefficient or error-prone mess.
Hopefully, by the time you have read this book you can look back at your earlier
solutions to programming exercises and realise how much you can improve them
by using a set instead of a list, or a priority queue instead of a sorted array.

Apart from using the right data structure for the job, analysing an algorithm is
another essential skill. If two algorithms solve the same problem, which one is better?
Will the performance of your program scale to thousands of users?
Which parts of a piece of code are going to use all the processing power
(and are thus the parts that we should try to optimise first)?

Suppose you have an algorithm that sorts the 1000 followers someone has on social media in a millisecond.
Can you use the same algorithm to sort the 10 million people living in Sweden?
The problem is 10,000 times larger, but that does not mean it takes 10,000 times longer -- it depends on the algorithm.
With a simple algorithm such as Insertion sort, it takes about 100 million times longer: more than a day.
With a smarter algorithm such as Mergesort, it takes about 20 seconds.
This is the kind of question that can be answered by *algorithm analysis*.

::: {.example #ex:organising-music-library}
#### Example: Organising your music library

A key idea behind a *search index* is to organise the same collection in different ways depending on how we want to search it.
Suppose you want to organise your music library so that you can search it by artist or by song title,
and you want to be able to add and remove music from the library.
If you store the songs in a list, both searching and modifiyng the library will be slow.
Instead, you can create two separate indexes grouped by artist and by title.
If you implement the search indexes as *search trees* (see [Chapter @sec:search-trees])
or *hash tables* (see [Chapter @sec:hash-tables])
you can both search, add and remove songs efficiently.
:::

\vspace{-1ex}

::: {.example #ex:travel-by-train}
#### Example: Travel by train

The railroad is expanding to the new cities!
Engineers want to use as little material as possible when building the railroad, but still connect all cities.
After the railway is constructed, travellers want to find the fastest way of getting from
city A to city B.
Both these problems can be modelled as graph problems (see [Chapter @sec:graphs]), using a data structure where vertices (cities)
are connected by edges (potential railroad tracks or train departures).
Specifically, finding the smallest rail network is a *minimum spanning tree* problem (see @sec:graphs:MSTs)
and travel planning is a *shortest path* problem (see @sec:graphs:shortest-path).
:::

\vspace{-1ex}

::: {.example #ex:simulating-particles}
#### Example: Simulating particles

Suppose we are modelling a system of particles that can collide with other particles or
with a physical boundary, causing a change of direction and speed, or perhaps
randomly splitting the particle in two.
For each particle we can calculate when its next collision will occur.
To simulate the progression of this system, we can use a *priority queue* (see [Chapter @sec:heaps])
to store future collisions, and efficiently access them in the order they occur.
When we calculate the outcome of a collision, we add new future collisions to the
priority queue.
This generalises into any system with timed events where there is a main loop that
repeatedly finds the next event and executes it, possibly spawning new future events.
:::
