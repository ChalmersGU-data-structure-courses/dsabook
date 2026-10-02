
## Traversing graphs: DFS and BFS {#graphs:traversal}

Many graph algorithms involve *traversing* a graph --
they start from a given vertex and visit each reachable vertex exactly once.
This is similar to traversing a tree, but slightly more difficult because the graph can contain cycles.
A simple recursive procedure can get stuck in an infinite loop.
Instead we use an iterative procedure,
very similar to non-recursive tree traversal as described in @sec:trees:traversal-without-recursion,
but we have to keep track of visited vertices to avoid infinite loops.

- Repeat the following until there are no more possible edges:
    - Select an edge from a visited to an unvisited vertex, and visit that vertex.

<!-- Thus, in each step of the traversal: Select an edge from a visited vertex to an unvisited vertex, and visit that vertex.
Stop when there are no edges from visited to unvisited vertices. -->

::: {.algorithm #alg:graph-traversal}
#### Generic graph traversal
To traverse a graph from a starting vertex $s$,
first create an empty set of *visited* vertices and the *result* set.
Initialise the *agenda* with a single a dummy edge ending in $s$,
then repeat the following until the agenda is empty:

- Remove an edge $a\rightarrow b$ from the *agenda*
- If $b$ is not in *visited*:
    - Add $b$ to *visited*, and the edge to the *result*
    - Add all outgoing edges of $b$, **whose end vertex has not been visited**, to the *agenda*
:::

By varying how we select the next edge, and what we do when we visit a vertex,
we can implement a wide range of useful algorithms on graphs.
All the traversal algorithms described in this chapter are instances of [](#alg:graph-traversal),
which we therefore call *generic graph traversal*.
Examples that we will encounter later are depth- and breadth-first traversal,
Dijkstra's algorithm, and Prim's algorithm.
The generic graph traversal algorithm uses three data structures: an *agenda*, a *visitation set*, and a *result*:

- The *agenda* is the collection of edges we have discovered but not yet traversed.
  Different algorithms use different kind of agendas, and this is the main tool
  to distinguish different ways of traversing the graph.
- The *visitation set* is the set of vertices that already have been visited, and therefore should not be visited again.
- The *result* can be anything that the algorithm builds while traversing the graph.
  This will be discussed further in @sec:graphs:building-result, but for now
  we can assume that the result is a set of the edges that we have traversed.

![
    Steps of a graph traversal in the undirected graph from @fig:GraphExamples, starting in $A$.
    The circled areas are the set of visited vertices, and the pointed arrows show the selected edges.
    The edges with circles on them show the agenda.
    This traversal selects the edges in the following order:
    $A{\rightarrow}B$, $A{\rightarrow}E$, $B{\rightarrow}F$, $A{\rightarrow}D$, $F{\rightarrow}C$,
    and these edges form the final result set.
](images/12.2-graph-traversal.svg){#fig:GraphTraversal1}

@fig:GraphTraversal1 illustrates how a graph traversal can unfold,
starting from vertex $A$ in the undirected graph from @fig:GraphExamples.
It shows a useful trick when trying to understand graph traversal algorithms on pen and paper:
Circle the visited vertices, and the edges that intersect with the circle will be the important parts of the agenda.
<!--
Note that the algorithm does not specify in which order we select vertices.
In particular, it does not necessarily select a vertex adjacent to the previous vertex we visited,
but rather skip around to vertices that are adjacent to *some* visited vertex.
-->
There are some things to note about this very abstract algorithm:

- To get the process rolling, we add a fake edge to the agenda, leading to the starting vertex $s$.
  Its only purpose is to start the whole process: the first thing the loop does is to visit the starting vertex.

- The agenda does not only contain edges from visited vertices to unvisited ones.
  Sometimes it will contain edges between two visited vertices,
  which is why we need to check that $b$ is not visited.

- It is a bit silly to add an edge to the agenda if it ends in an already visited vertex.
  For example, the graph in @fig:GraphTraversal1 is undirected,
  so when we have removed the edge $A\rightarrow B$ from the agenda,
  it would be foolish to immediately add the reverse edge $B\rightarrow A$ to the agenda.
  This is why we have the additional check in the last line
(the boldfaced text "...whose end vertex has not been visited"),
  which is a simple and often very effective optimisation.
  But note that it does not let us remove the original visitation check, that $b$ is not visited.


### Depth-first traversal {#graphs:DFS}

To turn this high level description of the algorithm into an efficient procedure,
we need to decide how to represent the agenda.
If we use a *stack* for the agenda we will get a depth-first traversal, DFS.
<!-- similar to how one can implement DFS for trees (see @sec:trees:bintree-traversal). -->

![
    Steps of a depth-first traversal, starting in $A$,
    using a stack and assuming `outgoingEdges` are given in alphabetical order of destination vertex.
    The algorithm can be described as:
    select the alphabetically last edge from the most recently visited vertex adjacent to an unvisited vertex.
](images/12.2-DFS-traversal.svg){#fig:GraphTraversal2}

However, DFS can unroll in several ways --
which edges are selected and the order in which vertices are visited depend on the order in which `outgoingEdges` produces edges.
Let us use the same graph as in @fig:GraphTraversal1 and
assume that `outgoingEdges` returns edges in alphabethical order of their destination.
This means that, for example, `outgoingEdges`($A$) returns $[A{\rightarrow}B, A{\rightarrow}D, A{\rightarrow}E]$.
If we use a stack as the agenda, the vertices will be visited in this order: $[A,E,F,C,B,D]$.
This is far from obvious, so let us walk through the steps of depth-first traversing the graph:

edge                      visited                                                                          agenda (stack top to the left)
------------------------  -------------------  ------------------------------------------------------------------------------------------
${\,?\,}{\rightarrow}A$   $\{A\}$                                                   $[A{\rightarrow}E, A{\rightarrow}D, A{\rightarrow}B]$
$A{\rightarrow}E$         $\{A,E\}$                                $[E{\rightarrow}F, E{\rightarrow}D, A{\rightarrow}D, A{\rightarrow}B]$
$E{\rightarrow}F$         $\{A,E,F\}$             $[F{\rightarrow}C, F{\rightarrow}B, E{\rightarrow}D, A{\rightarrow}D, A{\rightarrow}B]$
$F{\rightarrow}C$         $\{A,E,F,C\}$           $[C{\rightarrow}B, F{\rightarrow}B, E{\rightarrow}D, A{\rightarrow}D, A{\rightarrow}B]$
$C{\rightarrow}B$         $\{A,E,F,C,B\}$                                           $[E{\rightarrow}D, A{\rightarrow}D, A{\rightarrow}B]$
$E{\rightarrow}D$         $\{A,E,F,C,B,D\}$                                                          $[A{\rightarrow}D, A{\rightarrow}B]$

`\noindent`{=latex}
Keep in mind how a stack operates:
Because $E$ is the last edge in `outgoingEdges`($A$),
it will be pushed last and be on top of the agenda after visiting $A$.
Also note how after visiting $C$, there are three edges leading to $B$ in the agenda.
Because our agenda is a stack, the last one to be pushed is the one selected, the others are discarded.
This is what makes the algorithm depth-first:
it will tend to select vertices that are *deeper* in the sense that the constructed paths from the origin are longer.
So one way of describing depth-first graph traversal is:
In each step, we select an edge from the vertex that was *most recently visited*.
<!-- and still has at least one unvisited adjacent vertex. -->
You can see the same depth-first traversal in @fig:GraphTraversal2.

#### Variants

[](#alg:graph-traversal) produces a set of *result* edges.
In many cases this is exactly what we need, but sometimes we can make some some variants, depending on what we want to use the result for.
Here are some examples:

- If we only want to find a path from $s$ to a known goal vertex,
  we can stop immediately when we reach the goal, we do not have to continue traversing the whole graph.
- If we only want to know which vertices are *reachable* from $s$,
  we do not need to track edges at all: we can keep vertices in the agenda, and use the visitation set as our result.

As already discussed for trees in @sec:trees:bintree-traversal, DFS can also be implemented using recursion instead of an agenda.
In this way the recursion call stack acts as an implicit agenda.
Instead of pushing an edge to the agenda, we simply call the DFS function recursively with the edge as argument.
But note that we still need to check for visited vertices, and this visitation set needs to be an argument to the function.
We leave the recursive DFS implementation as an exercise to the reader.


### Breadth-first traversal {#graphs:BFS}

By changing the data type of the agenda from a stack to a *queue*, we get another useful algorithm.
The only change is the type of the agenda, the rest is exactly the same.
Again, let us look at the execution of BFS from vertex $A$:

edge                      visited                                                      agenda (queue front to the left)
------------------------  -------------------  ------------------------------------------------------------------------
${\,?\,}{\rightarrow}A$   $\{A\}$                                 $[A{\rightarrow}B, A{\rightarrow}D, A{\rightarrow}E]$
$A{\rightarrow}B$         $\{A,B\}$              $[A{\rightarrow}D, A{\rightarrow}E, B{\rightarrow}C, B{\rightarrow}F]$
$A{\rightarrow}D$         $\{A,B,D\}$            $[A{\rightarrow}E, B{\rightarrow}C, B{\rightarrow}F, D{\rightarrow}E]$
$A{\rightarrow}E$         $\{A,B,D,E\}$          $[B{\rightarrow}C, B{\rightarrow}F, D{\rightarrow}E, E{\rightarrow}F]$
$B{\rightarrow}C$         $\{A,B,D,E,C\}$        $[B{\rightarrow}F, D{\rightarrow}E, E{\rightarrow}F, C{\rightarrow}F]$
$B{\rightarrow}F$         $\{A,B,D,E,C,F\}$                       $[D{\rightarrow}E, E{\rightarrow}F, C{\rightarrow}F]$

`\noindent`{=latex}
You may notice the following pattern:
The algorithm starts by visiting all vertices directly adjecent to $A$, then the vertices adjacent to those vertices, etc.
This is not only for this graph, but for every graph, and regardless of the order in which edges are presented by `outgoingEdges`.
Consider: After visiting $A$, its immediate neighbors will all be in the agenda and visited before anything else (because the agenda is a queue now).
After all those are visited, the agenda will have all the vertices that are two steps away from $A$, and after all those, three steps.
The different steps are visualised in @fig:GraphTraversal3.
Breadth-first order will always visit vertices in order of their minimal distance from the starting vertex.

![
    Steps of a breadth-first traversal, starting in $A$,
    using a stack and assuming `outgoingEdges` are given in alphabetical order of destination vertex.
    The algorithm can be described as:
    select the alphabetically first edge from the earliest visited vertex still adjacent to an unvisited vertex.
](images/12.2-BFS-traversal.svg){#fig:GraphTraversal3}

This further means that the tree produced will not only contain a path from $A$ to $F$,
but that path is guaranteed to be the *shortest possible* one.
In fact, the tree contains shortest paths from $A$ to all other vertices.
This is supremely useful in a wide range of applications:
Obviously things like pathfinding in maps or simulations,
but also in applications like AI problem solving and most types of optimisation problems.

***Note***: By "shortest possible" we mean that the path passes through the *fewest possible* edges.
It *does not* take the weights of the edges into account.
If you want to find the shortest path according to the sum of edge weights, BFS does not work.
Instead we have to look at another algorithm, wihch is the topic of the next section.




<!--
::: dsvis
This visualisation shows a graph and the result of performing a DFS on it, resulting in a depth-first search tree.
``` {.jsav-animation src="Graph/DFSCON.js" links="Graph/DFSCON.css" name="Depth-First Search Slideshow"}
```
:::

::: dsvis
The following visualisation shows a random graph each time that you
start it, so that you can see the behaviour on different examples. It can
show you DFS run on a directed graph or an undirected graph. Be sure to
look at an example for each type of graph.
```{.jsav-embedded src="Graph/DFSAV.html" type="ss" name="DFS AV"}
```
:::

::: dsvis
Here is an exercise for you to practice DFS.
```{.jsav-embedded src="Graph/DFSPE.html" type="pe" name="DFS Proficiency Exercise"}
```
:::

::: dsvis
This visualisation shows a graph and the result of performing a BFS on it, resulting in a breadth-first search tree.
``` {.jsav-animation src="Graph/BFSCON.js" links="Graph/BFSCON.css" name="Breadth-First Search Slideshow"}
```
:::

::: dsvis
The following visualisation shows a random graph each time that you
start it, so that you can see the behaviour on different examples. It can
show you BFS run on a directed graph or an undirected graph. Be sure to
look at an example for each type of graph.
```{.jsav-embedded src="Graph/BFSAV.html" type="ss" name="BFS AV"}
```
:::

::: dsvis
Here is an exercise for you to practice BFS.
```{.jsav-embedded src="Graph/BFSPE.html" type="pe" name="BFS Proficiency Exercise"}
```
:::
-->
