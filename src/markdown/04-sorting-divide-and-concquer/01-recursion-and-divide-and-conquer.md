
## Recursion

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

For a recursive approach to be successful, the recursive "call to itself"
must be on a smaller problem than the one originally attempted.
In general, a recursive algorithm must have two parts:

1. The [base case]{.term}, which handles a simple input that can be
   solved without resorting to a recursive call, and

2. The recursive part which contains one or more recursive calls to the algorithm.
   In every recursive call, the parameters must be in some sense "closer"
   to the base case than those of the original call.

Recursion can be difficult to grasp because it requires you to think about problems in a new way.
When first learning recursion, it is common for people to think a lot about the recursive process.
But when writing recursive functions, it is best to stop thinking about how recursion actually works "behind the hood".
You should adopt the attitude that the sub-problems will take care of themselves,
that when you call the function recursively it will return the right answer.
You just worry about the base cases and how to recombine the sub-problems.

A recursive algorithm does not always yield the most efficient
computer program for solving the problem, because recursion involves function calls
which are typically more expensive than other alternatives such as a while loop.
However, the recursive approach usually provides an algorithm that is reasonably efficient.
If necessary, the clear, recursive solution can later be modified to yield a faster implementation.


::: example
#### Example: The Fibonacci sequence

Here is an example of a function that is naturally written using recursion.
The Fibonacci sequence is the series of numbers: 1, 1, 2, 3, 5, 8, 13, 21, 34, ...
Any number in the sequence is found by adding up the two numbers before it,
and the first two numbers in the sequence are both 1.
Mathematically, the $n$th Fibonacci number is calculated recursively like this,
where the first row is the *recursive case*, and the second row defines the two *base cases*:

\begin{align*}
\text{Fib}(n)  &=  \text{Fib}(n-1) + \text{Fib}(n-2)  \\
\text{Fib}(0)  &=  \text{Fib}(1)  =  1
\end{align*}

:::


### Divide and conquer

Solving a problem recursively means to solve one or more smaller versions of the problem,
and using those solutions of the smaller problems to solve the original problem.
Sometimes it is possible to divide a problem into *more than one* smaller sub-problems,
and this is the basis for *divide-and-conquer* algorithms.

For divide-and-conquer to be an improvement of a "traditional" iterative solution,
it is important that you in each step divide the problem into *more than one* sub-problems,
but also that each sub-problem should be approximately the same size.
Divide-and-conquer algorithms are usually very difficult to make iterative,
so they are the perfect use case for recursion.
An example of a recursive algorithm that is *not* divide-and-conquer, is recursive binary search:
it divides the problem into *one* smaller problem, not two.

The general structure of a divide-and-conquer algorithm is like this.
To solve a problem $p$:

1. Divide p into several smaller problems $p_1$, ..., $p_k$, of similar size,
2. then solve each of $p_1$, ..., $p_k$ into their solutions $s_1$, ..., $s_k$,
3. finally combine the solutions $s_1$, ..., $s_k$ into the solution of $p$.

Note that the final step, to combine the solutions, is as important as dividing the problem.
There are many standard examples of divide-and-conquer algorithms:
multiplication of large numbers, matrix multiplication and other matrix algorithms,
geometrical algorithms, syntactic parsing, calculating Fourier transforms, and of course, sorting.

In this chapter we will how divide-and-conquer can be used to derive two efficient sorting algorithms, Mergesort and Quicksort.
Both Mergesort and Quicksort splits the array into two sub-arrays, which can be sorted independently of each other.
The key point to making the algorithms efficient is that the sub-arrays must be (approximately) the same size,
so that the problem sizes are (approximately) halved in each iteration.
