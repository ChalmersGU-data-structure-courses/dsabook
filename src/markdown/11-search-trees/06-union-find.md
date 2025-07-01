
## Disjoint sets and the Union/Find algorithm {#disjoint-sets}

::: TODO
- Prio 2: add use case = Kruskal's algorithm
- Prio 3: update text and code
:::

[General trees](#general-tree){.term} (@sec:general-trees) are trees
whose [internal nodes](#internal-node){.term}
have no fixed number of [children](#child){.term}. Compared to general trees,
[binary trees](#binary-tree){.term} are
relatively easy to implement because each internal node of a binary tree
can just store two pointers to reach its (potential) children. In a
general tree, we have to deal with the fact that a given node might have
no children or few children or many children.

Even in a general tree, each node can have only one
[parent]{.term}. If we didn't need to go from a
node to its children, but instead only needed to go from a node to its
parent, then implementing a node would be easy. A simple way to
represent such a general tree would be to store for each node only a
pointer to that node's parent. We will call this the
[parent pointer representation]{.term} for
general trees. Clearly this implementation is not general purpose,
because it is inadequate for such important operations as finding the
leftmost child or the right sibling for a node. Thus, it may seem to be
a poor idea to implement a general tree in this way. However, the parent
pointer implementation stores precisely the information required to
answer the following, useful question:
***Given two nodes, are they in the same tree?***

:::::: latex
\booklink{Read the rest online}{11.6}{sec:disjoint-sets}
::::::

:::::: online

To answer this question, we need only follow the series
of parent pointers from each node to its respective root. If both nodes
reach the same root, then they must be in the same tree. If the roots
are different, then the two nodes are not in the same tree.

### Parent pointer trees

The parent pointer representation is most often used to maintain a
collection of [disjoint sets]{.term}. Two
disjoint sets share no members in common (their intersection is empty).
A collection of disjoint sets partitions some objects such that every
object is in exactly one of the disjoint sets. There are two basic
operations that we wish to support:

1.  Determine if two objects are in the same set (the **Find** operation), and
2.  Merge two sets together (the **Union** operation).

Because two merged sets are united, the merging operation is called
**Union** and the whole process of
determining if two objects are in the same set and then merging the sets
goes by the name **[Union/Find]{.term}**.

To implement **Union/Find**, we represent each disjoint set with a separate
general tree. Two objects are in the same disjoint set if they are in
the same tree. Every node of the tree (except for the root) has
precisely one parent. Thus, each node requires the same space to
represent it. The collection of objects is typically stored in an array,
where each element of the array corresponds to one object, and each
element stores the object's value (or a pointer to the object). The
objects also correspond to nodes in the various disjoint trees (one tree
for each disjoint set), so we also store the parent value with each
object in the array. Those nodes that are the roots of their respective
trees store an appropriate indicator. Note that this representation
means that a single array is being used to implement a collection of
trees. This makes it easy to merge trees together with **Union** operations.

Here is an implementation for parent pointer trees and the **Union/Find** process.

    // General tree implementation for Union/Find
    datatype ParentPointerTree:
        array: Array of Int

        constructor(size):
            // Each node is its own root to start
            array = new Array(size)
            for i in 0 .. size-1:
                array[i] = -1  // We use -1 to say that this is a root

        // Merge two subtrees if they are different:
        union(a: Int, b: Int):
            root1 = find(a)    // Find root of node a
            root2 = find(b)    // Find root of node b
            if root1 != root2: // Merge two trees
                array[root1] = root2

        // Return the root of current's tree
        find(current: Int) -> Int:
            while array[current] != -1:
                current = self.array[current]
            return current  // Now we are at the root

The `ParentPointerTree` class has an array where each array position
corresponds to one object in some collection. Each array element stores
the array index for its parent. There are two main methods to implement.
**Union** merges two sets together, where each set corresponds to a
tree. **Find** is used to find the ultimate root for a node.

An application using the **Union/Find** operations should store a set of $n$
objects, where each object is assigned a unique index in the range 0 to
$n-1$. The indices refer to the corresponding parent pointers in the
array. Class `ParentPointerTree` creates and initializes the **Union/Find** array,
and methods **Union** and **Find** take array indices as inputs.
@Fig:UFfig visualises the parent pointer array.

<div id="fig:UFfig">
<inlineav id="UFfigCON" src="General/UFfigCON.js" name="General/UFfigCON" links="General/UFCON.css" static/>

The parent pointer array implementation. Each node corresponds to a
position in the node array, which stores its value and a pointer to its
parent. The parent pointers are represented by an array index
corresponding to the position of the parent. The root of any tree stores
a special value, such as -1. This is represented graphically in the
figure by a slash in the "Parent's Index" box. This figure shows two
trees stored in the same parent pointer array, one rooted at $F$ (with a
total of 9 nodes), and the other rooted at $J$ (with a total of 1 node).
</div>

### Equivalence classes

Consider the problem of assigning the members of a set to disjoint
subsets called
[equivalence classes](#equivalence-class){.term}. Recall that an
[equivalence relation]{.term} is [reflexive]{.term},
[symmetric]{.term}, and
[transitive]{.term}. Thus, if objects $A$ and
$B$ are equivalent, and objects $B$ and $C$ are equivalent, then we must
be able to recognize that objects $A$ and $C$ are also equivalent. In
this representation, since $A$ and $B$ are equivalent, they must be in
the same tree. Likewise for $B$ and $C$. We can recognize that $A$ and
$C$ are equivalent because they must also be in the same tree.

There are many practical uses for disjoint sets and representing
equivalences. For example, consider the graph of ten nodes labeled $A$
through $J$, in @fig:UFconcom.

<div id="fig:UFconcom">
<inlineav id="UFconcomCON" src="General/UFconcomCON.js" name="General/UFconcomCON" links="General/UFCON.css" static/>

A graph with two connected components. The tree of
@fig:UFfig shows the corresponding
tree structure resulting form processing the edges to determine the
connected components.
</div>

Notice that for nodes $A$ through $I$, there is some series of edges
that connects any pair of these nodes, but node $J$ is disconnected from
the rest of the nodes. Such a graph might be used to represent
connections such as wires between components on a circuit board, or
roads between cities. We can consider two nodes of the graph to be
equivalent if there is a path between them. Thus, nodes $A$, $H$, and
$E$ would be considered as equivalent, but $J$ is not equivalent to any
other. A subset of equivalent (connected) edges in a graph is called a
[connected component]{.term}. The goal is to
quickly classify the objects into disjoint sets that correspond to the
connected components.

Another use for disjoint sets occurs in
[Kruskal's algorithm]{.term} for computing the
[minimum spanning tree]{.term} for a [graph]{.term}. That algorithm
seeks to select the cheapest subset of the edges that still connects all
of the nodes in the graph. It does so by processing all edges of the
graph from shortest to longest, only adding an edge to the connecting
subset if it does not connect two nodes that already have some series of
edges connecting them.

The input to the **Union/Find** algorithm is typically a series of
equivalence pairs. In the case of the connected components example, the
equivalence pairs would simply be the set of edges in the graph. An
equivalence pair might say that object $C$ is equivalent to object $A$.
If so, $C$ and $A$ are placed in the same subset. If a later equivalence
relates $A$ and $B$, then by implication $C$ is also equivalent to $B$.
Thus, an equivalence pair may cause two subsets to merge, each of which
contains several objects.

Equivalence classes can be managed efficiently with the **Union/Find**
algorithm. Initially, each object is at the root of its own tree. An
equivalence pair is processed by checking to see if both objects of the
pair are in the same tree by calling **Find** on each of them. If their
roots are the same, then no change need be made because the objects are
already in the same equivalence class. Otherwise, the two equivalence
classes should be merged by the **Union** method.

The parent pointer representation places no limit on the number of nodes
that can share a parent. To make equivalence processing as efficient as
possible, the distance from each node to the root of its respective tree
should be as small as possible. Thus, we would like to keep the height
of the trees small when merging two equivalence classes together.
Ideally, each tree would have all nodes pointing directly to the root.
Achieving this goal all the time would require too much additional
processing to be worth the effort, so we must settle for getting as
close as possible.

### Weighted union

A low-cost approach to reducing the height is to be smart about how two
trees are joined together. One simple technique, called the
[weighted union rule]{.term}, joins the tree
with fewer nodes to the tree with more nodes by making the smaller
tree's root point to the root of the bigger tree. This will limit the
total depth of the tree to $O(\log n)$, because the depth of nodes only
in the smaller tree will now increase by one, and the depth of the
deepest node in the combined tree can only be at most one deeper than
the deepest node before the trees were combined. The total number of
nodes in the combined tree is therefore at least twice the number in the
smaller subtree. Thus, the depth of any node can be increased at most
$\log n$ times when $n$ equivalences are processed (since each addition
to the depth must be accompanied by at least doubling the size of the
tree).

Here is an implementation for **Union** when using weighted union.

    datatype ParentPointerTree:
        ...
        union(a, b):
            root1 = find(a)     // Find root of node a
            root2 = find(b)     // Find root of node b
            if root1 != root2:  // Merge with weighted union
                if weights[root2] > weights[root1]:
                    array[root1] = root2
                    weights[root2] = weights[root2] + weights[root1]
                else:
                    array[root2] = root1
                    weights[root1] = weights[root1] + weights[root2]


::: dsvis
The following slideshow illustrates a series of **Union** operations with
weighted union.

<inlineav id="UFCON" src="General/UFCON.js" name="Union/Find Example" links="General/UFCON.css"/>
:::

### Path compression

The weighted union rule helps to minimize the depth of the tree, but we
can do better than this.
[Path compression]{.term} is
a method that tends to create extremely shallow trees. Path compression
takes place while finding the root for a given node $X$. Call this root
$R$. Path compression resets the parent of every node on the path from
$X$ to $R$ to point directly to $R$. This can be implemented by first
finding $R$. A second pass is then made along the path from $X$ to $R$,
assigning the parent field of each node encountered to $R$.
Alternatively, a recursive algorithm can be implemented as follows. This
version of **Find** not only returns the root of the current node, but
also makes all ancestors of the current node point to the root.

    datatype ParentPointerTree:
        ...
        // Return the root of current's tree with path compression
        find(current):
            if array[current] == -1:
                return current  // Base case: we are at the root
            else:
                array[current] = find(array[current])
                return array[current]


::: dsvis
The following slide show illustrates path compression using the last
step in the previous example.

<inlineav id="pathcompCON" src="General/pathcompCON.js" name="Union/Find Path Compression Example" links="General/UFCON.css"/>
:::

Path compression keeps the cost of each **Find** operation very close to
constant.

To be more precise about what is meant by "very close to constant",
the cost of path compression for $n$ **Find** operations on $n$ nodes (when
combined with the weighted union rule for joining sets) is approximately
$O(n \log^* n)$. The notation $\log^* n$ means the number of times
that the log of $n$ must be taken before $n \leq 1$. For example,
$\log^* 65536$ is 4 because $\log 65536 = 16, \log 16 = 4, \log 4 = 2$,
and finally $\log 2 = 1$. Thus, $\log^* n$ grows *very* slowly, so the
cost for a series of $n$ **Find** operations is very close to $n$.

Note that this does not mean that the tree resulting from processing $n$
equivalence pairs necessarily has depth $O(\log^* n)$. One can
devise a series of equivalence operations that yields $O(\log n)$
depth for the resulting tree. However, many of the equivalences in such
a series will look only at the roots of the trees being merged,
requiring little processing time. The *total* amount of processing time
required for $n$ operations will be $O(n \log^* n)$, yielding
nearly constant time for each equivalence operation. This is an example
of [amortized analysis]{.term}.

<!--
The expression $\log^* n$ is closely related to the inverse of
Ackermann's function. For more information about Ackermann's function
and the cost of path compression for **Union/Find**, see
\[[Tarjan, 1975](#tarjan75){.citation}\].
The survey article by \[[Galil & Italiano, 1991](#galilitaliano91){.citation}\]
covers many aspects of the equivalence class problem.
-->

::: dsvis
TODO

<avembed id="UnionFindPRO" src="General/UnionFindPRO.html" type="pe" name="Union/Find Proficiency Exercise"/>
:::

::::::
