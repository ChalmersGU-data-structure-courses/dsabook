
## Open addressing {#hash-tables:open-addressing}

::: TODO
- Done?
:::

A downside of separate chaining is that we abandon the benefits of storing all our
map entries directly in an array. Storing values in a contiguous memory sequence
has major performance benefits due to the caching behaviour of modern computers,
and having an array of map entries is a simpler data model than having an array
of linked lists of map entries.

*Open addressing* is a general term for hash tables where,
if the cell where we want to place an entry is occupied, we place it in some other cell instead.
*Probing* is the specific technique we use to find this other cell,
and the most common probing strategy is *linear probing*.
In linear probing we simply move one step forward in the array until we find an empty cell.
We consider the array to be *circular*,
similar to circular queues that we discussed in @sec:sequences:array-queues,
so the index after $M{-}1$ is $0$.

::: {.algorithm #alg:linear-probing-lookup}
#### Algorithm: Linear probing operations
To perform a `get` or `put` operation for a key $k$ using linear probing:

1. Find the ideal position $i_0$ for the key $k$ using [](#alg:hashtable-lookup).
2. Perform linear search from $i_0$ until you either find $k$, or reach an empty cell.
3. If $k$ was found, (`get`) return the value, or (`put`) update the value.
4. (`put`) If you reached an empty cell, put a new (key,value)-entry in it.
:::

[](#alg:linear-probing-lookup) shows how to find (`get`) or update (`put`) the value of a key $k$.
In both cases we first apply [](#alg:hashtable-lookup) to find its "ideal" position,
and then we perform a linear search for $k$ from that position, stopping if we reach an empty cell.
For this to work properly the hash table must satisfy the following invariant.

::: {.invariant #inv:linear-probing}
#### Invariant: Linear probing
If a key is present in a linear probing hash table,
there can be no empty cells between its ideal position and its actual position.
:::

![
    An open addressing hash table of size 13, representing the set {A,E,H,L,R,Y,Z}.
    <!-- Since this is not a map, there are no values, only keys.  -->
    The keys form three clusters: {Y,L,Z,A}, {R,E}, and {H}.
](images/12.3-open-addressing-example.svg){#fig:LinProbe1}

<!--
  0  1  2  3  4  5  6  7  8  9 10 11 12
[ Z  A  _  _  R  E  _  H  _  _  _  Y  L ]
 -->

#### Clustering

@Fig:LinProbe1 shows an example linear probing hash table.
For simplicity, we show a set instead of a map here -- so there are only keys and no values.
Can $h(\text{B})\bmod 13$ be $1$?
No, that would violate the invariant, and a lookup for B would fail
after looking for B on index $1$ and then reaching the empty cell on index $2$.

The four elements Y, L, Z, and A are adjacent in the (circular) array, forming what is called a *cluster*.
Consider what we know about the compressed hashes $h(x)\bmod 13$ for these elements.
It is possible that $h(\text{A})\bmod 13=12$, if A was added after all the other elements in the cluster.
But is it possible that $h(\text{Y})\bmod 13=12$?
No, that would violate the invariant, because Y is nowhere between position $12$ and the end of the cluster.

It is possible that there are no collisions at all,
if the compressed hashes for Y, L, Z, and A are $11$, $12$, $0$, and $1$, respectively.
But it's also possible that the compressed hashes are all $11$,
in which case there were a lot of collisions when the cluster was formed.
We cannot know this unless we know what hash function is used and in which order the elements were added.^[
    In fact, the hash function we used is the ASCII code of the letter.
    Try to figure out in which order the elements could have been added to the table.
]

Clustering is the biggest enemy of open addressing hash tables.
The worst case complexity of [](#alg:linear-probing-lookup) is the size of the largest cluster in the table.
Therefore, we need the hash function to distribute the keys evenly among all array indices $0,\ldots,M{-}1$.
If the hash function is bad, we might end up in one big cluster containing all keys,
and then the operations are linear in the worst case.

A question might pop up is, what happens when the table is full?
Unlike a separate chaining hash table,
the number of keys in an open addressing table cannot exceed the size of the table,
or in other words, $N<M$ must always be true.
Resizing the table is not just necessary for performance, but also for correctness,
and we will discuss this further in @sec:hash-tables:resizing.

::: {.example #ex:linear-probing-add}
#### Example: Inserting keys into a linear probing hash set

Assume that we have a hash table of size $5$ already containing the keys $16$ and $34$.
For simplicity we use the identity hash function, $h(k)=k$.

`\noindent`{=latex}
![](images/12.3-linear-probing-add-1.svg)

<!-- [  _ | 16 |  _ |  _ | 34 ] -->

`\noindent`{=latex}
To add $49$ to the table, we first calculate its ideal position $h(49)\bmod 5=4$.
However, cell $4$ is occupied, so we (circularly) move to the next cell.
This cell is empty and we can put $49$ in cell $0$.
Here the arrows indicate the ideal and actual positions of $49$:

`\noindent`{=latex}
![](images/12.3-linear-probing-add-2.svg)

<!-- [ 49 | 16 |  _ |  _ | 34 ] -->
<!--    ^                   ^   -->

`\noindent`{=latex}
Note that when we added $49$ we accidentally merged the two separate clusters $\{16\}$ and $\{34\}$
into the much larger cluster $\{34,49,16\}$.
Finally we want to add $25$ to the table, which has ideal position $h(25)\bmod 5=0$.
This cell is occupied, as is the next one, so we have to put $25$ in cell $2$:

`\noindent`{=latex}
![](images/12.3-linear-probing-add-3.svg)

<!-- [ 49 | 16 | 25 |  _ | 34 ] -->
<!--    ^         ^             -->

:::

