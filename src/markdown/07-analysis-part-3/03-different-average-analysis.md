
## Different types of average analysis {#analysis-3:different-average-analysis}

::: TODO
- Done?
:::

In @sec:analysis-1:complexity-cases we discussed *average-case* complexity,
and in this section we discussed *amortised* complexity.
The two notions are quite different, but have one thing in common:
they try to reason about how an algorithm behaves *on average*.
There is also a third kind of asymptotic complexity that does some kind of averaging, *expected* complexity.

These three concepts are different from each other, because they average over different things.
If we want to analyse the complexity of an operation, this is what the three types average over:

Type of complexity             Average over...
-----------------------------  ---------------------------------------------
Average-case complexity        ...all possible inputs to the operation
Amortised complexity           ...a sequence of calls to the operation
Expected complexity            ...random choices made by the operation
-----------------------------  ---------------------------------------------

`\noindent`{=latex}
All three types are orthogonal to each other, which means that
we can talk about "amortised average-case complexity" or "expected amortised complexity",
or even "expected amortised average-case complexity".
(And we can add "asymptotic" too: "asymptotic expected amortised average-case complexity"...)

Average-case complexity
:   can be used when an algorithm behaves well for most "well-behaved" inputs,
    but there are some few extreme inputs that make the algorithm behave bad.
    The typical example is Quicksort, which has quadratic worst-case complexity,
    but usually behaves linearithmic (unless there is some evil hacker that
    contaminates the input).
    The main difficulty with average-case complexity is to decide what is the average case.

Amortised complexity
:   is used for operations that are supposed to be used many times on the same data structure,
    such as changing, adding or deleting elements.
    If the operation most of the time behaves well, but more expensive operations occur in a predictable
    and limited extent, we can use amortisation to determine the total complexity
    for executing a sequence of operations. The prototypical case is dynamic arrays.
    Note that there is no randomness involved for amortised operations,
    and there is no risk of repeatedly encountering expensive operations due to bad luck or contaminated data.

Expected complexity
:   is used when the algorithm itself uses randomisation,
    as opposed to the input values being randomly distributed.
    One example is again from Quicksort, but this time about the pivot
    being randomly selected by the algorithm itself:
    Using a random pivot we get *expected* linearithmic complexity.
    This is slightly different from average-case, in that the randomness
    is controlled by the algorithm, so a bad outcome cannot be
    provoked repeatedly by external factors.


