
## Main takeaways and outlook {#search-trees:takeaway}

Self-balancing binary search trees are an excellent way of implementing sets of maps.
Both adding and searching for a value is $O(\log(n))$ time.

Again, we saw how taking a familiar data structure (trees) and adding just the right
invariants. For self-balancing search trees we have an ordering invariant, and a
balance invariant. Efficiently maintaining the balance invariant of for example AVL-trees is
a bit complicated, but after doing it successfully, searching is trivial.

We have also seen more examples of a useful strategy for making modifications when we have multiple invariants:
Perform the modification in a way that preserves one invariant but breaks the other, then restore the broken invariant.

Just like with heaps ([Chapter @sec:heaps]), we see that the invariants offer a bit of leeway with the structure --
there are many possible structures for AVL-trees with the same content. If our balance invariant was entirely rigid,
say that the tree has to be complete, we could never achieve $O(\log(n))$ time for adding an element, because we
would in essence be using a sorted array -- there would always be some value that required us to rearrange the whole tree.

:::::: latex
\wrapQRlink[4mm]{20mm}{-4mm}{\thesectionURL}{Chapter \thechapter{} online}
\section*{Online material}
Visit the online book for further reading, interactive explanations, visualisations, extra material, and exercises.
::::::

