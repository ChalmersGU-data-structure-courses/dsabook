
## Comparing algorithm performance {#analysis-1:comparing-algorithms}

If you have two algorithms that solve the same problem, how do you compare their performance?
One way is to do an [empirical analysis]{.term}:
Implement both algorithms and test them on various inputs, then measure the runtime.
This can be time consuming for the developer, and there are plenty of pitfalls.
Apart from the efficiency of the algorithm itself, the measured runtime can depend on:

<!-- \newpage -->

* details of the hardware you are running on,
* how optimised the code for the specific implementations are,
* how you construct the inputs,
* the size of your chosen inputs,
* the version and configuration of the compiler you are using,
* what other processes your computer is running,
* the condition of your laptop battery, and
* hundreds of other difficult-to-predict factors.

Even if you manage to solve all these issues and compare two algorithms,
when someone else designs a third algorithm, they will not be able to reproduce your
exact setup, so your results will not be as valuable to them.
For these reasons, empirical analysis is notoriously unreliable for comparing algorithms.
Luckily, there is a much better option: [asymptotic analysis]{.term}, which is part of the large and important field of computational complexity.
We introduce the basics here, and continue in
Chapters [-@sec:analysis-2] and [-@sec:analysis-3].


#### Time functions and growth rates {#analysis-1:order-of-growth}

To compare algorithms independently of hardware, we describe their running time as a *time function* $T(n)$: the running time of the worst-case input of size $n$, measured in some abstract unit of time.
What matters is not the exact value of $T(n)$, but how fast it grows when $n$ grows.

Imagine that you have 10,000 books divided into 100 bookshelves, and you want to sort them so that you can find them quickly using binary search.
You use one of the sorting algorithms from [Chapter @sec:sorting-1], and it takes you one hour to sort the 100 books on one shelf.
How long will it take to sort all 10,000 books?
The running time of these algorithms is proportional to $n^2$, so if we double the number of books the time quadruples, and if we multiply it by 100 the time is multiplied by $100^2$ = 10,000.
Sorting all books will take 10,000 hours, and even a sorting robot that is 100 times faster than you will take 100 hours.
A better investment than a faster robot is a faster algorithm.

Determining $T(n)$ exactly is complicated, and requires a multitude of assumptions about the hardware.
But as a thought experiment we can assume something like $T(n)=3n+5$, using some unit of time, and use that to determine how large problems can be solved in a given timeframe.
@Fig:problem-size-speedup shows this for some example time functions.

<div id="fig:problem-size-speedup">
Time function $T(n)$       1 ms        10 ms        100 ms       1 second
-----------------------  ------  -----------  ------------  -------------
$2\cdot\log_2(n)$          $32$    $10^{15}$    $10^{150}$    $10^{1500}$
$n/2$                      $20$        $200$     $2{,}000$     $20{,}000$
$n$                        $10$        $100$     $1{,}000$     $10{,}000$
$n\cdot\log_2(n)/4$        $11$         $66$         $453$      $3{,}408$
$n^2/10$                   $10$         $31$         $100$          $316$
$2^n/20$                    $7$         $11$          $14$           $17$

Maximum problem sizes that can be handled in 1, 10, 100 and 1,000 milliseconds
for different time functions. We assume that every operation takes 0.1 ms.
</div>

The table illustrates several important points:

- The functions $n$ and $n/2$ are both *linear*; only the constant factor differs.
  In both cases, if we spend ten times more time we can solve a ten times larger problem.
- The *logarithmic* function, $2\cdot\log_2(n)$, could be the time to find a book using binary search.
  In 1 ms we can search 32 books, but in 100 ms we can search a library with more books than there are atoms in the universe.
  Even if we doubled the speed of the linear function a hundred times, the logarithmic function would still get more done in a single second.
- The *quadratic* function, $n^2/10$, benefits much less from extra time:
  if we let it run 100 times longer, it can only solve a problem that is $\sqrt{100}=10$ times larger.
- The *linearithmic* (or *log-linear*) function, $n\log_2(n)/4$, improves almost like the linear one, but not quite.
  It is a common growth rate for many algorithms later in this book, such as Mergesort (@sec:sorting-2:mergesort).
- The *exponential* function, $2^n/20$, can only solve very small problems.
  Spending 10 times longer only increases the problem size by $\log_2(10) \approx 3$, an addition rather than a multiplication.
  A problem of size 30 takes 15 hours, and a problem of size 50 more than 1,700 years!

In summary, a faster computer gives a speed-up of a different nature than a faster algorithm: the former multiplies the speed by a constant, the latter changes the growth rate.

@Fig:growthGraphs plots the same time functions, and @tbl:growth-rates shows their values for increasingly large $n$.
The quadratic $n^2/10$ becomes slower than the linear $n$ already from $n > 10$, despite having a smaller constant factor, and the gap only widens as $n$ grows.
In general, $n^a$ always grows faster than $\log(n)^b$ for all constants $a,b>0$, and $a^n$ always grows faster than $n^b$ for all constants $a>1$ and $b>0$.

![
    Illustration of growth rates for the same time functions as in @fig:problem-size-speedup.
    The right view shows the lower-left portion of the left view.
    The horizontal axis represents input size.
    The vertical axis can represent time, space, or any other measure of computational cost.
](images/growth_rates_graph.svg){#fig:growthGraphs width=100%}

Time function $T(n)$      $n=10$               $100$              $1,000$            $10^4$         $10^5$
-------------------------  --------  ------------------  -------------------    --------------    -----------
$2\cdot\log_2(n)$               $7$                $13$                 $20$              $27$           $33$
$n/2$                           $5$                $50$                $500$         $5{,}000$     $50{,}000$
$n$                            $10$               $100$            $1{,}000$        $10{,}000$    $100{,}000$
$n\cdot\log_2(n)/4$             $8$               $166$            $2{,}491$        $33{,}219$    $415{,}241$
$n^2/10$                       $10$           $1{,}000$          $100{,}000$  $10{,}000{,}000$         $10^9$
$2^n/20$                       $51$    $6\cdot 10^{28}$    $5\cdot 10^{300}$          $\cdots$       $\cdots$

: Costs for representative growth rates {#tbl:growth-rates}

::: dsvis
#### Growth rates exercises

```{.jsav-embedded src="AlgAnal/CompareGrowth.html" type="ka" name="Comparing Growth Rates Exercise"}
```

```{.jsav-embedded src="AlgAnal/GrowthRatesPRO.html" type="ka" name="Growth Rates Ordering Exercise"}
```
:::

<!-- TODO
To make students more engaged in the GrowthRates exercise, we may need a
tool that allows students to input two growth rate functions. Then the
tool should plot the graph of both functions and mark their crossing
point. The student also should be allowed to play with the constant
values for both functions and see that this only changes the crossing
point but doesn't change which function grows faster than the other.
-->


#### Complexity classes and big-$O$ notation

Instead of working with exact time functions, which are complicated and depend on many assumptions, we classify them into *complexity classes* by their growth rate.
We have already done this in earlier chapters, when saying that Binary search is logarithmic time, Linear search is linear time, and various sorting algorithms are quadratic time.
This is generalised by the big-$O$ notation (pronounced "big oh notation" or in Swedish "ordo-notation"), using a mathematical expression for each complexity class.
We say Binary search is $O(\log(n))$, Linear search is $O(n)$ and Selection and Insertion sort are $O(n^2)$.
A big-$O$ formula cannot be used to calculate the number of seconds
it takes to sort a list, but it describes quite accurately how
execution time increases when the input size grows.

With a bit of practice, determining the complexity class of an algorithm or
a program is quick and easy.
This helps us reliably compare algorithms without running any tests.
The basic rule of thumb is that, whenever $n$ is sufficiently large,
an $O(\log(n))$ algorithm is better than an $O(n)$ algorithm, which in turn is better than an $O(n^2)$ one.
The only time we need to run benchmarks, optimise code, and tweak compiler settings
is when two algorithms are in the same complexity class.

Note how much detail is simplified away by using complexity classes:
$n$ and $n/2$ are both $O(n)$, and $n^2/10$ is $O(n^2)$.
This may seem like a weakness of big-$O$, but as the table above shows, it is in fact a strength: runtime is only interesting for large $n$, since all algorithms are fast for small inputs, and for large $n$ the growth rate matters much more than any constant factor.

#### What are we analysing?

In general, complexity can be used to analyse the use of various *computational resources* of an algorithm.
By far the most common resource is running time. When we say
Insertion sort is $O(n^2)$, we mean its execution time will grow
quadratically with the size of the input. But we can also measure
memory use: this is called *space complexity* as opposed to *time complexity*.

Using space complexity, we can give a more precise meaning to the concept of in-place
sorting (@sec:sorting-1:in-place-sorting).
An in-place algorithm typically has space complexity $O(1)$,
meaning that its memory usage is independent of the size of the input.^[
    Strictly speaking, recursive algorithms never use constant memory,
    because every recursive call uses up a little memory for book-keeping.
    Therefore one often excludes the book-keeping memory when talking about in-place recursive algorithms.
]
A sorting algorithm that is *not* in-place has to allocate memory for the resulting array
(or for a temporary array):
so its memory usage grows linearly with the size of the input.
Therefore it has *linear* space complexity, $O(n)$:
if we double the input size, memory usage will also double.

Both linear and binary search have $O(1)$ space complexity.
This can be determined easily by just looking at the source code:
the only memory allocated is for a few local variables, regardless of how large the input array is.
But it can be much harder to infer the space complexity of other algorithms, especially recursive ones.
Each recursive call tends to allocate more memory, but the size of the allocated memory
depends on how deeply nested the recursion is.

#### Quantitative properties of the input

The $n$ in $O(n^2)$ is understood to be the size of the input, or more generally
some carefully selected quantitative property of the input.
For most algorithms we have seen so far, $n$ is the size of an array.
This is typical for algorithms involving a data structure, where the input size of an operation
is the current number of elements contained in the structure.

Sometimes the input is a single number, and the behaviour of the algorithm depends on how large that number is.
One example is Euclid's algorithm for finding the *greatest common divisor* of two integers:
the runtime of the algorithm is proportional to the logarithm of the largest integer.
Another example is various algorithms for determining if a number is a prime number.
Usually such algorithms are used on very large numbers, so the input size $n$ is chosen to be
the number of bits in the binary representation of the number.

Other algorithms have multiple size parameters, for instance an algorithm that takes
two arrays and finds their common elements may have time complexity $O(n \times m)$, where
$n$ and $m$ are the sizes of the two arrays. An algorithm for a matrix operation may
have the number of rows and columns as separate input sizes, or just the total number of
elements in the matrix, depending on the level of detail needed to compare two algorithms.

The important takeaway here is that when big-$O$ notation is used,
it is important to keep in mind what the input size $n$ is.

#### Constant time operations

An important complexity class is $O(1)$, constant time.
The $1$ here should not be understood as the exact number $1$, but as any constant value independent of the input size $n$.

A good initial understanding of time complexity is as an estimate of the number of "basic operations"
that are performed by the algorithm in the worst case for a given input size.
The term "basic operation" is rather vague.
A basic operation must have the property that it always takes the same time to run,
or at least that its runtime is independent of the input size.
That is, every basic operation is $O(1)$ time.

Adding or comparing two numbers are examples of basic operations in most programming languages,
as are assigning a variable or retrieving an array value at a given position.
Swapping two elements in an array is also $O(1)$, it takes the same amount of time in a huge array as in a tiny one.
But summing all values in an array of size $n$ is not $O(1)$, because the time depends on the size of the array.
Creating a new array of size $10$ is $O(1)$, but creating a new array of size $n$ is $O(n)$, at least
if the content is cleared after the array is created (which is done by almost all programming languages).

Suppose we run binary search on a large sorted array of email addresses (stored as strings).
The input size $n$ is the length of the array, and the algorithm does a number of comparisons on emails.
Generally speaking, comparing two strings is linear time in the length of the shortest string
(in the worst case it needs to compare all characters), so should each comparison be considered $O(n)$?
The answer is that it should not. Recall that $n$ is the number of email addresses, saying that
each individual comparison is $O(n)$ would mean that when we double the number of email addresses
the time for a single comparison would double. In this example, we can consider comparisons of strings
to be $O(1)$, because we can assume that the strings are never longer than, say, 100 characters.

::: {.example #ex:median-of-three-analysis}
#### Example: Calculating the median-of-three

The following function calculates the *median* of the first, the middle and the last values in an array.
This is a useful *pivot* selection for Quicksort, see @sec:sorting-2:quicksort.

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

The function does at most four assignments and three comparisons, no matter how large the array is.
If an assignment takes $c_1$ time and a comparison $c_2$ time, then $T(n) = 4c_1+3c_2$,
which does not depend on $n$: the function is $O(1)$.
:::

::: {.example #ex:insertion-sort-analysis}
#### Example: Insertion sort

In @sec:sorting-1:performance-analysis we saw that Insertion sort (@sec:sorting-1:insertion-sort)
does $1+2+\cdots+(n-1) = n(n-1)/2$ comparisons and swaps in the worst case.
If we try to write down its exact time function, we get something like

$$T(n) = c_1 + c_2(n-1) + c_3\frac{n(n-1)}{2} = \frac{c_3}{2}n^2 + \Big(c_2-\frac{c_3}{2}\Big)n + (c_1-c_2)$$

where $c_1$ is the cost of the initialisation, $c_2$ the cost of one iteration of the outer loop,
and $c_3$ the cost of one iteration of the inner loop.
This formula is already complicated for such a simple algorithm, and the constants depend on the hardware anyway.
But for large $n$ the $n^2$ term dominates everything else, so all we really need to know is that Insertion sort is $O(n^2)$.
In [Chapter @sec:analysis-2] we will make this kind of simplification precise.
:::
