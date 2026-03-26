
## Array-based stacks and queues

::: TODO
- Prio 1: invariants
:::

In the last section we showed how to implement stacks and queues using linked lists.
But we already have a built-in data structure which stores elements in some kind of order -- arrays.
Can we use arrays to implement stacks and queues too?

Yes, and we will show how to do that here.
There is one big problem with using arrays -- they are always *fixed size*.
So if we have an array of size 1000 we can only have a stack or queue with at most 1000 elements.
This is a serious restriction, and in the next section we will show how to solve that
-- a *dynamic array* has the same features as a normal array, but it can change its size dynamically.
But in this section we will for now assume that we have a fixed maximum number of elements.

### Array-based stacks

An array-based stack uses an internal array as underlying storage, and this array has a predefined size.
In this example the underlying array has an internal size of 1000:

    datatype ArrayStack implements Stack:
        internalArray = new Array(1000)  // Internal array containing the stack elements
        size = 0                         // The size of the stack

Note that 1000 is the internal *capacity* of the stack, it is not the actual size.
When the stack is created it should be empty, and therefore the initial stack size is 0.

The important design decision to be made is which end of the array should represent the top of the stack.
It might be tempting to let the top be the first element in the array, i.e., the element at position 0.
However, this is inefficient:
whenever we want to push to or pop from the stack,
we would have to shift all elements in the array one position to the left or to the right.

::: dsvis
Here we discuss where the top of the stack should be stored.

``` {.jsav-animation src="ChalmersGU/DynamicArrayStack-Top-CON.js" links="ChalmersGU/CGU-Styles.css" name="Array stack top position slideshow"}
```
:::

A much better solution is to have the top be the *last element*,
that is, the element at position $n-1$ (if $n$ is the size of the stack).
Then we do not have to shift around a lot of elements,
but instead we can move the stack pointer to the left or the right.

#### Pushing and popping

In an array-based stack we do not need a separate pointer to the *top*,
because it is the same as the *size* variable (minus 1).
That is, the *size* points to the index of the next free array cell.
Therefore, to push a value onto the stack, we assign `internalArray[size]` and then increase the size.

    datatype ArrayStack:
        ...
        push(value):
            internalArray[size] = value
            size = size + 1

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

To pop an element from the stack we do the reverse of pushing:
first we decrease the *size*, then we remember the result in a temporary variable.
After that we can clear the old top cell in the array and return the result.

    datatype ArrayStack:
        ...
        pop():
            size = size - 1
            result = internalArray[size]
            internalArray[size] = null  // For garbage collection
            return result

Note that it is important that we clear the old top value (by assigning the cell to *null*).
Otherwise the old value will still be referred to by the internal array,
and then the automatic garbage collection cannot remove the object.

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


::: example
#### Example: Implementing two stacks using one array

If you need to use two stacks at the same time, you can take advantage
of the one-way growth of the array-based stack by using a single array
to store two stacks. One stack grows inward from each end, hopefully leading to less wasted space.
However, this only works well when the space requirements of the two stacks are
inversely correlated. In other words, ideally when one stack grows, the
other will shrink. This is particularly effective when elements are
taken from one stack and given to the other. If instead both stacks grow
at the same time, then the free space in the middle of the array will be
exhausted quickly.

```jsav-figure
var AV = NewAV();
var leftMarg = 180;
var topMarg = 40;
AV.g.rect(leftMarg, topMarg, 500, 31);
AV.g.line(leftMarg + 31, topMarg, leftMarg + 31, topMarg + 31);
AV.g.line(leftMarg + 31 * 2, topMarg, leftMarg + 31 * 2, topMarg + 31);
for (var i = 0; i < 4; i++) {
AV.g.line(leftMarg + 376 + 31 * i, topMarg,
            leftMarg + 376 + 31 * i, topMarg + 31);
}
AV.label("top1", {left: leftMarg + 20, top: topMarg - 55});
AV.g.line(leftMarg + 30, topMarg - 20, leftMarg + 45, topMarg - 2,
        {"arrow-end": "classic-wide-long", "stroke-width": 2});
AV.label("top2", {left: leftMarg + 376 + 20, top: topMarg - 55});
AV.g.line(leftMarg + 376 + 30, topMarg - 20, leftMarg + 376 + 15, topMarg - 2,
        {"arrow-end": "classic-wide-long", "stroke-width": 2});
AV.g.line(leftMarg + 82, topMarg + 16, leftMarg + 82 + 35, topMarg + 16,
        {"stroke-width": 2, "arrow-end": "block-wide-long"});
AV.g.line(leftMarg + 356, topMarg + 16, leftMarg + 356 - 35, topMarg + 16,
        {"stroke-width": 2, "arrow-end": "block-wide-long"});
AV.displayInit();
AV.recorded();
```
:::
