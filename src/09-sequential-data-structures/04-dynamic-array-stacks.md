
## Implementing stacks and queues using dynamic arrays


### Array-based stacks

The dynamic array-based stack contains an internal array (which will
grow and shrink dynamically), and the index of the **top** of the stack.
Or actually, the index is for the next free slot in the array, which at
the same time is the size of the stack.

    class DynamicArrayStack implements Stack:
        DynamicArrayStack():
            this.internalArray = new Array(8)  // Internal array containing the stack elements
            this.stackSize = 0                 // Size of stack, and index of the next free slot

Note that here we use an initial array size of 8, but we could use any positive value.
(It doesn't work with an initial empty array, can you figure out why?)

The array-based stack implementation is essentially a simplified version
of the array-based list. The only important design decision to be made
is which end of the array should represent the top of the stack.

<inlineav id="DynamicArrayStack-Top-CON" src="ChalmersGU/DynamicArrayStack-Top-CON.js" name="Array stack top position slideshow" links="ChalmersGU/CGU-Styles.css"/>


#### Invariants


#### Pushing to the stack

<inlineav id="DynamicArrayStack-Push-CON" src="ChalmersGU/DynamicArrayStack-Push-CON.js" name="Array stack push slideshow" links="ChalmersGU/CGU-Styles.css"/>

    class DynamicArrayStack implements Stack:
        ...
        push(x):
            if this.stackSize >= this.internalArray.size():
                this.resizeArray(this.internalArray.size() * 2)
            this.internalArray[this.stackSize] = x
            this.stackSize = this.stackSize + 1

Note that any resizing factor >1 works, and in fact it is probably better to use something like 1.5 or even 1.1
(because this will save memory without losing too much efficiency).

<avembed id="DynamicArrayStack-Push-PRO" src="ChalmersGU/DynamicArrayStack-Push-PRO.html" type="ka" name="Array-based Stack Push Exercise"/>

#### Popping from the stack

<inlineav id="DynamicArrayStack-Pop-CON" src="ChalmersGU/DynamicArrayStack-Pop-CON.js" name="Array stack pop slideshow" links="ChalmersGU/CGU-Styles.css"/>

    class DynamicArrayStack implements Stack:
        ...
        pop():
            precondition: this.stackSize > 0
            this.stackSize = this.stackSize - 1
            x = this.internalArray[this.stackSize]
            this.internalArray[this.stackSize] = null  // For garbage collection
            if this.stackSize <= this.internalArray.size() * 1/3:
                this.resizeArray(this.internalArray.size() * 1/2)
            return x

Note that the factors 1/3 and 1/2 are not set in stone. The only requirement is that
the minimum load factor 1/3 must be smaller than the shrinking factor 1/2,
which in turn must be <1.

<avembed id="DynamicArrayStack-Pop-PRO" src="ChalmersGU/DynamicArrayStack-Pop-PRO.html" type="ka" name="Array-based Stack Pop Exercise"/>

As you hopefully have noticed, the code for stacks is very similar to
the code for lists. E.g., the internal variables are exactly the same,
and the resizing method doesn't change at all. The main difference is
that stacks are even simpler to implement than their list counterparts.

#### Implementing two stacks using one array

If you need to use two stacks at the same time, you can take advantage
of the one-way growth of the array-based stack by using a single array
to store two stacks. One stack grows inward from each end as illustrated
by the figure below, hopefully leading to less wasted space. However,
this only works well when the space requirements of the two stacks are
inversely correlated. In other words, ideally when one stack grows, the
other will shrink. This is particularly effective when elements are
taken from one stack and given to the other. If instead both stacks grow
at the same time, then the free space in the middle of the array will be
exhausted quickly, and the array has to be resized.

:::: {#TwoArrayStacks}
<inlineav id="LinkedStack-Twostack-CON" src="ChalmersGU/LinkedStack-Twostack-CON.js" name="Two Stacks in the same Array" links="ChalmersGU/CGU-Styles.css" static/>
::::
