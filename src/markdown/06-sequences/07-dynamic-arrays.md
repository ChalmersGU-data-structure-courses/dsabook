
## Dynamic arrays {#dynamic-arrays}

::: TODO
- Prio 1: invariants
:::

The problem with static array-based stacks and queues is that they have limited capacity.
We get an error if we try to add new elements when the internal array is full.

To solve this problem we have to make the internal array *dynamic* --
meaning that we increase the size of the array when it becomes full.
(We should also shrink the array to save space whenever it contains too few elements.)

<!--
### Invariants
 -->

### Resizing the internal array

How can we modify our data type to allow for any number of elements?
Remember that array are always *fixed-size*, so we cannot change the array size.
Instead we have to create new a larger array whenever the capacity is exceeded, and copy over all elements to the new one.

    datatype ArrayStack:  // or ArrayQueue
        ...
        resizeArray(newCapacity):
            oldArray = internalArray  // Remember the old array
            internalArray = new Array(newCapacity)
            for i in 0 .. size-1:
                internalArray[i] = oldArray[i]

So, how large should the new internal array be? For now, let's
***double the size of the internal array*** when we need to resize,
which means that we add the following if-clause to the methods `push` or `enqueue`:

        if size >= internalArray.size
            resizeArray(internalArray.size * 2)

That's the only difference from the `push` method from **ArrayStack** from earlier.
So the new dynamic `push` will look like this:

    datatype ArrayStack:
        ...
        push(x):
            if size >= internalArray.size:
                resizeArray(internalArray.size * 2)
            internalArray[size] = x

As we will explain below, we don't have to double the size, but we can
multiply by 3 or 1.5 or 1.1. The important point is that we don't add a
constant number, but increase the size by a factor.

::: dsvis
Dynamic array list.

<inlineav id="DynamicArrayList-Append-CON" src="ChalmersGU/DynamicArrayList-Append-CON.js" name="Dynamic Array-based List Addition Slideshow" links="ChalmersGU/CGU-Styles.css"/>
:::

### How much to increase the array size

In the code above we doubled the size of the internal array whenever we
needed to resize it. But we could have done something else, like:

-   Triple the size
-   Grow the size by 10%
-   Grow the size by 100 elements
-   Grow the size by 1 element

But which is best, and why?
There is a tradeoff: if we grow the array by a lot, we might waste
memory. For example, immediately after we double the size, half of the
array's capacity is unused, so we use twice as much memory as needed.
On the other hand, if we grow the array by a small amount, we need to
resize it more often.
We will explore these tradeoffs by looking at the performance of the
following small program under different resizing strategies:

    stack = new ArrayStack()
    for i in 1 .. n:
        stack.push(i)

The program builds a stack of size $n$ by repeatedly calling `push`.
In this case, we could have used a static array-based stack of capacity $n$.
So we would like the dynamic array-based stack to have comparable performance to the static array-based stack.
This means that the program ought to take *linear* time, $O(n)$.

#### Growing by a constant amount

What happens if we only grow the internal array by 1 element when we
resize it?

    if size >= internalArray.size
        resizeArray(internalArray.size + 1)

Every time we call `push`, the internal array will be resized. Resizing
the array takes linear time, because if the internal array has size $n$,
it has to copy $n$ elements from the internal array to the new array. To
put it another way, the loop body `internalArray[i]=oldArray[i]` will
be executed $n$ times.

Now suppose we run the program above to create a list of $n$ elements.
Adding up all the calls to `resizeArray` that happen, how many times
does an array element get copied from the internal array to the new
array (that is, how many times does the statement
`internalArray[i]=oldArray[i]` get executed)?
The array size is initially 1, so we get the following calls:

--------------------  --------- ------- ---------
`resizeArray(2)`        copying   $1$   element
`resizeArray(3)`        copying   $2$   elements
 . . .
`resizeArray(n-1)`      copying  $n-2$  elements
`resizeArray(n)`        copying  $n-1$  elements
--------------------  --------- ------- ---------

In total, there are $1+2+...+(n-1)$ element copy operations, which is
equal to $n(n-1)/2 = (n^2-n)/2$. This means that the program takes
*quadratic* time, $O(n^2)$, not linear!

Suppose for example that $n = 1,000,000$. Using the formula above, the
number of times an array element gets copied is
$999,999 \times 1,000,000\;/\;2 = 499,999,500,000$. If copying one array
element takes 1 ns, then the program spends nearly 10 minutes just
resizing the array!

What happens if we instead grow the array by 100 elements every time?
You can try the calculation yourself, for say $n = 1,000,000$. What
happens is that `resizeArray` gets called 100 times less often -- so
there 100 times fewer elements copied. But the runtime is still
quadratic. When $n = 1,000,000$, the total number of elements copied
is about $5,000,000,000$ -- still far too many.

:::::::: online
::: note
*Note*: You can get a precise number of elements copied by using the formula for an
[arithmetic progression](https://en.wikipedia.org/wiki/Arithmetic_progression).
:::
::::::::

In short, ***growing the array size by a constant amount is bad***,
because a loop that repeatedly adds to the array will take quadratic time.

#### Growing by a constant factor

One way to think about the problem is: as the array gets bigger,
resizing it gets more expensive. So, to make up for that, when the array
is bigger we need to grow it by more, so that we don't have to resize
as often. One way to do this is to always double the array size when it
gets full. This turns out to work well!

Suppose that we run the example program with $n = 1000$, i.e. we add
1000 elements to the list. As before, the internal array initially has a
size of 1. What calls to `resizeArray` happen, and how many elements get
copied each time?

--------------------  --------- --------- ---------
`resizeArray(2)`        copying    $1$    element
`resizeArray(4)`        copying    $2$    elements
`resizeArray(4)`        copying    $4$    elements
`resizeArray(8)`        copying    $8$    elements
 . . .
`resizeArray(256)`      copying   $128$   elements
`resizeArray(512)`      copying   $256$   elements
`resizeArray(1024)`     copying   $512$   elements
--------------------  --------- --------- ---------

You can see that the array gets resized a whole lot at the beginning --
but as it gets bigger, it gets resized much less often. We can read off
how many elements get copied: $1+2+4+8+16+32+64+128+256+512 = 1023$.

Since the array starts from size 1 and always doubles, the array size is
always a power of two. So to calculate the total number of elements
copied, instead of adding up all the terms by hand, we can use the
following formula:

$$
2^0+2^1+2^2+...+2^n \;=\; 2^{n+1}-1
$$

Suppose that we now choose $n=1,000,000$. How many elements get copied?
In this case the final array size will be $2^{20} = 1,048,576$. The
array size will eventually grow from $2^{18}$ to $2^{19}$ to $2^{20}$
elements, with the final call to `resizeArray` copying $2^{19}$
elements. Using the formula above, the total number of elements copied is:

$$
2^0+2^1+2^2+...+2^{19} \;=\; 2^{20}-1 \;=\; 1,048,575
$$

Compared to when we grew the array by a fixed size of 1 element, this is
$500,000$ times fewer! So this in fact seems to be nice and efficient.

Let us now generalise to an arbitrary $n$. The worst case is when the
final call to `add` has to resize the array -- that happens when $n$ is
one more than a power of two, $n-1 = 2^k$. In that case, the final call
to `resizeArray` grows the array from $2^k$ to $2^{k+1}$, copying $2^k$
elements. The total number of elements copied is:

$$
2^0+2^1+2^2+...+2^k \;=\; 2^{k+1} - 1 \;=\; 2 \cdot 2^k - 1 \;=\; 2(n-1) - 1 \;=\; 2n-3
$$

In fact, we have just proved the following result.

::: example
#### Theorem: Array-doubling

When using the array-doubling strategy, calling `add` $n$
times starting from an empty dynamic array list causes fewer than $2n$
elements to be copied.
:::

:::::: latex
\booklink{Read the rest online}{6.7}{sec:how-much-to-increase-the-array-size}
::::::

In short, the overhead of using a dynamic array list is at most
*two array elements copied per element that we add*. But copying
an array element is an extremely cheap operation, so dynamic array lists
implemented using array doubling have almost no overhead, compared to
[**ASDASDA**]{.online}
static array lists. In particular, the complexity of our example program
is *linear*, just as we wanted.


:::::: online
What happens if we instead grow the array by 50%? In fact, it still
works out fine - the program takes linear time to run. To see this, you
can use the same argument as above, but instead of using the formula
$2^0+2^1+...+2^k = 2^{k+1}$, you have to use the formula for a general
[geometric progression](https://en.wikipedia.org/wiki/Geometric_progression).
What you get is an overhead of *three elements copied per element added*.

In fact, ***growing the array by any constant factor*** works, because the
same geometric progression reasoning applies. We can calculate the exact
performance overhead of growing the array by any given factor:

::: example
#### Theorem: Growing by a factor

If we grow the array by a factor of $k > 1$ when resizing
it, then the overhead is at most $1+1/(k-1)$ elements copied per `add`.
For example, when growing by 20% (k = 1.2), the overhead is 6 elements
copied per `add`.
:::

In short, when resizing a dynamic array list, we should **grow the array
size by a constant factor**. when adding many elements, this guarantees
that we only have a constant factor of performance overhead due to
occasional resizing. We can choose a large factor (such as 2) if we want
fast performance, or a low factor (such as 1.2) if we want to save memory.

#### Constant amount vs constant factor

@Fig:ListGrowthGraph shows just how big the performance difference is
between the two resizing strategies: growing the array by a constant
amount, and scaling it by a constant factor. The graph plots how many
elements need to be copied, as a function of how many elements we add to
the list.

<div id="fig:ListGrowthGraph">
<inlineav id="ListArrayDynamicZoomCON" src="List/ListArrayDynamicZoomCON.js" script="DataStructures/Plot.js" name="DataStructures/Plot.js List/ListArrayDynamicZoomCON" links="List/ListArrayDynamicZoomCON.css" static/>

The performance difference between growing the array by a constant amount, and scaling it by a constant factor
</div>

Notice that although growing by 10000 seems pretty good at first, for
largest lists it's worse than growing by 10% (a factor of 1.1). We can
see this more clearly if we zoom out the graph, making the *x*-axis go
up to $10,000,000$ instead of $1,000,000$,
as shown in @fig:ListGrowthGraphZoom.

<div id="fig:ListGrowthGraphZoom">
<inlineav id="ListArrayDynamicCON" src="List/ListArrayDynamicCON.js" script="DataStructures/Plot.js" name="DataStructures/Plot.js List/ListArrayDynamicCON" links="List/ListArrayDynamicCON.css" static/>

@Fig:ListGrowthGraph zoomed out 10 times.
</div>

Though you can't see it in the graph, at $x=10,000,000$, growing by
10,000 is **5,000 times** slower than growing by 10%! This is because the
"growing by 10,000" strategy takes quadratic time: if we do 10 times as
many calls to `add`, it takes 100 times as long. Quadratic algorithms
always lose to linear algorithms eventually!

::::::


### Resizing an array-based queue

When we resize the internal array, we cannot keep the positions of the
elements. If the queue is wrapped around (i.e., if `rear` < `front`) then
we might end up in a large gap in the middle of the queue.

Instead we reset the `front` and `rear` pointers so that we copy the
first queue element to position 0 of the new array, the second to
position 1, etc. Apart from that, the implementation is similar to the
one for lists and queues.

    datatype ArrayQueue:
        ...
        resizeArray(newCapacity):
            oldArray = internalArray  // Remember the old array
            internalArray = new Array(newCapacity)
            for pos in 0 .. size-1:
                oldPos = (pos + front) % internalArray.size
                internalArray[pos] = oldArray[oldPos]
            front = 0
            rear = size - 1

### Shrinking the internal array

Now we know how to make a dynamic array stack (as well as a queue) that has room for any number of elements.

But the problem is that if we first build a large stack (or queue) with 1000's of
elements, and then remove most of them, we will still have a large
internal array where almost all cells are unused. So, let's resize the
array also when removing elements! When the array contains too many
unused cells, we shrink it to half the size.

Now, it's important that we *don't* shrink the array when it's half
full. Why is that? Let's consider the following sequence of additions
and deletions:

    push("A"); pop(); push("B"); pop(); push("C"); pop(); push("D"); pop(); ...

If we are unlucky and the array is full just before the sequence starts, then the first push will have to resize the array.
Then when we pop that element, the list becomes less than half-full, and we have to resize again.
Then the next push will resize, and the next pop will also resize.
And so on...
This will lead to a linear-time resize every time we push/pop, and so the final complexity will be linear (per
operation) and not constant time.
Which is not what we want.

How can we alleviate this? The solution is to wait even longer until we shrink the internal array!
E.g., we can shrink the array (i.e., halve it), when it is only 1/3 full.
Note that the factors 1/3 and 1/2 are not important, as explained earlier.
The only thing that matters is that the minimum load factor (1/3) is *smaller* than the shrinking factor (1/2).

In summary, to get a dynamically shrinking stack (or queue), we can add the following lines right before the end of the `pop` method (or the `dequeue` method):

    if size <= internalArray.size * 1/3:
        resizeArray(internalArray.size * 1/2)

That's the only difference from previous `pop` method (and `dequeue` for queues).

So the dynamic `pop` method will look like this:

    datatype ArrayStack:
        ...
        pop():
            size = size - 1
            result = internalArray[size]
            internalArray[size] = null  // For garbage collection
            if size <= internalArray.size * 1/3:
                resizeArray(internalArray.size * 1/2)
            return result

::: dsvis
Dynamic array list -- deletion.

<inlineav id="DynamicArrayList-Remove-CON" src="ChalmersGU/DynamicArrayList-Remove-CON.js" name="Dynamic Array-based List Deletion Slideshow" links="ChalmersGU/CGU-Styles.css"/>
:::

