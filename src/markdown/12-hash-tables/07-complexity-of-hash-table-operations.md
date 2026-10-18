
## Complexity of hash table operations {#hash-tables:complexity}

::: TODO
- Done?
:::

In this chapter we have seen many pitfalls that can degrade performance of hash tables.
If we manage to avoid all of them, we get a data structure where lookups are
*amortised* *average* $O(1)$ time complexity.

- *Amortised* comes from resizing:
  performing a resize of a hash table of size $n$ is $O(n)$.
  With carefully chosen upper and lower thresholds for resizing,
  the computational cost of resizing will be $O(1)$ on average for each modification,
  the same as for *dynamic arrays*.

- *Average* comes from assuming that collisions are rare:
  If all or most of our values collide, the performance of lookups degrades to $O(n)$.
  That amount of collisions does not happen by chance, but can happen in two ways:

    * either we are using a bad hash function,
    * or we are using a good hash function,
      but an attacker is deliberately constructing keys with colliding hashes to overload our system.
      One example of this was discussed earlier in @sec:hash-tables:horner-vulnerability.

Despite all these caveats, hash tables remain a true workhorse of modern software systems.
Many computer languages have built in supoort for hash tables, such as Python dictionaries and Javascript objects.
Most database management systems use either hash tables or B-trees (@sec:search-trees:B-trees), or a combination thereof,
for searching efficiently in big datasets.
