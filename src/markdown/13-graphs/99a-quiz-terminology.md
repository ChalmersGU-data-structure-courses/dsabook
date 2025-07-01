
:::::::::::::::::::::::::::::::::::::::: quiz ::::::::::::::::::::::::::::::::::::::::
### Review questions: Graph terminology


:::::::::: question ::::::::::
When a vertex  $Q$ is connected by an edge to
a vertex $K$, what is the term for their relationship?

- [x] $Q$ and $K$ are adjacent
- [ ] $Q$ and $K$ are incident
- [ ] $Q$ and $K$ are insecure
- [ ] $Q$ and $K$ are isolated

::: hints
- An edge connecting two vertices is incident on these vertices.
- Two vertices connected by an edge are adjacent.
:::
::::::::::::::::::::::::::::::



:::::::::: question ::::::::::
Answer TRUE or FALSE.

Two vertices of a graph are ADJACENT if
there is an edge joining them.

- [x] True
- [ ] False

::: hints
- Neighboring vertices are adjacent to one another.
- Two vertices are considered neighbors if there is an edge connecting them.
:::
::::::::::::::::::::::::::::::



:::::::::: question ::::::::::
![Example graph](images/QuizGraphComponents.png)

Answer TRUE or FALSE.

Vertices 3 and 4 are adjacent.

- [ ] True
- [x] False

::: hints
- Two vertices are adjacent if there exists and edge between them.
:::
::::::::::::::::::::::::::::::



:::::::::: question ::::::::::
![Example graph](images/QuizGraphComponents.png)

How many connected components does this graph have?

<input type="number" value="3" min="0"/>

::: hints
- The maximally connected subgraphs of an undirected graph are called connected components.
- Vertices 0, 1, 2, 3, and 4 form one connnected component
:::
::::::::::::::::::::::::::::::



:::::::::: question ::::::::::
Answer TRUE or FALSE.

A DAG is a directed graph without cycles.

- [x] True
- [ ] False

::: hints
- A DAG is a Directed Acyclic Graph.
- An acyclic graph has no cycles.
:::
::::::::::::::::::::::::::::::



:::::::::: question ::::::::::
Given a subset S of the vertices in a
graph, when all vertices in S connect to all other
vertices in S, this is called a:

- [x] clique
- [ ] connected component
- [ ] directed graph
- [ ] DAG
- [ ] sparse graph
- [ ] sparse matrix

::: hints
- A clique is a subset of the graph where all the vertices in
the subgraph connect to the other vertices.
:::
::::::::::::::::::::::::::::::



:::::::::: question ::::::::::
A complete graph is a clique of size:

- [x] $|V|$
- [ ] $|E|$
- [ ] $|n|$
- [ ] $n$

::: hints
- A graph containing all possible edges is said to be a complete graph
- Any subset of $V$ where all vertices in the
subset connect to all other vertices in the
subset is called a clique
- A complete graph is a clique of size $|V|$.
:::
::::::::::::::::::::::::::::::



:::::::::: question ::::::::::
A graph containing all possible edges is a _____ graph

- [x] complete
- [ ] full
- [ ] dense
- [ ] sparse
- [ ] directed

::: hints
- A dense graph is a graph with many edges.
- A sparse graph is a graph with relatively few edges.
- A complete graph is a graph containing all possible edges.
:::
::::::::::::::::::::::::::::::



:::::::::: question ::::::::::
A graph without cycles is called a/an:

- [x] acyclic graph
- [ ] undirected graph
- [ ] directed graph
- [ ] simple graph
- [ ] connected graph
- [ ] complete graph

::: hints
- An acyclilc graph has no cycles.
:::
::::::::::::::::::::::::::::::



:::::::::: question ::::::::::
The number of edges incident to a vertex called its:

- [x] degree
- [ ] count
- [ ] number
- [ ] size
- [ ] depth

::: hints
- An edge connecting vertices is said to be incident.
- The degree of a vertex is the number of graph edges it touches.
:::
::::::::::::::::::::::::::::::



:::::::::: question ::::::::::
A digraph is a:

- [x] directed graph
- [ ] undirected graph
- [ ] connected component
- [ ] DAG

::: hints
- A directed graph is also called a digraph.
:::
::::::::::::::::::::::::::::::



:::::::::: question ::::::::::
A graph with directed edges is called a

- [x] directed graph
- [ ] labeled graph
- [ ] weighted graph
- [ ] complete graph

::: hints
- A graph with edges directed from one vertex to another is a directed graph.
:::
::::::::::::::::::::::::::::::



:::::::::: question ::::::::::
Answer TRUE or FALSE.

All graphs must have edges.

- [x] False
- [ ] True

::: hints
- A graph is a set of edges and vertcies.
- The set of edges may be empty.
:::
::::::::::::::::::::::::::::::



:::::::::: question ::::::::::
A free tree is:

- [x] a connected graph with no cycles
- [ ] a connected graph with only simple cycles
- [ ] an unconnected graph with no cycles

::: hints
- A free tree is a connected, undirected graph with no cycles.
:::
::::::::::::::::::::::::::::::



:::::::::: question ::::::::::
![Example directed graph](images/QuizGraphDirected.png)

What is the *out*-degree of vertex 1?

<input type="number" value="3" min="0"/>

::: hints
- The *in*-degree of a vertex is the number of edges going *into* the vertex.
- The *out*-degree of a vertex is the number of edges going *out* of the vertex.
- Vertex 1 has an three outgoing and two incoming edges.
:::
::::::::::::::::::::::::::::::



:::::::::: question ::::::::::
![Example directed graph](images/QuizGraphDirected.png)

What is the *in*-degree of vertex 2?

<input type="number" value="2" min="0"/>

::: hints
- The *in*-degree of a vertex is the number of edges going *into* the vertex.
- The *out*-degree of a vertex is the number of edges going *out* of the vertex.
- Vertex 2 has an one outgoing and two incoming edges.
:::
::::::::::::::::::::::::::::::



:::::::::: question ::::::::::
Answer TRUE or FALSE.

Two vertices can be adjacent even if they are not neighbors.

- [x] False
- [ ] True

::: hints
- Two vertices are consider neighbors if there is an edge connecting them.
- Neighboring vertices are adjacent to one another.
:::
::::::::::::::::::::::::::::::



:::::::::: question ::::::::::
A simple cycle:

- [x] must have all vertices unique except that the first and last vertices are the same
- [ ] allows repetition of vertices so long as the length of the path is less than 5
- [ ] allows repetition of vertices so long as no edge is repeated
- [ ] must have all vertices be unique

::: hints
- A cyle is simple if all vertices on the cycle are distinct,
with the first and last vertices being the same.
:::
::::::::::::::::::::::::::::::



:::::::::: question ::::::::::
A simple path:

- [x] must have all vertices be unique
- [ ] allows repetition of vertices so long as the length of the path is less than 5
- [ ] allows repetition of vertices so long as no edge is repeated
- [ ] must have all vertices unique except that the first and last vertices are the same

::: hints
- A path is simple if all vertices on the path are distinct.
:::
::::::::::::::::::::::::::::::



:::::::::: question ::::::::::
![Example undirected graph](images/QuizGraphUndirected.png)

What is the degree of vertex 4?

<input type="number" value="3" min="0"/>

::: hints
- The degree of a vertex is the number of edges that the vertex touches.
- Vertex 4 has three incident edges.
:::
::::::::::::::::::::::::::::::



:::::::::: question ::::::::::
Answer TRUE or FALSE.

A weighted graph must have edge weights and be directed.

- [x] False
- [ ] True

::: hints
- A weighted graph must have edge weights.
- A weighted graph can be a directed or undirected graph.
:::
::::::::::::::::::::::::::::::

::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::

