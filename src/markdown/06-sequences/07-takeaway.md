
## Main takeaways and outlook {#sequences:takeaway}

We have seen two general ways in which arbitrary length sequences can be represented:

* Using *dynamic arrays* to overcome the fixed capacity of regular arrays.
* Chaining objects (called *nodes*) together into *linked lists*.

With small variations, either of them can be used to implement both *stacks* and *queues*.
This means we can efficiently modify sequences by adding and removing elements at the start or end.
Dynamic arrays also allow efficient access to any position in the sequence, but it does not allow
effient insertion or deletion of values in those positions.

Dynamic arrays are a supremely useful data structure. Both built in lists in Python and the
ArrayList class in Java are dynamic arrays. Both dynamic arrays are also useful building blocks
of more complex data structures, like binary heaps ([Chapter @sec:heaps]) and separate chaining
hash tables ([Chapter @sec:hash-tables]).

Other than the memory representation of the sequence data structures, it is useful to consider the
*invariants* of each data structure. For instance, a simple stack implemented using a linked list will have a
pointer to a node, with the invariant that it is always contains the most recently added value
(the top of the stack). It may also have a size variable, which implicitly has the invariant
that it should reflect the actual number of nodes in the linked list.
A correct *push* or *pop* operation always ensures that both these invariants are preserved.



:::::: latex
\wrapQRlink[4mm]{20mm}{-4mm}{\thesectionURL}{Chapter \thechapter{} online}
\section*{Online material}
Visit the online book for further reading, interactive explanations, visualisations, extra material, and exercises.
::::::

