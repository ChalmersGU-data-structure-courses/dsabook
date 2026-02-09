
## Shortest-paths problems

::: TODO
- Prio 2: introduction, discussing
    - directed/undirected graphs
    - remembering visited nodes
    - shortest-path tree vs MST
- Prio 2: use cases
:::

Another well-known and very common problem is to find the shortest path between two vertices in a weighted graph. This time the graph can be directed too.

The prototypical example is if the graph represents a road network and you want to find the shortest route between two vertices. Note that “shortest” doesn’t have to mean a distance in kilometers – if the weights denote travel times, then the problem will be to find the *fastest* route.

But there are hundreds of other examples of shortest path problems that one might not even think of as graph in the first place. For example, finding the best move in a chess game, solving a puzzle, proving a mathematical theorem, or even deciding what to say in a conversation, can be formulated as shortest-path problems in some graph.

Formally, the *shortest path* between two vertices is a path whose total cost is as low as possible. This of course assumes that there is a path, and from here on we will assume that the path actually exists. Just as for MSTs there might be several shortest paths – that is, different paths with the same total cost.

We also have to distinguish between the shortest path and the path with the fewest edges – for example, in our example graph the shortest path between $A$ and $E$ is $ABCE$ (cost 4+2+7 = 13), while there is a path with only two edges ($ACE$ with cost 7+7 = 14).

If we want to know the shortest paths to every vetex from a given start vertex, we have the *single-source* problem. The solution is the shortest* path tree* (which is not only a tree, but a spanning tree). Here are the shortest path trees from $A$ and from $F$:

![](images/Graphs-TwoSPTs.png)


---------------

If you have an *unweighted* graph, the [shortest path]{.term} between two vertices is the smallest number of edges you
have to pass to get from one of the vertices to the other.

If you agument the [breadth-first search]{.term} algorithm from @sec:breadth-first-search
to remember which vertex a visited vertex came
from, if will give you the shortest path between the start vertex and
any other vertex. However, things become sligthly more complicated if
the graph is weighted.

#### Shortest-paths on weighted graphs

On a road map, a road connecting two towns is typically labeled with its
distance. We can model a road network as a directed graph whose edges
are labeled with real numbers. These numbers represent the distance (or
other cost metric, such as travel time) between two vertices. These
labels may be called [weights]{.term},
[costs]{.term}, or
[distances]{.term}, depending on the
application. Given such a graph, a typical problem is to find the total
length of the shortest path between two specified vertices. This is not
a trivial problem, because the shortest path may not be along the edge
(if any) connecting two vertices, but rather may be along a path
involving one or more intermediate vertices.

For example, in @fig:GraphShortestPath,
the cost of the path from $A$ to $B$ to $D$ is 15. The cost
of the edge directly from $A$ to $D$ is 20. The cost of the path from
$A$ to $C$ to $B$ to $D$ is 10. Thus, the shortest path from $A$ to $D$
is 10 (rather than along the edge connecting $A$ to $D$). We use the
notation $\mathbf{d}(A, D) = 10$ to indicate that the shortest distance
from $A$ to $D$ is 10. In the figure, there is no path from $E$ to $B$, so we set
$\mathbf{d}(E, B) = \infty$. We define $\mathbf{w}(A, D) = 20$ to be the
weight of edge $(A, D)$, that is, the weight of the direct connection
from $A$ to $D$. Because there is no edge from $E$ to $B$,
$\mathbf{w}(E, B) = \infty$. Note that $\mathbf{w}(D, A) = \infty$
because the graph is directed. We assume that all weights are positive.

::: {.jsav-figure #fig:GraphShortestPath}
``` {src="Graph/DistanceExampCON.js"}
```
Example graph for shortest-path definitions
:::

<!--
### Use cases for shortest paths
 -->

