
:::::::::::::::::::::::::::::::::::::::: quiz ::::::::::::::::::::::::::::::::::::::::
### Review questions: Static array-based lists


:::::::::: question ::::::::::
In an array-based list, the successive elements in the list:

- [x] Must occupy contiguous space in memory
- [ ] Need not occupy contiguous space in memory
- [ ] Must not occupy contiguous space in memory
- [ ] None of these

::: hints
- The list elements are stored in an array.
- Where in the array should they go?
- The list element in list position $i$ will be stored in array position $i$.
:::
::::::::::::::::::::::::::::::



:::::::::: question ::::::::::
Given an array-based list implementation,
inserting a new element just before the last value
takes how long in the worst case?

- [x] $O(1)$ time
- [ ] $O(n)$ time
- [ ] $O(\log n)$ time
- [ ] $O(n \log n)$ time

::: hints
- We only need to shift one single value: the last element.
:::
::::::::::::::::::::::::::::::



:::::::::: question ::::::::::
Given an array-based list implementation,
inserting a new element to arbitrary position $i$
takes how long in the worst case?

- [x] $O(n)$ time
- [ ] $O(1)$ time
- [ ] $O(\log n)$ time
- [ ] $O(n \log n)$ time

::: hints
- Position $i$ could be anywhere in the list.
- We will need to shift values from position $i$ to the list end forward by one position.
- How many we shift depends on the value of $i$.
- In the worst case, it will be all the elements in the list.
:::
::::::::::::::::::::::::::::::



:::::::::: question ::::::::::
Given an array-based list implementation,
deleting the second-to-last element takes how long in the worst case?

- [x] $O(1)$ time
- [ ] $O(n)$ time
- [ ] $O(\log n)$ time
- [ ] $O(n \log n)$ time

::: hints
- We only need to shift one single value: the last element.
:::
::::::::::::::::::::::::::::::



:::::::::: question ::::::::::
Given an array-based list implementation,
deleting the element at an arbitrary position $i$ takes
how long in the worst case?

- [x] $O(n)$ time
- [ ] $O(1)$ time
- [ ] $O(\log n)$ time
- [ ] $O(n \log n)$ time

::: hints
- Position $i$ could be anywhere in the list (of $n$ values).
- We will need to shift values from position $i$ to the list end back by one position.
- How many we shift depends on the value of $i$.
- In the worst case, it will be all the elements in the list.
:::
::::::::::::::::::::::::::::::

::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::

