
## Implementing graphs

::: TODO
- Prio 2: simplify code
- Prio 2: discuss implementation vs sparse/dense
- Prio 3: write about alternative approaches, infinite graphs
:::

### ADT: Graphs

We next turn to the problem of implementing a general-purpose
[graph]{.term} class. There are two traditional
approaches to representing graphs: The
[adjacency matrix]{.term} and the
[adjacency list]{.term}. In this section we will
show actual implementations for each approach. We will begin with an
interface defining an ADT for graphs that a given implementation must
meet.

    interface Graph:
        addVertex(v)      // Adds the vertex v to the graph. Returns true if it wasn't already in the graph.
        addEdge(e)        // Adds the edge e to the graph. Returns true if it wasn't already in the graph.
        vertices()        // Returns a Collection of all vertices in the graph.
        outgoingEdges(v)  // Returns a Collection of the edges that originates in vertex v.
        vertexCount()     // Returns the number of vertices in the graph.
        edgeCount()       // Returns the number of edges in the graph.

    interface Edge:
        start    // start vertex
        end      // end vertex
        weight   // weight, defaults to 1.0


Note that this API is quite generic, and perhaps not suited for all
kinds of implementations. For example, the adjacency matrix
implementation works best if the vertices are integers in the range
$0\ldots |\mathbf{V}|-1$ where $|\mathbf{V}|$ is the number of vertices.

The interface `Graph` has methods to return the number of vertices and
edges (methods `vertexCount` and `edgeCount`, respectively). You can add
vertices and edges by the methods `addVertex` and `addEdge`. Normally
you don't have to add vertices explicitly, because `addEdge` should do
that for you if necessary.

Given an edge, we can use the attributes *start* and
*end* to know the adjacent vertices, and
*weight* to know the weight. Note that these attributes are
**final**, which means that they should not be changed after initialisation.

Nearly every graph algorithm presented in this chapter will require
visits to all neighbors of a given vertex. The `outgoingEdges` method
returns a collection containing the edges that originate in the given
vertex. To get the neighbors you can simply call `e.end` for each
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
this purpose, perhaps reading the graph description from a file. The
graph can be built up by using the `addEdge` function provided by the
ADT.

### Adjacency matrix

Here is an implementation for the adjacency matrix.
To simplify the implementation we assume that the vertices are integers
$0\ldots N-1$: then we can use the vertices as indices in the adjacency matrix.

    class MatrixGraph implements Graph:
        MatrixGraph(numVertices):
            // The edge matrix is an N x N matrix of weights.
            // We use the special weight 0 to indicate that there is no edge.
            this.edgeMatrix = new Array(numVertices)
            for i = 0 to numVertices-1:
                this.edgeMatrix[i] = new Array(numVertices)
            this.totalEdges = 0

        vertexCount():
            return this.edgeMatrix.size()

        edgeCount():
            return this.totalEdges

        addEdge(e):
            precondition: e.weight != 0
            isNew = this.edgeMatrix[e.start][e.end]
            this.edgeMatrix[e.start][e.end] = e.weight
            if isNew:
                this.totalEdges = this.totalEdges + 1
            return isNew

        vertices():
            return the collection [0, 1, ..., this.vertexCount()-1]

        outgoingEdges(v):
            return the collection [
                new Edge(v, w, this.edgeWeight(v, w))
                for each w in this.vertices()
                if this.isEdge(v, w)
            ]

        // For an adjacency matrix, it's much more efficient to get information
        // about known edges, than to search through outgoingEdges,
        // so we add the following two as convenience methods.

        isEdge(v, w):
            return this.edgeMatrix[v][w] != 0

        edgeWeight(v, w):
            return this.edgeMatrix[v][w]


The edge matrix is implemented as an integer array of size $n \times n$
for a graph of $n$ vertices. Position $(i, j)$ in the matrix stores the
weight for edge $(i, j)$ if it exists. A weight of zero for edge
$(i, j)$ is used to indicate that no edge connects Vertices $i$ and $j$.

This means that this simple implementation of an adjacency matrix does
not work for all kinds of vertex types, but only for integer vertices.
In addition, the vertices must be numbered $0\ldots |\mathbf{V}|-1$.
Therefore, the `addVertex` method is not used in this implementation,
and instead the user has to specify the number of vertices from the
start. The `vertices` method returns a collection of all vertices, which
in this case is just the numbers $0\ldots |\mathbf{V}|-1$.

Given a vertex $v$, the `outgoingEdges` method scans through row `v` of
the matix to locate the positions of the various neighbors. It creates
an edge for each neighbour and adds it to a queue. (There is no special
reason why we use a queue, we could use a stack or a list too).

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

The implementations of the API methods are quite straightforward, as can
be seen here:

    class AdjacencyGraph implements Graph:
        AdjacencyGraph():
            this.edgesMap = new Map()
            this.verticesSet = new Set()
            this.totalEdges = 0

        vertexCount():
            return this.verticesSet.size()

        edgeCount():
            return this.totalEdges

        addVertex(v) -> bool:
            return this.verticesSet.add(v)

        addEdge(e):
            this.addVertex(e.start)
            this.addVertex(e.end)
            outgoingEdges = this.edgesMap.get(e.start)
            if outgoingEdges is null:
                outgoingEdges = new Set()
                this.edgesMap.put(e.start, outgoingEdges)
            isNew = outgoingEdges.add(e)
            if isNew:
                this.totalEdges = this.totalEdges + 1
            return isNew

        vertices():
            return this.verticesSet

        outgoingEdges(v):
            return this.edgesMap.get(v)



### Alternative approaches

::: TODO
- e.g., vertices are integers starting from 0?
- not allowing the graph to change?
- making it possible to delete vertices/edges?
- undirected graphs
:::

