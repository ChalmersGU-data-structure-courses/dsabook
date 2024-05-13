
## Comparables, Comparators and Key-Value Pairs

If we want to sort some things, we have to be able to compare them, to
decide which one is bigger. How do we compare two things? If all that we
wanted to sort or search for was simple integer values, this would not
be an interesting question. We can just use standard comparison
operators like "\<" or "\>". Even if we wanted to store strings,
most programming languages give us built-in functions for comparing
strings alphabetically. But we do not usually want to store just
integers or strings in a data structure. Usually we want to store
records, where a record is made up of multiple values, such as a name,
an address, and a phone number. In that case, how can we "compare"
records to decide which one is "smaller"? We cannot just use "\<" to
compare the records! Nearly always in this situation, we are actually
interested in sorting the records based on the values of one particular
field used to represent the record, which itself is something simple
like an integer. This field is referred to as the
[key]{.term} for the record.

Likewise, if we want to search for a given record in a database, how
should we describe what we are looking for? A database record could
simply be a number, or it could be quite complicated, such as a payroll
record with many fields of varying types. We do not want to describe
what we are looking for by detailing and matching the entire contents of
the record. If we knew everything about the record already, we probably
would not need to look for it. Instead, we typically define what record
we want in terms of a key value. For example, if searching for payroll
records, we might wish to search for the record that matches a
particular ID number. In this example the ID number is the
[search key]{.term}.

### Comparables

To implement sorting or searching, we require that keys be
[comparable]{.term}. At a minimum, we must be
able to take two keys and reliably determine whether they are equal or
not. That is enough to enable a sequential search through a database of
records and find one that matches a given key. However, we typically
would like for the keys to define a [total order]{.term},
which means that we can always tell which of two keys is greater than
the other. Using key types with total orderings gives the database
implementor the opportunity to organize a collection of records in a way
that makes searching more efficient. An example is storing the records
in sorted order in an array, which permits a binary search. Fortunately,
in practice most fields of most records consist of simple data types
with natural total orders. For example, integers, floats, doubles, and
character strings all are totally ordered.

But if we want to write a general purpose sorting or searching function,
we need a general way to get the key for the record. We could insist
that every record have a particular method called `.key()`. That seems
like a good name for it!

Some languages like Java and C++ have special infrastructure for
supporting this (such as the `Comparable` interface in Java, which has
the `.compareTo()` method for defining the exact process by which two
objects are compared). But many languages like Processing and JavaScript
do not.

But what if the programmer had already used that method name for another
purpose? An even bigger problem is, what if the programmer wants to sort
the record now using one field as the key, and later using another
field? Or search sometimes on one key, and at other times on another?
The problem is that the "keyness" of a given field is not an inherent
property within the record, but rather depends on the context. So, you
cannot always count on being able to use your favorite method name (or
even the comparable interface) to extract the desired key value.

### Comparators

Another, more general approach is to supply a function or class --
called a [comparator]{.term} --whose job is to
extract the key from the record. A comparator function can be passed in
as a parameter, such as in a call to a sorting function. In this case,
the comparator function would be invoked on two records whenever they
need to be compared. In this way, different comparator functions can be
passed in to handle different record types or different fields within a
record. In Java (with generics) or C++ (with templates), a comparator
class can be a parameter for another class definition. For example, a
BST could take a comparator class as a generics parameter in Java. This
comparator class would be responsible for dealing with the comparison of
two records.

### Key-Value Pairs

One good general-purpose solution is to explicitly store
[key-value pairs](#key-value-pair){.term} in the
data structure. For example, if we want to sort a bunch of records, we
can store them in an array where every array entry contains both a key
value for the record and a pointer to the record itself.

The main places where we will need to be concerned with comparing
records and extracting keys is for various map implementations and
sorting algorithms. Here is a simple class for representing key-value
pairs:

    class KVPair:
        key    // the search key
        value  // the value associated with the key

Note that in Python it's probably easier to just use a pair `(key,value)`,
but not all languages (read: Java) have that possibility.
So we declare a class **KVPair** thart we will use in our example code.

Using this we can easily implement a **Map** from an underlying
**List**, which we will discuss further in the
[chapter about linear structures](#implementing-maps-using-lists).

### Sorting using Comparables

To keep them clear and simple, visualizations for sorting algorithms
will usually show them as operating on integer values stored in an
array. But almost never do people really want to sort an array of
integers. But to be useful, a real sorting algorithm typically has to
deal with the fact that it is sorting a collection of records. A
general-purpose sorting routine meant to operate on multiple record
types would have to be written in a way to deal with the generic
comparison problem. To illustrate, here is an example of
[Insertion Sort] implemented to work on an array that stores records that
support the `Comparable` interface:

    function insertionSort(A):
        for i in 0 ... length(A)-1:
            j = i
            while j > 0 and A[j] < A[j-1]:
                swap(A, j, j-1)
                j = j-1


### Review questions

<avembed id="CompareSumm" src="Design/CompareSumm.html" type="ka" name="Record Comparison Summary Exercise"/>
