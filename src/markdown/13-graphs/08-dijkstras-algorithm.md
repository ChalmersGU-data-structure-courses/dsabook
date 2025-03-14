
## Dijkstra's shortest-path algorithm

::: TODO
- Prio 2:
    - use the generic graph search algorithm
    - aka uniform-cost search
- Prio 2: simplify code
:::

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
\mathbf{d}(S, X) = \min_{U \in \mathbf{S}}(\mathbf{d}(S, U) + \mathbf{w}(U, X))
$$

In other words, the shortest path from $S$ to $X$ is the minimum over
all paths that go from $S$ to $U$, then have an edge from $U$ to $X$,
where $U$ is some vertex in $\mathbf{S}$.

This solution is usually referred to as Dijkstra's algorithm. It works
by maintaining a distance estimate $\mathbf{D}(X)$ for all vertices $X$
in $\mathbf{V}$. The elements of $\mathbf{D}$ are initialized to the
value $\infty$ (positive infinity). Vertices are processed in order of distance from $S$.
Whenever a vertex $v$ is processed, $\mathbf{D}(X)$ is updated for every
neighbor $X$ of $V$. Here is an implementation for Dijkstra's
algorithm. At the end, array `D` will contain the shortest distance values.

    // Compute shortest path distances from s
    function Dijkstra(G, s):
        visited = new Set()
        D = new Map()
        for each v in G.vertices():
            D.put(v, ∞)  // Initialise distances
        D.put(s, 0)  // The distance from s to s is 0

        repeat G.vertxCount() times:  // Process the vertices
            v = minVertex(G, D, visited)  // Find next-closest vertex
            visited.add(v)
            if D.get(v) == ∞:
                return D  // Vertex v is unreachable
            for each e in G.outgoingEdges(v):
                w = e.end
                dist = D.get(v) + e.weight
                if dist < D.get(w): // If the new distance is shorter...
                    D.put(w, dist)  // ...update w with the new distance
        return D


<inlineav id="DijkstraCON" src="Graph/DijkstraCON.js" name="Dijkstra Slideshow" links="Graph/DijkstraCON.css"/>

There are two reasonable solutions to the key issue of finding the
unvisited vertex with minimum distance value during each pass through
the main `for` loop. The first method is simply to scan through the list
of $|\mathbf{V}|$ vertices searching for the minimum value, as follows:

    // Find the unvisited vertex with the smalled distance
    function minVertex(G, D, visited):
        minV = null
        for each v in G.vertices():
            if v not in visited:
                if minV is null or D.get(v) < D.get(minV):
                    minV = v
        return minV


Because this scan is done $|\mathbf{V}|$ times, and because each edge
requires a constant-time update to `D`, the total cost for this approach
is $O(|\mathbf{V}|^2 + |\mathbf{E}|) =
O(|\mathbf{V}|^2)$, because $|\mathbf{E}|$ is in
$O(|\mathbf{V}|^2)$.

An alternative approach is to store unprocessed vertices in a min-heap
ordered by their distance from the processed vertices. The next-closest
vertex can be found in the heap in $O(\log |\mathbf{V}|)$ time.
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
of elements in the heap from $O(|\mathbf{V}|)$ to
$O(|\mathbf{E}|)$ in the worst case. But in practice this only adds
a slight increase to the depth of the heap. The time complexity is
$O((|\mathbf{V}| + |\mathbf{E}|) \log |\mathbf{E}|)$, because for
each edge that we process we must reorder the heap. We use the `KVPair`
class to store key-value pairs in the heap, with the edge weight as the
key and the target vertex as the value. here is the implementation for
Dijkstra's algorithm using a heap.

    // Dijkstra's shortest-paths: priority queue version
    function DijkstraPQ(G, s):
        visited = new Set()
        D = new Map()
        for (V v : G.vertices())
            D.put(v, ∞)  // Initialize distance
        D.put(s, 0)  // The distance from s to s is 0

        agenda = new PriorityQueue()
        agenda.add(new KVPair(0, s))  // Initial vertex

        while not agenda.isEmpty():
            v = agenda.removeMin().value
            if v not in visited:
                visited.add(v)
                if D.get(v) == ∞:
                    return D  // Vertex v is unreachable
                for each e in G.outgoingEdges():
                    w = e.end
                    dist = D.get(v) + e.weight
                    if dist < D.get(w): // If the new distance is shorter...
                        D.put(w, dist)  // ...update w with the new distance...
                        agenda.add(new KVPair(dist, w))  // ...and add it to the agenda


Using `minVertex` to scan the vertex list for the minimum value is more
efficient when the graph is dense, that is, when $|\mathbf{E}|$
approaches $|\mathbf{V}|^2$. Using a heap is more efficient when the
graph is sparse because its cost is
$O((|\mathbf{V}| + |\mathbf{E}|) \log |\mathbf{E}|)$. However, when
the graph is dense, this cost can become as great as
$O(|\mathbf{V}|^2 \log |\mathbf{E}|) = O(|\mathbf{V}|^2 \log |\mathbf{V}|)$.

Now you can practice using Dijkstra's algorithm.

<avembed id="DijkstraPE" src="Graph/DijkstraPE.html" type="pe" name="Dijkstra's Algorithm Proficiency Exercise"/>

### Invariants


