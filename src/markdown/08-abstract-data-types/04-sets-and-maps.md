
## Sets and maps {#ADTs:sets-and-maps}

::: TODO
- Prio 1: remove the naive implementation from the list below - it's not a recommended implementation
- Prio 1: change title and beginning of:
    - "Implementing sets and maps using linked lists": it must be clear that this is a bad implementation
    - "Analysis of the naive implementation"
- Prio 1: shorten subsection "Implementing sets and maps using linked lists"
- Prio 1: change order between "set" and "map"? and show how to implement a set using a map
- Prio 2: shorten subsection "multimaps"? maybe make it an "example" instead of a subsection?
    (an example of how to implement a new data structure from existing)
- Prio 2: are there better examples than (spell-checking, cash register, search engines)?
:::

Consider these examples of information retrieval problems:
<!-- NICSMA: END -->

Spell-checking
:   Given a collection of containing valid English words, check if a given string is a valid word.

Cash register
:   Given a database of everything for sale in a supermarket,
    find information about the item with a given *EAN code*.

Search engine
:   Given a collection of documents, find all documents containing a given word.

These problems, and many more like them, can all be solved using two abstract
data types: the *set* and the *map*.
Both provide efficient ways to manage a collection of elements,
supporting operations to find, add, and remove elements.

Sets and maps are perhaps the most widely used data types of all, and it is vital to have
efficient data structures for both lookups and construction.
Just as with priority queues, we will demonstrate that arrays and linked lists
are insufficient for sets and maps. Later on, we will see implementations using
*self-balancing search trees* and *hash tables*, in [Chapter @sec:search-trees]
[Chapter @sec:hash-tables] respectively.

### Sets {#ADTs:sets}

<!-- NICSMA: START -->
A *set* represents a collection of items, where we can *add* and *remove* items,
and *check* if a given item is present in the set.
A set cannot contain duplicate items:
if we try to add an item that is already present, nothing happens, and the set is left unchanged.
We can specify a minimal interface for sets like this:

    interface Set of K extends Collection:
        add(set, key: K)               // Adds the key to the set.
        remove(set, key: K)            // Removes the key from the set, if it is there.
        contains(set, key: K) -> Bool  // Returns true if the key is in the set.

::: {.example #ex:spell-checking}
#### Example: Spell-checking

We can use a set to create a very simple spell-checker,
like the first example at the beginning of this section.

To create the spell-checking lexicon, we start with an initially empty set,
and then repeatedly *add* each valid word to the set.
Then to spell-check a given word, we just call *contains* on the set.
:::
<!-- NICSMA: END -->

We could also extend the interface with "bulk" operations,
for taking the *union* or *intersection* of two sets.
There are some data structures that can handle operations like that efficiently,
such as the *disjoint-set* data structure (see @sec:trees:disjoint-sets).
But it is very difficult to design data structures that can handle bulk operations,
so we do not introduce any interface for them in this introductory text.

### Maps, or dictionaries {#ADTs:maps}

A *map* (also called a dictionary) represents a set of *keys*, where each key
has an associated *value*.
To add an element to the map, we need to specify both the key and the associated value.
The add operation on maps is usually called `put`.
We can also *check* if a given key is present in the map, and *look up* a key to
find the associated value.

A map cannot contain duplicate *keys*, so each key is associated with exactly one value.
If we call `put(map, key,value)`, but the key is already present, then the value
associated with the key is changed.
On the other hand, a map *can* contain duplicate *values*: two keys can map to the same value.
Here is a minimalistic interface for maps:

    interface Map of K to V extends Collection of K:
        put(map, key: K, value: V)     // Sets the value associated with the given key.
        get(map, key: K) -> V          // Returns the value associated with the given key.
        remove(map, key: K)            // Removes the key and its associated value.
        contains(map, key: K) -> Bool  // Returns true if the key has an associated value.

Note that maps depend on two different types, the keys `K` and the values `V`.
These types can be the same or different, depending on the needs of your application.

::: {.example #ex:cash-register}
#### Example: Cash register

A map is a perfect match for implementing the *cash register* example:
to find information about an item with a given EAN code.

Here, the key should be the EAN code that the barcode scanner recognises,
and the value should be a record containing information about the item.
For example, the information record could be structured like this:

    datatype Item:
        ean: String
        name: String
        price: Number
        expires: Date

Now, to put an item `p` in the database we simply call `put(database, p.ean, p)`,
and to find the item with barcode `code` we call `get(database, code)`.
:::

### Multimaps {#ADTs:multimaps}

<!-- NICSMA: START -->
Maps have the restriction that each key has only one value.
However, sometimes we want to store a list of records, where some records might have the same key.
Then we want something like a map, but where a key can have multiple values associated with it.
This structure is called a *multimap*.
<!-- NICSMA: END -->

Most programming languages do not provide a multimap data structure,
but we can easily implement one ourselves.
The idea is to use a *map*, whose value type is a *set* of the actual values that we are interested in:

    datatype Multimap of K to V:
        mmap: Map of K to (Set of V)

To add a value to a multimap `mm`, we specify a key and value just as with a regular map:

    mput(mm, key, value):
        set = get(mm.mmap, key)       // Fetch the set associated with key
        if set is null:               // There is no set associated with key
            set = new Set()           // Needs to use a specific set implementation
            put(mm.mmap, key, set)    // Associate key with the currently empty set
        add(set, value)               // Add value to the set associated with key

Other possible operations can be used to remove a value (with an associated key),
and to iterate over all values for a given key.

Note that we do not have to `put` the updated set back into the internal map.
Complex data structures are *mutable*:
when we update a set using `add` it is modified *in-place* -- so it is still pointed to by the internal map.

::: {.example #ex:search-engine}
#### Example: Search engine

The *search engine* example is a good use case of a multimap.
<!-- NICSMA: START -->
First we have to build the database, which is a multimap where the key is a word,
and the values are all document id numbers containing that word.
Now, searching for a word just means looking it up in the multimap,
<!-- NICSMA: END -->
which is the same as calling `get` on the underlying map.
:::


<!--
### Implementing sets and maps using linked lists {#ADTs:sets-maps-using-linked-lists}

A simple (but inefficient) data structure to implement a set is a *linked list*.
Recall from @sec:sequences:linked-stacks that
a linked list consists of nodes pointing to their successors:

::: online
```jsav-figure
var av = NewAV();
var l = av.ds.list({nodegap: 30});
l.addFirst("").addFirst("").addFirst("");
l.layout();
av.displayInit();
av.recorded();
```
:::

::: latex

::: center
![](images/8.3-linked-list-set.svg)
:::

This list represents the set $\{A,B,C\}$. Note that we do not have an ordering invariant here, values can appear in any order in the list, so the lists $[C,B,A]$ and $[A,C,B]$ represent the same set.
The only invariant is that values are distinct, so the list $[A,A,B,C]$ is not a valid representation of a set.

:::

To search for an element we just iterate through all nodes and compare with the value we are looking for.
To add an element we can simply insert it at the head of the list.
But before we do that we have to search for it to check that it is not already in the list,
because a set does not allow duplicate elements.

To remove an element we search for it to get its node,
and then we repoint the preceding node to the node following it, like this to remove
element $B$:

::: center
![](images/8.3-linked-list-set-delete.svg)
:::

Conceptually this is not difficult, but the code becomes a little complicated
because we have to keep track of the preceding node:

    remove(set, key):
        previous = null
        node = set.head
        while node is not null and key != node.key:
            previous = node
            node = node.next
        if previous is null:
            set.head = node.next
        else:
            previous.next = node.next

Note that we have a special case:
if the preceding node is null it is the head of the list that should be removed.

The linked list can easily be modified to implement a map instead of a set.
We just augment the linked list nodes to also include the value:

    datatype MapNode:
        next = null  // Pointer to the next node in the list
        key          // Key for this node
        value        // Value for this node

Just as for priority queues, we can also use dynamic arrays to implement sets and maps,
and we will discuss that in the next section.
-->

### Implementing sets and maps using lists {#ADTs:sets-maps-using-linked-lists}

Just as with priority queues, the data structures we have seen so far does not allow for
an efficient enough set or map implementation.
Using an unsorted dynamic array or linked list gives $O(n)$ time for both `contains` (using linear search)
and `add` on a set.
You may think that `add` could be done in $O(1)$, but since `add` needs to prevent duplicates it
needs to perform a `contains` before adding anything to the list.

The best we can do so far is a sorted array. Contains can be implemented using binary search ([](#alg:binary-search)), which is $O(log(n))$. Modifications will still be $O(n)$, since insertion
into a sorted dynamic array is linear time.

There is a special case of sets and maps where a sorted array is perfectly fine: If the
content is *static*. In any application where the set or map is created all at once,
placing elements in an array and sorting it using a fast sorting algorithm takes
$O(n log(n))$, so $O(log(n))$ per element.
The spellchecker in [](#ex:spell-checking) is mostly static -- modifications to
the lexicon are likely to happen very rarely, so a fast add operation may not be needed.

