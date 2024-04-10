/*global ODSA */
// Written by Jun Yang and Cliff Shaffer, modified by Peter Ljunglöf
$(document).ready(function() {
  "use strict";

  var arrValues = [13, 12, 20, 8, 3, "", "", ""];

  var av_name = "StaticArrayList-Intro-CON";
  var av = new JSAV(av_name);
  var arr = av.ds.array(arrValues, {indexed: true});

  // Slide 1
  av.umsg(`
Class <code>StaticArrayList</code> stores the list elements in the first <code>listSize</code> contiguous array positions. 
In this example, <code>listSize</code> is 5.
`);
  arr.addClass([5, 6, 7], "unused");
  arr.highlight([0, 1, 2, 3, 4]);
  av.displayInit();

  // Slide 2
  av.umsg(`
Array positions correspond to list positions. In other words, the element at position $i$ in the list is stored at array cell $i$. 
Here, the element at position 3 in the list (and index 3 in the array) is highlighted.
`);
  arr.unhighlight([0, 1, 2, 4]);
  arr.highlight(3);
  av.step();

  // Slide 3
  av.umsg(`
The head of the list is always at position 0.
`);
  arr.unhighlight(3);
  arr.highlight(0);
  av.step();

  // Slide 4
  av.umsg(`
Random access to any element in the list is quite easy. Given some position in the list, the value of the element in that position can be accessed directly.
`);
  arr.unhighlight(0);
  av.recorded();
});
