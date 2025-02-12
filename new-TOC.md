
# New structure for the course book

- Google folder: https://drive.google.com/drive/folders/1hywKra0rV8w1HSvTOh212PB_O6-Dlkkn
- TOC on Google: https://docs.google.com/document/d/1y1dDe-XBfh1KWf5FUvECtBbmghVbsWh3p_PDHBcR8ZA/


# Offline TOC, copied from Google 2025-02-12

*Note*: All the [6.6 Examples like this] refer to sections in the current book.

## 1 Introduction
- [1 Introduction]

### 1.1 Motivation
- Short explanation of the why and what
- [1 A Philosophy of Data Structures]
- [1.1 Selecting a Data Structure]

### 1.2 Use cases / examples
- [Examples from 1.1]
- [Some examples from 1.2]

### 1.3 Big example: Searching in arrays
- Use cases: dictionaries, sets, …

#### 1.3.1 Linear search
- [2.1.1 Sequential Search]
- analysis: linear


#### 1.3.2 Binary search
- [2.1.2 Binary Search]
- Use a range, not a slice
- Iterative vs recursive
- Analysis: logarithmic
- Optimisation: Interpolation search

#### 1.3.3 Constant-time search
- e.g. searching for numbers: use an array
- use a hash function -> see the hashing chapter

## 2 Prerequisites: Programming, mathematics
- Very quick run-down of what programming and math concepts we we use in the book
- Note that we use pseudocode in this book
- Note that Python doesn't use many of the basic types we need
- Don't need lots of explanations - we can refer to other places instead

### 2.1 Math
- Logarithms, polynomials, exponentials
- Summations ∑
- Limits

### 2.2 Primitive data types
- We will only use these: boolean, integer, float, character
- We assume characters are fixed-size unicode - but sometimes 8-bit ascii
- Sometimes we might talk about fixed-size integers (32-bit, 64-bit)
- Python-specific details: no fixed-size ints, chars == strings

### 2.3 Fixed-size arrays
- Have to know the size and type in advance

## 0-based indexing
- Cannot resize
- Pseudocode for creating, looking up, setting, etc
- Python-specific detail: no real arrays
- Slicing is not a primitive - we will not use it
- [2 Arrays: searching and sorting]

#### 2.3.1 Referring to array slices (sub-arrays)
- don't use slicing = copying
- instead: use a range (start, end)
- discussion: should 'end' point to the last element or the one after
- (how do we do in this book?)

#### 2.3.2 Strings
- Constants, think of them as arrays of characters
- Concatenation takes time
- Cannot resize

### 2.4 Object-oriented programming

#### 2.4.1 Classes and instances
- How to create an instance
- Constructor
- References

#### 2.4.2 Methods
- Instance methods
- (We will not use class methods, static methods)

#### 2.4.3 Instance variables
- Declared at the top
- This or self
- (We will not use super)
- "Class constants"
- (We will not use class variables)

#### 2.4.4 Interfaces
- Python: there are no real interfaces, but we can cheat with "abstractmethod"

### 2.5 Comparing values
- Two main approaches (cmp -> -1/0/1, or declare each operator)
- "Natural" ordering, and different orderings
- [1.5 Comparables, Comparators and Key-Value Pairs]
- [1.3.1 Basic Abstract Data Types]

#### 2.5.1 Comparing values in Java
- [1.6 Example: Comparables and Comparators in Java]

#### 2.5.2 Comparing values in Python
- overloading `__lt__`, `__eq__`, etc

### 2.6 Iterators and iterables
- next
- stop iteration (using hasNext or raise an error)

#### 2.6.1 Generators
- yield
- makes some algorithms easier
- complex underlying machinery

### 2.7 Functions
- what we assume they know about functions

#### 2.7.1 Recursive functions
- need good examples
- base case, recursive case

### 2.8 Computer memory
- Internal memory vs external memory
- Caching and locality (memory/data locality)

### 2.9 Chapter summary
- practice questions

## 3 Algorithm analysis 1: Introduction
- [3 Algorithm Analysis]
- correctness and complexity

### 3.1 Problems, algorithms, and implementations
- [3.1 Problems, Algorithms, and Programs]

### 3.2 Invariants, preconditions, postconditions
- What is an invariant? Why is it important?
- Example: binary search
- precondition: sorted array
- invariant: the searched value is between a[lo] and a[hi]

### 3.3 Comparing algorithms
- input size
- basic operations
- [3.2 Comparing Algorithms]
- abstracting away things,

### 3.4 Best, worst, and average cases
- [3.3 Best, Worst, and Average Cases]
- more needs to be added
- examples (e.g., quicksort, insertion sort)

### 3.5 Growth rates
- [3.4 Faster Computer, or Faster Algorithm?]

### 3.6 Asymptotic analysis
- growth rate when the input gets large
- T(n) - the number of basic operations
- [3.5 Asymptotic Analysis and Upper Bounds]
- [3.6.3 Classifying Functions]

### 3.7 Algorithm analysis in practice
- [3.7 Calculating Program Running Time]
- simple statements, loops, nested loops, sequence, if-then-else
- examples

### 3.8 Empirical analysis
- how to test complexity empirically
- [3.12 Code Tuning and Empirical Analysis]
- code tuning


## 4 Sorting algorithms
- [2.2 Sorting]

### 4.1 Terminology and notation
- [2.3 Sorting Terminology and Notation]
- In-place
- Stability
- Efficicency: n:o comparisons / swaps / array accesses
- Note: multiplicative/additive constants do not matter (refer forward to complexity chapter)
- Postcondition: the array is sorted!

### 4.2 Naive sorting algorithms
- Quick description of the main quadratic algorithms
- Bubble sort, insertion sort, selection sort
- General argument of the quadratic behaviour

#### 4.2.1 Bubble sort
- history
- [2.5 Bubble Sort]
- Invariant!
- Example: sorting a bookshelf
- Use case: old-style computers - magnetic tapes
- Detailed analysis (n:o swaps / accesses / comparisons)
- Bad optimisation: Check last swap
- [2.8.2 Bubble Sort]

#### 4.2.2 Selection sort
- history
- Intuition: select the min from one list/pile, put in another
- Example: sorting a bookshelf / deck of cards
- In-place version: have a "marker" telling which part is already sorted
- [2.6 Selection Sort] - but use the "standard" version, selecting the smallest element
- Invariant!
- Detailed analysis (n:o swaps / accesses / comparisons)
- Bad optimisation: Check before swap
- [2.8.3 Selection Sort]
- Optimisation: Heapsort - efficiently finding the minimal element (refer forward)

#### 4.2.3 Insertion sort
- history
- Intuition: take first from one list/pile, put in the right order
- Example: sorting a bookshelf / deck of cards
- In-place version: have a "marker" telling which part is already sorted
- [2.4 Insertion Sort]
- Invariant!
- Detailed analysis (n:o swaps / accesses / comparisons)
- Optimisation: Shift instead of swap
- [2.8.1 Insertion Sort]
- Optimisation: Binary search to find the insertion point
- Optimisation: Shellsort - multipass insertion sort

#### 4.2.4 Complexity analysis

#### 4.2.5 Summary of quadratic sorting algorithms
- [2.7 The Cost of Exchange Sorting]
- stability, in-place


### 4.3 Divide and conquer -- Optimal sorting algorithms
- Mergesort and quicksort
- Heapsort (refer back to selection sort, and to later)
- Shell sort (refer back to insertion sort) - not n log n, but better than n^2

### 4.4 Mergesort
- history
- [2.9 Mergesort]
- Pseudocode with generators
- Invariant!
- Example: Using linked lists, or magnetic tapes

#### 4.4.1 Implementing mergesort
- How to do it with arrays
- [2.10 Implementing Mergesort]
- Optimisation: threshold for calling insertion sort
- Optimisation: alternating the original and the temp. array

#### 4.4.2 Complexity analysis: Recursion
- complexity
- cutoff to insertion sort *does not* change complexity
- stable, not in-place

#### 4.4.3 Bottom-up mergesort
- using lists of lists
- arrays: using run-lengths of 1, 2, 4, 8, ...

#### 4.4.4 Run-based mergesort
- "natural" mergesort in Wikipedia
- find already sorted runs, store run-starts in array
- merge adjacent runs
- Optimisation: decide which runs to merge
- Optimisation: bitonic (alternating ascending and descending runs)
- Example: Timsort

### 4.5 Quicksort
- history
- Overview: select pivot, partition, recurse
- Simple pivot: select first, select last, select middle
- Invariant!
- [2.11 Quicksort]

#### 4.5.1 Partitioning
- [2.11.1 Partition]
- Invariant!
- Hoare's scheme
- Lomuto's scheme (only overview, doesn't work well with many repeated values)

#### 4.5.2 Putting it together
- [2.11.2 Putting It Together]
- Optimisation: threshold for calling insertion sort
- Alternative: stopping and then insertion sort in the end (doesn't make use of caching)
- Tail-call optimisation: recurse into smaller partition, then use a tail call (or a loop) for the larger
- Optimisation: three-way partition (Dutch national flag problem)
- [2.11.5 More practical improvements]

#### 4.5.3 Pivot selection strategies
- Why not use median?
- first/last (give bad examples)
- middle (can be exploited by hacker)
- median of 3 (can still be exploited)
- median of medians (Tukey's ninther)
- random
- [2.11.4 Pivots in practice]

#### 4.5.4 Complexity analysis
- [2.11.3 Quicksort Analysis]
- quadratic worst case (can be exploited by hackers)
- n log n "average" case (refer to later for the problems with "average")
- well-behaved data and good pivot selection
- *expected* n log n for random pivot (refer to later for expected complexity)
- in-place, but not stable
- cutoff to insertion sort *does not* change complexity

### 4.6 Empirical comparison of sorting algorithms
- [2.12 An Empirical Comparison of Sorting Algorithms]

### 4.7 Special-purpose sorting algorithms
- It's not possible to make a generic sorting algorithm better than n log n, but if the data is restricted we can
- non-comparative sorting

#### 4.7.1 Distribution sorting
- counting sort: keys are finite range of integers
- bucket sort: hashable keys (refer to hashing chapter)

#### 4.7.2 Sorting strings (or other kinds of sequences)
- Radix sort: sorting strings or numbers as digit sequences (or bit sequences)
- Multi-key quicksort (aka three-way radix quicksort)
- Example: Suffix arrays

### 4.8 Chapter summary
- practice questions

## 5 Algorithm Analysis 2: Definitions

### 5.1 Invariants, preconditions, postconditions (part 2)
- something something

### 5.2 Asymptotic complexity analysis, definitions

#### 5.2.1 Upper bounds, or the big-O notation
- definition
- [3.5.1 Upper Bounds]
- [3.5.2 Simplifying Rules]

#### 5.2.2 Other bounds, big-Theta, big-Omega, etc.
- definitions
- [3.5.3 Tight Bounds]
- [3.6 Lower Bounds and Θ Notation]
- use case for lower bound

#### 5.2.3 Summary
- "rules of thumb"
- equivalences, simplifications
- [3.13 Growth Rates Review]

### 5.3 Analysing problems
- [3.8 Analyzing Problems]

#### 5.3.1 Example: Lower bound for sorting
- [2.13 Lower Bounds for Sorting]

### 5.4 Common misunderstandings
- [3.9 Common Misunderstandings]

### 5.5 Space bounds
- [3.11 Space Bounds]

### 5.6 Different types of analysis
- average case vs. amortised vs. randomised algorithms

#### 5.6.1 Amortised analysis
- [3.16 Amortized Analysis]
- Example: Dynamic arrays
- Example: self-organising lists

#### 5.6.2 Randomised algorithms
- Analogy with random input
- Example: quicksort with random pivot
- Example: skip list (refer to later)

#### 5.6.3 Different ways of averaging
- Average case = average over the input
- Amortised = average over a sequence of operations
- Randomised = average over a number of independent runs

### 5.7 Advanced analysis techniques

#### 5.7.1 Summations
- [3.14 Summation Techniques]

#### 5.7.2 Recurrence relations
- model recursive functions
- [3.15 Solving Recurrence Relations]

#### 5.7.3 Multiple parameters
- [3.10 Multiple Parameters]

### 5.8 Chapter summary
- practice questions

## 6 Abstract data types and Data structures
- Perhaps just a short chapter here, and then introduce each ADT in separate chapters.
- More like a detailed table of contents, with explanations.
- perhaps some parts from [1.1 Selecting a Data Structure]
- Terminology
- [1.2 Abstract Data Types]

### 6.1 ADTs and data structures used in this book
- [1.3 All ADTs Used in This Book]
- ADT: Lists
- examples, use cases
- Implementations: dynamic arrays, linked lists
- refer forward
- ADT: Stacks, queues
- Special cases of lists
- examples, use cases
- Restricted list ADTs
- makes it possible to use optimised implementations
- e.g., circular queues
- deque = double-ended queue = stack + queue
- Implementations: linked lists, dynamic arrays
- ADT: priority queues
- Similar API as stacks/queues, but returning different element
- sorted arrays - makes insertion expensive
- unsorted arrays - makes removal expensive
- Implementations: heaps, etc.
- ADT: Sets and maps
- [1.4 Information retrieval: Sets and Maps]
- examples, use cases
- Implementations: arrays, hash tables
- ADT: Sorted (ordered?) sets and maps
- Implementations: search trees
- Low-level implementation: sorted dynamic arrays
- High-level implementation: sorted lists
- [4.6 Implementing Maps using Lists]
- [2.14 Arrays as Sets or Maps]
- ADT: Graphs
- [1.3.5 ADTs for Graphs]
- examples, use cases
- Terminology: vertices/nodes, edges, directed/undirected, weighted/unweighted (negative weights)
- quickly: MST, shortest path, topological order
- Implementations: adjacency list, adjacency matrix

### 6.2 Standard libraries
- Comparison with the standard Java API
- [1.3.6 Comparison with the standard Java API]
- Comparison with the Python standard library

## 7 ADTs: Lists, stacks, queues
- API and use cases for stacks, queues
- Briefly introduce deques
- Mention prio.queues as extension of queues – point forward to the prio.queue chapter

### 7.1 Lists
- [4 Lists]
- [4.1 The List ADT]
- [1.3.2 ADTs for Lists]
- Naive implementation: Static arrays: Fixed maximum size
- [4.2 Static Array-Based Lists]

### 7.2 Stacks
- [4.8 Stacks]

#### 7.2.1 Using stacks to implement recursion
- [4.9 Implementing Recursion]

### 7.3 Queues
- [4.10 Queues]

#### 7.3.1 Using queues for XXX

### 7.4 Double-ended queues, or deques
- Example: Spliterators in Java

### 7.5 Priority queues
- [7 Priority queues]

## 8 Sequential data structures
- [4 Lists]
- repetition of [4.1 The List ADT]
- repetition of [4.3 Dynamic Array-Based Lists]
- Note: priority queues are handled later

### 8.1 Linked lists
- [4.4 Linked Lists]
- compare with arrays: no random access, but easy to insert (if we have a pointer)

#### 8.1.1 Implementing stacks using linked lists
- [4.8.4 Linked List Stacks]

#### 8.1.2 Implementing queues using linked lists
- [4.10.2 Linked Queues]

#### 8.1.3 Double-linked lists
- [4.7 Doubly Linked Lists]
- Implementing deques

#### 8.1.4 Skip lists (advanced)
- randomised
- [6.7 Skip Lists]

### 8.2 Dynamic arrays
- Example: add a constant (bad)
- Double the size
- Multiply by a constant (example: Java x3/2, Python x9/8)
- part of [4.3 Dynamic Array-Based Lists]
- Note: this is Python lists

#### 8.2.1 Implementing stacks using dynamic arrays
- [4.8.1 Dynamic Array-Based Stacks]
- [4.8.2 Pushing to the Stack]
- [4.8.3 Popping from the Stack]

#### 8.2.2 Implementing queues using circular dynamic arrays
- [4.10.1 Array-Based Queues]
- Implementing deques

#### 8.2.3 Reducing the size of a dynamic array
- pitfall: don't halve the size when <50%

### 8.3 Comparing dynamic arrays and linked lists
- [4.5 Comparison of different Implementations]
- [4.8.5 Comparison of Array-Based and Linked Stacks]
- [4.10.3 Comparison of Array-Based and Linked Queues]

### 8.4 Chapter summary
- practice questions

## 9 Complexity Analysis 3: Amortisation
- amortised constant time
- inserting at the beginning is slow
- appending is fast

## 10 ADTs: sets and maps
- API for sets and maps
- Example implementation: using lists (dyn.arrays, linked lists)
- [1.3.3 ADTs for Sets]
- [1.4.1 Sets]
- [1.3.4 ADTs for Maps or Dictionaries]
- [1.4.2 Maps or dictionaries]
- Extension: [1.4.3 Multimaps]
- [1.4.5 How to implement sets and maps]
- Efficient implementations:
- hash tables → refer to chapter
- search trees → refer to chapter(s)

## 11 Hash tables
- hash tables are quite similar to arrays, so they fit better to introduce before trees
- introduction: to index general objects (e.g. strings), we can use a hash function to calculate an array index
- problem: how do we handle conflicts?
- need dynamic arrays!
- [8 Hashing]

### 11.1 Hash functions
- definitions
- distribution of values
- [8.1 Hash Function Principles]

#### 11.1.1 Sample hash functions
- the worst hash function (constant)
- [8.2 Sample Hash Functions]

#### 11.1.2 Converting objects to table indices
- hash + compress
- [8.4 Converting Objects to Table Indices]
- include all parts (but not calculated)

### 11.2 ADTs: sets and maps
- assuming no conflicts!
- (perfect hash function)

### 11.3 Separate chaining hash tables
- [8.3 Separate Chaining, or Open Hashing]
- Load factor, what is a good LF?
- When to resize

#### 11.3.1 Choice of underlying collection
- simple linked lists
- optimisation: use a balanced tree (Java does)

#### 11.3.2 Analysis
- assuming good hash function
- assuming bad hash function

### 11.4 Bucket hashing
- do we want this section? does anyone use bucket hashing?
- [8.5 Bucket Hashing]

### 11.5 Open addressing hash tables
- [8.6 Open Addressing]
- collision resolution: probing
- Load factor, what is a good LF?
- When to resize

#### 11.5.1 Probing
- linear probing
- [8.6.4 Linear probing]
- [8.6.5 The Problem with Linear Probing]

#### 11.5.2 Improved probing strategies
- [8.7 Improved Collision Resolution]

#### 11.5.3 Analysis
- [8.8 Analysis of Open Addressing]

#### 11.5.4 Deletion
- [8.9 Open Addressing, Deletion]

#### 11.5.5 Implementation details
- array of pairs, or two arrays
- how to store the lazy-deleted cells

### 11.6 Hashing in practice
- [8.10.1 Algorithmic complexity attacks]

#### 11.6.1 Good and bad hash functions
- what to think about, examples of good/bad hash functions
- cryptographic hash functions, why not use them?
- [8.10.2 Breaking hash functions]

#### 11.6.2 Perfect hash function
- is this something we want to include?

#### 11.6.3 Hash tables in Java and Python
- [8.10.3 How Java’s hash tables are implemented]
- [8.10.4 Hash functions and hash tables in Python]

### 11.7 Chapter summary
- practice questions

## 12 Trees
- Generic chapter without any implementations
- General trees
- Binary trees
- Binary search trees
- Properties
- depth, size
- Complete trees
- Balanced trees
- Traversals

## 13 Binary trees
- [5 Binary Trees]

### 13.1 Definitions and properties
- [5.1 Definitions and Properties]
- balanced trees
- complete trees
- useful in the heap chapter (refer to later)

#### 13.1.1 Binary trees are recursive
- [5.2 Binary Tree as a Recursive Data Structure]

#### 13.1.2 The full binary tree theorem
- [5.4 The Full Binary Tree Theorem]

### 13.2 Implementing binary trees
- [5.3 Binary Tree Node Implementations]

#### 13.2.1 Space requirements
- [5.8 Binary Tree Space Requirements]

### 13.3 Traversing a binary tree
- [5.5 Binary Tree Traversals]
- inorder, preorder, postorder

#### 13.3.1 Implementing tree traversals
- [5.6 Implementing Tree Traversals]

#### 13.3.2 Information flow
- is there a better name of this section?
- [5.7 Information Flow in Recursive Functions]
- [5.9 A Hard Information Flow Problem]

### 13.4 Chapter summary
- practice questions

## 14 Implementing priority queues
- Recap of the ADT for prio queues
- [7 Priority queues]
- [7.2.3 Binary Heaps as Priority Queues]

### 14.1 Binary heaps
- complete tree
- [7.2 Heaps and Priority Queues]

#### 14.1.1 Implementing binary heaps
- [7.1 Array Representation for Complete Binary Trees]

#### 14.1.2 Inserting
- [7.2 Heaps and Priority Queues]

#### 14.1.3 Removing
- [7.2.2 Removing from the heap or updating an object’s priority]

#### 14.1.4 Turning an array into a binary heap
- [7.2.1 Building a Heap]

#### 14.1.5 Changing the priority of elements
- [7.2.3.1 Changing the priority of elements]

#### 14.1.6 Heapsort
- [7.3 Heapsort]
- analysis
- comparison with quicksort (guaranteed complexity, often somewhat slower)

### 14.2 Meldable heaps

#### 14.2.1 Leftist heap

#### 14.2.2 Skew heap

#### 14.2.3 Binomial heaps

### 14.3 Use case: Huffman coding
- [7.4 Huffman Coding Trees]

### 14.4 Chapter summary
- practice questions

## 15 ADTs: Sorted maps & sets
- [1.4.4 Between X and Y: Sorted Sets and Maps]
- [1.4.5 How to implement sets and maps]

## 16 Binary search trees

### 16.1 Basic BSTs
- [6.1 Binary Search Tree Definition]

#### 16.1.1 Implementing binary search trees
- inserting, finding, deleting

#### 16.1.2 Searching

#### 16.1.3 Inserting

#### 16.1.4 Deleting

#### 16.1.5 Guided information flow
- is there a better name?
- [6.2 Binary Tree Guided Information Flow]

#### 16.1.6 Range queries, floor/ceiling
- this cannot be done with hash tables
- ADT: Sorted sets/maps

### 16.2 Self-balancing trees
- [6.3 Balanced Trees]

#### 16.2.1 Tree rotations
- overall idea of rotating in a tree

### 16.3 AVL trees
- [6.4 The AVL Tree]
- implementation: small addition to BST nodes
- finding is the same as for BST

#### 16.3.1 Rotations
- [6.4.1 Rotations]

#### 16.3.2 Insertion
- [6.4.2 AVL tree insertion]

#### 16.3.3 Deletion

#### 16.3.4 Analysis
- max depth of an AVL tree

### 16.4 Splay trees
- [6.6 The Splay Tree]
- same structure as for AVL trees

### 16.5 Other self-balancing binary search trees
- list some examples

#### 16.5.1 Tries

#### 16.5.2 TST (ternary search trees)

### 16.6 Analogy between search trees and quicksort
- quicksort == BST
- multikey quicksort / radix sort == TST
- etc (see article by Sedgewick and Wayne)

### 16.7 Chapter summary
- practice questions

## 17 General trees
- [5.10 General Trees]
- traversal: preorder, postorder (no inorder)
- use cases

### 17.1 2-3 trees
- always completely balanced

#### 17.1.1 2-3-4 trees and red-black trees
- show the analogy between 2-3-4 trees and RB trees
- and between 2-3 trees and left-leaning RB trees
- [6.5 The Red-Black Tree] - this is very crude, perhaps better to start over

### 17.2 B-trees
- use cases

### 17.3 General trees (rose trees)
- how to implement
- similarity with graphs
- [5.12 Sequential Tree Representations]

### 17.4 The union/find algorithm
- [5.11 The Union/Find Algorithm]

### 17.5 Chapter summary
- practice questions

## 18 Graphs
- [9 Graphs]

### 18.1 Definitions and properties
- Directed / undirected
- Weighted / unweighted
- [9.1 Graph Representations]

#### 18.1.1 Implementing graphs
- [9.2 Graph Implementations]

### 18.2 Traversing a graph
- [9.3 Graph Traversals]

#### 18.2.1 Depth-first search
- [9.3.1 Depth-First Search]

#### 18.2.2 Breadth-first search
- [9.3.2 Breadth-First Search]

### 18.3 Minimal spanning trees
- [9.6 Minimal Cost Spanning Trees]

#### 18.3.1 Kruskal's algorithm
- [9.6.3 Kruskal’s Algorithm]

#### 18.3.2 Prim's algorithm
- [9.6.1 Prim’s Algorithm]
- [9.6.2 Prim’s Algorithm, Priority Queue Implementation]

### 18.4 Shortest-paths problems
- [9.5 Shortest-Paths Problems]
- unweighted graphs = BFS

#### 18.4.1 Dijktra's algorithm

#### 18.4.2 Implementing Dijkstra's algorithm

#### 18.4.3 Advanced: A*

#### 18.4.4 Topological Sort
- [9.4 Topological Sort]

#### 18.4.5 All-pairs shortest paths
- [9.7 All-Pairs Shortest Paths]

#### 18.4.6 Graphs with negative weights

### 18.5 Generic graph search

### 18.6 Chapter summary
- practice questions
- [9.8 Graph Concepts Summary]
