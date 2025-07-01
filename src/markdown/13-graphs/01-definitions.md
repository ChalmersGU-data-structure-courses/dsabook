
## Definitions and properties

::: TODO
- Prio 1: add info about sparse / dense
:::


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

:::: {#GraphTerms}
<inlineav id="GdirundirCON" src="Graph/GdirundirCON.js" name="Graph/GdirundirCON" links="Graph/GraphDefCON.css" static/>

Some types of graphs.
::::

An edge connecting Vertices $a$ and $b$ is written $(a, b)$. Such an
edge is said to be [incident]{.term} with
Vertices $a$ and $b$. The two vertices are said to be
[adjacent]{.term}. If the edge is directed from
$a$ to $b$, then we say that $a$ is adjacent to $b$, and $b$ is adjacent
from $a$. The [degree]{.term} of a vertex is the
number of edges it is incident with. For example, Vertex $e$ below has a
degree of three.

In a directed graph, the [out degree]{.term} for
a vertex is the number of neighbors adjacent from it (or the number of
edges going out from it), while the [in degree]{.term} is the number of neighbors adjacent to it (or the number of
edges coming in to it). In (c) above, the in degree of Vertex 1 is two,
and its out degree is one.

<inlineav id="GneighborCON" src="Graph/GneighborCON.js" name="Graph/GneighborCON" links="Graph/GraphDefCON.css" static/>

A sequence of vertices $v_1, v_2, ..., v_n$ forms a
[path]{.term} of length $n-1$ if there exist
edges from $v_i$ to $v_{i+1}$ for $1 \leq i < n$. A path is a
[simple path]{.term} if all vertices on the path
are distinct. The [length]{.term} of a path is
the number of edges it contains. A [cycle]{.term} is a path of length three or more that connects some vertex
$v_1$ to itself. A cycle is a [simple cycle]{.term} if the path is simple, except for the first and last
vertices being the same.

<inlineav id="GpathDefCON" src="Graph/GpathDefCON.js" name="Graph/GpathDefCON" links="Graph/GraphDefCON.css" static/>

An undirected graph is a [connected graph]{.term} if there is at least one path from any vertex to any other.
The maximally connected subgraphs of an undirected graph are called
[connected components](#connected-component){.term}. For example, this figure shows an undirected graph with
three connected components.

:::: {#ConCom}
<inlineav id="GconcomCON" src="Graph/GconcomCON.js" name="Graph/GconcomCON" links="Graph/GraphDefCON.css" static/>
::::

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
[clique]{.term}.n

<inlineav id="GsparseDefCON" src="Graph/GsparseDefCON.js" name="Graph/GsparseDefCON" links="Graph/GraphDefCON.css" static/>

A graph without cycles is called an [acyclic graph]{.term}. Thus, a directed graph without cycles is called a
[directed acyclic graph]{.term} or
[DAG]{.term}.

<inlineav id="GacyclicDefCON" src="Graph/GacyclicDefCON.js" name="Graph/GacyclicDefCON" links="Graph/GraphDefCON.css" static/>

A [free tree]{.term} is a connected, undirected
graph with no simple cycles. An equivalent definition is that a free
tree is connected and has $|\mathbf{V}| - 1$ edges.
