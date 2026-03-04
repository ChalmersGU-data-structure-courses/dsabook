
## Invariants, preconditions, and postconditions

When we formulate a problem, and describe a data structure or an algorithm,
it is useful to describe them in terms of [invariants]{.term}.
Invariants are very useful tools for analysing the correctness of an algorithm.
But they are also pedagogical tools, they help our understanding how an data structure or algorithm works.

Simply formulated, an invariant is a condition (or some conditions) that must always hold for your data structure or algorithm.
Invariants can be more or less detailed, but if we make them too detailed they might be a hinder for our understanding.
Therefore we will keep them on a quite high level, in line with our decision to present algorithms in high-level pseudocode.
We trust that you, the reader, is experienced enough to translate both pseudocode and invariants into more detailed descriptions.

### Preconditions and postconditions

Invariants can often be formulated as preconditions and postconditions on an algorithm:
what do we assume of the inputs to the algorithm, and what can we promise about the output if the input is well-formed?

For example, assume that we want to insert an element into a sorted list.
A natural precondition is that the input list is already sorted,
and a postcondition would then be that the list is still sorted after the element is inserted.

Many pre- and postconditions are trivial like the ones above,
because they can be understood from the problem formulation.
In these cases we usually don't spell out the invariants.

### Internal invariants

More interesting is often to try to find properties that always hold "inside" the algorithm.
These kinds of *internal invariants* could be nontrivial properties or formula that are true at certain steps in the algorithm.
They could for example be a relation that holds between some internal variables, after each iteration of a loop.

::: example
#### Example: Binary search

In @sec:binary-search we introduced binary search. What kind of invariants can be useful to understand the algorithm better?
A precondition is of course that the array is sorted, but this is so obvious that we don't have to spell it out.

More interesting is to look into the algorithm itself.
Binary search consists of a loop which updates two variables, `low` and `high`.
So, can we say something about these variables?

Yes, we can say that after each iteration of the binary search loop, we know that the value we search for lies between the cells pointed to by `low` and `high` (if it is in the array at all).
This means that we can formulate the following invariants:

- When searching for `v` in a sorted array `arr`, then `arr[low] ≤ v ≤ arr[high]` after each iteration of the main loop.
- The *size* of the interval `low...high` strictly decreases in each iteration.

Knowing these invariants, it becomes much easier to convince ourselves that the algorithm is correct and always terminates.
:::


::: example
#### Example: Sorting

For all sorting algorithms, an obvious postcondition is that the resulting array is sorted,
and that it contains the same elements as it started with.
But what other invariants can be useful?
Let's look at the sorting algorithms from [Chapter @sec:sorting-part-1], Bubble, Selection and Insertion sort.

All three algorithms have the same invariant:
The array is divided into an unsorted part and a sorted part,
and after each iteration of the outer loop, the size of the sorted part is increased by one.
We can specify this invariant more formally in terms of the outer loop variable `i`
(where `n` is the size of the array `arr`):

Bubble sort (@sec:bubble-sort)
:   The rightmost subarray `arr[n-i...n]` is always sorted.

Selection sort (@sec:selection-sort) and Insertion sort (@sec:insertion-sort)
:   The leftmost subarray `arr[0...i]` is always sorted.

An interesting invariant for Bubble and Selection sort (which does not hold for Insertion sort!)
is that the unsorted and sorted parts are strictly separated, like this:

Bubble sort
:   Every element in `arr[0...n-i]` is smaller than or equal to every element in `arr[n-i...n]`.

Selection sort
:   Every element in `arr[0...i]` is smaller than or equal to every element in `arr[i...n]`.

Note that these invariants are for the algorithms as we described them in
[@sec:bubble-sort;@sec:selection-sort;@sec:insertion-sort].
There are other versions of the algorithms,
for example Selection sort where we start with the largest element and put it last
(and similar for Bubble and Insertion sort).
For these alternative versions the invariants have to be modified slightly, but their ideas are the same.
:::

