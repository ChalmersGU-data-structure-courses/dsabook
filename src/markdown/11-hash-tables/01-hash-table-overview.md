## Hash table overview

This section provides an overview of hash tables, glossing over many technical details.
We will be building up to hash tables in three steps:

- Maps where keys are small integers (arrays).
- Generalizing to maps where keys are arbitrary integers (compression and collision handling).
- Generalizing further to maps where keys are objects (hashing).

### Maps where keys are small integers

When designing a data structure, always ask yourself "can I solve this using arrays?". 
The reason is that arrays are memory efficient (just a single pointer for every value),
and blazingly fast. 
To a large extent, modern computers are built to make processing arrays as fast as possible, 
so we should exploit that whenever we can. 
We have already seen an example of this with *binary heaps*, where we used an array 
to cleverly represent a complete binary tree.

Suppose we want a map where all keys are integer values between 0 and 99. 
This is essentially a description of an array of length 100, 
with `get(key): return arr[key]` and `put(key, value): arrary[key]=value`, 
along with some error handling. 
This is easy to generalize to other ranges as well. Consider how to make a map where 
keys are integers between $-500$ and $500$, using an array of lenght $1001$.

Both `get` and `put` are trivially `O(1)`, since they 
only involve indexing and assigning values in the array. 
There are two caveats to this claim:

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
the compressed value is non-negative.

An obvious problem with compression is collisions, the key 19934 is compressed to 
the same index as 234 and 34. This causes problems both for `put` and `get`, 
since `put(234,"B")` would overwrite the `"A"` value, and `get(34)` would 
return `"A"` even though 34 is not a key in the map.

The problem with `get` can be solved by storing (keys,value)-pairs in the array
instead of just values. We call these pairs entries. 
So instead of an array cell with just `"A"` in it, it has `(19934,"A")`. 
When faced with the remaining problem that `(234,"B")` wants to be in cell 34, 
but `(19934,"A")` is already there, most people figure out one of these two 
solutions after some deliberation:

- Put some data structure in cell 34, that contain both `(19934,"A")` and `(19934,"B")`.
  This leads in the direction of *separate chaining hash tables*.
- Put `(19934,"B")` in the first empty cell after 34. 
  This leads towards *open addressing hash tables with linear probing*. 

![Put operations on a tiny hash table of size 5, illustrating the idea of the two ways in which we handle collisions. The keys 1997 and 12 both compress to 2.](images/Hashing-CollisionStrategies.svg){width=90% #fig:CollisionExample}


@fig:CollisionExample illustrates these techniques. 
Both of these methods are used in practice, and we will look more closely at each of them, 
but first we will finish the last step of the overview and move from integer keys to 
object keys.

### Maps where keys are objects

Suppose we want to create a map where keys are email addresses and values are names, 
using a hash table. We can not calculate `"alice@example.com" % array.length`, 
because an email is a string, not a number. 
We need to first reduce the string to an integer. This is exactly what a 
*hash function* does. `hash(x)` is a function reducing an object `x` 
(such as a string or a Java-object) to a fixed size number (like a 32 bit integer). 
The only absolute requirement is that hashing is deterministic, so if `a` and `b` 
are identical, then `hash(a)=hash(b)`. 
For the specific problem of hashing email addresses, here are some implications:
- Returning a random value is not a valid hash function.
- Returning the memory address of the string is not a valid hash function. 
  There can be two different memory locations containing `"alice@example.com"`,
  and both must give the same hash value.
- Always returning 0 is a valid hash function, but it has very poor *distribution*.
  This will cause performance degradation in our hash tables since we will 
  constantly have collisions.

In practice, we want to look at all the characters in the string and their positions, 
and perform lots of arithmetic operations to make sure that different strings tend to 
have different hash values. Completely avoiding collisions is impossible since there are 
infinitely many strings, but only finitely many 32 bit integers.

We will discuss the technical details of hashing a bit further later in the chapter, 
but assuming we have a good hash function for our key data type, we can already 
outline an algorithm for performing a hash table *lookup* given a key value. 
Here for the key alice@example.com:

1. Turn `"alice@example.com"` into a large integer using a *hash function* for strings.
2. Use *modular compression* to turn the large integer into an index in our array.
3. Resolve collisons using *separate chaining* or *open addressing*.

The lookup will find the entry with the key we are looking for if it is present, 
or determine that it is absent. At that point we return the associated value (for `get`) 
or modify/add/remove an entry (for `put` and `remove` operations).
