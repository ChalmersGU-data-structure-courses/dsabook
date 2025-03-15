/*global ODSA */
$(document).ready(function() {
  "use strict";
  var av_name = "selectionsortS1CON";

  var interpret = {
    "av_c1": "Moving from left to right, find the element with the smallest value.",
    "av_c2": "For each element moving through the list: the smallest seen so far is shown in red.",
    "av_c3": "Compare to smallest seen so far.",
    "av_c4": "Found something smaller, so switch value of <em>minIndex</em>.",
    "av_c5": "Now swap the next smallest element into place.",
    "av_c6": "Done this pass."
  };

  var theArray = [66, 78, 22, 54, 20, 10, 55, 14];
  var av = new JSAV(av_name);
  var arr = av.ds.array(theArray, {indexed: true});
  var j;
  var minIndex = 0;

  av.umsg(interpret["av_c1"]);
  av.displayInit();

  av.umsg(interpret["av_c2"]);
  arr.addClass(minIndex, "special");
  av.step();

  for (j = minIndex+1; j < arr.size(); j++) {
    arr.addClass(j, "processing");
    av.umsg(interpret["av_c3"]);
    av.step();
    if (arr.value(j) < arr.value(minIndex)) {
      av.umsg(interpret["av_c4"]);
      arr.removeClass(minIndex, "special");
      minIndex = j;
      arr.addClass(minIndex, "special");
      av.step();
    }
    arr.removeClass(j, "processing");
  }
  av.umsg(interpret["av_c5"]);
  av.step();

  arr.removeClass(minIndex, "special");
  arr.addClass(0, "special");
  arr.swap(minIndex, 0); // swap the two indices
  av.step();

  av.umsg(interpret["av_c6"]);
  arr.removeClass(0, "special");
  arr.addClass(0, "deemph");
  av.recorded();
});
