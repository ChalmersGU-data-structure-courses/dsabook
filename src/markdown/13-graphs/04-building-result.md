
## Building the result {#graphs:building-result}

The traversal algorithms we have seen so far lacks an important detail, and this makes them quite useless.
We have shown how to visit the vertices in the graph in a certain order,
but we have not discussed how to build the result, or even how we want the result to look like.

Of course, this depends heavily on what we want to use the result for.
If we want to know which vertices are reachable from a given vertex, we can simply return the set of visited vertices.
If we want to know how expensive it is to to go to a vertex, we can return the total cost when we visit the goal vertex.
But in most cases we want more information than that --
not only we want to know where we can go to or how much it costs, but also how to get there.

A generic and very useful result is to simply remember all the edges we have visited.
The easiest way is to store them in a set:
every time we remove an edge from the agenda, whose end vertex has not been visited,
we add that edge to the result set.

Since the result set only contains edges from the graph, the result is a *subgraph*.
But more interestingly, the result is also a *tree*, meaning that it does not contain any cycles.
The reason for this is that we never visit any vertex more than once,
and therefore there will never be more than one *incoming* edge into every vertex.
In fact, the edges in the result form a *spanning tree* of all paths reachable from the starting vertex.
You can see the resulting spanning tree in the lower right of
[Figures @fig:GraphTraversal1;@fig:GraphTraversal2;@fig:GraphTraversal3]:
the selected, solid, edges form a tree with $A$ as the root.


### Using parent pointers instead of a set

Unfortunately, a set of edges is not a very good data structure if we want to extract a path from it.
Is there a better way to store the result so that we can extract paths efficiently?
A standard tree implementation where nodes point to their children does not support an efficient operation for adding a new edge,
and it will not help us find the path to a specific vertex after we have finished the algorithm.

Instead of using a standard tree representation, we can turn it around so that the children point to their parent.
This is called a *parent-pointer tree* and was introduced in @sec:trees:parent-pointer-trees.
However, we do not need to introduce a special datatype as was done in that section,
but the result can be implemented as a simple *map* from vertices to edges.
The edge that is stored for a vertex $v$ is the edge that ends in $v$,
and as we explained above there is always only one such incoming edge.
So, when it says "add the edge to the result" in the algorithm,
we can simply associate $v$ with the edge in the result map.

To extract the path from the start to a given goal vertex $v$, we trace the parent pointers back to the start:

- Repeat until $v$ is the start vertex:
    - Add the edge associated with $v$ to the path
    - Let $v$ be the start of the edge

Note that since we iterate the path backwards, we either have to reverse the path when we are done, or insert the edges at the front.
