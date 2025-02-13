
## ADTs for Graphs

Finally, graphs:

    interface Graph:
        addVertex(v)      // Adds the vertex v to the graph. Returns true if it wasn't already in the graph.
        addEdge(e)        // Adds the edge e to the graph. Returns true if it wasn't already in the graph.
        vertices()        // Returns a Collection of all vertices in the graph.
        outgoingEdges(v)  // Returns a Collection of the edges that originates in vertex v.
        vertexCount()     // Returns the number of vertices in the graph.
        edgeCount()       // Returns the number of edges in the graph.

    interface Edge:
        start    // start vertex
        end      // end vertex
        weight   // weight, defaults to 1.0

