
## Programming preliminaries

::: TODO
- we use indent based blocks, and don't use curly braces to denote blocks
- for x = 1 to 10 -- is 10 included or not?
:::

This section explains the pseudocode that we will use throughout the book.
In addition, we introduce the programming preliminaries that we assume you are familiar with.
If you're comfortable with these preliminaries, you can safely skip ahead to the next section.

:::::: latex
\booklink{Read the rest online}{1.5}{sec:programming-preliminaries}
::::::

:::::: html

### Pseudocode

There is a difference between knowing a programming language and understanding programming itself.
The ultimate goal of studying data structures and algorithms is to develop programming skills, regardless of the language used.

To keep our examples accessible, this book uses pseudocode rather than a specific programming language like Python or Java.
Pseudocode provides a structured yet informal way to describe algorithms, focusing on logic and flow without strict syntax rules.
Its simplicity and use of common programming constructs, such as loops and conditionals, make it easy to understand and translate into actual code.
The pseudocode in this book is designed to be straightforward to convert into real programming languages.

<!--
::: TODO
We will demonstrate this translation for Python, Java, and Haskell.
:::
-->

In the following sections, we will introduce fundamental programming concepts and, where applicable, specify the pseudocode conventions we use.
For example, the following function is written in our pseudocode calculates the factorial of $n$:

    function fact(n: Int) -> Int:
        res = 1
        for i = 2 to n:
            res = res * i
        return res

Our pseudocode includes the fundamental components of a programming language.

Variables

:   A variable is a name for a value, for which we use lower case alphabetic characters and allow
    underscore and numbers. A variable can have a type, but we don't specify it
    when it does not matter or is evident from the context. We use the following
    notation: `var: <type>`. Note that type names begin with a capital letter.

    Examples: `res`, `n: Int`, `i`, `b0: Bool`, `intermediate_result`

Types

:   A [type]{.term} defines a set of values along with the operations (or functions) that can be performed on them. For example, the Boolean type consists of the values `true` and `false`. Data types can be categorised as primitive or compound. Primitive types represent basic values, while compound types, such as arrays, tuples, and lists, are constructed using other types. For instance, an array is always an array of a specific type.

    In our pseudocode, we sometimes use type variables to indicate that a
    compound data type is parameterised by another type. For example, `List of A`
    represents a list containing elements of some type A. To distinguish type
    variables, we use capital letters.

    Examples: the primitive type `Int` or `Bool`, or the collection type `Array of Bool`

Literals

:   A literal is the representation of a value in concrete syntax (that is, in
    the source code). The value that a literal represents has a specific type.

    Examples: the integer `1`, the character `'1'`, the floating point number `1.0`, the boolean `false`

Operators

:   An operator is a symbol or keyword that represents an action or computation to be performed on one or more *operands* (which can be values or variables).
    The application of an operator is usually written infix, that is, the name
    of the operation is written _between_ its operands. The mathematical operators
    have the usual precedence and in case of equal precedence we treat the
    as left associative.

    Examples: `+`, `*`, `%`, `<`

    Note that we use `==` for the equality operator, and `=` for assignment.

Expressions

:   An expression can be a variable, a literal, or an operation (or function)
    applied to one or more expressions, ultimately producing a value.

    Examples: `1 + 2`, `true && false`, `(1 + 2) * n`

Statements

:   We have the following kind of statements:

    - Declaration: to declare a variable with a given name and value, and an optional type.
    - Assignment: to assign a value to a variable.
    - Conditional: execute a block of statements depending on a boolean expression, we use the common `if-then` or `if-then-else` statements.
    - Loop: iteratively execute a block of statements, see below.
    - Return: a `return` halts the execution of a function and returns a value to the caller of the function.

#### Loops, iteration

We use two kind of loops, `while` and `for`:

- a `while`-loop executes a block of statements until a boolean expression is `false`
- a `for`-loop traverses over a collection of elements
- in some cases we can `break` out of a loop inside its body

Often we want to iterate over integers, and then it's important to know if the end point is included or not.
We will use `i..j` to describe the increasing seqeunce from `i` to `j` (i.e., `0..10` is the sequence $0, 1, \ldots, 9, 10$).
Here is an example of a nested `for` loop:

    for i in 0 .. N-1:
        for j in i+1 .. N:
            do something with i and j

*Important note*: the range `i..j` is *inclusive*, meaning that the endpoint `j` is *included* in the sequence.
This is different to how a language such as Python does it, where `range(i,j)` does not include `j`.
Sometimes this can be a matter of life and death (of your program), so be sure to translate the algorithms in a correct way to your favorite programming language!

Some modern programming languages (such as Python and Java) have syntactic sugar for *iterators*.
Although this is very convenient in many cases, we will not make use of iterators in this book, just to keep things as simple as possible.


### Data types

As mentioned earlier, a data type consists of a set of values and the operations that can be performed on them.
Primitive data types are basic types provided by a programming language (including our pseudocode) and cannot be user-defined.
Some data structures, such as arrays and lists, are built into many languages and organise collections of values, while compound data types, such as classes or algebraic data types, allow users to define their own structures.
The next sections introduce the data types used in this book.

#### Primitive data types

We use the following primitive data types:

- **Bool**: This data type has only two possible values: `true` and `false`.
  It supports logical operations such as conjunction (`and`), disjunction (`or`), and negation.
- **Int**: Represents whole numbers. Unless specified otherwise, we assume
  integers of arbitrary size, though in some cases, we may use fixed-size
  integers (32-bit or 64-bit), which will be explicitly stated. Standard
  arithmetic operations, such as addition, multiplication, and integer division,
  are supported.
- **Float**: Represents floating-point numbers with limited precision, which
  depends on the programming language and, in some cases, the underlying
  computer architecture. It supports common operations like addition,
  subtraction, multiplication, and division.
- **Char**: Represents individual characters. Unless otherwise specified, we
  assume fixed-size Unicode encoding, though in some cases, 8-bit ASCII may be
  used.

In addition to the primitive data types mentioned earlier, there is also `null` (referred to as `None` in some languages), a special value that represents the absence of a value or an unknown state.

<!--
::: TODO
- Python-specific details: no fixed-size ints, chars == strings, doesn't distinguish between int and float
:::
-->

#### Arrays

Arrays are one of the fundamental data structures in programming because they are directly supported by the computer’s memory system and offer excellent performance.
Accessing or modifying an element in an array is extremely fast, making arrays important for many algorithms.

::: note
*Note to Python programmers*:
Python doesn't have arrays, instead they have *lists* which are written like this: `[1,2,3]`.
There is one important difference between arrays and Python lists: any given array has a fixed size.
However, Python lists can change in size -- for example, the `append` method adds a new element to the list, increasing its size.
In this book, we will work with arrays that have a _fixed_ size.
Python lists are so-called [dynamic arrays]{.term} -- we will discuss how they work in @sec:dynamic-arrays.
:::

Before using an array, you must declare it and specify its size.
Once created, an array has a fixed size and cannot be resized.
This limitation means that operations like concatenating two arrays require creating a new array large enough to hold all elements.

One key advantage of arrays is their efficient retrieval of elements.
When an array is allocated, memory is reserved in a contiguous block, ensuring that all elements are stored next to each other.
This structure allows quick access to any element using its index by directly calculating its memory location.

In our pseudocode, we use the following syntax to declare an array, retrieve an element, and update an element:

    // Make a copy of the input array, and increment every value in the copied array.
    // Return the copied array.
    function addOne(input: Array of Int) -> Array of Int:
        output = new Array(input.size) of Int
        for i in 0 .. input.size-1:
            output[i] = input[i] + 1
        return output

This example highlights several key features of arrays.

- First, our pseudocode follows zero-based indexing, meaning the first element is at index 0, the second at index 1, and so on.
  The last element is located at an index equal to the array’s size minus one.
- The size of an array can be accessed using the `size` property.
- To retrieve an element from an array, we use square bracket notation. For instance, `input[2]` retrieves the third element of the input array.
- Similarly, updating an element follows the same notation: `input[2] = 10` assigns a new value to the third element.

In the example above, we explicitly declare the types of array variables to illustrate our pseudocode conventions.
However, in many cases, we may omit type annotations for simplicity.

**References**: In most programming languages, including our pseudocode, arrays are stored as references rather than direct values.
This means that when you assign one array variable to another, you are copying the reference (or pointer) to the original array, not the array itself.

For example:

    a = new Array(3) of Int
    a[0] = 10

    b = a        // 'b' now refers to the same array as 'a'
    b[0] = 20

    print(a[0])  // Outputs 20, because 'a' and 'b' point to the same array

Since `b` holds a reference to the same array as `a`, any modifications made through `b` will also affect `a`.
If you want to create a separate copy, you need to explicitly copy the array element by element.

**Array slices**: A prominent feature in the popular programming language Python are _array slices_.
You can use a slice to select a part of an array, for example, the first ten elements.
However, such a slice creates a new array and copies the selected elements from the original array.
This means that using slices is quite slow.

Therefore we will not use array slices in this book.
Instead we can use a pair of array indices `i`, `j` to refer to a specific slice of the array.
This is, e.g., done already in @sec:binary-search where we introduce the *binary search* algorithm.

#### Strings

A string is an immutable sequence of characters, meaning that once defined (e.g., `str = "data"`), it cannot be modified.
In this sense, strings behave like values, similar to integers or boolean values.
While you can access individual characters using indexing, you cannot change them.
Any modification, such as concatenation or replacement, results in the creation of a new string rather than altering the original one.
Because strings are internally represented as arrays, operations like concatenation and comparison are not constant-time and may involve overhead depending on the string length.

#### Tuples

A tuple is an _ordered_, _immutable_ collection of elements.
Unlike arrays, which allow modification of its elements, tuples cannot be changed after they are created.
They can store multiple values of different types and are often used when a fixed grouping of related data is needed.

We use the following notation in our pseudocode:

    point = (3, 4)                // A tuple with two elements
    person = ("Geert", 30, True)  // A tuple with different data types
    print(point[0])               // Accessing first element
    point[0] = 5                  // This is not allowed, tuples are immutable

Tuples are useful for returning multiple values from a function, grouping related data, and working with fixed collections that should not be modified.

::: TODO
- Note that Java doesn't have tuples, and how to fix that (same for C?)
- show some simple *destructuring* assignments `(x, y) = point`
:::

### Mutable and immutable data

For many algorithms, the ability to use mutable data can lead to more efficient solutions.
However, mutability comes with its drawbacks: it increases the risk of making mistakes, and immutable data is often easier to reason about and debug.

In our pseudocode, we assume the following data types are immutable:

- Primitive data types (such as integers and characters),
- Strings
- Tuples

On the other hand, the following data types are mutable:

- Arrays
- Compound data types (see below)

::: TODO
add some examples of mutable/immutable (e.g., arrays vs strings)
:::

### Functions

We have already seen several examples of functions.
A function starts with the keyword function, followed by its name.
Functions can have zero or more parameters, and we assume a call-by-value evaluation strategy.

It is important to note that collection types (such as arrays) and compound data types are reference types.
When assigning an array or a compound data type to a variable, what gets stored is a reference to the actual data, not a copy of the data itself.
This means that if you pass an array as an argument to a function, the reference is copied, not the entire array.
As a result, any modifications made to the array inside the function will persist when the function returns.

Functions can also be recursive, meaning they call themselves within their own body.
Recursion is often used in divide-and-conquer algorithms, though it is not limited to them.
When analysing recursive functions, it is important to remember that function calls are not free -- they consume memory on the stack, which can become a limiting factor if recursion depth is too large.

::: TODO
describe return type
:::

### Interfaces

In our pseudocode, we introduce the concept of an _interface_ to distinguish between an abstract data type (ADT) and its concrete implementation.
An interface defines a set of operations that a data type must support, without specifying how those operations are implemented.
This allows us to describe the behaviour of a data type separately from its internal representation.

An abstract data type (ADT) is a high-level description of a data structure that focuses on what operations are available rather than how they are executed.
For example, an ADT for a stack may define operations such as `push` and `pop`,but it does not specify whether the stack is implemented using an array or a linked list.
A concrete implementation provides the actual data structure and the logic for performing the operations defined in the interface.
Different implementations of the same interface can exist, each with different performance characteristics.

::: TODO
Maybe add a forward reference to stacks?
:::

We use the following notation for interfaces in our pseudocode:

    interface Stack of T:
        push(value: T)
        pop() -> T

Using an interface, we can define a data type's expected behaviour and provide multiple implementations in our pseudocode.
By using interfaces, we clarify the conceptual structure of a data type, making it easier to explain, compare, and analyse different implementations.

### Compound data types

We often need to combine different data types to store complex information.
These are known as _compound data types_.
Nearly every programming language supports compound data types, although the specific implementation can vary between languages.
For example, in Java, compound data types are typically created using classes, which allow you to combine instance variables of potentially different types.
In Python, you can achieve this using classes, dataclasses, or dictionaries.
In functional programming languages, such as Haskell, you can define algebraic data types to combine values in various ways.

Our goal is to keep things simple and explain the concept in a way that can be easily translated into the syntax of any programming language you prefer.
For this reason, we have adopted a straightforward notation for compound data types in our pseudocode.
Here is an example of how to define a dynamic array (see @sec:dynamic-arrays):

    datatype ArrayStack of T implements Stack of T:
        data: Array of T
        size: int = 0

        constructor ArrayStack(capacity):
            data = new Array(capacity) of T

A datatype can also have "internal functions" (called *methods* in object-oriented languages), and they have access to the internal variables:

    datatype ArrayStack ...:
        (...)

        push(value: T):
            data[size] = value
            size = size + 1

        pop() -> T:
            size = size - 1
            return data[size]

This example uses an array to store the stack elements and demonstrates how to define a compound data type.
We define a new compound data type using the keyword `datatype`.
A `datatype` can implement an `interface`, making it a subtype of the interface.

Note that we usually don't write the keyword `function` when it appears within a datatype definition.

To create a concrete instance of a `datatype`, we use the following notation:

    stack: Stack of Int = new ArrayStack(100) of Int

We can then call member functions like this:

    next = stack.pop()

#### Simplified definitions

Note that, in our pseudocode, we simplify by omitting details we consider irrelevant, such as constructor handling, default values, and other specifics.
This means that our ArrayStack can also be defined without an explicit constructor:

    datatype ArrayStack(capacity) implements Stack:
        data: Array = new Array(capacity)
        size: int = 0

The above definition is the same as the first one -- we can deduce how the constructor must look like from the datatype declaration.
Note that we also removed the type variable `T` because it can be deduced from the context.

Another example datatype are *linked list nodes* (see @sec:stacks-implemented-as-linked-lists):

    datatype ListNode of T:
        value: T
        next:  ListNode of T

This definition is an abbreviation of the following:

    datatype ListNode of T:
        value: T
        next:  ListNode of T

        constructor(value, next):
            value = value
            next = next

But as you can see, the constructor is straightforward so we won't write it down.
We trust that you are competent programmers and can deduce yourself how to implement these simplified definitions in your favourite programming language.

#### Extending datatypes

We can *extend* a datatype by adding more variables, e.g., here a definition of *doubly-linked list nodes* (see @sec:double-ended-queues):

    datatype DoubleNode extends ListNode:
        ...
        prev: ListNode

The ellipsis (...) is to remind you that there are already variables that are taken from the `ListNode` datatype.

Sometimes the argument to the constructor isn't an internal variable, and then we have to be more explicit about the internal variables:

This example uses an array to store the stack elements and demonstrates how to define a compound data type.
We define a new compound data type using the keyword `datatype`.
A `datatype` can implement an `interface`, making it a subtype of the interface.

#### Examples: binary tree nodes

Here's a final example of *binary tree nodes* (see @sec:implementing-binary-trees):

    datatype TreeNode:
        value
        left:  TreeNode = null
        right: TreeNode = null


The definition leaves out the following details:

- the value type `T`
- the constructor
- that `left` and `right` have default values (`null`) if they are not given to the constructor

So a more explicit definition would be like this:

    datatype TreeNode of T:
        value: T
        left:  TreeNode of T
        right: TreeNode of T

        constructor TreeNode(value, left=null, right=null):
            value = value
            left  = left
            right = right

We can of course also define some methods, or internal functions, that operate on the internal variables:

    datatype TreeNode:
        (...)

        // Return true if a node doesn't have any children.
        isLeaf() -> Bool:
            return left is null and right is null

        // Return the number of nodes, including myself.
        treeSize() -> Int:
            n = 1
            if left is not null:
                n = n + left.treeSize()
            if right is not null:
                n = n + right.treeSize()
            return n

Note that the last definition, `treeSize`, is a *recursive* function.

Also note that `treeSize` has to check that the children actually are tree nodes before calculating their size.
Another possibility is to have a global function that takes the tree node as an argument:

    function treeSize(node: TreeNode) -> Int:
        if node is null:
            return 0
        else:
            return 1 + treeSize(node.left) + treeSize(node.right)


#### Complex features that are not used

We intentionally avoid complex features from object-oriented languages, focusing instead on clarity and easy translation to your preferred programming language.
So you do *not* have to know about these things to follow the algorithms in this book:

Multiple inheritance

: Being able to extend multiple classes or interfaces is useful for defining e.g. user interfaces, but it is not something we will use in this book.

Static methods, class variables, etc.

: This is useful for not cluttering up the global namespace, so very useful when you write larger programs. But it is not needed for describing algorithms and data structures.

Referencing super classes

: Being able to refer to methods of a super-class can also be useful in some contexts, but again, not something we need here.


### Computer memory

To run a program we need to first load the program in memory before we can start executing.
A program uses memory as well to store information that it needs for calculations.
A program has access to two different memory regions: the stack and the heap.
The stack is a memory region that stores local variables, function call information, and return values.
When a function is called, its local variables and return address are pushed onto the stack, and when the function exits, they are removed.
Since the stack follows a last-in, first-out (LIFO) order, memory allocation and deallocation happen in a predictable way, making it efficient.

The heap, on the other hand, is a more flexible memory area used for _dynamic_ allocation.
Memory allocated on the heap persists until explicitly freed or garbage-collected, making it useful for objects with longer lifetimes.
Unlike the stack, the heap does not follow a strict order for allocation and deallocation, which can lead to fragmentation and slower access times.
While stack allocation is fast and automatic, heap allocation requires more overhead and manual memory management.

The stack and heap are part of the so called _internal memory_ and consists of high-speed storage components like Random Access Memory (RAM) and cache that are directly accessible by the CPU.
This memory is volatile, meaning data is lost when power is turned off, and is used to store actively running programs and data.
Because of its speed, internal memory is important for efficient program execution.

External memory, or secondary storage, includes non-volatile devices such as hard drives, solid-state drives, and USB storage.
Unlike internal memory, it persists data even when the system is powered off and is used for long-term storage.
External memory usually has a much larger capacity than internal memory, but it is significantly slower because data must be fetched and loaded into RAM before it can be processed.

#### Caching

Caching is a technique used to accelerate data access by temporarily storing frequently used information in a smaller, high-speed memory area called a cache.
When a program requests data, the processor first checks whether it is available in the cache.
If the data is found, it can be retrieved almost instantly, avoiding the need to access slower main memory.
Cache memory is located very close to the processor, often integrated directly into the CPU, allowing it to fetch values in just a few clock cycles, significantly improving performance.

::::::
