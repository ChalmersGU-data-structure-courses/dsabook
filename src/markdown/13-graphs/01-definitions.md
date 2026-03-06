
## Definitions and properties

::: TODO
- Terminology: labelled/weighted, incident, simple path, simple cycle, clique, free tree
- Terminology: If length is number of edges and cost is total weight, why is it called "shortest path" and not "cheapest path"...
- Move the definitions of strongly connected components later section?
- Decide which of the graphics to keep.
- Structure up the definitions a bit. Try to separate graph classifications (directed, weighted, sparse, dense...) from terms (path, cycle, degree, ...)
:::

A graph consists of a set of vertices (or nodes), and edges. We usually denote the set of vertices as $V$ and edges as $E$. The size of a graph is the number of vertices $n=|V|$, but we often write just $V$ (or $E$) instead of $|V|$ (or $|E|$). 

The *degree* of a vertex is the number of edges that is connected to it. This means that the sum of all degrees is $2|E|$, because every edge is counted twice. We can classify graphs according to their average degree:

- In a *sparse* graph the number of edges are small, something like $E \in O(V)$, and the average degree is close to constant.
- In a *dense* graph the number of edges are large, something like $E \in O(V^2)$, and the average degree grows with the size of the graph. In the most extreme case, a graph is *complete*, with every vertex having a direct edge to all vertices, in which case $O(E) = O(V^2)$.

In a *directed* graph, every edge has a specified direction (indicated by arrows in when drawing them). An edge from $A$ to $B$ is not different from an edge from $B$ to $A$. Each vertex has an *outdegree* and an *indegree*. The sum of all outdegrees is the same as the sum of all indegrees, which is $|E|$. Directed graphs are more general than undirected graphs, in the sense that any undirected graph can be encoded as a directed graph where every edge has a complementary edge in the opposite direction. Some notions (such as the *minimum spanning tree*) are only defined for undirected graphs. 

In a *weighted* graph all edges have a weight. Many algorithms only work on graphs with positive weights, for example Dijkstra's algorithm. An *unweighted* graph is the same as a graph where all weights are 1.

In @fig:GraphExamples, the left graph is an undirected graph, and the right is a weighted directed graph. The *degree* of node $B$ in the left graph is $3$. The *outdegree* of vertex $A$ in the right graph is $2$ while the *indegree* is 1.

A *path* is a sequence of vertices $v_0, \ldots, v_n$ where there exists an edge between each vertex pair $v_{i-1}, v_i$.
The *length* of a path is the number $n$ of edges, and the *cost* of a path is the sum of the weights of its edges.
A *cycle* is a path (of at least length 3) that starts and ends in the same vertex.
An *acyclic* graph is a graph that doesn't have any cycles.
A *directed acyclic graph* (DAG) is a common kind of graph for which there are many special algorithms.
Two nodes are *adjacent* if there is an edge between them. For directed graphs, we can say $A$ is adjacent to $B$ or $B$ is adjacent *from* $A$ to mean the same thing (an edge from $A$ to $B$).

A *subgraph* is a subset of the vertices of a graph, plus all edges that connect them. A graph is *connected* if there is a path between any pair of vertices. A connected subgraph is called a *connected component*. For example, in a graph where vertices are nations and edges are land borders, each continent would be a connected component.
If the graph is directed we instead talk about *strongly connected components* (a weakly connected means there are paths in at least one direction, and strongly connected means in both).

There are many additional ways to classify graphs, for instance: Should they allow edges between a node and itself (as we see in $D$ in the right graph in our example)? What data is contained in nodes and in edges? Look at the list of example domains and consider if they should be directed/undirected, weighted, acyclic, connected, etc.


<!--

::: {.jsav-figure #fig:GraphTypes}
``` {src="Graph/GdirundirCON.js" links="Graph/GraphDefCON.css"}
```
Some types of graphs
:::

::: {.jsav-figure #fig:GraphNeighbors}
``` {src="Graph/GneighborCON.js" links="Graph/GraphDefCON.css"}
```
Neighbors and incidence
:::

::: {.jsav-figure #fig:GraphPaths}
``` {src="Graph/GpathDefCON.js" links="Graph/GraphDefCON.css"}
```
Different types of paths
:::

::: {.jsav-figure #fig:GraphConnectedComponents}
``` {src="Graph/GconcomCON.js" links="Graph/GraphDefCON.css"}
```
An undirected graph with three connected components
:::


::: {.jsav-figure #fig:GraphSparseDense}
``` {src="Graph/GsparseDefCON.js" links="Graph/GraphDefCON.css"}
```
Sparse, dense and complete graphs
:::


::: {.jsav-figure #fig:GraphAcyclic}
``` {src="Graph/GacyclicDefCON.js" links="Graph/GraphDefCON.css"}
```
Acyclic graph types
:::
-->