/*global ODSA */
$(document).ready(function() {
  "use strict";
  var av_name = "quicksortCON";

  var interpret = {
    "av_c1a": "When we start the partition function, we know that the pivot is in position 4 (the middle value).",
    "av_c1b": "First we swap the pivot (60) with the leftmost value (80).",
    "av_c1": "Now the pivot value 60 has been moved to the leftmost position, and we are ready to start the partitioning.",
    "av_c2": "The left and right bounds are set to positions 1 and 9, respectively",
    "av_c3": "Now move left bound rightward as long as it is at a value less than 60. Since it starts on 76 which is greater than 60, there is no movement of the left bound at this time.",
    "av_c4": "Likewise, the right bound starts at a value less than 60, so it does not move.",
    "av_c5": "Swap the values at the bounds.",
    "av_c6": "Now move the left bound to the right as long as it is at a value less than the pivot.",
    "av_c7": "Step.",
    "av_c8": "Now we are at 88, which is greater than or equal to 60.",
    "av_c9": "Now we move the right bound to the left until it reaches a value less than 60.",
    "av_c10": "Now the right bound is at 42, which is less than 60.",
    "av_c11": "Swap.",
    "av_c12": "Once again, move the left bound to the right.",
    "av_c13": "Left bound is at 85, which is bigger than the pivot value.",
    "av_c14": "Move the right bound to the left until we reach a value that is smaller than 60.",
    "av_c15": "Note that the right bound has crossed over the left bound. So we break the loop.",
    "av_c15a": "The right bound is now the correct position of the pivot.",
    "av_c15b": "We swap the pivot with the right bound.",
    "av_c16": "Now we can return the final position of the pivot, which is 4."
  };

  var theArray = [80, 76, 6, 57, 60, 85, 42, 83, 73, 48];
  var av = new JSAV(av_name);
  // Create an array object under control of JSAV library
  var arr = av.ds.array(theArray, {indexed: true});

  // Slide 1a
  av.umsg(interpret["av_c1a"]);
  arr.addClass(4, "processing");
  av.displayInit();

  // Slide 1b
  av.umsg(interpret["av_c1b"]);
  arr.removeClass(4, "processing");
  arr.addClass(0, "processing");
  arr.swap(4, 0);
  av.step();

  // Slide 1
  av.umsg(interpret["av_c1"]);
  av.step();

  // Slide 2
  arr.setLeftArrow(1);
  arr.setRightArrow(9);
  av.umsg(interpret["av_c2"]);
  av.step();

  // Slide 3
  av.umsg(interpret["av_c3"]);
  av.step();

  // Slide 4
  av.umsg(interpret["av_c4"]);
  av.step();

  // Slide 5
  arr.swap(1, 9);
  av.umsg(interpret["av_c5"]);
  av.step();

  // Slide 6
  av.umsg(interpret["av_c6"]);
  av.step();

  // Slide 7
  av.umsg(interpret["av_c7"]);
  arr.clearLeftArrow(1);
  arr.setLeftArrow(2);
  av.step();

  // Slide 8
  av.umsg(interpret["av_c7"]);
  arr.clearLeftArrow(2);
  arr.setLeftArrow(3);
  av.step();

  // Slide 9
  arr.clearLeftArrow(3);
  arr.setLeftArrow(4);
  av.umsg(interpret["av_c8"]);
  av.step();

  // Slide 10
  av.umsg(interpret["av_c9"]);
  av.step();

  // Slide 11
  av.umsg(interpret["av_c7"]);
  arr.clearRightArrow(9);
  arr.setRightArrow(8);
  av.step();

  // Slide 12
  av.umsg(interpret["av_c7"]);
  arr.clearRightArrow(8);
  arr.setRightArrow(7);
  av.step();

  // Slide 13
  arr.clearRightArrow(7);
  arr.setRightArrow(6);
  av.umsg(interpret["av_c10"]);
  av.step();

  // Slide 14
  av.umsg(interpret["av_c11"]);
  arr.swap(4, 6);
  av.step();

  // Slide 15
  av.umsg(interpret["av_c12"]);
  av.step();

  // Slide 16
  arr.clearLeftArrow(4);
  arr.setLeftArrow(5);
  av.umsg(interpret["av_c13"]);
  av.step();

  // Slide 17
  av.umsg(interpret["av_c14"]);
  av.step();

  // Slide 18
  av.umsg(interpret["av_c7"]);
  arr.clearRightArrow(6);
  arr.setRightArrow(5);
  av.step();

  // Slide 19
  arr.clearRightArrow(5);
  arr.setRightArrow(4);
  av.umsg(interpret["av_c15"]);
  av.step();

  // Slide 19a
  arr.clearLeftArrow(5);
  arr.clearRightArrow(4);
  arr.toggleArrow(4);
  av.umsg(interpret["av_c15a"]);
  av.step();

  // Slide 19b
  av.umsg(interpret["av_c15b"]);
  arr.removeClass(0, "processing");
  arr.addClass(4, "processing");
  arr.swap(4, 0);
  av.step();

  // Slide 20
  av.umsg(interpret["av_c16"]);
  av.recorded();
});
