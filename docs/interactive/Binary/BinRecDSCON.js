/*global ODSA */
$(document).ready(function() {
  "use strict";
  var av_name = "BinRecDSCON";
  var av = new JSAV(av_name, {animationMode: "none"});

  var interpret = {
    "av_tag1": "Left sub-tree is a binary tree",
    "av_tag2": "Right sub-tree is a binary tree"
  };

  // Set up the tree
  var btTop = 10;
  var btLeft = 305;
  var bt = av.ds.binarytree({nodegap: 15, top: btTop, left: btLeft});
  bt.root("20");
  var rt = bt.root();
  rt.left("5");
  rt.left().right("30");
  rt.left().left("15");
  rt.right("10");
  rt.right().left("40");
  rt.right().right("25");
  bt.layout();

  av.label(interpret["av_tag1"], {left: 20, top: 50});
  av.g.line(230, 80, 290, 110, {"stroke-width": "2", "arrow-end": "classic"});
  av.g.ellipse(339, 118, 50, 50).css({fill: "green", opacity: 0.2});

  av.label(interpret["av_tag2"], {left: 550, top: 50});
  av.g.line(550, 80, 490, 110, {"stroke-width": "2", "arrow-end": "classic"});
  av.g.ellipse(442, 118, 50, 50).css({fill: "purple", opacity: 0.2});
});
