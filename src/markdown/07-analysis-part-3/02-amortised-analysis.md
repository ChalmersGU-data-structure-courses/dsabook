
## Amortised analysis

::: TODO
- Prio 1: replace the examples with: a queue as a pair of stacks
- Prio 1: describe the potential method better
- Prio 3: merge (or relate) with previous section
- Prio 3: make self-organising lists a "case study"
:::

This section presents the concept of
[amortized analysis]{.term}, which is the
analysis for a series of operations taken as a whole. In particular,
amortized analysis allows us to deal with the situation where the
worst-case cost for $n$ operations is less than $n$ times the worst-case
cost of any one operation. Rather than focusing on the individual cost
of each operation independently and summing them, amortized analysis
looks at the cost of the entire series and "charges" each individual
operation with a share of the total cost.

The standard example for amortised analysis is dynamic arrays which were introduced in section XX.
In that section we gave an informal argument why it is important to grow the array in the right way.
If we do it by doubling the array size, we get *amortised* constant time for all basic operatinos,
but if we do it in the wrong way we get linear time operations in the worst case.

Dynamic arrays are such an important example for amortised analysis that we will devote the whole of next section to them.
But before that we will explain the concepts and give some other examples.

<!--
We can apply the technique of amortized analysis in the case of a series
of sequential searches in an unsorted array. For $n$ random searches,
the average-case cost for each search is $n/2$, and so the *expected*
total cost for the series is $n^2/2$. Unfortunately, in the worst case
all of the searches would be to the last item in the array. In this
case, each search costs $n$ for a total worst-case cost of $n^2$.
Compare this to the cost for a series of $n$ searches such that each
item in the array is searched for precisely once. In this situation,
some of the searches *must* be expensive, but also some searches *must*
be cheap. The total number of searches, in the best, average, and worst
case, for this problem must be $\sum_{i=i}^n i \approx n^2/2$. This is a
factor of two better than the more pessimistic analysis that charges
each operation in the series with its worst-case cost.
-->

::: topic
#### Example: Multipop on stacks

Assume that we want to add a new operation *multipop* on stacks,
where *multipop*($k$) will pop the $k$ topmost elements off the stack.
The operation is implemented in the straightforward by simply repeating a single *pop* operation *k* times.

What is the time complexity of this new operation?
Since we're repeating the constant-time *pop* operation $k$ times, we get a time complexity of $O(k)$.
And the worst case of this is when $k$ is as large as possible, i.e., the stack size $n$.
So the worst-case complexity for *multipop* is linear in the stack size $O(n)$.

This is quite correct, the worst-case complexity of a single call to *multipop* is linear in $n$.
But what is the complexity of executing a large number of stack operations in sequence?

Let's say that we start from an empty stack and execute a sequence of $n$ *push* operations and $n$ *multipop* operations.
Using our analysis above, the whole sequence of $2n$ operations will have worst-case complexity
$n\cdot O(1) + n\cdot O(n) = O(n+n^2) = O(n^2)$.
Since we performed $2n$ operations, we get an average complexity per operation of $O(n^2)/2n = O(n)$.
This analysis is unreasonably pessimistic.
Clearly it is not really possible to pop $n$ elements each time *multipop* is called.
Analysis that focuses on single operations cannot deal with this global limit, and so we turn to amortized analysis to model the entire series of operations.

We can reason like this instead:
$n$ elements are pushed to the stack, and each of these elements can only be popped once.
The sum of costs for all calls to *multipop* can never be more than the total number of elements that has been pushed on the stack, which is $n$.
This means that the total complexity of our $n$ calls to *multipop* must be in $O(n)$.
This is the same complexity as the $n$ calls to *pop*, so our total complexity cannot be worse than $O(n) + O(n) = O(n)$.

Therefore the average worst-case complexity per operation must be $O(n)/n = O(1)$, i.e., constant.
:::

In the *multipop* example we got two different complexities for the *multipop* operation:
first we found that it is linear in the stack size, $O(n)$,
but when averaging over a sequence of operations we found that it is constant, $O(1)$.
So, which complexity is the right one?

Actually, both are correct.
The worst-case complexity for a single call to *multipop* is linear in the worst case,
but the *amortised* complexity is constant.
This means that when executing *multipop* many many times, it will behave as it is constant time:
some individual calls might take longer time, but this is balanced out by other calls that are fast.

In the example we used a very hand-waving, informal argument, but the underlying idea is the concept of a [potential]{.term}.
In the potential method we let cheap operations "save up" some additional work that can be used by more expensive operations later.
In the example, we let each *push* save an extra operation "for later", which is then used by *multipop*.
In a way we can say that each *push* takes 2 time units instead of one, and this extra time unit is saved so that *multipop* can make use of it.
These storage of "for later" operations is called the *potential*.

::: topic
#### Example: Incrementing a binary counter

As another example of amortised analysis, consider the process of incrementing a binary counter.
We want to show that this operation (*increment*) takes amortised constant time in the size of the counter.
Since the counter is stored as a binary number, we say that the size of the counter is the number of bits it uses.

The *increment* operation can be implemented like this.

- Iterate over the bits in the counter, starting from the lowest-order bit (the rightmost bit).
    - Change each 1-bit to a 0, until the first 0-bit is encountered.
    - Then change this 0-bit to 1 and return.

For example, to increment the number 175 (bitstring `10101111`), we flip the four rightmost 1's to 0, and then the next 0-bit to 1.
This results in the bitstring `10110000`, which is the number 176.

The worst case example is when the counter consists of only 1's, such as the number 255 (bitstring `11111111`).
In this case the complexity of *increment* is linear, $O(n)$, in the number of bits $n$.
So what is the amortised complexity of *increment*?

If we count from 0 through $M = 2^n-1$, what is the average cost for *increment*?
Naive worst-case analysis says that each increment costs $O(n)$.
But it is rare to have so many bits processed in one single increment.
In fact, half of the time the low-order bit is `0`, and so only that bit is processed.
One quarter of the time, the low-order two bits are `01`, and so only the low-order two bits are processed.
Another way to view this is that the low-order bit is always flipped,
the bit to its left is flipped half the time,
the next bit one quarter of the time, and so on.
We can capture this with the following summation (charging costs to bits going from right to left):

$$
1 + \frac{1}{2} + \frac{1}{4} + \frac{1}{8} + \cdots
= \sum_{i=0}^{n-1} \frac{1}{2^i}
< 2
$$

In other words, the average number of bits flipped on each increment is 2, leading to a total cost of only $2 \cdot M\in O(M)$ for a series of $M$ increments.
Therefore, the amortised cost for *increment* is $O(M)/M = O(1)$.
:::

Our final example uses amortized analysis to prove a relationship
between the cost of the [move-to-front]{.term}
[self-organizing list]{.term} heuristic and the cost for the optimal static
ordering of the list.

Recall that, for a series of search operations, the minimum cost for a
static list results when the list is sorted by frequency of access to
its records. This is the optimal ordering for the records if we never
allow the positions of records to change, because the most-frequently
accessed record is first (and thus has least cost), followed by the next
most frequently accessed record, and so on.

::: topic
#### Theorem: Self-organizing lists

**Theorem:** The total number of comparisons required by any series $S$
of $n$ or more searches on a [self-organizing list]{.term} of length $n$ using
the move-to-front heuristic is never more than twice the total number of
comparisons required when series $S$ is applied to the list stored in
its optimal static order.

**Proof:** Each comparison of the search key with a record in the list
is either successful or unsuccessful. For $m$ searches, there must be
exactly $m$ successful comparisons for both the self-organizing list and
the static list. The total number of unsuccessful comparisons in the
self-organizing list is the sum, over all pairs of distinct keys, of the
number of unsuccessful comparisons made between that pair.

Consider a particular pair of keys: $A$ and $B$. For any sequence of
searches $S$, the total number of (unsuccessful) comparisons between $A$
and $B$ is identical to the number of comparisons between $A$ and $B$
required for the subsequence of $S$ made up only of searches for $A$ or
$B$. Call this subsequence $S_{AB}$. In other words, including searches
for other keys does not affect the relative position of $A$ and $B$ and
so does not affect the relative contribution to the total cost of the
unsuccessful comparisons between $A$ and $B$.

The number of unsuccessful comparisons between $A$ and $B$ made by the
move-to-front heuristic on subsequence $S_{AB}$ is at most twice the
number of unsuccessful comparisons between $A$ and $B$ required when
$S_{AB}$ is applied to the optimal static ordering for the list. To see
this, assume that $S_{AB}$ contains $i$ $A$ s and $j$ $B$ s, with
$i \leq j$. Under the optimal static ordering, $i$ unsuccessful
comparisons are required because $B$ must appear before $A$ in the list
(because its access frequency is higher). Move-to-front will yield an
unsuccessful comparison whenever the request sequence changes from $A$
to $B$ or from $B$ to $A$. The total number of such changes possible is
$2i$ because each change involves an $A$ and each $A$ can be part of at
most two changes.

Because the total number of unsuccessful comparisons required by
move-to-front for any given pair of keys is at most twice that required
by the optimal static ordering, the total number of unsuccessful
comparisons required by move-to-front for all pairs of keys is also at
most twice as high. Because the number of successful comparisons is the
same for both methods, the total number of comparisons required by
move-to-front is less than twice the number of comparisons required by
the optimal static ordering.
:::
