
# Abstract data types {#ADTs}

::: TODO
- Prio 1: the intro has been split - check that this works as the introduction
- Prio 1: mention that we will discuss naive implementations, but the real ones come later
:::

In [Chapter @sec:sequences] we introduced several *data structures* for
handling different kinds of sequences, in particular *stacks* and *queues*.
Interestingly these sequences can be implemented in different ways:
both stacks and queues can implemented using linked lists or dynamic arrays.

If we want to *use* these data structures in a program,
we are usually not interested in exactly how they are implemented, as long as they work as they should.
For example, suppose we are making a telephone switchboard system that should be able to handle many calls at the same time.
If all agents are busy, then the caller should be put on hold --
and probably we want to follow the principle "first-come-first-served", so we want to use a *queue* for this.
But we are not interested if this queue is implemented using a dynamic array or a linked list,
so we want to hide away this implementation-specific information.

Using the concept of *abstract data types*, ADTs,
we can distinguish between the logical behaviour of a data structure and its implementation.
An ADT describes what operations that can be performed on a data structure, and how these operations should behave.
But it does not say anything about *how* these operations should be implemented.
The operations offered by an ADT is often called its *application programming interface* (API),
and is similar to an *interface* in an object-oriented language.
