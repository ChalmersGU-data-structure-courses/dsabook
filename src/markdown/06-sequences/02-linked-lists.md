
## Stacks and queues as linked lists {#sequences:linked-lists}

::: TODO
- Prio 2: can we find good invariants?
:::

A linked list is a kind of "distributed" data structure,
in the sense that the main list object does not have full information about everything.
The only thing that the list knows about is the *first* element,
and each element only knows its *next* element.
This means that there is no easy way of know the total number of elements in the list --
if we need that information we have to keep track of the size in a variable.

![
    A linked list with four values.
    The right figure is a simplified representation of the same list.
](images/6.2-linked-list-example.svg){#fig:linked-list-intro}

@Fig:linked-list-intro shows two different representations of
a linked list with four values, where each value is encaspulated in a *list node*.
Each node contains a link to the next node in the list.
Notice that the rightmost node does not have any outgoing link.
List nodes are distinct objects, as opposed to cells in an array.
Therefore we declare a list node as a "wrapper" around a *value*
and a pointer to the *next* node in the list:

    datatype Node:
        value        // Value for this node
        next = null  // Pointer to the next node in the list

How can we know when the list ends?
Most languages have a designated "null" value which represents nothing at all
-- in Java it is called `null`, and in Python it is `None`.
So we will use this "null" value do denote the end of the list.

A list built from these very simple nodes is called a [singly linked list]{.term},
because each list node has a single pointer to the next node on the list.
There are also *doubly linked lists*, where each node also has a pointer to the previous node,
but we will not discuss them here --
singly linked lists are all we need to implement stacks and queues.


### Stacks as linked lists {#sequences:linked-stacks}

Implementing a stack as a linked list is quite simple.
Elements are inserted and removed only from the head of the list,
so the only information we need is a pointer to the *top* of the stack.

    datatype LinkedStack:
        top = null   // Pointer to the top node of the stack
        size = 0     // Size of the stack

Note that we also add a variable `size` storing the number of elements.
This is in theory unnecessary, but without it the only way of knowing the size
would be to iterate through the whole stack which takes time.
@Fig:linked-stack-and-pop shows a visual representation of a linked stack.
How can we implement the stack operations?
<!-- To `push` something we create a new node and put it at the top,
and to `pop` we delete the current topmost node. -->

![
    Visual representation of a linked stack, with "*every*" on the top.
    When we *pop* the stack, the grey links and boxes are deleted, and dashed link is added.
](images/6.2-linked-stack-and-pop.svg){#fig:linked-stack-and-pop}


#### Pushing

To `push` a value to the stack, we create a new `Node` object wrapping the value, and point it to the current `top` node.
Then we reassign the stack `top` to the new node.
Turning this description into pseudocode is straightforward,
we just have to remember to increase the size of the stack afterwards:

    function push(stack, value):
        stack.top = new Node(value, stack.top)
        stack.size += 1

::: dsvis
Here we show how to push to a linked stack.

``` {.jsav-animation src="ChalmersGU/LinkedStack-Push-CON.js" links="ChalmersGU/CGU-Styles.css" name="Linked Stack Push"}
```
:::

::: dsvis
Here is a proficiency exercise about pushing to linked stacks.

```{.jsav-embedded src="ChalmersGU/LstackPushPRO.html" type="ka" name="Linked Stack Push Exercise"}
```
:::


#### Popping

To `pop` from the stack, we can simply reassign `top` to the node that the current top node points to,
and decrease the size of the stack:

    function pop(stack):
        stack.top = stack.top.next
        stack.size -= 1

This is shown in the rightmost part of @fig:linked-stack-and-pop.
What if we want to also return the popped value?
Then we have to start by remembering the value of the current top node, before reassigning the stack `top`,
and in the end we can return the remembered value.

But wait a minute, what should we do with the old top node after it has been popped --
do we have to remove it in some way?
No, we don't have to do anything,
if we use a language that uses *garbage collection* (which most high-level languages do).
Such a language will automatically realise that there is nothing that refers to the old top anymore,
and will automatically remove the old top.
For low-level languages such as C, we need to tell the system to release the memory used by the old top node.

::: dsvis
Here we show how to pop from a linked stack.

``` {.jsav-animation src="ChalmersGU/LinkedStack-Pop-CON.js" links="ChalmersGU/CGU-Styles.css" name="Linked Stack Pop"}
```
:::

::: dsvis
Here is a proficiency exercise about popping from linked stacks.

```{.jsav-embedded src="ChalmersGU/LstackPopPRO.html" type="ka" name="Linked Stack Pop Exercise"}
```
:::


### Queues as linked lists {#sequences:linked-queues}

Implementing a queue is just slightly more tricky.
It is still easy to remove elements -- it is very similar to popping a stack.
But now we do not want to add elements to the front, but instead at the very end.
The only way to do that in a simple linked list is to traverse all nodes until we find the end,
and this is of course very slow if we have very many elements.

The solution is to add an extra pointer to the "controller" datatype, which points to the end of the list.
To distinguish queues from stacks we also rename the variables:
so the first element in the list is called the *front* (instead of "top"),
and the last element is called the *back* (instead of "bottom" or "end").
@Fig:linked-queue-and-enqueue shows how a queue can look like.

    datatype LinkedQueue:
        front = null   // Pointer to the front node
        back = null    // Pointer to the back node
        size = 0       // Size of the queue


![
    Visual representation of a linked queue, as well as *enqueueing* an element.
    The grey link is removed, and dashed ones are added by the *enqueue* operation.
](images/6.2-linked-queue-and-enqueue.svg){#fig:linked-queue-and-enqueue}


#### Dequeueing

Removing the `front` element from a linked queue works the same as popping from a stack,
but we have to remember to update the `back` pointer when necessary.
That is, if the queue becomes empty after we remove the `front` node,
we have to remember to also delete the back pointer,
otherwise it will point to a non-existing element.

    function dequeue(queue):
        queue.front = queue.front.next
        if queue.front is null:
            queue.back = null
        queue.size -= 1


::: dsvis
Here we show how to dequeue an element from a linked queue.

``` {.jsav-animation src="ChalmersGU/LinkedQueue-Dequeue-CON.js" links="ChalmersGU/CGU-Styles.css" name="Linked Queue Dequeue"}
```
:::

::: dsvis
Here is a proficiency exercise about dequeuing from linked queues.

```{.jsav-embedded src="ChalmersGU/LinkedQueue-Dequeue-PRO.html" type="ka" name="Linked Queue Dequeue Exercise"}
```
:::

#### Enqueueing

In a queue we want to add new nodes to the `back` instead of in the front.
The important thing to remember is that the "old" back has to be updated too.
So we first have to point the current back to the new node,
and then we can reassign the back to the new node.

    function enqueue(queue, value):
        newBack = new Node(value, null)
        if queue.front is null:
            queue.front = newBack
        else:
            queue.back.next = newBack
        queue.back = newBack
        queue.size += 1

Note that we have to treat the empty queue separately:
we cannot reassign `back.next` (because there is no back yet),
but instead we have to update both `front` and `back` to point at the new node.
The rightmost part of @fig:linked-queue-and-enqueue shows how enqueueing works.

::: dsvis
Here we show how to enqueue an element to a linked queue.

``` {.jsav-animation src="ChalmersGU/LinkedQueue-Enqueue-CON.js" links="ChalmersGU/CGU-Styles.css" name="Linked Queue Enqueue"}
```
:::

::: dsvis
Here is a proficiency exercise about enqueuing to linked queues.

```{.jsav-embedded src="ChalmersGU/LinkedQueue-Enqueue-PRO.html" type="ka" name="Linked Queue Enqueue Exercise"}
```
:::
