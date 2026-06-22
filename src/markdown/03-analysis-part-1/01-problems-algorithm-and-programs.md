
## Problems, algorithms, and programs {#analysis-1:problems-and-algorithms}

::: TODO
- Prio 2: Flatten subsections?
- Prio 2: Shorten the text
:::

<!-- OPENDSA: START -->
Programmers commonly deal with *problems*, *algorithms*, and computer *programs*.
These are three distinct concepts.
<!-- OPENDSA: END -->

### Problems

<!-- OPENDSA: START -->
As your intuition would suggest, a [problem]{.term} is a task to be performed. It is best thought of in terms
of inputs and matching outputs. A problem definition should not include
any constraints on *how* the problem is to be solved. The solution
method should be developed only after the problem is precisely defined
and thoroughly understood. However, a problem definition should include
constraints on the resources that may be consumed by any acceptable
solution. For any problem to be solved by a computer, there are always
such constraints, whether stated or implied. For example, any computer
program may use only the main memory and disk space available, and it
must run in a "reasonable" amount of time.
<!-- OPENDSA: END -->

You have already encountered two fundamental computational problems:

Searching in an array
:   The input is an array and an element, and the output can for example be an array index.
    (@Sec:intro:searching)

Sorting an array
:   The input is an array, and the output is an array containing exactly the same elements but in increasing order.
    ([Chapter @sec:sorting-1])

Note that the input to a problem often includes things that we normally don't view as input.
For example, for the problem of finding the fastest route between two cities (see @sec:graphs:shortest-path),
it is obvious that we need to know the two cities and the road network.
But if we want to calculate the travel time accurately, we also need information about what vehicle we will use,
and perhaps even the weather conditions.
So these should also be inputs to the problem.

### Algorithms

An [algorithm]{.term} is a method or a process followed to solve a problem.
There are usually many different algorithms that solves a given problem.
For example, for the important problem of sorting there are over a dozen commonly used algorithms!
(Some of them are discussed in [Chapters @sec:sorting-1;@sec:sorting-2].)

An algorithm can be viewed as an implementation of a [function]{.term} in the mathematical sense.
But note that there are usually several ways of implementing the same functions
-- and each of those give rise to a different algorithm.

<!-- OPENDSA: START -->
The advantage of knowing several solutions to a problem is that
solution **A** might be more efficient than solution **B**
for a specific variation of the problem,
or for a specific class of inputs to the problem,
while solution **B** might be more efficient than **A** for another variation or class of inputs.
For example, one sorting algorithm might be the best for sorting a small collection of integers,
a second might be the best for sorting a large collection of general objects, and
a third might be the best for sorting a collection of variable-length strings.

Something can only be called an algorithm if it has all of the following properties:
<!-- OPENDSA: END -->

1.  <!-- OPENDSA: START -->
    It must be *correct*.
    In other words, it must implement the desired function, converting each input a correct output.
    Note that every algorithm implements some function, because every algorithm maps every input to some output
    (even if that output is a program crash).
    At issue here is whether a given algorithm implements the *intended* function.
    <!-- OPENDSA: END -->

2.  <!-- OPENDSA: START -->
    It is composed of a series of *concrete steps*.
    Concrete means that the action described by that step is completely understood
    -- and doable -- by the person or machine that performs the algorithm.
    Each step must also be doable in a finite amount of time.
    Thus, the algorithm gives us a "recipe" for solving the problem by performing a series of steps,
    where each such step is within our capacity to perform.
    The ability to perform a step can depend on who or what is intended to execute the recipe.
    For example, the steps of a cookie recipe in a cookbook might be considered sufficiently concrete for instructing a human cook,
    but not for programming an automated cookie-making factory.
    <!-- OPENDSA: END -->

3.  There must be *no ambiguity* about which step is performed next.
    Typically, the next step follows directly from the algorithm's description.
    This doesn't exclude selection mechanisms, such as **if** statements,
    as long as the selection is unambiguous at the moment the decision is made.
    Note that a random choice (such as acting on a coin flip) is unambiguous in this sense,
    because when we have tossed the coin we know what decision we will make.

4.  <!-- OPENDSA: START -->
    It must be composed of a *finite* number of steps.
    If the description for the algorithm were made up of an infinite number of steps,
    we could never hope to write it down, nor implement it as a computer program.
    <!-- OPENDSA: END -->
    To be able to specify complex algorithms in finite space,
    our algorithm description language (including English, Swedish and "pseudocode")
    must have some way of performing repeated actions in the form of loops or recursion.

5.  It must *terminate* for the intended input.
    In other words, it may not go into an infinite loop.

### Programs

A computer [program]{.term} is an implementation of an algorithm in some programming language.
<!-- Algorithms are often presented in terms of programs, but this can be misleading
-- it can be difficult to see what is actually part of the algorithm and what is some specific peculiarity of that implementation.
 -->
Note that there are infinitely many programs that implement the same algorithm.
For example, if you rename a variable you get a new program, but that doesn't change the algorithm.
Sometimes you can change the order between two unrelated statements,
or even change the order in which a loop iterates over an array,
without changing the underlying algorithm.

<!-- By definition, an algorithm must provide sufficient detail that it can be converted into a program when needed. -->

The distinction between the terms "algorithm" and "program" is not always clear.
For example, Selection sort is an algorithm which we described very abstractly using plain English in @sec:sorting-1:overview,
but we also showed pseudocode in @sec:sorting-1:selection-sort.
Which one of these is the best description of the actual *algorithm*, and not a specific program?
The abstract English description is closer to the "ideal" Selection sort algorithm,
but it is also more prone to misunderstandings and unintended ambiguities.
The pseudocode version is somewhere in between the algorithm and an actual implementation
-- many of our algorithms will be presented in pseudocode like this,
hoping that it will bridge the gap between the abstract algorithm and concrete implementations.

<!-- OPENDSA: START -->
The requirement that an algorithm must terminate means that not all computer programs implement an algorithm.
Your operating system is one such program, as are most programs that interact with a user.
However, you can think of the various tasks for an operating system
(each with associated inputs and outputs) as individual problems,
each one solved by a specific algorithm that terminates once its output is produced.
<!-- OPENDSA: END -->

In this book we try to describe algorithms and not programs,
keeping them as abstract as possible, in pseudocode or plain English.
We assume that you, the reader, is competent enough to be able to translate our descriptions and pseudocode into working programs in your favourite language.

<!-- OPENDSA: START -->
To summarise:
A [problem]{.term} is a task to be performed, that maps inputs to matching outputs.
An [algorithm]{.term} is a recipe for solving a problem whose steps are concrete and unambiguous.
Algorithms must be correct, of finite length, and must terminate for all inputs.
A [program]{.term} is an instantiation of an algorithm in a programming language.
<!-- OPENDSA: END -->

::: TODO
- Prio 3: this visualisation is really ugly
:::

::: dsvis
The following slideshow should help you to visualise the differences.

``` {.jsav-animation src="AlgAnal/ProblemAlgorithmCON.js" links="AlgAnal/ProblemAlgorithmCON.css" name="Problem, Algorithm, and Program definitions Slideshow"}
```
:::
