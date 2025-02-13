
### Acyclic Graphs: Topological Sort

Assume that we need to schedule a series of tasks, such as classes or
construction jobs, where we cannot start one task until after its
prerequisites are completed. We wish to organize the tasks into a linear
order that allows us to complete them one at a time without violating
any prerequisites. We can model the problem using a DAG. The graph is
directed because one task is a prerequisite of another -- the vertices
have a directed relationship. It is acyclic because a cycle would
indicate a conflicting series of prerequisites that could not be
completed without violating at least one prerequisite. The process of
laying out the vertices of a DAG in a linear order to meet the
prerequisite rules is called a [topological sort]{.term}.

[Figure #TopSort](#TopSort) illustrates the
problem. An acceptable topological sort for this example is J1, J2, J3,
J4, J5, J6, J7. However, other orders are also acceptable, such as J1,
J3, J2, J6, J4, J5, J7.

:::: {#TopSort}
<inlineav id="topSortCON" src="Graph/topSortCON.js" name="Graph/topSortCON" static/>

An example graph for topological sort. Seven tasks have dependencies as
shown by the directed graph.
::::

#### Depth-first solution

A topological sort may be found by performing a DFS on the graph. When a
vertex is visited, no action is taken (i.e., function `preVisit` does
nothing). When the recursion pops back to that vertex, function
`postVisit` adds the vertex to a stack. In the end, the stack is
returned to the caller.

The reason that we use a stack is that this algorithm produces the
vertices in reverse topological order. And if we pop the elements in the
stack, they will be popped in topological order.

So the DFS algorithm yields a topological sort in reverse order. It does
not matter where the sort starts, as long as all vertices are visited in
the end. Here is implementation for the DFS-based algorithm.

    function topsortDFS(G):
        visited = new Set()
        sortedVertices = new Stack()
        for each v in G.vertices():
            if v not in visited:
                topsortHelperDFS(G, v, sortedVertices, visited)
        return sortedVertices

    function topsortHelperDFS(G, v, sortedVertices, visited):
        if v not in visited:
            visited.add(v)
            for each edge in G.outgoingEdges(v):
                w = edge.end
                topsortHelperDFS(G, w, sortedVertices, visited)
            sortedVertices.push(v)  // postVisit

Using this algorithm starting at J1 and visiting adjacent neighbors in
alphabetic order, vertices of the graph in
[Figure #TopSort](#TopSort) are pushed to the stack
in the order J7, J5, J4, J6, J2, J3, J1. Popping them one by one yields
the topological sort J1, J3, J2, J6, J4, J5, J7.

Here is another example.

<inlineav id="topSortDFSCON" src="Graph/topSortDFSCON.js" name="TopSort Slideshow" links="Graph/topSortDFSCON.css"/>

#### Queue-based Solution

We can implement topological sort using a queue instead of recursion, as follows.

First visit all edges, counting the number of edges that lead to each
vertex (i.e., count the number of prerequisites for each vertex). All
vertices with no prerequisites are placed on the queue. We then begin
processing the queue. When vertex $v$ is taken off of the queue, it is
added to a list containing the topological order, and all neighbors of
$v$ (that is, all vertices that have $v$ as a prerequisite) have their
counts decremented by one. Place on the queue any neighbor whose count
becomes zero. If the queue becomes empty without having added all
vertices to the final list, then the graph contains a cycle (i.e., there
is no possible ordering for the tasks that does not violate some
prerequisite). The order in which the vertices are added to the final
list is the correct one, so if traverse the final list we will get the
elements in topological order. Applying the queue version of topological
sort to the graph of [Figure #TopSort](#TopSort)
produces J1, J2, J3, J6, J4, J5, J7. Here is an
implementation for the algorithm.

    function topsortBFS(G):
        // Initialize the prerequisite counts
        counts = new Map()
        for each v in G.vertices():
            counts.put(v, 0)
        for each v in G.vertices():
            for each edge in G.outgoingEdges(v):
                // Add one to v's prerequisite count
                newCount = counts.get(edge.end) + 1
                counts.put(edge.end, newCount)

        // Initialize the queue
        Q = new Queue()
        for each v in G.vertices():
            // Only add vertices that have no prerequisites
            if counts.get(v) == 0:
                Q.enqueue(v)

        // Process the vertices
        sortedVertices = new Queue()
        while not Q.isEmpty():
            v = Q.dequeue()
            sortedVertices.enqueue(v)  // preVisit
            for each edge in G.outgoingEdges(v):
                newCount = counts.get(edge.end) - 1
                counts.put(edge.end, newCount)
                if counts.get(edge.end) == 0:
                    Q.enqueue(edge.end)

        return sortedVertices

<inlineav id="topSortQCON" src="Graph/topSortQCON.js" name="topSortQCON Slideshow" links="Graph/topSortQCON.css"/>
