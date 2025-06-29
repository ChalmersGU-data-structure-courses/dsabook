
## Motivation

::: TODO
- Prio 3: is this a good motivation section?
:::

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
"data structure" to mean an organization or structuring for a
collection of data items. A sorted list of integers stored in an array
is an example of such a structuring. These ideas are explored further in
section @sec:abstract-data-types about [abstract data types]{.term}.

Given sufficient space to store a collection of
[data item]{.term}s, it is always
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

