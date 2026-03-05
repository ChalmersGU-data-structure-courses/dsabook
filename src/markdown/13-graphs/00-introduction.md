
# Graphs {#graphs}

Graphs are a very flexible family of data structures used in a wide range of applications. 
A graph consists of a set of vertices (nodes) and a set of edges, where each edge connects
two vertices. Here are visual representations of two different graphs, each with four vertices 
labelled A,B,C, and D). Note that the second graph is carrying data in the edges as well 
as in the vertices. We will cover all the terminology required to classify these 
and other graphs in this chapter.

::: TODO
- How do you scale this? Also add proper figure with reference.
:::

![](images/Graphs-examples.svg)

Graphs are used to model both real-world systems and abstract problems. 
Modelling a domain as a graph involves considering what 
vertices and edges represent. Here is a
small sampling of what graphs can be used to model:

1.  Connectivity in computer and communications networks. 
    Vertices are computers and edges are direct network connections.
2.  An abstract map of a road network with distances. Vertices are road 
    intersections and edges are roads between them.
3.  Acceptable orders in which to finishing subtasks in a complex
    activity, such as compiling a program. Vertices are tasks and
    edges represent a task depending on another task to finish before it can start.
4.  Any kind of relationships, e.g. between users of a social media application.
    Vertices are users, edges are relationships like friendship, following or blocking.
5.  The World Wide Web forms a graph where vertices are web pages and edges
    are links.
6.  The memory content of a running object oriented program forms a graph 
    where vertices are objects and edges are references.

The next section covers some basic graph terminology. The
rest of the chapter will describe fundamental representations for graphs,
provide a reference implementation, and cover core graph algorithms
including [traversal]{.term}, [topological sort]{.term}, [shortest paths]{.term} algorithms, and
algorithms to find the [minimum spanning tree]{.term}.

