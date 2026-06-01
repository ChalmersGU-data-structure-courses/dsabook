
### Problems with hash tables

::: TODO
- Prio 1: update text
:::

A properly tuned hashing system will return records with an
average cost of less than two record accesses. This makes it a very
effective way known to store a database of records to support
exact-match queries. Unfortunately, hashing is not effective when
implementing *range queries*, or answering questions like "Which record
in the collection has the smallest key value?"

In this section we will give some examples of problems with hashing, and how Java
and Python implement hashing and hash tables internally.

#### Algorithmic complexity attacks

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

#### Breaking hash functions

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

::::::
