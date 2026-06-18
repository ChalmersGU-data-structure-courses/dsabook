
## Analysing linked lists and dynamic arrays

<!-- OPENDSA: START -->
Now that you have seen two substantially different implementations for stacks and queues,
it is natural to ask which is better.
In particular, if you must implement a stack or a queue for some task, which implementation should you choose?
<!-- OPENDSA: END -->

### Time complexity

What is the time complexity of adding to and removing from a stack or a queue?
The analysis is trivial, both if we use a linked list (as in @sec:linked-lists)
or an internal array of fixed size (as in @sec:array-based-stacks-and-queues):
*push*, *pop*, *enqueue* and *dequeue* only consist of constant time operations,
and there is no looping or recursion involved.
Therefore all of them must have constant complexity, $O(1)$.

When we use a *dynamic* internal array the argumentation becomes a little more complicated.
But as we showed in @sec:dynamic-arrays, if we use the *array-doubling* technique
then the stack and queue operations have *amortised* constant complexity.

Array-based lists are usually slightly faster than linked lists because they can make use of
the internal memory cache that modern computers have, but it depends on many factors
-- the programming language, the operating system, the processor, etc.

One disadvantage with array-based lists is that the operations are only *amortised* constant time.
We will discuss more about amortisation later in @sec:amortised-analysis.
But what it means in practice is that *push*, *pop*, *enqueue* and *dequeue*
are only guaranteed to be constant time *on average* if we run many operations.
Now and then (very rarely) the internal array will be resized, and then the operation might take longer time than usual.

This means that if we are implementing an application that has hard real-time constraints,
a linked list might be a slightly better choice.

### Memory usage

<!-- OPENDSA: START -->
Given a collection of elements to store, they take up some amount of
space whether they are simple integers or large objects with many
fields. Any container data structure like a stack, a queue or a list then requires some
additional space to organise the elements being stored.
This additional space is called [overhead]{.term}.
<!-- OPENDSA: END -->

-   Array-based lists have the disadvantage that the *capacity* of the internal array
    is larger than the actual size of the list.
    When the array has recently been reallocated,
    <!-- OPENDSA: START -->
    a substantial amount of space might be tied up in a largely empty array.
    This empty space is the overhead required by the array-based list.
    <!-- OPENDSA: END -->

-   <!-- OPENDSA: START -->
    Linked lists on the other hand have the advantage that they only need space
    for the objects actually on the list.
    <!-- OPENDSA: END -->
    However, each list node needs to allocate memory for the pointer to the next node,
    and all of these pointers combined is the overhead required by the array-based list.

The amount of space required by a linked list is directly proportional
to the number of elements $n$. Assuming that each list node takes up $k$
bytes of memory, the full list will use $kn$ bytes. The amount of space
required by an array-based list is in the worst case three times as much
as $n$ times the size of an array cell. (This worst case will arise when
we remove a lot of elements from the list, because we wait until it is
1/3 full until we shrink the array). So assuming that one array cell
takes up $c$ bytes, the full array-based list will use at least $Cn$
bytes, and at most $3cn$ bytes.

So, which one is the best? It depends on the size $k$ of the list nodes,
compared to the size $c$ of the array cells.
In many cases, $k$ is 2--3 times as large as $c$, so they will
be quite similar in size on average. But this depends on the programming
language, the operating system, and perhaps other factors.

Note that these calculations exclude the memory used by the actual list
elements, since the lists themselves only contain pointers to the
elements! And in many cases, the objects themselves are much larger than
the list nodes (or array cells).


### Queues as pairs of stacks

So far we have showed two implementations for queues, but there is also a third variant.

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
