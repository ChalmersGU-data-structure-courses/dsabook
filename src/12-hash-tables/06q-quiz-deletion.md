
### Practice questions: Open addressing deletion

Now here are some practice questions.

:::::::::::::::::::::::::::::::::::::::: quiz ::::::::::::::::::::::::::::::::::::::::

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

