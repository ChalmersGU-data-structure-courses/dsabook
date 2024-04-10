// Written by Sally Hamouda and Cliff Shaffer

/*global ODSA */
$(document).ready(function() {
  "use strict";
  var av_name = "SumBinaryTreeCON";
  var av = new JSAV(av_name);

  var interpret = {
    "av_l1": "You",
    "av_l2": "1st friend",
    "av_l3": "2nd friend",
    "av_l4": "Sum = 50",
    "av_l5": "Sum = 75",
    "av_l6": "Sum = 20 + 50 + 75",
    "av_c1": "Suppose that you want to compute the sum of the values stored in a binary tree.",
    "av_c2": "You can ask two friends to help you.",
    "av_c3": "The first friend will take the left sub-tree to sum it.",
    "av_c4": "The second friend will take the right sub-tree to sum it",
    "av_c5": "The first friend will return the sum of  the left sub-tree",
    "av_c6": "The second friend will return the sum of  the left sub-tree",
    "av_c7": "You will simply sum the root value to the sums received from your friends",
    "av_c8": "You don't need to think about the details of recursion. Just accept that your friends (the recursive calls) will return back to you the correct answer for what they do."
  };

  // Set up the tree
  var btTop = 100;
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

  // Slide 1
  av.umsg(interpret["av_c1"]);
  var label1 = av.label(interpret["av_l1"], {left: 345, top: 0}); // create a label for the icon
  av.displayInit();

  // Slide 2
  av.umsg(interpret["av_c2"]);
  av.step();

  // Slide 3
  av.umsg(interpret["av_c3"]);
  var label2 = av.label(interpret["av_l2"], {left: 145, top: 150}); // create a label for the icon
  var line1 = av.g.line(230, 180, 290, 200,
                        {"stroke-width": "2", "arrow-end": "classic"});
  av.g.ellipse(339, 208, 50, 50).css({fill: "green", opacity: 0.2});
  av.step();

  // Slide 4
  av.umsg(interpret["av_c4"]);
  var label3 = av.label(interpret["av_l3"], {left: 550, top: 150}); // create a label for the icon
  var line2 = av.g.line(550, 170, 490, 200,
                        {"stroke-width": "2", "arrow-end": "classic"});
  av.g.ellipse(442, 208, 50, 50).css({fill: "purple", opacity: 0.2});
  av.step();

  // Slide 5
  label2.hide();
  label3.hide();
  line1.hide();
  line2.hide();
  av.label(interpret["av_l4"], {left: 145, top: 150}); // Label for the icon
  av.g.line(230, 180, 370, 100, {"stroke-width": "2", "arrow-end": "classic"});
  av.umsg(interpret["av_c5"]);
  av.step();

  // Slide 6
  av.label(interpret["av_l5"], {left: 550, top: 150}); // Label for the icon
  av.g.line(550, 170, 410, 100, {"stroke-width": "2", "arrow-end": "classic"});
  av.umsg(interpret["av_c6"]);
  av.step();

  // Slide 7
  label1.hide();
  av.umsg(interpret["av_c7"]);
  av.label(interpret["av_l6"], {left: 345, top: 0}); // Label for the icon
  av.step();

  // Slide 8
  av.umsg(interpret["av_c8"]);
  av.recorded();
});
