
## Basic Abstract Data Types

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
