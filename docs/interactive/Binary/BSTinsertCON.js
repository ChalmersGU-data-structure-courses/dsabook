/*global ODSA */
// Insert slideshow
$(document).ready(function() {
  "use strict";
  var av_name = "BSTinsertCON";
  var av = new JSAV(av_name);

  var interpret = {
    "sc1": "Consider inserting a record with key value 30 in this tree. We call the putHelper method with a pointer to the BST root (the node with value 37).",
    "sc2": "Check what node is pointing to. It is not null.",
    "sc3": "Check the value at the root. We find that it is greater than what we are looking for.",
    "sc4": "So we want to visit the left child.",
    "sc5": "We make a recursive call with the left child as the new node.",
    "sc7": "Check the value at the root. We find that it is less than what we are looking for.",
    "sc8": "So we want to visit the right child.",
    "sc9": "We make a recursive call with the right child as the new node.",
    "sc14": "Check what node is pointing to. This time it is null! So make a new node.",
    "sc15": "At this point we have hit the base case on the recursive process. So now we will return out of the current instance of putHelper.",
    "sc16": "Unwinding the recursion one level brings us the node with value 32, which is to the parent of the new node that we just created. We now re-assign its left pointer to point to the return value from the call to putHelper (the new node that we had just created).",
    "sc17": "Unwinding the recursion another level brings us the node with value 24. We now re-assign its right pointer to point to the return value from the call to putHelper.",
    "sc18": "Unwinding the recursion another level brings us the node with value 37. We now re-assign its right pointer to point to the return value from the call to putHelper.",
    "sc19": "Finally we return from initial call to putHelper, returning a pointer to the node with value 37 (the root of the original tree). We now re-assign the BST's root pointer."
  };

  var pseudo = av.code([
    "putHelper(node, key, value):",
    "    if node is null:",
    "        treeSize = treeSize + 1",
    "        return new BSTNode(key, value)",
    "    else if key < node.key:",
    "        node.left = putHelper(node.left, key, value)",
    "    else if key > node.key:",
    "        node.right = putHelper(node.right, key, value)",
    "    else:  // key == node.key",
    "        node.value = value",
    "    return node",
    "}",
  ], {lineNumbers: false,
      tags: {
        "sig": 1,
        "checknull": 2,
        "compareleft": 5,
        "visitleft": 6,
        "compareright": 7,
        "visitright": 8,
        "return": 11,
        "end": 14,
      },
  });

  var bstTop = 45;
  var bt = av.ds.binarytree({top: bstTop, left: 10, visible: true, nodegap: 15});
  // var bt = av.ds.binarytree({visible: true, nodegap: 15});
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
  var newnode = rt.left().right().left(30);
  newnode.addClass("invisnode");
  var newParent = newnode.parent();
  var newedge = newParent.edgeToLeft();
  newedge.hide();
  newedge.addClass("rededge");
  bt.layout();

  var rt1 = av.pointer("node", bt.root(), {anchor: "right top", top: -10});

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
  pseudo.setCurrentLine("compareleft");
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
  av.umsg(interpret["sc7"]);
  pseudo.setCurrentLine("compareright");
  av.step();

  // Slide 8
  av.umsg(interpret["sc8"]);
  pseudo.setCurrentLine("visitright");
  av.step();

  // Slide 9
  av.umsg(interpret["sc9"]);
  pseudo.setCurrentLine("sig");
  bt.root().left().addClass("processing");
  rt1.target(bt.root().left().right(), {anchor: "right top"});
  av.step();

  // Slide 10
  av.umsg(interpret["sc2"]);
  pseudo.setCurrentLine("checknull");
  av.step();

  // Slide 11
  av.umsg(interpret["sc3"]);
  pseudo.setCurrentLine("compareleft");
  av.step();

  // Slide 12
  av.umsg(interpret["sc4"]);
  pseudo.setCurrentLine("visitleft");
  av.step();

  // Slide 13
  av.umsg(interpret["sc5"]);
  pseudo.setCurrentLine("sig");
  bt.root().left().right().addClass("processing");
  rt1.target(newnode, {anchor: "left top"});
  av.step();

  // Slide 14
  av.umsg(interpret["sc14"]);
  pseudo.setCurrentLine("checknull");
  newnode.show();
  newnode.removeClass("invisnode");
  newnode.addClass("rednode");
  newedge.hide();
  av.step();

  // Slide 15
  av.umsg(interpret["sc15"]);
  av.step();

  // Slide 16
  av.umsg(interpret["sc16"]);
  newnode = newnode.parent();
  newedge.show();
  bt.root().left().right().removeClass("processing");
  rt1.target(newnode, {anchor: "left top"});
  pseudo.setCurrentLine("visitleft");
  av.step();

  // Slide 17
  av.umsg(interpret["sc17"]);
  newedge = newnode.edgeToParent();
  newnode = newnode.parent();
  newedge.addClass("rededge");
  bt.root().left().removeClass("processing");
  rt1.target(newnode, {anchor: "left top"});
  pseudo.setCurrentLine("visitright");
  av.step();

  // Slide 18
  av.umsg(interpret["sc18"]);
  newedge = newnode.edgeToParent();
  newnode = newnode.parent();
  newedge.addClass("rededge");
  bt.root().removeClass("processing");
  rt1.target(newnode, {anchor: "left top"});
  pseudo.setCurrentLine("visitleft");
  av.step();

  // Slide 19
  av.umsg(interpret["sc19"]);
  rt1.hide();
  var root1 = av.pointer("root", bt.root(), {anchor: "right top", top: -10});
  root1.arrow.addClass("thinredline");
  // This line should not be needed, but it is here to fix Raphael bug with arrows
  root1.arrow.css({stroke: "red"});
  pseudo.setCurrentLine("end");
  av.recorded();
});
