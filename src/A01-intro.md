
# Introduction

How many cities with more than 250,000 people lie within 500 miles of
Dallas, Texas? How many people in my company make over \$100,000 per
year? Can we connect all of our telephone customers with less than 1,000
miles of cable? To answer questions like these, it is not enough to have
the necessary information. We must organize that information in a way
that allows us to find the answers in time to satisfy our needs.

Representing information is fundamental to computer science. The primary
purpose of most computer programs is not to perform calculations, but to
store and retrieve information -- usually as fast as possible. For this
reason, the study of data structures and the algorithms that manipulate
them is at the heart of computer science. And that is what this book is
about -- helping you to understand how to structure information to
support efficient processing.

Any course on Data Structures and Algorithms will try to teach you about
three things:

1.  It will present a collection of commonly used data structures and
    algorithms. These form a programmer's basic "toolkit". For many
    problems, some data structure or algorithm in the toolkit will
    provide a good solution. We focus on data structures and algorithms
    that have proven over time to be most useful.
2.  It will introduce the idea of tradeoffs, and reinforce the concept
    that there are costs and benefits associated with every data
    structure or algorithm. This is done by describing, for each data
    structure, the amount of space and time required for typical
    operations. For each algorithm, we examine the time required for key
    input types.
3.  It will teach you how to measure the effectiveness of a data
    structure or algorithm. Only through such measurement can you
    determine which data structure in your toolkit is most appropriate
    for a new problem. The techniques presented also allow you to judge
    the merits of new data structures that you or others might invent.

There are often many approaches to solving a problem. How do we choose
between them? At the heart of computer program design are two (sometimes
conflicting) goals:

1.  To design an algorithm that is easy to understand, code, and debug.
2.  To design an algorithm that makes efficient use of the computer's
    resources.

Ideally, the resulting program is true to both of these goals. We might
say that such a program is "elegant." While the algorithms and program
code examples presented here attempt to be elegant in this sense, it is
not the purpose of this book to explicitly treat issues related to goal
(1). These are primarily concerns for the discipline of Software
Engineering. Rather, we mostly focus on issues relating to goal (2).

How do we measure efficiency? Our method for evaluating the efficiency
of an algorithm or computer program is called
[asymptotic analysis]{.term}. Asymptotic
analysis also gives a way to define the inherent difficulty of a
problem. Throughout the book we use asymptotic analysis techniques to
estimate the time cost for every algorithm presented. This allows you to
see how each algorithm compares to other algorithms for solving the same
problem in terms of its efficiency.

### A Philosophy of Data Structures {-}

You might think that with ever more powerful computers, program
efficiency is becoming less important. After all, processor speed and
memory size still continue to improve. Won't today's efficiency
problem be solved by tomorrow's hardware?

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

In the most general sense, a [data structure]{.term} is any data representation and its associated operations.
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
searching for a given record in a [hash table]{.term} is much faster than searching for it in an unsorted array.

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

## Selecting a Data Structure

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

1.  Analyze your problem to determine the
    [basic operations](#basic-operation){.term}
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

::: topic
#### Example: Bank {-}

A bank must support many types of transactions with its customers, but
we will examine a simple model where customers wish to open accounts,
close accounts, and add money or withdraw money from accounts. We can
consider this problem at two distinct levels: (1) the requirements for
the physical infrastructure and workflow process that the bank uses in
its interactions with its customers, and (2) the requirements for the
database system that manages the accounts.

The typical customer opens and closes accounts far less often than
accessing the account. Customers are willing to spend many minutes
during the process of opening or closing the account, but are typically
not willing to wait more than a brief time for individual account
transactions such as a deposit or withdrawal. These observations can be
considered as informal specifications for the time constraints on the
problem.

It is common practice for banks to provide two tiers of service. Human
tellers or automated teller machines (ATMs) support customer access to
account balances and updates such as deposits and withdrawals. Special
service representatives are typically provided (during restricted hours)
to handle opening and closing accounts. Teller and ATM transactions are
expected to take little time. Opening or closing an account can take
much longer (perhaps up to an hour from the customer's perspective).

From a database perspective, we see that ATM transactions do not modify
the database significantly. For simplicity, assume that if money is
added or removed, this transaction simply changes the value stored in an
account record. Adding a new account to the database is allowed to take
several minutes. Deleting an account need have no time constraint,
because from the customer's point of view all that matters is that all
the money be returned (equivalent to a withdrawal). From the bank's
point of view, the account record might be removed from the database
system after business hours, or at the end of the monthly account cycle.

When considering the choice of data structure to use in the database
system that manages customer accounts, we see that a data structure that
has little concern for the cost of deletion, but is highly efficient for
search and moderately efficient for insertion, should meet the resource
constraints imposed by this problem. Records are accessible by unique
account number (sometimes called an
[exact-match query]{.term}). One data structure
that meets these requirements is the
[hash table](#hashing){.term}.
Hash tables allow for extremely fast exact-match search. A record can be
modified quickly when the modification does not affect its space
requirements. Hash tables also support efficient insertion of new
records. While deletions can also be supported efficiently, too many
deletions lead to some degradation in performance for the remaining
operations. However, the hash table can be reorganized periodically to
restore the system to peak efficiency. Such reorganization can occur
offline so as not to affect ATM transactions.
:::

::: topic
#### Example: Databases {-}

A company is developing a database system containing information about
cities and towns in the United States. There are many thousands of
cities and towns, and the database program should allow users to find
information about a particular place by name (another example of an
exact-match query). Users should also be able to find all places that
match a particular value or range of values for attributes such as
location or population size. This is known as a
[range query]{.term}.

A reasonable database system must answer queries quickly enough to
satisfy the patience of a typical user. For an exact-match query, a few
seconds is satisfactory. If the database is meant to support range
queries that can return many cities that match the query specification,
the user might tolerate the entire operation to take longer, perhaps on
the order of a minute. To meet this requirement, it will be necessary to
support operations that process range queries efficiently by processing
all cities in the range as a batch, rather than as a series of
operations on individual cities.

The hash table suggested in the previous example is inappropriate for
implementing our city database, because it cannot perform efficient
range queries. The [B-tree]{.term} supports large databases, insertion and deletion of data
records, and range queries. However, a simple
[linear index]{.term} would be more appropriate if the database is created once,
and then never changed, such as an atlas distributed on a CD or accessed
from a website.
:::

### Introduction Summary Questions

:::::::::: quiz ::::::::::

::::: question
A tool for measuring the efficiency of an algorithm or problem is:

- [x] Algorithm analysis
- [ ] The system clock
- [ ] A profiler
- [ ] Empirical analysis

::: hints
- A profiler works on a program, not an algorithm.
- The system clock works on a program, not an algorithm.
- Empirical analysis works on a program, not an algorithm.
- Algorithm analysis estimates the cost of an algorithm or problem.
:::
:::::

::::: question
Which of these is NOT a definition for efficiency in a computer program?

- [x] It runs in linear time
- [ ] It solves the problem within the required resource contraints
- [ ] It requires fewer resources than known alternatives

::: hints
- One definition for an efficient program is that it runs within the required resource constraints.
- One definition for an efficient program is that it requires fewer resources than known alternatives.
- Many efficient programs require more than linear time. Sometimes linear time is not efficient for a given problem.
:::
:::::

::::: question
An exact-match query is:

- [x] A query where a record is returned if its unique identifier matches the search value.
- [ ] A query where a record is returned if its relevant key value falls within a specified range.
- [ ] Another name for any database query that returns a key value.
- [ ] A way of efficiently locating the records in a database.

::: hints
- Returning a record that falls within a range is called a range query.
- There are many database queries that are not exact-match queries.
- Whether a search is efficient or not has nothing to do with whether it is an exact-match query or not.
- A query to find the record that matches a unique identifier is called an exact-match query.
:::
:::::

::::: question
Which is NOT a topic that a this course book focuses on?

- [x] How to design and maintain large programs.
- [ ] The commonly used data structures.
- [ ] Introduce the idea of tradeoffs and reinforce the concept that there are costs and benefits associated with every data structure.
- [ ] How to measure the effectiveness of a data structure or algorithm.

::: hints
- A key topic for any DSA course is the basic toolkit of data structures and algorithms.
- A key concept for any DSA course is the concept of tradeoffs for costs versus benefits.
- A key skill for any DSA course is ability to measure the effectiveness of a data structure or algorithm.
- Designing and maintaining large programs is a focus for Software Engineering.
:::
:::::

::::: question
As computers have become more powerful:

- [x] We have used that additional computing power to tackle more complex problems.
- [ ] The need for good algorithms has become less because processor speed can make up for a slow algorithm.
- [ ] The algorithms have become easier to understand.
- [ ] We are better able to use our everyday intuition to solve problems.

::: hints
- Good solutions for large, complex computational problems usually require different approaches than what we do in everyday life.
- As problems that we try to solve grow more complicated, their solutions tend to grow more complicated.
- Processor speed cannot grow as fast as the cost of a slower algorithm applied to a bigger problem.
- As our computers have become more powerful, our history has been to apply them to more complex problems.
:::
:::::

::::: question
A range query is:

- [x] A query where a record is returned if its relevant key value falls between a pair of values.
- [ ] A query where a record is returned if its unique identifier matches the search value.
- [ ] Another name for any database query for a key value.
- [ ] A way of efficiently locating the records in a database.

::: hints
- A query to find the record that matches a unique identifier is called an exact-match query.
- There are many database queries that are not range queries.
-  Whether a search is efficient or not has nothing to do with whether it is a range query or not.
- Returning a record that falls within a range is called a range query.
:::
:::::

::::: question
Which of these is more a concern for Software Engineering than for a data structures course?

- [x] To design an algorithm that is easy to understand, code, and debug.
- [ ] To design an algorithm that makes efficient use of the computer's resources.

::: hints
- Designing efficient programs is a focus for data structures and algorithms courses.
- Designing and maintaining large programs is a focus for Software Engineering.
:::
:::::

::::: question
Which of these is NOT one of the three standard steps to follow when selecting a data structure to solve a problem?

- [x] Run simulations to quantify the expected running time of the program.
- [ ] Analyze your problem to determine the basic operations that must be supported.
- [ ] Quantify the resource constraints for each operation.
- [ ] Select the data structure that best meets the requirements determined in the prior steps of the process.

::: hints
- Knowing the basic operations required to solve your problem is the first step to selecting a suitable data structure.
- Knowing the resource constraints for your problem's basic operations is the second step to selecting a suitable data structure.
- Once you know the basic operations and their resource constraints, then you can select a data structure that matches.
- Many problems do not require that you run simulations to determine the expected times for alternative solutions.
:::
:::::

::::::::::::::::::::::::::::::

