
# Hash tables {#hash-tables}

::: TODO
- Prio 1: include "sets/maps" in the title, for example: "Hash tables for sets and maps", "Sets and maps: Hash tables"
- Prio 1: rewrite text
- Prio 1: add references to later sections from this overview. (SepChain->complexity, etc)
- Prio 1: Add a discussion about hashtables not being ordered: you cannot use them for *range queries*
- Prio 1: move first part of 12.1 ("keys are small integers") to here?
- References for: Sets and maps, Linked lists, avl-trees...
- Decide where to introduce pseudocode
- Terminology: Index/position, cell/position/whatever, entry (for (K,V) pairs), ...
:::


In this chapter we revisit *sets* and *maps*.
Recall that any implementation of a map can also be used as a set,
since the keys of a map constitute a set, and the techniques
demonstrated in this chapter can easily be modified from one to the other.

The best data structure for maps
we have seen so far is self-balancing search trees, having $O(\log(n))$ for both
`put(key,value)` and `get(key)`.
In this chapter we will use *hash tables* to implement a data structure that
can do both operations in *amortised* *average* $O(1)$ time, with a few caveats.
