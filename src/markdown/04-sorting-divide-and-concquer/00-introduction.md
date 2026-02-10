
# Sorting, part 2 {#sorting-part-2 latex="Sorting, part 2: \mbox{Divide-and-conquer algorithms}\label{sec:sorting-divide-and-conquer}"}

In the previous chapter we presented three simple and relatively slow sorting algorithms, with [quadratic](#quadratic-growth-rate){.term} runtime behaviour.
Now we will introduce two algorithms with considerably better performance, with [linearithmic](#linearithmic-growth-rate){.term} worst-case or average-case running time: [Mergesort]{.term} and [Quicksort]{.term}.
In addition we will briefly discuss some special-purpose sorting algorithms, such as [Radix sort]{.term}.

Both these algorithms make use of a basic strategy for algorithm design, which is called [divide and conquer]{.term}.
The basic idea is to divide a big problem (how to sort a big array) into subproblems that can be solved independently (how to sort two smaller arrays).
The main difference between the algorithms is how they do the dividing:
[Mergesort]{.term} divides the array in two equal-sized halves, while
[Quicksort]{.term} divides the array into the big values and the small values.
[Radix sort]{.term} in turn divides the problem by working on one digit of the key at a time.

We will also make use of different algorithm analysis techniques.
Quicksort illustrates that it is possible for an algorithm to have an [average case]{.term} whose growth rate is significantly smaller than its [worst case]{.term}.
We can use code tuning to improve these algorithms, by falling back to a simpler algorithm (such as [Insertion sort]{.term}) when the subarray is small enough.
