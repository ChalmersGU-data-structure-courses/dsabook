/*global ODSA */
// Remove slideshow
$(document).ready(function() {
  "use strict";

  var av_name = "inorderCON";
  var av = new JSAV(av_name);

  var interpret = {
    "av_beginning": "Inorder traversal begins.",
    "av_nullcheck": "Check to see if node is null.",
    "av_isnotnull": "Not null.",
    "av_leftchild": "Make a recursive call on left child.",
    "av_inorder": "Inorder traversal begins.",
    "av_isnull": "Null.",
    "av_visit": "Visit ",
    "av_rightchild": "Make a recursive call on right child.",
    "av_finish": "Finished the inorder traversal on ",
    "av_inorderdone": "Finished the inorder traversal on A."
  };

  var pseudo = av.code([
    "static <E> void inorder(BinNode<E> node) {",
    "    if (node == null) return;  // Empty subtree - do nothing",
    "    preorder(node.left());     // Process all nodes in left",
    "    visit(node);               // Visit root node",
    "    preorder(node.right());    // Process all nodes in right",
    "}",
    ], {lineNumbers: false,
      tags: {
        "sig": 1,
        "checknull": 2,
        "visitleft": 3,
        "visit": 4,
        "visitright": 5,
        "end": 6
    },
  });

  var bt = av.ds.binarytree({visible: true, nodegap: 15});
  var labelTop = 365;

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

  av.umsg(interpret["av_inorder"]);
  pseudo.setCurrentLine("sig");
  av.displayInit();

  inorder(rt);

  av.recorded();


  function inorder(node) {
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
    av.umsg(interpret["av_leftchild"]);
    pseudo.setCurrentLine("visitleft");
    node.addClass("processing");
    rt1.target(node.left(), {anchor: "left top"});
    av.step();
    inorder(node.left());

    //visit
    rt1.target(node, {anchor: "left top"});
    //node.removeClass("processing");
    node.addClass("thicknode");
    av.umsg(interpret["av_visit"] + node.value() + ".");
    pseudo.setCurrentLine("visit");
    btLeft += 35;
    av.label(String(node.value()), {left: btLeft, top: labelTop}).show();
    av.step();

    //right child
    av.umsg(interpret["av_rightchild"]);
    pseudo.setCurrentLine("visitright");
    node.addClass("thicknode");
    rt1.target(node.right(), {anchor: "left top"});
    av.step();
    inorder(node.right());

    //finish
    rt1.target(node, {anchor: "left top"});
    node.removeClass("processing");
    av.umsg(interpret["av_finish"] + node.value() + ".");
    pseudo.setCurrentLine("end");
    av.step();
  }
});
