
## Binary trees {#trees:binary-trees}

In general, a tree node may have any number of children.
But a very important special case is the [binary tree]{.term}.
A binary tree is either empty or consists of a root node with exactly two children, each of which is itself a binary tree.
The two children are ordered, meaning that we distinguish between the left child and the right child.
A node whose left and right subtrees are both empty is called a _leaf node_, and non-leaves are called _internal nodes_.

@Fig:example_bintree shows two representations of the same binary tree.
The left-hand side is how we usually draw a tree, but the right-hand drawing is more accurate,
because the empty subtrees are made explicit by the black dots.
We will use this tree as a running example in this section and the next.
Before continuing, take a moment to study it and consider the following questions:
Which are the leaf nodes and the internal nodes?
What is the path from node $A$ to node $H$?
What are the descendants of node $C$, and how many subtrees are there in total?
These questions will help you become familiar with the terminology and structure of binary trees.

Sometimes binary trees are described as trees in which each node has *at most* two children.
Unfortunately, this is not an accurate description, because it obscures an important detail:
if a node has only one child, it matters whether it is a left child or a right child.
For this reason, it is often clearer to think of every node as having both a left subtree and a right subtree,
where either subtree can be empty.
This becomes even more apparent when we discuss how to implement them.

![
    An example of a binary tree with 9 nodes.
    To the left is how we usually draw the tree, but
    to the right is how it is actually represented, where the black dots are empty trees.
](images/9.1-bintree-with-nulls.svg){#fig:example_bintree}



### Implementing binary trees {#trees:implementing-binary-trees}

By definition, each node has two children, although either or both may be empty.
A node also typically stores one or several values, with the type depending on the application.
The most common implementation of tree nodes therefore consists of
references to its element and its two children (where either of them can be empty):

    datatype Node of T:
        elem: T             // The element of the node
        left: Node = null   // Left child, where null means it is empty
        right: Node = null  // Right child

This is a recursive definition, just as the [linked list]{.term} from @sec:sequences:linked-lists.
The only difference is that a tree node has *two* children and not just one.
Note that since a tree node contains pointers to its children,
a `Node` object represents not just a single node, but also the root of a subtree.
@Fig:bintree_with_pointers shows how our running example tree from @fig:example_bintree appears in memory,
where there is space allocated for the child pointers.

![
    Illustration of the pointer-based binary tree implementation, where each node stores a value and two child pointers.
    A black dot in a pointer cell indicates an empty subtree.
](images/9.1-bintree-with-pointers.svg){#fig:bintree_with_pointers}

We can easily extend the `Node` type for different applications, by storing additional data in each node.
For example, if we want to implement a [map]{.term} using a [search tree]{.term},
we usually include both the search *key* and the *value* in our datatype.
In addition, it is often useful to store the size or the height of every tree node,
for example when implementing *self-balancing* search trees.
Search trees are discussed further in [Chapter @sec:search-trees].

Sometimes one might feel the need to add a pointer to the parent of a node, making it easy to move upward in the tree.
In practice, however, a parent pointer is rarely necessary and increases the space overhead of the tree.
The problem is not only the extra space, but relying on parent pointers also makes the code more complicated
and increases the risk for hard-to-capture bugs.
If you find yourself wanting a parent pointer, it is worth considering whether there is a cleaner or more efficient approach.

Here is an example of a program that computes the height of a tree.
Since `Node` is a recursive data type, it is often most natural to define functions on it recursively, with the empty tree (`null`) as the base case.

    height(node) -> Int:
        if node is null:
            return -1
        return 1 + max(height(node.left), height(node.right))

Study the code and convince yourself that `height(A)` on our example tree will return the value 3.
How would you modify the code to compute the *size* of a tree instead of the height?

#### Wrapper data type

It is convenient to declare a wrapper datatype for the actual binary tree,
similar to what we did for linked lists in @sec:sequences:linked-stacks.
The wrapper type stores a reference to the root node, and can also maintain metadata such as the total size of the tree:

    datatype BinaryTree:
        root: Node = null  // Root node, null means the tree is empty
        size: Int = 0      // The tree size, but we can add any other information too


### Unbalanced, balanced and perfect trees {#trees:unbalanced-perfect}

There are several special cases of binary trees that have their own names,
but arguably the most important concept is how *balanced* a tree is.
The basic idea is that a balanced tree has as low height as possible.
And since the height of a tree is the length of the longest path,
this means that the maximum level should be as low as possible.
In many cases it is desirable to have balanced trees,
for example when implementing binary heaps in @sec:heaps:binary-heaps or search trees in [Chapter @sec:search-trees].
But this is not always the case -- in @sec:heaps:meldable-heaps we see an example where we want *unbalanced* trees instead.

@Fig:unbalaced-perfect-trees shows four example trees with 7 nodes each.
The leftmost tree is as unbalanced as it can be:
the leaf $X$ is on level 6 and this is the largest level for any tree of size 7.
The two trees in the middle are unbalanced and balanced, but not completely so.
The rightmost tree is as balanced as possible, because every level is filled completely,
and therefore all leaves are at the same level.
This is is called a *perfect* tree.
Try to answer the question: what is the size of a perfect tree of level $k$?

What is the height of an unbalanced or a balanced tree of size $n$?
In a completely unbalanced tree, the height is $n{-}1$.
In a perfect tree, each level contains twice as many nodes as the previous level.
This means that if we increase the level by one, we can fit approximately twice the number of nodes.
Therefore, the size of the tree is *exponential* in its maximum level,
and therefore the maximum level is *logarithmic* in the tree size.
Which means that a perfect tree has height $h\in O(\log(n))$.
Can you come up with an exact equation that gives the height of a perfect tree of size $n$?

We can generalise all this to say that the height of
an unbalanced tree is linear in its size, $O(n)$, and
a balanced tree is logarithmic, $O(\log(n))$.
Of course, most trees are somewhere in between.

![
    Examples of more and more balanced binary trees, all containing 7 nodes.
    The leftmost tree is as unbalanced as it can be, and
    the rightmost is *perfect* because all leaves are on the same level.
](images/9.1-unbalanced-perfect-trees.svg){#fig:unbalaced-perfect-trees}
