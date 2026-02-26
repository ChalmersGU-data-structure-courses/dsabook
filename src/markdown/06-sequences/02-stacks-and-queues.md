
## Stacks and queues

::: TODO
- Prio 1: invariants
- Prio 1: use cases for queues
- Prio 2: make the case study more compact
:::

<!-- START NOTES -->

Stacks and queues are our first *abstract data types* (ADTs). Each of them has an interface that says how to use them, but it doesn’t say how they are implemented. And both of them can be implemented in different ways, using different *data structures*.

Both stacks and queues are collections of objects, where you can add elements and remove them one by one. The difference between them is in which order the elements are removed. So, when are stacks and queues used? Most of us can easily find situations where a queue is appropriate, and it feels more “democratic” to attend to issues in the order they arrive, than the opposite. But in fact stacks are much more common in programming. The main reason for this is that stacks are fundamental if we want to implement recursion and function calls.

Whenever a function calls another function, the system must remember the current local state: what it should continue with after the call is done, what are the values of the local variables, etc. Therefore it creates an object with all this information, and pushes it to the *call stack*. Now, if the new function calls yet another function, that local state is pushed to the call stack. When this third function ends, the system can pop the previous local state from the call stack and continue processing the second function. And when this function ends, the call stack is popped once again so that it can continue where the first function was paused.

#### Stacks and queues as abstract data types (ADT)

A stack or a queue needs to have the following operations, as the absolut minimum:

- add(x): adds the element x to the stack/queue
- remove(): removes an element, and returns it
- isEmpty(): tells us if there are any elements to remove

But there can also be some additional convenience operations, and a very common is:

- size(): returns the number of elements in the stack/queue

The methods above corresponds to the *interface* of the ADT. But note that just listing the methods is not enough to specify an ADT: for example, stacks and queues both have the same interface – but they are definitely not the same! We also have to specify the semantics of the operations. For example, the remove() operation can be like this:

- Stack: removes the element that was most recently added
- Queue: removes the element that has been waiting the longest

Note also that the operations don’t have to be called add or remove, they can have different names, but still be the same operation. Here are some common names:

|              | Stack             | Queue
|:-------------|:------------------|:--------------------------
| **Adding**   | push(x), insert(x), add(x), addFirst(x) | enqueue(x), offer(x), insert(x), add(x), addLast(x), append(x) |
| **Removing** | pop(), delete(), deleteFirst(), remove(), removeFirst() | dequeue(), poll(), delete(), deleteFirst(), remove(), removeFirst() |

Don’t be fooled by different names! The important thing is their semantics, and a queue is a queue regardless if the method is called dequeue(), poll() or remove().

So, how do we implement stacks and queues? The interesting thing with these two ADTs is that there are several possible data structures that can implement them!

#### Stacks as (dynamic) arrays

Last time we talked about dynamic arrays, and showed that appending to the end is very efficient (but inserting at the beginning is slow). Can we make use of that to implement a stack? Yes, we just have to think of the array as reversed:

- The *last* element in the array is the top element of the stack.

Now push() is exactly the same as append(). If we want we can use different names for the internal variables, but the code is exactly the same as for a dynamic array.

How about popping()? It’s just opposite of pushing, where we decrease the size of the internal array. Note that it is good habit to delete the popped element from the array (that is, assigning that array cell to null), so that the garbage collector can remove it when it’s no longer used.

#### Decreasing the size of a dynamic array

But what about the size of the internal array when we pop? Assume that we have pushed 1 million elements to the stack, and then popped them all – then our internal array will still occupy (at least) 1 million cells in memory. Is it possible to decrease the size of the internal array when popping?

Yes, it is, but then it is very important that we don’t resize it too soon. Let’s say that we double the size when pushing – then we cannot halve the size when it is half full. Instead we have to wait until the array is *less than half full*, for example 1/3 full.

#### Queues as circular (dynamic) arrays

A dynamic array is perfectly suited for implementing a stack, but can we also use it to implement a queue? Enqueueing is as easy-peasy as pushing to a stack – just append to the dynamic array. But how do we remove elements from the front – without having to shift all elements?

We let the front of the queue change dynamically too! By this I mean that we keep two pointers – one to the *front* and another to the *back*. Whenever we want to enqueue something we increase the *back* pointer, and when we want to dequeue we increase the *front* pointer.

When the back pointer reaches the end of the array, we *don’t have to resize* it! If the *front* pointer points somewhere in the middle of the array there is plenty of space at the beginning – so we can “wrap around” the *back* pointer and let it start from the beginning. And when *front* reaches the end of the array, we let it wrap around too.

Here is how a circular array queue can look like:

![](images/CircularQueue1.png)

This queue consists of 7 elements, where T was the element most recently added and A is the one that has waited the longest. When we want to enqueue a new element, it will be assigned to the empty cell at index 3.

Now, let’s say we add five more elements to this queue, then we get this situation:

![](images/CircularQueue2.png)

What happens if we want to enqueue yet another element? We have to resize the array, and we do this like before by doubling the size (or multiplying with 1.5 or some other factor). But now we have to be a little careful when copying over the elements to the new array – we cannot just copy the elements to the same positions, because then we would end up in this situation:

![](images/CircularQueue3.png)

Instead we have to copy the elements, starting from front and going to the back, after which we have to reassign front and back to their new positions. This will lead to the following resized array:

![](images/CircularQueue4.png)

Now finally we can enqueue our new element in cell 12, after Ö.


#### Alternative approaches (optional)

There are several ways to copy the elements.  Here are two other possibilities that both are correct:

![](images/CircularQueue5.png)

![](images/CircularQueue6.png)

#### Stacks as linked lists

One very nice thing with stacks and queues is that we can use a completely different implementation – there are different data structures that implement each ADT.

A linked list is a kind of “distributed” data structure, in the sense that the main stack object does not have full information of everything. The only thing that the stack knows about is the *top* element – which is the next element to remove from the stack. Instead each element knows something else – what is the next element.

So it’s like a line of people facing backwards: the only thing a single person knows is who is standing behind them. A person can never know where in the line they stand, and when it’s their turn. And the main stack “controller” can only see the first person in the line. It can remove (pop) the first person, which will reveal the next one, or it can add (push) a new person before the first.

With this organisation there is no easy way of knowing the size of the stack, so if that is important we have to store the size in an auxiliary variable. So, how can we define a stack in a normal programming language? We need two kinds of objects – one for the stack itself (the “controller”), and one for the individual elements (the “persons”).

```
class Stack of Value:        class Node of Value:
    top: Node of Value           value: Value
    size: Int                    next: Node of Value
```

Note that the class Node is a kind of “wrapper” around the actual value. We need to do this because the value itself doesn’t have a way of “seeing” the next value.

How does the stack end? Most languages have a designated “null” value which represent nothing at all – in Java it is called null, and in Python it is None. So we will use that. And this is also what we use for the empty stack: then *top* will be null. Here is a picture of how a linked list stack looks like:

![](images/LinkedStack.png)

Note that I deliberately have put the different boxes in random places, because that’s how they will be scattered in the computer’s memory. You can never know where an object will be stored in memory.

Ok, so how do we implement the stack operations on this linked list? It’s not that difficult, we just have to assign pointers in the right order:

- push(x): First create a new wrapper *Node* object with *value* x, and point its *next* to the current *head*. Then reassign *head* to the new node.
- pop(): Remember the *value* of the current *head* node. Then reassign *head* to be the *next* of the head node. Finally return the value you remembered.

What will happen with the old head Node object? When there is nothing that points to that object anymore, it can be removed by the garbage collector. (This of course assumes that there is nothing else that points to the node, but if we implement the stack correctly, there shouldn’t be.)

What is the complexity of the stack operations? That’s quite simple: both push and pop consists of only constant time operations, and there is no looping or similar involved, so both of them must be constant, $O(1)$.

#### Queues as linked lists

Implementing a queue is a little more tricky. It is still easy to remove elements – we can reuse the pop operation from stacks. But now we don’t want to add elements to the front, but instead at the very end. The only way to do that with the linked list from above is to traverse the whole linked list. And this is of course linear in the number of elements. That won’t do.

The solution is that the controller has two pointers, one for the front and another that points to the last node:

```
class Stack of Value:
    front: Node of Value
    back: Node of Value
    size: Int
```

Dequeueing will still be like popping, but we have to remember to update *back* when necessary. That is, if the queue becomes empty after we remove the *front* node, we have to remember to also set *back* to null.

But how about enqueueing? Now we want to add the new node to the back instead. The important thing to remember is that the “old” back has to be updated too – so we first have to assign *back.next* to the new back node, and then we can reassign *back* to the new back node. Note that we have to treat the empty queue specially: there is no *back.next*, so we cannot assign that, but instead we have to update both *back* and *front* to the new node.

The complexity is still constant – the operations are slightly more complex that for stacks, but only by a constant.

#### Queues as pairs of stacks (optional)

One special property of stacks is that if we push a sequence of elements and then pop them all, we get them in *reversed* order. And of course, if we do the same again, we get our original order back. This insight can be used for a third possible implementation of queues, which uses use two stacks – one “enqueue” stack and another “dequeue” stack.

- To enqueue an element we push it to the *enqueue stack*.
- To dequeue an element we pop it from the *dequeue stack*.
- If the dequeue stack is empty, we pop all elements from the *enqueue stack*, and push them one by one to the *dequeue stack*.

This strategy works, because we will be popping from the *enqueue stack* in reverse order, and therefore we will in the end pop from the *dequeue stack* in the original order. Which is exactly how a queue should behave.

However, once in a while, dequeueing will be slow because we have to move all elements from one stack to the other. But it is possible to show that dequeueing still has *amortised* constant time complexity. This is explained on Wikipedia:

- https://en.wikipedia.org/wiki/Amortized_analysis#Queue

This kind of queue matches very well with the functional programming paradigm, so it is the method of choice in for example Haskell.

#### Double-ended queues (deques)

A double-ended queue is both a stack and a queue at the same time. We can add and remove elements both from the front and the back (but not in the middle):

- addFirst(x) and addLast(x)
- removeFirst() and removeLast()

One easy way to implement a deque is to use a circular dynamic array, just as the one we used for queues. I leave it as an exercise for you to figuring out the implementations of the four methods.

However, it is not as easy to implement a deque using a linked list. The solution is to use a *double-linked list*, where each node points both forward and backward:

![](images/LinkedDeque.png)

Now, to add or remove an element, we have to make sure we assign both the *next* and *prev* pointers, for the neighbouring nodes. This can be a little tricky, but in the end it’s not very complicated.

#### General lists

Stacks and queues (and deques) are special cases of a more general abstract data type, the list. In a general list you can access any element by its position in the list, you can replace elements, and you can insert and remove elements. Python lists are one example, and the ArrayList in Java is another.

One interesting thing with lists is that it is impossible (or at least ver difficult) to make them efficient for all possible operations – both accessing any position, and inserting and removing at any position. You can make them efficient for one kind of operation (for example, accessing by position), but then other operations will be slower (for example, inserting in the middle).

The most common implementation of a general list is a dynamic array, and that is how both Python lists and Java ArrayLists do it. For both of them it is inefficient to insert and remove elements at the beginning.

<!-- END NOTES -->

-------

The [stack]{.term} is a list-like structure in
which elements may be inserted or removed from only one end.
This is an extremely simplistic ADT, but it is nevertheless used in many many algorithms.
The restrictions make stacks very inflexible, but they also make stacks both efficient (for those operations they can do) and easy to implement.
Many applications require only the limited form of insert and remove
operations that stacks provide. In such cases, it is more efficient to
use the simpler stack data structure rather than a generic list.

Despite their restrictions, stacks have many uses. Thus, a special
vocabulary for stacks has developed. Accountants used stacks long before
the invention of the computer. They called the stack a
"[LIFO]{.term}" list, which stands for
"Last-In, First-Out." Note that one implication of the LIFO policy is
that stacks remove elements in reverse order of their arrival.

Like the stack, the [queue]{.term} is a
list-like structure that provides restricted access to its elements.
Queue elements may only be inserted at the back (called an
[enqueue]{.term} operation) and removed from the
front (called a [dequeue]{.term} operation).
Queues operate like standing in line at a movie theater ticket counter.
If nobody cheats, then newcomers go to the back of the line. The person
at the front of the line is the next to be served. Thus, queues release
their elements in order of arrival. In Britain, a line of people is
called a "queue", and getting into line to wait for service is called
"queuing up". Accountants have used queues since long before the
existence of computers. They call a queue a "[FIFO]{.term}" list, which stands
for "First-In, First-Out".

#### ADT for stacks

The accessible element of the stack is called the *top* element.
Elements are not said to be inserted, they are
[pushed](#push){.term} onto the stack. When
removed, an element is said to be [popped](#pop){.term} from the stack.
Here is our [ADT]{.term} for stacks:

    interface Stack of T extends Collection:
        push(x: T)     // Pushes x on top of the stack.
        pop() -> T     // Pops the top of the stack and returns it.
        peek() -> T    // Returns the top element, without removing it.

There are two main approaches to implementing stacks: the [linked stack]{.term} and the [array-based stack]{.term}.
They will be discussed in
[@sec:stacks-implemented-as-linked-lists;@sec:stacks-implemented-using-arrays] and [-@sec:dynamic-arrays].

<!--
#### Invariants
 -->

#### ADT for queues

The accessible element of the queue is called the *front* element.
Inserting is called [enqueue]{.term} and removing [dequeue]{.term}.
Here is our [ADT]{.term} for queues:

    interface Queue of T extends Collection:
        enqueue(x: T)    // Enqueues x at the end of the queue.
        dequeue() -> T   // Dequeues the frontmost element.
        peek() -> T      // Returns the frontmost element, without removing it.

There are two main queue implementations: the [linked queue]{.term} and the [array-based queue]{.term}.
They are discussed in [@sec:queues-implemented-as-linked-lists;@sec:queues-implemented-using-arrays] and [-@sec:dynamic-arrays].

<!--
#### Invariants
 -->


### Case study: Implementing recursion {#implementing-recursion}

:::::: online
::: alert
WARNING! You should not read this section unless you are already
comfortable with implementing
[recursive functions](#recursion){.term}.
One of the biggest hang-ups for students learning recursion
is too much focus on the recursive "process". The right way to think
about recursion is to just think about the return value that the
recursive call gives back. Thinking about *how* that answer is computed
just gets in the way of understanding. There are good reasons to
understand how recursion is implemented, but helping you to write
recursive functions is not one of them.
:::
::::::

Perhaps the most common computer application that uses
[stacks] is not even
visible to its users. This is the implementation of subroutine calls in
most programming language
[runtime environments](#runtime-environment){.term}. A subroutine call is normally implemented by
[pushing](#push){.term} necessary information
about the subroutine (including the return address, parameters, and
local variables) onto a stack. This information is called an
[activation record]{.term}. Further subroutine
calls add to the stack. Each return from a subroutine
[pops]{.term} the top activation record
off the stack.

:::::: latex
\booklink{Read the rest online}{6.2}{sec:implementing-recursion}
::::::


:::::: online
As an example, here is a recursive implementation for the
factorial function.

    // Recursively compute and return n-factoral (n!)
    function factorialRecursive(n):
        if n <= 1:
            // Base case: return base solution
            return 1
        else:
            // Recursive call for n > 1
            return n * factorialRecursive(n-1)

Here is an illustration for how the internal processing works.

![Implementing recursion with a stack](images/RecurSta.png)

$\beta$ values indicate the address of the program instruction to return
to after completing the current function call. On each recursive
function call to `fact`, both the return address and the current value
of `n` must be saved. Each return from `fact` pops the top activation
record off the stack.

Consider what happens when we call `fact` with the value 4. We use
$\beta$ to indicate the address of the program instruction where the
call to `fact` is made. Thus, the stack must first store the address
$\beta$, and the value 4 is passed to `fact`. Next, a recursive call to
`fact` is made, this time with value 3. We will name the program address
from which the call is made $\beta_1$. The address $\beta_1$, along with
the current value for $n$ (which is 4), is saved on the stack. Function
`fact` is invoked with input parameter 3.

In similar manner, another recursive call is made with input parameter
2, requiring that the address from which the call is made (say
$\beta_2$) and the current value for $n$ (which is 3) are stored on the
stack. A final recursive call with input parameter 1 is made, requiring
that the stack store the calling address (say $\beta_3$) and current
value (which is 2).

At this point, we have reached the base case for `fact`, and so the
recursion begins to unwind. Each return from `fact` involves popping the
stored value for $n$ from the stack, along with the return address from
the function call. The return value for `fact` is multiplied by the
restored value for $n$, and the result is returned.

Because an activation record must be created and placed onto the stack
for each subroutine call, making subroutine calls is a relatively
expensive operation. While recursion is often used to make
implementation easy and clear, sometimes you might want to eliminate the
overhead imposed by the recursive function calls. In some cases, such as
the factorial function above, recursion can easily be replaced by
iteration.

:::: example
#### Example: Factorial function

As a simple example of replacing recursion with a stack, consider the
following non-recursive version of the factorial function.

    function factorialStack(n):
        S = new Stack()
        while n > 1:
            S.push(n)
            n = n - 1
        result = 1
        while S.size > 0:
            result = result * S.pop()
        return result

Here, we simply push successively smaller values of $n$ onto the stack
until the base case is reached, then repeatedly pop off the stored
values and multiply them into the result.
::::

An iterative form of the factorial function is both simpler and faster
than the version shown in the example. But it is not always possible to
replace recursion with iteration. Recursion, or some imitation of it, is
necessary when implementing algorithms that require multiple branching
such as in the Towers of Hanoi algorithm, or when
traversing a binary tree (@sec:traversing-a-binary-tree).
The [Mergesort] and [Quicksort]
sorting algorithms also require recursion.

Fortunately, it is always possible to imitate recursion with a stack.
Recursive algorithms lend themselves to efficient implementation with a
stack when the amount of information needed to describe a sub-problem is
small. For example, [Quicksort] can
effectively use a stack to replace its recursion since only bounds
information for the subarray to be processed needs to be saved.

Let us now turn to a non-recursive version of the Towers of Hanoi
function, which cannot be done iteratively.

#### Use case: Towers of Hanoi

Here is a recursive implementation for Towers of Hanoi.

    // Compute the moves to solve a Tower of Hanoi puzzle.
    // Function 'move' does (or prints) the actual move of a disk from one pole to another.
    function towersRecursive(n, start, goal, temp):
        if n == 0:                               // Base case
            return
        towersRecursive(n-1, start, temp, goal)  // Recursive call: n-1 rings
        move(start, goal)                        // Move bottom disk to goal
        towersRecursive(n-1, temp, goal, start)  // Recursive call: n-1 rings

`towersRecursive` makes two recursive calls: one to move $n-1$ rings off the bottom
ring, and another to move these $n-1$ rings back to the goal pole. We
can eliminate the recursion by using a stack to store a representation
of the three operations that `towersRecursive` must perform: two recursive calls and
a move operation. To do so, we must first come up with a representation
of the various operations, implemented as a data type whose objects will be
stored on the stack.

    datatype Task:
        oper: MOVE or TOH
        n: Int
        start, temp, goal: Pole

    function towersStack(n, start, goal, temp):
        S = new LinkedStack()
        S.push(new Task(TOH, n, start, goal, temp))
        while S.size > 0:
            it = S.pop()          // Get next task
            if it.oper == MOVE:   // Do a move
                move(it.start, it.goal)
            else if it.num > 0:   // Imitate TOH recursive solution (in reverse)
                S.push(new Task(TOH, it.num-1, it.temp, it.goal, it.start))
                S.push(new Task(MOVE, 0, it.start, it.goal))
                S.push(new Task(TOH, it.num-1, it.start, it.temp, it.goal))

We first enumerate the possible operations MOVE and TOH, to indicate
calls to the `move` function and recursive calls to `towersStack`, respectively.
The datatype `Task` stores five values: an operation value (indicating
either a MOVE or a new TOH operation), the number of rings, and the
three poles. Note that the move operation actually needs only to store
information about two poles. Thus, there are two constructors: one to
store the state when imitating a recursive call, and one to store the
state for a move operation.

An array-based stack is used because we know that the stack will need to
store exactly $2n+1$ elements. The new version `towersStack` begins by
placing on the stack a description of the initial problem for $n$ rings.
The rest of the function is simply a `while` loop that pops the stack
and executes the appropriate operation. In the case of a `TOH` operation
(for $n>0$), we store on the stack representations for the three
operations executed by the recursive version. However, these operations
must be placed on the stack in reverse order, so that they will be
popped off in the correct order.

::::::

<!--
### Use cases for queues
 -->
