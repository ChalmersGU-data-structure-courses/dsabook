
:::::::::::::::::::::::::::::::::::::::: quiz ::::::::::::::::::::::::::::::::::::::::
### Review questions: Hash tables {-}


:::::::::: question ::::::::::
Answer TRUE or FALSE.

Hashing has the advantage that it
can answer range queries or questions like what is the largest
key in the database.

- [ ] True
- [x] False

::: hints
- Hashing is good only for exact match queries.
:::
::::::::::::::::::::::::::::::



:::::::::: question ::::::::::
Which of the following is true of open addressing?

- [x] All records are stored directly within the hash table
- [ ] Records are stored on a list associated with a slot in the hash table

::: hints
- In open addressing, the records are in the table.
:::
::::::::::::::::::::::::::::::



:::::::::: question ::::::::::
Answer TRUE or FALSE.

Separate chaining works well for disk-based hash systems.

- [ ] True
- [x] False

::: hints
- Managing a bunch of linked lists is not so good on disk.
- Otherwise, hashing works fine on disk.
:::
::::::::::::::::::::::::::::::



:::::::::: question ::::::::::
Answer TRUE or FALSE.

Open addressing works well for disk-based hash systems.

- [x] True
- [ ] False

::: hints
- Managing a bunch of linked lists is not so good on disk.
- Otherwise, hashing works fine on disk.
:::
::::::::::::::::::::::::::::::



:::::::::: question ::::::::::
What is the expected worst-case cost for a search
on a properly tuned hash system that stores $n$ records?

- [x] $O(1)$
- [ ] $O(n^2)$
- [ ] $O(n)$
- [ ] $O(\log n)$

::: hints
- If the system is working right, you should only need to
look at one slot most of the time, or occasionally a couple of slots.
:::
::::::::::::::::::::::::::::::



:::::::::: question ::::::::::
What is a disadvantage of linear probing?

- [ ] It can lead to allocating a lot of extra memory
- [x] You tend to get primary clustering
- [ ] You tend to get secondary clustering
- [ ] The algorithm is difficult to program

::: hints
- Clusters pile up into bigger clusters.
- This is called primary clustering.
:::
::::::::::::::::::::::::::::::



:::::::::: question ::::::::::
Which of the following is true of separate chaining?

- [x] Records are stored on a list associated with a slot in the hash table
- [ ] All records are stored directly within the hash table
- [ ] The algorithm running time is determined by probes of
different table cells until an empty one is found

::: hints
- In separate chaining, where are the records stored?
- They are stored in linked lists outside the table.
:::
::::::::::::::::::::::::::::::



:::::::::: question ::::::::::
A separate chaining table has an array size of $N$.
What is the maximum number of records that
can be stored in the table?

- [x] There is no maximum
- [ ] $N/2$
- [ ] $N$
- [ ] $N-1$
- [ ] $N-2$

::: hints
- In separate chaining, where are the records stored?
- They are stored in linked lists outside the table.
:::
::::::::::::::::::::::::::::::


:::::::::: question ::::::::::
Which is the best definition for a probe sequence?

- [x] The order in which collision resolution will visit the slots of the hash table
- [ ] It is another name for a hash function
- [ ] The order in which the hash function will visit the slots of the hash table
- [ ] It is another name for collision resolution

::: hints
- Probing is part of collision resolution.
- The probe sequence tells you where to look next.
:::
::::::::::::::::::::::::::::::



:::::::::: question ::::::::::
What is one disadvantage of quadratic
probing as a collision resolution method?

- [x] Insertions can fail even if there are empty slots in the hash table
- [ ] You have to check whether or not a node needs to be split
- [ ] Memory usage increases with each insertion
- [ ] Primary clustering can degrade performance

::: hints
- Usually, the probe sequence for quadratic probing does not visit all slots of the table.
:::
::::::::::::::::::::::::::::::



:::::::::: question ::::::::::
Hashing is good for which queries?

- [x] Exact match queries
- [ ] Range queries
- [ ] Finding the maximum key value
- [ ] All of these
- [ ] None of these

::: hints
- Hashing takes a key value and then looks at a particular slot in the table.
:::
::::::::::::::::::::::::::::::


:::::::::: question ::::::::::
The special value used to signal a
position in a hash table from which a record has been deleted
is called a:

- [x] Tombstone
- [ ] Flag
- [ ] Sentinal
- [ ] Gravestone

::: hints
- Starts with a T.
:::
::::::::::::::::::::::::::::::



:::::::::: question ::::::::::
Answer TRUE or FALSE.

When deleting a record from a
hash table, we can just do a normal search and then remove the
record from the slot where we find it.

- [ ] True
- [x] False

::: hints
- If there is an empty slot along a probe path, records
further down the path won't be found on a search.
:::
::::::::::::::::::::::::::::::



:::::::::: question ::::::::::
Answer TRUE or FALSE.

A problem with using tombstones
is that they take up slots in the table that cannot be reused, so
that over time the effective table size shrinks.

- [ ] True
- [x] False

::: hints
- Tombstone slots can be resued.
:::
::::::::::::::::::::::::::::::



:::::::::: question ::::::::::
Answer TRUE or FALSE.

A problem with using tombstones
is that they take up slots in the table, so they slightly
increase the search and insert time.

- [x] True
- [ ] False

::: hints
- They do take up slots in the table.
- So they do need to be searched over.
:::
::::::::::::::::::::::::::::::



:::::::::: question ::::::::::
Which is true about deletion from a hash
table using tombstones?

- [x] It causes a slight increase in the average time to insert and search
- [ ] It causes a large decrease in the average time to insert and search
- [ ] It causes a slight decrease in the average time to insert and search
- [ ] It has no effect on the average time to insert and search
- [ ] It causes a slight increase in the average time to insert and search
- [ ] It causes a large increase in the average time to insert and search

::: hints
- The tombstones fill some slots of the table.
- While tombstone slots can be reused, they do have to be searched through.
- The fraction of hash table slots taken up by tombstones
is normally not large, so while there is an increased cost, is is not large.
:::
::::::::::::::::::::::::::::::


::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::

