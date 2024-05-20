
## Binary Tree as a Recursive Data Structure

A [recursive data structure]{.term} is a data
structure that is partially composed of smaller or simpler instances of
the same data structure. For example,
[linked lists](#linked-list){.term} and
[binary trees](#binary-tree){.term} can be
viewed as recursive data structures. A list is a recursive data
structure because a list can be defined as either (1) an empty list or
(2) a node followed by a list. A binary tree is typically defined as (1)
an empty tree or (2) a node pointing to two binary trees, one its left
child and the other one its right child.

:::: {#ListRecDS}
<inlineav id="ListRecDSCON" src="Binary/ListRecDSCON.js" name="Binary/ListRecDSCON" links="Binary/RecursiveDSCON.css" static/>
::::

:::: {#BinRecDS}
<inlineav id="BinRecDSCON" src="Binary/BinRecDSCON.js" name="Binary/BinRecDSCON" links="Binary/RecursiveDSCON.css" static/>
::::

The recursive relationships used to define a structure provide a natural
model for any recursive algorithm on the structure.

<inlineav id="SumBinaryTreeCON" src="Binary/SumBinaryTreeCON.js" name="Sum values in a Binary Tree Slide Show" links="Binary/RecursiveDSCON.css"/>
