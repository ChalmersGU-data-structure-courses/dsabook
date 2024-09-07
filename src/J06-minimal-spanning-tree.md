
## Minimal Cost Spanning Trees

The [minimal-cost spanning tree]{.term} (MCST)
problem takes as input a connected, undirected graph $\mathbf{G}$, where
each edge has a distance or weight measure attached. The MCST is also
called *minimum spanning tree* (MST).

The MCST is the graph containing the vertices of $\mathbf{G}$ along with
the subset of $\mathbf{G}$ 's edges that (1) has minimum total cost as
measured by summing the values for all of the edges in the subset, and
(2) keeps the vertices connected. Applications where a solution to this
problem is useful include soldering the shortest set of wires needed to
connect a set of terminals on a circuit board, and connecting a set of
cities by telephone lines in such a way as to require the least amount
of cable.

The MCST contains no cycles. If a proposed MCST did have a cycle, a
cheaper MCST could be had by removing any one of the edges in the cycle.
Thus, the MCST is a free tree with $|\mathbf{V}| - 1$ edges. The name
"minimum-cost spanning tree" comes from the fact that the required set
of edges forms a tree, it spans the vertices (i.e., it connects them
together), and it has minimum cost. 
[Figure #MCSTdgm](#MCSTdgm) shows the MCST for an
example graph.

:::: {#MCSTdgm}
<inlineav id="MCSTCON" src="Graph/MCSTCON.js" name="Graph/MCSTCON" static/>

A graph and its MCST. All edges appear in the original graph. Those
edges drawn with heavy lines indicate the subset making up the MCST.
Note that edge $(C, F)$ could be replaced with edge $(D, F)$ to form a
different MCST with equal cost.
::::

### Prim's Algorithm

The first of our two algorithms for finding MCSTs is commonly referred
to as [Prim's algorithm]{.term}. Prim's
algorithm is very simple. Start with any Vertex $N$ in the graph,
setting the MCST to be $N$ initially. Pick the least-cost edge connected
to $N$. This edge connects $N$ to another vertex; call this $M$. Add
Vertex $M$ and Edge $(N, M)$ to the MCST. Next, pick the least-cost edge
coming from either $N$ or $M$ to any other vertex in the graph. Add this
edge and the new vertex it reaches to the MCST. This process continues,
at each step expanding the MCST by selecting the least-cost edge from a
vertex currently in the MCST to a vertex not currently in the MCST.

Prim's algorithm is quite similar to Dijkstra's algorithm for finding
the single-source shortest paths. The primary difference is that we are
seeking not the next closest vertex to the start vertex, but rather the
next closest vertex to any vertex currently in the MCST. Thus the
following lines in Djikstra's algorithm:

    dist = D.get(v) + e.weight
    if dist < D.get(w):
        D.put(w, dist)

are replaced with the following lines in Prim's algorithm:

    if e.weight < D.get(w):
        D.put(w, e.weight)

The following code shows an implementation for Prim's algorithm that
searches the distance matrix for the next closest vertex.

    // Compute shortest distances to the MCST, store them in D.
    // parent.get(v) will hold the index for the vertex that is v's parent in the MCST
    function Prim(G, s):
        visited = new Set()
        parent = new Map()
        D = new Map()
        for each v in G.vertices():
            D.put(v, ∞)
        D.put(s, 0)

        repeat G.vertxCount() times:  // Process the vertices
            v = minVertex(G, D, visited)  // Find next-closest vertex
            visited.add(v)
            if D.get(v) == ∞:
                return parent
            for each e in G.outgoingEdges(v):
                w = e.end
                if e.weight < D.get(w):
                    D.put(w, e.weight)
                    parent.put(w, v)
        return parent

For each vertex *e*, when *e* is processed by Prim's algorithm, an edge
going to *e* is added to the MCST that we are building. Array `V[e]`
stores the previously visited vertex that is closest to Vertex *e*. 
This information lets us know which edge goes into the
MCST when Vertex *e* is processed.

<inlineav id="primCON" src="Graph/primCON.js" name="Prim's Minimum Cost Spanning Tree Algorithm Slideshow" links="Graph/primCON.css"/>

### Prim's Algorithm, Priority Queue Implementation

Alternatively, we can implement Prim's algorithm using a
[priority queue]{.term} to find the next closest
vertex, as shown next. As with the priority queue version of Dijkstra's
algorithm, the [heap]{.term} stores `DijkElem`
objects.

    // Prim's MCST algorithm: priority queue version
    function PrimPQ(G, s):
        visited = new Set()
        parent = new Map()
        D = new Map()
        for (v : G.vertices())
            D.put(v, ∞)
        D.put(s, 0)

        agenda = new PriorityQueue()
        agenda.add(new KVPair(0, s))

        while not agenda.isEmpty():
            v = agenda.removeMin().value
            if v not in visited:
                visited.add(v)
                if D.get(v) == ∞:
                    return parent
                for each e in G.outgoingEdges():
                    w = e.end
                    if e.weight < D.get(w):
                        D.put(w, e.weight)
                        parent.put(w, v)
                        agenda.add(new KVPair(e.weight, w))
        return parent


Prim's algorithm is an example of a greedy algorithm. At each step in
the `for` loop, we select the least-cost edge that connects some marked
vertex to some unmarked vertex. The algorithm does not otherwise check
that the MCST really should include this least-cost edge. This leads to
an important question: Does Prim's algorithm work correctly? Clearly it
generates a spanning tree (because each pass through the `for` loop adds
one edge and one unmarked vertex to the spanning tree until all vertices
have been added), but does this tree have minimum cost?

> **Theorem:** Prim's algorithm produces a minimum-cost spanning tree.
>
> **Proof:** We will use a proof by contradiction. Let
> $\mathbf{G} = (\mathbf{V}, \mathbf{E})$ be a graph for which Prim's
> algorithm does *not* generate an MCST. Define an ordering on the
> vertices according to the order in which they were added by Prim's
> algorithm to the MCST: $v_0, v_1, ..., v_{n-1}$. Let edge $e_i$
> connect $(v_x, v_i)$ for some $x < i$ and $i \leq 1$. Let $e_j$ be the
> lowest numbered (first) edge added by Prim's algorithm such that the
> set of edges selected so far *cannot* be extended to form an MCST for
> $\mathbf{G}$. In other words, $e_j$ is the first edge where Prim's
> algorithm "went wrong." Let $\mathbf{T}$ be the "true" MCST. Call
> $v_p (p<j)$ the vertex connected by edge $e_j$, that is,
> $e_j = (v_p, v_j)$.
>
> Because $\mathbf{T}$ is a tree, there exists some path in $\mathbf{T}$
> connecting $v_p$ and $v_j$. There must be some edge $e'$ in this path
> connecting vertices $v_u$ and $v_w$, with $u < j$ and $w \geq j$.
> Because $e_j$ is not part of $\mathbf{T}$, adding edge $e_j$ to
> $\mathbf{T}$ forms a cycle. Edge $e'$ must be of lower cost than edge
> $e_j$, because Prim's algorithm did not generate an MCST. This
> situation is illustrated in 
> [Figure #PrimProof](#PrimProof). However, Prim's
> algorithm would have selected the least-cost edge available. It would
> have selected $e'$, not $e_j$. Thus, it is a contradiction that
> Prim's algorithm would have selected the wrong edge, and thus,
> Prim's algorithm must be correct. 

::: figure
#### Figure: Proof of Prim's algorithm {- #PrimProof}

![Prim's MCST algorithm proof](images/PrimMST.png){width=400}

Prim's MCST algorithm proof. The left oval contains that portion of the
graph where Prim's MCST and the "true" MCST $\mathbf{T}$ agree. The
right oval contains the rest of the graph. The two portions of the graph
are connected by (at least) edges $e_j$ (selected by Prim's algorithm
to be in the MCST) and $e'$ (the "correct" edge to be placed in the
MCST). Note that the path from $v_w$ to $v_j$ cannot include any marked
vertex $v_i, i \leq j$, because to do so would form a cycle.
:::


<avembed id="PrimPE" src="Graph/PrimPE.html" type="pe" name="Prim's Algorithm Proficiency Exercise"/>
