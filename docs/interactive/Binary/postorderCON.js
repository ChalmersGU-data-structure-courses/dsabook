// Postorder traversal in detail
/*global ODSA */
$(document).ready(function() {
  "use strict";

  var av_name = "postorderCON";
  var av = new JSAV(av_name);

  var interpret = {
    "av_postorder": "Postorder traversal begins.",
    "av_nullcheck": "Check to see if node is null.",
    "av_isnotnull": "Node is not null, continue traversing.",
    "av_leftchild": "Make recursive call on left child.",
    "av_rightchild": "Make recursive call on right child.",
    "av_isnull": "Node is null, do nothing.",
    "av_visit": "Visit ",
    "av_done": "Finished the postorder traversal on "
  };

  var pseudo = av.code([
    "function postorder(node):",
    "    if node is not null:      // Only continue if this is a tree",
    "        postorder(node.left)  // Process all nodes in left subtree",
    "        postorder(node.right) // Process all nodes in right subtree",
    "        visit(node)           // Visit root node",
  ], {lineNumbers: false,
      tags: {
        "sig": 1,
        "checknull": 2,
        "visitleft": 3,
        "visitright": 4,
        "visit": 5,
        "end": 6
    },
  });

  var labelTop = 370;

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

  av.umsg(interpret["av_postorder"]);
  pseudo.setCurrentLine("sig");
  av.displayInit();

  postorder(rt);

  av.recorded();


  function postorder(node) {
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

    //left child
    rt1.target(node.left(), {anchor: "left top"});
    av.umsg(interpret["av_leftchild"]);
    pseudo.setCurrentLine("visitleft");
    node.addClass("processing");
    av.step();
    postorder(node.left());

    //right child
    rt1.target(node, {anchor: "left top"});
    av.umsg(interpret["av_rightchild"]);
    pseudo.setCurrentLine("visitright");
    av.step();
    postorder(node.right());

    //visit
    rt1.target(node, {anchor: "left top"});
    node.removeClass("processing");
    av.umsg(interpret["av_visit"] + node.value() + ".");
    pseudo.setCurrentLine("visit");
    node.addClass("thicknode");
    btLeft += 35;
    av.label(String(node.value()), {left: btLeft, top: labelTop}).show();
    av.step();

    //finish
    rt1.target(node, {anchor: "left top"});
    node.removeClass("processing");
    av.umsg(interpret["av_done"] + node.value() + ".");
    pseudo.setCurrentLine("end");
    av.step();
  }
});
