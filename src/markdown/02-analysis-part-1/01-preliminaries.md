
## Problems, algorithms, and programs

Programmers commonly deal with *problems*, *algorithms*, and computer *programs*.
These are three distinct concepts.

#### Problems

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

Problems can be viewed as functions in the mathematical sense. A
[function]{.term} is a matching between inputs
(the [domain]{.term}) and outputs (the
[range]{.term}). An input to a function might be
a single value or a collection of information. The values making up an
input are called the [parameters](#parameter){.term} of the function. A specific selection of values for the
parameters is called an [instance](#problem-instance){.term} of the problem. For example, the input parameter to a
sorting function might be an array of integers. A particular array of
integers, with a given size and specific values for each position in the
array, would be an instance of the sorting problem. Different instances
might generate the same output. However, any problem instance must
always result in the same output every time the function is computed
using that particular input.

This concept of all problems behaving like mathematical functions might
not match your intuition for the behavior of computer programs. You
might know of programs to which you can give the same input value on two
separate occasions, and two different outputs will result. For example,
if you type `date` to a typical Linux command line prompt, you will get
the current date. Naturally the date will be different on different
days, even though the same command is given. However, there is obviously
more to the input for the date program than the command that you type to
run the program. The date program computes a function. In other words,
on any particular day there can only be a single answer returned by a
properly running date program on a completely specified input. For all
computer programs, the output is completely determined by the program's
full set of inputs. Even a "random number generator" is completely
determined by its inputs (although some random number generating systems
appear to get around this by accepting a random input from a physical
process beyond the user's control). The limits to what functions can be
implemented by programs is part of the domain of
[Computability]{.term}.

#### Algorithms

An [algorithm]{.term} is a method or a process
followed to solve a problem. If the problem is viewed as a function,
then an algorithm is an implementation for the function that transforms
an input to the corresponding output. A problem can be solved by many
different algorithms. A given algorithm solves only one problem (i.e.,
computes a particular function).
This book covers many problems, and for several of these problems we will see more than one algorithm.
For the important problem of sorting there are over a dozen commonly used algorithms!

The advantage of knowing several solutions to a problem is that solution
$\mathbf{A}$ might be more efficient than solution $\mathbf{B}$ for 
specific variation of the problem, or for a specific class of inputs to
the problem, while solution $\mathbf{B}$ might be more efficient than
$\mathbf{A}$ for another variation or class of inputs. For example, one
sorting algorithm might be the best for sorting a small collection of
integers (which is important if you need to do this many times). ther
might be the best for sorting a large collection of integers. A third
might be the best for sorting a collection of variable-length strings.

By definition, something can only be called an algorithm if it has all
of the following properties:

1.  It must be *correct*. In other words, it must implement the desired
    function, converting each input to the correct output. Note that
    every algorithm implements some function, because every algorithm
    maps every input to some output (even if that output is a program
    crash). At issue here is whether a given algorithm implements the
    *intended* function.
2.  It is composed of a series of *concrete steps*. Concrete means that
    the action described by that step is completely understood -- and
    doable -- by the person or machine that must perform the
    algorithm. Each step must also be doable in a finite amount of time.
    Thus, the algorithm gives us a "recipe" for solving the problem by
    performing a series of steps, where each such step is within our
    capacity to perform. The ability to perform a step can depend on who
    or what is intended to execute the recipe. For example, the steps of
    a cookie recipe in a cookbook might be considered sufficiently
    concrete for instructing a human cook, but not for programming an
    automated cookie-making factory.
3.  There must be *no ambiguity* about which step is performed next.
    Typically, the next step follows directly from the algorithm’s description.
    When the algorithm includes selection mechanisms, such as `if`-statements, these allow for alternative execution paths. 
    However, the choice of which path to follow must always be unambiguous at the moment the decision is made.
4.  It must be composed of a *finite* number of steps. If the
    description for the algorithm were made up of an infinite number of
    steps, we could never hope to write it down, nor implement it as a
    computer program. Most languages for describing algorithms
    (including English and "pseudocode") provide some way to perform
    repeated actions, known as iteration. Examples of iteration in
    programming languages include the `while` and `for` loop constructs.
    Iteration allows for short descriptions, with the number of steps
    actually performed controlled by the input.
5.  It must *terminate* for the intended input.
    In other words, it may not go into an infinite loop.

#### Programs

We often think of a computer [program]{.term} as
an instance, or concrete representation, of an algorithm in some
programming language. Algorithms are usually presented in terms of
programs, or parts of programs. Naturally, there are many programs that
are instances of the same algorithm, because any modern computer
programming language can be used to implement the same collection of
algorithms (although some programming languages can make life easier for
the programmer). To simplify presentation, people often use the terms
"algorithm" and "program" interchangeably, despite the fact that
they are really separate concepts. By definition, an algorithm must
provide sufficient detail that it can be converted into a program when
needed.

The requirement that an algorithm must terminate means that not all
computer programs meet the technical definition of an algorithm. Your
operating system is one such program. However, you can think of the
various tasks for an operating system (each with associated inputs and
outputs) as individual problems, each solved by specific algorithms
implemented by a part of the operating system program, and each one of
which terminates once its output is produced.

In this book we will usually present algorithms and not programs.
We assume that you as the reader is competent enough to be able to translate our descriptions and pseudocode into working programs in your favourite language.

To summarize: A [problem]{.term} is a function
or a mapping of inputs to outputs. An [algorithm]{.term} is a recipe for solving a problem whose steps are concrete
and unambiguous. Algorithms must be correct, of finite length, and must
terminate for all inputs. A [program]{.term} is
an instantiation of an algorithm in a programming language.

::: dsvis
The following slideshow should help you to visualize the differences.

::: TODO
- Prio 3: this visualization is really ugly
:::

<inlineav id="ProblemAlgorithmCON" src="AlgAnal/ProblemAlgorithmCON.js" name="Problem, Algorithm, and Program definitions Slideshow" links="AlgAnal/ProblemAlgorithmCON.css"/>
:::
