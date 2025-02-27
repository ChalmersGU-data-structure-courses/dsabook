
## Red-black trees


<!--
### Exercise 1

<avembed-todo id="redBlackTreeColoring" src="Development/redBlackTreeColoring.html" type="pe" name="Red-Black Tree Coloring Exercise"/>

### Exercise 2

<avembed-todo id="redBlackTreePRO" src="Development/redBlackTreePRO.html" type="pe" name="Red-Black Tree Proficiency Exercise"/>
-->


A 2-3 tree is a conceptually elegant way to maintain a balanced search
tree. By extending the binary search tree with 3-nodes, we can keep the
tree perfectly balanced at all times. By alternating *splitting* and
*merging*, we can add new elements to the tree without breaking the
invariant.

2-3 trees are, however, rarely used in practice. There are two major
problems with them:

-   The code to implement them is quite complicated, even though the
    algorithms are conceptually simple. This is because there are many
    different cases - for example, inserting into the left child, the
    middle child, or the right child of a node all require different
    code, even though the algorithm is conceptually the same. This only
    gets worse when we consider that some of the code also needs to
    handle 4-nodes, which are created temporarily during insertion.
-   Most programming languages do not allow an object to change in size.
    However, in a 2-3 tree, we sometimes need to change a 2-node into a
    3-node. Therefore, all node objects must be big enough to store a
    3-node. This wastes a lot of memory.

In short, 2-3 trees are excellent on paper, but annoying to implement in
code - better as slideware than software. In this section, we shall
learn about red-black trees, which take the idea of 2-3 trees and adapt
it to be easier to code. Red-black trees are very efficient, and widely
used in practice. For example, TreeMap in Java and std::map in C++ are
both based on red-black trees.

Think back to binary heaps. A binary heap is conceptually a binary tree,
but it is represented as an array. The algorithms for modifying binary
heaps are conceptually tree algorithms, but we translated them to work
on the array representation of binary heaps.

Red-black trees are based on a similar idea. A red-black tree is
conceptually a 2-3 tree, but we represent it using a binary search tree.
The nodes of the 2-3 tree become nodes in the binary search tree.

A red-black tree is a binary search tree, but every node in the tree
also has a colour, either red or black. The colour of a node is stored
as a field in the node.

Given a 2-3 tree, here is how we represent it as a red-black tree. A
2-node is just going to become a single node in the tree, coloured
black:

A 3-node is going to turn into two nodes: a parent and its left child.
The parent is coloured black and the child is coloured red.

Here is an example of a 2-3 tree, and how it looks as a red-black tree.

Notice that, starting from the red-black tree, we can reconstruct the
2-3 tree. A black node with a red left child corresponds to a 3-node,
and any other black node corresponds to a 2-node.

Quiz: Which of the following red-black trees correspond to valid 2-3
trees? That is, is there a 2-3 tree which, when translated, gives the
red-black tree? Don't forget that a valid 2-3 tree must also be
perfectly balanced.

We are now ready to see the invariant for red-black trees. One way to
state the invariant is: *a red-black tree is valid if it corresponds to
a valid 2-3 tree*. However, we are going to state the invariant more
directly, in terms of the colours of the nodes in the red-black tree. A
red-black tree must obey the following rules:

1\. The root of the tree must be black. (Because it must correspond to
either a 2-node or a 3-node.) 2. If a node is red, it must be the left
child of a black node. (This is how 3-nodes are represented.) 3. On
every path from the root to a null, there must be the same number of
black nodes.

\... OR \...

Recall that in a 2-3 tree we have the following properties:

1.  The tree is ordered (similar to a BST). 2. Every node is either a
    2-node or a 3-node. 3. On any path from the root to a null, there
    are the same number of nodes. (This is the perfect balance
    property.)

Since a red-black tree is supposed to be the translation of a valid 2-3
tree, we are going to take the 2-3 tree invariants and translate them to
talk about BSTs. By doing so, we get the following invariants for a
red-black tree:

1.  It must be a valid BST. 2. A red node can only occur as the left
    child of a black node. (In particular, the root must not be red.)
    3.

        On any path from the root to a null, there are the same number

        :   of *black* nodes.

example black, partial nodes, etc

We consider null to be black. XXX it correponds to a whole node in the
2-3 tree


### Implementation

For information about red-black trees, see the lecture handout "2-3
trees and red-black trees" under Theme 4 (Search trees).

Here is an implementation of red-black trees:

    // A node in a red-black tree.
    class RedBlackNode:
        RedBlackNode(key, value, isRed):
            this.key = key
            this.value = value
            this.isRed = isRed
            this.left = left
            this.right = right


    // A map implemented using a binary search tree.
    class RedBlackMap implements Map:
        RedBlackMap():
            this.root = null
            this.treeSize = 0

        get(key):
            // Look up the value associated with a key.
            return this.getHelper(this.root, key)

        getHelper(node, key):
            // This is exactly the same as getHelper for BSTMap.
            if node is null:
                return null
            else if key < node.key:
                return this.getHelper(node.left, key)
            else if key > node.key:
                return this.getHelper(node.right, key)
            else:
                return node.value

        def put(key, value):
            // Add a key-value pair, or update the value associated with an existing key.
            // This is the same as BSTMap.put, except that it rebalances the node afterwards,
            // and colors the root node black.
            this.root = this.putHelper(this.root, key, value)
            this.root.isRed = false

        putHelper(node, key, value):
            // Recursive helper method for 'put', returns the updated node.
            if node is null:
                this.treeSize = this.treeSize + 1
                return new AVLNode(key, value)
            else if key < node.key:
                node.left = this.putHelper(node.left, key, value)
                this.updateHeight(node)
            else if key > node.key:
                node.right = this.putHelper(node.right, key, value)
                this.updateHeight(node)
            else: // key == node.key
                node.value = value
            return this.rebalance(node)

        def remove(key):
            // Delete a key: not implemented yet!

        isRed(node):
            // Leaves (null nodes) are black by definition.
            return node is not null and node.isRed

        rebalance(node):
            if node is null:
                return null
            // Skew:
            if this.isRed(node.right):
                node = this.rotateLeft(node)
            // Split part 1:
            if this.isRed(node.left) and this.isRed(node.left.left):
                node = this.rotateRight(node)
            // Split part 2:
            if this.isRed(node.left) and this.isRed(node.right):
                node.left.isRed = false
                node.right.isRed = false
                node.isRed = true
            return node

        rotateLeft(x):
            // Left rotation.
            ("""      x                 y
                     / \               / \
                    A   y     ===>    x   C
                       / \           / \
                      B   C         A   B         """)
            // Variables are named according to the picture above.
            y = x.right; B = y.left
            x.right = B; y.left = x
            // We also swap x's and y's colours
            // (e.g. if x was red before, then y will be red afterwards).
            y.isRed, x.isRed = this.isRed(x), this.isRed(y)
            return y

        rotateRight(x):
            // Right rotation.
            ("""       x              y
                      / \            / \
                     y   C   ===>   A   x
                    / \                / \
                   A   B              B   C       """)
            // Variables are named according to the picture above.
            y = x.left
            B = y.right
            x.left = B
            y.right = x
            // We also swap x's and y's colours
            y.isRed, x.isRed = this.isRed(x), this.isRed(y)
            return y
