
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

[Table #Freq](#Freq) shows the relative
frequencies of the letters of the alphabet. From this table we can see
that the letter 'E' appears about 60 times more often than the letter
'Z'. In normal ASCII, the words "DEED" and "MUCK" require the same
amount of space (four bytes). It would seem that words such as "DEED",
which are composed of relatively common letters, should be storable in
less space than words such as "MUCK", which are composed of relatively
uncommon letters.

:::: {#Freq}
::: topic
#### Table: Relative frequencies of the alphabet {-}

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
::::

If some characters are used more frequently than others, is it possible
to take advantage of this fact and somehow assign them shorter codes?
The price could be that other characters require longer codes, but this
might be worthwhile if such characters appear rarely enough. This
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

### Building Huffman coding trees

Huffman coding assigns codes to characters such that the length of the
code depends on the relative frequency or [weight]{.term} of the corresponding character. Thus, it is a
variable-length code. If the estimated frequencies for letters match the
actual frequency found in an encoded message, then the length of that
message will typically be less than if a fixed-length code had been
used. The Huffman code for each letter is derived from a full binary
tree called the [Huffman coding tree]{.term}, or
simply the [Huffman tree]{.term}. Each leaf of
the Huffman tree corresponds to a letter, and we define the weight of
the leaf node to be the weight (frequency) of its associated letter. The
goal is to build a tree with the
[minimum external path weight]{.term}. Define
the [weighted path length]{.term} of a leaf to
be its weight times its depth. The binary tree with minimum external
path weight is the one with the minimum sum of weighted path lengths for
the given set of leaves. A letter with high weight should have low
depth, so that it will count the least against the total path length. As
a result, another letter might be pushed deeper in the tree if it has
less weight.

The process of building the Huffman tree for $n$ letters is quite
simple. First, create a collection of $n$ initial Huffman trees, each of
which is a single leaf node containing one of the letters. Put the $n$
partial trees onto a priority queue organized by weight (frequency).
Next, remove the first two trees (the ones with lowest weight) from the
priority queue. Join these two trees together to create a new tree whose
root has the two trees as children, and whose weight is the sum of the
weights of the two trees. Put this new tree back into the priority
queue. This process is repeated until all of the partial Huffman trees
have been combined into one.

:::: {#FreqExamp}
::: topic
#### Table: Relative frequencies {-}

The relative frequencies for eight selected letters.

--------------- -------- -------- -------- -------- -------- -------- -------- --------
**Letter**          C        D       E        K         L        M        U       Z
**Frequency**      32       42      120       7        42       24       37       2
--------------- -------- -------- -------- -------- -------- -------- -------- --------

:::
::::

The following slideshow illustrates the Huffman tree construction
process for the eight letters of [Table #FreqExamp](#FreqExamp).

<inlineav id="huffmanBuildCON" src="Binary/huffmanBuildCON.js" script="DataStructures/huffman.js" name="Huffman Coding Tree Slideshow: Build" links="DataStructures/huffman.css Binary/huffmanCON.css"/>

Here is the implementation for the Huffman Tree class.

    datatype HuffTree of T implements Comparable:
        elem: T
        left: HuffTree
        right: HuffTree
        weight: Int

        // Huffman trees are compared using their 'weight':
        compareTo(other):
            return weight.compareTo(other.weight)

Here is the implementation for the tree-building process.

    function buildHuffTree(frequencies):
        // Initialise a min heap with singleton Huffman trees
        huffHeap = new MinHeap()
        for each char in frequencies:
            freq = frequencies.get(char)
            huffHeap.add(new HuffTree(char, null, null, freq))

        // While there are at least two trees left on heap
        while huffHeap.size > 1:
            // Remove the two minimum ones
            t1 = huffHeap.removeMin()
            t2 = huffHeap.removeMin()
            weight = t1.weight + t2.weight
            // Combine the trees and add the new tree to the heap
            t3 = new HuffTree(null, t1, t2, weight)
            huffHeap.add(t3)

        // Return the final Huffman tree
        return huffHeap.removeMin()


`buildHuffTree` takes as input `frequencies`, a map that tells how many
times each character occurs in the text to be compressed. It first
initialises a min-heap of Huffman trees, creating one singleton Huffman
tree from each character.

The main body of `buildHuffTree` consists of a while loop that does the
following: It takes the first two trees off the heap, and creates a new
tree by making them subtrees. The weight of the new tree is the sum of
the two children trees. Finally, it adds the new tree to the min-heap.

### Assigning and using Huffman codes

Once the Huffman tree has been constructed, it is an easy matter to
assign codes to individual letters. Beginning at the root, we assign
either a '0' or a '1' to each edge in the tree. '0' is assigned to
edges connecting a node with its left child, and '1' to edges
connecting a node with its right child. This process is illustrated by
the following slideshow.

<inlineav id="huffmanLabelCON" src="Binary/huffmanLabelCON.js" script="DataStructures/huffman.js" name="Huffman Coding Tree Slideshow: Label Edges" links="DataStructures/huffman.css Binary/huffmanCON.css"/>

Now that we see how the edges associate with bits in the code, it is a
simple matter to generate the codes for each letter (since each letter
corresponds to a leaf node in the tree).

<inlineav id="huffmanCodesCON" src="Binary/huffmanCodesCON.js" script="DataStructures/huffman.js" name="Huffman Coding Tree Slideshow: Setting Codes" links="DataStructures/huffman.css Binary/huffmanCON.css"/>

Now that we have a code for each letter, encoding a text message is done
by replacing each letter of the message with its binary code. A lookup
table can be used for this purpose.

### Decoding

A set of codes is said to meet the [prefix property]{.term} if no code in the set is the prefix of another. The prefix
property guarantees that there will be no ambiguity in how a bit string
is decoded. In other words, once we reach the last bit of a code during
the decoding process, we know which letter it is the code for. Huffman
codes certainly have the prefix property because any prefix for a code
would correspond to an internal node, while all codes correspond to leaf
nodes.

When we decode a character using the Huffman coding tree, we follow a
path through the tree dictated by the bits in the code string. Each
'0' bit indicates a left branch while each '1' bit indicates a right
branch. The following slideshow shows an example for how to decode a
message by traversing the tree appropriately.

<inlineav id="huffmanDecodeCON" src="Binary/huffmanDecodeCON.js" script="DataStructures/huffman.js" name="Huffman Coding Tree Slideshow: Decoding" links="DataStructures/huffman.css Binary/huffmanCON.css"/>

<avembed id="HuffmanDecodePRO" src="Binary/HuffmanDecodePRO.html" type="ka" name="Huffman Decoding Proficiency Exercise"/>

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

::: topic
#### Example: Expected savings {-}

In the particular case of the frequencies shown in
[Table #Freq](#Freq), we can determine the
expected savings from Huffman coding if the actual frequencies of a
coded message match the expected frequencies. Because the sum of the
frequencies is 306 and E has frequency 120, we expect it to appear 120
times in a message containing 306 letters. An actual message might or
might not meet this expectation. Letters D, L, and U have code lengths
of three, and together are expected to appear 121 times in 306 letters.
Letter C has a code length of four, and is expected to appear 32 times
in 306 letters. Letter M has a code length of five, and is expected to
appear 24 times in 306 letters. Finally, letters K and Z have code
lengths of six, and together are expected to appear only 9 times in 306
letters. The average expected cost per character is simply the sum of
the cost for each character ($c_i$) times the probability of its
occurring ($p_i$), or $c_1 p_1 + c_2 p_2 + \cdots + c_n p_n.$ This can
be reorganized as $\frac{c_1 f_1 + c_2 f_2 + \cdots + c_n f_n}{f_T}$,
where $f_i$ is the (relative) frequency of letter $i$ and $f_T$ is the
total for all letter frequencies. For this set of frequencies, the
expected cost per letter is
$[(1 \times 120) + (3 \times 121) + (4 \times 32) + (5 \times 24) + (6 \times 9)]/306 = 785/306 \approx 2.57.$

A fixed-length code for these eight characters would require
$\log 8 = 3$ bits per letter as opposed to about 2.57 bits per letter
for Huffman coding. Thus, Huffman coding is expected to save about 14%
for this set of letters.
:::

Huffman coding for all ASCII symbols should do better than this example.
The letters of [Table #Freq](#Freq) are
atypical in that there are too many common letters compared to the
number of rare letters. Huffman coding for all 26 letters would yield an
expected cost of 4.29 bits per letter. The equivalent fixed-length code
would require about five bits. This is somewhat unfair to fixed-length
coding because there is actually room for 32 codes in five bits, but
only 26 letters. More generally, Huffman coding of a typical text file
will save around 40% over ASCII coding if we charge ASCII coding at
eight bits per character. Huffman coding for a binary file (such as a
compiled executable) would have a very different set of distribution
frequencies and so would have a different space savings. Most commercial
compression programs use two or three coding schemes to adjust to
different types of files.

In decoding example, "DEED" was coded in 8 bits, a saving of 33% over
the twelve bits required from a fixed-length coding. However, "MUCK"
would require 18 bits, more space than required by the corresponding
fixed-length coding. The problem is that "MUCK" is composed of letters
that are not expected to occur often. If the message does not match the
expected frequencies of the letters, than the length of the encoding
will not be as expected either.

You can use the following visualization to create a huffman tree for
your own set of letters and frequencies.

<avembed id="huffmanCustomBuildAV" src="Binary/huffmanCustomBuildAV.html" type="ss" name="Huffman Custom Build"/>


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
