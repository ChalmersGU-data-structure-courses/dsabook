
## Stacks implemented as linked lists

::: TODO
- Prio 1: invariants
- Prio 1: explanations of the pseudocode, not just the code (also file 04b)
:::

In this section we present one of the two traditional implementations for lists, usually called a [linked list]{.term}.
The linked list uses [dynamic memory allocation]{.term}, that is, it allocates memory for new list elements as
needed. The following diagram illustrates the linked list concept. There
are three [nodes](#node){.term} that are
"linked" together. Each node has two boxes. The box on the right holds
a link to the next node in the list. Notice that the rightmost node has
a diagonal slash through its link box, signifying that there is no link
coming out of this box.

<inlineav id="LinkedList-Overview-CON" src="ChalmersGU/LinkedList-Overview-CON.js" name="Linked List Overview" links="ChalmersGU/CGU-Styles.css" static/>

Because a list node is a distinct object (as opposed to simply a cell in an array), it is good practice to make a separate data type for list nodes.
Objects of the data type `Node` contain a field `elem` to store the element value, and a field `next` to store a pointer to the next node on the list.

    datatype Node of T:
        elem: T          // Value for this node
        next: Node of T  // Pointer to next node in list

The list built from such nodes is called a [singly linked list]{.term}, or a [one-way list]{.term}, because each list node has a single pointer to the next node on the list.

In this section we describe how to use linked lists to implement stacks and queues, and in section XX and YY we will discuss extensions such as double-ended queues and general lists.

### Linked stacks

The linked stack implementation is quite simple.
Elements are inserted and removed only from the head of the list. Here is a visual representation for the linked stack.

<inlineav id="LinkedStack-Overview-CON" src="ChalmersGU/LinkedStack-Overview-CON.js" name="Linked Stack Overview" links="ChalmersGU/CGU-Styles.css" static/>

Our data type for linked stacks contains two instance variables, one pointer to the head of the stack (called the `top`), and a variable storing the number of elements.
(This second variable is in theory unnecessary, but it improves the efficiency of getting the stack size).

    datatype LinkedStack implements Stack:
        top: Node = null   // Pointer to top of stack
        size: Int = 0      // Size of stack

<!--
### Invariants
 -->

### Push to a linked stack


::: dsvis
Linked stack -- push.

<inlineav id="LinkedStack-Push-CON" src="ChalmersGU/LinkedStack-Push-CON.js" name="Linked Stack Push" links="ChalmersGU/CGU-Styles.css"/>
:::

The first three actions, to create the node, set the value and the next pointer, can be done in one single line, like this:

    datatype LinkedStack implements Stack:
        ...
        push(x):
            top = new Node(x, top)
            size = size + 1

::: dsvis
Linked stack -- push exercise.

<avembed id="LstackPushPRO" src="ChalmersGU/LstackPushPRO.html" type="ka" name="Linked Stack Push Exercise"/>
:::

### Pop from a linked stack

::: dsvis
Linked stack -- pop.

<inlineav id="LinkedStack-Pop-CON" src="ChalmersGU/LinkedStack-Pop-CON.js" name="Linked Stack Pop" links="ChalmersGU/CGU-Styles.css"/>
:::


    datatype LinkedStack implements Stack:
        ...
        pop():
            // precondition: size > 0
            removed = top
            top = removed.next
            removed.next = null  // For garbage collection
            size = size - 1
            return removed.elem


::: dsvis
Linked stack -- pop exercise.

<avembed id="LstackPopPRO" src="ChalmersGU/LstackPopPRO.html" type="ka" name="Linked Stack Pop Exercise"/>
:::

