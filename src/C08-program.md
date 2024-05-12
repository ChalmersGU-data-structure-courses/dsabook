
## Calculating Program Running Time

This modules discusses the analysis for several simple code fragments.
We will make use of the algorithm analysis simplifying rules:

1.  If $f(n)$ is in $O(g(n))$ and $g(n)$ is in $O(h(n))$, then $f(n)$ is
    in $O(h(n))$.
2.  If $f(n)$ is in $O(k g(n))$ for any constant $k > 0$, then $f(n)$ is
    in $O(g(n))$.
3.  If $f_1(n)$ is in $O(g_1(n))$ and $f_2(n)$ is in $O(g_2(n))$, then
    $f_1(n) + f_2(n)$ is in $O(\max(g_1(n), g_2(n)))$.
4.  If $f_1(n)$ is in $O(g_1(n))$ and $f_2(n)$ is in $O(g_2(n))$, then
    $f_1(n) f_2(n)$ is in $O(g_1(n) g_2(n))$.

::::: {#AssignAnal}
:::: topic
#### Example {-}

We begin with an analysis of a simple assignment to an integer variable.

```python
a = b
```

```java
a = b;
```

```java
a = b;
```



Because the assignment statement takes constant time, it is $\Theta(1)$.
::::
:::::

::::: {#FLAnal}
:::: topic
#### Example {-}

Consider a simple `for` loop.

```python
sum = 0
for i in range(n):
    sum += n
```

```java
sum = 0;
for (i=1; i<=n; i++) {
   sum += n;
}
```

```java
sum = 0;
for (i=1; i<=n; i++)
    sum += n;
```



The first line is $\Theta(1)$. The `for` loop is repeated $n$ times. The
third line takes constant time so, by simplifying rule (4), the total
cost for executing the two lines making up the `for` loop is
$\Theta(n)$. By rule (3), the cost of the entire code fragment is also
$\Theta(n)$.
::::
:::::

:::: topic
#### Example {-}

We now analyze a code fragment with several `for` loops, some of which
are nested.

```python
sum = 0
for j in range(n):     # First for loop
    for i in range(j): # is a double loop
        sum += 1
for k in range(n):     # Second for loop
    A[k] = k
```

```java
sum = 0;
for (j=1; j<=n; j++) {     // First for loop
  for (i=1; i<=j; i++) {  //   is a double loop
    sum++;
  }
}
for (k=0; k<n; k++) {      // Second for loop
   A[k] = k;
}
```

```java
sum = 0;
for (j=1; j<=n; j++) {     // First for loop
    for (i=1; i<=j; i++) { // is a double loop
        sum++;
    }
}
for (k=0; k<n; k++) {      // Second for loop
    A[k] = k;
}
```



This code fragment has three separate statements: the first assignment
statement and the two `for` loops. Again the assignment statement takes
constant time; call it $c_1$. The second `for` loop is just like the one
in Example [#FLAnal](#FLAnal) and takes
$c_2 n = \Theta(n)$ time.

The first `for` loop is a double loop and requires a special technique.
We work from the inside of the loop outward. The expression `sum++`
requires constant time; call it $c_3$. Because the inner `for` loop is
executed $j$ times, by simplifying rule (4) it has cost $c_3j$. The
outer `for` loop is executed $n$ times, but each time the cost of the
inner loop is different because it costs $c_3j$ with $j$ changing each
time. You should see that for the first execution of the outer loop, $j$
is 1. For the second execution of the outer loop, $j$ is 2. Each time
through the outer loop, $j$ becomes one greater, until the last time
through the loop when $j = n$. Thus, the total cost of the loop is $c_3$
times the sum of the integers 1 through $n$. We know that

$$
\begin{eqnarray}
\sum_{i = 1}^{n} i &=& \frac{n (n+1)}{2}
\end{eqnarray}
$$

which is $\Theta(n^2)$. By simplifying rule (3),
$\Theta(c_1 + c_2 n + c_3 n^2)$ is simply $\Theta(n^2)$.
::::

:::: topic
#### Example {-}

Compare the asymptotic analysis for the following two code fragments.

```python
sum1 = 0
for i in range(n):     # First double loop
    for j in range(n): # do n times
        sum1 += 1

sum2 = 0
for i in range(n)      # Second double loop
    for j in range(i): # do i times
        sum2 += 1
```

```java
sum1 = 0;
for (i=1; i<=n; i++) {     // First double loop
  for (j=1; j<=n; j++) {  //   do n times
    sum1++;
  }
}

sum2 = 0;
for (i=1; i<=n; i++) {     // Second double loop
  for (j=1; j<=i; j++) {  //   do i times
    sum2++;
  }
}
```

```java
sum1 = 0;
for (i=1; i<=n; i++) {     // First double loop
    for (j=1; j<=n; j++) { // do n times
        sum1++;
    }
}

sum2 = 0;
for (i=1; i<=n; i++) {     // Second double loop
    for (j=1; j<=i; j++) { // do i times
        sum2++;
    }
}
```



In the first double loop, the inner `for` loop always executes $n$
times. Because the outer loop executes $n$ times, it should be obvious
that the statement `sum1++` is executed precisely $n^2$ times. The
second loop is similar to the one analyzed in the previous example, with
cost $\sum_{j = 1}^{n} j$. This is approximately $\frac{1}{2} n^2$.
Thus, both double loops cost $\Theta(n^2)$, though the second requires
about half the time of the first.
::::

:::: topic
#### Example {-}

Not all doubly nested `for` loops are $\Theta(n^2)$. The following pair
of nested loops illustrates this fact.

```python
sum1 = 0
k = 1
while k <= n:          # Do log n times
    for j in range(n): # do n times
        sum1 += 1
    k *= 2

sum2 = 0
k = 1
while k <= n:          # Do log n times
    for j in range(k): # do k times
        sum2 += 1
    k *= 2
```

```java
sum1 = 0;
for (k=1; k<=n; k*=2) {    // Do log n times
  for (j=1; j<=n; j++) {  // Do n times
    sum1++;
  }
}

sum2 = 0;
for (k=1; k<=n; k*=2) {    // Do log n times
  for (j=1; j<=k; j++) {  // Do k times
    sum2++;
  }
}
```

```java
sum1 = 0;
for (k=1; k<=n; k*=2) {    // Do log n times
    for (j=1; j<=n; j++) { // do n times
        sum1++;
    }
}

sum2 = 0;
for (k=1; k<=n; k*=2) {    // Do log n times
    for (j=1; j<=k; j++) { // do k times
        sum2++;
    }
}
```



When analyzing these two code fragments, we will assume that $n$ is a
power of two. The first code fragment has its outer `for` loop executed
$\log n+1$ times because on each iteration $k$ is multiplied by two
until it reaches $n$. Because the inner loop always executes $n$ times,
the total cost for the first code fragment can be expressed as

$$
\begin{eqnarray}
\sum_{i=0}^{\log n} n &=& n \log n
\end{eqnarray}
$$

So the cost of this first double loop is $\Theta(n \log n)$. Note that a
variable substitution takes place here to create the summation, with
$k = 2^i$.

In the second code fragment, the outer loop is also executed $\log n+1$
times. The inner loop has cost $k$, which doubles each time. The
summation can be expressed as

$$
\begin{eqnarray}
\sum_{i=0}^{\log n} 2^i &=& \Theta(n)
\end{eqnarray}
$$

where $n$ is assumed to be a power of two and again $k = 2^i$.
::::

<!-- TODO
We need to think about a technique for visualizing the running time of
some loop constructs. This can be very similar to how we visualize
reaching the closed form solution of summations.
-->

What about other control statements? `While` loops are analyzed in a
manner similar to `for` loops. The cost of an `if` statement in the
worst case is the greater of the costs for the `then` and `else`
clauses. This is also true for the average case, assuming that the size
of $n$ does not affect the probability of executing one of the clauses
(which is usually, but not necessarily, true). For `switch` statements,
the worst-case cost is that of the most expensive branch. For subroutine
calls, simply add the cost of executing the subroutine.

There are rare situations in which the probability for executing the
various branches of an `if` or `switch` statement are functions of the
input size. For example, for input of size $n$, the `then` clause of an
`if` statement might be executed with probability $1/n$. An example
would be an `if` statement that executes the `then` clause only for the
smallest of $n$ values. To perform an average-case analysis for such
programs, we cannot simply count the cost of the `if` statement as being
the cost of the more expensive branch. In such situations, the technique
of [amortized analysis]{.term} can come to the rescue.

Determining the execution time of a recursive subroutine can be
difficult. The running time for a recursive subroutine is typically best
expressed by a recurrence relation. For example, the recursive factorial
function calls itself with a value one less than its input value. The
result of this recursive call is then multiplied by the input value,
which takes constant time. Thus, the cost of the factorial function, if
we wish to measure cost in terms of the number of multiplication
operations, is one more than the number of multiplications made by the
recursive call on the smaller input. Because the base case does no
multiplications, its cost is zero. Thus, the running time for this
function can be expressed as

$$
\begin{eqnarray}
T(n) &=& T(n-1) + 1, \textrm{ for } n>1 \\
T(1) &=& 0
\end{eqnarray}
$$

The closed-form solution for this recurrence relation is $\Theta(n)$.

### Case Study: Two Search Algorithms

The final example of algorithm analysis for this section will compare
two algorithms for performing search in an array. Earlier, we determined
that the running time for sequential search on an array where the search
value $K$ is equally likely to appear in any location is $\Theta(n)$ in
both the average and worst cases. We would like to compare this running
time to that required to perform a [binary search]{.term} on an array whose values are stored in order from lowest to
highest. Here is a visualization of the binary search method.

<inlineav id="binarySearchCON" src="Searching/binarySearchCON.js" name="Binary Search Algorithm Slideshow" links="Searching/binarySearchCON.css"/>

### Binary Search Practice Exercise

<avembed id="binarySearchPRO" src="Searching/binarySearchPRO.html" type="pe" name="Binary Search Proficiency Exercise"/>

### Analyzing Binary Search

<inlineav id="BsearchDandCRecurCON" src="AlgAnal/BsearchDandCRecurCON.js" name="Binary Search recurrence slideshow" links="AlgAnal/BsearchDandCRecurCON.css"/>

Function `binarySearch` is designed to find the (single) occurrence of
$K$ and return its position. A special value is returned if $K$ does not
appear in the array. This algorithm can be modified to implement
variations such as returning the position of the first occurrence of $K$
in the array if multiple occurrences are allowed, and returning the
position of the greatest value less than $K$ when $K$ is not in the
array.

Comparing sequential search to binary search, we see that as $n$ grows,
the $\Theta(n)$ running time for sequential search in the average and
worst cases quickly becomes much greater than the $\Theta(\log n)$
running time for binary search. Taken in isolation, binary search
appears to be much more efficient than sequential search. This is
despite the fact that the constant factor for binary search is greater
than that for sequential search, because the calculation for the next
search position in binary search is more expensive than just
incrementing the current position, as sequential search does.

Note however that the running time for sequential search will be roughly
the same regardless of whether or not the array values are stored in
order. In contrast, binary search requires that the array values be
ordered from lowest to highest. Depending on the context in which binary
search is to be used, this requirement for a sorted array could be
detrimental to the running time of a complete program, because
maintaining the values in sorted order requires a greater cost when
inserting new elements into the array. This is an example of a tradeoff
between the advantage of binary search during search and the
disadvantage related to maintaining a sorted array. Only in the context
of the complete problem to be solved can we know whether the advantage
outweighs the disadvantage.

### Summary Exercise

<avembed id="AnalProgramSumm" src="AlgAnal/AnalProgramSumm.html" type="ka" name="Program Code Analysis Exercise"/>
