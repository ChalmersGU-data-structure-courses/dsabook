
## Performance analysis {#sorting-1:performance-analysis}

::: TODO
- Prio 1: Rewrite sections - currently the are just copy-pasted from other parts
:::


### Selection sort analysis

We have a nested for loop, where the inner loop depends on the loop variable of the outer loop.

- The outer loop is iterated $n$ times in total.
- In iteration $i$, the number of comparisons made by the inner loop is always $n-i-1$.

As you might notice, this is exactly the same as the number of comparisons Bubble sort makes.
So, Selection sort makes $n(n-1)/2$ comparisons, which is quadratic.

The advantage compared to Bubble sort is that Selection sort makes a lot fewer swaps.
For each outer iteration it only makes one swap, so the total number of swaps will be $n-1$ (we get the last element in place "for free").
So, for Selection sort, the number of swaps grows *linearly* with the size of the array.
(But don't forget that the number of comparisons is still quadratic.)

::: dsvis
This visualisation analyses the number of comparisons and swaps required by Selection sort.

``` {.jsav-animation src="Sorting/SelectionSortAnalysisCON.js" links="Sorting/SelectionSortAnalysisCON.css" name="Selection Sort Analysis Slideshow"}
```
:::


### Insertion sort analysis

Just as for the previous sorting algorithms, we have a nested for loop, where the inner loop depends on the loop variable of the outer loop.

- The outer loop is iterated $n-1$ times in total.
- The inner loop is harder to analyse since it depends on how many elements in positions $0,\ldots,i-1$ are smaller than the element in position $i$:
    - in the absolute worst case, we always have to move the element to the front of the list, so the number of comparisons will be $i-1$;
    - in the best case, the element is already in place, and then we only need one comparison.

Therefore, in the worst case the number of comparisons is $\sum_0^n i$, which is quadratic just like Bubble sort and Selection sort.
In the best case -- when the list is already sorted -- we only have to do one comparison per iteration,
so the number of comparisons is proportional to the size of the array.
Counting swaps instead of comparisions yields the same results, because each iteration of the inner `while`-loop does both a comparison and a swap.

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

While the best case is significantly faster than the worst case,
<!-- OPENDSA: START -->
the worst case is usually a more reliable indicator of the "typical" running time.
However, there are situations where we can expect the input to be in sorted or nearly sorted order.
One example is when an already sorted list is slightly disordered by a small number of additions to the list;
restoring sorted order using Insertion sort might be a good idea if we know that the disordering is slight.
So a "nearly sorted" list will always be cheap to sort with Insertion sort.
<!-- OPENDSA: END -->
An example of an algorithm that take advantage of the near-best-case running time of Insertion sort is [Shellsort]{.term}.

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
