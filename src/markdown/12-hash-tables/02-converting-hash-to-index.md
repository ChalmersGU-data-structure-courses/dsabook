
## Converting objects to table indices

::: TODO
- Prio 2: write missing parts: other strategies, invariants, conflicts
:::

### Hash codes are not table indices

Now, we want to be able to calculate a table index for any kind of
object. How can we do this? Most languages (including Java and Python),
delegate this to the different classes themselves, so that strings can
decide how to hash strings, and x-ray images can decide how to hash
x-ray images. This is done by requiring a class to implement a hash
method (called `hashCode()` in Java, and `__hash__()` in Python).

    class Person:
        Person(first, last):
            this.firstName = first
            this.lastName = last

        hashCode():
            return this.firstName.hashCode() + this.lastName.hashCode()


Now, the problem is that these classes have no idea how large the
internal hash table should be, i.e., which interval $0\ldots M-1$ they
should return. The solution is to divide the hash function in two:

-   one that returns an integer: $0\leq h < 2^{32}$
-   and another that transforms (*compresses*) the hash code $h$ to an
    index $0\leq i< M$

The first function is provided by the object class itself, and the
second is calculated by the hash table.

### Compressing the hash code

To compress a hash code $h\geq 0$ into a table indes $i$, we can take
$h$ modulo the array size $M$: $i = h \; \% \; M$. This is called
*modular hashing* and is the most common compression method.

### Modular hashing

Consider the following hash function used to hash integers to a table of
sixteen slots.

    function hashInt(x):
        return x % 16


Here "%" is the symbol for the [mod] function.

<inlineav id="hashFuncExCON1" src="Hashing/hashFuncExCON1.js" name="Hash Function Slideshow 1"/>

Recall that the values 0 to 15 can be represented with four bits (i.e.,
0000 to 1111). The value returned by this hash function depends solely
on the least significant four bits of the key. Because these bits are
likely to be poorly distributed (as an example, a high percentage of the
keys might be even numbers, which means that the low order bit is zero),
the result will also be poorly distributed. This example shows that the
size of the table $M$ can have a big effect on the performance of a hash
system because the table size is typically used as the modulus to ensure
that the hash function produces a number in the range 0 to $M-1$.

### Other compression strategies


### Negative hash codes

However, in Java and Python, integers are signed, so the method
`hashCode()` might return a negative integer. If we take this modulo
$M$, we might get a negative result. A negative index is not suitable as
a table index, so first we have to make the hash code positive.

One way to do this is to mask off the sign bit.
Most programming languages use integers in the range $-2^{31}\ldots h<2^{31}$.
In these cases we can e.g. use `hashCode & 0x7fffffff` to make the hash code positive.
(Python and some other languages use arbitrary size integers, but it works fine to
truncate them to 31 bits as we do here).

    class SeparateChainingHashMap implements Map:
        ...
        hash(key):
            h = key.hashCode() & 0x7fffffff
            return h % this.bins.size()

### The hash code never changes

The generic hash codes should never change, because hashing must be
predictable. Therefore we don't have to recalculate the hash code when
we resize the internal table, it is only the table indices that have to
be updated.

One implication of this is that it's only meaningful to calculate hash
codes for *immutable objects*, i.e., objects that don't change (after
they are initialised). (That's why Python allows tuples as dictionary
keys, but not lists).

Python uses this fact to optimise their built-in hash tables by storing
the hash codes together with the keys and values. This increases the
size of the table slightly, but on the other hand it ensures that hash
codes are not calculated more than once.

In Java, the optimisation is delegated to the object classes themselves.
E.g., a Java string only calculates its hash code once and then stores
it in an instance variable for immediate lookup.

### Invariants


### Handling conflicts

::: TODO
- What do we do if two elements have the same hash value?
- Two main approaches: separate chaining and open addressing
- (Bucket hashing is not very common)
:::

