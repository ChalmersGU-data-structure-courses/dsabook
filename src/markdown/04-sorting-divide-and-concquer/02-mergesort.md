
## Mergesort

::: TODO
- Prio 1: complexity analysis
- Prio 2: general rewrite of the text
- Prio 3: invariants
:::

A divide-and-conquer algorithm does the following things:
(1) divides the problem into smaller problems,
(2) solves each of the smaller problems separately, and
(3) combines their solutions into a final solution.
This fits very well into the general problem of sorting an array:
break the array into pieces, sort each piece, and combine the sorted pieces.
The problem is how to break the array into pieces, and how to combine them afterwards.
The idea behind *Mergesort* is to simply split the array in half.

::: algorithm
#### Algorithm: Mergesort

To sort an array:

1. Split the array into two equal-sized arrays, *left* and *right*,
2. then recursivle sort *left* into *sorted-left* and *right* into *sorted-right*,
3. finally merge *sorted-left* and *sorted-right* into the final sorted array.

:::

Hopefully you noticed that a very important part is missing from the algorithm above.
The way it is described, it will continue calling the recursive step 2 endlessly,
so we need a way to stop it all -- a *base case*.
The standard base case for all divide-and-concquer sorting algorithms is a *singleton* array
-- an array with only one element, which is of course already sorted.

Now we only have to know how to split and merge.
Splitting is really easy: just divide the array in half.
The problem is how to implement merging.

<!-- To merge two sorted arrays, we iterate through them in parallel.
We do this by having two pointers, one for each array.
(Note: a pointer here just means an array index
-- something that tells us where in the array to look.) -->

::: dsvis
Here is a visualisation that illustrates how Mergesort works.

```{.jsav-embedded src="Sorting/mergesortAV.html" type="ss" name="Mergesort Visualisation"}
```
:::

### Merge

The hardest step to understand about Mergesort is how to
merge the two sorted halves into a single sorted array.
This is done by iterating through both sorted halves *in parallel*,
and every time moving the smallest element to the final array.

::: algorithm
#### Algorithm: Merge

To merge two sorted arrays, *left* and *right*:

1. Create an empty *result* array.
2. Point $i, j$ to the first element in *left* and *right*, respectively.
3. Now loop until any of $i$ or $j$ has reached the end of its array:
    - Compare *left*[$i$] with *right*[$j$],
    - if *left*[$i$] is smaller, add it to the end of the *result* and increase $i$,
    - if *right*[$j$] is smaller, add it to the end of the *result* and increase $j$.
4. Finally there are some stray elements in either *left* or *right*:
    - Just add them to the end of the *result*.

:::

::: dsvis
Here is a visualisation for the merge operation.

``` {.jsav-animation src="Sorting/mergesortCON.js" name="Merging Slideshow"}
```
:::

::: dsvis
#### Practice exercise: Merging

Here is a Mergesort warmup exercise to practice merging.

```{.jsav-embedded src="Sorting/MergesortMergePRO.html" type="ka" name="Mergesort Merging Proficiency Exercise"}
```
:::

::: dsvis
#### Practice exercise: Merge sort

Now here is a full proficiency exercise to put it all together.

```{.jsav-embedded src="Sorting/mergesortPRO.html" type="pe" name="Mergesort Proficiency Exercise"}
```
:::


### Categorising Mergesort

Note that the merging algorithm is not in-place, becaue we allocate space for the temporary *result* array.
In is in fact possible to do the merging in-place,
but this involves moving around elements in a way similar to Insertion sort,
which is both is more complex and less efficient as the algorithm above.

If you recall our categorisation of sorting algorithms from @sec:terminology,
we are now ready to categorise Mergesort:

- In-place: *no*, as we already mentioned it is very costly to make merging in-place.
- Stable: *yes*, two equal elements will never swap places (if we implement merging correctly).
- Adaptive: *no*, the algorithm runs the same number of steps regardless of how the array is sorted from the start.

#### Insertion sort as a variant of Mergesort

Mergesort splits the input array into two equal-size arrays.
But what happens if we split in another way?
What if we always make the right part just one single element?

Merging will then be the same as inserting this singleton element into a sorted array,
and this is exactly what Insertion sort does!
So conceptually, we can view Insertion sort as a corner case of Mergesort, where we split very unevenly.

#### Divide-heavy or combine-heavy

Most divide-and-conquer algorithms spend most of their time in one of the two main steps.
Either they do the heavy work in the divide step (making combining trivial),
or most work is in the combine step (making dividing easy).
Mergesort is of the latter kind.

So, is there any other divide-and-conquer sort that is divide-heavy instead?
Yes, it is called Quicksort and is the topic for @sec:quicksort.


### Complexity analysis

How efficient is Mergesort?
Recall that Selection and Insertion sort are quadratic, $O(n^2)$,
because they use two nested for loops, each of them linear.

The analysis is actually not trivial because Mergesort is a recursive algorithm,
and reasoning about recursion is very difficult in general.
However, we can visualise how Mergesort works in a way that will make the complexity clearer.

#### If the size is a power of two

First, let us assume that the array consists of exactly $n = 2^k$ elements.
In the first recursive call it will split this array into two with $2^{k-1}$ elements each.
Both of these will be split into two arrays each, so $2\times 2 = 4 arrays of size $2^{k-2}$.
And these will in turn be split into $2\times 2\times 2=2^3$ arrays of size $2^{k-3}$,
until in the end we have $2^k$ arrays with only one element.
Here is a picture of how the splitting goes:

![](images/MergesortSplit.png)

Note that each of these levels contain exactly $n = 2^k$ elements -- the size of each level is the same!

Now, when we have reached the base case, we can start merging the smaller arrays.
First each pair of the $2^k$ singleton arrays are merged into two-element arrays.
Then each pair of these $2^{k-1}$ two-element arrays are merged into 4-element arrays.
Then each pair of these $2^{k-2}$ 4-element arrays are merged, and so on.
In the end we will merge two arrays of size $2^{k-1}$ into the final sorted array, like this:

![](images/MergesortMerge.png)

Just as for splitting we note that each level contains exactly $n = 2^k$ elements.
So how does this relate to complexity?

-   First we recall that merging is more expensive than splitting, so it is enough to only analyse the merging steps.
-   What is the complexity of merging two arrays of size $m$?
    Note that in each iteration we increase one of the pointers,
    so when both pointers have reached the end, we have executed $m+m$ iterations.
    So merging is linear, $O(m)$.
-   In each level $r$ we merge $2^r$ arrays, each of size $2^{k-r}$.
    So the total complexity of merging one full level is $O(2^r \cdot 2^{k-r})$.
    And since $2^r \cdot 2^{k-r} = 2^k$, we get $O(2^k)$.
-   We have in total $k$ levels, so in the end we get the final complexity $O(k \cdot 2^k)$.

But wait, does this mean that Mergesort is exponential?
No, definitely not!
Recall that $k$ is not the size of the original array -- the size $n$ is $2^k$,
so we get the following final complexity in the size of the array (because $O(k) = O(\log_2(n)) = O(\log(n))$):

$$ O(n \log(n)) $$

If you look at the picture above, you see that each level has $n$ elements and there are $\log(n)$ levels,
and the final complexity is just each row times the number of levels.

The linearithmic complexity of Mergesort is much much faster than the algorithms from [Chapter @sec:sorting-part-1],
which are all quadratic, $O(n^2)$.
In fact, $O(n\log(n))$ is in practice almost linear, because $\log(n)$ grows so much slower than any polynomial function.

::: dsvis
This visualisation provides a running time analysis for Mergesort.

``` {.jsav-animation src="Sorting/MergeSortAnalysisCON.js" links="Sorting/MergeSortAnalysisCON.css" name="Mergesort Analysis Slideshow"}
```
:::

#### Complexity for arbitrary array sizes

In our analysis we assumed that we had exactly $n = 2^k$ elements, so what if the array size is not a power of two?
Let us assume that the array has $n'$ elements, where $n/2<n'<n$.
Since $n=2^k$ is a power of two, then $\frac{n}{2}=2^{k-1}$ is also a power of two.
Our analysis above concluded that the complexity of sorting a size $n=2^k$ array is $O(n\log(n))$.
Now, since $\frac{n}{2}=2^{k-1}$ is also a power of two, the same analysis gives the complexity
of sorting a size $\frac{n}{2}$ array to be $O(\frac{n}{2}\log(\frac{n}{2}))$.
But this can be simplified to $O(n\log(n))$, because we can ignore constant factors inside big-$O$.

And since sorting arrays of size $\frac{n}{2}$ and $n$ both have the same complexity,
then that must be true for all array sizes in between, $\frac{n}{2}<n'<n$.


### Optimisations

Just as we discussed for the previous sorting algorithms in @sec:empirical-analysis-and-code-tuning,
there are some optimisations one can do to the naive Mergesort algorithm from above.

#### Use just one temporary array

The first optimisation is very easy and will usually save some time, but not by a large amount.
In the algorithm above we create a new temporary array in each recursive call,
and creating a new array costs a little bit of time.

Instead we can create one single temporary array just before we start sorting,
and that array in every recursive call.

#### Using a backoff algorithm

Mergesort is way faster than Insertion and Selection sort for large arrays because of the better complexity.
But when the arrays are small (perhaps 50 elements or so), the "slower" algorithms are actually faster
-- the reason for this is that Mergesort is more complex which leads to larger constant factors.

This fact, that there are algorithms that are faster on small arrays, can be used for a very simple optimisation. Whenever the size of the input array is small enough (say, less than 50 elements),
we can call Insertion or Selection sort on that array instead of continuing with Mergesort.

Note that this will not change the complexity of the implementation,
but it can nonetheless improve the speed by some factor.
Also note that the exact cutoff depends a lot on what computer you have,
what programming language you use, etc.
The only way to know which array size is the optimal cutoff is to do a lot of testing
-- but a rule of thumb is that it is probably faster to use Insertion sort on an array of up to 50 elements.


### Bottom-up Mergesort

If you look at the figure above that showed all the splitting steps,
you might wonder why all this recursive splitting is necessary in the first place.
We will anyway have to split all the way down to a bunch of singleton arrays before we can start merging.

There is a version of Mergesort that short-circuits the splitting
by dividing the whole array into singleton arrays already at the start.
Then it does one pass over this whole array of arrays and merges each pair of singletons into two-element arrays.
And then each pair of two-element arrays into four-element arrays, and so on until we have merged the whole array.
The structure is exactly as the figure earlier showing the merging steps.
This variant is called *bottom-up Mergesort* (as opposed to the original top-down Mergesort).
Bottom-up Mergesort can be implemented without recursion,
where every level instead becomes an iteration in an outer loop.
But just as the top-down variant it still needs to allocate additional space for the merging.

#### Run-based Mergesort

If we implement bottom-up Mergesort we can be even smarter.
Instead of splitting the array into the smallest possible parts (that is, singleton arrays),
we can make use of the "natural order" that's already in the array.
Even an array which is very random contains sorted subarrays.
For example, assume we want to sort the following array:

$$ [3, 88, 65, 34, 42, 67, 7, 65, 99, 8] $$

We can start by dividing it into already-sorted arrays, which are called *runs*:

$$ [3, 88],  [65],  [34, 42, 67],  [7, 65, 99],  [8] $$

Now we can continue merging smaller arrays into larger.
This version is called *run-based Mergesort*, and it is one of the most efficient sorting algorithms.
For example, it is what Python uses as its standard sorting algorithm.

There is a lot more that can be said about run-based Mergesort.
One thing that has a big effect on the efficiency is in which order we choose to merge the runs
-- we want the runs to be as equal as possible in size.
There are many different strategies to do this,
and the following blog post gives a good introduction if you are interested:

> https://www.wild-inter.net/publications/munro-wild-2018

