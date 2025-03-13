
## Programming preliminaries

### Pseudocode

::: TODO
- show pseudocode for each introduced term below
:::

There is a difference between knowing a programming language and understanding programming itself. The ultimate goal of studying data structures and algorithms is to develop programming skills, regardless of the language used.

To keep our examples accessible, this book uses pseudocode rather than a specific programming language like Python or Java.
Pseudocode provides a structured yet informal way to describe algorithms, focusing on logic and flow without strict syntax rules.
Its simplicity and use of common programming constructs, such as loops and conditionals, make it easy to understand and translate into actual code.
The pseudocode in this book is designed to be straightforward to convert into real programming languages.
We will demonstrate this translation for Python, Java, and Haskell.

In the following sections, we will introduce fundamental programming concepts and, where applicable, specify the pseudocode conventions we use.
For example, the following function written in pseudocode calculates the factorial of $n$:

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

<!--
::: TODO
- Python-specific details: no fixed-size ints, chars == strings, doesn't distinguish between int and float
:::
-->

#### Strings {-}

A string is an immutable sequence of characters, meaning that once defined (e.g., `str = "data"`), it cannot be modified.
In this sense, strings behave like values, similar to integers or booleans.
While you can access individual characters using indexing, you cannot change them.
Any modification, such as concatenation or replacement, results in the creation of a new string rather than altering the original one.
Because strings are internally represented as arrays, operations like concatenation and comparison are not constant-time and may involve overhead depending on the string length.

#### Arrays

::: TODO
- shorten this section (perhaps move some to the sorting intro)
- Have to know the size and type in advance
- 0-based indexing
- Cannot resize
- Pseudocode for creating, looking up, setting, etc
- Python-specific detail: no real arrays
- Slicing is not a primitive - we will not use it
:::

*Arrays* are one of the fundamental data structures in programming.
This is because they are natively supported by the computer,
and have good performance: reading or writing an element of the array
takes very little time. Many important algorithms use arrays.

::: note
*Note to Python programmers*: in Python, arrays are called *lists*,
and are written like this: `[1,2,3]`. There is one difference
between arrays and Python lists: in most programming languages, any
given array has a fixed size. However, Python lists can change in
size -- for example, the `append` method adds a new element to the
list, increasing its size. In this chapter, we will work with arrays
that have a fixed size. Python lists are so-called
[dynamic arrays](#dynamic-array-based-lists).
:::

In this chapter we will study two algorithmic problems and how to solve
them efficiently using arrays:

Searching
:   Given a list of items, check if a given item is present
    in the list. There are two kinds of search problems:

    *Membership testing*: The search algorithm is given an item to search for,
    and should return *true* or *false* depending on whether the item
    is found. For example, a spellchecker: given a list of all
    valid English words, search the list for a given string.

    *Lookup*: The items are typically objects, and each object has a field
    called the *key*. The search algorithm is given a key, and
    should return the item having that key (or a reference to
    the item, such as the position in the list). For example,
    a database: given a list of people, find the person having
    a given personal identity number.

Sorting
:   Given a list of items, put them in ascending order.
    Again, there are two kinds of sorting problems:

    *Natural sorting*: Here, the items have some kind of natural order.
    For example, sorting a list of words in alphabetical order.

    *Key-based sorting*: Here, each item has a *key*, and we want to
    sort the items so that the keys come in ascending order.
    For example, sorting a list of towns by population.

Note that if we search or sort according to a *key*, it doesn't have to
be explicitly stored in the object, but can instead be calculated on
demand. E.g., if we want to sort a list of words case-insensitively, we
can use a lower-case transformation when doing the comparisons. This is
usually done by a [comparator]{.term} (in Java), or by a
[key function](https://docs.python.org/3/howto/sorting.html#key-functions)
(in Python).

This chapter concentrates on *membership testing* and *natural sorting*,
but all the algorithms in this chapter work just as well for *lookup*
and *key-based sorting*.

#### Array slices

::: TODO
- don't use slicing = copying
- instead: use a range (start, end)
- discussion: should 'end' point to the last element or the one after
    - (how do we do in this book?)
:::

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
