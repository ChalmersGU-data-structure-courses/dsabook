
## Case study: Analysing binary search

Now we will discuss the algorithmic complexity of the two search algorithms that we introduced in @sec:case-study-searching-in-a-list.

In @sec:input-size, we deduced that the running time for linear search on an array if size $n$ is $O(n)$.
If we assume that the value is equally likely to appear in any location, this complexity is both the average case and the worst case.
(The best case is constant, $O(1)$, and occurs when the searched value occurs first in the array.
But as we already discussed we are rarely interested in the best case.)

But what is the complexity of the binary search algorithm?

### Complexity of binary search

To find the worst-case cost of binary search, we can model the running time as a recurrence and then find the closed-form solution.
Each recursive call to `binarySearch` cuts the size of the array approximately in half, so we can model the worst-case cost as follows, assuming for simplicity that $n$ is a power of two.

\begin{equation*}
\begin{split}
O(n) &= O(n/2) + 1 \\
O(1) &= 1
\end{split}
\end{equation*}

If we expand the recurrence, we will find that we can do so only $\log n$ times before we reach the base case, and each expansion adds one to the cost.

- For a problem of size $n$, we have $1$ unit of work plus the amount of work required for one subproblem of size $n/2$: $O(n) = 1 + O(n/2)$
- For a problem of size $n/2$, we have $1$ unit of work plus the amount of work required for one subproblem of size $n/4$: $O(n) = 1 + (1 + O(n/4))$
- For a problem of size $n/4$, we have $1$ unit of work plus the amount of work required for one subproblem of size $n/8$: $O(n) = 1 + (1 + (1 + O(n/8)))$
- ...etc, until we reach a subproblem of size $1$: $O(n) = 1 + (1 + (1 + (1 + (1 + (\ldots)))))$

Thus, the closed form solution of $O(n) = O(n/2) + 1$ can be modeled by the summation

$$
\sum_{i=0}^{\log n} 1 \in O(\log n)
$$

::: dsvis
Here is a visual explanation of the complexity of binary search.

<inlineav id="BsearchDandCRecurCON" src="AlgAnal/BsearchDandCRecurCON.js" name="Binary Search recurrence slideshow" links="AlgAnal/BsearchDandCRecurCON.css"/>
:::

Comparing sequential search to binary search, we see that as $n$ grows,
the $O(n)$ running time for sequential search in the average and
worst cases quickly becomes much greater than the $O(\log n)$
running time for binary search. Taken in isolation, binary search
appears to be much more efficient than sequential search. This is
despite the fact that the constant factor for binary search is greater
than that for sequential search, because the calculation for the next
search position in binary search is more expensive than just
incrementing the current position, as sequential search does.

However, binary search comes with a precondition: the array must be sorted.
And sorting an array is a time-consuming operation -- in fact it is $O(n\log n)$ in the worst case, as we will see in chapter [-@sec:sorting-divide-and-conquer].
So there's a tradeoff here -- to be able to search the array efficiently we need to keep it sorted.
This is not much of a problem if this is something we only have to do once, but it can be very costly if the array changes because we insert and delete elements.
Only in the context of the complete problem to be solved can we know whether the advantage outweighs the disadvantage.

So, if we want to maintain a searchable collection which changes over time, a sorted array is not a good choice.
But an unsorted array isn't either -- instead we should use smarter data structures such as [search trees]{.term} (chapter [-@sec:search-trees]) or [hash tables]{.term} (chapter [-@sec:hash-tables]).
