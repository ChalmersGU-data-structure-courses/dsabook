
## Terminology and notation

Formally, the *sorting problem* is to arrange a list of elements $a_1,a_2,\ldots,a_n$ into any order $s$ such that $a_{s_1}\leq a_{s_2}\leq\cdots\leq a_{s_n}$.
In other words, the sorting problem is to arrange a set of elements so that they are in non-decreasing order.

Note that the definition above is for *natural sorting*.
If we instead are interested in the more general problem of *key-based sorting*, the definition becomes slightly more complicated:
The (key-based) *sorting problem* is to arrange the list into any order $s$ such that $a_{s_1},a_{s_2},\ldots,a_{s_n}$ have keys obeying the property $k_{s_1}\leq k_{s_2}\leq\cdots\leq k_{s_n}$.

### Comparing algorithms

When comparing two sorting algorithms, the simplest approach would be to
program both and measure their running times. This is an example of
*empirical comparison* (see @sec:empirical-analysis-and-code-tuning).
However, doing fair empirical comparisons can be tricky
because the running time for many sorting algorithms depends on
specifics of the input values. The number of records, the size of the
keys and the records, the allowable range of the key values, and the
amount by which the input records are "out of order" can all greatly
affect the relative running times for sorting algorithms.

When analysing sorting algorithms, it is traditional to measure the cost
by *counting the number of comparisons* made between keys. This measure is
usually closely related to the actual running time for the algorithm and
has the advantage of being machine and data-type independent. However,
in some cases records might be so large that their physical movement
might take a significant fraction of the total running time.
If so, it might be appropriate to measure the cost by counting
*the number of swap operations* performed by the algorithm.

In most applications we can
assume that all records and keys are of fixed length, and that a single
comparison or a single swap operation requires a constant amount of time
regardless of which keys are involved. However, some special situations
"change the rules" for comparing sorting algorithms. For example, an
application with records or keys having widely varying length (such as
sorting a sequence of variable length strings) cannot expect all
comparisons to cost roughly the same. Not only do such situations
require special measures for analysis, they also will usually benefit
from a special-purpose sorting technique.

Other applications require that a small number of records be sorted, but that the sort be performed frequently.
An example would be an application that repeatedly sorts groups of five numbers.
In such cases, asymptotic analysis is usually of not much help.
Instead it will be important to reduce the constant factors that are ignored by complexity analysis.
Then we might very well find that the best algorithm can be one of the very simple "slow" algorithms, such as [Insertion sort]{.term}.

Finally, some situations require that a sorting algorithm use as little
memory as possible. We will call attention to sorting algorithms that
require significant extra memory beyond the input array.

### Terminology

<!-- START NOTES -->

We introduce some useful terminology for classifying sorting algorithms:

Stability
:   When the algorithm does not change the order between equal elements. For example, if there are several books by the same author, we might want to keep their original order.

Adaptivity
:   When the algorithm is more efficient when the array is already sorted (or almost sorted).

In-place
:   When the memory use of the algorithm does not grow (too much) when the array size grows. This means that we cannot use an additional array, and therefore have to modify the original array.

<!-- END NOTES -->

-------------

Here are some important terminology which we can use to categorise different algorithms.

Stability
:   As defined, the sorting problem allows input with two or more records that have the same key value.
    But it does not specify how these should be ordered, which means that there can be several possible solutions to the problem.
    Sometimes it is desirable to maintain the initial ordering between two elements that compare equal.
    A sorting algorithm is said to be *stable* if it does not change the relative ordering of records with identical key values.
    Many, but not all, of the sorting algorithms presented in this book are stable, or can be made stable with minor changes.

Adaptivity
:   An *adaptive* sorting algorithm can take advantage of the existing order in the input.
    In general this means that the algorithm runs faster if the list is almost sorted, compared to if the list is completely random.
    The classic example of an adaptive sorting algorithm is [Insertion sort]{.term}.

In-place
:   An *in-place* sorting algorithm modifies the input array directly and does not build a new array for the sorted result.
    Usually one also requires that the algorithm does not allocate too much extra space while operating,
    where "not too much" can mean at most logarithmic extra memory in the size of the array.
    One sorting algorithm which is *not* in-place is [Mergesort]{.term}, while most other algorithms are.

