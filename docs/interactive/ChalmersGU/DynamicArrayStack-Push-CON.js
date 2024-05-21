/*global ODSA */
// Written by Jun Yang and Cliff Shaffer
// Astack push method
$(document).ready(function() {
  "use strict";

  var leftMargin = 30;
  var topMargin = 0;

  var av_name = "DynamicArrayStack-Push-CON";
  var av = new JSAV(av_name);
  var pseudo = av.code([
    "push(x):",
    "    if stackSize >= size of internalArray:",
    "        resizeArray(size of internalArray * 2)",
    "    internalArray[stackSize] = x",
    "    stackSize = stackSize + 1",
  ], {lineNumbers: false});

  var arr = av.ds.array([12, 45, 5, 81, "", "", "", ""],
                        {indexed: true, top: topMargin, left: 20});
  arr.addClass([4, 5, 6, 7], "unused");

  var topArr = av.ds.array([4], {left: leftMargin + 50, top: topMargin + 60});
  av.label("top", {left: leftMargin + 20, top: topMargin + 60});

  // The purpose of this "array" is only to hold a value,
  // it will always remain hidden.
  // In slide 3, we will get the effect of moving a value into the array,
  // which comes out of this dummy array.
  var arrCopy = av.ds.array([10]);
  arrCopy.hide();

  // Slide 1
  av.umsg("Method <code>push</code> is easy.");
  pseudo.setCurrentLine(1);
  av.displayInit();

  // Slide 2
  av.umsg("<code>top</code> is at the first free position, which is at position 4. Since this is less than the current size of the internal array (which is 8), we don't have to resize he array.");
  arr.highlight(4);
  pseudo.setCurrentLine(2);
  av.step();

  // Slide 3
  av.umsg("Method <code>push</code> simply places an element into the array position indicated by top.");
  pseudo.setCurrentLine(4);
  av.effects.copyValue(arrCopy, 0, arr, 4);
  arr.removeClass(4, "unused");
  av.step();

  // Slide 4
  av.umsg("Then Increment top by one position.");
  pseudo.setCurrentLine(5);
  topArr.value(0, 5);
  topArr.highlight(0);
  arr.unhighlight(4);
  arr.highlight(5);
  av.recorded();

});
