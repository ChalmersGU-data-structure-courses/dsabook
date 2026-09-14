
# Introduction {#intro}

::: TODO
- Prio 1: Extend this introduction just a little
- Prio 1: "How to read this book", starred sections are online, etc
- Prio 1: Update the motovation - it is not a numbered subsection anymore
- Prio 2: Add short reflections for all our data structures and algorithms, for example, who invented it, when, and why
:::

:::::: latex
\booklink{Preliminaries}{13.1}
::::::

This book assumes that you are already familiar with mathematics and programming, corresponding to a semester of university studies.
The online appendices present what we assume that you already know about mathematics and programming.
They serve as a review and reference, allowing you to revisit relevant sections in later chapters.

:::::: online
- Mathematical preliminaries: @sec:appendix:math-preliminaries
- Programming preliminaries: @sec:appendix:programming-preliminaries
::::::


#### Motivation

::: TODO
- Prio 3: update the 1st paragraph with more up-to-date examples
- Prio 3: is this a good motivation section?
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

A university course on data structures and algorithms is essential to anyone
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

Suppose you have an algorithm for finding someone in a list of names.
Let us say that it is very fast when searching among 1000 names, for example your social media friends.
Can you use the same algorithm to search among all 10 million people living in Sweden?
That problem is 10,000 times larger, is it still feasible to do it using your old laptop or do you need a supercomputer?
These questions can be answered by algorithm analysis,
and it is not certain that it takes 10,000 times longer to solve a 10,000 times larger problem --
it depends on the algorithm.
(The specific example of searching in a list is discussed in more detail in @sec:intro:searching.)

