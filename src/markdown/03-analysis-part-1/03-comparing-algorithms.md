
## Comparing algorithm performance {#analysis-1:comparing-algorithms}

::: TODO
- Prio 1: replace the bubble-sort example with selection or insertion sort!
- Prio 1: It is merged with "Growth rates" - make sure the text is coherent
- Prio 2: Shorten subsection "What to measure"
- Prio 2: Shorten examples
- Prio 3: Switch from bubble sort to selection/insertion sort.
:::

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
Luckily, there is a much better option: [asymptotic analysis]{.term} and
computational complexity.
Computational complexity is a big and very important topic.
We introduce the basics here, and continue in in
Chapters [-@sec:analysis-2] and [-@sec:analysis-3].

The basic idea is to describe how an algorithm behaves as the input size grows.
We do this by classifying algorithms into *complexity classes*.
We have already been doing this in earlier chapters,
when saying that Binary search is logarithmic time,
Linear search is linear time, and various sorting algorithms are quadratic time.
This is generalised by the big-$O$ notation (pronounced "big oh notation" or "ordo notation"),
using a mathematical expression for each complexity class:
we say Binary search is $O(\log(n))$, Linear search is $O(n)$
and Selection and Insertion sort are $O(n^2)$.
A big-$O$ formula cannot be used to calculate the number of seconds
it takes to sort a list, but it describes quite accurately how
execution time increases when the input size grows.

With a bit of practice, determining the complexity class of an algorithm or
a program is quick and easy.
This helps us reliably compare algorithms without running any tests.
The basic rule of thumb is that, whenever $n$ is sufficiently large,
an $O(\log(n))$ algorithm is better than an $O(n)$ algorithm, which in turn is better than an $O(n^2)$ one.
The only time we need to run benchmarks, optimise code, and tweak compiler settings
is when two algorithms are in the same complexity class.

A very important complexity class i $O(1)$, constant complexity. The $1$ here should
not be understood as the exact number $1$, but as any constant value independent of $n$.
This will make more sense after we introduce the formal definition of big-$O$ notation,
but for now any part of an algorithm where the execution time does not depend on input
size is considered constant time, $O(1)$. Swapping two elements in an array is a good
example of a tiny operation that is $O(1)$ -- it takes the same amount of time to swap
two elements in a huge array as it does in a tiny array.

#### What are we measuring?

In general, complexity can be used to measure the use of various
*computational resources* of an algorithm.
By far the most common resource is running time. When we say
Insertion sort is $O(n^2)$, we mean its execution time will grow
quadratically with the size of the input. But we can also measure
memory use: this is called *space complexity* as opposed to *time complexity*.

Using space complexity, we can give a more precise meaning to the concept of in-place
sorting (@sec:sorting-1:in-place-sorting).
An in-place algorithm typically has space complexity $O(1)$,
meaning that its memory usage is independent of the size of the input.^[
    Strictly speaking, resursive algorithms never use constant memory,
    because every resursive call uses up a little memory for book-keeping.
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

<!--
::: example
#### Example: Linear search

Recall the linear search algorithm from @sec:sorting-1:linear-search,
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
each taking constant time. There is also some initialization of the variables *arr* and *val*, and
performing a single return from the function, all of these are constant time,
and they are only performed once each.
:::
-->

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

In addition to the initialization of the variable and advancing the loops as before,
there are two basic operations:
the `if`-clause comparison and the `swap` operation.

Technically, the `swap` operation does several basic operations, but the total
time to perform a fixed number of constant time operations is still a constant.
This highlights an important aspect of big-$O$: It does not matter if we perform
one, two, or three constant time operations, the total time is still $O(1)$, since it
is independent from the input size $n$. In fact we could look at the whole if-statement
and conclude that comparing and swapping if needed is a $O(1)$, considering the whole
body of the loop a single constant time operation.

The outer $i$ loop runs $n$ times,
and for each iteration the inner $j$ loop runs at most $n$ times.
To be more precise, the inner loop first runs $n$ times,
then $n-1$ times, then $n-2$ times, and so on.
The total number of comparisons is therefore
$n+(n-1)+(n-2)+\cdots+1$, which can be simplified to $n(n+1)/2$.
This is approximately $\frac{1}{2} n^2$, meaning that
the running time is $T(n) \approx \frac{c_3}{2} n^2$.
This is proportional to $n^2$, and we call this a *quadratic* running time, $O(n^2)$
:::

Note how much detail is simplified away by using complexity classes.
We do not differentiate between $n^2$ and $\frac{1}{2}n^2$.
There is no "triangular" complexity class.
This may seem like a weakness of big-$O$, but it is in fact
a strength that makes it such a useful tool for comparing algorithms.
To convince yourself of this, consider this: runtime is only interesting
for very large $n$. All algorithms are fast for small inputs.
Even if an algorithm is $\frac{1}{100}n^2$, it is still much slower than
any $O(n)$ algorithm, for any sufficiently large $n$.



### Order of growth and time functions {#analysis-1:order-of-growth}

Imagine that you are a bookworm and you have 10,000 books divided into 100 bookshelfs.
Now you want to sort all your books so that you can search for them quickly (using binary search of course).
You use one of the sorting algorithms from [Chapter @sec:sorting-1]
and notice it takes one hour to sort the 100 books in one shelf.

- How long time will it take to sort all 10,000 books?
- If you buy a sorting robot that is 100 times faster than you are,
  will you finish sorting books in one hour?

The sorting algorithms from [Chapter @sec:sorting-1]
all have a running time proportional to $n^2$ where $n$ is the number of books.
Using our new big-$O$ notation, the algorithms have $O(n^2)$ time complexity.
This means that if you double the size of the input, the running time will quadruple.
If you multiply the input size by 100, the running time will be $100^2 = 10,000$ times longer.
So, it will take 10,000 hours for you to sort all the books,
and your very expensive sorting robot will still take 100 hours.

So maybe it is not worth the money to buy a faster robot,
but instead to try to find a sorting algorithm that has better algorithmic complexity.


#### Getting a faster computer

How much larger problems can a faster computer solve in the same amount of time?
Or, equivalently, how much larger problems can we solve if we spend more time?

A more formal way of saying "linear search takes $O(n)$ time", is that
if $T(n)$ is a *time function* that computes the exact running time of
the worst case input of size $n$, then the growth rate of $T(n)$ is $O(n)$.

Determining $T(n)$ exactly for any algorithm is complicated, and
requires a multitude of assumptions about the hardware running it.
But as a thought experiment we can assume something like $T(n)=3n+5$
for an algorithm, using some unit of time, and use that to determine
how large problems can be solved in a given timeframe.
@Tbl:problem-size-speedup shows this for some example time functions.

Time function ($T(n)$)     1 ms        10 ms        100 ms       1 second
-----------------------  ------  -----------  ------------  -------------
$2\cdot\log_2(n)$          $32$    $10^{15}$    $10^{150}$    $10^{1500}$
$n/2$                      $20$        $200$       $2,000$       $20,000$
$n$                        $10$        $100$       $1,000$       $10,000$
$n\cdot\log_2(n)/4$        $11$         $66$         $453$        $3,408$
$n^2/10$                   $10$         $31$         $100$          $316$
$2^n/20$                    $7$         $11$          $14$           $17$

: Maximum problem sizes that can be handled in 1, 10, 100 and 1,000 milliseconds
  for different various time functions. We assume that every operation takes $0.1$ ms.
  {#tbl:problem-size-speedup}

This table illustrates many important points.
The two equations $n$ and $n/2$ are both *linear*; only the value of the constant factor has changed.
In both cases, if we spend ten times more work we can solve a ten times larger problem.

The table also illustrates why a factor two speed-up is not that impressive compared to a speed-up from
linear time to logarithmic time. If we managed to double the speed of the linear function
again and again, a hundred times, the logarithmic function would still get more done even
in a modest time frame of a single second. For say an hour, the difference would
be much more extreme.

The logarithmic growth rate could be the time to find a book in your sorted bookshelf using binary search
(recall @sec:sorting-1:binary-search).
In this case we search 32 books in one millisecond.
But in 10 ms we can search in $10^{15}$ books,
and in 100 ms we can search a library with more books than there are atoms in the universe.

The *quadratic* algorithm, $n^2/10$, does not receive nearly as great an improvement
from the longer working time as a linear algorithm.
Instead of an improvement by a factor of hundred (if we let it run for 100 times longer),
the improvement is only the square root of that: $\sqrt{100}=10$.

The algorithm in between linear and quadratic, $T(n) = n\log_2(n)/4$,
improves almost like the linear one, but not quite.
Its growth rate is sometimes called *linearithmic* or *log-linear*,
and it is a common growth rate for many algorithms shown later on in this book
(for example the Mergesort algorithm in @sec:sorting-2:mergesort).
In big-$O$ notation, this is the complexity class $O(n \log n)$.

Note that something special happens in the case of the *exponential* algorithm, $T(n) = 2^n/20$.
It can only be used to solve very small problems,
and if you spend 10 times longer it can still only solve a problem of size $n+3$
(to be precise, it is $n + \log_2(10)$).
The increase in problem size for an exponential algorithm is by a constant addition, not by a multiplicative factor.
If you spend 1 second instead of 1 millisecond you can still only solve a problem of size 17,
and it would take you 15 hours to solve a problem of size 30.
A problem of size 50 will take more than 1,700 years!
Thus, exponential growth is radically different than the other growth rates shown in the table.

In summary, buying a faster computer can have some benefits, but they are of a different nature
than an algorithmic speed-up, going from a slow to a faster complexity class.


#### Plotting and tabulating growth rates

Another way of comparing different growth rates is to draw a graph.
@Fig:growthGraphs plots the six growth rate equations from @tbl:problem-size-speedup earlier.
As you can see from the graph, the difference between a linear algorithm
with cost $T(n) = n$ and a quadratic algorithm with cost $T(n) = n^2/10$
becomes tremendous as $n$ grows.
From $n > 10$ the quadratic algorithm becomes slower than the linear,
and this difference increases as $n$ grows.
This is despite the fact that $n^2/10$ has a smaller constant factor than $n$.

![
    Illustration of growth rates for the same time functions as in @tbl:problem-size-speedup.
    The right view shows the lower-left portion of the left view.
    The horizontal axis represents input size.
    The vertical axis can represent time, space, or any other measure of computational cost.
](images/growth_rates_graph.svg){#fig:growthGraphs width=100%}

The graph also shows that the equation $T(n) = n\log_2(n)/4$
grows somewhat more quickly than the linear equations,
but not nearly so quickly as the quadratic equation.
In fact, $n^a$ always grows faster than both $\log(n)^b$ and $\log(n^b)$, for all constants $a,b>1$.
We also see that exponential algorithms are prohibitively expensive for even modest values of $n$.
Note that $a^n$ grows faster than $n^b$ for all constants $a,b>1$.

Finally, @tbl:growth-rates shows the difference between the growth rates when $n$ becomes larger and larger.
<!-- OPENDSA: START -->
Once again, we see that the growth rate has a tremendous effect on the resources consumed by an algorithm.
<!-- OPENDSA: END -->


Time function  ($T(n)$)      $n=10$               $100$              $1,000$          $10^4$       $10^5$
-------------------------  --------  ------------------  -------------------  --------------  -----------
$2\cdot\log_2(n)$               $7$                $13$                 $20$            $27$         $33$
$n/2$                           $5$                $50$                $500$         $5,000$     $50,000$
$n$                            $10$               $100$              $1,000$        $10,000$    $100,000$
$n\cdot\log_2(n)/4$             $8$               $166$              $2,491$        $33,219$    $415,241$
$n^2/10$                       $10$             $1,000$            $100,000$    $10,000,000$       $10^9$
$2^n/20$                       $51$    $6\cdot 10^{28}$    $5\cdot 10^{300}$        $\cdots$     $\cdots$

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
