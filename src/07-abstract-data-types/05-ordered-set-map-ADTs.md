
## ADTs for ordered sets and maps

### Use case: Between X and Y

Consider the final example problem:

-   Given a list of all Swedish towns and their populations, find the
    towns whose population is between 5,000 and 10,000.

One way to solve this problem would be to use a multimap. The key would
be a population number, and the values would be all towns having that
population. Then we could find the required towns by making a sequence
of calls to `contains`:

-   `contains(5000)` - find all towns with 5,000 population
-   `contains(5001)` - find all towns with 5,001 population
-   `contains(5002)` - find all towns with 5,002 population
-   etc.

But this is not a sensible approach. We would need to make \~5,000 calls
to `contains`, and if we wanted to instead find all cities in Europe
having a population of between 1 and 2 million, we would need to make
\~1,000,000 calls.

There is a better way. If the towns are stored in an array, and sorted
by population, we can use the following algorithm:

-   Find the position in the array of the *first* town that has a
    population of *at least* 5,000. (We will see in the section about
    [binary search] that it
    is possible to find this position efficiently.)
-   Find the position in the array of the *last* town that has a
    population of *at most* 10,000.
-   Now return all towns between those two positions in the array.

This is an example of a *range query*: given a map, finding all items
whose key lies in a given range. Some map implementations support
answering range queries efficiently; we say that these data structures
implement *sorted maps*.

Apart from range queries, sorted maps support several other operations
that take advantage of the natural order of the keys:

-   Finding the *smallest* or *largest* key in the map.

-   Finding the *closest* key to a given one. Given a key $k$ (which may
    or may not be in the map), then:

    -   The *successor* of $k$ is the next key after $k$ in the map,
        i.e. the smallest key $k\prime$ such that $k < k\prime$.
    -   The *predecessor* of $k$ is the previous key before $k$ in the
        map, i.e. the greatest key $k\prime$ such that $k\prime < k$.

    A variant which is sometimes useful is *floor* and *ceiling*:

    -   The *floor* of $k$ is the greatest key $k\prime$ such that
        $k\prime \leq k$. If $k$ is in the map, then the floor of $k$ is
        just $k$; otherwise it is the predecessor of $k$.
    -   The *ceiling* of $k$ is the least key $k\prime$ such that
        $k \leq k\prime$. If $k$ is in the map, then the ceiling of $k$
        is just $k$; otherwise it is the successor of $k$.

### Sorted sets

As well as a sorted map, it is also possible to have a *sorted set*.
Recall the interface for sorted sets from
[the course API](#all-adts-used-in-this-book):

    interface SortedSet extends Set:
        first()          // Returns the first (smallest) element.
        last()           // Returns the last (largest) element.
        floor(x)         // Returns the closest element <= x, or nothing if there is no such element.
        ceiling(x)       // Returns the closest element >= x, or nothing if there is no such element.
        lower(x)         // Returns the closest element < x, or nothing if there is no such element.
        higher(x)        // Returns the closest element > x, or nothing if there is no such element.
        between(x1, x2)  // Returns all elements x such that x1 <= x <= x2.


### Sorted maps

Recall the interface for sorted maps from
[the course API](#all-adts-used-in-this-book):

    interface SortedMap extends Map:
        firstKey()               // Returns the first (smallest) key.
        lastKey()                // Returns the last (largest) key.
        floorKey(key)            // Returns the closest key <= k, or nothing if there is no key.
        ceilingKey(key)          // Returns the closest key >= k, or nothing if there is no key.
        lowerKey(key)            // Returns the closest key < k, or nothing if there is no such element.
        higherKey(key)           // Returns the closest key > k, or nothing if there is no such element.
        keysBetween(key1, key2)  // Returns all keys k such that k1 <= k <= k2.

::: topic
#### Example: Small Swedish towns {-}

Here is how to use a sorted map ADT to find all Swedish towns having
between 5,000 and 10,000 population. As there may be towns that have the
same population, we need a *multimap*. As before, we solve this by
having the key be a population number and the value be a set of towns.

    class City:
        City(name, population):
            this.name = name
            this.population = population

    class CityPopulations:
        // Similar to the search engine, use a map where the value is a list of cities.
        CityPopulations():
            this.cities = new SortedMap()

        add(city):
            // Add a new city to the database.
            // Get the set of documents containing this city
            set = this.cities.get(city.population)
            if set is null:
                // This is the first city with this population
                set = new Set()

            // Add the city to the set
            set.add(city)
            this.cities.put(city.population, set)

        findBetween(lower, upper):
            // Find all cities with a population between lower and upper
            result = new Set()
            // The range query returns a set of keys, i.e. populations.
            for each population in this.cities.keysBetween(lower, upper):
                // cities.get(population) returns the list of cities with that population.
                for each city in this.cities.get(population):
                    result.add(city)
            return result

:::
