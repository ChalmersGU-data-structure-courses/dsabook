
## Abstract data types

An *abstract data type* (ADT) is how we describe what a data structure can do, or what kind of tasks it can be used for.
This is done by describing what operations that can be performed on it, and how these operations should behave.
Note that an ADT does not dictate *how* the operations should be implemented, and multiple implementations are often possible.
The operations offered by an ADT is often called its *application programming interface* (API),
and is similar to an interface or a protocol in an object-oriented language.
By hiding the implementation details from the user, it is possible to change the underlying representation or an algorithm,
without changing the API of the abstract data type.

Using an ADT, we can distinguish between the logical behaviour of a data structure and its actual implementation.
A classic example is the *stack* abstract data type, which supports the following operations:

    interface Stack of T:
        push(x: t)          // Pushes x on the top of the stack
        pop() -> T          // Pops the top element off the stack and returns it
        isEmpty() -> Bool   // Tells if the stack is empty or not

A stack can be implemented using either a *dynamic array* or a *linked list*,
and the users of a stack should not need to know which implementation is used.
Using the terminology from object-oriented programming,
dynamic arrays and linked lists are two separate *classes* that implements the stack interface.

Often we can distinguish between *core* and *auxiliary* operations of an ADT.
The core operations are the ones that define the "essence" of the data type,
while the auxilary operations might simplify some use cases, but are not essential.
For the example of stacks, here are some common auxiliary operations:

    interface Stack of T:
        (...)
        size() -> Int   // Returns the number of elements on the stack
        peek() -> T     // Returns the top element, but does not remove it

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

### Choice of data structure

Although different implementations of an abstract data type offer the same operations,
the choice of data structure can significantly impact the *efficiency* of those operations.
Often, there are trade-offs involved: optimising one operation may come at the cost of another.
For example, a dynamic array stack is really fast most of the time,
but every once in a while the underlying array needs to resize which is rather costly.
In contrast, a linked list is more predictable --
most of the time pushing and popping is slower than a dynamic array, but it never has to do any expensive resizing.
Furthermore, different applications may prioritise different operations.
One program might frequently perform operation A, while another relies more heavily on operation B.
In such cases, it is often not possible to implement all operations efficiently,
so multiple implementations of the same ADT are needed.
Additionally, one data structure may be more efficient for small datasets (thousands of elements),
whereas another may scale better for large datasets (millions of elements).
The most suitable data structure depends on the specific use case,
and making informed and well-reasoned choices is one of the central goals of this book.

::: example
#### Example: Databases

A _database_ is a structured collection of data that can be easily accessed, managed, and updated.
Each item in a database is typically called a _record_, which consists of multiple fields containing information -- such as a name, an ID number, or an address.
Efficiently organising, storing, and searching these records is a key challenge in database design.

Two popular implementations for managing large disk-based database applications are *hash tables* and *B-trees*.
Both support efficient insertion and deletion of records, as well as exact-match queries.
However, they differ in the types of queries they handle best.
Hash tables are particularly efficient for exact-match queries, where you are looking for a record with a specific key.
On the other hand, B-trees are better suited for _range queries_, where you want to retrieve all records with keys within a certain interval.
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

### The core abstract data types

Most of the abstract data types we introduce in this book are collections,
that is, structures that store elements of an arbitrary type.
They can be categorised in the following groups.

Sequences
:   In a sequence the order between the elements matters.
    This means that each element has a specific position in the sequence,
    and operations on the ADT are sensitive to this order.
    Insertion, removal, and retrieval operations often depend on the position within the sequence.
    [Chapter @sec:sequences] covers stacks, queues, double-ended queues (deques), and general lists,
    as well as the two main data structures that implement sequences -- dynamic arrays and linked lists.

Priority queues
:   A priority queue is also a kind of sequence, because the order matters.
    But it is different from other seuences because the order depends on the *priority* of an element.
    The core operations are similar to stacks and queues, but priority queues often have different use cases,
    and they are implemented using completely different data structures.
    [Chapter @sec:trees-and-heaps] discusses how to implement priority queues using different kinds of heaps.

Sets
:   A set represents an unordered collection of elements.
    Just like in mathematical sets, an element can only occur once.
    This means that adding an element sometimes doesn't change the set at all.
    There are many different data structures that can be used to implement sets,
    but they can be divided into two main groups --
    where search trees are discussed in [chapter @sec:search-trees],
    and hash tables in [chapter @sec:hash-tables].

Maps
:   A map (or *dictionary*) is similar to a set, but represents a collection of *key-value pairs*.
    The main idea is that you can use a map as a very simple database,
    where you can look up the *value* for a given *key* (or change the value, or remove it).
    This means that maps do not allow duplicate keys, just like sets do not allow duplicate elements.
    Maps and sets are very similar to each other, and all data structures that can be used to implement
    sets can also be used to implement maps.

Graphs
:   Graphs are used to model relationships between elements.
    The elements in a graph are called *vertices* or *nodes*,
    and the relations between vertices are represented by *edges*.
    There are many different algorithms on graphs, such as finding the shortest path between two vertices,
    or minimal set of edges that connect all vertices in a graph.
    Graphs are introduced, together with some of their core algorithms, in [chapter @sec:graphs].
