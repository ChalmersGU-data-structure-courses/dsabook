
## Kruskal's MST algorithm {#kruskals-algorithm}

::: TODO
- Prio 2: first show more abstract pseudocode, not using union/find
:::

<!-- START NOTES -->

This algorithm is conceptually very simple.

- Start with an empty MST
- Sort all edges by weight
- For each edge $e$:
    - Add $e$ to the MST unless that creates a cycle
    - Stop when the MST is complete (when the size is $V–1$)

This is how it works for our example graph:

1. Iterate the edges in sorted order: $BC_2, AB_4, DF_4, AC_7, CE_7, CD_8, EF_8, DE_9, BD_9$.
2. First we add $BC_2$, $AB_4$ and $DF_4$ to the MST.
3. The next edge, $AC_7$, would create a cycle, so we skip it.
4. Then we add $CE_7$ and $CD_8$.
5. Now we can stop because the MST contains 5 edges.

Note that since there are several edges with the same weight. For most of them it doesn’t make any difference, except for $CD_8$ and $EF_8$. They have the same weight, and if $EF_8$ had been visited before $CD_8$ we would have got the second MST instead.

The problem is how to know if an edge will create a cycle. How can we do that? This is not difficult: if both the start and end vertex is in the MST, then adding the edge will create a cycle. So, if we store the MST as a set of edges we can define this function:

- To test if *edge* will create a cycle in the MST:
    - *containsStart* = *containsEnd* = False
    - For each $e$ in MST:
        - If *edge.start* = *e.start* or *e.end*, then *containsStart* = True
        - If *edge.end* = *e.start* or *e.end*, then *containsEnd* = True
    - Return True if both *containsStart* and *containsEnd*

This function loops over all edges in the MST, and in the worst case this contains $V–1$ edges, so the complexity is $O(V)$.

What is then the complexity of Kruskal’s algorithm? Well, we iterate over $O(E)$ edges, and test each of these for cyclicity, so we get $O(VE)$. If the graph is sparse, $E \in O(V)$ and the complexity can be simplified to $O(V^2)$, but if it is very dense, $E \in O(V^2)$ and the complexity is the same as $O(V^3)$.

#### Using a disjoint-set instead of a normal set

This complexity is if we store the MST as a set, but it is possible to do much better.

There is a much better data structure for storing the MST – the *disjoint-set* (also called union-find). For now, the only thing we need to know about the disjoint-set now is that it supports the operations we needs efficiently, in *almost* constant time. To be precise, the complexity of the operations is $O(\log*(n))$, which is an extremely slow-growing function: it’s so slow that $\log*(n) \leq 5$ for all $n \leq 2^{65536}$. So, $\log*(n)$ is constant for *all practical purposes*.

Therefore, if we use a disjoint-set to store the MST, Kruskal’s algorithm is $O(E \log*(E))$ – which in practice is the same as $O(E)$. But first we have to sort the edges, which anyway takes $O(E \log(E))$ time, which is then the total complexity. But note that since $E \in O(V^2)$ and $O(\log(V^2)) = O(2 \log(V)) = O(\log(V))$, the total complexity of Kruskal’s algorithm can be written as $O(E \log(V))$.
More information about the disjoint-set can be found in @sec:disjoint-sets if you are interested. (It’s a quite cool data structure, so worth the read:)

<!-- END NOTES -->

------------------

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

