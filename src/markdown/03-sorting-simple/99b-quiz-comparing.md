
### Review questions: Comparison

::: TODO
- Prio 3: is this quiz necessary?
:::

:::::::::::::::::::::::::::::::::::::::: quiz ::::::::::::::::::::::::::::::::::::::::

:::::::::: question ::::::::::
Answer TRUE or FALSE.

One good general-purpose solution to the problem of getting a key from a record
is to define a special method such as `.key()`.

- [x] False
- [ ] True

::: hints
- If we use a `.key()` function, then there is only one way to compute the key for a record.
- That means the records cannot be sorted on differing fields.
:::
::::::::::::::::::::::::::::::



:::::::::: question ::::::::::
Answer TRUE or FALSE.

One good general-purpose solution to the problem of getting a key from a record
is to store Key/Value pairs in the search structure.

- [ ] False
- [x] True

::: hints
- When we store key/value pairs, we are explicitly storing the key used by that search structure.
- This permits a collection of records to be sorted or searched in many different ways.
:::
::::::::::::::::::::::::::::::



:::::::::: question ::::::::::
Answer TRUE or FALSE.

In order to be able to sort, the key values must define a total order.

- [ ] False
- [x] True

::: hints
- Sorting relies on comparisons.
- We need to be able to compare any two records and tell which one is less than the other.
- This is the essence of a total order.
:::
::::::::::::::::::::::::::::::



:::::::::: question ::::::::::
Answer TRUE or FALSE.

In order to do an exact-match search, the key values must define a total order.

- [x] False
- [ ] True

::: hints
- Exact match requires only that we can tell if two keys are equal.
- We do not need to decide which one is greater than the other.
- So, we do not need a total order.
:::
::::::::::::::::::::::::::::::



:::::::::: question ::::::::::
Answer TRUE or FALSE.

The problem with using a `.key()` method to get the key from a record
is that we can't use this same method to get different fields for different searches.

- [ ] False
- [x] True

::: hints
- If we use a `.key()` function, then there is only one way to compute the key for a record.
- That means the records cannot be sorted on differing fields.
:::
::::::::::::::::::::::::::::::



:::::::::: question ::::::::::
Defining a record's key field is a property of:

- [ ] The record
- [x] The context of the search
- [ ] Both
- [ ] Neither

::: hints
- If the key were a property of the record, then records could only be sorted in one order.
- If the key were a property of the record, then we could only search on a single value.
- But we really want to be able to sort or search on different fields.
:::
::::::::::::::::::::::::::::::

::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::

