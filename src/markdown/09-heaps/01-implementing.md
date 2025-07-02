
## Implementing priority queues using binary trees

A normal linear data structure, such as a [linked list]{.term} or [dynamic array]{.term}, cannot implement a priority queue efficiently.
This is because either insertion or removal will take linear time, $O(n)$, in the worst case.

- If we use unordered lists, then searching for the element with the highest priority will be linear.
- If we instead use sorted lists, then inserting an element into that list will be linear.

In this we show how to use binary trees instead of lists, to implement priority queues.

### The heap property

The main idea is that we always keep the highest priority element as the root of the tree.
This means that we have constant access to it, so the method `getMin` will always be constant time.

In general, a [heap]{.term} is a tree which satisfies the *heap property*:

- Every tree node has at least as high priority as all its children

One immediate consequence of this property is that the root in a heap always contains the element with the highest priority.

Now, how do we implement these heaps so that they will always be efficient?
There are actually several possible ways to do this, each having their own advantages and disadvantages.
Some heap data structurues are *leftist heaps*, *skew heaps*, *Fibonacci heaps*, *2-3 heaps*, *binomial heaps*, and many more.

In this chapter we will focus on the most basic heap implementation, *binary heaps*.
What makes this implementation special is that it stores the tree as an array, which makes it very space-efficient.
