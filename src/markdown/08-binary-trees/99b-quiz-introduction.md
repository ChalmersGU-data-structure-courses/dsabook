
:::::::::::::::::::::::::::::::::::::::: quiz ::::::::::::::::::::::::::::::::::::::::
### Review questions: Example binary tree


::: {.latex-figure width=30%}
```
\begin{forest}
for tree={circle,draw,fit=rectangle,s sep+=5pt},
[24 [12 [11] [13]] [21 [20 [17] [99,phantom]] [30 [40] [99,phantom]]]]
\end{forest}
```

Here's an example binary tree
:::

:::::::::: question ::::::::::
How many internal nodes does this tree have?

<input type="text" value="5"/>

::: hints
- Anything that is *not* a leaf node is an
internal node. Internal nodes might have 1 or 2 children.
:::
::::::::::::::::::::::::::::::



:::::::::: question ::::::::::
What is the height of this tree?

- [ ] 0
- [ ] 1
- [ ] 2
- [x] 3
- [ ] 4
- [ ] 5
- [ ] 9
- [ ] Trees have depth -- they do not have height
- [ ] None of the above

::: hints
- Count the number of steps to the deepest node.
:::
::::::::::::::::::::::::::::::



:::::::::: question ::::::::::
How many leaf nodes does this tree have?

<input type="text" value="4"/>

::: hints
- Anything that has *no* children is a leaf node.
:::
::::::::::::::::::::::::::::::



:::::::::: question ::::::::::
How many nodes in the tree have at least one sibling?

<input type="text" value="6"/>

::: hints
- Siblings must have the same parent. If a node has two
children, then each such child has a sibling.
:::
::::::::::::::::::::::::::::::



:::::::::: question ::::::::::
How many descendents does the root of this tree have?

<input type="text" value="8"/>

::: hints
- Every node *except* the root is a descendent.
:::
::::::::::::::::::::::::::::::



:::::::::: question ::::::::::
What is the depth of this tree?

- [ ] 0
- [ ] 1
- [ ] 2
- [ ] 3
- [ ] 4
- [ ] 5
- [ ] 9
- [x] Trees have height -- they do not have depth
- [ ] None of the above
</ul>

::: hints
- Nodes have depth.
:::
::::::::::::::::::::::::::::::



:::::::::: question ::::::::::
Which statement is correct?

- [x] The tree is neither full nor complete
- [ ] The tree is complete but not full
- [ ] The tree is full but not complete
- [ ] The tree is full and complete

::: hints
- Do any internal nodes have only one child? If so, the
tree is *not* full.
- A complete tree fills in nodes level by level, with the
bottom level filled in from left to right.
:::
::::::::::::::::::::::::::::::

::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::

