
# Hashing

Hashing is a method for storing and retrieving records from a database.
It lets you insert, delete, and search for records based on a search key
value. When properly implemented, these operations can be performed in
constant time. In fact, a properly tuned hash system typically looks at
only one or two records for each search, insert, or delete operation.
This is better than the $O(\log n)$ cost required to do a binary search
on a sorted array of $n$ records, or the $O(\log n)$ cost required to do
an operation on a binary search tree. However, even though hashing is
based on a very simple idea, it is surprisingly difficult to implement
properly. Designers need to pay careful attention to all of the details
involved with implementing a hash system.

A hash system stores records in an array called a
[hash table]{.term}, which we will call `HT`.
Hashing works by performing a computation on a search key `K` in a way
that is intended to identify the position in `HT` that contains the
record with key `K`. The function that does this calculation is called
the [hash function]{.term}, and will be denoted by the letter **h**. Since hashing
schemes place records in the table in whatever order satisfies the needs
of the address calculation, records are not ordered by value. A position
in the hash table is also known as a [slot]{.term}. The number of slots in hash table `HT` will be denoted by
the variable $M$ with slots numbered from 0 to $M-1$.

The goal for a hashing system is to arrange things such that, for any
key value `K` and some hash function $h$, $i = \mathbf{h}(K)$ is a slot
in the table such that $0 <= i < M$, and we have the key of the record
stored at `HT[i]` equal to `K`.

Hashing is not good for applications where multiple records with the
same key value are permitted. Hashing is not a good method for answering
range searches. In other words, we cannot easily find all records (if
any) whose key values fall within a certain range. Nor can we easily
find the record with the minimum or maximum key value, or visit the
records in key order. Hashing is most appropriate for answering the
question, 'What record, if any, has key value `K`?' **For applications
where all search is done by exact-match queries, hashing is the search
method of choice because it is extremely efficient when implemented
correctly.** As this tutorial shows, however, there are many approaches
to hashing and it is easy to devise an inefficient implementation.
Hashing is suitable for both in-memory and disk-based searching and is
one of the two most widely used methods for organizing large databases
stored on disk (the other is the B-tree).

As a simple (though unrealistic) example of hashing, consider storing
$n$ records, each with a unique key value in the range 0 to $n-1$. A
record with key `k` can be stored in `HT[k]`, and so the hash function
is $\mathbf{h}(k) = k$. To find the record with key value `k`, look in
`HT[k]`.

<inlineav id="hashIntroCON" src="Hashing/hashIntroCON.js" name="Hashing Intro Slideshow" links="Hashing/hashIntroCON.css"/>

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
[collision]{.term} at slot $\beta$ under hash
function **h**.

Finding a record with key value `K` in a database organized by hashing
follows a two-step procedure:

1.  Compute the table location $\mathbf{h}(K)$.
2.  Starting with slot $\mathbf{h}(K)$, locate the record containing key
    `K` using (if necessary) a
    [collision resolution]{.term} policy.
