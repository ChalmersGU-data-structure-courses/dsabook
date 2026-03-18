
## Shortest-path problems and Dijkstra's algorithm

::: TODO
- Prio 2: introduction, discussing
    - directed/undirected graphs
    - remembering visited nodes
- Prio 2: use cases
:::

<!-- START NOTES -->

Breadth-first traversal using a queue lets us find the shortest paths through an unweighted graph, but if we want to do something like finding the 
fastest car route through a city we need to generalize to finding shortest paths in *weighted* graphs.  
Note that "shortest" doesn't have to mean a distance in kilometers -- if the weights denote travel times, then the problem will be to find the *fastest* route.

There are hundreds of other examples of shortest path problems that one might not even think of as graph in the first place. 
For example, finding the best move in a chess game, solving a puzzle, proving a mathematical theorem, or even deciding what to say in a conversation, can be formulated as shortest-path problems in some graph.

Formally, the *shortest path* between two vertices is a path whose total cost is as low as possible. 
This of course assumes that there is a path, and from here on we will assume that the path actually exists. 
Just as for BFS there may be several shortest paths -- that is, different paths with the same total cost.

![On the left is an undirected weighted graph, and on the right two different SPTs for $A$ and $F$ respecitvely, shown both in the graph and in standard tree notation.](images/Graphs-SPTs.svg){width=90% #fig:GraphSPTs}

As we saw with DFS for unweighted graphs, the algorithm does not only find a path from one vertex to another, but from one vertex to all others. 
This is called the *single-source* shortest path problem. The solution is the *shortest path tree* (SPT). Figure @fig:GraphSPTs shows two shortest path trees in an example graph.

The trees show us things like `[A,D,E]` being the shortest path from $A$ to $E$ with a cost of $5$, and `[F,E,D]` being the shortest from $F$ to $D$. Neither of the trees help us figure out the shortest paths from $B$ to $E$, to do that we would need to construct an SPT for $B$.


<!-- END NOTES -->
<!--
---------------

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
-->

<!--
### Use cases for shortest paths
 -->

