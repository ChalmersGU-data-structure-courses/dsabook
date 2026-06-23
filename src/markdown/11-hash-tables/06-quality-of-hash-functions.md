
## Quality of hash functions {#hash-tables:hash-quality}

::: TODO
- Discuss why we want primes in Horner's method: gives best distribution
:::

Implementations of hash tables typically do not include the hash functions,
those are instead written by the developers of the key class.
Built in classes like text strings typically have high quality hash functions,
but user defined types require user defined hash functions.
There is one required and several desirable properties of these hash functions:

Preserves equality
: This is the only absolute requirement: that equal values have equal hash codes.
  Essentially, all values that should be considered the same key
  in our hash tables need to have the same hash code. What this means
  in practice in languages like Java or Python is that if you modify
  how to compare objects for equality, you also need to modify their hash functions.
  Neglecting to do this will mean that a hash table can contain multiple
  copies of logically identical elements.

Uniform distribution
: This means that all possible values should distribute evenly among all possible hash codes.
  Or in other words, if you take two random values, it should be very very unlikely that they have the same hash code.

Independence
: This means in essence that it should not be possible to guess the hash code of a value
  if you know the hash code of a similar value.
  Or in other words, if the keys $x$ and $y$ are very similar,
  and you happen to know $h(x)$, then you should not be able to guess $h(y)$.

Efficiency
: Hashing needs to be fast. Every time a lookup is performed,
  a value gets hashed, and every time a hash table is resized all keys must
  be rehashed as well. The computational cost of hashing can easily
  eclipse the cost of searching the table. One way of mitigating this,
  especially for resizing, is to *cache* the result of hashing:
  The first time $h(x)$ is called we store the calculated hash code inside $x$,
  and in subsequent calls we can return the hash code directly without calculating.

Designing good hash functions is hard, and there are many pitfalls where
two perfectly reasonable-looking hash functions give wildly different
performance characteristics for hash tables.
Generally, a good hash function behaves
somewhat chaotically, any small change in a value tends to result
in a drastic change in its hash value.

Consider this hash function for strings: take the character codes of all
characters and sum them up. For two randomly selected strings, this function
tends to have different values, but the small and somewhat common modification
of swapping two characters around does not result in a different hash code.
For something like a database of thousands of anagrams of the same string,
all strings would have the same hash codes.

There is an even more subtle issue with the propsed hash function.
Suppose we have a hash table with millions of email adresses as keys
(so strings with a few hundred characters at most).
Even if the strings tend to have distinct characters,
every string will have a combined character code values below
a hundred thousand or so. In a linear probing hash table with
capacity for tens of millions of strings, all strings will form a huge cluster
at the start of the table, killing lookup performance.
The hash codes are poorly distributed over the whole range of integers.

<!--
Even more subtle, some hash functions might mesh poorly with certain strategies
for hash table resizing. Consider if we start with size 1, and then double.
The hash
-->

### A good hash function for strings

We want a hash function where both the character code and postion of each character affects the result.
One way of doing that is by this sum (where $s_k$ is the character code at position $k$ in the string):

$s_0\cdot 31^{n-1} + s_1\cdot 31^{n-2} + ... + s_{n-2}\cdot 31^1 + s_{n-1}\cdot 31^0$

We multiply every character code by a distinct power of 31, based on its postion.
Swapping the positions of two distinct characters will almost certainly result
in a different hash code.
We can compute this hash code efficiently using Horner's method:

    hash(str):
        h = 0
        for each char in str:
            h = 31 * h + characterCode(char)
        return h

Note how the multiplication of the old hash value by 31 distributes over the sum, increasing all previous
exponents by 1. This hash function has several advantages:

* It is quite fast, performing just a multiplication and an addition for each character.
* It yields large numbers even for short strings. 31 is a five bit number, so
  repeated multiplication quickly overflows a 32 bit integer.
  Integer overflow is the same as taking modulo $2^32$, which improves *distribution*.
* A small change in any character of a string will tend to have a drastic impact on the hash code,
  which is good for *independence*.

Other values for the base (instead of 31) are possible. 37 is another popular choice.
The important thing is that it is a prime number.

Using 32 on the other hand, would be devastating,
completely ruining performance of hash tables in many common situations.
The subtle reason for this is that $32^k \equiv 0 \pmod{2^{32}}$ for every $k \geq 7$.
That means for a longer string, all terms in the sum except the last seven would be 0.
In programmer terms, multiplying by 32 is a shift operation that will remove five
bits of information from the hash code.
The end result is that the hash code will only depend on the last
7 or so characters of any string.
Imagine what that would do to our email database,
where most of the keys end with "ail.com", and thus get the same hash code.

Horner's method is a popular way of hashing most types of compound objects.
If we have a class with three instance variables $a$, $b$ and $c$, then we
would have $h(x) = (h(x.a)\cdot 31 + h(x.b))\cdot 31 + h(x.c)$.

There is much more to be said about writing hash functions, including technicalities
of how to do it in various programming languages, but what we have demonstrated here
is that although hashing is very easy in principle (just chop the value up into a number)
there are plenty of pitfalls to avoid.
