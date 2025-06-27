
## Queues implemented as linked lists

The linked queue implementation is an adaptation of the linked list. The
only thing is that we have to add a pointer to the rear node in the
queue, to be able to add new elements efficiently.

::: latex
\begin{center}
\begin{tikzpicture}[
    every node/.style={
        rectangle split,
        rectangle split parts=2,
        rectangle split horizontal,
        draw
    },
    node distance=1em,
    start chain,
    every join/.style={->, shorten <=-4.5pt}
]
  \node[on chain, join] { 42 };
  \node[on chain, join] {  5 };
  \node[on chain, join] { 10 };
  \node[on chain, join, rectangle split part fill={white,black!50}] { 25 };
  \path [<-, draw, shorten >=10pt] (chain-1.one north) |- node [at end] {front} ++(-1,.5);
  \path [<-, draw, shorten >=10pt] (chain-4.one north) |- node [at end] {rear} ++(-1,.5);
\end{tikzpicture}
\end{center}
:::

::: dsvis
Linked queue -- introduction.

<inlineav id="LinkedQueue-Intro-CON" src="ChalmersGU/LinkedQueue-Intro-CON.js" name="Linked Queue Intro" links="ChalmersGU/CGU-Styles.css"/>
:::

So the datatype for linked queues contains three instance variables, including the size of the queue:

    datatype LinkedQueue implements Queue:
        front: Node = null   // Pointer to front node
        rear: Node = null    // Pointer to rear node
        size: Int = 0        // Size of queue

<!--
### Invariants
 -->

::: dsvis
#### Enqueueing to a linked queue

<inlineav id="LinkedQueue-Enqueue-CON" src="ChalmersGU/LinkedQueue-Enqueue-CON.js" name="Linked Queue Enqueue" links="ChalmersGU/CGU-Styles.css"/>
:::

To enqueue a new element onto the stack, we first have to create a new node and set its value.
But instead of inserting the node at the front of the queue, we add it to the rear.
To do this we have to assign the next pointer of the current rear to the new node,
and after that we can redirect the rear pointer.
We also have to handle the special case when the queue is empty -- then the new node will be both front and rear, so we have to assign the front variable too.

    datatype LinkedQueue:
        ...
        enqueue(elem):
            newRear = new Node(elem, null)
            if size == 0:
                front = newRear
            else:
                rear.next = newRear
            rear = newRear
            size = size + 1

::: dsvis
Linked queue -- enqueue exercise.

<avembed id="LinkedQueue-Enqueue-PRO" src="ChalmersGU/LinkedQueue-Enqueue-PRO.html" type="ka" name="Linked Queue Enqueue Exercise"/>
:::

::: dsvis
#### Dequeueing from a linked queue

<inlineav id="LinkedQueue-Dequeue-CON" src="ChalmersGU/LinkedQueue-Dequeue-CON.js" name="Linked Queue Dequeue" links="ChalmersGU/CGU-Styles.css"/>
:::

Dequeueing from a queue is actually exactly the same as popping from a stack, where we use the front of the queue instead of the stack top.
There is only additional one thing we must assure -- if the final queue becomes empty, we have to delete the rear pointer too, otherwise it will point to a non-existing element.

    datatype LinkedQueue:
        ...
        dequeue():
            removed = front
            front = removed.next
            removed.next = null  // For garbage collection
            size = size - 1
            if size == 0:
                rear = null
            return removed.elem

::: dsvis
Linked queue -- dequeue exercise.

<avembed id="LinkedQueue-Dequeue-PRO" src="ChalmersGU/LinkedQueue-Dequeue-PRO.html" type="ka" name="Linked Queue Dequeue Exercise"/>
:::


### Case study: Sorting a linked list using Mergesort

We introduced Mergesort in section @sec:mergesort, and then we showed how to sort an array.
But Mergesort can also be used to sort linked lists, because it does not require random access to the list elements.
Thus, Mergesort is the method of choice when the input is in the form of a linked list.

:::::: latex
\booklink{Read section \ref{sec:case-study-sorting-a-linked-list-using-mergesort} online}{section-6.4.html\#sec:case-study-sorting-a-linked-list-using-mergesort}
::::::

:::::: online
In fact, the only thing we need is to access the front and back of the linked list, which means that we can use Mergesort on linked queues.
So, how do we implement splitting and merging?

Splitting the input list into two equal halves presents some difficulty.
Since we're using a linked list we cannot find the middle easily.
But we can use a little trick instead: assign elements of the input list alternating between the two sublists.
The first element is assigned to the first sublist, the second element to the second sublist, the third to first sublist, the fourth to the second sublist, and so on.
Or in pseudocode:

    function split(L) -> pair of two lists:
        L1, L2 = empty linked lists
        for each x in L:
            add x to L1 (even iterations) or L2 (odd iterations)
        return L1, L2

(Note that it doesn't matter if we add `x` to the front or back of `L1` and `L2`, because the lists will be sorted anyway.)

Merging two sorted linked lists is straightforward, because we need only remove items from the front of the input lists and append them to the end of the output list.
The pseudocode in section XX can be used with linked lists directly.

    function merge(L1, L2):
        answer = new empty linked list
        while L1 and L2 are nonempty:
            if L1.peek() <= L2.peek():
                enqueue L1.dequeue() to answer
            else:
                enqueue L2.dequeue() to answer
        enqueue all remaining elements of L1 and L2
        return L

::::::
