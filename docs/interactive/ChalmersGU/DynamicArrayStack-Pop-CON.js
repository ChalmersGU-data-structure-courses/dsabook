/*global ODSA */
// Written by Jun Yang and Cliff Shaffer
// Astack pop method
$(document).ready(function() {
  "use strict";

  var leftMargin = 20;
  var topMargin = 0;

  var av_name = "DynamicArrayStack-Pop-CON";
  var av = new JSAV(av_name);
  var pseudo = av.code([
    "pop():",
    "    // Precondition: stackSize > 0",
    "    stackSize = stackSize - 1",
    "    x = internalArray[stackSize]",
    "    internalArray[stackSize] = null",
    "    if stackSize < size of internalArray * 1/3:",
    "        resizeArray(size of internalArray * 1/2)",
    "    return x",
  ], {lineNumbers: false});

  var arr = av.ds.array([12, 45, 5, 81, "", "", "", ""],
                        {indexed: true, left: leftMargin, top: topMargin});
  arr.addClass([4, 5, 6, 7], "unused");

  var topArr = av.ds.array([4], {left: leftMargin + 100, top: topMargin + 55});
  av.label("top", {left: leftMargin + 73, top: topMargin + 58});
  var arrReturn = av.ds.array([""], {left: leftMargin + 100,
                                     top : topMargin + 90});
  arrReturn.hide();
  var labelReturn = av.label("x", {left: leftMargin + 90, top : topMargin + 93});
  labelReturn.hide();

  // Slide
  av.umsg("Now, for the implementation of <code>pop</code>. <code>top</code> is at the first free position, which is index 4 on the array.");
  arr.highlight(4);
  pseudo.setCurrentLine(1);
  av.displayInit();

  // Slide
  av.umsg("<code>pop</code> first decrements <code>top<code> by 1 position.");
  arr.unhighlight(4);
  arr.highlight(3);
  topArr.value(0, 3);
  topArr.highlight(0);
  pseudo.setCurrentLine(3);
  av.step();

  // Slide
  av.umsg("Then it remembers the <code>top</code> element.");
  topArr.unhighlight(0);
  arrReturn.show();
  labelReturn.show();
  av.effects.copyValue(arr, 3, arrReturn, 0);
  arr.unhighlight(4);
  arr.highlight(3);
  pseudo.setCurrentLine(4);
  av.step();

  // Slide
  av.umsg("Then it removes the element from the array.");
  arr.value(3, "");
  arr.unhighlight(3);
  arr.addClass(3, "unused");
  pseudo.setCurrentLine(5);
  av.step();

  // Slide
  av.umsg("There is no need for resizing.");
  pseudo.setCurrentLine(6);
  av.step();

  // Slide
  av.umsg("Finally it can return the removed <code>top</code> element.");
  arrReturn.highlight();
  pseudo.setCurrentLine(8);
  av.recorded();

});
