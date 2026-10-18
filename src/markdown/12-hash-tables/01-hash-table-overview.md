
## Hashing and compressing to resolve collisions {#hash-tables:overview}

::: TODO
- Prio 1: update fig. 12.1 - it's not as the caption says anymore
- Prio 2: add a figure showing the two steps - hash + compress?
:::

[](#ex:small-int-maps) shows how we can use an array to implement a simple and extremely efficient map.
Both `get` and `put` are trivially $O(1)$, since they
only involve indexing and assigning values in the array.
There are two caveats to this claim:

- Using big-$O$ notation at all here is misleading.
  Big-$O$ is used for *asymptotic* complexity,
  describing what happens when the number of elements grows really large.
  But this will never happen here, since the map does not works for arbitrary sizes.
- There is an initalisation cost to create the array and fill it with *null*-values,
  which is linear in the size of the number of *possible* keys,
  not the number of actually used keys.

The small-integer map only works if the keys are small integers.
If our keys can be very large integers,
then we have to initialise a very big array which perhaps won't even fit in memory.
For example, a date in the ISO-standard format can be viewed as a very large integer,
where $20261017$ means 17 October 2026.
In theory it is possible to view a date as an array index,
but in practice it won't work because the array would have to be enourmous.

#### Compress integers into array indices

If our keys can be arbitrary integers, we cannot use them as array indices directly.
Instead we have to *compress* them so that they fit inside our array.
Assume that our array is size $M=100$, and
we want to perform `put(542,"foo")`, mapping the key 542 to the string "*foo*".
Then we can use the last two digits of the number, and put "*foo*" at array index 42.
More generally, we can use $k\bmod M$ as our compressed index,
where $k$ is our key and $M$ is the size of the array.
This is called *modular compression* (from modulo arithmetic).
Depending on the programming language, you may need to do additional computation to ensure
the compressed index is non-negative.

Unfortunately we immediately run into the problem of *collisions*:
several keys will be compressed into the same array index.
The keys 42, 142, 242, and even 63,942, all compress into the same index as 542.
This causes problems both for `get` and `put`,
since `get(242)` would return "*foo*" even though 242 is not a key in the map,
and `put(142,"bar")` would overwrite the "*foo*" value.

The problem with `get` can be solved by storing (key,value)-pairs in the array
instead of only the values -- we call these pairs *entries*.
So instead of storing just "*foo*" at the compressed index 42, the cell contains the pair (542,"*foo*").
But this does not solve the other problem:
when we call `put(142,"bar")` we want to update cell 42, but it is already occupied with the pair (542,"*foo*").
There are two possible solutions to this:

- Don't store pairs in the array cells, but store another *map* that contains both (542,"*foo*") and (142,"*bar*").
  This is the underlying idea of *separate chaining*.
- Put (142,"*bar*") in the first empty cell after index 42.
  This leads towards *open addressing* hash tables.

![
    How to add the entry (67,"*baz*") to a tiny hash table of size 5 that already contains (542,"*foo*").
    This illustrates the collision-handling strategies -- the keys 67 and 542 both compress to 2.
](images/11.1-collision-strategies.svg){#fig:CollisionExample}

@fig:CollisionExample illustrates these techniques.
Both of these methods are used in practice, and we will look more closely at each of them,
but first we will explain how to handle other kinds of keys, such as strings or general objects.

#### Hashing an arbitrary object into an integer

Suppose we want to create a map from user ids to their names, where the ids are strings.
Strings cannot be compressed into an array index, because modulus only works on integers.
So we first need to reduce the string to an integer.
This is exactly what a *hash function* does --
it reduces an object (such as a string or a list or a record) to a single integer.
The only absolute requirement is that hashing *preserves equality*,
meaning that equal objects must always hash to the same value.

::: {.invariant #inv:hash-function}
#### Invariant: Hash function
A hash function $h$ must *preserve equality*:
If $x=y$, then $h(x)=h(y)$.
:::

From this simple invariant we can already exclude some naive suggestions:

- *Returning a random value*: this does not preserve equality, because you get a different value every time.
- *Returning the memory address* of the object: this does not preserve equality,
  because there can be two objects in different memory locations that are equal to each other.
- *Returning a constant*, for example always returning 42.
  This actually is a valid hash function -- but it has very poor *distribution*.
  If all objects have the same hash value, they will all be stored in the same array cell,
  which will render our hash table completely useless.
  <!-- It will behave similar to a linked list, and search through all objects every time we want to do something. -->

So, how does a good hash function look like?
One basic requirement is that it should depend on *every little part* of the object.
For example, if we want to hash a string, then we want to
look at all the characters in the string and their positions,
and perform lots of arithmetic operations to make sure that different strings tend to
have different hash values.
However, completely avoiding collisions is impossible since there are infinitely many strings,
or arbitrary objects, but only finitely many array cells in a given hash table.

We will discuss the technical details of hashing in @sec:hash-tables:hash-quality,
but until then we simply assume that we have a good hash function for our key data type.
[](#alg:hashtable-lookup) shows how to find the entry that should contain a given key.
The lookup will find the entry with the key we are looking for if it is present, or determine that it is absent.
At that point we return the associated value (for the `get` operation),
or modify/add/remove the entry (for `put` and `remove` operations).

::: {.algorithm #alg:hashtable-lookup}
#### Algorithm: Looking up a key
To lookup a key $k$ in a hash table of size $M$:

1. *Hash* the key into a large integer using a hash function: $h(k)$.
2. *Compress* the large integer into an array index: $h(k)\bmod M$.
3. Resolve collisons using *separate chaining* or *open addressing*.
:::

::: note
#### Note: Hash tables are not ordered
One of the main qualities of a good hash function is that it is unpredictable,
for example by displacing the internal order between keys.
Therefore we never not be able to use a hash table to implement a *sorted map*,
as described in @sec:ADTs:sorted-sets-and-maps.
If we need to ask *range queries*, or know which key is the smallest or largest,
then we have to use something else,
such as an AVL tree (@sec:search-trees:AVL-trees) or a B-tree (@sec:search-trees:B-trees).
:::
