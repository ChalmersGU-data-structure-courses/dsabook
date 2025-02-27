
## All ADTs Used in This Book

Here we list all abstract data types that we will introduce in this
course book. Together they form an API (application programming
interface) for this book.

Don't worry about understanding the different interfaces now, they will
be explained in detail later on.

**Important Java note**: There are many similarities, but also some
differences, between the API below and the interfaces and classes in the
"standard" Java API. For more details about the differences, please
see the end of this section.

**Important Python note**: Python doesn't make use of abstract classes
(interfaces) in the same way as Java does. Instead they use a concept
called [Duck Typing](https://en.wikipedia.org/wiki/Duck_typing), which
means that it's enough to just implement the required methods -- you
don't need a formal interface. However, in this course book we will still
pretend that there are interfaces, even in Python.

### Basic Abstract Data Types

These include comparables:

    interface Comparable:
        // This is Java's default way of comparing elements,
        // returning an integer: negative (smaller), 0 (equal), positive (larger)
        this.compareTo(other)

        // This is Python's default way of comparing elements.
        // All of these operators return a boolean:
        this == other  
        this != other  
        this < other   
        this <= other  
        this > other   
        this >= other  

And iterators and iterables:

    interface Iterator:
        next()      // Returns the next item. Fails if there are no more items.

    interface Iterable:
        iterator()  // Returns a new iterator.

As well as collections:

    interface Collection extends Iterable:
        isEmpty()  // Returns true if the collection is empty.
        size()     // Returns the number of elements in this collection.

### ADTs for Lists

General lists:

    interface List extends Collection:
        add(i, x)  // Adds x at position i; where 0 ≤ i ≤ size.
        get(i)     // Returns the element at position i; where 0 ≤ i < size.
        set(i, x)  // Replaces the value at position i with x; where 0 ≤ i < size.
        remove(i)  // Removes the element at position i; where 0 ≤ i < size.

Stacks:

    interface Stack extends Collection:
        push(x)    // Pushes x on top of the stack.
        pop()      // Pops the top of the stack and returns it.
        peek()     // Returns the top element, without removing it.

Queues:

    interface Queue extends Collection:
        enqueue(x)  // Enqueues x at the end of the queue.
        dequeue()   // Dequeues the frontmost element.
        peek()      // Returns the frontmost element, without removing it.

Priority queues:

    interface PriorityQueue extends Collection:
        add(x)       // Adds x to the priority queue.
        removeMin()  // Removes and returns the minimum element.
        getMin()     // Returns the minimum element, without removing it.


### ADTs for Sets

Sets with no internal order:

    interface Set extends Collection:
        add(x)       // Adds x to the set. Returns true if the element wasn't already in the set.
        remove(x)    // Removes x from the set. Returns true if the element was in the set.
        contains(x)  // Returns true if x is in the set.

Sets where the elements are sorted:

    interface SortedSet extends Set:
        first()          // Returns the first (smallest) element.
        last()           // Returns the last (largest) element.
        floor(x)         // Returns the closest element ≤ x, or nothing if there is no such element.
        ceiling(x)       // Returns the closest element ≥ x, or nothing if there is no such element.
        lower(x)         // Returns the closest element < x, or nothing if there is no such element.
        higher(x)        // Returns the closest element > x, or nothing if there is no such element.
        between(x1, x2)  // Returns all elements x such that x1 ≤ x ≤ x2.


### ADTs for Maps or Dictionaries

Maps are also called dictionaries or associative arrays.

Maps with no internal order:

    interface Map extends Iterable:
        put(key, value)   // Sets the value of the given key. Returns the previous value, or nothing.
        get(key)          // Returns the value associated with the given key, or nothing if the key is not there.
        remove(key)       // Removes and returns the value associated with the given key, or nothing if there is no key.
        containsKey(key)  // Returns true if the key has an associated value.
        isEmpty()         // Returns true if there are no keys.
        size()            // Returns the number of keys (i.e., the number of key/value pairs).

Maps where the keys are sorted:

    interface SortedMap extends Map:
        firstKey()               // Returns the first (smallest) key.
        lastKey()                // Returns the last (largest) key.
        floorKey(key)            // Returns the closest key ≤ k, or nothing if there is no key.
        ceilingKey(key)          // Returns the closest key ≥ k, or nothing if there is no key.
        lowerKey(key)            // Returns the closest key < k, or nothing if there is no such element.
        higherKey(key)           // Returns the closest key > k, or nothing if there is no such element.
        keysBetween(key1, key2)  // Returns all keys k such that k1 ≤ k ≤ k2.


### ADTs for Graphs

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


### Comparison with the standard Java API

The standard Java API can be found here (this is Java SE 11):
<https://docs.oracle.com/en/java/javase/11/docs/api/java.base/java/util/package-summary.html>. Here is a quick comparison
beteween the interfaces we have defined above, and the most similar ones
that are defined in the standard Java API:

Iterable, Collection, List: 

:   These interfaces are similar to
    [Iterable](https://docs.oracle.com/en/java/javase/11/docs/api/java.base/java/lang/Iterable.html),
    [Collection](https://docs.oracle.com/en/java/javase/11/docs/api/java.base/java/util/Collection.html)
    and
    [List](https://docs.oracle.com/en/java/javase/11/docs/api/java.base/java/util/List.html)
    in the standard Java API, but with fewer methods.

Stack:

:   The main difference is that we define it as an interface
    (because there are several possible implementations), but it's a
    single class
    [Stack](https://docs.oracle.com/en/java/javase/11/docs/api/java.base/java/util/Stack.html)
    in the Java standard.

Queue:

:   The Java API has an interface
    [Queue](https://docs.oracle.com/en/java/javase/11/docs/api/java.base/java/util/Queue.html)
    which uses different method names.

PriorityQueue:

:   We define priority queues as an interface
    (because there are several possible implementations), but in the
    Java API it's a single class
    [PriorityQueue](https://docs.oracle.com/en/java/javase/11/docs/api/java.base/java/util/PriorityQueue.html)
    that implements their
    [Queue](https://docs.oracle.com/en/java/javase/11/docs/api/java.base/java/util/Queue.html)
    interface. So the method names are different too.

Set, SortedSet, Map, SortedMap:

:   These interfaces are similar to 
    [Set](https://docs.oracle.com/en/java/javase/11/docs/api/java.base/java/util/Set.html),
    [SortedSet](https://docs.oracle.com/en/java/javase/11/docs/api/java.base/java/util/SortedSet.html),
    [Map](https://docs.oracle.com/en/java/javase/11/docs/api/java.base/java/util/List.html)
    and
    [SortedMap](https://docs.oracle.com/en/java/javase/11/docs/api/java.base/java/util/SortedMap.html)
    in the Java API, but with fewer methods. Also, some methods are
    simpler than the corresponding ones in the Java API.

Graph:

:   There is no interface (or class) for graphs in the standard Java API.


<!-- TODO 
### Comparison with the Python standard library 
-->



