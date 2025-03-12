
## Shortest-paths problems

::: TODO
- Prio 2: introduction, discussing
    - directed/undirected graphs
    - remembering visited nodes
    - shortest-path tree vs MST
- Prio 2: use cases
:::


### Shortest-paths on unweighted graphs

If you have an unweighted graph, the [shortest path]{.term} between two vertices is the smallest number of edges you
have to pass to get from one of the vertices to the other.

If you agument the [breadth-first search]
algorithm to remember which vertex a visited vertex came
from, if will give you the shortest path between the start vertex and
any other vertex. However, things become sligthly more complicated if
the graph is weighted.

### Shortest-paths on weighted graphs

On a road map, a road connecting two towns is typically labeled with its
distance. We can model a road network as a directed graph whose edges
are labeled with real numbers. These numbers represent the distance (or
other cost metric, such as travel time) between two vertices. These
labels may be called [weights](#weight){.term},
[costs](#cost){.term}, or
[distances](#distance){.term}, depending on the
application. Given such a graph, a typical problem is to find the total
length of the shortest path between two specified vertices. This is not
a trivial problem, because the shortest path may not be along the edge
(if any) connecting two vertices, but rather may be along a path
involving one or more intermediate vertices.

For example, in [Figure #DistExamp](#DistExamp),
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

:::: {#DistExamp}
<inlineav id="DistanceExampCON" src="Graph/DistanceExampCON.js" name="Graph/DistanceExampCON" static/>

Example graph for shortest-path definitions.
::::

### Use cases
