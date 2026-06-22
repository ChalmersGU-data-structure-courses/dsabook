
## Other kinds of sequences {#sequences:more-sequences}

Stacks and queues are very simple abstract datatypes, and also very commonly used.
Many many algorithms make use of some kind of "agenda",
where they can remember things that have to be taken care of and then process them in the right order,
and most of them do not require anything more complicated than a stack or a queue.

But there are algorithms and programs that need sequences with more capabilities.
It could be that they order the elements in a more "intelligent" way,
or that they need to be able to look at more elements than just the "next in line".
Here we briefly list some additional, more complex sequences.

Priority queues
:   In a priority queue the elements are ordered by their *priority*.
    The basic operations are the same as for stacks and queues, you can *add* and *remove* elements.
    But to make them efficient we have to use more advanced data structures,
    so they will be discussed later in the book, in [Chapter @sec:trees].

Double-ended queues
:   A double-ended queue (also known as a *deque*) is both a stack and a queue at the same time.
    This means that we can add and remove elements both from the front and the rear
    (but not anywhere in the middle).
    Deques can be implemented in a similar way to stacks and queues, either as dynamic arrays or linked lists.
    However, to be able to implement all operations, the linked list must be a *double-linked list*.

Double-linked lists
:   Nodes in a double-linked list point both *forwards* and *backwards*.
    This means that we can iterate the list in both directions.
    The disadvantage against normal single-linked lists is that the operations become slightly more complex,
    with more pointer redirections.

General lists
:   Sometimes we want to be able to access elements at arbitrary positions,
    and then we have a *general list*.
    They can be implemented using linked lists or dynamic arrays,
    but both implementations have drawbacks.
    In fact, it is not possible to have a data structure that can handle insertion and removal
    of elements at arbitrary positions, and where all operations are efficient!
    There will always be some operation that becomes slower:
    for example, if we use dynamic arrays, it takes linear time to insert or delete an element in the middle of the list.
    On the other hand, a double-linked list can insert and delete elements very efficiently,
    but it takes linear time to locate the *position* of the element.

