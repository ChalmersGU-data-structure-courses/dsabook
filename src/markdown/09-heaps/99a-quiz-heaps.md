
### Review questions: Binary heaps

:::::::::::::::::::::::::::::::::::::::: quiz ::::::::::::::::::::::::::::::::::::::::

:::::::::: question ::::::::::
Which feature of heaps allows them to be
efficienty implemented using an array?

- [x] Heaps are complete binary trees
- [ ] Heaps are binary trees
- [ ] Heaps are binary search trees
- [ ] Heaps are full binary trees

::: hints
- A heap is not a BST.
- In general, just being a binary tree (or even a full binary
tree) is not enough to let something be implemented
using an array.
:::
::::::::::::::::::::::::::::::



:::::::::: question ::::::::::
In a max-heap containing $n$
elements, what is the position of the element with the
greatest value?

- [x] $0$
- [ ] $n-1$
- [ ] $n+1$
- [ ] $n$
- [ ] $2*n+1$
- [ ] $2*n+2$
- [ ] Possibly in any leaf node
- [ ] The leftmost leaf node
- [ ] The rightmost leaf node

::: hints
- Remember this is a max-heap. So where is the biggest
element?
- It is at the root. So, what position holds the root?
:::
::::::::::::::::::::::::::::::



:::::::::: question ::::::::::
In a max-heap containing $n$
elements, what is the position of the element with the least value?

- [x] Possibly in any leaf node
- [ ] $n-1$
- [ ] $n+1$
- [ ] $n$
- [ ] $2*n+1$
- [ ] $2*n+2$
- [ ] $0$
- [ ] The leftmost leaf node
- [ ] The rightmost leaf node

::: hints
- Remember this is a max-heap. So where is the smallest
element?
- It has to be at the bottom.
- But, it could be anywhere at the bottom.
:::
::::::::::::::::::::::::::::::



:::::::::: question ::::::::::
Consider a node $R$ of a complete binary tree
whose value is stored in position $i$ of an array
representation for the tree. If $R$ has a left
child, where will the left child's position be in the array?

- [x] $2*i+1$
- [ ] $i+1$
- [ ] $i+2$
- [ ] $2*i+2$
- [ ] $\lfloor (i-1)/2 \rfloor$

::: hints
- If you have a right sibling, it is at $i+1$.
- If you have a left sibling, it is at $i-1$.
- If you have a parent, it is at $\lfloor (i-1)/2 \rfloor$.
- If you have a right child, it is at $2*i+2$.
- If you have a left child, it is at $2*i+1$.
:::
::::::::::::::::::::::::::::::



:::::::::: question ::::::::::
Consider a node $R$ of a complete binary tree
whose value is stored in position $i$ of an array
representation for the tree. If $R$ has a left
sibling, where will the left sibling's position be in the array?

- [x] $i-1$
- [ ] $i+1$
- [ ] $i+2$
- [ ] $2*i+2$
- [ ] $\lfloor (i-1)/2 \rfloor$

::: hints
- If you have a parent, it is at $\lfloor (i-1)/2 \rfloor$.
- If you have a right child, it is at $2*i+2$.
- If you have a left child, it is at $2*i+1$.
- If you have a right sibling, it is at $i+1$.
- If you have a left sibling, it is at $i-1$.
:::
::::::::::::::::::::::::::::::



:::::::::: question ::::::::::
Consider a node $R$ of a complete binary tree
whose value is stored in position $i$ of an array
representation for the tree. If $R$ has a parent,
where will the parent's position be in the array?

- [x] $\lfloor (i-1)/2 \rfloor$
- [ ] $i+1$
- [ ] $i+2$
- [ ] $2*i+2$
- [ ] $2*i+1$

::: hints
- If you have a right sibling, it is at $i+1$.
- If you have a left sibling, it is at $i-1$.
- If you have a right child, it is at $2*i+2$.
- If you have a left child, it is at $2*i+1$.
- If you have a parent, it is at $\lfloor (i-1)/2 \rfloor$.
:::
::::::::::::::::::::::::::::::



:::::::::: question ::::::::::
Consider a node $R$ of a complete binary tree
whose value is stored in position $i$ of an array
representation for the tree. If $R$ has a right
child, where will the right child's position be in the array?

- [x] $2*i+2$
- [ ] $i+1$
- [ ] $i+2$
- [ ] $2*i+1$
- [ ] $\lfloor (i-1)/2 \rfloor$

::: hints
- If you have a right sibling, it is at $i+1$.
- If you have a left sibling, it is at $i-1$.
- If you have a parent, it is at $\lfloor (i-1)/2 \rfloor$.
- If you have a left child, it is at $2*i+1$.
- If you have a right child, it is at $2*i+2$.
:::
::::::::::::::::::::::::::::::



:::::::::: question ::::::::::
Which of these is a true statement about the
worst-case time for operations on heaps?

- [x] Both insertion and removal are better than linear
- [ ] Insertion is better than linear, but removal is not
- [ ] Removal is better than linear, but insertion is not
- [ ] Neither insertion nor removal are better than linear

::: hints
- Insert works by putting the new element at the end of
the array, and moving it up the tree as appropriate.
- So its worst-case cost is proportional to the depth of the tree.
- Remove works swapping the element to remove with the
one at the end of the array. Then move that moved item up
or down the tree, as appropriate.
- So its worst-case cost is proportional to the depth of the tree.
:::
::::::::::::::::::::::::::::::

::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::

