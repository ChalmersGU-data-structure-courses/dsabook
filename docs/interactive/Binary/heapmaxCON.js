/*global ODSA */
// Heap remove max slideshow
$(document).ready(function() {
  "use strict";
  var sortArray2 = [88, 85, 83, 72, 73, 42, 57, 6, 48, 60];
  var av_name = "heapmaxCON";
  var av = new JSAV(av_name);

  var interpret = {
    "av_c1": "Here is the process for removing the maximum value from the max heap. We know that this value is at the root (array position 0), but we also need to update the heap when we remove it.",
    "av_c2": "We know that we want to reduce the array/heap size by one. So we swap the first and last positions.",
    "av_c3": "Decrement the heap by one, removing that last element.",
    "av_c4": "But now, we no longer have a max heap. Push the top element down as appropriate.",
    "av_c5": "Swap the root with its left child.",
    "av_c6": "Swap with its right child.",
    "av_c7": "Done."
  };

  var bh = av.ds.binheap(sortArray2,
                         {compare: function(a, b) { return b - a; },
                           steps: false, heapify: false});

  // Slide 1
  av.umsg(interpret["av_c1"]);
  bh.addClass(0, "processing");
  av.displayInit();

  // Slide 2
  av.umsg(interpret["av_c2"]);
  bh.swap(0, 9);
  bh.removeClass(0, "processing");
  bh.addClass(9, "processing");
  av.step();

  // Slide 3
  av.umsg(interpret["av_c3"]);
  bh.heapsize(bh.heapsize() - 1);
  bh.removeClass(9, "processing");
  bh.addClass(9, "unused");
  av.step();

  // Slide 4
  av.umsg(interpret["av_c4"]);
  bh.addClass(0, "processing");
  av.step();

  // Slide 5
  av.umsg(interpret["av_c5"]);
  bh.swap(0, 1);
  bh.removeClass(0, "processing");
  bh.addClass(1, "processing");
  av.step();

  // Slide 6
  av.umsg(interpret["av_c6"]);
  bh.swap(1, 4);
  bh.removeClass(1, "processing");
  bh.addClass(4, "processing");
  av.step();

  // Slide 7
  av.umsg(interpret["av_c7"]);
  bh.removeClass(4, "processing");
  av.recorded();
});
