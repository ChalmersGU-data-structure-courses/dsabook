
### Review questions: Graph space requirements

:::::::::::::::::::::::::::::::::::::::: quiz ::::::::::::::::::::::::::::::::::::::::

*Warning*! Read the conditions for the problems in this set very carefully!

<!--
numV = randRange(6, 10)
numE = randRange(numV, (numV * (numV - 1))/2)
pointerB = §randRange(4,6)
vertB = §randRange(2,4)
edgeB = §randRange(2,4)
-->

:::::::::: question ::::::::::
Assume for an *directed unweighted* graph with <!--NumV--> 6 vertices and <!--numE--> 14 edges,
that a vertex index requires <!--vertB--> 2 bytes,
and a pointer requires <!--pointerB--> 4 bytes.

Calculate the byte requirements for an *adjacency list*.

<input type="number" value="108" min="0"/>
<!-- ANS = (numV * pointerB) + (numE * (vertB + pointerB)) -->

::: hints
- Since the graph is unweighted, the adjacency list does not store any weight information.
- The adjacency list has an array (of size $|V|$) which points to a list of edges.
- Every edge appears once on the list. And for each edge there has to be a vertex ID and a pointer to the next edge.
- It uses $(|V| \cdot \textrm{pointer}) + (|E| \cdot (\textrm{vertex-index} + \textrm{pointer}))$ bytes.
:::
::::::::::::::::::::::::::::::



:::::::::: question ::::::::::
Assume for an *directed unweighted* graph with <!--NumV--> 6 vertices and <!--numE--> 14 edges,
that a vertex index requires <!--vertB--> 2 bytes,
and a pointer requires <!--pointerB--> 4 bytes.

Calculate the byte requirements for an *adjacency matrix*.

<input type="number" value="36" min="0"/>
<!-- ANS = numV * numV * 1 -->

::: hints
- Since the graph is unweighted, you can assume that each matrix element stores one byte to represent the edge.
- The matrix is $|V|$ by $|V|$.
- Each position of the matrix needs one byte.
- It uses $|V|^2 \cdot 1$ bytes.
:::
::::::::::::::::::::::::::::::



:::::::::: question ::::::::::
Assume for an *directed weighted* graph with <!--NumV--> 9 vertices and <!--numE--> 11 edges,
that a vertex index requires <!--vertB--> 5 bytes,
a pointer requires <!--pointerB--> 4 bytes.
and that edge weights require <!--edgeB--> 8 bytes.

Calculate the byte requirements for an *adjacency list*.

<input type="number" value="223" min="0"/>
<!-- ANS = (numV * pointerB) + (numE * (vertB + edgeB + pointerB)) -->

::: hints
- The adjacency list has an array (of size $|V|$) which points to a list of edges.
- Every edge appears once on the list. And for each edge there has to be a vertex ID, a weight and a pointer to the next edge.
- It uses $(|V| \cdot \textrm{pointer}) + (|E| \cdot (\textrm{vertex-index} + \textrm{edge-weight} + \textrm{pointer}))$ bytes.
:::
::::::::::::::::::::::::::::::



:::::::::: question ::::::::::
Assume for an *directed weighted* graph with <!--NumV--> 9 vertices and <!--numE--> 11 edges,
that a vertex index requires <!--vertB--> 5 bytes,
a pointer requires <!--pointerB--> 4 bytes.
and that edge weights require <!--edgeB--> 8 bytes.

Calculate the byte requirements for an *adjacency matrix*.

<input type="number" value="648" min="0"/>
<!-- ANS = numV * numV * edgeB -->

::: hints
- The matrix is $|V|$ by $|V|$.
- Each position of the matrix needs $\textrm{edge-weight}$ byte.
- It uses $|V|^2 \cdot \textrm{edge-weight}$ bytes.
:::
::::::::::::::::::::::::::::::



:::::::::: question ::::::::::
Assume for an *undirected unweighted* graph with <!--NumV--> 7 vertices and <!--numE--> 17 edges,
that a vertex index requires <!--vertB--> 6 bytes,
and a pointer requires <!--pointerB--> 2 bytes.

Calculate the byte requirements for an *adjacency list*.


<input type="number" value="286" min="0"/>
<!-- ANS = (numV * pointerB) + (2 * numE * (vertB + pointerB)) -->

::: hints
- Since the graph is unweighted, the adjacency list does not store any weight information.
- Since the graph is undirected, each undirected edge is represented by two directed edges.
- The adjacency list has an array (of size $|V|$) which points to a list of edges.
- Every edge appears twice on the list (the graph is undirected, so we need the directed edge in each direction).
And for each edge there  has to be a vertex ID and a pointer to the next edge.
- It uses $(|V| \cdot \textrm{pointer}) + (2 \cdots |E| \cdot (\textrm{vertex-index} + \textrm{pointer}))$ bytes.
:::
::::::::::::::::::::::::::::::



:::::::::: question ::::::::::
Assume for an *undirected unweighted* graph with <!--NumV--> 7 vertices and <!--numE--> 17 edges,
that a vertex index requires <!--vertB--> 6 bytes,
and a pointer requires <!--pointerB--> 2 bytes.

Calculate the byte requirements for an *adjacency matrix*.


<input type="number" value="49" min="0"/>
<!-- ANS = numV * numV * 1 -->

::: hints
- Since the graph is unweighted, you can assume that each matrix element stores one byte to represent the edge.
- Since the graph is undirected, each undirected edge is represented by two directed edges.
- The matrix is $|V|$ by $|V|$.
- Each position of the matrix needs one byte.
- It uses $|V|^2 \cdot 1$ bytes.
:::
::::::::::::::::::::::::::::::



:::::::::: question ::::::::::
Assume for an *undirected weighted* graph with <!--NumV--> 10 vertices and <!--numE--> 15 edges,
that a vertex index requires <!--vertB--> 1 byte,
a pointer requires <!--pointerB--> 2 bytes.
and that edge weights require <!--edgeB--> 4 bytes.

Calculate the byte requirements for an *adjacency list*.

<input type="number" value="230" min="0"/>
<!-- ANS = (numV * pointerB) + (2 * numE * (vertB + edgeB + pointerB)) -->

::: hints
- Since the graph is undirected, each undirected edge is represented by two directed edges.
- The adjacency list has an array (of size $|V|$) which points to a list of edges.
- Every edge appears twice on the list (the graph is undirected, so we need the directed edge in each direction).
And for each edge there  has to be a vertex ID, a weight and a pointer to the next edge.
- It uses $(|V| \cdot \textrm{pointer}) + (2 \cdots |E| \cdot (\textrm{vertex-index} + \textrm{edge-weight} + \textrm{pointer}))$ bytes.
:::
::::::::::::::::::::::::::::::



:::::::::: question ::::::::::
Assume for an *undirected weighted* graph with <!--NumV--> 10 vertices and <!--numE--> 15 edges,
that a vertex index requires <!--vertB--> 1 byte,
a pointer requires <!--pointerB--> 2 bytes,
and that edge weights require <!--edgeB--> 4 bytes.

Calculate the byte requirements for an *adjacency matrix*.

<input type="number" value="400" min="0"/>
<!-- ANS = numV * numV * edgeB -->

::: hints
- Since the graph is undirected, each undirected edge is represented by two directed edges.
- The matrix is $|V|$ by $|V|$.
- Each position of the matrix needs $\textrm{edge-weight}$ byte.
- It uses $|V|^2 \cdot \textrm{edge-weight}$ bytes.
:::
::::::::::::::::::::::::::::::

::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::

