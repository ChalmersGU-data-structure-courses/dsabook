
## Definitions and properties

::: TODO
- Terminology: If length is number of edges and cost is total weight, why is it called "shortest path" and not "cheapest path"...
- Move the definitions of strongly connected components later section?
- Decide which of the graphics to keep.
- Structure up the definitions a bit. Try to separate graph classifications (directed, weighted, sparse, dense...) from terms (path, cycle, degree, ...)
:::

A graph consists of a set of vertices (or nodes), and edges. We usually denote the set of vertices as $V$ and edges as $E$. The size of a graph is the number of vertices $n=|V|$, but we often write just $V$ (or $E$) instead of $|V|$ (or $|E|$). 

### Classification of graphs

In a *directed* graph, every edge has a specified direction (indicated by arrows in when drawing them). An edge from $A$ to $B$ is not different from an edge from $B$ to $A$. Directed graphs are more general than undirected graphs, in the sense that any undirected graph can be encoded as a directed graph where every edge has a complementary edge in the opposite direction. Some notions (such as the *minimum spanning tree*) are only defined for undirected graphs. In @fig:GraphExamples, the left graph is an undirected graph, and the right is a directed graph.

In a *weighted* graph all edges have a weight. Many algorithms only work on graphs with non-negative weights, for example Dijkstra's algorithm. 
An *unweighted* graph is conceptually the same as a graph where all weights are 1. 
In @fig:GraphExamples, the right graph is weighted.

A graph is *connected* if there exists at least one *path* (see below) between every pair of vertices.

We can also roughly categorize graphs by the number of expected edges they have:
- In a *sparse* graph the number of edges are small, something like $E \in O(V)$, and the average number of edges per vertex is close to constant.
- In a *dense* graph the number of edges are large, something like $E \in O(V^2)$, and the average degree grows with the size of the graph. 
- The most extreme case of a dese graph is *complete*, with every vertex having a direct edge to all vertices, in which case $O(E) = O(V^2)$.

An example of a sparse graph is a road network (where vertices are intersections). 
Even the most chaotic intersection would have less than say ten outgoing roads. 
If the road network expands, we would not expect the average number of edges per vertex to grow. 
An example of a dense graph would be air traffic, where vertices are airports and edges are potential flight routes. 
Here the graph would be complete (if you can fly a plane directly between any pairs of airports). 
If we double the number of airports, the average number of edges per vertex will also double, and the total number of edges will quadruple. 

Knowing if a graph is expected to be sparse impacts complexity analysis. If we can assume the graph to be sparse, an algorithm that is $O(E log E)$ would be an objective improvement over $O(V^2)$, but that would not be the case for a general graph where $O(E)$ can be as high as $O(V^2)$.

There are many additional ways to classify graphs, for instance: Should they allow edges between a vertex and itself (as we see in $D$ in the right graph in our example)? What data is contained in vertices and in edges? In directed graphs, can edges exist in both directions between a specific pairs of vertices, or just one direction? Look at the list of example domains and consider if they should be directed/undirected, weighted, acyclic, connected, etc.


### Terminology

Two vertices are *adjacent* if there is an edge between them. For directed graphs, we can say $A$ is adjacent to $B$ or $B$ is adjacent *from* $A$ to mean the same thing (an edge from $A$ to $B$).

The *degree* of a vertex is the number of edges that is connected to it. This means that the sum of all degrees in an undirected graph is $2E$, because every edge is counted twice. In directed graphs, each vertex has an *outdegree* and an *indegree*. The sum of all outdegrees is the same as the sum of all indegrees, which is $E$. In @fig:GraphExamples, the *degree* of vertex $B$ in the left graph is $3$. The *outdegree* of vertex $A$ in the right graph is $2$ while the *indegree* is 1.

A *path* is a sequence of vertices $v_0, \ldots, v_n$ where there exists an edge between each vertex pair $v_{i-1}, v_i$. Usually this refers to a *simple path*, meaning a path with no repeted vertices (since graphs can have cycles, general paths can be infinitely long).

The *length* of a path is the number $n$ of edges, and the *cost* of a path is the sum of the weights of its edges. There is some confusion over this, since algorithms that find the minimal cost are usually referred to as *shortest path algorithms* and many use length to mean the sum of weights. 

A *cycle* is a path (of at least length 3) that starts and ends in the same vertex.

A vertex is *reachable* from another vertex if there exits a path from the first vertex to the second. 
In directed graphs, reachability is not symmetric, $A$ may be reachable from $B$ but not the other way around. 

<!-- Move? -->
An *acyclic* graph is a graph that doesn't have any cycles.
A *directed acyclic graph* (DAG) is a common kind of graph for which there are many special algorithms.

A *subgraph* is a subset of the vertices of a graph, plus all edges that connect them.  A connected subgraph is called a *connected component*. For example, in a graph where vertices are nations and edges are land borders, each continent would be a connected component.
If the graph is directed we instead talk about *strongly connected components* (a weakly connected means there are paths in at least one direction, and strongly connected means in both).

### Programming graph algorithms

Similar to trees, there is no universal Abstract Data Type for graphs, and the exact interface of a graph library can vary greatly. 
Furthermore, many graphs are *implicit*, the developer never explicitly refers to their structure as a graph. 
Perhaps the most common kind of graphs is just a class where each object has references to multiple other objects of the same class. 
Consider for instance how this simple class forms a graph where vertices are people and edges are friendships:

```
class Person:
    id: Int
    name: String
	friends: List of Person
```

Furthermore, many graph problems do not involve modifying the graph, but merely analyzing it. 
This is different from e.g. maps that we have discussed previously, where efficient modification is important. 
Example: we are modelling a tram network of a city as a graph, for a typical travel planning application. 
Here is a rough estimate of the workload of the system:

- Adding or removing a vertex (a tram station): Happens every few years or so. 
- Modifying an edge (tram connections with scheduled departures): Maybe several times per day if it includes delays and such.
- Finding the shortest route between two stations: Thousands of times per minutes during rush hour.

Clearly, the third bullet point is where we should put effort into optimizing performance. 
For this reason we will hold off on defining the technical aspects of creating graphs, 
and look at a simple definition that includes only what we expect of any graph:

- Vertices are some kind of objects that uniquely identify vertices. 
- Edges are pairs on the form `(from, to)`, where both `from` and `to` are vertices. For weighted graphs, they include a weight `(weight, from, to)`.
- There is a function `outgoingEdges(v)` that takes a vertex and returns all its outgoing edges (letting us find all its adjacent vertices).

These three definitions are sufficient to define most of our graph algorithms.
In algorithms, vertices are frequently stored in set data structures, or used as keys in maps. 
We will assume that modifications and lookups on these data structures are all $O(1)$. 
This can either be acchieved using hashing with a perfect hash function, 
or by preprocessing the graph to assign each vertex a unique ID-number so they can be used to index arrays:

```
class VertexSet:
    arr = array of booleans of length |V|, initialized to false
	add(v : Vertex):
        arr[v.id]=true
    contains(V : Vertex):
        return arr[v.id]
```

We also assume standard lexicographical ordering for weighted edges, so the edge `(5,A,B)` is lesser than `(3,C,D)`. 

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