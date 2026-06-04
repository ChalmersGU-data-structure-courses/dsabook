
## Selecting a data structure

::: TODO
- Prio 3: are the priority lists as we want them?
:::

We write programs to solve problems.
This might sound obvious, but sometimes we forget this and do not analyse the problem properly.
If we ignore the problem analysis, the risk is that we apply a data structure that is inappropriate for the task,
just because it is familiar to us and we have used it before.
This usually results in a slow program, or a program that uses too much memory, or sometimes both.

On the other hand, sometimes we can adopt a data structure that is unnecessarily complex.
This data structure might be very efficient for some very difficult problems,
but if we will not encounter these problems it might be better to use a simpler data structure,
that for example uses less memory.

1.  Analyse your problem to determine the operations that must be supported.
    Examples of operations include inserting or deleting items, and searching in the data structure.
2.  State the constraints for each operation -- how much (time or space) resources it is allowed to use.
3.  Select the data structure that best meets these requirements.

The main idea with this three-step approach is that we analyse the *data* and what we want to do with the data.
When we have done this it becomes easier to decide the representation of the data,
and after that we can start developing the algoithms.

When analysing your problem and the data, the following three questions can help you deciding which data structure to use.

1.  How do you insert items into the data structure?
    If all items are inserted first and then never changed, we have a *static* application.
    Then we can typically select a simpler data structure
    than if we have a *dynamic* application where the data is updated during the course of the program.
2.  Can items be deleted or modified?
    If so, you will probably need a more complicated data structure.
3.  Do you process the data in some well-defined order,
    or will you search for any kind of items at any time?
    Being able to search efficiently generally requires more complex data structures.

<!-- OPENDSA: START -->
Each data structure has associated costs and benefits. In practice, it
is hardly ever true that one data structure is better than another for
use in all situations.
If one data structure or algorithm had been superior to another in all respects,
the inferior one would already be long forgotten and we wouldn't discuss it.
<!-- OPENDSA: END -->
That being said, sometimes we will show an inferior data structure or algorithm,
just because it is very simple -- and then we will show how to improve it.
This is for example the case for Bubble sort, which is inferior to
Selection sort and Insertion sort in all cases.

<!-- OPENDSA: START -->
A data structure requires a certain amount of space for each data item
it stores, a certain amount of time to perform a single basic operation,
and a certain amount of programming effort. Each problem has constraints
on available space and time. Each solution to a problem makes use of the
basic operations in some relative proportion, and the data structure
selection process must account for this. Only after a careful analysis
of your problem's characteristics can you determine the best data
structure for the task.
<!-- OPENDSA: END -->
