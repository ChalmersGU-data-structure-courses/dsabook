
## Motivation {#intro:motivation}

::: TODO
- Prio 3: update the 1st paragraph with more up-to-date examples
- Prio 3: is this a good motivation section?
:::

How many cities with more than 100,000 people lie within 200 kilometres of Paris, France?
How many people in Swedish towns with less than 50,000 people earn less than 50% of the average income of people in Sweden?
How much more CO~2~ will be emitted if I travel by plane from Gothenburg, Sweden, to Düsseldorf, Germany, compared to if I take the train?
How can I see if a text contains plagiarism, that is, if it copied some parts from another existing text?

Gathering the necessary information is not sufficient to answer questions like these,
the information must be organised to allow efficient access and analysis.
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
Which part of a piece of code is going to use all the processing power
(and is thus the only part worth optimising)?

Suppose you have an algorithm for finding someone in a list of names.
Let us say that it is very fast when searching among 1000 names, for example your social media friends.
Can you use the same algorithm to search among all 10 million people living in Sweden?
That problem is 10,000 times larger, is it still feasible to do it using your old laptop or do you need a supercomputer?
These questions can be answered by algorithm analysis,
and it is not certain that it takes 10,000 times longer to solve a 10,000 times larger problem --
it depends on the algorithm.
(The specific example of searching in a list is discussed in more detail in @sec:intro:searching.)


## Core concepts

The subjects in this book mostly fall into one of four categories:

Data structures
:   A data structure describes how we can *organise* our data so that it can be retrieved and updated efficiently.
    We explain the fundamental ideas of various data structures, and present the most common implementations.
    Examples of data structures are *arrays* and *linked lists*.

Abstract data types
:   An abstract data type (ADT) describes the *capabilities* of a data structure.
    In other words, what operations can we use on a given data structure?
    Are there different data structures that have the same capabilities?
    We use ADTs to categorise the different use cases. Examples of ADTs that
    you may be familiar with are *lists*, *sets* and *maps*.
    Slightly simplified using programming terms: An ADT is an interface, and
    a data structure is the full implementation with all the technical details.


Algorithms
:   An algorithm describes how to implement the tasks that we want to perform on data structures,
    such as querying, iterating or updating them.
    We explain the underlying ideas and how they can be utilised in implementations that operate on data structures.

Analysis
:   The main purpose of analysing data structures and algorithms is to know how *effective* they are.
    We focus on theoretical algorithm analysis, and in particular *asymptotic complexity analysis*,
    where we mathematically can derive how an algorithm behaves when the size of the data grows.

We also show how to describe algorithms and data structures to others,
using well-established technical terms and structure,
such as pseudo-code and memory diagrams.
We abstract away from technical details of a particular programming language,
and focus on explaining the underlying ideas of a data structure or algorithm.
We aim to provide you, the reader, with the means to code a good implementation in
your favourite programming language.


<!--
### The need for efficient data structures and algorithms



A *data structure* is any kind of representation of some data, together with associated operations.
This can mean almost anything, and even a simple integer or a string is a data structure.
But in general we usually mean a way of organising a *collection* of data items,
possibly related to each other in different ways.
Using the right data structure becomes important when we have many many elements to store,
such as all 10 million poeple living in Sweden, or all railways in Europe and how they connect with each other.
An array of strings is one simple example, and in this book we will
introduce many data structures, such as *linked lists*, *heaps*, *search trees*, *hash tables*, and *graphs*.
They all come with different characteristics, advantages and disadvantages,
and one important takeaway is learning when and how to use each one of them.

Many data structures can be used for different purposes,
and for many purposes there are several different data structures that can be used.
We use *abstract data types* to categorise these different purposes,
for example by describing which data structures that can be used as
*stacks*, *queues*, *priority queues*, *sets*, and *maps*.

With the help of asymptotic complexity analysis, we can compare data structures and algorithms.
For example, complexity analysis tells us that searching in a sorted array is much more efficient
than searching in an unsorted array.
But this comes with a cost, because we have to keep the array sorted,
and it can take quite some time to do this if we want to add or remove elements often.
In this case it can be more efficient to use another data structure, such as a search tree or a hash table.
-->

<!--
You might think that with ever more powerful computers, program
efficiency is becoming less important. After all, processor speed and
memory size still continue to improve. Won't today's efficiency
problem be solved by tomorrow's hardware?

The short answer to this question is ***no***!
It is not at all certain that a twice as fast computer can solve
twice as large problems. On the contrary -- most interesting problems
are very difficult, in the sense that if we increase the computing power
we can still only solve a very small increase in the size of the problem.

As we develop more powerful computers, our history so far has always
been to use that additional computing power to tackle more complex
problems, be it in the form of more sophisticated user interfaces,
bigger problem sizes, or new problems previously deemed computationally
infeasible. More complex problems demand more computation, making the
need for efficient programs even greater. Unfortunately, as tasks become
more complex, they become less like our everyday experience. So today's
computer scientists must be trained to have a thorough understanding of
the principles behind efficient program design, because their ordinary
life experiences often do not apply when designing computer programs.

In the most general sense, a [data structure]{.term} is any
data representation and its associated operations.
Even an integer or floating point number stored on the computer can be
viewed as a simple data structure. More commonly, people use the term
"data structure" to mean an organisation or structuring for a
collection of data items. A sorted list of integers stored in an array
is an example of such a structuring. These ideas are explored further in
@sec:intro:abstract-data-types about [abstract data types]{.term}.

Given sufficient space to store a collection of
[data items]{.term}, it is always
possible to search for specified items within the collection, print or
otherwise process the data items in any desired order, or modify the
value of any particular data item. The most obvious example is an
unsorted array containing all of the data items. It is possible to
perform all necessary operations on an unsorted array. However, using
the proper data structure can make the difference between a program
running in a few seconds and one requiring many days. For example,
searching for a given record in a [hash table]{.term}
is much faster than searching for it in an unsorted array.

A solution is said to be [efficient]{.term} if
it solves the problem within the required
[resource constraints]{.term}. Examples of
resource constraints include the total space available to store the data
-- possibly divided into separate main memory and disk space constraints
-- and the time allowed to perform each subtask. A solution is sometimes
said to be efficient if it requires fewer resources than known
alternatives, regardless of whether it meets any particular
requirements. The [cost]{.term} of a solution is
the amount of resources that the solution consumes. Most often, cost is
measured in terms of one key resource such as time, with the implied
assumption that the solution meets the other resource constraints.
-->
