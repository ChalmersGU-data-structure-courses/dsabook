// Preorder traversal in detail
/*global ODSA */
$(document).ready(function() {
  "use strict";

  var av_name = "preorderCON";
  var av = new JSAV(av_name);

  var interpret = {
    "av_preorder": "Preorder traversal begins.",
    "av_nullcheck": "Check to see if node is null.",
    "av_isnotnull": "Node is not null, continue traversing.",
    "av_leftchild": "Make recursive call on left child.",
    "av_rightchild": "Make recursive call on right child.",
    "av_isnull": "Node is null, do nothing.",
    "av_visit": "Visit ",
    "av_done": "Finished the preorder traversal on "
};

  var pseudo = av.code([
    "function preorder(node):",
    "    if node is not null:      // Only continue if this is a tree",
    "        visit(node)           // Visit root node",
    "        preorder(node.left)   // Process all nodes in left subtree",
    "        preorder(node.right)  // Process all nodes in right subtree",
    ], {lineNumbers: false,
      tags: {
        "sig": 1,
        "checknull": 2,
        "visit": 3,
        "visitleft": 4,
        "visitright": 5,
        "end": 6
    },
  });

  var labelTop = 360;

  var bt = av.ds.binarytree({visible: true, nodegap: 15});
  bt.root("A");
  var rt = bt.root();
  rt.left("B");
  rt.left().right("D");
  rt.right("C");
  rt.right().left("E");
  rt.right().left().left("G");
  rt.right().right("F");
  rt.right().right().left("H");
  rt.right().right().right("I");
  bt.layout();

  var rt1 = av.pointer("rt", bt.root(), {anchor: "left top", top: -10});
  var btLeft =  250;

  av.umsg(interpret["av_preorder"]);
  pseudo.setCurrentLine("sig");
  av.displayInit();

  preorder(rt);

  av.recorded();


  function preorder(node) {
    //check if null
    if (typeof node === "undefined") {
      rt1.arrow.hide();
      av.umsg(interpret["av_isnull"]);
      pseudo.setCurrentLine("checknull");
      av.step();
      return;
    }

    //not null
    rt1.target(node, {anchor: "left top"});
    av.umsg(interpret["av_isnotnull"]);
    pseudo.setCurrentLine("checknull");
    av.step();

    //visit
    rt1.target(node, {anchor: "left top"});
    node.removeClass("processing");
    node.addClass("thicknode");
    av.umsg(interpret["av_visit"] + node.value() + ".");
    pseudo.setCurrentLine("visit");
    btLeft += 35;
    av.label(String(node.value()), {left: btLeft, top: labelTop}).show();
    av.step();

    //left
    rt1.target(node.left(), {anchor: "left top"});
    av.umsg(interpret["av_leftchild"]);
    pseudo.setCurrentLine("visitleft");
    node.addClass("processing");
    av.step();
    preorder(node.left());

    //right child
    rt1.target(node, {anchor: "left top"});
    av.umsg(interpret["av_rightchild"]);
    pseudo.setCurrentLine("visitright");
    node.addClass("thicknode");
    av.step();
    preorder(node.right());

    //finish
    rt1.target(node, {anchor: "left top"});
    node.removeClass("processing");
    av.umsg(interpret["av_done"] + node.value() + ".");
    pseudo.setCurrentLine("end");
    av.step();
  }
});
