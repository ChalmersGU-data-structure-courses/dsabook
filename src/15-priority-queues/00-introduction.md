
# Priority queues

::: TODO
- Recap of the ADT for prio queues
- [7 Priority queues]
- [7.2.3 Binary Heaps as Priority Queues]
:::


There are many situations, both in real life and in computing
applications, where we wish to choose the next "most important" from a
collection of people, tasks, or objects. For example, doctors in a
hospital emergency room often choose to see next the "most critical"
patient rather than the one who arrived first. When scheduling programs
for execution in a multitasking operating system, at any given moment
there might be several programs (usually called
[jobs](#job){.term}) ready to run. The next job
selected is the one with the highest [priority]{.term}. Priority is indicated by a particular value associated
with the job (and might change while the job remains in the wait list).

When a collection of objects is organized by importance or priority, we
call this a [priority queue]{.term}. A normal
queue data structure will not implement a priority queue efficiently
because search for the element with highest priority will take
$\Theta(n)$ time. A list, whether sorted or not, will also require
$\Theta(n)$ time for either insertion or removal. A BST that organizes
records by priority could be used, with the total of $n$ inserts and $n$
remove operations requiring $\Theta(n \log n)$ time in the average case.
However, there is always the possibility that the BST will become
unbalanced, leading to bad performance. Instead, we would like to find a
data structure that is guaranteed to have good performance for this
special application.
