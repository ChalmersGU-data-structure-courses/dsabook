
## Comparing algorithm performance {#analysis-1:comparing-algorithms}

::: TODO
- Prio 2: Shorten subsection "What to measure"
- Prio 2: Shorten examples
- Prio 3: Switch from bubble sort to selection/insertion sort.
:::

If two algorithms that solve the same problem, how do you compare their performance?
One way is to do an [empirical analysis]{.term}:
Implement the both algorithms and test  them on various inputs, and measure the runtime.
This can be time consuming for developer, and there are plenty of pitfalls.
The measured runtime depends, apart from the algorithm itself on:

* Details of the hardware you are running on.
* How optimized the code for the specific implementations are.
* How you construct the inputs.
* The size of your chosen inputs.
* The version and configuration of the compiler you are using.
* What other processes your computer is running.
* The charge level of your laptop battery or operating system power settings.
* Hundreds of other difficult-to-predict factors.

Even if you manage to solve all these issues and compare two algorithms,
when someone else designs a third algorithm, they will not be able to reproduce your
exact setup, so your results will be useless to them.
For these reasons, empirical analysis is notoriously unreliable for comparing algorithms.
Luckily, there is a much better option: [asymptotic analysis]{.term} and
computational complexity.
Computational complexity is a big and very important topic.
We introduce the basics here, and continue in in
Chapters [-@sec:analysis-2] and [-@sec:analysis-3].

The basic idea is to measure how an algorithm behaves as the input size grows.
We do this by classifying algorithms into *complexity classes*.
We have already been doing this in earlier chapters,
when saying that Binary search is logarithmic time,
Linear search is linear time, and various sorting algorithms are quadratic time.
This is generalised by big-$O$ notation (pronounced "big oh notation" or "ordo notation"),
using a mathematical expression for each complexity class:
we say Binary search is $O(\log(n))$, Linear Search is $O(n)$
and Insertion Sort is $O(n^2)$. This formula cannot be used to calculate the time
it takes to sort a list in seconds, but it describes perfectly how
execution time increases (in the worst case) when the input size grows.

With a bit of practice, determining the complexity class of an algorithm or
a program is quick and easy.
This helps us reliably compare algorithms without running any tests.
Barring a few obscure cases, an $O(\log(n))$ algorithm
is better than an $O(n)$ algorithm, which in turn is better than an $O(n^2)$ one.
The only time we need to run benchmarks, optimise code, and tweak compiler settings
is when two algorithms are in the same complexity class.

A very important complexity class i $O(1)$, constant complexity. The $1$ here should
not be understood as the exact number 1, but as any constant value independent of $n$.
This will make more sense after we introduce the formal definition of $O$-notation,
but for now any part of an algorithm where the execution time does not depend on input
size is considered constant time, $O(1)$. Swapping two elements in an array is a good
example of a tiny algorithm that is $O(1)$, it takes the same amount of time to swap
two elements in a huge array as it does in a tiny array.

#### What are we measuring?

Generally, complexity can be used to measure us of various
*computational resources* of an algorithm.
By far the most common resource is running time. When we say
Insertion sort is $O(n^2)$, we mean its execution time will grow
quadratically with the size of the input. We can also measure
memory use. This is called *space complexity* as opposed to *time complexity*.

Using space complexity, we can give a more precise meaning to the concept of in-place
sorting (@sec:sorting-1:overview). An algorithm that is not in-place will have memory complexity $O(n)$, the
memory usage grows linearly with input size. If we double the input size, memory usage
will also double. An in-place algorithm typically has memory complexity $O(1)$, meaning
that memory usage is independent of the size of the input (but there are plenty of
algorithms that are considered in-place that have $O(\log(n))$ memory complexity).

Lots of algorithms have $O(1)$ space complexity, for instance both binary search and
Linear search (as defined in this book) do. This can be determined relatively easily
by looking at the source code, the only memory allocated is for a few local variables containing
indexes or pointers to values, regardless of how large the input array is.
Space complexity can be much harder to determine for other algorithms, especially recursive ones,
where each recursive call to a function tends to use a bit om memory until it terminates.

#### Quantitative properties of the input

The $n$ in $O(n^2)$ is understood to be the size of the input, or more generally
some carefully selected quantitative property of the input.
For most algorithms we have seen so far, $n$ is the size of an array.
This is typical for algorithm involving a data structure, the input size of an operation
is the current number of elements contained in the structure.

Sometimes the input is a single number, and the behaviour of the algorithm depends on how large that number is.
One example is Euclid's algorithm for finding the GCD (greatest common divisor) of two integers:
the runtime of the algorithm is proportional to the logarithm of the largest integer.
Another example is various algorithms for determining if a number is a prime number.
Usually such algorithms are used on very large numbers, so the input size $n$ is chosen to be
the number of bits in the binary representation of the number.

Other algorithms have multiple size parameters, for instance an algorithm that takes
two arrays and finds their common elements may have time complexity $O(n \times m)$, where
$n$ and $m$ are the sizes of the two arrays. An algorithm for a matrix operation may
have the number of rows and columns as separate input sizes, or just the total number of
elements in the matrix, depending on the level of detail needed to compare two algorithms.

The important takeaway here is that when $O$-notation is used,
it is essential to keep in mind what the input size $n$ is.

#### Constant time operations

A good initial understanding of time complexity is as an estimate of the number of "basic operations"
that are performed by the algorithm in the worst case for a given input size.
The term "basic operation" is rather vague.
A basic operation must have the property that it always takes the same time to run,
or at least that its runtime is independent of the input size.
That is, every basic operation is $O(1)$ time.

Adding or comparing two numbers are examples of basic operations in most programming languages,
as are assigning a variable or retrieving an array value at a given position.
But summing the all values in an array of size $n$ is not $O(1)$, because the time depends on the size of the array.
Creating a new array of size $10$ is $O(1)$, but creating a new array of size $n$ is $O(n)$, at least
if the array content is initialised to a default value
(in some languages you can allocate memory without initializing the content).

Suppose we are performing binary search on a large sorted array of email addresses (stored as strings).
The input size $n$ is the length of the array, and the algorithm does a number of comparisons on emails.
Generally speaking, comparing two strings is linear time in the length of the shortest string
(in the worst case it needs to compare all characters), so should each comparison be considered $O(n)$?
The answer is that it should not. Recall that $n$ is the number of email addresses, saying that
each individual comparison is $O(n)$ would mean that when we double the number of email addresses
the time for a single comparison would double. In this example, we can consider comparisons of strings
to be $O(1)$, because the time it takes to compare two emails is independent of our chosen input size.

::: example
#### Example: Linear search

Recall the linear search algorithm from @sec:intro:searching,
it searches for a given value in an array.
The size $n$ of the input is the length of the array.
The algorithm looks at each array value in turn, comparing with the given value.
If the value is found it returns the position, otherwise it continues until the end of the array.

    linearSearch(arr, val):
        for i in 0 .. arr.size - 1:   // For each element in arr,
            if arr[i] == val:         //     if we found it
                return i              //         return this position.
        return null                   // Otherwise, return null

What basic (constant time) operations are we counting in this algorithm?
The most obvious is counting the number of *comparisons*, that is, the number of times the `if`-test is run.
For most situations, it is reasonable to assume that one such comparison takes a fixed amount of time,
regardless of the values of $n$, so it is a basic operation.

There are also some hidden basic operations.
Advancing the loop means increasing the counter $i$ by one, an arithmetic operation and a memory write,
each taking constant time. There is also some initialization of the variables $arr$ and $val$, and
performing a single return from the function, all of these are constant time,
and they are only performed once each.
:::

::: example
#### Example: Calculating the median-of-three

The following is a function that calculates the *median* of the first,
the middle and the last values in a given array.
(This is a useful *pivot* selection for Quicksort, which will be discussed in @sec:sorting-2:quicksort.)

    function medianOfThree(arr):
        n = arr.size
        a = arr[0]; b = arr[n/2]; c = arr[n-1]
        if a < b:
            if b < c:      return b
            else if a < c: return c
            else:          return a
        else:
            if a < c:      return a
            else if b < c: return c
            else:          return b

When the function is called it will do at most four variable assignments and three comparisons,
no matter how large the array is.
Let us assume that an assignment takes $c_1$ time, and a comparison takes $c_2$ time.
Then the runtime equation for the function is $T(n) = 4\cdot c_1+3\cdot c_2$.
This indicates that the size of the input $n$ has no effect on the running time.
The whole function is $O(1)$ (constant time)!
:::

::: example
#### Example: Bubble sort

Recall the Bubble sort algorithm from @sec:sorting-1:bubble-sort:

    function bubbleSort(arr):
        n = arr.size
        for i in 0 .. n-2:
            for j in 1 .. n-i-1:
                if arr[j-1] > arr[j]:
                    swap(arr, j-1, j)

In addition to the initialization of variable and advancing the loops as before,
there are two basic operations:
the `if`-clause comparison and the `swap` operation.

Technically, the `swap` operation does several basic operation, but the total
time to perform a fixed number of constant time operations is still a constant.
This highlights an important aspect of $O$-notation: It does not matter if we perform
one, two, or three constant time operations, the total time is still $O(1)$, since it
is independent from the input size $n$. In fact we could look at the whole if-statement
and conclude that comparing and swapping if needed is a $O(1)$, considering the whole
body of the loop a single constant time operation.

The outer `i` loop runs $n$ times,
and for each iteration the inner `j` runs at most $n$ times.
To be more precise, the inner loop first runs $n$ times,
then $n-1$ times, then $n-2$ times, and so on.
The total number of comparisons is therefore
$n+(n-1)+(n-2)+\cdots+1$, which can be simplified to $n(n+1)/2$.
This is approximately $1/2\cdot n^2$, meaning that
the running time is $T(n) \approx c_3/2 \cdot n^2$.
This is proportional to $n^2$, and we call this a *quadratic* running time.
:::

Note how much detail is simplified away by using complexity classes.
We do not differentiate between $n^2$ and $1/2 \cdot n^2$.
There is no "triangular" complexity class.
One could half-jokingly say that asymptotically, a triangle is a square.
This may seem like a weakness of $O$-notation, but it is a fact the
strength that makes it such a useful tool for comparing algorithms.
To convince yourself of this, consider this: runtime is only interesting
for large $n$. All algorithms are fast for small inputs.
Even if an algorithm is $1/100 \cdot n^2$, it is still much slower than
any $O(n)$ algorithm, for any $n$ that we care about.
