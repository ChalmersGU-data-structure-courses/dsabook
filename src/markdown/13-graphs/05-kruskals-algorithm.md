
## Kruskal's MST algorithm {#kruskals-algorithm}

::: TODO
- Prio 2: first show more abstract pseudocode, not using union/find
:::

Our first MST algorithm is commonly referred to as [Kruskal's algorithm]{.term}.
Kruskal's algorithm is also a simple, greedy algorithm.
First partition the set of vertices into $|\mathbf{V}|$ [disjoint sets](#union-find){.term},
each consisting of one vertex. Then process the edges in order of
weight. An edge is added to the MST, and two disjoint sets combined, if
the edge connects two vertices in different disjoint sets. This process
is repeated until only one disjoint set remains.

The edges can be processed in order of weight by putting them in an
array and then sorting the array. Another possibility is to use a
*minimum* [priority queue]{.term}, similar to what we did in
[Prim's algorithm]{.term} in the previous section.

The only tricky part to this algorithm is determining if two vertices
belong to the same equivalence class. Fortunately, the ideal algorithm
is available for the purpose -- the [Union/Find]{.term} algorithm, described in @sec:disjoint-sets.
Here is an implementation for Kruskal's algorithm. Note that since the
MST will never have more than $|\mathbf{V}|-1$ edges, we can return as
soon as the MST contains enough edges.

    function kruskal(graph):
        edges = all edges in graph
        sort edges by their weight
        mst = new Set() of edges
        forest = new ParentPointerTree(graph.size)
        while not edges.isEmpty():
            e = edges.removeMin()
            if forest.find(e.start) != forest.find(e.end):
                mst.add(edge)     // If the vertices are not connected, add the edge to the MST
                if mst.size >= graph.size-1:
                    return mst    // Return when the MST has |V|-1 edges
                forest.union(e.start, e.end)  // Connect the two vertices


::: dsvis
Here is a visualisation of Kruskal's algorithm.
To the left is the `forest`, the disjoint set of trees, and to the right is a list of all edges together with their weights.

``` {.jsav-animation src="Graph/kruskalCON.js" links="Graph/kruskalCON.css" name="Kruskal Slideshow"}
```
:::

Kruskal's algorithm is dominated by the time required to process the
edges. The **Find** and **Union** functions are nearly constant in time if
path compression and weighted union is used. Thus, the total cost of the
algorithm is $O(|\mathbf{E}| \log |\mathbf{E}|)$ in the worst case,
when nearly all edges must be processed before all the edges of the
spanning tree are found and the algorithm can stop. More often the edges
of the spanning tree are the shorter ones, and only about $|\mathbf{V}|$
edges must be processed. If so, the cost is often close to
$O(|\mathbf{V}| \log |\mathbf{E}|)$ in the average case (provided
we use a priority queue instead of sorting all edges in advance).

::: dsvis
Here is an exercise for Kruskal's algorithm.

```{.jsav-embedded src="Graph/KruskalPE.html" type="pe" name="Kruskal's Algorithm Proficiency Exercise"}
```
:::

<!--
### Invariants
 -->

