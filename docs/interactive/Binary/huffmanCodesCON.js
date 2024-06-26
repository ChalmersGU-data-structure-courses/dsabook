/*global ODSA, HUFF */
$(document).ready(function() {
  "use strict";
  var av_name = "huffmanCodesCON";
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

  var freqs = [32,   42, 120,   7,  42,  24,  37,   2], // The frequency counts
      chars = ["C", "D", "E", "K", "L", "M", "U", "Z"],  // The characters
      trees = [];   // Pointers to all of the partial Huffman trees
  var codeArray = [];
  var value;
  var i;
  var root;

  // initialization for all the arrays
  for (i = 0; i < freqs.length; i++) {
    value = freqs[i] + "<br>" + chars[i];
    trees[i] = av.ds.binarytree({center: false});
    root = trees[i].root();
    root.value(value);
    root.freq = freqs[i];
  }

  // Setup: Construct the huffman coding tree WITHOUT animation.
  HUFF.huffBuild(av, freqs, trees);

  // Now assign the edge labels WITHOUT animation
  HUFF.setLabels(trees[0], trees[0].root());

  trees[0].show();
  HUFF.layAll(trees);

  av.umsg(interpret["av_c6"]);
  av.displayInit();

  av.umsg(interpret["av_c4"]);
  av.step();

  HUFF.showCodes_animated(av, interpret, freqs, chars, codeArray, trees[0]);

  trees[0].hide();
  av.umsg(interpret["av_c5"]);
  var matrixData = [["<b>Char</b>", "<b>Freq</b>", "<b>Code</b>", "<b>Bits</b>"]];
  for (i = 0; i < freqs.length; i++) {
    matrixData.push([chars[i], freqs[i], codeArray[i], codeArray[i].length]);
  }
  av.ds.matrix(matrixData, {style: "plain"});
  av.recorded(); // done recording changes, will rewind
});
