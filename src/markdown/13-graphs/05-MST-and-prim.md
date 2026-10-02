
## Minimum spanning trees and Prim's algorithm {#graphs:MSTs}

As explained in @sec:graphs:definitions, a *spanning tree* of an undirected graph is a tree that includes (spans) all the vertices of the graph.
**Interesting fact**: The number of edges in a spanning tree is exactly $V{-}1$.
(Why is this? Try to convince yourself that this is true.)

If the graph is weighted, a *minimum spanning tree* (MST) is a spanning tree whose total cost is as small as possible.
A graph often has several MSTs -- for example, if all weights are the same, then all spanning trees are MSTs.
@Fig:ExampleMSTs shows a graph and two possible MSTs for it, each with a combined weight of $20$.
You may not immediately recognise the two MSTs as trees, since there is no root element
and no clear parent/child relationships between nodes --
but if you "lift" either MST by any node, assigning it as the root,
you will get a tree as the ones we have seen in earlier chapters.

![A graph (leftmost) and two different MSTs for it, both of total weight 20.](images/12.4-example-MSTs.svg){#fig:ExampleMSTs}

The minimum spanning tree is used in many different algorithms, and there are a lot of use cases which rely heavily on finding the MST --
for example, when designing all kinds of networks, such as computer networks, telecommunications networks, transportation networks, water supply networks, and electrical grids.

Note that an MST is different from a *shortest path tree* (as produced by Dijkstra's algorithm).
If our graph is a set of islands and the edges represent possible bridges between them, weighted by length of the bridge,
then Dijkstra's algorithm lets us optimise bridges to have the shortest total distance from a designated starting node.
The MST instead shows the shortest possible total length of bridges required to connect all islands.
Both these are useful for different applications, and it is important to understand the difference.

In this book you will learn two algorithms for finding the MST of a graph:
Prim's algorithm is another example of a graph traversal, whereas Kruskal's algorithm is a different kind of algorithm.


### Prim's MST algorithm {#graphs:prims-algorithm}

Similar to Dijkstra's algorithm, Prim's uses a priority queue, but instead of prioritising edges by total cost, they are prioritised only by their weight.
This means that an implementation of Dijkstra's algorithm as we have seen before can be changed into Prim's as easily as changing `cost+weight` to just `weight`!

![
    Steps of Prim's algorithm, starting in $A$.
    In each step, we simply select the cheapest edge from a visited to an unvisited vertex.
    These edges are shown with circled weights in the image.
](images/12.4-prim.svg){#fig:GraphPrim1}

@Fig:GraphPrim1 shows the execution of Prim's algorithm on the same example graph as before.
The algorithm is very easy to run with pen and paper:
Simply circle the currently visited nodes, and select the edge with the lowest cost that intersects the perimeter of the circle.
Note that after visiting $F$ in this example there are two edges with the same weight ($3$).
Which one we choose depends on the inner working of the priority queue, and may affect the final shape of the MST, but the result will always be an MST.



<!--
::: dsvis
Here is a visualisation of Prim's algorithm.
``` {.jsav-animation src="Graph/primCON.js" links="Graph/primCON.css" name="Prim's Minimum Cost Spanning Tree Algorithm Slideshow"}
```
:::

::: dsvis
Here is an exercise for Prim's algorithm.
```{.jsav-embedded src="Graph/PrimPE.html" type="pe" name="Prim's Algorithm Proficiency Exercise"}
```
:::
-->
