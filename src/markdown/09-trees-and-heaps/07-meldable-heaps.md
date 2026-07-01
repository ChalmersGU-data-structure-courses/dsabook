
## Meldable heaps {#heaps:meldable-heaps}

Binary heaps are very compact because all elements can be stored in a single (dynamic) array.
They are also very efficient, where both adding and removing elements are logarithmic in the size of the heap.

However, there are other possible operations that we might want to do on priority queues.
One quite common is to be able to *merge* two priority queues into one,
or as it is often called, to *meld* two heaps.
Binary heaps cannot do this in a good way, the
best possible algorithm is to simply concatenate the two arrays and then *heapify* the result.
We will not describe the *heapify* algorithm here, the only thing you have to know is that
it can turn any array into a binary heap in linear time, $O(n)$.
Thich means that the best algorithm for melding two binary heaps is linear in their size.

If we loosen the requirement that the heap is a *complete* tree, it is possible to implement melding faster than that.
The downside is that we have to store the heap as a tree, in the same way as we did in @sec:trees:implementing-binary-trees.
Our meldable heaps will then consist of tree nodes that store their value and their height in the tree,
and just as for normal binary trees, the empty heap is represented by *null*:

    class HeapNode:
        value        // The value of this node
        height       // 1 + the maximum height of the left and right children
        left, right  // Left and right children HeapNodes

Now, let us assume that we already have an operation *meld* that takes two heaps and melds them into a new heap.
Using this we can define the basic heap operations very easily:

- *add*(*value*): Create a new heap for *value*, and meld it with the current heap.
- *getMin*(): Just look up the root value.
- *removeMin*(): If we remove the root we are left with the children,
  but they are heap, so we can simply meld them to get back a new heap.

So, how can we defined *meld*?
This is easiest formulated as a recursive procedure, and the basic idea is like this:

- If either of the heaps are empty, return the other heap.
- Assume that the heap with the highest priority is $h_1$, and the other one is $h_2$.
- Meld one of $h_1$'s children with $h_2$ -- this is our recursive call.

The procedure will always result in a heap,
because in each step we let the highest-priority node be the parent in the resulting heap.
But the question is, which of the two children should we use in our resursive call?
We want our procedure to stop as soon as possible, and it will continue until it reaches a leaf.
Therefore the best is to always meld with the child with the *least* height,
because a low height means that the recursion will stop earlier.

::: algorithm
#### Algorithm: Melding two heaps by lowest height
If either of the heaps is empty (*null*), return the other heap.
Otherwise:

-   Let $h_1$ be the heap with the highest priority, and $h_2$ be the other.
    This means that $h_1.\text{value}<h_2.\text{value}$.
-   If $h_1.\text{left}$ has lower height than $h_1.\text{right}$,
    let $h_1.\text{left} = \mathit{meld}(h_1.\text{left}, h_2)$.
-   Otherwise,
    let $h_1.\text{right} = \mathit{meld}(h_1.\text{right}, h_2)$.
-   Return $h_1$.
:::

What is the time complexity of melding?
Everything in this function except for the recursive call is constant time.
Therefore the runtime is linear in the depth of the recursion.
In each recursive call, we descend one step along a *shortest* branch in one of the two heaps.
So the recursion depth is bounded by the sum of the shortest branch lengths of both heaps.

But how long is the shortest branch in a tree?
In a complete binary tree, the shortest branch is always logarithmic in the size.
But if the tree is unbalanced, this means that there is some path to a leaf that is shorter than in a complete tree.
Therefore, the shortest branch in a tree is always at most *logarithmic* in the size, $O(\log(n))$.

In conclusion, the complexity of *meld* is logarithmic in the size of the resulting heap, $O(\log(n))$.
This is much better than the linear complexity of binary heaps!

One interesting thing with meldable heaps is that they behave fundamentally different from binary heaps.
The trick here is to *not* strive for a balanced tree, but rather the opposite:
we want our heaps to be as unbalanced as possible -- the more unbalanced, the faster melding becomes.
@Fig:MeldableHeapExample shows the difference in structure between a binary heap and a meldable heap.


::: {#fig:MeldableHeapExample}
:::: latex
![](images/tikz/meldable-heap.pdf){width=90%}
::::

How (a) a binary heap and (b) a meldable heap looks like after
building them from the values 48, 31, 52, 16, 65, 74, and 29, in that order.
<!--
in: [48, 31, 52, 16, 65, 74, 29]
mh: (( 65:1 ( 74:0 )) 16:3 ( 29:2 (( 52:0 ) 31:1 ( 48:0 ))))
bh: [16, 31, 29, 48, 65, 74, 52]
-->
:::


#### Other meldable heaps

The version of meldable heap that we show here is not very common,
but there are several variants in common use.
The following ones all share the same basic idea as above --
to meld with one of the children of the highest-priority heap.
The difference is how they decide which of the children to meld with.

Leftist heap
:   This heap is very similar to ours, but it uses another measure than the height (called the *s-value* or *rank*),
    which is a more difficult concept to explain.

    `\newpage`{=latex}

Skew heap
:   This heap doesn't use any extra information, such as height or rank or anything.
    Instead it simply *swaps* the left and right child while recursing down the heap.
    The cost of this simplicity is that the complexity analysis becomes very difficult,
    but in the end one can show that is has logarithmic *amortised* complexity.

Randomised meldable heap
:   Similar to a skew heap, this doesn't use any extra information.
    Instead it uses randomisation to decide which child to meld,
    and is has *expected* logarithmic complexity.

There are also heap data structures that do not restrict themselves to being binary trees,
but can be trees with many children, or a forest of binary trees.
All of them implement efficient versions of *meld*, and they all are very interesting to learn more about.

For example, *Binomial heaps*, *Fibonacci heaps* and *Pairing heaps* consist of a list of heaps,
with special invariants that make sure that all heap operations have logarithmic complexity.
In fact, both Fibonacci heaps and Pairing heaps have *constant* time complexity for *meld* and *add*,
but *deleteMin* is always logarithmic in the worst case.
