
### Kruskal's Algorithm

Our next MCST algorithm is commonly referred to as
[Kruskal's algorithm]{.term}. Kruskal's
algorithm is also a simple, greedy algorithm. First partition the set of
vertices into $|\mathbf{V}|$
[disjoint sets](#union-find){.term},
each consisting of one vertex. Then process the edges in order of
weight. An edge is added to the MCST, and two disjoint sets combined, if
the edge connects two vertices in different disjoint sets. This process
is repeated until only one disjoint set remains.

<inlineav id="kruskalCON" src="Graph/kruskalCON.js" name="Kruskal Slideshow" links="Graph/kruskalCON.css"/>

The edges can be processed in order of weight by putting them in an
array and then sorting the array. Another possibility is to use a
*minimum* [priority queue]{.term}, similar to what we did in
[Prim's algorithm].

The only tricky part to this algorithm is determining if two vertices
belong to the same equivalence class. Fortunately, the ideal algorithm
is available for the purpose -- 
the [UNION/FIND]{.term} algorithm.
Here is an implementation for Kruskal's algorithm. Note that since the
MCST will never have more than $|\mathbf{V}|-1$ edges, we can return as
soon as the MCST contains enough edges.

```java
// Kruskal's MST algorithm
static void <V> Kruskal(Graph<V> G) {
    ParPtrTree A = new ParPtrTree();
    for (V v : G.vertices())
        A.MAKE_SET(v);   // Create one singleton set for each vertex

    Edge<V>[] E = new Edge<>[edgeCount];
    for (V v : G.vertices())
        for (Edge<V> edge : G.outgoingEdges(v))
            E.append(edge);
    Arrays.sort(E, weightComparator);       // Sort the edges by increasing weight

    int numEdgesInMST = 0;
    for (Edge<V> edge : E) {
        if (A.FIND(edge.start) != A.FIND(edge.end)) {  // If the vertices are not connected
            AddEdgetoMST(edge);             // Add this edge to the MCST
            numEdgesInMST++;
            if (numEdgesInMST >= G.vertexCount()-1)
                return;                     // Stop when the MST has |V|-1 edges
            A.UNION(edge.start, edge.end);  // Connect the two vertices
        }
    }
}
```



Kruskal's algorithm is dominated by the time required to process the
edges. The `FIND` and `UNION` functions are nearly constant in time if
path compression and weighted union is used. Thus, the total cost of the
algorithm is $\Theta(|\mathbf{E}| \log |\mathbf{E}|)$ in the worst case,
when nearly all edges must be processed before all the edges of the
spanning tree are found and the algorithm can stop. More often the edges
of the spanning tree are the shorter ones, and only about $|\mathbf{V}|$
edges must be processed. If so, the cost is often close to
$\Theta(|\mathbf{V}| \log |\mathbf{E}|)$ in the average case (provided
we use a priority queue instead of sorting all edges in advance).

<avembed id="KruskalPE" src="Graph/KruskalPE.html" type="pe" name="Kruskal's Algorithm Proficiency Exercise"/>
