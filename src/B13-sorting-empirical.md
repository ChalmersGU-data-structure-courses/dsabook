
## An Empirical Comparison of Sorting Algorithms

Which sorting algorithm is fastest? Asymptotic complexity analysis lets
us distinguish between $\Theta(n^2)$ and $\Theta(n \log n)$ algorithms,
but it does not help distinguish between algorithms with the same
asymptotic complexity. Nor does asymptotic analysis say anything about
which algorithm is best for sorting small lists. For answers to these
questions, we can turn to empirical testing.

::: topic
#### Table {- #SortCompTable}

Empirical comparison of sorting algorithms run on a 3.4 GHz Intel
Pentium 4 CPU running Linux. All times shown are milliseconds.

| Sort | 10 | 100 | 1K | 10K | 100K | 1M | Up | Down |
|:--------------|--------:|-------:|-------:|-------:|-------:|--------:|-------:|-------:|
| Insertion     | 0.00023 |  0.007 |   0.66 |  64.98 |   7381 |  674420 |    0.1 | 129.1 |
| Bubble        | 0.00035 |  0.020 |   2.25 | 277.94 |  27691 | 2820680 |   70.6 | 108.7 |
| Selection     | 0.00039 |  0.012 |   0.69 |  72.47 |   7356 |  780000 |   69.8 |  69.6 |
| Merge         | 0.00050 |  0.010 |   0.12 |   1.61 |     19 |     219 |    0.8 |   0.8 |
| Quick         | 0.00048 |  0.008 |   0.11 |   1.37 |     16 |     162 |    0.4 |   0.4 |
| Quick (opt)   | 0.00031 |  0.006 |   0.09 |   1.14 |     14 |     143 |    0.3 |   0.4 |

:::

[The table above](#SortCompTable) shows timing
results for actual implementations of the sorting algorithms presented
in this chapter. The algorithms compared include
[Insertion Sort], [Bubble Sort],
[Selection Sort], [Quicksort], and [Mergesort].

For Quicksort, two versions are compared: the basic implementation and
an optimized version that does not partition sublists below length nine
(with Insertion Sort performed at the end).

Except for the rightmost columns, the input to each algorithm is a
random array of integers. This affects the timing for some of the
sorting algorithms. For example, Selection Sort is not being used to
best advantage because the record size is small, so it does not get the
best possible showing.

The various sorting algorithms are shown for lists of sizes 10, 100,
1000, 10,000, 100,000, and 1,000,000. The final two columns of each
table show the performance for the algorithms on inputs of size 10,000
where the numbers are in ascending (sorted) and descending (reverse
sorted) order, respectively. These columns demonstrate best-case
performance for some algorithms and worst-case performance for others.
They also show that for some algorithms, the order of input has little
effect.

These figures show a number of interesting results. As expected, the
$O(n^2)$ sorts are quite poor performers for large arrays. Insertion
Sort is by far the best of this group, unless the array is already
reverse sorted. Optimized Quicksort is clearly the best overall
algorithm for all but lists of 10 records. Even for small arrays,
optimized Quicksort performs well because it does one partition step
before calling Insertion Sort. In general, optimizing the various
algorithms makes a noticeable improvement for larger array sizes.
