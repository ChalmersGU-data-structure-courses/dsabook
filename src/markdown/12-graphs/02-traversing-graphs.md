
## Traversing graphs: DFS and BFS {#graphs:traversal}

::: TODO
 - Complexity?
 - Sift through the old stuff for useful tidbits.
:::

Many graph algorithms involve *traversing* a graph, starting from a given vertex and visit each reachable vertex once.
This is similar to tree traversal, but made more difficult by the presence of cycles.
A simple recursive procedure would get stuck in an infinite loop.

Instead we use an iterative procedure, very similar to the ones shown for trees in @sec:trees:traversal,
but we have to keep track of visited vertices to avoid infinite loops.
Thus, in each step of the traversal: Select an edge from a visited vertex to an unvisited vertex, and visit that vertex.
Stop when there are no edges from visited to unvisited vertices.

By varying how we select the next edge, and what we do when we visit a vertex, we can implement a wide range of useful algorithms on graphs.
Most of the algorithms described in this chapter use three data structures: an *agenda*, a *visitation set*, and a *result*.

- The *agenda* is the collection of edges we have discovered but not yet traversed.
  Different algorithms use different kind of agendas, and this is the main tool
  to distinguish different ways of traversing the graph.
- The *visitation set* is the set of vertices we have already visited, and that should not be visited again.
- The *result* can be anything that the algorithm builds while traversing the graph,
  but here we assume that it is a set of the edges that it has processed.

![Steps of a graph traversal in an undirected graph, starting in $A$. The circled areas are the set of visited vertices, and the pointed arrows show the selected edges. The edges with circles on them show the agenda. This traversal selects these edges in order: $(A,B) (A,E) (B,F) (A,D) (F,C)$, and these edges form the final result set.](images/Graphs-traversal1.svg){width=80% #fig:GraphTraversal1}

@fig:GraphTraversal1 illustrates how a graph traversal can unfold.
It shows a useful trick when trying to understand graph traversal algorithms on pen and paper:
Circle the visited vertices, and the edges you cross will be the important parts of the agenda.

The result of the traversal is a set of directed edges.
Importantly, these edges do *not* form a single path -- instead they form a *spanning tree* of all paths reachable from the starting vertex.
You can see the resulting spanning tree in the lower right of @fig:GraphTraversal1,
the selected edges form a tree with $A$ as the root.

Note that the algorithm does not specify in which order we select vertices.
In particular, it does not necessarily select a vertex adjacent to the previous vertex we visited,
but rather skip around to vertices that are adjacent to *some* visited vertex.

::: algorithm
#### Algorithm: Generic graph traversal
To traverse a graph from a starting vertex $s$,
we first create an empty set of *visited* vertices and the *result* set.
Initialise the *agenda* with a single a dummy edge $?\rightarrow s$
(that is, going from something unspecified to the starting vertex),
then repeat the following until the agenda is empty:

- Remove an edge $a\rightarrow b$ from the *agenda*
- If $b$ is not in *visited*:
    - Add $b$ to *visited*, and the edge to the *result*
    - Add all outgoing edges of $b$ **that do not end in a visited vertex**, to the *agenda*
:::

There are some things to note about this very abstract algorithm:

- To get the process rolling, we add a fake edge to the agenda, leading to the starting vertex $s$.
  Its only purpose is to start the whole process: the first thing the loop does is to visit the starting vertex.

- The agenda does not only contain edges from visited vertices to unvisited ones.
  Sometimes it will contain edges between two visited vertices,
  which is why we need to check that $b$ is not visited.

- It is a bit silly to add an edge to the agenda if its destination vertex is already visited,
  since it will anyway be filtered out in the visitation check.
  For example, the graph in @fig:GraphTraversal1 is undirected,
  so when we have removed the edge $a\rightarrow b$ from the agenda,
  it would be very silly to immediately add the reverse edge $b\rightarrow a$ to the agenda.

  This is why we have the additional check in the last line (the boldfaced text "...that do not end in a visited vertex"),
  which is a simple and often very effective optimisation.
  But note that it does not let us remove the original visitation check in the while loop.

The traversal algorithm can be translated into pseudocode like this:

    traverse(start):
        visited = new empty set of vertices
        result = new empty set of edges
        agenda = [(null,start)]   // We do not specify which ADT we use for the agenda
        while agenda is not empty:
            (a,b) = agenda.remove()
            if not visited.contains(b):
                visited.add(b)    // Visiting the vertex b for the first time
                for (b0,c) in outgoingEdges(b):  // b0 is the same vertex as b
                    if not visited.contains(c):
                        agenda.add((b0,c))
        return result


### Depth-first traversal {#graphs:DFS}

To turn this high level description of the algorithm into an efficient procedure,
we need to decide how to represent the agenda.
If we use a *stack* for the agenda we will get a depth-first traversal,
similar to how one can implement DFS for trees (see @sec:trees:traversal).

The edges selected and the order in which vertices are visited depend on the order in which `outgoingEdges` produces edges.
Let us assume that `outgoingEdges` gives edges in albethical order of their destination,
meaning that $\texttt{outgoingEdges}(A)$ returns $[A\rightarrow B, A\rightarrow D, A\rightarrow E]$.
Then the vertices would be visited in this order: $[A,E,F,C,B,D]$.
This is far from obvious, so let us walk through the steps of depth-first traversing the graph:

edge                      visited              agenda at end of iteration
------------------------  -------------------  -----------------------------------------------------------------------------------------------------
${\,?\,}\rightarrow A$    $\{A\}$              $[A\rightarrow B, A\rightarrow D, A\rightarrow E]$
$A\rightarrow E$          $\{A,E\}$            $[A\rightarrow B, A\rightarrow D, E\rightarrow B, E\rightarrow F]$
$E\rightarrow F$          $\{A,E,F\}$          $[A\rightarrow B, A\rightarrow D, E\rightarrow B, F\rightarrow B, F\rightarrow C]$
$F\rightarrow C$          $\{A,E,F,C\}$        $[A\rightarrow B, A\rightarrow D, E\rightarrow B, F\rightarrow B]$
$F\rightarrow B$          $\{A,E,F,C,B\}$      $[A\rightarrow B, A\rightarrow D, E\rightarrow B]$
$A\rightarrow D$          $\{A,E,F,C,B,D\}$    $[A\rightarrow B]$


Keep in mind how a stack operates:
Because $E$ is the last edge in $\texttt{outgoingEdges}(A)$,
it will be pushed last and be on top of the agenda after visiting $A$.
Also note how after visiting $F$, there are three edges leading to $B$ in the agenda.
Because our agenda is a stack, the last one to be pushed is the one selected, the others are discarded.
This is what makes the algorithm depth-first:
it will tend to select vertices that are *deeper* in the sense that the constructed paths from the origin are longer.
So one way of describing depth-first graph traversal is:
In each step, we select an edge from the vertex that
was *most recently visited* and still has at least one unvisited adjacent vertex.
You can see the same depth-first traversal in @fig:GraphTraversal2.

![Steps of a depth-first traversal, starting in $A$, using a stack and assuming `outgoingEdges` are given in alphabetical order of destination vertex.
The right part shows the result as a tree.
The algorithm can be described as: select the alphabetically last edge from the most recently visited vertex adjacent to an unvisited vertex.
](images/Graphs-traversal2.svg){width=90% #fig:GraphTraversal2}

#### Variants

The algorithm above produces a set of *result* edges.
In many cases this is exactly what we need, but sometimes we can make some some variants, depending on what we want to use the result for.
Here are some examples:

- If we only want to find a path from $s$ to a known goal vertex,
  we can stop immidately when we reach the goal, we do not have to continue traversing the whole graph.
- If we only want to know which vertices are *reachable* from $s$,
  we do not need to track edges used at all: we can keep vertices in the agenda, and use the visited set as our result.

As already discussed for trees in @sec:trees:traversal, DFS can also be implemented using recursion instead of an agenda.
In this way the recursion call stack acts as an implicit agenda.
Instead of pushing an edge to the agenda, we simply call the DFS function recursively with the edge as argument.
But note that we still need to check for visited vertices, and this visitation set needs to be another argument to the function.
We leave the recursive DFS implementation as an exercise to the reader.


### Breadth-first traversal {#graphs:BFS}

By changing the data type of the agenda from a stack to a *queue*, we get an even more useful algorithm.
The only change is the type of the agenda, the rest is exactly the same.
Again, let us look at the execution of BFS from vertex $A$:

edge                      visited              agenda at end of iteration
------------------------  -------------------  -----------------------------------------------------------------------------------------------------
${\,?\,}\rightarrow A$    $\{A\}$              $[A\rightarrow B, A\rightarrow D, A\rightarrow E]$
$A\rightarrow B$          $\{A,B\}$            $[A\rightarrow D, A\rightarrow E, B\rightarrow E, B\rightarrow F]$
$A\rightarrow D$          $\{A,B,D\}$          $[A\rightarrow E, B\rightarrow E, B\rightarrow F]$
$A\rightarrow E$          $\{A,B,D,E\}$        $[B\rightarrow E, B\rightarrow F, E\rightarrow F]$
$B\rightarrow F$          $\{A,B,D,E,F\}$      $[E\rightarrow F, F\rightarrow C]$
$F\rightarrow C$          $\{A,B,D,E,F,C\}$    $[]$


You may notice the following pattern:
The algorithm starts by visiting all vertices directly adjecent to $A$, then the vertices adjacent to those vertices, etc.
This is not only for this graph, but for every graph, and regardless of the order in which edges are presented by `outgoingEdges`.
Consider: After visiting $A$, its immediate neighbors will all be in the agenda and visited before anything else (because the agenda is a queue now).
After all those are visited, the agenda will have all the vertices that are two steps away from $A$, and after all those, three steps.
The different steps are visualised in @fig:GraphTraversal3.
Breadth-first order will always visit vertices in order of their minimal distance from the starting vertex.

![Steps of a breadth-first traversal, starting in $A$, using a stack and assuming `outgoingEdges` are given in alphabetical order of destination vertex.
The right part shows the result as a tree.
The algorithm can be described as: select the alphabetically first edge from the earliest visited vertex still adjacent to an unvisited vertex.
](images/Graphs-traversal3.svg){width=90% #fig:GraphTraversal3}

This further means that the tree produced will not only contain a path from $A$ to $C$,
but that path is guaranteed to be the *shortest possible* one.
In fact, the tree contains shortest paths from $A$ to all other vertices.
This is supremely useful in a wide range of applications:
Obviously things like pathfinding in maps or simulations,
but also in applications like AI problem solving and most types of optimisation problems.




<!-- START NOTES -->

<!--
#### Use case: reachability

DFS (or BFS) can be used to find all vertices that are *reachable* from a given vertex -- just run DFS (or BFS), and return the set of visited vertices. But why is that useful?

One example use case is *garbage collection* (GC). The mark-and-sweep algorithm was one of the first GC algorithms. It models the working memory as a graph, where the objects and functions are vertices, and the variables are edges that point to other objects. The mark-and-sweep algorithm is simple:

- Start from the *root set* -- all objects that are referred to by some variable in the call stack, or by a global variable.
- **Mark:** perform DFS from each object in the root set, marking the visited.
- **Sweep:** scan all objects in memory -- if it is not marked, delete it.

The main disadvantage with mark-and-sweep is that it cannot be run in parallel with the "real" program, so it has to be suspended when it's time for garbage collection. Modern garbage collectors use various modifications and optimisations.
-->

<!--
#### Use case: shortest path

If the graph is unweighted, then BFS will visit the vertices in increasing distance from the start -- BFS is a *shortest path* algorithm! (More about this in @sec:graphs:shortest-path.)

#### Example problem: finding a cycle in a graph

There are two famous cycle-finding problems for undirected graphs that are deceivingly similar -- but one of them is almost trivial to solve while the other is extremely difficult!

- **Euler path**: find a path that uses every edge exactly once.

  ![](images/Graphs-EulerPath.png)

  There are simple algorithms that can find an Euler path in linear time, read more here: https://en.wikipedia.org/wiki/Eulerian_path

- **Hamiltonian path**: find a path that visits every vertex exactly once.

  ![](images/Graphs-HamiltonPath.png)

  The problem of finding a Hamiltonian path is a special case of the *Travelling Salesman Problem*, which is one of the most famous *NP-complete problems*. So finding a Hamiltonian path is (most probably) exponential in the size of the graph. https://en.wikipedia.org/wiki/Hamiltonian_path_problem
-->

<!-- END NOTES -->



<!--
Recall that tree traversals visit every node exactly once, in some
specified order such as preorder, inorder, or postorder. Multiple tree
traversals exist because various applications require the nodes to be
visited in a particular order. For example, to print a BST's nodes in
increasing order requires an inorder traversal as opposed to some other
traversal. Standard graph traversal orders also exist. Each is
appropriate for solving certain problems. For example, many problems in
artificial intelligence programming are modeled using graphs. The
problem domain might consist of a large collection of states, with
connections between various pairs of states. Solving this sort of
problem requires getting from a specified start state to a specified
goal state by moving between states only through the connections.
Typically, the start and goal states are not directly connected. To
solve this problem, the vertices of the graph must be searched in some
organised manner.

Graph traversal algorithms typically begin with a start vertex and
attempt to visit the remaining vertices from there. Graph traversals
must deal with a number of troublesome cases. First, it might not be
possible to reach all vertices from the start vertex. This occurs when
the graph is not connected. Second, the graph might contain cycles, and
we must make sure that cycles do not cause the algorithm to go into an
infinite loop.

Graph traversal algorithms can solve both of these problems by keeping
track of the vertices that have been visited, in a set `visited`. At the
beginning of the algorithm, this set is empty. When a vertex is first
visited during the traversal, we add it to `visited`. If a vertex is
encountered during traversal that already is in the set, we will not
visit it a second time. This keeps the program from going into an
infinite loop when it encounters a cycle.

Once the traversal algorithm completes, we can check to see if all
vertices have been processed by checking whether they are in the set
`visited`. If not all vertices are in this set, we can continue the
traversal from another unvisited vertex. Note that this process works
regardless of whether the graph is directed or undirected. To ensure
visiting all vertices, `graphTraverse` could be called as follows on a
graph $\mathbf{G}$:

    graphTraverse(G):
        visited = new Set()
        for each v in G.vertices():
            if v not in visited:
                doTraversal(G, v, visited)

The function `doTraversal` might be implemented by using one of the
graph traversals described next.

### Depth-first search

Our first method for organised graph traversal is called
[depth-first search]{.term} (DFS). Whenever a
vertex $v$ is visited during the search, DFS will recursively visit all
of $v$ 's unvisited neighbours. Equivalently, DFS will add all edges
leading out of $v$ to a stack. The next vertex to be visited is
determined by popping the stack and following that edge. The effect is
to follow one branch through the graph to its conclusion, then it will
back up and follow another branch, and so on. The DFS process can be
used to define a [depth-first search tree]{.term}. This tree is composed of the edges that were followed to
any new (unvisited) vertex during the traversal, and leaves out the
edges that lead to already visited vertices. DFS can be applied to
directed or undirected graphs.

The recursive DFS algorithm can be described as simply as this:

    visit(v):
        if v is unvisited:
            mark v as visited
            recursively visit all adjacent vertices

::: dsvis
This visualisation shows a graph and the result of performing a DFS on
it, resulting in a depth-first search tree.

``` {.jsav-animation src="Graph/DFSCON.js" links="Graph/DFSCON.css" name="Depth-First Search Slideshow"}
```
:::

Here is a slightly more detailed implementation of the DFS algorithm.

    traverseDFS(G, v, visited):
        if v not in visited:
            visited.add(v)
            preVisit(G, v)
            for each edge in G.outgoingEdges(v):
                traverseDFS(G, edge.end, visited)
            postVisit(G, v)

This implementation contains calls to functions `preVisit` and
`postVisit`. These functions specify what activity should take place
during the search. Just as a preorder tree traversal requires action
before the subtrees are visited, some graph traversals require that a
vertex be processed before ones further along in the DFS. Alternatively,
some applications require activity *after* the remaining vertices are
processed; hence the call to function `postVisit`.

::: dsvis
The following visualisation shows a random graph each time that you
start it, so that you can see the behaviour on different examples. It can
show you DFS run on a directed graph or an undirected graph. Be sure to
look at an example for each type of graph.

```{.jsav-embedded src="Graph/DFSAV.html" type="ss" name="DFS AV"}
```
:::

DFS processes each edge once in a directed graph. In an undirected
graph, DFS processes each edge from both directions. Each vertex must be
visited, but only once, so the total cost is
$O(|\mathbf{V}| + |\mathbf{E}|)$.

::: dsvis
Here is an exercise for you to practice DFS.

```{.jsav-embedded src="Graph/DFSPE.html" type="pe" name="DFS Proficiency Exercise"}
```
:::

### Breadth-first search

Our second graph traversal algorithm is known as a
[breadth-first search]{.term} (BFS). BFS
examines all vertices connected to the start vertex before visiting
vertices further away. BFS is implemented similarly to DFS, except that
a queue replaces the recursion stack. Note that if the graph is a tree
and the start vertex is at the root, BFS is equivalent to visiting
vertices level by level from top to bottom.

::: dsvis
This visualisation shows a graph and the result of performing a BFS on
it, resulting in a breadth-first search tree.

``` {.jsav-animation src="Graph/BFSCON.js" links="Graph/BFSCON.css" name="Breadth-First Search Slideshow"}
```
:::

Here is an implementation for BFS. Note that it's not possible to call
`postVisit` in BFS traversal, because you cannot know when the adjacent
edges (the "children") have been traversed.

    traverseBFS(G, v, visited):
        agenda = new Queue()
        agenda.enqueue(v)
        while not agenda.isEmpty()
            v = agenda.dequeue()
            if v not in visited:
                visited.add(v)
                preVisit(G, v)
                for each edge in G.outgoingEdges(v):
                    agenda.enqueue(edge.end)
                // postVisit is not possible in BFS search!


*Fun fact*: If you replace the queue with a stack (and the
enqueing/dequeueing operations with push/pop), you will get depth-first
search! This is because the recursive version of DFS implicitly uses the
call stack to remember which vertices to visit.

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

<!--
### Generic graph search

::: TODO
- generic graph search algorithm from the slides
- this includes DFS, BFS, UCS, A*
:::
-->
