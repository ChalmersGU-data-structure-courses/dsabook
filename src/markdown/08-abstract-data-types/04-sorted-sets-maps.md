
## Sorted sets and maps {#ADTs:sorted-sets-and-maps}

One task that sets or maps cannot solve are *range queries*, such as this example:

Between $x$ and $y$
:   Given a list of all Swedish towns and their populations,
    are there any towns whose population is between 5,000 and 10,000?
    And if so, which are these towns?

This example consists of two different questions:
(1) given a set, find if there are any elements within a given range; and
(2) given a map, find all items whose key lies in a given range.
The sets and maps from the previous section cannot answer these questions,
because they do not have any suitable operations.

Not all data structures for implementing sets and maps can answer range queries efficiently,
so we cannot add these kind of operations to the set and map interfaces.
For example, hash tables (see [Chapter @sec:hash-tables]) cannot answer range queries efficiently.

However, some data structures do support range queries,
for example self-balancing search trees (see [Chapter @sec:search-trees]).
For this reason we extend the set and map interfaces, and say that
these data structures implement *sorted sets* and *maps*.

### Sorted sets {#ADTs:sorted-sets}

The first example range query was:
"are there any towns whose population is between 5,000 and 10,000?".

<!-- NICSMA: START -->
One way to solve this problem would be to use a normal set of city populations.
Then we could find the answer to our query by making a sequence of calls to `contains`:
<!-- NICSMA: END -->

- `contains(5000)` -- is there a town with population 5,000?
- `contains(5001)` -- is there a town with population 5,001?
- `contains(5002)` -- is there a town with population 5,002?
- etc.

<!-- NICSMA: START -->
But this is not a sensible approach.
We would need to make up to 5,000 calls to `contains`,
and if we wanted to instead find if there are any cities in Europe having a population of between 1 and 2 million,
we would need to up to 1,000,000 calls.
<!-- NICSMA: END -->

We need a special data structure that can handle range queries in a better way,
and we call this ADT *sorted sets*.
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

Note that if $e$ is in the map, then the floor and ceiling is just $e$;
otherwise it is the predecessor or successor.

In addition to all the operations above, sorted sets also supports all the operations that normal sets have.

<!--
These operations are summarised in this interface for sorted sets.
Note that it *extends* the `Set` interface, so it has all the methods that normal sets also have.

    interface SortedSet of T extends Set:
        first() -> T            // Returns the first (smallest) element.
        last() -> T             // Returns the last (largest) element.
        floor(key: T) -> T      // Returns the closest element ≤ x, or nothing if there is no such element.
        ceiling(key: T) -> T    // Returns the closest element ≤ x, or nothing if there is no such element.
        lower(key: T) -> T      // Returns the closest element < x, or nothing if there is no such element.
        higher(key: T) -> T     // Returns the closest element > x, or nothing if there is no such element.
        between(low: T, high: T) -> Collection of T
                                // Returns all keys such that low ≤ key ≤ high.
-->

### Sorted maps {#ADTs:sorted-maps}

Now consider the second range query in the example above:
"find the towns whose population is between 5,000 and 10,000".

One way to solve this problem would be to use a *multimap* (see @sec:ADTs:multimaps).
The key would be a population number, and the values would be all towns having that population.
Then we could find the required towns by making a sequence of calls
`get(5,000)`, `get(5,001)`, ..., until `get(10,000)`.

But just as for the range queries for sets, this is not feasible.
Instead we introduce an interface for *sorted maps*.
There are several possible ways to define this interface,
but the easiest is perhaps to use exactly the same operations as sorted sets, like this:

-   Find all keys within a given range.
-   Find the *smallest* or *largest* key in the map.
-   Find the *closest* key to a given one
    (that is, the predecessor, floor, ceiling and successor).

<!--
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
-->

::: example
#### Example: Small Swedish towns

Here is how to use a *sorted map* to find all Swedish towns having between 5,000 and 10,000 population.
As there may be towns that have the same population, we need a *sorted multimap*,
where the key is the population and the value is a *set* of towns:

    cityPopulations: SortedMap of Int to (Set of City)

Now, to find all cities with a population between *lower* and *upper*,
we iterate through all existing populations within the range,
and then through all the cities for that population:

    findBetween(lower: Int, upper: Int) -> Set of City:
        result = new Set()
        for each population in cityPopulations.keysBetween(lower, upper):
            for each city in cityPopulations.get(population):
                result.add(city)
        return result

:::


### Implementing sorted sets and maps using dynamic arrays

Sorted sets can be implemented using a sorted dynamic array.
The range query "are there any elements between $a$ and $b$?",
can then be answered by the following algorithm:

-   Find the position in the array of the *smallest* element $e \geq a$.
    (This can be done efficiently using *binary search*, from @sec:intro:searching.)
-   Check if $e\leq b$.

So, if we have a sorted array all kinds of range queries can be implemented efficiently.
However, we get into trouble if we want to add or remove elements.
Since we have to keep the array sorted at all times,
we might have to move a lot of elements when we insert something,
just as we did when we tried to implement a priority queue in
@sec:ADTs:priority-queues.
A similar problem occurs when we want to delete an element,
we need to move the other elements to close the gap in the array.

How can we implement sorted maps using dynamic arrays?
One possible solution is to keep two arrays -- one for the keys and one for the values.
Then all queries where we search for a key can be done using binary search, just as for sorted sets.
When we have found the position of the key we can lookup its value in the other array.
The implementations of the map methods are left as exercises to the reader,
but there are some important things to remember:

-   The `keys` and `values` must be kept in sync, so that `keys[i]` is always the key for the value in `values[i]`.
-   This means that we have to remember to modify both arrays in the same way --
    if we delete the $i$th element we have to delete both `keys[i]` and `values[i]`
    (and shift the arrays in the same way).

In fact, exactly the same data structure can be used to implement a *sorted multimap*.
The only change is that we will allow duplicate keys in the key array.
To find all values in this multimap, whose keys are between $a$ and $b$, we can use the following algorithm:

- Find the position of the *smallest* key $k_1\geq a$ (using binary search).
- Find the position of the *largest* key $k_2\leq b$ (again using binary search).
- Return everything between those two positions in the value array.
