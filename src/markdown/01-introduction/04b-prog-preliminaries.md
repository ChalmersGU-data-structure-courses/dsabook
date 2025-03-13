
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

    function fact(n: int) -> int:
        res = 1
        for i = 2 to n:
            res = res * i
        return res

Our pseudocode includes the fundamental components of a programming language.

Variables

:   A name for a value, we use lower case alphabetic characters and allow
    underscore and numbers. A variable can have a type, but we don't specify it
    when it does not matter or is evident from the context. We use the following
    notation: `var: <type>`.

    Examples: `res`, `n: int`, `i`, `b0: boolean`, `res_n`

Types

:   A type defines a set of values along with the operations (or functions) that
    can be performed on them. Data types can be categorized as primitive or
    compound. Primitive types represent basic values, while compound types,
    such as arrays, tuples, and lists, are constructed using other types. For
    instance, an array is always an array of a specific type.

    In our pseudocode, we sometimes use type variables to indicate that a
    compound data type is parameterized by another type. For example, `list<A>`
    represents a list containing elements of some type A. To distinguish type
    variables, we use capital letters.

    Examples: the primitive type `int` or `bool`, or the compound type `array<bool>`

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
Compound data types, however, are created by combining primitive types.
Many programming languages provide built-in compound types, such as arrays and tuples, while also allowing users to define their own, using constructs like classes or algebraic data types.
The next sections introduce the data types that we use in this book.

#### Primitive data types {-}

We use the following primitive data types:

- **boolean**: This data type has only two possible values: `true` and `false`.
  It supports logical operations such as conjunction (AND), disjunction (OR),
  exclusive OR (XOR), and negation.
- **int**: Represents whole numbers. Unless specified otherwise, we assume
  integers of arbitrary size, though in some cases, we may use fixed-size
  integers (32-bit or 64-bit), which will be explicitly stated. Standard
  arithmetic operations, such as addition, multiplication, and integer division,
  are supported.
- **float**: Represents floating-point numbers with limited precision, which
  depends on the programming language and, in some cases, the underlying
  computer architecture. It supports common operations like addition,
  subtraction, multiplication, and division.
- **char**: Represents individual characters. Unless otherwise specified, we
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

    function addOne(input: array<int>) -> array<int>:
        output = new array<int>[input.length]
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

    a = new array<int>[3]
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
In this sense, strings behave like values, similar to integers or booleans.
While you can access individual characters using indexing, you cannot change them.
Any modification, such as concatenation or replacement, results in the creation of a new string rather than altering the original one.
Because strings are internally represented as arrays, operations like concatenation and comparison are not constant-time and may involve overhead depending on the string length.

#### Tuples and records

::: TODO
- what do we assume about tuples / records?
- python has tuples, records are dicts (or dataclasses)
- java doesn't have either
- how about key/value-pairs?
:::


### Classes and objects

::: TODO
What we assume you know:
- class and instance
- interface == abstract class
- constructor
- instance variable and method
- this/self

Should we treat "dataclasses" special? I.e., can we have a Python-inspired simple format:
```
class Node<Value>
    value: Value
    left: Node
    right: Node
```
instead of using a constructor:
```
class Node<Value>
    constructor(value, left, right):
        this.value = value
        this.left = left
        this.right = right
```

What you don't need to know:
- multiple inheritance
- class variables, class methods, static methods
- difference between interface and abstract class
- referring to the superclass, calling the super instance
:::

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
