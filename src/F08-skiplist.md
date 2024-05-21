
## Skip Lists (optional)

This module presents a probabilistic search structure called the
[skip list]{.term}. Like the
[BST]{.term}, skip lists are designed to
overcome a basic limitation of array-based and linked lists: Either
search or update operations require linear time. The skip list is an
example of a [probabilistic data structure]{.term}, because it makes some of its decisions at random.

Skip lists provide an alternative to the BST and related tree
structures. The primary problem with the BST is that it may easily
become unbalanced. The [2-3 Tree]{.term} is
guaranteed to remain balanced regardless of the order in which data
values are inserted, but it is rather complicated to implement. The
[AVL tree]{.term} and the
[splay tree]{.term} are also guaranteed to
provide good performance, but at the cost of added complexity as
compared to the BST. The skip list is easier to implement than known
balanced tree structures. The skip list is not guaranteed to provide
good performance (where good performance is defined as $\Theta(\log n)$
search, insertion, and deletion time), but it will provide good
performance with extremely high probability (unlike the BST which has a
good chance of performing poorly). As such it represents a good
compromise between difficulty of implementation and performance.

<inlineav id="SkipListIntroCON" src="SearchStruct/SkipListIntroCON.js" script="DataStructures/SkipList.js" name="SearchStruct/SkipListIntroCON" links="DataStructures/SkipList.css SearchStruct/SkipListIntroCON.css"/>

We can continue adding pointers to selected nodes in this way \--- give
a third pointer to every fourth node, give a fourth pointer to every
eighth node, and so on -- until we reach the ultimate of $\log n$
pointers in the first and middle nodes for a list of $n$ nodes. To
search, start with the bottom row of pointers, going as far as possible
and skipping many nodes at a time. Then, shift up to shorter and shorter
steps as required. With this arrangement, the worst-case number of
accesses is $\Theta(\log n)$.

We will store with each skip list node an array named `forward` that
stores the pointers. Position `forward[0]` stores a level 0 pointer,
`forward[1]` stores a level 1 pointer, and so on:

    class SkipNode:
        SkipNode(key, value, level):
            this.key = key
            this.value = value
            this.forward = new Array(level + 1)

The skip list object includes data member `level` that stores the
highest level for any node currently in the skip list. The skip list
stores a header node named `head` with `level+1` pointers where the head
level is initially 0 and the level is set to -1 for the empty list. The
start of the SkipList class follows:

    class SkipList implements Map:
        SkipList():
            this.head = new SkipNode(null, null, 0)
            this.level = -1
            this.listSize = 0

The `get` method works as follows.

    class SkipList implements Map:
        ...
        // Look up the value associated with a key.
        get(key):
            x = this.head  // Dummy header node
            for i = this.level downto 0:  // For each level...
                while x.forward[i] is not null and key > x.forward[i].key:  // ...go forward
                    x = x.forward[i]  // Go one last step
            x = x.forward[0]  // Move to actual record, if it exists
            if x is not null and key == x.key:
                return x.value  // Got it
            else:
                return null  // It's not there

The ideal skip list is organized so that (if the head node is not
counted) half of the nodes have only one pointer, one quarter have two,
one eighth have three, and so on. And ideally, the distances would be
equally spaced; in effect this is a "perfectly balanced" skip list.
Maintaining such balance would be expensive during the normal process of
insertions and deletions. The key to skip lists is that we do not worry
about any of this. Whenever inserting a node, we assign it a level
(i.e., some number of pointers). The assignment is random, using a
geometric distribution yielding a 50% probability that the node will
have one pointer, a 25% probability that it will have two, and so on.
The following function determines the level based on such a
distribution.

    class SkipList implements Map:
        ...
        randomLevel():
            level = 0
            while random() < 0.5:
                level = level + 1
            return lev

Once the proper level for the node has been determined, the next step is
to find where the node should be inserted and link it in as appropriate
at all of its levels. Here is an implementation for inserting a new
value into the skip list followed by a visualization of the process.
Note that we build an `update` array as we progress through the skip
list, so that we can update the pointers for the nodes that will precede
the one being inserted.

    class SkipList implements Map:
        ...
        // Add a key-value pair, or update the value associated with an existing key. 
        put(key, value):
            newLevel = this.randomLevel()  // New node's level
            if newLevel > this.level:  // If new node is deeper...
                this.adjustHead(newLevel)  // ...adjust the header
            // Track end of level:
            update = new Array(this.level + 1)
            x = this.head  // Start at header node
            for i = level downto 0:  // Find insert position
                while x.forward[i] is not null and key > x.forward[i].key:
                    x = x.forward[i]
                update[i] = x  // Track end at level i
            x = x.forward[0]  // Move to actual record, if it exists
            if x is not null and key == x.key:
                x.value = value  // The key exists: update the value
            else:
                // Otherwise, create a new node and insert it into place:
                y = new SkipNode(key, value, newLevel)
                for i = 0 to newLevel:  // Splice into list
                    y.forward[i] = update[i].forward[i]  // Who y points to
                    update[i].forward[i] = y  // Who points to y
                this.listSize = this.listSize + 1

        adjustHead(newLevel):
            temp = this.head
            this.head = new SkipNode(null, null, newLevel)
            for i in 0 to this.level:
                this.head.forward[i] = temp.forward[i]
            this.level = newLevel


<inlineav id="SkipListInsertCON" src="SearchStruct/SkipListInsertCON.js" script="DataStructures/SkipList.js" name="SearchStruct/SkipListInsertCON" links="DataStructures/SkipList.css SearchStruct/SkipListInsertCON.css"/>

The `remove` function is similar to insertion in that the `update` array
is built as part of searching for the record to be deleted. Then those
nodes specified by the update array have their forward pointers adjusted
to point around the node being deleted.

<inlineav id="SkipListRmvCON" src="SearchStruct/SkipListRmvCON.js" script="DataStructures/SkipList.js" name="SearchStruct/SkipListRmvCON" links="DataStructures/SkipList.css SearchStruct/SkipListRmvCON.css"/>

A newly inserted node could have a high level generated by
`randomLevel`, or a low level. It is possible that many nodes in the
skip list could have many pointers, leading to unnecessary insert cost
and yielding poor (i.e., $\Theta(n)$) performance during search, because
not many nodes will be skipped. Conversely, too many nodes could have a
low level. In the worst case, all nodes could be at level 0, equivalent
to a regular linked list. If so, search will again require $\Theta(n)$
time. However, the probability that performance will be poor is quite
low. There is only one chance in 1024 that ten nodes in a row will be at
level 0. The motto of probabilistic data structures such as the skip
list is "Don't worry, be happy". We simply accept the results of
`randomLevel` and expect that probability will eventually work in our
favor. The advantage of this approach is that the algorithms are simple,
while requiring only $\Theta(\log n)$ time for all operations in the
average case. For a skip list of size $n$, the expected memory usage is
$2n$. This is because a level $l$ node needs $l+1$ forward pointers, but
occurs with probability $2^{(l+1)}$. So a skip list is expected to have
$\sum_{l=0}^{l=\infty} (l+1)/2^{(l+1)}$ pointers, which is 2. Thus, the
number of pointers needed by both the BST and the skip list are expected
to be the same.

In practice, the skip list will probably have better performance than a
BST storing the same data. The BST can have bad performance caused by
the order in which data are inserted. For example, if $n$ nodes are
inserted into a BST in ascending order of their key values, then the BST
will look like a linked list with the deepest node at depth $n-1$. If
the data inserted over the life of the BST could be randomly ordered,
then the probability distribution for the cost of the insert and search
operations would be similar to that of the skip list. The problem for
the BST is that this randomization does not happen in fact, but rather
the BST is constrained by the actual order of inputs and searches.

In contrast, the skip list's performance does not depend on the order
in which values are inserted into the list. In a sense, the data are
"randomized" automatically as part of the skip list's probabilistic
behavior when the depths of the nodes are selected. As the number of
nodes in the skip list increases, the probability of encountering the
worst case decreases geometrically. Thus, the skip list illustrates a
tension between the theoretical worst case (in this case, $\Theta(n)$
for a skip list operation), and a rapidly increasing probability of
average-case performance of $\Theta(\log n)$, that characterizes
probabilistic data structures.
