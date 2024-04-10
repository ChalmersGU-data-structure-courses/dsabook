/*global use */
"ODSA strict";
// Search slideshow
$(document).ready(function () {
  var av_name = "BSTsearchCON";
  var av = new JSAV(av_name);

  var interpret = {
    "sc1": "Consider searching for the record with key value 32 in this tree. We call the getHelper method with a pointer to the BST root (the node with key value 37).",
    "sc2": "Check what node is pointing to. It is not null.",
    "sc3": "Check the value at the node. We find that it is greater than what we are looking for.",
    "sc4": "So we want to visit the left child.",
    "sc5": "We make a recursive call with the left child as the new node.",
    "sc7": "So we want to visit the right child.",
    "sc9": "We make a recursive call with the right child as the new node.",
    "sc11": "Check the value at the node. We find that it is not smaller than what we are looking for.",
    "sc12": "So this is the record that we are looking for. Now we will start unwinding the recursion, passing the record with key value 32 back up to the caller.",
    "sc13": "Pop the recursion, now we are back at the node with value 24.",
    "sc14": "Pop the recursion, now we are back at the node with value 37.",
    "sc15": "Pop the recursion one final time to return the record with value 32 back to the original caller of getHelper.",
    "sc16": "Check the value at the node. We find that it is not greater than what we are looking for.",
    "sc17": "Check the value at the node. We find that it is smaller than what we are looking for."
  };

  var pseudo = av.code([
    "V getHelper(Node node, K key) {",
    "    if (node == null)",
    "        return null;",
    "    if (node.key.compareTo(key) > 0)",
    "        return getHelper(node.left, key);",
    "    else if (node.key.compareTo(key) < 0)",
    "        return getHelper(node.right, key);",
    "    else // node.key == key",
    "        return node.value;",
    "}",
  ], {lineNumbers: false,
      tags: {
        "sig": 1,
        "checknull": 2,
        "checkgreater": 4,
        "visitleft": 5,
        "checkequal": 6,
        "found": 9,
        "visitright": 7,
        "end": 10,
    },
  });

  var bstTop = 45;
  var bt = av.ds.binarytree({top: bstTop, left: 10, visible: true, nodegap: 15});
  bt.root(37);
  var rt = bt.root();
  rt.left(24);
  rt.left().left(7);
  rt.left().left().left(2);
  rt.left().right(32);
  rt.right(42);
  rt.right().left(42);
  rt.right().left().left(40);
  rt.right().right(120);
  bt.layout();

  var rt1 = av.pointer("node", bt.root(), {anchor: "right top"});

  // Slide 1
  av.umsg(interpret["sc1"]);
  pseudo.setCurrentLine("sig");
  av.displayInit();

  // Slide 2
  av.umsg(interpret["sc2"]);
  pseudo.setCurrentLine("checknull");
  av.step();

  // Slide 3
  av.umsg(interpret["sc3"]);
  pseudo.setCurrentLine("checkgreater");
  av.step();

  // Slide 4
  av.umsg(interpret["sc4"]);
  pseudo.setCurrentLine("visitleft");
  av.step();

  // Slide 5
  av.umsg(interpret["sc5"]);
  pseudo.setCurrentLine("sig");
  bt.root().addClass("processing");
  rt1.target(bt.root().left(), {anchor: "left top"});
  av.step();

  // Slide 6
  av.umsg(interpret["sc2"]);
  pseudo.setCurrentLine("checknull");
  av.step();

  // Slide 7
  av.umsg(interpret["sc16"]);
  pseudo.setCurrentLine("checkgreater");
  av.step();

  // Slide 8
  av.umsg(interpret["sc17"]);
  pseudo.setCurrentLine("checkequal");
  av.step();

  // Slide 9
  av.umsg(interpret["sc7"]);
  pseudo.setCurrentLine("visitright");
  av.step();

  // Slide 10
  av.umsg(interpret["sc9"]);
  pseudo.setCurrentLine("sig");
  bt.root().left().addClass("processing");
  rt1.target(bt.root().left().right(), {anchor: "right top"});
  av.step();

  // Slide 11
  av.umsg(interpret["sc2"]);
  pseudo.setCurrentLine("checknull");
  av.step();

  // Slide 12
  av.umsg(interpret["sc16"]);
  pseudo.setCurrentLine("checkgreater");
  av.step();

  // Slide 13
  av.umsg(interpret["sc11"]);
  pseudo.setCurrentLine("checkequal");
  av.step();

  // Slide 14
  av.umsg(interpret["sc12"]);
  pseudo.setCurrentLine("found");
  av.step();

  // Slide 15
  av.umsg(interpret["sc13"]);
  bt.root().left().removeClass("processing");
  rt1.target(bt.root().left(), {anchor: "left top"});
  pseudo.setCurrentLine("visitright");
  av.step();

  // Slide 16
  av.umsg(interpret["sc14"]);
  bt.root().removeClass("processing");
  rt1.target(bt.root(), {anchor: "right top"});
  pseudo.setCurrentLine("visitleft");
  av.step();

  // Slide 17
  av.umsg(interpret["sc15"]);
  pseudo.setCurrentLine("end");
  av.recorded();
});
