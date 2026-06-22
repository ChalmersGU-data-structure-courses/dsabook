
# Hash tables {#hash-tables}

::: TODO
- Add a discussion about hashtables not being ordered: you cannot use them for *range queries*
- Decide what to do about the level 3 subsections
- References for: Sets and maps, Linked lists, avl-trees...
- Internal references to later sections from overview. SepChain->complexity.
- Decide where to introduce pseudo-code
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
