
## Stacks implemented as linked lists

::: TODO
- Prio 1: invariants
- Prio 1: explanations of the pseudocode, not just the code (also file 04b)
:::

In this section we present one of the two traditional implementations for lists, usually called a [linked list]{.term}.
The linked list uses [dynamic memory allocation]{.term}, that is, it allocates memory for new list elements as
needed. The following diagram illustrates the linked list concept. There
are three [nodes](#node){.term} that are
"linked" together. Each node has two boxes. The box on the right holds a link to the next node in the list.
Notice that the rightmost node does not have any link coming out of this box.

::: online
<inlineav id="LinkedList-Overview-CON" src="ChalmersGU/LinkedList-Overview-CON.js" name="Linked List Overview" links="ChalmersGU/CGU-Styles.css" static/>
:::

::: latex
\begin{center}
\begin{tikzpicture}[
    list/.style={
        rectangle split,
        rectangle split parts=2,
        rectangle split horizontal,
        draw
    },
    >=stealth,
    start chain
]
  \node[list, on chain] (A) {\phantom{99}};
  \node[list, on chain] (B) {\phantom{99}};
  \node[list, on chain, rectangle split part fill={white,black!50}] (C) {\phantom{99}};
  \draw[*->] let \p1 = (A.two), \p2 = (A.center) in (\x1,\y2) -- (B);
  \draw[*->] let \p1 = (B.two), \p2 = (B.center) in (\x1,\y2) -- (C);
\end{tikzpicture}
\end{center}
:::

#### Linked list nodes

Because a list node is a distinct object (as opposed to simply a cell in an array), it is good practice to make a separate data type for list nodes.
Objects of the data type `Node` contain a field `elem` to store the element value, and a field `next` to store a pointer to the next node on the list.

    datatype Node of T:
        elem: T          // Value for this node
        next: Node of T  // Pointer to next node in list

The list built from such nodes is called a [singly linked list]{.term}, or a [one-way list]{.term}, because each list node has a single pointer to the next node on the list.

In this section and the next we describe how to use linked lists to implement stacks and queues, and in sections @sec:double-ended-queues and @sec:general-lists we will discuss extensions such as double-ended queues and general lists.

#### Linked stacks

The linked stack implementation is quite simple.
Elements are inserted and removed only from the head of the list. Here is a visual representation for a linked stack.

::: online
<inlineav id="LinkedStack-Overview-CON" src="ChalmersGU/LinkedStack-Overview-CON.js" name="Linked Stack Overview" links="ChalmersGU/CGU-Styles.css" static/>
:::

::: latex
\begin{center}
\begin{tikzpicture}[
    every node/.style={rectangle split, rectangle split parts=2, rectangle split horizontal},
    node distance=1em, start chain, every join/.style={->, shorten <=-4.5pt}
]
  \node[draw, on chain, join] { 20 };
  \node[draw, on chain, join] { 23 };
  \node[draw, on chain, join] {  8 };
  \node[draw, on chain, join] { 12 };
  \node[draw, on chain, join, rectangle split part fill={white,black!50}] { 15 };
  \path [<-, draw, shorten >=10pt] (chain-1.one north) |- node [at end] {top} ++(-1,.5);
\end{tikzpicture}
\end{center}
:::

Our data type for linked stacks contains two instance variables, one pointer to the head of the stack (called the `top`), and a variable storing the number of elements.
(This second variable is in theory unnecessary, but it improves the efficiency of getting the stack size).

    datatype LinkedStack implements Stack:
        top: Node = null   // Pointer to top of stack
        size: Int = 0      // Size of stack

<!--
### Invariants
 -->

<!-- #### Pushing to a linked stack -->

::: dsvis
#### Pushing to a linked stack

<inlineav id="LinkedStack-Push-CON" src="ChalmersGU/LinkedStack-Push-CON.js" name="Linked Stack Push" links="ChalmersGU/CGU-Styles.css"/>
:::

To push a new element onto the stack, we first have to create a new node and set its value.
Then we set its next pointer to the current top of the stack,
and after that we can redirect the top to the new node.
We also have to increase the size of the stack by one.
The actions to create the node, set its value and pointer, and then redirect the stack top, can be done in one single line, like this:

    datatype LinkedStack:
        ...
        push(elem):
            top = new Node(elem, top)
            size = size + 1

::: dsvis
Linked stack -- push exercise.

<avembed id="LstackPushPRO" src="ChalmersGU/LstackPushPRO.html" type="ka" name="Linked Stack Push Exercise"/>
:::

<!-- #### Popping from a linked stack -->

::: dsvis
#### Popping from a linked stack

<inlineav id="LinkedStack-Pop-CON" src="ChalmersGU/LinkedStack-Pop-CON.js" name="Linked Stack Pop" links="ChalmersGU/CGU-Styles.css"/>
:::

To pop the topmost element off the stack, we first have to remember a pointer to the current top node, because we want to return its value after we have updated the stack.
Then we can redirect the stack top to the next node.
After that we decrease the size and return the value of the removed node:

    datatype LinkedStack:
        ...
        pop():
            removed = top
            top = removed.next
            removed.next = null  // For garbage collection
            size = size - 1
            return removed.elem

Note that we also set the `next` pointer of the old top to **null**.
This is to help the garbage collection system actually remove the whole node when noone is using it anymore.

::: dsvis
Linked stack -- pop exercise.

<avembed id="LstackPopPRO" src="ChalmersGU/LstackPopPRO.html" type="ka" name="Linked Stack Pop Exercise"/>
:::

