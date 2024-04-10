
## Graph Implementations

### Graph API

We next turn to the problem of implementing a general-purpose
[graph]{.term} class. There are two traditional
approaches to representing graphs: The
[adjacency matrix]{.term} and the
[adjacency list]{.term}. In this module we will
show actual implementations for each approach. We will begin with an
interface defining an ADT for graphs that a given implementation must
meet.

```python
class Graph:
    def addVertex(self, v):     """Adds the vertex v to the graph. Returns true if it wasn't already in the graph."""
    def addEdge(self, e):       """Adds the edge e to the graph. Returns true if it wasn't already in the graph."""
    def vertices(self):         """Returns a Collection of all vertices in the graph."""
    def outgoingEdges(self, v): """Returns a Collection of the edges that originates in vertex v."""
    def vertexCount(self):      """Returns the number of vertices in the graph."""
    def edgeCount(self):        """Returns the number of edges in the graph."""

from collections import namedtuple
Edge = namedtuple('Edge', ['start', 'end', 'weight'], defaults=[1.0])
```

```java
// Note: This interface does not exist in the standard Java API.
interface Graph<V> {
    boolean addVertex(V v);                      // Adds the vertex v to the graph. Returns true if it wasn't already in the graph.
    boolean addEdge(Edge<V> e);                  // Adds the edge e to the graph. Returns true if it wasn't already in the graph.
    Collection<V> vertices();                    // Returns a Collection of all vertices in the graph.
    Collection<Edge<V>> outgoingEdges(V from);   // Returns a Collection of the edges that originates in vertex v.
    int vertexCount();                           // Returns the number of vertices in the graph.
    int edgeCount();                             // Returns the number of edges in the graph.
}

class Edge<V> {
    public final V start;        // The start vertex.
    public final V end;          // The end vertex.
    public final double weight;  // The weight.

    Edge(V start, V end) {
        this(start, end, 1.0);
    }
    Edge(V start, V end, double weight) {
        this.start = start; this.end = end; this.weight = weight;
    }
}
```



Note that this API is quite generic, and perhaps not suited for all
kinds of implementations. For example, the adjacency matrix
implementation works best if the vertices are integers in the range
$0\ldots |\mathbf{V}|-1$ where $|\mathbf{V}|$ is the number of vertices.

The interface `Graph` has methods to return the number of vertices and
edges (methods `vertexCount` and `edgeCount`, respectively). You can add
vertices and edges by the methods `addVertex` and `addEdge`. Normally
you don't have to add vertices explicitly, because `addEdge` should do
that for you if necessary.

Given an edge, we can use the attributes [start]{.title-ref} and
[end]{.title-ref} to know the adjacent vertices, and
[weight]{.title-ref} to know the weight. Note that these attributes are
**final**, which means that they cannot be changed after initialisation.

Nearly every graph algorithm presented in this chapter will require
visits to all neighbors of a given vertex. The `outgoingEdges` method
returns a collection containing the edges that originate in the given
vertex. To get the neighbors you can simply call `e.end` for each
outgoing edge `e`. The following lines appear in many graph algorithms:

    for each edge e in G.outgoingEdges(v):
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

### Adjacency Matrix

Here is an implementation for the adjacency matrix.

```python
class MatrixGraph(Graph):
    _edgeMatrix : list[list[float]]
    _totalEdges : int

    def __init__(self, numVertices : int):
        self._edgeMatrix = [[0] * numVertices for _ in range(numVertices)]
        self._totalEdges = 0

    def vertexCount(self) -> int:
        return len(self._edgeMatrix)

    def edgeCount(self) -> int:
        return self._totalEdges

    def addVertex(self, v : int) -> bool:
        raise NotImplementedError("You cannot add vertices to a MatrixGraph")

    def addEdge(self, e : Edge[int]) -> bool:
        if e.weight == 0: raise ValueError("Edges cannot have weight 0")
        isNew : bool = self._edgeMatrix[e.start][e.end] == 0
        self._edgeMatrix[e.start][e.end] = e.weight
        if isNew:
            self._totalEdges += 1
        return isNew

    def vertices(self) -> Collection:
        return range(self._vertexCount())

    def outgoingEdges(self, v : int) -> Collection:
        outgoing = [ Edge(v, w, weight)
                     for (w, weight) in enumerate(self._edgeMatrix[v])
                     if weight != 0 ]
        return outgoing

    # For an adjacency matrix, it's much more efficient to get information
    # about known edges, than to search through outgoingEdges,
    # so we add these two as convenience methods.

    def isEdge(self, v : int, w : int) -> bool:
        return self._edgeMatrix[v][w] != 0

    def edgeWeight(self, v : int, w : int) -> float: 
        return self._edgeMatrix[v][w]
```

```java
class MatrixGraph implements Graph<Integer> {
    private double[][] edgeMatrix;
    private int totalEdges;

    public MatrixGraph(int numVertices) {
        edgeMatrix = new double[numVertices][numVertices];
        totalEdges = 0;
    }

    public int vertexCount() {
        return edgeMatrix.length;
    }

    public int edgeCount() {
        return totalEdges;
    }

    public boolean addVertex(Integer v) {
        throw new UnsupportedOperationException("You cannot add vertices to a MatrixGraph");
    }

    public boolean addEdge(Edge<Integer> e) {
        if (e.weight == 0) throw new IllegalArgumentException("Edges cannot have weight 0");
        boolean isNew = edgeMatrix[e.start][e.end] == 0;
        edgeMatrix[e.start][e.end] = e.weight;
        if (isNew)
            totalEdges++;
        return isNew;
    }

    public Collection<Integer> vertices() {
        Queue<Integer> range = new LinkedQueue<>();
        for (int v=0; v < edgeMatrix.length; v++)
            range.enqueue(v);
        return range;
    }

    public Collection<Edge<Integer>> outgoingEdges(Integer v) {
        Queue<Edge<Integer>> outgoing = new LinkedQueue<>();
        for (int w=0; w < edgeMatrix.length; w++)
            if (edgeMatrix[v][w] != 0)
                outgoing.enqueue(new Edge<Integer>(v, w, edgeMatrix[v][w]));
        return outgoing;
    }

    // For an adjacency matrix, it's much more efficient to get information
    // about known edges, than to search through outgoingEdges,
    // so we add these two as convenience methods.

    public boolean isEdge(Integer v, Integer w) {
        return edgeMatrix[v][w] != 0;
    }

    public double edgeWeight(Integer v, Integer w) {
        return edgeMatrix[v][w];
    }

}
```



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

### Adjacency List

Here is an implementation of the adjacency list representation for
graphs. This implementation uses a generic type for vertices, so that
you can use strings or anything else.

Its main data structure is a map from vertices to sets of edges. Exactly
which kind of map or set we use can depend on our needs, but in this
implementation we use a
[separate chaining]{.term} hash map, backed with a set implemented as a
[linked list]{.term}.

So, for each vertex, we store a linked list of all the edges originating
from that vertex. This makes the method `outgoingEdges` very efficient,
because the only thing we have to do is to look up the given vertex in
the internal map. To make the methods `vertexCount` and `vertices`
efficient, we in addition store the vertices separately in the set
`verticesSet`.

The implementations of the API methods are quite straightforward, as can
be seen here:

```python
class AdjacencyGraph(Graph):
    _edgesMap    : Map
    _verticesSet : Set
    _totalEdges  : int

    def __init__(self):
        self._edgesMap = SeparateChainingHashMap()
        self._verticesSet = MapSet()
        self._totalEdges = 0

    def vertexCount(self) -> int:
        return self._verticesSet.size()

    def edgeCount(self) -> int:
        return self._totalEdges

    def addVertex(self, v) -> bool:
        return self._verticesSet.add(v)

    def addEdge(self, e : Edge) -> bool:
        self.addVertex(e.start)
        self.addVertex(e.end)
        outgoingEdges : Set = self._edgesMap.get(e.start)
        if outgoingEdges is None:
            outgoingEdges = MapSet(LinkedMap)
            self._edgesMap.put(e.start, outgoingEdges)
        isNew : bool = outgoingEdges.add(e)
        if isNew:
            self._totalEdges += 1
        return isNew

    def vertices(self) -> Collection:
        return self._verticesSet

    def outgoingEdges(self, frm) -> Collection:
        return self._edgesMap.get(frm)
```

```java
class AdjacencyGraph<V> implements Graph<V> {
    private Map<V, Set<Edge<V>>> edgesMap;
    private Set<V> verticesSet;
    private int totalEdges;

    public AdjacencyGraph() {
        edgesMap = new SeparateChainingHashMap<>();
        verticesSet = new MapSet<>();
        totalEdges = 0;
    }

    public int vertexCount() {
        return verticesSet.size();
    }

    public int edgeCount() {
        return totalEdges;
    }

    public boolean addVertex(V v) {
        return verticesSet.add(v);
    }

    public boolean addEdge(Edge<V> e) {
        addVertex(e.start);
        addVertex(e.end);
        Set<Edge<V>> outgoingEdges = edgesMap.get(e.start);
        if (outgoingEdges == null) {
            outgoingEdges = new MapSet<>(new LinkedMap<>());
            edgesMap.put(e.start, outgoingEdges);
        }
        boolean isNew = outgoingEdges.add(e);
        if (isNew) 
            totalEdges++;
        return isNew;
    }

    public Collection<V> vertices() {
        return verticesSet;
    }

    public Collection<Edge<V>> outgoingEdges(V from) {
        return edgesMap.get(from);
    }
}
```


