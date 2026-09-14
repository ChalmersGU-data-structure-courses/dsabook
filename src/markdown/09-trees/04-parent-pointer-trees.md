
## Case study: Disjoint sets {#trees:disjoint-sets}


@Sec:trees:general-trees showed a possible way to implement a general tree,
where the children are represented by a list of pointers to subtrees.
This becomes a little complicated, since the number of children can vary a lot
for different nodes in the same tree.

But one common property for all trees is that every node can have only one *parent*.
This means that we can come up with another implementation of trees, where each node only points to its parent.
We call this a [parent-pointer tree]{.term}, and it has a very simple declaration:

    datatype ParentTree:
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
In fact, the parent-pointer tree has a very limited use,
but it can be used to implement a special data structure called *disjoint sets*, or *disjoint union*.

In some algorithms, such as Kruskal's algorithm that we will encounter in @Sec:graphs:kruskals-algorithm,
we need an efficient way of asking if two elements belong to the same set.
If we store the sets as parent-pointer trees,
and let every element remember its own parent-pointer tree node, then the question becomes very easy.
To decide if two elements $a,b$ belong to the same set,
we find the roots of $a$ and $b$ in their respective trees.
If they have the same root, then they belong to the same set.
The fundamental algorithm here is to *find* the root of a tree,
and this as simple as following the parent pointers until we cannot go longer.

Algorithms that make use of disjoint sets, such as Kruskal's,
also need an efficient way to create parent-pointer trees.
It is of course trivial to create a tree representing a set with only one value,
but they also need a way to quickly take the *union* of two sets.
This is also an operation that parent-pointer trees can support easily:

::: algorithm
#### Algorithm: The union of two parent-pointer trees
First we find the roots of the two trees.
If the roots are equal, the trees are already merged.
Otherwise assign one of the roots as the parent of the other root.
:::

This data structure is also called *Union/Find*,
because these are the only two operations it supports.
So it is a very limited data structure, but it fits perfectly for some algorithms, such as Kruskal's.

The very simple version we have shown above does not have a very good time complexity, unfortunately.
If we are unlucky the tree will be very unbalanced and the *find* operation will be linear in the size of the tree, $O(n)$.
But with some simple optimisations we can get a really fast data structure:

-   When taking the *union*, we have to choose which root should be the root of the union.
    We can for example select the root of the largest tree, or of the highest tree.
    For this to work we need to store the size or the height in all tree nodes.

-   When *finding* the root, we can modify the tree in place, using *path compression*.
    This means that we reassign the parent pointers along the path while we walk towards the root.
    We want the tree to be as flat as possible, and if we reassign the parent pointer to the root
    we make the tree much flatter.

If we implement these two optimisations, the *union* and *find* operations becomes extremely fast.
It is possible to prove that they are *almost* constant time, amortised.
To be precise, the complexity of the operations is $O(\alpha(n))$, which is the *inverse Ackermann function*.
This function grows so slow that $\alpha(n) < 5$ for all practical values of $n$.
