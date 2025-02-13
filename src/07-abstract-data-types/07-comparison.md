
## Comparison with standard libraries

### The standard Java API

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


### The Python standard library

