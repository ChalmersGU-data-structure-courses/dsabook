# Introduction

::: TODO
- Prio 2: are the lists actually the ones we want to emphasise?
- Prio 3: update the 1st paragraph with more up-to-date examples
:::

How many cities with more than 100,000 people lie within 200 kilometers of Paris, France?
How many people in Swedish towns with less than 50,000 people earn less than 50% of the average income of people in Sweden?
How much more CO~2~ will be emitted if I travel by plane from Gothenburg, Sweden, to Düsseldorf, Germany, compared to if I take the train?
How can I see if a text contains plagiarism, i.e., if it copied some parts from another existing text?
To answer questions like these, it is not enough to have the necessary information. We must organise that information in a way that allows us to find the answers in time to satisfy our needs.

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
