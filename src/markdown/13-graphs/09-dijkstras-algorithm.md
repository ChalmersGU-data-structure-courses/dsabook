
## Dijkstra's shortest-path algorithm {#dijkstras-algorithm}

::: TODO
- Prio 2:
    - use the generic graph search algorithm
    - aka uniform-cost search
- Prio 2: simplify code
:::

We can nudge Prim’s algorithm just a little to get a (single-source) shortest path algorithm. The only thing we have to do is to use another priority. Instead of using the weight of the current edge, we use the *total cost* of the whole path from the start vertex. This means that the agenda will still contain edges, but their priority is different from the weight of the edge.

The algorithm is usually called *Dijkstra’s algorithm*, but also *uniform cost search*:

- Initialise the agenda, the visited vertices, and the SPT (the shortest path tree)
- Add a *dummy edge* ending in the *start* vertex, to the agenda
- While the agenda is not empty:
    - Remove the cheapest edge *e* from the agenda – assume its priority is *w*
    - If *e.end* is not visited:
        - Add *e.end* to the visited vertices, and add *e* to the SPT
        - Stop when the SPT is complete (when its size is $V–1$)
        - For each outgoing edge $e’$, add it to the agenda with priority $w + e’.weight$ (if $e’.end$ is unvisited)

If you compare this with Prim’s algorithm you see that the only difference is the priorities. In Prim’s algorithm the priority is the edge weight, while in Dijkstra’s it is the total cost so far, plus the current edge weight.

If we are only interested in one single goal vertex, we can stop already when we reach the goal – we don’t need to calculate the full shortest path tree. Note however, it is very important that we don’t stop when we add the goal to the agenda, but when we remove it from the agenda!

The time complexity is exactly the same as for Prim’s algorithm: the agenda has size $O(E)$, and since adding to and removing from a priority queue is logarithmic, we get the total time complexity $O(E \log(E))$, or equivalently $O(E \log(V))$.

Now let’s run Dijkstra’s algorithm on the example graph, starting from $A$:

- First mark $A$ as visited and add $AB_4$ and $AC_7$ to the agenda
- Remove $AB_4$, mark $B$ as visited and add $BC_{4+2}$ and $BD_{4+9}$
- Remove $BC_{4+2}$, mark $C$ as visited and add $CE_{4+2+7}$ and $CD_{4+2+8}$
- Remove $AC_7$, but skip it since its endpoint is already visited
- Remove $BD_{4+9}$, mark $D$ as visited and add DE_{4+9+9} and $DF_{4+9+4}$
- Remove $CE_{4+2+7}$, mark $E$ as visited and add $EF_{4+2+7+8}$
- Remove $CD_{4+2+8}$, but skip it since its endpoint is already visited
- Remove $DF_{4+9+4}$, and mark $F$ as visited.
- Now we can stop because we have visited all vertices.

Afterwards the shortest path tree contains the edges $AB$, $BC$, $BD$, $CE$ and $DF$.

If we want to extract an actual path from $A$ to for example $F$, we can store the SPT as backpointers – a map from vertices to the edge that ends in that vertex. Then we can build the path backwards from $F$ to $A$ by following the backpointers.

### Useless entries in the agenda (optional)

Sometimes we add an edge to the agenda that will in the end not be used because another edge with the same endpoint had lower weight. This is what happened to the edges $AC$ and $CD$ in our Dijkstra example. So, if we use our algorithm we will sometimes have entries in our agenda that will turn out to be useless. Can we improve this somehow?

Yes, there is another possibility – if we can *update* the priorities of existing entries in a priority queue. This is not supported by a normal binary heap, but there are extensions that provides operations for finding values anywhere in the heap, and updating their priorities. If we have that kind of *updateable* priority queue we can modify the algorithms of Prim and Dijkstra just a little:

- Let the agenda contain *vertices instead of edges, but with the same priorities.
- We also need a map that gives us the (currently) best known edge for each vertex – this data structure can also double as the backpointers from which we can rebuild the final MST (for Prim) or shortest path (for Dijkstra).
- Instead of adding an edge to the agenda, we find its end vertex in the agenda, and update its priority if the new edge is better than the current best. If the priority is updated we also have to update the bcakpointer for the vertex.

The modified Prim algorithm looks something like this:

- Initialise the agenda, the visited vertices, and the map of backpointers
- Add the *start* vertex to the agenda
- While the agenda is not empty:
    - Remove the cheapest vertex $v$ from the agenda (with priority $w$)
    - If $v$ is not visited:
        - Add $v$ to the visited vertices (no need to update the backpointers, because this was done when $v$ was added to the agenda)
        - Stop when all vertices have been visited
        - For each outgoing edge $e$:
            - Let $cost = e.weight$ (Prim), or $w + e.weight$ (Dijkstra)
            - If $e.end$ is in the agenda and has better priority than *cost*: skip this iteration
            - If $e.end$ is in the agenda: update its priority to *cost*
            - Otherwise: add *e.end* with priority *cost*
            - Set *backpointers*[$v$] = $e$

This modified algorithm can sometimes be quite a lot faster than our simpler version (with useless agenda entries) – this depends a lot on the graph. If we use a *Fibonacci heap* instead of a binary heap, the time complexity goes down to $O(E + V \log(V))$. Furthermore, if the graph is dense the number of edges $E$ dominates over the number of vertices $V$, so we get $O(E)$ instead of $O(E \log(V))$.

If you don’t have access to an updateable priority queue, it is still possible to adopt some of the ideas to our simpler algorithm. We can keep a map from vertices to costs (the currently best known cost to that vertex), and only add an edge to the agenda if this will improve the best cost for the end vertex of the edge.

### A* algorithm (optional)

Dijkstra’s algorithm is blind – it has no idea whatsoever in which direction it should search. The only controlling mechanism is the priority queue, and it is ordered by the total cost of the path from the start – that is, the path you have already walked.

This is the very best we can do if we don’t have any way of guessing where the goal is, but often we do have some kind of guess. In shortest-path searching, a *heuristics* is an estimation (a guess) of how far away the goal is. Note that the heuristics does not suggest which edge to try next, or if the goal is to the left or right or above or below. The only thing it gives is a guessed cost from a vertex to the goal.

Let’s introduce the following functions:

- $g(v)$ = the cost of the shortest path from the start to vertex $v$
- $h(v)$ = the estimated cost of the shortest path from $v$ to the goal
- $f(v) = g(v) + h(v)$ = the estimated shortest cost from start to goal via $v$

Dijkstra’s algorithm doesn’t know anything about the heuristics, so its priority queue is ordered by the function $g$ only. If we know some heuristics $h$, we can order the priority queue by $f$ instead – meaning that we always visit the vertex that we currently believe will lead to the shortest total cost. This is the A* algorithm.

If the heuristics h is *admissible* and *consistent*, then it’s possible to prove that A* is the optimal shortest-path algorithm – that is, no other algorithm can visit fewer vertices that A* does, and still be guaranteed to return the shortest path.

- $h$ is *admissible* if $h(v) \leq h^{*}(v)$, where $h^{*}(v)$ is the shortest cost to the goal
- $h$ is *consistent* if $h(v) \leq c(v, w) + h(w)$, whenever there’s an edge between $v$ and $w$, and $c(v, w)$ is its cost

One common example of an admissible and consistent heuristics is the *straight-line distance* (“fågelvägen” in Swedish) between two cities, if the graph is the road network. It is admissible and consistent because the straight-line distance is never longer than any path between two cities.

Another example of an admissible and consistent heuristics is $h(v) = 0$. In this case A* collapses to Dijkstra’s algorithm – so we could view Dijkstra’s as a special case of A*.

Note that if the heuristics is *not* admissible, then A* will still find a path, but this path is not guaranteed to be the shortest. However, it will usually find that path quicker, so increasing the heuristics (for example by multiplying with some constant) can sometimes be good if we have a very large graph and want to find *some* path but not necessarily the shortest.

### Greedy search (optional)

Another way to order the priority queue is to not care at all about $g(v)$, the cost from *start* to $v$ – instead we let only the heuristics $h(v)$ affect the search. This is called *greedy* search. The resulting path is often very far from optimal – but on the other hand it usually finds some result much quicker than A* or Dijkstra does.

-------------------

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

```{.jsav-embedded src="Graph/DijkstraPE.html" type="pe" name="Dijkstra's Algorithm Proficiency Exercise"}
```
:::

<!--
### Invariants
 -->

