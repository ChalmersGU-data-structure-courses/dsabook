
## Sorted sets and maps

Consider the final example problem from the introduction to this chapter:

-   Given a list of all Swedish towns and their populations,
    are there any towns whose population is between 5,000 and 10,000?
    And if so, which are these towns?

These are two example of *range queries*:
given a set, find if there are any elements within a given range;
or given a map, find all items whose key lies in a given range.
Some set and map implementations support answering range queries efficiently;
we say that these data structures implement *sorted sets* and *maps*.

### Sorted sets

The first example range query is:

-   Given a list of all Swedish towns and their populations,
    are there any towns whose population is between 5,000 and 10,000?

One way to solve this problem would be to use a normal set of city populations.
Then we could find the answer to our query by making a sequence of calls to `contains`:

- `contains(5000)` -- is there a town with population 5,000?
- `contains(5001)` -- is there a town with population 5,001?
- `contains(5002)` -- is there a town with population 5,002?
- etc.

But this is not a sensible approach.
We would need to make up to 5,000 calls to `contains`, and if we wanted to instead find if there are any cities in Europe having a population of between 1 and 2 million, we would need to up to 1,000,000 calls.

There is a better way.
If the populations are stored in a sorted array, we can use the following algorithm:

- Find the position in the array of the *first* town with a population of *at least* 5,000.
  (This can be done efficiently using [binary search].)
- Check if this population is at most 10,000.

So, a sorted array can be used as an efficient implementation of a sorted set.
However, as we will see in @sec:implementing-using-arrays,
sorted arrays are not the best choice if you also want to add or remove elements.
For this purpose there are better implementations, such as the *search trees* from [Chapter @sec:search-trees].
We say that these data structures implement *sorted sets*.

Apart from the normal set operations,
sorted sets support several other operations that take advantage of the natural order of the elements:

-   Finding all elements within a given range of values.
    (This is the *range query* from above.)

-   Finding the *smallest* or *largest* element in the set.

-   Finding the *closest* element to a given one.
    Given an element $e$ (which may or may not be in the set), then:

    -   The *successor* of $e$ is the next element after $e$ in the set,
        i.e. the smallest element $e'$ such that $e < e'$.
    -   The *predecessor* of $e$ is the previous element before $e$ in the set,
        i.e. the greatest element $e'$ such that $e' < e$.

    A variant which is sometimes useful is *floor* and *ceiling*:

    -   The *floor* of $e$ is the greatest element $e'$ such that $e' \leq e$.
        If $e$ is in the set, then the floor of $e$ is just $e$; otherwise it is the predecessor of $e$.
    -   The *ceiling* of $e$ is the least element $k'$ such that $e \leq e'$.
        If $e$ is in the map, then the ceiling of $e$ is just $e$; otherwise it is the successor of $e$.

These operations are summarised in this interface for sorted sets.
Note that it *extends* the `Set` interface, so it has all the methods that normal sets also have.

    interface SortedSet of T extends Set:
        first() -> T          // Returns the first (smallest) element.
        last() -> T           // Returns the last (largest) element.
        floor(x: T) -> T      // Returns the closest element ≤ x, or nothing if there is no such element.
        ceiling(x: T) -> T    // Returns the closest element ≤ x, or nothing if there is no such element.
        lower(x: T) -> T      // Returns the closest element < x, or nothing if there is no such element.
        higher(x: T) -> T     // Returns the closest element > x, or nothing if there is no such element.
        between(x1: T, x2: T) -> Collection of T
                              // Returns all elements x such that x1 ≤ x ≤ x2.

### Sorted maps

Now consider the second range query in the example above:

-   Given a list of all Swedish towns and their populations,
    find the towns whose population is between 5,000 and 10,000.

One way to solve this problem would be to use a *multimap* (see @sec:multimaps).
The key would be a population number, and the values would be all towns having that population.
Then we could find the required towns by making a sequence of calls
`get(5,000)`, `get(5,001)`, ..., until `get(10,000)`.

But just as for the range queries for sets, this is not feasible.
Instead, we can store the towns in an array which is sorted by population, and then use the following algorithm:

- Find the position in the array of the *first* town that has a population of *at least* 5,000.
- Find the position in the array of the *last* town that has a population of *at most* 10,000.
- Now return all towns between those two positions in the array.

The operation that is needed is: given a map, find all items whose key lies within a given range.
And in addition to these range queries, sorted maps support similar operations as we introduced for sorted sets.

Here is a possible interface for sorted maps, which extends the normal map interface.
Note the similarity to the interface for sorted sets.

    interface SortedMap of K to V extends Map:
        firstKey() -> K              // Returns the first (smallest) key.
        lastKey() -> K               // Returns the last (largest) key.
        floorKey(key: K) -> K        // Returns the closest key ≤ k, or nothing if there is no key.
        ceilingKey(key: K) -> K      // Returns the closest key ≤ k, or nothing if there is no key.
        lowerKey(key: K) -> K        // Returns the closest key < k, or nothing if there is no such element.
        higherKey(key: K) -> K       // Returns the closest key > k, or nothing if there is no such element.
        keysBetween(key1: K, key2: K) -> Collection of K
                                     // Returns all keys k such that k1 ≤ k ≤ k2.


::: example
#### Example: Small Swedish towns

Here is how to use a sorted map ADT to find all Swedish towns having between 5,000 and 10,000 population.
We assume that cities have information about their name and population:

    datatype City:
        name: String
        population: Int

As there may be towns that have the same population, we need a *sorted multimap*,
where the key is the population and the value is a *set* of towns:

    cityPopulations: SortedMap of Int to (Set of City)

Now, to find all cities with a population between *lower* and *upper*,
we iterate through all existing populations within the range,
and then through all the cities for that population:

    findBetween(lower: Int, upper: Int) -> Set of City:
        result = new Set()
        for each population in cities.keysBetween(lower, upper):
            for each city in cities.get(population):
                result.add(city)
        return result

:::

