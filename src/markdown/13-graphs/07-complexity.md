
## Complexity analysis {#graphs:analysis}

::: TODO
- This is too long, repeats itself
:::

Graph algorithms have the potential to be very inefficient if designed carelessly.
Consider this naive solution to the shortest path problem from vertex $a$ to $b$:
Try every possible path between $a$ and $b$, and keep the shortest one.
Since a (simple) path is a sequence of edges $a\rightarrow\cdots\rightarrow b$,
every permutation of the vertices forms a potential path (in a complete graph).
Even a conservative worst case estimate gives us $O(V!)$ such permutations for a graph with $V$ vertices.
This makes the algorithm too slow for any practical application.

<!--
For the algorithms we have presented, here is a slightly simplified summary:

- BFS and DFS are linear time in the number of edges of the graph, $O(E)$.
- Dijkstra's, Prim's and Kruskal's algorithms are all linearithmic, $O(E\log(E))$.

Let us look at the reasoning for this, and try to sort out some caveats.
All our graph traversal algorithms (DFS, BFS, Dijkstra's, Prim's) are on the form:
-->

But how do the algorithms we presented in this chapter behave?
If we exclude Kruskal's algorithm for now,
all the other algorithms (DFS, BFS, Dijkstra's, Prim's) are on the form:

- Repeat until the agenda is empty:
    - Remove an edge $a\rightarrow b$ from the agenda
    - If $b$ is not visited:
        - Mark $b$ as visited
        - Do something to collect the result
        - Add an item to the agenda, for every outgoing edge of $b$

We can make the following observations:

- Every directed edge is added to the agenda at most once.
- The visitation check ("if $b$ is not visited") is performed at most once per edge.
- Every node is added to the visitation set at most once (exactly once if the graph is connected).

In online sources, you often find different answers to the complexity of Dijkstra's algorithm.
This is primarily due to the following reasons:

- Different assumptions about the data structures used for the visitation set, the agenda, and for collecting the result.
- Different optimisations applied to reduce the size of the agenda.
- Different assumptions about the graph, most notably if it is sparse/dense and connected/unconnected.

If the visitation set is an efficient hash table implementation, and vertices have a very good hash function,
then initialisation, lookup and adding to the set all take amortised constant time.
With these assumptions, the set operations can largely be ignored,
and the only data structure we have to worry about is the agenda.

- For DFS and BFS, we process every edge by adding them to a stack and queue respectively,
  so the operations on the agenda are $O(1)$, giving a total complexity of $O(E)$ for both these algorithms.
- For Dijkstra's and Prim's algorithms, the agenda is a priority queue.
  The binary heap operations are logarithmic in its size, and the size of the agenda is at most $E$.
  This gives a total time of $O(E\log(E))$ for these algorithms.
- For Kruskal's algorithm, if we use *union-find* to detect cycles,
  the time will be dominated by sorting the edges by weight.
  This is $O(E\log(E))$ for an efficient sorting algorithm, which is the same as for Prim's algorithm.

Sometimes the complexity is written $O(E\log(V))$, which is also true.
This is because $E\leq V^2$ and therefore $\log(E)\in O(\log(V^2))=O(\log(V))$.
Furthermore, if the graph is sparse, then $E\in O(V)$ and the complexity becomes $O(V\log(V))$.
But if the graph is dense, the complexity is instead $O(V^2\log(V))$.
[](#ex:connecting-islands) shows how to reason about a conrete example.

::: {.example #ex:connecting-islands}
#### Connecting islands via bridges
We have an archipelago with $n$ islands and we want to connect them via bridges.
It should be possible to walk from any island to any other,
but we want to use as few resources as possible when *building* the bridges.
We can assume that building a longer bridge uses proportionally more resources than a shorter one.
What is the time complexity of this task, in terms of the number of bridges $n$?

This is an MST problem on a complete graph with $n$ vertices (so $V=n$).
Prim's and Kruskal's algorithms are both $O(E\log(E))$, but since the graph is complete, $O(E)=O(V^2)=O(n^2)$.
So the complexity is $O(n^2\log(n^2))$ which can be simplified to $O(n^2\log(n))$.
A common mistake here would be answering simply $O(E\log(E))$,
but the question specifically asks for the complexity in terms of the number of airports.
:::

<!--
::: example
#### Example: Airlines connecting $N$ airports
We have $N$ airports, and know the flight time between all pairs of airports.
We want to find a set of direct flights connecting all airports, with as low total flight time as possible.
What is the time complexity of this task, in terms of the number of airports $N$?

This is an MST problem on a complete graph with $N$ vertices (so $V=N$).
Prim's and Kruskal's are both $O(E\log(E))$, but since the graph is complete, $O(E)=O(V^2)=O(N^2)$.
So the complexity is $O(N^2\log(N^2))$ which can be simplified to $O(N^2\log(N))$.
A common mistake here would be answering simply $O(E\log(E))$,
but the question specifically asks for the complexity in terms of the number of airports.
:::
-->
