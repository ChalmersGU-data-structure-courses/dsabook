
## Abstract data types

::: TODO
- Prio 2: analogy with Java interfaces (see preliminaries)
- Prio 3: update the text and examples in section Terminology
:::

Earlier, we introduced the term [data type]{.term}, which refers to a type along with a collection of operations for manipulating values of that type.
For instance, integers form a data type, and addition is an operation that can be performed on them.
These are known as _concrete_ data types, meaning they consist of actual values and a specific implementation.
In contrast, an [abstract data type]{.term} (ADT) does not specify concrete values or implementations.
Instead, it defines a data type purely in terms of a set of operations and the expected behavior of those operations, as determined by their inputs and outputs.
An ADT does not dictate _how_ the operations should be implemented, and multiple implementations are often possible.
These implementation details are hidden from the user—a concept known as [encapsulation]{.term}.
The set of operations offered by an abstract data type is known as its [application programming interface]{.term} (API).

Using an ADT, we can distinguish between the logical behavior of a data type and its actual implementation in a concrete program.
A classic example is the [list]{.term} abstract data type, which support the following set of operations:

    interface List of T:
        add(i: Int, x: T)   // Adds x at position i; where 0 ≤ i ≤ size.
        get(i: Int) -> T    // Returns the element at position i; where 0 ≤ i < size.
        set(i: Int, x: T)   // Replaces the value at position i with x; where 0 ≤ i < size.
        remove(i: Int)      // Removes the element at position i; where 0 ≤ i < size.

A list can be implemented using either an array or a linked list.
Users of a list do not need to know which implementation is used in order to make use of its functionality.
The actual implementations of an ADT rely on specific _data structures_ to realize the desired behavior of the operations -- for example, calculating the size of a list.

Although different implementations of an abstract data type offer the same set of operations, the choice of [data structure]{.term} can significantly impact the _efficiency_ of those operations.
Often, there are trade-offs involved: optimizing one operation may come at the cost of another.
For example, an array-based list allows fast access to elements at specific indices, while a linked-list implementation excels at inserting elements at the front.
Furthermore, different applications may prioritize different operations.
One program might frequently perform operation A, while another relies more heavily on operation B.
In such cases, it is often not possible to implement all operations efficiently, so multiple implementations of the same ADT are needed.
Additionally, one implementation may be more efficient for small datasets (thousands of elements), whereas another may scale better for large datasets (millions of elements).
The most suitable data structure depends on the specific use case, and making informed and well-reasoned choices is one of the central goals of this book.

::: example
#### Example: Collection of records

A _database_ is a structured collection of data that can be easily accessed, managed, and updated.
Each item in a database is typically called a _record_, which consists of multiple fields containing information—such as a name, an ID number, or an address.
Efficiently organizing, storing, and searching these records is a key challenge in database design.

Two popular implementations for managing large disk-based database applications are [hashing]{.term} and the [B-tree]{.term}.
Both support efficient insertion and deletion of records, as well as exact-match queries.
However, they differ in the types of queries they handle best.
Hashing is particularly efficient for exact-match queries, where you are looking for a record with a specific key.
On the other hand, B-trees are better suited for _range queries_, where you want to retrieve all records with keys within a certain interval.
In such cases, hashing becomes inefficient.

Therefore, if a database application only requires exact-match queries, hashing is typically the better choice.
But if the application needs to support range queries—such as finding all records with values between X and Y—the B-tree is preferred.
Despite their performance differences, both data structures address the same core problem: how to efficiently update and search a large collection of records.
:::

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

<!-- Data types have both a [logical form]{.term} and
a [physical form]{.term}. The definition of the
data type in terms of an ADT is its logical form. The implementation of
the data type as a data structure is its physical form. Sometimes you
might see the term *concrete implementation*, but the word concrete is
redundant. The figure below illustrates this relationship between
logical and physical forms for data types. When you implement an ADT,
you are dealing with the physical form of the associated data type. When
you use an ADT elsewhere in your program, you are concerned with the
associated data type's logical form. Some sections of this book focus
on physical implementations for a given data structure. Other sections
use the logical ADT for the data structure in the context of a
higher-level task.

:::: figure
#### Figure: ADTs, data structures, and data items

<inlineav id="ADTCON" src="Design/ADTCON.js" name="Design/ADTCON" links="Design/ADTCON.css" static/>

The relationship between data items, abstract data types, and data
structures.
:::: -->

<!-- As we saw, the ADT defines the logical form of the data type, while the
data structure implements the physical form of the data type. Users of
an ADT are typically programmers working in the same language as the
implementer of the ADT. Typically, these programmers want to use the ADT
as a component in another application. The interface to an ADT is also
commonly referred to as the Application Programmer Interface, or API,
for the ADT. The interface becomes a form of communication between two
programmers. -->

<!-- ::: topic
#### Example: API for a list class

A particular programming environment might provide a library that
includes a [list]{.term} class. The logical form
of the list is defined by the public functions, their inputs, and their
outputs that define the class. This might be all that you know about the
list class implementation, and this should be all you need to know.
Within the class, a variety of physical implementations for lists is
possible.
::: -->

Most of the abstract data types we introduce in this book are collections, that is, structures that store elements of an arbitrary type.
The earlier example of a list illustrates this: a list is a collection that holds elements, which can be of any type.

We group these collection-based ADTs into two main categories:

- Linear collections
- Sets and maps

In addition to these, we also introduce graphs, along with their commonly used implementations.

The rest of this section gives a high-level overview of the ADTs covered throughout the course.
[Figure @fig:adt-overview] summarizes these ADTs and highlights how they relate to one another.
Each ADT will be discussed in more detail later in the book, including their operations and the data structures used to implement them.

![An overview of ADTS with their common implementations](resources/images/ADT_overview.png){#fig:adt-overview}


#### Linear collections

Linear collections are a category of abstract data types in which the order of the elements matters.
This means that each element has a specific position in the sequence, and operations on the ADT are sensitive to this order.
Insertion, removal, and retrieval operations often depend on the position within the sequence.

The ordered sequence ADTs found in this book are:

- Stacks, a sequence with a Last-In-First-Out (LIFO) ordering
- Queues, a sequence with a First-In-First-Out (FIFO) ordering
- Double-ended queues (deques), which allow insertion and removal at both ends
- Priority queues, return elements based on priority rather than insertion order
- General lists, support adding, removing, and accessing elements

Ordered sequences are used in many applications and algorithms where the order of operations or items is important.
For example, maintaining a task list, simulating a line of customers, or a editor’s undo/redo history.

#### Sets and maps

Many programming tasks involve *retrieving specific information* from a large dataset.
For example, given a collection of people, how do we efficiently find the person with a specific personnummer?
Two key abstract data types are commonly used to solve such information retrieval problems:

- **Set**: A set represents an unordered collection of distinct items. It supports operations to *add* and *remove* elements, and to *check* whether a particular element is present. Duplicate elements are not allowed.

- **Map** (also called a dictionary): A map represents a collection of *key-value pairs*. Each *key* maps to a corresponding *value*. Operations include *adding* or *removing* key-value pairs, *checking* if a key is present, and *retrieving* the value associated with a given key. Like sets, maps do not allow duplicate keys.

Most implementations of both sets and maps are designed to support fast insertion, deletion, and lookup operations, making them ideal for managing collections where quick access to data is important.

#### Graphs

Another well-known abstract data type is the _graph_.
Graphs are used to model relationships between elements, where each element is called a _node_ or _vertex_.
A _relation_ between two nodes is represented by an _edge_, which may carry additional information to describe the nature or strength of the relationship—such as distance, cost, or capacity.

Graphs appear in many real-world scenarios, often in surprising ways.
A classic example is a map, where cities are represented as nodes and roads (with distances) as edges.
Graph algorithms can then be used to solve problems such as finding the shortest route between two cities.
Another, less obvious example is the structure of Java programs: the dependencies between Java classes can be represented as a graph.
This representation helps us determine the correct order to compile classes based on their dependencies.

Graphs are a fundamental concept in computer science, and we dedicate an entire chapter to them in this book.
Chapter [Graphs](#chap-graphs) explores how graphs can be represented and how we can traverse and manipulate them using various algorithms.


<!--
### Comparison with standard libraries

#### The standard Java API

The standard Java API can be found here (this is Java SE 11):
<https://docs.oracle.com/en/java/javase/11/docs/api/java.base/java/util/package-summary.html>. Here is a quick comparison
beteween the interfaces we have defined above, and the most similar ones
that are defined in the standard Java API:

Iterable, Collection, List:

:   These interfaces are similar to
    [Iterable](https://docs.oracle.com/en/java/javase/11/docs/api/java.base/java/lang/Iterable.html),
    [Collection](https://docs.oracle.com/en/java/javase/11/docs/api/java.base/java/util/Collection.html)
    and
    [List](https://docs.oracle.com/en/java/javase/11/docs/api/java.base/java/util/List.html)
    in the standard Java API, but with fewer methods.

Stack:

:   The main difference is that we define it as an interface
    (because there are several possible implementations), but it's a
    single class
    [Stack](https://docs.oracle.com/en/java/javase/11/docs/api/java.base/java/util/Stack.html)
    in the Java standard.

Queue:

:   The Java API has an interface
    [Queue](https://docs.oracle.com/en/java/javase/11/docs/api/java.base/java/util/Queue.html)
    which uses different method names.

PriorityQueue:

:   We define priority queues as an interface
    (because there are several possible implementations), but in the
    Java API it's a single class
    [PriorityQueue](https://docs.oracle.com/en/java/javase/11/docs/api/java.base/java/util/PriorityQueue.html)
    that implements their
    [Queue](https://docs.oracle.com/en/java/javase/11/docs/api/java.base/java/util/Queue.html)
    interface. So the method names are different too.

Set, SortedSet, Map, SortedMap:

:   These interfaces are similar to
    [Set](https://docs.oracle.com/en/java/javase/11/docs/api/java.base/java/util/Set.html),
    [SortedSet](https://docs.oracle.com/en/java/javase/11/docs/api/java.base/java/util/SortedSet.html),
    [Map](https://docs.oracle.com/en/java/javase/11/docs/api/java.base/java/util/List.html)
    and
    [SortedMap](https://docs.oracle.com/en/java/javase/11/docs/api/java.base/java/util/SortedMap.html)
    in the Java API, but with fewer methods. Also, some methods are
    simpler than the corresponding ones in the Java API.

Graph:

:   There is no interface (or class) for graphs in the standard Java API.


#### The Python standard library
-->
