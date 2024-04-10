
## The Red-Black Tree (WORK IN PROGRESS) {#red-black-tree}

<!--
### Exercise 1

<avembed-todo id="redBlackTreeColoring" src="Development/redBlackTreeColoring.html" type="pe" name="Red-Black Tree Coloring Exercise"/>

### Exercise 2

<avembed-todo id="redBlackTreePRO" src="Development/redBlackTreePRO.html" type="pe" name="Red-Black Tree Proficiency Exercise"/>
-->


### Red-black trees

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



### Red-Black Trees Code

For information about red-black trees, see the lecture handout "2-3
trees and red-black trees" under Theme 4 (Search trees).

Here is an implementation of red-black trees:

```python
# Python does not have internal classes, so we have to make the tree node class standalone.
class Node:
    """A node in a red-black tree."""

    def __init__(self, is_red, key, value, left = None, right = None):
        self._is_red = is_red
        self.key = key
        self.value = value
        self.left = left
        self.right = right

    def is_red(self):
        if self is None:
            return False
        else:
            return self._is_red


class RedBlackMap(Map):
    """A dictionary implemented using a binary search tree."""

    def __init__(self):
        self.root = None
        self.treeSize = 0

    def check_invariant(self):
        """Check that the invariant holds."""
        assert not Node.is_red(self.root), "red root"
        keys = list(self)
        assert len(keys) == self.treeSize, "wrong tree size"
        self.check_invariant_helper(self.root, None, None)

    @staticmethod
    def check_invariant_helper(node, lo, hi):
        """Recurive helper method for 'check_invariant'.
        Checks that the node is the root of a valid red-black tree, and that
        all keys k satisfy lo < k < hi. The test lo < k is skipped
        if lo is None, and k < hi is skipped if hi is None.
        Returns the "black height" of the tree."""

        if node is None: return 0

        assert lo is None or node.key > lo, "key too small"
        assert hi is None or node.key < hi, "key too big"

        assert not Node.is_red(node.right), "red right child"

        assert not (Node.is_red(node) and Node.is_red(node.left)), "red node with red left child"

        # Keys in the left subtree should be < node.key
        # Keys in the right subtree should be > node.key
        h1 = RedBlackMap.check_invariant_helper(node.left, lo, node.key)
        h2 = RedBlackMap.check_invariant_helper(node.right, node.key, hi)
        assert h1 == h2, "unbalanced tree"

        return h1 + (0 if Node.is_red(node) else 1)

    def isEmpty(self):
        """Return true if there are no keys."""
        return self.root is None
    
    def size(self):
        """Return the number of keys."""
        return self.treeSize

    def containsKey(self, key):
        """Return true if the key has an associated value."""
        return self.get(key) is not None

    def get(self, key):
        """Look up a key."""
        return self.get_helper(self.root, key)

    @staticmethod
    def get_helper(node, key):
        """Helper method for 'get'."""
        if node is None:
            return None
        elif node.key > key:
            return RedBlackMap.get_helper(node.left, key)
        elif node.key < key:
            return RedBlackMap.get_helper(node.right, key)
        else:
            return node.value

    def put(self, key, value):
        """Add a key-value pair, or update the value associated with an existing key. 
        Returns the value previously associated with the key, 
        or None if the key was not present."""
        self.root, old_value = self.put_helper(self.root, key, value)
        if Node.is_red(self.root):
            self.root._is_red = False
        if old_value is None:
            self.treeSize += 1
        return old_value

    @staticmethod
    def put_helper(node, key, value):
        """Recursive helper method for 'put'.
        Returns the updated node, and the value previously associated with the key."""
        if node is None:
            return Node(True, key, value, None, None), None
        elif node.key > key:
            node.left, old_value = RedBlackMap.put_helper(node.left, key, value)
        elif node.key < key:
            node.right, old_value = RedBlackMap.put_helper(node.right, key, value)
        else: # node.key == key
            old_value = node.value
            node.value = value
        return RedBlackMap.rebalance(node), old_value

    def remove(self, key):
        """Delete a key. 
        Not implemented yet!"""
        raise NotImplementedError("remove is not implemented yet")

    @staticmethod
    def rebalance(node):
        if node is None: return None
        
        # Skew
        if Node.is_red(node.right):
            node = RedBlackMap.rotate_left(node)

        # Split part 1
        if Node.is_red(node.left) and Node.is_red(node.left.left):
            node = RedBlackMap.rotate_right(node)

        # Split part 2
        if Node.is_red(node.left) and Node.is_red(node.right):
            node.left._is_red = False
            node.right._is_red = False
            node._is_red = True

        return node

    @staticmethod
    def rotate_left(node):
        """
        Left rotation.

           x                 y
          / \               / \
         A   y     ===>    x   C
            / \           / \
           B   C         A   B
        """
        # Variables are named according to the picture above.
        x = node
        A = x.left
        y = x.right
        B = y.left
        C = y.right

        # We also swap x's and y's colours
        # (e.g. if x was black before, then y will be black afterwards).
        return Node(is_red = x.is_red(), key = y.key, value = y.value,
                    left =
                        Node(is_red = y.is_red(), key = x.key, value = x.value,
                             left = A, right = B),
                    right = C)

    @staticmethod
    def rotate_right(node):
        """
        Right rotation.

             x              y
            / \            / \
           y   C   ===>   A   x
          / \                / \
         A   B              B   C
        """
        # Variables are named according to the picture above.
        x = node
        y = x.left
        A = y.left
        B = y.right
        C = x.right

        # We also swap x's and y's colours
        # (e.g. if x was black before, then y will be black afterwards).
        return Node(is_red = x.is_red(), key = y.key, value = y.value,
                    left = A,
                    right =
                        Node(is_red = y.is_red(), key = x.key, value = x.value,
                             left = B, right = C))

    def __iter__(self):
        """Iterate through all keys.
        This is called when the user writes 'for key in bst: ...'."""
        return self.iter_helper(self.root)

    @staticmethod
    def iter_helper(node):
        """Helper method for '__iter__'."""

        # This method is a generator:
        # https://docs.python.org/3/howto/functional.html#generators
        # Generators are an easy way to make iterators
        if node is None:
            return
        else:
            for key in RedBlackMap.iter_helper(node.left):
                yield key
            yield node.key
            for key in RedBlackMap.iter_helper(node.right):
                yield key

    def __getitem__(self, key):
        """This is called when the user writes 'x = bst[key]'."""
        return self.get(key)
    
    def __setitem__(self, key, value):
        """This is called when the user writes 'bst[key] = value'."""
        self.put(key, value)

    def __contains__(self, key):
        """This is called when the user writes 'key in bst'."""
        return self.containsKey(key)

    def __delitem__(self, key):
        """This is called when the user writes 'del bst[key]'."""
        self.remove(key)
```

```java
/* *** ODSATag: Header *** */
// A dictionary implemented using an red-black tree.
public class RedBlackMap<K extends Comparable<K>, V> implements Map<K, V> {
    Node root = null;   // The root of the red black tree.
    int treeSize = 0;   // The size of the tree.
/* *** ODSAendTag: Header *** */

/* *** ODSATag: Node *** */
    // A node in an red-black tree.
    class Node {
        K key;
        V value;
        Node left;
        Node right;
        boolean isRed;

        Node(boolean isRed, K key, V value, Node left, Node right) {
            this.key = key;
            this.value = value;
            this.left = left;
            this.right = right;
            this.isRed = isRed;
        }
    }
/* *** ODSAendTag: Node *** */

    // Check if a node is red. 'null' is always black.
    boolean isRed(Node node) {
        if (node == null) return false;
        return node.isRed;
    }

/* *** ODSATag: Invariant *** */
    // Check that the invariant holds.
    void checkInvariant() {
        if (isRed(root))
            throw new AssertionError("red root");
        ArrayList<K> keys = new ArrayList<>();
        iteratorHelper(root, keys);
        if (keys.size() != treeSize)
            throw new AssertionError("wrong tree size");
        checkInvariantHelper(root, null, null);
    }

    // Recursive helper method for 'check_invariant'.
    // Checks that the node is the root of a valid red-black tree, and that
    // all keys k satisfy lo < k < hi. The test lo < k is skipped
    // if lo is None, and k < hi is skipped if hi is None.
    // Returns the "black height" of the tree.
    int checkInvariantHelper(Node node, K lo, K hi) {
        if (node == null) return 0;

        if (lo != null && node.key.compareTo(lo) <= 0)
            throw new AssertionError("key too small");
        if (hi != null && node.key.compareTo(hi) >= 0)
            throw new AssertionError("key too big");

        if (isRed(node.right))
            throw new AssertionError("red right child");
        if (isRed(node) && isRed(node.left))
            throw new AssertionError("red node with red left child");

        // Keys in the left subtree should be < node.key
        // Keys in the right subtree should be > node.key
        int h1 = checkInvariantHelper(node.left, lo, node.key);
        int h2 = checkInvariantHelper(node.right, node.key, hi);
        if (h1 != h2)
            throw new AssertionError("unbalanced tree");

        return h1 + (isRed(node) ? 0 : 1);
    }
/* *** ODSAendTag: Invariant *** */

    // Return true if there are no keys.
    public boolean isEmpty() {
        return root == null;
    }

    // Return the number of keys.
    public int size() {
        return treeSize;
    }

    // Return true if the key has an associated value.
    public boolean containsKey(K key) {
        return get(key) != null;
    }

/* *** ODSATag: get *** */
    // Look up a key.
    public V get(K key) {
        return getHelper(root, key);
    }

    // Recursive helper method for 'get'.
    V getHelper(Node node, K key) {
        if (node == null)
            return null;
        if (node.key.compareTo(key) > 0)
            return getHelper(node.left, key);
        else if (node.key.compareTo(key) < 0)
            return getHelper(node.right, key);
        else // node.key == key
            return node.value;
    }
/* *** ODSAendTag: get *** */

/* *** ODSATag: put *** */
    // Add a key-value pair, or update the value associated with an existing key.
    // Returns the previous value associated with the key,
    // or null if the key wasn't previously present.
    public V put(K key, V value) {
        root = putHelper(root, key, value);
        if (isRed(root))
            root.isRed = false;
        if (oldValue == null)
            treeSize++;
        return oldValue;
    }

    // Recursive helper method for 'put'.
    Node putHelper(Node node, K key, V value) {
        if (node == null) {
            oldValue = null;
            return new Node(true, key, value, null, null);
        } else if (node.key.compareTo(key) > 0) {
            node.left = putHelper(node.left, key, value);
        } else if (node.key.compareTo(key) < 0) {
            node.right = putHelper(node.right, key, value);
        } else { // node.key == key
            oldValue = node.value;
            node.value = value;
        }
        return rebalance(node);
    }
/* *** ODSAendTag: put *** */

    // Used by put, remove, putHelper and removeHelper,
    // in order to return the value previously stored in the node.
    private V oldValue;

/* *** ODSATag: remove *** */
    // Delete a key.
    public V remove(K key) {
        throw new UnsupportedOperationException("remove is not implemented yet");
    }
/* *** ODSAendTag: remove *** */

/* *** ODSATag: rebalance *** */
    // Repair the red-black invariant by rebalancing the node.
    Node rebalance(Node node) {
        if (node == null) return node;

        // Skew
        if (isRed(node.right))
            node = rotateLeft(node);

        // Split part 1
        if (isRed(node.left) && isRed(node.left.left))
            node = rotateRight(node);

        // Split part 2
        if (isRed(node.left) && isRed(node.right)) {
            node.left.isRed = false;
            node.right.isRed = false;
            node.isRed = true;
        }
        return node;
    }

    Node rotateLeft(Node node) {
        // Left rotation.
        // 
        //    x                 y
        //   / \               / \
        //  A   y     ===>    x   C
        //     / \           / \
        //    B   C         A   B
        // 
        // Variables are named according to the picture above.
        Node x = node;
        Node A = x.left;
        Node y = x.right;
        Node B = y.left;
        Node C = y.right;
        // We also swap x's and y's colours (e.g. if x was black before, then y will be black afterwards).
        return new Node(x.isRed, y.key, y.value, new Node(y.isRed, x.key, x.value, A, B), C);
    }

    Node rotateRight(Node node) {
        // Right rotation.
        // 
        //      x              y
        //     / \            / \
        //    y   C   ===>   A   x
        //   / \                / \
        //  A   B              B   C
        // 
        // Variables are named according to the picture above.
        Node x = node;
        Node y = x.left;
        Node A = y.left;
        Node B = y.right;
        Node C = x.right;
        // We also swap x's and y's colours (e.g. if x was black before, then y will be black afterwards).
        return new Node(x.isRed, y.key, y.value, A, new Node(y.isRed, x.key, x.value, B, C));
    }
/* *** ODSAendTag: rebalance *** */

/* *** ODSATag: iterator *** */
    // Iterate through all keys.
    // This is called when the user writes 'for (K key: bst) { ... }.'
    public Iterator<K> iterator() {
        // The easiest way to solve this is to add all keys to an
        // ArrayList, then iterate through that.
        ArrayList<K> keys = new ArrayList<>();
        iteratorHelper(root, keys);
        return keys.iterator();
    }

    // Recursive helper method for 'iterator'
    void iteratorHelper(Node node, ArrayList<K> keys) {
        if (node == null) return;
        iteratorHelper(node.left, keys);
        keys.add(node.key);
        iteratorHelper(node.right, keys);
    }
/* *** ODSAendTag: iterator *** */
}
```


