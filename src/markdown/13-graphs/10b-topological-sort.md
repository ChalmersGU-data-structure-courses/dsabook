
:::::: online

### Acyclic graphs: Topological sort {#topological-sort}

::: TODO
- Prio 3: simplify code
- Prio 3: use cases
:::

Assume that we need to schedule a series of tasks, such as classes or
construction jobs, where we cannot start one task until after its
prerequisites are completed. We wish to organise the tasks into a linear
order that allows us to complete them one at a time without violating
any prerequisites. We can model the problem using a DAG. The graph is
directed because one task is a prerequisite of another -- the vertices
have a directed relationship. It is acyclic because a cycle would
indicate a conflicting series of prerequisites that could not be
completed without violating at least one prerequisite. The process of
laying out the vertices of a DAG in a linear order to meet the
prerequisite rules is called a [topological sort]{.term}.

@Fig:GraphToposort illustrates the
problem. An acceptable topological sort for this example is J1, J2, J3,
J4, J5, J6, J7. However, other orders are also acceptable, such as J1,
J3, J2, J6, J4, J5, J7.

::: {.jsav-figure #fig:GraphToposort}
``` {src="Graph/topSortCON.js"}
```
An example graph for topological sort.
Seven tasks have dependencies as shown by the directed graph.
:::

#### Depth-first algorithm

A topological sort may be found by performing a [depth-first search]{.term} (DFS) on the graph.
When a vertex is visited, no action is taken
(i.e., function *preVisit* from @sec:depth-first-search does nothing).
When the recursion pops back to that vertex, function *postVisit* adds the vertex to a stack.
In the end, the stack is returned to the caller.

The reason that we use a stack is that this algorithm produces the
vertices in reverse topological order. And if we pop the elements in the
stack, they will be popped in topological order.

So the DFS algorithm yields a topological sort in reverse order. It does
not matter where the sort starts, as long as all vertices are visited in
the end. Here is implementation for the DFS-based algorithm.

    function topsortDFS(graph):
        visited = new Set()
        sortedVertices = new Stack()
        for each v in graph.vertices():
            if v not in visited:
                topsortHelperDFS(graph, v, sortedVertices, visited)
        return sortedVertices

    function topsortHelperDFS(graph, v, sortedVertices, visited):
        if v not in visited:
            visited.add(v)
            for each e in graph.outgoingEdges(v):
                topsortHelperDFS(graph, e.end, sortedVertices, visited)
            sortedVertices.push(v)  // postVisit

If we use this algorithm starting at vertex J1 in @fig:GraphToposort and visit adjacent neighbours in alphabetic order, the vertices of the graph are pushed to the stack in the order J7, J5, J4, J6, J2, J3, J1.
If we now pop them one by one we get the topological sort J1, J3, J2, J6, J4, J5, J7.

::: dsvis
Here is another example.

``` {.jsav-animation src="Graph/topSortDFSCON.js" links="Graph/topSortDFSCON.css" name="TopSort Slideshow"}
```
:::

#### Queue-based algorithm

We can also implement topological sort using a *queue* instead of recursion, as follows.

First visit all edges, counting the number of edges that lead to each
vertex (i.e., count the number of prerequisites for each vertex). All
vertices with no prerequisites are placed on the queue. We then begin
processing the queue. When vertex $v$ is taken off of the queue, it is
added to a list containing the topological order, and all neighbours of
$v$ (that is, all vertices that have $v$ as a prerequisite) have their
counts decremented by one. Place on the queue any neighbour whose count
becomes zero. If the queue becomes empty without having added all
vertices to the final list, then the graph contains a cycle (i.e., there
is no possible ordering for the tasks that does not violate some
prerequisite). The order in which the vertices are added to the final
list is the correct one, so if traverse the final list we will get the
elements in topological order.

Applying the queue version of topological sort to the graph of @fig:GraphToposort produces J1, J2, J3, J6, J4, J5, J7.
Here is an implementation of the algorithm.

    function topsortBFS(graph):
        // Initialise the prerequisite counts
        counts = new Map() of vertices to prerequisite count
        for each v in graph.vertices():
            counts.put(v, 0)
        for each v in graph.vertices():
            for each edge in graph.outgoingEdges(v):
                // Increase v's prerequisite count
                newCount = counts.get(edge.end) + 1
                counts.put(edge.end, newCount)

        // Initialise the queue
        queue = new Queue()
        for each v in graph.vertices():
            // Only add vertices that have no prerequisites
            if counts.get(v) == 0:
                queue.enqueue(v)

        // Process the vertices
        sortedVertices = new Queue()
        while not queue.isEmpty():
            v = queue.dequeue()
            sortedVertices.enqueue(v)  // preVisit
            for each e in graph.outgoingEdges(v):
                // Decrease v's prerequisite count
                newCount = counts.get(edge.end) - 1
                counts.put(edge.end, newCount)
                if newCount == 0:
                    queue.enqueue(e.end)
        return sortedVertices

::: dsvis
Here is an illustration of the queue-based algorithm.

``` {.jsav-animation src="Graph/topSortQCON.js" links="Graph/topSortQCON.css"}
```
:::

::::::
