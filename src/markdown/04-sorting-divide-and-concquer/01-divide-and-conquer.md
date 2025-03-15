
## Divide and conquer

::: TODO
- Prio 1: rewrite this section
- examples for div&conc:
    - Mergesort and quicksort
    - Heapsort (refer back to selection sort, and to later)
    - Shell sort (refer back to insertion sort) - not n log n, but better than n^2
:::


### Recursion

::: TODO
- the text below is copy-pasted from
<https://chalmersgu-data-structure-courses.github.io/OpenDSA/Published/ChalmersGU-Repetition/html/index.html>
- remove things that don't fit with divide-and-conquer
:::

An [algorithm]{.term} (or a function in a computer program) is
[recursive]{.term} if it invokes itself to do part of its
work.
Recursion makes it possible to solve complex problems using programs
that are concise, easily understood, and algorithmically efficient.
Recursion is the process of solving a large problem by reducing it to
one or more sub-problems which are identical in structure to the
original problem and somewhat simpler to solve.
Once the original subdivision has been made, the sub-problems
divided into new ones which are even less complex.
Eventually, the sub-problems become so simple that they can be then
solved without further subdivision.
Ultimately, the complete solution is obtained by reassembling the
solved components.

For a recursive approach to be successful, the recursive
"call to itself" must be on a smaller problem than the one originally
attempted.
In general, a recursive algorithm must have two parts:

1. The [base case]{.term}, which handles a simple input that can be
   solved without resorting to a recursive call, and

2. The recursive part which contains one or more recursive calls to the
   algorithm.
   In every recursive call, the parameters must be in some sense "closer"
   to the base case than those of the original call.

Recursion has no counterpart in everyday, physical-world problem solving.
The concept can be difficult to grasp because it requires you to think
about problems in a new way.
When first learning recursion, it is common for people to think a lot
about the recursive process.
We will spend some time in this section going over the details for
how recursion works.
But when writing recursive functions, it is best to
stop thinking about how the recursion works beyond the recursive
call.
You should adopt the attitude that the sub-problems will take care of
themselves, that when you call the function recursively it will return
the right answer.
You just worry about the base cases and how to recombine the
sub-problems.

Newcomers who are unfamiliar with recursion often find it hard to
accept that it is used primarily as a tool for simplifying the design
and description of algorithms.
A recursive algorithm does not always yield the most efficient
computer program for solving the problem because recursion
involves function calls, which are typically more expensive than other
alternatives such as a while loop.
However, the recursive approach usually provides an algorithm that is
reasonably efficient.
If necessary, the clear, recursive solution can later be modified to
yield a faster implementation.

Imagine that someone in a movie theater asks you what row you're
sitting in.
You don't want to count, so you ask the person in front of you what
row they are sitting in, knowing that they will tell you a number one
less than your row number.
The person in front could ask the person in front of them.
This will keep happening until word reaches the front row and it
is easy to respond: "I'm in row 1!"
From there, the correct message (incremented by one each row)
will eventually make it's way back to the person who asked.

Imagine that you have a big task.
You could just do a small piece of it,
and then delegate
the rest to some helper, as in this example.

<!--
.. inlineav:: recurIntroDelegateCON ss
   :long_name: Recursion Introduction Slideshow 1
   :links: AV/RecurTutor/recurIntroCON.css
   :scripts: AV/RecurTutor/recurIntroDelegateCON.js
   :output: show
 -->

Let's look deeper into the details of what your friend does when
you delegate the work.
(Note that we show  you this process once now,
and once again when we look at some recursive functions.
But when you are writing your own recursive functions,
you shouldn't worry about all of these details.)

<!--
.. inlineav:: recurIntroDetailsCON ss
   :long_name: Recursion Introduction Slideshow 2
   :links: AV/RecurTutor/recurIntroCON.css
   :scripts: AV/RecurTutor/recurIntroDetailsCON.js
   :output: show
 -->

In order to understand recursion, you need to be able to do two
things.
First, you have to understand how to read a recursive function.
Second, you have to understand how to write a recursive function.
Both of these skills require a lot of practice.
So we will give you a lot of exercises to do later on.


#### Writing a recursive function

Solving a "big" problem recursively means to solve one or more smaller
versions of the problem, and using those solutions of the smaller
problems to solve the "big" problem.
In particular, solving problems recursively means that
smaller versions of the problem are solved in a similar way.
For example, consider the problem of summing values of an array.
What's the difference between summing the first 50 elements in an
array versus summing the first 100 elements?
You would use the same technique.
You can even use the solution to the smaller problem to help you solve
the larger problem.

Here are the basic four steps that you need to write any recursive function.

<!--
.. inlineav:: recurWriteStepsCON ss
   :long_name: Recursion Code Writing Slideshow 1
   :links: AV/RecurTutor/recurWriteCON.css
   :scripts: AV/RecurTutor/recurWriteStepsCON.js
   :output: show
 -->

Now le't see some different ways that we could write `Sum` recursively.

<!--
.. inlineav:: recurWriteSumCON ss
   :long_name: Recursion Code Writing Slideshow 2
   :links: AV/RecurTutor/recurWriteCON.css
   :scripts: AV/RecurTutor/recurWriteSumCON.js
   :output: show
 -->

::: Example
Our example for summing the first $n$ numbers of an array
could have been written just as easily using a loop.
Here is an example of a function that is more naturally written
using recursion.

The following code computes the Fibonacci sequence for a given number.
The Fibonacci Sequence is the series of numbers: 1, 1, 2, 3, 5, 8,
13, 21, 34, ...
Any number in the sequence is found by adding up the two numbers
before it.
The base cases are that `Fibonacci(0) = 1` and
`Fibonacci(1) = 1`.

```java
long Fibonacci(int n) {
  if (n < 2) {
    return 1;
  }
  return Fibonacci(n - 1) + Fibonacci(n - 2);
}
```
:::
