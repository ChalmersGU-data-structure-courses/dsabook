
## Invariants, preconditions, and postconditions {#analysis-1:invariants}

When we formulate a problem, and describe a data structure or an algorithm,
it is useful to describe them using [invariants]{.term}.
Simply formulated, an invariant is a condition that must always hold for a data structure, or sometimes only during the execution of an algorithm.

Invariants are very useful tools for analysing the correctness of an algorithm,
but they also have a pedagogical value in promoting understanding of how a data
structure or algorithm works.
When we design a data structure, the only difficult part is often to decide the invariant,
<!-- Remarkably often when designing a data structure, deciding the invariant is the only difficult part, -->
and once it is decided the rest of the work is trivial.

Take the example of storing a collection of values in an array.
If we decide to have an ordering invariant -- that the array must always be sorted --
then the algorithms for most operations become obvious.
Adding a new element can only be done in one way: find the position where
the value can be, and put the value there. If we want an operation to find
the minimal element, we know that it has to be in the first position.

#### Invariants as pre- and postconditions

Preconditions and postconditions are a precise way to specify the behaviour of an algorithm or a program.
Using them we can express what we assume of the inputs to the algorithm,
and what we promise about the output if the input is well-formed.
Invariants fit nicely with this -- if our data structure has an invariant, that invariant
is both a precondition and postcondition of every operation on the data structure.

Returning to the example of an array with an ordering invariant.
A `contains` operation can use binary search to find an element, because
a precondition is that the array is sorted.
Adding a new element also benefits from the invariant:
we can use binary search to determine where the value must be placed,
but it must also take care to ensure the postcondition, maintaining the invariant.

#### Maintaining invariants

Deciding an invariant is always a trade-off between the
performance benefit of having it as a precondition, and the cost
of maintaining it as a postcondition.

A common simple example is a size invariant.
Suppose a data structure contains a collection of elements,
and an integer variable called `size`. There is an implicit understanding
that the size variable should reflect the actual number of elements
in the collection. Whenever we modify of the collection
(add or remove en element), we need to remember to update `size`,
maintaining the invariant.

Sometimes an invariant can be strengthened or weakened,
changing the performance benefit and the maintenance cost.
For example, assume that you want to keep an array which you frequently add to and remove from.
You can add whatever element you like,
but you are only interested in removing the *smallest* element.
A first attempt at an invariant could be that we keep the array sorted,
which allows us to find the smallest element very quickly.
But it can be very costly to maintain sortedness when adding a new element.
Instead we can weaken the invariant to "the first element is always the smallest",
so that we allow the other values to appear in any order.
This might make it easier to maintain the invariant when elements are added or removed.
We will actually see such a data structure in @sec:heaps:binary-heaps,
called the *binary heap*.

#### Invariants in algorithms

A slightly different use of the term invariant is what is sometimes called a *loop invariant*,
something that holds in every iteration of a loop, or more generally throughout the execution
of an algorithm.

A simple example of this is in binary search. At every point of the algorithm, there is
a gradually shrinking search interval. The invariant is that if the element we are
searching for is in the array, then it must be inside the search interval.
We maintain this invariant by only excluding elements from the search interval,
that are smaller or greater than what we search for.
Other examples of loop invariants are for Selection sort and Insertion sort
from [Sections @sec:sorting-1:selection-sort] and [-@sec:sorting-1:insertion-sort].
<!-- Take a look at those algorithms and try to formulate loop invariants for them. -->

* Both algorithms maintains an invisible separator $i$ which is the loop variable,
and their main invariant is that all the elements up until $i$ are sorted.

* In addition, Selection sort has an invariant saying that every element up until $i$
is smaller than or equal to all elements after $i$.

Both algorithms also have an implicit invariant that the array remains a permutation
of the original array -- it consists of the same elements but in a different order.
Without that invariant,
just overwriting every index with the smallest element would respect the invariants above!

Notice how the invariants for both algorithms do two things:

-   *They make the correctness of the algorithm obvious*.
    When $i$ is the final index of the array, the whole array will be sorted, and a
    permutation of the original array, which is the definition of correctness for sorting.

-   *They make the correct steps of the algorithm obvious*.
    After deciding the loop invariant for Selection sort,
    designing the rest of the algorithm becomes trivial.
    The only thing we can do to preserve the invariant is to find the smallest
    element after $i$ and put it at the end of the ordered segment.

Loop invariants are a very useful tool not just for data structures, but in any kind of software development.
They provide both documentation value and (when applied rigorously) a proof of correctness.
Being aware of an invariant can help a developer to debug a broken implementation
("am I sure that every operation I make preserves the invariant?"), and to
find potential optimisations ("are there other operations that would preserve this invariant?").
