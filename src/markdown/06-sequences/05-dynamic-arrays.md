
## Dynamic arrays

::: TODO
- Prio 1: invariants
:::

The problem with array-based stacks and queues is that they have limited capacity.
Recall that arrays are *fixed-size*, so we cannot change the size once we have initialised it.
To solve this problem we have to make the internal array *dynamic* --
meaning that we increase the size of the array when it becomes full.
(We should also shrink the array to save space whenever it contains too few elements,
more about that below in @sec:shrinking-the-internal-array.)

If you are used to programming in Python or Javascript, you might think that their lists
(or "arrays" as they are called in Javascript) are basic and simple objects, but they are not.
In fact they are implemented as dynamic arrays, just in the same way as we will discuss in this section.
Other programming languages such as Java, C, etc., have fixed-size arrays, and this is a much more primitive data type.
The main reason for this is that a fixed-size array always use the same amount of memory:
the programming language can allocate space for it already when the array is created --
and this will not have to change during the whole life of the array.
An array is always "tight" -- neighbouring elements will be neighbours in the computer memory too.
This means that looking up a specific array index is really fast (constant-time in fact),
since we can infer the memory position from the array index instantly.

A Python-style list does not have a fixed length:
you can add and remove elements without having to worry about memory allocation.
But in all other respects it behaves just like a fixed-size array,
meaning that normal array operations such as getting and setting values at a specific index are still efficient.
Adding and removing elements are also efficient,
but note that it is only efficient to append to (and remove from) the *end* of the array!
If you try to insert elements in the beginning it becomes awfully slow.
Compare these two very simple Python loops:

    list = []                          list = []
    for k in range(100_000):           for k in range(100_000):
        list.append(k)                     list.insert(0, k)

The left loop is really fast, because the `append` method adds elements to the end of the list.
On the contrary, the right loop is slow because it inserts elements at the beginning.


### Resizing the internal array

The basic idea is to not try to resize the internal array -- as we already mentioned it is not possible to resize it.
Instead we create a *new* array of a larger size, and copy over the elements from the old array to the new.
Afterwards we can forget about the old array because it will not be used anymore.

    datatype ArrayStack, or ArrayQueue:
        ...
        resizeArray(newCapacity):
            oldArray = internalArray                // Remember the old internal array
            internalArray = new Array(newCapacity)  // Create a new internal array
            for i in 0 .. size-1:
                internalArray[i] = oldArray[i]      // Copy over all elements to the new array

Note that resizing the internal array is a *slow* operation,
it has to iterate through all elements in the list and copy each one.
This is of course linear in the number of elements, $O(n)$.
(Modern processors have special instructions for copying chunks of memory, which are a lot faster than our code above
-- but even their optimised hardware instructions are linear in the number of elements.)

This means that we do not want to resize the array too often, so the question is how often do we want to resize?
Or in other words, how large should the new internal array be -- what should be its capacity?
How about increasing the capacity with 1000 elements, every time the array behomes full:

    class ArrayStack:
        ...
        push(value):
            if size == internalArray.size:  // If the internal array is full,
                resizeArray(size + 1000)    // increase its capacity with 1000 elements
            internalArray[size] = value
            size = size + 1

Suppose that we want to push $n$ values to an empty stack (where $n$ is much larger than 1000).
How many times does an array element get copied from the internal array to the new array
(that is, how many times will the statement `internalArray[i]=oldArray[i]` be executed)?
Every 1000'th time the internal array becomes full and we need to resize it, so we get the following internal resizings:

----------------------  --------- ---------- ---------
`resizeArray(2000)`       copying   $1000$   elements
`resizeArray(3000)`       copying   $2000$   elements
 . . .
`resizeArray(n-1000)`     copying  $n-2000$  elements
`resizeArray(n)`          copying  $n-1000$  elements
----------------------  --------- ---------- ---------

In total, we will execute the copying statement the following number of times:

$$
1000 + 2000 + \cdots + (n-2000) + (n-1000) = 1000 \cdot \sum_1^{n/1000} i
= n(n-1)/500 \in O(n^2)
$$

This means that the program takes *quadratic* time, $O(n^2)$, not linear!
Suppose for example that $n$ is 1 million.
Using the formula above, the number of times an array element gets copied is around 500 million
-- it copies on average 500 elements for every push to the stack.
This is of course not acceptable.

But what if we increase the capacity with 10,000 elements instead?
This will unfortunately not help much -- the reasoning above still holds,
and the complexity of pushing $n$ to the stack will still be quadratic, $O(n^2)$.

### Doubling the size

One way to think about the problem is this:
as the array gets bigger, resizing it gets more expensive.
So, to make up for that, when the array is bigger we need to grow it by *more*,
so that we don't have to resize as often.
One way to do this is to always *double* the array size when it gets full.
This turns out to work well!

Suppose that we again push 1 million elements onto an empty stack.
As before we start with a capacity of 1000 elements.
When will `resizeArray` be called, and how many elements get copied each time?

-------------------------  --------- ------------- ---------
`resizeArray(2,000)`         copying    $1,000$    elements
`resizeArray(4,000)`         copying    $2,000$    elements
`resizeArray(4,000)`         copying    $4,000$    elements
`resizeArray(8,000)`         copying    $8,000$    elements
 . . .
`resizeArray(256,000)`       copying   $128,000$   elements
`resizeArray(512,000)`       copying   $256,000$   elements
`resizeArray(1,024,000)`     copying   $512,000$   elements
-------------------------  --------- ------------- ---------

You can see that the array gets resized a whole lot at the beginning --
but as it gets bigger, it gets resized less and less often.
We can read off how many elements get copied:

$$ 1,000 + 2,000 + \cdots + 256,000 + 512,000 = 1,023,000 $$

Compare this with the previous version where we increased the capacity with 1000 elements every time:
then we needed to copy 500 million elements, but now we only need to copy 1 million.

Let us now generalise to an arbitrary $n$.
The worst case is when the final *push* has to resize the array
-- that happens when $n$ is one more than a power of two times 1000, $n-1 = 1000\cdot 2^k$.
In that case, the final call to `resizeArray` grows the array
from $1000\cdot 2^k$ to $1000\cdot 2^{k+1}$, copying $1000\cdot 2^k$ elements.
The total number of elements copied is therefore:

$$
1000\cdot (2^0 + 2^1 + 2^2 + \cdots + 2^k)
=  1000\cdot 2^{k+1} - 1000
=  2(n-1) - 1000  =  2n - 1002
$$

In fact, we have just proved the following result,
which holds regardless of what the initial capacity is.

::: example
#### Theorem: Array-doubling

When using the array-doubling strategy,
pushing $n$ elements to a stack implemented as a dynamic array
causes fewer than $2n$ elements to be copied.
:::


::: dsvis
Dynamic arrays -- addition.

``` {.jsav-animation src="ChalmersGU/DynamicArrayList-Append-CON.js" links="ChalmersGU/CGU-Styles.css" name="Dynamic Array-based List Addition Slideshow"}
```
:::

<!-- :::::: latex
\booklink{Read the rest online}{6.7}{sec:how-much-to-increase-the-array-size}
:::::: -->


### Multiplying by any factor

What happens if we instead grow the array by 50%?
In fact, it still works out fine - the program takes linear time to run.
To see this, you can use the same argument as above, but instead of using the formula
$2^0+2^1+...+2^k = 2^{k+1}$,
you have to use the formula for a general
[geometric progression](https://en.wikipedia.org/wiki/Geometric_progression).
What you get is an overhead of *three elements copied per element added*.

In fact, multiplying the array size by *any constant* works,
because the same geometric progression reasoning applies.
We can calculate the exact performance overhead of growing the array by any given factor:

::: example
#### Theorem: Growing by a factor

If we grow the array by a factor of $k > 1$ when resizing it,
then the overhead is at most $\frac{k}{k-1}$ elements copied per element added to the dynamic array.
For example, when growing by 20% (k = 1.2), the overhead is 6 elements copied per add.
:::

In short, when resizing a dynamic array list,
we should **multiply the array size by a constant**.
when adding many elements, this guarantees that we only have
a constant factor of performance overhead due to occasional resizing.
We can choose a large factor (such as 2) if we want fast performance,
or a low factor (such as 1.2) if we want to save memory.

For example, the Java standard library has the class ArrayList which is a dynamic array
-- it grows by 50% each time (multiplies by $\frac{3}{2}$).
And the built-in lists in Python grow by as little as 12% (multiplies by $\frac{9}{8}$).
This means that they have to grow more often but on the other hand they do not use as much memory.


### Resizing an array-based queue

When we resize the internal array, we cannot keep the positions of the elements.
If the queue is wrapped around (that is, if *rear* < *front*)
then we might end up in a large gap in the middle of the queue.
For example, the following queue consists of 7 elements,
where T was the element most recently added and A is the one that has waited the longest:

![](images/CircularQueue1.png)

Now, let us say we enqueue five more elements, then we get this situation:

![](images/CircularQueue2.png)

What happens if we want to enqueue yet another element?
We have to resize the array, and we do this like before by doubling the size.
But now we have to be a little careful when copying over the elements to the new array
-- we cannot just copy the elements to the same positions, because then we would end up in this situation:

![](images/CircularQueue3.png)

Instead we reset the *front* and *rear* pointers so that we copy
the first queue element to position 0 of the new array,
the second to position 1, and so on.
This will lead to the following resized array:

![](images/CircularQueue4.png)

Apart from this detail, that we have to reset the pointers,
the implementation of resizing is similar to the one for stacks:

    datatype ArrayQueue:
        ...
        resizeArray(newCapacity):
            oldArray = internalArray
            internalArray = new Array(newCapacity)
            for pos in 0 .. size-1:
                oldPos = (pos + front) mod internalArray.size
                internalArray[pos] = oldArray[oldPos]
            front = 0
            rear = size - 1

Note that there are several ways to copy the elements, we do not have to reset *front* to zero.
We can also keep *front* at its original position, but then the *rear* pointer will have to be updated.
Here is how the example array could look like in this case after resizing:

![](images/CircularQueue5.png)


### Shrinking the internal array

But what about the size of the internal array when we pop?
Assume that we have pushed 1 million elements to the stack, and then popped them all
-- then our internal array will still occupy (at least) 1 million cells in memory.
Is it possible to decrease the size of the internal array when popping?

Yes, it is, but then it is very important that we don't resize it too soon.
Let us say that we double the size when pushing -- then we cannot halve the size when it is half full.
Why is that?
Consider the following sequence of additions and deletions:

    push("A"); pop(); push("B"); pop(); push("C"); pop(); push("D"); pop(); ...

If we are unlucky and the array is full just before the sequence starts,
then the first push will have to resize the array.
Then when we pop that element, the list becomes less than half-full, and we have to resize again.
Then the next push will resize, and the next pop will also resize.
And so on...
This will lead to a linear-time resize every time we push/pop,
and so the final complexity will be linear (per operation) and not constant time.
Which is not what we want.

How can we alleviate this?
The solution is to wait even longer until we shrink the internal array!
For example, we can shrink the array (that is, halve it), when it is only 1/3 full.
Note that the factors 1/3 and 1/2 are not important, as explained earlier.
The only thing that matters is that the minimum load factor (1/3) is *smaller* than the shrinking factor (1/2).

In summary, to get a dynamically shrinking stack (or queue),
we can add the following lines right before the end of the *pop* or *dequeue* methods:

    if size <= internalArray.size * 1/3:
        resizeArray(internalArray.size * 1/2)

So the dynamic *pop* method for stacks will look like this:

    datatype ArrayStack:
        ...
        pop():
            size = size - 1
            result = internalArray[size]
            internalArray[size] = null    // For garbage collection
            if size <= internalArray.size * 1/3:
                resizeArray(internalArray.size * 1/2)
            return result

::: dsvis
Dynamic arrays -- deletion.

``` {.jsav-animation src="ChalmersGU/DynamicArrayList-Remove-CON.js" links="ChalmersGU/CGU-Styles.css" name="Dynamic Array-based List Deletion Slideshow"}
```
:::


### Comparing linked lists and dynamic arrays

Now that you have seen two substantially different implementations for stacks and queues,
it is natural to ask which is better.
In particular, if you must implement a stack or a queue for some task, which implementation should you choose?

#### Time complexity

All the basic operations for the array-based and linked list implementations take constant time,
so from a time efficiency perspective, neither has a significant advantage.

Array-based lists are usually slightly faster because they can make use of
the internal memory cache that modern computers have, but it depends on many factors
-- the programming language, the operating system, the processor, etc.

One little disadvantage with array-based lists is that the operations are only *amortised* constant time.
We will discuss amortised time more in @sec:amortised-analysis later.
But what it means in practice is that *push*, *pop*, *enqueue* and *dequeue*
are only guaranteed to be constant time *on average* if we run many operations.
Now and then (very rarely) the internal array will be resized, and then the operation might take longer time than usual.

This means that if we are implementing an application that has hard real-time constraints,
a linked list might be a slightly better choice.

#### Memory usage

Given a collection of elements to store, they take up some amount of
space whether they are simple integers or large objects with many
fields. Any container data structure like a stack, a queue or a list then requires some
additional space to organise the elements being stored.
This additional space is called [overhead]{.term}.

-   Array-based lists have the disadvantage that the *capacity* of the internal array
    is larger than the actual size of the list.
    When the array has recently been reallocated, a substantial amount of space
    might be tied up in a largely empty array.
    This empty space is the overhead required by the array-based list.

-   Linked lists on the other hand have the advantage that they only need space
    for the objects actually on the list.
    However, each list node needs to allocate memory for the pointer to the next node,
    and all of these pointers combined is the overhead required by the array-based list.

The amount of space required by a linked list is directly proportional
to the number of elements $n$. Assuming that each list node takes up $k$
bytes of memory, the full list will use $kn$ bytes. The amount of space
required by an array-based list is in the worst case three times as much
as $n$ times the size of an array cell. (This worst case will arise when
we remove a lot of elements from the list, because we wait until it is
1/3 full until we shrink the array). So assuming that one array cell
takes up $c$ bytes, the full array-based list will use at least $Cn$
bytes, and at most $3cn$ bytes.

So, which one is the best? It depends on the size $k$ of the list nodes,
compared to the size $c$ of the array cells. Array-based lists have the
advantage that there is no wasted space for an individual element.
Linked lists require that an extra pointer for the *next* field be added
to every list node. So the linked list has these *next* pointers as
overhead. In many cases, $k$ is 2--3 times as large as $c$, so they will
be quite similar in size on average. But this depends on the programming
language, the operating system, and perhaps other factors.

Note that these calculations exclude the memory used by the actual list
elements, since the lists themselves only contain pointers to the
elements! And in many cases, the objects themselves are much larger than
the list nodes (or array cells).
