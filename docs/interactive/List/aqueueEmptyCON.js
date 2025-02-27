/*global ODSA */
// Written by Jun Yang and Cliff Shaffer
// How to recognize when the queue is empty or full.
$(document).ready(function() {
  "use strict";
  var av_name = "aqueueEmptyCON";
  var av = new JSAV(av_name);

  var interpret = {
    "sc1": "There remains one more serious, though subtle, problem to the array-based queue implementation. How can we recognize when the queue is empty or full?",
    "sc2": "Assume that front stores the array index for the front element in the queue, and rear stores the array index for the rear element. If both front and rear have the same position, then with this scheme there must be one element in the queue.",
    "sc3": "Thus, an empty queue would be recognized by having rear be <b>one less</b> than front (taking into account the fact that the queue is circular, so position <code>size-1</code> is actually considered to be one less than position 0).",
    "sc4": "But what if the queue is completely full? In other words, what is the situation when a queue with <em>n</em> array positions available contains <em>n</em> elements? In this case, if the front element is in position 0, then the rear element is in position <code>size-1</code>.",
    "sc5": "But this means that the value for rear is one less than the value for front when the circular nature of the queue is taken into account. In other words, the full queue is indistinguishable from the empty queue!",
    "sc6": "You might think that the problem is in the assumption about front and rear being defined to store the array indices of the front and rear elements, respectively, and that some modification in this definition will allow a solution.",
    "sc7": "Unfortunately, the problem cannot be remedied by a simple change to the definition for front and rear, because of the number of conditions or states that the queue can be in.",
    "sc8": "Ignoring the actual position of the first element, and ignoring the actual values of the elements stored in the queue, how many different states are there? There can be no elements in the queue, one element, two, and so on. At most there can be <em>n</em> elements in the queue if there are <em>n</em> array positions. This means that there are <em>n+1</em> different states for the queue (0 through <em>n</em> elements are possible)."
  };

  // center coordinate
  var cx = 400, cy = 120;
  // radius
  var r1 = 50, r2 = 100;
  var cir = av.circular(cx, cy, r1, r2, 12, {"stroke-width" : 2});

  // Slide 1
  av.umsg(interpret["sc1"]);
  av.displayInit();

  // Slide 2
  av.umsg(interpret["sc2"]);
  cir.value(10, "12");
  cir.highlight(10);
  var frontP = cir.pointer("front,rear", 10);
  av.step();

  // Slide 3
  av.umsg(interpret["sc3"]);
  cir.highlight(11);
  cir.value(10, " ");
  frontP.arrow.hide();
  frontP.label.hide();
  var frontP1 = cir.pointer("front", 11);
  var rearP1 = cir.pointer("rear", 10);
  av.step();

  // Slide 4
  av.umsg(interpret["sc4"]);
  frontP1.arrow.hide();
  frontP1.label.hide();
  rearP1.arrow.hide();
  rearP1.label.hide();
  cir.unhighlight(10);
  cir.pointer("front", 0);
  cir.pointer("rear", 11);
  cir.highlight(11);
  cir.highlight(0);
  av.step();

  // Slide 5
  av.umsg(interpret["sc5"]);
  av.step();

  // Slide 6
  av.umsg(interpret["sc6"]);
  av.step();

  // Slide 7
  av.umsg(interpret["sc7"]);
  av.step();

  // Slide 8
  av.umsg(interpret["sc8"]);
  av.recorded();
});
