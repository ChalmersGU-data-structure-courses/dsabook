
## Invariants, preconditions, and postconditions {#analysis-1:invariants}

When we formulate a problem, and describe a data structure or an algorithm,
it is useful to describe them in terms of [invariants]{.term}.
Simply formulated, an invariant is a condition that must always hold for a data structure,
or sometimes only during the execution of an algorithm.

Invariants are very useful tools for analysing the correctness of an algorithm,
but they also have a pedagogical value in promoting understanding of how a data
structure or algorithm works.
Remarkably often when designing a data structure, deciding the invariant is the only difficult part,
and once it is decided the rest of the work is trivial.

Take the example of a collection of values. If we decide to store them in an array
with an ordering invariant (the array must always be sorted in ascending order),
the algorithms for most operations become obvious.
Adding a new element can only be done in one way: Find the position where
the value can be, and put the value there. If we want an operation to find
the minimal element, we know that it is in the first position.

#### Invariants as pre- and postconditions

Preconditions and postconditions are a nice way to specify the behaviour of on an algorithm
or program. What do we assume of the inputs to the algorithm, and what can we promise about
the output if the input is well-formed?

Invariants mesh nicely with this, if our data structure has an invariant, that invariant
is both a precondition and postcondition of every operation on the data structure.

Returning to the example of an array with an ordering invariant.
A `contains` operation can use binary search to find an element, because
the array being ordered is a precondition, and it does not have to do anything
for the postcondition since it makes no modifications in the array.
Adding a new element can also benefit from the invariant, using binary search
to determine where the value must be placed, but it must also take care
to ensure the postcondition, maintaining the invariant.

#### Maintaining invariants

Deciding an invariant is always a trade-off between the
performance benefit of having it as a precondition, and the cost
of maintaining it as a postcondition.

Sometimes an invariant can be strengthened or weakened to alter
this trade-off. Consider again the case of an ordered array.
If the only reason we have the invariant is to find the least
value in the array, perhaps it could be weakened from
"the elements are in ascending order" to
"the first element is always the least element", allowing all
values except the first to appear in any order.
Consider how this would affect the performance of for example an
operation that adds or removes value or increases/decreases an existing value.

Another common example of a simple invariant is a size invariant.
Suppose a data structure contains a collection of elements,
and an integer called `size`. There is an implicit understanding
that the size variable should reflect the actual number of elements
in the collection. Whenever we do modifications of the collection
(adding or removing a value), we need to remember to update size,
maintaining the invariant.

#### Invariants in algorithms

A slightly different use of the term invariant is what is sometimes called a *loop invariant*,
something that holds in every iteration of a loop, or more generally throughout the execution
of an algorithm.

A simple example of this is in binary search. At every point of the algorithm, there is
a gradually shrinking search interval. The invariant is that if the element we are
searching for is in the array, then it must be inside the search interval.
We maintain this invariant by only excluding values that are lesser/greater than
the element we are searching for from the search interval.
Being aware of this algorithm can help debug a developer debug a broken implementation
(am I sure that every operation I make preserves the invariant?), and help
finding potential optimisations (are there other operations that would preserve this invariant?).

Another excellent pair of examples of loop invariants are in Insertion Sort and Selection sort
from Chapter [Chapter @sec:sorting-1]. Have a look at those algorithms and try to formulate
a loop invariant for each of them.

* Insertion sort loops through all the elements in the array and "inserts them backwards" into
an already sorted segment. The invariant is that when inserting the element at `arr[i]`,
all the elements before that are sorted.

* Selection sort has a slightly stronger invariant: When the loop is at index $i$,
all elements below $i$ sorted, and all elements above $i$ are greater than the
greatest element before $i$.

Both the algorithms also have an implicit invariant that the array remains a permutation
of the original array (it has all the same elements in a different order). Without that invariant,
just overwriting every index with the smallest element would respect the invariant!

Note how the invariants for both algorithms do two things:

They make the correctness of the algorithm obvious
:   When $i$ is the final index of the array, the whole array will be ordered, and a
    permutation of the original array, which is the definition of correctness for sorting.

They make the correct steps of the algorithm obvious
:   Like with data structures, after deciding the loop invariant for selection sort,
    designing the rest of the algorithm becomes trivial.
    The only thing we can do to preserve the invariant is find the least
    element after $i$ and put it at the end of the ordered segment.

Loop invariants are a fantastic tool not just for data structures,
but in any kind of software development,
providing both excellent documentation value and (when applied rigorously) a proof of correctness.
