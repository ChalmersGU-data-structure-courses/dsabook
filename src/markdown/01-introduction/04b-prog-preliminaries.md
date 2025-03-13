
## Programming preliminaries

::: TODO
- Prio 1: all sections need major rewrites/updates, almost everything is missing
- Prio 2: introduce and describe the pseudocode we use in this book

we use indent based blocks, and don't use curly braces to denote blocks
:::

This section explains the pseudocode that we will use throughout the book.
In addition, we introduce the programming preliminaries that we assume you are familiar with.
If you're comfortable with these preliminaries, you can safely skip ahead to the next section.

### Pseudocode

There is a difference between knowing a programming language and understanding programming itself.
The ultimate goal of studying data structures and algorithms is to develop programming skills, regardless of the language used.

To keep our examples accessible, this book uses pseudocode rather than a specific programming language like Python or Java.
Pseudocode provides a structured yet informal way to describe algorithms, focusing on logic and flow without strict syntax rules.
Its simplicity and use of common programming constructs, such as loops and conditionals, make it easy to understand and translate into actual code.
The pseudocode in this book is designed to be straightforward to convert into real programming languages.
We will demonstrate this translation for Python, Java, and Haskell.

In the following sections, we will introduce fundamental programming concepts and, where applicable, specify the pseudocode conventions we use.
For example, the following function is written in our pseudocode calculates the factorial of $n$:

    function fact(n: Int) -> Int:
        res = 1
        for i = 2 to n:
            res = res * i
        return res

Our pseudocode includes the fundamental components of a programming language.

Variables

:   A name for a value, we use lower case alphabetic characters and allow
    underscore and numbers. A variable can have a type, but we don't specify it
    when it does not matter or is evident from the context. We use the following
    notation: `var: <type>`. Note that type names begin with a capital letter.

    Examples: `res`, `n: Int`, `i`, `b0: Boolean`, `res_n`

Types

:   A type defines a set of values along with the operations (or functions) that
    can be performed on them. Data types can be categorized as primitive or
    compound. Primitive types represent basic values, while compound types,
    such as arrays, tuples, and lists, are constructed using other types. For
    instance, an array is always an array of a specific type.

    In our pseudocode, we sometimes use type variables to indicate that a
    compound data type is parameterized by another type. For example, `List<A>`
    represents a list containing elements of some type A. To distinguish type
    variables, we use capital letters.

    Examples: the primitive type `Int` or `Bool`, or the compound type `Array<Bool>`

Literals

:   A literal is the representation of a value in concrete syntax (that is, in
    the source code). The value that a literal represents has a specific type.

    Examples: the integer `1`, the character `'1'`, the floating point number `1.0`

Operators

:   An operator is a name for an operation belonging to a specific data type.
    The application of an operator is usually written infix, that is, the name
    of the operation is written _between_ its operands. The mathematical operators
    have the usual precedence and in case of equal precedence we treat the
    as left associative.

    Examples: `+`, `*`, `%`, `<`

Expressions

:   An expression can be a variable, a literal, or an operation (or function)
    applied to one or more expressions, ultimately producing a value.

    Examples: `1 + 2`, `true && false`, `(1 + 2) * n`

Statements

:   We have the following kind of statements:

    - Declaration: to declare a variable with a given name and value, and an
      optional type.
    - Assignment: to assign a value to a variable.
    - Conditional: execute a block of statements depending on a boolean expression,
      we use the common `if-then` or `if-then-else` statements.
    - Loop: iteratively execute a block of statements, a loop can either be:
        * a `while`-loop, which executes a block of statements until a boolean
          expression is `false`, or
        * a `for-each`-loop, which traverses over a collection of elements.
    - Return: a `return` halts the execution of a function and outputs a value
      to the caller of the function.

### Data types

As mentioned earlier, a data type consists of a set of values and the operations that can be performed on them. 
Primitive data types are basic types provided by a programming language (including our pseudocode) and cannot be user-defined. 
Some (aggregate) data structures, such as arrays and lists, are built into many languages and organize collections of values, while compound data types, such as classes or algebraic data types, allow users to define their own structures.
The next sections introduce the data types used in this book.

#### Primitive data types {-}

We use the following primitive data types:

- **Boolean**: This data type has only two possible values: `true` and `false`.
  It supports logical operations such as conjunction (AND), disjunction (OR),
  exclusive OR (XOR), and negation.
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

#### Arrays {-}

Arrays are one of the fundamental data structures in programming because they are directly supported by the computer’s memory system and offer excellent performance. 
Accessing or modifying an element in an array is extremely fast, making arrays important for many algorithms.

::: note
*Note to Python programmers*: in Python, arrays are called *lists*, and are written like this: `[1,2,3]`. 
There is one difference between arrays and Python lists: in most programming languages, any given array has a fixed size. 
However, Python lists can change in size -- for example, the `append` method adds a new element to the list, increasing its size.
In this book, we will work with arrays that have a _fixed_ size.
Python lists are so-called [dynamic arrays](#dynamic-array-based-lists).
:::

Before using an array, you must declare it and specify its size.
Once created, an array has a fixed size and cannot be resized.
This limitation means that operations like concatenating two arrays require creating a new array large enough to hold all elements.

One key advantage of arrays is their efficient retrieval of elements. 
When an array is allocated, memory is reserved in a contiguous block, ensuring that all elements are stored next to each other. 
This structure allows quick access to any element using its index by directly calculating its memory location.

In our pseudocode, we use the following syntax to declare an array, retrieve an element, and update an element:

    function addOne(input: Array<Int>) -> Array<Int>:
        output = Array<Int>[input.length]
        i = 0
        while i < input.length:
            output[i] = input[i] + 1
            i = i + 1
        return output

This example highlights several key features of arrays. 
First, our pseudocode follows zero-based indexing, meaning the first element is at index 0, the second at index 1, and so on. 
The last element is located at an index equal to the array’s length minus one.
The length of an array can be accessed using the length attribute. 
This value is stored alongside the array and does not need to be computed manually.

To retrieve an element from an array, we use square bracket notation. For instance, `input[2]` retrieves the third element of the input array.
Similarly, updating an element follows the same notation: `input[2] = 10` assigns a new value to the third element.

In the example above, we explicitly declare the types of array variables to illustrate our pseudocode conventions. However, in some cases, we may omit type annotations for simplicity.

**References** In most programming languages, including our pseudocode, arrays are stored as references rather than direct values. 
This means that when you assign one array variable to another, you are copying the reference (or pointer) to the original array, not the array itself.

For example:

    a = Array<Int>[3]
    a[0] = 10

    b = a        // 'b' now refers to the same array as 'a'
    b[0] = 20

    print(a[0])  // Outputs 20, because 'a' and 'b' point to the same array  

Since `b` holds a reference to the same array as `a`, any modifications made through `b` will also affect `a`. 
If you want to create a separate copy, you need to explicitly copy the array element by element.

**Array slices** A prominent feature in the popular programming language Python are _array slices_.
You can use a slice to select a part of an array, for example, the first ten elements.
However, such a slice creates a new array and copies the selected elements from the original array.
This means that using slices is quite slow.
Instead, we create a sequence of indexes and use these to index into an array and retrieve the elements we want.
In Python we can use the `range(start, end)` function for this functionality.

::: TODO
- discussion: should 'end' point to the last element or the one after
    - (how do we do in this book?)
:::

#### Strings {-}

A string is an immutable sequence of characters, meaning that once defined (e.g., `str = "data"`), it cannot be modified.
In this sense, strings behave like values, similar to integers or boolean values.
While you can access individual characters using indexing, you cannot change them.
Any modification, such as concatenation or replacement, results in the creation of a new string rather than altering the original one.
Because strings are internally represented as arrays, operations like concatenation and comparison are not constant-time and may involve overhead depending on the string length.

#### Tuples {-}

A tuple is an _ordered_, _immutable_ collection of elements. 
Unlike arrays, which allow modification of its elements, tuples cannot be changed after they are created. 
They can store multiple values of different types and are often used when a fixed grouping of related data is needed.

We use the following notation in our pseudocode:

    point = (3, 4)                // A tuple with two elements
    person = ("Geert", 30, True)  // A tuple with different data types  
    print(point[0])               // Accessing first element  
    point[0] = 5                  // This is not allowed, tuples are immutable  

Tuples are useful for returning multiple values from a function, grouping related data, and working with fixed collections that should not be modified.

#### Interfaces {-}

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

    interface Stack<T>:
        push(value: T)
        pop() -> T

Using an interface, we can define a data type's expected behaviour and provide multiple implementations in our pseudocode. 
By using interfaces, we clarify the conceptual structure of a data type, making it easier to explain, compare, and analyse different implementations.

#### Compound data types {-}

We often need to combine different data types to store complex information.
These are known as _compound data types_. 
Nearly every programming language supports compound data types, although the specific implementation can vary between languages. 
For example, in Java, compound data types are typically created using classes, which allow you to combine instance variables of potentially different types.
In Python, you can achieve this using classes, dataclasses, or dictionaries.
In functional programming languages, such as Haskell, you can define algebraic data types to combine values in various ways.

Our goal is to keep things simple and explain the concept in a way that can be easily translated into the syntax of any programming language you prefer. 
For this reason, we have adopted a straightforward notation for compound data types in our pseudocode:

    datatype ArrayStack<T>(capacity) implements Stack<T>:
        data = Array<T>[capacity]
        size = 0

        function push(value: T):  // no safety checks
            data[size] = value
            size = size + 1

        function pop() -> T:
            size = size - 1
            return data[size]

This example uses an array to store the stack elements and demonstrates how to define a compound data type. 
We define a new compound data type using the keyword `datatype`.
A `datatype` can implement an `interface`, making it a subtype of the interface.

To create a concrete instance of a `datatype`, we use the following notation:

    Stack<Int> stack = ArrayStack<Int>(100)

We can then call member functions like this:

    next = stack.pop()

Note that, in our pseudocode, we simplify by omitting details we consider irrelevant, such as constructor handling, default values, and other specifics.
We intentionally avoid complex features like multiple inheritance or static methods, focusing instead on clarity and easy translation to your preferred programming language.

We assume familiarity with the following concepts:

- Classes and instances
- Constructors
- Members (instance variables) and member functions (methods)
- The self reference

There is no need to know the following for our purposes:

- Multiple inheritance
- Class variables, class methods, static methods
- Referencing a superclass or using the super keyword

### Mutable and immutable objects

::: TODO
- immutable: primitives, strings, tuples
- mutable: arrays, objects
    - all data structures!
:::

### Functions

::: TODO
- what we assume they know about functions
- recursion, mutual recursion
- no named arguments, or default arguments?
- call-by-value, call-by-name: mutable/immutable arguments
:::


### Computer memory

::: TODO
- Stack vs heap
- Internal memory vs external memory
- Caching and locality (memory/data locality)
:::
