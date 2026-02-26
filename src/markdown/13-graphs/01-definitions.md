
## Definitions and properties

::: TODO
- Prio 1: add info about sparse / dense
:::

<!-- START NOTES -->

A graph consists of a set of vertices (or nodes), and edges. We usually denote the vertices as $V$ and the edges as $E$. The size of a graph is the number of vertices $n=|V|$, but we often write just $V$ (or $E$) instead of $|V|$ (or $|E|$).

The *degree* of a vertex is the number of edges that is connected to it. This means that the sum of all degrees is $2|E|$, because every edge is counted twice. We can classify graphs according to their average degree:

- In a *sparse* graph the number of edges are small, something like $E \in O(V)$, and the average degree is close to constant.
- In a *dense* graph the number of edges are large, something like $E \in O(V^2)$, and the average degree grows with the size of the graph.

In the following we will most of the time assume that the graphs are sparse, partly because this makes our reasoning easier (we can assume that $O(E) = O(V)$), but mainly because these are the most common graphs.

In a *directed* graph each vertex has an *outdegree* and an *indegree*. The sum of all outdegrees is the same as the sum of all indegrees, which is $|E|$. Some notions (such as the minimum spanning tree) are only defined for undirected graphs.

In a *weighted* graph all edges have a weight. Many algorithms only work on graphs with positive weights, for example Dijkstra's algorithm. An *unweighted* graph is the same as a graph where all weights are 1.

Here is an example of a weighted undirected graph:

![](images/Graphs-Example.png)

A *path* is a sequence of vertices $v_0, \ldots, v_n$ where there exists an edge between each vertex pair $v_{i-1}, v_i$.
The *length* of a path is the number $n$ of edges, and the *cost* of a path is the sum of the weights of its edges.
A *cycle* is a path (of at least length 3) that starts and ends in the same vertex.
An *acyclic* graph is a graph that doesn't have any cycles.
A *directed acyclic graph* (DAG) is a common kind of graph for which there are many special algorithms.

A *subgraph* is a subset of the vertices of a graph, plus all edges that connect them. A graph is *connected* if there is a path between any pair of vertices. A connected subgraph is called a *connected component*. If the graph is directed we instead talk about *strongly connected components*.

In graph theory, a *tree* is an undirected connected acyclic graph. This is slightly different from the trees we talked about earlier, for example a (graph) tree is undirected. But we can turn a (graph) tree into a (tree) tree by deciding which vertex should be the root, and then direct all edges to go from the root to its children.

<!-- END NOTES -->

---------------


A [graph]{.term}
$\mathbf{G} = (\mathbf{V}, \mathbf{E})$ consists of a set of
[vertices](#vertex){.term} $\mathbf{V}$ and a
set of [edges]{.term} $\mathbf{E}$, such
that each edge in $\mathbf{E}$ is a connection between a pair of
vertices in $\mathbf{V}$. The number of vertices is written
$|\mathbf{V}|$, and the number of edges is written $|\mathbf{E}|$.
$|\mathbf{E}|$ can range from zero to a maximum of
$|\mathbf{V}|^2 - |\mathbf{V}|$.

::: note
*Note*: Some graph applications require that a given pair of vertices can
have multiple or parallel edges connecting them, or that a vertex
can have an edge to itself. However, the applications discussed here
do not require either of these special cases. To simplify our graph
API, we will assume that there are no duplicate edges.
:::

A graph whose edges are not directed is called an
[undirected graph]{.term}, as shown in part (a)
of the following figure. A graph with edges directed from one vertex to
another (as in (b)) is called a [directed graph]{.term} or [digraph]{.term}. A graph with
labels associated with its vertices (as in (c)) is called a
[labeled graph]{.term}. Associated with each
edge may be a cost or [weight]{.term}. A graph
whose edges have weights (as in (c)) is said to be a
[weighted graph]{.term}.
These are depicted in @fig:GraphTypes.

::: {.jsav-figure #fig:GraphTypes}
``` {src="Graph/GdirundirCON.js" links="Graph/GraphDefCON.css"}
```
Some types of graphs
:::

An edge connecting vertices $a$ and $b$ is written $(a, b)$. Such an
edge is said to be [incident]{.term} with
vertices $a$ and $b$. The two vertices are said to be
[adjacent]{.term}. If the edge is directed from
$a$ to $b$, then we say that $a$ is adjacent to $b$, and $b$ is adjacent
from $a$. The [degree]{.term} of a vertex is the
number of edges it is incident with. For example, vertex $e$ in @fig:GraphNeighbors has a
degree of three.

In a directed graph, the [out degree]{.term} for
a vertex is the number of neighbours adjacent from it (or the number of
edges going out from it), while the [in degree]{.term} is the number of neighbours adjacent to it (or the number of
edges coming in to it). In @fig:GraphTypes (c), the in degree of vertex 1 is two,
and its out degree is one.

::: {.jsav-figure #fig:GraphNeighbors}
``` {src="Graph/GneighborCON.js" links="Graph/GraphDefCON.css"}
```
Neighbors and incidence
:::

A sequence of vertices $v_1, v_2, ..., v_n$ forms a
[path]{.term} of length $n-1$ if there exist
edges from $v_i$ to $v_{i+1}$ for $1 \leq i < n$. A path is a
[simple path]{.term} if all vertices on the path
are distinct. The [length]{.term} of a path is
the number of edges it contains. A [cycle]{.term} is a path of length three or more that connects some vertex
$v_1$ to itself. A cycle is a [simple cycle]{.term} if the path is simple, except for the first and last
vertices being the same.
These are depicted in @fig:GraphPaths.

::: {.jsav-figure #fig:GraphPaths}
``` {src="Graph/GpathDefCON.js" links="Graph/GraphDefCON.css"}
```
Different types of paths
:::

An undirected graph is a [connected graph]{.term} if there is at least one path from any vertex to any other.
The maximally connected subgraphs of an undirected graph are called
[connected components](#connected-component){.term}. For example, @fig:GraphConnectedComponents shows an undirected graph with
three connected components.

::: {.jsav-figure #fig:GraphConnectedComponents}
``` {src="Graph/GconcomCON.js" links="Graph/GraphDefCON.css"}
```
An undirected graph with three connected components
:::

A graph with relatively few edges is called a
[sparse graph]{.term}, while a graph with many
edges is called a [dense graph]{.term}. A graph
containing all possible edges is said to be a
[complete graph]{.term}. A
[subgraph]{.term} $\mathbf{S}$ is formed from
graph $\mathbf{G}$ by selecting a subset $\mathbf{V}_s$ of
$\mathbf{G}$'s vertices and a subset $\mathbf{E}_s$ of $\mathbf{G}$ 's
edges such that for every edge $e  \in \mathbf{E}_s$, both vertices of
$e$ are in $\mathbf{V}_s$. Any subgraph of $V$ where all vertices in the
graph connect to all other vertices in the subgraph is called a
[clique]{.term}.
See @fig:GraphSparseDense for examples of these kinds of graphs.

::: {.jsav-figure #fig:GraphSparseDense}
``` {src="Graph/GsparseDefCON.js" links="Graph/GraphDefCON.css"}
```
Sparse, dense and complete graphs
:::

A graph without cycles is called an [acyclic graph]{.term}. Thus, a directed graph without cycles is called a
[directed acyclic graph]{.term} or [DAG]{.term}.
They are shown in @fig:GraphAcyclic.

::: {.jsav-figure #fig:GraphAcyclic}
``` {src="Graph/GacyclicDefCON.js" links="Graph/GraphDefCON.css"}
```
Acyclic graph types
:::

A [free tree]{.term} is a connected, undirected
graph with no simple cycles. An equivalent definition is that a free
tree is connected and has $|\mathbf{V}| - 1$ edges.
