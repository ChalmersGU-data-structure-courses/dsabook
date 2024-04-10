
## Shortest-Paths Problems

### Shortest-Paths on Unweighted Graphs

If you have an unweighted graph, the [shortest path]{.term} between two vertices is the smallest number of edges you
have to pass to get from one of the vertices to the other.

If you agument the [breadth-first search] 
algorithm to remember which vertex a visited vertex came
from, if will give you the shortest path between the start vertex and
any other vertex. However, things become sligthly more complicated if
the graph is weighted.

### Shortest-Paths on Weighted Graphs

On a road map, a road connecting two towns is typically labeled with its
distance. We can model a road network as a directed graph whose edges
are labeled with real numbers. These numbers represent the distance (or
other cost metric, such as travel time) between two vertices. These
labels may be called [weights](#weight){.term},
[costs](#cost){.term}, or
[distances](#distance){.term}, depending on the
application. Given such a graph, a typical problem is to find the total
length of the shortest path between two specified vertices. This is not
a trivial problem, because the shortest path may not be along the edge
(if any) connecting two vertices, but rather may be along a path
involving one or more intermediate vertices.

For example, in [Figure #DistExamp](#DistExamp), 
the cost of the path from $A$ to $B$ to $D$ is 15. The cost
of the edge directly from $A$ to $D$ is 20. The cost of the path from
$A$ to $C$ to $B$ to $D$ is 10. Thus, the shortest path from $A$ to $D$
is 10 (rather than along the edge connecting $A$ to $D$). We use the
notation $\mathbf{d}(A, D) = 10$ to indicate that the shortest distance
from $A$ to $D$ is 10. In the figure, there is no path from $E$ to $B$, so we set
$\mathbf{d}(E, B) = \infty$. We define $\mathbf{w}(A, D) = 20$ to be the
weight of edge $(A, D)$, that is, the weight of the direct connection
from $A$ to $D$. Because there is no edge from $E$ to $B$,
$\mathbf{w}(E, B) = \infty$. Note that $\mathbf{w}(D, A) = \infty$
because the graph is directed. We assume that all weights are positive.

:::: {#DistExamp}
<inlineav id="DistanceExampCON" src="Graph/DistanceExampCON.js" name="Graph/DistanceExampCON" static/>

Example graph for shortest-path definitions.
::::

### Single-Source Shortest Paths

We will now present an algorithm to solve the
[single-source shortest paths problem]{.term}.
Given Vertex $S$ in Graph $\mathbf{G}$, find a shortest path from $S$ to
every other vertex in $\mathbf{G}$. We might want only the shortest path
between two vertices, $S$ and $T$. However in the worst case, finding
the shortest path from $S$ to $T$ requires us to find the shortest paths
from $S$ to every other vertex as well. So there is no better algorithm
(in the worst case) for finding the shortest path to a single vertex
than to find shortest paths to all vertices. The algorithm described
here will only compute the distance to every such vertex, rather than
recording the actual path. Recording the path requires only simple
modifications to the algorithm.

Computer networks provide an application for the single-source
shortest-paths problem. The goal is to find the cheapest way for one
computer to broadcast a message to all other computers on the network.
The network can be modeled by a graph with edge weights indicating time
or cost to send a message to a neighboring computer.

For unweighted graphs (or whenever all edges have the same cost), the
single-source shortest paths can be found using a simple breadth-first
search. When weights are added, BFS will not give the correct answer.

One approach to solving this problem when the edges have differing
weights might be to process the vertices in a fixed order. Label the
vertices $v_0$ to $v_{n-1}$, with $S = v_0$. When processing Vertex
$v_1$, we take the edge connecting $v_0$ and $v_1$. When processing
$v_2$, we consider the shortest distance from $v_0$ to $v_2$ and compare
that to the shortest distance from $v_0$ to $v_1$ to $v_2$. When
processing Vertex $v_i$, we consider the shortest path for Vertices
$v_0$ through $v_{i-1}$ that have already been processed. Unfortunately,
the true shortest path to $v_i$ might go through Vertex $v_j$ for
$j > i$. Such a path will not be considered by this algorithm. However,
the problem would not occur if we process the vertices in order of
distance from $S$. Assume that we have processed in order of distance
from $S$ to the first $i-1$ vertices that are closest to $S$; call this
set of vertices $\mathbf{S}$. We are now about to process the $i$ th
closest vertex; call it $X$.

A shortest path from $S$ to $X$ must have its next-to-last vertex in
$S$. Thus,

$$
\begin{eqnarray}
\mathbf{d}(S, X) &=& \min_{U \in \mathbf{S}}(\mathbf{d}(S, U) + \mathbf{w}(U, X))
\end{eqnarray}
$$

In other words, the shortest path from $S$ to $X$ is the minimum over
all paths that go from $S$ to $U$, then have an edge from $U$ to $X$,
where $U$ is some vertex in $\mathbf{S}$.

This solution is usually referred to as Dijkstra's algorithm. It works
by maintaining a distance estimate $\mathbf{D}(X)$ for all vertices $X$
in $\mathbf{V}$. The elements of $\mathbf{D}$ are initialized to the
value `INFINITE`. Vertices are processed in order of distance from $S$.
Whenever a vertex $v$ is processed, $\mathbf{D}(X)$ is updated for every
neighbor $X$ of $V$. Here is an implementation for Dijkstra's
algorithm. At the end, array `D` will contain the shortest distance
values.

```java
// Compute shortest path distances from s, store them in D
static void <V> Dijkstra(Graph<V> G, V s, Map<V,Double> D) {
    Set<V> visited = new Set<>();
    for (V v : G.vertices())
        D.put(v, Double.POSITIVE_INFINITY);
    D.put(s, 0);
    for (int i=0; i < G.vertexCount(); i++) {   // Process the vertices
        V v = minVertex(G, D);   // Find next-closest vertex
        visited.add(v);
        if (D.get(v) == Double.POSITIVE_INFINITY)
            return;              // Unreachable
        for (Edge<V> e : G.outgoingEdges(v)) {
            V w = e.end;
            if (D.get(w) > D.get(v) + e.weight)
                D.put(w, D.get(v) + e.weight);
        }
    }
}
```



<inlineav id="DijkstraCON" src="Graph/DijkstraCON.js" name="Dijkstra Slideshow" links="Graph/DijkstraCON.css"/>

There are two reasonable solutions to the key issue of finding the
unvisited vertex with minimum distance value during each pass through
the main `for` loop. The first method is simply to scan through the list
of $|\mathbf{V}|$ vertices searching for the minimum value, as follows:

```java
// Find the unvisited vertex with the smalled distance
static V minVertex(Graph G<V>, Map<V,Double> D, Set<V> visited) {
    V minV = null;
    for (v : G.vertices()) {
        if (!visited.contains(v)) {
            if (minV == null)
                minV = v;
            else if (D.get(v) < D.get(minV))
                minV = v;
        }
    }
    return minV;
}
```



Because this scan is done $|\mathbf{V}|$ times, and because each edge
requires a constant-time update to `D`, the total cost for this approach
is $\Theta(|\mathbf{V}|^2 + |\mathbf{E}|) =
\Theta(|\mathbf{V}|^2)$, because $|\mathbf{E}|$ is in
$O(|\mathbf{V}|^2)$.

An alternative approach is to store unprocessed vertices in a min-heap
ordered by their distance from the processed vertices. The next-closest
vertex can be found in the heap in $\Theta(\log |\mathbf{V}|)$ time.
Every time we modify $\mathbf{D}(X)$, we could reorder $X$ in the heap
by deleting and reinserting it. This is an example of a
[priority queue]{.term}
with priority update. To implement true priority updating, we would need
to store with each vertex its position within the heap so that we can
remove its old distances whenever it is updated by processing new edges.
A simpler approach is to add the new (always smaller) distance value for
a given vertex as a new record in the heap. The smallest value for a
given vertex currently in the heap will be found first, and greater
distance values found later will be ignored because the vertex will
already be marked as **visited**. The only disadvantage to repeatedly
inserting distance values in this way is that it will raise the number
of elements in the heap from $\Theta(|\mathbf{V}|)$ to
$\Theta(|\mathbf{E}|)$ in the worst case. But in practice this only adds
a slight increase to the depth of the heap. The time complexity is
$\Theta((|\mathbf{V}| + |\mathbf{E}|) \log |\mathbf{E}|)$, because for
each edge that we process we must reorder the heap. We use the `KVPair`
class to store key-value pairs in the heap, with the edge weight as the
key and the target vertex as the value. here is the implementation for
Dijkstra's algorithm using a heap.

```java
// Dijkstra's shortest-paths: priority queue version
static void <V> DijkstraPQ(Graph G, V s, Map<V,Double> D) {
    MinHeap H = new MinHeap();
    H.add(new KVPair(0, s));   // Initial vertex

    Set<V> visited = new Set<>();

    for (V v : G.vertices())  // Initialize distance
        D.put(v, Double.POSITIVE_INFINITY);
    D.put(s, 0);

    while (!H.isEmpty()) {
        V v = H.removeMin().value();
        if (!visited.contains(v)) {
            visited.add(v);
            if (D.get(v) == Double.POSITIVE_INFINITY)
                return;     // Unreachable
            for (Edge<V> e : G.outgoingEdges) {
                V w = e.end;
                if (D.get(w) > D.get(v) + e.weight) { // Update D
                    D.put(w, D.get(v) + e.weight);
                    H.add(new KVPair(D.get(W), w));
                }
            }
        }
    }
}
```



Using `MinVertex` to scan the vertex list for the minimum value is more
efficient when the graph is dense, that is, when $|\mathbf{E}|$
approaches $|\mathbf{V}|^2$. Using a heap is more efficient when the
graph is sparse because its cost is
$\Theta((|\mathbf{V}| + |\mathbf{E}|) \log |\mathbf{E}|)$. However, when
the graph is dense, this cost can become as great as
$\Theta(|\mathbf{V}|^2 \log |\mathbf{E}|) = \Theta(|\mathbf{V}|^2 \log |\mathbf{V}|)$.

Now you can practice using Dijkstra's algorithm.

<avembed id="DijkstraPE" src="Graph/DijkstraPE.html" type="pe" name="Dijkstra's Algorithm Proficiency Exercise"/>
