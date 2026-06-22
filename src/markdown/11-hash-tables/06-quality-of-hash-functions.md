
## Quality of hash functions {#hash-tables:hash-quality}

Implementations of hash tables typically do not include the hash functions,
those are instead written by the developers of the key class.
Built in classes like text strings typically have high quality hash functions,
but user defined types require user defined hash functions.
There is one required and several desirable properties of these hash functions:

* Consistency: The absolute requirement that equal values have equal hash codes.
  Essentially, any pair values that should be considered the same key
  in our hash tables need to have the same hash code. What this means
  in practice in languages like Java is that if you modify the equals
  method of a class, you also need to modify its hash code function.
  Neglecting to do this will mean that a hash set can contain multiple
  copies of logically identical elements.
* Distribution: The simplest aspect of this is that the probablility of
  two randomly selected values having the same hash code should be low.
  Even if this condition is satisfied .
* Efficiency: Hashing needs to be fast. Every time a lookup is performed,
  a value gets hashed, and every time a hash table is resized all keys must
  be rehashed as well. The computational cost of hashing can easily
  eclipse the cost of searching the table. One way of mitigating this,
  especially for resizing, is for objects to cache the result of hashing:
  The first time `hash(x)` is called the result is stored in `x`
  and returned directly in subsequent calls on the same object.

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

* It is fast, performing just a multiplication and an addition for each character.
* It yields large numbers even for short strings. 31 is a five bit number, so
  repeated multiplication quickly overflows a 32 bit integer. This prevents the
  problem we saw earlier, where all email adresses hash codes in a small range.
* A small change in any character of a string will tend to have a drastic impact on the hash code.

Other values for the base (instead of 31) are possible. 37 is another popular choice.
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
If we have a class with two instance variables `a` and `b`, then we
would have `hash(x)=hash(x.a)*31+hash(b)`.

There is much more to be said about writing hash functions, including technicalities
of how to do it in various programming languages, but what we have demonstrated here
is that while hashing is very easy in principle (just chop the value up into a number)
there are plenty of pitfalls to avoid.
