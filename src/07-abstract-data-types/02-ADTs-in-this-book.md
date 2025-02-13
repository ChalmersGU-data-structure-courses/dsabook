
## ADTs used in this book

Here we list all abstract data types that we will introduce in this
course book. Together they form an API (application programming
interface) for this book.

Don't worry about understanding the different interfaces now, they will
be explained in detail later on.

**Important Java note**: There are many similarities, but also some
differences, between the API below and the interfaces and classes in the
"standard" Java API. For more details about the differences, please
see the end of this chapter.

**Important Python note**: Python doesn't make use of abstract classes
(interfaces) in the same way as Java does. Instead they use a concept
called [Duck Typing](https://en.wikipedia.org/wiki/Duck_typing), which
means that it's enough to just implement the required methods -- you
don't need a formal interface. However, in this course book we will still
pretend that there are interfaces, even in Python.


### Comparables and iterators

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
