
## Sorted sets and maps {#ADTs:sorted-sets-and-maps}

::: TODO
- Prio 1: Make the example better (The adt is not introduced, so the operation needs to be explained)
:::

A *range query* is an operation for finding elements in a specified interval,
such as finding all cities with a population between one and two million in a
collection of cities.

For sets and maps, a range query would mean finding all keys in the range.
Not all data structures for implementing sets and maps can answer range queries efficiently,
so we cannot add these kind of operations to the set and map interfaces.
For example, hash tables (see [Chapter @sec:hash-tables]) cannot answer range queries efficiently.

However, some data structures do support range queries,
for example self-balancing search trees (see [Chapter @sec:search-trees]).
For this reason we extend the set and map interfaces, and say that
these data structures implement *sorted sets* and *maps*.

Apart from the normal set operations,
sorted sets support several other operations that take advantage of the natural order of the elements:

-   Finding all elements within a given range of values.
    (This is the *range query* from above.)

-   Finding the *smallest* or *largest* element in the set.

-   Finding the *closest* element to a given one.
    Given an element $e$ (which may or may not be in the set), then:

    -   the *predecessor* is the greatest element $e'$ such that $e' < e$,
    -   the *floor* is the greatest element $e'$ such that $e' \leq e$,
    -   the *ceiling* is the smallest element $e'$ such that $e' \geq e$, and
    -   the *successor* is the smallest element $e'$ such that $e' > e$.

Similarly, a sorted map allows us to find keys in specified ranges.

::: {.example #ex:small-towns}
#### Example: Finding cities

We want to use a *sorted map* to find all cities with a population in a given range.
As there may be towns that have the same population, we need a *sorted multimap*,
where the key is the population and the value is a *set* of towns:

    cityPopulations: SortedMap of Int to (Set of City)

Now, to find all cities with a population between *lower* and *upper*,
we iterate through all existing populations within the range,
and then through all the cities for that population:

    findBetween(lower: Int, upper: Int) -> Set of City:
        result = new Set()
        for each population in keysBetween(cityPopulations, lower, upper):
            for each city in get(cityPopulations, population):
                add(result, city)
        return result
:::


### Range queries on sorted arrays

A sorted dynamic array allows for efficient range queries.
To find all keys between $a$ and $b$ in a sorted dynamic array:

- Find the position of the *smallest* key $k_1\geq a$ (using binary search).
- Find the position of the *largest* key $k_2\leq b$ (again using binary search).
- Return everything between those two positions in the value array.

Since binary search is $O(\log(n))$, the whole search procedure is
$O(\log(n) + \log(n))=O(\log(n))$. Unfortunately, modifying the data structure is still slow.
If we want to add an item to a sorted array, we have to keep the array sorted --
and that means we need to *insert* the new item at the right place in the
array which is $O(n)$.
