
## All ADTs Used in This Book

Here we list all abstract data types that we will introduce in this
course book. Together they form an API (application programming
interface) for this book.

Don't worry about understanding the different interfaces now, they will
be explained in detail later on.

**Important Java note**: There are many similarities, but also some
differences, between the API below and the interfaces and classes in the
"standard" Java API. For more details about the differences, please
see the end of this module.

**Important Python note**: Python doesn't make use of abstract classes
(interfaces) in the same way as Java does. Instead they use a concept
called [Duck Typing](https://en.wikipedia.org/wiki/Duck_typing), which
means that it's enough to just implement the required methods -- you
don't need a formal interface. However, in this course we will still
pretend that there are interfaces, in Python too. So, we will define
classes which act as interfaces, and call them abstract classes.

### Basic Abstract Data Types

These include comparables:
```python
# Note: by implementing these methods,
# one can use the standard Python comparison operators (==, !=, <, <=, >, >=).
class Comparable:
    def __eq__(self, other): """Test if self == other."""
    def __ne__(self, other): """Test if self != other."""
    def __lt__(self, other): """Test if self < other."""
    def __le__(self, other): """Test if self <= other."""
    def __gt__(self, other): """Test if self > other."""
    def __ge__(self, other): """Test if self >= other."""
```

And iterators and iterables:
```python
# Note: by implementing these methods,
# one can loop over the elements in a standard Python for-loop.
class Iterator:
    def __iter__(self): """Returns the iterator itself."""
    def __next__(self): """Returns the next item. Raises StopIteration if there are no more elements."""

class Iterable:
    def __iter__(self): """Returns a new iterator."""
```

As well as collections:
```python
class Collection(Iterable):
    def isEmpty(self):  """Returns true if the collection is empty."""
    def size(self):     """Returns the number of elements in this collection."""
```

### Lists

General lists:
```python
class List(Collection):
    def add(self, i, x): """Adds x at position i; where 0 <= i <= size."""
    def get(self, i):    """Returns the element at position i; where 0 <= i < size."""
    def set(self, i, x): """Replaces the value at position i with x; where 0 <= i < size."""
    def remove(self, i): """Removes the element at position i; where 0 <= i < size."""
    # Note: __iter__() should yield the elements starting from position 0.
```

Stacks:
```python
class Stack(Collection):
    def push(self, x): """Pushes x on top of the stack."""
    def pop(self):     """Pops the top of the stack and returns it. Raises an exception if the stack is empty."""
    def peek(self):    """Returns the top element, without removing it. Raises an exception if the stack is empty."""
    # Note: __iter__() should yield the elements starting from the top of the stack.
```

Queues:
```python
class Queue(Collection):
    def enqueue(self, x): """Enqueues x at the end of the queue."""
    def dequeue(self):    """Dequeues the frontmost element. Raises an exception if the queue is empty."""
    def peek(self):       """Returns the frontmost element, without removing it. Raises an exception if the queue is empty."""
    # Note: __iter__() should yield the elements starting from the frontmost element.
```

Priority queues:
```python
class PriorityQueue(Collection):
    def add(self, x):    """Adds x to the priority queue."""
    def removeMin(self): """Removes and returns the minimum element. Raises an exception if the priority queue is empty."""
    def getMin(self):    """Returns the minimum element, without removing it. Raises an exception if the priority queue is empty."""
    # Note: __iter__() can yield the elements in any order, but the minimum element should come first.
```

### Sets

Sets with no internal order:
```python
class Set(Collection):
    def add(self, x):      """Adds x to the set. Returns true if the element wasn't already in the set."""
    def remove(self, x):   """Removes x from the set. Returns true if the element was in the set."""
    def contains(self, x): """Returns true if x is in the set."""
    # Note: __iter__() can yield the elements in any order.
```

Sets where the elements are sorted:
```python
class SortedSet(Set):
    def first(self):            """Returns the first (smallest) element. Raises an exception if the set is empty."""
    def last(self):             """Returns the last (largest) element. Raises an exception if the set is empty."""
    def floor(self, x):         """Returns the closest element <= x, or None if there is no such element."""
    def ceiling(self, x):       """Returns the closest element >= x, or None if there is no such element."""
    def lower(self, x):         """Returns the closest element < x, or None if there is no such element."""
    def higher(self, x):        """Returns the closest element > x, or None if there is no such element."""
    def between(self, x1, x2):  """Returns all elements x such that x1 <= x <= x2."""
    # Note: __iter__() should yield the elements in order.
```

### Maps or Dictionaries

Maps are also called dictionaries or associative arrays.

Maps with no internal order:
```python
class Map(Iterable):
    def put(self, key, value):  """Sets the value of the given key. Returns the previous value, or None."""
    def get(self, key):         """Returns the value associated with the given key, or None if the key is not there."""
    def remove(self, key):      """Removes and returns the value associated with the given key, or None if there is no key."""
    def containsKey(self, key): """Returns true if the key has an associated value."""
    def isEmpty(self):          """Returns true if there are no keys."""
    def size(self):             """Returns the number of keys (i.e., the number of key/value pairs)."""
    # Note: __iter__() can yield the keys in any order.
```

Maps where the keys are sorted:
```python
class SortedMap(Map):
    def firstKey(self):                """Returns the first (smallest) key. Raises an exception if the map is empty."""
    def lastKey(self):                 """Returns the last (largest) key. Raises an exception if the map is empty."""
    def floorKey(self, key):           """Returns the closest key <= k, or None if there is no key."""
    def ceilingKey(self, key):         """Returns the closest key >= k, or None if there is no key."""
    def lowerKey(self, key):           """Returns the closest key < k, or None if there is no such element."""
    def higherKey(self, key):          """Returns the closest key > k, or None if there is no such element."""
    def keysBetween(self, key1, key2): """Returns all keys k such that k1 <= k <= k2."""
    # Note: __iter__() should yield the keys in order.
```

### Graphs

Finally, graphs:
```python
class Graph:
    def addVertex(self, v):     """Adds the vertex v to the graph. Returns true if it wasn't already in the graph."""
    def addEdge(self, e):       """Adds the edge e to the graph. Returns true if it wasn't already in the graph."""
    def vertices(self):         """Returns a Collection of all vertices in the graph."""
    def outgoingEdges(self, v): """Returns a Collection of the edges that originates in vertex v."""
    def vertexCount(self):      """Returns the number of vertices in the graph."""
    def edgeCount(self):        """Returns the number of edges in the graph."""

from collections import namedtuple
Edge = namedtuple('Edge', ['start', 'end', 'weight'], defaults=[1.0])
```

### Comparison with the standard Java API

The standard Java API can be found here (this is Java SE 8):
<https://docs.oracle.com/javase/8/docs/api/>. Here is a quick comparison
beteween the interfaces we have defined above, and the most similar ones
that are defined in the standard Java API:

-   **Iterable, Collection, List**: These interfaces are the same as
    [Iterable](https://docs.oracle.com/javase/8/docs/api/java/lang/Iterable.html),
    [Collection](https://docs.oracle.com/javase/8/docs/api/java/util/Collection.html)
    and
    [List](https://docs.oracle.com/javase/8/docs/api/java/util/List.html)
    in the standard Java API, but with fewer methods.
-   **Stack**: The main difference is that define it as an interface
    (because there are several possible implementations), but it's a
    single class
    [Stack](https://docs.oracle.com/javase/8/docs/api/java/util/Stack.html)
    in the Java standard.
-   **Queue**: The standard API has an interface
    [Queue](https://docs.oracle.com/javase/8/docs/api/java/util/Queue.html)
    which uses different method names.
-   **PriorityQueue**: We define priority queues as an interface
    (because there are several possible implementations), but in the
    standard API it's a single class
    [PriorityQueue](https://docs.oracle.com/javase/8/docs/api/java/util/PriorityQueue.html)
    that implements their
    [Queue](https://docs.oracle.com/javase/8/docs/api/java/util/Queue.html)
    interface. So the method names are different too.
-   **Set, SortedSet, Map, SortedMap**: These interface are the same as
    [Set](https://docs.oracle.com/javase/8/docs/api/java/util/Set.html),
    [SortedSet](https://docs.oracle.com/javase/8/docs/api/java/util/SortedSet.html),
    [Map](https://docs.oracle.com/javase/8/docs/api/java/util/List.html)
    and
    [SortedMap](https://docs.oracle.com/javase/8/docs/api/java/util/SortedMap.html)
    in the standard API, but with fewer methods. Also, some methods are
    simpler than the corresponding ones in the standard API.
-   **Graph**: There is no interface (or class) for graphs in the
    standard Java API.
