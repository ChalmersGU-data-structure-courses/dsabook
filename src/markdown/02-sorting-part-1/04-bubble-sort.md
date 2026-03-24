
## Bubble sort

Bubble sort is often the first sorting algorithm that you learn, because it is relatively easy to understand and implement.
However, it is rather slow, even compared to the other similar algorithms, Selection sort and Insertion sort.
(It is not even particularly intuitive -- nobody is going to come naturally to Bubble sort as a way to sort their bookshelf,
their Bridge hand or their pile of bills, like they might with Insertion sort or Selection sort.)

::: algorithm
#### Algorithm: Bubble sort

Divide the array into an unsorted and a sorted part,
the sorted part is to the right and initially empty.
Then repeat the following until the unsorted part is empty:

1.  Compare every adjacent pair of elements in the unsorted part, from left to right.
    Swap them if they are out of order.
2.  Now the sorted part has increased by one element, and the unsorted part has decreased by one.

:::

This can be implemented as a simple nested `for`-loop.
The inner loop moves through the array from left to right, comparing adjacent elements.
If an element is greater than its right neighbour, then the two are swapped.
Once the largest element is encountered, it will "bubble" up to the right of the array (hence the name, Bubble sort).
The second pass through the array repeats this process.
However, because we know that the largest element already reached the right of the array on the first pass,
there is no need to compare the rightmost two elements on the second pass.
Likewise, each succeeding pass through the array compares adjacent elements,
looking at one less element toward the end than in the preceding pass.

    function bubbleSort(array):
        n = array.size
        for i in 0 .. n-1:                   // Bubble up the i'th element:
            for j in 1 .. n-i-1:             //     Go through the unsorted part:
                if array[j-1] > array[j]:    //          Two neighbours are out of order:
                    swap(array, j-1, j)      //              Swap them with each other


::::: online :::::
#### Bubble sort visualisation

::: note
Note that to make the explanation for the sorting algorithms as
simple as possible, our visualisations will show the array as though it
stored simple integers rather than more complex records. But you should
realise that in practice, there is rarely any point to sorting an array
of simple integers. Nearly always we want to sort more complex records
that each have a [key]{.term} value. In such cases we must have a way
to associate a key value with a record. The sorting
algorithms will simply assume that the records are
[comparable]{.term}.
:::

::: dsvis
Here is a visualisation of the first pass of Bubble sorting an array of integers.

``` {.jsav-animation src="Sorting/bubblesortS1CON.js" links="Sorting/BubbleSortAnalysisCON.css" name="Bubble Sort Slideshow 1"}
```
:::

::: dsvis
Now we continue with the second pass.

However, since the largest element has "bubbled" to the very right, we will not need to look at it again.

``` {.jsav-animation src="Sorting/bubblesortS2CON.js" links="Sorting/BubbleSortAnalysisCON.css" name="Bubble Sort Slideshow 2"}
```

Bubble sort continues in this way until the entire array is sorted.
:::

::: dsvis
The following visualisation shows the complete Bubble sort. You can input your own data if you like.

```{.jsav-embedded src="Sorting/bubblesortAV.html" type="ss" name="Bubble Sort Visualisation"}
```
:::

::: dsvis
Now try for yourself to see if you understand how Bubble sort works.

```{.jsav-embedded src="Sorting/BubsortPRO.html" type="ka" name="Bubble Sort Proficiency Exercise"}
```
:::

::::::::::


### Analysis of Bubble sort

How long time does it take to Bubble sort an array of $n$ elements?
As already mentioned in @sec:comparing-algorithms this depends on many things,
but a standard measure is to count the number of comparisons.
So how many comparisons are done by Bubble sort?

We have a nested for loop, where the inner loop depends on the loop variable of the outer loop.

- The outer loop is iterated $n-1$ times in total.
- In iteration $i$, the number of comparisons made by the inner loop is always $n-i-1$.

So the total number of comparisons is

$$
(n-1) + (n-2) + \cdots + 1  =  \sum_{i=1}^{n-1} i  =  \frac{1}{2} n (n-1)
$$

As we will learn later (in @sec:growth-rates), we usually discard constant factors,
and instead we are interested in the general "growth rate" of an algorithm.
And since $n(n-1)$ is very close to $n^2$,
we say that the number of comparisons grows *quadratically* with the size of the array.

Note that this is regardless of how the initial array looks like
-- Bubble sort always uses the same number of comparisons.

::: dsvis
The following visualisation illustrates the running time analysis of Bubble sort.

``` {.jsav-animation src="Sorting/BubbleSortAnalysisCON.js" links="Sorting/BubbleSortAnalysisCON.css" name="Bubble Sort Analysis Slideshow"}
```
:::

If we instead want to know how many swaps that are required,
this depends on how often an element is less than the one immediately preceding it in the array.
In the worst case this will happen in every single comparison, leading to the same number of swaps, *quadratic*.
If we assume that the initial array is random, we can expect that about half of the comparisons will lead to a swap,
which is also quadratic (recall that constant factors don't matter).
However, if the initial array is already sorted we will not perform any swaps at all
-- but we should never rely on the best case, so this doesn't give us much interesting information.
