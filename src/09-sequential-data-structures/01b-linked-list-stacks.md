
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

