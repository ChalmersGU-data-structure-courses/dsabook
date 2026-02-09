
## Mergesort

::: TODO
- Prio 1: complexity analysis
- Prio 2: general rewrite of the text
- Prio 3: invariants
:::

Today’s algorithm, Mergesort, is a perfect example of a divide-and-conquer algorithm. The general structure looks like this (compare with the general structure above):

To sort an array:

1. Split the array into two equal-sized arrays, *left* and *right*,
2. then sort *left* into *sorted-left* and *right* into *sorted-right*,
3. finally merge *sorted-left* and *sorted-right* into the final sorted array.

Now we only have to know how to split and merge. Splitting is really easy: just divide the array in half. The problem is how to implement merging.

To merge two sorted arrays, we iterate through them in parallel. We do this by having two pointers, one for each array. (Note: a pointer here just means an array index – something that tells us where in the array to look.)

### The base case! {-}

Hopefully you noticed that forgot a very important part in my algorithm. The way I described divide-and-conquer, it will continue calling the recursive step 2 endlessly, so we need a way to stop it all. This is called the *base case*.

Just before the very first divide step, we have to check if the problem is small enough. If so we don’t have to divide it further but can instead just return the trivial solution. Exactly what a “small enough” problem is, and what its “trivial solution” is, depends on the problem at hand.

The standard base case for Mergesort is a *singleton* array – an array with only one element. This array is of course already sorted, so the solution is to just return it.

### Merging two sorted arrays {-}

Here is the algorithm for merging two sorted arrays, *left* and *right*:

1. Create an empty *result* array.
2. Point $i, j$ to the first element in *left* and *right*, respectively.
3. Now loop until any of $i$ or $j$ has reached the end of its array:
    - Compare *left*[$i$] with *right*[$j$],
    - if *left*[$i$] is smaller, add it to the end of the *result* and increase $i$,
    - if *right*[$j$] is smaller, add it to the end of the *result* and increase $j$.
4. Finally there are some stray elements in either *left* or *right*:
    - Just add them to the end of the *result*.

You can try to sort a bookshelf in this way. You will quickly notice that it is very difficult to do the merging in-place, efficiently (that is, without “sliding” the books in the left part). But if you instead move the books out of the shelf and merge back in, it becomes easy. And this intuition is true also for a computer implementation – making Mergesort in-place is difficult, and quite costly. This is the main disadvantage with this sorting algorithm – we need to allocate extra space.

### Allocating extra space in practice {-}

Creating a new temporary array in each recursive call takes some time, and it is often more efficient to do that once and for all before the first recursive call. You can do this by creating a new empty array with the same size as the original array, before starting the recursion. Then you give both the original array and the temporary array as arguments to the recursive Mergesort function.

And remember, you should not use slicing because that copies a new array. Instead you should use two pointers (array indices), *low* and *high*, to indicate what part of the array you want to sort. Just as you did for binary search.

### Complexity analysis {-}

How efficient is Mergesort? Recall that Selection and Insertion sort are quadratic, $O(n^2)$, because they use two nested for loops, each of them linear.

The analysis is actually not trivial because Mergesort is a recursive algorithm, and reasoning about recursion is very difficult in general. However, we can visualise how Mergesort works in a way that will make the complexity clearer.

First, let’s assume that the array consists of exactly $n = 2^k$ elements. In the first recursive call it will split this array into two with $2^{k-1}$ elements each. Both of these will be split into two arrays each, so $4$ (= $2^2$) arrays of size $2^{k-2}$. And these will in turn be split into $2^3$ arrays of size $2^{k-3}$, until in the end we have $2^k$ arrays with only one element. Here is a picture of how the splitting goes:

![](images/MergesortSplit.png)

Note that each of these levels contain exactly $n = 2^k$ elements – the size of each level is the same!

Now, when we have reached the base case, we can start merging the smaller arrays. First each pair of the $2^k$ singleton arrays are merged into two-element arrays. Then each pair of these $2^{k–1}$ two-element arrays are merged into 4-element arrays. Then each pair of these $2^{k–2}$ 4-element arrays are merged, and so on. In the end we will merge two arrays of size $2^{k–1}$ into the final sorted array, like this:

![](images/MergesortMerge.png)

Just as for splitting we note that each level contains exactly $n = 2^k$ elements. So how does this relate to complexity?

- First we recall that merging is more expensive than splitting, so it’s enough to only analyse the merging steps.
- What is the complexity of merging two arrays of size $m$? Note that in each iteration we increase one of the pointers, so when both pointers have reached the end, we have executed $m+m$ iterations. So merging is linear, $O(m)$.
- In each level $r$ we merge $2^r$ arrays, each of size $2^{k–r}$. So the total complexity of merging one full level is $O(2^r \cdot 2^{k–r})$. And since $2^r \cdot 2^{k–r} = 2^k$, we get $O(2^k)$.
- We have in total $k$ levels, so in the end we get the final complexity $O(k \cdot 2^k)$.

But wait, does this mean that Mergesort is exponential? No, definitely not! Recall that $k$ is not the size of the original array – the size $n$ is $2^k$, so we get the following final complexity in the size of the array (because $O(k) = O(\log_2(n)) = O(\log(n))$):

$$ O(n \log(n)) $$

If you look at the picture above, you see that each level has $n$ elements and there are $\log(n)$ levels, and the final complexity is just each row times the number of levels.

I assumed that we had exactly $n = 2^k$ elements, but we get the same complexity for other sizes too. One way to see this is like this: $n/2$ is also a power of 2, so our result above holds for an array of size $n/2$ too. The complexity of this is $O(n/2 \log(n/2))$, but this can be simplified to $O(n \log(n))$, because we can ignore constant factors. And since arrays of size $n/2$ and $n$ both have the same complexity, then all sizes $n'$ in between, $n/2 < n' < n$, must also be $O(n \log(n))$.

Now we have concluded that Mergesort is a linearithmic algorithm, $O(n \log(n))$. This is much much faster than the previous sorts which are quadratic, $O(n^2)$. In fact, linearithmic is in practice almost linear, because $\log(n)$ grows so slow.

### In-place, stability, and adaptivity

Recall our categorisation of sorting algorithms? Now we are ready to categorise Mergesort:

- In-place: *no*, as we already mentioned it is very costly to make merging in-place.
- Stable: *yes*, two equal elements will never swap places.
- Adaptive: *no*, the algorithm takes the same time regardless of how the array is sorted from the start.

### Divide-heavy or combine-heavy

Most divide-and-conquer algorithms spend most of their time in one of the steps. Either they do the heavy work in the divide step (making combine trivial), or most work is in the combine step (making dividing easy). Mergesort is of the latter kind.

So, is there any other divide-and-conquer sort that is divide-heavy instead? Yes, it is called Quicksort and is the topic for @sec:quicksort.

### Using a backoff algorithm

Mergesort is way faster than Insertion and Selection sort for large arrays because of the better complexity. But when the arrays are small (perhaps 50 elements or so), the “slower” algorithms are actually faster – the reason for this is that Mergesort is more complex which leads to larger constant factors.

This fact, that there are algorithms that are faster on small arrays, can be used for a very simple optimisation. Whenever the size of the input array is small enough (say, less than 20 elements), we can call Insertion or Selection sort on that array instead of continuing with Mergesort.

Note that this will not change the complexity of the implementation, but it can anyway improve the speed by some factor. Also note that the exact cutoff depends a lot on what computer you have, what programming language you use, etc. The only way to know which array size is the optimal is to do a lot of testing – but a rule of thumb is that it’s probably faster to use Insertion sort on a 10–20 element array.

### Bottom-up Mergesort (optional)

If you look at the figure above that showed all the splitting steps, you might wonder why all this recursive splitting is necessary in the first place. We will anyway have to split all the way down to a bunch of singleton arrays before we can start merging.

There is a version of Mergesort that short-circuits the splitting by dividing the whole array into singleton arrays already at the start. Then it does one pass over this whole array of arrays and merge each pair of singletons into two-element arrays. And then each pair of two-element arrays into four-element arrays, and so on until we have merged the whole array. The structure is exactly as the figure earlier showing the merging steps. This variant is called *bottom-up Mergesort* (as opposed to the original top-down Mergesort). Bottom-up Mergesort can be implemented without recursion, instead every level becomes an iteration in an outer loop. But just as the top-down variant it still needs to allocate additional space for the merging.

If we implement bottom-up Mergesort we can be even smarter. Instead of splitting the array into the smallest possible parts (that is, singleton arrays), we can make use of the “natural order” that’s already in the array. Even an array which is very random contains sorted subarrays. For example, assume we want to sort the following array:

$$ [3, 88, 65, 34, 42, 67, 7, 65, 99, 8] $$

We start by dividing it into already-sorted arrays, which are called *runs*:

$$ [3, 88],  [65],  [34, 42, 67],  [7, 65, 99],  [8] $$

Now we can continue merging smaller arrays into larger. This version is called *run-based Mergesort*, and it is one of the most efficient sorting algorithms. For example, it is what Python uses as its standard sorting algorithm.

There is a lot more that can be said about run-based Mergesort. One thing that has a big effect on the efficiency is in which order we choose to merge the runs – we want the runs to be as equal as possible in size. There are many different strategies to do this, and the following blog post gives a good introduction if you are interested:

> https://www.wild-inter.net/publications/munro-wild-2018

### Insertion sort as a variant of Mergesort (optional)

Mergesort splits the input array into two equal-size arrays. But what happens if we split in another way? What if we always make the right part just one single element?

Merging will then be the same as inserting this singleton element into a sorted array, and this is exactly what Insertion sort does! So conceptually, we can view Insertion sort as a corner case of Mergesort, where we split very unevenly.


------------------

A natural approach to problem solving is divide and conquer. To use
divide and conquer when sorting, we might consider breaking the list to
be sorted into pieces, process the pieces, and then put them back
together somehow. A simple way to do this would be to split the list in
half, sort the halves, and then merge the sorted halves together. This
is the idea behind [Mergesort]{.term}.

Mergesort is one of the simplest sorting algorithms conceptually, and
has good performance both in the asymptotic sense and in empirical
running time. Unfortunately, even though it is based on a simple
concept, it is relatively difficult to implement in practice. Here is a
pseudocode sketch of Mergesort:

    function mergeSort(arr):
        if A.size <= 1:
            return
        L1 = half of arr
        L2 = other half of arr
        mergeSort(L1)
        mergeSort(L2)
        merge(L1, L2)

::: dsvis
Here is a visualisation that illustrates how Mergesort works.

```{.jsav-embedded src="Sorting/mergesortAV.html" type="ss" name="Mergesort Visualisation"}
```
:::

#### Merge

The hardest step to understand about Mergesort is the merge function.
The merge function starts by examining the first record of each sublist
and picks the smaller value as the smallest record overall. This smaller
value is removed from its sublist and placed into the output list.
Merging continues in this way, comparing the front records of the
sublists and continually appending the smaller to the output list until
no more input records remain.

Here is pseudocode for merging two lists:

    function merge(L1, L2):
        answer = new empty list
        while L1 and L2 are nonempty:
            x = first element of L1
            y = first element of L2
            if x <= y:
                append x to answer
                remove x from L1
            else:
                append y to answer
                remove y from L2
        // Now only one of L1 and L2 is nonempty, so append its remaining elements
        append all elements of L1 or L2 to answer
        return answer

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
### Practice exercise: Merge sort

Now here is a full proficiency exercise to put it all together.

```{.jsav-embedded src="Sorting/mergesortPRO.html" type="pe" name="Mergesort Proficiency Exercise"}
```
:::

<!--
### Invariants
-->

### Complexity analysis

::: TODO
- Change the long lists to an image
- complexity
- cutoff to Insertion sort *does not* change complexity
- stable, not in-place
:::

Consider repeatedly splitting an array of $n$ elements, where $n$ is a power of 2.
The recursion will go down $k=\log n$ levels until there are only $1$-element arrays left.
Each recursion level is shown as one row in this table:

  Level       How many parts      Size per part         Splitting each part
----------  ------------------  --------------------  --------------------------------------
    1         The full array      $n$ elements          $1\times n = n$ units of work
    2         $2$ halves          $n/2$ elements        $2\times n/2 = n$ units of work
    3         $4$ quarters        $n/4$ elements        $4\times n/4 = n$ units of work
   ...        ...                 ...                   ...
   $k$        $n/2$ subarrays     $2$ elements          $n/2\times 2 = n$ units of work
----------  ------------------  --------------------  --------------------------------------

<!--
- The first level consists of the full array:
    - Splitting the full array into two halves requires $n$ units of work.
- The second level consists of two halves, with $n/2$ elements each:
    - Splitting one of the halves into two requires $n/2$ units of work.
    - Splitting the other half into two requires $n/2$ units of work.
    - In total $2\times n/2 = n$ units of work.
- The third level consists of four quarters, with $n/4$ elements each:
    - Splitting each of the quarters requires $n/4$ units of work.
    - In total $4\times n/4=n$ units of work.
- ...
- ...until level $k$, which consists of $n/2$ sub-arrays, each of which contains only $2$ elements.
    - Splitting each of the pairs requires $2$ units of work.
    - In total $n/2\times 2=n$ units of work.
-->

After a sub-array has been split, the next level is called recursively which returns the sorted splits.
Then we have to merge them before returning the sorted sub-array to the previous level,
which is shown in the following table:

   Level         How many parts           Size per part           Merging pairs
-------------  -----------------------  ----------------------  --------------------------------------
   $k$           $n$ singleton arrays     $1$ element each        $n\times 1 = n$ units of work
  $k-1$          $n/2$ pairs              $2$ elements each       $n/2\times 2 = n$ units of work
   ...           ...                      ...                     ...
    2            $4$ subarrays            $n/4$ elements each     $4\times n/4 = n$ units of work
    1            $2$ subarrays            $n/2$ elements each     $2\times n/2 = n$ units of work
-------------  -----------------------  ----------------------  --------------------------------------

<!--
- Level $k$ consists of $n/2$ pairs of singleton arrays.
    - To merge a pair we have to look at each of the values, so it requires $2$ units of work.
    - In total $n/2\times 2=n$ units of work.
- Level $k-1$ consists of $n/4$ pairs of sorted $2$-element arrays.
    - Merging two $2$-elements arrays requires $4$ units of work.
    - In total $n/4\times 4=n$ units.
- ...
- Level two consists of $2$ pairs of sorted $n/4$-element arrays.
    - Merging two $n/4$-element arrays requires $n/2$ units of work.
    - In total $2\times n/2=n$.
- And finally the first level constists of one pair of sorted $n/2$-element arrays.
    - Merging these two arrays requires $n$ units of work.
-->

In summary, each level spends $O(n)$ time, and there are $k=\log n$ levels.
So the total running time of Mergesort is $O(n \log n)$.
Note that this cost is unaffected by the relative order of the values being sorted, thus this analysis holds for the best, average, and worst cases.


::: dsvis
This visualisation provides a running time analysis for Mergesort.

``` {.jsav-animation src="Sorting/MergeSortAnalysisCON.js" links="Sorting/MergeSortAnalysisCON.css" name="Mergesort Analysis Slideshow"}
```
:::
