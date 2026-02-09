
## Traversing graphs

::: TODO
- Prio 2: update pseudocode
- Prio 2: discuss, compare with tree traversal
    - handling cycles
    - remembering visited nodes
:::

One thing we often want to do is to *traverse* a graph, starting from a given vertex. An important constraint when traversing a graph is that we should only visit each vertex once. Therefore we have to keep track of which vertices we have visited so far.

Here is the basic algorithm for any kind of graph traversal:

- Initialise the agenda with the start vertex
- While the agenda is not empty:
    - Remove some vertex $v$ from the agenda
    - If $v$ is not visited:
        - Mark $v$ as visited
        - Do something with $v$ (for example print it)
        - Add the end vertices of $v$’s outgoing edges to the agenda

Note that I left the agenda unspecified – what do I mean by adding and removing from it? Actually it can be any data structure that supports adding and removing. Such as a stack, or a queue, or a priority queue.

- If the agenda is a stack, we get *depth-first search* (DFS)
- If the agenda is a queue, we get *breadth-first search* (BFS)
- And if it’s a priority queue? – we will discuss that in @sec:prims-algorithm

Note that DFS can visit the vertices in quite different order depending on in which order the outgoing edges of a vertex are returned. That doesn’t matter – they are all depth-first search orders. (And the same holds for BFS of course.)

How do we mark the visited vertices? In some graph implementations it is possible to actually mark vertices, but another very common way is to have a set where you add the vertices one at the time. This is what we will do in this book.

### Recursive depth-first search

When we call a function recursively, the current program state is pushed onto the call stack, so that it knows where to continue when the subroutine is finished. This can be utilised in traversal – instead of having an explicit stack for the agenda, we can make a recursive version of DFS:

- To visit vertex $v$:
    - If $v$ is not visited:
        - Mark $v$ as visited
        - Do something with $v$ (for example print it)
        - Visit the end vertex of each of $v$’s outgoing edges

This is a very common way of traversing a graph or a tree (remember the preorder, inorder and postorder traversals of binary trees). Note that it will not visit the vertices in exactly the same order as if we use iterative DFS version with an explicit stack.

### Traversing a tree

If the graph is a tree we don’t have to check if a vertex is visited, because there are no cycles – apart from that the code is the same. This is also how we traverse “normal” trees such as BSTs and the like – the “outgoing edges” are then the children of a node.

### Use case: reachability

DFS (or BFS) can be used to find all vertices that are *reachable* from a given vertex – just run DFS (or BFS), and return the set of visited vertices. But why is that useful?

One example use case is *garbage collection* (GC). The mark-and-sweep algorithm was one of the first GC algorithms. It models the working memory as a graph, where the objects and functions are vertices, and the variables are edges that point to other objects. The mark-and-sweep algorithm is simple:

- Start from the *root set* – all objects that are referred to by some variable in the call stack, or by a global variable.
- **Mark:** perform DFS from each object in the root set, marking the visited.
- **Sweep:** scan all objects in memory – if it is not marked, delete it.

The main disadvantage with mark-and-sweep is that it cannot be run in parallel with the “real” program, so it has to be suspended when it’s time for garbage collection. Modern garbage collectors use various modifications and optimisations.

### Use case: shortest path

If the graph is unweighted, then BFS will visit the vertices in increasing distance from the start – BFS is a *shortest path* algorithm! (More about this in @sec:shortest-paths-problems.)

### Example problem: finding a cycle in a graph

There are two famous cycle-finding problems for undirected graphs that are deceivingly similar – but one of them is almost trivial to solve while the other is extremely difficult!

- **Euler path**: find a path that uses every edge exactly once.

  ![](images/Graphs-EulerPath.png)

  There are simple algorithms that can find an Euler path in linear time, read more here: https://en.wikipedia.org/wiki/Eulerian_path

- **Hamiltonian path**: find a path that visits every vertex exactly once.

  ![](images/Graphs-HamiltonPath.png)

  The problem of finding a Hamiltonian path is a special case of the *Travelling Salesman Problem*, which is one of the most famous *NP-complete problems*. So finding a Hamiltonian path is (most probably) exponential in the size of the graph. https://en.wikipedia.org/wiki/Hamiltonian_path_problem


------------------


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

<!--
### Generic graph search

::: TODO
- generic graph search algorithm from the slides
- this includes DFS, BFS, UCS, A*
:::
-->
