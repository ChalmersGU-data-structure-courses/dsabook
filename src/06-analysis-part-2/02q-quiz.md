
### Practice questions: Upper bounds

:::::::::::::::::::::::::::::::::::::::: quiz ::::::::::::::::::::::::::::::::::::::::

:::::::::: question ::::::::::
Answer TRUE or FALSE.

The Sequential Search algorithm is in $O(n^2)$.

- [x] True
- [ ] False

::: hints
- Recall that $O(n^2)$ means that the program has no inputs that cost more than this.
- A proposed upper bound can be much higher than the actual cost of the program, and still be correct.
:::
::::::::::::::::::::::::::::::



:::::::::: question ::::::::::
For sequential search, the best case occurs when:

- [x] The search target is near the front of the array
- [ ] The array is small
- [ ] The algorithm is implemented efficiently
- [ ] The search key is small

::: hints
- It is a serious misunderstanding of algorithm analysis to
think that best case is related to input size. The array
being small has nothing to do with what is the best case
input (of a given size).
- Implementation of an algorithm (as a program) has nothing
to do with the algorithm's best case.
- Since sequential search can be used on an unsorted array,
the value for the search key (large or small) might have
nothing to do with where the record with that key will be in
the array.
:::
::::::::::::::::::::::::::::::



:::::::::: question ::::::::::
What is the smallest integer $k$ such that $\sqrt n$ is in $O(n^k)$?

<input type="text" value="1"/>

::: hints
- $\sqrt n = n^{0.5}$
- What is the smallest integer greater than 0.5?
:::
::::::::::::::::::::::::::::::



:::::::::: question ::::::::::
What is the smallest integer $k$ such that $n \log n$ is in $O(n^k)$?

<input type="text" value="2"/>

::: hints
- $n \log n$ is bigger than $n^{1}$.
- So, that means 1 is too small.
- But, $n \log n$ is less than $n^2$.
- Actually $n \log n$ is less than $n^{1+a}$ even for tiny positive values of $a$.
:::
::::::::::::::::::::::::::::::



:::::::::: question ::::::::::
Which of these is the best upper bound for a growth rate of $5n + 3$?

- [x] $O(n)$
- [ ] $O(n^2)$
- [ ] $O(n \log n)$
- [ ] $O(\log n)$
- [ ] $O(1)$

::: hints
- The simplifying rules tell us that we can drop constants
and lower order terms from a polynomial that defines the growth rate.
:::
::::::::::::::::::::::::::::::



:::::::::: question ::::::::::
Which of these is the best upper bound for a growth rate of $5n + 3$?

- [x] $O(n \log n)$
- [ ] $O(n^2)$
- [ ] $O(\log n)$
- [ ] $O(1)$

::: hints
- The simplifying rules tell us that we can drop constants
and lower order terms from a polynomial that defines the growth rate.
- If you don't see a tight upper bound, pick the smallest
bound that is larger.
:::
::::::::::::::::::::::::::::::

::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::

