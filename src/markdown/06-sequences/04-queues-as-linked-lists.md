
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
