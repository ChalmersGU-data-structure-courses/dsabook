
## Recursion and divide-and-conquer

An [algorithm]{.term} (or a function in a computer program) is
[recursive](#recursion){.term} if it invokes itself to do part of its
work.

### Recursion

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


::: example
#### Example: The Fibonacci sequence

Here is an example of a function that is naturally written using recursion.
The Fibonacci sequence is the series of numbers: 1, 1, 2, 3, 5, 8, 13, 21, 34, ...
Any number in the sequence is found by adding up the two numbers before it,
and the first two numbers in the sequence are both 1.
Mathematically, the $n$th Fibonacci number is calculated recursively like this:

\begin{align*}
f(0) = f(1) &= 1 \\
f(n)        &= f(n-1) + f(n-2)
\end{align*}

The first row is the *recursive case*, and the second row defines the two *base cases*.
This mathematical definition is easily translated into pseudocode:

    function fibonacci(n):
        if n <= 1:
            return 1
        else:
            return fibonacci(n - 1) + fibonacci(n - 2)

:::


### Divide and conquer

<!-- START NOTES -->

There is an important class of recursive algorithms that are called divide-and-conquer. The basic idea is to solve a bigger problem by dividing it into smaller sub-problems. For some problems (such as sorting), this can lead to a drastic improvement of the efficiency of finding a solution.

For divide-and-conquer to be an improvement of a "traditional" solution, it is important that you in each step divide the problem into more than one sub-problem, and that they should be approximately the same size. For example, recursive binary search divides the problem into one smaller problem, not two. This makes it easy to make an iterative version that behaves the same. Therefore I do not count binary search as a divide-and-conquer algorithm (but some people do...).

Divide-and-conquer algorithms are usually very difficult to make iterative, so they are the perfect use case for recursion. The general structure of a divide-and-conquer algorithm is something like this. To solve a problem $p$:

1. Divide p into several smaller problems $p_1$, ..., $p_k$,
2. then solve each of $p_1$, ..., $p_k$ into their solutions $s_1$, ..., $s_k$,
3. finally combine the solutions $s_1$, ..., $s_k$ into the solution of $p$.

Note that the final step, to combine the solutions, is as important as dividing the problem. There are many standard examples of divide-and-conquer algorithms: multiplication of large numbers, matrix multiplication and other matrix algorithms, geometrical algorithms, syntactic parsing, calculating Fourier transforms, and of course, sorting.

<!-- END NOTES -->

-----------

Solving a "big" problem recursively means to solve one or more smaller
versions of the problem, and using those solutions of the smaller
problems to solve the "big" problem.

Sometimes it is possible to divide a problem into *more than one* smaller sub-problems.
This is the basis for *divide-and-conquer* algorithms, which can be found in several different areas, such as integer and matrix multiplication, computational geometry, and syntactical parsing.
In this chapter we will how divide-and-conquer can be used to derive two efficient sorting algorithms, Mergesort and Quicksort.

Both Mergesort and Quicksort splits the array into two sub-arrays, which can be sorted independently of each other.
The key point to making the algorithms efficient is that the sub-arrays must be (approximately) the same size, so that the problem sizes are (approximately) halved in each iteration.
