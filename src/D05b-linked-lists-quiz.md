
### Practice questions: Linked lists

:::::::::::::::::::::::::::::::::::::::: quiz ::::::::::::::::::::::::::::::::::::::::

:::::::::: question ::::::::::
Answer TRUE or FALSE.

The physical order in memory for the nodes
of a linked list is the same as the order in which the nodes
appear in the list.

- [ ] True
- [x] False

::: hints
- When you create a new object, you have no control over
where it is in memory.
:::
::::::::::::::::::::::::::::::



:::::::::: question ::::::::::
Answer TRUE or FALSE.

In a singly linked list implementation, to
access the predecessor of the current node we must start at the
first node in the list.

- [x] True
- [ ] False

::: hints
- In a singly linked list we are unable to move directly
backwards in the list.
- So, the only alternative is to start at the front and
move down to the previous node.
:::
::::::::::::::::::::::::::::::



:::::::::: question ::::::::::
In a linked list, the successive elements in
the list: 

- [x] Need not occupy contiguous space in memory
- [ ] Must occupy contiguous space in memory
- [ ] Must not occupy contiguous space in memory
- [ ] None of these

::: hints
- Unlike an array-based list, the linked list is created
by linking together separate objects.
- Those objects can be created at any time, and you don't
control where they are in memory when they are made.
:::
::::::::::::::::::::::::::::::



:::::::::: question ::::::::::
To find an element with value $X$
in a linked list with $n$ nodes requires how many
nodes to be visited in the worst case?

- [x] $n$ nodes
- [ ] Two nodes
- [ ] $\log n$ nodes
- [ ] One node
- [ ] $n^2$ nodes

::: hints
- How many nodes might we have to visit to find the one
that we are looking for?
:::
::::::::::::::::::::::::::::::



:::::::::: question ::::::::::
Given a linked list implementation,
inserting a new element to arbitrary position $i$
takes how long in the average case? 

- [x] $\Theta(i)$ time
- [ ] $\Theta(n)$ time
- [ ] $\Theta(1)$ time
- [ ] $\Theta(\log n)$ time
- [ ] $\Theta(n \log n)$ time

::: hints
- We can't insert until we reach the proper position.
- How long does it take to reach position $i$ in a
linked list?
- Once we get there, it takes only a couple of assignments to
put the new node in place.
:::
::::::::::::::::::::::::::::::



:::::::::: question ::::::::::
Given a linked list implementation, deleting
the element at arbitrary position $i$ takes how long in the
average case?

- [x] $\Theta(i)$ time
- [ ] $\Theta(1)$ time
- [ ] $\Theta(n)$ time
- [ ] $\Theta(\log n)$ time
- [ ] $\Theta(n \log n)$ time

::: hints
- You cannot delete a node until you get to it.
- Starting from the front, how long does it take to get
to the $i$th node?
- Once you do reach the node, then you can remove it in
constant time.
:::
::::::::::::::::::::::::::::::



:::::::::: question ::::::::::
To access the node at
position $i$ in a singly-linked list

- [x] requires that all its predecessors be visited
- [ ] takes one step
- [ ] takes two steps
- [ ] requires that all its successors be visited

::: hints
- How can we reach the $i$th position?
- We have to work from the front.
:::
::::::::::::::::::::::::::::::

::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::

