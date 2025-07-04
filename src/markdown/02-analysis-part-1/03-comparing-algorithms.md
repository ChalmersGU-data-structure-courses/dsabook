
## Comparing algorithms

::: TODO
- Prio 3: discuss how to abstract away things
:::

How do you compare two algorithms for solving some problem in terms of
efficiency? We could implement both algorithms as computer programs and
then run them on a suitable range of inputs, measuring how much of the
resources in question each program uses. This approach is often
unsatisfactory for four reasons. First, there is the effort involved in
programming and testing two algorithms when at best you want to keep
only one. Second, when empirically comparing two algorithms there is
always the chance that one of the programs was "better written" than
the other, and therefore the relative qualities of the underlying
algorithms are not truly represented by their implementations. This can
easily occur when the programmer has a bias regarding the algorithms.
Third, the choice of empirical test cases might unfairly favour one
algorithm. Fourth, you could find that even the better of the two
algorithms does not fall within your resource budget. In that case you
must begin the entire process again with yet another program
implementing a new algorithm. But, how would you know if any algorithm
can meet the resource budget? Perhaps the problem is simply too
difficult for any implementation to be within budget.

These problems can often be avoided by using asymptotic analysis.
Asymptotic analysis measures the efficiency of an algorithm, or its
implementation as a program, as the input size becomes large. It is
actually an estimating technique and does not tell us anything about the
relative merits of two programs where one is always "slightly faster"
than the other. However, asymptotic analysis has proved useful to
computer scientists who must determine if a particular algorithm is
worth considering for implementation.

The critical resource for a program is most often its running time.
However, you cannot pay attention to running time alone. You must also
be concerned with other factors such as the space required to run the
program (both main memory and disk space). Typically you will analyse
the *time* required for an *algorithm* (or the instantiation of an
algorithm in the form of a program), and the *space* required for a
*data structure*.

Many factors affect the running time of a program. Some relate to the
environment in which the program is compiled and run. Such factors
include the speed of the computer's CPU, bus, and peripheral hardware.
Competition with other users for the computer's (or the network's)
resources can make a program slow to a crawl. The programming language
and the quality of code generated by a particular compiler can have a
significant effect. The "coding efficiency" of the programmer who
converts the algorithm to a program can have a tremendous impact as
well.

If you need to get a program working within time and space constraints
on a particular computer, all of these factors can be relevant. Yet,
none of these factors address the differences between two algorithms or
data structures. To be fair, if you want to compare two programs derived
from two algorithms for solving the same problem, they should both be
compiled with the same compiler and run on the same computer under the
same conditions. As much as possible, the same amount of care should be
taken in the programming effort devoted to each program to make the
implementations "equally efficient". In this sense, all of the factors
mentioned above should cancel out of the comparison because they apply
to both algorithms equally.

If you truly wish to understand the running time of an algorithm, there
are other factors that are more appropriate to consider than machine
speed, programming language, compiler, and so forth. Ideally we would
measure the running time of the algorithm under standard benchmark
conditions. However, we have no way to calculate the running time
reliably other than to run an implementation of the algorithm on some
computer. The only alternative is to use some other measure as a
surrogate for running time.

### Basic operations and input size {#input-size}

Of primary consideration when estimating an algorithm's performance is
the number of [basic operations](#basic-operation){.term} required by the algorithm to process an input of a certain
size. The terms "basic operations" and "size" are both rather vague
and depend on the algorithm being analysed. Size is often the number of
inputs processed. For example, when comparing sorting algorithms the
size of the problem is typically measured by the number of records to be
sorted. A basic operation must have the property that its time to
complete does not depend on the particular values of its operands.
Adding or comparing two integer variables are examples of basic
operations in most programming languages. Summing the contents of an
array containing $n$ integers is not, because the cost depends on the
value of $n$ (i.e., the size of the input).

Because the most important factor affecting running time is normally
the size of the input, for a given input size $n$ we often express the time
$T$ to run the algorithm as a function of $n$, written as $T(n)$.
We will always assume $T(n)$ is a non-negative value.

:::: example
#### Example: Largest value in an array

Consider a simple algorithm to solve the problem of finding the largest
value in an array of $n$ integers. The algorithm looks at each integer
in turn, saving the position of the largest value seen so far:

    // Return position of largest value in integer array arr
    function largest(arr):
        pos = 0                    // Position of pos element seen.
        for i in 1 .. arr.size-1:  // For each element,
            if arr[pos] < arr[i]:  // if arr[i] is larger,
                pos = i            // remember its position.
        return pos                 // Return pos position

Here, the size of the problem is `arr.size`, the number of integers
stored in the array. The basic operation is to compare a
value to that of the largest value seen so far. It is reasonable to
assume that it takes a fixed amount of time to do one such comparison,
regardless of the values or their positions in the
array.

Let us call $c$ the amount of time required to compare two integers in
function `largest`. We do not care right now what the precise value of
$c$ might be. Nor are we concerned with the time required to increment
variable $i$ because this must be done for each value in the array, or
the time for the actual assignment when a larger value is found, or the
little bit of extra time taken to initialise `pos`. We just want a
reasonable approximation for the time taken to execute the algorithm.
The total time to run `largest` is therefore approximately $cn$, because
we must make $n$ comparisons, with each comparison costing $c$ time. We
say that function `largest` (and by extension, the largest-value
sequential search algorithm for any typical implementation) has a
running time expressed by the equation

$$
T(n) = cn
$$

::::

:::: latex
More examples can be found in the online version of the book.

\booklink{More examples online}{2.3}{sec:input-size}
::::

:::: online

::: example
#### Example: Accessing the first array value

The running time of a statement that assigns the first value of an
integer array to a variable is simply the time required to copy the
value of the first array value. We can assume this assignment takes a
constant amount of time regardless of the value. Let us call $c_1$ the
amount of time necessary to copy an integer. No matter how large the
array on a typical computer (given reasonable conditions for memory and
array size), the time to copy the value from the first position of the
array is always $c_1$. Thus, the equation for this algorithm is simply

$$
T(n) = c_1
$$

indicating that the size of the input $n$ has no effect on the running
time. This is called a [constant running time]{.term}.
:::

:::: example
#### Example: Nested for-loop

Consider the following code:

    sum = 0
    for i in 0 .. n-1:
        for j in 0 .. n-1:
            sum = sum + 1

What is the running time for this code fragment? Clearly it takes longer
to run when $n$ is larger. The basic operation in this example is the
increment operation for variable `sum`. We can assume that incrementing
takes constant time; call this time $c_2$. (We can ignore the time
required to initialise `sum`, and to increment the loop counters `i` and
`j`. In practice, these costs can safely be bundled into time $c_2$.)
The total number of increment operations is $n^2$. Thus, we say that the
running time is $T(n) = c_2 n^2$.
::::

::::
