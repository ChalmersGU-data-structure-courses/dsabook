
## Mathematical preliminaries

This chapter presents the mathematical and programming preliminaries assumed to be familiar to the reader.
It serves as a review and reference, allowing you to revisit relevant sections when encountering unfamiliar notation or mathematical techniques in later chapters.
If you're comfortable with these preliminaries, you can safely skip ahead to the next section.

### Sets

The concept of a set in the mathematical sense has wide application in computer science.
The notations and techniques of set theory are commonly used when describing and implementing algorithms because the abstractions associated with sets often help to clarify and simplify algorithm design.

A [set]{.term} is a collection of distinguishable [members <member>]{.term} or [elements <element>]{.term}.
The members are typically drawn from some larger population known as the [base type]{.term}.
Each member of a set is either a [primitive element]{.term} of the base type or is a set itself.
There is no concept of duplication in a set.
Each value from the base type is either in the set or not in the set.
For example, a set named $\mathbf{P}$ might consist of the three integers 7, 11, and 42.
In this case, $\mathbf{P}$'s members are 7, 11, and 42, and the base type is integer.

The following table shows the symbols commonly used to express sets and their relationships.

$$
\begin{array}{l|l}
\{1, 4\}& \mbox{A set composed of the members 1 and 4}\\
\{\mathsf{x}\, |\, \mathsf{x}\ \mbox{is a positive integer}\}&
    \mbox{A set definition using a set comprehension (e.g., the set of all positive integers)}\\
\mathsf{x} \in \mathbf{P}&\mathsf{x}\ \mbox{is a member of set}\ \mathbf{P}\\
\mathsf{x} \notin \mathbf{P}&\mathsf{x}\ \mbox{is not a member of set}\ \mathbf{P}\\
\emptyset&\mbox{The null or empty set}\\
|\mathbf{P}|& \mbox{Cardinality: size of set}\ \mathbf{P}
            \mbox{or number of members for set}\ \mathbf{P}\\
\mathbf{P}\,\subseteq\,\mathbf{Q},
\mathbf{Q}\,\supseteq\,\mathbf{P}&
\mbox{Set}\ \mathbf{P}\ \mbox{is included in set}\ \mathbf{Q},\\
&\qquad \mbox{set}\ \mathbf{P}\ \mbox{is a subset of set}\ \mathbf{Q},\\
&\qquad \mbox{set}\ \mathbf{Q}\ \mbox{is a superset of set}\ \mathbf{P}\\
\mathbf{P}\,\cup\,\mathbf{Q}	&
\mbox{Set Union: all elements appearing in}
\ \mathbf{P}\ \mbox{OR}\ \mathbf{Q}\\
\mathbf{P}\,\cap\,\mathbf{Q}	&
\mbox{Set Intersection: all elements appearing in}\ \mbox{P}
\ \mbox{AND}\ \mathbf{Q}\\
\mathbf{P}\,-\,\mathbf{Q} &
\mbox{Set difference: all elements of set}
\ \mathbf{P}\ \mbox{NOT in set}\ \mathbf{Q}\\
\mathbf{P}\,\times\,\mathbf{Q} &
\mbox{Set (Cartesian) Product: yields a set of ordered pairs}\\
\end{array}
$$

Here are some examples of this notation in use.
First define two sets, $\mathbf{P}$ and $\mathbf{Q}$.

$$
\mathbf{P} = \{2, 3, 5\}, \qquad \mathbf{Q} = \{5, 10\}.
$$

$|\mathbf{P}| = 3$ (because $\mathbf{P}$ has three members) and $|\mathbf{Q}| = 2$
(because $\mathbf{Q}$ has two members).
Both of these sets are finite in length.
Other sets can be infinite, for example, the set of integers.

The union of $\mathbf{P}$ and $\mathbf{Q}$, written $\mathbf{P} \cup \mathbf{Q}$, is the set of elements in either $\mathbf{P}$ or $\mathbf{Q}$, which is {2, 3, 5, 10}.
The intersection of $\mathbf{P}$ and $\mathbf{Q}$, written $\mathbf{P} \cap \mathbf{Q}$, is the set of elements that appear in both $\mathbf{P}$ and $\mathbf{Q}$, which is {5}.
The set difference of $\mathbf{P}$ and $\mathbf{Q}$, written $\mathbf{P} - \mathbf{Q}$, is the set of elements that occur in $\mathbf{P}$ but not in
$\mathbf{Q}$, which is {2, 3}.
Note that $\mathbf{P} \cup \mathbf{Q} = \mathbf{Q} \cup \mathbf{P}$ and that $\mathbf{P} \cap \mathbf{Q} = \mathbf{Q} \cap \mathbf{P}$, but in general $\mathbf{P} - \mathbf{Q} \neq \mathbf{Q} - \mathbf{P}$.
In this example, $\mathbf{Q} - \mathbf{P}  = \{10\}$.
Finally, the set {5, 3, 2} is indistinguishable from set $\mathbf{P}$, because sets have no concept of order.
Likewise, set {2, 3, 2, 5} is also indistinguishable from $\mathbf{P}$, because sets have no concept of duplicate elements.

The [set product]{.term} or [Cartesian product]{.term} of two sets $\mathbf{Q} \times \mathbf{P}$ is a set of ordered pairs.
For our example sets, the set product would be:

$$
\{(2, 5),\ (2, 10),\ (3, 5),\ (3, 10),\ (5, 5),\ (5, 10)\}.
$$

The [powerset]{.term} of a set $\mathbf{S}$ (denoted $2^S$) is the set of all possible subsets for $\mathbf{S}$.
Consider the set $\mathbf{S} = \{ a, b, c \}$. The powerset of $\mathbf{S}$ is

$$
\{ \emptyset,\ \{a\},\ \{b\},\ \{c\},\ \{a, b\},
\ \{a, c\},\ \{b, c\},\ \{a, b, c\}\}.
$$

A collection of elements without a specific order, similar to a set, but allowing multiple occurrences of each element, is called a [bag]{.term}.
A bag is also called a multiset and an element that occurs multipel times is called a duplicate.
A bag is also known as a multiset and an element that appears more than once is called a duplicate.
<!--
To distinguish bags from sets, we will use square brackets [] around a bag's elements.
For example, bag [3, 4, 5, 4] is distinct from bag [3, 4, 5], while set {3, 4, 5, 4} is indistinguishable from set {3, 4, 5}.
However, bag [3, 4, 5, 4] is indistinguishable from bag [3, 4, 4, 5].
-->

A [sequence]{.term} is an ordered collection of elements of the same type that may include duplicates.
A sequence can for example be implemented as a list, an array, or a vector.
We can access elements in a sequence using zero-based indexing, where the index 0 refers to the first element, 1 to the second, and so on.
We will use square brackets $\lbrack\rbrack$ to enclose the elements of a sequence.
For example, $\lbrack3, 4, 5, 4\rbrack$ is a sequence.
Note that sequence $\lbrack3, 5, 4, 4\rbrack$ is distinct from sequence $\lbrack3, 4, 5, 4\rbrack$, and both are distinct from sequence $\lbrack3, 4, 5\rbrack$.

### Relations

A [relation]{.term} $R$ over set $\mathbf{S}$ is a set of ordered pairs from $\mathbf{S}$.
As an example of a relation, if $\mathbf{S}$ is $\{a, b, c\}$, then

$$
\{ (a, c), (b, c), (c, b) \}
$$

is a relation, and

$$
\{ (a, a), (a, c), (b, b), (b, c), (c, c) \}
$$

is a different relation.
If tuple $(x, y)$ is in relation $R$, we may use the infix notation $xRy$.
We often use relations, such as the less than operator ($<$), on the natural numbers, which includes ordered pairs such as $(1, 3)$ and $(2, 23)$, but not $(3, 2)$ or $(2, 2)$.
Rather than writing the relationship in terms of ordered pairs, we typically use an infix notation for such relations, writing $1<3$.

Define the properties of relations as follows, with $R$ a binary relation over set $\mathbf{S}$.

* $R$ is [reflexive]{.term} if $aRa$ for all $a \in \mathbf{S}$.

* $R$ is [irreflexive]{.term} if $aRa$ is not true for all $a \in \mathbf{S}$.

* $R$ is [symmetric]{.term} if whenever $aRb$, then $bRa$, for all $a, b \in \mathbf{S}$.

* $R$ is [antisymmetric]{.term} if whenever $aRb$ and $bRa$, then $a = b$, for all $a, b \in \mathbf{S}$.

* $R$ is [transitive]{.term} if whenever $aRb$ and $bRc$, then $aRc$, for all $a, b, c \in \mathbf{S}$.

As examples, for the natural numbers, $<$ is irreflexive (because $aRa$ is never true), antisymmetric (because there is no case where $aRb$ and
$bRa$), and transitive.
Relation $\leq$ is reflexive, antisymmetric, and transitive.
Relation $=$ is reflexive, symmetric (and antisymmetric!), and transitive.
For people, the relation "is a sibling of" is symmetric and transitive.
If we define a person to be a sibling of themself, then it is reflexive; if we define a person not to be a sibling of themself, then it is not reflexive.

<!--
.. avembed:: Exercises/Background/SetTFrelation.html ka
   :long_name: Relations Exercise
-->

#### Equivalence Relations {-}

$R$ is an [equivalence relation]{.term} on set $\mathbf{S}$ if it is reflexive, symmetric, and transitive.
An equivalence relation can be used to partition a set into [equivalence classes <equivalence class>]{.term}.
If two elements $a$ and $b$ are equivalent to each other, we write $a \equiv b$.
A [partition]{.term} of a set $\mathbf{S}$ is a collection of subsets that are [disjoint]{.term} from each other and whose union is $\mathbf{S}$.
An [equivalence relation]{.term} on set $\mathbf{S}$ partitions the set into disjoint subsets whose elements are equivalent.
The [Union-Find <Union-find> <UnionFind>]{.term} algorithm efficiently maintains equivalence classes on a set.

::: topic
#### Example {-}
For the integers, $=$ is an equivalence relation that partitions each element into a distinct subset.
In other words, for any integer $a$, three things are true.

1. $a = a$,

2. if $a = b$ then $b = a$, and

3. if $a = b$ and $b = c$, then $a = c$.

Of course, for distinct integers $a$, $b$, and $c$ there are never cases where $a = b$, $b = a$, or $b = c$.
So the requirements for symmetry and transitivity are never violated, and therefore the relation is symmetric and transitive.
:::

<!--
::: topic
#### Example {-}
If we clarify the definition of sibling to mean that a person is
a sibling of themself, then the sibling relation is an
equivalence relation that partitions the set of people.
:::

::: topic
#### Example {-}
We can use the [modulus <MiscMath>]{.term} function
to define an equivalence relation.
For the set of integers, use the modulus function
to define a binary relation such that two numbers
$x$ and $y$ are in the relation if and only if
$x \;\mathrm{mod}\; m = y \;\mathrm{mod}\; m$.
Thus, for $m = 4$, $\langle1, 5\rangle$ is in the
relation because $1 \;\mathrm{mod}\; 4 = 5 \;\mathrm{mod}\; 4$.
We see that modulus used in this way defines an equivalence
relation on the integers, and this relation can be used to
partition the integers into $m$ equivalence classes.
This relation is an equivalence relation because

1. $x \;\mathrm{mod}\; m = x \;\mathrm{mod}\; m$ for all $x$;

2. if $x \;\mathrm{mod}\; m = y \;\mathrm{mod}\; m$,
    then $y \;\mathrm{mod}\; m = x \;\mathrm{mod}\; m$; and

3. if $x \;\mathrm{mod}\; m = y \;\mathrm{mod}\; m$ and
    $y \;\mathrm{mod}\; m = z \;\mathrm{mod}\; m$, then
    $x \;\mathrm{mod}\; m = z \;\mathrm{mod}\; m$.
:::

-->

<!--
.. avembed:: Exercises/Background/SetTFequivrel.html ka
   :long_name: Equivalence Exercise
-->

#### Partial Orders {-}

A binary relation is called a [partial order]{.term} if it is antisymmetric and transitive.
If the relation is reflexive, it is called a [non-strict partial order]{.term}.
If the relation is [irreflexive]{.term}, it is called a [strict partial order]{.term}.
The set on which the partial order is defined is called a [partially ordered set]{.term} or a [poset]{.term}.
Elements $x$ and $y$ of a set are [comparable]{.term} under a given relation $R$ if either $xRy$ or $yRx$.
If every pair of distinct elements in a partial order are comparable, then the order is called a [total order]{.term} or [linear order]{.term}.

::: topic
#### Example {-}
For the integers, relations $<$ and $\leq$ define partial orders.
Operation $<$ is a total order because, for every pair of integers $x$ and $y$ such that $x \neq y$, either $x < y$ or $y < x$.
Likewise, $\leq$ is a total order because, for every pair of integers $x$ and $y$ such that $x \neq y$, either $x \leq y$ or $y \leq x$.
:::

::: topic
#### Example {-}
For the powerset of the integers, the subset operator defines a partial order (because it is antisymmetric and transitive).
For example, $\{1, 2\}\subseteq\{1, 2, 3\}$.
However, sets {1, 2} and {1, 3} are not comparable by the subset operator, because neither is a subset of the other.
Therefore, the subset operator does not define a total order on the powerset of the integers.
:::

<!--
.. avembed:: Exercises/Background/SetTFpartialorder.html ka
   :long_name: PartialOrder Exercise
-->

### Miscellaneous notations

We now define several mathematical terms and concepts, providing a reference for future use.

**Units of measure:**
We will use the following notation for units of measure.
"B" will be used as an abbreviation for bytes, "b" for bits, "KB" for kilobytes $(2^{10} = 1024$ bytes), "MB" for megabytes $(2^{20}$ bytes) "GB" for gigabytes $(2^{30}$ bytes) and "ms" for milliseconds (a millisecond is 1/1000 of a second).
Spaces are not placed between the number and the unit abbreviation when a power of two is intended.
Thus a disk drive of size 25 gigabytes (where a gigabyte is intended as $2^{30}$ bytes) will be written as "25GB".
Spaces are used when a decimal value is intended.
An amount of 2000 bits would therefore be written "2 Kb" while "2Kb" represents 2048 bits.
2000 milliseconds is written as 2000 ms.
Note that in this book large amounts of storage are nearly always measured in powers of two and times in powers of ten.

<!--
**Factorial function:**
The [factorial]{.term} function, written $n!$ for $n$ an
integer greater than 0, is the product of
the integers between 1 and $n$, inclusive.
Thus, $5! = 1 \cdot 2 \cdot 3 \cdot 4 \cdot 5 = 120$.
As a special case, $0! = 1$.
The factorial function grows quickly as $n$ becomes larger.
Because computing the factorial function directly is a time-consuming
process, it can be useful to have an equation that provides a
good approximation.
Stirling's approximation states that
$n! \approx \sqrt{2\pi n}(\frac{n}{e})^n$,
where $e \approx 2.71828$
($e$ is the base for the system of natural logarithms) [#]_.
Thus we see that while $n!$ grows
slower than $n^n$ (because $\sqrt{2\pi n}/e^n < 1$),
it grows faster than $c^n$ for any positive integer constant
$c$.

::: note
The symbol "$\approx$" means "approximately equal."
:::
-->

**Permutations:**
A [permutation]{.term} of a sequence $\mathbf{S}$ is simply the members of $\mathbf{S}$ arranged in some order.
For example, a permutation of the integers 1 through $n$ would be those values arranged in some order.
If the sequence contains $n$ distinct members, then there are $n!$ different permutations for the sequence.
This is because there are $n$ choices for the first member in the permutation; for each choice of first member there are $n-1$ choices for the second member, and so on.
Sometimes one would like to obtain a [random permutation]{.term} for a sequence, that is, one of the $n!$ possible permutations is selected in such a way that each permutation has equal probability of being selected.

<!--
A simple function for generating a random permutation is as
follows.
Here, the $n$ values of the sequence are stored in
positions 0 through $n-1$ of array $A$,
function $swap(A, i, j)$
exchanges elements $i$ and $j$ in array $A$,
and $Random(n)$ returns an integer value in the range 0 to
$n-1$.

```java
// Randomly permute the values in array A
public static void permute(Object[] A) {
  for (int i = A.length; i > 0; i--)   // for each i
    Swap.swap(A, i-1, random(i));      //   swap A[i-1] with a random
}                                      //   position in the range 0 to i-1.
```
-->

**Logic Notation:**
We will occasionally make use of the notation of symbolic logic.

- $A \Rightarrow B$ means "if $A$ then $B$" -- i.e., that $A$ implies $B$.
- $A \Leftrightarrow B$ means "$A$ if and only if $B$" -- i.e., that $A$ and $B$ are equivalent.
- $A \vee B$ means "$A$ or $B$" -- the disjunction of $A$ and $B$.
- $A \wedge B$ means "$A$ and $B$" -- the conjunction of $A$ and $B$.
- $\neg A$ means "not $A$" -- the negation of $A$.

**Floor and ceiling:**
The [floor]{.term} of $x$ (written $\lfloor x \rfloor$) takes real value $x$ and returns the greatest integer $\leq x$.
For example, $\lfloor 3.4 \rfloor = 3$, as does $\lfloor 3.0 \rfloor$, while $\lfloor -3.4 \rfloor = -4$ and $\lfloor -3.0 \rfloor = -3$.
The [ceiling]{.term} of $x$ (written $\lceil x \rceil$) takes real value $x$ and returns the least integer $\geq x$.
For example, $\lceil 3.4 \rceil = 4$, as does $\lceil 4.0 \rceil$, while $\lceil -3.4 \rceil = \lceil -3.0 \rceil = -3$.

**Modulus function:**
The [modulus]{.term} (or [mod]{.term}) function returns the remainder of an integer division.
Sometimes written $n \;\mathrm{mod}\; m$ in mathematical expressions, the syntax in many programming languages is $n % m$.
From the definition of remainder, $n \;\mathrm{mod}\; m$ is the integer $r$ such that $n = qm + r$ for $q$ an integer, and $|r| < |m|$.
Therefore, the result of $n \;\mathrm{mod}\; m$ must be between 0 and $m-1$ when $n$ and $m$ are positive integers.
For example, $5 \;\mathrm{mod}\; 3 = 2$; $25 \;\mathrm{mod}\; 3 = 1$, $5 \;\mathrm{mod}\; 7 = 5$, and $5 \;\mathrm{mod}\; 5 = 0$.

There is more than one way to assign values to $q$ and $r$, depending on how integer division is interpreted.
The most common mathematical definition computes the mod function as $n \;\mathrm{mod}\; m = n - m\lfloor n/m\rfloor$.
In this case, $-3 \;\mathrm{mod}\; 5 = 2$.
However, Java and C++ compilers typically use the underlying processor's machine instruction for computing integer arithmetic.
On many computers this is done by truncating the resulting fraction, meaning $n \;\mathrm{mod}\; m = n - m (\mathrm{trunc}(n/m))$.
Under this definition, $-3 \;\mathrm{mod}\; 5 = -3$.
Another language might do something different.

Unfortunately, for many applications this is not what the user wants or expects.
For example, many [hash systems <hash system> <HashFunc>]{.term} will perform some computation on a record's [key]{.term} value and then take the result modulo the hash table size.
The expectation here would be that the result is a legal index into the hash table, not a negative number.
Implementers of hash functions must either ensure that the result of the computation is always positive, or else add the hash table size to the result of the modulo function when that result is negative.

### Logarithms

The [logarithm]{.term} of base $b$ for value $y$ is the power to which $b$ is raised to get $y$.
Normally, this is written as $\log_b y = x$.  Thus, if $\log_b y = x$ then $b^x = y$, and $b^{log_b y} = y$.

Logarithms are used frequently by programmers.
Here are two typical uses.

::: topic
##### Example {-}
Many programs require an encoding for a collection of objects.
What is the minimum number of bits needed to represent $n$ distinct code values?
The answer is $\lceil \log_2 n \rceil$ bits.
For example, if you have 1000 codes to store, you will require at least $\lceil \log_2 1000 \rceil = 10$ bits to have 1000 different codes (10 bits provide 1024 distinct code values).
:::

::: topic
##### Example {-}
Consider the [binary search <binary search> <AnalProgram>]{.term} algorithm for finding a given value within an array sorted by value from lowest to highest.
Binary search first looks at the middle element and determines if the value being searched for is in the upper half or the lower half of the array.
The algorithm then continues splitting the appropriate subarray in half until the desired value is found.
How many times can an array of size \(n\) be split in half until only one element remains in the final subarray?
The answer is $\lceil \log_2 n \rceil$ times.
:::

Nearly all logarithms we use have a base of two.
This is because data structures and algorithms most often divide things in half, or store codes with binary bits.
Whenever you see the notation $\log n$, either $\log_2 n$ is meant or else the term is being used asymptotically and so the actual base does not matter.
For logarithms using any base other than two, we will show the base explicitly.

Logarithms have the following properties, for any positive values of $m$, $n$, and $r$, and any positive integers $a$ and $b$.

1) $\log (nm) = \log n + \log m$.

2) $\log (n/m) = \log n - \log m$.

3) $\log (n^r) = r \log n$.

4) $\log_a n = \log_b n / \log_b a$.

The first two properties state that the logarithm of two numbers multiplied (or divided) can be found by adding (or subtracting) the logarithms of the two numbers.
Property (3) is simply an extension of property (1).
Property (4) tells us that, for variable $n$ and any two integer constants $a$ and $b$, $\log_a n$ and $\log_b n$ differ by the constant factor $\log_b a$, regardless of the value of $n$.
Most runtime analyses we use are of a type that ignores constant factors in costs.
Property (4) says that such analyses need not be concerned with the base of the logarithm, because this can change the total cost only by a constant factor.

A useful identity to know is:

$$
2^{\log n} = n
$$

To give some intuition for why this is true: What does it mean to take the log (base 2) of $n$?
If $\log_2 n = x$, then $x$ is the power to which you need to raise 2 to get back to $n$.
So of course, $2^{\log n} = n$ when the base of the log is 2.

When discussing logarithms, exponents often lead to confusion.
Property (3) tells us that $\log n^2 = 2 \log n$.
How do we indicate the square of the logarithm (as opposed to the logarithm of $n^2$)?
This could be written as $(\log n)^2$, but it is traditional to use $\log^2 n$.
On the other hand, we might want to take the logarithm of the logarithm of $n$.
This is written $\log \log n$.

A special notation is used in the rare case when we need to know how many times we must take the log of a number before we reach a value $\leq 1$.
This quantity is written $\log^* n$.
For example, $\log^* 1024 = 4$ because $\log 1024 = 10$, $\log 10 \approx 3.33$, $\log 3.33 \approx 1.74$, and $\log 1.74 < 1$, which is a total of 4 log operations.

<!--
::: note
These properties are the idea behind the slide rule.
Adding two numbers can be viewed as joining two lengths
together and measuring their combined length.
Multiplication is not so easily done.
However, if the numbers are first converted to the lengths of
their logarithms, then those lengths can be added and the
inverse logarithm of the resulting length gives the answer for
the multiplication (this is simply logarithm property (1)).
A slide rule measures the length of the logarithm for the
numbers, lets you slide bars representing these lengths to add
up the total length, and finally converts this total length to
the correct numeric answer by taking the inverse of the
logarithm for the result.
:::

Here is some practice with manipulating logarithms.

.. avembed:: Exercises/Background/MathLogSumm.html ka
   :long_name: Logarithms Practice Questions
 -->

### Summations

Most programs contain loop constructs.
When analyzing running time costs for programs with loops, we need to add up the costs for each time the loop is executed.
This is an example of a [summation]{.term}.
Summations are simply the sum of costs for some function applied to a range of parameter values.
Summations are typically written with the following "Sigma" notation:

$$
\sum_{i=1}^{n} f(i).
$$

This notation indicates that we are summing the value of $f(i)$ over some range of (integer) values.
The parameter to the expression and its initial value are indicated below the $\sum$ symbol.
Here, the notation $i=1$ indicates that the parameter is $i$ and that it begins with the value 1.
At the top of the $\sum$ symbol is the expression $n$.
This indicates the maximum value for the parameter $i$.
Thus, this notation means to sum the values of $f(i)$ as $i$ ranges across the integers from 1 through $n$.
This can also be written $f(1) + f(2) + \cdots + f(n-1) + f(n)$.
Within a sentence, Sigma notation is typeset as $\sum_{i=1}^{n} f(i)$.

Given a summation, you often wish to replace it with an algebraic equation with the same value as the summation.
This is known as a [closed-form solution]{.term}, and the process of replacing the summation with its closed-form solution is known as solving the summation.
For example, the summation $\sum_{i=1}^{n} 1$ is simply the expression "1" summed $n$ times (remember that $i$ ranges from 1 to $n$).
Because the sum of $n$ ones is $n$, the closed-form solution is $n$.

Here are explanations about the closed form solutions of two summations that you will see many times in this book.
Since this appears so often, it will help you later if you can get comfortable with it.


<inlineav id="SummationOneToNCON" src="AlgAnal/SummationOneToNCON.js" name="AlgAnal/SummationOneToNCON" links="AlgAnal/SummationOneToNCON.css"/>

<inlineav id="SummationTwoPowerICON" src="AlgAnal/SummationTwoPowerICON.js" name="AlgAnal/SummationTwoPowerICON" links="AlgAnal/SummationTwoPowerICON.css"/>

<!--
.. inlineav:: SummationOneToNCON ss
   :long_name: Summation of the first N Integers visualization
   :links: AV/Background/SummationOneToNCON.css
   :scripts: AV/Background/SummationOneToNCON.js
   :output: show

.. inlineav:: SummationTwoPowerICON ss
   :long_name: Summation Two Power I visualization
   :links: AV/Background/SummationTwoPowerICON.css
   :scripts: AV/Background/SummationTwoPowerICON.js
   :output: show
-->

Here is a list of useful summations, along with their closed-form solutions.

$$
\begin{eqnarray}
\sum_{i = 1}^{n} i &=& \frac{n (n+1)}{2} \\
\sum_{i = 1}^{n} i^2 &=& \frac{2 n^3 + 3 n^2 + n}{6} = \frac{n(2n + 1)(n + 1)}{6} \\
\sum_{i = 1}^{\log n} n &=& n \log n \\
\sum_{i = 0}^\infty a^i &=& \frac{1}{1-a}\ \text{for} \ 0 < a < 1 \\
\sum_{i = 0}^{n} a^i &=& \frac{a^{n+1} - 1}{a - 1}\ \text{for} \ a \neq 1
\end{eqnarray}
$$

As special cases to the last summation, we have the following two:

$$
\begin{eqnarray}
\sum_{i = 1}^{n} \frac{1}{2^i} &=& 1 - \frac{1}{2^n} \\
\sum_{i = 0}^{n} 2^i &=& 2^{n+1} - 1 \\
\end{eqnarray}
$$

As a corollary to the previous summation:

$$
\begin{eqnarray}
\sum_{i = 0}^{\log n} 2^i &=& 2^{\log n + 1} - 1 = 2n - 1
\end{eqnarray}
$$

Finally:

$$
\begin{eqnarray}
\sum_{i = 1}^{n} \frac{i}{2^i} &=& 2 - \frac{n+2}{2^n}
\end{eqnarray}
$$

<!--
The sum of reciprocals from 1 to $n$, called the [Harmonic Series]{.term} and written $\mathcal{H}_n$, has a value between $\log_e n$ and $\log_e n + 1$.
To be more precise, as $n$ grows, the summation grows closer to

$$
\mathcal{H}_n \approx \log_e n + \gamma + \frac{1}{2n},
$$

where $\gamma$ is Euler's constant and has the value 0.5772...

Most of these equalities can be proved easily by a
[proof by induction <Proofs>]{.term}.
Unfortunately, induction does not help us derive a closed-form
solution.
Induction only confirms when a proposed closed-form solution is
correct.
-->

<!-- Moved to chapter 7, section about Recurrence relations
### Recurrence Relations

The running time for a recursive algorithm is most easily expressed by a recursive expression because the total time for the recursive algorithm includes the time to run the recursive call(s).
A [recurrence relation]{.term} defines a function by means of an expression that includes one or more (smaller) instances of itself.
A classic example is the recursive definition for the factorial function:

$$
n! = (n-1)! \cdot n\ \mbox{for}\ n>1; \quad 1! = 0! = 1.
$$

Another standard example of a recurrence is the Fibonacci sequence:

$$
\mbox{Fib}(n) = \mbox{Fib}(n-1) + \mbox{Fib}(n-2)\ \mbox{for}\ n>2;
\quad\mbox{Fib}(1) = \mbox{Fib}(2) = 1.
$$

From this definition, the first seven numbers of the Fibonacci sequence are

$$
1, 1, 2, 3, 5, 8,\ \mbox{and}\ 13.
$$

Notice that this definition contains two parts: the general definition for $\mbox{Fib}(n)$ and the base cases for $\mbox{Fib}(1)$ and $\mbox{Fib}(2)$.
Likewise, the definition for factorial contains a recursive part and base cases.

Recurrence relations are often used to model the cost of recursive functions.
For example, the number of multiplications required by a recursive version of the factorial function for an input of size $n$ will be zero when $n = 0$ or $n = 1$ (the base cases), and it will be one plus the cost of calling $fact$ on a value of $n-1$.
This can be defined using the following recurrence:

$$
\mathbf{T}(n) = \mathbf{T}(n-1) + 1\ \mbox{for}\ n>1;
\quad \mathbf{T}(0) = \mathbf{T}(1) = 0.
$$

As with summations, we typically wish to replace the recurrence relation with a closed-form solution.
One approach is to expand the recurrence by replacing any occurrences of $\mathbf{T}$ on the right-hand side with its definition.

We will go deeper into recurrence relations when we analyse the complexity of divide-and-conquer algorithms.
-->

<!--
.. inlineav:: LinearRecurrencesCON ss
   :long_name: Linear Recurrences Slideshow
   :links: AV/Background/LinearRecurrencesCON.css
   :scripts: AV/Background/LinearRecurrencesCON.js
   :output: show
-->

<!--
A slightly more complicated recurrence is

$$
\mathbf{T}(n) = \mathbf{T}(n-1) + n; \quad \mathbf{T}(1) = 1.
$$
-->

<!--
Again, we will use expansion to help us find a closed form solution.

.. inlineav:: LinearRecurrencesNCON ss
   :long_name: Linear Recurrences Slideshow (n)
   :links: AV/Background/LinearRecurrencesNCON.css
   :scripts: AV/Background/LinearRecurrencesNCON.js
   :output: show
-->

### Mathematical proof techniques

Solving any problem has two distinct parts: the investigation and the argument.
Students are too used to seeing only the argument in their textbooks and lectures.
But to be successful in school (and in life after school), one needs to be good at both, and to understand the differences between these two phases of the process.
To solve the problem, you must investigate successfully.
That means engaging the problem, and working through until you find a solution.
Then, to give the answer to your client (whether that "client" be your instructor when writing answers on a homework assignment or exam, or a written report to your boss), you need to be able to make the argument in a way that gets the solution across clearly and succinctly.
The argument phase involves good technical writing skills and the ability to make a clear, logical argument.

Being conversant with standard proof techniques can help you in this process.
Knowing how to write a good proof helps in many ways.
First, it clarifies your thought process, which in turn clarifies your explanations.
Second, if you use one of the standard proof structures such as proof by contradiction or an induction proof, then both you and your reader are working from a shared understanding of that structure.
That makes for less complexity to your reader to understand your proof, because the reader need not decode the structure of your argument from scratch.

This section briefly introduces three commonly used proof techniques:

1) deduction, or direct proof,

2) proof by contradiction, and

3) proof by mathematical induction.

<!-- .. index:: ! proof; direct -->

In general, a [direct proof]{.term} is just a "logical explanation".
A direct proof is sometimes referred to as an argument by deduction.
This is simply an argument in terms of logic.

 **Direct Proof**

Many direct proofs are written in English with words such as "if ... then".
In this case logic notation such as $P \Rightarrow Q$ can often help express the proof.
Even if we don't wish to use symbolic logic notation, we can still take advantage of fundamental theorems of logic to structure our arguments.
For example, if we want to prove that $P$ and $Q$ are equivalent, we can first prove $P \Rightarrow Q$ and then prove $Q \Rightarrow P$.

In some domains, proofs are essentially a series of state changes from a start state to an end state.
Formal predicate logic can be viewed in this way, with the various "rules of logic" being used to make the changes from one formula or combining a couple of formulas to make a new formula on the route to the destination.
Symbolic manipulations to solve integration problems in introductory calculus classes are similar in spirit, as are high school geometry proofs.

:::: {#SumDirect}
::: topic
##### Example {-}
Here is a direct proof that $\sum_{i=1}^n i = (n+1)n/2$.
If we take the first and last terms of the series, since they are 1 and $n$, of course they sum to $n+1$.
If we take the second term and next-to-last term, since they are 2 and $n-1$, they also sum to $n+1$.
Likewise for the third term and third-from-the-end term.
We can go on and pair up terms like this, such that there are $n/2$ pairs that each sum to $n+1$, for a total sum of $(n+1)n/2$.
You can check for yourself that this is true even if $n$ is odd (and so the middle value of the series has no partner).
:::
::::
<!-- .. index:: ! proof; by contradiction -->

**Proof by Contradiction**

The simplest way to *disprove* a theorem or statement is to find a counter-example to the theorem.
Unfortunately, no number of examples supporting a theorem is sufficient to prove that the theorem is correct.
However, there is an approach that is vaguely similar to disproving by counter-example, called [proof by contradiction]{.term}.
To prove a theorem by contradiction, we first *assume* that the theorem is *false*.
We then find a logical contradiction stemming from this assumption.
If the logic used to find the contradiction is correct, then the only way to resolve the contradiction is to recognize that the assumption that the theorem is false must be incorrect.
That is, we conclude that the theorem must be true.

::: topic
##### Example {-}
Here is a simple proof by contradiction.

**Theorem:** There is no largest integer.

**Proof by contradiction:**

**Step 1. Contrary assumption:**
Assume that there *is* a largest integer.
Call it $B$ (for "biggest").

**Step 2. Show this assumption leads to a contradiction:**
Consider $C = B + 1$.
$C$ is an integer because it is the sum of two integers.
Also, $C > B$, which means that $B$ is not the largest integer after all.
Thus, we have reached a contradiction.
The only flaw in our reasoning is the initial assumption that the theorem is false.
Thus, we conclude that the theorem is correct.
:::

A related proof technique is [proving the contrapositive]{.term}.
We can prove that $P \Rightarrow Q$ by proving $(\mathrm{not}\ Q) \Rightarrow (\mathrm{not}\ P)$.
This technique works because the [truth table]{.term} for the two logical statements are the same.

<!-- .. index:: ! proof; by induction -->

**Proof by Mathematical Induction**

Mathematical induction can be used to prove a wide variety of theorems.
Induction also provides a useful way to think about algorithm design, because it encourages you to think about solving a problem by building up from simple subproblems.
Induction can help to prove that a recursive function produces the correct result.
Understanding recursion is a big step toward understanding induction, and vice versa, since they work by essentially the same process.

Within the context of algorithm analysis, one of the most important uses for mathematical induction is as a method to test a hypothesis.
When [seeking a closed-form solution <closed-form solution> <Summation>]{.term} for a [summation]{.term} or [recurrence <recurrence relation>]{.term}, we might first guess or otherwise acquire evidence that a particular formula is the correct solution.
If the formula is indeed correct, it is often an easy matter to prove that fact with an induction proof.

Let **Thrm** be a theorem to prove, and express **Thrm** in terms of a positive integer parameter $n$.
Mathematical induction states that **Thrm** is true for any value of parameter $n$ (for $n \geq c$, where $c$ is some constant) if the following two conditions are true:

1. [Base Case]{.term}: **Thrm** holds for $n = c$, and

2. [Induction Step]{.term}:
   If **Thrm** holds for $n - 1$, then **Thrm** holds for $n$.

Proving the base case is usually easy, typically requiring that some small value such as 1 be substituted for $n$ in the theorem and applying simple algebra or logic as necessary to verify the theorem.
Proving the induction step is sometimes easy, and sometimes difficult.
Proving induction step (in conjunction with verifying the base case) yields a satisfactory proof by mathematical induction.

<!--
An alternative formulation of the induction step is known as [strong induction]{.term}.
The induction step for strong induction is:

2a. **Induction Step:**
    If **Thrm** holds for all $k, c \leq k < n$, then
    **Thrm** holds for $n$.

Proving either variant of the induction step (in conjunction with verifying the base case) yields a satisfactory proof by mathematical induction.
-->

The two conditions that make up the induction proof combine to demonstrate that **Thrm** holds for $n=2$ as an extension of the fact that **Thrm** holds for $n=1$.
This fact, combined again with condition (2), indicates that **Thrm** also holds for $n=3$, and so on.
Thus, **Thrm** holds for all values of $n$ (larger than the base cases) once the two conditions have been proved.

What makes mathematical induction so powerful (and so mystifying to most people at first) is that we can take advantage of the *assumption* that **Thrm** holds for all values less than $n$ as a tool to help us prove that **Thrm** holds for $n$.
This is known as the [induction hypothesis]{.term}.
Having this assumption to work with makes the induction step easier to prove than tackling the original theorem itself.
Being able to rely on the induction hypothesis provides extra information that we can bring to bear on the problem.

Recursion and induction have many similarities.
Both are anchored on one or more base cases.
A recursive function relies on the ability to call itself to get the answer for smaller instances of the problem.
Likewise, induction proofs rely on the truth of the induction hypothesis to prove the theorem.
The induction hypothesis does not come out of thin air.
It is true if and only if the theorem itself is true, and therefore is reliable within the proof context.
Using the induction hypothesis to do work is exactly the same as using a recursive call to do work.

:::: {#SumIEx}
::: topic
##### Example {-}
Here is a sample proof by mathematical induction.
Call the sum of the first $n$ positive integers $\mathbf{S}(n)$.

**Theorem:** $\mathbf{S}(n) = n(n+1)/2$.

**Proof:**
The proof is by mathematical induction.

1. **Check the base case.**
    For $n = 1$, verify that $\mathbf{S}(1) = 1(1+1)/2$.
    $\mathbf{S}(1)$ is simply the sum of the first positive
    number, which is 1.
    Because $1(1+1)/2 = 1$, the formula is correct for the base
    case.

2. **State the induction hypothesis.**
    The induction hypothesis is

    $$
    \mathbf{S}(n-1) = \sum_{i=1}^{n-1} i =
    \frac{(n-1)((n-1)+1)}{2} = \frac{(n-1)(n)}{2}.
    $$

3. **Use the assumption from the induction hypothesis for**
    $n-1$ **to show that the result is true for** $n$.
    The induction hypothesis states that
    $\mathbf{S}(n-1) =  (n-1)(n)/2$,
    and because $\mathbf{S}(n) = \mathbf{S}(n-1) + n$,
    we can substitute for $\mathbf{S}(n-1)$ to get

    $$
    \begin{eqnarray}
    \sum_{i=1}^n i &=& \left(\sum_{i=1}^{n-1} i\right) + n
                        = \frac{(n-1)(n)}{2} + n\\
                    &=&\frac{n^2 - n + 2n}{2} = \frac{n(n+1)}{2}.
    \end{eqnarray}
    $$

    Thus, by mathematical induction,

    $$
    \mathbf{S}(n) = \sum_{i=1}^n i = n(n+1)/2.
    $$
:::
::::

Note carefully what took place in this example.
First we cast $\mathbf{S}(n)$ in terms of a smaller occurrence of the problem: $\mathbf{S}(n) = \mathbf{S}(n-1) + n$.
This is important because once $\mathbf{S}(n-1)$ comes into the picture, we can  use the induction hypothesis to replace $\mathbf{S}(n-1)$ with $(n-1)(n)/2$.
From here, it is simple algebra to prove that $\mathbf{S}(n-1) + n$ equals the right-hand side of the original theorem.

<!--
We can compare the induction proof of Example [Example](#SumIEx)
with the direct proof in Example [Example](#SumDirect).
Different people might think one is easier to understand than the
other, but certainly the writer of the direct proof version had
to discover an insight unique to that problem that might
not be helpful or relevant when proving other summations.

:::: {#nOdds}
::: topic
##### Example {-}
Here is another simple proof by induction that illustrates
choosing the proper variable for induction.
We wish to prove by induction that the sum of the first $n$
positive odd numbers is $n^2$.
First we need a way to describe the $n$'th odd number, which is
simply $2n - 1$.
This also allows us to cast the theorem as a summation.

**Theorem:**
$\sum_{i=1}^n (2i - 1) = n^2$.

**Proof:**
The base case of $n = 1$ yields $1 = 1^2$, which is
true.
The induction hypothesis is

$$
\sum_{i=1}^{n-1} (2i - 1) = (n-1)^2.
$$

We now use the induction hypothesis to show that the theorem
holds true for $n$.
The sum of the first $n$ odd numbers is simply the sum of the
first $n-1$ odd numbers plus the $n$'th odd number.
In the second line below, we will use the induction hypothesis to
replace the partial summation (shown in brackets in the first line)
with its closed-form solution.
After that, algebra takes care of the rest.

$$
\begin{eqnarray}
\sum_{i=1}^n (2i - 1) &=& \left[ \sum_{i=1}^{n-1} (2i - 1) \right] + 2n - 1\\
                        &=& [(n-1)^2] + 2n - 1\\
                        &=& n^2 - 2n + 1 + 2n - 1\\
                        &=& n^2.
\end{eqnarray}
$$

Thus, by mathematical induction,

$$
\sum_{i=1}^n (2i - 1) = n^2.
$$
:::
::::
-->

:::: {#FactRecurProof}
::: topic
##### Example {-}
This example shows how we can use induction to prove that a proposed
closed-form solution for a recurrence relation is correct.

**Theorem:**
The recurrence relation
$\mathbf{T}(n) = \mathbf{T}(n-1) + 1; \quad \mathbf{T}(1) = 0$
has closed-form solution $\mathbf{T}(n) = n - 1$.

**Proof:**
To prove the base case, we observe from the definition that
$\mathbf{T}(2) = \mathbf{T}(1) + 1 = 0 + 1 = 1$.
From the proposed closed-form solution we get
$\mathbf{T}(2) = 2 - 1 = 1$, which matches the definition.

The induction hypothesis is that $\mathbf{T}(n-1) = n-2$.
Combining the definition of the recurrence with the induction
hypothesis, we see immediately that

$$
\mathbf{T}(n) = \mathbf{T}(n-1) + 1 = n-2 + 1 = n-1
$$

for $n > 1$.
Thus, we have proved the theorem correct by mathematical induction.
:::
::::

<!--
:::: {#ThmStamps}
::: topic
##### Example {-}
This example uses induction without involving summations or other
equations.
It also illustrates a more flexible use of base cases.

**Theorem:**
2 cent and 5 cent stamps can be used to form any value
(for values $\geq 4$).

**Proof:**
The theorem defines the problem for values $\geq 4$
because it does not hold for the values 1 and 3.
Using 4 as the base case, a value of 4 cents can be made from two
2 cent stamps.
The induction hypothesis is that a value of $n-1$ can be
made from some combination of 2 cent and 5 cent stamps.
We now use the induction hypothesis to show how to get the value
$n$ from 2 cent and 5 cent stamps.
Either the makeup for value $n-1$ includes a 5 cent stamp,
or it does not.
If so, then replace a 5 cent stamp with three 2 cent stamps.
If not, then the makeup must have included at least two 2 cent
stamps (because it is at least of size 4 and contains only 2 cent
stamps).
In this case, replace two of the 2 cent stamps with a single
5 cent stamp.
In either case, we now have a value of n made up of
2 cent and 5 cent stamps.
Thus, by mathematical induction, the theorem is correct.
:::
::::

::: topic
##### Example {-}
Here is an example using strong induction.

**Theorem:**
For $n > 1, n$ is divisible by some prime number.

**Proof:**
For the base case, choose $n = 2$.
2 is divisible by the prime number 2.
The induction hypothesis is that *any* value $a, 2 \leq a < n$,
is divisible by some prime number.
There are now two cases to consider when proving the theorem for
$n$.
If $n$ is a prime number, then $n$ is divisible by itself.
If $n$ is not a prime number, then $n = a \times b$
for $a$ and $b$, both integers less than $n$ but
greater than 1.
The induction hypothesis tells us that $a$ is divisible by some
prime number.
That same prime number must also divide $n$.
Thus, by mathematical induction, the theorem is correct.
:::

Our next example of mathematical induction proves a theorem from
geometry.
It also illustrates a standard technique of induction proof where we
take $n$ objects and remove some object to use the
induction hypothesis.
-->

<!--
.. _TwoColor:
.. inlineav:: twoColorCON dgm
   :links: AV/Background/twoColorCON.css
   :scripts: AV/Background/twoColorCON.js
   :align: center

   A two-coloring for the regions formed by three lines in the plane.
-->

<!--
:::: {#ThmRegion}
::: topic
##### Example {-}
Define a [two-coloring]{.term} for a
set of regions as a way of assigning one of two colors to each region
such that no two regions sharing a side have the same color.
For example, a chessboard is two-colored.
Figure [Figure](#TwoColor) shows a two-coloring for the plane
with three lines.
We will assume that the two colors to be used are black and white.

**Theorem:**
The set of regions formed by $n$ infinite lines in the plane
can be two-colored.

**Proof:**

.. inlineav:: TwoColoringProofCON ss
    :long_name: Two Coloring Proof Slideshow
    :links: AV/Background/TwoColoringProofCON.css
    :scripts: AV/Background/TwoColoringProofCON.js
    :output: show

:::
::::

Compare the proof in Example [Example](#ThmRegion) with that in
Example [Example](#ThmStamps).
For Example [Example](#ThmStamps), we took a collection of stamps of
size $n-1$ (which, by the induction hypothesis, must have the
desired property) and from that "built" a collection of size $n$
that has the desired property.
We therefore proved the existence of *some* collection of stamps
of size $n$ with the desired property.

For Example [Example](#ThmRegion) we must prove that *any*
collection of $n$ lines has the desired property.
Thus, our strategy is to take an *arbitrary* collection of
$n$ lines, and "reduce" it so that we have a set of lines that
must have the desired property because it matches the induction
hypothesis.
From there, we merely need to show that reversing the original
reduction process preserves the desired property.

In contrast, consider what is required if we attempt to
"build" from a set of lines of size $n-1$ to one of size
$n$.
We would have great difficulty justifying that *all* possible
collections of $n$ lines are covered by our building process.
By reducing from an arbitrary collection of $n$ lines to
something less, we avoid this problem.

Another advantage to thinking in terms of "reducing from $n$"
rather than "building up from $n-1$" is that reducing is more
like what we do when we write a recursive function.
In recursion, we would naturally compute some
function of $n$ by calling the function (recursively) on
$n-1$ and then using the result to compute the value for
$n$.
-->

<!--
This section's final example shows how induction can be used to prove that a recursive function produces the correct result.

::: topic
##### Example {-}
We would like to prove that function $fact$ does indeed compute the factorial function.
There are two distinct steps to such a proof.
The first is to prove that the function always terminates.
The second is to prove that the function returns the correct value.

**Theorem:**
Function $fact$ will terminate for any value of $n$.

**Proof:**
For the base case, we observe that $fact$ will terminate directly whenever $n \leq 0$.
The induction hypothesis is that $fact$ will terminate for $n-1$.
For $n$, we have two possibilities.
One possibility is that $n \geq 12$.
In that case, $fact$ will terminate directly because it will fail its assertion test.
Otherwise, $fact$ will make a recursive call to $fact(n-1)$.
By the induction hypothesis, $fact(n-1)$ must terminate.

**Theorem:**
Function $fact$ does compute the factorial function for any value
in the range 0 to 12.

**Proof:**
To prove the base case, observe that when $n=0$ or
$n=1$, $fact(n)$ returns the correct value of 1.
The induction hypothesis is that $fact(n-1)$ returns the correct
value of $(n-1)!$.
For any value $n$ within the legal range, $fact(n)$ returns
$n *$ $fact(n-1)$.
By the induction hypothesis, $fact(n-1)$ $= (n-1)!$,
and because $n * (n-1)! = n!$, we have proved that $fact(n)$
produces the correct result.
:::

We can use a similar process to prove many recursive programs correct.
The general form is to show that the base cases perform correctly, and
then to use the induction hypothesis to show that the recursive step
also produces the correct result.
Prior to this, we must prove that the function always terminates,
which might also be done using an induction proof.
-->

### Estimation

The concept of [estimation]{.term} might be unfamiliar to many readers.
Estimation is not a mathematical technique, but rather a general engineering skill.
This is sometimes known as "back of the napkin" or "back of the envelope" calculation.
Both nicknames suggest that only a rough estimate is produced.
It is very useful to computer scientists doing design work, because any proposed solution whose estimated resource requirements fall well outside the problem’s resource constraints can be discarded immediately, allowing time for greater analysis of more promising solutions.

[Estimation]{.term} techniques are a standard part of engineering curricula but are often neglected in computer science.
Estimation is no substitute for rigorous, detailed analysis of a problem, but it can help to decide when a rigorous analysis is warranted: If the initial estimate indicates that the solution is unworkable, then further analysis is probably unnecessary.

Estimation can be formalized by the following three-step process:

1. Determine the major parameters that affect the problem.

2. Derive an equation that relates the parameters to the problem.

3. Select values for the parameters, and apply the equation to yield an
   estimated solution.

When doing estimations, a good way to reassure yourself that the estimate is reasonable is to do it in two different ways.
In general, if you want to know what comes out of a system, you can either try to estimate that directly, or you can estimate what goes into the system (assuming that what goes in must later come out).
If both approaches (independently) give similar answers, then this should build confidence in the estimate.

When calculating, be sure that your units match.
For example, do not add feet and pounds.
Verify that the result is in the correct units.
Always keep in mind that the output of a calculation is only as good as its input.
The more uncertain your valuation for the input parameters in Step 3, the more uncertain the output value.
However, back of the envelope calculations are often meant only to get an answer within an order of magnitude, or perhaps within a factor of two.
Before doing an estimate, you should decide on acceptable error bounds, such as within 25\%, within a factor of two, and so forth.
Once you are confident that an estimate falls within your error bounds, leave it alone!
Do not try to get a more precise estimate than necessary for your purpose.

::: topic
##### Example {-}
How many library bookcases does it take to store books containing one million pages?
I estimate that a 500-page book requires one inch on the library shelf (it will help to look at the size of any handy book), yielding about 200 feet of shelf space for one million pages.
If a shelf is 4 feet wide, then 50 shelves are required.
If a bookcase contains 5 shelves, this yields about 10 library bookcases.
To reach this conclusion, I estimated the number of pages per inch, the width of a shelf, and the number of shelves in a bookcase.
None of my estimates are likely to be precise, but I feel confident that my answer is correct to within a factor of two.
(After writing this, I went to Virginia Tech's library and looked at some real bookcases.
They were only about 3 feet wide, but typically had 7 shelves for a total of 21 shelf-feet.
So I was correct to within 10% on bookcase capacity, far better than I expected or needed.
One of my selected values was too high, and the other too low, which canceled out the errors.)
:::

::: TODO
Maybe have the the doubling technique here?
:::

<!--
::: topic
##### Example {-}
Is it more economical
to buy a car that gets 20 miles per gallon, or one that gets 30 miles
per gallon but costs \\$3000 more?
The typical car is driven about 12,000 miles per year.
If gasoline costs \\$3/gallon, then the yearly gas bill is
\\$1800 for the less efficient car and \\$1200 for the more
efficient car.
If we ignore issues such as the payback that would be received if we
invested \\$3000 in a bank, it would take 5 years to make up the
difference in price.
At this point, the buyer must decide if price is the only criterion and
if a 5-year payback time is acceptable.
Naturally, a person who drives more will make up the difference more
quickly, and changes in gasoline prices will also greatly affect the
outcome.
:::

::: topic
##### Example {-}
When at the supermarket doing the week's shopping, can you estimate
about how much you will have to pay at the checkout?
One simple way is to round the price of each item to the nearest
dollar, and add this value to a mental running total as you put the
item in your shopping cart.
This will likely give an answer within a couple of dollars of the true
total.
:::
-->

<!--
### Chapter Summary Questions

Here are some practice questions for the sections in this chapter.

.. avembed:: Exercises/Background/MathBgSumm.html ka
   :long_name: Math Background Summary Questions
 -->

### Random Numbers

The success of randomized algorithms depends on having access to a good random number generator.
While modern compilers are likely to include a random number generator that is good enough for most purposes, it is helpful to understand how they work, and to even be able to construct your own in case you don't trust the one provided.
This is easy to do.

First, let us consider what a random sequence is.
From the following list, which appears to be a sequence of "random" numbers?

* 1, 1, 1, 1, 1, 1, 1, 1, 1, ...
* 1, 2, 3, 4, 5, 6, 7, 8, 9, ...
* 2, 7, 1, 8, 2, 8, 1, 8, 2, ...

In fact, all three happen to be the beginning of a some sequence in which one could continue the pattern to generate more values (in case you do not recognize it, the third one is the initial digits of the irrational constant $e$).
Viewed as a series of digits, ideally every possible sequence has equal probability of being generated (even the three sequences above).
In fact, definitions of randomness generally have features such as:

* One cannot predict the next item better than by guessing.
* The series cannot be described more briefly than simply listing it out.
  This is the [equidistribution property]{.term}.

There is no such thing as a random number sequence, only "random enough" sequences.
A sequence is [pseudo random]{.term} if no future term can be predicted in polynomial time, given all past terms.

Most computer systems use a deterministic algorithm to select pseudorandom numbers.
The most commonly used approach historically is known as the [Linear Congruential Method]{.term} (LCM).
The LCM method is quite simple.
We begin by picking a [seed]{.term} that we will call $r(1)$.
Then, we can compute successive terms as follows.

$$
r(i) = (r(i-1)\times b) \;\mathrm{mod}\; t
$$

where $b$ and $t$ are constants.

By definition of the $\;\mathrm{mod}\;$ function, all generated numbers must be in the range 0 to $t-1$.
Now, consider what happens when $r(i) = r(j)$ for values $i$ and $j$.
Of course then $r(i+1) = r(j+1)$ which means that we have a repeating cycle.

Since the values coming out of the random number generator are between 0 and $t-1$, the longest cycle that we can hope for has length $t$.
In fact, since $r(0) = 0$, it cannot even be quite this long.
It turns out that to get a good result, it is crucial to pick good values for both $b$ and $t$.
To see why, consider the following example.

::: topic
##### Example {-}
Given a $t$ value of 13, we can get very different results depending on the $b$ value that we pick, in ways that are hard to predict.

$r(i) = 6r(i-1) \;\mathrm{mod}\; 13 \quad = \quad ..., 1, 6, 10, 8, 9, 2, 12, 7, 3, 5, 4, 11, 1, ...$

$r(i) = 7r(i-1) \;\mathrm{mod}\; 13 \quad = \quad ..., 1, 7, 10, 5, 9, 11, 12, 6, 3, 8, 4, 2, 1, ...$

$r(i) = 5r(i-1) \;\mathrm{mod}\; 13 \quad = \quad ..., 1, 5, 12, 8, 1, ...$

In the case of $b=5$, the generator goes through only a short sequence before repeating, with the series depending on the seed value chosen.
Clearly, a $b$ value of 5 is far inferior to $b$ values of 6 or 7 in this example.
:::

If you would like to write a simple LCM random number generator of your own, an effective one can be made with the following formula:

$$
r(i) = 16807 r(i-1) \;\mathrm{mod}\; 2^{31} - 1.
$$

::: note
Another approach is based on using a computer chip that generates random numbers resulting from "thermal noise" in the system.
Time will tell if this approach replaces deterministic approaches.
:::
