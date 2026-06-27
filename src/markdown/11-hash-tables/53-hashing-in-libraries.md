:::::: online

## Hash tables in standard libraries* {#hash-tables:standard-libraries}

::: TODO
- Prio 1: update text
:::

In this section we discuss how hash tables are implemented in different standard libraries.

#### Java API

Before version 1.2, Java had exactly the problem above, but in version
1.2 they changed the implementation. The current version of Java HashMap
(and HashSet and Hashtable and similar) has the following
characteristics:

-   It's a separate chaining hash table.
-   Small buckets (\<8 elements) are linked lists, but larger buckets
    are red-black trees instead. This ensures $O(n \log(n))$ worst time
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
