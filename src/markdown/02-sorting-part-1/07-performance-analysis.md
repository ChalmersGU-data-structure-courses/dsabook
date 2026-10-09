
## Performance analysis of sorting algorithms {#sorting-1:performance-analysis}

::: TODO
- Prio 1: Bubble sort must be removed!
- Prio 1: Rewrite sections - currently the are just copy-pasted from other parts
:::

Having seen a couple of algorithms for searching and sorting, we want answers
to questions like:

- Is either Selection sort or Insertion sort faster than the other?
- Is it better to perform a linear search directly on an unordered array, or sorting it with linear search and then performing a binary search?
- How does the running time of these algorithms scale with increasing input size?

The exact runtime of sorting depends on a myriad of factors. Just as with the search
algorithms shown earlier, the number of comparisons performed is a good proxy for
runtime -- a sorting algorithm that does many comparisons is going to be slower.
So our task is determining the worst case number of comparisons required for a given input size.

We saw earlier that linear search, the number of comparisons scale linearly with the
input size. We say that linear search is a *linear time* algorithm, and that binary search
is *logarithmic time*. In this chapter we show that both Selection sort and Insertion sort
are *quadratic time*, the number of comparisons required for $n$ elements is proportional to $n^2$.

#### Selection sort analysis

One way to describe selection sort:
For every position $i$ from $0$ to $n-1$, search through the remaining $n-i-1$ values
for the minimal value.
In our implementation (see [](#alg:selection-sort)), we have a nested loop, where the
inner loop runs fewer and fewer iterations in each iteration of the outer loop.

- The outer loop is iterated $n$ times in total.
- In iteration $i$, the number of comparisons made by the inner loop is always $n-i-1$.

So the total number of comparisons is:

$$
(n-1) + (n-2) + \cdots + 1  =  \sum_{i=1}^{n-1} i  =  \tfrac{1}{2} n (n-1)
$$

The fact that this is a quadratic formula indicates that the runtime of insertion sort
grows quadratically with the size of the array being sorted. Just as binary search is logarithmic time,
and linear search is linear time, selection sort is *quadratic time*.

When describing selection sort as quadratic time, we simplify away a lot of details that may seem important,
but for determining how runtime scales with input size, this simplification is justifiable.
Running benchmarks on an implementation of selection sort would show that when the size of the input array
is doubled, the runtime is almost exactly quadrupled. A tenfold increase in input size yields a hundredfold
increase in runtime, exactly as predicted when time scales quadratically with input size.

::: dsvis
This visualisation analyses the number of comparisons and swaps required by Selection sort.

``` {.jsav-animation src="Sorting/SelectionSortAnalysisCON.js" links="Sorting/SelectionSortAnalysisCON.css" name="Selection Sort Analysis Slideshow"}
```
:::

This performance analysis does not help us predict the running time of selection sort in minutes and seconds,
but it does demonstrate that for large input sizes, selection sort is a lot slower than a linear search.
Slightly simplified: for large input sizes, every logarithmic time algorithm is faster than every linear time algorithm, which in turn is faster than every quadratic time algorithm. Later on, we will introduce the topic
of *complexity*, expanding this hierarchy to compare the running time of any algorithms.

#### Insertion sort analysis

In insertion sort, we insert every element in turn into a growing sequence of sorted values.
Essentially we move every element back until it is in the correct order.
Just like insertion sort, this is done using a nested loop (see [](#alg:insertion-sort)), but contrary to selection sort,
the process is initially quick, then gets slower as we progress.

Another complication is that the number of steps an element needs to move, and thus the number of
comparisons, depends on the elements of the array, not just the size of it.

- The outer loop is iterated $n-1$ times in total.
- The inner loop is harder to analyse since it depends on how many elements in positions $0,\ldots,i-1$ are smaller than the element in position $i$:
    - in the absolute worst case, we have to move the element all the way to position zero, so the number of comparisons will be $i-1$;
    - in the best case, the element is already in place, and then we only need one comparison.

Therefore, in the worst case the number of comparisons is $\sum_0^n i$, which is quadratic just like Selection sort.
In the best case -- when the list is already sorted -- we only have to do one comparison per iteration,
so the number of comparisons is linear in the size of the array.

::: dsvis
Here is an explanation of the worst case cost of Insertion sort.

``` {.jsav-animation src="Sorting/InsertionSortWorstCaseCON.js" links="Sorting/InsertionSort.css" name="Insertion Sort Worst Case Slideshow"}
```
:::

::: dsvis
And here is an explanation of the cost of the best case.

``` {.jsav-animation src="Sorting/InsertionSortBestCaseCON.js" links="Sorting/InsertionSort.css" name="Insertion Sort Best Case Slideshow"}
```
:::

Insertion sort is best case linear time (when no element needs to be moved at all) and worst case quadratic time
(when every element needs to be moved all the way back). For randomly selected data, we would expect elements to
move through half the sorted part on average -- so in this *average case* the runtime is still quadratic.

Worst case is usually the most reliable indicator of running time for algorithms, but there are exceptions.
In some applications, arrays may tend to be sorted or nearly sorted from the start,
in which case Insertion sort will outperform Selection sort drastically.

<!-- OPENDSA: START -->
Later we will see algorithms whose worst case growth rate is much better than quadratic.
Thus for larger arrays, Insertion sort will not be so good a performer as other algorithms.
So Insertion sort is not the best sorting algorithm to use in most situations.
But there are special situations where it is ideal.
We already know that Insertion sort works great when the input is sorted or nearly so.
Another good time to use Insertion sort is when the array is very small, since the algorithm is so simple.
The algorithms that have better asymptotic growth rates tend to be more complicated,
meaning that they typically need fewer comparisons for larger arrays, but they cost more per comparison.
<!-- OPENDSA: END -->
One very common optimisation for these more complicated algorithms is to introduce a *cutoff*,
so that when the array to be sorted is small enough we switch to Insertion sort (or Selection sort).
