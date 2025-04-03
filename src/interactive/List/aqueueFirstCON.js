/*global ODSA */
// Written by Jun Yang and Cliff Shaffer
// Elements of the queue are stored in the first n positions of the array
$(document).ready(function() {
  "use strict";
  var av_name = "aqueueFirstCON";
  var av = new JSAV(av_name);

  var interpret = {
    "sc1": "Assume that there are <i>n</i> elements in the queue. By analogy to the array-based list implementation, we could require that all elements of the queue be stored in the first <em>n</em> positions of the array.",
    "sc2": "If we choose the rear element of the queue to be in position 0, then dequeue operations require only <em>&theta;(1)</em> time because the front element of the queue (the one being removed) is the last element in the array.",
    "sc3": "However, enqueue operations will require <em>&theta;(n)</em> time, because the n elements currently in the queue must each be shifted one position in the array.",
    "sc4": "If instead we chose the rear element of the queue to be in position <code>listsize-1</code>, then an enqueue operation is equivalent to an append operation on a list. This requires only <em>&theta;(1)</em> time.",
    "sc5": "But now, a dequeue operation requires <em>&theta;(n)</em> time, because all of the elements must be shifted down by one position to retain the property that the remaining <em>n–1</em> queue elements reside in the first <em>n–1</em> positions of the array."
  };

  // Relative offsets
  var leftMargin = 300;
  var topMargin = 0;

  // Create the graphics for front and rear boxes
  var arrFront = av.ds.array([""], {indexed: false, left: 200, top: topMargin});
  av.label("front", {left: 163, top: topMargin + 4});
  var arrRear = av.ds.array([""], {indexed: false, left: 200, top: topMargin + 35});
  av.label("rear", {left: 168, top: topMargin + 39});
  av.ds.array([4], {indexed: false, left: 200, top: topMargin + 70});
  av.label("size", {left: 168, top: topMargin + 74});

  var arr = av.ds.array([12, 45, 5, 81, "", "", "", ""],
                          {indexed: true, top: topMargin, left: leftMargin});
  arr.addClass([4, 5, 6, 7], "unused");

  // Slide 1
  av.umsg(interpret["sc1"]);
  av.displayInit();

  // Slide 2
  av.umsg(interpret["sc2"]);
  arrFront.value(0, 3);
  arrFront.addClass([0], "special");
  arr.addClass([3], "special");
  arrRear.value(0, 0);
  arrRear.addClass([0], "processing");
  arr.addClass([0], "processing");
  av.step();

  // Slide 3
  av.umsg(interpret["sc3"]);
  av.step();

  // Slide 4
  av.umsg(interpret["sc4"]);
  arrFront.value(0, 0);
  arr.removeClass([3], "special");
  arr.addClass([3], "processing");
  arrRear.value(0, 3);
  arr.removeClass([0], "processing");
  arr.addClass([0], "special");
  av.step();

  // Slide 5
  av.umsg(interpret["sc5"]);
  av.recorded();
});
