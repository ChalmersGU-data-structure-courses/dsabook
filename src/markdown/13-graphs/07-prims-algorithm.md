
## Prim's MST algorithm {#prims-algorithm}

::: TODO
- Prio 2: reformulate as a generic graph search algorithm
:::

<!-- START NOTES -->

### Generic graph search

Recall the basic algorithm for any kind of graph traversal:

- Initialise the agenda with the start vertex
- While the agenda is not empty:
    - Remove some vertex $v$ from the agenda
    - If $v$ is not visited:
        - Mark $v$ as visited
        - Do something with $v$ (for example print it)
        - Add the end vertices of $v$’s outgoing edges to the agenda

(We can do a minor optimisation here: In the final bullet point we only need to add *unvisited* vertices to the agenda. This will reduce the size of the agenda – but we cannot replace the first if-clause (“if v is not visited”), this is still needed.)

In @sec:traversing-graphs we wrote that if the agenda is a stack we get depth-first search, and if it is a queue we get breadth-first. But what happens if we use a priority queue?

This depends on what we use as the priority values. If we have a weighted graph, then it’s natural to use the weights. In this case we get another MST algorithm: Prim’s.

### Prim’s algorithm

Kruskal’s algorithm repeatedly adds edges to an *unconnected* subgraph, until it becomes fully connected (and without cycles). While the algorithm is running, the set of edges does not have to be a tree – instead it consists of a *forest*, or a set of trees.

Prim’s algorithm on the other hand, starts from a single tree and grows this tree by adding edges to it. In every iteration it finds the “cheapest” edge that can be used to extend the tree. Finding this edge cannot be done by sorting all edges like we did in Kruskal’s algorithm – instead we need to have a collection of potential edges, ordered by their weight. This can be done with a priority queue! (But note, a priority queue of edges, not vertices.)

In each iteration we select the current best candidate. This is the least-cost edge that at some point has been added to the priority queue. Now we can test if we can extend the MST with the edge. This can be done unless it creates a cycle – which it does if the endpoint is already in the MST. If it will create a cycle we discard the edge and try the next best. Otherwise we add it to the MST – and add new potential candidate edges to the priority queue.

Which new potential candidates do we need to add? The only change we did to the MST was to add a new vertex, so we only have to look at the outgoing edges from that new vertex. (All other vertices in the MST have already been taken care of earlier.)

So, here is Prim’s MST algorithm, formulated as generic graph search. We need two auxiliary data structures apart from the actual MST: the agenda (which is a priority queue of edges ordered by weight), and the visited vertices (which is a set of the vertices that are in the MST). We start the algorithm by giving it a *start* vertex:

- Initialise the agenda, the visited vertices, and the MST
- Add a *dummy edge* ending in the start vertex, to the agenda
- While the agenda is not empty:
    - Remove the cheapest edge *e* from the agenda
    - If *e.end* is not visited:
        - Add *e.end* to the visited vertices, and add *e* to the MST
        - Stop when the MST is complete (when its size is $V–1$)
        - Add the outgoing edges of *e.end* to the agenda,  but only the ones whose endpoints are unvisited

Note that we initialise the agenda with a “dummy edge”. This is an edge that doesn’t exist in the graph, and its only purpose is to act as a “seed” that starts the process. This dummy edge can for example be a 0-weight edge that goes from *start* to *start* – it actually doesn’t matter what its weight and start vertex is, we only need it to add the outgoing edges of the *start* vertex to the agenda.

Also note that in the final bullet point I have included the small optimisation I mentioned earlier (“but only the ones whose endpoints are unvisited”).

Recall our example graph, with the following two MSTs:

![](images/Graphs-TwoMSTs.png)

Let’s run Prim’s algorithm on it, starting from A:

- First add a dummy edge to the agenda, which is directly removed.
- Mark $A$ as visited and add its outgoing edges $AB_4$ and $AC_7$ to the agenda.
- Remove $AB_4$ from the agenda and add it to the MST, mark $B$ as visited and add its outgoing edges $BC_2$ and $BD_9$ to the agenda. (We don’t add $BA_4$ since its endpoint $A$ is already visited.)
- Remove $BC_2$ from the agenda and add to the MST, mark $C$ as visited and add its (unvisited) outgoing edges $CE_7$ and $CD_8$ to the agenda.
- Remove $AC_7$ from the agenda, but skip it since its endpoint is already visited.
- Remove $CE_7$ from the agenda and add to the MST, mark $E$ as visited and add its outgoing edges $EF_8$ and $ED_9$ to the agenda.
- Remove $CD_8$ from the agenda and add to the MST, mark $D$ as visited and add its remaining unvisited outgoing edge $DF_4$ to the agenda.
- Remove $DF_4$ from the agenda and add to the MST, and mark $F$ as visited.
- Now we can stop because we have visited all vertices. Left on the agenda are the edges $EF_8$, $BD_9$ and $ED_9$ – if we had continued the while loop we would have noticed that all of their endpoints are already visited.

This gives the left MST – if we remove $EF_8$ before $CD_8$ we would get the right MST.

What is the time complexity of Prim’s algorithm?

In the worst case all edges in the graph are added to the agenda, so the agenda will have size $O(E)$, and since adding an element to a priority queue is logarithmic, we get the total time build the agenda to be $O(E \log(E))$. (We can also reason that we will in the worst case iterate through all edges, so the while loop runs O(E) times. And since removing from a priority queue is logarithmic, each loop body is $O(log(E))$ and the total time is therefore O(E log(E)).)

Furthermore, we know that $E \in O(V^2)$, and therefore $O(\log(E)) = O(\log(V^2))$ = $O(2 \log(V)) = O(\log(V))$. So the total complexity of Prim’s algorithm can be written as $O(E \log(V))$.

<!-- END NOTES -->

--------------------

Now we introduce another algorithm for finding the MST, commonly referred to as [Prim's algorithm]{.term}.
Prim's algorithm is very simple. Start with any vertex $n$ in the graph,
setting the MST to be $n$ initially. Pick the least-cost edge connected
to $n$. This edge connects $n$ to another vertex; call this $m$. Add
vertex $m$ and edge $(n, m)$ to the MST. Next, pick the least-cost edge
coming from either $n$ or $m$ to any other vertex in the graph. Add this
edge and the new vertex it reaches to the MST. This process continues,
at each step expanding the MST by selecting the least-cost edge from a
vertex currently in the MST to a vertex not currently in the MST.

The following code shows an implementation for Prim's algorithm that
searches the distance matrix for the next closest vertex.

    function prim(graph, start):
        visited = new Set() of vertices
        parent = new Map() of vertices to vertices
        distances = new Map() of vertices to their distance from the MST
        // The distance from start to the MST is 0:
        distances.put(start, 0)

        repeat graph.size times:
            v = minVertex(graph, distances, visited)  // Find next-closest vertex
            visited.add(v)
            for each e in graph.outgoingEdges(v):
                if e.end not in distances or e.weight < distances.get(e.end):
                    // If the edge makes the endpoint closer to the MST,
                    // update the endpoint with the new distance, and add it to the MST
                    distances.put(e.end, e.weight)
                    parent.put(e.end, v)
        return parent

For each vertex *v*, when *v* is processed by Prim's algorithm, an edge going to *v* is added to the MST that we are building.
The `parent` map stores the previously visited vertex that is closest to vertex *v*.
This information lets us know which edge goes into the MST when vertex *v* is processed.

::: dsvis
Here is a visualisation of Prim's algorithm.

``` {.jsav-animation src="Graph/primCON.js" links="Graph/primCON.css" name="Prim's Minimum Cost Spanning Tree Algorithm Slideshow"}
```
:::

#### Finding the minimum vertex

There are two reasonable solutions to the key issue of finding the
unvisited vertex with minimum distance value during each pass through
the main `for` loop. The first method is simply to scan through the list
of $|\mathbf{V}|$ vertices searching for the minimum value, as follows:

    function minVertex(graph, distances, visited):
        minV = null
        for each v in graph.vertices():
            if v not in visited:
                if minV is null or distances.get(v) < distances.get(minV):
                    minV = v
        return minV

Because this scan is done $|\mathbf{V}|$ times, and because each edge
requires a constant-time update to $\mathbf{D}$, the total cost for this approach
is $O(|\mathbf{V}|^2 + |\mathbf{E}|) =
O(|\mathbf{V}|^2)$, because $|\mathbf{E}|$ is in
$O(|\mathbf{V}|^2)$.

<!--
### Invariants
 -->

### Priority queue implementation of Prim's algorithm

::: TODO
- can be removed if we use the generic algorithm?
:::

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

    function primPQ(graph, start):
        visited = new Set() of vertices
        parent = new Map() of vertices to vertices
        distances = new Map() of vertices to their distance from the MST
        agenda = new PriorityQueue() of vertices ordered by their distance from the MST
        // The distance from start to start is 0:
        distances.put(start, 0)
        agenda.add(start) with priority 0

        while not agenda.isEmpty():
            v = agenda.removeMin()
            if v not in visited:
                visited.add(v)
                for each e in graph.outgoingEdges():
                    if e.end not in distances or dist < distances.get(e.end):
                        // If the edge makes the endpoint closer to the MST,
                        // update the endpoint with the new distance,
                        // add it to the MST and the agenda
                        distances.put(e.end, e.weight)
                        parent.put(e.end, v)
                        agenda.add(e.end) with priority e.weight
        return parent


### Correctness of Prim's algorithm {#prims-correctness}

:::::: latex
\booklink{Read the rest online}{13.6}{sec:prims-correctness}
::::::

Prim's algorithm is an example of a greedy algorithm. At each step in
the `for` loop, we select the least-cost edge that connects some marked
vertex to some unmarked vertex. The algorithm does not otherwise check
that the MST really should include this least-cost edge. This leads to
an important question: Does Prim's algorithm work correctly? Clearly it
generates a spanning tree (because each pass through the `for` loop adds
one edge and one unmarked vertex to the spanning tree until all vertices
have been added), but does this tree have minimum cost?

:::::: online
::: example
#### Theorem: Prim's algorithm produces a minimum-cost spanning tree.

**Proof:**
We will use a proof by contradiction. Let
$\mathbf{G} = (\mathbf{V}, \mathbf{E})$ be a graph for which Prim's
algorithm does *not* generate an MST. Define an ordering on the
vertices according to the order in which they were added by Prim's
algorithm to the MST: $v_0, v_1, ..., v_{n-1}$. Let edge $e_i$
connect $(v_x, v_i)$ for some $x < i$ and $i \leq 1$. Let $e_j$ be the
lowest numbered (first) edge added by Prim's algorithm such that the
set of edges selected so far *cannot* be extended to form an MST for
$\mathbf{G}$. In other words, $e_j$ is the first edge where Prim's
algorithm "went wrong." Let $\mathbf{T}$ be the "true" MST. Call
$v_p (p<j)$ the vertex connected by edge $e_j$, that is,
$e_j = (v_p, v_j)$.
Because $\mathbf{T}$ is a tree, there exists some path in $\mathbf{T}$
connecting $v_p$ and $v_j$. There must be some edge $e'$ in this path
connecting vertices $v_u$ and $v_w$, with $u < j$ and $w \geq j$.
Because $e_j$ is not part of $\mathbf{T}$, adding edge $e_j$ to
$\mathbf{T}$ forms a cycle. Edge $e'$ must be of lower cost than edge
$e_j$, because Prim's algorithm did not generate an MST. This
situation is illustrated in
@fig:PrimProof. However, Prim's
algorithm would have selected the least-cost edge available. It would
have selected $e'$, not $e_j$. Thus, it is a contradiction that
Prim's algorithm would have selected the wrong edge, and thus,
Prim's algorithm must be correct.

:::

![Proof of Prim's MST algorithm.
The left oval contains that portion of the
graph where Prim's MST and the "true" MST $\mathbf{T}$ agree. The
right oval contains the rest of the graph. The two portions of the graph
are connected by (at least) edges $e_j$ (selected by Prim's algorithm
to be in the MST) and $e'$ (the "correct" edge to be placed in the
MST). Note that the path from $v_w$ to $v_j$ cannot include any marked
vertex $v_i, i \leq j$, because to do so would form a cycle.
](images/PrimMST.png){width=50% #fig:PrimProof}

::: dsvis
Here is an exercise for Prim's algorithm.

```{.jsav-embedded src="Graph/PrimPE.html" type="pe" name="Prim's Algorithm Proficiency Exercise"}
```
:::
::::::
