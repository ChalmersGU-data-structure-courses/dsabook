
## Linked lists

::: TODO
- Prio 1: invariants
:::

A linked list is a kind of "distributed" data structure,
in the sense that the main list object does not have full information of everything.
The only thing that the list knows about is the *first* element,
and instead each element knows which is the next element.

So it is like a line of people facing backwards:
the only thing a single person knows is who is standing behind them.
A person can never know where in the line they stand, and when it is their turn.
And the main "controller" of the list can only see the first person in the line.

A linked list uses [dynamic memory allocation]{.term}, that is,
it allocates memory for new list elements as needed.
The following diagram illustrates the linked list concept.
There are three [nodes]{.term} that are "linked" together.
Each node contains a link to the next node in the list.
Notice that the rightmost node does not have any outgoing link.

```jsav-figure
var av = NewAV();
var l = av.ds.list({nodegap: 30});
l.addFirst("").addFirst("").addFirst("");
l.layout();
av.displayInit();
av.recorded();
```

With this organisation there is no easy way of knowing the total number of nodes,
which means that the list has to store its size in a separate variable.

### Linked list nodes

Because a list node is a distinct object (as opposed to simply a cell in an array),
it is good practice to make a separate data type for list nodes.
Each list node is a "wrapper" around an element,
which means that it contains a reference to its underlying *value*.
In addition it has a pointer to the *next* node in the list.
Here is how we can declare a list node as pseudocode:

    datatype Node of T:
        value: T          // Value for this node
        next: Node of T   // Pointer to the next node in the list

How does the list end?
Most languages have a designated "null" value which represent nothing at all
-- in Java it is called `null`, and in Python it is `None`.
So we will use that: if *next* is "null" then we have reached the end of the list.

A list built from these very simple nodes is called a [singly linked list]{.term},
because each list node has a single pointer to the next node on the list.
In this section we describe how to use linked lists to implement stacks and queues,
and in @sec:double-ended-queues and @sec:general-lists we will discuss extensions
such as double-ended queues and general lists.


### Stacks as linked lists

Implementing a stack as a linked list is quite simple.
Elements are inserted and removed only from the head of the list,
so the only information we need is a pointer to the *top* of the stack.

    datatype LinkedStack implements Stack:
        top: Node = null    // Pointer to the top of the stack
        size: Int = 0       // Size of the stack

Note that we also added a variable *size* storing the number of elements.
This is in theory unnecessary, but without it the only way of knowing the size
would be to iterate through the whole stack which takes time.

Here is a visual representation for a linked stack.

```jsav-figure
var AV = NewAV();
var l = AV.ds.list({nodegap: 30, top: 40, left: 250});
l.addFirst(15).addFirst(12).addFirst(8).addFirst(23).addFirst(20);
l.layout();
AV.pointer("top", l.get(0));
AV.displayInit();
AV.recorded();
```

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

    datatype LinkedStack:
        ...
        push(value):
            this.top = new Node(value, this.top)
            this.size = this.size + 1

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

    datatype LinkedStack:
        ...
        pop():
            removed = this.top
            this.top = removed.next
            this.size = this.size - 1
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


### Queues as linked lists

Implementing a queue is a little more tricky.
It is still easy to remove elements -- we can simply reuse the pop operation.
But now we do not want to add elements to the front, but instead at the very end.
The only way to do that in a linked stack is to traverse all nodes until we find the end,
and this is of course very slow if we have 1000s of elements.

The solution is to add an extra pointer to the "controller", which points to the back of the list.
When it comes to queues we also use a different terminology than for stacks
-- so the first element is called the *front* (instead of "top"),
and the last element is called the *rear* (instead of "bottom").

::: latex
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
:::

::: dsvis
Linked queue -- introduction.

``` {.jsav-animation src="ChalmersGU/LinkedQueue-Intro-CON.js" links="ChalmersGU/CGU-Styles.css" name="Linked Queue Intro"}
```
:::

    datatype LinkedQueue implements Queue:
        front: Node = null   // Pointer to the front node
        rear: Node = null    // Pointer to the rear node
        size: Int = 0        // Size of the queue


#### Enqueueing and dequeueing

Dequeueing an element from a linked queue is the same as popping from a stack,
but we have to remember to update the *rear* pointer when necessary.
That is, if the queue becomes empty after we remove the *front* node,
we have to remember to also delete the rear pointer,
otherwise it will point to a non-existing element.

    datatype LinkedQueue:
        ...
        dequeue():
            removed = this.front
            this.front = removed.next
            this.size = this.size - 1
            if this.size == 0:
                this.rear = null
            return removed.value


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
and then we can rassign the rear to the new node.

    datatype LinkedQueue:
        ...
        enqueue(value):
            newRear = new Node(value, null)
            if this.size == 0:
                this.front = newRear
            else:
                this.rear.next = newRear
            this.rear = newRear
            this.size = this.size + 1

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

### Complexity analysis of linked lists

What is the time complexity of adding to and removing from a stack or a queue?
The analysis is trivial for all operations:
both *push*, *pop*, *enqueue* and *dequeue* consist of only constant time operations,
and there is no looping or similar involved, so all of them must be constant, $O(1)$.


### Queues as pairs of stacks

One special property of stacks is that
if we push a sequence of elements and then pop them all, we get them in *reversed* order.
And of course, if we do the same again, we get the original order back.
This insight can be used for a another possible implementation of queues,
which uses use two stacks -- one "enqueue" stack and another "dequeue" stack.

- To enqueue an element we push it to the *enqueue stack*.
- To dequeue an element we pop it from the *dequeue stack*.
- If the dequeue stack is empty, we pop all elements from the *enqueue stack*, and push them one by one to the *dequeue stack*.

This strategy works, because we will be popping from the *enqueue stack* in reverse order,
and therefore we will in the end pop from the *dequeue stack* in the original order.
Which is exactly how a queue should behave.

However, once in a while, dequeueing will be slow because we have to move all elements from one stack to the other.
But it is possible to show that dequeueing still has *amortised* constant time complexity.
Amortisation will be explained more in @sec:amortised-analysis, so for now you will just have to take our word for it.


### Case study: Sorting a linked list using Mergesort {#mergesort-linked-list}

We introduced Mergesort in @sec:mergesort, and then we showed how to sort an array.
But Mergesort can also be used to sort linked lists, because it does not require random access to the list elements.
Thus, Mergesort is the method of choice when the input is in the form of a linked list.

:::::: latex
\booklink{Read the rest online}{6.4}{sec:mergesort-linked-list}
::::::

:::::: online
In fact, the only thing we need is to access the front and back of the linked list,
which means that we can use Mergesort on linked queues.
So, how do we implement splitting and merging?

Splitting the input list into two equal halves presents some difficulty.
Since we use a linked list we cannot find the middle easily.
But we can use a little trick instead: assign elements of the input list alternating between the two sublists.
The first element is assigned to the first sublist, the second element to the second sublist,
the third to first sublist, the fourth to the second sublist, and so on.
In pseudocode we can view it like this:

    function split(L):
        L1, L2 = new empty linked queues
        for each x in L:
            enqueue x to L1 (even iterations), or to L2 (odd iterations)
        return L1, L2

Merging two sorted linked lists is straightforward,
because we need only remove items from the front of the input lists and append them to the end of the output list.
The Mergesort pseudocode in @sec:mergesort can be used with linked lists directly.

    function merge(L1, L2):
        answer = new empty linked queue
        while L1 and L2 are nonempty:
            if L1.peek() <= L2.peek():
                enqueue L1.dequeue() to answer
            else:
                enqueue L2.dequeue() to answer
        enqueue all remaining elements of L1 and L2
        return L

::::::
