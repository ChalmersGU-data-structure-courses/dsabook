
## Graph representations

::: TODO
- Prio 2: update text, (semi)formal definitions
:::

There are two commonly used methods for representing graphs. The
[adjacency matrix]{.term} for a graph is a
$|\mathbf{V}| \times |\mathbf{V}|$ array. We typically label the
vertices from $v_0$ through $v_{|\mathbf{V}|-1}$. Row $i$ of the
adjacency matrix contains entries for Vertex $v_i$. Column $j$ in row
$i$ is marked if there is an edge from $v_i$ to $v_j$ and is not marked
otherwise. The space requirements for the adjacency matrix are
$\Theta(|\mathbf{V}|^2)$.

The second common representation for graphs is the
[adjacency list]{.term}. The adjacency list is
an array of linked lists. The array is $|\mathbf{V}|$ items long, with
position $i$ storing a pointer to the linked list of edges for Vertex
$v_i$. This linked list represents the edges by the vertices that are
adjacent to Vertex $v_i$.

Here is an example of the two representations on a directed graph. The
entry for Vertex 0 stores 1 and 4 because there are two edges in the
graph leaving Vertex 0, with one going to Vertex 1 and one going to
Vertex 4. The list for Vertex 2 stores an entry for Vertex 4 because
there is an edge from Vertex 2 to Vertex 4, but no entry for Vertex 3
because this edge comes into Vertex 2 rather than going out.

:::: {#Directed}
<inlineav id="GdirRepCON" src="Graph/GdirRepCON.js" name="Graph/GdirRepCON" links="Graph/GraphDefCON.css" static/>

Representing a directed graph.
::::

Both the adjacency matrix and the adjacency list can be used to store
directed or undirected graphs. Each edge of an undirected graph
connecting Vertices $u$ and $v$ is represented by two directed edges:
one from $u$ to $v$ and one from $v$ to $u$. Here is an example of the
two representations on an undirected graph. We see that there are twice
as many edge entries in both the adjacency matrix and the adjacency
list. For example, for the undirected graph, the list for Vertex 2
stores an entry for both Vertex 3 and Vertex 4.

:::: {#Undirected}
<inlineav id="GundirRepCON" src="Graph/GundirRepCON.js" name="Graph/GundirRepCON" links="Graph/GraphDefCON.css" static/>

Representing an undirected graph.
::::

The storage requirements for the adjacency list depend on both the
number of edges and the number of vertices in the graph. There must be
an array entry for each vertex (even if the vertex is not adjacent to
any other vertex and thus has no elements on its linked list), and each
edge must appear on one of the lists. Thus, the cost is
$\Theta(|\mathbf{V}| + |\mathbf{E}|)$.

Sometimes we want to store weights or distances with each each edge,
such as in [Figure #GraphTerms](#GraphTerms)
(c). This is easy with the adjacency matrix, where we will just store
values for the weights in the matrix. In
[Figure #Directed](#Directed) and
[Figure #Undirected](#Undirected) we store a value of
"1" at each position just to show that the edge exists. That could
have been done using a single bit, but since bit manipulation is
typically complicated in most programming languages, an implementation
might store a byte or an integer at each matrix position. For a weighted
graph, we would need to store at each position in the matrix enough
space to represent the weight, which might typically be an integer.

The adjacency list needs to explicitly store a weight with each edge. In
the adjacency list shown below, each linked list node is shown storing
two values. The first is the index for the neighbor at the end of the
associated edge. The second is the value for the weight. As with the
adjacency matrix, this value requires space to represent, typically an
integer.

<inlineav id="GweightedCON" src="Graph/GweightedCON.js" name="Graph/GweightedCON" links="Graph/GraphDefCON.css" static/>

Which graph representation is more space efficient depends on the number
of edges in the graph. The adjacency list stores information only for
those edges that actually appear in the graph, while the adjacency
matrix requires space for each potential edge, whether it exists or not.
However, the adjacency matrix requires no overhead for pointers, which
can be a substantial cost, especially if the only information stored for
an edge is one bit to indicate its existence. As the graph becomes
denser, the adjacency matrix becomes relatively more space efficient.
Sparse graphs are likely to have their adjacency list representation be
more space efficient.

::: topic
#### Example: Memory usage {-}

Assume that a vertex index requires two bytes, a pointer requires four
bytes, and an edge weight requires two bytes. Then, each link node in
the adjacency list needs $2 + 2 + 4 = 8$ bytes. The adjacency matrix for
the directed graph above requires $2 |\mathbf{V}^2| = 50$ bytes while
the adjacency list requires $4 |\mathbf{V}| + 8 |\mathbf{E}| = 68$
bytes. For the undirected version of the graph above, the adjacency
matrix requires the same space as before, while the adjacency list
requires $4 |\mathbf{V}| + 8 |\mathbf{E}| = 116$ bytes (because there
are now 12 edges represented instead of 6).
:::

The adjacency matrix often requires a higher asymptotic cost for an
algorithm than would result if the adjacency list were used. The reason
is that it is common for a graph algorithm to visit each neighbor of
each vertex. Using the adjacency list, only the actual edges connecting
a vertex to its neighbors are examined. However, the adjacency matrix
must look at each of its $|\mathbf{V}|$ potential edges, yielding a
total cost of $\Theta(|\mathbf{V}^2|)$ time when the algorithm might
otherwise require only $\Theta(|\mathbf{V}| + |\mathbf{E}|)$ time. This
is a considerable disadvantage when the graph is sparse, but not when
the graph is closer to full.
