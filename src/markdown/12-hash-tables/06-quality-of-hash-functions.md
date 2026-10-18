
## Quality of hash functions {#hash-tables:hash-quality}

::: TODO
- Prio 1: do we want to discuss hashing integers too?
:::

Implementations of hash tables typically do not include the hash functions,
those are instead written by the developers of the key datatype.
Common datatypes like text strings normally have built-in high quality hash functions,
but user defined types require user defined hash functions.
There is one required and several desirable properties of these hash functions:

Preserves equality
: This is the only absolute requirement, and was stated already in [](#inv:hash-function):
  equal keys must have equal hash codes.
  What this means in practice in modern programming languages is that
  if you modify how to compare objects for equality, you also need to modify their hash functions.
  Neglecting to do this will mean that a hash table can contain multiple copies of logically identical elements.

Uniform distribution
: All possible keys should distribute evenly among all possible hash codes.
  Or in other words, if you take two random keys, it should be very very unlikely that they have the same hash code.

Independence
: It should not be possible to guess the hash code of a key if you know the hash code of a similar key.
  Or in other words, if the keys $x$ and $y$ are very similar,
  and you happen to know $h(x)$, then you should not be able to guess $h(y)$.

Efficiency
: Hashing needs to be fast.
  Every time a lookup is performed, a value gets hashed,
  and every time a hash table is resized all keys must be rehashed as well.
  The computational cost of hashing can easily eclipse the cost of searching the table.
  One way of mitigating this, especially for resizing, is to *cache* the result of hashing:
  The first time $h(x)$ is called we store the calculated hash code inside $x$,
  and in subsequent calls we can return the hash code directly without calculating.

Designing good hash functions is hard, and there are many pitfalls where
two perfectly reasonable-looking hash functions give wildly different
performance characteristics for hash tables.
Generally, a good hash function behaves
somewhat chaotically, where any small change in a value tends to result
in a drastic change in its hash value.

Consider this hash function for strings: sum up the character codes of all its characters.
For two randomly selected strings, this function tends to have different values,
but the small and common modification of displacing a character does not result in a different hash code.
For something like a database of thousands of anagrams of the same string,
all strings would have the same hash codes.

There is an even more subtle issue with the proposed hash function.
Suppose we have a hash table with millions of email adresses as key.
That is, the keys are short strings with at most $100$ characters,
and there are only around $30$ different characters to choose from.
Even if the strings tend to have distinct characters,
every string will have a character code sum below $100\times 30 = 3,000$.
In a linear probing hash table with capacity for tens of millions of strings,
all strings will form a huge cluster at the start of the table.
This will kill the lookup performance, and the table will be practically useless.
In short, the proposed hash function has a very poor distribution over the whole range of integers.

### A better hash function for strings {#hash-tables:hashing-strings}

We want a hash function where both the character code and the postion of each character affect the result.
One way of doing that is to sum the characters one by one,
but also multiply the sum with some number $p$ in each iteration, like this:

    hash(str):
        h = 0
        for each char in str:
            h = p * h + characterCode(char)
        return h

This is actually an efficient way of calculating a polynomial of $p$, called Horner's method
(where the coefficient $s_k$ is the character code at position $k$):

\begin{align*}
h(s) &= s_0\cdot p^{n-1} + s_1\cdot p^{n-2} + \ldots + s_{n-2}\cdot p^1 + s_{n-1}\cdot p^0 \\
     &= (((s_0\cdot p + s_1)\cdot p + \ldots)\cdot p + s_{n-2})\cdot p + s_{n-1}
\end{align*}

Note how the multiplication of the old hash value by 31 distributes over the sum,
increasing all previous exponents of $p$ by 1.
Contrary to the bad function we described earlier,
displacing a character in the string will almost certainly result in a different hash code.
This hash function has several advantages:

* It is quite fast, performing just a multiplication and an addition for each character.
* It yields large numbers even for short strings.
  Even if $p$ is a small number using up only $5-6$ bits,
  repeated multiplication will anyway quickly overflow a 32-bit integer.
  Integer overflow is the same as taking modulo $2^{32}$, which improves the *distribution*.
* A small change in any character of a string will tend to have a drastic impact on the hash code,
  which is good for *independence*.

So, what are good values for $p$?
The most important requirement is that it should be *co-prime* with the table capacity $M$,
because then the compression $h(s)\bmod M$ will help increase the distribution.
Therefore a decent suggestion is to always use a prime number, if we don't know anything about $M$.
Popular choices are $31$ or $37$, or $8,443$, or even $2^{19}-1=524,287$.

A particularly bad choice of $p$ is a power of two, such as $32$.
This will completely ruin the performance of hash tables in many common situations.
The subtle reason for this is that $32^k \equiv 0 \pmod{2^{32}}$ for every $k \geq 7$.
Therefore, for a longer string, all terms in the sum except the last seven would be $0$.
In programmer terms, multiplying by $32$ is a shift operation that will remove five bits of information from the hash code.
The end result is that the hash code will only depend on the last $7$ characters of any string.
Imagine what that would do to our email database, where most of the keys end with "`ail.com`".
All these keys will get the same hash code, if we use $p=32$.

### Hashing arrays, lists and objects {#hash-tables:hashing-objects}

Horner's method is a popular way of hashing most types of compound objects.
If we have an array, or any kind of list, we can use exactly the same strategy as for strings:

$$
h(a) = ((h(a[0])\cdot p + h(a[1]))\cdot p + \ldots)\cdot p + h(a[n{-}1])
$$

Note that we calculate the hash codes of the elements recursively --
we assume that the element datatype knows how to do that.
The same idea can be used for any user-defined datatype.
If we have a datatype with three instance variables $a$, $b$ and $c$, then we
would have $h(x) = (h(x.a)\cdot p + h(x.b))\cdot p + h(x.c)$.
An alternative is to use three different primes and calculate:

$$
h(x) = h(x.a)\cdot p_1 + h(x.b)\cdot p_2 + h(x.c)\cdot p_3
$$

One thing to remember when hashing general datatypes,
is that we do not have to include *dependent* instance variables --
that is, variables whose values depend on some other part of the object.
For example, when calculating the hash code for a linked list or a binary tree,
we don't need to include the *size* in the hash, because it is a derived property.

There is much more to be said about writing hash functions,
including technicalities of how to do it in various programming languages.
There are plenty of pitfalls to avoid,
but we have at least demonstrated that hashing is very easy in principle:
just chop up the value into a number.

### Why Horner's method is not the best {#hash-tables:horner-vulnerability}

For normal use, using Horner's method for hashing is a very good choice:
it is efficient to calculate and gives a good distribution of the hash codes.
However, it has a serious vulnerability which can be exploited by malicious attackers.

A common choice is to use the base $p=31$, but then we get the well known "AaBB" vulnerability.
The Unicode character codes for "A", "B" and "a" are $65$, $66$, and $97$, respectively.
This means that "Aa" and "BB" have the same hash codes:

$$
h(\text{``Aa''}) = 65\cdot 31 + 97 = 2112 = 66\cdot 31 + 66 = h(\text{``BB''})
$$

So, appending "Aa" or "BB" to a string will give the same resulting hash code.
This means that these strings have the same hash value: "AaAa", "AaBB", "BBAa", and "BBBB".
In general, we can easily construct $2^k$ strings of size $2k$ that all have the same hash code.
This makes it easy to clog a hash table with, for instance,
millions of emails addresses all having the same hash code.
Note that this problem arises for every possible value of $p$, but with different string combinations.
If an attacker knows which hash function we use, it is easy to find problematic string pairs that can be exploited.

Therefore, if we want to design a hash table that is safe and secure, we cannot rely on Horner's method alone.
There are different ways to mitigate this.
For example, Java uses separate chaining hash tables where the buckets are converted
to self-balancing red-black trees if they become too large.
Python and Ruby on the other hand, use open addressing hash tables.
To make them secure they use safer hash algorithms such as SipHash or MurmurHash,
and in addition they add an element of randomness each time the program is invoked.
