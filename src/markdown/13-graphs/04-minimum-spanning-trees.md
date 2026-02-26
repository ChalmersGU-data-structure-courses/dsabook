
## Minimum spanning trees

::: TODO
- Prio 2: add use cases
:::

<!-- START NOTES -->

A *spanning tree* of an undirected graph is a tree that includes (spans) all the vertices of the graph. This of course assumes that the graph is connected, otherwise it is not possible. (An unconnected graph can instead have a spanning *forest*.)

**Fact**. The number of edges in a spanning tree is exactly $V-1$.
(Why is this? Try to convince yourself about it.)

If the graph is weighted, a *minimum spanning tree* (MST) is a spanning tree whose total cost is as small as possible. A graph often has several MSTs -- for example, if all weights are the same, then all spanning trees are MSTs. But note this little theorem:

**Theorem**. If all weights are distinct from each other, there is exactly one MST.
(See proof here: https://en.wikipedia.org/wiki/Minimum_spanning_tree#Uniqueness)

Our example graph has two possible MSTs:

![](images/Graphs-TwoMSTs.png)

The MST is used in many different algorithms, and there are a lot of use cases which rely heavily on finding the MST -- for example, when designing all kinds of networks, such as computer networks, telecommunications networks, transportation networks, water supply networks, and electrical grids.

In this book you will learn two algorithms for finding the MST of a graph.

<!-- END NOTES -->

-------------

The [minimum spanning tree]{.term} (MST)
problem takes as input a connected, undirected graph $\mathbf{G}$, where
each edge has a distance or weight measure attached. The MST is also
called *minimal-cost spanning tree* (MCST).

The MST is the graph containing the vertices of $\mathbf{G}$ along with
the subset of $\mathbf{G}$ 's edges that (1) has minimum total cost as
measured by summing the values for all of the edges in the subset, and
(2) keeps the vertices connected. Applications where a solution to this
problem is useful include soldering the shortest set of wires needed to
connect a set of terminals on a circuit board, and connecting a set of
cities by telephone lines in such a way as to require the least amount
of cable.

The MST contains no cycles. If a proposed MST did have a cycle, a
cheaper MST could be had by removing any one of the edges in the cycle.
Thus, the MST is a free tree with $|\mathbf{V}| - 1$ edges. The name
"minimum-cost spanning tree" comes from the fact that the required set
of edges forms a tree, it spans the vertices (i.e., it connects them
together), and it has minimum cost.
@Fig:GraphMST shows the MST for an example graph.

::: {.jsav-figure #fig:GraphMST}
``` {src="Graph/MCSTCON.js"}
```
A graph and its MST.
All edges appear in the original graph.
Those edges drawn with heavy lines indicate the subset making up the MST.
Note that edge $(C, F)$ could be replaced with edge $(D, F)$ to form a different MST with equal cost.
:::

<!--
### Use cases for minimum spanning trees
 -->

<!--
### Algorithms for finding the MST

::: TODO
- Prio 2: overview description of Kruskal, Prim and Boruvka
:::
 -->
