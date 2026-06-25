
# Graphs {#graphs}

Graphs are a very flexible family of data structures used in a wide range of applications.
Like trees, there is no single graph data structure, but rather a family of similar
data structures. A graph always consists of a set of vertices (nodes) and a set of
edges, where each edge connects two vertices.
Here are visual representations of two small graphs.


![Two example graphs, each with four vertices labelled $A$, $B$, $C$, and $D$. The right one also carries numbers in edges.](images/Graphs-examples.svg){width=60% #fig:GraphExamples}


Graphs are used to model both real-world systems and abstract problems.
Modelling a domain as a graph involves considering what
vertices and edges represent. Here is a
small sampling of what graphs can be used to model:

1.  Computer- and communications networks:
    Vertices are computers and edges are direct network connections.
2.  Train networks with distances:
    Vertices are the train stations and edges are the railway tracks between them.
3.  Scheduling of tasks in a complex activity
    (such as compiling a program or building a house):
    Vertices are tasks and edges represent their dependencies --
    that a task depends on another task to finish before it can start.
4.  Any kind of relationships, for example between social media users:
    Vertices are users, edges are relationships such as friendship, following or blocking.
5.  The World Wide Web:
    Vertices are web pages and edges are links.
6.  The memory content of a running program:
    Vertices are objects and edges are references or pointers.

The next section covers basic graph terminology, and
<!-- OPENDSA: START -->
the rest of the chapter covers core graph algorithms
including [traversal]{.term}, [shortest path]{.term} algorithms, and
<!-- OPENDSA: END -->
[minimum spanning tree]{.term} algorithms,
as well as common representations and implementations of graphs.

