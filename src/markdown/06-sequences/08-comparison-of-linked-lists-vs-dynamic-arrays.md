
## Comparison of linked lists vs dynamic arrays

::: TODO
- Prio 1: rewrite
    - now this is written as if general lists have been introduced, but not stacks/queues
    - "we will look at stacks and queues later"
- Prio 1: move some parts to the section about general lists
:::

Now that you have seen two substantially different implementations for
stacks and queues, it is natural to ask which is better. In particular, if you must
implement a stack or a queue for some task, which implementation should you choose?

#### Time complexity

All the basic operations for the array-based and linked list implementations take constant time, so from a time efficiency perspective, neither has a significant advantage.

Array-based lists are usually slightly faster because they can make use of the internal memory cache that modern computers have, but it depends on many factors -- the programming language, the operating system, the processor, etc.

One little disadvantage with array-based lists is that the operations are only *amortised* constant time.
We will discuss amortised time more in section @sec:amortised-analysis later.
But what it means in practice is that push, pos, enqueue and dequeue are only guaranteed to be constant time *on average* if we run many operations.
Now and then (very rarely) the internal array will be resized, and then the operation might take longer time than usual.

This means that if we are implementing an application that has hard real-time constraints, a linked list might be a slightly better choice.


#### Memory usage

Given a collection of elements to store, they take up some amount of
space whether they are simple integers or large objects with many
fields. Any container data structure like a stack, a queue or a list then requires some
additional space to organize the elements being stored. This additional
space is called [overhead]{.term}.

- Array-based lists have the disadvantage that the *capacity* of the internal array is larger than the actual size of the list.
  When the array has recently been reallocated, a substantial amount of space might be tied up in a largely empty array.
  This empty space is the overhead required by the array-based list.

- Linked lists on the other hand have the advantage that they only need space for the objects actually on the list.
  However, each list node needs to allocate memory for the pointer to the next node, and all of these pointers combined is the overhead required by the array-based list.

The amount of space required by a linked list is directly proportional
to the number of elements $n$. Assuming that each list node takes up $K$
bytes of memory, the full list will use $Kn$ bytes. The amount of space
required by an array-based list is in the worst case three times as much
as $n$ times the size of an array cell. (This worst case will arise when
we remove a lot of elements from the list, because we wait until it is
1/3 full until we shrink the array). So assuming that one array cell
takes up $C$ bytes, the full array-based list will use at least $Cn$
bytes, and at most $3Cn$ bytes.

So, which one is the best? It depends on the size of the list nodes $K$,
compared to the size of the array cells $C$. Array-based lists have the
advantage that there is no wasted space for an individual element.
Linked lists require that an extra pointer for the `next` field be added
to every list node. So the linked list has these `next` pointers as
overhead. In many cases, $K$ is 2--3 times as large as $C$, so they will
be quite similar in size on average. But this depends on the programming
language, the operating system, and perhaps other factors.

Note that these calculations exclude the memory used by the actual list
elements, since the lists themselves only contain pointers to the
elements! And in many cases, the objects themselves are much larger than
the list nodes (or array cells).
