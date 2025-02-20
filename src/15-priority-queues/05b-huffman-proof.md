
### Proof of optimality for Huffman coding

Huffman tree building is an example of a
[greedy algorithm]{.term}. At each step, the
algorithm makes a "greedy" decision to merge the two subtrees with
least weight. This makes the algorithm simple, but does it give the
desired result? This section concludes with a proof that the Huffman
tree indeed gives the most efficient arrangement for the set of letters.
The proof requires the following lemma.

**Lemma:** For any Huffman tree built by function `buildHuff` containing
at least two letters, the two letters with least frequency are stored in
sibling nodes whose depth is at least as deep as any other leaf nodes in
the tree.

**Proof:** Call the two letters with least frequency $l_1$ and $l_2$.
They must be siblings because `buildHuff` selects them in the first step
of the construction process. Assume that $l_1$ and $l_2$ are not the
deepest nodes in the tree. In this case, the Huffman tree must either
look as shown in [Figure #HProof](#HProof),
or effectively symmetrical to this. For this situation to occur, the
parent of $l_1$ and $l_2$, labeled $V$, must have greater weight than
the node labeled $X$. Otherwise, function `buildHuff` would have
selected node $V$ in place of node $X$ as the child of node $U$.
However, this is impossible because $l_1$ and $l_2$ are the letters with
least frequency.

:::: {#HProof}
<inlineav id="HuffProofCON" src="Binary/HuffProofCON.js" name="Binary/HuffProofCON" links="Binary/HuffProofCON.css" static/>

An impossible Huffman tree, showing the situation where the two nodes
with least weight, $l_1$ and $l_2$, are not the deepest nodes in the
tree. Triangles represent subtrees.
::::

Here is the proof.

> **Theorem:** Function `buildHuff` builds the Huffman tree with the
> minimum external path weight for the given set of letters.
>
> **Proof:** The proof is by induction on $n$, the number of letters.
>
> -   **Base Case:** For $n = 2$, the Huffman tree must have the minimum
>     external path weight because there are only two possible trees,
>     each with identical weighted path lengths for the two leaves.
> -   **Induction Hypothesis:** Assume that any tree created by
>     `buildHuff` that contains $n-1$ leaves has minimum external path
>     length.
> -   **Induction Step:** Given a Huffman tree $\mathbf{T}$ built by
>     `buildHuff` with $n$ leaves, $n \geq 2$, suppose that
>     $w_1 \leq w_2 \leq ... \leq w_n$ where $w_1$ to $w_n$ are the
>     weights of the letters. Call $V$ the parent of the letters with
>     frequencies $w_1$ and $w_2$. From the lemma, we know that the leaf
>     nodes containing the letters with frequencies $w_1$ and $w_2$ are
>     as deep as any nodes in $\mathbf{T}$. If any other leaf nodes in
>     the tree were deeper, we could reduce their weighted path length
>     by swapping them with $w_1$ or $w_2$. But the lemma tells us that
>     no such deeper nodes exist. Call $\mathbf{T}'$ the Huffman tree
>     that is identical to $\mathbf{T}$ except that node $V$ is replaced
>     with a leaf node $V'$ whose weight is $w_1 + w_2$. By the
>     induction hypothesis, $\mathbf{T}'$ has minimum external path
>     length. Returning the children to $V'$ restores tree $\mathbf{T}$,
>     which must also have minimum external path length.
>
> Thus by mathematical induction, function `buildHuff` creates the
> Huffman tree with minimum external path length.
