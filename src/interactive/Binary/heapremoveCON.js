/*global ODSA */
// Heap remove any slideshow
$(document).ready(function() {
  "use strict";
  var sortArray2 = [88, 85, 83, 72, 73, 42, 57, 6, 48, 60];
  var av_name = "heapremoveCON";
  var av = new JSAV(av_name);

  var interpret = {
    "av_c1": "Perhaps we want to remove an arbitrary node from the heap. (Of course, the client that wants to do the deletion has to know the proper index for the thing to be deleted. Let's see how to remove the value at position 1 in the heap.",
    "av_c2": "Similar to deleting the max, we swap the record in the target position with the record in the last position in the heap.",
    "av_c3": "Decrement the heap.",
    "av_c4": "Now we must update the heap since the value we just moved might be out of place. Depending on circumstances, it might go up, or down. In this example, push this value down.",
    "av_c5": "Swap.",
    "av_c6": "Done."
  };

  var bh = av.ds.binheap(sortArray2,
                         {compare: function(a, b) { return b - a; },
                           steps: false, heapify: false});

  // Slide 1
  av.umsg(interpret["av_c1"]);
  bh.addClass(1, "processing");
  av.displayInit();

  // Slide 2
  av.umsg(interpret["av_c2"]);
  bh.swap(1, 9);
  bh.removeClass(1, "processing");
  bh.addClass(9, "processing");
  av.step();

  // Slide 3
  av.umsg(interpret["av_c3"]);
  bh.removeClass(9, "processing");
  bh.addClass(9, "unused");
  av.step();

  // Slide 4
  av.umsg(interpret["av_c4"]);
  bh.addClass(1, "processing");
  av.step();

  // Slide 5
  av.umsg(interpret["av_c5"]);
  bh.swap(1, 4);
  bh.removeClass(1, "processing");
  bh.addClass(4, "processing");
  av.step();

  // Slide 6
  av.umsg(interpret["av_c6"]);
  bh.removeClass(4, "processing");
  av.recorded();
});
