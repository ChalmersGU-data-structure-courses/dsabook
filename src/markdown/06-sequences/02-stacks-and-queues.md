
## Stacks and queues

::: TODO
- Prio 1: invariants
- Prio 1: use cases for queues
- Prio 2: make the case study more compact
:::

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
They will be discussed in sections @sec:stacks-implemented-as-linked-lists, @sec:stacks-implemented-using-arrays and @sec:dynamic-arrays.

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
They are discussed in sections @sec:queues-implemented-as-linked-lists, @sec:queues-implemented-using-arrays and @sec:dynamic-arrays.

<!--
#### Invariants
 -->


### Case study: Implementing recursion

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
[pops](#pop){.term} the top activation record
off the stack.

:::::: latex
\booklink{Read section \ref{sec:case-study-implementing-recursion} online}{section-6.2.html\#sec:case-study-implementing-recursion}
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

::::: {#StackFact}
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
:::::

An iterative form of the factorial function is both simpler and faster
than the version shown in the example. But it is not always possible to
replace recursion with iteration. Recursion, or some imitation of it, is
necessary when implementing algorithms that require multiple branching
such as in the Towers of Hanoi algorithm, or when
[traversing a binary tree](#binary-tree-traversals).
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
