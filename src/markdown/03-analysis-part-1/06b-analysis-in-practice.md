
## Asymptotic analysis in practice {#analysis-1:simplification-rules}

::: TODO
- Prio 1: mention that O is an upper bound
:::

We have not yet shown a formal definition of $O$-notation, and there will not
be one in this chapter. The reason for this is that the formal definition
is much easier to digest after seeing the practical use of it.
For now, we think of $O$-notation as dividing algorithms into complexity classes.
If doubling the size of the input to an algorithm doubles the runtime
(with some rounding applied), then that algorithm is $O(n)$.

There are many advantages with the big-$O$ notation.
It allows us to analyse complex algorithms easily and
to get a grasp of how efficient they are on very big inputs.
By "easily" we mean that there are some rules of thumb that covers almost all practical cases
-- you almost never need to resort to the formal definitions of asymptotic analysis.

We have only seen a few examples of complexity classes so far, notably $O(1)$, $O(\log(n))$,
$O(n)$, and $O(n^2)$. There are however infinitely many complexity classes.
Any distinct exponent of $n$ is a separate class, cubic complexity, O($n^3$), is different
from quadratic, $O(n^2)$ and both are different from $O(n^{2.5})$ (that does not have a convenient name).
We can also combine complexity classes by multiplying them, and get things like $O(n^2 \log(n))$

This does not mean every expression is a separate complexity class.
Notably, something like $O(3n)$ is not a separate class from $O(n)$.
Writing $O(3n)$ is not mathematically incorrect, but if you ever find yourself
describing the runtime of an algorithm to be $O(3n)$, you are doing something wrong.
Essentially, $O(n)$ is the simplified form of $O(3n)$. The simplification rule is that
$O(kx)=O(x)$ for any constant $k$, so things like $4n^2$ can be simplified the same way.
This follows directly from the intuition that $O$-notation captures growth rate.

Perhaps more surprisingly, $O(n + \log(n))$ is also the same as $O(n)$.
This makes more sense when you consider that $n + \log(n)<2n$ for large $n$,
and that $O(2n)=O(n)$. The general simplification rule is that for addition,
only the *dominant term* is relevant.
Intuitively: for two expressions $x$ and $y$, $O(x+y)=O(max(x,y))$.
This is slightly oversimplified, since for concrete examples like $O(10n+n^2)$,
the maximum depends on the value of $n$. We will return to a formal definition,
but for now we are satisfied that $n^2$ term is dominant for large $n$.


Two interesting observations from these simplification rules:

- Any polynomial with degree $k$ with positive coefficients,
  $O(a_k n^k + a_{k-1} n^{k-1} + \dots + a_1 n + a_0)$ is simplified to $O(n^k)$.
  The coefficients are removed because they are constant factors, and we only keep the dominant term.
- A fully simplified $O$-expression for an algorithm with a single size parameter $n$ will never be an addition.

These simplification rules are supremely useful, because they correspond directly to
programming language operations. Performing operations in sequence corresponds to addition,
and loops correspond to multiplication.

- If a program performs an $O(n)$ operation, an $O(n^2)$ operation and another
  $O(n)$ operation in sequence, the total runtime is the sum $O(n+n^2+n)$,
  which simplifies to $O(n^2)$.
- If a loop runs $O(n)$ times, and each iteration does first a $\log(n)$ operation
  then a $O(1)$ operation, the total runtime is $O(n \times (\log(n)+1))$, which simplifies
  (with a tiny bit of algebra) to $O(n \log(n))$.

#### Complexity classes {#analysis-1:complexity-classes}

We can use the upper bound to define an ordering between complexity classes,
which makes finding the dominant term easier.
There are infinitely many complexity classes, but here are a few common ones:

$$ O(1) < O(\log(n)) < O(n) < O(n \log(n)) < O(n^2) < O(n^2 \log(n)) < O(n^3) < O(2^n) $$

Note that we have excluded many many classes, for example $O(\log(n)^2)$ and $O(\sqrt{n})$.
You can try to figure out where in the hierarchy they should be placed.


#### Analysing code fragments {#analysis-1:analysing-code-fragments}

Looking at a piece of code, and immediately determining its complexity class
is a very useful skill for any programmer.
It gives a good idea of the scalability of the code, and which
parts it is useful to optimise. If a function performs an $O(2^n)$ operation
and an $n \log(n)$ operation, spending any time optimising the latter is a
complete waste of time. The $n \log(n)$ operation will be a fraction of a
percent of the total runtime, and making it faster will reduce only ever reduce
runtime by a fraction of that.

When we want to analyse the complexity of code fragments, the following three
rules of thumb will get us very far:

- An **atomic operation** is always $O(1)$.

- A **sequence**, $\langle p_1;p_2;p_3\rangle$,
  has the complexity $O(\max(f_1,f_2,f_3))$,
  where $O(f_i)$ is the complexity of $p_i$.

- An **iteration**, $\langle\text{for } x \in A: p\rangle$,
  has the complexity $n\cdot O(n\cdot f)$,
  where $n=|A|$ and $O(f)$ is the complexity of the loop body $p$.

It is important to remember to simplify the resulting expression, and never
write things like $O(2n+1)$ (which is $O(n)$).

#### Atomic operations

Atomic operations are things like assigning a variable, looking up the value of an array index, or printing something.
Not all atomic operations take the same time to execute, but we can assume that they do not depend
on the input size of the algorithm, making them $O(1)$.
If you are unsure if something is an atomic operation, just ask yourself
"would this take longer time for a larger input to the algorithm?".

#### Function calls

The complexity of performing a function call like `insertionSort(arr)`
is just the complexity of the called function, in the case of Insertion sort
it would be $O(n^2)$ where $n$ is the size of $arr$.

A tricky case would be if the function parameter is not the input of the algorithm we analyse.
If somewhere inside an algorithm we do `insertionSort([a,b,c])` (sorting three values),
that call is not $O(n^2)$, it is $O(3^2)$, which simplifies to $O(1)$.

#### If-statements

The cost of an `if`-statement is in the worst case the greater of the costs for the `then` and `else` branches,
so we can treat `if`-statements just as sequences.
We just have to remember that we also have to look at the boolean test itself
-- it might call a function that takes some time to run, and then we have to include that too.

For example, AVL trees (@sec:search-trees:AVL-trees) can be used to store sets of elements,
and to search in an AVL tree is logarithmic in the number of elements, $O(\log(n))$.
If we have an `if`-statement where we test if an AVL tree contains a certain element,
then the test itself is logarithmic and we must not forget that.

Note that this rule of thumb does not always apply. Consider this silly example,
assuming `veryExpensiveOperation` takes $O(2^n)$ time:

    if 1==0:
        veryExpensiveOperation()

Clearly, this is constant time, not exponential, since the condition is always false.
Ultimately, this comes down to having a good understanding of what the worst case is.
Consider this example, that runs an expensive operation for all prime numbers between $0$ and $n$:

    for i from 0 to n:
        if is_prime(i):
            expensiveOperation()

The worst case is that all numbers are prime numbers, but that is not how prime number works.
This particular example would require serious mathematics to give a good estimate of how often
the `if`-statement can be true for a given n. This goes to show


#### For-each-loops

What if we perform some operation $p$ for each element in an array $A$, what is the complexity?
It depends on the size of the array, and the complexity of $p$. Note that $p$ can be a complex operation, for example a loop itself. Consider this code snippet:

    sum = 0
    for a in arr:
        for b in arr:
            sum += a*b

The statement `sum += a*b` performs a multiplication, and addition and a variable assignment,
all of which are atomic operations, so the statement is $O(1)$.
If $arr$ has $n$ elements, the inner for loop does $O(n)$
iterations for each iteration of the outer loop, which in turn does $O(n)$ iterations.
That makes the whole runtime $O(n \cdot n \cdot 1)$, which simplifies to $O(n^2)$.

*Don't be fooled by loops*!
Not all loops runs $n$ iterations, for example our array $arr$ could very well consist of $n^2$ elements,
or not depend on $n$ at all.
If $arr$ had $n^2$ elements, then the complexity is of the example would be $n^2 \cdot n^2 \cdot 1$,
which simplifies to $O(n^4)$.

#### While-loops

Other kinds of loops, such as `while`-loops, are treated in a similar way.
We calculate how many times the loop will iterate and then multiply with the complexity of the loop body.
But it can be more or less difficult to know how many times it will iterate:
we have to look at the variables that are referred by the loop condition
and then analyse how these variables change in each iteration.

For example, the pseudocode for Insertion sort (@sec:sorting-1:insertion-sort) contains a `while`-loop
which says that $j\geq 0$.
So to know how many times the loop will iterate,
we have to know how $j$ is initialised and how it changes in each iteration.
The starting value is $j=i$, and it is decreased by 1 in each iteration.
So the `while`-loop will iterate $i$ times in the worst case.

Just like `if`-statements, `while`-loops are often very simple to analyse
but sometimes quite devious.
In general, even determining if a `while`-loop terminates can be a genuinely hard problem to solve.

#### A general approach

There is a completely fool proof method of determining complexity of any piece of code:
Look at each line of code and answer:

- How many times is the line executed (if it is inside a loop)?
- What is the (average) complexity of running it?

Then, just multiply the two numbers for each line, sum up the expressions for all lines of code, and simplify.
I practice, the last step just means circling the line that has the worst complexity.
Of course, the caveat of this method is that sometimes one or both of the questions above are non-trivial to answer.
Still, for very many programs, this method works beautifully.

Look at this example code snippet, taking an array of size $n$, and doing something.
To determine the complexity, we do not even need to understand what the function does,
every piece of executable code has a complexity, even code that does not work.
In the example, we have annotated each line of code with a comment on the form:
`number of executions*complexity=total time`.

    hasDouble(arr):
        result = false                      // O(1)*O(1)=O(1)
        for x in A:                         // runs O(n) iterations
            double = x*2                    // O(n)*O(1)=O(n)
            if linearSearch(A, double):     // O(n)*O(n)=O(n^2)
                result = true               // O(n)*O(1)=O(n)
        return result                       // O(1)*O(1)=O(1)

The only remaining work is looking at all the comments and seeing that $O(n^2)$ is the dominant term.
The function is $O(n^2)$. There are some potential pitfalls here.

- The comments assume that `linearSearch` is $O(n)$, which seems reasonable.
But if the line `double=x*2` is changed to `double=arr[0]`, that makes `linearSearch`
$O(1)$ in this context, and the whole function would be $O(n)$.

- The comment `result = true` only runs `O(n)` times if we assume that the
Linear search can return true often enough.
Determining if this is possible would require a more careful analysis,
where we actually construct a worst case. Luckily, that does not matter since
the function will be `O(n^2)` even if the search always returns false.
See if you can come up with a case where the search succeeds $O(n)$ times
(hint: it does not have to be true all the time, being true $n-1$ or $n/2$
is still $O(n)$).

#### Binary search, again

Let us return to the example of binary search, but pretend we don't know anything
about search intervals to see if the code analysis method works.
To spice things up, this is a different and slightly obfuscated implementation
of the algorithm.

    binarySearch(arr, key):
        start = 0
        size = arr.length
        while size>0:
            mid = start + size/2
            if arr[mid] == key:
                return mid
            else if arr[mid] < key:
                start = mid+1
                size = size-1
            size = size / 2       // happens at most log(n) times
        return null

Every individual operation is atomic, so the only question is how many time the loop runs.
Ignoring `size=size-1` (which we can do if we assume the condition is always false),
this is a clean example of a loop that starts with $size=n$,
then cuts $size$ in half (using integer division) until it
reaches 0. All such loops run $O(\log(n))$ iterations, so every individual
line inside the loop has a total runtime of $O(\log(n))$,
which is thus the runtime of the whole function.

Try applying a few algorithms earlier in the book,
or to some code you have written before, and see if you can determine the
complexity correctly.
