/*global ODSA */
// Insert slideshow
$(document).ready(function() {
  "use strict";
  var sortArray = [88, 85, 83, 72, 73, 42, 57, 6, 48, 60, ""];
  var av_name = "heapinsertCON";
  var av = new JSAV(av_name);

  var interpret = {
    "av_c1": "Here is the process for inserting a new record into a <em>max</em> heap.",
    "av_c2": "We put the new value at the end of the array.",
    "av_c3": "Now we have to start moving the value upward in the heap, as appropriate."
  };

  var bh = av.ds.binheap(sortArray,
                         {compare: function(a, b) { return b - a; },
                           steps: false, heapify: true});

  // Slide 1
  av.umsg(interpret["av_c1"]);
  av.displayInit();

  // Slide 2
  av.umsg(interpret["av_c2"]);
  bh.heapsize(bh.heapsize() + 1);
  bh.value(10, 99);
  bh.addClass(10, "processing");
  av.step();

  // Slide 3
  av.umsg(interpret["av_c3"]);
  av.step();

  // Slide 4
  bh.swap(10, 4);
  bh.removeClass(10, "processing");
  bh.addClass(4, "processing");
  av.step();

  // Slide 5
  bh.swap(4, 1);
  bh.removeClass(4, "processing");
  bh.addClass(1, "processing");
  av.step();

  // Slide 6
  bh.swap(1, 0);
  bh.removeClass(1, "processing");
  bh.addClass(0, "processing");
  av.recorded();
});
