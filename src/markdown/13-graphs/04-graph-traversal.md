
## Traversing graphs

::: TODO
- Prio 2: update pseudocode
- Prio 2: discuss, compare with tree traversal
    - handling cycles
    - remembering visited nodes
:::

Many graph applications need to visit the vertices of a graph in some
specific order based on the graph's topology. This is known as a graph
[traversal]{.term} and is similar in concept to
a [tree traversal]{.term}.
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
organized manner.

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

Our first method for organized graph traversal is called
[depth-first search]{.term} (DFS). Whenever a
vertex $v$ is visited during the search, DFS will recursively visit all
of $v$ 's unvisited neighbors. Equivalently, DFS will add all edges
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
This visualization shows a graph and the result of performing a DFS on
it, resulting in a depth-first search tree.

<inlineav id="DFSCON" src="Graph/DFSCON.js" name="Depth-First Search Slideshow" links="Graph/DFSCON.css"/>
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
The following visualization shows a random graph each time that you
start it, so that you can see the behavior on different examples. It can
show you DFS run on a directed graph or an undirected graph. Be sure to
look at an example for each type of graph.

<avembed id="DFSAV" src="Graph/DFSAV.html" type="ss" name="DFS AV"/>
:::

DFS processes each edge once in a directed graph. In an undirected
graph, DFS processes each edge from both directions. Each vertex must be
visited, but only once, so the total cost is
$O(|\mathbf{V}| + |\mathbf{E}|)$.

::: dsvis
Here is an exercise for you to practice DFS.

<avembed id="DFSPE" src="Graph/DFSPE.html" type="pe" name="DFS Proficiency Exercise"/>
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
This visualization shows a graph and the result of performing a BFS on
it, resulting in a breadth-first search tree.

<inlineav id="BFSCON" src="Graph/BFSCON.js" name="Breadth-First Search Slideshow" links="Graph/BFSCON.css"/>
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
The following visualization shows a random graph each time that you
start it, so that you can see the behavior on different examples. It can
show you BFS run on a directed graph or an undirected graph. Be sure to
look at an example for each type of graph.

<avembed id="BFSAV" src="Graph/BFSAV.html" type="ss" name="BFS AV"/>
:::

::: dsvis
Here is an exercise for you to practice BFS.

<avembed id="BFSPE" src="Graph/BFSPE.html" type="pe" name="BFS Proficiency Exercise"/>
:::

<!--
### Generic graph search

::: TODO
- generic graph search algorithm from the slides
- this includes DFS, BFS, UCS, A*
:::
-->
