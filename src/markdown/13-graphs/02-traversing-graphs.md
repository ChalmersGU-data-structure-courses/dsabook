
## Traversing graphs: BFS and DFS

::: TODO
 - Complexity?
 - Sift through the old stuff for useful tidbits. 
:::

Many graph algorithms involve *traversing* a graph, starting from a given vertex and visit each reachable vertex once. This is similar to tree traversal, but made more difficult by the presence of cycles. A simple recursive procedure would get stuck in an infinite loop. 

Instead we will use an iterative procedure, very similar to the ones shown for trees in @sec:tree-dfs, but keeping track of visited vertices to avoid infinite loops. Thus, in each step of the traversal: Select an edge from a visited vertex to an unvisited vertex, and visit that vertex. Stop when there are no edges from visited to unvisited vertices.

By varying how we select the next edge, and what we do when we visit a vertex, we can implement a wide range of useful algorithms on graphs. 
Most of the algorithms described in thuis chapter use two data structures: an *agenda* and a *visitation set*.

- The agenda is the collection of edges we have discovered but not yet traversed. 
  Different algorithms use different kind of agendas, and this is the main tool
  to distinguish different orders of traversing the graph.
- The visitation set is the set of vertices we have already visited, and that should not be visited again.

![Steps of a graph traversal in an undirected graph, starting in $A$. The circled areas are the set of visited vertices, and the pointed arrows show the selected edges. The edges with circles on them show the agenda. This traversal selects these edges in order: $(A,B) (A,E) (B,F) (A,D) (F,C)$.](images/Graphs-traversal1.svg){width=80% #fig:GraphTraversal1} 

@fig:GraphTraversal1 illustrates the how a graph traversal can unfold. 
The result is a set of directed edges. Importantly, these edges do *not* form a path. 
We do not select a vertex adjacent to the previous vertex we visited, but rather skip around to vertices that are adjacent to *some* visited vertex. 
The most apt way to describe the end result is a tree, and as you can see in the lower right of @fig:GraphTraversal1, 
the selected edges form a tree with $A$ as the root. 

To turn this high level description of the algorithm into an efficient procedure, we need to decide how to represent the agenda. 
Just as with trees, using a stack for the agenda gives us a depth first traversal:

```
function depthFirst(start: Vertex):
    visited = new empty set of vertices
    agenda = [(null, start)]
    while agenda is not empty:
        (from, to) = agenda.pop()
        if visited.contains(to):
            continue   // Skip to the next item on the agenda
        visited.add(to) // Visiting the vertex to for the first time
        for e:Edge in outgoingEdges(to):
            agenda.push(e)

```

There are some things to note here:

- To get the process rolling, we add a fake edge to the starting vertex $A$, to add the task of visiting $A$ to the agenda. 
- The agenda does not only contain edges from visited vertices to unvisited ones. Sometimes it will contain edges between two visited vertices, which is why we need to do the visitation check after popping items from it. 
- Its a bit silly to add edges to the agenda when the to-vertex of the edge is already visited, since these will just be ignored after popping them. 
  For instance in the previous example, after selecting the edge $(A,B)$ and visiting $B$, since the graph is undirected the edge $(B,A)$ back to $A$ will immediately be added to the agenda. So an obvious optimization is to add a second check for this in the for-loop, and only push edges that lead to unvisited vertices. 
  This unfortunately does not let us remove the check in the while loop, as there can still be multiple edges to the same vertex in the agenda. 

The edges selected and the order in which vertices are visited depend on the order in which `outgoingEdges(to)` produces edges. 
If we assume `outgoingEdges` gives edges in albethical order of their destination, so `outgoingEdges(A)` gives `[(A,B), (A,D), (A,E)]`, 
the vertices would be visited in this order: `[A,E,F,C,B,D]`. This is far from obvious, so let us walk through the steps of `depthFirst(A)`. 
In this table, we only show the steps that pass the visitation check (`to` is not visited), and we only push edges when they lead to unvisited vertices:

 (from, to)  visited       agenda at end of iteration 
 ----------  ------------- -------------------------------
 (null,A)    [A]           [(A,B) (A,D) (A,E)]    
 (A,E)       [A,E]         [(A,B) (A,D) (E,B) (E,F)] 
 (E,F)       [A,E,F]       [(A,B) (A,D) (E,B) (F,B) (F,C)] 
 (F,C)       [A,E,F,C]     [(A,B) (A,D) (E,B) (F,B)] 
 (F,B)       [A,E,F,C,B]   [(A,B) (A,D) (E,B)] 
 (A,D)       [A,E,F,C,B,D] [(A,B)] 

Keep in mind how a stack operates: Because `E` is the last edge in `outgoingEdges(A)`, it will be pushed last and be on top of the agenda after visiting `A`.
Also note how after visiting `F`, there are three edges leading to B in the agenda. 
Because our agenda is a LIFO stack, the last one to be pushed is the one selected, the others are discarded. 
This is what makes the algorithm depth first: it will tend to select vertices that are *deeper* in the sense that the constructed paths from the origin are longer.
So one way of describing this algorithm: In each step, we select an edge from an edge from the vertex that was most recently visited and still has at least one unvisited adjacent vertex. 

Note that we are a bit vague about what result our depth first search algorithm produces. This is because there are many applications for this algorithm, with small variations on when it stops.

- If we only want to know if e.g. vertex $C$ is *reachable* from vertex $A$, we can run a traversal from $A$ and stop immidately when visiting $C$, returning true.
  This would allow several simplifications of the algorithm, since we do not need to track edges used at all, and could just keep vertices in the agenda. 
- If we want to find a path from $A$ to $C$ we can also stop when reaching $C$, but we need to collect the edges we find along the way.
- The most general result we can return is a tree with the starting vertex as the root. @fig:GraphTraversal2 shows an example of this, 
  for the same example graph as before.

![Steps of a depth first traversal, starting in $A$, using a stack and assuming `outgoingEdges` are given in alphabetical order of destination vertex. The right part shows the result as a tree. The algorithm can be described as: select the alphabetically last edge from the most recently visited vertex adjacent to an unvisited vertex.](images/Graphs-traversal2.svg){width=90% #fig:GraphTraversal2} 


### Breadth first traversal

By changing the data type of the agenda from a stack to a queue, we get an even more useful algorithm. 
You do not have to study this code in detail if you already understood the depth first traversal code, it is exactly identical 
other than using enqueue/dequeue instead of push/pop. 

```
function breadthFirst(start: Vertex):
    visited = new empty set of vertices
    agenda = [(null, start)]
    while (agenda is not empty):
        (from, to) = agenda.dequeue()
        if visited.contains(to):
            continue   // Skip to the next item on the agenda
        visited.add(to) // Visiting the vertex to for the first time
        for e:Edge in outgoingEdges(to):
            agenda.enqueue(e)
```

Again, let us look at the execution of `breadthFirst(A)`, both technically and visually.

 (from, to)  visited       agenda at end of iteration 
 ----------  ------------- --------------------------
 (null,A)    [A]           [(A,B) (A,D) (A,E)]    
 (A,B)       [A,B]         [(A,D) (A,E) (B,E) (B,F)] 
 (A,D)       [A,B,D]       [(A,E) (B,E) (B,F)] 
 (A,E)       [A,B,D,E]     [(B,E) (B,F) (E,F)]
 (B,F)       [A,B,D,E,F]   [(E,F), (F,C)] 
 (F,C)       [A,B,D,E,F,C] [] 

![Steps of a breadth first traversal, starting in $A$, using a stack and assuming `outgoingEdges` are given in alphabetical order of destination vertex. The right part shows the result as a tree. The algorithm can be described as: select the alphabetically first edge from the earliest visited vertex still adjacent to an unvisited vertex.](images/Graphs-traversal3.svg){width=90% #fig:GraphTraversal3} 

You may notice the following pattern: The algorithm starts by visiting all vertices directly adjecent to $A$, then the vertices adjacent to those vertices, etc. This is not only for this graph, but for every graph, and regardless of the order in which edges are presented by `outgoingEdges`. Consider: After visiting $A$, its immediate neighbors will all be in the agenda and visited before anything else. After all those are visited, the agenda will have all the vertices that are two steps away from $A$, and after all those, three steps. Breadth first order will always visit vertices in order of their minimal distance from the starting vertex.

This further means that the tree produced will not only contain a path from $A$ to $C$, but that path is guaranteed to be the shortest possible one. 
In fact, the tree contains shortest paths from $A$ to all other vertices. 
This is supremely useful in a wide range of applications: Obviously things like pathfinding in maps or simulations, but also in applications like AI problem solving and most types of optimization problems. 







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

If the graph is unweighted, then BFS will visit the vertices in increasing distance from the start -- BFS is a *shortest path* algorithm! (More about this in @sec:shortest-paths-problems.)

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
ascending order requires an inorder traversal as opposed to some other
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

    function graphTraverse(G):
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

    function visit(v):
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

    function traverseDFS(G, v, visited):
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

    function traverseBFS(G, v, visited):
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
