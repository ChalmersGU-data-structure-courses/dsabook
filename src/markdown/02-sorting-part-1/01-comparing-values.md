
## Comparing values {#sorting-1:comparing}

::: TODO
- Prio 2: Shorten a bit. We want to get to the actual algorithms a bit quicker.
:::

Sorting algorithms, and many other algorithms in this book, rely on being able to compare values.
By changing which comparison function is used, we can use the same sorting algorithm to sort
in many ways in different applications, such as numbers in ascending order, numbers in descending order,
words in alphabetical order.
The comparison function needs to distinguish three cases, for two values $a$ and $b$:

- $a$ is less than $b$, written $a < b$.
- $b$ is less than $a$, written as $b<a$.
- neither of the above, written as $a=b$.

The notation for the last is slightly dubious: the values are not necessarily equal,
they just have the same order. Suppose we are sorting numbers by the sums of our digits, in
our comparison function $13=22$, since both have a digit sum of $1+3=2+2=4$.
Also, $a<b$ may not correspond intuitively to the mathematical operator. To sort a list
of number in descending order, we would use a comparison function that paradoxically
considers lesser numbers to be greater and vice versa.

There are some requirements on the comparison function used. Mathematically, we would call
$<$ a *partial order*. The most important property is *transitivity*:
if $a<b$ and $b<c$, it follows that $a<c$.
If transitivity does not hold, the the sorting algorithms will not work,
and the concept of sorting becomes hard to even define (in which order would you place
$a$, $b$, and $c$ if $a<b<c<a$?).


#### Natural and Key-based comparison

Most comparison operators fall into on of three categories:

Natural order
:   Simple types like numbers have a *natural order*, in most programming
    languages we can simply write $a<b$ to compute a boolean result that is
    true if a is less than b.

Key-based comparison
:   Often we want to sort objects by a *key*, such as sorting books by publishing
    year or author, or sorting people by age or name. In an object oriented language,
    the comparison used would be `book1.year < book2.year` or such.

Virtual key comparison
:   A variant of key-based comparison where keys are not explicitly stored in an
    object, but calculated on demand. A common example is comparing strings
    *case-insensitively*, ignoring if a letter is uppercase or lowercase.
    The comparison would be `toLower(s1) < toLower(s2)`, so each comparison
    performs a conversion to lowercase before a regular string comparison.

#### Comparisons in programming languages

Most programming languages have built in comparison operators for numbers and
other simple data types, that is you can write $a<b$ and compute a boolean result.
Some languages (like Python) have a mechanism to generalise this to more complex
types, so you can write $a<b$ even for text strings and other objects,
and it uses a default comparison function defined for the type.

Some languages (like Java) instead use a *three-way comparison* operator,
so that `compare(a,b)` gives one of three values, representing $a<b$, $a=b$ and $b<a$.
In Java and many other languages, the comparison gives an integer value k,
such that if $k<0$ then $a<b$, if $k>0$ then $a>b$, and if $k=0$ then $a=b$.
This is potentially more efficient than checking the cases individually,
but the code can become less readable.

In this book we will usually use the binary comparison operators when describing algorithms.
Not because we think that is a better way of writing algorithms, but because the
pseudocode becomes easier to read.
