
# Graphs {#graphs}

::: TODO
- Prio 2: move parts of this text to the 1st section
:::

Graphs provide the ultimate in data structure flexibility. A graph
consists of a set of nodes, and a set of edges where an edge connects
two nodes. Trees and lists can be viewed as special cases of graphs.

Graphs are used to model both real-world systems and abstract problems,
and are the data structure of choice in many applications. Here is a
small sampling of the types of problems that graphs are routinely used
for.

1.  Modeling connectivity in computer and communications networks.
2.  Representing an abstract map as a set of locations with distances
    between locations. This can be used to compute shortest routes
    between locations such as in a GPS routefinder.
3.  Modeling flow capacities in transportation networks to find which
    links create the bottlenecks.
4.  Finding a path from a starting condition to a goal condition. This
    is a common way to model problems in artificial intelligence
    applications and computerised game players.
5.  Modeling computer algorithms, to show transitions from one program
    state to another.
6.  Finding an acceptable order for finishing subtasks in a complex
    activity, such as constructing large buildings.
7.  Modeling relationships such as family trees, business or military
    organisations, and scientific taxonomies.

The next section covers some basic graph terminology. The
rest of the chapter will describe fundamental representations for graphs,
provide a reference implementation, and cover core graph algorithms
including [traversal]{.term}, [topological sort]{.term}, [shortest paths]{.term} algorithms, and
algorithms to find the [minimum spanning tree]{.term}. Besides being useful
and interesting in their own right, these algorithms illustrate the use
of many other data structures presented throughout the course.
