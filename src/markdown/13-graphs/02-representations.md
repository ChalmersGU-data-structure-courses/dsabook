
## Graph representations

::: TODO
- Prio 2: update text, (semi)formal definitions
:::

<!-- START NOTES -->

There are two main ways of implementing graphs:

- *Adjacency list*: a map from vertices to its outgoing edges – this can be a BST, a hash table, or some other map data structure. If the vertices are exactly the numbers $0, 1, \ldots, n–1$, the map can be a simple array (where the value of a vertex is the index in the array).

- *Adjacency matrix*: a 2-dimensional matrix where the rows and columns denote vertices (assuming that the vertices are the numbers $0, 1, \ldots, n–1$). A specific cell then denotes the edge from its column vertex to its row vertex – we can for example store the *weight* of the edge in the cell.

Here is how the two representations look for the example graph:

![](images/Graphs-Representations.png)

Note that every edge occurs twice – because the graph is undirected.

The adjacency list is the most common for implementing generic sparse graphs, and is very useful for many algorithms. The adjacency matrix is more useful for very dense graphs – if the graph is sparse, most of the cells in the matrix will be empty so it will use up too much memory. In this course we will assume adjacency lists unless otherwise specified.

There is no commonly agreed-upon ADT for graphs, but here we will only assume the following operations:

```
class Graph:
	vertices() 	// return a list of all vertices
	edges()	// return a list of all edges
	outgoingEdges(v) 	// return a list of edges leaving a vertex
```

Note that this interface is tailor-made for the adjacency list representation, because the method *outgoingEdges* is just a wrapper around the implementation.

We also assume a class of edges like this:

```
class Edge:
	start, end 	// the start and end vertex
	weight 	// the weight
```

Note that for every outgoing edge e from a vertex v, we see that v = e.start.
Also note that in this implementation, all edges are inherently directed – this means that we represent an undirected graph as a directed graph where each undirected edge becomes two directed.

<!-- END NOTES -->

----------------


There are two commonly used methods for representing graphs. The
[adjacency matrix]{.term} for a graph is a
$|\mathbf{V}| \times |\mathbf{V}|$ array. We typically label the
vertices from $v_0$ through $v_{|\mathbf{V}|-1}$. Row $i$ of the
adjacency matrix contains entries for vertex $v_i$. Column $j$ in row
$i$ is marked if there is an edge from $v_i$ to $v_j$ and is not marked
otherwise. The space requirements for the adjacency matrix are
$O(|\mathbf{V}|^2)$.

The second common representation for graphs is the
[adjacency list]{.term}. The adjacency list is
an array of linked lists. The array is $|\mathbf{V}|$ items long, with
position $i$ storing a pointer to the linked list of edges for vertex
$v_i$. This linked list represents the edges by the vertices that are
adjacent to vertex $v_i$.

Here is an example of the two representations on a directed graph. The
entry for vertex 0 stores 1 and 4 because there are two edges in the
graph leaving vertex 0, with one going to vertex 1 and one going to
vertex 4. The list for vertex 2 stores an entry for vertex 4 because
there is an edge from vertex 2 to vertex 4, but no entry for vertex 3
because this edge comes into vertex 2 rather than going out.

::: {.jsav-figure #fig:GraphRepresentDirected}
``` {src="Graph/GdirRepCON.js" links="Graph/GraphDefCON.css"}
```
Representing a directed graph
:::

Both the adjacency matrix and the adjacency list can be used to store
directed or undirected graphs. Each edge of an undirected graph
connecting vertices $u$ and $v$ is represented by two directed edges:
one from $u$ to $v$ and one from $v$ to $u$. Here is an example of the
two representations on an undirected graph. We see that there are twice
as many edge entries in both the adjacency matrix and the adjacency
list. For example, for the undirected graph, the list for vertex 2
stores an entry for both vertex 3 and vertex 4.

::: {.jsav-figure #fig:GraphRepresentUndirected}
``` {src="Graph/GundirRepCON.js" links="Graph/GraphDefCON.css"}
```
Representing an undirected graph
:::

The storage requirements for the adjacency list depend on both the
number of edges and the number of vertices in the graph. There must be
an array entry for each vertex (even if the vertex is not adjacent to
any other vertex and thus has no elements on its linked list), and each
edge must appear on one of the lists. Thus, the cost is
$O(|\mathbf{V}| + |\mathbf{E}|)$.

Sometimes we want to store weights or distances with each each edge,
such as in @fig:GraphTypes (c).
This is easy with the adjacency matrix, where we will just store
values for the weights in the matrix.
In @fig:GraphRepresentDirected and @fig:GraphRepresentUndirected
we store a value of
"1" at each position just to show that the edge exists. That could
have been done using a single bit, but since bit manipulation is
typically complicated in most programming languages, an implementation
might store a byte or an integer at each matrix position. For a weighted
graph, we would need to store at each position in the matrix enough
space to represent the weight, which might typically be an integer.

The adjacency list needs to explicitly store a weight with each edge.
In the adjacency list in @fig:GraphRepresentWeighted,
each linked list node is shown storing
two values. The first is the index for the neighbour at the end of the
associated edge. The second is the value for the weight. As with the
adjacency matrix, this value requires space to represent, typically an
integer.

::: {.jsav-figure #fig:GraphRepresentWeighted}
``` {src="Graph/GweightedCON.js" links="Graph/GraphDefCON.css"}
```
Representing a weighted graph
:::

Which graph representation is more space efficient depends on the number
of edges in the graph. The adjacency list stores information only for
those edges that actually appear in the graph, while the adjacency
matrix requires space for each potential edge, whether it exists or not.
However, the adjacency matrix requires no overhead for pointers, which
can be a substantial cost, especially if the only information stored for
an edge is one bit to indicate its existence. As the graph becomes
denser, the adjacency matrix becomes relatively more space efficient.
Sparse graphs are likely to have their adjacency list representation be
more space efficient.

::: example
#### Example: Memory usage

Assume that a vertex index requires two bytes, a pointer requires four
bytes, and an edge weight requires two bytes. Then, each link node in
the adjacency list needs $2 + 2 + 4 = 8$ bytes. The adjacency matrix for
the directed graph above requires $2 |\mathbf{V}^2| = 50$ bytes while
the adjacency list requires $4 |\mathbf{V}| + 8 |\mathbf{E}| = 68$
bytes. For the undirected version of the graph above, the adjacency
matrix requires the same space as before, while the adjacency list
requires $4 |\mathbf{V}| + 8 |\mathbf{E}| = 116$ bytes (because there
are now 12 edges represented instead of 6).
:::

The adjacency matrix often requires a higher asymptotic cost for an
algorithm than would result if the adjacency list were used. The reason
is that it is common for a graph algorithm to visit each neighbour of
each vertex. Using the adjacency list, only the actual edges connecting
a vertex to its neighbours are examined. However, the adjacency matrix
must look at each of its $|\mathbf{V}|$ potential edges, yielding a
total cost of $O(|\mathbf{V}^2|)$ time when the algorithm might
otherwise require only $O(|\mathbf{V}| + |\mathbf{E}|)$ time. This
is a considerable disadvantage when the graph is sparse, but not when
the graph is closer to full.
