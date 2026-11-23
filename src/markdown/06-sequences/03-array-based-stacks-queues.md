
## Array-based stacks and queues {#sequences:array-sequences}

::: TODO
- Prio 2: can we find good invariants?
:::

In the last section we showed how to implement stacks and queues using linked lists.
But we already have a built-in data structure which stores elements in some kind of order -- arrays.
Can we use arrays to implement stacks and queues too?

Yes, but there there is one big problem with using arrays -- they are always *fixed size*.
So if we have an array of size 20 we can only have a stack or queue with at most 20 elements.
This is a serious restriction, and in the next section we will show how to solve that, using *dynamic arrays*.
But in this section we will simply assume that we have a fixed maximum number of elements.


### Array-based stacks {#sequences:array-stacks}

An array-based stack uses an internal array as underlying storage.
Here we declare a stack with an internal capacity of $20$ elements:

    datatype ArrayStack:
        arr = new Array(20)   // Internal array containing the stack elements
        size = 0              // The size of the stack

Note that $20$ is the internal *capacity* of the stack, it is not the current size.
When the stack is created it should be empty, and therefore the initial stack size is $0$.

An important design decision is which end of the array should represent the top of the stack.
It might be tempting to let the top be the first element in the array, that is, the element at position $0$.
However, this is inefficient:
whenever we want to push to or pop from the stack,
we would have to shift all elements in the array one position to the left or to the right.

::: dsvis
Here we discuss where the top of the stack should be stored.

``` {.jsav-animation src="ChalmersGU/DynamicArrayStack-Top-CON.js" links="ChalmersGU/CGU-Styles.css" name="Array stack top position slideshow"}
```
:::

A much better solution is to have the top be the *last element*,
that is, the element at position $n{-}1$ (if $n$ is the size of the stack).
Then we do not have to shift around a lot of elements,
but instead we can move the stack pointer to the left or the right.
@Fig:array-stack shows two ways of viewing the same array-based stack with four elements.

![
    Two ways to visualise the same array-based stack.
    The stack has size 4, but the array has a capacity of 8 elements.
    The left picture is more accurate to how it is stored in memory,
    but the right one is more compact and is how we normally show it.
](images/6.3-array-stack.svg){#fig:array-stack}


#### Pushing

In an array-based stack we do not need a separate pointer to the top,
because it is the same as the `size` variable (minus 1).
That is, the `size` points to the index of the next free array cell.
Therefore, to push a value onto the stack, we assign `arr[size]` and then increase the size.
(Note that for now we ignore the possibility that the stack is full.)

    function push(stack, value):
        stack.arr[stack.size] = value
        stack.size += 1

::: dsvis
Here we show how to push to an array-based stack.

``` {.jsav-animation src="ChalmersGU/DynamicArrayStack-Push-CON.js" links="ChalmersGU/CGU-Styles.css" name="Array stack push slideshow"}
```
:::

::: dsvis
Here is a proficiency exercise about pushing to array-based stacks.

```{.jsav-embedded src="ChalmersGU/DynamicArrayStack-Push-PRO.html" type="ka" name="Array-based Stack Push Exercise"}
```
:::

#### Popping

To pop an element from the stack we simply decrease the `size`.
However, we also have to clear the cell that contain the old top value (by assigning it `null`).
This is important, because otherwise the old value will still be referred to by the internal array,
so the garbage collector cannot remove it.

    function pop(stack):
        stack.size -= 1
        stack.arr[stack.size] = null   // For garbage collection


::: dsvis
Here we show how to pop from an array-based stack.

``` {.jsav-animation src="ChalmersGU/DynamicArrayStack-Pop-CON.js" links="ChalmersGU/CGU-Styles.css" name="Array stack pop slideshow"}
```
:::

::: dsvis
Here is a proficiency exercise about popping from array-based stacks.

```{.jsav-embedded src="ChalmersGU/DynamicArrayStack-Pop-PRO.html" type="ka" name="Array-based Stack Pop Exercise"}
```
:::


::: {.example #ex:two-stacks-one-array}
#### Example: Implementing two stacks using one array

Since a stack only grows in one direction,
you can use a single array to store *two* stacks that grow toward each other from each end.
This is particularly useful if you tend to move elements between the stacks --
for example by popping one and directly pushing to the other.
If instead both stacks grow at the same time, the array will get full quickly.

<!-- ![](images/6.3-two-stacks-in-one-array.svg) -->
:::


### Implementing queues using circular arrays {#sequences:array-queues}

We cannot use a simple conversion of the array-based stack if we want to implement a queue:

-   If we let the front of the queue be the same as the stack top
    -- that is, the last element in the array --
    we can easily enqueue new elements by simply moving the front index.
    But then the back of the queue will be the first array element,
    and to dequeue it we have to shift all the remaining array elements one step to the left.
    Therefore dequeueing becomes linear, $O(n)$.

-   If we instead let the front be the first array element, dequeueing becomes easy.
    But then we will instead have to shift all elements to be able to enqueue, again giving complexity $O(n)$.


::: dsvis
Array queue -- positions.

``` {.jsav-animation src="List/aqueueFirstCON.js" links="List/aqueueCON.css" name="Array-based Queue Positions Slideshow"}
```
:::

The solution is to keep track of *two* positions, the `front` and the `back`, and let both of them change dynamically.
This means that we relax the requirement that the queue must occupy the start of the array.
The queue simply consists of all elements between the `front` and the `back` cells.
Now enqueueing and dequeueing become rather similar to each other:

<!-- \enlargethispage{\baselineskip} -->

- To `enqueue` an element, we increase the `back` position.
- To `dequeue` an element, we instead increase the `front` position.

::: dsvis
Array queue -- drifting.

``` {.jsav-animation src="List/aqueueDriftCON.js" links="List/aqueueCON.css" name="Array-based Queue Drift Slideshow"}
```
:::

Note that both positions will only increase, they will never decrease.
This causes the queue to *drift* within the array, and at some point `back` will hit the end of the array.
We might get into a situation where the queue itself only occupies a few array cells, but the back is still at the very end.
Consider, for example, what happens if we run `enqueue` directly followed by a `dequeue`, and we do this 20 times.
The queue itself will never contain more than one element,
but `back` is anyway pointing to the end of the array.
The next time we enqueue an element the program will crash,
because we try to refer to an array cell that does not exist.

::: dsvis
Array queue -- bad representation.

``` {.jsav-animation src="List/aqueueBadCON.js" links="List/aqueueCON.css" name="Array-based Queue Bad Representation Slideshow"}
```
:::

#### Queues as circular arrays

This "drifting queue" problem can be solved by pretending that the array is *circular*,
meaning that we can go from the last array cell directly to the first.
If `front` position is somewhere in the middle of the array there is plenty of space at the beginning
-- so we can "wrap around" `back` and let it start from the beginning.
And when we have dequeued a lot of elements, `front` will reach the end of the array
-- so we treat it in the same way and let it wrap around too.

@Fig:array-queue shows two versions storing exactly the same 4-element queue.
The element that was added most recently is "*dogs*", which is what `back` points to,
and `front` points to "*every*", which is the one that has waited the longest.
When we want to enqueue a new element, it will be assigned to the empty cell after `back`.

![
    Two possible ways of storing the same queue in an array with capacity 8.
    The leftmost is what we get after enqueuing directly into a new empty queue, while
    the version to the right can occur if we have enqueued and dequeued a lot of elements.
](images/6.3-array-queue.svg){#fig:array-queue}

::: dsvis
Circular array queue.

``` {.jsav-animation src="List/aqueueCircularCON.js" scripts="DataStructures/CircularQueue.js" links="List/aqueueCON.css" name="Circular Array-based Queue Slideshow"}
```
:::

There remains one more subtle problem -- how can we distinguish between an empty and a full queue?
Both when the queue is empty and when it is full, the `front` position is one larger than `back`.
In other words: if `front` is `back+1`, is the queue empty or full?

::: dsvis
Circular array queue -- empty.

``` {.jsav-animation src="List/aqueueEmptyCON.js" scripts="DataStructures/CircularQueue.js" links="List/aqueueCON.css" name="Empty Circular Array-based Queue Slideshow"}
```
:::

One possible solution is set `front` and `back` to some unused number (such as $-1$) whenever the queue becomes empty.
This is a very nice solution that does not use any extra memory,
but our choice is instead to keep an explicit count of the number of elements, in a variable `size`.
The reason for this is because it will make the code more similar to our previous implementations.

    datatype ArrayQueue:
        arr = new Array(20)  // Internal array containing the queue elements
        size = 0             // Size of the queue
        front = 0            // Position of the front element
        back = -1            // Position of the back element


#### Enqueueing

When enqueueing an element, we increase the `back` position (modulo the capacity of the internal array).

    function enqueue(queue, x):
        queue.back += 1 (mod queue.arr.size)  // Circular increment
        queue.arr[queue.back] = x
        queue.size += 1

#### Dequeueing

When dequeueing, we increase the `front` position (modulo the capacity).
Just as for array-based stacks, we have to clear the array cell that was dequeued,
because otherwise it will never be garbage collected.

    function dequeue(queue):
        queue.arr[queue.front] = null          // For garbage collection
        queue.front += 1 (mod queue.arr.size)  // Circular increment
        queue.size -= 1

<!-- Again, we ignore the possibility that the internal array is full or that the queue is empty. -->

::: dsvis
Array-based queue practice exercises.

```{.jsav-embedded src="ChalmersGU/AqueueEnqueuePRO.html" type="ka" name="Array-based Queue Enqueue Exercise"}
```

```{.jsav-embedded src="ChalmersGU/AqueueDequeuePRO.html" type="ka" name="Array-based Queue Dequeue Exercise"}
```
:::
