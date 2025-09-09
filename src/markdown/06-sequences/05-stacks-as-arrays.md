
## Stacks implemented using arrays

::: TODO
- Prio 1: invariants
- Prio 1: explanations of the pseudocode, not just the code (also file 05b)
:::

The array-based stack contains a pre-allocated internal array, and the size of the stack.

    datatype ArrayStack implements Stack:
        internalArray = new Array(1000)  // Internal array containing the stack elements
        size = 0                         // Size of stack, also index of the next free slot

Note that here we use an internal *capacity* of 1000 for the internal array, but we could use any positive value.


::: dsvis
#### Where should the top of the stack be?

``` {.jsav-animation src="ChalmersGU/DynamicArrayStack-Top-CON.js" links="ChalmersGU/CGU-Styles.css" name="Array stack top position slideshow"}
```
:::

The only important design decision to be made is which end of the array should represent the top of the stack.
It might be tempting to let the top be the first element in the array, i.e., the element at position 0.
However, this is inefficient, because then we have to shift all elements in the array one position to the left or to the right, whenever we want to push to or pop from the stack.

Much better is to have the top be the *last element*, i.e. the element at position $n-1$ (if $n$ is the number of elements).
Then we don't have to shift around a lot of element, but instead just move the pointer to the left or the right.

<!--
### Invariants
 -->
<!--
### Pushing to the stack
 -->

::: dsvis
#### Pushing to the stack

``` {.jsav-animation src="ChalmersGU/DynamicArrayStack-Push-CON.js" links="ChalmersGU/CGU-Styles.css" name="Array stack push slideshow"}
```
:::

The *size* variable refers to the last uninhabited cell in the array.
So, to push an element onto the stack, we assign `internalArray[size]` and then increase the size.

    datatype ArrayStack:
        ...
        push(elem):
            internalArray[size] = elem
            size = size + 1

::: dsvis
Array stack -- push exercise.

<avembed id="DynamicArrayStack-Push-PRO" src="ChalmersGU/DynamicArrayStack-Push-PRO.html" type="ka" name="Array-based Stack Push Exercise"/>
:::


::: dsvis
#### Popping from the stack

``` {.jsav-animation src="ChalmersGU/DynamicArrayStack-Pop-CON.js" links="ChalmersGU/CGU-Styles.css" name="Array stack pop slideshow"}
```
:::

To pop an element from the stack we do the reverse of pushing:
first we decrease the size, then we remember the result in a temporary variable.
After that we can clear the old top cell in the array and return the result.

    datatype ArrayStack:
        ...
        pop():
            size = size - 1
            result = internalArray[size]
            internalArray[size] = null  // For garbage collection
            return result


::: dsvis
Array stack -- pop exercise.

<avembed id="DynamicArrayStack-Pop-PRO" src="ChalmersGU/DynamicArrayStack-Pop-PRO.html" type="ka" name="Array-based Stack Pop Exercise"/>
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
