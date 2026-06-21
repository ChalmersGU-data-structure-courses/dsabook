## Complexity of hash table operations

In this chapter we have seen many pitfalls that can degrade performance of hash tables. 
If we manage to avoid all of them, we get a data structure where lookups are
*amortized* *average* $O(1)$ time complexity.

The amoritization is from the resize operations. 
Performing a resize of a hash table of size $n$ is $O(n)$.
With carefully chosen upper and lower thresholds for resizing, 
the computational cost of resizing will be $O(1)$ on average for each modification,
same as for *dynamic arrays*.

The *average* is from assuming that collisions are rare. 
If all or most of our values collide, the performance of lookups degrades to $O(n)$.
That amount of collisions does not happen by chance, but can happen in two ways:

* We are using a bad hash function.
* We are using a good hash function, but an attacker is deliberately constructing 
  keys with colliding hashes to overload our system.

An example of the latter is the well known "AaBB" vulnerability. For a hash function
using Horner's method with base 31, adding "Aa" to the end of a string will impact 
the resulting hash code the same way that adding "BB" does. 
A hint for why this is the case: The character codes for 'a' and 'B' differ by exactly 31.
This means that these strings have the same hash codes: "AaAa", "AaBB", "BBAa", "BBBB". 
In general, using strings of size $2k$, we can easily construct 2^k strings with colliding
hash values. This makies it easy to clog a hash table with, for instance, millions of 
emails addresses with colliding hash values.

Despite all these caveats, hash tables remain a true workhorse of modern 
software systems. It is not an exaggeration to say that most data 
produced today is stored in a hash tables at one point or another, 
since database management systems rely extensively on them for efficient 
searching. Many computer languages have built in supoort for hash tables, such 
as python dictionaries and Javascript objects. 
