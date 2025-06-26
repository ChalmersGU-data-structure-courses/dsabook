
## Invariants, preconditions, and postconditions

When we formulate a problem, and describe a data structure or an algorithm, it is very useful to formulate *invariants*.
Simply formulated, an invariant is a condition (or a set of conditions) that must always hold for your data structure, or algorithm.

Invariants are a very useful tool for analyzing the correctness of an algorithm.
But they are also a pedagogical tool, they help our understanding how an data structure or algorithm works.

Invariants can be more or less detailed, but if we make them too detailed they might be a hinder for our understanding.
Therefore we will keep them on a quite high level, in line with our decision to present algorithms in high-level pseudocode.
We trust that you, the reader, is experienced enough to translate both pseudocode and invariants into more detailed descriptions.

#### Preconditions and postconditions

Invariants can often be formulated as preconditions and postconditions on an algorithm:
what do we assume of the inputs to the algorithm, and what can we promise about the output if the input is well-formed?

As an example, assume that we want to insert an element into a sorted list.
An natural precondition is then that the input list is already sorted, and a postcondition would then be that the list is still sorted after the element is inserted.
These specific pre- and postconditions are perhaps too obvious, so we usually don't spell them out -- they are understood from the problem formulation, which says that we are working with a sorted list.

Keeping in line with our high-level approach, we often don't formulate specific pre- and postconditions, but instead write more abstract invariants.

::: example
Example: Binary search

In [Section @sec:binary-search] we introduced binary search. What kind of invariants can be useful to understand the algorithm better?
A precondition is of course that the array is sorted, but this is so obvious that we don't have to spell it out.

More interesting is to look into the algorithm itself.
Binary search consists of a loop which updates two variables, `low` and `high`.
So, can we say something about these variables?

Yes, we can say that after each iteration of the binary search loop, we know that the value we search for lies between the cells pointed to by `low` and `high` (if it's in the array at all).
This means that we can formulate the following invariants:

- When searching for `v` in a sorted array `arr`, then `arr[low]` $\leq$ `v` $\leq$ `arr[high]` after each iteration of the main loop.
- The interval `high` - `low` strictly decreases in each iteration.

Knowing these invariants, it becomes much easier to convince ourselves that the algorithm is correct and always terminates.

:::
