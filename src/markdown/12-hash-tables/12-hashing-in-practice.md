
## Hash tables in practice

::: TODO
- Prio 2: update text
:::

Congratulations! You have reached the end of the hashing chapter. In
summary, a properly tuned hashing system will return records with an
average cost of less than two record accesses. This makes it a very
effective way known to store a database of records to support
exact-match queries. Unfortunately, hashing is not effective when
implementing *range queries*, or answering questions like "Which record
in the collection has the smallest key value?"

In this section we will give some examples of problems with hashing, and how Java
and Python implement hashing and hash tables internally.

### Algorithmic complexity attacks

As we wrote in the chapter introduction:

> "When properly implemented, these operations can be performed in
> constant time. (\...) However, even though hashing is based on a very
> simple idea, it is surprisingly difficult to implement properly."

This difficulty can be (and has been) exploited for malicious attacks on
systems, so called algorithmic complexity attacks. We'll leave the word
to Adam Jacobson and David Renardy to give an introduction to the
problems (please read the whole text, it's an easy read):

> "An Algorithmic Complexity (AC) attack is a resource exhaustion attack
> that takes advantage of worst-case performance in server-side algorithms."
> (<https://twosixtech.com/algorithmic-complexity-vulnerabilities-an-introduction>)

As you can see, hash tables even have a category of itself ("Hashtable
DoS Attacks"). They only mention separate chaining ("These hash tables
utilised a linked list"), but the same problem arises for open
addressing. (In fact, Python hash tables are open addressing -- see
below).

The problem is that it is extremely difficult to write good hash
functions.

### Breaking hash functions

Java's default algorithm for calculating a hash code from a string $s$
looks like this
(see the code for [hashCode() in
StringUTF16.java](https://github.com/openjdk/jdk/blob/9f75d5ce500886b32175cc541939b7f0eee190ca/src/java.base/share/classes/java/lang/StringUTF16.java#L414-L420)):

$$ s_0\cdot 31^{n-1} + s_1\cdot 31^{n-2} + ... + s_{n-2}\cdot 31^1 + s_{n-1}\cdot 31^0 $$

This works well in practice, *if you assume that your data is normal*!
But an attacker does not use normal data -- instead they deliberately
create data that will break the system. For example, suppose the
attacker knows that you store user data in a Java HashMap with the
username as key. Then they can create lots of artifical usernames to put
in the database to make searching in the database slow. That's a
hashtable DoS attack!

It's really easy to break Java's string hash function if you want to.
It relies on the fact that the following two strings have the same
hashcode:

```java
"Aa".hashCode() == "BB".hashCode() == 2112
```

Therefore, all same-length repetitions of "Aa" and "BB" have the
same hash code:

```java
"AaAaAaAaAa", "AaAaAaAaBB", "AaAaAaBBAa", "AaAaAaBBBB", ...,
"BBBBBBAaAa", "BBBBBBAaBB", "BBBBBBBBAa", "BBBBBBBBBB"
```

There are $2^k$ possible strings with $k$ repetitions of "Aa" resp.
"BB", and all these strings have the same hash code! An attacker could
insert all these strings into a Java HashMap and then all of them would
be in the same bucket and we would resort to linear search through a
linked list of $2^k$ strings.

<!-- Here's a short article explaining this:
<https://dzone.com/articles/what-is-wrong-with-hashcode-in-javalangstring>
-->

Note that this would not be improved by using an open addressing hash
table, because then we would get a primary cluster with $2^k$ strings.

### How are hash tables implemented in standard libraries? {#hashing-standard-libraries}

:::::: latex
\booklink{Read the rest online}{12.12}{sec:hashing-standard-libraries}
::::::

XXXX

:::::: online

#### Java API

Before version 1.2, Java had exactly the problem above, but in version
1.2 they changed the implementation. The current version of Java HashMap
(and HashSet and Hashtable and similar) has the following
characteristics:

-   It's a separate chaining hash table.
-   Small buckets (\<8 elements) are linked lists, but larger buckets
    are red-black trees instead. This ensures $O(n \log n)$ worst time
    complexity, but it's linear if the data is well-behaved.
-   The size of the hash table is a power of two ($n=2^k$) -- meaning
    that the resizing factor is 2.
-   The maximum load factor for resizing is 0.75.

If you're interested you can read the comment on [lines 125--232 in
HashMap.java](https://github.com/openjdk/jdk/blob/9e831bccd2fc90681b32d1504eca753462afc6f6/src/java.base/share/classes/java/util/HashMap.java#L145-L233),
where some implementation details are explained.

#### Python

Python uses much more modern implementations than Java, of both hash
functions and hash tables. Python hash functions uses a combination of
the following techniques:

-   Strings are hashed using
    [SipHash](https://en.wikipedia.org/wiki/SipHash) (see
    [PEP-456](https://www.python.org/dev/peps/pep-0456)).
-   Tuples are hashed using "a slightly simplified version of the
    [xxHash non-cryptographic hash](http://cyan4973.github.io/xxHash/)"
    (see [lines 384--397 in
    tupleobject.c](https://github.com/python/cpython/blob/8f24b7dbcbd83311dad510863d8cb41f0e91b464/Objects/tupleobject.c#L384-L397)).
-   In addition, Python adds randomisation: Whenever you start a new
    Python interpreter, it creates a random constant which is combined
    with the hashes. This means that every new instance will generate
    new hashes for the same strings, tuples, and other built-in
    objeccts.

Python dictionaries are implemented as hash tables. Since version 3.6
they are based on the following ideas (lecture video from PyCon 2017):

-   Raymond Hettinger: Modern Python Dictionaries -- A confluence of a
    dozen great ideas, PyCon 2017:
    <https://www.youtube.com/watch?v=npw4s1QTmPg> (the part about
    sharing several values in one table is only used for internal use in
    the Python interpreter)
-   And a blog post explaining the new implementation:
    <https://morepypy.blogspot.com/2015/01/faster-more-memory-efficient-and-more.html>
    (it was first implemented in PyPy, but then they ported it to
    "standard" CPython too)

Here's a summary of the internal implementation:

-   All hash tables have a power-of-two size ($n=2^k$) -- meaning that
    the resizing factor is 2.
-   This means that the table index is the first (least significant) $k$
    bits of the hash value.
-   It's an open adressing hash table.
-   But it doesn't use linear probing, instead they probe with $+p$ in
    every step, where $p$ depends on the higher bits in the hash value.
-   It keeps the full hash value in the table (which improves the speed
    when resizing)
-   To get better memory efficiency, it is split into (1) a size $2^k$
    integer array with indices, and (2) a compact array with tuples of
    the form (hash,key,value). The indices in array(1) point to
    locations in array(2).
-   This also has the effect that it can iterate over the insertion
    order of the elements.
-   Deletion is done using tombstones.
-   The maximum load factor for resizing is 0.66.
-   See the source code here:
    <https://github.com/python/cpython/blob/main/Objects/dictobject.c>

::::::
