
### Simplification rules {#analysis-1:simplification-rules}

::: TODO
- Prio 2: briefly discuss functions and non-atomic statements
:::

There are many advantages with the big-$O$ notation.
It allows us to analyse complex algorithms easily and
to get a grasp of how efficient they are on very big inputs.
By "easily" we mean that there are some rules of thumb that covers almost all practical cases
-- you almost never need to resort to the formal definitions of asymptotic analysis.


(1) **Transitivity**:
    If $f\in O(g)$ and $g\in O(h)$, then $f\in O(h)$.
    \
    <!-- OPENDSA: START -->
    This first rule says that if some function $g(n)$ is an upper bound for your cost function,
    then any upper bound for $g(n)$ is also an upper bound for your cost function.
    <!-- OPENDSA: END -->
    \

(2) **Constant factor**:
    If $f\in O(g)$, then $k\cdot f\in O(g)$, for any constant $k>0$.
    \
    <!-- OPENDSA: START -->
    The significance of this rule is that you can ignore any multiplicative constants
    in your equations when using big-$O$ notation.
    <!-- OPENDSA: END -->

      - **Special case**: $O(k) = O(1)$ for all constants $k>0$
    \

(3) **Addition**:
    If $f\in O(g)$ and $f'\in O(g')$, then $f+f' \in O(\max(g,g'))$.
    \
    <!-- OPENDSA: START -->
    This rule says that given two parts of a program run in sequence
    (whether two statements or two sections of code),
    you need consider only the more expensive part.
    <!-- OPENDSA: END -->

      - **Special case**: if $f,f'\in O(g)$, then $f+f' \in O(g)$
    \

(4) **Multiplication**:
    If $f\in O(g)$ and $f'\in O(g')$, then $f\cdot f' \in O(g\cdot g')$
    \
    <!-- OPENDSA: START -->
    The final rule is used to analyse simple loops in programs.
    If some action is repeated some number of times, and each repetition has the same cost,
    then the total cost is the cost of the action multiplied by
    the number of times that the action takes place.
    <!-- OPENDSA: END -->

<!-- OPENDSA: START -->
Taking the first three rules collectively, you can ignore all constants and
all lower-order terms to determine the asymptotic growth rate for any cost function.
The advantages and dangers of ignoring constants were discussed in @sec:analysis-1:asymptotic-analysis.

Ignoring lower-order terms is reasonable when performing an asymptotic analysis.
The higher-order terms soon overpower the lower-order terms as $n$ becomes larger.
<!-- OPENDSA: END -->
Thus, if $f(n) = 3 n^4 + 5 n^2$, then $f(n)$ is in $O(n^4)$.
The $n^2$ term contributes relatively little to the total cost for large $n$.

There are of course some problems with too much simplification.
For example, the sorting algorithms in [Chapter @sec:sorting-1] are all quadratic,
so one could think that they are all equally good.
However, in practice Bubble sort is almost always slower than the other algorithms,
because it has a larger constant factor.
But we cannot see this if we use big-$O$ notation since it removes all constant factors
-- to know this we have to analyse the algorithms in more depth.

But regardless of the problems, we will from now on use these simplifying rules
when discussing the cost for a program or an algorithm.


### Complexity classes {#analysis-1:complexity-classes}

We can use the upper bound to define an ordering between complexity classes,
where we write $O(f)\leq O(g)$ for $f\in O(g)$.
There are infinitely many complexity classes, but the most common ones are the following:

$$ O(1) < O(\log(n)) < O(n) < O(n \log(n)) < O(n^2) < O(n^2 \log(n)) < O(n^3) < \cdots < O(2^n) < \cdots $$

Note that we have excluded many many classes, for example $O(\log(n)^2)$ and $O(\sqrt{n})$.
You can try to figure out where in the hierarchy they should be placed.


### Analysing code fragments {#analysis-1:analysing-code-fragments}

When we want to analyse the complexity of code fragments, the following three rules of thumb will get us very far:

- An **atomic operation** is always $O(1)$

- A **sequence**, $\langle p_1;p_2;p_3\rangle$,
  has the complexity $O(\max(f_1,f_2,f_3))$,
  where $p_i\in O(f_i)$

- An **iteration**, $\langle\text{for } x \in A: p\rangle$,
  has the complexity $n\cdot O(f) = O(n\cdot f)$,
  where $n=|A|$ and $p\in O(f)$

#### Atomic operations

Atomic operations are things like assigning a variable, looking up the value of an array index, or printing something.
Not all atomic operations take the same time to execute, but we can assume that they are always constant.

If an operation takes constant time, $f(n) = k$, then $f\in O(1)$, so we can assume that all atomic operations are $O(1)$.

#### Sequences of operations

A sequence of atomic operations, such as performing 10 assignments, is still constant (multiplying a constant with 10 is still constant).
But what if we have a sequence of non-atomic operations?

For example, suppose that we have the three operations $p_1\in O(f_1)$, $p_2\in O(f_2)$, and $p_3\in O(f_3)$.
The complexity of the sequence $\langle p_1; p_2; p_3\rangle$ will then be sum of the parts, that is:

$$
\langle p_1; p_2; p_3\rangle \in O(f_1) + O(f_2) + O(f_3) = O(\max(f_1, f_2, f_3))
$$

#### If-statements

The cost of an `if`-statement is in the worst case the greater of the costs for the `then` and `else` branches,
so we can treat `if`-statements just as sequences.
We just have to remember that we also have to look at the boolean test itself
-- it might call a function that takes some time to run, and then we have to include that too.

For example, AVL trees (@sec:search-trees:AVL-trees) can be used to store sets of elements,
and to search in an AVL tree is logarithmic in the number of elements, $O(\log(n))$.
If we have an `if`-statement where we test if an AVL tree contains a certain element,
then the test itself is logarithmic and we must not forget that.

#### For-loops

What if we perform some operation $p\in O(f)$ for each element in an array $A$, what is the complexity?
It depends on the size of the array: if we assume that the array has $n$ elements, what is the complexity of the following loop?

$$
\text{for } x \in A: p
$$

The loop performs $p$ once for every element in $A$, meaning that $p$ will be executed $n$ times.
Therefore the complexity of a loop is:

$$
\langle\text{for } x \in A: p\rangle \in n\cdot O(f) = O(n\cdot f)
$$

Note that $p$ can be a complex operation, for example a loop itself.
If $p$ is a simple loop over A, with a constant-time operation in its body, then $p\in O(n)$.
And then the outer loop $\langle\text{for } x \in A: p\rangle$ will be in $n\cdot O(n) = O(n^2)$.

*Don't be fooled by loops*!
Not all loops runs $n$ iterations, for example our array $A$ could very well consist of $n^2$ elements,
or not depend on $n$ at all.
If the loop iterates over $n^2$ elements then the complexity is of course $O(n^2\cdot f)$.

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

