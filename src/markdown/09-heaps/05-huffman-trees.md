
## Case study: Huffman coding

::: TODO
- Prio 2: make the text shorter (this is just an example anyway)
    - including the file 04b
:::

One can often gain an improvement in space requirements in exchange for
a penalty in running time. There are many situations where this is a
desirable tradeoff. A typical example is storing files on disk. If the
files are not actively used, the owner might wish to compress them to
save space. Later, they can be uncompressed for use, which costs some
time, but only once.

We often represent a set of items in a computer program by assigning a
unique code to each item. For example, the standard
[ASCII coding](#ascii-character-coding){.term}
scheme assigns a unique eight-bit value to each character. It takes a
certain minimum number of bits to provide enough unique codes so that we
have a different one for each character. For example, it takes
$\left\lceil log\ 128\right\rceil$ or seven bits to provide the 128
unique codes needed to represent the 128 symbols of the ASCII character
set.

The requirement for $\left \lceil log\ n \right\rceil$ bits to represent
$n$ unique code values assumes that all codes will be the same length,
as are ASCII codes. These are called
[fixed-length codes](#fixed-length-coding){.term}. If all characters were used equally often, then a
fixed-length coding scheme is the most space efficient method. However,
you are probably aware that not all characters are used equally often in
many applications. For example, the various letters in an English
language document have greatly different frequencies of use.

The following table shows the relative
frequencies of the letters of the alphabet. From this table we can see
that the letter 'E' appears about 60 times more often than the letter
'Z'. In normal ASCII, the words "DEED" and "MUCK" require the same
amount of space (four bytes). It would seem that words such as "DEED",
which are composed of relatively common letters, should be storable in
less space than words such as "MUCK", which are composed of relatively
uncommon letters.

::: topic
#### Table: Relative frequencies of the alphabet

Relative frequencies for the 26 letters of the alphabet as they appear
in a selected set of English documents. "Frequency" represents the
expected frequency of occurrence per 1000 letters, ignoring case.

 Letter    Frequency    Letter    Frequency
--------  -----------  --------  -----------
    A         77           N           67
    B         17           O           67
    C         32           P           20
    D         42           Q            5
    E        120           R           59
    F         24           S           67
    G         17           T           85
    H         50           U           37
    I         76           V           12
    J          4           W           22
    K          7           X            4
    L         42           Y           22
    M         24           Z            2

:::

If some letters are used more frequently than others, is it possible
to take advantage of this fact and somehow assign them shorter codes?
The price could be that other letters require longer codes, but this
might be worthwhile if such letters appear rarely enough. This
concept is at the heart of file compression techniques in common use
today. The next section presents one such approach to assigning
[variable-length codes](#variable-length-coding){.term},
called [Huffman coding](#huffman-codes){.term}.
While it is not commonly used in its simplest form for
file compression (there are better methods), Huffman coding gives the
flavor of such coding schemes. One motivation for studying Huffman
coding is because it provides our first opportunity to see a type of
tree structure referred to as a [search trie]{.term}.

To keep things simple, the following examples for building Huffman trees
uses a [sorted list]{.term} to keep the partial
Huffman trees ordered by frequency. But a real implementation would use
a [priority queue]{.term} keyed by the
frequencies.

### Huffman coding trees

Huffman coding assigns codes to letters such that the length of the
code depends on the relative frequency or [weight]{.term} of the corresponding letter. Thus, it is a
variable-length code. If the estimated frequencies for letters match the
actual frequency found in an encoded message, then the length of that
message will typically be less than if a fixed-length code had been
used. The Huffman code for each letter is derived from a full binary
tree called the [Huffman tree]{.term}. Each leaf of
the Huffman tree corresponds to a letter, and we define the weight of
the leaf node to be the weight (frequency) of its associated letter.

Here is a possible implementation of Huffman trees, where the type `T` can e.g. be letters:

    datatype HuffmanTree of T:
        weight: Int
        elem: T
        left: HuffmanTree
        right: HuffmanTree

Note that this is not the only possible implementation.
As mentioned above, Huffman trees are *complete*, meaning that every node either has two children or none.
And, it's only nodes without children (i.e., leaves) that have an associated element.
So, an alternative implementation would be to divide nodes into internal nodes and leaves.

### Building Huffman trees

The goal of Huffman coding is to build a tree with the
[minimum external path weight]{.term}. Define
the [weighted path length]{.term} of a leaf to
be its weight times its depth. The binary tree with minimum external
path weight is the one with the minimum sum of weighted path lengths for
the given set of leaves. A letter with high weight should have low
depth, so that it will count the least against the total path length. As
a result, another letter might be pushed deeper in the tree if it has
less weight.

The process of building the Huffman tree for $n$ letters is quite
simple.

- First, create a collection of $n$ initial Huffman trees, each of which is a single leaf node containing one of the letters.
  Put the $n$ partial trees onto a *minimum* priority queue organized by weight (frequency).

- Next, remove the first two trees (the ones with lowest weight) from the priority queue.
    - Join these two trees together to create a new tree whose root has the two trees as children, and whose weight is the sum of the weights of the two trees.
    - Put this new tree back into the priority queue.

- Repeat this process until all of the partial Huffman trees have been combined into one.

::: dsvis
#### Example: Constructing a Huffman tree

Assume the following relative frequencies for eight selected letters:

--------------- -------- -------- -------- -------- -------- -------- -------- --------
**Letter**          C        D       E        K         L        M        U       Z
**Frequency**      32       42      120       7        42       24       37       2
--------------- -------- -------- -------- -------- -------- -------- -------- --------

Here is a slideshow that illustrates the Huffman tree construction process for these letters.

<inlineav id="huffmanBuildCON" src="Binary/huffmanBuildCON.js" script="DataStructures/huffman.js" name="Huffman Coding Tree Slideshow: Build" links="DataStructures/huffman.css Binary/huffmanCON.css"/>
:::

Here is pseudocode for the tree-building process.
It takes a list of characters paired with their frequencies, and returns the final Huffman tree:

    function buildHuffmanTree(frequencies):
        // Initialise a min-heap with Huffman leaves.
        huffmanHeap = new MinHeap()
        for each pair (char, freq) in frequencies:
            huffmanHeap.add(new HuffmanTree(freq, char, null, null))

        // Iterate until there is only one tree left on the heap.
        while huffmanHeap.size > 1:
            // Remove the two minimum trees from the heap.
            t1 = huffmanHeap.removeMin()
            t2 = huffmanHeap.removeMin()
            weight = t1.weight + t2.weight
            // Combine the trees and add the new tree to the heap.
            t3 = new HuffmanTree(weight, null, t1, t2)
            huffmanHeap.add(t3)

        // Return the final Huffman tree.
        return huffmanHeap.removeMin()


The function first initialises a min-heap of Huffman trees, creating one singleton Huffman leaf from each character.

The main body of `buildHuffmanTree` consists of a while loop that does the
following: It takes the first two trees off the heap, and creates a new
tree by making them subtrees. The weight of the new tree is the sum of
the two children trees. Finally, it adds the new tree to the min-heap.

### Assigning and using Huffman codes

Once the Huffman tree has been constructed, it is an easy matter to
assign bit codes to individual characters. Beginning at the root, we assign
either a '0' or a '1' to each edge in the tree. '0' is assigned to
edges connecting a node with its left child, and '1' to edges
connecting a node with its right child.

::: dsvis
This process is illustrated by the following slideshow, for our 8-letter example above.

<inlineav id="huffmanLabelCON" src="Binary/huffmanLabelCON.js" script="DataStructures/huffman.js" name="Huffman Coding Tree Slideshow: Label Edges" links="DataStructures/huffman.css Binary/huffmanCON.css"/>
:::

Now that we see how the edges associate with bits in the code, it is a
simple matter to generate the codes for each character (since each character
corresponds to a leaf node in the tree).

::: dsvis
Here is an illustration of how to transform the Huffman tree for our running example into bit codes.

<inlineav id="huffmanCodesCON" src="Binary/huffmanCodesCON.js" script="DataStructures/huffman.js" name="Huffman Coding Tree Slideshow: Setting Codes" links="DataStructures/huffman.css Binary/huffmanCON.css"/>
:::

Now that we have a code for each character, encoding a text message is done
by replacing each character of the message with its binary code. A lookup
table can be used for this purpose.

### Decoding

A set of codes is said to meet the [prefix property]{.term} if no code in the set is the prefix of another. The prefix
property guarantees that there will be no ambiguity in how a bit string
is decoded. In other words, once we reach the last bit of a code during
the decoding process, we know which character it is the code for. Huffman
codes certainly have the prefix property because any prefix for a code
would correspond to an internal node, while all codes correspond to leaf
nodes.

When we decode a character using the Huffman coding tree, we follow a
path through the tree dictated by the bits in the code string. Each
'0' bit indicates a left branch while each '1' bit indicates a right
branch.

::: dsvis
The following slideshow shows how to decode a message by traversing our example Huffman tree.

<inlineav id="huffmanDecodeCON" src="Binary/huffmanDecodeCON.js" script="DataStructures/huffman.js" name="Huffman Coding Tree Slideshow: Decoding" links="DataStructures/huffman.css Binary/huffmanCON.css"/>
:::

::: dsvis
#### Practice exercise: Huffman decoding

<avembed id="HuffmanDecodePRO" src="Binary/HuffmanDecodePRO.html" type="ka" name="Huffman Decoding Proficiency Exercise"/>
:::

### How efficient is Huffman coding?

In theory, Huffman coding is an optimal coding method whenever the true
frequencies are known, and the frequency of a letter is independent of
the context of that letter in the message. In practice, the frequencies
of letters in an English text document do change depending on context.
For example, while E is the most commonly used letter of the alphabet in
English documents, T is more common as the first letter of a word. This
is why most commercial compression utilities do not use Huffman coding
as their primary coding method, but instead use techniques that take
advantage of the context for the letters.

Another factor that affects the compression efficiency of Huffman coding
is the relative frequencies of the letters. Some frequency patterns will
save no space as compared to fixed-length codes; others can result in
great compression. In general, Huffman coding does better when there is
large variation in the frequencies of letters.

The average expected cost per letter, $c$, is the sum of the cost for each letter ($c_i$) times the probability of its occurring ($p_i$), or $c_1 p_1 + c_2 p_2 + \cdots + c_n p_n$.
Usually we measure the cost as the number of *bits* that is needed to encode one letter.
The formula can be reorganized as follows, where $f_i$ is the (relative) frequency of letter $i$ and $f_T$ is the total for all letter frequencies:

$$
\frac{c_1 f_1 + c_2 f_2 + \cdots + c_n f_n}{f_T}
$$

::: topic
#### Example: Expected savings

Let's repeat the frequencies and the Huffman codes for each of the letters in our running example:

--------------- -------- -------- -------- ----------- -------- -------- -------- ----------
**Letter**          C       D        E          K         L         M        U         Z
**Frequency**      32      42       120         7        42        24       37         2
**Code**          1110     101       0       111101      110      11111     100      111100
--------------- -------- -------- -------- ----------- -------- --------- -------- ----------

The sum of the letter frequencies is $f_T = 306$,
and the cost of each letter is the number bits in their code.
For example, the cost of E is 1 and the cost of K and Z are 6 each.
Now we can calculate the expected cost per letter using the formula above:

$$
\frac{
(4 \times 32) + (3 \times 42) + (1 \times 120) + (6 \times 7) + (3 \times 42) + (5 \times 24) + (3 \times 37) + (6 \times 2)
}{306}
\;=\; \frac{785}{306} \;\approx\; 2.57
$$

A fixed-length code for these eight letters would require
$\log 8 = 3$ bits per letter as opposed to about 2.57 bits per letter
for Huffman coding. Thus, Huffman coding is expected to save about 14%
for this set of letters.
:::

Huffman coding for all ASCII symbols should do better than the 8-letter example.
The letter frequencies are atypical in that there are too many common letters compared to the number of rare letters.

Huffman coding of a normal English text usually yields an expected cost of around 4.5 bits per character, compared to the standard way of encoding each letter in 8 bits.
So, Huffman coding of a typical English text file will save at least 40% over ASCII coding (if we charge ASCII coding at eight bits per letter).
Huffman coding for a binary file (such as a compiled executable, an image or a video) would have a very different set of distribution frequencies and so would have a different space savings.
Most state-of-the-art compression programs use two or three coding schemes to adjust to different types of files.

In decoding example, "DEED" was coded in 8 bits, a saving of 33% over
the twelve bits required from a fixed-length coding. However, "MUCK"
would require 18 bits, more space than required by the corresponding
fixed-length coding. The problem is that "MUCK" is composed of letters
that are not expected to occur often. If the message does not match the
expected frequencies of the letters, than the length of the encoding
will not be as expected either.

::: dsvis
You can use the following visualisation to create a Huffman tree for
your own set of letters and frequencies.

<avembed id="huffmanCustomBuildAV" src="Binary/huffmanCustomBuildAV.html" type="ss" name="Huffman Custom Build"/>
:::

### Proof of optimality for Huffman coding

Huffman tree building is an example of a
[greedy algorithm]{.term}. At each step, the
algorithm makes a "greedy" decision to merge the two subtrees with
least weight. This makes the algorithm simple, but does it give the
desired result? This section concludes with a proof that the Huffman
tree indeed gives the most efficient arrangement for the set of letters.
The proof requires the following lemma.

::: topic
**Lemma:** For any Huffman tree built by function `buildHuffmanTree` containing
at least two letters, the two letters with least frequency are stored in
sibling nodes whose depth is at least as deep as any other leaf nodes in
the tree.

**Proof:** Call the two letters with least frequency $l_1$ and $l_2$.
They must be siblings because `buildHuffmanTree` selects them in the first step
of the construction process. Assume that $l_1$ and $l_2$ are not the
deepest nodes in the tree. In this case, the Huffman tree must either
look like in the figure below,
or effectively symmetrical to this. For this situation to occur, the
parent of $l_1$ and $l_2$, labeled $V$, must have greater weight than
the node labeled $X$. Otherwise, function `buildHuffmanTree` would have
selected node $V$ in place of node $X$ as the child of node $U$.
However, this is impossible because $l_1$ and $l_2$ are the letters with
least frequency.

This figure shows an impossible Huffman tree, where the two nodes
with least weight, $l_1$ and $l_2$, are not the deepest nodes in the
tree. Triangles represent subtrees.

<inlineav id="HuffProofCON" src="Binary/HuffProofCON.js" name="Binary/HuffProofCON" links="Binary/HuffProofCON.css" static/>
:::

Using this lemma we can prove the following theorem:

::: topic
**Theorem:** Function `buildHuffmanTree` builds the Huffman tree with the
minimum external path weight for the given set of letters.

**Proof:** The proof is by induction on $n$, the number of letters.

-   **Base Case:** For $n = 2$, the Huffman tree must have the minimum
    external path weight because there are only two possible trees,
    each with identical weighted path lengths for the two leaves.
-   **Induction Hypothesis:** Assume that any tree created by
    `buildHuffmanTree` that contains $n-1$ leaves has minimum external path
    length.
-   **Induction Step:** Given a Huffman tree $\mathbf{T}$ built by
    `buildHuffmanTree` with $n$ leaves, $n \geq 2$, suppose that
    $w_1 \leq w_2 \leq ... \leq w_n$ where $w_1$ to $w_n$ are the
    weights of the letters. Call $V$ the parent of the letters with
    frequencies $w_1$ and $w_2$. From the lemma, we know that the leaf
    nodes containing the letters with frequencies $w_1$ and $w_2$ are
    as deep as any nodes in $\mathbf{T}$. If any other leaf nodes in
    the tree were deeper, we could reduce their weighted path length
    by swapping them with $w_1$ or $w_2$. But the lemma tells us that
    no such deeper nodes exist. Call $\mathbf{T}'$ the Huffman tree
    that is identical to $\mathbf{T}$ except that node $V$ is replaced
    with a leaf node $V'$ whose weight is $w_1 + w_2$. By the
    induction hypothesis, $\mathbf{T}'$ has minimum external path
    length. Returning the children to $V'$ restores tree $\mathbf{T}$,
    which must also have minimum external path length.

 Thus by mathematical induction, function `buildHuffmanTree` creates the
 Huffman tree with minimum external path length.
:::
