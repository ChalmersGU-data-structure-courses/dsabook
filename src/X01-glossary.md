
# Glossary

::: glossary

### 2-3 tree

A specialized form of the [B-tree]{.term}
where each internal node has either 2 children or 3 children. Key
values are ordered to maintain the
[binary search tree property]{.term}. The
2-3 tree is always height balanced, and its insert, search, and
remove operations all have $\Theta(\log n)$ cost.

### 80/20 rule

Given a typical application where there is a collection of records
and a series of search operations for records, the 80/20 rule is an
empirical observation that 80% of the record accessess typically go
to 20% of the records. The exact values varies between data
collections, and is related to the concept of
[locality of reference]{.term}.

### abstract data type
### ADT

Abbreviated ADT. The specification
of a [data type]{.term} within some
language, independent of an implementation. The
[interface]{.term} for the ADT is defined in
terms of a [type]{.term} and a set of
operations on that type. The behavior of each operation is
determined by its inputs and outputs. An ADT does not specify *how*
the data type is implemented. These implementation details are
hidden from the user of the ADT and protected from outside access, a
concept referred to as [encapsulation]{.term}.

### accept

When a [finite automata]{.term} executes on
a string and terminates in an [accepting state]{.term},
it is said to accept the string. The finite automata
is said to accept the language that consists of all strings for
which the finite automata completes execution in an accepting state.

### accepting state

Part of the definition of a [finite automata]{.term}
is to designate some [states](#state){.term}
as accepting states. If the finite automata executes on
an input string and completes the computation in an accepting state,
then the machine is said to [accept]{.term}
the string.

### activation record

The entity that is stored on the [runtime stack]{.term}
during program execution. It stores any active
[local variable]{.term} and the return
address from which a new subroutine is being called, so that this
information can be recovered when the subroutine terminates.

### acyclic graph

In [graph]{.term} terminology, a graph that
contains no [cycles](#cycle){.term}.

### address

A location in memory.

### adjacent

Two [nodes](#node){.term} of a
[tree]{.term} or two
[vertices](#vertex){.term} of a
[graph]{.term} are said to be adjacent if
they have an [edge]{.term} connecting them.
If the edge is directed from $a$ to $b$, then we say that $a$ is
adjacent to $b$, and $b$ is adjacent from $a$.

### adjacency list

An implementation for a [graph]{.term} that
uses an (array-based) [list]{.term} to
represent the [vertices](#vertex){.term} of
the graph, and each vertex is in turn represented by a (linked) list
of the vertices that are [neighbors](#neighbor){.term}.

### adjacency matrix

An implementation for a [graph]{.term} that
uses a 2-dimensional [array]{.term} where
each row and each column corresponds to a [vertex]{.term}
in the [graph]{.term}. A given
row and column in the matrix corresponds to an edge from the
[vertex]{.term} corresponding to the row to
the vertex corresponding to the column.

### adversary

A fictional construct introduced for use in an
[adversary argument]{.term}.

### adversary argument

A type of [lower bounds proof]{.term} for a
problem where a (fictional) "adversary" is assumed to control
access to an algorithm's input, and which yields information about
that input in such a way that will drive the cost for any proposed
algorithm to solve the problem as high as possible. So long as the
adversary never gives an answer that conflicts with any previous
answer, it is permitted to do whatever necessary to make the
algorithm require as much cost as possible.

### algorithm

A method or a process followed to solve a
[problem]{.term}.

### asymptotic complexity

The [growth rate]{.term} or
[order of growth]{.term} of the
[complexity]{.term} of an algorithm or
problem. There are several independent categories of qualifiers for
(asymptotic) complexity:

-   [time complexity]{.term} (default),
    [space complexity]{.term}, complexity in
    some other cost,
-   [worst case]{.term} (default),
    [average case]{.term},
    [best case]{.term},
-   whether to use
    [amortized complexity](#amortized-analysis){.term}.

### alias

Another name for something. In programming, this usually refers to
two [references](#reference){.term} that
refer to the same object.

### allocated allocation

Reserving memory for an object in the heap memory.

### all-pairs shortest paths problem

Given a [graph]{.term} with
[weights](#weight){.term} or distances on
the [edges](#edge){.term}, find the shortest
paths between every pair of vertices in the graph. One approach to
solving this problem is [Floyd's algorithm]{.term},
which uses the [dynamic programming]{.term}
algorithmic technique.

### alphabet

The characters or symbols that strings in a given language may be
composed of.

### alphabet trie

A [trie]{.term} data structure for storing
variable-length strings. Level $i$ of the tree corresponds to the
letter in position $i$ of the string. The root will have potential
branches on each intial letter of string. Thus, all strings starting
with "a" will be stored in the "a" branch of the tree. At the
second level, such strings will be separated by branching on the
second letter.

### amortized analysis

Analysing the [amortized complexity]{.term}
of an [algorithm]{.term} or
[problem]{.term}.

### amortized complexity

A modification to the notion of [complexity]{.term}
for operations on a data structure where, for each
fixed input size, one does not just look at the cost of a single run
of the operation, but its [amortized cost]{.term}
over sufficiently long series of operations of the same
kind. This can be made precise without considering averages by
introducing [potentials](#potential){.term}.

### amortized cost

The average cost of an operation in a sufficiently long series of
operations of the same kind. This is as opposed to considering every
individual operation to independently have its own cost, which might
lead to an overestimate for the total cost of the series. This can
be made precise without considering averages by introducing
[potentials](#potential){.term}.

In [amortized analysis]{.term}, gives rise
to the notion of [amortized complexity]{.term}.

### ancestor

In a tree, for a given node $A$, any node on a
[path]{.term} from $A$ up to the root is an
ancestor of $A$.

### antisymmetric

In set notation, relation $R$ is antisymmetric if whenever $aRb$ and
$bRa$, then $a = b$, for all $a, b \in \mathbf{S}$.

### approximation algorithm

An algorthm for an [optimization problem]{.term}
that finds a good, but not necessarily cheapest,
solution.

### arm

In the context of an [I/O head]{.term}, this
attaches the sensor on the I/O head to the [boom]{.term}.

### array

A [data type]{.term} that is used to store
elements in consecutive memory locations and refers to them by an
index.

### array-based list

An implementation for the [list]{.term} ADT
that uses an [array]{.term} to store the
list elements. Typical implementations fix the array size at
creation of the list, and the [overhead]{.term}
is the number of array positions that are presently
unused.

### array-based stack

Analogous to an [array-based list]{.term},
this uses an [array]{.term} to store the
elements when implementing the [stack]{.term}
ADT.

### array-based queue

Analogous to an [array-based list]{.term},
this uses an [array]{.term} to store the
elements when implementing the [queue]{.term}
ADT.

### ASCII character coding

*American Standard Code for Information Interchange*. A commonly used
method for encoding characters using a binary code. Standard ASCII
uses an 8-bit code to represent upper and lower case letters,
digits, some punctuation, and some number of non-printing characters
(such as carrage return). Now largely replaced by UTF-8 encoding.

### assembly code

A form of [intermediate code]{.term} created
by a [compiler]{.term} that is easy to
convert into the final form that the computer can execute. An
assembly language is typically a direct mapping of one or a few
instructions that the CPU can execute into a mnemonic form that is
relatively easy for a human to read.

### asymptotic analysis
### asymptotic algorithm analysis
### algorithm analysis

A method for estimating the efficiency of an algorithm or computer
program by identifying its [asymptotic complexity]{.term},
the [growth rate]{.term} of
its complexity function. Asymptotic analysis also gives a way to
define the inherent difficulty of a [problem]{.term}.
We frequently use the term algorithm analysis to mean the same thing.

### average case

In [algorithm analysis]{.term}, specifically
[complexity]{.term} of an algorithm, the
average of the costs for all 
[problem instances](#problem-instance){.term} of a given input
size $n$. If not all problem instances have equal probability of
occurring, then the average case must be calculated using a weighted
average that is specified with the problem (for example, every input
may be equally likely). Every input size $n$ has its own average
case. We **never** consider the average case as removed from input
size.

### average seek time

Expected (average) time to perform a [seek]{.term}
operation on a [disk drive]{.term},
assuming that the seek is between two randomly
selected tracks. This is one of two metrics commonly provided by
disk drive vendors for disk drive performance, with the other being
[track-to-track seek time]{.term}.

### AVL tree

A variant implementation for the [BST]{.term},
which differs from the standard BST in that it uses
modified insert and remove methods in order to keep the tree
[balanced](#balanced-tree){.term}. Similar
to a [splay tree]{.term} in that it uses the
concept of [rotations](#rotation){.term} in
the insert and remove operations.

### B+ tree

The most commonly implemented form of [B-tree]{.term}.
A B+ tree does not store data at the
[internal nodes](#internal-node){.term}, but
instead only stores [search key]{.term}
values as direction finders for the purpose of searching through the
tree. Only the [leaf nodes](#leaf-node){.term}
store a [reference]{.term} to
the actual data records.

### B* tree

A variant on the [B+ tree]{.term}. The B* tree is identical to the B+ tree, 
except for the rules used to split and merge nodes. Instead of splitting a
node in half when it overflows, the B* tree gives some
records to its neighboring sibling, if possible. If the sibling is
also full, then these two nodes split into three. Similarly, when a
node underflows, it is combined with its two siblings, and the total
reduced to two nodes. Thus, the nodes are always at least two thirds
full.

### B-tree

A method for [indexing]{.term} a large
collection of records. A B-tree is a
[balanced tree]{.term} that typically has
high branching factor (commonly as much as 100
[children](#child){.term} per
[internal node]{.term}), causing the tree to
be very shallow. When stored on disk, the node size is selected to
be same as the desired unit of I/O (hence some multiple of the disk
[sector]{.term} size). This makes it easy to
gain access to the record associated with a given
[search key]{.term} stored in the tree with
few [disk accesses](#disk-access){.term}.
The most commonly implemented variant of the B-tree is the
[B+ tree]{.term}.

### backing storage

In the context of a [caching]{.term} system
or [buffer pool]{.term}, backing storage is
the relatively large but slower source of data that needs to be
cached. For example, in a [virtual memory]{.term},
the disk drive would be the backing storage. In the
context of a web browser, the Internet might be considered the
backing storage.

### backtracking

A [heuristic]{.term} for brute-force search
of a solution space. It is essentially a
[depth-first search]{.term} of the solution
space. This can be improved using a
[branch-and-bounds algorithm]{.term}.

### bad reference

A reference is referred to as a bad reference if it is allocated but
not initialized.

### bag

In set notation, a bag is a collection of elements with no order
(like a set), but which allows for duplicate-valued elements (unlike a set).

### balanced tree

A [tree]{.term} where the
[subtrees](#subtree){.term} meet some
criteria for being balanced. Two possibilities are that the tree is
[height balanced]{.term}, or that the tree
has a roughly equal number of [nodes](#node){.term}
in each subtree.

### base case

In [recursion]{.term} or
[proof by induction]{.term}, the base case
is the termination condition. This is a simple input or value that
can be solved (or proved in the case of induction) without resorting
to a recursive call (or the [induction hypothesis]{.term}).

### base class

In
[object-oriented programming](#object-oriented-programming-paradigm){.term},
a class from which another class
[inherits](#inherit){.term}. The class that
inherits is called a [subclass]{.term}.

### base type

The [data type]{.term} for the elements in a
set. For example, the set might consist of the integer values 3, 5,
and 7. In this example, the base type is integers.

### basic operation

Examples of basic operations include inserting a data item into the
data structure, deleting a [data item]{.term}
from the data structure, and finding a specified
[data item]{.term}.

### best case

In [algorithm analysis]{.term}, specifically
[complexity]{.term} of an algorithm, the
[problem instance]{.term} from among all
problem instances for a given input size $n$ that has least cost.
Every input size $n$ has its own best case. We **never** consider
the best case as removed from input size.

### best fit

In a [memory manager]{.term}, best fit is a
[heuristic]{.term} for deciding which
[free block]{.term} to use when allocating
memory from a [memory pool]{.term}. Best fit
will always allocate from the smallest
[free block]{.term} that is large enough to
service the memory request. The rationale is that this will be the
method that best preserves large blocks needed for unusually large
requests. The disadvantage is that it tends to cause
[external fragmentation]{.term} in the form
of small, unuseable memory blocks.

### big-Oh notation

For [growth rates](#growth-rate){.term} $f$
and $g$, we write $f \in O(g)$ to say that $g$ is an
[upper bound]{.term} for $f$. The notation
can be made sense of by defining $O(g)$ as the set of
functions with growth rate less than or equal to that of
$g$. The notation is often somewhat imprecisely used as
$f(n) \in O(g(n))$ or even $f(n) = O(g(n))$.

### binary insert sort

A variation on [insertion sort]{.term} where
the position of the value being inserted is located by binary
search, and then put into place. In normal usage this is not an
improvement on standard insertion sort because of the expense of
moving many items in the [array]{.term}. But
it is directly useful if the cost of comparison is high compared to
that of moving an element, or is theoretically useful if we only
care to count the cost of comparisons.

### binary search

A standard [recursive](#recursion){.term}
algorithm for finding the [record]{.term}
with a given [search key]{.term} value
within a sorted list. It runs in $O(\log n)$ time. At each step,
look at the middle of the current sublist, and throw away the half
of the records whose keys are either too small or too large.

### binary search tree
### BST

A binary tree that imposes the following constraint on its node
values:   The [search key]{.term} value for
any node $A$ must be greater than the (key) values for all nodes in
the left [subtree]{.term} of $A$, and less
than the key values for all nodes in the right subtree of $A$. Some
convention must be adopted if multiple nodes with the same key value
are permitted, typically these are required to be in the right
subtree.

### binary search tree property

The defining relationship between the [key]{.term}
values for [nodes](#node){.term}
in a [BST]{.term}. All nodes
stored in the left subtree of a node whose key value is $K$ have key
values less than or equal to $K$. All nodes stored in the right
subtree of a node whose key value is $K$ have key values greater
than $K$.

### binary tree

A finite set of nodes which is either empty, or else has a root node
together two binary trees, called the left and right
[subtrees](#subtree){.term}, which are
[disjoint]{.term} from each other and from
the [root]{.term}.

### binary trie

A [binary tree]{.term} whose structure is
that of a [trie]{.term}. Generally this is
an implementation for a [search tree]{.term}.
This means that the [search key]{.term}
values are thought of a binary digits, with the digit
in the position corresponding to this a node's
[level]{.term} in the tree indicating a left
branch if it is "0", or a right branch if it is "1". Examples
include the [Huffman coding tree]{.term} and
the [Bintree]{.term}.

### binning

In [hashing]{.term}, binning is a type of
[hash function]{.term}. Say we are given
keys in the range 0 to 999, and have a hash table of size 10. In
this case, a possible hash function might simply divide the key
value by 100. Thus, all keys in the range 0 to 99 would hash to slot
0, keys 100 to 199 would hash to slot 1, and so on. In other words,
this hash function "bins" the first 100 keys to the first slot,
the next 100 keys to the second slot, and so on. This approach tends
to make the hash function dependent on the distribution of the
high-order bits of the keys.

### bintree

A [spatial data structure]{.term} in the
form of binary [trie]{.term}, typically used
to store point data in two or more dimensions. Similar to a
[PR quadtree]{.term} except that at each
level, it splits one dimension in half. Since many leaf nodes of the
PR quadtree will contain no data points, implementation often makes
use of the [flyweight]{.term}
[design pattern]{.term}.

### binsort

A sort that works by taking each record and placing it into a bin
based on its value. The bins are then gathered up in order to sort
the list. It is generally not practical in this form, but it is the
conceptual underpinning of the [radix sort]{.term}.

### bitmap
### bit vector

An [array]{.term} that stores
a single bit at each position. Typically these bits represent
[Boolean variable]{.term}s
associated with a collection of objects, such that the $i$ th bit is the
Boolean value for the $i$ th object.

### block

A unit of storage, usually referring to storage on a
[disk drive]{.term} or other
[peripheral storage]{.term} device. A block
is the basic unit of I/O for that device.

### Boolean expression

A Boolean expression is comprised of
[Boolean variable]{.term}
combined using the operators AND ($\cdot$), OR ($+$),
and NOT (to negate Boolean variable $x$ we write $\overline{x}$).

### Boolean variable

A variable that takes on one of the two values `True` and `False`.

### boom

In the context of an [I/O head]{.term}, is
the central structure to which all of the I/O heads are attached.
Thus, the all move together during a [seek]{.term}
operation.

### bounding box

A box (usually aligned to the coordinate axes of the reference
system) that contains a (potentially complex) object. In graphics
and computational geometry, complex objects might be associated with
a bounding box for use by algorithms that search for objects in a
particular location. The idea is that if the bounding box is not
within the area of interest, then neither is the object. Checking
the bounding box is cheaper than checking the object, but it does
require some time. So if enough objects are not outside the area of
interest, this approach will not save time. But if most objects are
outside of the area of interest, then checking bounding boxes first
can save a lot of time.

### branch-and-bounds algorithm

A variation on [backtracking]{.term} that
applies to
[optimization problems](#optimization-problem){.term}.
We traverse the [solution tree]{.term}
as with backtracking. Proceeding deeper in the solution
tree generally requires additional cost. We remember the best-cost
solution found so far. If the cost of the current branch in the tree
exceeds the best tour cost found so far, then we know to stop
pursuing this branch of the tree. At this point we can immediately
back up and take another branch.

### break-even point

The point at which two costs become even when measured as the
function of some variable. In particular, used to compare the space
requirements of two implementations. For example, when comparing the
space requirements of an [array-based list]{.term}
implementation versus a [linked list]{.term}
implementation, the key issue is how full the list is
compared to its capacity limit (for the array-based list). The point
where the two representations would have the same space cost is the
break-even point. As the list becomes more full beyond this point,
the array-based list implementation becomes more space efficent,
while as the list becomes less full below this point, the linked
list implementation becomes more space efficient.

### breadth-first search
### BFS

A [graph]{.term}
[traversal]{.term} algorithm. As the name
implies, all immediate [neighbors](#neighbor){.term}
for a [node]{.term} are
[visited](#visit){.term} before any
more-distant nodes are visited. BFS is driven by a
[queue]{.term}. A start vertex is placed on
the queue. Then, until the queue is empty, a node is taken off the
queue, visited, and and then any [unvisited]{.term}
neighbors are placed onto the queue.

### bubble sort

A simple sort that requires $Theta(n^2)$ time in
[best](#best-case){.term},
[average](#average-case){.term}, and
[worst](#worst-case){.term} cases. Even an
optimized version will normally run slower than
[insertion sort]{.term}, so it has little to
recommend it.

### bucket

In [bucket hashing]{.term}, a bucket is a
sequence of [slots](#slot){.term} in the
[hash table]{.term} that are grouped
together.

### bucket hashing

A method of [hashing]{.term} where multiple
[slots](#slot){.term} of the
[hash table]{.term} are grouped together to
form a [bucket]{.term}. The
[hash function]{.term} then either hashes to
some bucket, or else it hashes to a [home slot]{.term}
in the normal way, but this home slot is part of some
bucket.
[Collision resolution]{.term}
is handled first by attempting to find a free position
within the same bucket as the home slot. If the bucket if full, then
the record is placed in an [overflow bucket]{.term}.

### bucket sort

A variation on the [Binsort]{.term}, where
each bin is associated with a range of [key]{.term}
values. This will require some method of sorting the
records placed into each bin.

### buddy method

In a [memory manager]{.term}, an alternative
to using a [free block list]{.term} and a
[sequential fit]{.term} method to seach for
a suitable free block to service a
[memory request]{.term}. Instead, the memory
pool is broken down as needed into smaller chunks by splitting it in
half repeatedly until the smallest power of 2 that is as big or
bigger than the size of the memory request is reached. The name
comes from the fact that the binary representation for the start of
the block positions only differ by one bit for adjacent blocks of
the same size. These are referred to as "buddies" and will be
merged together if both are free.

### buffer

A block of memory, most often in [primary storage]{.term}.
The size of a buffer is typically one or a multiple of
the basic unit of I/O that is read or written on each access to
[secondary storage]{.term} such as a
[disk drive]{.term}.

### buffer passing

An approach to implementing the [ADT]{.term}
for a [buffer pool]{.term}, where a pointer
to a [buffer]{.term} is passed between the
client and the buffer pool. This is in contrast to a
[message passing]{.term} approach, it is
most likely to be used for long messages or when the message size is
always the same as the buffer size, such as when implementing a
[B-tree]{.term}.

### buffer pool

A collection of one or more [buffers](#buffer){.term}.
The buffer pool is an example of a
[cache](#caching){.term}. It is stored in
[primary storage]{.term}, and holds data
that is expected to be used in the near future. When a data value is
requested, the buffer pool is searched first. If the value is found
in the buffer pool, then [secondary storage]{.term}
need not be accessed. If the value is not found in the
buffer pool, then it must be fetched from secondary storage. A
number of traditional [heuristics](#heuristic){.term}
have been developed for deciding which data to
[flush]{.term} from the buffer pool when new
data must be stored, such as [least recently used]{.term}.

### buffering

A synonym for [caching]{.term}. More
specifically, it refers to an arrangement where all accesses to data
(such as on a [peripheral storage]{.term}
device) must be done in multiples of some minimum unit of storage.
On a [disk drive]{.term}, this basic or
smallest unit of I/O is a [sector]{.term}.
It is called "buffering" because the block of data returned by
such an access is stored in a [buffer]{.term}.

### caching

The concept of keeping selected data in
[main memory]{.term}. The goal is to have in
main memory the data values that are most likely to be used in the
near future. An example of a caching technique is the use of a
[buffer pool]{.term}.

### call stack

Known also as execution stack. A stack that stores the function call
sequence and the return address for each function.

### Cartesian product

For sets, this is another name for the
[set product]{.term}.

### ceiling

Written $\lceil x \rceil$, for real value $x$ the ceiling is the
least integer $\geq x$.

### child

In a tree, the set of [nodes](#node){.term}
directly pointed to by a node $R$ are the
[children](#child){.term} of $R$.

### circular first fit

In a [memory manager]{.term}, circular first
fit is a [heuristic]{.term} for deciding
which [free block]{.term} to use when
allocating memory from a [memory pool]{.term}.
Circular first fit is a minor modification on
[first fit]{.term} memory allocation, where
the last free block allocated from is remembered, and search for the
next suitable free block picks up from there. Like first fit, it has
the advantage that it is typically not necessary to look at all free
blocks on the free block list to find a suitable free block. And it
has the advantage over first fit that it spreads out memory
allocations evenly across the [free block list]{.term}.
This might help to minimize
[external fragmentation]{.term}.

### circular list

A [list]{.term} ADT implementation variant
where the last element of the list provides access to the first
element of the list.

### class

In the [object-oriented programming paradigm]{.term}
an ADT and its implementation together make up a class.
An instantiation of a class within a program is termed an
[object]{.term}.

### class hierarchy

In
[object-oriented programming](#object-oriented-programming-paradigm){.term},
a set of classes and their interrelationships. One of
the classes is the [base class]{.term}, and
the others are [subclasses](#subclass){.term}
that [inherit]{.term} either
directly or indirectly from the base class.

### clause

In a [Boolean expression]{.term}, a clause
is one or more [literals](#literal){.term}
OR'ed together.

### client

The user of a service. For example, the object or part of the
program that calls a [memory manager]{.term}
class is the client of that memory manager. Likewise the class or
code that calls a [buffer pool]{.term}.

### clique

In [graph]{.term} terminology, a clique is a
[subgraph]{.term}, defined as any
[subset]{.term} $U$ of the graph's
[vertices](#vertex){.term} such that every
vertex in $U$ has an [edge]{.term} to every
other vertex in $U$. The size of the clique is the number of
vertices in the clique.

### closed

A set is closed over a (binary) operation if, whenever the operation
is applied to two members of the set, the result is a member of the
set.

### closed-form solution

An algebraic equation with the same value as a
[summation]{.term} or
[recurrence relation]{.term}. The process of
replacing the summation or recurrence with its closed-form solution
is known as solving the summation or recurrence.

### cluster

In [file processing]{.term}, a collection of
physically adjacent [sectors](#sector){.term}
that define the smallest allowed allocation unit of
space to a disk file. The idea of requiring space to be allocated in
multiples of sectors is that this will reduce the number of
[extents](#extent){.term} required to store
the file, which reduces the expected number of
[seek]{.term} operations reuquired to
process a series of [disk accesses](#disk-access){.term}
to the file. The disadvantage of large cluster size is
that it increases [internal fragmentation]{.term}
since any space not actually used by the file in the
last cluster is wasted.

### code generation

A phase in a [compiler]{.term} that
transforms [intermediate code]{.term} into
the final executable form of the code. More generally, this can
refer to the process of turning a parse tree (that determines the
correctness of the structure of the program) into actual
instructions that the computer can execute.

### code optimization

A phase in a [compiler]{.term} that makes
changes in the code (typically [assembly code]{.term})
with the goal of replacing it with a version of the
code that will run faster while performing the same computation.

### cohesion

In
[object-oriented programming](#object-oriented-programming-paradigm){.term},
a term that refers to the degree to which a class has
a single well-defined role or responsibility.

### Collatz sequence

For a given integer value $n$, the sequence of numbers that derives
from performing the following computatin on $n$

``` cpp
while (n > 1)
  if (ODD(n))
    n = 3 * n + 1;
  else
    n = n / 2;
```

This is famous because, while it terminates for any value of $n$
that you try, it has never been proven to be a fact that this always
terminates.

### collision

In a [hash system]{.term}, this refers to
the case where two search [keys](#key){.term}
are mapped by the [hash function]{.term}
to the same slot in the [hash table]{.term}.
This can happen on insertion or search when another
record has already been hashed to that slot. In this case, a
[closed hash system]{.term} will require a
process known as [collision resolution]{.term}
to find the location of the desired record.

### collision resolution

The outcome of a [collision resolution policy]{.term}.

### collision resolution policy

In [hashing]{.term}, the process of
resolving a [collision]{.term}. Specifically
in a [closed hash system]{.term}, this is
the process of finding the proper position in a
[hash table]{.term} that contains the
desired record if the [hash function]{.term}
did not return the correct position for that record due to a
[collision]{.term} with another record.

### comparable

The concept that two objects can be compared to determine if they
are equal or not, or to determine which one is greater than the
other. In set notation, elements $x$ and $y$ of a set are comparable
under a given relation $R$ if either $xRy$ or $yRx$. To be reliably
compared for a greater/lesser relationship, the values being
compared must belong to a [total order]{.term}.
In programming, the property of a data type such that
two elements of the type can be compared to determine if they are
the same (a weaker version), or which of the two is larger (a
stronger version). `Comparable` is also the name of an
[interface]{.term} in Java that asserts a
comparable relationship between objects within a class, and
`.compareTo()` is the `Comparable` interface method that implements
the actual comparison between two objects of the class.

### comparator

A function given as a parameter to a method of a library (or
alternatively, a parameter for a C++ template or a Java generic).
The comparator function concept provides a generic way to encapulate
the process of performing a comparison between two objects of a
specific type. For example, if we want to write a generic sorting
routine, that can handle any record type, we can require that the
user of the sorting routine passes in a comparator function to
define how records in the collection are to be compared.

### comparison

The act of comparing two [keys](#key){.term}
or [records](#record){.term}. For many
[data types](#data-type){.term}, a
comparison has constant time cost. The number of comparisons
required is often used as a [measure of cost]{.term}
for sorting and searching algorithms.

### compiler

A computer program that reads computer programs and converts them
into a form that can be directly excecuted by some form of computer.
The major phases in a compiler include
[lexical analysis]{.term},
[syntax analysis]{.term},
[intermediate code generation]{.term},
[code optimization]{.term}, and
[code generation]{.term}. More broadly, a
compiler can be viewed as [parsing](#parser){.term} the program to verify that
it is syntactically correct, and then doing
[code generation]{.term} to convert the
hig-level program into something that the computer can execute.

### compile-time polymorphism

A form of [polymorphism]{.term} known as
Overloading. Overloaded methods have the same names, but different
signatures as a method available elsewhere in the class. Compare to
[run-time polymorphism]{.term}.

### complete binary tree

A binary tree where the nodes are filled in row by row, with the
bottom row filled in left to right. Due to this requirement, there
is only one tree of $n$ nodes for any value of $n$. Since storing
the records in an [array]{.term} in row
order leads to a simple mapping from a node's position in the array
to its [parent]{.term},
[siblings](#sibling){.term}, and
[children](#child){.term}, the array
representation is most commonly used to implement the complete
binary tree. The [heap]{.term} data
structure is a complete binary tree with partial ordering
constraints on the node values.

### complete graph

A [graph]{.term} where every
[vertex]{.term} connects to every other
vertex.

### complex number

In mathematics, an imaginary number, that is, a number with a real
component and an imaginary component.

### complexity

After fixing a [cost model]{.term} for a
problem, we can calculate the complexity function of an algorithm.
This sends an input size $n$ to the cost of running the algorithm on
input of that size. For each fixed $n$, we consider only
the [worst-case]{.term} input of
size $n$. This defines the worst-case complexity of the algorithm.
There is also the [average-case]{.term}
and [best-case]{.term}
complexity, which are defined similarly.

We speak of time complexity, space complexity, etc. depending on
what kind of cost our cost model captures. Here, time refers to
runtime and space refers to memory/storage. The case of time
complexity is the default, so we omit the word "time".

### composite design pattern

Given a class hierarchy representing a set of objects, and a
container for a collection of objects, the composite
[design pattern]{.term} addresses the
relationship between the object hierarchy and a bunch of behaviors
on the objects. In the composite design, each object is required to
implement the collection of behaviors. This is in contrast to the
procedural approach where a behavior (such as a tree
[traversal]{.term}) is implemented as a
method on the object collection (such as a [tree]{.term}).
Procedural tree traversal requires that the tree have
a method that understands what to do when it encounters any of the
object types ([internal](#internal-node){.term}
or [leaf nodes](#leaf-node){.term})
that the tree might contain. The composite approach
would have the tree call the "traversal" method on its root node,
which then knows how to perform the "traversal" behavior. This
might in turn require invoking the traversal method of other objects
(in this case, the children of the root).

### composite type
### aggregate type

A [data type]{.term} whose [members](#member){.term} have subparts. 
For example, a typical database record.

### composition

Relationships between classes based on usage rather than
[inheritance](#inherit){.term}, i.e. a
**HAS-A** relationship. For example, some code in class 'A' has a
[reference]{.term} to some other class
'B'.

### computability

A branch of computer science that deals with the theory of solving
problems through computation. More specificially, it deals with the
limits to what problems (functions) are computable. An example of a
famous problem that cannot in principle be solved by a computer is
the [halting problem]{.term}.

### computation

In a [finite automata]{.term}, a computation
is a sequence of [configurations](#configuration){.term}
for some length $n \geq 0$. In general, it is a series
of operations that the machine performs.

### computational complexity theory

A branch of the theory of computation in theoretical computer
science and mathematics that focuses on classifying computational
problems according to their inherent difficulty, and relating those
classes to each other. An example is the study of
[NP-Complete]{.term} problems.

### configuration

For a [finite automata]{.term}, a complete
specification for the current condition of the machine on some input
string. This includes the current [state]{.term}
that the machine is in, and the current condition of
the string, including which character is about to be processed.

### conjunctive normal form
### CNF

A [Boolean expression]{.term}
written as a series of [clauses](#clause){.term}
that are AND'ed together.

### connected component

In an [undirected graph]{.term}, a
[subset]{.term} of the
[nodes](#node){.term} such that each node in
the subset can be reached from any other node in that subset.

### connected graph

An [undirected graph]{.term} is a connected
graph if there is at least one path from any
[vertex]{.term} to any other.

### constant running time

The cost of a function whose running time is not related to its
input size. In Theta notation, this is traditionally written as
$\Theta(1)$.

### constructive induction

A process for finding the
[closed form](#closed-form-solution){.term}
for a [recurrence relation]{.term}, that
involves substituting in a guess for the closed form to replace the
recursive part(s) of the recurrence. Depending on the goal
(typically either to show that the hypothesized growth rate is
right, or to find the precise constants), one then manipulates the
resulting non-recursive equation.

### container
### container class

A [data structure]{.term}
that stores a collection of
[records](#record){.term}. Typical examples are
[arrays](#array){.term},
[search trees](#search-tree){.term}, and
[hash tables](#hash-table){.term}.

### context-free grammar

A [grammar]{.term} comprised only of
productions of the form $A \rightarrow x$ where $A$ is a
[non-terminal]{.term} and $x$ is a series of
one or more [terminals](#terminal){.term}
and non-terminals. That is, the given non-terminal $A$ can be
replaced at any time.

### context-free language

The set of [languages](#language){.term}
that can be defined by
[context-sensitive grammars](#context-sensitive-grammar){.term}.

### context-sensitive grammar

A [grammar]{.term} comprised only of
productions of the form $xAy \rightarrow xvy$ where $A$ is a
[non-terminal]{.term} and $x$ and $y$ are
each a series of one or more
[terminals](#terminal){.term} and
non-terminals. That is, the given non-terminal $A$ can be replaced
only when it is within the proper context.

### countably infinite
### countable

A [set]{.term} is
countably infinite if it contains a finite number of elements, or (for a
set with an infinite number of elements) if there exists a one-to-one
mapping from the set to the set of integers.

### cost

The amount of resources that given run of an algorithm consumes.

### cost model

In [algorithm analysis]{.term}, a definition
for the cost of each [basic operation]{.term}
performed by the algorithm, along with a definition for
the size of the input. Having these definitions allows us to
calculate the [cost]{.term} to run the
algorithm on a given input, and from there determine the
[complexity]{.term} of the algorithm.

By default, the cost model approximates the runtime of the program.
To stress this, we also speak of time complexity. It is also
possible to model other kinds of costs. In the case of
memory/storage, we speak of space complexity.

Looking at the [growth rate]{.term} of the
complexity function tells us the
[asymptotic complexity]{.term} of the
algorithm. A cost model would be considered "good" if it yields
predictions that conform to our understanding of reality.

### CPU

Acronym for *Central Processing Unit*, the primary processing device
for a computer.

### current position

A property of some list ADTs, where there is maintained a "current
position" state that can be referred to later.

### cycle

In [graph]{.term} terminology, a
[cycle]{.term} is a [path]{.term}
of length three or more that connects some
[vertex]{.term} $v_1$ to itself.

### cylinder

A [disk drive]{.term} normally consists of a
stack of [platters](#platter){.term}. While
this might not be so true today, traditionally all of the
[I/O heads](#i-o-head){.term} moved together
during a [seek]{.term} operation. Thus, when
a given I/O head is positioned over a particular
[track]{.term} on a platter, the other I/O
heads are also positioned over the corresponding track on their
platters. That collection of tracks is called a cylinder. A given
cylinder represents all of the data that can be read from all of the
platters without doing another seek operation.

### cylinder index

In the [ISAM]{.term} system, a simple
[linear index]{.term} that stores the lowest
key value stored in each [cylinder]{.term}.

### cylinder overflow

In the [ISAM]{.term} system, this is space
reserved for storing any records that can not fit in their
respective [cylinder]{.term}.

### data item

A piece of information or a record whose value is drawn from a type.

### data member
### data field
### attribute
### instance variable

In [object-oriented programming](#object-oriented-programming-paradigm){.term},
the variables that together define the space required by a data item
are referred to as data members. Some of the commonly used synonyms
include *data field*, *attribute*, and *instance variable*.

### data structure

The implementation for an [ADT]{.term}.

### data type

A type together with a collection of operations to manipulate the
type.

### deallocated
### deallocation

Free the memory allocated to an unused object.

### decision tree

A theoretical construct for modeling the behavior of algorithms.
Each point at which the algorithm makes a decision (such as an if
statement) is modeled by a branch in the tree that represents the
algorithms behavior. Decision trees can be used in
[lower bounds proofs](#lower-bounds-proof){.term},
such as the proof that sorting requires
$\Omega(n \log n)$ comparisons in the [worst case]{.term}.

### decision problem

A problem whose output is either "YES" or "NO".

### deep copy

Copying the actual content of a [pointee]{.term}.

### degree

In [graph]{.term} terminology, the degree
for a [vertex]{.term} is its number of
[neighbors](#neighbor){.term}. In a
[directed graph]{.term}, the
[in degree]{.term} is the number of edges
directed into the vertex, and the [out degree]{.term}
is the number of edges directed out of the vertex. In
[tree]{.term} terminology, the degree for a
[node]{.term} is its number of
[children](#child){.term}.

### delegation mental model for recursion

A way of thinking about the process of [recursion]{.term}.
The recursive function "delegates" most of the work
when it makes the recursive call. The advantage of the delegation
mental model for recursion is that you don't need to think about
how the delegated task is performed. It just gets done.

### dense graph

A [graph]{.term} where the actual number of
[edges](#edge){.term} is a large fraction of
the possible number of edges. Generally, this is interpreted to mean
that the [degree]{.term} for any
[vertex]{.term} in the graph is relatively
high.

### depth

The depth of a node $M$ in a tree is the length of the path from the
root of the tree to $M$.

### depth-first search
### DFS

A [graph]{.term}
[traversal]{.term} algorithm. Whenever a $v$
is [visited](#visit){.term} during the
traversal, DFS will [recursively](#recursion){.term}
visit all of $v$ 's [unvisited]{.term}
[neighbors](#neighbor){.term}.

### depth-first search tree

A [tree]{.term} that can be defined by the
operation of a [depth-first search]{.term}
(DFS) on a [graph]{.term}. This tree would
consist of the [nodes](#node){.term} of the
graph and a subset of the [edges](#edge){.term}
of the graph that was followed during the DFS.

### dequeue

A specialized term used to indicate removing an element from a
queue.

### dereference

Accessing the value of the [pointee]{.term}
for some [reference]{.term} variable.
Commonly, this happens in a language like Java when using the
"dot" operator to access some field of an object.

### derivation

In formal languages, the process of executing a series of
[production rules](#production-rule){.term}
from a [grammar]{.term}. A typical example
of a derivation would be the series of productions executed to go
from the [start symbol]{.term} to a given
string.

### descendant

In a tree, the set of all nodes that have a node $A$ as an
[ancestor]{.term} are the descendants of
$A$. In other words, all of the nodes that can be reached from $A$
by progressing downwards in tree. Another way to say it is:   The
[children](#child){.term} of $A$, their
children, and so on.

### deserialization

The process of returning a
[serialized](#serialization){.term}
representation for a data structure back to its original in-memory
form.

### design pattern

An abstraction for describing the design of programs, that is, the
interactions of objects and classes. Experienced software designers
learn and reuse patterns for combining software components, and
design patterns allow this design knowledge to be passed on to new
programmers more quickly.

### deterministic

Any [finite automata]{.term} in which, for
every pair of [state]{.term} and symbol,
there is only a single transition. This means that whenever the
machine is in a given state and sees a given symbol, only a single
thing can happen. This is in contrast to a
[non-deterministic]{.term} finite automata,
which has at least one state with multiple transitions on at least
one symbol.

### deterministic algorithm

An algorithm that does not involve any element of randomness, and so
its behavior on a given input will always be the same. This is in
contrast to a [randomized algorithm]{.term}.

### deterministic finite automata
### deterministic finite acceptor
### DFA

An [automata]{.term} or abstract machine that can
process an input string (shown on a tape) from left to right. There is a
control unit (with [states](#state){.term}),
behavior defined for what to do when in a given state and with a given
symbol on the current square of the tape. All that we can "do" is
change state before going to the next letter to the right.

### diagonalization argument

A proof technique for proving that a set is
[uncountably infinite]{.term}. The approach
is to show that, no matter what order the elements of the set are
put in, a new element of the set can be constructed that is not in
that ordering. This is done by changing the $i$ th value or position
of the element to be different from that of the $i$ th element in
the proposed ordering.

### dictionary

An abstract data type or [interface]{.term}
for a data structure or software subsystem that supports insertion,
search, and deletion of records.

### dictionary search

A close relative of an [interpolation search]{.term}.
In a classical (paper) dictionary of words in a
natural language, there are markings for where in the dictionary the
words with a given letter start. So in typical usage of such a
dictionary, words are found by opening the dictionary to some
appropriate place within the pages that contain words starting with
that letter.

### Dijkstra's algorithm

An algorithm to solve the
[single-source shortest paths problem]{.term}
in a [graph]{.term}. This is a
[greedy algorithm]{.term}. It is nearly
identical to [Prim's algorithm]{.term} for
finding a [minimal-cost spanning tree]{.term},
with the only difference being the calculation done to
update the best-known distance.

### diminishing increment sort

Another name for [Shellsort]{.term}.

### direct access

A storage device, such as a disk drive, that has some ability to
move to a desired data location more-or-less directly. This is in
contrast to a [sequential access]{.term}
storage device such as a tape drive.

### direct proof

In general, a direct proof is just a "logical explanation". A
direct proof is sometimes referred to as an argument by deduction.
This is simply an argument in terms of logic. Often written in
English with words such as "if \... then", it could also be
written with logic notation such as $P \Rightarrow Q$.

### directed acyclic graph
### DAG

A [graph]{.term} with no cycles. Abbreviated as DAG. Note that a DAG is not
necessarily a [tree]{.term} since a given [node]{.term} might have multiple
[parents](#parent){.term}.

### directed edge

An [edge]{.term} that goes from
[vertex]{.term} to another. In contrast, an
[undirected edge]{.term} simply links to
vertices without a direction.

### directed graph
### digraph

A [graph]{.term} whose
[edges](#edge){.term} each are directed from
one of its defining [vertices](#vertex){.term}
to the other.

### dirty bit

Within a [buffer pool]{.term}, a piece of
information associated with each [buffer]{.term}
that indicates whether the contents of the buffer have
changed since being read in from [backing storage]{.term}.
When the buffer is [flushed](#flush){.term}
from the buffer pool, the buffer's contents must be
written to the backing storage if the dirty bit is set (that is, if
the contents have changed). This means that a relatively expensive
write operation is required. In contrast, if the dirty bit is not
set, then it is unnecessary to write the contents to backing
storage, thus saving time over not keeping track of whether the
contents have changed or not.

### discrete Fourier transform
### DFT

Let $a = [a_0, a_1, ..., a_{n-1}]^T$ be a
vector that stores the coefficients for a polynomial being evaluated. We
can then do the calculations to evaluate the polynomial at the $n$ th
$roots of unity <nth roots of unit>$ by multiplying the $A_{z}$ matrix
by the coefficient vector. The resulting vector $F_{z}$ is called the
discrete Fourier transform (or DFT) for the polynomial.

### discriminator

A part of a [multi-dimensional search key]{.term}.
Certain tree data structures such as the
[bintree]{.term} and the
[kd tree]{.term} operate by making branching
decisions at nodes of the tree based on a single attribute of the
multi-dimensional key, with the attribute determined by the level of
the node in the tree. For example, in 2 dimensions, nodes at the odd
levels in the tree might branch based on the $x$ value of a
coordinate, while at the even levels the tree would branch based on
the $y$ value of the coordinate. Thus, the $x$ coordinate is the
discriminator for the odd levels, while the $y$ coordinate is the
discriminator for the even levels.

### disjoint

Two parts of a [data structure]{.term} or
two collections with no objects in common are disjoint. This term is
often used in conjunction with a data structure that has
[nodes](#node){.term} (such as a
[tree]{.term}). Also used in the context of
[sets](#set){.term}, where two
[subsets](#subset){.term} are disjoint if
they share no elements.

### disjoint sets

A collection of [sets](#set){.term}, any
pair of which share no elements in common. A collection of disjoint
sets partitions some objects such that every object is in exactly
one of the disjoint sets.

### disk-based space/time tradeoff

In contrast to the standard [space/time tradeoff]{.term},
this principle states that the smaller you can make
your disk storage requirements, the faster your program will run.
This is because the time to read information from disk is enormous
compared to computation time, so almost any amount of additional
computation needed to unpack the data is going to be less than the
disk-reading time saved by reducing the storage requirements.

### disk controller

The control mechanism for a [disk drive]{.term}.
Responsible for the action of reading or writing a
[sector]{.term} of data.

### disk drive

An example of [peripheral storage]{.term} or
[secondary storage]{.term}. Data access
times are typically measured in thousandths of a second
(milliseconds), which is roughly a million times slower than access
times for [RAM]{.term}, which is an example
of a [primary storage]{.term} device. Reads
from and writes to a disk drive are always done in terms of some
minimum size, which is typically called a [block]{.term}.
The block size is 512 bytes on most disk drives. Disk
drives and RAM are typical parts of a computer's
[memory hierarchy]{.term}.

### disk access

The act of reading data from a disk drive (or other form of
[peripheral storage]{.term}). The number of
times data must be read from (or written to) a disk is often a good
measure of cost for an algorithm that involves disk I/O, since this
is usually the dominant cost.

### disk I/O

Refers to the act of reading data from or writing data to a
[disk drive]{.term}. All disk reads and
writes are done in units of a [sector]{.term}
or [block]{.term}.

### distance

In [graph]{.term} representations, a synonym
for [weight]{.term}.

### divide and conquer

A technique for designing algorithms where a solution is found by
breaking the problem into smaller (similar) subproblems, solving the
subproblems, then combining the subproblem solutions to form the
solution to the original problem. This process is often implemented
using [recursion]{.term}.

### divide-and-conquer recurrences

A common form of [recurrence relation]{.term}
that have the form

$$\mathbf{T}(n) = a\mathbf{T}(n/b) + cn^k;\quad \mathbf{T}(1) = c$$

where $a$, $b$, $c$, and $k$ are constants. In general, this
recurrence describes a problem of size $n$ divided into $a$
subproblems of size $n/b$, while $cn^k$ is the amount of work
necessary to combine the partial solutions.

### divide-and-guess

A technique for finding a [closed-form solution]{.term}
to a [summation]{.term} or
[recurrence relation]{.term}.

### domain

The set of possible inputs to a function.

### double buffering

The idea of using multiple [buffers](#buffer){.term}
to allow the [CPU]{.term} to
operate in parallel with a [peripheral storage]{.term}
device. Once the first buffer's worth of data has been
read in, the CPU can process this while the next block of data is
being read from the peripheral storage. For this idea to work, the
next block of data to be processed must be known or predicted with
reasonable accuracy.

### double hashing

A [collision resolution]{.term} method. A
second hash function is used to generate a value $c$ on the key.
That value is then used by this key as the step size in
[linear probing by steps]{.term}. Since
different keys use different step sizes (as generated by the second
hash function), this process avoids the clustering caused by
standard linear probing by steps.

### double rotation

A type of [rebalancing operation]{.term}
used by the [splay tree]{.term} and
[AVL tree]{.term}.

### doubly linked list

A [linked list]{.term} implementation
variant where each list node contains access pointers to both the
previous element and the next element on the list.

### DSA

Abbreviation for *data structures and algorithms*.

### dynamic

Something that is changes (in contrast to [static]{.term}).
In computer programming, dynamic normally refers to
something that happens at run time. For example, run-time analysis
is analysis of the program's behavior, as opposed to its (static)
text or structure dynamic binding or dynamic memory allocation
occurs at run time.

### dynamic allocation

The act of creating an object from [free store]{.term}.
In C++, Java, and JavaScript, this is done using the
`new` operator.

### dynamic array

Arrays, once allocated, are of fixed size. A dynamic array puts an
[interface]{.term} around the array so as to
appear to allow the array to grow and shrink in size as necessary.
Typically this is done by allocating a new copy, copying the
contents of the old array, and then returning the old array to
[free store]{.term}. If done correctly, the
[amortized cost]{.term} for dynamically
resizing the array can be made constant. In some programming
languages such as Java, the term [vector]{.term}
is used as a synonym for dynamic array.

### dynamic memory allocation

A programming technique where linked objects in a data structure are
created from [free store]{.term} as needed.
When no longer needed, the object is either returned to
[free store]{.term} or left as
[garbage]{.term}, depending on the
programming language.

### dynamic programming

An approach to designing algorithms that works by storing a table of
results for subproblems. A typical cause for excessive cost in
[recursive](#recursion){.term} algorithms is
that different branches of the recursion might solve the same
subproblem. Dynamic programming uses a table to store information
about which subproblems have already been solved, and uses the
stored information to immediately give the answer for any repeated
attempts to solve that subproblem.

### edge

The connection that links two [nodes](#node){.term}
in a [tree]{.term},
[linked list]{.term}, or
[graph]{.term}.

### edit distance

Given strings $S$ and $T$, the edit distance is a measure for the
number of editing steps required to convert $S$ into $T$.

### efficient

A solution is said to be efficient if it solves the problem within
the required [resource constraints]{.term}.
A solution is sometimes said to be efficient if it requires fewer
resources than known alternatives, regardless of whether it meets
any particular requirements.

### element

One value or [member]{.term} in a set.

### empirical comparison

An approach to comparing to things by actually seeing how they
perform. Most typically, we are referring to the comparison of two
programs by running each on a suite of test data and measuring the
actual running times. Empirical comparison is subject to many
possible complications, including unfair selection of test data, and
inaccuracies in the time measurements due to variations in the
computing environment between various executions of the programs.

### empty

For a [container]{.term} class, the state of
containing no [elements](#element){.term}.

### encapsulation

In programming, the concept of hiding implementation details from
the user of an ADT, and protecting
[data members](#data-member){.term} of an
object from outside access.

### enqueue

A specialized term used to indicate inserting an element onto a
queue.

### entry-sequenced file

A file that stores records in the order that they were added to the
file.

### enumeration

The process by which a [traversal]{.term}
lists every object in the [container]{.term}
exactly once. Thus, a traversal that prints the
[nodes](#node){.term} is said to enumerate
the nodes. An enumeration can also refer to the actual listing that
is produced by the traversal (as well as the process that created
that listing).

### equidistribution property

In random number theory, this means that a given series of random
numbers cannot be described more briefly than simply listing it out.

### equivalence class

An [equivalence relation]{.term} can be used
to partition a set into equivalence classes.

### equivalence relation

Relation $R$ is an equivalence relation on set $\mathbf{S}$ if it is
[reflexive]{.term},
[symmetric]{.term}, and
[transitive]{.term}.

### estimation

As a technical skill, this is the process of generating a rough
estimate in order to evaluate the feasibility of a proposed
solution. This is sometimes known as "back of the napkin" or
"back of the envelope" calculation. The estimation process can be
formalized as (1) determine the major parameters that affect the
problem, (2) derive an equation that relates the parameters to the
problem, then (3) select values for the parameters and apply the
equation to yield an estimated solution.

### evaluation

The act of finding the value for a polynomial at a given point.

### exact-match query

Records are accessed by unique identifier.

### exceptions

Exceptions are techniques used to predict possible runtime errors
and handle them properly.

### exchange

A swap of adjacent records in an [array]{.term}.

### exchange sort

A sort that relies solely on exchanges (swaps of adjacent records)
to reorder the list.
[insertion sort]{.term} and
[bubble sort]{.term} are examples of
exchange sorts. All exchange sorts require $\Theta(n^2)$ time in the
[worst case]{.term}.

### expanding the recurrence

A technique for solving a [recurrence relation]{.term}.
The idea is to replace the recursive part of the
recurrence with a copy of recurrence.

### exponential growth rate

A [growth rate]{.term} function where $n$
(the input size) appears in the exponent. For example, $2^n$.

### expression tree

A [tree]{.term} structure meant to represent
a mathematical expression.
[Internal nodes](#internal-node){.term} of
the expression tree are operators in the expression, with the
subtrees being the sub-expressions that are its operand. All
[leaf nodes](#leaf-node){.term} are
operands.

### extent

A physically contiguous block of
[sectors](#sector){.term} on a
[disk drive]{.term} that are all part of a
given disk file. The fewer extents needed to store the data for a
disk file, generally the fewer [seek]{.term}
operations that will be required to process a series of
[disk access]{.term} operations on that
file.

### external fragmentation

A condition that arises when a series of
[memory requests](#memory-request){.term}
result in lots of small [free blocks](#free-block){.term},
no one of which is useful for servicing typical
requests.

### external sort

A sorting algorithm that is applied to data stored in
[peripheral storage]{.term} such as on a
[disk drive]{.term}. This is in contrast to
an [internal sort]{.term} that works on data
stored in [main memory]{.term}.

### factorial

The factorial function is defined as $f(n) = n f(n-1)$ for $n > 0$.

### failure policy

In a [memory manager]{.term}, a failure
policy is the response that takes place when there is no way to
satisfy a [memory request]{.term} from the
current [free blocks](#free-block){.term} in
the [memory pool]{.term}. Possibilities
include rejecting the request, expanding the memory pool, collecting
[garbage]{.term}, and reorganizing the
memory pool (to collect together free space).

### family of languages

Given some class or type of [finite automata]{.term}
(for example, the
[deterministic finite automata]{.term}), the
set of languages accepted by that class of finite automata is called
a family. For example, the
[regular languages](#regular-language){.term}
is a family defined by the DFAs.

### file allocation table

A legacy file system architecture orginially developed for DOS and
then used in Windows. It is still in use in many small-scale
peripheral devices such as USB memory sticks and digital camera
memory.

### file manager

A part of the [operating system]{.term}
responsible for taking requests for data from a
[logical file]{.term} and mapping those
requests to the physical location of the data on disk.

### file processing

The domain with computer science that deals with processing data
stored on a [disk drive]{.term} (in a file),
or more broadly, dealing with data stored on any
[peripheral storage]{.term} device. Two
fundamental properties make dealing with data on a peripheral device
different from dealing with data in main memory:   (1) Reading/writing
data on a peripheral storage device is far slower than
reading/writing data to main memory (for example, a typical disk
drive is about a million times slower than [RAM]{.term}).
(2) All I/O to a peripheral device is typically in
terms of a [block]{.term} of data (for
example, nearly all disk drives do all I/O in terms of blocks of 512
bytes).

### file structure

The organization of data on [peripheral storage]{.term},
such as a [disk drive]{.term}
or DVD drive.

### FIFO

Abbreviation for "first-in, first-out". This is the access
paradigm for a [queue]{.term}, and an old
terminology for the queue is "FIFO list".

### final state

A required element of any
[acceptor](#finite-state-acceptor){.term}.
When computation on a string ends in a final state, then the machine
accepts the string. Otherwise the machine rejects the string.

### FIND

One half of the [UNION/FIND]{.term}
algorithm for managing [disjoint sets]{.term}.
It is the process of moving upwards in a tree to find
the tree's root.

### finite state machine
### FSM
### finite state automata
### FSA
### finite automata
### state machine
### automata

Any abstract state machine, generally represented as a graph where the
nodes are the [states](#state){.term}, and the
edges represent transitions between nodes that take place when the
machine is in that node (state) and sees an appropriate input. See, as
an example, [deterministic finite automata]{.term}.

### finite state acceptor

A simple type of [finite state automata]{.term},
an acceptor's only ability is to accept or reject a
string. So, a finite state acceptor does not have the ability to
modify the input tape. If computation on the string ends in a
[final state]{.term}, then the the string is
accepted, otherwise it is rejected.

### first fit

In a [memory manager]{.term}, first fit is a
[heuristic]{.term} for deciding which
[free block]{.term} to use when allocating
memory from a [memory pool]{.term}. First
fit will always allocate the first [free block]{.term}
on the [free block list]{.term}
that is large enough to service the memory request. The advantage of
this approach is that it is typically not necessary to look at all
free blocks on the free block list to find a suitable free block.
The disadvantage is that it is not "intelligently" selecting what
might be a better choice of free block.

### fixed-length coding

Given a collection of objects, a fixed-length coding scheme assigns
a code to each object in the collection using codes that are all of
the same length. Standard ASCII and Unicode representations for
characters are both examples of fixed-length coding schemes. This is
in contrast to [variable-length coding]{.term}.

### floor

Written $\lfloor x \rfloor$, for real value $x$ the floor is the
greatest integer $\leq x$.

### flush

The act of removing data from a [cache](#caching){.term},
most typically because other data considered of higher
future value must replace it in the cache. If the data being flushed
has been modified since it was first read in from
[secondary storage]{.term} (and the changes
are meant to be saved), then it must be written back to that
secondary storage.

### Floyd's algorithm

An algorithm to solve the
[all-pairs shortest paths problem]{.term}.
It uses the [dynamic programming]{.term}
algorithmic technique, and runs in $\Theta(n^3)$ time. As with any
[dynamic programming]{.term} algorithm, the
key issue is to avoid duplicating work by using proper bookkeeping
on the algorithm's progress through the solution space. The basic
idea is to first find all the direct edge costs, then improving
those costs by allowing paths through [vertex]{.term}
0, then the cheapest paths involving paths going
through vertices 0 and 1, and so on.

### flyweight

A [design pattern]{.term} that is meant to
solve the following problem:   You have an application with many
objects. Some of these objects are identical in the information that
they contain, and the role that they play. But they must be reached
from various places, and conceptually they really are distinct
objects. Because there is so much duplication of the same
information, we want to reduce memory cost by sharing that space.
For example, in document layout, the letter "C" might be
represented by an object that describes that character's strokes
and bounding box. However, we do not want to create a separate "C"
object everywhere in the document that a "C" appears. The solution
is to allocate a single copy of the shared representation for "C"
objects. Then, every place in the document that needs a "C" in a
given font, size, and typeface will reference this single copy. The
various instances of [references](#reference){.term}
to a specific form of "C" are called flyweights.
Flyweights can also be used to implement the empty leaf nodes of the
[bintree]{.term} and
[PR quadtree]{.term}.

### folding method

In [hashing]{.term}, an approach to
implementing a [hash function]{.term}. Most
typically used when the key is a string, the folding method breaks
the string into pieces (perhaps each letter is a piece, or a small
series of letters is a piece), converts the letter(s) to an integer
value (typically by using its underlying encoding value), and
summing up the pieces.

### Ford and Johnson sort

A sorting algorithm that is close to the theoretical minimum number
of key comparisons necessary to sort. Generally not considered
practical in practice due to the fact that it is not efficient in
terms of the number of records that need to be moved. It consists of
first sorting pairs of nodes into winners and losers (of the pairs
comparisons), then (recursively) sorting the winners of the pairs,
and then finally carefully selecting the order in which the losers
are added to the chain of sorted items.

### forest

A collection of one or more [trees](#tree){.term}.

### free block

A block of unused space in a [memory pool]{.term}.

### free block list

In a [memory manager]{.term}, the list that
stores the necessary information about the current
[free blocks](#free-block){.term}.
Generally, this is done with some sort of
[linked list]{.term}, where each node of the
linked list indicates the start position and length of the free
block in the [memory pool]{.term}.

### free store

Space available to a program during runtime to be used for
[dynamic allocation]{.term} of objects. The
free store is distinct from the [runtime stack]{.term}.
The free store is sometimes referred to as the
[heap]{.term}, which can be confusing
because [heap]{.term} more often refers to a
specific data structure. Most programming languages provide
functions to allocate (and maybe to deallocate) objects from the
free store, such as `new` in C++ and Java.

### freelist

A simple and faster alternative to using
[free store]{.term} when the objects being
dynamically allocated are all of the same size (and thus are
interchangeable). Typically implemented as a
[linked stack]{.term}, released objects are
put on the front of the freelist. When a request is made to allocate
an object, the freelist is checked first and it provides the object
if possible. If the freelist is empty, then a new object is
allocated from [free store]{.term}.

### free tree

A connected, [undirected graph]{.term} with
no simple cycles. An equivalent definition is that a free tree is
connected and has $|\mathbf{V}| - 1$ edges.

### frequency count

A [heuristic]{.term} used to maintain a
[self-organizing list]{.term}. Under this
heuristic, a count is maintained for every record. When a record
access is made, its count is increased. If this makes its count
greater than that of another record in the list, it moves up toward
the front of the list accordingly so as to keep the list sorted by
frequency. Analogous to the
[least frequently used]{.term} heuristic for
maintaining a [buffer pool]{.term}.

### full binary tree theorem

This theorem states that the number of leaves in a non-empty full
binary tree is one more than the number of internal nodes.
Equivalently, then number of null pointers in a standard
[pointer-based implementation for binary tree nodes]{.term}
is one more than the number of nodes in the binary
tree.

### full tree

A [binary tree]{.term} is full if every
[node]{.term} is either a
[leaf node]{.term} or else it is an
[internal node]{.term} with two non-empty
[children](#child){.term}.

### function

In mathematics, a matching between inputs (the
[domain]{.term}) and outputs (the
[range]{.term}). In programming, a
subroutine that takes input parameters and uses them to compute and
return a value. In this case, it is usually considered bad practice
for a function to change any global variables (doing so is called a
side effect).

### garbage

In [memory management](#memory-manager){.term},
any memory that was previously (dynamically) allocated
by the program during runtime, but which is no longer accessible
since all pointers to the memory have been deleted or overwritten.
In some languages, garbage can be recovered by
[garbage collection]{.term}. In languages
such as C and C++ that do not support garbage collection, so
creating garbage is considered a [memory leak]{.term}.

### garbage collection

Languages with garbage collection such Java, JavaScript, Lisp, and
Scheme will periodically reclaim [garbage]{.term}
and return it to [free store]{.term}.

### general tree

A tree in which any given node can have any number of
[children](#child){.term}. This is in
contrast to, for example, a [binary tree]{.term}
where each node has a fixed number of children (some of
which might be `null`). General tree nodes tend to be harder to
implement for this reason.

### grammar

A formal definition for what strings make up a
[language]{.term}, in terms of a set of
[production rules](#production-rule){.term}.

### graph

A [graph]{.term}
$\mathbf{G} = (\mathbf{V}, \mathbf{E})$ consists of a set of
[vertices](#vertex){.term} $\mathbf{V}$ and
a set of [edges](#edge){.term} $\mathbf{E}$,
such that each edge in $\mathbf{E}$ is a connection between a pair
of vertices in $\mathbf{V}$.

### greedy algorithm

An algorithm that makes locally optimal choices at each step.

### growth rate
### order of growth

The rate at which a function grows. How quickly the function grows
when its input grows. Also called its *order of growth*.

A function $f$ has growth rate bounded by a function $g$ if the
values of $f$ are eventually bounded by those of $g$ up to some
constant factor. We often shorten this (somewhat confusingly) by
saying that $f$ has growth rate $g$ or that $f$ has order of growth
$g$.

Formally, there are constants $n_0 \geq 0$ and $c > 0$ such that
$f(n) \leq c g(n)$ for all $n \geq n_0$. We then say that $f$ has
growth rate less or equal that of $g$ and write $f \in O(g)$ (big-Oh
notation). This defines the preorder of growth rates.

In [algorithm analysis]{.term}, we sometimes
speak of the growth rate of an [algorithm]{.term}.
By that, we mean the [growth rate]{.term}
of the [complexity]{.term} of
the algorithm, the rate at which the cost of the
[algorithm]{.term} grows as the size of its
input grows. This is also called the
[asymptotic complexity]{.term} of that
algorithm.

### guess-and-test

A technique used when trying to determine the
[closed-form solution]{.term} for a
[summation]{.term} or
[recurrence relation]{.term}. Given a
hypothesis for the closed-form solution, if it is correct, then it
is often relatively easy to prove that using
[induction](#proof-by-induction){.term}.

### guided traversal

A [tree traversal]{.term} that does not need
to visit every node in the tree. An example would be a
[range query]{.term} in a
[BST]{.term}.

### halt state

In a [finite automata]{.term}, a designated
[state]{.term} which causes the machine to
immediately halt when it is entered.

### halted configuration

A halted configuration occurs in a
[Turing machine]{.term} when the machine
transitions into the [halt state]{.term}.

### halting problem

The halting problem is to answer this question:   Given a computer
program $P$ and an input $I$, will program $P$ halt when executed on
input $I$? This problem has been proved impossible to solve in the
general case. Thus, it is an example of an
[unsolveable problem]{.term}.

### handle

When using a [memory manager]{.term} to
store data, the [client]{.term} will pass
data to be stored (the [message]{.term}) to
the memory manager, and the memory manager will return to the client
a handle. The handle encodes the necessary information that the
memory manager can later use to recover and return the message to
the client. This is typically the location and length of the message
within the [memory pool]{.term}.

### hanging configuration

A hanging configuration occurs in a
[Turing machine]{.term} when the I/O head
moves to the left from the left-most square of the tape, or when the
machine goes into an infinite loop.

### hard algorithm

"Hard" is traditionally defined in relation to running time, and a
"hard" algorithm is defined to be an algorithm with exponential
running time.

### hard problem

"Hard" is traditionally defined in relation to running time, and a
"hard" problem is defined to be one whose best known algorithm
requires exponential running time.

### harmonic series

The sum of reciprocals from 1 to $n$ is called the harmonic series,
and is written $\mathcal{H}_n$. This sum has a value between $\log_e n$
and $\log_e n + 1$.

### hash function

In a [hash system]{.term}, the function that
converts a [key]{.term} value to a position
in the [hash table]{.term}. The hope is that
this position in the hash table contains the record that matches the
key value.

### hash system

The implementation for search based on hash lookup in a
[hash table]{.term}. The
[search key]{.term} is processed by a
[hash function]{.term}, which returns a
position in a [hash table]{.term}, which
hopefully is the correct position in which to find the record
corresponding to the search key.

### hash table

The data structure (usually an [array]{.term})
that stores data records for lookup using
[hashing]{.term}.

### hashing

A search method that uses a [hash function]{.term}
to convert a [search key]{.term}
value into a position within a
[hash table]{.term}. In a properly
implemented [hash system]{.term}, that
position in the table will have high probability of containing the
record that matches the key value. Sometimes, the hash function will
return a position that does not store the desired key, due to a
process called [collision]{.term}. In that
case, the desired record is found through a process known as
[collision resolution]{.term}.

### head

The beginning of a [list]{.term}.

### header node

Commonly used in implementations for a
[linked list]{.term} or related structure,
this [node]{.term} preceeds the first
element of the list. Its purpose is to simplify the code
implementation by reducing the number of special cases that must be
programmed for.

### heap

This term has two different meanings. Uncommonly, it is a synonym
for [free store]{.term}. Most often it is
used to refer to a particular data structure. This data structure is
a [complete binary tree]{.term} with the
requirement that every [node]{.term} has a
value greater than its [children](#child){.term}
(called a [max heap]{.term}),
or else the requirement that every node has a value less than its
children (called a [min heap]{.term}). Since
it is a complete binary tree, a heap is nearly always implemented
using an [array]{.term} rather than an
explicit tree structure. To add a new value to a heap, or to remove
the extreme value (the max value in a max-heap or min value in a
min-heap) and update the heap, takes $\Theta(\log n)$ time in the
[worst case]{.term}. However, if given all
of the values in an unordered array, the values can be re-arranged
to form a heap in only $\Theta(n)$ time. Due to its space and time
efficiency, the heap is a popular choice for implementing a
[priority queue]{.term}.

### heapsort

A sorting algorithm that costs $\Theta(n \log n)$ time in the
[best](#best-case){.term},
[average](#average-case){.term}, and
[worst](#worst-case){.term} cases. It tends
to be slower than [Mergesort]{.term} and
[Quicksort]{.term}. It works by building a
[max heap]{.term}, and then repeatedly
removing the item with maximum [key]{.term}
value (moving it to the end of the heap) until all elements have
been removed (and replaced at their proper location in the array).

### height

The height of a tree is one more than the [depth]{.term}
of the deepest [node]{.term} in
the tree.

### height balanced

The condition the [depths](#depth){.term} of
each [subtree]{.term} in a tree are roughly
the same.

### heuristic

A way to solve a problem that is not guarenteed to be optimal. While
it might not be guarenteed to be optimal, it is generally expected
(by the agent employing the heuristic) to provide a reasonably
efficient solution.

### heuristic algorithm

A type of [approximation algorithm]{.term},
that uses a [heuristic]{.term} to find a
good, but not necessarily cheapest, solution to an
[optimization problem]{.term}.

### home position

In [hashing]{.term}, a synonym for
[home slot]{.term}.

### home slot

In [hashing]{.term}, this is the
[slot]{.term} in the
[hash table]{.term} determined for a given
key by the [hash function]{.term}.

### homogeneity

In a [container]{.term} class, this is the
property that all objects stored in the ncontainer are of the same
class. For example, if you have a list intended to store payroll
records, is it possible for the programmer to insert an integer onto
the list instead?

### Huffman coding tree

A Huffman coding tree is a
[full binary tree](#full-tree){.term} that
is used to represent letters (or other symbols) efficiently. Each
letter is associated with a node in the tree, and is then given a
[Huffman code](#huffman-codes){.term} based
on the position of the associated node. A Huffman coding tree is an
example of a binary [trie]{.term}.

### Huffman codes

The codes given to a collection of letters (or other symbols)
through the process of Huffman coding. Huffman coding uses a
[Huffman coding tree]{.term} to generate the
codes. The codes can be of variable length, such that the letters
which are expected to appear most frequently are shorter. Huffman
coding is optimal whenever the true frequencies are known, and the
frequency of a letter is independent of the context of that letter
in the message.

### Huffman tree

Shorter form of the term [Huffman coding tree]{.term}.

### in degree

In [graph]{.term} terminology, the in degree
for a [vertex]{.term} is the number of edges
directed into the vertex.

### information theoretic lower bound

A [lower bound]{.term} on the amount of
resources needed to solve a [problem]{.term}
based on the number of bits of information needed to uniquely
specify the answer. Sometimes referred to as a "Shannon theoretic
lower bound" due to Shannon's work on information theory and
entropy. An example is that sorting has a lower bound of
$\Omega(\log_2 n!)$ because there are $n!$ possible orderings for
$n$ values. This observation alone does not make the lower bound
tight, because it is possible that no algorithm could actually reach
the information theory lower limit.

### inode

Short for "index node". In UNIX-style file systems, specific disk
[sectors](#sector){.term} that hold indexing
information to define the layout of the file system.

### image-space decomposition

A from of [key-space decomposition]{.term}
where the [key space]{.term} splitting
points is predetermined (typically by splitting in half). For
example, a [Huffman coding tree]{.term}
splits the letters being coded into those with codes that start with
0 on the left side, and those with codes that start with 1 on the
right side. This regular decomposition of the key space is the basis
for a [trie]{.term} data structure. An
image-space decomposition is in opposition to an
[object-space decomposition]{.term}.

### incident

In [graph]{.term} terminology, an edge
connecting two vertices is said to be incident with those vertices.
The two vertices are said to be [adjacent]{.term}.

### index file

A file whose records consist of
[key-value pairs](#key-value-pair){.term}
where the pointers are referencing the complete records stored in
another file.

### indexing

The process of associating a [search key]{.term}
with the location of a corresponding data record. The
two defining points to the concept of an index is the association of
a key with a record, and the fact that the index does not actually
store the record itself but rather it stores a
[reference]{.term} to the record. In this
way, a collection of records can be supported by multiple indices,
typically a separate index for each key field in the record.

### induction hypothesis

The key assumption used in a [proof by induction]{.term},
that the theorem to be proved holds for smaller
instances of the theorem. The induction hypothesis is equivalent to
the [recursive](#recursion){.term} call in a
recursive function.

### induction step

Part of a [proof by induction]{.term}. In
its simplest form, this is a proof of the implication that if the
theorem holds for \$n-1\$, then it holds for \$n\$. As an
alternative, see [strong induction]{.term}.

### induction variable

The variable used to parameterize the theorem being proved by
induction. For example, if we seek to prove that the sum of the
integers from 1 to \$n\$ is \$n(n+1)/2\$, then \$n\$ is the
induction variable. An induction variable must be an integer.

### inherit

In
[object-oriented programming](#object-oriented-programming-paradigm){.term},
the process by which a [subclass]{.term}
gains [data members](#data-member){.term}
and [methods](#method){.term}
from a [base class]{.term}.

### initial state

A synonym for [start state]{.term}.

### inorder traversal

In a [binary tree]{.term}, a
[traversal]{.term} that first
[recursively](#recursion){.term}
[visits](#visit){.term} the left
[child]{.term}, then visits the
[root]{.term}, and then recursively visits
the right child. In a [binary search tree]{.term},
this traversal will
[enumerate](#enumeration){.term} the nodes
in sorted order.

### insertion sort

A sorting algorithm with $\Theta(n^2)$
[average](#average-case){.term} and
[worst case]{.term} cost, and $Theta(n)$
[best case]{.term} cost. This best case cost
makes it useful when we have reason to expect the input to be nearly
sorted.

### integer function

Any function whose input is an integer and whose output is an
integer. It can be proved by
[diagonalization](#diagonalization-argument){.term}
that the set of integer functions is
[uncountably infinite]{.term}.

### inter-sector gap

On a disk drive, a physical gap in the data that occurs between the
[sectors](#sector){.term}. This allows the
[I/O head]{.term} detect the end of the
sector.

### interface

An interface is a class-like structure that only contains method
signatures and fields. An interface does not contain an
implementation of the methods or any
[data members](#data-member){.term}.

### intermediate code

A step in a typical [compiler]{.term} is to
transform the original high-level language into a form on which it
is easier to do other stages of the process. For example, some
compilers will transform the original high-level source code into
[assembly code]{.term} on which it can do
[code optimization]{.term}, before
translating it into its final executable form.

### intermediate code generation

A phase in a [compiler]{.term}, that walks
through a [parse tree]{.term} to produce
simple [assembly code]{.term}.

### internal fragmentation

A condition that occurs when more than $m$ bytes are allocated to
service a [memory request]{.term} for $m$
bytes, wasting free storage. This is often done to simplify
[memory management](#memory-manager){.term}.

### internal node

In a tree, any node that has at least one non-empty
[child]{.term} is an internal node.

### internal sort

A sorting algorithm that is applied to data stored in
[main memory]{.term}. This is in contrast to
an [external sort]{.term} that is meant to
work on data stored in [peripheral storage]{.term}
such as on a [disk drive]{.term}.

### interpolation

The act of finding the coefficients of a polynomial, given the
values at some points. A polynomal of degree $n-1$ requires $n$
points to interpolate the coefficients.

### interpolation search

Given a sorted array, and knowing the first and last
[key]{.term} values stored in some subarray
known to contain [search key]{.term} $K$,
interpolation search will compute the expected location of $K$ in
the subarray as a fraction of the distance between the known key
values. So it will next check that computed location, thus narrowing
the search for the next iteration. Given reasonable key value
distribution, the [average case]{.term} for interpolation search will
be $\Theta(\log \log n)$, or better than the expected cost of
[binary search]{.term}. Nonetheless, binary
search is expected to be faster in nearly all practical situations
due to the small difference between the two costs, combined with the
higher constant factors required to implement interpolation search
as compared to binary search.

### interpreter

In contrast to a [compiler]{.term} that
translates a high-level program into something that can be
repeatedly executed to perform a computation, an interpreter
directly performs computation on the high-level langauge. This tends
to make the computation much slower than if it were performed on the
directly executable version produced by a compiler.

### inversion

A measure of how disordered a series of values is. For each element
$X$ in the series, count one inversion for each element to left of
$X$ that is greater than the value of $X$ (and so must ultimately be
moved to the right of $X$ during a sorting process).

### inverted list

An [index](#indexing){.term} which links
[secondary keys](#secondary-key){.term} to
either the associated [primary key]{.term}
or the actual record in the database.

### inverted file

Synonym for [inverted list]{.term} when the
inverted list is stored in a disk file.

### I/O head
### read/write head

On a [disk drive]{.term} (or similar device), 
the part of the machinery that actually reads data from the disk.

### irreflexive

In set notation, binary relation $R$ on set $S$ is irreflexive if
$aRa$ is never in the relation for any $a \in \mathbf{S}$.

### indexed sequential access method
### ISAM

An obsolete method for indexing
data for (at the time) fast retrieval. More generally, the term is
used also to generically refer to an
[index](#indexing){.term} that supports both
sequential and [keyed](#key){.term} access
to data records. Today, that would nearly always be implemented
using a [B-tree]{.term}.

### iterator

In a [container]{.term} such as a list, a
separate class that indicates position within the container, with
support for [traversing](#traversal){.term}
through all [elements](#element){.term} in
the container.

### job

Common name for processes or tasks to be run by an operating system.
They typically need to be processed in order of importance, and so
are kept organized by a [priority queue]{.term}.
Another common use for this term is for a collection
of tasks to be ordered by a [topological sort]{.term}.

### jump search

An algorithm for searching a sorted list, that falls between
[sequential search]{.term} and
[binary search]{.term} in both computational
cost and conceptual complexity. The idea is to keep jumping by some
fixed number of positions until a value is found that is bigger than
[search key]{.term} $K$, then do a
sequential search over the subarray that is now known to contain the
search key. The optimal number of steps to jump will be $\sqrt{n}$
for an array of size $n$, and the [worst case]{.term}
cost will be $\Theta(\sqrt{n})$.

### K-ary tree

A type of [full tree]{.term} where every
internal node has exactly $K$ [children](#child){.term}.

### k-path

In [Floyd's algorithm]{.term}, a k-path is a
path between two vertices $i$ and $j$ that can only go through
vertices with an index value less than or equal to $k$.

### kd tree

A [spatial data structure]{.term} that uses
a binary tree to store a collection of data records based on their
(point) location in space. It uses the concept of a
[discriminator]{.term} at each level to
decide which single component of the
[multi-dimensional search key]{.term} to
branch on at that level. It uses a
[key-space decomposition]{.term}, meaning
that all data records in the left subtree of a node have a value on
the corresponding discriminator that is less than that of the node,
while all data records in the right subtree have a greater value.
The [bintree]{.term} is the
[image-space decomposition]{.term} analog of
the kd tree.

### key

A field or part of a larger record used to represent that record for
the purpose of searching or comparing. Another term for
[search key]{.term}.

### key sort

Any sorting operation applied to a collection of
[key-value pairs](#key-value-pair){.term}
where the value in this case is a [reference]{.term}
to a complete record (that is, a pointer to the record
in memory or a position for a record on disk). This is in contrast
to a sorting operation that works directly on a collection of
records. The intention is that the collection of key-value pairs is
far smaller than the collection of records themselves. As such, this
might allow for an [internal sort]{.term}
when sorting the records directly would require an 
[external sort]{.term}. The collection of key-value
pairs can also act as an [index](#indexing){.term}.

### key space

The range of values that a [key]{.term}
value may take on.

### key-space decomposition

The idea that the range for a [search key]{.term}
will be split into pieces. There are two general
approaches to this:   [object-space decomposition]{.term}
and [image-space decomposition]{.term}.

### key-value pair

A standard solution for solving the problem of how to relate a
[key]{.term} value to a record (or how to
find the key for a given record) within the context of a particular
[index](#indexing){.term}. The idea is to
simply store as records in the index pairs of keys and records.
Specifically, the index will typically store a copy of the key along
with a [reference]{.term} to the record. The
other standard solution to this problem is to pass a
[comparator]{.term} function to the index.

### knapsack problem

While there are many variations of this problem, here is a typical
version:   Given knapsack of a fixed size, and a collection of objects
of various sizes, is there a subset of the objects that exactly fits
into the knapsack? This problem is known to be
[NP-complete]{.term}, but can be solved for
problem instances in practical time relatively quickly using
[dynamic programming]{.term}. Thus, it is
considered to have
[pseudo-polynomial]{.term}
cost. An [optimization problem]{.term}
version is to find the subset that can fit with the
greatest amount of items, either in terms of their total size, or in
terms of the sum of values associated with each item.

### Kruskal's algorithm

An algorithm for computing the [MCST]{.term}
of a [graph]{.term}. During processing, it
makes use of the [UNION/FIND]{.term} process
to efficiently determine of two vertices are within the same
[subgraph]{.term}.

### LIFO

Abbreviation for "last-in, first-out". This is the access paradigm
for a [stack]{.term}, and an old terminolgy
for the stack is "LIFO list".

### labeled graph

A [graph]{.term} with labels associated with
the [nodes](#node){.term}.

### language

A set of strings.

### Las Vegas algorithms

A form of [randomized algorithm]{.term}. We
always find the maximum value, and "usually" we find it fast. Such
algorithms have a guaranteed result, but do not guarantee fast
running time.

### leaf node

In a [binary tree]{.term}, leaf node is any
node that has two empty [children](#child){.term}.
(Note that a binary tree is defined so that every node
has two children, and that is why the leaf node has to have two
empty children, rather than no children.) In a general tree, any
node is a leaf node if it has no children.

### least frequently used
### LFU

Abbreviated LFU, it is a
[heuristic]{.term} that can be used to
decide which [buffer]{.term} in a
[buffer pool]{.term} to
[flush]{.term} when data in the buffer pool
must be replaced by new data being read into a
[cache](#caching){.term}. However,
[least recently used]{.term} is more popular
than LFU. Analogous to the [frequency count]{.term}
heuristic for maintaining a
[self-organizing list]{.term}.

### least recently used
### LRU

Abbreviated LRU, it is a popular
[heuristic]{.term} to use for deciding which
[buffer]{.term} in a
[buffer pool]{.term} to
[flush]{.term} when data in the buffer pool
must be replaced by new data being read into a 
[cache](#caching){.term}. Analogous to the
[move-to-front]{.term} heuristic for
maintaining a [self-organizing list]{.term}.

### left recursive

In automata theory, a [production]{.term} is
left recursive if it is of the form $A \rightarrow Ax$,
$A \in V, x \in (V \cup T)^*$ where $V$ is the set of
[non-terminals](#non-terminal){.term} and
$T$ is the set of [terminals](#terminal){.term}
in the [grammar]{.term}.

### length

In a [list]{.term}, the number of elements.
In a string, the number of characters.

### level

In a tree, all nodes of [depth]{.term} $d$
are at level $d$ in the tree. The root is the only node at level 0,
and its depth is 0.

### lexical analysis

A phase of a [compiler]{.term} or
[interpreter]{.term} responsible for reading
in characters of the program or language and grouping them into
[tokens](#token){.term}.

### lexical scoping

Within programming languages, the convention of allowing access to a
variable only within the block of code in which the variable is
defined. A synonym for [static scoping]{.term}.

### lifetime

For a variable, lifetime is the amount of time it will exist before
it is destroyed.

### linear congruential method

In random number theory, a process for computing the next number in
a [pseudo-random]{.term}
sequence. Starting from a [seed]{.term}, the
next term $r(i)$ in the series is calculated from term $r(i-1)$ by
the equation

$$r(i) = (r(i-1)\times b) \bmod t$$

where $b$ and $t$ are constants. These constants must be well chosen
for the resulting series of numbers to have desireable properties as
a random number sequence.

### linear growth rate

For input size $n$, a growth rate of $cn$ (for $c$ any positive
constant). In other words, the cost of the associated function is
linear on the input size.

### linear index

A form of [indexing]{.term} that stores
[key-value pairs](#key-value-pair){.term} in
a sorted array. Typically this is used for an index to a large
collection of records stored on disk, where the linear index itself
might be on disk or in [main memory]{.term}.
It allows for efficient search (including for
[range queries](#range-query){.term}), but
it is not good for inserting and deleting entries in the array.
Therefore, it is an ideal indexing structure for when the system
needs to do range queries but the collection of records never
changes once the linear index has been created.

### linear order

Another term for [total order]{.term}.

### linear probing

In [hashing]{.term}, this is the simplest
[collision resolution]{.term} method. Term
$i$ of the [probe sequence]{.term} is simply
$i$, meaning that collision resolution works by moving sequentially
through the hash table from the [home slot]{.term}.
While simple, it is also inefficient, since it quickly
leads to certain free [slots](#slot){.term}
in the hash table having higher probability of being selected during
insertion or search.

### linear probing by steps

In [hashing]{.term}, this
[collision resolution]{.term} method is a
variation on simple [linear probing]{.term}.
Some constant $c$ is defined such that term $i$ of the
[probe sequence]{.term} is $ci$. This means
that collision resolution works by moving sequentially through the
hash table from the [home slot]{.term} in
steps of size $c$. While not much improvement on linear probing, it
forms the basis of another collision resolution method called
[double hashing]{.term}, where each key uses
a value for $c$ defined by a second
[hash function]{.term}.

### linear search

Another name for [sequential search]{.term}.

### link node

A widely used supporting object that forms the basic building block
for a [linked list]{.term} and similar
[data structures](#data-structure){.term}. A
link node contains one or more fields that store data, and a
[pointer]{.term} or
[reference]{.term} to another link node.

### linked list

An implementation for the list ADT that uses
[dynamic allocation]{.term} of
[link nodes](#link-node){.term} to store the
list elements. Common variants are the
[singly linked list]{.term},
[doubly linked list]{.term} and
[circular list]{.term}. The
[overhead]{.term} required is the pointers
in each link node.

### linked stack

Analogous to a [linked list]{.term}, this
uses [dynamic allocation]{.term} of nodes to
store the elements when implementing the stack ADT.

### list

A finite, ordered sequence of
[data items](#data-item){.term} known as
[elements](#element){.term}. This is close
to the mathematical concept of a [sequence]{.term}.
Note that "ordered" in this definition means that
the list elements have position. It does not refer to the
relationship between [key]{.term} values for
the list elements (that is, "ordered" does not mean "sorted").

### literal

In a [Boolean expression]{.term}, a
[literal]{.term} is a
[Boolean variable]{.term} or its negation.
In the context of compilers, it is any constant value. Similar to a
[terminal]{.term}.

### load factor

In [hashing]{.term} this is the fraction of
the [hash table]{.term}
[slots](#slot){.term} that contain a record.
Hash systems usually try to keep the load factor below 50%.

### local variable
### automatic variable
### stack variable

A variable declared within a function or method. It exists only from
the time when the function is called to when the function exits.
When a function is suspended (due to calling another function), the
function's local variables are stored in an
[activation record]{.term} on the
[runtime stack]{.term}.

### locality of reference

The concept that accesses within a collection of records is not
evenly distributed. This can express itself as some small fraction
of the records receiving the bulk of the accesses
([80/20 rule]{.term}). Alternatively, it can
express itself as an increased probability that the next or future
accesses will come close to the most recent access. This is the
fundamental property for success of [caching]{.term}.

### local storage

local storage.

### logarithm

The *logarithm* of base $b$ for value $y$ is the power
to which $b$ is raised to get $y$.

### logical file

In [file processing]{.term}, the
programmer's view of a [random access]{.term}
file stored on [disk](#disk-drive){.term}
as a contiguous series of bytes, with those bytes
possibly combining to form data records. This is in contrast to the
[physical file]{.term}.

### logical form

The definition for a data type in terms of an ADT. Contrast to the
[physical form]{.term} for the data type.

### lookup table

A table of pre-calculated values, used to speed up processing time
when the values are going to be viewed many times. The costs to this
approach are the space required for the table and the time required
to compute the table. This is an example of a
[space/time tradeoff]{.term}.

### lower bound

An lower bound for a [growth rate]{.term}
$f$ is any growth rate $g$ that is less than or equal to it.
Formally, there are constants $n_0 \geq 0$ and $c > 0$ such that
$f(n) \geq c g(n)$ for all $n \geq n_0$. We also write
$f \in \Omega(g)$ or slightly imprecisely $f(n) \in \Omega(g(n))$
(this is [Omega notation]{.term}).

Usually, we are interested in finding a lower bound $g$ that has a
simple expression compared to $f$, but is still sharp (there is not
much room for improvement).

In [algorithm analysis]{.term}, a lower
bound for an algorithm is a lower bound for the
[asymptotic complexity]{.term} of the
algorithm, the growth rate of its [complexity]{.term}.

### lower bounds proof

A proof regarding the lower bound, with this term most typically
referring to the lower bound for any possible algorithm to solve a
given [problem]{.term}. Many problems have a
simple lower bound based on the concept that the minimum amount of
processing is related to looking at all of the problem's input.
However, some problems have a higher lower bound than that. For
example, the lower bound for the problem of sorting
($\Omega(n \log n)$) is greater than the input size to sorting
($n$). Proving such "non-trivial" lower bounds for problems is
notoriously difficult.

### map

A [data structure]{.term} that relates a
[key]{.term} to a [record]{.term}.

### mapping

A [function]{.term} that maps every element
of a given [set]{.term} to a unique element
of another set; a correspondence.

### mark array

It is typical in [graph]{.term} algorithms
that there is a need to track which nodes have been visited at some
point in the algorithm. An [array]{.term} of
bits or values called the [mark array]{.term}
is often maintained for this purpose.

### mark/sweep algorithm

An algorithm for [garbage collection]{.term}.
All accessible variables, and any space that is
reachable by a chain of pointers from any accessible variable, is
"marked". Then a sequential sweep of all memory in the pool is
made. Any unmarked memory locations are assumed to not be needed by
the program and can be considered as free to be reused.

### master theorem

A theorem that makes it easy to solve
[divide-and-conquer recurrences]{.term}.

### matching

In graph theory, a pairing (or match) of various nodes in a graph.

### matching problem

Any problem that involves finding a [matching]{.term}
in a graph with some desired property. For example, a
well-known [NP-complete]{.term} problem is
to find a [maximum match]{.term} for an
undirected graph.

### max heap

A [heap]{.term} where every
[node]{.term} has a [key]{.term}
value greater than its
[children](#child){.term}. As a consequence,
the node with maximum key value is at the [root]{.term}.

### maximal match

In a graph, any [matching]{.term} that
leaves no pair of unmatched vertices that are connected. A maximal
matching is not necessarily a [maximum match]{.term}.
In other words, there might be a larger matching than
the maximal matching that was found.

### maximum lower bound

The [lower bound]{.term} for the
[problem]{.term} of finding the maximum
value in an unsorted list is $\Omega(n)$.

### maximum match

In a graph, the largest possible [matching]{.term}.

### measure of cost

When comparing two things, such as two algorithms, some event or
unit must be used as the basic unit of comparison. It might be
number of milliseconds needed or machine instructions expended by a
program, but it is usually desirable to have a way to do comparison
between two algorithms without writing a program. Thus, some other
measure of cost might be used as a basis for comparison between the
algorithms. For example, when comparing two sorting algorthms it is
traditional to use as a measure of cost the number of
[comparisons](#comparison){.term} made
between the key values of record pairs.

### mergesort

A sorting algorithm that requires $\Theta(n \log n)$ in the
[best](#best-case){.term},
[average](#average-case){.term}, and
[worst](#worst-case){.term} cases.
Conceptually it is simple:   Split the list in half, sort the halves,
then merge them together. It is a bit complicated to implement
efficiently on an [array]{.term}.

### member

In set notation, this is a synonym for [element]{.term}.
In abstract design, a [data item]{.term}
is a member of a [type]{.term}.
In an object-oriented language,
[data members](#data-member){.term} are data
fields in an object.

### member function

Each operation associated with the ADT is implemented by a member
function or [method]{.term}.

### memory allocation

In a [memory manager]{.term}, the act of
honoring a request for memory.

### memory deallocation

In a [memory manager]{.term}, the act of
freeing a block of memory, which should create or add to a
[free block]{.term}.

### memory hierarchy

The concept that a computer system stores data in a range of storage
types that range from fast but expensive
([primary storage]{.term}) to slow but cheap
([secondary storage]{.term}). When there is
too much data to store in [primary storage]{.term},
the goal is to have the data that is needed soon or
most often in the primary storage as much as possible, by using
[caching]{.term} techniques.

### memory leak

In programming, the act of creating [garbage]{.term}.
In languages such as C and C++ that do not support
[garbage collection]{.term}, repeated memory
leaks will evenually cause the program to terminate.

### memory manager

Functionality for managing a [memory pool]{.term}.
Typically, the memory pool is viewed as an
[array]{.term} of bytes by the memory
manager. The [client]{.term} of the memory
manager will request a collection of (adjacent) bytes of some size,
and release the bytes for reuse when the space is no longer needed.
The memory manager should not know anything about the interpretation
of the data that is being stored by the client into the memory pool.
Depending on the precise implementation, the client might pass in
the data to be stored, in which case the memory manager will deal
with the actual copy of the data into the memory pool. The memory
manager will return to the client a [handle]{.term}
that can later be used by the client to retrieve the
data.

### memory pool

Memory (usually in [RAM]{.term} but possibly
on disk or [peripheral storage]{.term}
device) that is logically viewed as an array of memory positions. A
memory pool is usually managed by a
[memory manager]{.term}.

### memory request

In a [memory manager]{.term}, a request from
some [client]{.term} to the memory manager
to reserve a block of memory and store some bytes there.

### merge insert sort

A synonym for the [Ford and Johnson sort]{.term}.

### message

In a [memory manager]{.term} implementation
(particularly a memory manager implemented with a
[message passing]{.term} style of
[interface]{.term}), the message is the data
that the [client]{.term} of the memory
manager wishes to have stored in the [memory pool]{.term}.
The memory manager will reply to the client by
returning a [handle]{.term} that defines the
location and size of the message as stored in the memory pool. The
client can later recover the message by passing the handle back to
the memory manager.

### message passing

A common approach to implementing the [ADT]{.term}
for a [memory manager]{.term}
or [buffer pool]{.term}, where the contents
of a [message]{.term} to be stored is
explicitly passed between the client and the memory manager. This is
in contrast to a [buffer passing]{.term}
approach.

### metaphor

Humans deal with complexity by assigning a label to an assembly of
objects or concepts and then manipulating the label in place of the
assembly. Cognitive psychologists call such a label a metaphor.

### method

In the [object-oriented programming paradigm]{.term},
a method is an operation on a
[class]{.term}. A synonym for
[member function]{.term}.

### mid-square method

In [hashing]{.term}, an approach to
implementing a [hash function]{.term}. The
key value is squared, and some number of bits from the middle of the
resulting value are extracted as the hash code. Some care must be
taken to extract bits that tend to actually be in the middle of the
resulting value, which requires some understanding of the typical
key values. When done correctly, this has the advantage of having
the hash code be affected by all bits of the key

### min heap

A [heap]{.term} where every
[node]{.term} has a [key]{.term}
value less than its
[children](#child){.term}. As a consequence,
the node with minimum key value is at the [root]{.term}.

### minimal-cost spanning tree
### minimal spanning tree
### MCST
### MST

Abbreviated as MCST, or sometimes as MST. Derived from a
[weighted graph]{.term}, the MCST is the
[subset]{.term} of the graph's
[edges](#edge){.term} that maintains the
connectivitiy of the graph while having lowest total cost (as
defined by the sum of the [weights](#weight){.term}
of the edges in the MCST). The result is referred to as
a [tree]{.term} because it would never have
a [cycle]{.term} (since an edge could be
removed from the cycle and still preserve connectivity). Two
algorithms to solve this problem are
[Prim's algorithm]{.term} and
[Kruskal's algorithm]{.term}.

### minimum external path weight

Given a collection of objects, each associated with a
[leaf node]{.term} in a tree, the binary
tree with minimum external path weight is the one with the minimum
sum of
[weighted path lengths](#weighted-path-length){.term}
for the given set of leaves. This concept is used to
create a [Huffman coding tree]{.term}, where
a letter with high weight should have low depth, so that it will
count the least against the total path length. As a result, another
letter might be pushed deeper in the tree if it has less weight.

### model

A simplification of reality that preserves only the essential
elements. With a model, we can more easily focus on and reason about
these essentials. In [algorithm analysis]{.term},
we are especially concerned with the
[cost model]{.term} for measuring the cost
of an algorithm.

### modulus
### mod

The modulus function returns the remainder of an integer division.
Sometimes written $n \bmod m$ in mathematical expressions, the
syntax in many programming languages is `n % m`.

### Monte Carlo algorithms

A form of [randomized algorithm]{.term}. We
find the maximum value fast, or we don't get an answer at all (but
fast). While such algorithms have good running time, their result is
not guaranteed.

### move-to-front

A [heuristic]{.term} used to maintain a
[self-organizing list]{.term}. Under this
heuristic, whenever a record is accessed it is moved to the front of
the list. Analogous to the [least recently used]{.term}
heuristic for maintaining a
[buffer pool]{.term}.

### multi-dimensional search key

A search key containing multiple parts, that works in conjunction
with a [multi-dimensional search structure]{.term}.
Most typically, a [spatial]{.term}
search key representing a position in multi-dimensional
(2 or 3 dimensions) space. But a multi-dimensional key could be used
to organize data within non-spatial dimensions, such as temperature
and time.

### multi-dimensional search structure

A data structure used to support efficient search on a
[multi-dimensional search key]{.term}. The
main concept here is that a multi-dimensional search structure works
more efficiently by considering the multiple parts of the search key
as a whole, rather than making independent searches on each
one-dimensional component of the key. A primary example is a
[spatial data structure]{.term} that can
efficiently represent and search for records in multi-dimensional
space.

### multilist

A list that may contain sublists. This term is sometimes used as a
synonym to the term [bag]{.term}.

### natural numbers

Zero and the positive integers.

### necessary fallacy

A common mistake in a [lower bounds proof]{.term}
for a problem, where the proof makes an inappropriate
assumption that any algorithm must operate in some manner (typically
in the way that some known algorithm behaves).

### neighbor

In a [graph]{.term}, a
[node]{.term} $w$ is said to be a neighbor
of [node]{.term} $v$ if there is an
[edge]{.term} from $v$ to $w$.

### non-deterministic

In a [finite automata]{.term}, at least one
[state]{.term} has multiple transitions on
at least one symbol. This means that it is not
[deterministic]{.term} about what transition
to take in that situation. A non-deterministic machine is said to
[accept]{.term} a string if it completes
execution on the string in an [accepting state]{.term}
under at least one choice of non-deterministic
transitions. Generally, non-determinism can be simulated with a
deterministic machine by alternating between the execution that
would take place under each of the branching choices.

### non-terminal

In contrast to a [terminal]{.term}, a
non-terminal is an abstract state in a
[production rule]{.term}. Begining with the
[start symbol]{.term}, all non-terminals
must be converted into terminals in order to complete a
[derivation]{.term}.

### node

The objects that make up a linked structure such as a linked list or
binary tree. Typically, nodes are allocated using
[dynamic memory allocation]{.term}. In
[graph]{.term} terminology, the nodes are
more commonly called [vertices](#vertex){.term}.

### non-strict partial order

In set notation, a relation that is [reflexive]{.term},
[antisymmetric]{.term}, and
[transitive]{.term}.

### NP-Complete

A class of problems that are related to each other in this way: 
If ever one such problem is proved to be solvable in polynomial time,
or proved to require exponential time, then all other NP-Complete
problems will cost likewise. Since so many real-world problems have
been proved to be NP-Complete, it would be extremely useful to
determine if they have polynomial or exponential cost. But so far,
nobody has been able to determine the truth of the situation. A more
technical definition is that a problem is NP-Complete if it is in NP
and is NP-hard.

### NP-Completeness proof

A type of [reduction]{.term} used to
demonstrate that a particular [problem]{.term}
is [NP-complete]{.term}.
Specifically, an NP-Completeness proof must first show that the
problem is in class [NP]{.term}, and then
show (by using a reduction to another NP-Complete problem) that the
problem is [NP-hard]{.term}.

### NP-hard

A problem that is "as hard as" any other problem in
[NP]{.term}. That is, problem X is NP-hard
if any algorithm in NP can be
[reduced](#reduction){.term} to X in
polynomial time.

### non-deterministic algorithm

An algorithm that may operate using a
[non-deterministic choice]{.term} operation.

### non-deterministic choice

An operation that captures the concept of nondeterminism. A
nondeterministic choice can be viewed as either "correctly
guessing" between a set of choices, or implementing each of the
choices in parallel. In the parallel view, the nondeterminism was
successful if at least one of the choices leads to a correct answer.

### non-deterministic polynomial time algorithm
### NP

An algorithm that runs in polynomial time, and which may (or might
not) use [non-deterministic choice]{.term}.

### nth roots of unity

All of the points along the unit circle in the complex plane that
represent multiples of the
[primitive nth root of unity]{.term}.

### object

An instance of a [class]{.term}, that is,
something that is created and takes up storage during the execution
of a computer program. In the
[object-oriented programming paradigm]{.term},
objects are the basic units of operation. Objects have
state in the form of [data members](#data-member){.term},
and they know how to perform certain actions
([methods](#method){.term}).

### object-oriented programming paradigm

An approach to problem-solving where all computations are carried
out using [objects](#object){.term}.

### object-space decomposition

A from of [key-space decomposition]{.term}
where the [key space]{.term} is determined
by the actual values of keys that are found. For example, a
[BST]{.term} stores a key value in its root,
and all other values in the tree with lesser value are in the left
[subtree]{.term}. Thus, the root value has
split (or decomposed) the key space for that key based on its value
into left and right parts. An object-space decomposition is in
opposition to an [image-space decomposition]{.term}.

### octree

The three-dimensional equivalent of the [quadtree]{.term}
would be a tree with $2^3$ or eight branches.

### Omega notation

For [growth rates](#growth-rate){.term} $f$
and $g$, we write $f \in \Omega(g)$ to say that $g$ is a
[lower bound]{.term} for $f$. The notation
can be made sense of by defining $\Omega(g)$ as the set
of functions with growth rate greater than or equal to that of
$g$. The notation is often somewhat imprecisely used as
$f(n) \in \Omega(g(n))$ or even $f(n) = \Omega(g(n))$.

### open addressing
### closed hash system

A [hash system]{.term} where all records are
stored in slots of the [hash table]{.term}.
This is in contrast to an [open hash system]{.term}.

### open hash system

A [hash system]{.term} where multiple
records might be associated with the same slot of a
[hash table]{.term}. Typically this is done
using a linked list to store the records. This is in contrast to a
[closed hash system]{.term}.

### operating system

The control program for a computer. Its purpose is to control
hardware, manage resources, and present a standard interface to
these to other software components.

### optimal static ordering

A theoretical construct defining the best static (non-changing)
order in which to place a collection of records so as to minimize
the number of records [visited](#visit){.term}
by a series of sequential searches. It is a useful
concept for the purpose of defining a theoretical optimum against
which to compare the performance for a
[self-organizing list heuristic]{.term}.

### optimization problem

Any problem where there are a (typically large) collection of
potential solutions, and the goal is to find the best solution. An
example is the *traveling salesman problem*, where visiting $n$ cities
in some order has a cost, and the goal is to visit in the cheapest
order.

### out degree

In [graph]{.term} terminology, the out
degree for a [vertex]{.term} is the number
of edges directed out of the vertex.

### overflow

The condition where the amount of data stored in an entity has
exceeded its capacity. For example, a node in a
[B-tree]{.term} can store a certain number
of records. If a record is attempted to be inserted into a node that
is full, then something has to be done to handle this case.

### overflow bucket

In [bucket hashing]{.term}, this is the
[bucket]{.term} into which a record is
placed if the bucket containing the record's
[home slot]{.term} is full. The overflow
bucket is logically considered to have infinite capacity, though in
practice search and insert will become relatively expensive if many
records are stored in the overflow bucket.

### overhead

All information stored by a data structure aside from the actual
data. For example, the pointer fields in a
[linked list]{.term} or
[BST]{.term}, or the unused positions in an
[array-based list]{.term}.

### page

A term often used to refer to the contents of a single
[buffer]{.term} within a
[buffer pool]{.term} or other
[virtual memory]{.term}. This corresponds to
a single [block]{.term} or
[sector]{.term} of data from
[backing storage]{.term}, which is the
fundamental unit of I/O.

### parameter

The values making up an input to a [function]{.term}.

### parent

In a tree, the [node]{.term} $P$ that
directly links to a node $A$ is the parent of $A$. $A$ is the
[child]{.term} of $P$.

### parent pointer representation

For [trees](#tree){.term}, a
[node]{.term} implementation where each node
stores only a pointer to its [parent]{.term},
rather than to its
[children](#child){.term}. This makes it
easy to go up the tree toward the [root]{.term},
but not down the tree toward the
[leaves](#leaf-node){.term}. This is most
appropriate for solving the [UNION/FIND]{.term}
problem.

### parity

The concept of matching even-ness or odd-ness, the basic idea behind
using a [parity bit]{.term} for error
detection.

### parity bit

A common method for checking if transmission of a sequence of bits
has been performed correctly. The idea is to count the number of 1
bits in the sequence, and set the parity bit to 1 if this number is
odd, and 0 if it is even. Then, the transmitted sequence of bits can
be checked to see if its parity matches the value of the parity bit.
This will catch certain types of errors, in particular if the value
for a single bit has been reversed. This was used, for example, in
early versions of [ASCII character coding]{.term}.

### partial order

In set notation, a binary relation is called a partial order if it
is [antisymmetric]{.term} and
[transitive]{.term}. If the relation is also
[reflexive]{.term}, then it is a
[non-strict partial order]{.term}.
Alternatively, if the relation is also
[irreflexive]{.term}, then it is a
[strict partial order]{.term}.

### parse tree

A tree that represents the syntactic structure of an input string,
making it easy to compare against a [grammar]{.term}
to see if it is syntactically correct.

### parser

A part of a [compiler]{.term} that takes as
input the program text (or more typically, the tokens from the
[scanner]{.term}), and verifies that the
program is syntactically correct. Typically it will build a
[parse tree]{.term} as part of the process.

### partially ordered set

The set on which a [partial order]{.term} is
defined is called a partially ordered set.

### partition

In [Quicksort]{.term}, the process of
splitting a list into two sublists, such that one sublist has values
less than the [pivot]{.term} value, and the
other with values greater than the pivot. This process takes
$\Theta(i)$ time on a sublist of length $i$.

### pass by value

A copy of a variable is passed to the called function. So, any
modifications will not affect the original variable.

### pass by reference

A [reference]{.term} to the variable is
passed to the called function. So, any modifications will affect the
original variable.

### path

In [tree]{.term} or
[graph]{.term} terminology, a sequence of
[vertices](#vertex){.term}
$v_1, v_2, ..., v_n$ forms a path of length $n-1$ if there exist
edges from $v_i$ to $v_{i+1}$ for $1 \leq i < n$.

### path compression

When implementing the [UNION/FIND]{.term}
algorithm, path compression is a local optimization step that can be
performed during the FIND step. Once the root of the tree for the
current object has been found, the path to the root can be traced a
second time, with all objects in the tree made to point directly to
the root. This reduces the depth of the tree from typically
$\Theta(\log n)$ to nearly constant.

### peripheral storage

Any storage device that is not part of the core processing of the
computer (that is, [RAM]{.term}). A typical
example is a [disk drive]{.term}.

### permutation

A permutation of a sequence $\mathbf{S}$ is the
[elements](#element){.term} of $\mathbf{S}$
arranged in some order.

### persistent

In the context of computer memory, this refers to a memory that does
not lose its stored information when the power is turned off.

### physical file

The collection of sectors that comprise a file on a
[disk drive]{.term}. This is in contrast to
the [logical file]{.term}.

### physical form

The implementation of a data type as a data structure. Contrast to
the [logical form]{.term} for the data type.

### pigeonhole principle

A commonly used lemma in mathematics. A typical variant states:   When
$n+1$ objects are stored in $n$ locations, at least one of the
locations must store two or more of the objects.

### pivot

In [Quicksort]{.term}, the value that is
used to split the list into sublists, one with lesser values than
the pivot, the other with greater values than the pivot.

### platter

In a [disk drive]{.term}, one of a series of
flat disks that comprise the storage space for the drive. Typically,
each surface (top and bottom) of each platter stores data, and each
surface has its own [I/O head]{.term}.

### point quadtree

A [spatial data structure]{.term} for
storing point data. It is similar to a
[PR quadtree]{.term} in that it (in two
dimensions) splits the world into four parts. However, it splits
using an [object-space decomposition]{.term}.
That is, quadrant containing the point is split into
four parts at the point. It is similar to the
[kd tree]{.term} which splits alternately in
each dimension, except that it splits in all dimensions at once.

### point-region quadtree

Formal name for what is commonly referred to as a
[PR quadtree]{.term}.

### pointer

A variable whose value is the [address]{.term}
of another variable; a link.

### pointer-based implementation for binary tree nodes

A common way to implement [binary tree]{.term}
[nodes](#node){.term}. Each node stores a data
value (or a [reference]{.term} to a data
value), and pointers to the left and right children. If either or
both of the children does not exist, then a null pointer is stored.

### polymorphism

An
[object-oriented programming](#object-oriented-programming-paradigm){.term}
term meaning *one name, many forms*. It describes the
ability of software to change its behavior dynamically. Two basic
forms exist:   [run-time polymorphism]{.term}
and [compile-time polymorphism]{.term}.

### pop

A specialized term used to indicate removing an
[element]{.term} from a
[stack]{.term}.

### poset

Another name for a [partially ordered set]{.term}.

### position

The defining property of the list ADT, this is the concept that list
elements are in a position. Many list ADTs support access by
position.

### pointee

The term pointee refers to anything that is pointed to by a
[pointer]{.term} or
[reference]{.term}.

### postorder traversal

In a [binary tree]{.term}, a
[traversal]{.term} that first
[recursively](#recursion){.term}
[visits](#visit){.term} the left
[child]{.term}, then recursively visits the
right child, and then visits the [root]{.term}.

### potential

A concept in [amortized complexity]{.term}
for operations on a data structure. We choose a *potential function*
that associates an arbitrary non-negative value of *stored cost*
(stored energy) with each state of the data structure. We then
define the [amortized cost]{.term} of a run
of the operation to be its cost as given by the the
[cost model]{.term} plus the change in
potential. The [complexity]{.term} modified
this way is called [amortized complexity]{.term}.

An example is adding an element to a dynamic array. When the dynamic
array is not full, adding an element is quick and we store some of
that saved cost by increasing the potential. When the dynamic array
is full capacity, we perform an expensive reallocation, but
compensate that cost by resetting the potential from a high value to
zero. Let us define the potential of a dynamic array with capacity
$c$ and size $n$ to be $max(2n-c,0)$. Assuming we double the
capacity on reallocation, the operation of adding an element then
has constant amortized complexity.

The concept comes from potential energy in physics. For example, in
the graviational field of the earth, kinetic energy may be stored as
potential energy.

### powerset

For a [set]{.term} $\mathbf{S}$, the power
set is the set of all possible [subsets](#subset){.term}
for $\mathbf{S}$.

### PR quadtree

A type of [quadtree]{.term} that stores
point data in two dimensions. The root of the PR quadtree represents
some square region of 2d space. If that space stores more than one
data point, then the region is decomposed into four equal
subquadrants, each represented
[recursively](#recursion){.term} by a
subtree of the PR quadtree. Since many leaf nodes of the PR quadtree
will contain no data points, implementation often makes use of the
[Flyweight]{.term}
[design pattern]{.term}. Related to the
[bintree]{.term}.

### prefix property

Given a collection of strings, the collection has the prefix
property if no string in the collection is a prefix for another
string in the collection. The significance is that, given a long
string composed of members of the collection, it can be uniquely
decomposed into the constituent members. An example of such a
collection of strings with the prefix property is a set of
[Huffman codes]{.term}.

### preorder traversal

In a [binary tree]{.term}, a
[traversal]{.term} that first
[visits](#visit){.term} the
[root]{.term}, then
[recursively](#recursion){.term} visits the
left [child]{.term}, then recursively visits
the right child.


### primary key index
### primary index

Relates each [primary key]{.term} value with
a pointer to the actual record on disk.

### primary key

A unique identifier for a [record]{.term}.

### primary storage
### main memory

The faster but more expensive memory in a computer, most often
[RAM]{.term} in modern computers. This is in
contrast to [secondary storage]{.term},
which together with primary storage devices make up the computer's
[memory hierarchy]{.term}.

### primitive element

In set notation, this is a single element that is a member of the
base type for the set. This is as opposed to an element of the set
being another set.

### primitive nth root of unity

The $n$ th root of 1. Normally a [complex number]{.term}.
An intuitive way to view this is one $n$ th of the
unit circle in the complex plain.

### Prim's algorithm

A [greedy algorithm]{.term} for computing
the [MCST]{.term} of a
[graph]{.term}. It is nearly identical to
[Dijkstra's algorithm]{.term} for solving
the [single-source shortest paths problem]{.term},
with the only difference being the calculation done to
update the best-known distance.

### primary clustering

In [hashing]{.term}, the tendency in certain
[collision resolution]{.term} methods to
create clustering in sections of the hash table. The classic example
is [linear probing]{.term}. This tends to
happen when a group of keys follow the same
[probe sequence]{.term} during collision
resolution.

### primitive data type

In Java, one of a particular group of
[simple types](#simple-type){.term} that are
not implemented as objects. An example is an `int`.

### priority

A quantity assigned to each of a collection of
[jobs](#job){.term} or tasks that indicate
importance for order of processing. For example, in an operating
system, there could be a collection of processes (jobs) ready to
run. The operating system must select the next task to execute,
based on their priorities.

### priority queue

An ADT whose primary operations of insert of records, and deletion
of the greatest (or, in an alternative implementation, the least)
valued record. Most often implemented using the
[heap]{.term} data structure. The name comes
from a common application where the records being stored represent
tasks, with the ordering values based on the
[priorities](#priority){.term} of the tasks.

### probabilistic algorithm

A form of [randomized algorithm]{.term} that
might yield an incorrect result, or that might fail to produce a
result.

### probabilistic data structure

Any data structure that uses
[probabilistic algorithms](#probabilistic-algorithm){.term}
to perform its operations. A good example is the
[skip list]{.term}.

### probe function

In [hashing]{.term}, the function used by a
[collision resolution]{.term} method to
calculate where to look next in the [hash table]{.term}.

### probe sequence

In [hashing]{.term}, the series of
[slots](#slot){.term} visited by the
[probe function]{.term} during
[collision resolution]{.term}.

### problem

A task to be performed. It is best thought of as a
[function]{.term} or a mapping of inputs to
outputs.

### problem instance

A specific selection of values for the parameters to a problem. In
other words, a specific set of inputs to a problem. A given problem
instance has a size under some [cost model]{.term}.

### problem lower bound

In [algorithm analysis]{.term}, the tightest
[lower bound]{.term} that we can prove over
all [algorithms](#algorithm){.term} for that
[problem]{.term}. This is often much harder
to determine than the [problem upper bound]{.term}.
Since the lower bound for the algorithm can be very
different for different situations (such as the
[best case]{.term} or
[worst case]{.term}), we typically have to
specify which situation we are referring to.

### problem upper bound

In [algorithm analysis]{.term}, the
[upper bound]{.term} for the best
[algorithm]{.term} that we know for the
[problem]{.term}. Since the upper bound for
the algorithm can be very different for different situations (such
as the [best case]{.term} or
[worst case]{.term}), we typically have to
specify which situation we are referring to.

### procedural

Typically referring to the
[procedural programming paradigm]{.term}, in
contrast to the
[object-oriented programming paradigm]{.term}.

### procedural programming paradigm

Procedural programming uses a list of instructions (and procedure
calls) that define a series of computational steps to be carried
out. This is in contrast to the
[object-oriented programming paradigm]{.term}.

### production
### production rule

A [grammar]{.term} is
comprised of production rules. The production rules consist of
[terminals](#terminal){.term} and
[non-terminals](#non-terminal){.term}, with one
of the non-terminals being the [start symbol]{.term}.
Each production rule replaces one or more non-terminals
(perhaps with associated terminals) with one or more terminals and
non-terminals. Depending on the restrictions placed on the form of the
rules, there are classes of languages that can be represented by
specific types of grammars. A [derivation]{.term}
is a series of productions that results in a string (that
is, all non-terminals), and this derivation can be represented as a
[parse tree]{.term}.

### proof

The establishment of the truth of anything, a demonstration.

### proof by contradiction

A mathematical proof technique that proves a theorem by first
assuming that the theorem is false, and then uses a chain of
reasoning to reach a logical contradiction. Since when the theorem
is false a logical contradiction arises, the conclusion is that the
theorem must be true.

### proof by induction

A mathematical proof technique similar to
[recursion]{.term}. It is used to prove a
parameterized theorem \$S(n)\$, that is, a theorem where there is a
[induction variable]{.term} involved (such
as the sum of the numbers from 1 to \$n\$). One first proves that
the theorem holds true for a [base case]{.term},
then one proves the implication that whenever \$S(n)\$
is true then \$S(n+1)\$ is also true. Another variation is
[strong induction]{.term}.

### program

An instance, or concrete representation, of an algorithm in some
programming language.

### promotion

In the context of certain [balanced tree]{.term}
structures such as the [2-3 tree]{.term},
a promotion takes place when an insertion causes the
node to [overflow]{.term}. In the case of
the 2-3 tree, the [key]{.term} with the
middlemost value is sent to be stored in the parent.

### proving the contrapositive

We can prove that $P \Rightarrow Q$ by proving
$(\mathrm{not}\ Q) \Rightarrow (\mathrm{not}\ P)$.

### pseudo polynomial

In complexity analysis, refers to the time requirements of an
algorithm for an [NP-Complete]{.term}
problem that still runs acceptably fast for practical application.
An example is the standard [dynamic programming]{.term}
algorithm for the [knapsack problem]{.term}.

### pseudo random

In random number theory this means that, given all past terms in the
series, no future term of the series can be accurately predicted in
polynomial time.

### pseudo-random probing

In [hashing]{.term}, this is a
[collision resolution]{.term} method that
stores a random permutation of the values 1 through the size of the
[hash table]{.term}. Term $i$ of the
[probe sequence]{.term} is simply the value
of position $i$ in the permuation.

### push

A specialized term used to indicate inserting an
[element]{.term} onto a
[stack]{.term}.

### pushdown automata
### PDA

A type of [finite state automata]{.term} that adds a stack
memory to the basic [deterministic finite automata]{.term}
machine. This extends the set of languages that can be
recognize to the
[context-free languages](#context-free-language){.term}.

### quadratic growth rate

A growth rate function of the form $cn^2$ where $n$ is the input
size and $c$ is a constant.

### quadtree

A [full tree]{.term} where each internal
node has four children. Most typically used to store two dimensional
[spatial data]{.term}. Related to the
[bintree]{.term}. The difference is that the
quadtree splits all dimensions simultaneously, while the bintree
splits one dimension at each level. Thus, to extend the quadtree
concept to more dimensions requires a rapid increase in the number
of splits (for example, 8 in three dimensions).

### quadratic probing

In [hashing]{.term}, this is a
[collision resolution]{.term} method that
computes term $i$ of the [probe sequence]{.term}
using some quadratic equation $ai^2 _ bi + c$ for
suitable constants $a, b, c$. The simplest form is simply to use
$i^2$ as term $i$ of the probe sequence.

### queue

A list-like structure in which elements are inserted only at one
end, and removed only from the other one end.

### quicksort

A sort that is $\Theta(n \log n)$ in the
[best](#best-case){.term} and
[average](#average-case){.term} cases,
though $\Theta(n^2)$ in the [worst case]{.term}.
However, a reasonable implmentation will make the
worst case occur under exceedingly rare circumstances. Due to its
tight inner loop, it tends to run better than any other known sort
in general cases. Thus, it is a popular sort to use in code
libraries. It works by divide and conquer, by selecting a
[pivot]{.term} value, splitting the list
into parts that are either less than or greater than the pivot, and
then sorting the two parts.

### base
### radix

The number of digits in a number representation. For example, we typically
represent numbers in base (or radix) 10. Hexidecimal is base (or radix) 16.

### radix sort

A sorting algorithm that works by processing records with $k$ digit
keys in $k$ passes, where each pass sorts the records according to
the current digit. At the end of the process, the records will be
sorted. This can be efficient if the number of digits is small
compared to the number of records. However, if the $n$ records all
have unique key values, than at least $\Omega(\log n)$ digits are
required, leading to an $\Omega(n \log n)$ sorting algorithm that
tends to be much slower than other sorting algorithms like
[Quicksort]{.term} or
[mergesort]{.term}.

### random access

In [file processing]{.term} terminology, a
[disk access]{.term} to a random position
within the file. More generally, the ability to access an arbitrary
record in the file.

### random access memory
### RAM

Abbreviated RAM, this is the
principle example of [primary storage]{.term}
in a modern computer. Data access times are typically
measured in billionths of a second (microseconds), which is roughly
a million times faster than data access from a disk drive. RAM is
where data are held for immediate processing, since access times are
so much faster than for [secondary storage]{.term}.
RAM is a typical part of a computer's
[memory hierarchy]{.term}.

### random permutation

One of the $n!$ possible permutations for a set of $n$ element is
selected in such a way that each permutation has equal probability
of being selected.

### randomized algorithm

An algorithm that involves some form of randomness to control its
behavior. The ultimate goal of a randomized algorithm is to improve
performance over a deterministic algorithm to solve the same
problem. There are a number of variations on this theme. A "Las
Vegas algorithm" returns a correct result, but the amount of time
required might or might not improve over a
[deterministic algorithm]{.term}. A "Monte
Carlo algorithm" is a form of
[probabilistic algorithm]{.term} that is not
guarenteed to return a correct result, but will return a result
relatively quickly.

### range

The set of possible outputs for a function.

### range query

Records are returned if their relevant key value falls within a
specified range.

### rebalancing operation

An operation performed on balanced search trees, such as the
[AVL tree]{.term} or
[splay tree]{.term}, for the purpose of
keeping the tree [height balanced]{.term}.

### record

A collection of information, typically implemented as an
[object]{.term} in an
[object-oriented programming language](#object-oriented-programming-paradigm){.term}.
Many data structures are organized containers for a
collection of records.

### recurrence with full history

A special form of [recurrence relation]{.term}
that includes a summation with a copy of the recurrence
inside. The recurrence that represents the average case cost for
[Quicksort]{.term} is an example. This
internal summation can typically be removed with simple techniques
to simplify solving the recurrence.

### recurrence relation

A [recurrence relation]{.term} (or less
formally, recurrence) defines a function by means of an expression
that includes one or more (smaller) instances of itself. A classic
example is the [recursive](#recursion){.term}
definition for the factorial function,
$F(n) = n*F(n-1)$.

### recursion

The process of using recursive calls. An algorithm is recursive if
it calls itself to do part of its work. See
[recursion]{.term}.

### recursive call

Within a [recursive function]{.term}, it is
a call that the function makes to itself.

### recursive data structure

A data structure that is partially composed of smaller or simpler
instances of the same data structure. For example,
[linked lists](#linked-list){.term} and
[binary trees](#binary-tree){.term} can be
viewed as recursive data structures.

### recursive function

A function that includes a [recursive call]{.term}.

### recursively enumerable

A language $L$ is recursively enumerable if there exists a
[Turing machine]{.term} $M$ such that
$L = L(M)$.

### red-black tree

A balanced variation on a [BST]{.term}.

### reduction

In [algorithm analysis]{.term}, the process
of deriving
[asymptotic bounds](#asymptotic-analysis){.term}
for one [problem]{.term} from
the asymptotic bounds of another. In particular, if problem A can be
used to solve problem B, and problem A is proved to be in $O(f(n))$,
then problem B must also be in $O(f(n))$. Reductions are often used
to show that certain problems are at least as expensive as sorting,
or that certain problems are [NP-Complete]{.term}.

### reference

A value that enables a program to directly access some particular
[data item]{.term}. An example might be a
byte position within a file where the record is stored, or a pointer
to a record in memory. (Note that Java makes a distinction between a
reference and the concept of a pointer, since it does not define a
reference to necessarily be a byte position in memory.)

### reference count algorithm

An algorithm for [garbage collection]{.term}.
Whenever a reference is made from a variable to some
memory location, a counter associated with that memory location is
incremented. Whenever the reference is changed or deleted, the
reference count is decremented. If this count goes to zero, then the
memory is considered free for reuse. This approach can fail if there
is a cycle in the chain of references.

### reference parameter

A [parameter]{.term} that has been
[passed by reference](#pass-by-reference){.term}.
Such a parameter can be modified inside the function
or method.

### reflexive

In set notation, binary relation $R$ on set $S$ is reflexive if
$aRa$ for all $a \in \mathbf{S}$.

### region quadtree

A [spatial data structure]{.term} for
storing 2D pixel data. The idea is that the root of the tree
represents the entire image, and it is recursively divided into four
equal subquadrants if not all pixels associated with the current
node have the same value. This is structurally equivalent to a
[PR quadtree]{.term}, only the decomposition
rule is changed.

### regular grammar

And grammar that is either right-regular or left-regular. Every
regular grammar describes a regular language.

### regular language

A language $L$ is a regular language if and only if there exists a
[deterministic finite automata]{.term} $M$
such that $L = L(M)$.

### regular expression

A way to specify a set of strings that define a language using the
operators of union, contatenation, and star-closure. A regular
expression defines some [regular language]{.term}.

### relation

In set notation, a relation $R$ over set $\mathbf{S}$ is a set of
ordered pairs from $\mathbf{S}$.

### replacement selection

A variant of [heapsort]{.term} most often
used as one phase of an [external sort]{.term}.
Given a collection of records stored in an
[array]{.term}, and a stream of additional
records too large to fit into [working memory]{.term},
replacement selection will unload the
[heap]{.term} by sending records to an
output stream, and seek to bring new records into the heap from the
input stream in preference to shrinking the heap size whenever
possible.

### reserved block

In a [memory manager]{.term}, this refers to
space in the [memory pool]{.term} that has
been allocated to store data received from the
[client]{.term}. This is in contrast to the
[free blocks](#free-block){.term} that
represent space in the memory pool that is not allocated to storing
client data.

### resource constraints

Examples of resource constraints include the total space available
to store the data (possibly divided into separate main memory and
disk space constraints) and the time allowed to perform each
subtask.

### root

In a [tree]{.term}, the topmost
[node]{.term} of the tree. All other nodes
in the tree are [descendants](#descendant){.term}
of the root.

### rotation

In the [AVL tree]{.term} and
[splay tree]{.term}, a rotation is a local
operation performed on a node, its children, and its grandchildren
that can result in reordering their relationship. The goal of
performing a rotation is to make the tree more
[balanced](#balanced-tree){.term}.

### rotational delay

When processing a [disk access]{.term}, the
time that it takes for the first byte of the desired data to move to
under the [I/O head]{.term}. On average,
this will take one half of a disk rotation, and so constitutes a
substantial portion of the time required for the disk access.

### rotational latency

A synonym for [rotational delay]{.term}.

### run

A series of sorted records. Most often this refers to a (sorted)
subset of records that are being sorted by means of an
[external sort]{.term}.

### run file

A temporary file that is created during the operation of an
[external sort]{.term}, the run file
contains a collection of [runs](#run){.term}.
A common structure for an external sort is to first
create a series of runs (stored in a run file), followed by merging
the runs together.

### runtime environment

The environment in which a program (of a particular programming
language) executes. The runtime environment handles such activities
as managing the [runtime stack]{.term}, the
[free store]{.term}, and the
[garbage collector](#garbage-collection){.term},
and it conducts the execution of the program.

### run-time polymorphism

A form of [polymorphism]{.term} known as
Overriding. Overridden methods are those which implement a new
method with the same signature as a method inherited from its
[base class]{.term}. Compare to
[compile-time polymorphism]{.term}.

### runtime stack

The place where an [activation record]{.term}
is stored when a subroutine is called during a
program's runtime.

### scanner

The part of a [compiler]{.term} that is
responsible for doing [lexical analysis]{.term}.

### scope

The parts of a program that can see and access a variable.

### search key

A field or part of a record that is used to represent the record
when searching. For example, in a database of customer records, we
might want to search by name. In this case the name field is used as
the search key.

### search lower bound

The problem of searching in an [array]{.term}
has provable lower bounds for specific variations of
the problem. For an unsorted array, it is $\Omega(n)$
[comparisons](#comparison){.term} in the
[worst case]{.term}, typically proved using
an [adversary argument]{.term}. For a sorted
array, it is $\Omega(\log n)$ in the worst case, typically proved
using an argument similar to the
[sorting lower bound]{.term} proof. Indeed,
it is possible to search a sorted array in the average case in
$O(\log n)$ time.

### search problem

Given a particular key value $K$, the search problem is to locate a
[record]{.term} $(k_j, I_j)$ in some
collection of records **L** such that $k_j = K$ (if one exists).
[Searching]{.term} is a systematic method
for locating the record (or records) with key value $k_j = K$.

### search tree

A [tree]{.term} data structure that makes
search by [key]{.term} value more efficient.
A type of [container]{.term}, it is common
to implement an [index](#indexing){.term}
using a search tree. A good search tree implementation will
guarentee that insertion, deletion, and search operations are all
$\Theta(\log n)$.

### search trie

Any [search tree]{.term} that is a
[trie]{.term}.

### searching

Given a [search key]{.term} $K$ and some
collection of records **L**, searching is a systematic method for
locating the record (or records) in **L** with key value $k_j = K$.

### secondary clustering

In [hashing]{.term}, the tendency in certain
[collision resolution]{.term} methods to
create clustering in sections of the hash table. In
[primary clustering]{.term}, this is caused
by a cluster of keys that don't necessarily hash to the same slot
but which following significant portions of the same
[probe sequence]{.term} during collision
resolution. Secondary clustering results from the keys hashing to
the same slot of the table (and so a collision resolution method
that is not affected by the key value must use the same probe
sequence for all such keys). This problem can be resolved by
[double hashing]{.term} since its probe
sequence is determined in part by a second hash function.

### secondary key

A key field in a record such as salary, where a particular key value
might be duplicated in multiple records. A secondary key is more
likely to be used by a user as a search key than is the record's
[primary key]{.term}.

### secondary key index
### secondary index

Associates a [secondary key]{.term} value
with the [primary key]{.term} of each record
having that secondary key value.

### secondary storage

Refers to slower but cheaper means of storing data. Typical examples
include a [disk drive]{.term}, a USB memory
stick, or a solid state drive.

### sector

A unit of space on a [disk drive]{.term}
that is the amount of data that will be read or written at one time
by the disk drive hardware. This is typically 512 bytes.

### sector header

On a disk drive, a piece of information at the start of a
[sector]{.term} that allows the
[I/O head]{.term} to recognize the identity
(or equivalently, the address) of the current sector.

### seed

In random number theory, the starting value for a random number
series. Typically used with any
[linear congruential method]{.term}.

### seek

On a [disk drive]{.term}, the act of moving
the [I/O head]{.term} from one
[track]{.term} to another. This is usually
considered the most expensive step during a
[disk access]{.term}.

### selection sort

While this sort requires $\Theta(n^2)$ time in the
[best](#best-case){.term},
[average](#average-case){.term}, and
[worst](#worst-case){.term} cases, it
requires only $\Theta(n)$ swap operations. Thus, it does relatively
well in applications where swaps are expensive. It can be viewed as
an optimization on [bubble sort]{.term},
where a swap is deferred until the end of each iteration.

### self-organizing list

A list that, over a series of search operations, will make use of
some [heuristic]{.term} to re-order its
elements in an effort to improve search times. Generally speaking,
search is done sequentially from the beginning, but the
self-organizing heuristic will attempt to put the records that are
most likely to be searched for at or near the front of the list.
While typically not as efficient as
[binary search]{.term} on a sorted list,
self-organizing lists do not require that the list be sorted (and so
do not pay the cost of doing the sorting operation).

### self-organizing list heuristic

A [heuristic]{.term} to use for the purpose
of maintaining a [self-organizing list]{.term}.
Commonly used heuristics include
[move-to-front]{.term} and
[transpose]{.term}.

### separate chaining

In [hashing]{.term}, a synonym for
[open hashing](#open-hash-system){.term}

### sequence

In set notation, a collection of elements with an order, and which
may contain duplicate-valued elements. A sequence is also sometimes
called a [tuple]{.term} or a [vector]{.term}.

### sequential access

In [file processing]{.term} terminology, the
requirement that all records in a file are accessed in sequential
order. Alternatively, a storage device that can only access data
sequentially, such as a tape drive.

### sequential fit

In a [memory manager]{.term}, the process of
searching the [memory pool]{.term} for a
[free block]{.term} large enough to service
a [memory request]{.term}, possibly
reserving the remaining space as a free block. Examples are
[first fit]{.term},
[circular first fit]{.term},
[best fit]{.term}, and
[worst fit]{.term}.

### sequential search

The simplest search algorithm:   In an [array]{.term},
simply look at the array elements in the order that
they appear.

### sequential tree representation

A representation that stores a series of node values with the
minimum information needed to reconstruct the tree structure. This
is a technique for [serializing](#serialization){.term}
a tree.

### serialization

The process of taking a data structure in memory and representing it
as a sequence of bytes. This is sometimes done in order to transmit
the data structure across a network or store the data structure in a
[stream]{.term}, such as on disk.
[Deserialization]{.term}
reconstructs the original data structure from the serialized
representation.

### set

A collection of distinguishable [members](#member){.term}
or [elements](#element){.term}.

### set former

A way to define the membership of a set, by using a text
description. Example:   $\{x\ |\ x\ \mbox{is a positive integer}\}$.

### set product

Written $\mathbf{Q} \times \mathbf{P}$, the set product is a set of
ordered pairs such that ordered pair $(a, b)$ is in the product
whenever $a \in \mathbf{P}$ and $b \in \mathbf{Q}$. For example,
when $\mathbf{P} = \{2, 3, 5\}$ and $\mathbf{Q} = \{5, 10\}$,
$\mathbf{Q} \times \mathbf{P} =
\{(2, 5),\ (2, 10),\ (3, 5),\ (3, 10),\ (5, 5),\ (5, 10)\}$.

### shallow copy

Copying the [reference]{.term} or
[pointer]{.term} value without copying the
actual content.

### Shellsort

A sort that relies on the best-case cost of
[insertion sort]{.term} to improve over
$\Theta(n^2)$ [worst case]{.term} cost.

### shifting method

A technique for finding a [closed-form solution]{.term}
to a [summation]{.term} or
[recurrence relation]{.term}.

### shortest path

Given a [graph]{.term} with distances or
[weights](#weight){.term} on the
[edges](#edge){.term}, the shortest path
between two nodes is the path with least total distance or weight.
Examples of the shortest paths problems are the
[single-source shortest paths problem]{.term}
and the
[all-pairs shortest paths problem]{.term}.

### sibling

In a [tree]{.term}, a sibling of
[node]{.term} $A$ is any other node with the
same [parent]{.term} as $A$.

### signature

In a programming language, the signature for a function is its
return type and its list of parameters and their types.

### signature file

In document processing, a signature file is a type of
[bitmap]{.term} used to indicate which
documents in a collection contain a given keyword, such that there
is a [bitmap]{.term} for each keyword.

### simple cycle

In [graph]{.term} terminology, a
[cycle]{.term} is simple if its
corresponding [path]{.term} is simple,
except that the first and last [vertices](#vertex){.term}
of the cycle are the same.

### simple path

In [graph]{.term} terminology, a
[path]{.term} is simple if all vertices on
the path are distinct.

### simple type

A [data type]{.term} whose values contain no
subparts. An example is the integers.

### simulating recursion

If a programming language does not support
[recursion]{.term}, or if you want to
implement the effects of recursion more efficiently, you can use a
[stack]{.term} to maintain the collection of
subproblems that would be waiting for completion during the
recursive process. Using a loop, whenever a recursive call would
have been made, simply add the necessary program state to the stack.
When a return would have been made from the recursive call, pop the
previous program state off of the stack.

### single rotation

A type of [rebalancing operation]{.term}
used by the [splay tree]{.term} and
[AVL tree]{.term}.

### single-source shortest paths problem

Given a [graph]{.term} with
[weights](#weight){.term} or distances on
the [edges](#edge){.term}, and a designated
start [vertex]{.term} $s$, find the shortest
path from $s$ to every other vertex in the graph. One algorithm to
solve this problem is [Dijkstra's algorithm]{.term}.

### singly linked list
### one-way list

A [linked list]{.term} implementation
variant where each list node contains access a pointer only to the
next element in the list.

### skip list

A form of [linked list]{.term} that adds
additional links to improve the cost of fundamental operations like
insert, delete, and search. It is a
[probabilistic data structure]{.term} since
it adds the additional links using a
[probabilistic algorithm]{.term}. It can
implement a [dictionary]{.term} more
efficiently than a [BST]{.term}, and is
roughly as difficult to implement.

### slot

In [hashing]{.term}, a position in a
[hash table]{.term}.

### snowplow argument

An analogy used to give intuition for why 
[replacement selection]{.term} will generate
[runs](#run){.term} that are on average
twice the size of working memory. Records coming from the input
stream have key values that might be of any size, whose size is
related to the position of a falling snowflake. The replacement
selection process is analogous to a snowplow that moves around a
circular track picking up snow. In steady state, given a certain
amount of snow equivalent to [working memory]{.term}
size $M$, an amount of snow (incoming records from the
input stream) is expected to fall ahead of the plow as the size of
the working memory during one cycle of the plow (analogously, one
run of the replacement selection algorithm). Thus, the snowplow is
expected in one pass (one run of replacement selection) to pick up
$2M$ snow.

### software engineering

The study and application of engineering to the design, development,
and maintenance of software.

### software reuse

In [software engineering]{.term}, the
concept of reusing a piece of software. In particular, using an
existing piece of software (such as a function or library) when
creating new software.

### solution space

The possible solutions to a problem. This typically refers to an
[optimization problem]{.term}, where some
solutions are more desireable than others.

### solution tree

An ordering imposed on the set of solutions within a
[solution space]{.term} in the form of a
tree, typically derived from the order that some algorithm would
visit the solutions.

### sorted list

A [list]{.term} where the records stored in
the list are arranged so that their [key]{.term}
values are in ascending order. If the list uses an
[array-based list]{.term} implementation,
then it can use [binary search]{.term} for a
cost of $\Theta(\log n)$. But both insertion and deletion will be
require $\Theta(n)$ time.

### sorting lower bound

The lower bound for the [problem]{.term} of
[sorting](#sorting-problem){.term} is
$\Omega(n \log n)$. This is traditionally proved using a
[decision tree]{.term} model for sorting
algorithms, and recognizing that the minimum depth of the decision
tree for any sorting algorithm is $\Omega(n \log n)$ since there are
$n!$ permutations of the $n$ input records to distinguish between
during the sorting process.

### sorting problem

Given a set of records $r_1$, $r_2$, \..., $r_n$ with
[key]{.term} values $k_1$, $k_2$, \...,
$k_n$, the sorting problem is to arrange the records into any order
$s$ such that records $r_{s_1}$, $r_{s_2}$, \..., $r_{s_n}$ have
keys obeying the property
$k_{s_1} \leq k_{s_2} \leq ... \leq k_{s_n}$. In other words, the
sorting problem is to arrange a set of records so that the values of
their key fields are in non-decreasing order.

### space complexity

The [complexity]{.term} of an
[algorithm]{.term} or
[problem]{.term} with a
[cost model]{.term} that approximates
memory/storage usage.

### space/time tradeoff

Many programs can be designed to either speed processing at the cost
of additional storage, or reduce storage at the cost of additional
processing time.

### sparse matrix

A matrix whose values are mostly zero. There are a number of data
structures that have been developed to store sparse matrices, with
the goal of reducing the amount of space required to represent it as
compared to simply using a regular matrix representation that stores
a value for every matrix position.

### sparse graph

A [graph]{.term} where the actual number of
[edges](#edge){.term} is much less than the
possible number of edges. Generally, this is interpreted to mean
that the [degree]{.term} for any
[vertex]{.term} in the graph is relatively
low.

### spatial

Referring to a position in space.

### spatial application

An application what has spatial aspects. In particular, an
application that stores records that need to be searched by
location.

### spatial attribute

An attribute of a record that has a position in space, such as the
coordinate. This is typically in two or more dimensions.

### spatial data

Any object or record that has a position (in space).

### spatial data structure

A [data structure]{.term} designed to
support efficient processing when a
[spatial attribute]{.term} is used as the
key. In particular, a data structure that supports efficient search
by location, or finds all records within a given region in two or
more dimensions. Examples of spatial data structures to store point
data include the [bintree]{.term}, the
[PR quadtree]{.term} and the
[kd tree]{.term}.

### spindle

The center of a [disk drive]{.term} that
holds the [platters](#platter){.term} in
place.

### splay tree

A variant implementation for the [BST]{.term},
which differs from the standard BST in that it uses
modified insert and remove methods in order to keep the tree
[balanced](#balanced-tree){.term}. Similar
to an [AVL tree]{.term} in that it uses the
concept of [rotations](#rotation){.term} in
the insert and remove operations. While a splay tree does not
guarentee that the tree is balanced, it does guarentee that a series
of $n$ operations on the tree will have a total cost of
$\Theta(n \log n)$ cost, meaning that any given operation can be
viewed as having [amortized cost]{.term} of
$\Theta(\log n)$.

### splaying

The act of performing an [rebalancing operation]{.term}
on a [splay tree]{.term}.

### stable

A sorting algorithm is said to be stable if it does not change the
relative ordering of records with identical [key]{.term}
values.

### stack

A list-like structure in which elements may be inserted or removed
from only one end.

### stack frame

Frame of data that pushed into and poped from call stack

### stale pointer

Within the context of a [buffer pool]{.term}
or [memory manager]{.term}, this means a
[reference]{.term} to a
[buffer]{.term} or memory location that is
no longer valid. For example, a program might make a memory request
to a buffer pool, and be given a reference to the buffer holding the
requested data. Over time, due to inactivity, the contents of this
buffer might be flushed. If the program holding the buffer reference
then tries to access the contents of that buffer again, then the
data contents will have changed. The possibility for this to occur
depends on the design of the interface to the buffer pool system.
Some designs make this impossible to occur. Other designs make it
possible in an attempt to deliver greater performance.

### start state

In a [finite automata]{.term}, the
designated state in which the machine will always begin a
computation.

### start symbol

In a [grammar]{.term}, the designated
[non-terminal]{.term} that is the intial
point for [deriving](#derivation){.term} a
string in the langauge.

### state

The condition that something is in at some point in time. In
computing, this typically means the collective values of any
existing variables at some point in time. In an
[automata]{.term}, a state is an abstract
condition, possibly with associated information, that is primarily
defined in terms of the conditions that the automata may transition
from its present state to another state.

### static

Something that is not changing (in contrast to
[dynamic]{.term}). In computer programming,
static normally refers to something that happens at compile time.
For example, static analysis is analysis of the program's text or
structure, as opposed to its run-time behavior. Static binding or
static memory allocation occurs at compile time.

### static scoping

A synonym for [lexical scoping]{.term}.

### Strassen's algorithm

A [recursive](#recursion){.term} algorithm
for matrix multiplication. When multiplying two $n \times n$
matrices, this algorithm runs faster than the $\Theta(n^3)$ time
required by the standard matrix multiplication algorithm.
Specifically, Strassen's algorithm requires time
$Theta(n^{\log_2 7})$ time. This is achieved by refactoring the
sub-matrix multiplication and addition operations so as to need only
7 sub-matrix multiplications instead of 8, at a cost of additional
sub-matrix addition operations. Thus, while the asymptotic cost is
lower, the constant factor in the growth rate equation is higher.
This makes Strassen's algorithm inefficient in practice unless the
arrays being multiplied are rather large. Variations on Strassen's
algorithm exist that reduce the number of sub-matrix multiplications
even futher at a cost of even more sub-matrix additions.

### strategy

An approach to accomplish a task, often encapsulated as an
algorithm. Also the name for a [design pattern]{.term}
that separates the algorithm for performing a task from
the control for applying that task to each member of a collection. A
good example is a generic sorting function that takes a collection
of records (such as an [array]{.term}) and a
"strategy" in the form of an algorithm that knows how to extract
the key from a record in the array. Only subtly different from the
[visitor]{.term} design pattern, where the
difference is primarily one of intent rather than syntax. The
strategy design pattern is focused on encapsulating an activity that
is part of a larger process, so that different ways of performing
that activity can be substituted. The visitor design pattern is
focused on encapsulating an activity that will be performed on all
members of a collection so that completely different activities can
be substituted within a generic method that accesses all of the
collection members.

### stream

The process of delivering content in a
[serialized](#serialization){.term} form.

### strict partial order

In set notation, a relation that is [irreflexive]{.term},
[antisymmetric]{.term}, and
[transitive]{.term}.

### strong induction

An alternative formulation for the
[induction step]{.term} in a
[proof by induction]{.term}. The induction
step for strong induction is:   If **Thrm** holds for all
$k, c \leq k < n$, then **Thrm** holds for $n$.

### subclass

In
[object-oriented programming](#object-oriented-programming-paradigm){.term},
any class within a [class hierarchy]{.term}
that [inherits](#inherit){.term}
from some other class.

### subgraph

A subgraph $\mathbf{S}$ is formed from [graph]{.term}
$\mathbf{G}$ by selecting a [subset]{.term}
$\mathbf{V}_s$ of $\mathbf{G}$'s 
[vertices](#vertex){.term} and a subset $\mathbf{E}_s$
of $\mathbf{G}$'s [edges](#edge){.term}
such that for every edge $e \in \mathbf{E}_s$, both vertices of $e$
are in $\mathbf{V}_s$.

### subset

In set theory, a set $A$ is a subset of a set $B$, or equivalently
$B$ is a [superset]{.term} of $A$, if all
elements of $A$ are also elements of $B$.

### subtract-and-guess

A technique for finding a [closed-form solution]{.term}
to a [summation]{.term} or
[recurrence relation]{.term}.

### subtree

A subtree is a [subset]{.term} of the nodes
of a binary tree that includes some node $R$ of the tree as the
subtree [root]{.term} along with all the
[descendants](#descendant){.term} of $R$.

### successful search

When searching for a [key]{.term} value in a
collection of records, we might find it. If so, we call this a
successful search. The alternative is an
[unsuccessful search]{.term}.

### summation

The sum of costs for some [function]{.term}
applied to a range of parameter values. Often written using Sigma
notation. For example, the sum of the integers from 1 to $n$ can be
written as $\sum_{i=1}^{n} i$.

### superset

In set theory, a set $A$ is a [subset]{.term}
of a [set]{.term} $B$, or
equivalently $B$ is a [superset]{.term} of
$A$, if all [elements](#element){.term} of
$A$ are also elements of $B$.

### symbol table

As part of a [compiler]{.term}, the symbol
table stores all of the identifiers in the program, along with any
necessary information needed about the identifier to allow the
compiler to do its job.

### symmetric

In set notation, relation $R$ is symmetric if whenever $aRb$, then
$bRa$, for all $a, b \in \mathbf{S}$.

### symmetric matrix

A square matrix that is equal to its [transpose]{.term}.
Equivalently, for a $n \times n$ matrix $A$, for all
$i,j < n$, $A[i, j] = A[j, i]$.

### syntax analysis

A phase of [compilation](#compiler){.term}
that accepts [tokens](#token){.term}, checks
if program is syntactically correct, and then generates a
[parse tree]{.term}.

### tail

The end of a [list]{.term}.

### terminal

A specific character or string that appears in a
[production rule]{.term}. In contrast to a
[non-terminal]{.term}, which represents an
abstract state in the production. Similar to a
[literal]{.term}, but this is the term more
typically used in the context of a [compiler]{.term}.

### Theta notation

In [algorithm analysis]{.term}, $\Theta$
notation is used to indicate that the
[upper bound]{.term} and
[lower bound]{.term} for an
[algorithm]{.term} or
[problem]{.term} match.

### time complexity

The [complexity]{.term} of an
[algorithm]{.term} or
[problem]{.term} with a
[cost model]{.term} that approximates
runtime.

### token

The basic logical units of a program, as deterimined by
[lexical analysis]{.term}. These are things
like arithmetic operators, language keywords, variable or function
names, or numbers.

### tombstone

In [hashing]{.term}, a tombstone is used to
mark a [slot]{.term} in the
[hash table]{.term} where a record has been
deleted. Its purpose is to allow the
[collision resolution]{.term} process to
probe through that slot (so that records further down the
[probe sequence]{.term} are not unreachable
after deleting the record), while also allowing the slot to be
reused by a future insert operation.

### topological sort

The process of laying out the [vertices](#vertex){.term}
of a [DAG]{.term} in a
[linear order]{.term} such that no vertex
$A$ in the order is preceded by a vertex that can be reached by a
(directed) [path]{.term} from $A$. Usually
the (directed) edges in the graph define a prerequisite system, and
the goal of the topological sort is to list the vertices in an order
such that no prerequisites are violated.

### total order

A binary relation on a set where every pair of distinct elements in
the set are [comparable]{.term} (that is,
one can determine which of the two is greater than the other).

### total path length

In a [tree]{.term}, the sum of the
[levels](#level){.term} for each
[node]{.term}.

### Towers of Hanoi problem

A standard example of a recursive algorithm. The problem starts with
a stack of disks (each with unique size) stacked decreasing order on
the left pole, and two additional poles. The problem is to move the
disks to the right pole, with the constraints that only one disk can
be moved at a time and a disk may never be on top of a smaller disk.
For $n$ disks, this problem requires $\Theta(2^n)$ moves. The
standard solution is to move $n-1$ disks to the middle pole, move
the bottom disk to the right pole, and then move the $n-1$ disks on
the middle pole to the right pole.

### track

On a [disk drive]{.term}, a concentric
circle representing all of the [sectors](#sector){.term}
that can be viewed by the [I/O head]{.term}
as the disk rotates. The significance is that, for a
given placement of the I/O head, the sectors on the track can be
read without performing a (relatively expensive)
[seek]{.term} operation.

### track-to-track seek time

Expected (average) time to perform a [seek]{.term}
operation from a random [track]{.term}
to an adjacent track. Thus, this can be viewed as the
minimum possible seek time for the [disk drive]{.term}.
This is one of two metrics commonly provided by disk
drive vendors for disk drive performance, with the other being
[average seek time]{.term}.

### trailer node

Commonly used in implementations for a
[linked list]{.term} or related structure,
this [node]{.term} follows the last element
of the list. Its purpose is to simplify the code implementation by
reducing the number of special cases that must be programmed for.

### transducer

A machine that takes an input and creates an output. A
[Turing machine]{.term} is an example of a
transducer.

### transitive

In set notation, relation $R$ is transitive if whenever $aRb$ and
$bRc$, then $aRc$, for all $a, b, c \in \mathbf{S}$.

### transpose

In the context of linear algebra, the transpose of a matrix $A$ is
another matrix $A^T$ created by writing the rows of $A$ as the
columns of $A^T$. In the context of a
[self-organizing list]{.term}, transpose is
a [heuristic]{.term} used to maintain the
list. Under this heuristic, whenever a record is accessed it is
moved one position closer to the front of the list.

### trap state

In a [FSA]{.term}, any state that has all
transitions cycle back to itself. Such a state might be
[final](#final-state){.term}.

### traversal

Any process for visiting all of the objects in a collection (such as
a [tree]{.term} or [graph]{.term})
in some order.

### tree

A tree $\mathbf{T}$ is a finite set of one or more
[nodes](#node){.term} such that there is one
designated node $R$, called the [root]{.term}
of $\mathbf{T}$. If the set $(\mathbf{T} -\{R\})$ is
not empty, these nodes are partitioned into $n > 0$
[disjoint sets]{.term} $\mathbf{T}_0$,
$\mathbf{T}_1$, \..., $\mathbf{T}_{n-1}$, each of which is a tree,
and whose [roots](#root){.term}
$R_1, R_2, ..., R_n$, respectively, are
[children](#child){.term} of $R$.

### tree traversal

A [traversal]{.term} performed on a tree.
Traditional tree traversals include
[preorder](#preorder-traversal){.term} and
[postorder](#postorder-traversal){.term}
traversals for both [binary](#binary-tree){.term}
and [general](#general-tree){.term}
trees, and [inorder traversal]{.term}
that is most appropriate for a [BST]{.term}.

### trie

A form of [search tree]{.term} where an
internal node represents a split in the
[key space]{.term} at a predetermined
location, rather than split based on the actual
[key]{.term} values seen. For example, a
simple binary search trie for key values in the range 0 to 1023
would store all records with key values less than 512 on the left
side of the tree, and all records with key values equal to or
greater than 512 on the right side of the tree. A trie is always a
[full tree]{.term}. Folklore has it that the
term comes from "retrieval", and should be pronounced as "try"
(in contrast to "tree", to distinguish the differences in the
space decomposition method of a search tree versus a search trie).
The term "trie" is also sometimes used as a synonym for the
[alphabet trie]{.term}.

### truth table

In symbolic logic, a table that contains as rows all possible
combinations of the boolean variables, with a column that shows the
outcome (true or false) for the expression when given that row's
truth assignment for the boolean variables.

### Turing-acceptable

A language is $Turing-acceptable$ if there is some
[Turing machine]{.term} that
[accepts](#accept){.term} it. That is, the
machine will halt in an accepting configuration if the string is in
the language, and go into a
[hanging configuration]{.term} if the string
is not in the language.

### Turing-computable function

Any function for which there exists a Turing machine that can
perform the necessary work to compute the function.

### Turing-decidable

A language is Turing-decideable if there exists a Turing machine
that can clearly indicate for every string whether that string is in
the language or not. Every Turing-decidable language is also
Turing-acceptable, because the Turing machine that can decide if the
string is in the language can be modified to go into a
[hanging configuration]{.term} if the string
is not in the language.

### Turing machine

A type of [finite automata]{.term} that,
while simple to define completely, is capable of performing any
computation that can be performed by any known computer.

### tuple

In set notation, another term for a [sequence]{.term}.

### two-coloring

An assignment from two colors to regions in an image such that no
two regions sharing a side have the same color.

### type

A collection of values.

### unary notation

A way to represent [natural numbers]{.term},
where the value of zero is represented by the empty string, and the
value $n$ is represented by a series of $n$ marks.

### uncountably infinite
### uncountable

An infinite set is uncountably infinite
if there does not exist any mapping from it to the set of integers. This
is often proved using a [diagonalization argument]{.term}.
The real numbers is an example of an uncountably infinite
set.

### underflow

The condition where the amount of data stored in an entity has
dropped below some minimum threshold. For example, a node in a
[B-tree]{.term} is required to be at least
half full. If a record deletion causes the node to be less than half
full, then it is in a condition of underflow, and something has to
be done to correct this.

### undirected graph

A [graph]{.term} whose
[edges](#edge){.term} do not have a
direction.

### undirected edge

An [edge]{.term} that connects two
[vertices](#vertex){.term} with no direction
between them. Many graph representations will represent such an edge
with two [directed edges](#directed-edge){.term}.

### UNION

One half of the [UNION/FIND]{.term}
algorithm for managing [disjoint sets]{.term}.
It is the process of merging two trees that are
represented using the
[parent pointer representation]{.term} by
making the root for one of the trees set its parent pointer to the
root of the other tree.

### UNION/FIND

A process for mainining a collection of disjoint sets. The
[FIND]{.term} operation determines which
disjoint set a given object resides in, and the
[UNION]{.term} operation combines two
disjoint sets when it is determined that they are members of the
same [equivalence class]{.term} under some
[equivalence relation]{.term}.

### uninitialized

Uninitialized variable means it has no initial value.

### unit production

A unit production is a [production]{.term}
in a [grammar]{.term} of the form
$A \rightarrow B$, where $A, B \in$ the set of
[non-terminals](#non-terminal){.term} for
the grammar. Any grammar with unit productions can be rewritten to
remove them.

### unsolveable problem

A problem that can proved impossible to solve on a computer. The
classic example is the [halting problem]{.term}.

### unsorted list

A [list]{.term} where the records stored in
the list can appear in any order (as opposed to a
[sorted list]{.term}). An unsorted list can
support efficient ($\Theta(1)$) insertion time (since you can put
the record anywhere convenient), but requires $\Theta(n)$ time for
both search and and deletion.

### unsuccessful search

When searching for a [key]{.term} value in a
collection of records, we might not find it. If so, we call this an
unsuccessful search. Usually we require that this means that no
record in the collection actually has that key value (though a
[probabilistic algorithm]{.term} for search
might not require this to be true). The alternative to an
unsuccessful search is a [successful search]{.term}.

### unvisited

In [graph]{.term} algorithms, this refers to
a node that has not been processed at the current point in the
algorithm. This information is typically maintained by using a
[mark array]{.term}.

### upper bound

An upper bound for a [growth rate]{.term}
$f$ is any growth rate $g$ that is greater than or equal to it.
Formally, there are constants $n_0 \geq 0$ and $C > 0$ such that
$f(n) \leq C g(n)$ for all $n \geq n_0$. We also write $f \in O(g)$
or slightly imprecisely $f(n) \in O(g(n))$ (this is
[big-Oh notation]{.term}).

Usually, we are interested in finding an upper bound $g$ that has a
simple expression compared to $f$, but is still sharp (there is not
much room for improvement).

In [algorithm analysis]{.term}, an upper
bound for an algorithm is an upper bound for the
[asymptotic complexity]{.term} of the
algorithm, the growth rate of its [complexity]{.term}.
In practice, we are looking for the best possible
upper bound that has a simple mathematical expression. For example,
we may write $T(n) \in O(n^2)$ if $T$ is the (time) complexity of
the algorithm to say that the complexity is quadratic, i.e. the
asymptoptic complexity of the algorithm has as upper bound the
growth rate given by squaring.

### value parameter

A [parameter]{.term} that has been
[passed by value](#pass-by-value){.term}.
Changing such a parameter inside the function or method will not
affect the value of the calling parameter.

### variable-length coding

Given a collection of objects, a variable-length coding scheme
assigns a code to each object in the collection using codes that can
be of different lengths. Typically this is done in a way such that
the objects that are most likely to be used have the shortest codes,
with the goal of minimizing the total space needed to represent a
sequence of objects, such as when representing the characters in a
document. [Huffman coding](#huffman-codes){.term}
is an example of a variable-length coding scheme. This
is in contrast to [fixed-length coding]{.term}.

### vector

In set notation, another term for a [sequence]{.term}.
As a data structure, the term vector usually used as a
snyonym for a [dynamic array]{.term}.

### vertex

Another name for a [node]{.term} in a [graph]{.term}.

### virtual memory

A memory management technique for making relatively fast but small
memory appear larger to the program. The large "virtual" data
space is actually stored on a relatively slow but large
[backing storage]{.term} device, and
portions of the data are copied into the smaller, faster memory as
needed by use of a [buffer pool]{.term}. A
common example is to use [RAM]{.term} to
manage access to a large virtual space that is actually stored on a
[disk drive]{.term}. The programmer can
implement a program as though the entire data content were stored in
RAM, even if that is larger than the physical RAM available making
it easier to implement.

### visit

During the process of a [traversal]{.term}
on a [graph]{.term} or
[tree]{.term} the action that takes place on
each [node]{.term}.

### visited

In [graph]{.term} algorithms, this refers to
a node that has previously been processed at the current point in
the algorithm. This information is typically maintained by using a
[mark array]{.term}.

### visitor

A [design pattern]{.term} where a
[traversal]{.term} process is given a
function (known as the visitor) that is applied to every object in
the collection being traversed. For example, a generic tree or graph
traversal might be designed such that it takes a function parameter,
where that function is applied to each node.

### volatile

In the context of computer memory, this refers to a memory that
loses all stored information when the power is turned off.

### weight

A cost or distance most often associated with an
[edge]{.term} in a [graph]{.term}.

### weighted graph

A [graph]{.term} whose
[edges](#edge){.term} each have an
associated [weight]{.term} or cost.

### weighted path length

Given a tree, and given a [weight]{.term}
for each leaf in the tree, the weighted path length for a leaf is
its weight times its [depth]{.term}.

### weighted union rule

When merging two disjoint sets using the
[UNION/FIND]{.term} algorithm, the weighted
union rule is used to determine which subtree's root points to the
other. The root of the subtree with fewer nodes will be set to point
to the root of the subtree with more nodes. In this way, the average
depth of nodes in the resulting tree will be less than if the
assignment had been made in the other direction.

### working memory

The portion of [main memory]{.term}
available to an algorithm for its use. Typically refers to main
memory made available to an algorithm that is operating on large
amounts of data stored in [peripheral storage]{.term},
the working memory represents space that can hold some
subset of the total data being processed.

### worst case

In [algorithm analysis]{.term}, specifically
[complexity]{.term} of an algorithm, the
[problem instance]{.term} from among all
problem instances for a given input size $n$ that has the greatest
cost.

Every input size $n$ has its own worst case. We **never** consider
the worst case as removed from input size.

### worst fit

In a [memory manager]{.term}, worst fit is a
[heuristic]{.term} for deciding which
[free block]{.term} to use when allocating
memory from a [memory pool]{.term}. Worst
fit will always allocate from the largest free block. The rationale
is that this will be the method least likely to cause
[external fragmentation]{.term} in the form
of small, unuseable memory blocks. The disadvantage is that it tends
to eliminate the availability of large freeblocks needed for
unusually large requests.

### zigzig

A type of [rebalancing operation]{.term}
used by [splay trees](#splay-tree){.term}.

### Zipf distribution

A data distribution that follows Zipf's law, an emprical
observation that many types of data studied in the physical and
social sciences follow a power law probability distribution. That
is, the frequency of any record in the data collection is inversely
proportional to its rank when the collection is sorted by frequency.
Thus, the most frequently appearing record has a frequency much
higher than the next most frequently appearing record, which in turn
has a frequency much higher than the third (but with ratio slightly
lower than that for the first two records) and so on. The
[80/20 rule]{.term} is a casual
characterization of a Zipf distribution. Adherence to a Zipf
distribution is important to the successful operation of a
[cache](#caching){.term} or
[self-organizing list]{.term}.

### zone

In [memory management](#memory-manager){.term},
the concept that different parts of the
[memory pool]{.term} are handled in
different ways. For example, some of the memory might be handled by
a simple [freelist]{.term}, while other
portions of the memory pool might be handled by a
[sequential fit]{.term} memory manager. On a
[disk drive]{.term} the concept of a zone
relates to the fact that there are limits to the maximum data
density, combined with the fact that the need for the same angular
distance to be used for a sector in each track means that tracks
further from the center of the disk will become progressively less
dense. A zone in this case is a series of adjacent tracks whose data
density is set by the maximum density of the innermost track of that
zone. The next zone can then reset the data density for its
innermost track, thereby gaining more total storage space while
preserving angular distance for each sector.

:::
