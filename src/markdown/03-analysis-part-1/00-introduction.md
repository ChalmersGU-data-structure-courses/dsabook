
# Algorithm analysis, part 1 {#analysis-part-1}

::: TODO
- Prio 3: also write about correctness, e.g. invariants
- Prio 3: is the bullet list fine?
:::


<!-- START NOTES -->

The basic idea of complexity analysis is to abstract away details so that we can see how an algorithm behaves in general, for very big inputs.

- The input is simplified to one single number (often written $n$). Usually not the size in bytes, because this depends on your specific computer, programming language, etc. Instead it can be the size of the array, or the length of the string, or the number of edges in the graph, etc.
- We remove constant factors, because these depend on your specific computer, programming language, etc. So, instead of writing $34.3 n^2$ we just write $n^2$.
- We remove lower-order terms, because they will not matter when the input becomes large enough. So, instead of writing $n\log(n) + n^2 + n^2\log(n) + 999999$, we just write $n^2\log(n)$.

#### Computational complexity of an algorithm

What is *computational complexity*?
- How much resources does an algorithm use, in relation to quantitative properties of its input?

What is an *algorithm*?
- Any well-defined procedure to solve a problem.

What are *resources*?
- Time (runtime): called "time complexity". Often we don't use actual time, but instead we can use some proxy, such as the number of comparisons, or array accesses, or variable assignments, or arithmetical operations.
- Space (memory, storage): called "space complexity". Often we don't use actual computer memory in bytes, but instead use some proxy, such as array size, or number of objects of a certain kind.

What are *quantitative properties of the input*?
- Most often we use some kind of size: size of the input array, or length of the input string, or number of objects in a general data structure.
- Sometimes it can be just the input itself (if the input is a number).
- It can sometimes be multiple numbers (such as the sizes of two sets).

The computational complexity is a mathematical function from some input parameter (we often use $n$) to some measure of resource usage -- we often use $T(n)$ for time complexity and $S(n)$ for space complexity. (But we will only use $T(n)$ below.)

Note that the exact runtime for $T(n)$ depends...
- ...theoretically: on your model of computation
- ...in practice: on details of your implementation, programming language, operating system, computer hardware, etc. etc.
- ...but also on how your input looks like! (For example, Insertion sort behaves much better if the array is already sorted)

So, exact values of $T(n)$ are not relevant. What matters is the asymptotic behaviour of $T(n)$ as $n$ grows large.

Asymptotic complexity = "the order of growth of the complexity function".

#### Different kinds of input

We can talk about the *best-case*, or the *worst-case*, or even the *average-case* complexity of an algorithm. But in practice we almost always only use the worst-case complexity: the best case is pretty useless (we should always prepare for the worst), and the average case is difficult to reason about.

- The best case is quite useless -- we should always prepare for the worst.
- The average case is difficult to reason about -- for example we need to know what distribution the input has, and this is difficult.
- The worst case is what we usually analyse -- it is much easier to calculate than the average case, and it gives valuable information about what might happen if we are unlucky.

The worst case is particularly important if you cannot guarantee that the data is not contaminated -- for example by a malicious hacker.

The average case can be very useful if we know more about the data. For example, if we know that our input is *almost* sorted, then Insertion sort suddenly becomes a really really efficient algorithm.

#### Order of growth, the big-O notation

More formally we use the big-O notation, which has a precise mathematical definition (to be discussed in a later lecture). This allows us to say things like the following:

- Binary search is a logarithmic algorithm, meaning that the worst-case complexity is $O(\log(n))$.
- Linear search is $O(n)$.
- Selection and Insertion sort are quadratic algorithms, or $O(n^2)$.

There are of course some problems with too much simplification. For example, the sorting algorithms in this chapter are all quadratic, so one could think that they are all equally good. But in practice Bubble sort is almost always slower than the other algorithms, because it has a larger constant factor. But we cannot see this if we use big-O notation since it removes all constant factors -- to know this we have to analyse the algorithms in more depth.

But there are so many advantages with big-O. It allows us to analyse complex algorithms easily and to get a grasp of how efficient they are on very big inputs. By "easily" I mean that there are some rules of thumb that covers almost all practical cases. But first you have to learn the *complexity hierarchy* (this is just part of it):

$$
O(1) < O(\log(n)) < O(n) < O(n \log(n)) < O(n^2) < O(n^3) < \ldots < O(2^n) < \ldots
$$

And here are the basic laws that everyone should know by heart:

- *Addition*:  $O(f) + O(g)  =  O(f + g)  =  O(\max(f,g))$  [=  $O(f)$  if $O(g) \leq O(f)$]
- *Multiplication*:  $O(f) \cdot O(g)  =  O(f \cdot g)$
- *Constant factor*:  $k \cdot O(f)  =  O(f)$  [because $k = O(1)$, which is $\leq O(f)$]

(Note that $O(f)$ is just a shorter way of writing of $O(f(n))$ -- so $f$ and $g$ are functions that depend on the input size $n$, while $k$ is a constant that does not depend on $n$.)

From these laws we can infer some rules of thumb for analysing algorithms:

- Any constant-time operation is $O(1)$.
- The complexity of a sequence of statements ($p;q;r$) is the same as the *slowest* of the statements.
    - this is because running statements in a sequence means *adding* their running times
    - so if we assume that $q$ is the slowest statement, meaning that
      $O(p) < O(q)$ and $O(r) < O(q)$, then $O(p;q;r) = O(p) + O(q) + O(r) = O(q)$
    - note: this only works if there is a constant number of statements! otherwise it is a loop that depends on $n$
- If we have a loop that repeats a statement $p$ a number of times (say $O(n)$ times), then the complexity is $O(n) \cdot O(p)$
    - note: if the loop is only run a constant $k$ number of iterations, then we can disregard the constant, because $k \cdot O(p) = O(1) \cdot O(p) = O(p)$

#### How to use the rules for big-O

So how do we analyse the sorting algorithms? Both Selection and Insertion sort have a very simple structure -- it's just a loop within a loop. The outer loop makes $n$ iterations, and the inner loop makes anything from 1 to $n$ iterations. The worst case of the inner loop is then $O(n)$, and the outer loop is $O(n)$, so in total we get $O(n^2)$.

But what about binary search? Here we have a single loop, but how many iterations does it make? At each iteration the search interval is halved, and we stop when the interval is only one element. So, how many times can we halve a number until it becomes 1? This is done by the 2-logarithm: binary search iterates at most $\log_2(n)$ times (rounded upwards). So, the loop is iterated a logarithmic number of times, $O(\log(n))$, and the loop body is constant, $O(1)$. Therefore binary search is logarithmic.

#### Logarithmic order of growth

But wait, why do we write $\log(n)$ instead of $\log_2(n)$? This is a fun consequence of the logarithm law that $\log_a(b) = \log_a(n) / \log_b(n)$:

- Therefore $\log_a(n) = \log_b(n) \cdot \log_a(b)$.
- But $\log_a(b)$ is a constant that doesn't depend on $n$, and we can disregard all constant factors inside big-O!
- So we can ignore the logarithmic base and just write $O(\log(n))$.

Another consequence of the logarithm laws is that $O(\log(n)) = O(\log(n^2)) = O(\log(n^3))$.

But note that $O(\log(n)) < O(\log(n)^2) < O(\log(n)^3) < ...$ (sometimes math is weird).

#### How to decide $n$

Most of the times it is quite straightforward to decide what $n$ is for a given type of input. For example, if the input is an array, then $n$ is normally the length of the array. If the input is a binary search tree, then $n$ is usually the number of nodes. If we want to analyse a set or a dictionary, we can let $n$ be the number of elements (or keys) in the set (or dictionary).

But how about a graph? Should we analyse depending on the number of vertices or the number of edges?

And sometimes we might want to use a different $n$ of some reason. For example, if we analyse Insertion sort, $n$ could be a measure of how sorted the array is (there are several ways to measure this) -- but this is uninteresting if we analyse Selection sort.

<!-- END NOTES -->

-----------------------

How long will a program take when I run it on a dataset ten times as
large? If a particular program is slow, is it badly implemented or is it
solving a hard problem? What order of improvement can I expect if I
switch to a better algorithm? Questions like these ask us to consider
the difficulty of a problem and the efficiency of approaches to solving
it.

This chapter introduces the motivation, basic notation, and fundamental
techniques of algorithm analysis. We focus on a methodology known as
[asymptotic algorithm analysis]{.term}, or
simply [asymptotic analysis]{.term}.

Asymptotic analysis estimates the resource consumption of an algorithm,
called its [complexity]{.term}. Here, resource
consumption can mean runtime, memory use, API calls, or any other
measure. Instead of computing this resource consumption exactly,
asymptotic analysis is only interested in its
[growth rate]{.term} (also called
[order of growth]{.term}). The growth rate is
what determines the resource consumption for large inputs. Thankfully,
growth rate expressions are relatively easy to compare. This allows us
to decide which of two algorithms is better at solving the same problem.
Asymptotic analysis also gives algorithm designers a tool for estimating
whether a proposed solution is likely to meet the resource constraints
for a problem before they implement an actual program.

After reading this chapter, you should understand:

-   The concept of [complexity]{.term} of an
    algorithm, the resource usage of an algorithm as a function of an
    input parameter. Different kinds of complexity such as
    [worst-case]{.term} and
    [average-case]{.term}.
-   The concept of [growth rate]{.term} or
    [order of growth]{.term} of a (mathematical)
    function. How to compute and compare growth rates of functions.
    Notations such as [big-$O$](#big-o-notation){.term} to describe upper and lower bounds of growth rates.
-   The [asymptotic complexity]{.term} of an
    algorithm, which is the growth rate of its complexity. Sometimes,
    this is just called the growth rate of the algorithm.
-   The difference between the asymptotic complexity of an
    [algorithm]{.term} (or program) and that of
    a [problem]{.term}. The latter is the best
    asymptotic complexity over all algorithms that solve the problem.

The chapter concludes with a brief discussion of the practical
difficulties encountered when empirically measuring the cost of a
program, and some principles for code tuning to improve program
efficiency.
