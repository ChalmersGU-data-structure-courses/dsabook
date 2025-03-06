/*global ODSA */
// Traverse an expression tree
$(document).ready(function() {
  "use strict";

  var av_name = "expressionTraversalCON";
  var av = new JSAV(av_name);

  var interpret = {
    "av_preorder": "Preorder traversal begins on pointer-based binary tree.",
    "av_nullcheck": "Check to see if node is null.",
    "av_isnotnull": "It's not null, so we check to see if the node is a leaf node.",
    "av_isleaf": "It is a leaf node.",
    "av_visitleaf": "It is a leaf node, so we visit the leaf node by using the leaf node class visit method.",
    "av_isnotleaf": "It is not a leaf node.",
    "av_visitinternal": "It is not a leaf node, so we visit the internal node by using the internal node class visit method.",
    "av_traverseleft": "Finished visiting internal node, so we traverse the left child by its internal node pointer to it.",
    "av_traverseright": "Finished visiting left child, so we traverse the right child by its parent's (internal node) pointer to it.",
    "av_done": "Finished the preorder traversal on "
};

  var pseudo = av.code([
    "public static void traverse(VarBinNode node) {",
    "    if (node == null) return;  // Nothing to visit",
    "    if (node.isLeaf()) {",
    "        // Process leaf node",
    "        Visit.VisitLeafNode(((VarLeafNode)node).value());",
    "    } else {",
    "        // Process internal node",
    "        Visit.VisitInternalNode(((VarIntlNode)node).value());",
    "        traverse(((VarIntlNode)node).leftchild());",
    "        traverse(((VarIntlNode)node).rightchild());",
    "    }",
    "}",
    ], {lineNumbers: false,
      tags: {
        "sig": 1,
        "checknull": 2,
        "isleaf": 3,
        "visitleaf": 5,
        "isnotleaf": 6,
        "visitinternal": 8,
        "traverseleft": 9,
        "traverseright": 10,
        "endnotleaf": 11,
        "end": 12
    },
  });

  var labelTop = 260;

  var bt = av.ds.binarytree({visible: true, nodegap: 15});
  bt.root("-");
  bt.root().addClass("internalnode");
  var rt = bt.root();
  rt.left("*");
  rt.left().addClass("internalnode");
  rt.right("c");
  rt.left().left("*");
  rt.left().left().addClass("internalnode");
  rt.left().left().left("4");
  rt.left().left().right("x");
  rt.left().right("+");
  rt.left().right().addClass("internalnode");
  rt.left().right().right("a");
  rt.left().right().left("*");
  rt.left().right().left().addClass("internalnode");
  rt.left().right().left().left("2");
  rt.left().right().left().right("x");
  bt.layout();

  var rt1 = av.pointer("rt", bt.root(), {anchor: "left top", top: -10});
  var btLeft =  20;

  av.umsg(interpret["av_preorder"]);
  pseudo.setCurrentLine("sig");
  av.displayInit();

  preorder(rt);

  av.recorded();

  function preorder(node) {
    // Check if null
    if (typeof node === "undefined") {
      rt1.arrow.hide();
      av.umsg(interpret["av_isnull"]);
      pseudo.setCurrentLine("checknull");
      av.step();
      return;
    }

    // Not null, check if leaf
    rt1.target(node, {anchor: "left top"});
    av.umsg(interpret["av_isnotnull"]);
    pseudo.setCurrentLine("isleaf");
    av.step();

    // Is leaf...
    if (!(node.value() === "*" || node.value() === "+" ||
          node.value() === "-")) {
      rt1.target(node, {anchor: "left top"});
      node.removeClass("processing");
      node.addClass("thicknode");
      av.umsg(interpret["av_visitleaf"]);
      pseudo.setCurrentLine("visitleaf");
      btLeft += 25;
      av.label(String(node.value()), {left: btLeft, top: labelTop}).show();
      av.step();
    } else {
      // Is internal...visit
      rt1.target(node, {anchor: "left top"});
      node.removeClass("processing");
      node.addClass("thicknode");
      av.umsg(interpret["av_visitinternal"]);
      pseudo.setCurrentLine("visitinternal");
      btLeft += 25;
      av.label(String(node.value()), {left: btLeft, top: labelTop}).show();
      av.step();

      // Left child
      rt1.target(node.left(), {anchor: "left top"});
      av.umsg(interpret["av_traverseleft"]);
      pseudo.setCurrentLine("traverseleft");
      node.addClass("processing");
      av.step();
      preorder(node.left());

      // Right child
      rt1.target(node, {anchor: "left top"});
      av.umsg(interpret["av_traverseright"]);
      pseudo.setCurrentLine("traverseright");
      node.addClass("thicknode");
      av.step();
      preorder(node.right());
    }

    // Finish
    rt1.target(node, {anchor: "left top"});
    node.removeClass("processing");
    av.umsg(interpret["av_done"] + node.value());
    pseudo.setCurrentLine("end");
    av.step();
  }
});
