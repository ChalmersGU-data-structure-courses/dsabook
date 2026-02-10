
:::::::::::::::::::::::::::::::::::::::: quiz ::::::::::::::::::::::::::::::::::::::::
### Review questions: Example binary tree

Here's an example binary tree:

```jsav-figure
var AV = NewAV();
var btTop = -5;
var btLeft = 305;
var bt = AV.ds.binarytree({nodegap: 15, left: btLeft, top: btTop});
bt.root("24");
var rt = bt.root();
rt.left("12");
rt.left().left("11");
rt.left().right("13");
rt.right("21");
rt.right().left("20");
rt.right().left().left("17");
rt.right().right("30");
rt.right().right().left("40");
bt.layout();
AV.displayInit();
AV.recorded();
```

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

