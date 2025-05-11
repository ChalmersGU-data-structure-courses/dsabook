/*global ODSA */
// Written by Mohammed Farghally and Cliff Shaffer
// Quick Sort Partition Analysis
$(document).ready(function() {
  "use strict";
  var av_name = "QuickSortPartitionAnalysisCON";
  var av = new JSAV(av_name);

  var interpret = {
    "Slide 1": "We first analyze the partition function when operating on a subarray of length <em>k</em>. Here we have <em>k = 9</em>.",
    "Slide 4": "The total cost of the partition operation is constrained by how far left and right can move inwards.",
    "Slide 5": "The swap operation in the body of the main loop guarantees the movement of left and right at least one step each.",
    "Slide 6": "Thus, the maximum number of times swap can be executed is <em>(k–1)/2</em>. <br/> In this case, left and right will move at most <em>(k–1)/2</em> steps each for a total of <em>k–1</em> steps.",
    "Slide 7": "If the pivot is the largest element, left will move <em>k–1</em> steps to the end of the array and the main loop will end.",
    "Slide 8": "If the pivot is the smallest element, right will move <em>k–1</em> steps to the beginning of the array and the main loop will end.",
    "Slide 9": "In any case, since left and right always move towards each other, they will move a total of <em>k–1</em> steps until they meet.",
    "Slide 10": "Thus, the running time of the partition function is <em>O(k)</em>, where <em>k</em> is the size of the subarray.",
    "lab1": "Pivot",
    "lab2": "Left",
    "lab3": "Right"
  };

  // var pseudo = av.code(null).hide();

  var arr;
  var arr_values = [];
  var left = [], pivot = [], right = [];
  var pivotLabel;

  // Slide 1
  av.umsg(interpret["Slide 1"]);
  for (var i = 0; i < 9; i++) {
    arr_values[i] = " ";
  }
  arr = av.ds.array(arr_values, {left: 150, top: 20, indexed: true});
  av.displayInit();

  // // Slide 2
  // av.umsg(interpret["Slide 2"]);
  pivot = av.ds.array([4], {left: 550, top: 30, indexed: false});
  pivotLabel = av.label(interpret["lab1"], {left: 590, top: 32, indexed: false});
  // arr.highlight(4);
  pivot.highlight();
  // av.step();

  // Slide 3
  // pseudo.show();
  // av.umsg("Function partition contains an outer while loop with two nested while loops.");
  // // pseudo.highlight("loops");
  // pivot.hide();
  // pivotLabel.hide();
  // arr.unhighlight(4);
  // av.step();

  // Slide 4
  av.umsg(interpret["Slide 4"]);
  left = av.ds.array([1], {left: 550, top: -10, indexed: false});
  av.label(interpret["lab2"], {left: 590, top: -8, indexed: false});
  arr.addClass(1, "greenbg");
  left.addClass(0, "greenbg");
  right = av.ds.array([8], {left: 550, top: 70, indexed: false});
  av.label(interpret["lab3"], {left: 590, top: 72, indexed: false});
  arr.addClass(8, "redbg");
  right.addClass(0, "redbg");
  arr.highlight(0);
  pivot.value(0, 0);
  pivot.show();
  pivotLabel.show();
  av.step();

  // Slide 5
  av.umsg(interpret["Slide 5"]);
  // pseudo.unhighlight("loop2");
  // pseudo.unhighlight("loop3");
  // pseudo.highlight("if");
  av.step();

  // Slide 6
  av.umsg(interpret["Slide 6"]);
  av.step();

  // Slide 7
  av.umsg(interpret["Slide 7"]);
  arr.removeClass(1, "greenbg");
  left.value(0, 8);
  arr.addClass(8, "greenbg");
  arr.removeClass(8, "redbg");
  // pseudo.unhighlight("if");
  // pseudo.highlight("loop2");
  av.step();

  // Slide 8
  av.umsg(interpret["Slide 8"]);
  arr.removeClass(8, "greenbg");
  left.value(0, 1);
  right.value(0, 1);
  arr.addClass(1, "redbg");
  // pseudo.unhighlight("loop2");
  // pseudo.highlight("loop3");
  av.step();

  // Slide 9
  av.umsg(interpret["Slide 9"]);
  right.value(0, 8);
  arr.removeClass(1, "redbg");
  arr.addClass(6, "greenbg");
  arr.addClass(5, "redbg");
  // pseudo.highlight("loop2");
  av.step();

  // Slide 10
  av.umsg(interpret["Slide 10"]);
  arr.removeClass(6, "greenbg");
  arr.removeClass(5, "redbg");
  arr.addClass(1, "greenbg");
  arr.addClass(8, "redbg");
  av.recorded();
});
