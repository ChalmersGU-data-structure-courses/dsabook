/*global ODSA */
// Written by Jun Yang and Cliff Shaffer
// Array-based circular queue
$(document).ready(function() {
  "use strict";
  var av_name = "aqueueCircularCON";
  var av = new JSAV(av_name);

  var interpret = {
    "sc1": "The \"drifting queue\" problem can be solved by pretending that the array is circular and so allow the queue to continue directly from the highest-numbered position in the array to the lowest-numbered position.",
    "sc2": "This is easily implemented through use of the modulus operator (denoted by % in many programming languages). In this way, positions in the array are numbered from 0 through <code>size-1</code>, and position <code>size-1</code> is defined to immediately precede position 0.",
    "sc3": "We will draw the circular queue with array positions increasing in the clockwise direction.",
    "sc4": "Here is a queue with the four numbers 20, 5, 12, and 17 enqueued.",
    "sc5": "The queue after elements 20 and 5 are dequeued, following which 3, 30, and 4 are enqueued."
  };

  // center coordinate
  var cx = 400, cy = 150;

  // radius
  var r1 = 50, r2 = 100;
  var fx = cx, fy = cy - r2 - 15;
  var tx = cx + r2 + 15, ty = cy;
  var fx1 = fx + 70, ty2 = ty - 70;
  var path = "M" + fx + "," + fy;
  path += " C" + fx1 + "," + fy;
  path += " " + tx + "," + ty2;
  path += " " + tx + "," + ty;
  var curve = av.g.path(path, {"stroke-width": 2, "arrow-end": "classic-wide-long"});
  var cir = av.circular(cx, cy, r1, r2, 12, {"stroke-width": 2});
  curve.hide();

  // Slide 1
  av.umsg(interpret["sc1"]);
  av.displayInit();

  // Slide 2
  av.umsg(interpret["sc2"]);
  av.step();

  // Slide 3
  av.umsg(interpret["sc3"]);
  curve.show();
  av.step();

  // Slide 4
  av.umsg(interpret["sc4"]);
  curve.hide();
  cir.value(8, "20");
  cir.value(9, "5");
  cir.value(10, "12");
  cir.value(11, "17");
  var frontP = cir.pointer("front", 8);
  var rearP = cir.pointer("rear", 11);
  av.step();

  // Slide 5
  av.umsg(interpret["sc5"]);
  cir.value(8, " ");
  cir.value(9, " ");
  cir.value(0, "3");
  cir.value(1, "30");
  cir.value(2, "4");
  cir.value(10, "12");
  cir.value(11, "17");
  frontP.arrow.hide();
  frontP.label.hide();
  rearP.arrow.hide();
  rearP.label.hide();
  cir.pointer("front", 10);
  cir.pointer("rear", 2);
  av.recorded();
});
