
### All-Pairs Shortest Paths: Floyd's algorithm

We next consider the problem of finding the shortest distance between
all pairs of vertices in the graph, called the
[all-pairs shortest paths problem]{.term}. To be
precise, for every $u, v \in \mathbf{V}$, calculate $d(u, v)$.

One solution is to run [Dijkstra's algorithm]{.term} for finding the
[shortest path](#single-source-shortest-paths-problem){.term} $|\mathbf{V}|$ times, each time computing the shortest path
from a different start vertex. If $\mathbf{G}$ is sparse (that is,
$|\mathbf{E}| = \Theta(|\mathbf{V}|)$) then this is a good solution,
because the total cost will be
$\Theta(|\mathbf{V}|^2 + |\mathbf{V}||\mathbf{E}| \log
|\mathbf{V}|) = \Theta(|\mathbf{V}|^2 \log |\mathbf{V}|)$ for the
version of Dijkstra's algorithm based on priority queues. For a dense
graph, the priority queue version of Dijkstra's algorithm yields a cost
of $\Theta(|\mathbf{V}|^3 \log |\mathbf{V}|)$, but the version using
`MinVertex` yields a cost of $\Theta(|\mathbf{V}|^3)$.

Another solution that limits processing time to $\Theta(|\mathbf{V}|^3)$
regardless of the number of edges is known as Floyd's algorithm. It is
an example of dynamic programming. The chief problem with solving this
problem is organizing the search process so that we do not repeatedly
solve the same subproblems. We will do this organization through the use
of the $k$-path. Define a [k-path]{.term} from
vertex $v$ to vertex $u$ to be any path whose intermediate vertices
(aside from $v$ and $u$) all have indices less than $k$. A 0-path is
defined to be a direct edge from $v$ to $u$.
[Figure #FloydExamp](#FloydExamp) illustrates the
concept of $k$-paths.

::: {#FloydExamp}

> An example of $k$-paths in Floyd's algorithm. Path 1, 3 is a 0-path
> by definition. Path 3, 0, 2 is not a 0-path, but it is a 1-path (as
> well as a 2-path, a 3-path, and a 4-path) because the largest
> intermediate vertex is 0. Path 1, 3, 2 is a 4-path, but not a 3-path
> because the intermediate vertex is 3. All paths in this graph are
> 4-paths.
:::

Define $\mathrm{D}_k(v, u)$ to be the length of the shortest $k$-path from
vertex $v$ to vertex $u$. Assume that we already know the shortest
$k$-path from $v$ to $u$. The shortest $(k+1)$-path either goes through
vertex $k$ or it does not. If it does go through $k$, then the best path
is the best $k$-path from $v$ to $k$ followed by the best $k$-path from
$k$ to $u$. Otherwise, we should keep the best $k$-path seen before.
Floyd's algorithm simply checks all of the possibilities in a triple
loop. Here is the implementation for Floyd's algorithm. At the end of
the algorithm, array `D` stores the all-pairs shortest distances.

    // Compute all-pairs shortest paths
    function floyd(G):
        // Initialize D with weights
        D = new Map()
        for each i in G.vertices():
            imap = new Map()
            D.put(i, imap)
            for each j in G.vertices():
                if i == j:
                    imap.put(j, 0)
                else:
                    imap.put(j, ∞)
            for each e in G.outgoingEdges(i):
                imap.put(e.end, e.weight)

        // Compute all k-paths
        for each k in G.vertices():
            kmap = D.get(k)
            for each i in G.vertices():
                imap = D.get(i)
                for each j in G.vertices():
                    dist = imap.get(k) + kmap.get(j)
                    if dist < imap.get(j):
                        imap.put(j, dist)
        return D


Clearly this algorithm requires $\Theta(|\mathbf{V}|^3)$ running time,
and it is the best choice for dense graphs because it is (relatively)
fast and easy to implement.
