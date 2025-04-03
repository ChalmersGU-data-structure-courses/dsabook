
## Stacks implemented using arrays

::: TODO
- Prio 1: invariants
- Prio 1: explanations of the pseudocode, not just the code (also file 05b)
:::

The array-based stack contains pre-allocated internal array, and the size of the stack.

    datatype ArrayStack implements Stack:
        internalArray = new Array(1000)  // Internal array containing the stack elements
        size = 0                         // Size of stack, also index of the next free slot

Note that here we use an internal *capacity* of 1000 for the internal array, but we could use any positive value.


The only important design decision to be made is which end of the array should represent the top of the stack.

<inlineav id="DynamicArrayStack-Top-CON" src="ChalmersGU/DynamicArrayStack-Top-CON.js" name="Array stack top position slideshow" links="ChalmersGU/CGU-Styles.css"/>


### Invariants


### Pushing to the stack

<inlineav id="DynamicArrayStack-Push-CON" src="ChalmersGU/DynamicArrayStack-Push-CON.js" name="Array stack push slideshow" links="ChalmersGU/CGU-Styles.css"/>

    datatype ArrayStack implements Stack:
        ...
        push(x):
            internalArray[size] = x
            size = size + 1

<avembed id="DynamicArrayStack-Push-PRO" src="ChalmersGU/DynamicArrayStack-Push-PRO.html" type="ka" name="Array-based Stack Push Exercise"/>

### Popping from the stack

<inlineav id="DynamicArrayStack-Pop-CON" src="ChalmersGU/DynamicArrayStack-Pop-CON.js" name="Array stack pop slideshow" links="ChalmersGU/CGU-Styles.css"/>

    datatype ArrayStack implements Stack:
        ...
        pop():
            // precondition: size > 0
            size = size - 1
            x = internalArray[size]
            internalArray[size] = null  // For garbage collection
            return x

<avembed id="DynamicArrayStack-Pop-PRO" src="ChalmersGU/DynamicArrayStack-Pop-PRO.html" type="ka" name="Array-based Stack Pop Exercise"/>

As you hopefully have noticed, the code for stacks is very similar to
the code for lists. E.g., the internal variables are exactly the same,
and the resizing method doesn't change at all. The main difference is
that stacks are even simpler to implement than their list counterparts.

### Implementing two stacks using one array

If you need to use two stacks at the same time, you can take advantage
of the one-way growth of the array-based stack by using a single array
to store two stacks. One stack grows inward from each end as illustrated
by the figure below, hopefully leading to less wasted space. However,
this only works well when the space requirements of the two stacks are
inversely correlated. In other words, ideally when one stack grows, the
other will shrink. This is particularly effective when elements are
taken from one stack and given to the other. If instead both stacks grow
at the same time, then the free space in the middle of the array will be
exhausted quickly.

:::: {#TwoArrayStacks}
<inlineav id="LinkedStack-Twostack-CON" src="ChalmersGU/LinkedStack-Twostack-CON.js" name="Two Stacks in the same Array" links="ChalmersGU/CGU-Styles.css" static/>
::::
