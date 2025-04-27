
### Review questions: Terminology

:::::::::::::::::::::::::::::::::::::::: quiz ::::::::::::::::::::::::::::::::::::::::

:::::::::: question ::::::::::
Which of these is the best definition for a stable sorting algorithm?</p>

- [x] An algorithm that does not change the relative ordering of equal elements
- [ ] An algorithm that is as fast as the best one known
- [ ] An algorithm that always gives the right answer
- [ ] An algorithm that always gives the same order for duplicate keys from run to run

::: hints
- "Stable" has nothing to do with how fast an algorithm is.
- It refers to maintaining the relative order of elements that compare equal.
:::
::::::::::::::::::::::::::::::



:::::::::: question ::::::::::
Which of these will NOT affect the RELATIVE running times for two sorting algorithms?

- [x] The CPU speed
- [ ] The number of elements
- [ ] The allowable range for the values
- [ ] The amount by which the values are out of order

::: hints
- If we speed up the CPU by a factor of two, both sorts will go twice as fast.
:::
::::::::::::::::::::::::::::::



:::::::::: question ::::::::::
Which of these is a traditional measure for the cost of a sorting algorithm?

*Note*: Multiple answers are possible!

- [x] The number of comparisons
- [x] The number of swaps
- [ ] The number of elements
- [ ] The memory size
- [ ] The amount by which the values are out of order

::: hints
- This question does not ask what *affects* the cost. It asks what is a *measure* of the cost.
- The number of elements affects the cost, but it does not measure the cost.
- The memory size affects the cost, but it does not measure the cost.
- Elements being out of order can increase the cost, but not measure it.
:::
::::::::::::::::::::::::::::::



:::::::::: question ::::::::::
In which case might the number of comparisons *not* be
a good representation of the cost for a sorting algorithm?

- [x] When we are comparing strings of widely varying length
- [ ] When there are lots of elements
- [ ] When the CPU is really fast
- [ ] When the amount of available space is small

::: hints
- CPU speed would affect all comparisons in the same way.
- Number of elements or amount of space won't affect the value of counting comparisons.
- The longer the string, the longer it takes to compare.
:::
::::::::::::::::::::::::::::::



:::::::::: question ::::::::::
Sometimes, the constant factors in an algorithm's runtime equation are more important
thant its growth rate. When the problem is sorting, this can happen in which situation?

- [x] When we are sorting lots of small groups of elements.
- [ ] When there are lots of elements.
- [ ] When the CPU is really fast.
- [ ] When the amount of available space is small.
- [ ] When the elements are nearly sorted.
- [ ] When the elements are nearly reverse sorted.

::: hints
- CPU speed would affect all comparisons in the same way.
- Elements being sorted or reverse sorted affects the growth rate of different algorithms differently.
But not relevant to this question.
- When we sort only a few elements, constants matter a lot.
:::
::::::::::::::::::::::::::::::

::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::

