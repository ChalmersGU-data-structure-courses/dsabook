
### Linked List Stacks

The linked stack implementation is quite simple. Elements are inserted
and removed only from the head of the list. Here is a visual
representation for the linked stack.

<inlineav id="LinkedStack-Overview-CON" src="ChalmersGU/LinkedStack-Overview-CON.js" name="Linked Stack Overview" links="ChalmersGU/CGU-Styles.css" static/>


    class LinkedStack implements Stack:
        LinkedStack():
            this.top = null     // Pointer to top of stack
            this.stackSize = 0  // Size of stack

Stack nodes are exactly the same as the
[linked list nodes](#linked-lists) we saw earlier.

    class Node:
        Node(elem, next):
            this.elem = elem   // Value for this node
            this.next = next   // Pointer to next node in stack


#### Linked Stack Push

<inlineav id="LinkedStack-Push-CON" src="ChalmersGU/LinkedStack-Push-CON.js" name="Linked Stack Push" links="ChalmersGU/CGU-Styles.css"/>

    class LinkedStack implements Stack:
        ...
        push(x):
            this.top = new Node(x, this.top)
            this.stackSize = this.stackSize + 1

<avembed id="LstackPushPRO" src="ChalmersGU/LstackPushPRO.html" type="ka" name="Linked Stack Push Exercise"/>

#### Linked Stack Pop

<inlineav id="LinkedStack-Pop-CON" src="ChalmersGU/LinkedStack-Pop-CON.js" name="Linked Stack Pop" links="ChalmersGU/CGU-Styles.css"/>

    class LinkedStack implements Stack:
        ...
        pop():
            precondition: this.stackSize > 0
            removed = this.top
            this.top = removed.next
            removed.next = null  // For garbage collection
            this.stackSize = this.stackSize - 1
            return removed.elem

<avembed id="LstackPopPRO" src="ChalmersGU/LstackPopPRO.html" type="ka" name="Linked Stack Pop Exercise"/>



### Comparison of Array-Based and Linked Stacks

All operations for the array-based and linked stack implementations take
constant time, so from a time efficiency perspective, neither has a
significant advantage. Another basis for comparison is the total space
required. The analysis is similar to that done for list implementations.
The array-based stack must allocate an array with more elements than
actually needed, and some of that space is wasted whenever the stack is
not full. The linked stack can shrink and grow but requires the overhead
of a `next` field for every element.

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
