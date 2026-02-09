
## Amortised analysis

::: TODO
- Prio 1: replace the examples with: a queue as a pair of stacks
- Prio 1: describe the potential method better
- Prio 3: merge (or relate) with previous section
- Prio 3: make self-organising lists a "case study"
:::

The worst case complexity of appending to a dynamic array is linear in the length of the array – because if we are unlucky we have to resize it. But why does it not behave like that?

This is because most of the time we are lucky. If we append to the dynamic array enough times, the cost of one expensive operation will be evened out by the cheap cost of all the lucky appends. We say that the *amortised* cost of appending to a dynamic array is constant.

Note that amortised complexity is a completely different concept from worst-/best-average case, so we can talk about the amortised worst-case complexity or the amortised average-case complexity.

Amortised complexity of dynamic arrays

So how can we analyse dynamic array append?

Let’s assume that we already have a dynamic array that is half-empty. The underlying backing array has size $2n$ and it is filled with $n+1$ elements, like this:

![](images/DynamicArray1.png)

Now we append $n$ new elements to the array. The first $n–1$ appends are cheap, $O(1)$, after which the backing array becomes full:

![](images/DynamicArray2.png)

The very last append forces us to resize the array, which is an expensive linear operation, $O(n)$. After this the backing array looks like this, which is the same as what we had at the start (but twice as large):

![](images/DynamicArray3.png)

The total cost for all these n appends is $(n–1)O(1) + O(n) = O(n) + O(n) = O(2n) = O(n)$. On average this means $O(n)/n = O(1)$ per operation.

This is why we can say that appending to a dynamic array is $O(n)$ in the worst case, but the amortised complexity is constant, $O(1)$.

### When not to use amortisation

In most cases amortised complexity is what we are interested in, but there are some rare cases where it is not the best choice.

If we are implementing a very time-critical system, where we must guarantee that an operation never ever takes more than (for example) 0.0001 microseconds, then a dynamic array might not be the best option. But then we definitely should not use Python or Java either, but instead a tailor-made low-level programming language.

### The “accounting” method for analysing amortised complexity

There are several different methods for amortised analysis, and the argument we will use is called the “accounting” method. This method is simple and intuitive to use, in particular if we want to prove that an operation has constant amortised complexity. If we want to prove other amortised complexities (such as logarithmic), the “potential” method is usually better suited.

- https://en.wikipedia.org/wiki/Accounting_method_(computer_science)
- https://en.wikipedia.org/wiki/Potential_method

The idea with the accounting method is that whenever we perform a cheap (fast) operation we “pay” some extra time that we save in an “account”. The saved time can then be used to pay when we encounter an expensive (slow) operation. If we can show that we will never run out of savings in our account, then we have proved the amortised complexity of our operation.

In other words, every time we perform a fast operation, we pretend that it is slower than it actually is. This additional time that we (pretend to) spend is added to our account. Then when there is a slow operation, we can use the saved time to ”pay for” the slow operation.

### Using the accounting method for dynamic arrays

Assume that a fast append (no resizing) takes 1 unit of time. But we *pretend* that every append will cost us 3 time units – one is used for the actual time it takes to do a (fast) append, and the additional 2 units are saved in our account. So, after performing $k$ fast appends our account contains $2k$ time units.

Now assume that we start with a dynamic array of size $n$, and an empty account. Since the account is empty, our last append operation cannot have been a fast one. Therefore the backing array must have been newly resized to size $2n$, and it is half-full. Therefore we can perform $n$ fast appends until we need to resize it again. So, when it is time to resize we have $2n$ time units in our account. Now we have to resize the backing array and copy all our $2n$ elements, which is exactly what we have in our account. So after the resize we have a half-full array and an empty account, again. The important thing to note is that we never get a negative amount in our account!


### Different types of average analysis

Previously we have talked about *average-case complexity* and *amortised* complexity. They are different, but have one thing in common: they try to reason about how an algorithm behaves *on average*. There is also a third kind of asymptotic complexity that does some kind of averaging, *expected complexity*.

These three concepts are different from each other, because they average over different things. If we want to analyse the complexity of an operation, this is what the three types average over:

-----------------------------  ---------------------------------------------
Type of complexity             Average over...
-----------------------------  ---------------------------------------------
Average-case complexity        ...all possible inputs to the operation
Amortised complexity           ...a sequence of calls to the operation
Expected complexity            ...random choices made by the operation
-----------------------------  ---------------------------------------------

All three types are orthogonal to each other, which means that we can talk about “amortised average-case complexity” or “expected amortised complexity”, or even “expected amortised average-case complexity”. (And we can add “asymptotic” too: “asymptotic expected amortised average-case complexity”…)

Average-case complexity
:   can be used when an algorithm behaves well for most “well-behaved” input, but there are some few extreme inputs that make the algorithm behave bad. The typical example is Quicksort, which has quadratic worst-case complexity, but usually behaves linearithmic (unless there is some evil hacker that tries to break it). The main difficulty with average-case complexity is to decide what is the average case.

Amortised complexity
:   is used for operations that are supposed to be used many times on the same data structure, such as changing, adding or deleting elements. If the operation most of the time behaves well, but once in a while can take time, then we use amortisation to infer what the complexity is for executing a sequence of operations. The prototypical case is dynamic arrays.

Expected complexity
:   is used when the algorithm uses randomisation. Standard worst-case analysis can only reason about the extremely unlikely worst case of a random dice roll, but expected complexity can reason about how the algorithm is expected to behave on the worst case input. One example is again Quicksort: if we use a random pivot we get *expected* linearithmic complexity, which is much better than the quadratic complexity of non-random Quicksort.

------------------


This section presents the concept of
[amortised analysis]{.term}, which is the
analysis for a series of operations taken as a whole. In particular,
amortised analysis allows us to deal with the situation where the
worst-case cost for $n$ operations is less than $n$ times the worst-case
cost of any one operation. Rather than focusing on the individual cost
of each operation independently and summing them, amortised analysis
looks at the cost of the entire series and "charges" each individual
operation with a share of the total cost.

The standard example for amortised analysis is dynamic arrays which were introduced in @sec:dynamic-arrays.
In that section we gave an informal argument why it is important to grow the array in the right way.
If we do it by doubling the array size, we get *amortised* constant time for all basic operations,
but if we do it in the wrong way we get linear time operations in the worst case.

Dynamic arrays are such an important example for amortised analysis that we will devote the whole of next section to them.
But before that we will explain the concepts and give some other examples.

<!--
We can apply the technique of amortised analysis in the case of a series
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

::: example
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
Analysis that focuses on single operations cannot deal with this global limit, and so we turn to amortised analysis to model the entire series of operations.

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


:::::: latex
\booklink{Read the rest online}{7.2}{sec:amortised-analysis}
::::::

:::::: online

::: example
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

If we count from 0 through $m = 2^n-1$, what is the average cost for *increment*?
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

In other words, the average number of bits flipped on each increment is 2, leading to a total cost of only $2 \cdot m\in O(m)$ for a series of $m$ increments.
Therefore, the amortised cost for *increment* is $O(m)/m = O(1)$.
:::

Our final example uses amortised analysis to prove a relationship
between the cost of the [move-to-front]{.term}
[self-organising list]{.term} heuristic and the cost for the optimal static
ordering of the list.

Recall that, for a series of search operations, the minimum cost for a
static list results when the list is sorted by frequency of access to
its records. This is the optimal ordering for the records if we never
allow the positions of records to change, because the most-frequently
accessed record is first (and thus has least cost), followed by the next
most frequently accessed record, and so on.

::: example
#### Example: Self-organising lists

**Theorem:** The total number of comparisons required by any series $S$
of $n$ or more searches on a [self-organising list]{.term} of length $n$ using
the move-to-front heuristic is never more than twice the total number of
comparisons required when series $S$ is applied to the list stored in
its optimal static order.

**Proof:** Each comparison of the search key with a record in the list
is either successful or unsuccessful. For $m$ searches, there must be
exactly $m$ successful comparisons for both the self-organising list and
the static list. The total number of unsuccessful comparisons in the
self-organising list is the sum, over all pairs of distinct keys, of the
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

::::::
