
# Search trees {#search-trees}

::: TODO
- Prio 1: include "sets/maps" in the title, for example: "Search trees for sets and maps", "Sets and maps: Search trees"
:::

This chapter covers *search trees*,
which are trees that have *ordering invariants* so that they can implement sets or maps (@sec:ADTs:sets-and-maps).
Since search trees are ordered, it is also straightforward to implement
them as *sorted* sets or maps (@sec:ADTs:sorted-sets-and-maps).
This means that in addition to the basic operations -- searching, inserting and deleting --
they support *range queries* or finding the closest key, and similar operations.
One common property of all search trees is that the basic operations
are linear in the *height* of the tree, $O(h)$.
If the tree is *balanced* (see @sec:trees:unbalanced-perfect),
then the height is logarithmic in the number of nodes, $h\in O(\log(n))$.

The simplest search tree is the *binary search tree* (BST), which we cover in @sec:search-trees:BSTs.
Unfortunately, there is no guarantee that the BST will be balanced,
so the worst case complexity of the basic operations are linear in the tree size, $O(n)$.

The solution to that problem is to make the trees automatically rebalance.
This can be done in many different ways -- some examples are
*Scapegoat trees* ([](#ex:scapegoat-trees)),
*AVL trees* (@sec:search-trees:AVL-trees),
*2-3 trees* (@sec:search-trees:23-trees),
*Red-black trees* (@sec:search-trees:red-black-trees),
and *B-trees* (@sec:search-trees:B-trees).
Most of these are variants of BSTs, and they all have their own way of keeping the tree balanced.
And recall that if the tree is balanced, then the height is logarithmic,
so all basic operations become logarithmic, $O(\log(n))$, in the size of the tree.

<!-- Not all data structures used for searching are trees
-- for exampe, *Skip lists* are an interesting hybrid between trees and *linked lists*. -->


<!--
### Ordered sets and maps

Search trees have an additional property that for example hash tables do not: the elements are stored in sorted order. This means that we can implement some additional operations that sometimes are very useful: we can find the *minimum* or *maximum* values easily, and we can even find the *predecessor* or *successor* of a given value, or the *floor* or *ceiling*.

- *minimum*(): the smallest value in the set
- *predecessor*($e$): the largest value in the set that is smaller than $e$
- *floor*($e$): the largest value that is smaller or equal to $e$
- (and similar for *maximum*, *successor* and *ceiling*)

And of course there are corresponding operations for *ordered maps* too.
-->

