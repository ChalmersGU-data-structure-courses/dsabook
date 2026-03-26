## Complexity of Graph algorithms

Graph algorithms have potential to be very inefficient if designed carelessly. 
Consider this naive approach to the shortest path problem from vertex $A$ to $B$:
Try every possible path between $A$ and $B$, and keep the shortest one. 
Since a (simple) path is a sequence of vertices `[A, X, ... B]`, 
every permutation of the nodes forms a potential path (in a complete graph). 
Even a conservative worst case estimate gives us $O(V!)$ such permutations for a graph with $V$ vertices. 
This makes the algorithm too slow for any practical application

For the algorithms we have presented, here is a slightly simplified summary:

- BFS and DFS are linear time in the number of edges $E$ of the graph.
- Dijkstra's, Prim's and Kruskal's are all linearithmic in the number of edges.

Let us look at the reasononing for this, and try to sort out some caveats. 
All our graph traversal algorithms (DFS, BFS, Dijkstra's, Prim's) are on the form:

```
function traverse(start: Vertex):
    visited = new empty set of vertices
    agenda = initalized with starting node
    while (agenda is not empty):
        (from, to) = remove an item from the agenda
        if visited.contains(to):
            continue
        Do something to collect the result
        for e:Edge in outgoingEdges(to):
            add an item to the agenda
```

We can make the following observations:

- Every directed edge is added to the agenda at most once.
- The visitation check (`visited.contains`) is performed at most once per edge.
- Every node is added to `visited` at most once (exactly once if the graph is connected).

In online sources, you often find different answers to the complexity of e.g. Dijkstra's algorithm. This is primarily due to 

- Different assumptions about the data structures used for the visited set, the agenda, and for collecting the result. 
- Different optimizaions applied to reduce the size of the agenda. 
- Different assumptions about the graph, most notably if it is sparse/dense and connected/unconnected. 

If the `visited` set is an efficient Hash set implementation and vertices have perfect hash function 
(each vertex has a unique ID number pre-assigned), then initialization, lookup and adding to the set all take amortized constant time. 
With these assumptions, the set operations can largely be ignored.
If we assume the set is implemented as an array of booleans, lookups and modifications will be $O(1)$, 
but there is an initialization cost of O(V), even for a graph that has no edges. 
For this reason, you sometimes see $+V$ in unexpected places in complexity of graph traversal algorithms. 

In general, the number of edges $E$ will be somewhere between $0$ and $V^2$. 
If the graph is assumed to be connected (very common for traversal algorithms), 
then $E \geq V-1$. If the graph is assumed to be sparse, then $E \in O(V)$. 
So if the graph is both connected and sparse, $V$ and $E$ are interchangeable. 
Furthermore, you sometimes see $\log V$ and sometimes $\log E$. 
These are in fact interchangeable for all connected graphs, since $E \leq V^2$ and $\log(V^2) \in O(\log V)$.

With all these caveats in mind, we will look at the algorithms assuming graphs are connected, 
and that all data structure operations except those on the agenda are $O(1)$. 
For DFS and BFS, we process every edge by adding them to a stack and queue respectively, 
so the operations on the agenda are $O(1)$, giving a total complexity of $O(E)$ for both these algorithms.

For Dijkstra's and Prim's, the agenda is a priority queue. 
Using a binary heap would give $O(\log N)$ time for adding and removing, where $N$ is the size of the agenda.
This gives a total time of $O(E \log E)$ for these algorithms, which is the same as $O(E \log V$). 

For Kruskal's algorithm, using *union-find* to detect cycles, the time is dominated by sorting the edges by weight, 
which is O(E log E) for an efficient sorting algorithm, giving the algorithm the same time complexity as Prim's algorithm.

::: example
#### Example: Airlines connecting N airports
We have $N$ airports, and know the flight time between all pairs of airports. We want to find a set of direct flights connecting all airports, with as low total flight time as possible. What is the time complexity of this task, in terms of the number of airports $N$?

This is a MST problem on a complete graph with $N$ vertices (so $V=N$). 
Prim's and Kruskal's are both $O(E \log E)$, but since the graph is complete, 
$O(E)=O( V^2 )=O(N^2)$. 
So the complexity is $O(N^2 \log (N^2))$ which can be simplified to $O(N^2 \log N)$.
A common mistake here would be answering simply $O(E \log E)$, but the question specifically asks for
the complexity in terms of the number of airports. 
:::

