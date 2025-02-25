
## Empirical comparison of sorting algorithms

Which sorting algorithm is fastest? Asymptotic complexity analysis lets
us distinguish between $\Theta(n^2)$ and $\Theta(n \log n)$ algorithms,
but it does not help distinguish between algorithms with the same
asymptotic complexity. Nor does asymptotic analysis say anything about
which algorithm is best for sorting small lists. For answers to these
questions, we can turn to empirical testing.

::: topic
#### Table: Empirical comparison {- #SortCompTable}

Empirical comparison of sorting algorithms run on an
Apple MacBook M3 Pro (2023 model).
All times shown are seconds.

The first table shows Python implementations, using CPython version 3.11:

| Sort              |     1K |    10K |   100K |     1M |    10M | 100K sorted | 100K reversed |
|:------------------|:------:|:------:|:------:|:------:|:------:|:-----------:|:-------------:|
| Insertion sort    |  0.009 |   0.88 |     82 |    --- |    --- |       0.003 |           175 |
| Bubble sort       |  0.020 |   2.08 |    211 |    --- |    --- |          97 |           280 |
| Selection sort    |  0.006 |   0.68 |     68 |    --- |    --- |          66 |            66 |
| Merge sort        |  0.001 |  0.009 |  0.105 |   1.26 |   17.4 |       0.084 |         0.087 |
| Merge (cutoff 20) |  0.000 |  0.006 |  0.077 |   1.00 |   15.1 |       0.048 |         0.071 |
| Quicksort         |  0.000 |  0.006 |  0.074 |   0.95 |   12.6 |       0.045 |         0.047 |
| Quick (cutoff 20) |  0.000 |  0.005 |  0.066 |   0.87 |   11.8 |       0.030 |         0.032 |

The second table shows Java implementations, using OpenJDK version 22.0
(note that the arrays are 4 times larger than for the Python tests):

| Sort              |     4K |    40K |   400K |     4M |    40M | 400K sorted | 400K reversed |
|:------------------|:------:|:------:|:------:|:------:|:------:|:-----------:|:-------------:|
| Insertion sort    |  0.015 |   0.62 |     69 |    --- |    --- |        0.01 |           126 |
| Bubble sort       |  0.018 |   1.46 |    312 |    --- |    --- |          35 |           175 |
| Selection sort    |  0.023 |   0.96 |    112 |    --- |    --- |          41 |            79 |
| Merge sort        |  0.001 |  0.010 |   0.14 |   1.06 |   13.2 |        0.11 |          0.12 |
| Merge (cutoff 20) |  0.001 |  0.009 |   0.12 |   1.03 |   12.3 |        0.10 |          0.10 |
| Quicksort         |  0.001 |  0.008 |   0.06 |   0.66 |    8.2 |        0.04 |          0.03 |
| Quick (cutoff 20) |  0.001 |  0.007 |   0.06 |   0.57 |    8.0 |        0.04 |          0.04 |

:::

[The table above](#SortCompTable) shows timing
results for actual implementations of the sorting algorithms presented
in this chapter. The algorithms compared include
[Insertion Sort], [Bubble Sort],
[Selection Sort], [Quicksort], and [Mergesort].

For Quicksort and Mergesort, two versions are compared: the basic implementation,
and an optimized version that falls back to insertion sort for sublists of
length below 20.

Except for the rightmost columns, the input to each algorithm is a
random array of integers. This affects the timing for some of the
sorting algorithms. For example, Selection Sort is not being used to
best advantage because the record size is small, so it does not get the
best possible showing.

The various sorting algorithms are shown for arrays of sizes being multiples of 10.
The final two columns of each
table show the performance for the algorithms on inputs of size 100,000
(400,000 for the Java tests)
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
