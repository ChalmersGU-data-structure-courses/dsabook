
## Kruskal's MST algorithm {#graphs:kruskals-algorithm}

::: TODO
- Prio 2: first show more abstract pseudocode, not using union/find
:::

Kruskal's algorithm solves the same problem as Prim's algorithm:
construct a minimum spanning tree of an undirected connected graph.
Kruskal's operates differently from the other algorithms we have seen (DFS, BFS, Prim's and Dijkstra's) in that it is not a traversal.
Rather, we start with an empty set of edges, then add edges to it successively until we have a complete MST.
The trick is that we add the edges in order of their weights,
so the first thing we do is to sort the edges.
The other thing to think about is that we can only add an edge if it doesn't create a cycle.
The whole algorithm is very compact and shown in [](#alg:kruskal).


::: {.algorithm #alg:kruskal}
#### Algorithm: Kruskal's algorithm
Start with an empty MST.
Sort all edges by their weight, the cheapest edge first.
Repeat the following for each edge $e$:

- Add $e$ to the MST unless that creates a cycle.
- Stop when the MST is complete (when the size is $V{-}1$).
:::

Here is how Kruskal's algorithm unfolds, for the example graph in @fig:ExampleMSTs:

1.  Sort the edges by weight:
    -   $A{\xleftrightarrow{2}}C$,
        $A{\xleftrightarrow{2}}D$,
        $C{\xleftrightarrow{2}}D$,
        $B{\xleftrightarrow{3}}E$,
        $C{\xleftrightarrow{3}}F$,
        $D{\xleftrightarrow{3}}E$,
        $D{\xleftrightarrow{3}}F$,
        $A{\xleftrightarrow{4}}B$,
        $E{\xleftrightarrow{7}}G$.
2.  Try to add each edge to the MST:
    - First we add $A{\leftrightarrow}C$ and $A{\leftrightarrow}D$ to the MST.
    - The next edge, $C{\leftrightarrow}D$, would create a cycle, so we skip it.
    - Then we add $B{\leftrightarrow}E$, $C{\leftrightarrow}F$ and $D{\leftrightarrow}E$.
    - We skip the next edges, $D{\leftrightarrow}F$ and $A{\leftrightarrow}B$, because they create cycles.
    - Finally we add $E{\leftrightarrow}G$.

The final result is the same as the rightmost MST in @fig:ExampleMSTs.
Note that there are several edges with the same weight,
and if we had sorted them differently we could have ended up in another MST.
For example, if $C{\leftrightarrow}D$ had been sorted before $A{\leftrightarrow}D$,
and $D{\leftrightarrow}F$ before $C{\leftrightarrow}F$,
then we would have got the leftmost MST in @fig:ExampleMSTs instead of the other one.

The problem is how to know if an edge will create a cycle.
How can we do that?
This is easy: simply run a DFS or BFS search from one of the edge vertices, and see if we can reach the other vertex.
In the worst case, depth- or breadth-first traversal will visit all edges in the MST, so the complexity is $O(E)$.

What is then the complexity of Kruskal's algorithm?
Well, we iterate over $O(E)$ edges, and test each of these for cyclicity, so we get $O(E^2)$.
If the graph is sparse, $E \in O(V)$ and the complexity can be simplified to $O(V^2)$,
but if it is very dense, $E \in O(V^2)$ and the complexity is the same as $O(V^4)$.

#### Using a disjoint-set instead of a normal set

The complexity derived above assumes that we store the MST as a set, but it is possible to do much better.

There is a better data structure for storing the MST -- the *disjoint-set* (also called union-find).
This data structure was discussed in @sec:trees:disjoint-sets,
and it supports exactly the operations we need efficiently, in *almost* constant time:
to take the *union* of two sets, and to *find* which set a vertex belongs to.

Therefore, if we use a disjoint-set to store the MST, Kruskal's algorithm is $O(E)$.^[
    Actually, the complexity is $O(E\alpha(E))$, where $\alpha$ is the inverse Ackermann function.
    This function grows so slowly that it's always $\leq 4$ for all imaginable graph sizes, so we can pretend it is constant.
]
But first we have to sort the edges, which takes $O(E \log(E))$ time, so the time for sorting the edges will dominate.
Note that since $E \in O(V^2)$ and $O(\log(V^2)) = O(2 \log(V)) = O(\log(V))$,
the total complexity of Kruskal's algorithm can be written as $O(E \log(V))$.


<!-- END NOTES -->

<!--
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
is available for the purpose -- the [Union/Find]{.term} algorithm, described in @sec:trees:disjoint-sets.
Here is an implementation for Kruskal's algorithm. Note that since the
MST will never have more than $|\mathbf{V}|-1$ edges, we can return as
soon as the MST contains enough edges.

    kruskal(graph):
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
algorithm is $O(|\mathbf{E}| \log(|\mathbf{E}|))$ in the worst case,
when nearly all edges must be processed before all the edges of the
spanning tree are found and the algorithm can stop. More often the edges
of the spanning tree are the shorter ones, and only about $|\mathbf{V}|$
edges must be processed. If so, the cost is often close to
$O(|\mathbf{V}| \log(|\mathbf{E}|))$ in the average case (provided
we use a priority queue instead of sorting all edges in advance).

::: dsvis
Here is an exercise for Kruskal's algorithm.

```{.jsav-embedded src="Graph/KruskalPE.html" type="pe" name="Kruskal's Algorithm Proficiency Exercise"}
```
:::

-->

<!--
### Invariants
 -->

