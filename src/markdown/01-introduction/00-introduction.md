
# Introduction {#intro}

::: TODO
- Prio 2: update the 1st paragraph with 1-2 more diverse examples (not just querying a collection)
:::

How many cities with more than 100,000 people lie within 200 kilometres of Paris?
How many people in Swedish towns with less than 50,000 people earn less than 50% of the average income of people in Sweden?
How much CO~2~ can will be saved if I travel by train from Gothenburg to Berlin, compared to if I fly by plane?
How can I see if a text contains plagiarism, that is, if it copied some parts from another existing text?

Gathering the necessary information is not sufficient to answer questions like these,
the information must be organised to allow efficient access,
and then processed in an efficient manner.
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

::: TODO
- Prio 2: the following paragraph is a bit unfocused - can we make it more compact and to the point?
:::

Suppose you have an algorithm for finding someone in a list of names,
which is very fast when searching among 1000 names, such as someone's followers in social media.
Can you use the same algorithm to search among all 10 million people living in Sweden?
That problem is 10,000 times larger, is it still feasible to do it using your old laptop or do you need a supercomputer?
These questions can be answered by algorithm analysis,
and it is not certain that it takes 10,000 times longer to solve a 10,000 times larger problem --
it depends on the algorithm.
The specific example of searching in a list is discussed in more detail in @sec:sorting-1:binary-search.


::: TODO
- Prio 3: add a 4th example?
:::

#### Example: Searching using an index

A key idea behind a *search index* is to organise the same collection in different ways depending on how we want to search it.
Suppose we have a collection of songs by different artists, and we want to search either by artist or by song title.
If the collection is just a list, with new songs added at the end, both kinds of search will be slow.
Grouping songs by artist could make artist searches faster, but it would not help us search by title.
Instead, we can create two separate indexes: one in which all songs are ordered alphabetically by artist, and another in which they are ordered by title.
Then anyone who knows the alphabet can quickly find a song or an artist using a variant of the binary search algorithm (see @sec:sorting-1:binary-search).

#### Example: Travel by train

The railroad is expanding to the new cities!
Engineers want to build as little total rail length as possible, but still connect all cities.
After the railway is constructed, travellers wants to find the fastest way of getting from
city A to city B.

Both these problems can be modelled as graph problems, using a data structure where vertices (cities)
are connected by edges (potential railroad tracks or train departures).
Specifically, finding the smallest rail network is a *minimal spanning tree* problem (see @sec:graphs:MSTs)
and travel planning is a *shortest path* problem (see @sec:graphs:shortest-path).

#### Example: Simulating particles

Suppose we are modelling a system of particles that can collide with other particles or
with a physical boundary, causing a change of direction and speed, or perhaps
randomly splitting the particle in two.
For each particle we can calculate when its next collision will occur.

To simulate the progression of this system, we can use a *priority queue* data structure
(see @sec:ADTs:priority-queues) to store future collisions, and efficiently access them in
the order they occur.
When we calculate the outcome of a collision, we add new future collisions to the
priority queue.

This generalises into any system with timed events where there is a main loop that
repeatedly finds the next event and executes it, possibly spawning new future events.

