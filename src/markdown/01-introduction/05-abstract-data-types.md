
## Abstract data types {#intro-ADTs}

An *abstract data type* (ADT) is how we describe what a data structure can do, or what kind of tasks it can be used for.
This is done by describing what operations that can be performed on it, and how these operations should behave.
Note that an ADT does not dictate *how* the operations should be implemented, and multiple implementations are often possible.
<!-- The operations offered by an ADT is often called its *application programming interface* (API),
and is similar to an interface or a protocol in an object-oriented language. -->
By hiding the implementation details from the user, it is possible to change the underlying representation or an algorithm,
without changing the API of the abstract data type.

<!-- OPENDSA: START -->
The concept of an ADT can help us to focus on key issues even in non-computing applications.

::: example
#### Example: Cars

When operating a car, the primary activities are steering, accelerating,
and braking. On nearly all passenger cars, you steer by turning the
steering wheel, accelerate by pushing the gas pedal, and brake by
pushing the brake pedal. This design for cars can be viewed as an ADT
with operations "steer", "accelerate", and "brake". Two cars might
implement these operations in radically different ways, say with
different types of engine, or front- versus rear-wheel drive. Yet, most
drivers can operate many different cars because the ADT presents a
uniform method of operation that does not require the driver to
understand the specifics of any particular engine or drive design. These
differences are deliberately hidden.
:::


### Abstract data types as metaphors

The concept of an ADT is one instance of an important principle that must be understood by any successful computer scientist: managing complexity through abstraction.
A central theme of computer science is complexity and techniques for handling it.
Humans deal with complexity by assigning a label to an assembly of objects or concepts and then manipulating the label in place of the assembly.
Cognitive psychologists call such a label a *metaphor*.
A particular label might be related to other pieces of information or other labels.
This collection can in turn be given a label, forming a hierarchy of concepts and labels.
This hierarchy of labels allows us to focus on important issues while ignoring unnecessary details.

::: example
#### Example: Computers, hard drives, and CPUs

We apply the label "hard drive" to a collection of hardware that
manipulates data on a particular type of storage device, and we apply
the label "CPU" to the hardware that controls execution of computer
instructions. These and other labels are gathered together under the
label "computer". Because even the smallest home computers today have
millions of components, some form of abstraction is necessary to
comprehend how a computer operates.
:::

Consider how you might go about the process of designing a complex
computer program that implements and manipulates an ADT. The ADT is
implemented in one part of the program by a particular data structure.
While designing those parts of the program that use the ADT, you can
think in terms of operations on the data type without concern for the
data structure's implementation. Without this ability to simplify your
thinking about a complex program, you would have no hope of
understanding or implementing it.

<!-- OPENDSA: END -->

### The core abstract data types

Most of abstract data types are some sort of *collections*, that is, structures that store elements.
The ADTs we discuss in this book can be categorised in the following groups.

Sequences
:   In a sequence the order between the elements matters, and the ADT operations are sensitive to this order.
    Stacks and queues are the basic ADTs in this group, but there are also double-ended queues (deques), and general lists.
    Sequences are introduced in [chapter @sec:sequences].

Priority queues
:   A priority queue is also a kind of sequence, but it differs in that the order depends on the *priority* of an element.
    Priority queues often have different use cases than sequences,
    and they are implemented using special data structures, so we put them in a separate category.
    Priority queues are discussed in more detail in [chapter @sec:trees-and-heaps].

Sets
:   A set is an unordered collection of elements, where an element can only occur once.
    Sets have no inherent order, but instead they are tailor-made for adding, removing and finding elements fast.
    Implementations for sets and maps are discussed in [chapters @sec:search-trees;@sec:hash-tables].

Maps
:   A map (or *dictionary*) is often implemented using the same data structures as sets,
    but it represents a *function* or a *mapping* from keys to values.
    One can view a map as a very simple database, where you add, edit, remove values by searching for a key.

Graphs
:   Graphs are used to model relationships between elements,
    where the elements are called *vertices* and and the relations are represented by *edges*.
    Graphs and their core algorithms are introduced in [chapter @sec:graphs].

We will discuss abstract data types in more detail in [chapter @sec:abstract-data-types].
