
## Analysing linked lists and dynamic arrays {#sequences:analysis}

::: TODO
- Done?
:::

In this chapter we introduced two different implementations for stacks and queues, linked lists and dynamic arrays.
How can we compare them?
Is any of them better than the other?

#### Time complexity

What is the time complexity of adding to and removing from a stack or a queue?
The analysis is trivial, both if we use a linked list (as in @sec:sequences:linked-lists)
or an internal array of fixed size (as in @sec:sequences:array-sequences):
all operations consist of constant time operations, and there is no looping or recursion involved.
Therefore all of them must have constant complexity, $O(1)$.

When we use a *dynamic* internal array the argumentation becomes a little more complicated.
But as we showed in @sec:sequences:dynamic-array-doubling, if we use the *array-doubling* technique
then the stack and queue operations have *amortised* constant complexity.
We will discuss more about amortisation later in @sec:analysis-3:amortisation,
but what it means in practice is that the operations
are only guaranteed to be constant time *on average* if we run many operations.
Now and then (very rarely) the internal array will be resized, and then the operation might take longer time than usual.

The main advantage of arrays compared to linked lists is that
they can make use of the internal memory cache that modern computers have,
because all values are stored in a contiguous memory block.
But which implementation is the most efficient depends on many factors,
such as the programming language, the operating system, the processor, etc.

#### Memory usage

Apart from the memory used by the elements themselves,
the stack or queue itself needs some additional space to organise the elements.
This additional space is called [overhead]{.term}.

-   In a *dynamic array* the capacity of the internal array is larger than the actual size of the stack or queue.
    When the array has recently been resized, a substantial part of the array consists of empty cells,
    which make up the overhead required by the dynamic array.

-   A *linked list* does not have to allocate a lot of empty space,
    but on the other hand, every list node needs to allocate memory for the pointer to the next node.
    All of these pointers combined is the overhead required by the linked list.

<!-- The amount of space required by a linked list is directly proportional
to the number of elements $n$. Assuming that each list node takes up $k$
bytes of memory, the full list will use $kn$ bytes. The amount of space
required by an array-based list is in the worst case three times as much
as $n$ times the size of an array cell. (This worst case will arise when
we remove a lot of elements from the list, because we wait until it is
1/3 full until we shrink the array). So assuming that one array cell
takes up $c$ bytes, the full array-based list will use at least $cn$
bytes, and at most $3cn$ bytes. -->

So, which one is the best?
It depends on the additional size used by the list nodes, compared to the space used by the empty cells in the dynamic array.
Just as for the time complexity, in the end it depends on
the programming language, the implementation, the operating system, and other factors.

<!-- Note that these calculations exclude the memory used by the actual list
elements, since the lists themselves only contain pointers to the
elements! And in many cases, the objects themselves are much larger than
the list nodes (or array cells). -->

