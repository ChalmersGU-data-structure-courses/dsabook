
# Hash tables {#hash-tables}

::: TODO
- Prio 1: rewrite introduction
- Prio 2: update examples - they are not the best
- Overview idea:
    - introduction: to index general objects (e.g. strings), we can use a hash function to calculate an array index
    - problem: how do we handle conflicts?
    - we need dynamic arrays!
    - see hash table slides
:::


In this chapter we revisit *sets* and *maps*. The best data structure for maps 
we have seen so far is self-balancing search trees, having $O(\log(n))$ for both 
`put(key, value)` and `get(key)`. 
In this chapter we will use *hash tables* to implement a data structure that 
can do both operations in *amortized* *average* $O(1)$ time, with a few caveats.

We will be building up to hash tables in three steps:

- A map where keys are small integers (arrays).
- Generalizing to a map where keys are arbitrary integers (compression and collision handling).
- Generalizing further to a map where keys are objects (hashing).

## Maps where keys are small integers

Suppose we want a map where all keys are integer values between 0 and 99. 
This is essentially a description of an array of length 100, 
with `get(key): return arr[key]` and `put(key, value)` is just `arrary[key]=value`. 
This is easy to generalize to other ranges as well, e.g. numbers between 100 and 1000
(an array of 901 elements).

Both operations are trivially `O(1)`, since they only involve indexing and 
assigning values in an array. There are two caveats to this claim:

- Using Ordo-notation at all here is misleading. Ordo notation is 
  used for asymptotic complexity, describing what happens when 
  the number of elements grows really large. That will never happen here, since 
  the map can have at most 100 elements.
- There is an initalization cost to create the array and fill it with null-values, 
  that is linear in the size of the value range.
  If you have lots of small maps, each containing just a few values, this cost can 
  easily dominate the runtime, and lead to exessive memory use.

## Maps where keys are arbitrary integers

If our keys are arbitrary integers, a simple array would use too much memory.
Instead we will use a small array, and *compress* numbers to valid indices. 
For instance if our array is size 100, and we want to perform `put(19934, "A")` 
(mapping the key 19934 to the string `"A"`) we can use the last two digits of the number (34).
More generally, we can use `number%array.length` as our compressed index.
This is called *modular compression* (from modulo arithmetic). Depending on 
the programming language, you may need to do additional computation to ensure 
the value is non-negative.

An obvious problem with compression is collisions, the key 19934 is compressed to 
the same index as 234 and 34. This causes problems both for `put` and `get`, 
since `put(234,"B")` would overwrite the `"A"` value, and `get(34)` would 
return `"A"` even though 34 is not a key in the map.

The problem with `get` can be solved by storing both keys and values in the array
(so instead of an array cell with just `"A"` in it, it has `(19934,"A")`). 
When faced with the remaining problem that `(234,"B")` wants to be in the cell 34, 
but `(19934,"A")` is already there, most people figure out one of these two 
solutions after some careful deliberation:

- Put some data structure in cell 34, that contain both `(19934,"A")` and `(19934,"B")`.
  This leads in the direction of *separate chaining hash tables*.
- Put `(19934,"B")` in the first empty cell after 34. 
  This leads towards *open addressing hash tables with linear probing*. 

Both of these methods are used in practice, and we will look closely at each of them, 
but first we will 

## Maps where keys are objects

A hash function `hash(x)` is an algorithm of reducing an object `x` 
(such as a string or a Java object) to a fixed size number (like a 32 bit integer). 
The only absolute requirement is that hashing is deterministic, so if `a` and `b` 
are identical, then `hash(a)=hash(b)`. 

- Returning a random value is not a valid hash function.
- Returning the memory address of a value is not a valid hash function, unless 
  values are only considered identical when they are the same object in memory.
- Always returning 0 is a valid hash function, but it has very poor *distribution*.
  This will cause performance degradation in our hash tables.

These steps give us the following method of performing a hash table lookup:

1. Turn x into a large integer using a *hash function*.
2. Use *modular compression* to turn the large integer into an index in our array.
3. Resolve collisons using *separate chaining* or *open addressing*.

After we have performed the lookup, we can return the associated value (for `get`) 
or add/remove an entry (for `put` and `remove`).

## Separate chaining

Put a map in our map?
Use a linked list instead.
Idea is that lists are small.

## Open addressing and linear probing

Use the next free array position.
Arrays are circular.
Clusters form.
Resizing is necessary.
Deletion

## Resizing hash tables

## Deleting entries from hash tables

## Complexity of hash table operations

## Quality of hash functions



<!-- OPENDSA: START -->
<!--
Hashing is a method for storing and retrieving records from a database.
It lets you insert, delete, and search for records based on a search key
value. When properly implemented, these operations can be performed in
constant time. In fact, a properly tuned hash system typically looks at
only one or two records for each search, insert, or delete operation.
This is better than the $O(\log(n))$ cost required to do a binary search
on a sorted array of $n$ records, or the $O(\log(n))$ cost required to do
an operation on a self-balancing binary search tree. However, even though hashing is
based on a very simple idea, it is surprisingly difficult to implement
properly. Designers need to pay careful attention to all of the details
involved with implementing a hash system.

A hash system stores records in an array called a
[hash table]{.term}, which we will call *HT* below.
Hashing works by performing a computation on a search key $k$ in a way
that is intended to identify the position in *HT* that contains the
record with key $k$. The function that does this calculation is called
the [hash function]{.term}, and will be denoted by $\mathbf{h}$. Since hashing
schemes place records in the table in whatever order satisfies the needs
of the address calculation, records are not ordered by value. A position
in the hash table is also known as a [slot]{.term}. The number of slots in hash table *HT* will be denoted by
the variable $m$ with slots numbered from 0 to $m-1$.

The goal for a hashing system is to arrange things such that, for any
key value $k$ and some hash function $\mathbf{h}$, $i = \mathbf{h}(k)$ is a slot
in the table such that $0 \leq i < m$, and we have the key of the record
stored at *HT*[$i$] equal to $k$.

Since the records are not ordered by value, hashing is not a good method for answering
range searches. In other words, we cannot easily find all records (if
any) whose key values fall within a certain range. Nor can we easily
find the record with the minimum or maximum key value, or visit the
records in key order. Hashing is most appropriate for answering the
question, "What record, if any, has key value $k$?"
**For applications
where all search is done by exact-match queries, hashing is a very good search
method because it is extremely efficient when implemented correctly.**
As we will see in this chapter, however, there are many approaches
to hashing and it is easy to devise an inefficient implementation.
Hashing is suitable for both in-memory and disk-based searching and is
one of the two most widely used methods for organising large databases
stored on disk (the other is the [B-tree]{.term}).

::: dsvis
#### Simple hashing example

As a simple (though unrealistic) example of hashing, consider storing
$n$ records, each with a unique key value in the range 0 to $n-1$. A
record with key $k$ can be stored in *HT*[$k$], and so the hash function
is $\mathbf{h}(k) = k$. To find the record with key value $k$, look in *HT*[$k$].

``` {.jsav-animation src="Hashing/hashIntroCON.js" links="Hashing/hashIntroCON.css" name="Hashing Intro Slideshow"}
```
:::

In most applications, there are many more values in the key range than
there are slots in the hash table. For a more realistic example, suppose
the key can take any value in the range 0 to 65,535 (i.e., the key is a
two-byte unsigned integer), and that we expect to store approximately
1000 records at any given time. It is impractical in this situation to
use a hash table with 65,536 slots, because then the vast majority of
the slots would be left empty. Instead, we must devise a hash function
that allows us to store the records in a much smaller table. Because the
key range is larger than the size of the table, at least some of the
slots must be mapped to from multiple key values. Given a hash function
**h** and two keys $k_1$ and $k_2$, if
$\mathbf{h}(k_1) = \beta = \mathbf{h}(k_2)$ where $\beta$ is a slot in
the table, then we say that $k_1$ and $k_2$ have a
[collision]{.term} at slot $\beta$ under hash function **h**.
Finding a record with key value $k$ in a database organised by hashing
follows a two-step procedure:

1.  Compute the table location $\mathbf{h}(k)$.
2.  Starting with slot $\mathbf{h}(k)$, locate the record containing key
    $k$ using (if necessary) a
    [collision resolution]{.term} policy.
-->
<!-- OPENDSA: END -->
