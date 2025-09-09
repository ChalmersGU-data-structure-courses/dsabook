
## Converting objects to table indices

::: TODO
- Prio 2: write missing parts: other strategies, invariants, conflicts
:::

We want to be able to build hash tables for any kind of object -- be it a string, a complex datatype of persons, or an x-ray image.
But we (i.e., the ones implementing the hash table) do not know which kind of object the user (i.e., the one using the hash table) wants to put in their hash table.
Therefore the easiest is to *delegate* the implementation of the hash function to the object itself.
By this we mean that every datatype (strings, persons, x-ray images) should have a designated method that turns a specific object into an integer, just as for the Person datatype we showed in the end of the last section:

    datatype Person:
        firstName: String
        middleName: String
        lastName: String

        hashCode() -> Integer:
            code = 0
            for part in (firstName, middleName, lastName):
                code = p*code + part.hashCode()
            return code

This is a very common strategy in many programming languages -- e.g., in Java this designated method is called exactly `hashCode()`, and in Python it is called `__hash__()`.


### Compressing a hash code

Internally, a hash table is an array of a fixed length, say $m$, and each of these $m$ slots represent a bucket which contains some objects.
The hash function should help us by telling in which bucket we should search for the given object.

Now, the problem is that the datatypes and objects have no idea how large the internal array is, i.e., which array index they should return.
Instead, the only thing that the `hashCode()` method can do is to return an arbitrary integer.
So, how can we solve this dilemma?

The solution is to implement a function that transforms an arbitrary hash code into an array index.
This is called *compression* -- we compress the arbitrary integer that is the hash code into an array index $0\leq i<m$.

Therefore, computing the hash table index for a given object is a two-step process:

1. First calculate the hash code which is an arbitrary integer -- this is calculated by the object itself.
2. Then compress the hash code into a table index $0\leq i<m$ -- this is calculated by an internal function in the hash table.


### Modular compression

The simplest way to compress a hash code $h\geq 0$ into a table index $i$, is to take $h$ **modulo** the array size $m$:

$$
i = h \mod m
$$

This is called *modular compression* and is the most common compression method.

::: dsvis
Here is an interactive explanation of modular compression.

``` {.jsav-animation src="Hashing/hashFuncExCON1.js" name="Hash Function Slideshow 1"}
```
:::

Recall that it is common to use an integer as its own hash code.
Now we see that this is not the full picture, because the integer will then be compressed into the internal array of the hash table.
Assume that we have an integer hash table of sixteen slots -- then the combined hash function will be the same as the modular compression:

    function hash(n):
        return n % 16

Note that the values 0 to 15 can be represented with four bits (i.e.,
0000 to 1111). The value returned by this hash function depends solely
on the least significant four bits of the key. Because these bits are
likely to be poorly distributed (as an example, a high percentage of the
keys might be even numbers, which means that the low order bit is zero),
the result will also be poorly distributed. This example shows that the
size of the table $m$ can have a big effect on the performance of a hash system.

One way to get a better distribution is to always let the size $m$ of the internal array be a prime number.


### Negative hash codes

However, in general integers are signed, so the method
`hashCode()` might return a negative integer. If we take this modulo
$m$, we might get a negative result. A negative index is not suitable as
a table index, so first we have to make the hash code positive.

One way to do this is to mask off the sign bit.
Most programming languages use integers in the range $-2^{31}\leq h<2^{31}$.
In these cases we can e.g. use `h & 0x7fffffff` to make the hash code positive.

    function compress(h):
        h = h & 0x7fffffff
        return h % m


### The hash code never changes

The generic hash codes should never change, because hashing must be
predictable. Therefore we don't have to recalculate the hash code when
we resize the internal table, it is only the table indices that have to
be updated.

One implication of this is that it's only meaningful to calculate hash
codes for *immutable objects*, i.e., objects that don't change (after
they are initialised).
Many programming languages make a difference between *tuples* and *lists*, where the latter are *mutable*.
This means that we can add elements to and remove from lists, but we cannot do that with tuples.
Once the tuple is initialised we cannot change it -- and therefore we can use a tuple as an object in a hash table.

Python uses this fact to optimise their built-in hash tables by storing
the hash codes together with the keys and values. This increases the
size of the table slightly, but on the other hand it ensures that hash
codes are not calculated more than once.

In Java, the optimisation is delegated to the object classes themselves.
E.g., a Java string only calculates its hash code once and then stores
it in an instance variable for immediate lookup.

<!--
### Invariants
-->


### Handling collisions

So far we have talked about how to calculate an array index for an arbitrary object.
One thing we haven't discussed yet is what we should do if two two different objects get assigned the same slots in the table.

Assume that we have an internal array of size $m=16$, and we use modular compression like above.
Then every 16th integer will get the same array index, such as the integers 7, 23, 39, 55, etc.

So, one very important question is how to handle *collision*, i.e., when two objects want to occupy the same slot.
There are two main approaches to this, two *collision resolution strategies*:

Separate chaining
: The internal array contains pointers to *collections* of objects -- it could be linked lists, self-balancing trees, or some other suitable data structure.

Open addressing
: The internal array contains the objects themselves. Collisions are handled by *probing* the array -- i.e., searching through the table to find an empty slot.

Both of these are common -- e.g., the Java standard library implements a separate chaining hash table, while the Python sets and dictionaries are implemented using open addressing hash tables.

We will start by describing separate chaining hash tables in @sec:separate-chaining, and then continue with open addressing in @sec:open-addressing.
