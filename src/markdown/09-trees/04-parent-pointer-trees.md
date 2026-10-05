
## Case study: Parent-pointer trees {#trees:parent-pointer-trees}

In the previous section we saw a possible way to implement a general tree,
where the children are represented by a list of pointers to subtrees.

This is not the only possible representation of a tree.
One common property for all trees is that every node can have only one *parent*.
This means that we can come up with another implementation of trees, where each node only points to its parent.
We call this a [parent-pointer tree]{.term}, and it has a very simple declaration:

    datatype ParentPointerTree:
        value    // The value of the node
        parent   // The parent of the node

But wait, this is just a linked list, and lists are not trees, right?
This is absolutely true, in one sense: if you look at a tree from the leaves,
then each path from a leaf to the root is essentially a linked list.
It becomes a tree because several nodes will share the same parent,
but there is no way to know this because you cannot see which nodes are shared or not.

So the downside with this representation is that we cannot work with the tree as a whole,
but we can only view it as a collection of back-pointing paths to the root.
(We know that the root is the root because its parent is *null*.)
In fact, the parent-pointer tree as described above has a very limited use,
but it has its applications when implementing programming languages.

### Disjoint sets {#trees:disjoint-sets}

There is another way of implementing a parent-pointer tree --
as a *map* that stores the parent of each tree node.
Every node has a parent except the root, so the map should not store any value for the root node.
As an example, the tree in @fig:TreeTerminology can be stored as a parent map like this:

$$
\{ D\mapsto B, E\mapsto B, F\mapsto B, G\mapsto C, B\mapsto A, C\mapsto A \}
$$

This representation is particularly useful when we want to implement a *disjoint set*.
A disjoint set is very specialised, which makes it an interesting case study for implementing a data structure.
Its only purpose is to store and build a *partition* of a number elements,
or in other words, a collection of disjoint sets.
There are only two operations it supports:

- *find*: returns the set that a given element belongs to
- *union*: merges two sets to form their union

Conceptually, each set is stored as a parent-pointer tree,
so the full disjoint set data structure can be seen as a collection of such trees.
In practice it uses a single parent map to store all sets.
This works just because the sets are disjoint --
one element can only belong to one single set, and therefore it has only one parent.
With this representation, the two operations are easy to implement:

- *find*($a$): Traverse the parent-pointers from $a$ until you reach the root, and then return the root.
- *union*($a,b$): Find the roots of $a$ and $b$.
  If they are different, set one of them to be a parent of the other one.

Note that we do not use a special datatype to represent the sets --
instead we use the root element as a unique identifier.
To test if two elements $a,b$ belong to the same set,
we can simply test if *find*($a$) and *find*($b$) are the same.

How can this very limited data structure be useful in any way?
It is in fact a crucial component in many *graph algorithms*,
and we will see a particular use case in @sec:graphs:kruskals-algorithm,
where we describe Kruskal's algorithm for *minimum spanning trees*.

#### Optimisations

Unfortunately, the simple implementations shown above do not have a very good time complexity.
If we are unlucky the parent-pointer tree will be very unbalanced
and the *find* operation will be linear in its size, $O(n)$.

But with some simple optimisations we can get a really fast data structure:

-   When taking the *union*, we have to choose which root should be the root of the merged sets.
    Two possible alternatives are to select the largest tree, or of the highest tree.
    For this to work we need to store the size or the height in every tree node.

-   When we *find* the root of an element, we can modify the tree in place, using *path compression*.
    This means that we reassign the parent pointers along the path while we walk towards the root.
    In the end we want the tree to be as flat as possible,
    and if we reassign every parent pointer to directly point at the root the tree becomes much flatter.

If we implement these two optimisations, the *union* and *find* operations become extremely fast.
It is possible to prove that they have *almost* constant amortised time complexity.^[
    To be precise, the complexity is amortised $O(\alpha(n))$, where $\alpha$ is the *inverse Ackermann* function.
    This function grows so slowly that $\alpha(n) < 5$ for all imaginable values of $n$, so we can pretend it is constant.
]
