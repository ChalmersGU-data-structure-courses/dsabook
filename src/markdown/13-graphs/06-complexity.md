## Complexity of Graph algorithms

A naive approach to the shortest path problem from vertex $A$ to $B$ would be this: Try every possible path between $A$ and $B$, and keep the shortest one. Since a (simple) path is a sequence of vertices `[A, X, ... B]`, every permutation of the nodes forms a potential path (in a complete graph). Even a conservative worst case estimate gives us $O(V!)$ such permutations for a graph with $V$ vertices. This makes the algorithm too slow for anything but the smallest graphs.


All our graph traversal algorithms (DFS, BFS, Dijkstra's, Prim's) are on the form:


```
function traverse(start: Vertex):
    visited = new empty set of vertices
    agenda = initalized with starting node
    while (agenda is not empty):
        (from, to) = remove an item from the agenda
        if visited.contains(to):
            continue
        for e:Edge in outgoingEdges(to):
            add an item to the agenda
```

We can make the following observations:
- Every directed edge is added to the agenda at most once.
- The visitation check (`visited.contains`) is performed at most once per edge.
- 

Graph traversal: Set operations (+V or not). Assumptions on graph shape (E > V?)

DFS and BFS: O(E)


Dijkstra's and Prim's: O(E log E) = O(E log V), sometimes listed as V+E log V
Space complexity: O(E) unoptimized, O(V) optimized.

Kruskal's: O(E log E)

Example: Airlines between N airports. 

