
## Linked lists {#sequences:linked-lists}

::: TODO
- Prio 1: invariants
- Prio 1: update figures
:::

A linked list is a kind of "distributed" data structure,
in the sense that the main list object does not have full information of everything.
The only thing that the list knows about is the *first* element,
and instead each element knows which is the next element.

So it is like a line of people facing backwards:
the only thing a single person knows is who is standing behind them.
A person can never know where in the line they stand, and when it is their turn.
And the main "controller" of the list can only see the first person in the line.
This means that there is no easy way of knowing the total number of people,
if the controller needs that information it has to keep track of the size itself.

The following figure shows a linked list with three values $a$, $b$ and $c$,
where each value is encaspulated in a *list node*.
Each node contains a link to the next node in the list.
Notice that the rightmost node does not have any outgoing link.

::: online
```jsav-figure
var av = NewAV();
var l = av.ds.list({nodegap: 30});
l.addFirst("a").addFirst("b").addFirst("c");
l.layout();
av.displayInit();
av.recorded();
```
:::

::: latex
```
            [ a |-]--> [  b |-]--> [ c |X]
```
:::

List nodes are distinct objects, as opposed to cells in an array.
Therefore we declare a list node as a "wrapper" around a *value*,
that also contains a pointer to the *next* node in the list:

    datatype Node:
        next = null  // Pointer to the next node in the list
        value        // Value for this node

How does the list end?
Most languages have a designated "null" value which represents nothing at all
-- in Java it is called `null`, and in Python it is `None`.
So we will use that: if *next* is "null" then we have reached the end of the list.
This is denoted by crossing out the next pointer in final node in the figure above.

A list built from these very simple nodes is called a [singly linked list]{.term},
because each list node has a single pointer to the next node on the list.
There are also *doubly linked lists*, where each node also has a pointer to the previous node,
but we will not discuss them in this section.
Singly linked lists are all we need to implement stacks and queues.


### Stacks as linked lists {#sequences:linked-stacks}

Implementing a stack as a linked list is quite simple.
Elements are inserted and removed only from the head of the list,
so the only information we need is a pointer to the *top* of the stack.

    datatype LinkedStack implements Stack:
        top = null   // Pointer to the top node of the stack
        size = 0     // Size of the stack

Note that we also added a variable *size* storing the number of elements.
This is in theory unnecessary, but without it the only way of knowing the size
would be to iterate through the whole stack which takes time.

Here is a visual representation for a linked stack.

::: online
```jsav-figure
var AV = NewAV();
var l = AV.ds.list({nodegap: 30, top: 40, left: 250});
l.addFirst(15).addFirst(12).addFirst(8).addFirst(23).addFirst(20);
l.layout();
AV.pointer("top", l.get(0));
AV.displayInit();
AV.recorded();
```
:::

::: latex
```
     top
      ↓
    [ 20 |-]--> [ 23 |-]--> [ 8 |-]--> [ 12 |-]--> [ 15 |X]
```
:::

#### Pushing and popping

Now, so how do we implement the stack operations on this linked list?
This is quite straightforward:
to *push* something we have to create a new wrapper node and put it at the top,
and to *pop* we delete the current topmost wrapper node.

-   To *push* a value, we first create a new *Node* object wrapping the value.
    Then we can point the node to the current *top* node,
    and after that we reassign the stack *top* to the new node.
-   To *pop* from the stack, we first have to remember the wrapped value of the current *top* node.
    Then we can reassign *top* to be the node that the top node points to.
    Finally we can return the value we remembered.

The only think we have to be careful with is the order in which we do things.
For example, when popping we cannot start by reassigning the stack top,
because then we cannot know the value to return.

#### Implementing push and pop

Turning *push* into pseudocode is straightforward,
and we can even do all the actions in one single line of code.
We also have to increase the size of the stack separately,
because there is no way of doing that automatically.

    push(stack, value):
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

Popping is also straightforward from the description above, as long as we remember to decrease the size of the size.

    pop(stack):
        removed = stack.top
        stack.top = removed.next
        stack.size -= 1
        return removed.value

After popping, what will happen with the old top node -- will we not have to delete it from memory?
If we use a language that has automatic garbage collection (which most high-level languages do),
then it will realise that there is nothing that points to the old top anymore,
and so the garbage collector will automatically remove the old top.
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

Implementing a queue is a little more tricky.
It is still easy to remove elements -- we can simply reuse the pop operation.
But now we do not want to add elements to the front, but instead at the very end.
The only way to do that in a linked stack is to traverse all nodes until we find the end,
and this is of course very slow if we have very many elements.

The solution is to add an extra pointer to the "controller", which points to the back of the list.
When it comes to queues we also use a different terminology than for stacks
-- so the first element is called the *front* (instead of "top"),
and the last element is called the *rear* (instead of "bottom").

::: latex
```
    front                               rear
      ↓                                  ↓
    [ 42 |-]--> [ 5 |-]--> [ 10 |-]--> [ 25 |X]
```
<!--
```jsav-figure
var AV = NewAV();
var l = AV.ds.list({nodegap: 30, top: 40, left: 250});
l.addFirst(25).addFirst(10).addFirst(5).addFirst(40);
l.layout();
AV.pointer("front", l.get(0), {left:-15});
AV.pointer("rear", l.get(3), {anchor:"right top", myAnchor:"left bottom", left:-15});
AV.displayInit();
AV.recorded();
```
-->
:::

::: dsvis
Linked queue -- introduction.

``` {.jsav-animation src="ChalmersGU/LinkedQueue-Intro-CON.js" links="ChalmersGU/CGU-Styles.css" name="Linked Queue Intro"}
```
:::

    datatype LinkedQueue implements Queue:
        front = null   // Pointer to the front node
        rear = null    // Pointer to the rear node
        size = 0       // Size of the queue


#### Enqueueing and dequeueing

Dequeueing an element from a linked queue is the same as popping from a stack,
but we have to remember to update the *rear* pointer when necessary.
That is, if the queue becomes empty after we remove the *front* node,
we have to remember to also delete the rear pointer,
otherwise it will point to a non-existing element.

    dequeue(queue):
        removed = queue.front
        queue.front = removed.next
        if queue.front is null:
            queue.rear = null
        queue.size -= 1
        return removed.value

<!-- TODO AG: this only works for a non-empty queue, either mention or update code -->

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

But how about enqueueing?
Now we want to add the new node to the rear instead of in the front.
The important thing to remember is that the "old" rear has to be updated too.
So we first have to point the current rear to the new node,
and then we can reassign the rear to the new node.

    enqueue(queue, value):
        newRear = new Node(value, null)
        if queue.front is null:
            queue.front = newRear
        else:
            queue.rear.next = newRear
        queue.rear = newRear
        queue.size += 1

Note that we have to treat the empty queue specially:
we cannot reassign the current rear (because there is no currect rear yet),
but instead we have to update both the *front* and the *rear* to the new node.

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

