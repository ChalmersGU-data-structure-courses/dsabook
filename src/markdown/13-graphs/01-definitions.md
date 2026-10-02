
## Definitions and properties {#graphs:definitions}

A graph consists of a set of *vertices* (or *nodes*) and a set of *edges*,
We usually denote the sets of vertices and edges, as $V$ and $E$, respectively.
The *size* of a graph is the number of vertices $n=|V|$, but we often write just $V$ (or $E$) instead of $|V|$ (or $|E|$).

#### Types of graphs

In a *directed* graph, every edge has a specified direction.
We often write an edge from $a$ to $b$ as $a\rightarrow b$,
and this is different from the reversed edge $b\rightarrow a$.
Directed graphs are more general than *undirected* graphs,
in the sense that any undirected graph can be encoded as a directed graph
where every edge has a complementary edge in the opposite direction.
However, some notions (such as the *minimum spanning tree*) are only defined for undirected graphs.
In @fig:GraphExamples, the left graph is an undirected graph, and the right is a directed graph.

In a *weighted* graph all edges have a weight.
Many algorithms only work on graphs with non-negative weights, for example Dijkstra's algorithm.
An *unweighted* graph is conceptually the same as a graph where all weights are 1.
In @fig:GraphExamples, the left graph is weighted.

#### Paths

A *path* is a sequence of edges, $e_1, e_2, \ldots, e_n$, which joins a sequence of vertices,
$a_0\rightarrow a_1\rightarrow a_2\rightarrow\cdots\rightarrow a_n$.
Usually this refers to a *simple path*, meaning a path with no repeated vertices
(since graphs can have cycles, general paths can be infinitely long).

The *length* of a path is the number $n$ of edges, and the *cost* of a path is the sum of the weights of its edges.
There is some confusion over this, since algorithms that find the minimal cost are usually referred to as *shortest path algorithms* and many use length to mean the sum of weights.

Two vertices are *adjacent* if there is an edge between them.
For directed graphs, we say that $b$ is adjacent to $a$ if there is an edge $a\rightarrow b$.
A vertex $b$ is *reachable* from $a$ if there exits a path from $a$ to $b$.
In directed graphs, reachability is not symmetric, $b$ may be reachable from $a$ but not the other way around.
A graph is *connected* if every vertex is reachable from every other vertex,
and if the graph is directed we call it *strongly connected*.

A *cycle* is a path that starts and ends in the same vertex,
and it is called *simple* if no vertex occurs twice in the path (excluding the start and end).
An *acyclic* graph is a graph that doesn't have any cycles, and a common special case is
a *directed acyclic graph* (DAG) for which there are many specialised algorithms.

The directed graph in @fig:GraphExamples contains three simple cycles
($A{\rightarrow}D{\rightarrow}A$, $A{\rightarrow}E{\rightarrow}D{\rightarrow}A$, and the loop $C{\rightarrow}C$).
If we remove the loop and the edge $D{\rightarrow}A$, the graph becomes a DAG.
Try to figure out how many simple cycles the undirected example graph has.

#### Trees and subgraphs

In graph theory, a *tree* is an undirected connected acyclic graph.
This is different from the trees we discussed in [Chapter @sec:trees], and can sometimes lead to confusion.
For example, trees in graph theory are not directed and do not have any special root vertex.
If we decide which vertex should be the root, then we can say that a *tree* is a directed acyclic graph where all vertices are reachable from the root.

A *subgraph* is a subset of the vertices and edges of a graph.
A *spanning tree* is both a subgraph and a tree which includes (spans) all the vertices of a graph.
This of course assumes that the graph is connected, otherwise it does not exist.

#### Vertex degree

The *degree* of a vertex is the number of edges that is connected to it, which is the same as the number of adjacent vertices.
This means that the sum of all degrees in an undirected graph is $2E$, because every edge is counted twice.
In directed graphs, each vertex has an *outdegree* and an *indegree*.
The sum of all outdegrees is the same as the sum of all indegrees, which is $E$.
In @fig:GraphExamples, the *degree* of vertex $B$ in the left graph is 3.
The *outdegree* of vertex $B$ in the right graph is 2 while the *indegree* is 1.

#### Sparse and dense graphs

We can roughly categorise graphs by the number of edges in relation to the size of the graph:

- In a *sparse* graph the number of edges are small, something like $E \in O(V)$,
  and the average degree is close to constant.
- In a *dense* graph the number of edges are large, something like $E \in O(V^2)$,
  and the average degree grows with the size of the graph.
- The most extreme case of a dense graph is *complete*,
  where all vertices are adjacent, in which case $E = V^2$.

An example of a sparse graph is a road network (where vertices are intersections).
Even the most chaotic road intersection will have fewer than say ten outgoing roads.
If the road network expands, we should not expect the average number of edges per vertex to grow.

An example of a dense graph could be air traffic, where vertices are airports and edges are potential flight routes.
<!-- Here the graph would be complete (if you can fly a plane directly between any pairs of airports). -->
If we double the number of airports, the average number of edges per vertex will also double,
and the total number of edges will quadruple.
(But note that it is probably more common to let the edges be *actual* flight routes,
and that graph will not be dense because airports have a capacity limit.)

Knowing if a graph is expected to be sparse impacts complexity analysis.
If we can assume the graph to be sparse, an algorithm that is $O(E\log(E))$ is objectively better than $O(V^2)$.
But this is not the case for a dense graph,
because then $O(E\log(E)) = O(V^2\log(V^2)) = O(V^2\log(V))$ which is slightly worse than $O(V^2)$.
Luckily, in practice, most graphs that we can think of and work with are sparse.

#### More classifications

There are many additional ways to classify graphs, for instance:
Do we allow loops -- edges between a vertex and itself
(such as the vertex $C$ in the right graph in @fig:GraphExamples)?
Can we store additional data in vertices and/or edges?
Do we allow directed edges in both directions between a specific pairs of vertices, or just one direction?
Look at the list of example domains from the chapter introduction and consider if they should be directed/undirected, weighted, acyclic, etc.


### Programming graph algorithms

Similar to trees, there is no universal Abstract Data Type for graphs, and the exact interface of a graph library can vary greatly.
Furthermore, many graphs are *implicit*, the developer never explicitly refers to their structure as a graph.
Perhaps the most common kind of graphs is just a class where each object has references to multiple other objects of the same class.
Consider for instance how this simple class forms a graph where vertices are people and edges are friendship links:

    datatype Person:
        name: String
        friends: List of Person

Furthermore, many graph problems do not involve modifying the graph, but merely analysing it.
This is different from, for example, sets or maps that we have discussed previously, where efficient modification is important.
For example: say that we want to model a city bus network as a graph, for a typical travel planning application.
Here is a rough estimate of the workload of different tasks for the system:

1. Adding or removing a bus stop (a vertex): Happens at most a handful of times per year.
2. Modifying a scheduled bus connection (an edge): Several times per day if we include delays and similar.
3. Finding a route between two bus stops: Thousands of times per minute during rush hour.

Clearly, the third task is where we should put effort into optimising performance.
For this reason we will hold off on the technical aspects of creating and modifying graphs,
and only give the bare minimum of what we expect of any graph:

- Vertices can be integers, strings, or anything that can be used as a key in a set or map data structure.
- Edges are pairs of vertices, which we write as $a\rightarrow b$, or if it is undirected, $a\leftrightarrow b$.
  For weighted graphs, they include a weight $w$, $a\xrightarrow{w}b$, but we often simply write "the weight of $e$".
- There is a function `outgoingEdges`($a$) that returns all edges going out from the vertex $a$.
  This will let us find all vertices that are adjacent to $a$.

This is sufficient to define most of our graph algorithms.
In graph algorithms, vertices are frequently stored in sets or used as map keys.
We will assume that updating and searching in these vertex sets or maps are $O(1)$.
This can either be achieved by using hash tables with a very good hash function,
or by preprocessing the graph to assign each vertex a unique integer in the range $0,1,\ldots,V{-}1$.
<!-- Then we can store the outgoing edges in an array of integer sets. -->

Note that some graphs are not feasible to store as a whole, but instead they are generated on-demand.
For example, all possible chess games can be described as a very large (but finite) graph,
where the vertices are board positions and the edges are valid moves.
This graph is enormous -- there are around $10^{50}$ vertices.
This is more that then number of atoms in the universe and impossible to store in a computer,
but the function `outgoingEdges` is relatively easy to define because it can calculate the
legal moves and resulting board positions on-the-fly.

In some algorithms we want to compare weighted edges, such as in Dijkstra's, Prim's and Kruskal's algorithms later in this chapter.
In these cases we assume that edges are compared by *weight* -- comparing the vertices is not interesting for these algorithms.
For example, in the weighted, leftmost, graph in @fig:GraphExamples, we see that
$(A\xleftrightarrow{2}D) < (E\xleftrightarrow{3}F) < (A\xleftrightarrow{6}E)$.

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
