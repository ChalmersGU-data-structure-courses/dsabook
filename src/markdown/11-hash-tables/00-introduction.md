
# Hash tables {#hash-tables}

::: TODO
- Split into files
- Decide what to do about the level 3 
- References for: Sets and maps, Linked lists, avl-trees... 
- Internal references to later chapters. SepChain->complexity. 
- Decide where to introduce pseudo-code
- Terminology: Index/position, cell/position/whatever, entry (for (K,V) pairs)
:::


In this chapter we revisit *sets* and *maps*. 
Recall that any implementation of a map can also be used as a set,
since the keys of a map constitute a set, and the techniques 
demonstrated in this chapter can easily be modified from one to the other.

The best data structure for maps 
we have seen so far is self-balancing search trees, having $O(\log(n))$ for both 
`put(key, value)` and `get(key)`. 
In this chapter we will use *hash tables* to implement a data structure that 
can do both operations in *amortized* *average* $O(1)$ time, with a few caveats.

## Hash table overview

This section provides an overview of hash tables, glossing over many technical details.

We will be building up to hash tables in three steps:

- A map where keys are small integers (arrays).
- Generalizing to a map where keys are arbitrary integers (compression and collision handling).
- Generalizing further to a map where keys are objects (hashing).

### Maps where keys are small integers

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

### Maps where keys are arbitrary integers

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

![Put operations on a tiny hash table of size 5, illustrating the idea of the two ways in which we handle collisions. The keys 1997 and 12 both compress to 2.](images/Hashing-CollisionStrategies.svg){width=90% #fig:CollisionExample}


Both of these methods are used in practice, and we will look closely at each of them, 
but first we will 

### Maps where keys are objects

Suppose we want to create a map where keys are email addresses and values are names, 
using a hash table. We can not calculate `"alice@example.com" % array.length`, 
because an email is a string, not a number. 
We need to first reduce the string into an integer. This is exactly what a 
*hash function* does. `hash(x)` is a function reducing an object `x` 
(such as a string or a Java object) to a fixed size number (like a 32 bit integer). 
The only absolute requirement is that hashing is deterministic, so if `a` and `b` 
are identical, then `hash(a)=hash(b)`. 
For the specific problem of hashing email addresses, that means:
- Returning a random value is not a valid hash function.
- Returning the memory address of the string is not a valid hash function, 
  you can have two different memory locations containing `"alice@example.com"`
  and both must give the same hash value.
- Always returning 0 is a valid hash function, but it has very poor *distribution*.
  This will cause performance degradation in our hash tables since we will have 
  collisions all the time.
- In practice, we want to look at all the characters in the string and their positions, 
  and perform lots of arithmetic operations to make sure that different strings tend to 
  have different hash values. Completely avoiding collisions is impossible since there are 
  infinitely many strings, but only finitely many 32 bit integers.

We will discuss the technical details of hashing a bit further later in the chapter, 
but assuming we have a good hash function for our key data type, we can already 
outline an algorithm for performing a hash table *lookup* given a key value. 
Here for the key alice@example.com:

1. Turn x into a large integer using a *hash function*.
2. Use *modular compression* to turn the large integer into an index in our array.
3. Resolve collisons using *separate chaining* or *open addressing*.

The lookup will find the (key,value)-entry with the key we are looking for if it is present, 
or determined that its absent. At that point we return the associated value (for `get`) 
or modify/add/remove an entry (for `put` and `remove` operations).

## Separate chaining

Separate chaining solves the problem of collisions in hash tables. 
That is we have two keys `x` and `y` in a hash table of size `k`, 
such that `hash(x)%k = hash(y)%k`. Note that this can happen in two ways:
either `x` and `y` have the same hash value and will always collide, 
or they have different hash values but compress to the same index for
hash table size `k` specifically. 

Separate chaining is perhaps the most intuitive solution to the problem 
of collsions: If two keys want to inhabit the same cell in our hash table,
we let them, and instead of single (key,value)-entries we store a collection
of entries in each arary cell.

The word *separate* is because the data structure can not be stored directly 
in the hash table array, the array must contain pointers to some separate structure. 
This is a fundamental limitation of arrays, all cells must have a uniform size in memory.

That leaves the question of what data structure to use for the collections.
As an ADT, we want a map in each cell, so we could use an AVL tree. 
This has some issues:

* Putting a map implementation inside our map implementation makes it very complicated.
* AVL trees use a lot of memory for every map entry compared to an array, 
  since it needs two child pointers and some size information for each of them.
* It doesn't just require a hash function for the key type, 
  but also requires a comparison function.

For these reasons, the typical choice of data structure is a *linked list*, hence the word *chaining* 
(a linked list forms a chain of elements). @fig:GraphExamples shows the memory content of a hash table. 

![Memory content of a separate chaining hash table of size 13 mapping three emails to names. The arrows are pointers, and the empty cells in the array are null values, representing empty linked lists.](images/Hashing-SepChain2.svg){width=80% #fig:SepChain2}

What we know about the entries on index 5 is that `hash("alice@example.com")%13=hash("bob@example.com")%13=5`. 
This may be because the two emails have the same hash value, or more frequently because they have the same comressed value.

Performing a lookup of any key that compresses to index 5, that is `hash(x)%13=5` 
will require a linear search by key in the linked lists with alice and bob in it. 
Notably a lookup is required even for `put` operations: we need to ensure a key is not
already present before we add an entry to the linked list.

At this point, you should be concerned about performance. 
Linear search is not fast, and in fact if all our values end up in the same cell, 
our hash map will be slower than an AVL map ($O(n)$ instead of $O(log n)$). 
The idea to avoid this problem is ensuring that the maximum length of any list 
in our table is a small constant. This involves two main techniques:

* Having a good hash function.
* When the hash table starts getting crowded, resize it by creating a 
  larger table and transfering all the existing values to it.



<!--
    datatype SeparateChainingHashMap:
        size = 0
        table = new Array of length 1 
        put(key, value):
            index = hash(key)%table.length
            list = table[index]
            Perform a linear search for key in list
            if key is found: 
                overwrite the value of the relevant entry
            else
                if the size 
                add a new entry (key,value) to list

        get(key):
            index = hash(key)%table.length
            list = table[index]
            Perform a linear search for key in list
            if an entry is found, return its value, otherwise return null
-->

## Open addressing and linear probing

A downside of separate chaining is that we abandon the benefits of storing all our
map entries directly in an array. Storing values in a contiguous memory sequence 
has major performance benefits due to the caching behavior of modern computers, 
and having an array of map entries is a simpler data model than having an array 
of linked lists of map entries.

*Open addressing* is a general term for hash tables where, if the cell we want to 
place an entry in is taken, we place it in some other cell instead.
*Linear probing* is the specific technique where we move one step forward 
in the array until we find an empty cell. We consider the array to be circular, 
so the index after `length-1` is 0. 

To perform a lookup of value `x`, we do a linear search from index 
`hash(x)%table.length` until we either find the key we are looking for, 
or find an empty table cell. 

The invariant required for this to work is the following: If a key is 
present in the table, there can be no empty cells between its ideal position and its actial position.
Consider this example of a linear probing hash table. 
For simplicity, we implement a set instead of a map here, so there are only keys and no values:


![An open addressing hash table of size 13, representing the set {A,B,C,D,E,F}. Since this is not a map, there are no values, only keys. The keys form three clusters: {A,B,C}, {D,E}, and {F}.](images/Hashing-LinProbe1.svg){width=80% #fig:LinProbe12}


The three elements A, B, and C are adjacent in the (circular) array, forming what is called a cluster.
Consider what we know about the compressed hashes `hash(x)%13` for these elements. 
It is possible there are no collisions at all, if the compressed hashes for A, B, and C are 12,0, and 1 respectively.
Its also possible the compressed hashes are all 12, or some combination such as A and C being 12 but B being 0.
Can `hash(B)%13` be 1? No, that would violate the invariant, and a lookup for B would fail after looking for B on index 1 and then reaching the empty cell on index 2.

A question you should be asking yourself is: What happens when the table is full? 
Unlike a separate chaining hash table, the number of keys in an open addressing 
table cannot exceed the size of the table. 
Resizing the table is not just necessary for performance, but also for correctness.



## Resizing hash tables

Load factor.

Rehash everything!

## Deleting entries from open addressing hash tables

Eeasy-peasy in separate chaining.
Deletion by rehashing.
Lazy deletion.

## Quality of hash functions

Correctness and equivalence.

Distribution.

Rule of thumb: Every change in input value gives change in hash value.

Efficiency of hashing. Caching hash values. 

Bitwise operations.

Example of hashing strings, example of hashing other compound object.

## Complexity of hash table operations

Clustering and load factor. Knuth's parking problem?

Amortization of resizing.

## The many pitfalls of hash table performance

Size of table, prime or factors of 2?

DOS Attacks by deliberate hash collisions.

Multiply by 2 vs 37 in hash functions.

...

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
