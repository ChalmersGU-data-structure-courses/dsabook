
## Stacks

The [stack]{.term} is a list-like structure in
which elements may be inserted or removed from only one end. While this
restriction makes stacks less flexible than lists, it also makes stacks
both efficient (for those operations they can do) and easy to implement.
Many applications require only the limited form of insert and remove
operations that stacks provide. In such cases, it is more efficient to
use the simpler stack data structure rather than the generic list.

Despite their restrictions, stacks have many uses. Thus, a special
vocabulary for stacks has developed. Accountants used stacks long before
the invention of the computer. They called the stack a
"[LIFO]{.term}" list, which stands for
"Last-In, First-Out." Note that one implication of the LIFO policy is
that stacks remove elements in reverse order of their arrival.

The accessible element of the stack is called the `top` element.
Elements are not said to be inserted, they are
[pushed](#push){.term} onto the stack. When
removed, an element is said to be [popped](#pop){.term} from the stack. Here is our [ADT]{.term} for stacks:

    interface Stack extends Collection:
        push(x)    // Pushes x on top of the stack.
        pop()      // Pops the top of the stack and returns it. Raises an exception if the stack is empty.
        peek()     // Returns the top element, without removing it. Raises an exception if the stack is empty.

As with lists, there are many variations on stack implementation. The
two main approaches are the [array-based stack]{.term} and the
[linked stack](#linked-list-stacks), which are analogous to array-based and linked lists,
respectively.

### Dynamic Array-Based Stacks

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

### Pushing to the Stack

<inlineav id="DynamicArrayStack-Push-CON" src="ChalmersGU/DynamicArrayStack-Push-CON.js" name="Array stack push slideshow" links="ChalmersGU/CGU-Styles.css"/>

    class DynamicArrayStack implements Stack:
        ...
        push(x):
            if this.stackSize >= this.internalArray.size():
                this.resizeArray(this.internalArray.size() * 2)  // Any factor >1 works here
            this.internalArray[this.stackSize] = x
            this.stackSize = this.stackSize + 1

<avembed id="DynamicArrayStack-Push-PRO" src="ChalmersGU/DynamicArrayStack-Push-PRO.html" type="ka" name="Array-based Stack Push Exercise"/>

### Popping from the Stack

<inlineav id="DynamicArrayStack-Pop-CON" src="ChalmersGU/DynamicArrayStack-Pop-CON.js" name="Array stack pop slideshow" links="ChalmersGU/CGU-Styles.css"/>

    class DynamicArrayStack implements Stack:
        ...
        pop():
            if not (this.stackSize > 0): 
                throw error "pop from empty stack"
            this.stackSize = this.stackSize - 1
            x = this.internalArray[this.stackSize]
            this.internalArray[this.stackSize] = null  // For garbage collection
            if this.stackSize <= this.internalArray.size() * 1/3:
                this.resizeArray(this.internalArray.size() * 1/2)
            return x

<avembed id="DynamicArrayStack-Pop-PRO" src="ChalmersGU/DynamicArrayStack-Pop-PRO.html" type="ka" name="Array-based Stack Pop Exercise"/>

As you hopefully have noticed, the code for stacks is very similar to
the code for lists. E.g., the internal variables are exactly the same,
and the resizing method doesn't change at all. The main difference is
that stacks are even simpler to implement than their list counterparts.

