
## Kruskal's MST algorithm {#graphs:kruskals-algorithm}

::: TODO
- Update disjoint-set section when the corresponding section in ch10 is updated
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

The complexity derived above assumes that we use the edges in the MST to check for cyclicity,
but it is possible to do much better by using special-purpose data structure.

The *disjoint set* data structure was introduced in @sec:trees:disjoint-sets,
and it is perfectly suited for checking if an edge will create a cycle.
To test if an edge $a{\leftrightarrow}b$ will create a cycle,
we can simply test if both $a$ and $b$ belong to the same set.
That is, we test if *find*($a$) = *find*($b$).
And, if the edge doesn't create a cycle, we can merge the two sets: *union*($a,b$).

As discussed in @sec:trees:disjoint-sets, if they are implemented correctly,
both *union* and *find* are very efficient, almost constant time operations.
Therefore, if we use a disjoint-set to store the MST,
Kruskal's algorithm is (almost) linear time, $O(E)$.
But first we have to sort the edges, which takes $O(E \log(E))$ time,
so the time for sorting the edges will dominate.


<!--
::: dsvis
Here is a visualisation of Kruskal's algorithm.
To the left is the `forest`, the disjoint set of trees, and to the right is a list of all edges together with their weights.
``` {.jsav-animation src="Graph/kruskalCON.js" links="Graph/kruskalCON.css" name="Kruskal Slideshow"}
```
:::

::: dsvis
Here is an exercise for Kruskal's algorithm.
```{.jsav-embedded src="Graph/KruskalPE.html" type="pe" name="Kruskal's Algorithm Proficiency Exercise"}
```
:::
-->
