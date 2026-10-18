
# Hash tables for implementing sets and maps {#hash-tables}

::: TODO
- Done?
:::

In the last chapter we saw that self-balancing search trees can be used to implement sets and maps efficiently,
where all essential operations become logarithmic, $O(\log(n))$.
In this chapter we will introduce *hash tables*, which is a data structure that can
both look up and update keys in *amortised constant* time, $O(1)$, in the average case.
Although the basic idea is simple enough,
there are a lot of subtleties we have to be aware of before we can make an efficient implementation.

The fundamental insight is that we can use *hash function* to transform an arbitrary object into an array index,
but this will lead to *collisions* that we have to address in some way.
In this chapter we introduce the two main strategies for handling collisions:
*separate chaining* and *open addressing*.
We will also discuss how to design good hash functions,
and how to use dynamic arrays to ensure constant time complexity.

<!-- #### Implementing maps using arrays -->

Arrays are memory efficient and blazingly fast,
because the computer knows the exact memory address of each array cell.
To a large extent, modern computers are built to make processing arrays as fast as possible,
so we should exploit that whenever we can.
We have already seen an example of this with *binary heaps* in @sec:heaps:binary-heaps,
where we used an array to cleverly represent a complete binary tree.
So, how can we use an array to implement a set or a map?

::: {.example #ex:small-int-maps}
#### Example: Small-integer maps

Suppose we want a map where all keys are small integers in the interval $0,\ldots,M{-}1$.
Then we don't need to use search trees or any complicated data structure --
because this is essentially just a description of an array of size $M$.
To look up a key $k$, we return the value at index $k$,
and to update the value of $k$, we assign that array cell the new value.
We also need a way to indicate that a key is *not* present, and
the most natural way is to use *null* as a special value for that.
The implementation of the datatype `SmallIntMap` is left as an exercise for you,
including the map operations `contains`, `get`, `put`, and `remove`.
:::
