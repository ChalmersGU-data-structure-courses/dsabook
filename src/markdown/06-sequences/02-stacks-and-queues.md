
## Stacks and queues

::: TODO
- Prio 1: invariants
- Prio 1: use cases for queues
- Prio 2: make the case study more compact
:::

Stacks and queues are our first *abstract data types* (ADTs).
Each of them has an interface that says how to use them, but it doesn't say how they are implemented.
And both of them can be implemented in different ways, using different *data structures*.

Both stacks and queues are collections of objects, where you can add elements and remove them one by one.
The difference between them is in which order the elements are removed.
So, when are stacks and queues used?
Most of us can easily find situations where a queue is appropriate,
and it feels more "democratic" to attend to issues in the order they arrive, than the opposite.
But in fact stacks are much more common in programming.
The main reason for this is that stacks are fundamental if we want to implement recursion and function calls
-- but stacks are also slightly more efficient, so they are a better choice if the inherent order is not important.

Whenever a function calls another function, the system must remember the current local state:
what it should continue with after the call is done, what are the values of the local variables, etc.
Therefore it creates an object with all this information, and pushes it to the *call stack*.
Now, if the new function calls yet another function, that local state is pushed to the call stack.
When this third function ends, the system can pop the previous local state from the call stack
and continue processing the second function.
And when this function ends, the call stack is popped once again so that
it can continue where the first function was paused.


### Stacks and queues as abstract data types

A stack or a queue needs to have the following operations, as the absolut minimum:

- `add(x)`: adds the element x to the stack/queue
- `remove()`: removes an element, and returns it
- `isEmpty()`: tells us if there are any elements to remove

But there can also be some additional convenience operations, and a very common is:

- `size()`: returns the number of elements in the stack/queue

The methods above corresponds to the *interface* of the abstract data type (ADT).
But note that just listing the methods is not enough to specify an ADT:
for example, stacks and queues both have the same interface
-- but they are definitely not the same!
We also have to specify the semantics of the operations.
For example, the `remove()` operation can be like this:

- *Stack*: removes the element that was most recently added
- *Queue*: removes the element that has been waiting the longest

Also note that the name of the operation do not really matter,
they can have completely arbitrary names, but still be the same operation.
Here are some common names:

|              | Stack             | Queue
|:-------------|:------------------|:--------------------------
| **Adding**   | push, insert, add, addFirst | enqueue, offer, insert, add, addLast, append |
| **Removing** | pop, delete, deleteFirst, remove, removeFirst | dequeue, poll, delete, deleteFirst, remove, removeFirst |

Do not be fooled by different names!
The important thing is their semantics, and a queue is a queue regardless if the method is called *dequeue*, *poll* or *remove*.

In this book we will use the names *push* and *pop* for stacks, and *enqueue* and *dequeue* for queues, respectively.
The reason for this is to reduce ambiguity when talking about the data structures,
and the names are very common in actual library implementations.

So the interface for the stack and queue ADTs look like this:

    interface Stack of T extends Collection:
        push(x: T)       // Pushes x on top of the stack.
        pop() -> T       // Pops the top of the stack and returns it.
        peek() -> T      // Returns the top element, without removing it.

    interface Queue of T extends Collection:
        enqueue(x: T)    // Enqueues x at the end of the queue.
        dequeue() -> T   // Dequeues the frontmost element.
        peek() -> T      // Returns the frontmost element, without removing it.


The interesting thing with these two ADTs is that there are several possible data structures that can implement them.
In the following sections we will see how to implement stacks and queues,
either as *linked lists* (see @sec:linked-lists) or *dynamic arrays* (see [@sec:array-lists;@sec:dynamic-arrays]).


### Case study: Implementing recursion {#implementing-recursion}

Perhaps the most common computer application that uses *stacks* is not even visible to its users.
This is the implementation of subroutine calls in most programming languages.
A subroutine call is normally implemented by *pushing* necessary information about the subroutine
(including the return address, parameters, and local variables) onto a stack.
This information is called an [activation record]{.term}.
Further subroutine calls add to the stack.
Each return from a subroutine *pops* the top activation record off the stack.

:::::: latex
\booklink{Read the rest online}{6.2}{sec:implementing-recursion}
::::::

:::::: online
As an example, here is a recursive implementation for the factorial function.

    // Recursively compute and return n-factoral (n!)
    function factorialRecursive(n):
        if n <= 1:     // Base case: return base solution
            return 1
        else:          // Recursive call for n > 1
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
