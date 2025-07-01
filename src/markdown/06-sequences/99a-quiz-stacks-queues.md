
:::::::::::::::::::::::::::::::::::::::: quiz ::::::::::::::::::::::::::::::::::::::::
### Review questions: Stacks and queues

Here are some general practice questions about stacks and queues.


:::::::::: question ::::::::::
Which value of a stack is accessible?

- [x] The top item
- [ ] The front item
- [ ] The root
- [ ] The bottom item
- [ ] The rear item
- [ ] The highest-valued item
- [ ] The lowest-valued item

::: hints
- Stacks do not care about the relative order of the
values for the items it stores.
- A stack gives access only to the last item that was
inserted.
- This is called the "top" item.
:::
::::::::::::::::::::::::::::::



:::::::::: question ::::::::::
It is an error to pop data from a(n) _______ stack.

- [x] Empty
- [ ] Full
- [ ] Initialised
- [ ] Array-based
- [ ] Linked

::: hints
- "Pop" means to remove.
- When can we not remove anything?
:::
::::::::::::::::::::::::::::::



:::::::::: question ::::::::::
In the linked implementation of a queue, a
new item would be added:

- [x] At the rear
- [ ] At the head
- [ ] At the current position
- [ ] After all other entries that are greater than the new entry
- [ ] After all other entries that are smaller than the new entry

::: hints
- We don't care about value order in a queue.
- In a queue, we always add at the rear.
:::
::::::::::::::::::::::::::::::



:::::::::: question ::::::::::
The following sequence of operations is
performed on a queue:

> enqueue(1), enqueue(2), dequeue, enqueue(1), enqueue(2), dequeue, dequeue, dequeue, enqueue(2), dequeue

The values will be output in this order:

- [x] 1,2,1,2,2
- [ ] 1,2,1,1,2
- [ ] 2,2,1,1,2
- [ ] 2,2,1,2,2
- [ ] 2,1,2,2,1
- [ ] 2,1,2,2,2

::: hints
- Trace the operations, one by one.
:::
::::::::::::::::::::::::::::::



:::::::::: question ::::::::::
One difference between a queue and a stack is:

- [x] Queues use two ends of the structure; stacks use only one
- [ ] Queues require linked lists, but stacks do not
- [ ] Stacks require linked lists, but queues do not
- [ ] Stacks use two ends of the structure, queues use only one

::: hints
- Stacks and queues can both be implemented using a
linked structure.
- The key difference is which end(s) the two stuctures
access for insert and remove operations.
:::
::::::::::::::::::::::::::::::



:::::::::: question ::::::::::
If the characters 'D', 'C', 'B', 'A' are
placed in a stack (in that order), and then removed one at a
time, in what order will they be removed?

- [x] ABCD
- [ ] ABDC
- [ ] DCAB
- [ ] DCBA

::: hints
- Items come off of a stack in the opposite order from how
they went in.
:::
::::::::::::::::::::::::::::::



:::::::::: question ::::::::::
Queue behavior is typically referred to as:

- [x] First-In, First-Out
- [ ] Last-In, First-Out
- [ ] First Come, First Served
- [ ] Just-in-Time

::: hints
- In a queue, we remove the one that came in first.
:::
::::::::::::::::::::::::::::::



:::::::::: question ::::::::::
It is an error to dequeue data from a(n) _______ queue.

- [x] Empty
- [ ] Full
- [ ] Array-based
- [ ] Linked

::: hints
- "Dequeue" means to remove. When can we not remove from
a queue?-
:::
::::::::::::::::::::::::::::::



:::::::::: question ::::::::::
Which value of a queue is accessible?

- [x] The front item
- [ ] The top item
- [ ] The root
- [ ] The bottom item
- [ ] The rear item
- [ ] The highest-valued item
- [ ] The lowest-valued item

::: hints
- In a queue, we remove from (access) the front (and
insert at the rear).
:::
::::::::::::::::::::::::::::::



:::::::::: question ::::::::::
The Stack is best characterised as:

- [x] Last-In, First-Out
- [ ] First-In, First-Out
- [ ] First come, First Served
- [ ] Just-in-Time

::: hints
- The queue is called "First-in, First-out"
- The stack is called "Last-in, First-out"
:::
::::::::::::::::::::::::::::::



:::::::::: question ::::::::::
In the linked implementation of a queue, a
new item would be added to the:

- [x] Rear
- [ ] Front
- [ ] Current position
- [ ] None of these

::: hints
- In any queue implementation, we always add to the rear.
:::
::::::::::::::::::::::::::::::



:::::::::: question ::::::::::
If the characters 'D', 'C', 'B', 'A' are
placed in a queue (in that order), and then removed one at a
time, in what order will they be removed?

- [x] DCBA
- [ ] ABCD
- [ ] ABDC
- [ ] DCAB

::: hints
- Items are removed from a queue in the same order as
they arrived.
:::
::::::::::::::::::::::::::::::



:::::::::: question ::::::::::
Stack A has entries a, b, c (in that
order with a on top), while Stack B is initially empty.
When an entry is popped out of stack
A, it can be printed immediately or pushed to stack B. When an
entry is popped out of stack B, it can only be printed. Which of
the following permutations of a, b, c is not possible to
print?

- [x] c a b
- [ ] b a c
- [ ] b c a
- [ ] a b c

::: hints
- We can manage to get "c" to print first.
- But to do so requires putting "a" and then "b" into
stack B.-
- Which then means that they must come out of B and be
printed in reverse order.
:::
::::::::::::::::::::::::::::::



:::::::::: question ::::::::::
The following sequence of operations is performed on a stack:

> push(1), push(2), pop, push(1), push(2), pop, pop, pop, push(2), pop

The values will be output in this order:

- [x] 2,2,1,1,2
- [ ] 1,2,1,2,2
- [ ] 1,2,2,1,2
- [ ] 2,2,1,2,2
- [ ] 2,1,2,2,1
- [ ] 2,1,2,2,2

::: hints
- Trace the series of operations onto a stack.
:::
::::::::::::::::::::::::::::::

::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::

