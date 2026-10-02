
## Shortest-path problems and Dijkstra's algorithm {#graphs:shortest-path}

::: TODO
- Include something about A*
:::

Breadth-first traversal using a queue lets us find the shortest paths through an unweighted graph,
or equivalently, the paths passing through the fewest edges.
But often we want to find the shortest route in kilometers, or the fastest in seconds, or the one with the least CO_2 emissions.
For this we need a *weighted* graph, where the edge weights can denote distance in kilometers, but also travel time, or CO_2 emissions.

There are hundreds of other examples of shortest path problems that one might not even think of as graph in the first place.
For example, finding the best move in a chess game, solving a puzzle, proving a mathematical theorem, or even deciding what to say in a conversation, can be formulated as shortest-path problems in some graph.

Formally, the *shortest path* between two vertices is a path whose total cost is as low as possible.
This of course assumes that there is a path, and from here on we will assume that the path actually exists.
Just as for BFS there may be several shortest paths -- that is, different paths with the same total cost.

![
    On the left is the undirected weighted graph from @fig:GraphExamples,
    and on the right two different *shortest-path trees* starting from vertices $A$ and $F$ respecitvely.
    They are shown both within the graph and in standard tree notation.
](images/12.3-example-SPTs.svg){#fig:GraphSPTs}

As we saw earlier, the generic graph traversal algorithm does not only find a path from one vertex to another,
but from one vertex to all others.
A solution to the shortest path problem from a given starting vertex $s$ is called a *shortest path tree* (SPT) for $s$.

@Fig:GraphSPTs shows two shortest path trees for the weighted undirected graph in @fig:GraphExamples.
They show for example that $A\rightarrow D\rightarrow E$ is a shortest path from $A$ to $E$ with a cost of $5$,
and that $F\rightarrow E\rightarrow D$ is another from $F$ to $D$.
Neither of the trees help us figure out the shortest path from $B$ to $E$,
to do that we would need to construct an SPT for $B$.


### Dijkstra's shortest-path algorithm {#graphs:dijkstras-algorithm}

Dijkstra's algorithm is perhaps the most well-known graph algorithm of all --
for weighted graphs it solves the shortest path problem from a given vertex.
Note that the algorithm only work for graphs with *non-negative* weights.
For most applications this is not a problem, for instance if the weights signify time or distance,
there will not be any negative weights (unless we have a time machine).

The algorithm is another instance of the generic traversal described in [](#alg:graph-traversal),
where we keep an agenda of edges from visited to unvisited vertices.
For DFS, the agenda is a stack.
For BFS, the agenda is a queue.
For Dijkstra's algorithm, we use a *min-priority queue*,
prioritised by the cost of the shortest path from the starting vertex to the end vertex.

This requires a little extra book-keeping since the agenda does not simply contain edges, it contains edges with priority values.
@Fig:GraphDijkstra1 illustrates this, where the priorities are shown as boxes on the form $\fbox{2+3}$.
Note for example how in the second step the agenda contains two options for visiting $E$:

- Either directly from $A$ at a cost of $\fbox{0+6}=6$:
  this means that the agenda contains the edge $A\rightarrow E$ with priority value 6;
- or via the path $A\rightarrow D\rightarrow E$ at a cost of $\fbox{2+3}=5$:
  therefore the agenda contains the edge $D\rightarrow E$ with priority value 5.

Note that in the second option, the priority value is different from the edge cost,
because the priority is the *total* cost of the path from $A$, while the edge cost is just the final step.

![
    Steps of Dijkstra's algorithm, starting in $A$.
    Visited vertices are annotated with the cost of their shortest path,
    and edges in the agenda with their cost on the form $\fbox{2+3}$
    where 2 is the cost to the origin vertex and 3 the cost of the edge.
    The resulting SPT is shown in @fig:GraphSPTs.
](images/12.3-dijkstra.svg){#fig:GraphDijkstra1}

Why does Dijkstra's algorithm work?
Here is an informal argument:
In the first step, it always selects the shortest edge $s\rightarrow x$
from the starting vertex $s$ to some other vertex $x$ (in our example, $x=D$).
We know there is no shorter path from $s$ to $x$, because any other path would start with a longer edge from $s$.
The subsequent steps work similarly: We select the shortest path leading out of the set of visited vertices.
Because any other path would start with a longer path from the set of visited vertices, we know that the path we use is a shortest path.

::: {.algorithm #alg:dijkstra}
#### Dijkstra's algorithm
To find the shortest paths from a starting vertex $s$,
first create an empty set of *visited* vertices and the *result* set.
Let the *agenda* be a min-priority queue, ordered by total cost from $s$.
Initialise it with a single a dummy edge ending in $s$, with priority (total cost) $0$.
Repeat the following until the agenda is empty:

- Remove an edge ending in $b$ from the *agenda*, with priority *cost*
- If $b$ is not in *visited*:
    - Add $b$ to *visited*, and the edge to the *result*
    - Add each outgoing edge $b\xrightarrow{w}c$ to the agenda with with priority $\textit{cost}+w$,
      unless $c$ has been visited already
:::

As with DFS and BFS before, we can also analyse the agenda at each step of the algorithm.
Again, we assume that we only add edges that lead to unvisited vertices, and we only show the steps that pass the visitation check:

edge                           visited                                                                     agenda (most prioritised to the left)
-----------------------------  -------------------  --------------------------------------------------------------------------------------------
$(0, {\,?\,}{\rightarrow}A)$   $\{A\}$                                      $[(2, A{\rightarrow}D), (4, A{\rightarrow}B), (6, A{\rightarrow}E)]$
$(2, A{\rightarrow}D)$         $\{A,D\}$                                    $[(4, A{\rightarrow}B), (5, D{\rightarrow}E), (6, A{\rightarrow}E)]$
$(4, A{\rightarrow}B)$         $\{A,D,B\}$            $[(5, D{\rightarrow}E), (6, A{\rightarrow}E), (7, B{\rightarrow}F), (8, B{\rightarrow}C)]$
$(5, D{\rightarrow}E)$         $\{A,D,B,E\}$          $[(6, A{\rightarrow}E), (7, B{\rightarrow}F), (8, B{\rightarrow}C), (8, E{\rightarrow}F)]$
$(7, B{\rightarrow}F)$         $\{A,D,B,E,F\}$                              $[(8, B{\rightarrow}C), (8, E{\rightarrow}F), (10,F{\rightarrow}C)]$
$(8, B{\rightarrow}C)$         $\{A,D,B,E,F,C\}$                                                  $[(8, E{\rightarrow}F), (10,F{\rightarrow}C)]$


### Optimising Dijkstra's algorithm

The best optimisation to the generic traversal algorithm is to never add useless edges to the agenda.
If we know that the edge will be dismissed when it is removed from the agenda, it is better to never add it in the first place.
We already did this in [](#alg:graph-traversal), where we don't add an edge if its endpoint is already visited.
But we can make even better optimisations, if we store some additional information while processing.

Consider when we visit $F$ in our running example (the second-to last line in the table above).
We have already found a path of cost $8$ to $C$ ($A\rightarrow B\rightarrow C$): it is in the agenda waiting to be processed.
Yet we add an inferior edge to the agenda (for the path $A\rightarrow B\rightarrow F\rightarrow C$ at cost $10$).
When we eventually process that edge, it will be discarded by the visitation check, because by that time we have processed the cost-$8$ edge.
So, when we add an edge to the agenda we want to know if it already contains a cheaper edge ending in the same vertex.
We can do this by having a map that stores the cheapest cost for a vertex that is currently in the agenda.
With this information we can make sure we only add edges to the agenda if they can improve the cost.

Here is an implementation in pseudocode of this optimisation, where the cheapest-cost map is called `dist`.
Note that the `result` is not included in this code.

    dijkstra(start):
        visited = new set of vertices
        dist = new map from vertices to costs
        dist.put(start, 0)
        agenda = new min-priority queue ordered by total path cost
        agenda.add(0, null->start)
        while agenda is not empty:
            cost, a->b = agenda.removeMin()
            if b is not in visited:
                visited.add(b)
                for each edge b->c in outgoingEdges(b):
                    newCost = cost + weight(b->c)
                    if not (c is in visited and dist.get(c) < newCost):
                        agenda.add(newCost, b->c)
                        dist.put(b, newCost)

Going one step further, we can observe that there should never be two edges to the same vertex in the agenda.
When we find a better option for reaching a vertex, we should *replace* the old entry in the agenda with the improved one.
This means the agenda will never contain more than one edge to a particular vertex, and that every edge in the agenda leads to an unvisited vertex.
To to do this we need to have a priority queue where we can update the priorities of existing elements.
We briefly discussed *updateable priority queues* in @sec:heaps:change-priority,
and leave as an exercise for the reader to implement Dijkstra's algorithm using this idea.

<!--
#### A* algorithm (optional)

Dijkstra's algorithm is blind -- it has no idea whatsoever in which direction it should search. The only controlling mechanism is the priority queue, and it is ordered by the total cost of the path from the start -- that is, the path you have already walked.

This is the very best we can do if we don't have any way of guessing where the goal is, but often we do have some kind of guess. In shortest-path searching, a *heuristics* is an estimation (a guess) of how far away the goal is. Note that the heuristics does not suggest which edge to try next, or if the goal is to the left or right or above or below. The only thing it gives is a guessed cost from a vertex to the goal.

Let's introduce the following functions:

- $g(v)$ = the cost of the shortest path from the start to vertex $v$
- $h(v)$ = the estimated cost of the shortest path from $v$ to the goal
- $f(v) = g(v) + h(v)$ = the estimated shortest cost from start to goal via $v$

Dijkstra's algorithm doesn't know anything about the heuristics, so its priority queue is ordered by the function $g$ only. If we know some heuristics $h$, we can order the priority queue by $f$ instead -- meaning that we always visit the vertex that we currently believe will lead to the shortest total cost. This is the A* algorithm.

If the heuristics h is *admissible* and *consistent*, then it's possible to prove that A* is the optimal shortest-path algorithm -- that is, no other algorithm can visit fewer vertices that A* does, and still be guaranteed to return the shortest path.

- $h$ is *admissible* if $h(v) \leq h^{*}(v)$, where $h^{*}(v)$ is the shortest cost to the goal
- $h$ is *consistent* if $h(v) \leq c(v, w) + h(w)$, whenever there's an edge between $v$ and $w$, and $c(v, w)$ is its cost

One common example of an admissible and consistent heuristics is the *straight-line distance* ("fågelvägen" in Swedish) between two cities, if the graph is the road network. It is admissible and consistent because the straight-line distance is never longer than any path between two cities.

Another example of an admissible and consistent heuristics is $h(v) = 0$. In this case A* collapses to Dijkstra's algorithm -- so we could view Dijkstra's as a special case of A*.

Note that if the heuristics is *not* admissible, then A* will still find a path, but this path is not guaranteed to be the shortest. However, it will usually find that path quicker, so increasing the heuristics (for example by multiplying with some constant) can sometimes be good if we have a very large graph and want to find *some* path but not necessarily the shortest.

#### Greedy search (optional)

Another way to order the priority queue is to not care at all about $g(v)$, the cost from *start* to $v$ -- instead we let only the heuristics $h(v)$ affect the search. This is called *greedy* search. The resulting path is often very far from optimal -- but on the other hand it usually finds some result much quicker than A* or Dijkstra does.

-->


<!--
::: dsvis
Here is a visualisation of Dijkstra's algorithm.
``` {.jsav-animation src="Graph/DijkstraCON.js" links="Graph/DijkstraCON.css" name="Dijkstra Slideshow"}
```
:::

::: dsvis
Now you can practice using Dijkstra's algorithm.
```{.jsav-embedded src="Graph/DijkstraPE.html" type="pe" name="Dijkstra's Algorithm Proficiency Exercise"}
```
:::
-->
