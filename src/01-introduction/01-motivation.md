
## Motivation

[Short explanation of the why and what]

You might think that with ever more powerful computers, program
efficiency is becoming less important. After all, processor speed and
memory size still continue to improve. Won't today's efficiency
problem be solved by tomorrow's hardware?

> The short answer to this question is ***no***!

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
a discussion of [Abstract Data Types].

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

### Selecting a Data Structure

It should go without saying that people write programs to solve
problems. However, sometimes programmers forget this. So it is crucial
to keep this truism in mind when selecting a
[data structure]{.term} to solve a particular
[problem]{.term}. Only by first analyzing the
problem to determine the performance goals that must be achieved can
there be any hope of selecting the right data structure for the job.
Poor program designers ignore this analysis step and apply a data
structure that they are familiar with but which is inappropriate to the
problem. The result is typically a slow program. Conversely, there is no
sense in adopting a complex representation to "improve" a program that
can meet its performance goals when implemented using a simpler design.

When selecting a data structure to solve a problem, you should follow
these steps.

1.  Analyze your problem to determine the [basic operation]{.term}s
    that must be supported. Examples of basic operations include
    inserting a data item into the data structure, deleting a data item
    from the data structure, and finding a specified data item.
2.  Quantify the resource constraints for each operation.
3.  Select the data structure that best meets these requirements.

This three-step approach to selecting a data structure operationalizes a
data-centered view of the design process. The first concern is for the
data and the operations to be performed on them, the next concern is the
representation of those data, and the final concern is the
implementation of that representation.

Resource constraints on certain key operations, such as search,
inserting data records, and deleting data records, normally drive the
data structure selection process. Many issues relating to the relative
importance of these operations are addressed by the following three
questions, which you should ask yourself whenever you must choose a data
structure.

1.  Are all data items inserted into the data structure at the
    beginning, or are insertions interspersed with other operations?
    Static applications (where the data are loaded at the beginning and
    never change) typically get by with simpler data structures to get
    an efficient implementation, while dynamic applications often
    require something more complicated.
2.  Can data items be deleted? If so, this will probably make the
    implementation more complicated.
3.  Are all data items processed in some well-defined order, or is
    searching for specific data items allowed? "Random access" search
    generally requires more complex data structures.

Each data structure has associated costs and benefits. In practice, it
is hardly ever true that one data structure is better than another for
use in all situations. If one data structure or algorithm is superior to
another in all respects, the inferior one will usually have long been
forgotten. For nearly every data structure and algorithm presented in
this book, you will see examples of where it is the best choice. Some of
the examples might surprise you.

A data structure requires a certain amount of space for each data item
it stores, a certain amount of time to perform a single basic operation,
and a certain amount of programming effort. Each problem has constraints
on available space and time. Each solution to a problem makes use of the
basic operations in some relative proportion, and the data structure
selection process must account for this. Only after a careful analysis
of your problem's characteristics can you determine the best data
structure for the task.
