
## The right data structure for the problem {#intro:select-data-structure}

We write programs to solve problems.
This might sound obvious, but sometimes we forget this and do not analyse the problem properly.
Returning to the comparison between linear search and binary search,
the comparison is not entirely fair since they solve two subtly different problems,
the problem of searching an array versus the problem of searching a sorted array.

If we ignore the problem analysis, the risk is that we apply a data structure that is inappropriate for the task,
just because it is familiar to us and we have used it before.
A very common example of this is using a list data structure (like a dynamic array)
where a set data structure (like a hash set) would be more suitable.
Another common example is using an ordered array where a heap would suffice.
Each of these data structures and the operations they efficiently support are explained in this book.
The result of making the wrong choice is usually a slow program,
or a program that uses too much memory, or both.

On the other hand, sometimes we can adopt a data structure that is unnecessarily complex.
This data structure might be very efficient for some very difficult problems,
but if we will not encounter these problems it might be better to use a simpler data structure,
that for example uses less memory.

1.  Analyse your problem to determine the operations that must be supported.
    Examples of operations include inserting or deleting items, and searching in the data structure.
2.  State the constraints for each operation -- how much (time or space) resources it is allowed to use?
3.  Select the data structure that best meets these requirements.

The main idea with this three-step approach is that we analyse the *data* and what we want to do with the data.
When we have done this it becomes easier to decide the representation of the data,
and after that we can start developing the algoithms.

When analysing your problem and the data, the following three questions can help you deciding which data structure to use.

1.  How do you insert items into the data structure?
    If all items are inserted simultaneously and then never modified, we have a *static* application.
    Then we can often select a simpler data structure
    than if we have a *dynamic* application where the data is updated during the course of the program.
2.  Can items be deleted or modified?
    If so, you will probably need a more complicated data structure.
3.  Do you process the data in some well-defined order,
    or will you search for any kind of items at any time?
    Being able to search efficiently generally requires more complex data structures.

As an example, a sorted array is excellent data structure for representing a
static set of elements. We sort the array once when the application starts,
and then we can perform efficient binary searches throughout the runtime of
the application. If the content of the set needs to change during execution,
the situation is drastically different. Inserting a value into a sorted
array is a time consuming operation, so a different data structure is needed.

No data structure is inherently best for all tasks.
Every data structure in this book has practical applications where they
are the most suitable.

