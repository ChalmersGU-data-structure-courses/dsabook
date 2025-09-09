
## Bubble sort

::: TODO
- Prio 3: write about invariants
:::

Our first sorting algorithm is called [Bubble sort]{.term}.
Bubble sort is often the first sorting algorithm that you learn, because it is relatively easy to understand and implement.
However, it is rather slow, even compared to the other quadratic sorting algorithms that we will introduce in the next sections -- [Selection sort]{.term} and [Insertion sort]{.term}.
It's not even particularly intuitive -- nobody is going to come naturally to Bubble sort as a way to sort their bookshelf, their Bridge hand or their pile of bills, like they might with Insertion sort or Selection sort.

Bubble sort consists of a simple double `for` loop.
The inner `for` loop moves through the array from left to right, comparing adjacent elements.
If an element is greater than its right neighbour, then the two are swapped.
Once the largest element is encountered, this process will
cause it to "bubble" up to the right of the array (which is where
Bubble sort gets its name). The second pass through the array repeats
this process. However, because we know that the largest
element already reached the right of the array on the first pass, there is
no need to compare the rightmost two elements on the second pass.
Likewise, each succeeding pass through the array compares adjacent
elements, looking at one less element toward the end than in the
preceding pass. Here is an implementation:

    function bubbleSort(arr):
        n = arr.size
        for i in 0 .. n-2:
            // Bubble up the i'th element
            for j in 1 .. n-i-1:
                if arr[j-1] > arr[j]:
                    swap(arr, j-1, j)


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

<avembed id="bubblesortAV" src="Sorting/bubblesortAV.html" type="ss" name="Bubble Sort Visualisation"/>
:::

::: dsvis
Now try for yourself to see if you understand how Bubble sort works.

<avembed id="BubsortPRO" src="Sorting/BubsortPRO.html" type="ka" name="Bubble Sort Proficiency Exercise"/>
:::

::::::::::

<!--
### Invariants
-->

### Bubble sort analysis

We have a nested for loop, where the inner loop depends on the loop variable of the outer loop.

- The outer loop is iterated $n-1$ times in total.
- In iteration $i$, the number of comparisons made by the inner loop is always $n-i-1$.

So the total number of iterations is

$$
(n-1) + (n-2) + \cdots + 1 = \sum_{i=1}^{n-1} i
$$

And this sum has the value $n(n-1)/2$, which means the runtime complexity is *quadratic*, $O(n^2)$.
Note that this is regardless of how the initial array looks like, so Bubble sort has the same best- and worst-case complexity.

::: dsvis
The following visualisation illustrates the running time analysis of Bubble sort.

``` {.jsav-animation src="Sorting/BubbleSortAnalysisCON.js" links="Sorting/BubbleSortAnalysisCON.css" name="Bubble Sort Analysis Slideshow"}
```
:::

The number of swaps required depends on how often an element is less than the one immediately preceding it in the array.
In the worst case this will happen in every single comparison, leading to $O(n^2)$ number of swaps.
If we assume that the initial array is random, we can expect that about half of the comparisons will lead to a swap.
So the average case number of swaps is also quadratic, $O(n^2)$.
However, if the initial array is already sorted we don't have to perform any swaps at all, so in the best case the number of swaps is constant $O(1)$.
(But recall that the best case is not something we should rely upon.)

