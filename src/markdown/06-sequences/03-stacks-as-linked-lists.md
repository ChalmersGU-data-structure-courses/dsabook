
## Linked lists

::: TODO
- Prio 1: invariants
- Prio 1: explanations of the pseudocode, not just the code (also file 04b)
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

