
## Amortised analysis {#analysis-3:amortisation}

::: TODO
- Prio 1: shorten the examples
- Prio 2: replace the (multipop?) example with: a queue as a pair of stacks
- Prio 2: consider making the last subsection a section (Different types of average analysis)
:::

Complexity analysis as we have seen it dictates that if an algorithm
with that is worst case $O(n)$ is executed $n$ times in a row,
the total cost will be $O(n \cdot n)=O(n^2)$.
There are however situations where the worst case of a single operation
is $O(n)$, but the total cost of $n$ operations is also $O(n)$,
or $O(n \log(n))$. The reason is that while individual operations
take $O(n)$ time, that happens rarely enough that the average
cost of the $n$ operations is $O(1)$ or $O(\log(n) respectively)$.

Note that the average here is very different from the average case of
algorithms like QuickSort (@sec:sorting-2:quicksort).
There is no randomness involved, and no assumptions about
the input distribution. Average just means the the total cost of
all $n$ operations divided by $n$.

It is called *amortised* because of the idea that an expensive operation
causes a debt, which is then spread out over many subsequent cheap operations
until the debt is paid off.

The standard example for amortised analysis is dynamic arrays which were introduced in @sec:sequences:dynamic-arrays.
In that section we gave an informal argument why it is important to grow the array in the right way.
If we do it by doubling the array size, we get *amortised* constant time for all basic operations,
but if we do it in the wrong way we get linear time operations in the worst case.

Dynamic arrays are such an important example for amortised analysis that we will devote the whole of next section to them.
But before that we will explain the concepts and give some other examples.


::: example
#### Example: Multipop on stacks

Assume that we want to add a new operation *multipop* on stacks,
where `multipop(stack, k)` will pop the $k$ topmost elements off the stack.
The operation is implemented in the straightforward way of repeating a
standard $O(1)$ *pop* operation *k* times.

What is the time complexity of this new operation in terms of the size $n$ of the stack?
Since we're repeating the constant-time *pop* operation $k$ times, we get a time complexity of $O(k)$.
And the worst case of this is when $k$ is as large as possible, that is, the stack size $n$.
So the worst-case complexity for *multipop* is linear in the stack size, $O(n)$.
This is quite correct, the worst case complexity of a single call is linear.

What is the complexity of executing a large number of *multipop* operations in sequence?
Let's say that we start with a stack of size $n$, and perform some
sequence of $n$ *multipop* operations.
Using our analysis above blindly, the worst case total time of this procedure is
$n \cdot O(n) = O(n^2)$. But how would that worst case look?

If we try construct this worst case for say $n=10$ we run into problems.
Recall that the worst case for a single call `multipop(stack, k)` assumed
that $k=n$, that is it removes all the elements of the stack.
The $O(n^2)$ worst case implicitly assumes that we first remove all elements,
then remove just as many more and keep removing more and more elements from
an empty stack!

We can reason like this instead:
$n$ elements are on the stack, and each of these elements can only be popped once.
The sum of costs for all calls to *multipop* can never exceed
the total number of elements on the stack, which is $n$.
This means that the total complexity of our $n$ calls to *multipop* must be in $O(n)$.

Therefore the average worst-case complexity *per operation* must be $O(n)/n = O(1)$.
That is, the *amortised* worst-case complexity of *multipop* is constant, $O(1)$.
:::

In the *multipop* example we got two different complexities for the *multipop* operation:
first we found that it is linear in the stack size, $O(n)$,
but when averaging over a sequence of operations we found that it is constant, $O(1)$.
Both these seemingly contradicting results are correct.
The worst case complexity for a single call to *multipop* is linear,
but the *amortised* complexity is constant.

### The accounting method {#analysis-3:accounting-method}

In the *multipop* example we used an informal argument,
but the underlying idea is the concept of an *account*.
The basic idea with the *accounting method* is that whenever we perform a cheap operation
we "pay" some extra time that we save in an account.
The saved time can then be used to pay when we encounter an expensive operation.
If we can show that our account will be balanced, and never run out of savings,
then we have proved the amortised complexity of our operation.

In other words, every time we perform a fast operation,
we pretend that it is slower than it actually is, but only by a constant factor.
This additional time that we (pretend to) spend is added to our account.
Then when there is a slow operation, we can use the saved time to "pay for" the slow operation.

::: example
#### Example: Multipop, revisited

The *multipop* operation is a very good example of how the accounting method can be applied.
Assume that the basic operations *push* and *pop* takes 1 time unit each.
But let us pretend that each *push* costs 2 time units instead of one.
That is, each *push* will save one time unit in our account,
and after pushing $m$ elements onto the stack we have $m$ units saved.

This means we can use every *push* to pay for a *pop*. Since it is impossible to do
more total *pop* operations than *push* operations, *pop* operations are
always paid for by a *push*, and essentially free. Since *multipop* is just a
repetition of $k$ *pop* operations, it is also paid for by *push*.

So not only is a sequence of $n$ *multipop* operations $O(n)$,
but starting from an empty stack, any valid sequence of $n$
mixed *push*, *pop* and *multipop* operations is total $O(n)$.
This claim is quite brittle though: If we add a *multipush* operation to the mix,
the claim no longer holds.
:::


### The potential method {#analysis-3:potential-method}

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


### Different types of average analysis {#analysis-3:different-average-analysis}

In @sec:analysis-1:complexity-cases we discussed *average-case* complexity,
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

`\noindent`{=latex}
All three types are orthogonal to each other, which means that
we can talk about "amortised average-case complexity" or "expected amortised complexity",
or even "expected amortised average-case complexity".
(And we can add "asymptotic" too: "asymptotic expected amortised average-case complexity"...)

Average-case complexity
:   can be used when an algorithm behaves well for most "well-behaved" input,
    but there are some few extreme inputs that make the algorithm behave bad.
    The typical example is Quicksort, which has quadratic worst-case complexity,
    but usually behaves linearithmic (unless there is some evil hacker that
    contaminates the input).
    The main difficulty with average-case complexity is to decide what is the average case.

Amortised complexity
:   is used for operations that are supposed to be used many times on the same data structure,
    such as changing, adding or deleting elements.
    If the operation most of the time behaves well, but more expensive operations occur in a predictable
    and limited extent, we can use amortisation to determine the total complexity
    for executing a sequence of operations. The prototypical case is dynamic arrays.
    Note that there is no randomness involved for amortised operations,
    there is no risk of repeatedly encountering expensive operations due to bad luck or contaminated
    data.

Expected complexity
:   is used when the algorithm itself uses randomisation,
    as opposed to the input values being randomly distributed.
    One example is again from Quicksort, but this time about the pivot
    being randomly selected by the algorithm itself:
    Using a random pivot we get *expected* linearithmic complexity.
    This is slightly different from average-case, in that the randomness
    is controlled by the algorithm, so a bad outcome cannot be
    provoked repeatedly by external factors.


