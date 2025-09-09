
## Dijkstra's shortest-path algorithm {#dijkstras-algorithm}

::: TODO
- Prio 2:
    - use the generic graph search algorithm
    - aka uniform-cost search
- Prio 2: simplify code
:::

We will now present an algorithm to solve the
[single-source shortest paths problem]{.term}.
Given vertex $S$ in Graph $\mathbf{G}$, find a shortest path from $S$ to
every other vertex in $\mathbf{G}$. We might want only the shortest path
between two vertices, $S$ and $T$. However in the worst case, finding
the shortest path from $S$ to $T$ requires us to find the shortest paths
from $S$ to every other vertex as well. So there is no better algorithm
(in the worst case) for finding the shortest path to a single vertex
than to find shortest paths to all vertices. The algorithm described
here will only compute the distance to every such vertex, rather than
recording the actual path. Recording the path requires only simple
modifications to the algorithm.

<!--
Computer networks provide an application for the single-source
shortest-paths problem. The goal is to find the cheapest way for one
computer to broadcast a message to all other computers on the network.
The network can be modeled by a graph with edge weights indicating time
or cost to send a message to a neighbouring computer.
-->

As mentioned in the previous section,
the shortest path between two vertices can be found using a simple breadth-first search,
for *unweighted* graphs (or whenever all edges have the same cost).
However, when weights are added, BFS will not give the correct answer.

One approach to solving this problem when the edges have differing
weights might be to process the vertices in a fixed order. Label the
vertices $v_0$ to $v_{n-1}$, with $S = v_0$. When processing vertex
$v_1$, we take the edge connecting $v_0$ and $v_1$. When processing
$v_2$, we consider the shortest distance from $v_0$ to $v_2$ and compare
that to the shortest distance from $v_0$ to $v_1$ to $v_2$. When
processing vertex $v_i$, we consider the shortest path for vertices
$v_0$ through $v_{i-1}$ that have already been processed. Unfortunately,
the true shortest path to $v_i$ might go through vertex $v_j$ for
$j > i$. Such a path will not be considered by this algorithm. However,
the problem would not occur if we process the vertices in order of
distance from $S$. Assume that we have processed in order of distance
from $S$ to the first $i-1$ vertices that are closest to $S$; call this
set of vertices $\mathbf{S}$. We are now about to process the $i$ th
closest vertex; call it $X$.

A shortest path from $S$ to $X$ must have its next-to-last vertex in
$S$. Thus,
\

\begin{equation*}
\mathbf{d}(S, X) = \min_{U \in \mathbf{S}}(\mathbf{d}(S, U) + \mathbf{w}(U, X))
\end{equation*}

\
In other words, the shortest path from $S$ to $X$ is the minimum over
all paths that go from $S$ to $U$, then have an edge from $U$ to $X$,
where $U$ is some vertex in $\mathbf{S}$.

This solution is usually referred to as [Dijkstra's algorithm]{.term}. It works
by maintaining a distance estimate $\mathbf{D}(X)$ for all vertices $X$
in $\mathbf{V}$. The elements of $\mathbf{D}$ are initialised to the
value $\infty$ (positive infinity). Vertices are processed in order of distance from $S$.
Whenever a vertex $v$ is processed, $\mathbf{D}(X)$ is updated for every
neighbour $X$ of $V$.

Dijkstra's algorithm is quite similar to [Prim's algorithm]{.term} for finding
the minimum spanning tree (@sec:prims-algorithm). The primary difference is that we are
seeking, not the next vertex which is closest to the MST, but rather the
the next vertex which is closest to the start vertex.
Thus the following lines in Prim's algorithm:

    if e.weight < distances.get(e.end):
        distances.put(e.end, e.weight)

are replaced with the following lines in Dijkstra's algorithm:

    dist = distances.get(v) + e.weight
    if dist < distances.get(e.end):
        distances.put(e.end, dist)

Here is an implementation for Dijkstra's algorithm.
At the end, `distances` will contain the shortest distance from the start to each reachable vertex.

    function dijkstra(graph, start):
        visited = new Set() of vertices
        distances = new Map() of vertices to their distance from start
        distances.put(start, 0)  // The distance from start to start is 0

        repeat graph.size times:
            v = minVertex(graph, distances, visited)  // Find next-closest vertex
            visited.add(v)
            for each e in graph.outgoingEdges(v):
                w = e.end
                dist = distances.get(v) + e.weight
                if e.end not in distances or dist < distances.get(e.end):
                    // If the new distance to the endpoint is shorter...
                    distances.put(e.end, dist)  // ...update the endpoint with
        return distances                        // the new distance

::: dsvis
Here is a visualisation of Dijkstra's algorithm.

``` {.jsav-animation src="Graph/DijkstraCON.js" links="Graph/DijkstraCON.css" name="Dijkstra Slideshow"}
```
:::

#### Finding the minimum vertex

Just as for Prim's algorithm, there are two ways of finding the next-closest vertex.
We can scan through all vertices searching for the minimum value
(note that this code is exactly the same as for Prim's algorithm):

    function minVertex(graph, distances, visited):
        minV = null
        for each v in graph.vertices():
            if v not in visited:
                if minV is null or distances.get(v) < distances.get(minV):
                    minV = v
        return minV

And just as for Prim's algorithm, this will give us a complexity which is quadratic in the number of vertices, $O(|\mathbf{V}|^2)$.

### Using a priority queue

An alternative approach is to store unprocessed vertices in a [minimum priority queue](#priority-queue){.term},
such as a [binary heap]{.term},
ordered by their distance from the processed vertices. The next-closest
vertex can be found in the heap in $O(\log |\mathbf{V}|)$ time.
Every time we modify $\mathbf{D}(X)$, we could reorder $X$ in the heap
by deleting and reinserting it. This is an example of a priority queue with priority update.
However, to implement true priority updating, we would need
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
each edge that we process we must reorder the heap.

Here is the implementation for Dijkstra's algorithm using a priority queue.

    function dijkstraPQ(graph, start):
        visited = new Set() of vertices
        distances = new Map() of vertices to their distance from start
        agenda = new PriorityQueue() of vertices ordered by their distance from start
        // The distance from start to start is 0:
        distances.put(start, 0)
        agenda.add(start) with priority 0

        while not agenda.isEmpty():
            v = agenda.removeMin()
            if v not in visited:
                visited.add(v)
                for each e in graph.outgoingEdges():
                    dist = distances.get(v) + e.weight
                    if w not in distances or dist < distances.get(e.end):
                        // If the new distance to the endpoint is shorter,
                        // update the endpoint with the new distance, and add it to the agenda
                        distances.put(e.end, dist)
                        agenda.add(e.end) with priority dist
        return distances


#### Which version is the best?

Using `minVertex` to scan the vertex list for the minimum value is more
efficient when the graph is dense, that is, when $|\mathbf{E}|$
approaches $|\mathbf{V}|^2$.
Using a priority is more efficient when the
graph is sparse because its cost is
$O((|\mathbf{V}| + |\mathbf{E}|) \log |\mathbf{E}|)$.
When the graph is dense, this cost can become as great as
$O(|\mathbf{V}|^2 \log |\mathbf{E}|) = O(|\mathbf{V}|^2 \log |\mathbf{V}|)$.

In practice, most graphs are sparse so unless you know that the graph is dense you should use the priority queue version.

::: dsvis
Now you can practice using Dijkstra's algorithm.

<avembed id="DijkstraPE" src="Graph/DijkstraPE.html" type="pe" name="Dijkstra's Algorithm Proficiency Exercise"/>
:::

<!--
### Invariants
 -->

