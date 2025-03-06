// Show how to decode the word "DEED"
/*global ODSA */
$(document).ready(function() {
  "use strict";

  var av_name = "huffmanDecodeCON";
  var av = new JSAV(av_name);

  var interpret = {
    ".avTitle": "Huffman Coding Tree Visualization",
    "av_Authors": "Maoyuan Sun, Rich Episcopo, and Cliff Shaffer",
    "#about": "About",
    "av_c1": "The following letters will be placed in a Huffman tree:",
    "av_c2": "This is the final Huffman coding tree.",
    "av_c3": "Now we see how the edges will be used to define the codes.",
    "av_c4": "Now we are ready to compute the Huffman code for each character.",
    "av_c5": "Here is a table showing all of the codes.",
    "av_c6": "Here is the Huffman coding tree that we are using.",
    "av_c7": "Now let's use this tree to generate the Huffman codes for the letters.",
    "av_c8": "The word 'DEED' is represented by '10100101' and the word 'MUCK' is represented by '111111001110111101'.",
    "av_c9": "As an example, lets decode the bit string '10100101'.",
    "av_c10": "Code: 10100101. ",
    "av_c11": "We always begin at the root.",
    "av_c12": "Since the first bit it '1' we start by taking a right branch.",
    "av_c13": "Because the next bit is a '0' we take a left branch.",
    "av_c14": "We then take another right branch for the third bit '1' and arrive at the lead node corresponding to D.",
    "av_c15": "Thus, the first letter of the coded word is D",
    "av_c16": "We then begin at the root to start processing the next bit in the binary string.",
    "av_c17": "To decode the second letter, we make a left branche since the next two bit is '0'.",
    "av_c18": "This leads us to the leaf node E. The second letter is an E.",
    "av_c19": "We start at the root for the next bit.",
    "av_c20": "Similarly, the next bit is also a 0 which leads us to E again.",
    "av_c21": "We return to the root for the next bit",
    "av_c22": "The next bit is a 1 so we branch right.",
    "av_c23": "The next bit is a 0 so we branch left.",
    "av_c24": "This leads us to a D which is the final letter of \"DEED\".",
    "av_c25": "Sorting the data by frequency results in the following:",
    "av_c26": "Choose the two smallest numbers: ",
    "av_c27": "Merge them together to form a tree with sum \"",
    "av_c28": "\", and reorder the list.",
    "av_c29": "\"0\" is set to the edge connecting the left child of the node \"",
    "av_c30": "\"1\" is set to the edge connecting the right child of the node \"",
    "av_c31": "Huffman code for character \"",
    "av_c32": "\" is: \"",
    "av_c33": "\", which is the value along the path from the root \"",
    "av_c34": "\" to \""
  };

  var t = construct_tree(av);
  var r = t.root();

  // Slide 1
  av.umsg(interpret["av_c8"]);
  t.layout();
  av.displayInit();

  // Slide 2
  av.umsg(interpret["av_c9"]);
  av.step();

  // Slide 3
  av.umsg(interpret["av_c10"] + interpret["av_c11"]);
  r.highlight();
  av.step();

  // Slide 4
  av.umsg(interpret["av_c10"] + interpret["av_c12"]);
  r.right().highlight();
  av.step();

  // Slide 5
  av.umsg(interpret["av_c10"] + interpret["av_c13"]);
  r.right().left().highlight();
  av.step();

  // Slide 6
  av.umsg(interpret["av_c10"] + interpret["av_c14"]);
  r.right().left().right().highlight();
  av.step();

  // Slide 7
  av.umsg(interpret["av_c10"] + interpret["av_c15"]);
  av.step();

  // Slide 8
  av.umsg(interpret["av_c10"] + interpret["av_c16"]);
  r.right().unhighlight();
  r.right().left().unhighlight();
  r.right().left().right().unhighlight();
  av.step();

  // Slide 9
  av.umsg(interpret["av_c10"] + interpret["av_c17"]);
  r.left().highlight();
  av.step();

  // Slide 10
  av.umsg(interpret["av_c10"] + interpret["av_c18"]);
  av.step();

  // Slide 11
  r.left().unhighlight();
  av.umsg(interpret["av_c10"] + interpret["av_c19"]);
  av.step();

  // Slide 12
  av.umsg(interpret["av_c10"] + interpret["av_c20"]);
  r.left().highlight();
  av.step();

  // Slide 13
  av.umsg(interpret["av_c10"] + interpret["av_c21"]);
  r.left().unhighlight();
  av.step();

  // Slide 14
  av.umsg(interpret["av_c10"] + interpret["av_c22"]);
  r.right().highlight();
  av.step();

  // Slide 15
  av.umsg(interpret["av_c10"] + interpret["av_c23"]);
  r.right().left().highlight();
  av.step();

  // Slide 16
  av.umsg(interpret["av_c10"] + interpret["av_c22"]);
  r.right().left().right().highlight();
  av.step();

  // Slide 17
  av.umsg(interpret["av_c24"]);
  av.recorded();


  // Constructs the standard tree used in the slideshow
  function construct_tree(theav) {
    var theTree = theav.ds.binarytree({nodegap: 25});
    var rt = theTree.root("");

    // constructs tree
    rt.left("E<br>120");
    rt.right("").right("").right("").right("").right("M<br>24");
    rt.right().left("").left("U<br>37");
    rt.right().left().right("D<br>42");
    rt.right().right().left("L<br>42");
    rt.right().right().right().left("C<br>32");
    rt.right().right().right().right().left("");
    rt.right().right().right().right().left().left("Z<br>2");
    rt.right().right().right().right().left().right("K<br>7");

    // Add more classes for leaf nodes for css styling
    rt.left().addClass("huffmanleaf");
    rt.right().right().right().right().right().addClass("huffmanleaf");
    rt.right().left().left().addClass("huffmanleaf");
    rt.right().left().right().addClass("huffmanleaf");
    rt.right().right().left().addClass("huffmanleaf");
    rt.right().right().right().left().addClass("huffmanleaf");
    rt.right().right().right().right().left().left().addClass("huffmanleaf");
    rt.right().right().right().right().left().right().addClass("huffmanleaf");

    // Add edge labels
    rt.edgeToLeft().label("0");
    rt.edgeToRight().label("1");
    rt.right().edgeToLeft().label("0");
    rt.right().left().edgeToLeft().label("0");
    rt.right().left().edgeToRight().label("1");
    rt.right().edgeToRight().label("1");
    rt.right().right().edgeToLeft().label("0");
    rt.right().right().edgeToRight().label("1");
    rt.right().right().right().edgeToLeft().label("0");
    rt.right().right().right().edgeToRight().label("1");
    rt.right().right().right().right().edgeToRight().label("1");
    rt.right().right().right().right().edgeToLeft().label("0");
    rt.right().right().right().right().left().edgeToLeft().label("0");
    rt.right().right().right().right().left().edgeToRight().label("1");

    return theTree;
  }
});
