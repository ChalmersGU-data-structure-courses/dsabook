
## Minimum spanning trees and Prim's algorithm

::: TODO
- Prio 2: add use cases
:::

<!-- START NOTES -->

A *spanning tree* of an undirected graph is a tree that includes (spans) all the vertices of the graph. This of course assumes that the graph is connected, otherwise it is not possible. The notion of a tree used here is slightly different from the one used previously in the book. 
The tree is actually just an undirected subgraph with no cycles, it does not have a designated root, but *lifting* the subgraph by any particular vertex creates a standard tree as we have seen before.

**Fact**. The number of edges in a spanning tree is exactly $V-1$.
(Why is this? Try to convince yourself about it.)

If the graph is weighted, a *minimum spanning tree* (MST) is a spanning tree whose total cost is as small as possible. A graph often has several MSTs -- for example, if all weights are the same, then all spanning trees are MSTs. This example graph has two possible MSTs, each with a combined weight of $25$:

![](images/Graphs-TwoMSTs.png)

The MST is used in many different algorithms, and there are a lot of use cases which rely heavily on finding the MST -- for example, when designing all kinds of networks, such as computer networks, telecommunications networks, transportation networks, water supply networks, and electrical grids.

Note that an MST is different from a Shortest Path Tree (as produced by Dijkstra's algorithm). 
If our graph is a set of islands and the edges represent possible bridges between them, weighted by length of the bridge, then Dijkstra's gives lets us optimize bridges to have as short total distance from a designated starting node. 
The MST instead shows the shortest possible total length of bridges required to connect all islands. 
Both these are useful for different applications, and it is important to understand the difference. 

In this book you will learn two algorithms for finding the MST of a graph: Prim's algorithm is another example of a graph traversal, whereas Kruskal's algorithm is a different kind of algorithm.

<!-- END NOTES -->
<!--
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

-->

<!--
### Use cases for minimum spanning trees
 -->

<!--
### Algorithms for finding the MST

::: TODO
- Prio 2: overview description of Kruskal, Prim and Boruvka
:::
 -->
