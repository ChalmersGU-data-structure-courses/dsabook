/*global ODSA */
// Written by Jun Yang and Cliff Shaffer, modified by Peter Ljunglöf
$(document).ready(function() {
  "use strict";

  var arrValues = [13, 12, 20, 8, 3, "", "", ""];
  var maxSize = arrValues.length;
  var listSize = 5;
  var addIndex = 1;
  var addValue = 23;

  var av_name = "StaticArrayList-Add-CON";
  var av = new JSAV(av_name);
  var pseudo = av.code([
      "add(i, x):",
      "    size = size + 1",
      "    for k in size-1 .. i+1 (downwards):",
      "        internalArray[k] = internalArray[k-1]",
      "    internalArray[i] = x",
], {lineNumbers: false});

  var leftMargin = 10;
  var arr = av.ds.array(arrValues, {indexed: true, left: leftMargin, top: 20}).hide();
  arr.hide();

  // Vertical arrow in step 2
  var arrow1_x = leftMargin + 15 + 30 * addIndex;
  var arrow1 = av.g.line(arrow1_x, 15, arrow1_x, 35,
                         {"arrow-end": "classic-wide-long",
                          opacity: 100, "stroke-width": 2});
  arrow1.hide();

  // Label in step 1
  var label = av.label(`add(${addIndex}, ${addValue})`, {left: arrow1_x - 16, top: -20}).hide();

  //horizontal arrow in step 2
  var arrow2 = av.g.line(arrow1_x + 30, 25, arrow1_x - 5 + 30 * (listSize - addIndex), 25,
                         {"arrow-end": "classic-wide-long", opacity: 0,
                          "stroke-width": 2});
  arrow2.hide();

  // Create the graphics for maxSize and listSize variables
  var arrMS = av.ds.array([maxSize], {indexed: false, left: 150, top: 90});
  arrMS.hide();
  var labelMaxSize = av.label("capacity", {before: arrMS, left: 90, top: 89});
  labelMaxSize.hide();
  var arrLS = av.ds.array([listSize], {indexed: false, left: 150, top: 125});
  arrLS.hide();
  var labelListSize = av.label("size", {left: 120, top: 129});
  labelListSize.hide();

  // Slide
  av.umsg(`
Adding an element at a certain position requires shifting all later elements in the array by one position toward the tail.
`);
  for (let i = listSize; i < maxSize; i++) arr.addClass(i, "unused");
  av.displayInit();

  // Slide
  av.umsg(`
Here is an array-based list with ${listSize} elements. We will add an element with value ${addValue} at position ${addIndex}.
`);
  arr.show();
  arrow1.show();
  label.show();
  pseudo.highlight(1);
  arrMS.show();
  labelMaxSize.show();
  arrLS.show();
  labelListSize.show();
  av.step();

  // Slide
  av.umsg(`
Increase the list size by 1.
`);
  pseudo.unhighlight(1);
  pseudo.highlight(2);
  arr.removeClass([listSize], "unused");
  arrLS.highlight(0);
  arrLS.value(0, listSize+1);
  av.step();

  // Slide
  arrLS.unhighlight(0);
  av.umsg(`
Shift the later elements elements one position to the right to make room.
`);
  // shift all existing elements one position to the right
  arrow2.show();
  pseudo.unhighlight(2);
  pseudo.highlight([3,4]);
  av.step();

  for (let i = listSize; i > addIndex; i--) {
    av.effects.copyValue(arr, i-1, arr, i);
    av.step();
  }

  // Slide
  av.umsg(`
Insert ${addValue} into array position ${addIndex}.
`);
  arr.value(addIndex, addValue);
  arr.highlight([addIndex]);
  arrow2.hide();
  pseudo.unhighlight([3,4]);
  pseudo.highlight(5);
  av.step();

  // Slide
  arr.unhighlight([addIndex]);
  av.umsg(`
Thus, the cost to insert into an array-based list in the worst case is <em>O(n)</em> when there are <em>n</em> items in the list.
`);
  pseudo.unhighlight(5);
  av.recorded();
});
