
## Amortised analysis

::: TODO
- Prio 1: replace the examples with: a queue as a pair of stacks
- Prio 1: describe the potential method better
- Prio 3: merge (or relate) with previous section
- Prio 3: make self-organising lists a "case study"
:::

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


::: example
#### Example: Multipop on stacks

Assume that we want to add a new operation *multipop* on stacks,
where *multipop*($k$) will pop the $k$ topmost elements off the stack.
The operation is implemented in the straightforward by simply repeating a single *pop* operation *k* times.

What is the time complexity of this new operation?
Since we're repeating the constant-time *pop* operation $k$ times, we get a time complexity of $O(k)$.
And the worst case of this is when $k$ is as large as possible, i.e., the stack size $n$.
So the worst-case complexity for *multipop* is linear in the stack size, $O(n)$.

This is quite correct, the worst-case complexity of a single call is linear.
But what is the complexity of executing a large number of stack operations in sequence?

Let's say that we start from an empty stack and execute
a sequence of $n$ *push* operations and $n$ *multipop* operations.
Using our analysis above, the whole sequence of $2n$ operations will have worst-case complexity
$n\cdot O(1) + n\cdot O(n) = O(n+n^2) = O(n^2)$.
Since we performed $2n$ operations, we get an average complexity per operation of $O(n^2)/2n = O(n)$.
But this analysis is unreasonably pessimistic
-- clearly it is not really possible to pop $n$ elements each time *multipop* is called.

We can reason like this instead:
$n$ elements are pushed to the stack, and each of these elements can only be popped once.
The sum of costs for all calls to *multipop* can never be more than
the total number of elements that has been pushed on the stack, which is $n$.
This means that the total complexity of our $n$ calls to *multipop* must be in $O(n)$,
just as for as the $n$ calls to *push*, and $O(n) + O(n) = O(n)$.

Therefore the average worst-case complexity *per operation* must be $O(n)/n = O(1)$.
That is, the *amortised* worst-case complexity is constant, $O(1)$.
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


### The accounting method

In the example we used a very hand-waving, informal argument,
but the underlying idea is the concept of an *account*.
The basic idea with the *accounting method* is that whenever we perform a cheap operation
we "pay" some extra time that we save in an account.
The saved time can then be used to pay when we encounter an expensive operation.
If we can show that our account will never run out of savings,
then we have proved the amortised complexity of our operation.

In other words, every time we perform a fast operation,
we pretend that it is slower than it actually is.
This additional time that we (pretend to) spend is added to our account.
Then when there is a slow operation, we can use the saved time to "pay for" the slow operation.


::: example
#### Example: Multipop, revisited

The *multipop* operation is a very good example of how the accounting method can be applied.
Assume that the basic operations *push* and *pop* takes 1 time unit each.
But let us pretend that each *push* costs 2 time units instead of one.
That is, each *push* will save one time unit in our account,
and after pushing $m$ elements onto the stack we have $m$ units saved.

If we run *multipop*($k$), it will cost $k$ time units, but now we can use the units from our account.
The account will be reduced by $k$, but at the same time the size of the stack will be reduced by $k$.
So after running *multipop*, the stack will contain $m-k$ elements, and our account will have $m-k$ units.
Since the stack can never be empty, our account will never be empty either.

In the end, the amortised cost of *push* is 2 units, and the amortised cost of *multipop* is 0 units.
Both are constant values, so the amortised cost of both *push* and *multipop* are constant, $O(1)$.
:::


### The potential method

The accounting method is simple and intuitive to use,
in particular if we want to prove that an operation has *constant* amortised complexity.
If we want to prove other amortised complexities (such as logarithmic or linear),
the *potential method* is usually better suited.

In this method we have to define a *potential function*, $\Phi(S)$,
that maps the current state of our data structure into a numeric value.
The only requirements on the potential function are that

- it has to be non-negative, $\Phi(S) \geq 0$, and
- the potential of the starting state must be zero, $\Phi(S_0) = 0$.

Now, the amortised cost for a single operation $p$ that transforms a state $S$ to the new state $S'$,
is simply the actual cost of $p$, plus the change in potential:

$$ T_{\text{amortised}} = T_{\text{actual}} + \Phi(S') - \Phi(S) $$

The main difficulty with the potential method is to come up with a good potential function.
If it is too small, it will map some states to negative values, which breaks the requirements.
If it is too big, it will overestimate the amortised cost, and will not show an improvement to the actual cost.


::: example
#### Example: Incrementing a binary counter

As an example of the potential method, consider the process of incrementing a binary counter.
We want to show that this operation (*increment*) takes amortised constant time in the size of the counter.
Since the counter is stored as a binary number, we say that the size of the counter is the number of bits it uses.
The *increment* operation can be implemented like this:

- Iterate over the bits in the counter, starting from the lowest-order bit (the rightmost bit):
    - Flip each 1-bit to a 0, until the first 0-bit is encountered.
    - Then flip this 0-bit to 1 and return.

For example, to increment the number 175 (bitstring `10101111`),
we flip the four rightmost 1's to 0, and then the next 0-bit to 1.
This results in the bitstring `10110000`, which is the number 176.

The worst case example is when the counter consists of only 1's, such as the number 255 (bitstring `11111111`).
In this case the complexity of *increment* is linear, $O(n)$, in the number of bits $n$.
So what is the amortised complexity of *increment*?

Let us define the potential function as $\Phi(c) =$ "the number of bits equal to 1";
this is also known as the *hamming weight* of the counter $c$.
Assume that the counter ends in $k$ 1-bits, and we call *increment*.
This will flip $k$ bits from 1 to 0, and one bit from 0 to 1.
So the actual cost is $T_{\text{actual}} = k+1$ bit flips.
At the same time the potential will decrease by $k-1$, because $k$ bits we changed to 0 and one to 1.
Therefore the amortised cost of one *increment* is:

$$ T_{\text{amortised}} = T_{\text{actual}} - (k-1) = (k+1)-(k-1) = 2 \in O(1) $$

As you can see, the calculations become very easy as long as we have a good potential function.
The difficulty is to realise that we should use the hamming weight.
:::


### When not to use amortisation

In most cases amortised complexity is what we are interested in,
but there are some rare cases where it is not the best choice.

If we are implementing a very time-critical system,
where we must guarantee that an operation never ever takes more than (for example) 0.001 microseconds.
An amortised data structure such as a dynamic array can never give this guarantee,
because now and then the operation might take too long time.
In these cases we should choose data structures that are not amortised.


### Different types of average analysis

In @sec:best-worst-and-average-cases we discussed *average-case* complexity,
and in this section we discussed *amortised* complexity.
The two notions are quite different, but have one thing in common:
they try to reason about how an algorithm behaves *on average*.
There is also a third kind of asymptotic complexity that does some kind of averaging, *expected* complexity.

These three concepts are different from each other, because they average over different things.
If we want to analyse the complexity of an operation, this is what the three types average over:

Type of complexity             Average over...
-----------------------------  ---------------------------------------------
Average-case complexity        ...all possible inputs to the operation
Amortised complexity           ...a sequence of calls to the operation
Expected complexity            ...random choices made by the operation
-----------------------------  ---------------------------------------------

All three types are orthogonal to each other, which means that
we can talk about "amortised average-case complexity" or "expected amortised complexity",
or even "expected amortised average-case complexity".
(And we can add "asymptotic" too: "asymptotic expected amortised average-case complexity"...)

Average-case complexity
:   can be used when an algorithm behaves well for most "well-behaved" input,
    but there are some few extreme inputs that make the algorithm behave bad.
    The typical example is Quicksort, which has quadratic worst-case complexity,
    but usually behaves linearithmic (unless there is some evil hacker that tries to break it).
    The main difficulty with average-case complexity is to decide what is the average case.

Amortised complexity
:   is used for operations that are supposed to be used many times on the same data structure,
    such as changing, adding or deleting elements.
    If the operation most of the time behaves well, but once in a while can take time,
    then we use amortisation to infer what the complexity is for executing a sequence of operations.
    The prototypical case is dynamic arrays.

Expected complexity
:   is used when the algorithm uses randomisation.
    Standard worst-case analysis can only reason about
    the extremely unlikely worst case of a random dice roll,
    but expected complexity can reason about how the algorithm is expected to behave.
    One example is again Quicksort:
    if we use a random pivot we get *expected* linearithmic complexity,
    which is much better than the quadratic complexity of non-random Quicksort.

