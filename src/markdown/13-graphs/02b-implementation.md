
### Implementing graphs

::: TODO
- Prio 2: simplify code
- Prio 2: discuss implementation vs sparse/dense
- Prio 3: write about alternative approaches, infinite graphs
:::

<!-- ### ADT for graphs -->

We next turn to the problem of implementing a general-purpose
[graph]{.term} class. There are two traditional
approaches to representing graphs: The
[adjacency matrix]{.term} and the
[adjacency list]{.term}. In this section we will
show actual implementations for each approach. We will begin with an
interface defining an ADT for graphs that a given implementation must
meet.

    interface Graph of V:
        size: Int                       // The number of vertices in the graph.
        vertices() -> Collection of V   // Returns all vertices in the graph.
        outgoingEdges(v: V) -> Collection of Edge of V
                                        // Returns the edges that originates in vertex v.

Note that this API is quite generic, and perhaps not suited for all
kinds of implementations. For example, the adjacency matrix
implementation works best if the vertices are integers in the range
$0\ldots |\mathbf{V}|-1$ where $|\mathbf{V}|$ is the number of vertices.

According to this interface, the size of the graph is the number of vertices, $|\mathbf{V}|$,
and there is no method that returns the number of edges, $|\mathbf{E}|$.
A practical implementation would have methods for both of these sizes,
as well as methods for adding vertices and edges to the graph (and removing too).

Given an edge, we can use the attributes *start* and
*end* to know the adjacent vertices, and
*weight* to know its weight.

    datatype Edge of V:
        start: V              // start vertex
        end: V                // end vertex
        weight: Float = 1.0   // weight, defaults to 1.0

Nearly every graph algorithm presented in this chapter will require
visits to all neighbours of a given vertex. The `outgoingEdges` method
returns a collection containing the edges that originate in the given
vertex. To get the neighbours you can simply call `e.end` for each
outgoing edge `e`. The following lines appear in many graph algorithms:

    for each Edge e in G.outgoingEdges(v):
        w = e.end
        if w is not in visited:
            add w to visited
            ...do something with v, w, or e...

Here, `visited` is a set of vertices to keep track that we don't visit
a vertex twice.

It is reasonably straightforward to implement our graph ADT using either
the adjacency list or adjacency matrix. The sample implementations
presented here do not address the issue of how the graph is actually
created. The user of these implementations must add functionality for
this purpose, perhaps reading the graph description from a file.

### Adjacency matrix

Here is an implementation for the adjacency matrix.
To simplify the implementation we assume that the vertices are integers
$0\ldots n-1$: then we can use the vertices as indices in the adjacency matrix.

    datatype MatrixGraph implements Graph:
        // The edge matrix is an n x n matrix of weights.
        edgeMatrix: Array of (Array of Edges)
        size: Int

        constructor(vertexCount):
            edgeMatrix = new Array(size)
            for i = 0 .. size-1:
                edgeMatrix[i] = new Array(size)

        vertices():
            return the collection [0, 1, ..., size-1]

        outgoingEdges(v):
            outgoing = new List()
            for w in 0 .. size-1:
                weight = edgeMatrix[v][w]
                // We use the special weight 0 to indicate that there is no edge.
                if weight != 0:
                    outgoing.append(new Edge(v, w, weight))
            return outgoing


The edge matrix is implemented as an integer array of size $n \times n$
for a graph of $n$ vertices. Position $(i, j)$ in the matrix stores the
weight for edge $(i, j)$ if it exists. A weight of zero for edge
$(i, j)$ is used to indicate that no edge connects vertices $i$ and $j$.

This means that this simple implementation of an adjacency matrix does
not work for all kinds of vertex types, but only for integer vertices.
In addition, the vertices must be numbered $0\ldots |\mathbf{V}|-1$.
The `vertices` method returns a collection of all vertices, which
in this case is just the numbers $0\ldots |\mathbf{V}|-1$.

Given a vertex $v$, the `outgoingEdges` method scans through row `v` of
the matrix to locate the positions of the various neighbours. It creates
an edge for each neighbour and adds it to a list.

### Adjacency list

Here is an implementation of the adjacency list representation for
graphs. This implementation uses a generic type for vertices, so that
you can use strings or anything else.

Its main data structure is a map from vertices to sets of edges.
Exactly which kind of map or set we use can depend on our needs,
but it can e.g. be any of the ones we have discussed earlier in the book.

One specific implementation that is particularly suited for an adjacency list
[separate chaining]{.term} hash map, backed with a set implemented as a
[linked list]{.term}. In that case, for each vertex we store a linked list
of all the edges originating from that vertex.
This makes the method `outgoingEdges` very efficient,
because the only thing we have to do is to look up the given vertex in
the internal map. To make the methods `vertexCount` and `vertices`
efficient, we in addition store the vertices separately in the set
`verticesSet`.

The implementations of the API methods are quite straightforward, as can be seen here:

    class AdjacencyGraph implements Graph:
        edgesMap: Map from V to Edge = new Map()
        vertices: Set of V = new Set()
        size: Int = vertices.size

        vertices():
            return verticesSet

        outgoingEdges(v):
            return edgesMap.get(v)


<!--
### Alternative approaches

::: TODO
- e.g., vertices are integers starting from 0?
- not allowing the graph to change?
- making it possible to delete vertices/edges?
- undirected graphs
:::
 -->
