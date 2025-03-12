
### Review questions: Hash functions

:::::::::::::::::::::::::::::::::::::::: quiz ::::::::::::::::::::::::::::::::::::::::

:::::::::: question ::::::::::
Answer TRUE or FALSE.

For the string hash functions, the size of
the hash table limits the length of the string that can be hashed.

- [ ] True
- [x] False

::: hints
- All hash functions should return a legal index in the hash table.
- The length of the string does not change this.
:::
::::::::::::::::::::::::::::::



:::::::::: question ::::::::::
The simple mod hash function makes use of:

- [x] The low order digits or bits in the key
- [ ] The high order digits or bits in the key
- [ ] The middle digits or bits of the key
- [ ] All of the digits or bits in the key

::: hints
- Think of taking a three-digit number mod 10. What digit is used?
:::
::::::::::::::::::::::::::::::



:::::::::: question ::::::::::
The binning hash function makes use of:

- [x] The high order digits or bits in the key
- [ ] The low order digits or bits in the key
- [ ] The middle digits or bits of the key
- [ ] All of the digits or bits in the key

::: hints
- Consider what happens with 10 bins and 3-digit numbers in the range 0 to 999.
- 0 to 99 goes to the first bin, 100 to 199 to the second, and so on.
:::
::::::::::::::::::::::::::::::



:::::::::: question ::::::::::
The mid-squares method hash function makes use of:

- [x] All of the digits or bits of the key
- [ ] The high order digits or bits of the key
- [ ] The middle digits or bits of the key
- [ ] The low order digits or bits of the key

::: hints
- Mid-squares method will square the key value before
pulling out the middle bits.
- While it uses only the middle bits of the squared value,
all of the bits in the original key will influence the result.
:::
::::::::::::::::::::::::::::::



:::::::::: question ::::::::::
For the simple string hash function that
sums the ASCII values for the letters, does the order of the
letters in the string affect the result?


- [ ] Yes
- [x] No
- [ ] Usually

::: hints
- Addition is commutative.
:::
::::::::::::::::::::::::::::::



:::::::::: question ::::::::::
Which is the best definition for collision in a hash table?

- [x] Two records with different keys have the same hash value
- [ ] Two records are identical except for their keys
- [ ] Two records have the same key
- [ ] Two records have the same key and the same hash value
- [ ] Two records with the same key have different hash values

::: hints
- Collision occurs when two keys try to go to the same slot.
:::
::::::::::::::::::::::::::::::



:::::::::: question ::::::::::
(Recall that $M$ refers to the size of a hash table.)
A hash function must:

- [x] Return a value between 0 and $M-1$
- [ ] Return a value between 1 and $M$
- [ ] Return the position of a free slot in the table
- [ ] Return the hash value for the key
- [ ] Return values in equal distribution throughout the table

::: hints
- A hash function should always give you a legal index into
the hash table array.
:::
::::::::::::::::::::::::::::::



:::::::::: question ::::::::::
If you double the size of a hash table,
can you keep using the same hash function?

- [x] Yes, but you will not hash to the new slots
- [ ] Yes, it works fine since the table size does not matter to the hash function
- [ ] No, the hash function would now generate illegal values

::: hints
- Will the old hash function go to an illegal index in the new table?
- Will the old hash function go to all slots of the new table?
:::
::::::::::::::::::::::::::::::



:::::::::: question ::::::::::
Answer TRUE or FALSE.

A company wants to use a system where they randomly assign
each customer a 9-digit ID (so there are 1 billion
possible ID numbers). Of course, there is a chance that two
customers will be assigned the same ID. But the company
figures that risk is OK if the odds are small enough. They
expect to assign IDs to 1000 customers. The chance of a
collision is therefore one in a million.

- [ ] True
- [x] False

::: hints
- While it is true that the last customer given an ID has
about one chance in a million of sharing it with another
customer (actually, the chance is 999/1,000,000,000 if 999 IDs
are already assigned)...
- ... this logic does not account for the fact that any of the
previous 998 assignments might also have caused a
collision.
- So the chance for a collision is rather higher than one in
a million.
:::
::::::::::::::::::::::::::::::



:::::::::: question ::::::::::
Answer TRUE or FALSE.

A company wants to use a system where they randomly assign
each customer a 9-digit ID (so there are 1 billion
possible ID numbers). Of course, there is a chance that two
customers will be assigned the same ID. But the company
figures that risk is OK if the odds are only one in a
million. They expect to assign IDs to 1000 customers.
But the chance of collision is much higher than one in a
million.

- [x] True
- [ ] False

::: hints
- While it is true that the last customer given an ID has
about one chance in a million of sharing it with another
customer (actually, the chance is 999/1,000,000,000 if 999 IDs
are already assigned)...
- ... this logic does not account for the fact that any of the
previous 998 assignments might also have caused a
collision.
- So the chance for a collision is rather higher than one in
a million.
:::
::::::::::::::::::::::::::::::

::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::

